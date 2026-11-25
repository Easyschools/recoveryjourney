import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CtaBandComponent } from '../components/cta-band/cta-band.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';

@NgModule({
  declarations: [CtaBandComponent, ContactFormComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [CtaBandComponent, ContactFormComponent, CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
