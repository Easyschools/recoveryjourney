<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\Page;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::firstOrCreate(
            ['email' => 'admin@recoveryjourney.eg'],
            ['name' => 'Admin', 'password' => Hash::make('Admin@2024!')]
        );

        // Site settings
        $settings = [
            'phone' => '01282662870',
            'whatsapp' => '201282662870',
            'email' => 'Recoveryjourny1@gmail.com',
            'address_ar' => 'فيلا رحلة التعافي للطب النفسي وعلاج الإدمان — طريق الجبل، بجوار مصنع رويال للأعشاب، شبرامنت، الجيزة',
            'address_en' => 'Recovery Journey Villa, Mountain Road, Next to Royal Herbs Factory, Shabramant, Giza',
            'maps_url' => 'https://maps.app.goo.gl/pLyA7bBUvnAxoJd8A',
            'facebook_url' => '',
            'instagram_url' => '',
            'meta_pixel_id' => '',
            'ga4_id' => '',
            'clarity_id' => '',
            'show_team_section' => '1',
            'contact_email' => 'Recoveryjourny1@gmail.com',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::set($key, $value);
        }

        // Pages
        $pages = [
            ['slug' => 'home', 'title_ar' => 'الرئيسية', 'title_en' => 'Home', 'meta_desc_ar' => 'مركز رحلة التعافي للطب النفسي وعلاج الإدمان منذ 2001', 'meta_desc_en' => 'Recovery Journey Psychiatry & Addiction Treatment Center since 2001'],
            ['slug' => 'about', 'title_ar' => 'من نحن', 'title_en' => 'About Us'],
            ['slug' => 'services', 'title_ar' => 'خدماتنا', 'title_en' => 'Our Services'],
            ['slug' => 'detox', 'title_ar' => 'سحب السموم', 'title_en' => 'Detox'],
            ['slug' => 'team', 'title_ar' => 'فريق العمل', 'title_en' => 'Our Team'],
            ['slug' => 'journey', 'title_ar' => 'رحلة العلاج', 'title_en' => 'The Journey'],
            ['slug' => 'family', 'title_ar' => 'للعائلة', 'title_en' => 'For the Family'],
            ['slug' => 'faq', 'title_ar' => 'الأسئلة الشائعة', 'title_en' => 'FAQ'],
            ['slug' => 'contact', 'title_ar' => 'تواصل معنا', 'title_en' => 'Contact Us'],
        ];

        foreach ($pages as $page) {
            Page::firstOrCreate(['slug' => $page['slug']], array_merge($page, ['is_published' => true]));
        }

        // Services (conditions)
        $conditions = [
            ['name_ar' => 'اضطراب تعاطي المواد المخدرة', 'name_en' => 'Substance Use Disorder', 'code' => 'SUD', 'type' => 'condition'],
            ['name_ar' => 'اضطراب الشخصية الحدية', 'name_en' => 'Borderline Personality Disorder', 'code' => 'BPD', 'type' => 'condition'],
            ['name_ar' => 'اضطراب الشخصية المعادية للمجتمع', 'name_en' => 'Antisocial Personality Disorder', 'code' => 'ASPD', 'type' => 'condition'],
            ['name_ar' => 'اضطراب الشخصية النرجسية', 'name_en' => 'Narcissistic Personality Disorder', 'code' => 'NPD', 'type' => 'condition'],
            ['name_ar' => 'اضطراب ثنائي القطب', 'name_en' => 'Bipolar Disorder', 'code' => 'BD', 'type' => 'condition'],
            ['name_ar' => 'الاضطرابات الذهانية', 'name_en' => 'Psychotic Disorders', 'code' => 'UPD', 'type' => 'condition'],
            ['name_ar' => 'الفصام', 'name_en' => 'Schizophrenia', 'code' => 'SCZ', 'type' => 'condition'],
            ['name_ar' => 'فرط الحركة وتشتت الانتباه', 'name_en' => 'ADHD', 'code' => 'ADHD', 'type' => 'condition'],
            ['name_ar' => 'الاكتئاب', 'name_en' => 'Depression', 'code' => 'DEP', 'type' => 'condition'],
            ['name_ar' => 'التشخيص المزدوج', 'name_en' => 'Dual Diagnosis', 'code' => 'DD', 'type' => 'condition'],
            ['name_ar' => 'الوسواس القهري', 'name_en' => 'OCD', 'code' => 'OCD', 'type' => 'condition'],
        ];

        $therapies = [
            ['name_ar' => 'الجلسات الفردية', 'name_en' => 'Individual Sessions', 'code' => 'IS', 'type' => 'therapy'],
            ['name_ar' => 'العلاج الجمعي', 'name_en' => 'Group Therapy', 'code' => 'GTH', 'type' => 'therapy'],
            ['name_ar' => 'برنامج الـ12 خطوة', 'name_en' => '12-Step Program', 'code' => '12 STEPS', 'type' => 'therapy'],
            ['name_ar' => 'العلاج المعرفي السلوكي', 'name_en' => 'Cognitive Behavioral Therapy', 'code' => 'CBT', 'type' => 'therapy'],
            ['name_ar' => 'العلاج الجدلي السلوكي', 'name_en' => 'Dialectical Behavior Therapy', 'code' => 'DBT', 'type' => 'therapy'],
            ['name_ar' => 'العلاج بالقبول والالتزام', 'name_en' => 'Acceptance & Commitment Therapy', 'code' => 'ACT', 'type' => 'therapy'],
            ['name_ar' => 'العلاج المرتكز على الحلول', 'name_en' => 'Solution-Focused Brief Therapy', 'code' => 'SFBT', 'type' => 'therapy'],
            ['name_ar' => 'العلاج بالمخططات', 'name_en' => 'Schema Therapy', 'code' => 'ST', 'type' => 'therapy'],
        ];

        foreach (array_merge($conditions, $therapies) as $i => $s) {
            Service::firstOrCreate(['code' => $s['code'], 'type' => $s['type']], array_merge($s, ['sort_order' => $i, 'is_active' => true]));
        }

        // FAQs
        $faqs = [
            ['question_ar' => 'هل تُعتبر بياناتي وحديثي مع المركز سريين فعلًا؟', 'question_en' => 'Is my data and conversations with the center truly confidential?', 'answer_ar' => 'نعم. كل ما يخص المريض من بيانات ومحادثات يُعامل بسرية تامة، ولا يُشارك مع أي جهة دون موافقته.', 'answer_en' => 'Yes. All patient data and conversations are treated with complete confidentiality and are never shared with any party without their consent.'],
            ['question_ar' => 'كم تستغرق مدة العلاج؟', 'question_en' => 'How long does treatment take?', 'answer_ar' => 'تختلف المدة من حالة لأخرى، بحسب نتائج التقييم واحتياج كل مريض. تُحدَّد المدة التقريبية بعد التقييم الأولي.', 'answer_en' => 'Duration varies from case to case, depending on assessment results and each patient\'s needs. The approximate duration is determined after the initial assessment.'],
            ['question_ar' => 'هل يلزم الإقامة داخل المركز؟', 'question_en' => 'Is inpatient residence required?', 'answer_ar' => 'بعض الحالات تحتاج إقامة، خاصة خلال مرحلة سحب السموم، وبعضها يمكن متابعته دون إقامة. يُحدَّد ذلك بناءً على تقييم الحالة.', 'answer_en' => 'Some cases require inpatient stay, especially during detox. Others can be managed without inpatient care. This is determined based on case assessment.'],
            ['question_ar' => 'ما هو سحب السموم، ولماذا يحتاج إشرافًا طبيًا؟', 'question_en' => 'What is detox, and why does it need medical supervision?', 'answer_ar' => 'هو المرحلة الأولى التي يتوقف فيها الجسم عن المادة المسبِّبة للإدمان. تحتاج إشرافًا طبيًا لأن الأعراض المصاحبة قد تختلف شدتها من شخص لآخر، وتستدعي متابعة صحية دقيقة.', 'answer_en' => 'It is the first stage where the body stops the addictive substance. Medical supervision is needed because withdrawal symptoms can vary in severity and require close health monitoring.'],
            ['question_ar' => 'ما الفحوصات التي سأخضع لها؟', 'question_en' => 'What tests will I undergo?', 'answer_ar' => 'تشمل فحوصات وتحاليل طبية عامة، وأخرى مرتبطة بنوع المادة أو الحالة النفسية، تُحدَّد حسب احتياج كل مريض قبل العلاج وأثناءه.', 'answer_en' => 'General medical tests and substance/condition-specific tests, determined by each patient\'s needs before and during treatment.'],
            ['question_ar' => 'هل ستُخبَر أسرتي بكل تفاصيل حالتي؟', 'question_en' => 'Will my family be told all the details of my condition?', 'answer_ar' => 'لا. نشارك الأسرة بالقدر الذي يوافق عليه المريض أو تقتضيه ضرورة طبية، مع الحفاظ على خصوصيته في التفاصيل الشخصية.', 'answer_en' => 'No. We share with the family only what the patient consents to or medical necessity requires, while maintaining privacy for personal details.'],
            ['question_ar' => 'ما دور أسرتي في العلاج؟', 'question_en' => 'What is my family\'s role in treatment?', 'answer_ar' => 'دور داعم ومنظم، عبر جلسات إرشادية وتواصل دوري معنا، دون تدخل مباشر في تفاصيل جلسات المريض الخاصة.', 'answer_en' => 'A supportive and structured role through counseling sessions and regular communication with us, without direct interference in the patient\'s private sessions.'],
            ['question_ar' => 'هل تتغير خطة علاجي أثناء البرنامج؟', 'question_en' => 'Can my treatment plan change during the program?', 'answer_ar' => 'نعم، إذا استدعت الحالة ذلك. الخطة تُبنى على تقييم مستمر، لا على قرار ثابت لا يتغير.', 'answer_en' => 'Yes, if the case requires it. The plan is built on continuous assessment, not a fixed unchangeable decision.'],
            ['question_ar' => 'ماذا يحدث بعد انتهاء البرنامج؟', 'question_en' => 'What happens after the program ends?', 'answer_ar' => 'نستمر في متابعة المريض بعد خروجه، عبر تواصل دوري، لمساعدته على الحفاظ على ما حققه خلال فترة العلاج.', 'answer_en' => 'We continue following up with the patient after discharge through regular communication to help them maintain their achievements.'],
            ['question_ar' => 'كيف أبدأ؟', 'question_en' => 'How do I start?', 'answer_ar' => 'تكفي مكالمة أولى سرية معنا، نستمع فيها إلى حالتك أو حالة من تهتم بأمره، ونوضح لك الخطوات التالية.', 'answer_en' => 'A single confidential call is enough. We listen to your situation or that of someone you care about and explain the next steps.'],
        ];

        foreach ($faqs as $i => $faq) {
            Faq::firstOrCreate(
                ['question_ar' => $faq['question_ar']],
                array_merge($faq, ['sort_order' => $i, 'is_active' => true])
            );
        }
    }
}
