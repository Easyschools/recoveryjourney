import { Component } from '@angular/core';
import { PageContentService } from '../../services/page-content.service';
import { LangService } from '../../services/lang.service';

@Component({ selector: 'app-family', templateUrl: './family.component.html', styleUrls: ['./family.component.scss'] })
export class FamilyComponent {
  constructor(public cms: PageContentService, public lang: LangService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }
  steps = [
    { ar: 'نُطلعكم على الخطوط العامة للخطة العلاجية، بما لا يتعارض مع خصوصية المريض.', en: 'We brief you on the general treatment plan without compromising patient privacy.' },
    { ar: 'نوفر جلسات إرشادية خاصة بكم، تساعدكم على فهم طبيعة الإدمان أو الاضطراب النفسي.', en: 'We provide counseling sessions to help you understand addiction or the mental disorder.' },
    { ar: 'نحدد معكم أفضل شكل للتواصل مع المريض أثناء فترة العلاج.', en: 'We determine the best way to communicate with the patient during treatment.' },
    { ar: 'نبقى على تواصل منتظم معكم لمتابعة سير الأمور، دون كشف تفاصيل يفضّل المريض إبقاءها خاصة.', en: 'We stay in regular contact with you while respecting what the patient prefers to keep private.' },
  ];
}
