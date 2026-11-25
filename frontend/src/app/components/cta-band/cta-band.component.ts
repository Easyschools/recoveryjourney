import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta-band',
  template: `
    <section class="cta-band" [dir]="lang === 'ar' ? 'rtl' : 'ltr'">
      <div class="container cta-inner">
        <div class="cta-text">
          <h2>{{ lang === 'ar' ? 'الخطوة الأولى تبدأ بمكالمة واحدة' : 'The first step starts with one call' }}</h2>
          <p>{{ lang === 'ar' ? 'سرية تامة من أول اتصال. دعنا نستمع إليك.' : 'Complete confidentiality from the first call. Let us listen to you.' }}</p>
        </div>
        <div class="cta-actions">
          <a [routerLink]="lang === 'ar' ? '/contact' : '/en/contact'" class="cta-primary">
            {{ lang === 'ar' ? 'احجز تقييمك السري الآن' : 'Book Your Confidential Assessment' }}
          </a>
          <a [href]="'tel:+' + phone" class="cta-secondary">
            {{ lang === 'ar' ? 'اتصل الآن' : 'Call Now' }}
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-band { background: var(--gold); }
    .cta-inner { padding: 56px 24px; display: flex; flex-wrap: wrap; gap: 28px; align-items: center; justify-content: space-between; }
    .cta-text h2 { margin: 0 0 8px; font-family: 'Noto Naskh Arabic', serif; font-size: clamp(26px, 3vw, 36px); color: var(--navy); }
    .cta-text p { margin: 0; color: var(--navy); opacity: .85; font-size: 17px; }
    .cta-actions { display: flex; flex-wrap: wrap; gap: 12px; }
    .cta-primary { background: var(--navy); color: #fff; text-decoration: none; padding: 14px 28px; border-radius: var(--pill); font-weight: 700; font-size: 17px; min-height: 48px; display: inline-flex; align-items: center; }
    .cta-secondary { background: transparent; border: 2px solid var(--navy); color: var(--navy); text-decoration: none; padding: 14px 26px; border-radius: var(--pill); font-weight: 600; font-size: 17px; min-height: 48px; display: inline-flex; align-items: center; }
  `]
})
export class CtaBandComponent {
  @Input() lang: 'ar' | 'en' = 'ar';
  @Input() phone = '01282662870';
}
