import { Component, OnInit } from '@angular/core';
import { PageContentService } from '../../services/page-content.service';
import { LangService } from '../../services/lang.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  settings: any;
  services: any[] = [];
  therapies: any[] = [];
  faqs: any[] = [];

  constructor(public cms: PageContentService, public lang: LangService, private api: ApiService) {}

  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }

  trustItems: string[] = [];

  steps = [
    { num: '01', titleAr: 'مكالمة سرية', titleEn: 'Confidential Call', descAr: 'تبدأ الرحلة بمكالمة هاتفية بسيطة، لا يُطلب فيها من المريض أو أسرته سوى التحدث بصراحة. هذه المكالمة سرية بالكامل.', descEn: 'The journey begins with a simple phone call. All that is asked is to speak honestly. This call is completely confidential.' },
    { num: '02', titleAr: 'التقييم والفحوصات', titleEn: 'Assessment & Tests', descAr: 'يأتي المريض لتقييم شامل، يشمل فحوصات وتحاليل طبية ونفسية، لفهم حالته من كل الجوانب.', descEn: 'The patient receives a comprehensive assessment including medical and psychological tests to understand their condition from all angles.' },
    { num: '03', titleAr: 'وضع الخطة العلاجية', titleEn: 'Treatment Plan', descAr: 'بناءً على نتائج التقييم، يضع الفريق الطبي خطة علاج مصممة خصيصًا لهذه الحالة.', descEn: 'Based on assessment results, the medical team creates a treatment plan specifically designed for this case.' },
    { num: '04', titleAr: 'بدء العلاج', titleEn: 'Begin Treatment', descAr: 'يبدأ المريض برنامجه، سواء تضمّن سحب سموم أو لم يتضمّن، مع متابعة يومية من الفريق المختص.', descEn: 'The patient starts their program, with or without detox, with daily follow-up from the specialized team.' },
    { num: '05', titleAr: 'مشاركة الأسرة', titleEn: 'Family Involvement', descAr: 'بالتوازي مع علاج المريض، نُشرك الأسرة بالقدر والشكل المناسبين، بما يدعم المريض دون المساس بخصوصيته.', descEn: 'In parallel with the patient\'s treatment, we involve the family in an appropriate way that supports the patient without compromising privacy.' },
    { num: '06', titleAr: 'المتابعة بعد البرنامج', titleEn: 'After-Program Follow-up', descAr: 'بعد انتهاء البرنامج، يستمر التواصل بيننا وبين المريض، لمساعدته على تثبيت ما حققه.', descEn: 'After the program ends, we continue communicating with the patient to help them maintain their achievements.' },
  ];

  familySteps = [
    { ar: 'نُطلعكم على الخطوط العامة للخطة العلاجية، بما لا يتعارض مع خصوصية المريض.', en: 'We brief you on the general treatment plan without compromising patient privacy.' },
    { ar: 'نوفر جلسات إرشادية خاصة بكم، تساعدكم على فهم طبيعة الإدمان أو الاضطراب النفسي.', en: 'We provide counseling sessions specifically for you to understand the nature of addiction or the mental disorder.' },
    { ar: 'نحدد معكم أفضل شكل للتواصل مع المريض أثناء فترة العلاج.', en: 'We determine with you the best way to communicate with the patient during treatment.' },
    { ar: 'نبقى على تواصل منتظم معكم لمتابعة سير الأمور.', en: 'We stay in regular contact with you to follow up on how things are going.' },
  ];

  ngOnInit() {
    this.api.getSettings().subscribe(s => {
      this.settings = s;
      this.trustItems = this.lang.lang === 'ar'
        ? ['خبرة ممتدة منذ 2001', 'سرية تامة في كل تفاصيل التواصل والعلاج', 'فحوصات وتحاليل طبية شاملة', 'مركز سحب سموم تحت إشراف طبي متخصص', 'خطة علاج فردية لكل حالة', 'متابعة مستمرة بعد انتهاء البرنامج']
        : ['Experience since 2001', 'Full confidentiality', 'Comprehensive medical tests', 'Medically supervised detox center', 'Individual treatment plan', 'Continuous post-program follow-up'];
    });
    this.api.getServices().subscribe(s => {
      this.services = s.filter((x: any) => x.type === 'condition');
      this.therapies = s.filter((x: any) => x.type === 'therapy');
    });
    this.api.getFaqs().subscribe(f => this.faqs = f.slice(0, 5));
  }
}
