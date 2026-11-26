import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { ApiService } from './api.service';
import { LangService } from './lang.service';

@Injectable({ providedIn: 'root' })
export class PageContentService {
  private pages: Record<string, any> = {};

  constructor(private lang: LangService, api: ApiService, router: Router, title: Title, meta: Meta) {
    const url$ = router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(router.url),
    );
    combineLatest([url$, api.getPages()]).subscribe(([url, pages]) => {
      this.pages = Object.fromEntries(pages.map(p => [p.slug, p]));
      const path = url.split(/[?#]/)[0].replace(/^\/en(?=\/|$)/, '');
      const page = this.pages[path.replace(/^\//, '') || 'home'];
      if (!page) return;
      const isEn = /^\/en(\/|$)/.test(url);
      title.setTitle(`${isEn ? page.title_en : page.title_ar} | ${isEn ? 'Recovery Journey' : 'رحلة التعافي'}`);
      const description = isEn ? page.meta_desc_en : page.meta_desc_ar;
      if (description) meta.updateTag({ name: 'description', content: description });
      else meta.removeTag('name="description"');
    });
  }

  /** `id` is "<page slug>.<field key>"; `fallback` is the built-in text. */
  text(id: string, fallback: string): string {
    const [slug, key] = id.split('.');
    return this.pages[slug]?.[`content_${this.lang.lang}`]?.[key] || fallback;
  }
}
