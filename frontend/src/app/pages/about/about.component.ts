import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-about', templateUrl: './about.component.html', styleUrls: ['./about.component.scss'] })
export class AboutComponent {
  constructor(public lang: LangService, private api: ApiService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }
}
