import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypewriterComponent } from './typewriter.component';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

// Create a test host component
@Component({
  template: '<app-typewriter [strings]="testStrings"></app-typewriter>',
})
class TestHostComponent {
  testStrings = ['Test1', 'Test2', 'Test3'];
}

describe('TypewriterComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [TypewriterComponent, NgxTypedWriterModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the typewriter container', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.query(
      By.css('.typewriter-container')
    );
    expect(container).toBeTruthy();
  });

  it('should render opening and closing brackets', () => {
    fixture.detectChanges();
    const typewriterComponent = fixture.debugElement.query(
      By.directive(TypewriterComponent)
    );
    const brackets = typewriterComponent.queryAll(By.css('.bracket'));
    expect(brackets.length).toBe(2);
    expect(brackets[0].nativeElement.textContent).toBe('[');
    expect(brackets[1].nativeElement.textContent).toBe(']');
  });

  it('should render ngx-typed-writer element', () => {
    fixture.detectChanges();
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter).toBeTruthy();
  });

  it('should pass input strings to ngx-typed-writer', () => {
    fixture.detectChanges();
    const typewriterComponent = fixture.debugElement.query(
      By.directive(TypewriterComponent)
    );
    const typedWriter = typewriterComponent.query(By.css('ngx-typed-writer'));
    expect(typedWriter.properties['strings']).toEqual(component.testStrings);
  });

  it('should set correct typeSpeed on ngx-typed-writer', () => {
    fixture.detectChanges();
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.properties['typeSpeed']).toBe(50);
  });

  it('should set correct backSpeed on ngx-typed-writer', () => {
    fixture.detectChanges();
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.properties['backSpeed']).toBe(30);
  });

  it('should set loop to true on ngx-typed-writer', () => {
    fixture.detectChanges();
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.properties['loop']).toBeTrue();
  });

  it('should set correct cursorChar on ngx-typed-writer', () => {
    fixture.detectChanges();
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.properties['cursorChar']).toBe('|');
  });

  it('should set showCursor to true on ngx-typed-writer', () => {
    fixture.detectChanges();
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.properties['showCursor']).toBeTrue();
  });
});
