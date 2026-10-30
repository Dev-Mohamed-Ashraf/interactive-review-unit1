/* =========================================================
 * content/sheets-4.js — printable summaries of chapter 4.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('4-1', {
    lead: T('لكل وسيط قوة وقيود، والاختيار — وغالبًا كذا وسيط مع بعض — حسب الغرض والجمهور.', 'Each medium has strengths and limits; choose — often several — by purpose and audience.'),
    rows: [
      [{ t: 'compare', ic: '📺', title: T('الوسائط الخمسة', 'The five media'),
        cols: [{ ic: '📺', h: T('تلفزيون', 'TV'), c: 'blue' }, { ic: '📻', h: T('راديو', 'Radio'), c: 'amber' }, { ic: '📰', h: T('جرنال', 'Newspaper'), c: 'slate' }, { ic: '🌐', h: T('موقع', 'Website'), c: 'violet' }, { ic: '💬', h: T('تواصل', 'SNS'), c: 'pink' }],
        rows: [
          { k: T('المحتوى', 'Content'), v: [T('فيديو + صوت', 'video + audio'), T('صوت بس', 'audio only'), T('نص + صور', 'text + images'), T('كل الأنواع', 'all types'), T('ينشرها المستخدمين', 'shared by users')] },
          { k: T('بيخاطب', 'Reaches'), v: [T('النظر والسمع', 'sight, hearing'), T('السمع بس', 'hearing only'), T('النظر · مطبوع', 'sight · printed'), T('متنوّع', 'varied'), T('متنوّع', 'varied')] },
          { k: T('الاتجاه', 'Direction'), v: [T('واحد', 'one-way'), T('واحد', 'one-way'), T('واحد', 'one-way'), T('واحد + نماذج وتعليقات', 'one-way + forms, comments'), T('اتجاهين', 'two-way')] },
          { k: T('ميزته', 'Strength'), v: [T('لكتير مرة واحدة', 'many at once'), T('أي مكان وإنت بتعمل حاجة', 'anywhere, while busy'), T('من غير إنترنت', 'no internet'), T('يتحدّث في أي وقت', 'updated any time'), T('أسرع نشر', 'fastest spread')] },
        ] }],
      [{ t: 'link', ic: '↔️', title: T('اتجاه واحد ولا اتجاهين؟', 'One-way or two-way?'), nodes: [
        { ic: '📣', h: T('المرسل', 'Sender'), c: 'blue' },
        { ic: '👥', h: T('المستقبل', 'Receiver'), c: 'green' },
      ], edges: [{ to: T('واحد: تلفزيون · راديو · جرنال', 'one-way: TV · radio · paper'), back: T('اتجاهين: تواصل + نماذج الموقع', 'two-way: SNS + site forms') }] }],
      [
        { t: 'cards', ic: '🌐', title: T('نقاط قوة المواقع', 'Website strengths'), cols: 1, items: [
          { ic: '✅', h: T('خمس نقاط', 'Five points'), list: [T('تجمع معلومات متنوعة', 'combine varied information'), T('تتحدّث في أي وقت', 'updated any time'), T('توصل من أي مكان تقريبًا', 'reach almost anywhere'), T('تفاعل بالنماذج والتعليقات', 'interact via forms, comments'), T('متصفح بس من غير تطبيق', 'just a browser')], c: 'green' },
        ] },
        { t: 'cards', ic: '🚧', title: T('قيود المواقع', 'Website constraints'), cols: 1, items: [
          { ic: '⚠️', h: T('تلات قيود', 'Three limits'), list: [T('محتاجة إنترنت عادةً (إلا المتخزّنة مؤقتًا)', 'usually need internet (unless cached)'), T('لازم المستخدم يدخل بنفسه', 'users must come themselves'), T('العرض والسرعة حسب الجهاز والشبكة', 'display, speed vary by device, network')], c: 'red' },
        ] },
      ],
      [{ t: 'tree', ic: '🎯', title: T('الاختيار حسب الغرض', 'Choosing by purpose'), root: { h: T('اختيار الوسيط: هدفك إيه؟ والجمهور المستهدف مين؟', 'Choosing media: your goal? your target audience?'), c: 'violet' }, kids: [
        { ic: '📺', h: T('وصول واسع بسرعة', 'Wide, fast reach'), p: T('تلفزيون · إعلانات التواصل', 'TV · social ads'), c: 'blue' },
        { ic: '🌐', h: T('تفاصيل يرجعولها', 'Details to revisit'), p: T('موقع: مفيش حد للكمية', 'a website: no size limit'), c: 'violet' },
        { ic: '✉️', h: T('رسالة لناس بعينهم', 'To specific people'), p: T('إيميل · رسايل مباشرة', 'e-mail · direct messages'), c: 'amber' },
        { ic: '💬', h: T('انتشار بالتناقل', 'Spread by sharing'), p: T('تواصل: يشاركوا بإرادتهم', 'SNS: shared willingly'), c: 'pink' },
      ] }],
      [{ t: 'flow', ic: '🔗', title: T('بنجمع الوسائط: كل واحد يسدّ ضعف التاني', 'Combining media: each covers the other'), items: [
        { ic: '📺', h: T('إعلان تلفزيوني', 'TV advert'), p: T('يجذب الانتباه', 'grabs attention'), c: 'blue' },
        { ic: '🌐', h: T('موقع', 'Website'), p: T('العمق والتفاصيل', 'depth and detail'), c: 'violet' },
        { ic: '💬', h: T('تواصل اجتماعي', 'Social media'), p: T('ينشرها', 'spreads it'), c: 'pink' },
      ] }],
      [{ t: 'note', ic: '👨‍👦‍👦', c: 'amber', p: T('**فكّر في الجمهور:** عيلة من غير إنترنت مش هيوصلها الموقع — يوصلها راديو أو ملصق مطبوع.', '**Think of the audience:** a family with no internet will not get a website — radio or a printed poster reaches them.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('التلفزيون تفاعل في الاتجاهين', 'TV is two-way'), good: T('اتجاه واحد', 'One-way') },
        { bad: T('الموقع بيتشاف من غير إنترنت', 'A website needs no internet'), good: T('محتاج اتصال عادةً', 'Usually needs a connection') },
        { bad: T('المعلومة بتوصل من غير ما يدخلوا', 'Information arrives without visiting'), good: T('لازم يدخل بنفسه', 'Users must visit') },
        { bad: T('وسيط واحد أو الموقع يكفي دايمًا', 'One medium or a site always suffices'), good: T('الأنسب حسب الغرض والجمهور', 'The best fit for purpose, audience') },
      ] }],
    ],
  });

  RV.addSheet('4-2', {
    lead: T('التصميم الكويس بيبدأ من المستخدم: مين؟ إيه يتحط فين؟ وبعدين نوضّحها ونقرّر لصالحه.', 'Good design starts from the user: who? what goes where? then make it clear and decide for them.'),
    rows: [
      [{ t: 'flow', ic: '🪜', title: T('الترتيب', 'The order'), items: [
        { ic: '🪪', h: T('شخصية المستخدم', 'Persona'), p: T('مين؟', 'who?'), c: 'pink' },
        { ic: '📐', h: T('الإطار السلكي', 'Wireframe'), p: T('فين؟ من غير لون', 'where? no colour'), c: 'slate' },
        { ic: '🎨', h: 'CRAP', p: T('وضّحها', 'make it clear'), c: 'violet' },
        { ic: '🧭', h: 'UCD', p: T('قرّر للمستخدم', 'decide for the user'), c: 'green' },
      ] }],
      [
        { t: 'cards', ic: '🪪', title: T('شخصية المستخدم (Persona)', 'Persona'), cols: 1, items: [
          { h: T('مستخدم نموذجي كشخص محدّد', 'A typical user as a specific person'), p: T('العمر · المهنة · الهدف · التحديات', 'age · job · goal · challenges'), c: 'pink' },
          { h: T('مثال', 'Example'), p: T('موظف في التلاتينات، يقارن منتجات من الموبايل في المواصلات بسرعة', 'an employee in his 30s comparing products by phone on the commute'), c: 'blue' },
          { h: T('فايدتها', 'Its use'), p: T('«المستخدم ده محتاج إيه؟» فالتصميم مايتوهش', '“what does this user need?” keeps design on track'), c: 'green' },
        ] },
        { t: 'draw', art: 'wire', ic: '📐', title: T('الإطار السلكي (Wireframe)', 'Wireframe'), cap: T('مكان المعلومات وأولويتها · مش تصميم نهائي', 'Placement and priority · not a final design') },
      ],
      [{ t: 'note', ic: '💬', c: 'amber', p: T('**ليه قبل الألوان؟** لو بدأنا بالألوان النقاش يروح للذوق الشخصي («بحب الأزرق!»). لو ثبّتنا المكان والأولوية، النقاش يبقى عن احتياج المستخدم وأصحاب المصلحة يتفقوا.', '**Why before colour?** Colour first turns talk to taste (“I like blue!”). Fix placement first, and talk stays on user needs and stakeholders agree.') }],
      [{ t: 'cards', ic: '🎨', title: T('مبادئ CRAP الأربعة', 'The four CRAP principles'), cols: 4, items: [
        { ic: '🔆', h: T('التباين', 'Contrast'), p: T('يبرز الأهم: عنوان غامق · زرار «اشترِ» ملوّن', 'highlights priority: bold titles, a coloured Buy button'), c: 'red' },
        { ic: '🔁', h: T('التكرار', 'Repetition'), p: T('يوحّد: نفس خط العناوين والأيقونات', 'unifies: same headings, same icons'), c: 'blue' },
        { ic: '📏', h: T('المحاذاة', 'Alignment'), p: T('ينظّم: الحواف على خط واحد', 'orders: edges on one line'), c: 'amber' },
        { ic: '🧲', h: T('التقارب', 'Proximity'), p: T('يجمّع: صورة واسم وسعر مع بعض', 'groups: image, name, price together'), c: 'green' },
      ] }],
      [{ t: 'tree', ic: '🧭', title: T('التصميم المتمحور حول المستخدم (UCD)', 'User-centered design (UCD)'), root: { h: T('من منظور المستخدم مش راحة المصمّم: محتاج إيه؟ وفي أنهي موقف؟', 'The user’s view, not the designer’s comfort: what need? in what situation?'), c: 'green' }, kids: [
        { ic: '👆', h: T('قابلية الاستخدام', 'Usability'), p: T('سهولة الاستخدام', 'ease of use'), c: 'blue' },
        { ic: '♿', h: T('إمكانية الوصول', 'Accessibility'), p: T('لفئات واسعة', 'for many people'), c: 'violet' },
        { ic: '🪪', h: T('الشخصية', 'Persona'), p: T('طريقة من طرق تطبيقه', 'one way to apply it'), c: 'pink' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('عنوان كبير غامق = تكرار', 'A big bold title = repetition'), good: T('تباين', 'Contrast') },
        { bad: T('تجميع الاسم والسعر والصورة = محاذاة', 'Grouping name, price, image = alignment'), good: T('تقارب', 'Proximity') },
        { bad: T('توحيد خط العناوين = تباين', 'One heading font = contrast'), good: T('تكرار', 'Repetition') },
        { bad: T('التشفير من مبادئ CRAP', 'Encryption is a CRAP principle'), good: T('مش منها', 'It is not') },
        { bad: T('الإطار السلكي تصميم نهائي بألوان', 'A wireframe is a final colour design'), good: T('مخطّط من غير ألوان', 'A plan with no colour') },
      ] }],
    ],
  });

  RV.addSheet('4-3', {
    lead: T('نقيّم نوعيًا (ليه) وكميًا (قد إيه) — والجمع بينهم بيدّي أوضح صورة.', 'We evaluate qualitatively (why) and quantitatively (how much) — together they give the clearest picture.'),
    rows: [
      [{ t: 'tree', ic: '⚖️', title: T('نوعين التقييم', 'Two kinds of evaluation'), root: { h: T('تقييم الموقع', 'Evaluating a site'), c: 'violet' }, kids: [
        { ic: '🔍', h: T('التقييم النوعي = ليه؟', 'Qualitative evaluation = why?'), p: T('يستكشف الأسباب وجوانب ماتتقاسش بالأرقام', 'explores reasons numbers cannot show'), list: [T('اختبار الاستخدام: نراقب الاستخدام الفعلي', 'usability testing: watch real use'), T('المقابلات: نسمع الاحتياجات والضيق', 'interviews: hear needs and frustrations'), T('التقييم الإرشادي: خبراء', 'heuristic evaluation: experts')], c: 'violet' },
        { ic: '📊', h: T('التقييم الكمّي = قد إيه؟', 'Quantitative evaluation = how much?'), p: T('بيانات عددية: تقييم موضوعي وإحصائي', 'numbers: objective, statistical'), list: [T('تحليلات الويب: الطريقة المركزية', 'web analytics: the central method'), T('PV · الوقت · الارتداد · CVR', 'PV · time · bounce · CVR'), T('اختبار A/B: نقارن خيارين', 'A/B testing: compare two options')], c: 'blue' },
      ] }],
      [{ t: 'note', ic: '🤝', c: 'green', p: T('الأرقام بتقول لك **فين** تبص… والأصوات بتقول لك **ليه** — والجمع بينهم بيدّي تقييم أدق.', 'Numbers say **where** to look… voices say **why** — together the evaluation is more accurate.') }],
      [
        { t: 'draw', art: 'funnel', ic: '🎯', title: T('من الزيارة للهدف', 'From visit to goal') },
        { t: 'cards', ic: '📈', title: T('مؤشرات تحليلات الويب', 'Web analytics measures'), cols: 1, items: [
          { ic: '👁️', h: T('PV: مشاهدات الصفحة', 'PV: page views'), p: T('إجمالي المشاهدات · قد إيه الموقع منتشر', 'total views · how widely seen'), c: 'blue' },
          { ic: '🚪', h: T('معدل الارتداد', 'Bounce rate'), p: T('خلصت بعد الصفحة الأولى · هل كانت على قد التوقّع؟', 'ended after page one · did it meet expectations?'), c: 'amber' },
          { ic: '🎯', h: T('معدل التحويل CVR', 'Conversion rate (CVR)'), p: T('حقّقت إجراء مستهدف (شراء، تسجيل) · مساهمة في الأرباح', 'reached a target action (buy, sign up) · business results'), c: 'green' },
        ] },
      ],
      [{ t: 'cards', ic: '🧑‍💼', title: T('التقييم الإرشادي: خبراء + قواعد عملية (نوعي، مع اختبار الاستخدام)', 'Heuristic evaluation: experts + rules (qualitative, with usability tests)'), cols: 3, items: [
        { ic: '🔁', h: T('الاتساق', 'Consistency'), p: T('التصميم والعمليات موحّدة', 'unified design and actions'), c: 'violet' },
        { ic: '🛑', h: T('منع الأخطاء', 'Error prevention'), p: T('التصميم يصعّب الغلط', 'design makes mistakes hard'), c: 'red' },
        { ic: '💡', h: T('وضوح حالة النظام', 'Visible system status'), p: T('مؤشر تحميل · رسايل خطأ الإدخال', 'loading indicator · input errors'), c: 'amber' },
      ] }],
      [{ t: 'flow', ic: '🛒', title: T('مثال: PV عالي و CVR واطي', 'Example: high PV, low CVR'), items: [
        { ic: '📊', h: T('الأرقام: فين؟', 'Numbers: where?'), p: T('بين الدخول والشراء', 'between arrival and purchase'), c: 'blue' },
        { ic: '🧪', h: T('اختبار استخدام: ليه؟', 'Usability test: why?'), p: T('زرار الدفع مستخبي', 'the pay button is hidden'), c: 'violet' },
        { ic: '🆎', h: T('A/B يحسم التغيير', 'A/B settles the change'), p: T('بعد ما الأصوات تكشف المشكلة', 'after voices reveal the problem'), c: 'green' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الارتداد = نسبة تحقيق الهدف', 'Bounce = goal rate'), good: T('ده CVR', 'That is CVR') },
        { bad: T('التقييم الإرشادي كمّي', 'Heuristic evaluation is quantitative'), good: T('نوعي: خبراء + قواعد', 'Qualitative: experts + rules') },
        { bad: T('النوعي بيعتمد على الأرقام', 'Qualitative relies on numbers'), good: T('الأرقام = كمّي', 'Numbers = quantitative') },
      ] }],
    ],
  });

  RV.addSheet('4-4', {
    lead: T('الموقع عمره ما بيخلص: النسخة الأولى أحسن تخمين، والتحسين دورات متكرّرة.', 'A website is never finished: version one is a best guess, improvement comes in repeated cycles.'),
    rows: [
      [
        { t: 'cycle', ic: '🔁', title: T('دورة PDCA', 'The PDCA cycle'), center: T('تحسين مستمر', 'Continuous improvement'), items: [
          { h: T('P · خطّط', 'P · Plan'), p: T('هدف + خطة', 'goal + plan'), c: 'blue' },
          { h: T('D · نفّذ', 'D · Do'), p: T('حسب الخطة', 'as planned'), c: 'green' },
          { h: T('C · تحقّق', 'C · Check'), p: T('نقيس ونقيّم', 'measure'), c: 'amber' },
          { h: T('A · تصرّف', 'A · Act'), p: T('التحسين الجاي', 'next step'), c: 'red' },
        ] },
        { t: 'vflow', ic: '🌐', title: T('مثال: معدل الارتداد', 'Example: bounce rate'), items: [
          { ic: '🎯', h: T('هدف: نقلّل الارتداد 10%', 'Goal: cut bounce by 10%'), p: T('خطة: إعادة تصميم الرئيسية', 'plan: redesign the homepage'), c: 'blue' },
          { ic: '🛠️', h: T('نغيّر تصميم الصفحة', 'Change the page design'), c: 'green' },
          { ic: '📏', h: T('نقيس ونقارن بالهدف', 'Measure against the goal'), c: 'amber' },
          { ic: '↩️', h: T('كفاية؟ نكمّل · لأ؟ نراجع العناوين أو الصور', 'Enough? continue · no? revise headings or images'), c: 'red' },
        ] },
      ],
      [{ t: 'note', ic: '🏭', c: 'blue', p: T('PDCA بتستخدم كمان في **تحسين الأعمال وإدارة الجودة**. المهم **مش نخلّص في جولة واحدة**، لكن نتحسّن تدريجيًا بالتكرار.', 'PDCA is also used in **business improvement and quality management**. The point is **not finishing in one round** but improving gradually.') }],
      [{ t: 'flow', ic: '🧠', title: T('التفكير التصميمي: مشاكل وحلول من منظور المستخدم', 'Design thinking: problems and solutions from the user’s view'), items: [
        { ic: '🤝', h: T('① تعاطف', '① Empathize'), p: T('تحديات المستخدم واحتياجاته', 'user challenges, needs'), c: 'pink' },
        { ic: '🎯', h: T('② تعريف', '② Define'), p: T('نوضّح المشكلة', 'clarify the problem'), c: 'violet' },
        { ic: '💡', h: T('③ أفكار', '③ Ideate'), p: T('أفكار كتير', 'many ideas'), c: 'amber' },
        { ic: '🧪', h: T('④ نموذج', '④ Prototype'), p: T('نموذج سريع', 'a quick model'), c: 'blue' },
        { ic: '👥', h: T('⑤ اختبار', '⑤ Test'), p: T('يجرّبوه ونسمع ملاحظاتهم', 'users try, give feedback'), c: 'green' },
      ], back: T('على حسب النتيجة ممكن نرجع للتعاطف أو التعريف — رايح جاي', 'Based on results we may return to empathize or define — back and forth') }],
      [
        { t: 'link', ic: '🆎', title: T('اختبار A/B', 'A/B testing'), w: 1.4, nodes: [
          { ic: '🔴', h: T('الخيار A', 'Option A'), p: T('زرار شراء أحمر', 'a red buy button'), c: 'red' },
          { ic: '🔵', h: T('الخيار B', 'Option B'), p: T('زرار شراء أزرق', 'a blue buy button'), c: 'blue' },
        ], edges: [{ to: T('مستخدمين حقيقيين', 'real users'), back: T('نفحص البيانات', 'check the data') }] },
        { t: 'cards', ic: '🔑', title: T('القواعد', 'The rules'), cols: 1, items: [
          { ic: '1️⃣', h: T('عنصر واحد في المرة', 'One element at a time'), p: T('عشان نعرف أنهي تغيير عمل الأثر', 'to know which change worked'), c: 'green' },
          { ic: '📊', h: T('بيانات كفاية قبل القرار', 'Enough data first'), c: 'blue' },
        ] },
      ],
      [{ t: 'cards', ic: '🧭', title: T('كل طريقة بتجاوب إيه؟', 'What each answers'), cols: 3, items: [
        { ic: '🔁', h: 'PDCA', p: T('إزاي نكرّر؟', 'how do we repeat?'), c: 'blue' },
        { ic: '🧠', h: T('التفكير التصميمي', 'Design thinking'), p: T('نحسّن إيه وليه؟', 'what and why?'), c: 'violet' },
        { ic: '🆎', h: 'A/B', p: T('أنهي خيار؟ جوّه نفّذ/تحقّق', 'which option? inside Do/Check'), c: 'green' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('PDCA بتخلص في جولة واحدة', 'PDCA ends after one round'), good: T('نتحسّن تدريجيًا بالتكرار', 'Improve gradually by repeating') },
        { bad: T('التفكير التصميمي من منظور المطوّر', 'Design thinking is the developer’s view'), good: T('من منظور المستخدم', 'The user’s view') },
        { bad: T('نغيّر كذا عنصر مع بعض', 'Change several elements together'), good: T('عنصر واحد في المرة', 'One element at a time') },
      ] }],
    ],
  });
})();
