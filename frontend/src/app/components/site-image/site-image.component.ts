import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-site-image',
  template: `
    <div [class]="boxClass" [class.has-photo]="url$ | async">
      <img *ngIf="url$ | async as url; else empty" [src]="url" [alt]="label">
      <ng-template #empty>[{{ label }}]</ng-template>
    </div>
  `,
})
export class SiteImageComponent {
  @Input() set slot(value: string) {
    this.url$ = this.api.getImages().pipe(map(images => images[value]));
  }
  @Input() boxClass = 'photo-box';
  @Input() label = '';

  url$?: Observable<string | null>;

  constructor(private api: ApiService) {}
}
