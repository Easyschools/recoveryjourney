import { Component, OnInit } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-services', templateUrl: './services.component.html', styleUrls: ['./services.component.scss'] })
export class ServicesComponent implements OnInit {
  services: any[] = [];
  therapies: any[] = [];
  constructor(public lang: LangService, private api: ApiService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }
  ngOnInit() {
    this.api.getServices().subscribe(s => {
      this.services = s.filter((x: any) => x.type === 'condition');
      this.therapies = s.filter((x: any) => x.type === 'therapy');
    });
  }
}
