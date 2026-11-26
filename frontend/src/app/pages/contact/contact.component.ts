import { Component, OnInit } from '@angular/core';
import { PageContentService } from '../../services/page-content.service';
import { LangService } from '../../services/lang.service';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-contact', templateUrl: './contact.component.html', styleUrls: ['./contact.component.scss'] })
export class ContactComponent implements OnInit {
  settings: any;
  constructor(public cms: PageContentService, public lang: LangService, private api: ApiService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }
  ngOnInit() { this.api.getSettings().subscribe(s => this.settings = s); }
}
