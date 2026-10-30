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
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف تجمع بيانات يمكنك الوثوق بها، وكيف يمكن لعينة صغيرة أن تمثل مجتمعًا إحصائيًا كاملًا بعدالة؟', 'How do you collect data you can trust, and how can a small sample fairly represent a whole population?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تميّز بين البيانات الأولية والثانوية ومتى تناسب كل منهما', 'Distinguish primary from secondary data'),
          T('تشرح أخذ العينات وكيف يؤدي التحيّز لاستنتاجات خاطئة', 'Explain sampling and how bias misleads'),
        ] }],
      [{ t: 'sec', n: '1', label: T('مرحلة جمع البيانات', 'The Data Collection Stage') }],
      [{ t: 'flow', ic: '🔁', title: T('مسار التحليل', 'The analysis path'), items: [
        { ic: '🎯', h: T('الغرض يتوضّح', 'Clear purpose'), c: 'amber' },
        { ic: '📥', h: T('جمع البيانات', 'Data collection'), p: T('نخطّط نجمع إيه وإزاي', 'plan what and how'), c: 'blue' },
        { ic: '🗂️', h: T('تنظيم', 'Organize'), c: 'violet' },
        { ic: '📊', h: T('تحليل', 'Analyze'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '🗑️', c: 'red', p: T('بيانات **مش مناسبة للسؤال أو منخفضة الجودة** ← النتايج ممكن تبقى **مضللة** مهما كان التنظيم والتحليل دقيق.', 'Data that **misses the purpose** → sound conclusions are **impossible**, however careful the analysis.') }],
      [{ t: 'sec', n: '2', label: T('البيانات الأولية والثانوية', 'Primary Data and Secondary Data') }],
      [{ t: 'compare', ic: '🗃️', title: T('نوعين البيانات', 'Two kinds of data'),
        cols: [{ ic: '🆕', h: T('البيانات الأولية (Primary data)', 'Primary data'), c: 'green' }, { ic: '📚', h: T('البيانات الثانوية (Secondary data)', 'Secondary data'), c: 'blue' }],
        rows: [
          { k: T('التعريف', 'Definition'), v: [T('يجمعها الباحث أو الفريق مباشرة لغرض الدراسة الحالية', 'newly collected for a purpose'), T('موجودة مسبقًا لغرض سابق ويعاد استخدامها (جمعها آخرون أو الباحث نفسه)', 'collected and published by others')] },
          { k: T('أمثلة', 'Examples'), v: [T('استبيانات · مقابلات · ملاحظة · تجارب', 'surveys · interviews · observation · experiments'), T('بيانات مفتوحة · إحصائيات · تقارير قطاعات', 'open data · statistics · industry reports')] },
          { k: T('قوتها', 'Strength'), v: [T('تتصمّم لتناسب السؤال · جودتها حسب التصميم والتنفيذ', 'original, reliable (core of analysis)'), T('ممكن توفّر وقت وتكلفة', 'a lot in a short time')] },
          { k: T('قيدها', 'Limit'), v: [T('وقت وجهد وتكلفة', 'time, effort, cost'), T('افحص طريقة جمعها وتعريفاتها ونقصها وتحيّزاتها ومناسبتها', 'may not match · bias or omissions when edited')] },
        ] }],
      [{ t: 'note', ic: '🤝', c: 'green', p: T('ممكن **نجمع الاتنين** حسب الغرض والقيود، ومفيش نوع بيضمن الجودة تلقائيًا. فكّر: تعداد حكومي **نزّلته** = بيانات **ثانوية** بالنسبة لك.', 'In practice we **combine both** by purpose and constraints. A government census you **download** is **secondary** for you.') }],
      [{ t: 'sec', n: '3', label: T('أخذ العينات', 'Sampling') }],
      [
        { t: 'draw', art: 'crowd', ic: '👥', title: T('المجتمع والعينة', 'Population and sample'), cap: T('العينة العادلة = نسخة مصغّرة من المجتمع بنفس النسب', 'A fair sample = a miniature of the population, same proportions') },
        { t: 'cards', ic: '📋', title: T('المصطلحات', 'The terms'), w: 1.15, cols: 2, items: [
          { h: T('المجتمع الإحصائي', 'Population'), p: T('كل الأفراد أو العناصر اللي الدراسة تنطبق عليهم', 'the whole group'), c: 'slate' },
          { h: T('العينة', 'Sample'), p: T('جزء ندرسه ونريده يمثّل المجتمع', 'the part studied'), c: 'amber' },
          { h: T('حصر شامل (تعداد)', 'Census'), p: T('نمسح الكل', 'survey everyone'), c: 'violet' },
          { h: T('مسح عينة', 'Sample survey'), p: T('ندرس عينة مختارة', 'survey a chosen sample'), c: 'blue' },
        ] },
      ],
      [{ t: 'compare', ic: '🎲', title: T('طريقتين لأخذ العينات (العشوائي ممكن يقلّل بعض تحيّز الاختيار)', 'Two methods of random sampling: the sample likely represents the population'),
        cols: [{ h: T('المعاينة العشوائية البسيطة', 'Simple random sampling'), c: 'amber' }, { h: T('المعاينة الطبقية', 'Stratified sampling'), c: 'teal' }],
        rows: [
          { k: T('الفكرة', 'Idea'), v: [T('اختيار عشوائي من إطار المجتمع', 'pure chance, no bias'), T('فئات مهمة للسؤال (نوع · سن · صف) ثم عينة من كل فئة بتصميم محدد', 'strata (sex · age · year), then random from each')] },
          { k: T('الفرصة', 'Chance'), v: [T('معروفة ومتساوية لكل واحد', 'known and equal for all'), T('طبقة 50% من المجتمع = 50% من العينة', 'a 50% stratum = 50% of the sample')] },
          { k: T('إمتى', 'When'), v: [T('أساسية وسهلة · محتاجة إطار مناسب نختار منه', 'the basic one · even with little info'), T('تمثيل الفئات المهمة وتحسين الدقة', 'when strata differ → less bias')] },
        ] }],
      [{ t: 'sec', n: '4', label: T('تحيّز أخذ العينات', 'Bias in Surveys') }],
      [{ t: 'cards', ic: '⚠️', title: T('تحيّز المعاينة: طريقة الاختيار بتخلّي ناس أكتر أو أقل احتمالًا للتمثيل ← التعميم مش موثوق', 'Sampling bias: the sample misses the population → no generalizing'), cols: 3, items: [
        { ic: '🙋‍♂️', h: T('الاختيار الذاتي', 'Self-selection'), p: T('استبيان ويب يرد عليه المهتمين بس (مين اتسأل)', 'only those interested reply (who was asked)'), c: 'red' },
        { ic: '🎭', h: T('تحيّز الاستجابة', 'Response bias'), p: T('الإجابة «المرغوبة»: خطأ قياس (إزاي جاوبوا)', 'the “desired” answer: a measurement error (how they answered)'), c: 'amber' },
        { ic: '🚉', h: T('الزمان/المكان', 'Time/location'), p: T('محطة الضهر أيام الشغل: يغيب الموظفين والطلبة', 'a station at noon: workers and students absent'), c: 'violet' },
      ] }],
      [{ t: 'flow', ic: '😬', title: T('واثقة… بس غلط', 'Confident… but wrong'), items: [
        { ic: '🌐', h: T('استبيان ويب عن النوم', 'A web survey on sleep'), c: 'blue' },
        { ic: '😫', h: T('يرد اللي بيناموا قليل', 'Short sleepers reply'), c: 'amber' },
        { ic: '🧮', h: T('متوسط «دقيق»', 'A “precise” mean'), p: T('على المجموعة الغلط', 'on the wrong group'), c: 'red' },
      ] }],
      [{ t: 'note', ic: '🛡️', c: 'green', p: T('**تحيّز المعاينة** بيقلّ بتحسين إطار المعاينة وطريقة الاختيار وتوقيت الوصول. أما صياغة الأسئلة فبتقلّل **أخطاء القياس وتحيّز الاستجابة** — مشكلة مختلفة. والتعميم كمان بيعتمد على حجم العينة وعدم الاستجابة.', 'Bias is hard to remove fully, but **careful design reduces it**: how we choose respondents, word questions and run the survey.') }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('البيانات الأولية سبق جمعها ونشرها من آخرين؟', 'Primary data was already published by others?'), a: T('غلط: دي الثانوية', 'False: that is secondary data') },
        { q: T('اختيار عينة من مجتمع إحصائي', 'Selecting a sample from a population'), a: T('أخذ العينات', 'Sampling') },
        { q: T('تقسيم المجتمع لفئات ثم عينة من كل فئة', 'Divide into strata, then choose from each'), a: T('المعاينة الطبقية', 'Stratified sampling') },
        { q: T('اختيار عشوائي من إطار المجتمع', 'Choosing purely by chance'), a: T('المعاينة العشوائية البسيطة', 'Simple random sampling') },
        { q: T('إنشاء استبيان يناسب غرضك وجمع الردود', 'Creating a survey for your purpose'), a: T('جمع بيانات أولية', 'Collecting primary data') },
        { q: T('دراسة وقت المذاكرة مع مراعاة الفروق بين الصفوف', 'Study time, respecting year differences'), a: T('المعاينة الطبقية', 'Stratified sampling') },
        { q: T('مقابلة المارة قدام محطة وتعميمها على كل المواطنين', 'Interviewing at a station for “all citizens”'), a: T('تحيّز المعاينة', 'Sampling bias') },
        { q: T('الإبلاغ عن وقت دراسة أطول من الحقيقي', 'Reporting more study time than real'), a: T('تحيّز الاستجابة', 'Response bias') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا يمكن لعينة متحيزة أن تجعل التحليل عديم القيمة حتى عندما تكون الحسابات صحيحة.', 'Explain why a biased sample can make an analysis worthless even when the calculations are correct.'), items: [
        T('العينة لازم تبقى نموذجًا مصغرًا للمجتمع', 'A sample must be a miniature of the population'),
        T('لو الاختيار متحيز، النتائج مش بتمثل المجتمع', 'A skewed selection cannot speak for the whole'),
        T('الحساب الصحيح على بيانات غير ممثلة بيدّي إجابة واثقة وخاطئة', 'Correct sums on the wrong group give a confident wrong answer'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('طبقية = ممثّل واحد من كل طبقة', 'Stratified = one representative each'), good: T('طبقات ثم عشوائي من كل طبقة', 'Strata, then random from each') },
        { bad: T('بسيطة = اللي سهل نوصله', 'Simple = whoever is easy to reach'), good: T('صدفة بحتة', 'Pure chance') },
        { bad: T('مسح قدّام محطة = كل المواطنين', 'A station survey = all citizens'), good: T('تحيّز معاينة', 'Sampling bias') },
        { bad: T('الأولية موثوقة تلقائيًا', 'Primary data = already published'), good: T('حسب التصميم والتنفيذ', 'That is secondary data') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('اجمع البيانات المناسبة (أولية أو ثانوية)، وادرس عينة عادلة، واستخدم الاختيار العشوائي البسيط أو الطبقي بحيث تعكس العينة الكل، واحترس من تحيّز أخذ العينات.', 'Collect the right data, study a fair sample of the population, use random sampling so the sample mirrors the whole, and guard against sampling bias.') }],
    ],
  });

  RV.addSheet('5-2', {
    lead: T('البيانات الخام نادرًا ما تكون جاهزة — مدخلات غلط ← مخرجات غلط، وكل خطوة قرار بيقوده الغرض.', 'Raw data is rarely ready — garbage in, garbage out — and each step is a decision led by the purpose.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('لماذا يجب تنظيف البيانات وتحويلها قبل التحليل، وما الخيارات التي ينطوي عليها كل إصلاح؟', 'Why must data be cleaned and transformed before analysis, and what choices does each fix involve?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح التعامل مع القيم المفقودة والشاذة والمكررة', 'Explain handling missing values, outliers, and duplicates'),
          T('تصف تحويل الأنواع والتحجيم وإعادة التشكيل', 'Describe type conversion, scaling and reshaping'),
        ] }],
      [{ t: 'sec', n: '1', label: T('مراحل تنظيف البيانات وتحويلها', 'The Data Cleaning and Transformation Stages') }],
      [{ t: 'flow', ic: '🧭', title: T('رحلة البيانات', 'The data journey'), items: [
        { ic: '📥', h: T('جمع', 'Collect'), c: 'blue' },
        { ic: '🧹', h: T('تنظيف', 'Clean'), p: T('مفقودة · شاذة · مكررة', 'missing · outliers · duplicates'), c: 'amber' },
        { ic: '🔄', h: T('تحويل', 'Transform'), p: T('نوع · مقياس · شكل', 'type · scale · shape'), c: 'violet' },
        { ic: '📊', h: T('تحليل', 'Analyze'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '2', label: T('القيم المفقودة والشاذة والبيانات المكررة', 'Missing Values, Outliers and Duplicates') }],
      [{ t: 'tree', ic: '🧹', title: T('التنظيف: كل مشكلة وعلاجها', 'Cleaning: each problem and its fix'), root: { h: T('تنظيف البيانات (مفيش وصفة واحدة)', 'Data cleaning (no single recipe)'), c: 'amber' }, kids: [
        { ic: '🕳️', h: T('القيم المفقودة', 'Missing values'), p: T('حسب نسبة الفقد ونمطه والغرض', 'by share, pattern, purpose'), list: [T('الحذف: سجل أو متغير لو الفقد قليل ومن غير تحيّز', 'deletion: few, scattered'), T('التعويض: قيمة بديلة (متوسط · وسيط) ونفحص أثرها؛ المتوسط ممكن يقلّل التباين', 'imputation: mean · median · neighbour'), T('وضع علامة: مؤشر إن الغياب ليه معنى', 'flagging: absence has meaning')], c: 'red' },
        { ic: '📈', h: T('القيم الشاذة', 'Outliers'), p: T('بعيدة عن معظم القيم — مش لازم غلط، نتحقق من المصدر', 'far away — not always wrong'), list: [T('قيمة غير طبيعية (خطأ) ← نصحّح أو نحذف', 'abnormal value (error) → fix or delete'), T('قيمة صحيحة ← مانحذفهاش لبُعدها، نقرّر حسب السؤال', 'rare truth → keep for now'), T('«9999» غلطة كتابة ← 9', '“9999” a typo → 9')], c: 'amber' },
        { ic: '👯', h: T('البيانات المكررة', 'Duplicate data'), p: T('بتلخبط نتايج التجميع', 'distort aggregates'), list: [T('ماتتحذفش غير بعد التأكد', 'removed in principle'), T('تكرار غير مقصود لنفس الحدث؟', 'confirm it is a true duplicate'), T('شراء مرتين = عمليتين بيع', 'bought twice = two sales')], c: 'violet' },
      ] }],
      [{ t: 'sec', n: '3', label: T('تحويل النوع والتحجيم وإعادة التشكيل', 'Type Conversion, Scaling and Reshaping') }],
      [{ t: 'tree', ic: '🔄', title: T('التحويل: تلات عائلات', 'Transformation: three families'), root: { h: T('تحويل البيانات', 'Data transformation'), c: 'violet' }, kids: [
        { ic: '🔢', h: T('تحويل نوع البيانات', 'Data type conversion'), p: T('نفرّق بين تغيير النوع وتوحيد الصيغ والترميز', 'numbers as text cannot sum'), list: [T('نص ← رقم: "123" ← 123', 'text → number: "123" → 123'), T('توحيد التاريخ ← 2026-04-01', 'one date → 2026-04-01'), T('توحيد الكتابة: M/F ← Male/Female', 'one notation: M/F → Male/Female')], c: 'blue' },
        { ic: '📏', h: T('التحويل الكمي والتوحيد القياسي', 'Scale'), p: T('للخوارزميات الحساسة للمقياس، مش لكل تحليل', 'bigger numbers dominate'), list: [T('تحجيم Min–Max: نطاق 0–1', 'normalization: fixed 0–1 (images · neural nets)'), T('التوحيد القياسي: البُعد عن المتوسط بوحدات الانحراف المعياري', 'standardization: place within the spread')], c: 'teal' },
        { ic: '🧩', h: T('إعادة التشكيل', 'Reshaping'), p: T('وضّح الغرض الأول', 'purpose first'), list: [T('تحويل محوري Pivot بين طويل وعريض: تاريخ × منتج', 'pivot: date × product'), T('ربط Join بمفتاح أو شرط: «رقم الطالب»', 'join: “student number”'), T('تجميع Aggregation: الإجمالي الشهري', 'aggregation: monthly total')], c: 'green' },
      ] }],
      [
        { t: 'formula', f: 'x′ = (x − min) ÷ (max − min)', p: T('تحجيم Min–Max (التحويل الكمي): من 0 لـ 1', 'Normalization (Min‑Max): 0 to 1 to compare'), ex: T('160 = 0 · 170 = 0.5 · 180 = 1', '160 = 0 · 170 = 0.5 · 180 = 1') },
        { t: 'formula', f: 'z = (x − mean) ÷ SD', p: T('التوحيد القياسي: متوسط 0 وانحراف معياري 1', 'Standardization: mean 0, SD 1'), ex: T('القيمة بعيدة كام انحراف معياري — نقارن طالب في امتحانات مختلفة', 'SDs from the mean — compare across exams') },
      ],
      [{ t: 'draw', art: 'scale', ic: '📐', title: T('ليه نوحّد المقياس؟', 'Why unify the scale?'), cap: T('في الخوارزميات الحساسة، المتغير الأكبر نطاقًا بيأثّر أكتر لمجرد مقياسه', 'Height looks “more important” only because of its numbers') }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('تنظيف البيانات بيتم قبل جمعها؟', 'Data cleaning happens before collection?'), a: T('غلط: بعد الجمع', 'False: after collection') },
        { q: T('استجابات القيم المفقودة؟', 'Responses to missing values?'), a: T('الحذف · التعويض · وضع علامة', 'Deletion · imputation · flagging') },
        { q: T('كل القيم الشاذة أخطاء لازم تتحذف؟', 'All outliers are errors to delete?'), a: T('غلط: ممكن تكون قيمة حقيقية نادرة', 'False: they may reflect reality') },
        { q: T('تحويل البيانات لنطاق من 0 إلى 1', 'Convert data to a range from 0 to 1'), a: T('تحجيم Min–Max (التحويل الكمي)', 'Normalization') },
        { q: T('متوسط 0 وانحراف معياري 1', 'Mean 0, standard deviation 1'), a: T('التوحيد القياسي', 'Standardization') },
        { q: T('ربط مجموعات بيانات عبر عنصر مشترك', 'Connect datasets via a common item'), a: T('الربط', 'Join') },
        { q: T('الإجمالي الشهري من المبيعات اليومية', 'Monthly totals from daily sales'), a: T('التجميع', 'Aggregation') },
        { q: T('مبيعات يومية ← جدول التاريخ × المنتج', 'Daily sales → date × product table'), a: T('التحويل المحوري', 'Pivot') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح باستخدام «مدخلات خاطئة — مخرجات خاطئة» لماذا يهم تحضير البيانات بقدر التحليل نفسه.', 'Explain, using “garbage in, garbage out,” why data preparation matters as much as the analysis itself.'), items: [
        T('بيانات معيبة بتطلع نتائج مضللة مهما كان التحليل دقيق', 'Flawed data yields flawed conclusions however careful the sums'),
        T('مثال تنظيف: نعالج القيم المفقودة بناءً على سبب الفقد', 'A cleaning fix: handle missing values by their cause'),
        T('مثال تحويل: أرقام مخزنة كنص بتتحول لرقم عشان الحساب', 'A transformation: numbers stored as text become numeric'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
          { bad: T('الكمي: متوسط 0 وانحراف 1', 'Normalization: mean 0, SD 1'), good: T('ده القياسي؛ الكمي 0 لـ 1', 'That is standardization') },
          { bad: T('الشاذة دايمًا تتمسح', 'Always delete outliers'), good: T('ممكن تكون حقيقة نادرة', 'May be a rare truth') },
          { bad: T('الإجمالي الشهري = محوري', 'Monthly total = pivot'), good: T('ده تجميع', 'That is aggregation') },
          { bad: T('جدولين بمفتاح = تجميع', 'Two tables by a key = aggregation'), good: T('ده ربط', 'That is a join') },
          { bad: T('التحجيم لازم في كل تحليل', 'Cleaning comes before collection'), good: T('لو الخوارزمية حساسة بس', 'After collection') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('نظّف أولًا (القيم المفقودة والشاذة والتكرارات)، ثم حوّل (الأنواع، والتحجيم، وإعادة التشكيل بالمحور والربط والتجميع). كل إصلاح حكم يحدده الغرض.', 'Clean first (missing values, outliers, duplicates), then transform (convert types, normalize or standardize, reshape). Every fix is a judgment set by the purpose — garbage in, garbage out.') }],
    ],
  });

  RV.addSheet('5-3', {
    lead: T('المجاني أو المتاح للعموم مش دايمًا مفتوح: لازم ترخيص أو شروط تسمح بالوصول وإعادة الاستخدام وإعادة التوزيع.', 'Data free for all… but know where to get it, how, and how it may be used.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('من أين تأتي البيانات المفتوحة الموثوقة، وكيف تجلبها البرامج، وما القواعد التي تحكم استخدامها؟', 'Where does reliable open data come from, how do programs fetch it, and what rules govern its use?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح مفهوم البيانات المفتوحة وأهم مصادرها الموثوقة', 'Explain what open data is and its reliable sources'),
          T('تصف الحصول عليها عبر API وأهمية الشروط وذكر المصدر', 'Describe APIs, terms of use and source citation'),
        ] }],
      [{ t: 'sec', n: '1', label: T('استخدام البيانات المفتوحة', 'Using Open Data') }],
      [{ t: 'cards', ic: '✅', title: T('قبل الاستخدام افحص 4 حاجات', 'Before you use it, know'), cols: 4, items: [
        { h: T('المصدر وجودته', 'Where to get it'), p: T('الناشر · التحديث · طريقة الجمع', 'choose highly reliable sources'), c: 'blue' },
        { h: T('طريقة الوصول', 'How to get it'), p: T('تنزيل · API · أدوات تانية', 'browser or API'), c: 'violet' },
        { h: T('الترخيص أو الشروط', 'How to use it'), p: T('إيه المسموح', 'the terms of use'), c: 'amber' },
        { h: T('مناسبتها للسؤال', 'Fit to the purpose'), p: T('التعريفات والفترات', 'match the analysis'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '2', label: T('مصادر البيانات المفتوحة الرئيسية', 'Major Open Data Sources') }],
      [{ t: 'cards', ic: '🏦', title: T('أمثلة مصادر: حكومات ومنظمات وباحثون وشركات، ونقيّم كل مجموعة', 'Sources: official providers and platforms such as Kaggle, whose reliability varies'), items: [
        { ic: '🏦', h: 'World Bank Open Data', p: T('اقتصاد · سكان · تعليم · صحة ← مقارنات دولية واتجاهات كل دولة', 'economy · population · education · health → comparisons, country trends'), c: 'blue' },
        { ic: '🌐', h: 'UN Data', p: T('الأمم المتحدة ووكالاتها ← قضايا عالمية: سكان · تنمية · بيئة', 'the UN and agencies → global issues: population, development, environment'), c: 'violet' },
        { ic: '🏆', h: 'Kaggle', p: T('مسابقات تحليل + مجموعات متنوعة ← التعلّم الآلي والبحث · قيّم مصدر كل مجموعة وترخيصها', 'competitions + varied datasets → ML and research'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '3', label: T('الحصول على البيانات عبر API', 'Obtaining Data via APIs') }],
      [{ t: 'compare', ic: '🖱️', title: T('المتصفح ولا الـAPI؟', 'Browser or API?'),
        cols: [{ h: T('المتصفح', 'Browser'), c: 'slate' }, { h: T('API: قواعد يطلب بيها برنامج بيانات أو وظائف', 'API: rules for programs'), c: 'blue' }],
        rows: [
          { k: T('الطريقة', 'How'), v: [T('ندوّر وننزّل بإيدينا', 'search and download by hand'), T('البرنامج يبعت الطلب مباشرة', 'the program requests directly')] },
          { k: T('200 دولة × 20 سنة', '200 countries × 20 years'), v: [T('مستحيل عمليًا', 'practically impossible'), T('سطر واحد ويتكرّر آليًا', 'one line, repeated automatically')] },
        ] }],
      [{ t: 'link', ic: '🔌', title: T('رحلة طلب الـAPI', 'The API request journey'), nodes: [
        { ic: '💻', h: T('العميل', 'Client'), p: T('برنامجك: عايز سكان مصر 2024', 'your program: Egypt’s population, 2024'), c: 'blue' },
        { ic: '🗄️', h: T('الخادم', 'Server'), p: T('يعالج الطلب ويرجّع الرد', 'processes and replies'), c: 'violet' },
      ], edges: [{ to: T('① طلب لنقطة النهاية', '① request to the endpoint'), back: T('② استجابة: بيانات أو رسالة خطأ', '② JSON response') }] }],
      [
        { t: 'flow', ic: '🪜', title: T('الخطوات', 'The steps'), w: 1.5, items: [
          { ic: '📍', h: T('① نقطة النهاية (Endpoint)', '① Endpoint'), p: T('عنوان أو مسار محدد في API يستقبل نوع معيّن من الطلبات', 'a URL naming the data · wrong? an error'), c: 'amber' },
          { ic: '🧾', h: T('② JSON', '② JSON'), p: T('صيغة نصية: كائنات ومصفوفات وقيم · مش الصيغة الوحيدة', '“name: value” pairs'), c: 'green' },
          { ic: '🔁', h: T('③ استخدام', '③ Use'), p: T('يقرا الرد ويستخدم البيانات أو يتعامل مع الخطأ', 'reads value, repeats'), c: 'blue' },
        ] },
        { t: 'draw', art: 'json', ic: '🧾', title: T('شكل الرد', 'The response') },
      ],
      [{ t: 'sec', n: '4', label: T('استخدام البيانات والإشارة إلى المصدر', 'Data Use and Source Citation') }],
      [
        { t: 'cards', ic: '🚦', title: T('الـAPI مابيلغيش القواعد', 'An API does not cancel the rules'), cols: 1, items: [
          { h: T('امشِ على شروط المزوّد', 'Follow the provider’s terms'), c: 'green' },
          { h: T('حدود الطلبات وسياسات الحفظ والنشر', 'Request limit: do not overload'), c: 'red' },
          { h: T('اتأكّد من نطاق الاستخدام المسموح', 'Check the permitted scope'), c: 'amber' },
        ] },
        { t: 'cards', ic: '📜', title: T('الترخيص وشروط الاستخدام: لكل مجموعة', 'Terms of use: per dataset'), cols: 1, items: [
          { ic: '📗', h: T('استخدام حر مع ذكر المصدر', 'Free use with attribution'), c: 'green' },
          { ic: '📙', h: T('ممنوع الاستخدام التجاري', 'No commercial use'), c: 'amber' },
          { ic: '📕', h: T('ممنوع إعادة النشر', 'No redistribution'), c: 'red' },
        ] },
        { t: 'vflow', ic: '🏷️', title: T('ذكر المصدر: دايمًا', 'Source citation: always'), items: [
          { h: T('الجهة الناشرة · اسم المجموعة', 'Provider · data name'), c: 'violet' },
          { h: T('الإصدار أو تاريخ الوصول · الرابط', 'Date obtained · URL'), c: 'violet' },
          { h: T('غيرك يلاقيها ويقيّمها، ومايثبتش الموثوقية لوحده', 'Reliability + others can verify'), c: 'green' },
        ] },
      ],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('إحصاءات عن الاقتصاد والسكان والتعليم لدول العالم', 'Economy, population and education statistics of countries'), a: T('World Bank Open Data', 'World Bank Open Data') },
        { q: T('إحصاءات تنشرها الأمم المتحدة ووكالاتها', 'Statistics from the UN and its agencies'), a: T('UN Data', 'UN Data') },
        { q: T('منصة تجري مسابقات تحليل البيانات', 'A platform running data analysis competitions'), a: T('Kaggle', 'Kaggle') },
        { q: T('طالما البيانات مفتوحة نستخدمها من غير فحص الشروط؟', 'Open data needs no check of the terms?'), a: T('غلط: لكل مجموعة شروطها', 'False: terms differ per dataset') },
        { q: T('العنوان أو المسار اللي بيستقبل الطلب', 'The URL a request is sent to'), a: T('نقطة النهاية (Endpoint)', 'Endpoint') },
        { q: T('صيغة نصية شائعة تعيدها واجهات API', 'The most common format returned by APIs'), a: T('JSON', 'JSON') },
        { q: T('تسلسل الحصول على البيانات عبر API؟', 'The flow of getting data via an API?'), a: T('العميل يطلب والخادم يعيد الاستجابة', 'The client requests, the server responds') },
        { q: T('مقارنة الناتج المحلي بين الدول: أنهي مصدر؟', 'Comparing GDP across countries: which source?'), a: T('World Bank Open Data', 'World Bank Open Data') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا يجب على المحلل التحقق من شروط الاستخدام والإشارة إلى المصدر حتى عندما تكون البيانات مجانية ومفتوحة.', 'Explain why an analyst must check the terms of use and cite the source even when the data is free and open.'), items: [
        T('حقك في الاستخدام بتحدده شروط كل مجموعة', 'Your right to use the data is set per dataset'),
        T('ذكر المصدر بيساعد الآخرين يلاقوها ويقيّموها', 'Citing shows reliability'),
        T('وبيسمح لغيرك يراجع التحليل', 'It also lets others verify the analysis'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('المفتوحة من غير فحص الشروط', 'Open data needs no terms check'), good: T('لازم نفحص شروط كل مجموعة', 'Check each dataset’s terms') },
        { bad: T('مجانية يبقى مفتوحة', 'Free means no rules'), good: T('لازم ترخيص يسمح بإعادة الاستخدام', 'Scope is set per dataset') },
        { bad: T('ذكر المصدر للمدفوعة بس', 'Citation is for paid data only'), good: T('ذكر المصدر دايمًا', 'Always cite') },
        { bad: T('بيانات الـAPI مالهاش شروط', 'API data has no terms'), good: T('ليها شروط وحدود', 'It has terms and limits') },
        { bad: T('الخادم بيبعت من طرف واحد على طول', 'The server just pushes data'), good: T('العميل يطلب والخادم يرد', 'The client asks, the server replies') },
        { bad: T('العملاء يتبادلوا مباشرة', 'Clients swap data directly'), good: T('عن طريق الخادم', 'Through the server') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('اختر مصدرًا موثوقًا يناسب غرضك، واجلب البيانات عبر المتصفح أو واجهة API (العميل يطلب نقطة نهاية والخادم يعيد الاستجابة)، واتبع دائمًا شروط الاستخدام وأشر إلى المصدر.', 'Pick a reliable open data source for your purpose, fetch by browser or API (client requests an endpoint; server returns JSON), and always follow the terms of use and cite the source.') }],
    ],
  });
})();
