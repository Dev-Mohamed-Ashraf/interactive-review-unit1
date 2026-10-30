/* =========================================================
 * content/sheets-5.js — printable summaries of chapter 5.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('5-1', {
    lead: T('التحليل الكويس بيبدأ بجمع كويس: مرحلة الجمع بتحدّد جودة التحليل كله.', 'Good analysis starts with good collection: this stage decides the quality of everything after it.'),
    rows: [
      [{ t: 'flow', ic: '🔁', title: T('مسار التحليل', 'The analysis path'), items: [
        { ic: '🎯', h: T('الغرض يتوضّح', 'Clear purpose'), c: 'amber' },
        { ic: '📥', h: T('جمع البيانات', 'Data collection'), p: T('نخطّط نجمع إيه وإزاي', 'plan what and how'), c: 'blue' },
        { ic: '🗂️', h: T('تنظيم', 'Organize'), c: 'violet' },
        { ic: '📊', h: T('تحليل', 'Analyze'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '🗑️', c: 'red', p: T('بيانات **مش مطابقة للغرض** ← **مستحيل** نطلع باستنتاجات مناسبة مهما كان التنظيم والتحليل دقيق.', 'Data that **misses the purpose** → sound conclusions are **impossible**, however careful the analysis.') }],
      [{ t: 'compare', ic: '🗃️', title: T('نوعين البيانات', 'Two kinds of data'),
        cols: [{ ic: '🆕', h: T('البيانات الأولية (Primary data)', 'Primary data'), c: 'green' }, { ic: '📚', h: T('البيانات الثانوية (Secondary data)', 'Secondary data'), c: 'blue' }],
        rows: [
          { k: T('التعريف', 'Definition'), v: [T('بتتجمع من جديد لغرض محدّد', 'newly collected for a purpose'), T('جمعها ونشرها غيرنا', 'collected and published by others')] },
          { k: T('أمثلة', 'Examples'), v: [T('استبيانات · مقابلات · ملاحظة · تجارب', 'surveys · interviews · observation · experiments'), T('بيانات مفتوحة · إحصائيات · تقارير قطاعات', 'open data · statistics · industry reports')] },
          { k: T('قوتها', 'Strength'), v: [T('أصالة وموثوقية عالية (قلب التحليل)', 'original, reliable (core of analysis)'), T('كمية كبيرة في وقت قصير', 'a lot in a short time')] },
          { k: T('قيدها', 'Limit'), v: [T('وقت وجهد وتكلفة', 'time, effort, cost'), T('ممكن ماتطابقش · تحيّز أو حذف وهي بتتحرّر', 'may not match · bias or omissions when edited')] },
        ] }],
      [{ t: 'note', ic: '🤝', c: 'green', p: T('عمليًا **بنجمع الاتنين** حسب الغرض والقيود. فكّر: تعداد حكومي **نزّلته** = بيانات **ثانوية** بالنسبة لك (أنت ماجمعتهوش).', 'In practice we **combine both** by purpose and constraints. A government census you **download** is **secondary** for you.') }],
      [
        { t: 'draw', art: 'crowd', ic: '👥', title: T('المجتمع والعينة', 'Population and sample'), cap: T('العينة العادلة = نسخة مصغّرة من المجتمع بنفس النسب', 'A fair sample = a miniature of the population, same proportions') },
        { t: 'cards', ic: '📋', title: T('المصطلحات', 'The terms'), w: 1.15, cols: 2, items: [
          { h: T('المجتمع الإحصائي', 'Population'), p: T('المجموعة الكاملة', 'the whole group'), c: 'slate' },
          { h: T('العينة', 'Sample'), p: T('الجزء المدروس فعلًا', 'the part studied'), c: 'amber' },
          { h: T('حصر شامل (تعداد)', 'Census'), p: T('نمسح الكل', 'survey everyone'), c: 'violet' },
          { h: T('مسح بالعينة', 'Sample survey'), p: T('نمسح عينة مختارة', 'survey a chosen sample'), c: 'blue' },
        ] },
      ],
      [{ t: 'compare', ic: '🎲', title: T('طريقتين لأخذ العينات', 'Two sampling methods'),
        cols: [{ h: T('المعاينة العشوائية البسيطة', 'Simple random sampling'), c: 'amber' }, { h: T('المعاينة الطبقية', 'Stratified sampling'), c: 'teal' }],
        rows: [
          { k: T('الفكرة', 'Idea'), v: [T('صدفة بحتة من غير تحيّز', 'pure chance, no bias'), T('طبقات (نوع · سن · صف) ثم عشوائي من كل طبقة', 'strata (sex · age · year), then random from each')] },
          { k: T('الفرصة', 'Chance'), v: [T('معروفة ومتساوية لكل واحد', 'known and equal for all'), T('طبقة 50% من المجتمع = 50% من العينة', 'a 50% stratum = 50% of the sample')] },
          { k: T('إمتى', 'When'), v: [T('الأساسية · حتى لو معلوماتنا قليلة', 'the basic one · even with little info'), T('لما الفروق بين الطبقات تأثّر ← تقلّل التحيّز', 'when strata differ → less bias')] },
        ] }],
      [{ t: 'cards', ic: '⚠️', title: T('تحيّز المعاينة: العينة ماتعكسش المجتمع ← مانقدرش نعمّم', 'Sampling bias: the sample misses the population → no generalizing'), cols: 3, items: [
        { ic: '🙋‍♂️', h: T('الاختيار الذاتي', 'Self-selection'), p: T('استبيان ويب يرد عليه المهتمين بس (مين اتسأل)', 'only those interested reply (who was asked)'), c: 'red' },
        { ic: '🎭', h: T('تحيّز الاستجابة', 'Response bias'), p: T('الإجابة «المرغوبة»: خطأ قياس (إزاي جاوبوا)', 'the “desired” answer: a measurement error (how they answered)'), c: 'amber' },
        { ic: '🚉', h: T('الزمان/المكان', 'Time/location'), p: T('محطة الضهر أيام الشغل: يغيب الموظفين والطلبة', 'a station at noon: workers and students absent'), c: 'violet' },
      ] }],
      [{ t: 'flow', ic: '😬', title: T('واثقة… بس غلط', 'Confident… but wrong'), items: [
        { ic: '🌐', h: T('استبيان ويب عن النوم', 'A web survey on sleep'), c: 'blue' },
        { ic: '😫', h: T('يرد اللي بيناموا قليل', 'Short sleepers reply'), c: 'amber' },
        { ic: '🧮', h: T('متوسط «دقيق»', 'A “precise” mean'), p: T('على المجموعة الغلط', 'on the wrong group'), c: 'red' },
      ] }],
      [{ t: 'note', ic: '🛡️', c: 'green', p: T('التحيّز صعب يتشال خالص، بس **بيقلّ بتصميم دقيق**: إزاي نختار المبحوثين، وإزاي نصيغ الأسئلة، وإزاي نعمل المسح.', 'Bias is hard to remove fully, but **careful design reduces it**: how we choose respondents, word questions and run the survey.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('طبقية = ممثّل واحد من كل طبقة', 'Stratified = one representative each'), good: T('طبقات ثم عشوائي من كل طبقة', 'Strata, then random from each') },
        { bad: T('بسيطة = اللي سهل نوصله', 'Simple = whoever is easy to reach'), good: T('صدفة بحتة', 'Pure chance') },
        { bad: T('مسح قدّام محطة = كل المواطنين', 'A station survey = all citizens'), good: T('تحيّز معاينة', 'Sampling bias') },
      ] }],
    ],
  });

  RV.addSheet('5-2', {
    lead: T('البيانات الخام نادرًا ما تكون جاهزة — مدخلات غلط ← مخرجات غلط، وكل خطوة قرار بيقوده الغرض.', 'Raw data is rarely ready — garbage in, garbage out — and each step is a decision led by the purpose.'),
    rows: [
      [{ t: 'flow', ic: '🧭', title: T('رحلة البيانات', 'The data journey'), items: [
        { ic: '📥', h: T('جمع', 'Collect'), c: 'blue' },
        { ic: '🧹', h: T('تنظيف', 'Clean'), p: T('مفقودة · شاذة · مكررة', 'missing · outliers · duplicates'), c: 'amber' },
        { ic: '🔄', h: T('تحويل', 'Transform'), p: T('نوع · مقياس · شكل', 'type · scale · shape'), c: 'violet' },
        { ic: '📊', h: T('تحليل', 'Analyze'), c: 'green' },
      ] }],
      [{ t: 'tree', ic: '🧹', title: T('التنظيف: كل مشكلة وعلاجها', 'Cleaning: each problem and its fix'), root: { h: T('تنظيف البيانات (مفيش وصفة واحدة)', 'Data cleaning (no single recipe)'), c: 'amber' }, kids: [
        { ic: '🕳️', h: T('القيم المفقودة', 'Missing values'), p: T('حسب نسبة الفقد ونمطه والغرض', 'by share, pattern, purpose'), list: [T('الحذف: قليل ومبعثر من غير تحيّز', 'deletion: few, scattered'), T('التعويض: متوسط · وسيط · مجاور (Imputation)', 'imputation: mean · median · neighbour'), T('وضع علامة: الغياب ليه معنى', 'flagging: absence has meaning')], c: 'red' },
        { ic: '📈', h: T('القيم الشاذة', 'Outliers'), p: T('بعيدة جدًا — مش لازم غلط', 'far away — not always wrong'), list: [T('قيمة غير طبيعية (خطأ) ← نصحّح أو نحذف', 'abnormal value (error) → fix or delete'), T('حقيقة نادرة ← نحتفظ مبدئيًا', 'rare truth → keep for now'), T('«9999» غلطة كتابة ← 9', '“9999” a typo → 9')], c: 'amber' },
        { ic: '👯', h: T('البيانات المكررة', 'Duplicate data'), p: T('بتلخبط نتايج التجميع', 'distort aggregates'), list: [T('بتتشال مبدئيًا', 'removed in principle'), T('اتأكّد إنها مكررة فعلًا', 'confirm it is a true duplicate'), T('شراء مرتين = عمليتين بيع', 'bought twice = two sales')], c: 'violet' },
      ] }],
      [{ t: 'tree', ic: '🔄', title: T('التحويل: تلات عائلات', 'Transformation: three families'), root: { h: T('تحويل البيانات', 'Data transformation'), c: 'violet' }, kids: [
        { ic: '🔢', h: T('تحويل نوع البيانات', 'Data type conversion'), p: T('أرقام كنص ماتتجمعش', 'numbers as text cannot sum'), list: [T('نص ← رقم: "123" ← 123', 'text → number: "123" → 123'), T('توحيد التاريخ ← 2026-04-01', 'one date → 2026-04-01'), T('توحيد الكتابة: M/F ← Male/Female', 'one notation: M/F → Male/Female')], c: 'blue' },
        { ic: '📏', h: T('المقياس', 'Scale'), p: T('الأرقام الأكبر بتسيطر', 'bigger numbers dominate'), list: [T('كمي: نطاق ثابت 0–1 (صور · شبكات عصبية)', 'normalization: fixed 0–1 (images · neural nets)'), T('قياسي: المكان بالنسبة للتشتّت (ممكن برّه 0–1)', 'standardization: place within the spread')], c: 'teal' },
        { ic: '🧩', h: T('إعادة التشكيل', 'Reshaping'), p: T('وضّح الغرض الأول', 'purpose first'), list: [T('محوري Pivot: تاريخ × منتج', 'pivot: date × product'), T('ربط Join: «رقم الطالب»', 'join: “student number”'), T('تجميع Aggregation: الإجمالي الشهري', 'aggregation: monthly total')], c: 'green' },
      ] }],
      [
        { t: 'formula', f: 'x′ = (x − min) ÷ (max − min)', p: T('التحويل الكمي (Min‑Max): من 0 لـ 1 للمقارنة', 'Normalization (Min‑Max): 0 to 1 to compare'), ex: T('160 = 0 · 170 = 0.5 · 180 = 1', '160 = 0 · 170 = 0.5 · 180 = 1') },
        { t: 'formula', f: 'z = (x − mean) ÷ SD', p: T('التوحيد القياسي: متوسط 0 وانحراف معياري 1', 'Standardization: mean 0, SD 1'), ex: T('القيمة بعيدة كام انحراف معياري — نقارن طالب في امتحانات مختلفة', 'SDs from the mean — compare across exams') },
      ],
      [
        { t: 'draw', art: 'scale', ic: '📐', title: T('ليه نوحّد المقياس؟', 'Why unify the scale?'), cap: T('الطول يبان «أهم» من الوزن بس عشان حجم أرقامه', 'Height looks “more important” only because of its numbers') },
        { t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), w: 1.4, items: [
          { bad: T('الكمي: متوسط 0 وانحراف 1', 'Normalization: mean 0, SD 1'), good: T('ده القياسي؛ الكمي 0 لـ 1', 'That is standardization') },
          { bad: T('الشاذة دايمًا تتمسح', 'Always delete outliers'), good: T('ممكن تكون حقيقة نادرة', 'May be a rare truth') },
          { bad: T('الإجمالي الشهري = محوري', 'Monthly total = pivot'), good: T('ده تجميع', 'That is aggregation') },
          { bad: T('جدولين بمفتاح = تجميع', 'Two tables by a key = aggregation'), good: T('ده ربط', 'That is a join') },
        ] },
      ],
    ],
  });

  RV.addSheet('5-3', {
    lead: T('بيانات متاحة للكل… بس لازم نعرف منين نجيبها، وإزاي، ونستخدمها إزاي.', 'Data free for all… but know where to get it, how, and how it may be used.'),
    rows: [
      [{ t: 'cards', ic: '🏦', title: T('المصادر: نختار الموثوق والمطابق للغرض', 'Sources: pick reliable and fitting'), items: [
        { ic: '🏦', h: 'World Bank Open Data', p: T('اقتصاد · سكان · تعليم · صحة ← مقارنات دولية واتجاهات كل دولة', 'economy · population · education · health → comparisons, country trends'), c: 'blue' },
        { ic: '🌐', h: 'UN Data', p: T('الأمم المتحدة ووكالاتها ← قضايا عالمية: سكان · تنمية · بيئة', 'the UN and agencies → global issues: population, development, environment'), c: 'violet' },
        { ic: '🏆', h: 'Kaggle', p: T('مسابقات تحليل + مجموعات متنوعة ← التعلّم الآلي والبحث', 'competitions + varied datasets → ML and research'), c: 'green' },
      ] }],
      [{ t: 'compare', ic: '🖱️', title: T('المتصفح ولا الـAPI؟', 'Browser or API?'),
        cols: [{ h: T('المتصفح', 'Browser'), c: 'slate' }, { h: T('API: قواعد تعامل البرامج', 'API: rules for programs'), c: 'blue' }],
        rows: [
          { k: T('الطريقة', 'How'), v: [T('ندوّر وننزّل بإيدينا', 'search and download by hand'), T('البرنامج يبعت الطلب مباشرة', 'the program requests directly')] },
          { k: T('200 دولة × 20 سنة', '200 countries × 20 years'), v: [T('مستحيل عمليًا', 'practically impossible'), T('سطر واحد ويتكرّر آليًا', 'one line, repeated automatically')] },
        ] }],
      [{ t: 'link', ic: '🔌', title: T('رحلة طلب الـAPI', 'The API request journey'), nodes: [
        { ic: '💻', h: T('العميل', 'Client'), p: T('برنامجك: عايز سكان مصر 2024', 'your program: Egypt’s population, 2024'), c: 'blue' },
        { ic: '🗄️', h: T('الخادم', 'Server'), p: T('يعالج الطلب ويرجّع الرد', 'processes and replies'), c: 'violet' },
      ], edges: [{ to: T('① طلب لنقطة النهاية', '① request to the endpoint'), back: T('② رد JSON', '② JSON response') }] }],
      [
        { t: 'flow', ic: '🪜', title: T('الخطوات', 'The steps'), w: 1.5, items: [
          { ic: '📍', h: T('① نقطة النهاية (Endpoint)', '① Endpoint'), p: T('رابط يحدّد البيانات · غلط؟ رد خطأ', 'a URL naming the data · wrong? an error'), c: 'amber' },
          { ic: '🧾', h: T('② JSON', '② JSON'), p: T('أزواج «اسم: قيمة»', '“name: value” pairs'), c: 'green' },
          { ic: '🔁', h: T('③ استخدام', '③ Use'), p: T('يقرا value ويكرّر آليًا', 'reads value, repeats'), c: 'blue' },
        ] },
        { t: 'draw', art: 'json', ic: '🧾', title: T('شكل الرد', 'The response') },
      ],
      [
        { t: 'cards', ic: '🚦', title: T('الـAPI مابيلغيش القواعد', 'An API does not cancel the rules'), cols: 1, items: [
          { h: T('امشِ على شروط المزوّد', 'Follow the provider’s terms'), c: 'green' },
          { h: T('حد الطلبات: ماتتقّلش على الخادم', 'Request limit: do not overload'), c: 'red' },
          { h: T('اتأكّد من نطاق الاستخدام المسموح', 'Check the permitted scope'), c: 'amber' },
        ] },
        { t: 'cards', ic: '📜', title: T('شروط الاستخدام: لكل مجموعة', 'Terms of use: per dataset'), cols: 1, items: [
          { ic: '📗', h: T('استخدام حر مع ذكر المصدر', 'Free use with attribution'), c: 'green' },
          { ic: '📙', h: T('ممنوع الاستخدام التجاري', 'No commercial use'), c: 'amber' },
          { ic: '📕', h: T('ممنوع إعادة النشر', 'No redistribution'), c: 'red' },
        ] },
        { t: 'vflow', ic: '🏷️', title: T('ذكر المصدر: دايمًا', 'Source citation: always'), items: [
          { h: T('المزوّد · اسم البيانات', 'Provider · data name'), c: 'violet' },
          { h: T('تاريخ الحصول · الرابط URL', 'Date obtained · URL'), c: 'violet' },
          { h: T('دليل موثوقية + غيرك يتحقّق', 'Reliability + others can verify'), c: 'green' },
        ] },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('المفتوحة من غير فحص الشروط', 'Open data needs no terms check'), good: T('لازم نفحص شروط كل مجموعة', 'Check each dataset’s terms') },
        { bad: T('ذكر المصدر للمدفوعة بس', 'Citation is for paid data only'), good: T('ذكر المصدر دايمًا', 'Always cite') },
        { bad: T('بيانات الـAPI مالهاش شروط', 'API data has no terms'), good: T('ليها شروط وحدود', 'It has terms and limits') },
        { bad: T('الخادم بيبعت من طرف واحد على طول', 'The server just pushes data'), good: T('العميل يطلب والخادم يرد', 'The client asks, the server replies') },
        { bad: T('العملاء يتبادلوا مباشرة', 'Clients swap data directly'), good: T('عن طريق الخادم', 'Through the server') },
      ] }],
    ],
  });
})();
