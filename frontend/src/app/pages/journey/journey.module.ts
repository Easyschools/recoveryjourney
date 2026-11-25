import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JourneyComponent } from './journey.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [JourneyComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: JourneyComponent }]),
  ],
})
export class JourneyModule {}
