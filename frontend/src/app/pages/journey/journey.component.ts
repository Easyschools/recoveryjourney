import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({ selector: 'app-journey', templateUrl: './journey.component.html', styleUrls: ['./journey.component.scss'] })
export class JourneyComponent {
  constructor(public lang: LangService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }
  steps = [
    { num: '01', titleAr: 'مكالمة سرية', titleEn: 'Confidential Call', descAr: 'تبدأ الرحلة بمكالمة هاتفية بسيطة، لا يُطلب فيها من المريض أو أسرته سوى التحدث بصراحة عمّا يمرون به. هذه المكالمة سرية بالكامل.', descEn: 'The journey begins with a simple phone call. All that is asked is to speak honestly about what they are going through. This call is completely confidential.' },
    { num: '02', titleAr: 'التقييم والفحوصات', titleEn: 'Assessment & Tests', descAr: 'يأتي المريض لتقييم شامل، يشمل فحوصات وتحاليل طبية ونفسية، لفهم حالته من كل الجوانب.', descEn: 'The patient comes for a comprehensive assessment including medical and psychological tests to understand their condition from all angles.' },
    { num: '03', titleAr: 'وضع الخطة العلاجية', titleEn: 'Treatment Plan', descAr: 'بناءً على نتائج التقييم، يضع الفريق الطبي خطة علاج مصممة خصيصًا لهذه الحالة، تحدد نوع البرنامج والمدة والخدمات اللازمة.', descEn: 'Based on assessment results, the medical team creates a customized treatment plan specifying the program type, duration, and required services.' },
    { num: '04', titleAr: 'بدء العلاج', titleEn: 'Begin Treatment', descAr: 'يبدأ المريض برنامجه، سواء تضمّن سحب سموم أو لم يتضمّن، مع متابعة يومية من الفريق المختص.', descEn: 'The patient starts their program, with or without detox, with daily follow-up from the specialized team.' },
    { num: '05', titleAr: 'مشاركة الأسرة', titleEn: 'Family Involvement', descAr: 'بالتوازي مع علاج المريض، نُشرك الأسرة بالقدر والشكل المناسبين، بما يدعم المريض دون المساس بخصوصيته.', descEn: 'In parallel with the patient\'s treatment, we involve the family appropriately to support the patient without compromising privacy.' },
    { num: '06', titleAr: 'المتابعة بعد البرنامج', titleEn: 'After-Program Follow-up', descAr: 'بعد انتهاء البرنامج، يستمر التواصل بيننا وبين المريض، لمساعدته على تثبيت ما حققه، والتعامل مع أي تحديات بعد العودة إلى حياته اليومية.', descEn: 'After the program ends, we continue communicating with the patient to help them maintain their achievements and handle challenges in daily life.' },
  ];
}
