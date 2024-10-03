import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, TranslateModule.forRoot(), FontAwesomeModule],
      providers: [TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });

  it('should return correct resume URL for English', () => {
    translateService.use('en');
    expect(component.getResumeUrl()).toBe(
      'assets/files/Cristian_Lopez_Resume.pdf'
    );
  });

  it('should return correct resume URL for Spanish', () => {
    translateService.use('es');
    expect(component.getResumeUrl()).toBe('assets/files/Cristian_Lopez_CV.pdf');
  });

  it('should return correct LinkedIn URL for English', () => {
    translateService.use('en');
    expect(component.getLinkedInUrl()).toBe(
      'https://www.linkedin.com/in/cristian-l%C3%B3pez-sol%C3%A1-2b6493204/?locale=en_US'
    );
  });

  it('should return correct LinkedIn URL for Spanish', () => {
    translateService.use('es');
    expect(component.getLinkedInUrl()).toBe(
      'https://www.linkedin.com/in/cristian-l%C3%B3pez-sol%C3%A1-2b6493204/'
    );
  });

  it('should render social media links', () => {
    const socialLinks = fixture.nativeElement.querySelectorAll('a');
    expect(socialLinks.length).toBe(3); // GitHub, LinkedIn, and Resume download
  });

  it('should have correct href for GitHub link', () => {
    const githubLink = fixture.nativeElement.querySelector(
      'a[href="https://github.com/CristianLS5"]'
    );
    expect(githubLink).toBeTruthy();
  });

  it('should have correct href for LinkedIn link', () => {
    const linkedinLink = fixture.nativeElement.querySelector(
      'a[href="' + component.getLinkedInUrl() + '"]'
    );
    expect(linkedinLink).toBeTruthy();
  });

  it('should have correct href for resume download link', () => {
    const resumeLink = fixture.nativeElement.querySelector(
      'a[href="' + component.getResumeUrl() + '"]'
    );
    expect(resumeLink).toBeTruthy();
  });
});
