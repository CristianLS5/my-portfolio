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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the typewriter container', () => {
    const container = fixture.debugElement.query(
      By.css('.typewriter-container')
    );
    expect(container).toBeTruthy();
  });

  it('should render opening and closing brackets', () => {
    const typewriterComponent = fixture.debugElement.query(
      By.directive(TypewriterComponent)
    );
    const brackets = typewriterComponent.queryAll(By.css('.bracket'));
    expect(brackets.length).toBe(2);
    expect(brackets[0].nativeElement.textContent).toBe('[');
    expect(brackets[1].nativeElement.textContent).toBe(']');
  });

  it('should render ngx-typed-writer element', () => {
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter).toBeTruthy();
  });

  it('should pass input strings to ngx-typed-writer', () => {
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.attributes['ng-reflect-strings']).toBe(
      component.testStrings.toString()
    );
  });

  it('should set correct attributes on ngx-typed-writer', () => {
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));

    expect(typedWriter.attributes['ng-reflect-strings']).toBe(
      component.testStrings.toString()
    );
    expect(typedWriter.attributes['ng-reflect-type-speed']).toBe('50');
    expect(typedWriter.attributes['ng-reflect-back-speed']).toBe('30');
    expect(typedWriter.attributes['ng-reflect-loop']).toBe('true');
    expect(typedWriter.attributes['ng-reflect-cursor-char']).toBe('|');
    expect(typedWriter.attributes['ng-reflect-show-cursor']).toBe('true');
  });

  it('should set correct backSpeed on ngx-typed-writer', () => {
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.attributes['ng-reflect-back-speed']).toBe('30');
  });

  it('should set loop to true on ngx-typed-writer', () => {
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.attributes['ng-reflect-loop']).toBe('true');
  });

  it('should set correct cursorChar on ngx-typed-writer', () => {
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.attributes['ng-reflect-cursor-char']).toBe('|');
  });

  it('should set showCursor to true on ngx-typed-writer', () => {
    const typedWriter = fixture.debugElement.query(By.css('ngx-typed-writer'));
    expect(typedWriter.attributes['ng-reflect-show-cursor']).toBe('true');
  });
});
