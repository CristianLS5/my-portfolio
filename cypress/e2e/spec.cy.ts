describe('Portfolio E2E Tests', () => {
  beforeEach(() => {
    cy.log('Starting test');
    cy.visit('http://localhost:4200');
    // Scroll down to make the header visible
    cy.scrollTo(0, 1000);
    // Wait for the header to become visible
    cy.get('nav', { timeout: 10000 }).should('be.visible');
  });

  it('should load the home page', () => {
    cy.get('.intro-section h1', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Cristian López Solá');

    cy.get('.home-content h1', { timeout: 10000 })
      .should('be.visible')
      .and('contain', "Hello, I'm Cristian");

    cy.title().should('include', 'MyPortfolio');
  });

  it('should navigate to Contact section and test form', () => {
    cy.get('nav').within(() => {
      cy.contains('Contact').should('be.visible').click();
    });

    // Wait for any animations or scrolling to complete
    cy.wait(2000);

    // Check if the contact section is visible
    cy.get('#contact').should('be.visible');

    // Check for common elements in the contact section
    cy.get('#contact').within(() => {
      // Check for the heading
      cy.get('h2').should('exist').and('be.visible');

      // Check for form elements
      cy.get('form').should('exist');
      cy.get('input[formControlName="name"]').should('exist');
      cy.get('input[formControlName="email"]').should('exist');
      cy.get('input[formControlName="subject"]').should('exist');
      cy.get('textarea[formControlName="message"]').should('exist');
      cy.get('button[type="submit"]').should('exist');

      // Check for FontAwesome icons
      cy.get('fa-icon').should('have.length', 4);

      // Fill out the form
      cy.get('input[formControlName="name"]').type('Test User');
      cy.get('input[formControlName="email"]').type('test@example.com');
      cy.get('input[formControlName="subject"]').type('Test Subject');
      cy.get('textarea[formControlName="message"]').type(
        'This is a test message with more than 10 characters.'
      );

      // The button should now be enabled
      cy.get('button[type="submit"]').should('not.be.disabled');

      // Check the submit button text
      cy.get('button[type="submit"]')
        .invoke('text')
        .then((text) => {
          cy.log('Submit button text:', text.trim());
        });

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Check for success message (adjust the
    });
  });

  it('should download PDF resume', () => {
    // Find all download links
    cy.get('a[href$="Cristian_Lopez_Resume.pdf"]').then(($links) => {
      // Log the number of links found
      cy.log(`Found ${$links.length} download links`);

      // If multiple links are found, use the first one
      const $link = $links.first();

      // Verify the download link exists and has the correct attributes
      cy.wrap($link)
        .should('have.attr', 'href')
        .and('include', 'Cristian_Lopez_Resume.pdf');

      cy.wrap($link).should('have.attr', 'download');

      // Log the full href attribute
      cy.wrap($link)
        .invoke('attr', 'href')
        .then((href) => {
          cy.log(`Full href attribute: ${href}`);
        });

      // Mock the download behavior (Cypress can't actually download files)
      cy.wrap($link).invoke('removeAttr', 'target').click();

      // Verify that the file exists on the server
      // Use the actual href from the link
      cy.wrap($link)
        .invoke('attr', 'href')
        .then((href) => {
          if (href) {
            // Add this type guard
            cy.request(href).its('status').should('eq', 200);
          } else {
            throw new Error('href attribute is undefined');
          }
        });
    });
  });

  it('should navigate to News component', () => {
    cy.get('nav').contains('News').click();
    cy.url().should('include', '/news');

    // Wait for the page to load
    cy.get('body', { timeout: 10000 }).should('exist');

    // Log the entire body content to see what's actually on the page
    cy.get('body').then(($body) => {
      cy.log('Page content:', $body.html());
    });

    // Check for any heading that might contain 'News'
    cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
      const newsHeading = $headings.filter((_, el) =>
        el.innerText.toLowerCase().includes('news')
      );
      if (newsHeading.length > 0) {
        cy.wrap(newsHeading.first()).should('be.visible');
      } else {
        cy.log('No heading containing "News" found');
        // List all headings found
        $headings.each((_, el) => {
          cy.log('Found heading:', el.innerText);
        });
      }
    });

    // Check for any element that might indicate we're on the News page
    cy.get('body')
      .contains(/news|articles|updates/i)
      .should('exist');
  });

  it('should navigate to Resume component', () => {
    cy.get('nav').contains('Resume').click();
    cy.url().should('include', '/resume');

    // Wait for the page to load
    cy.get('body', { timeout: 10000 }).should('exist');

    // Log the entire body content to see what's actually on the page
    cy.get('body').then(($body) => {
      cy.log('Page content:', $body.html());
    });

    // Check for any heading that might be related to Resume
    cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
      const resumeHeading = $headings.filter(
        (_, el) =>
          el.innerText.toLowerCase().includes('resume') ||
          el.innerText.toLowerCase().includes('cv') ||
          el.innerText.toLowerCase().includes('curriculum')
      );
      if (resumeHeading.length > 0) {
        cy.wrap(resumeHeading.first()).should('be.visible');
      } else {
        cy.log('No heading related to Resume found');
        // List all headings found
        $headings.each((_, el) => {
          cy.log('Found heading:', el.innerText);
        });
      }
    });

    // Check for any element that might indicate we're on the Resume page
    cy.get('body')
      .contains(/resume|cv|curriculum vitae|work experience/i)
      .should('exist');

    // Check for specific sections that are likely to be in a resume
    cy.get('body').then(($body) => {
      const sections = ['education', 'experience', 'skills', 'projects'];
      sections.forEach((section) => {
        if ($body.text().toLowerCase().includes(section)) {
          cy.log(`Found ${section} section`);
        } else {
          cy.log(`${section} section not found`);
        }
      });
    });
  });

  it('should toggle dark mode', () => {
    // Find and click the dark mode toggle button
    cy.get('nav button').last().as('darkModeToggle');

    // Log initial state
    cy.get('body').then(($body) => {
      cy.log(`Initial body classes: ${$body.attr('class')}`);
    });

    // Click the dark mode toggle button
    cy.get('@darkModeToggle').click();

    // Wait for a short time to allow for any asynchronous operations
    cy.wait(1000);

    // Check if the dark class is added
    cy.get('body').should('have.class', 'dark');

    // Click the dark mode toggle button again
    cy.get('@darkModeToggle').click();

    // Wait again
    cy.wait(1000);

    // Check if the dark class is removed
    cy.get('body').should('not.have.class', 'dark');
  });

  it('should toggle language', () => {
    // Click the language toggle button
    cy.contains('button', 'ES').click();

    // Check if the language has changed
    cy.get('nav').should('contain', 'Inicio');

    // Toggle back to English
    cy.contains('button', 'EN').click();

    // Check if it's back to English
    cy.get('nav').should('contain', 'Home');
  });

  it('should have working social media links', () => {
    cy.get('footer').within(() => {
      cy.get('a[href*="github.com"]').should('have.attr', 'target', '_blank');
      cy.get('a[href*="linkedin.com"]').should('have.attr', 'target', '_blank');
    });
  });
});
