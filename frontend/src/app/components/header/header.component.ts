import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() settings: any;
  @Input() lang: 'ar' | 'en' = 'ar';
  menuOpen = false;

  constructor(public router: Router) {}

  get isAr() { return this.lang === 'ar'; }

  get nav() {
    const prefix = this.lang === 'en' ? '/en' : '';
    return [
      { label: this.isAr ? 'الرئيسية' : 'Home', path: prefix || '/' },
      { label: this.isAr ? 'من نحن' : 'About', path: `${prefix}/about` },
      { label: this.isAr ? 'خدماتنا' : 'Services', path: `${prefix}/services` },
      { label: this.isAr ? 'سحب السموم' : 'Detox', path: `${prefix}/detox` },
      { label: this.isAr ? 'فريق العمل' : 'Team', path: `${prefix}/team` },
      { label: this.isAr ? 'رحلة العلاج' : 'Journey', path: `${prefix}/journey` },
      { label: this.isAr ? 'للعائلة' : 'Family', path: `${prefix}/family` },
      { label: this.isAr ? 'الأسئلة الشائعة' : 'FAQ', path: `${prefix}/faq` },
    ];
  }

  get otherLangUrl(): string {
    const url = this.router.url;
    if (this.lang === 'ar') {
      return '/en' + (url === '/' ? '' : url);
    } else {
      return url.replace(/^\/en/, '') || '/';
    }
  }

  isActive(path: string): boolean {
    if (path === '/' || path === '/en') return this.router.url === path;
    return this.router.url.startsWith(path);
  }
}
