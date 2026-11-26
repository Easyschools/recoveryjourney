import { Component } from '@angular/core';
import { PageContentService } from '../../services/page-content.service';
import { LangService } from '../../services/lang.service';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-about', templateUrl: './about.component.html', styleUrls: ['./about.component.scss'] })
export class AboutComponent {
  constructor(public cms: PageContentService, public lang: LangService, private api: ApiService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }
}
