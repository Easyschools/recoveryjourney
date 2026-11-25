import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamComponent } from './team.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TeamComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: TeamComponent }]),
  ],
})
export class TeamModule {}
