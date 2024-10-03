import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all skills', () => {
    const skillItems = fixture.debugElement.queryAll(By.css('.skill-item'));
    expect(skillItems.length).toBe(component.skills.length);
  });

  it('should render skill names correctly', () => {
    const skillNames = fixture.debugElement.queryAll(By.css('.skill-name'));
    skillNames.forEach((el, index) => {
      expect(el.nativeElement.textContent).toBe(component.skills[index].name);
    });
  });

  it('should render FontAwesome icons for non-SVG skills', () => {
    const nonSvgSkills = component.skills.filter((skill) => !skill.isSvg);
    const faIcons = fixture.debugElement.queryAll(By.css('fa-icon'));
    expect(faIcons.length).toBe(nonSvgSkills.length);
  });

  it('should render SVG images or inline SVGs for SVG skills', () => {
    const svgSkills = component.skills.filter((skill) => skill.isSvg);
    console.log(
      'SVG Skills:',
      svgSkills.map((skill) => skill.name)
    );
    console.log('SVG Skills Count:', svgSkills.length);

    const skillItems = fixture.debugElement.queryAll(By.css('.skill-item'));
    console.log('Total Skill Items:', skillItems.length);

    const renderedSvgSkills = skillItems.filter((item) => {
      const hasImg = item.query(By.css('img[ngSrc^="assets/icons/"]')) !== null;
      const hasSvg = item.query(By.css('svg')) !== null;
      const hasFaIcon = item.query(By.css('fa-icon')) !== null;
      return (hasImg || hasSvg) && !hasFaIcon; // Exclude items with FontAwesome icons
    });

    console.log('Total Rendered SVG Skills:', renderedSvgSkills.length);

    // Log all skill items for debugging
    skillItems.forEach((item, index) => {
      const name = item
        .query(By.css('.skill-name'))
        ?.nativeElement.textContent.trim();
      const hasImg = item.query(By.css('img[ngSrc^="assets/icons/"]')) !== null;
      const hasSvg = item.query(By.css('svg')) !== null;
      const hasFaIcon = item.query(By.css('fa-icon')) !== null;
      console.log(
        `Skill ${
          index + 1
        }: ${name}, Has Image: ${hasImg}, Has SVG: ${hasSvg}, Has FA Icon: ${hasFaIcon}`
      );
    });

    expect(renderedSvgSkills.length).toBe(svgSkills.length);

    const renderedSkillNames = renderedSvgSkills.map((item) =>
      item.query(By.css('.skill-name')).nativeElement.textContent.trim()
    );

    console.log('Rendered SVG Skill Names:', renderedSkillNames);

    const missingSkills = svgSkills.filter(
      (skill) => !renderedSkillNames.includes(skill.name)
    );

    if (missingSkills.length > 0) {
      console.log(
        'Skills missing SVG representation:',
        missingSkills.map((skill) => skill.name)
      );
    }

    expect(missingSkills.length).toBe(0);
  });
});
