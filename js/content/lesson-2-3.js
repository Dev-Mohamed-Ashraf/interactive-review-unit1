/* =========================================================
 * content/lesson-2-3.js — الاستجابة للحوادث وإدارة المخاطر
 * Pure data. Sources: textbook 2-3 (EN p.48–54) + memo (Arabic wording,
 * deep dive with the a–d ranking, "comes up in the exam", lesson test).
 * ========================================================= */
RV.lessons.add('2-3', {
  id: '2-3',
  color: '#fb7185',
  cover: 'img/cy-l3-cover.webp',
  title: { ar: 'الاستجابة للحوادث وإدارة المخاطر', en: 'Incident Response and Risk Management' },
  guiding: { ar: 'لما يحصل حادث أمني، المؤسسة تستجيب إزاي بالترتيب — وتقرّر إزاي أنهي مخاطر تعالجها الأول؟', en: 'When a security incident happens, how should an organization respond in order — and how does it decide which risks to address first?' },
  hook: {
    ar: 'حتى النظام المحمي كويس __ممكن يتهاجم__. ولما يحصل حادث — __بيانات تتسرّب، ملفات يتلاعب بيها، أو خدمة توقف__ — رد الفعل __المتسرّع__ بيزوّد الضرر. عشان كده المؤسسات بتمشي على __استجابة واضحة ومرتّبة__، وبتقرّر __من بدري__ أنهي مخاطر تحرسها الأول، لأن مفيش فريق يقدر يصلّح كل حاجة مرة واحدة.',
    en: 'Even a well-protected system __can be attacked__. When an incident happens — __data leaked, files tampered with, a service knocked offline__ — a __rushed__ reaction makes it worse. So organizations follow __a clear, ordered response__ and decide __in advance__ which risks to guard first, because no team can fix everything at once.',
  },
  keyFact: { ar: 'الاستجابة للحوادث بتمشي في __تسلسل عام من ست مراحل__ مع إمكانية تداخل بعض الأنشطة أو الرجوع لمرحلة سابقة، وتقييم المخاطر بيحدّد الأولويات حسب __التأثير × الاحتمالية__.', en: 'Incident response follows __six ordered stages__, and risk assessment prioritizes risks by __impact × likelihood__ — so the organization acts in the right order and on the right risks first.' },
  concepts: ['security incident', 'the six stages', 'containment', 'eradication', 'risk = impact × likelihood'],
  objectives: [
    { ar: 'أشرح المراحل العامة للاستجابة للحوادث والغرض من كل مرحلة.', en: 'Explain what a security incident is and describe the stages of incident response in the correct order.' },
    { ar: 'أستخدم التأثير والاحتمالية لتحديد أولويات المخاطر في النموذج المبسط للدرس.', en: 'Apply risk assessment by prioritizing risks according to their impact and likelihood.' },
    { ar: 'أصمم استجابة مبررة لحادث أمني، وأربط إجراءات الاستجابة بالضوابط الوقائية المناسبة.', en: 'Design a justified response to a security incident and link response actions to suitable preventive controls.' },
  ],

  stations: [
    /* ───────────── 1 · security incidents + the six stages ───────────── */
    {
      id: 'incident', kind: 'learn',
      title: { ar: 'الحادث الأمني ومراحل الاستجابة الست', en: 'Security incidents and the six stages' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'جهاز في المدرسة اتصاب ببرنامج فدية وقفل الملفات. إيه أول حاجة تعملها؟', en: 'A school PC is hit by ransomware that locks the files. What do you do first?' },
            options: [
              { emoji: '💾', text: { ar: 'أرجّع النسخة الاحتياطية على طول', en: 'Restore the backup right away' } },
              { emoji: '🔌', text: { ar: 'أفصل الجهاز عن الشبكة', en: 'Disconnect the PC from the network' } },
              { emoji: '💸', text: { ar: 'أدفع الفدية', en: 'Pay the ransom' } },
            ],
            after: { ar: 'افتكر إجابتك… القصة الجاية هتوضّح الترتيب الصح 🎬', en: 'Remember your answer… the next story shows the right order 🎬' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'يعني إيه «حادث أمني»؟', en: 'What is a "security incident"?' },
          enTitle: 'Security incident',
          terms: ['information leak', 'data tampering', 'service outage'],
          visual: { anim: 'incidentTypes' },
          beats: [
            { ar: '**الحادث الأمني:** حدث __بيأثر في سرية المعلومات أو سلامتها أو توافرها__، أو يهددها بجدية، أو يخالف سياسة أمنية. النوع الأول: **تسرّب المعلومات** — معلومات شخصية أو سرّية بتتسرّب لبره.', en: '**Security incident:** a situation where __actual damage__ occurs due to an information-security problem. Type 1: **information leak** — personal or confidential information leaks outside.' },
            { ar: 'النوع التاني: **التلاعب بالبيانات** — بيانات جوّه النظام __بتتعدّل من غير تصريح__ (رصيد 500 بقى 5,000!).', en: 'Type 2: **data tampering** — data inside the system is __altered without authorization__ (a balance of 500 becomes 5,000!).' },
            { ar: 'النوع التالت: **انقطاع الخدمة** — الخدمة __مابقتش متاحة__ بسبب هجوم على الخادم ونحوه.', en: 'Type 3: **service outage** — a service __becomes unavailable__ due to an attack on the server, etc.' },
            { ar: '✋ **مش حادث:** تحديث برمجي لإضافة ميزات جديدة — __مفيش ضرر__، فمش حادث أمني.', en: '✋ **Not an incident:** a software update adding new features — __no damage__, so not a security incident.' },
          ],
          notes: [{ kind: 'exam', text: { ar: '«تحديث برمجي لإضافة ميزات جديدة» ← __ليس__ حادثًا أمنيًا. أما تشفير الملفات ببرنامج فدية، تسريب بيانات العملاء، انقطاع خدمة بهجوم ← حوادث.', en: '"A software update adding features" → __not__ an incident. Ransomware encryption, a customer-data leak, an outage from an attack → incidents.' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: الاستجابة لبرنامج فدية مشهد بمشهد', en: '🎞️ Full animation: responding to ransomware scene by scene' },
          enTitle: 'Incident response, scene by scene',
          terms: ['preparation', 'detection', 'containment', 'eradication', 'recovery', 'prevention of recurrence'],
          visual: { anim: 'incidentMovie' },
          beats: [
            { ar: '**① التحضير:** قبل أي حادث — __خطة استجابة مكتوبة__ + __فريق__ + __نسخ احتياطية__ جاهزة.', en: '**① Preparation:** before anything happens — a __written response plan__ + a __team__ + ready __backups__.' },
            { ar: '**② الاكتشاف:** __اكتشاف وقوع الحادث وتأكيده__ — الملفات اتشفّرت ومكتوب «ادفع الفدية» 😱، والبرنامج بدأ ينتقل لجهاز تاني.', en: '**② Detection:** __discover and confirm the incident__ — files encrypted with a "pay the ransom" note 😱, and the malware starts moving to another PC.' },
            { ar: '**③ الاحتواء:** __نحدّ من نطاق التأثير__ علشان الضرر مايتنشرش — __نفصل الأجهزة المصابة عن الشبكة__ 🔌، والجهاز التالت يفضل سليم.', en: '**③ Containment:** __limit the scope of impact__ so the damage does not spread — __disconnect the infected PCs__ 🔌, and the third PC stays clean.' },
            { ar: '**④ الاستئصال (إزالة التهديد):** __نشيل التهديد ومسبباته__ — نمسح البرنامج الخبيث 🧹 ونعالج الثغرة المستغلة. (الملفات لسه مقفولة… دي شغلانة المرحلة الجاية.)', en: '**④ Eradication:** __remove the cause__ itself — delete the malware 🧹. (The files are still locked… that is the next stage’s job.)' },
            { ar: '**⑤ الاستعادة:** __نرجّع الأنظمة والخدمات لحالة تشغيل آمنة وطبيعية__ من __نسخة احتياطية نضيفة__ ♻️ — والتحضير هو اللي خلّى النسخة دي موجودة.', en: '**⑤ Recovery:** __return systems and services to normal__ from a __clean backup__ ♻️ — preparation is what made that backup exist.' },
            { ar: '**⑥ الدروس المستفادة والتحسين:** __نحلّل اللي حصل__ (إيميل احتيال + ثغرة)، __نوثّق الدروس__، ونحسّن الضوابط علشان __نقلّل احتمال التكرار وأثره__: تحديث الأجهزة + تدريب الموظفين 🛡️.', en: '**⑥ Prevention of recurrence:** __analyze the cause__ (phishing email + a hole) and act so __the same incident never repeats__: patch the PCs + train the staff 🛡️.' },
            { ar: '❌ **لو الترتيب اتلخبط:** الاستعادة __قبل__ الاستئصال = السبب لسه موجود ← البرنامج يرجع ينتشر و__الحادث يتكرر__.', en: '❌ **Out of order:** recovery __before__ eradication = the cause is still there → the malware spreads again and __the incident repeats__.' },
            { ar: '📌 **الخلاصة:** تحضير ← اكتشاف ← احتواء ← استئصال ← استعادة ← الدروس المستفادة والتحسين. الاحتواء __قبل__ الاستئصال، والاستئصال __قبل__ الاستعادة. وده __نموذج تعليمي مبسط__: بعض الأنشطة ممكن تتداخل أو تتكرر، والاستعادة ممكن تكشف بقايا للتهديد تستلزم الرجوع للاحتواء أو إزالة التهديد.', en: '📌 **The point:** preparation → detection → containment → eradication → recovery → prevention. Contain __before__ eradicating, eradicate __before__ recovering.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'order', prompt: { ar: 'رتّب مراحل الاستجابة للحوادث:', en: 'Put the incident-response stages in order:' },
            items: [{ ar: 'التحضير', en: 'Preparation' }, { ar: 'الاكتشاف', en: 'Detection' }, { ar: 'الاحتواء', en: 'Containment' }, { ar: 'الاستئصال', en: 'Eradication' }, { ar: 'الاستعادة', en: 'Recovery' }, { ar: 'الدروس المستفادة والتحسين', en: 'Prevention of recurrence' }],
            explain: { ar: 'تحضير ← اكتشاف ← احتواء ← استئصال ← استعادة ← الدروس المستفادة والتحسين.', en: 'Prepare → detect → contain → eradicate → recover → prevent.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'classify', prompt: { ar: 'كل تصرّف تبع أنهي مرحلة؟', en: 'Which stage does each action belong to?' },
            groups: [{ icon: 'book', label: { ar: 'التحضير', en: 'Preparation' } }, { icon: 'plug', label: { ar: 'الاحتواء', en: 'Containment' } }, { icon: 'bug', label: { ar: 'الاستئصال', en: 'Eradication' } }, { icon: 'shield', label: { ar: 'الدروس المستفادة والتحسين', en: 'Prevention' } }],
            items: [
              { text: { ar: 'كتابة خطة استجابة قبل أي مشكلة', en: 'Writing a response plan before any problem' }, group: 0 },
              { text: { ar: 'فصل جهاز مصاب عن الشبكة', en: 'Disconnecting an infected PC' }, group: 1 },
              { text: { ar: 'مسح البرنامج الخبيث', en: 'Removing the malware' }, group: 2 },
              { text: { ar: 'تحليل السبب وتدريب الموظفين', en: 'Analyzing the cause and training staff' }, group: 3 },
            ],
            explain: { ar: 'خطة مسبقة ← تحضير · فصل الجهاز ← احتواء · مسح البرنامج ← استئصال · تحليل وتدريب ← الدروس المستفادة والتحسين.', en: 'Plan → preparation · isolate → containment · delete malware → eradication · analyze + train → prevention.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (3)', en: '✋ Check yourself (3)' },
          q: { widget: 'mcq', prompt: { ar: 'فريق رجّع النسخة الاحتياطية فورًا من غير ما يمسح البرنامج الخبيث. إيه المتوقّع؟', en: 'A team restored the backup at once without removing the malware. What is likely?' },
            options: [
              { ar: 'الحادث ممكن يرجع لأن السبب موجود', en: 'The incident returns because the cause remains' },
              { ar: 'كل حاجة هتبقى تمام لأن الملفات رجعت', en: 'All is fine because the files are back' },
              { ar: 'البرنامج الخبيث هيتمسح لوحده مع الاستعادة', en: 'The malware deletes itself during recovery' },
              { ar: 'الاستعادة بتمنع أي هجوم جديد للأبد', en: 'Recovery blocks every future attack forever' },
            ],
            answer: 0,
            explain: { ar: 'الاستعادة __قبل__ الاستئصال = السبب لسه موجود ← الحادث ممكن يتكرر.', en: 'Recovery __before__ eradication = the cause remains → the incident repeats.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**الحادث الأمني:** حدث بيأثر في سرية المعلومات أو سلامتها أو توافرها ← تسرّب معلومات · تلاعب بالبيانات · انقطاع خدمة.', en: '**Security incident:** actual damage from an infosec problem → information leak · data tampering · service outage.' },
            { ar: '**المراحل الست بالترتيب:** تحضير ← اكتشاف ← احتواء ← استئصال ← استعادة ← الدروس المستفادة والتحسين.', en: '**Six stages in order:** preparation → detection → containment → eradication → recovery → prevention of recurrence.' },
            { ar: 'الاحتواء = وقف الانتشار · الاستئصال = شيل السبب · الاستعادة قبل الاستئصال ← الحادث يرجع.', en: 'Containment = stop the spread · eradication = remove the cause · recovery before eradication → it returns.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · risk assessment ───────────── */
    {
      id: 'risk', kind: 'learn',
      title: { ar: 'تقييم المخاطر: التأثير × الاحتمالية', en: 'Risk assessment: impact × likelihood' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'مدرسة قدامها خطرين: هجوم فدية تاني، وانقطاع كهربا قصير. تبدأ بأنهي؟', en: 'A school faces two risks: another ransomware attack, and a short power cut. Which first?' },
            options: [
              { emoji: '🦠', text: { ar: 'هجوم الفدية', en: 'The ransomware attack' } },
              { emoji: '🔌', text: { ar: 'انقطاع الكهربا', en: 'The power cut' } },
              { emoji: '⚖️', text: { ar: 'الاتنين مع بعض', en: 'Both at once' } },
            ],
            after: { ar: 'الإجابة الصح بتيجي من معادلة بسيطة 👇', en: 'The right answer comes from a simple formula 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'مصفوفة تقييم المخاطر', en: 'The risk evaluation matrix' },
          enTitle: 'Risk Evaluation Matrix',
          terms: ['risk', 'impact', 'likelihood'],
          visual: { anim: 'riskMatrix' },
          beats: [
            { ar: '**الخطر (المخاطرة):** احتمال إن يقع حدث يسبب ضرر، مع مراعاة __احتمال وقوعه وحجم أثره__. وفي الدرس بنستخدم __طريقة مبسطة__: `درجة الخطر = درجة التأثير × درجة الاحتمالية`. **التأثير** = قد إيه الضرر لو حصلت · **الاحتمالية** = قد إيه احتمال إنها تحصل فعلًا.', en: '**Risk:** the possibility of a __future__ information-security problem, and its impact. Its size: `Risk size = Impact × Likelihood`. **Impact** = how much damage if it happens · **Likelihood** = how probable it is.' },
            { ar: 'مثال الكتاب: ندي كل واحد درجة من 1 لـ 3 (كبير/عالية = 3 · متوسط = 2 · صغير/منخفضة = 1). (a) كبير × عالية · (b) صغير × عالية · (c) كبير × منخفضة · (d) صغير × منخفضة.', en: 'Textbook example: score each 1–3. (a) large 3 × high 3 · (b) small 1 × high 3 · (c) large 3 × medium 2 · (d) small 1 × low 1.' },
            { ar: 'نضرب: a = __9__ · b = __3__ · c = __3__ · d = __1__ ⇐ الترتيب: **a الأول، وd الأخير، وb وc متساويتين** — وترتيبهم بيعتمد على السياق والضوابط المتاحة. المخاطر اللي __تأثيرها واحتماليتها عاليين__ تتعالج __الأول__.', en: 'Multiply: a = __9__ · c = __6__ · b = __3__ · d = __1__ ⇒ order: **a > c > b > d**. Risks with __high impact and high likelihood__ come __first__.' },
            { ar: 'جرّب بنفسك 🎚️: حرّك التأثير والاحتمالية وشوف حجم المخاطرة وخانتها. ولأن معالجة كل المخاطر __مرة واحدة صعبة__، لازم __نرتّب الأولويات__ ونشتغل بنظام.', en: 'Try it 🎚️: move impact and likelihood and watch the risk size and its cell. Since fixing all risks __at once is hard__, we must __set priorities__ and work systematically.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«حجم المخاطرة بيتحدّد بالتأثير لوحده» ← __غلط__ (التأثير × الاحتمالية). و«لازم نعالج كل المخاطر في نفس الوقت» ← __غلط__.', en: '"Risk size depends on impact alone" → __false__ (impact × likelihood). "All risks must be fixed at once" → __false__.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'order', prompt: { ar: 'رتّب المخاطر من الأعلى أولوية للأقل (التأثير × الاحتمالية):', en: 'Order the risks from highest to lowest priority (impact × likelihood):' },
            items: [
              { ar: 'تأثير 3 × احتمالية 3', en: 'impact 3 × likelihood 3' },
              { ar: 'تأثير 3 × احتمالية 2', en: 'impact 3 × likelihood 2' },
              { ar: 'تأثير 1 × احتمالية 3', en: 'impact 1 × likelihood 3' },
              { ar: 'تأثير 1 × احتمالية 1', en: 'impact 1 × likelihood 1' },
            ],
            explain: { ar: '9 > 6 > 3 > 1: الأعلى في حاصل الضرب أولوية الأول.', en: '9 > 6 > 3 > 1 → a > c > b > d.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'خطر تأثيره 2 واحتماليته 3، وخطر تاني تأثيره 3 واحتماليته 1. أنهي يتعالج الأول؟', en: 'Risk X: impact 2, likelihood 3. Risk Y: impact 3, likelihood 1. Which comes first?' },
            options: [
              { ar: 'X لأن حجمه 6 أكبر من 3', en: 'X, because its size 6 beats 3' },
              { ar: 'Y لأن تأثيره هو الأكبر', en: 'Y, because its impact is larger' },
              { ar: 'الاتنين نفس الأولوية بالضبط', en: 'Both have exactly equal priority' },
              { ar: 'مش مهم الترتيب في المخاطر', en: 'Order does not matter for risks' },
            ],
            answer: 0,
            explain: { ar: 'X = 2 × 3 = __6__ · Y = 3 × 1 = __3__ ← X الأول. التأثير __لوحده__ مش كفاية.', en: 'X = 2 × 3 = __6__ · Y = 3 × 1 = __3__ → X first. Impact __alone__ is not enough.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**الخطر:** احتمال حدث يسبب ضرر، مع مراعاة احتماله وحجم أثره · `درجة الخطر = درجة التأثير × درجة الاحتمالية`.', en: '**Risk:** possibility of a future infosec problem + its impact · `risk size = impact × likelihood`.' },
            { ar: 'التأثير = قد إيه الضرر · الاحتمالية = قد إيه ممكن تحصل.', en: 'Impact = how much damage · likelihood = how probable.' },
            { ar: 'نعالج __التأثير العالي + الاحتمالية العالية__ الأول، وترتيب الباقي حسب درجات المصفوفة والسياق والضوابط المتاحة.', en: 'Handle __high impact + high likelihood__ first and prioritize (a > c > b > d).' },
          ],
        },
      ],
    },

    /* ───────────── 3 · worked examples ───────────── */
    {
      id: 'worked', kind: 'example',
      title: { ar: 'أمثلة الكتاب المحلولة', en: 'Textbook worked examples' },
      steps: [
        {
          type: 'example',
          q: { widget: 'tf', prompt: { ar: '(1) ضع ✓ للصحيحة و✗ للخاطئة:', en: '(1) Mark ✓ if true or ✗ if false:' }, items: [
            { text: { ar: 'A) الحادث الأمني حدث بيأثر في سرية المعلومات أو سلامتها أو توافرها، أو يهددها بجدية، أو يخالف سياسة أمنية.', en: 'A) A security incident is a situation where actual damage occurs due to an infosec problem.' }, answer: true },
            { text: { ar: 'B) في الاستجابة للحوادث، مهم نمنع انتشار الضرر الأول قبل ما نشيل السبب.', en: 'B) In incident response, it is important to stop the spread first, before removing the cause.' }, answer: true },
            { text: { ar: 'C) حجم المخاطرة ممكن يتحدّد بالتأثير لوحده.', en: 'C) Risk size can be determined by impact alone.' }, answer: false },
            { text: { ar: 'D) المرحلة الأخيرة في الاستجابة للحوادث هي الدروس المستفادة والتحسين.', en: 'D) The final stage of incident response is prevention of recurrence.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) التعريف الصحيح ← **✓**.', en: 'A) Correct definition → **✓**.' },
            { ar: 'B) الاحتواء (منع الانتشار) قبل الاستئصال (شيل السبب) ← **✓**.', en: 'B) Containment (stop the spread) comes before eradication (remove the cause) → **✓**.' },
            { ar: 'C) حجم المخاطرة = __التأثير والاحتمالية مع بعض__ ← **✗**.', en: 'C) Risk size = __impact and likelihood together__ → **✗**.' },
            { ar: 'D) آخر مرحلة من الست = الدروس المستفادة والتحسين ← **✓**.', en: 'D) The last of the six stages = prevention of recurrence → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) كل بند (a–d) تبع أنهي مرحلة (A–D)؟', en: '(2) Which stage (A–D) does each item (a–d) belong to?' },
            left: [
              { ar: 'a) وضع إجراءات الاستجابة مسبقًا استعدادًا للحوادث', en: 'a) Establishing response procedures in advance' },
              { ar: 'b) فصل جهاز مصاب ببرنامج خبيث عن الشبكة', en: 'b) Disconnecting a malware-infected computer from the network' },
              { ar: 'c) إزالة إصابة البرنامج الخبيث', en: 'c) Removing the malware infection' },
              { ar: 'd) تحليل السبب واتخاذ تدابير علشان نفس الحادث مايتكررش', en: 'd) Analyzing the cause so the same incident does not recur' },
            ],
            right: [{ ar: 'A التحضير', en: 'A Preparation' }, { ar: 'B الاحتواء', en: 'B Containment' }, { ar: 'C الاستئصال', en: 'C Eradication' }, { ar: 'D الدروس المستفادة والتحسين', en: 'D Prevention of recurrence' }],
            answer: [0, 1, 2, 3] },
          solution: [
            { ar: 'a: الاستعداد مسبقًا = **التحضير** ← A.', en: 'a: preparing in advance = **preparation** → A.' },
            { ar: 'b: الفصل علشان الضرر مايتنشرش = **الاحتواء** ← B.', en: 'b: disconnecting to stop the spread = **containment** → B.' },
            { ar: 'c: مسح البرنامج الخبيث = **الاستئصال** ← C.', en: 'c: removing malware = **eradication** → C.' },
            { ar: 'd: تحليل السبب والتدابير = **الدروس المستفادة والتحسين** ← D.', en: 'd: cause analysis and measures = **prevention of recurrence** → D.' },
          ],
        },
      ],
    },

    /* ───────────── 4 · textbook practice ───────────── */
    {
      id: 'practice', kind: 'practice',
      title: { ar: 'تدريبات الكتاب (Try + Exercise)', en: 'Textbook practice (Try + Exercise)' },
      steps: [
        {
          type: 'quiz', title: { ar: 'تمرين 1', en: 'Try 1' },
          q: { widget: 'recall', prompt: { ar: 'جاوب في دماغك وبعدين اكشف:', en: 'Answer in your head, then reveal:' }, items: [
            { q: { ar: '1. اسم الحدث اللي بيأثر في سرية المعلومات أو سلامتها أو توافرها، أو يهددها بجدية؟', en: '1. A situation where actual damage occurs due to an infosec problem?' }, a: { ar: 'الحادث الأمني', en: 'A security incident' } },
            { q: { ar: '2. اذكر مراحل الاستجابة للحوادث الست بالترتيب.', en: '2. Name the six stages in order.' }, a: { ar: 'تحضير ← اكتشاف ← احتواء ← استئصال ← استعادة ← الدروس المستفادة والتحسين', en: 'preparation → detection → containment → eradication → recovery → prevention of recurrence' } },
            { q: { ar: '3. العاملين اللي بيحدّدوا حجم المخاطرة؟', en: '3. The two factors that determine risk size?' }, a: { ar: 'التأثير والاحتمالية', en: 'Impact and likelihood' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي **مش** مثال مناسب على حادث أمني:', en: 'Choose the one that is **NOT** a security incident:' },
            options: [
              { ar: 'البيانات اتشفّرت بسبب إصابة ببرنامج فدية', en: 'Data was encrypted by a ransomware infection' },
              { ar: 'معلومات العملاء اتسرّبت عبر وصول غير مصرّح', en: 'Customer data leaked via unauthorized access' },
              { ar: 'عمل تحديث برمجي لإضافة ميزات جديدة', en: 'A software update was done to add new features' },
              { ar: 'خدمة ويب وقفت بسبب هجوم على الخادم', en: 'A web service went down due to an attack' },
            ],
            answer: 2,
            explain: { ar: 'التحديث لإضافة ميزات __مفيهوش ضرر__ ← مش حادث.', en: 'An update adding features causes __no damage__ → not an incident.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار أنسب وصف لمفهوم تقييم المخاطر:', en: 'Choose the best description of risk assessment:' },
            options: [
              { ar: 'كفاية نعالج المخاطر اللي تأثيرها كبير بس', en: 'It is enough to handle only large-impact risks' },
              { ar: 'كفاية نعالج المخاطر اللي احتماليتها عالية بس', en: 'It is enough to handle only high-likelihood risks' },
              { ar: 'نعالج الأول اللي تأثيره واحتماليته عاليين مع بعض', en: 'Handle first the risks high in both impact and likelihood' },
              { ar: 'لازم نعالج كل المخاطر في نفس الوقت', en: 'All risks must be handled at the same time' },
            ],
            answer: 2,
            explain: { ar: 'الأولوية للتأثير العالي __و__ الاحتمالية العالية مع بعض.', en: 'Priority goes to high impact __and__ high likelihood together.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(e):', en: 'Read and fill blanks (a)–(e):' },
            text: { ar: 'الحدث اللي بيأثر في سرية المعلومات أو سلامتها أو توافرها، أو يهددها بجدية، اسمه {0}. وفي نموذج الدرس بنستخدم {1} للحد من انتشار الضرر، وبعده {2} لإزالة التهديد ومسبباته، وبعدها {3} لإعادة الأنظمة والخدمات، وأخيرًا {4} لتحليل اللي حصل وتحسين الحماية.', en: 'A situation where actual damage occurs due to an infosec problem is called {0}. When it occurs, {1}, which prevents the spread, is done first, followed by {2}, which removes the cause. After that, {3} returns the system to normal, and finally {4} analyzes the cause to prevent recurrence.' },
            bank: [{ ar: 'حادث أمني', en: 'a security incident' }, { ar: 'الاحتواء', en: 'containment' }, { ar: 'الاستئصال', en: 'eradication' }, { ar: 'الاستعادة', en: 'recovery' }, { ar: 'الدروس المستفادة والتحسين', en: 'prevention of recurrence' }, { ar: 'التحضير', en: 'preparation' }],
            answer: [0, 1, 2, 3, 4],
            explain: { ar: '(a) حادث أمني (b) الاحتواء (c) الاستئصال (d) الاستعادة (e) الدروس المستفادة والتحسين.', en: '(a) security incident (b) containment (c) eradication (d) recovery (e) prevention of recurrence.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'order', prompt: { ar: 'رتّب المخاطر (a–d) من الأعلى أولوية للأقل:', en: 'Order risks (a–d) from highest to lowest priority:' },
            items: [
              { ar: 'a) تأثير كبير (3)، احتمالية عالية (3)', en: 'a) impact large (3), likelihood high (3)' },
              { ar: 'c) تأثير كبير (3)، احتمالية متوسطة (2)', en: 'c) impact large (3), likelihood medium (2)' },
              { ar: 'b) تأثير صغير (1)، احتمالية عالية (3)', en: 'b) impact small (1), likelihood high (3)' },
              { ar: 'd) تأثير صغير (1)، احتمالية منخفضة (1)', en: 'd) impact small (1), likelihood low (1)' },
            ],
            explain: { ar: 'a = 9 · c = 6 · b = 3 · d = 1. ⚠️ في تمرين الكتاب c احتماليتها __منخفضة__، فتبقى c = 3 زي b: الترتيب a، بعدين b وc متساويتين، بعدين d — ونذكر إن ترتيبهم محتاج معلومات زيادة.', en: 'a = 9 · c = 6 · b = 3 · d = 1 → a > c > b > d.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأدق للتسلسل العام في الاستجابة للحوادث:', en: 'Choose the correct order of incident response:' }, fixedOrder: true,
            options: [
              { ar: 'اكتشاف ← تحضير ← استئصال ← احتواء ← استعادة ← الدروس المستفادة والتحسين', en: 'Detection → Preparation → Eradication → Containment → Recovery → Prevention' },
              { ar: 'تحضير ← اكتشاف ← احتواء ← استئصال ← استعادة ← الدروس المستفادة والتحسين', en: 'Preparation → Detection → Containment → Eradication → Recovery → Prevention' },
              { ar: 'تحضير ← اكتشاف ← استعادة ← احتواء ← استئصال ← الدروس المستفادة والتحسين', en: 'Preparation → Detection → Recovery → Containment → Eradication → Prevention' },
              { ar: 'احتواء ← اكتشاف ← استئصال ← استعادة ← الدروس المستفادة والتحسين ← تحضير', en: 'Containment → Detection → Eradication → Recovery → Prevention → Preparation' },
            ],
            answer: 1,
            explain: { ar: 'الترتيب الكامل: تحضير ← اكتشاف ← احتواء ← استئصال ← استعادة ← الدروس المستفادة والتحسين.', en: 'Full order: preparation → detection → containment → eradication → recovery → prevention.' } },
        },
      ],
    },

    /* ───────────── 5 · key terms ───────────── */
    {
      id: 'terms', kind: 'flash',
      title: { ar: 'كروت المصطلحات', en: 'Key-term cards' },
      steps: [{
        type: 'quiz',
        q: { widget: 'flash', cards: [
          { front: { ar: 'الحادث الأمني', en: 'Security incident' }, back: { ar: 'حدث بيأثر في سرية المعلومات أو سلامتها أو توافرها، أو يهددها بجدية، أو يخالف سياسة أمنية.', en: 'A situation where actual damage occurs due to an infosec problem.' } },
          { front: { ar: 'التحضير', en: 'Preparation' }, back: { ar: 'وضع إجراءات وهياكل الاستجابة مسبقًا.', en: 'Setting up response procedures and structures in advance.' } },
          { front: { ar: 'الاكتشاف', en: 'Detection' }, back: { ar: 'اكتشاف وقوع الحادث وتأكيده.', en: 'Discovering and confirming an incident.' } },
          { front: { ar: 'الاحتواء', en: 'Containment' }, back: { ar: 'الحد من انتشار الضرر (عزل الجهاز).', en: 'Limiting the spread of damage (isolating the machine).' } },
          { front: { ar: 'الاستئصال', en: 'Eradication' }, back: { ar: 'إزالة التهديد ومسبباته (حذف البرمجيات الخبيثة ومعالجة الثغرة المستغلة).', en: 'Removing the cause (e.g. deleting malware).' } },
          { front: { ar: 'الاستعادة', en: 'Recovery' }, back: { ar: 'إرجاع الأنظمة والخدمات لحالة تشغيل آمنة وطبيعية (ممكن من نسخة احتياطية سليمة).', en: 'Returning systems and services to normal.' } },
          { front: { ar: 'الدروس المستفادة والتحسين', en: 'Prevention of recurrence' }, back: { ar: 'تحليل ما حدث وتوثيق الدروس وتحسين الضوابط لتقليل احتمال التكرار وأثره.', en: 'Analyzing the cause and acting so it does not recur.' } },
          { front: { ar: 'المخاطرة', en: 'Risk' }, back: { ar: 'احتمال إن يقع حدث يسبب ضرر، مع مراعاة احتماله وحجم أثره: التأثير × الاحتمالية.', en: 'The possibility of a future problem and its impact: impact × likelihood.' } },
          { front: { ar: 'التأثير', en: 'Impact' }, back: { ar: 'مقدار الضرر لو المخاطرة حصلت.', en: 'How much damage if the risk happens.' } },
          { front: { ar: 'الاحتمالية', en: 'Likelihood' }, back: { ar: 'مدى احتمال حدوث المخاطرة فعلًا.', en: 'How probable the risk is.' } },
        ] },
      }],
    },

    /* ───────────── 6 · think like an engineer + essays ───────────── */
    {
      id: 'think', kind: 'challenge',
      title: { ar: 'فكّر كمهندس + السؤال المقالي', en: 'Think like an engineer + essay' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', marks: 6, tag: { ar: 'سؤال بنمط الامتحان · 6 درجات', en: 'Exam-style · 6 marks' },
            prompt: { ar: 'اشرح أهمية التسلسل العام لمراحل الاستجابة للحوادث، مستخدمًا الاحتواء والاستئصال والاستعادة كمثال، ووضّح ليه الاستجابة الفعلية ممكن تحتاج ترجع لمرحلة سابقة. (استعن بـ: إيه اللي يحصل لو بدأت الاستعادة قبل إزالة السبب)', en: 'Explain why the six stages must be carried out in order, using recovery and eradication as an example. (Refer to: what happens if the cause is not removed)' },
            points: [
              { ar: 'كل مرحلة بتجهّز للي بعدها.', en: 'Each stage prepares for the next.' },
              { ar: 'لو استعدنا قبل الاستئصال، السبب (البرنامج الخبيث/الثغرة) لسه موجود.', en: 'Recovering before eradicating leaves the cause (malware/hole) in place.' },
              { ar: 'فالحادث نفسه ممكن يتكرر ويضيع مجهود الاستعادة.', en: 'So the same incident repeats at once and the recovery is wasted.' },
              { ar: 'كمان: الاحتواء قبل الاستئصال علشان الضرر مايتنشرش، وممكن نرجع لمرحلة سابقة لو ظهرت بقايا للتهديد.', en: 'Also: contain before eradicating so the damage does not spread.' },
            ],
            model: { ar: 'المراحل الست مرتّبة لأن كل مرحلة بتمهّد للي بعدها. مثلًا لو فريق رجّع النظام من النسخة الاحتياطية (استعادة) قبل ما يمسح البرنامج الخبيث ويقفل الثغرة اللي دخل منها (إزالة)، يبقى سبب الحادث لسه موجود، فالبرنامج يرجع يشفّر الملفات تاني فورًا والحادث يتكرر وكل الشغل يضيع. وبنفس المنطق لازم الاحتواء (عزل الجهاز) قبل الاستئصال، علشان البرنامج مايتنشرش لأجهزة تانية وإحنا بننظّف. وبرغم كده الاستجابة الفعلية ممكن ترجع لمرحلة سابقة، زي لو الاستعادة كشفت بقايا للتهديد فنرجع للاحتواء أو إزالة التهديد.', en: 'The six stages are ordered because each prepares the next. If a team restores from backup (recovery) before deleting the malware and closing the hole it used (eradication), the cause is still there, so the malware re-encrypts the files at once, the incident repeats and the work is wasted. Likewise containment (isolating the PC) must come before eradication so the malware does not spread while we clean.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — فدية في المدرسة', en: 'Think as an engineer — school ransomware' },
            prompt: { ar: 'نظام سجلات الطلاب في مدرسة اتصاب ببرنامج فدية: الملفات اتشفّرت والموظفين مش قادرين يدخلوا، وإنت قائد الاستجابة. ١) الحادث لسه اتكشف — اذكر المراحل الباقية ومعنى كل واحدة للحادث ده. ٢) لخطرين (هجوم فدية تاني، انقطاع كهربا قصير) قدّر التأثير والاحتمالية وقرّر تبدأ بأنهي. ٣) أوصِ بأول تلات إجراءات واذكر سبب ليه الترتيب مهم.', en: 'A school’s student-records system is hit by ransomware: files encrypted, staff locked out; you lead the response. 1) It was just detected — list the remaining stages and what each means here. 2) For two risks (another ransomware attack, a short power cut) estimate impact and likelihood and decide which comes first. 3) Recommend the first three actions and one reason order matters.' },
            points: [
              { ar: 'المراحل الباقية: احتواء ← استئصال ← استعادة ← الدروس المستفادة والتحسين (بمعناها هنا).', en: 'Remaining: containment → eradication → recovery → prevention (applied here).' },
              { ar: 'فدية: تأثير عالي × احتمالية متوسطة/عالية > كهربا: تأثير قليل.', en: 'Ransomware: high impact × medium/high likelihood > power cut: low impact.' },
              { ar: 'أول تلات إجراءات + سبب الترتيب.', en: 'First three actions + why order matters.' },
            ],
            model: { ar: '١) احتواء: نفصل الأجهزة المصابة عن الشبكة فورًا. إزالة: نمسح برنامج الفدية ونقفل الثغرة. استعادة: نرجّع السجلات من نسخة احتياطية نضيفة. الدروس المستفادة والتحسين: نحلّل إزاي دخل (مثلًا إيميل احتيال) ونحدّث الأجهزة وندرّب الموظفين. ٢) هجوم فدية تاني: تأثير 3 × احتمالية 2 = 6، انقطاع الكهربا: تأثير 1 × احتمالية 2 = 2 ← نبدأ بالفدية. ٣) أول تلات إجراءات: فصل الأجهزة، مسح البرنامج، الاستعادة من نسخة نضيفة — والترتيب مهم لأن لو استعدنا قبل ما نمسح البرنامج، الملفات هتتشفّر تاني.', en: '1) Containment: disconnect infected PCs now. Eradication: remove the ransomware and close the hole. Recovery: restore records from a clean backup. Prevention: analyze how it got in (e.g. a phishing email), patch and train staff. 2) Another ransomware attack: impact 3 × likelihood 2 = 6; power cut: impact 1 × likelihood 2 = 2 → ransomware first. 3) First three: isolate, remove the malware, restore from a clean copy — order matters because restoring before removal lets the files be encrypted again.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'متجر إلكتروني اكتشف حالًا إن بيانات العملاء اتسرّبت. باستخدام المراحل الست وتقييم المخاطر، اذكر المرحلتين اللي بعد كده وليه، وحدّد خطر واحد يدّيله الأولوية بعدها.', en: 'An online shop has just detected a customer-data leak. Using the six stages and risk assessment, name the next two stages and why, and one risk to prioritize afterwards.' },
            points: [{ ar: 'احتواء (وقف التسريب) ثم إزالة (قفل الثغرة).', en: 'Containment (stop the leak) then eradication (close the hole).' }, { ar: 'خطر بأولوية عالية (تأثير × احتمالية).', en: 'A high-priority risk (impact × likelihood).' }],
            model: { ar: 'بعد الاكتشاف: احتواء — نقفل الحسابات أو الخادم المتأثر علشان التسريب يقف ومايكبرش. وبعدين إزالة — نقفل الثغرة اللي البيانات اتسرّبت منها ونغيّر كلمات المرور المكشوفة. بعد كده نهتم بخطر إن المهاجم يستخدم كلمات مرور العملاء في دخول غير مصرّح، لأن تأثيره عالي واحتماليته عالية — فنطلب مصادقة ثنائية.', en: 'After detection: containment — lock affected accounts or the server so the leak stops growing. Then eradication — close the hole the data leaked through and reset exposed passwords. Afterwards prioritize the risk of attackers reusing customers’ passwords, as both impact and likelihood are high — so require multi-factor authentication.' } },
        },
      ],
    },

    /* ───────────── textbook prompts ───────────── */
    {
      id: 'reflect', kind: 'challenge',
      title: { ar: 'أسئلة الكتاب: فكّر · تأمّل · تحدّى', en: 'Textbook prompts: think · reflect · challenge' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر لحظة', en: 'Pause & think' },
            prompt: { ar: 'ليه لازم الاحتواء ييجي قبل الاستئصال في الاستجابة الست مراحل؟', en: 'Why must containment come before eradication in the six-stage response?' },
            points: [{ ar: 'لو الجهاز لسه متوصّل، البرنامج ممكن ينتشر وإنت بتنظّف.', en: 'If still connected, the malware may spread while you clean.' }],
            model: { ar: 'لأن لو حاولنا نمسح البرنامج الخبيث والجهاز لسه متوصّل بالشبكة، البرنامج ممكن ينتشر لأجهزة تانية أثناء التنظيف. فنعزل الجهاز الأول (احتواء) وبعدين ننظّفه (إزالة).', en: 'Because if we try to remove the malware while the PC is still on the network, it may spread to other machines during cleaning. So we isolate first (containment), then clean (eradication).' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: أنهي مرحلة من الاستجابة تفتكر أصعب حاجة تتعمل صح تحت الضغط، وليه؟ تحدّى: اقترح حاجة واحدة المؤسسة تجهّزها مسبقًا (مرحلة التحضير) تخلّي باقي المراحل أسرع.', en: 'Reflect: which stage is hardest to do well under pressure, and why? Challenge: suggest one thing to prepare in advance that would speed up the other stages.' },
            points: [{ ar: 'مرحلة + سبب.', en: 'A stage + reason.' }, { ar: 'تجهيز مسبق مفيد.', en: 'A useful advance preparation.' }],
            model: { ar: 'أصعب مرحلة غالبًا الاحتواء، لأن لازم تقرّر بسرعة تفصل أنهي أجهزة من غير ما توقف الشغل كله. تجهيز مسبق: نسخ احتياطية منتظمة ومجرّبة + قائمة جاهزة بالأجهزة المهمة ومين المسؤول عن كل واحد — ده يخلّي الاحتواء والاستعادة أسرع.', en: 'Often containment, because you must quickly decide which machines to cut off without stopping all work. Advance preparation: regular, tested backups plus a ready list of critical systems and who owns each — making containment and recovery faster.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '2-3', seconds: 60, items: [
          { text: { ar: 'الحادث الأمني بيأثر في السرية أو السلامة أو التوافر', en: 'A security incident = actual damage' }, answer: true },
          { text: { ar: 'تحديث لإضافة ميزات = حادث أمني', en: 'An update adding features = an incident' }, answer: false },
          { text: { ar: 'تسرّب بيانات العملاء = حادث', en: 'A customer-data leak = an incident' }, answer: true },
          { text: { ar: 'أول مرحلة = التحضير', en: 'The first stage = preparation' }, answer: true },
          { text: { ar: 'آخر مرحلة = الاستعادة', en: 'The last stage = recovery' }, answer: false },
          { text: { ar: 'الاحتواء قبل الاستئصال', en: 'Containment comes before eradication' }, answer: true },
          { text: { ar: 'الاستعادة قبل الاستئصال صح', en: 'Recovering before eradicating is correct' }, answer: false },
          { text: { ar: 'فصل الجهاز المصاب = احتواء', en: 'Disconnecting an infected PC = containment' }, answer: true },
          { text: { ar: 'مسح البرنامج الخبيث = استعادة', en: 'Deleting malware = recovery' }, answer: false },
          { text: { ar: 'المخاطرة = التأثير × الاحتمالية', en: 'Risk = impact × likelihood' }, answer: true },
          { text: { ar: 'حجم المخاطرة = التأثير لوحده', en: 'Risk size = impact alone' }, answer: false },
          { text: { ar: '3 × 3 أولوية قبل 3 × 2', en: '3 × 3 comes before 3 × 2' }, answer: true },
          { text: { ar: 'لازم نعالج كل المخاطر مرة واحدة', en: 'All risks must be fixed at once' }, answer: false },
          { text: { ar: 'الدروس المستفادة والتحسين = تحليل السبب', en: 'Prevention = analyzing the cause' }, answer: true },
          { text: { ar: 'الاكتشاف = تأكيد وقوع الحادث', en: 'Detection = confirming the incident' }, answer: true },
          { text: { ar: 'التحضير بيحصل بعد الحادث', en: 'Preparation happens after the incident' }, answer: false },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 2-3', en: 'Lesson 2-3 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', fixedOrder: true, prompt: { ar: '1. إيه الترتيب الصحيح للاستجابة للحوادث؟', en: '1. Correct order of incident response?' }, options: [{ ar: 'اكتشاف ← تحضير ← استئصال ← احتواء ← استعادة ← الدروس والتحسين', en: 'detection → preparation → eradication → containment → recovery → prevention' }, { ar: 'تحضير ← اكتشاف ← احتواء ← استئصال ← استعادة ← الدروس والتحسين', en: 'preparation → detection → containment → eradication → recovery → prevention' }, { ar: 'تحضير ← اكتشاف ← استعادة ← احتواء ← استئصال ← الدروس والتحسين', en: 'preparation → detection → recovery → containment → eradication → prevention' }, { ar: 'احتواء ← اكتشاف ← استئصال ← استعادة ← الدروس والتحسين ← تحضير', en: 'containment → detection → eradication → recovery → prevention → preparation' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. حجم المخاطرة بيتحدّد بإيه؟', en: '2. Risk size is determined by?' }, options: [{ ar: 'التأثير لوحده من غير الاحتمالية', en: 'Impact alone, without likelihood' }, { ar: 'الاحتمالية لوحدها من غير التأثير', en: 'Likelihood alone, without impact' }, { ar: 'التأثير × الاحتمالية', en: 'Impact × likelihood' }, { ar: 'عدد الأجهزة في الشبكة كلها', en: 'The number of devices on the network' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. أنهي واحد من دول **مش** حادث أمني؟', en: '3. Which is NOT a security incident?' }, options: [{ ar: 'تشفير الملفات ببرنامج فدية', en: 'Files encrypted by ransomware' }, { ar: 'تسريب بيانات عملاء', en: 'A leak of customer data' }, { ar: 'تحديث برمجي لإضافة ميزات', en: 'A software update adding features' }, { ar: 'انقطاع خدمة بسبب هجوم', en: 'An outage caused by an attack' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. لازم الاحتواء ييجي قبل إزالة السبب.', en: '4. Containment comes before eradication.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. المرحلة الأخيرة هي الاستعادة.', en: '5. The final stage is recovery.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. لو استعدنا قبل إزالة السبب، ممكن الحادث نفسه يحصل تاني.', en: '6. Recovering before eradicating can let the incident recur.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. اذكر المراحل الست بالترتيب واشرح إيه اللي بيحصل في كل واحدة.', en: '7. Name the six stages in order and explain each.' },
          points: [{ ar: 'تحضير · اكتشاف · احتواء', en: 'Preparation · detection · containment' }, { ar: 'إزالة · استعادة · الدروس المستفادة والتحسين', en: 'Eradication · recovery · prevention' }],
          model: { ar: '١ التحضير: وضع إجراءات وهياكل الاستجابة مسبقًا. ٢ الاكتشاف: اكتشاف وقوع الحادث وتأكيده. ٣ الاحتواء: الحد من نطاق التأثير علشان الضرر مايتنشرش. ٤ الاستئصال: إزالة سبب الحادث زي حذف البرمجيات الخبيثة. ٥ الاستعادة: إرجاع الأنظمة والخدمات لحالة تشغيل آمنة وطبيعية (ممكن من نسخة احتياطية سليمة). ٦ الدروس المستفادة والتحسين: تحليل ما حدث وتوثيق الدروس وتحسين الضوابط لتقليل احتمال التكرار.', en: '1 Preparation: set up procedures in advance. 2 Detection: discover and confirm the incident. 3 Containment: limit the impact so damage does not spread. 4 Eradication: remove the cause, e.g. delete malware. 5 Recovery: return systems to normal. 6 Prevention of recurrence: analyze the cause and act so it does not happen again.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. رتّب: (a) 3×3، (b) 1×3، (c) 3×2، (d) 1×1 من الأعلى أولوية للأقل.', en: '8. Rank (a) 3×3, (b) 1×3, (c) 3×2, (d) 1×1 from highest to lowest priority.' },
          points: [{ ar: 'حساب كل حاصل ضرب.', en: 'Compute each product.' }, { ar: 'الترتيب a > c > b > d.', en: 'Order a > c > b > d.' }],
          model: { ar: 'a = 3 × 3 = 9، c = 3 × 2 = 6، b = 1 × 3 = 3، d = 1 × 1 = 1. الترتيب: a > c > b > d.', en: 'a = 3 × 3 = 9, c = 3 × 2 = 6, b = 1 × 3 = 3, d = 1 × 1 = 1. Order: a > c > b > d.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اشرح ليه الاستعادة قبل الاستئصال غلط.', en: '9. Explain why recovering before eradicating is wrong.' },
          points: [{ ar: 'السبب لسه موجود.', en: 'The cause is still there.' }, { ar: 'الحادث يتكرر.', en: 'The incident repeats.' }],
          model: { ar: 'لأن لو رجّعنا النظام من النسخة الاحتياطية والبرنامج الخبيث أو الثغرة لسه موجودين، السبب بيفضل موجود، فالحادث نفسه ممكن يتكرر ويضيع مجهود الاستعادة.', en: 'Because if we restore while the malware or the hole is still there, the cause remains, so the same incident happens again at once and the recovery is wasted.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. مدرسة اتصابت ببرنامج فدية — اذكر أول تلات إجراءات وليه الترتيب مهم.', en: '10. A school is hit by ransomware — give the first three actions and why order matters.' },
          points: [{ ar: 'احتواء ← استئصال ← استعادة.', en: 'Containment → eradication → recovery.' }, { ar: 'سبب أهمية الترتيب.', en: 'Why the order matters.' }],
          model: { ar: 'أولًا الاحتواء: نفصل الأجهزة المصابة عن الشبكة علشان البرنامج مايتنشرش. ثانيًا الاستئصال: نمسح برنامج الفدية ونقفل الثغرة. ثالثًا الاستعادة: نرجّع الملفات من نسخة احتياطية نضيفة. الترتيب مهم لأن لو استعدنا قبل الاستئصال الملفات هتتشفّر تاني، ولو نظّفنا قبل العزل البرنامج ممكن ينتشر.', en: 'First containment: disconnect infected PCs so the malware cannot spread. Second eradication: remove the ransomware and close the hole. Third recovery: restore files from a clean backup. Order matters: restoring before removal re-encrypts the files, and cleaning before isolating lets it spread.' } } },
      ],
    },
  ],
});
