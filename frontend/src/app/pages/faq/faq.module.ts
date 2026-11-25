import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: FaqComponent }]),
  ],
})
export class FaqModule {}
