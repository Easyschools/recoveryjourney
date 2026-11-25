import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ServicesComponent }]),
  ],
})
export class ServicesModule {}
