/* =========================================================
 * content/sheets-5.js — printable summaries of chapter 5.
 * Only data: js/screens/sheet.js draws it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('5-1', {
    lead: T('قبل أي تحليل: نجمع إيه؟ منين؟ ومن مين؟ — جودة الجمع بتحدّد جودة كل حاجة بعده.', 'Before any analysis: what, from where, from whom? Collection quality decides everything after it.'),
    rows: [
      [{ t: 'flow', ic: '🔁', title: T('مسار التحليل', 'The analysis path'), items: [
        { ic: '🎯', h: T('الغرض يتوضّح', 'Clear purpose'), c: 'amber' },
        { ic: '📥', h: T('جمع', 'Collect'), p: T('نجمع إيه وإزاي', 'what and how'), c: 'blue' },
        { ic: '🗂️', h: T('تنظيم', 'Organize'), p: T('نرتّب وننظّف', 'arrange and tidy'), c: 'violet' },
        { ic: '📊', h: T('تحليل', 'Analyze'), p: T('استنتاجات', 'conclusions'), c: 'green' },
      ] }],
      [{ t: 'tree', ic: '🗃️', title: T('نوعين البيانات', 'Two kinds of data'), root: { h: T('مصدر البيانات', 'Data source'), c: 'slate' }, kids: [
        { ic: '🆕', h: T('أولية', 'Primary'), p: T('نجمعها من جديد لغرض محدّد', 'newly collected for a purpose'), list: [T('استبيان · مقابلة · ملاحظة · تجربة', 'survey · interview · observation · experiment'), T('✅ موثوقة وأصيلة', '✅ reliable, original'), T('⏳ وقت وجهد وتكلفة', '⏳ time, effort, cost')], c: 'green' },
        { ic: '📚', h: T('ثانوية', 'Secondary'), p: T('جمعها ونشرها غيرنا', 'collected by others'), list: [T('بيانات مفتوحة · إحصائيات · تقارير', 'open data · statistics · reports'), T('⚡ كتير في وقت قصير', '⚡ a lot, quickly'), T('⚠️ ممكن ماتطابقش أو تتحيّز', '⚠️ may not match, may be biased')], c: 'blue' },
      ] }],
      [
        { t: 'draw', art: 'crowd', ic: '👥', title: T('المجتمع والعينة', 'Population and sample'), cap: T('المجتمع = الكل · العينة = جزء عادل منه · حصر شامل = نمسح الكل', 'Population = all · sample = a fair part · census = survey all') },
        { t: 'compare', ic: '🎲', title: T('طريقتين للاختيار', 'Two ways to choose'), w: 1.25,
          cols: [{ h: T('عشوائية بسيطة', 'Simple random'), c: 'amber' }, { h: T('طبقية', 'Stratified'), c: 'teal' }],
          rows: [
            { k: T('الفكرة', 'Idea'), v: [T('صدفة بحتة', 'pure chance'), T('طبقات ثم عشوائي من كل طبقة', 'strata, then random from each')] },
            { k: T('الفرصة', 'Chance'), v: [T('معروفة ومتساوية', 'known and equal'), T('بنسبة كل طبقة', 'by stratum share')] },
            { k: T('إمتى', 'When'), v: [T('حتى لو معلوماتنا قليلة', 'even with little info'), T('لما الفروق بين الطبقات تأثّر', 'when strata differ')] },
          ] },
      ],
      [{ t: 'cards', ic: '⚠️', title: T('تلات أنواع لتحيّز المعاينة', 'Three kinds of sampling bias'), items: [
        { ic: '🙋‍♂️', h: T('الاختيار الذاتي', 'Self-selection'), p: T('اللي عايز يرد بس هو اللي بيرد', 'only the willing reply'), c: 'red' },
        { ic: '🎭', h: T('الاستجابة', 'Response'), p: T('إجابة «مرغوبة» مش دقيقة', 'a “desired” answer'), c: 'amber' },
        { ic: '🚉', h: T('الزمان/المكان', 'Time/place'), p: T('مسح قدّام محطة الضهر', 'a station at noon'), c: 'violet' },
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
    lead: T('البيانات الخام ماتنفعش زي ما هي — مدخلات غلط ← مخرجات غلط.', 'Raw data is not ready — garbage in → garbage out.'),
    rows: [
      [{ t: 'flow', ic: '🧭', title: T('رحلة البيانات', 'The data journey'), items: [
        { ic: '📥', h: T('جمع', 'Collect'), c: 'blue' },
        { ic: '🧹', h: T('تنظيف', 'Clean'), p: T('مفقودة · شاذة · مكررة', 'missing · outliers · duplicates'), c: 'amber' },
        { ic: '🔄', h: T('تحويل', 'Transform'), p: T('نوع · مقياس · شكل', 'type · scale · shape'), c: 'violet' },
        { ic: '📊', h: T('تحليل', 'Analyze'), c: 'green' },
      ] }],
      [{ t: 'tree', ic: '🧹', title: T('التنظيف: كل مشكلة وعلاجها', 'Cleaning: each problem and its fix'), root: { h: T('تنظيف البيانات', 'Data cleaning'), c: 'amber' }, kids: [
        { ic: '🕳️', h: T('قيم مفقودة', 'Missing values'), list: [T('حذف ← الفقد قليل ومبعثر', 'delete ← few, scattered'), T('تعويض بالمتوسط/الوسيط', 'impute mean/median'), T('علامة ← الغياب ليه معنى', 'flag ← absence has meaning')], c: 'red' },
        { ic: '📈', h: T('قيم شاذة', 'Outliers'), list: [T('السبب الأول', 'find the cause first'), T('خطأ ← صحّح أو احذف', 'error ← fix or delete'), T('حقيقية ← احتفظ بيها', 'real ← keep it')], c: 'amber' },
        { ic: '👯', h: T('بيانات مكررة', 'Duplicates'), list: [T('بتلخبط المجاميع', 'distort totals'), T('نشيلها لو تكرار فعلي بس', 'remove only true duplicates'), T('شراء مرتين = عمليتين', 'bought twice = two sales')], c: 'violet' },
      ] }],
      [{ t: 'tree', ic: '🔄', title: T('التحويل: تلات عائلات', 'Transformation: three families'), root: { h: T('تحويل البيانات', 'Data transformation'), c: 'violet' }, kids: [
        { ic: '🔢', h: T('نوع البيانات', 'Data type'), list: [T('نص ← رقم', 'text → number'), T('توحيد صيغة التاريخ', 'one date format'), T('توحيد طريقة الكتابة', 'one notation')], c: 'blue' },
        { ic: '📏', h: T('المقياس', 'Scale'), list: [T('كمي: من 0 لـ 1', 'normalization: 0 to 1'), T('قياسي: متوسط 0 وانحراف 1', 'standard: mean 0, SD 1')], c: 'teal' },
        { ic: '🧩', h: T('إعادة التشكيل', 'Reshaping'), list: [T('محوري: صف × عمود', 'pivot: row × column'), T('ربط: مفتاح مشترك', 'join: shared key'), T('تجميع: مجاميع ومتوسطات', 'aggregate: totals, means')], c: 'green' },
      ] }],
      [
        { t: 'formula', f: 'x′ = (x − min) ÷ (max − min)', p: T('التحويل الكمي (Min‑Max): كل القيم من 0 لـ 1', 'Normalization (Min‑Max): every value in 0–1'), ex: T('160–180 سم: القيمة 170 ← 0.5', '160–180 cm: 170 → 0.5') },
        { t: 'formula', f: 'z = (x − mean) ÷ SD', p: T('التوحيد القياسي: متوسط 0 وانحراف معياري 1', 'Standardization: mean 0, SD 1'), ex: T('بيقول القيمة بعيدة كام انحراف عن المتوسط', 'how many SDs from the mean') },
      ],
      [
        { t: 'draw', art: 'scale', ic: '📐', title: T('الكمي ولا القياسي؟', 'Which scaling?'), cap: T('الأرقام الأكبر بتسيطر لو الوحدات مختلفة ← لازم نوحّد المقياس', 'Bigger numbers dominate across units → unify the scale') },
        { t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), w: 1.4, items: [
          { bad: T('الكمي: متوسط 0 وانحراف 1', 'Normalization: mean 0, SD 1'), good: T('ده القياسي؛ الكمي 0 لـ 1', 'That is standardization') },
          { bad: T('الشاذة دايمًا غلط', 'Outliers are always wrong'), good: T('ممكن تكون حقيقة نادرة', 'May be a rare truth') },
          { bad: T('الإجمالي الشهري = محوري', 'Monthly total = pivot'), good: T('ده تجميع', 'That is aggregation') },
        ] },
      ],
    ],
  });

  RV.addSheet('5-3', {
    lead: T('بيانات جاهزة ومجانية… بس بقواعد: منين نجيبها، إزاي، ومسموح نستخدمها إزاي.', 'Ready, free data… with rules: where from, how, and what is allowed.'),
    rows: [
      [{ t: 'cards', ic: '🏦', title: T('أشهر المزوّدين', 'Major providers'), items: [
        { ic: '🏦', h: 'World Bank Open Data', p: T('إحصائيات الدول: اقتصاد، سكان، تعليم، صحة', 'country stats: economy, population, education, health'), c: 'blue' },
        { ic: '🌐', h: 'UN Data', p: T('إحصائيات دولية من الأمم المتحدة ووكالاتها', 'international stats from the UN and agencies'), c: 'violet' },
        { ic: '🏆', h: 'Kaggle', p: T('مسابقات تحليل + مجموعات للتعلّم الآلي', 'competitions + ML datasets'), c: 'green' },
      ] }],
      [{ t: 'link', ic: '🔌', title: T('الـ API: طلب ورد', 'The API: request and response'), nodes: [
        { ic: '💻', h: T('العميل', 'Client'), p: T('برنامجك', 'your program'), c: 'blue' },
        { ic: '🗄️', h: T('الخادم', 'Server'), p: T('مخزّن البيانات', 'stores the data'), c: 'violet' },
      ], edges: [{ to: T('① طلب لنقطة النهاية', '① request to the endpoint'), back: T('② رد JSON', '② JSON response') }] }],
      [
        { t: 'flow', ic: '🪜', title: T('خطوات الاستخدام', 'Steps of use'), w: 1.5, items: [
          { ic: '📍', h: T('نقطة النهاية', 'Endpoint'), p: T('رابط بيحدّد البيانات', 'a URL naming the data'), c: 'amber' },
          { ic: '🧾', h: 'JSON', p: T('أزواج «اسم: قيمة»', '“name: value” pairs'), c: 'green' },
          { ic: '🔁', h: T('استخدام آلي', 'Automatic use'), p: T('آلاف القيم بسطر', 'thousands of values'), c: 'blue' },
        ] },
        { t: 'draw', art: 'json', ic: '🧾', title: T('شكل الرد', 'The response') },
      ],
      [{ t: 'compare', ic: '🖱️', title: T('متصفح ولا API؟', 'Browser or API?'),
        cols: [{ h: T('المتصفح', 'Browser'), c: 'slate' }, { h: 'API', c: 'blue' }],
        rows: [
          { k: T('الطريقة', 'How'), v: [T('تدوّر وتنزّل ملف ملف', 'search and download by hand'), T('البرنامج يطلب مباشرة', 'the program requests directly')] },
          { k: T('الكمية', 'Amount'), v: [T('200 دولة × 20 سنة؟ صعب جدًا', '200 countries × 20 years? impractical'), T('بكميات كبيرة وبتكرار آلي', 'large, repeated automatically')] },
        ] }],
      [
        { t: 'cards', ic: '📜', title: T('قبل ما تستخدم', 'Before using'), cols: 1, items: [
          { ic: '📜', h: T('شروط الاستخدام', 'Terms of use'), p: T('لكل مجموعة لوحدها — حتى المجانية', 'for every dataset — even free ones'), c: 'amber' },
          { ic: '🚦', h: T('حد الطلبات', 'Request limit'), p: T('ماتكترش الطلبات في وقت قصير', 'no excessive requests'), c: 'red' },
        ] },
        { t: 'vflow', ic: '🏷️', title: T('ذكر المصدر', 'Cite the source'), items: [
          { h: T('المزوّد · اسم البيانات', 'Provider · data name'), c: 'violet' },
          { h: T('تاريخ الحصول · الرابط', 'Date obtained · URL'), c: 'violet' },
          { h: T('دليل موثوقية + غيرك يتحقّق', 'Reliability + others can verify'), c: 'green' },
        ] },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('المفتوحة تتستخدم من غير فحص الشروط', 'Open data needs no terms check'), good: T('لازم نفحص شروط كل مجموعة', 'Check each dataset’s terms') },
        { bad: T('ذكر المصدر للمدفوعة بس', 'Citation is for paid data only'), good: T('ذكر المصدر دايمًا', 'Always cite') },
        { bad: T('بيانات الـAPI مالهاش شروط', 'API data has no terms'), good: T('ليها شروط وحدود', 'It has terms and limits') },
      ] }],
    ],
  });
})();
