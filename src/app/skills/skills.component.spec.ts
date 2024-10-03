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

  it('should render SVG images for SVG skills', () => {
    const svgSkills = component.skills.filter((skill) => skill.isSvg);
    const svgImages = fixture.debugElement.queryAll(By.css('img'));
    expect(svgImages.length).toBe(svgSkills.length);
  });
});
