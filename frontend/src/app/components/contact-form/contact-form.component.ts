import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() lang: 'ar' | 'en' = 'ar';
  @Input() settings: any;

  form!: FormGroup;
  submitted = false;
  success = false;
  error = false;
  loading = false;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  get isAr() { return this.lang === 'ar'; }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9٠-٩]{10,11}$/)]],
      consultation_for: ['self'],
      message: [''],
      website: [''], // honeypot
      locale: [this.lang],
    });
  }

  get waUrl() {
    const v = this.form.value;
    const msg = this.isAr
      ? `مرحبًا، أود الاستفسار. الاسم: ${v.name || '-'}`
      : `Hello, I'd like to inquire. Name: ${v.name || '-'}`;
    return `https://wa.me/${this.settings?.whatsapp || '201282662870'}?text=${encodeURIComponent(msg)}`;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.loading = true;
    this.error = false;
    this.api.submitContact(this.form.value).subscribe({
      next: () => { this.success = true; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
  }
}
