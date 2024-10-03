import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../../environments/environment';
import { of, throwError } from 'rxjs';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FontAwesomeModule,
      ],
      providers: [
        TranslateService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.contactForm.get('name')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('subject')?.value).toBe('');
    expect(component.contactForm.get('message')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.contactForm;
    expect(form.valid).toBeFalsy();

    form.patchValue({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message',
    });

    expect(form.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should validate message length', () => {
    const messageControl = component.contactForm.get('message');
    messageControl?.setValue('Short');
    expect(messageControl?.valid).toBeFalsy();

    messageControl?.setValue('This is a long enough message to be valid.');
    expect(messageControl?.valid).toBeTruthy();
  });

  it('should submit the form when valid', () => {
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message',
    };

    httpClientSpy.post.and.returnValue(of({ success: true }));

    component.contactForm.setValue(formData);
    component.onSubmit();

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${environment.apiUrl}/api/send-email`,
      formData
    );
    expect(component.submitting).toBeFalse();
    expect(component.submitSuccess).toBeTrue();
    expect(component.submitError).toBeFalse();
  });

  it('should handle submission error', () => {
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message',
    };

    httpClientSpy.post.and.returnValue(
      throwError(() => new Error('Network error'))
    );

    component.contactForm.setValue(formData);
    component.onSubmit();

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${environment.apiUrl}/api/send-email`,
      formData
    );
    expect(component.submitting).toBeFalse();
    expect(component.submitSuccess).toBeFalse();
    expect(component.submitError).toBeTrue();
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    expect(httpClientSpy.post).not.toHaveBeenCalled();
    expect(component.submitting).toBeFalse();
  });
});
