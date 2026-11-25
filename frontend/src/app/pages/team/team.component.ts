import { Component, OnInit } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { ApiService } from '../../services/api.service';

@Component({ selector: 'app-team', templateUrl: './team.component.html', styleUrls: ['./team.component.scss'] })
export class TeamComponent implements OnInit {
  members: any[] = [];
  constructor(public lang: LangService, private api: ApiService) {}
  get isAr() { return this.lang.lang === 'ar'; }
  get prefix() { return this.lang.lang === 'en' ? '/en' : ''; }

  roles = [
    { titleAr: 'الأطباء النفسيون', titleEn: 'Psychiatrists', descAr: 'يتابعون الجانب النفسي والدوائي إن استدعت الحالة ذلك.', descEn: 'Follow up on the psychological and medication aspects when needed.' },
    { titleAr: 'أطباء علاج الإدمان', titleEn: 'Addiction Physicians', descAr: 'يشرفون على مرحلة سحب السموم والمتابعة الطبية للمريض.', descEn: 'Oversee the detox phase and medical monitoring.' },
    { titleAr: 'الأخصائيون النفسيون', titleEn: 'Psychologists', descAr: 'يقودون الجلسات الفردية والجماعية، ويساعدون المريض على فهم نفسه أكثر.', descEn: 'Lead individual and group sessions.' },
    { titleAr: 'الإشراف الداخلي', titleEn: 'Internal Supervision', descAr: 'متواجد على مدار الساعة لمتابعة الحالة الصحية، خاصة خلال مرحلة سحب السموم.', descEn: 'Available 24/7 to monitor health status, especially during detox.' },
  ];

  ngOnInit() { this.api.getTeam().subscribe(t => this.members = t); }
}
