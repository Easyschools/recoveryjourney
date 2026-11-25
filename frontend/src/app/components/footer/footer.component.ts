import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() settings: any;
  @Input() lang: 'ar' | 'en' = 'ar';
  year = new Date().getFullYear();
  get isAr() { return this.lang === 'ar'; }
  get prefix() { return this.lang === 'en' ? '/en' : ''; }
}
