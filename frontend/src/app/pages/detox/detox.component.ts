import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({ selector: 'app-detox', templateUrl: './detox.component.html', styleUrls: ['./detox.component.scss'] })
export class DetoxComponent {
  constructor(public lang: LangService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }
}
