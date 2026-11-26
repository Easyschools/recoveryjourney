import { Component } from '@angular/core';
import { PageContentService } from '../../services/page-content.service';
import { LangService } from '../../services/lang.service';

@Component({ selector: 'app-detox', templateUrl: './detox.component.html', styleUrls: ['./detox.component.scss'] })
export class DetoxComponent {
  constructor(public cms: PageContentService, public lang: LangService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }
}
