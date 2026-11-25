import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: AboutComponent }]),
  ],
})
export class AboutModule {}
