import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FamilyComponent } from './family.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FamilyComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: FamilyComponent }]),
  ],
})
export class FamilyModule {}
