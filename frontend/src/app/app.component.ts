import { Component, OnInit } from '@angular/core';
import { LangService } from './services/lang.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header [settings]="settings" [lang]="langService.lang"></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer [settings]="settings" [lang]="langService.lang"></app-footer>
    <!-- Sticky WhatsApp mobile bottom bar -->
    <div class="mobile-bottom-bar" *ngIf="settings">
      <a [href]="'tel:+' + settings.phone" class="bottom-btn call-btn">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.4 11a19.8 19.8 0 01-3.07-8.67A2 2 0 012.3 0h3a2 2 0 012 1.72c.13 1 .36 1.98.7 2.91a2 2 0 01-.45 2.11L6.4 7.84a16 16 0 006.29 6.29l1.1-1.1a2 2 0 012.11-.45c.93.34 1.91.57 2.91.7A2 2 0 0122 16.9z"/></svg>
        {{ lang === 'ar' ? 'اتصل الآن' : 'Call Now' }}
      </a>
      <a [href]="'https://wa.me/' + settings.whatsapp" target="_blank" rel="noopener" class="bottom-btn wa-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 10c0 3 2 5 5 5l1-1.5-2-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2z"/></svg>
        WhatsApp
      </a>
    </div>
  `,
  styles: [`
    .mobile-bottom-bar {
      display: none;
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 100;
      background: var(--navy);
      padding: 10px 16px;
      gap: 10px;
    }
    @media (max-width: 768px) {
      .mobile-bottom-bar { display: flex; }
    }
    .bottom-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px;
      border-radius: var(--pill);
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
    }
    .call-btn { background: white; color: var(--navy); }
    .wa-btn { background: var(--whatsapp); color: white; }
  `]
})
export class AppComponent implements OnInit {
  settings: any;

  constructor(public langService: LangService, private api: ApiService) {}

  get lang() { return this.langService.lang; }

  ngOnInit() {
    this.api.getSettings().subscribe(s => this.settings = s);
  }
}
