import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ContactComponent }]),
  ],
})
export class ContactModule {}
