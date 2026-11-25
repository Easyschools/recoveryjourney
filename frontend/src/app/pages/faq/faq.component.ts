import { Component, OnInit } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-faq', templateUrl: './faq.component.html', styleUrls: ['./faq.component.scss'] })
export class FaqComponent implements OnInit {
  faqs: any[] = [];
  constructor(public lang: LangService, private api: ApiService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }
  ngOnInit() { this.api.getFaqs().subscribe(f => this.faqs = f); }
}
