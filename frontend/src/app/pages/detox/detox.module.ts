import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetoxComponent } from './detox.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DetoxComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: DetoxComponent }]),
  ],
})
export class DetoxModule {}
