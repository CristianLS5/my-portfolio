import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faEnvelope,
  faHeading,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslateModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  @Input() isDarkMode = false;

  faUser = faUser;
  faEnvelope = faEnvelope;
  faSubject = faHeading;
  faMessage = faMessage;

  contactForm;
  submitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      const formData = this.contactForm.value;

      this.emailService.sendEmail(formData).subscribe({
        next: (response) => {
          console.log('Email sent successfully', response);
          this.submitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error sending email', error);
          this.submitting = false;
          this.submitError = true;
        },
      });
    }
  }
}
