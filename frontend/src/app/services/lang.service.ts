import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LangService {
  lang$ = new BehaviorSubject<'ar' | 'en'>('ar');

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const isEn = e.urlAfterRedirects.startsWith('/en');
      const lang = isEn ? 'en' : 'ar';
      this.lang$.next(lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  get lang(): 'ar' | 'en' {
    return this.lang$.value;
  }

  t(ar: string, en: string): string {
    return this.lang === 'ar' ? ar : en;
  }

  route(path: string): string {
    if (this.lang === 'en') {
      return '/en' + (path === '/' ? '' : path);
    }
    return path;
  }
}
