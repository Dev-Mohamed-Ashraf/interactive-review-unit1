/* =========================================================
 * content/sheets-4.js — printable summaries of chapter 4.
 * Only data: js/screens/sheet.js draws it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('4-1', {
    lead: T('مفيش وسيط أحسن من التاني: الأنسب بيتحدّد بالغرض والجمهور.', 'No medium is best: purpose and audience decide.'),
    rows: [
      [{ t: 'compare', ic: '📺', title: T('الوسائط الخمسة', 'The five media'),
        cols: [{ ic: '📺', h: T('تلفزيون', 'TV'), c: 'blue' }, { ic: '📻', h: T('راديو', 'Radio'), c: 'amber' }, { ic: '📰', h: T('جرنال', 'Newspaper'), c: 'slate' }, { ic: '🌐', h: T('موقع', 'Website'), c: 'violet' }, { ic: '💬', h: T('تواصل', 'SNS'), c: 'pink' }],
        rows: [
          { k: T('المحتوى', 'Content'), v: [T('فيديو + صوت', 'video + audio'), T('صوت بس', 'audio only'), T('نص + صور', 'text + images'), T('كل الأنواع', 'all types'), T('نص وصور وفيديو', 'text, images, video')] },
          { k: T('الاتجاه', 'Direction'), v: [T('واحد', 'one-way'), T('واحد', 'one-way'), T('واحد', 'one-way'), T('واحد + نماذج', 'one-way + forms'), T('اتجاهين', 'two-way')] },
          { k: T('ميزته', 'Strength'), v: [T('لكتير مرة واحدة', 'many at once'), T('في أي مكان', 'anywhere'), T('من غير إنترنت', 'no internet'), T('يتحدّث', 'updatable'), T('أسرع نشر', 'fastest spread')] },
        ] }],
      [{ t: 'link', ic: '↔️', title: T('اتجاه واحد ولا اتجاهين؟', 'One-way or two-way?'), nodes: [
        { ic: '📣', h: T('المرسل', 'Sender'), c: 'blue' },
        { ic: '👥', h: T('المستقبل', 'Receiver'), c: 'green' },
      ], edges: [{ to: T('اتجاه واحد: رسالة بس', 'one-way: message only'), back: T('اتجاهين: رد ومشاركة', 'two-way: reply, share') }] }],
      [
        { t: 'cards', ic: '🌐', title: T('المواقع: القوة', 'Websites: strengths'), cols: 1, items: [
          { ic: '✅', h: T('نقاط القوة', 'Strengths'), list: [T('متنوعة · تتحدّث', 'varied · updatable'), T('عالمية · تفاعلية', 'global · interactive'), T('متصفح بس', 'just a browser')], c: 'green' },
        ] },
        { t: 'cards', ic: '🚧', title: T('المواقع: القيود', 'Websites: limits'), cols: 1, items: [
          { ic: '⚠️', h: T('القيود', 'Constraints'), list: [T('محتاجة إنترنت', 'need internet'), T('لازم يدوّروا عليها', 'must be searched for'), T('السرعة بتختلف', 'speed varies')], c: 'red' },
        ] },
      ],
      [{ t: 'tree', ic: '🎯', title: T('الاختيار حسب الغرض', 'Choosing by purpose'), root: { h: T('الغرض + الجمهور المستهدف', 'Purpose + target audience'), c: 'violet' }, kids: [
        { ic: '📺', h: T('وصول واسع', 'Wide reach'), p: T('تلفزيون', 'TV'), c: 'blue' },
        { ic: '🌐', h: T('تفاصيل', 'Details'), p: T('موقع', 'website'), c: 'violet' },
        { ic: '✉️', h: T('تواصل مباشر', 'Direct contact'), p: T('إيميل', 'e-mail'), c: 'amber' },
        { ic: '💬', h: T('تناقل', 'Sharing'), p: T('تواصل اجتماعي', 'SNS'), c: 'pink' },
      ] }],
      [{ t: 'note', ic: '🤝', c: 'green', p: T('**غالبًا بنجمع كذا وسيط** — الوسيط اللي يوصّل والوسيط اللي يشرح مش لازم يكونوا واحد.', '**We usually combine media** — what reaches people and what explains need not be the same.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('وسيط واحد دايمًا', 'Always one medium'), good: T('الأنسب حسب الغرض والجمهور', 'The best fit for purpose and audience') },
        { bad: T('الموقع يكفي دايمًا', 'A website is always enough'), good: T('الاختيار حسب الموقف', 'It depends') },
      ] }],
    ],
  });

  RV.addSheet('4-2', {
    lead: T('التصميم بيبدأ من المستخدم مش من المصمّم — وبعدين نرتّب ونجمّل.', 'Design starts from the user, not the designer — then we arrange and polish.'),
    rows: [
      [{ t: 'flow', ic: '🪜', title: T('خطوات التصميم بالترتيب', 'Design steps in order'), items: [
        { ic: '🧑', h: T('شخصية المستخدم', 'Persona'), p: T('عمر · مهنة · هدف · تحديات', 'age · job · goal · challenges'), c: 'pink' },
        { ic: '📐', h: T('الإطار السلكي', 'Wireframe'), p: T('مكان المعلومات وأولويتها', 'placement and priority'), c: 'slate' },
        { ic: '🎨', h: 'CRAP', p: T('مبادئ التصميم الأربعة', 'four design principles'), c: 'violet' },
        { ic: '🎯', h: 'UCD', p: T('من منظور المستخدم', 'from the user’s view'), c: 'green' },
      ] }],
      [
        { t: 'draw', art: 'wire', ic: '📐', title: T('شكل الإطار السلكي', 'A wireframe'), cap: T('من غير لون: النقاش على البنية وأصحاب المصلحة يتفقوا', 'No colour: discussion stays on structure, stakeholders agree') },
        { t: 'cards', ic: '🎨', title: T('مبادئ CRAP', 'CRAP principles'), w: 1.4, cols: 2, items: [
          { ic: '🔆', h: T('التباين', 'Contrast'), p: T('يبرز الأهم: عنوان كبير غامق', 'highlights priority'), c: 'red' },
          { ic: '🔁', h: T('التكرار', 'Repetition'), p: T('نفس الخصائص ← اتساق', 'same style → consistency'), c: 'blue' },
          { ic: '📏', h: T('المحاذاة', 'Alignment'), p: T('خط أساس مشترك ← نظام', 'a shared line → order'), c: 'amber' },
          { ic: '🧲', h: T('التقارب', 'Proximity'), p: T('المرتبط قريب ← مجموعة', 'related items together'), c: 'green' },
        ] },
      ],
      [{ t: 'tree', ic: '🎯', title: T('التصميم المتمحور حول المستخدم (UCD)', 'User-centered design (UCD)'), root: { h: T('من منظور المستخدم مش راحة المصمّم', 'The user’s view, not the designer’s comfort'), c: 'green' }, kids: [
        { ic: '👆', h: T('قابلية الاستخدام', 'Usability'), p: T('سهولة الاستخدام', 'ease of use'), c: 'blue' },
        { ic: '♿', h: T('إمكانية الوصول', 'Accessibility'), p: T('ينفع لفئات واسعة', 'works for many people'), c: 'violet' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('عنوان كبير غامق = تكرار', 'A big bold title = repetition'), good: T('تباين', 'Contrast') },
        { bad: T('تجميع الاسم والسعر والصورة = محاذاة', 'Grouping name, price, image = alignment'), good: T('تقارب', 'Proximity') },
        { bad: T('توحيد خط العناوين = تباين', 'One heading font = contrast'), good: T('تكرار', 'Repetition') },
        { bad: T('التشفير من مبادئ CRAP', 'Encryption is a CRAP principle'), good: T('مش منها', 'It is not') },
      ] }],
    ],
  });

  RV.addSheet('4-3', {
    lead: T('الأرقام بتقول فين المشكلة… والأصوات بتقول ليه — ونجمع الاتنين.', 'Numbers say where… voices say why — combine both.'),
    rows: [
      [{ t: 'tree', ic: '⚖️', title: T('نوعين التقييم', 'Two kinds of evaluation'), root: { h: T('تقييم الموقع', 'Evaluating a site'), c: 'violet' }, kids: [
        { ic: '🔍', h: T('نوعي = ليه؟', 'Qualitative = why?'), list: [T('اختبار الاستخدام: نراقب', 'usability test: observe'), T('المقابلات: نسمع', 'interviews: listen'), T('التقييم الإرشادي: خبراء', 'heuristic: experts')], c: 'violet' },
        { ic: '📊', h: T('كمّي = قد إيه؟', 'Quantitative = how much?'), list: [T('تحليلات الويب: الأساس', 'web analytics: the core'), T('PV · الارتداد · CVR', 'PV · bounce · CVR'), T('اختبار A/B', 'A/B testing')], c: 'blue' },
      ] }],
      [
        { t: 'draw', art: 'funnel', ic: '🎯', title: T('من الزيارة للهدف', 'From visit to goal') },
        { t: 'cards', ic: '📈', title: T('المقاييس الثلاثة', 'The three measures'), cols: 1, items: [
          { ic: '👁️', h: 'PV', p: T('إجمالي مرات مشاهدة الصفحة', 'total page views'), c: 'blue' },
          { ic: '🚪', h: T('معدل الارتداد', 'Bounce rate'), p: T('نسبة الزيارات اللي خلصت بعد صفحة واحدة', 'visits ending after one page'), c: 'amber' },
          { ic: '🎯', h: T('معدل التحويل CVR', 'Conversion rate'), p: T('نسبة اللي حقّقوا الهدف — مساهمة في الأرباح', 'visits reaching the goal — profit'), c: 'green' },
        ] },
      ],
      [{ t: 'cards', ic: '🧑‍💼', title: T('التقييم الإرشادي: قواعد الخبراء', 'Heuristic evaluation: expert rules'), cols: 3, items: [
        { ic: '🔁', h: T('الاتساق', 'Consistency'), p: T('التصميم والعمليات موحّدة', 'unified design and actions'), c: 'violet' },
        { ic: '🛑', h: T('منع الأخطاء', 'Error prevention'), p: T('التصميم يصعّب الغلط', 'design makes mistakes hard'), c: 'red' },
        { ic: '💡', h: T('وضوح حالة النظام', 'Visible status'), p: T('مؤشر تحميل · رسايل خطأ', 'loading · error messages'), c: 'amber' },
      ] }],
      [{ t: 'flow', ic: '🛒', title: T('مثال: PV عالي و CVR واطي', 'Example: high PV, low CVR'), items: [
        { ic: '📊', h: T('الأرقام: فين؟', 'Numbers: where?'), p: T('بين الدخول والشراء', 'between arrival and purchase'), c: 'blue' },
        { ic: '🧪', h: T('اختبار استخدام: ليه؟', 'Usability test: why?'), p: T('زرار الدفع مستخبي', 'the pay button is hidden'), c: 'violet' },
        { ic: '🔧', h: T('نصلّح ونقيس تاني', 'Fix and measure again'), c: 'green' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الارتداد = نسبة تحقيق الهدف', 'Bounce = goal rate'), good: T('ده CVR', 'That is CVR') },
        { bad: T('التقييم الإرشادي كمّي', 'Heuristic evaluation is quantitative'), good: T('نوعي: خبراء + قواعد', 'Qualitative: experts + rules') },
      ] }],
    ],
  });

  RV.addSheet('4-4', {
    lead: T('الموقع عمره ما بيخلص: نسخة أولى، وبعدين تحسين بالتكرار.', 'A website is never finished: a first version, then improvement by repetition.'),
    rows: [
      [
        { t: 'cycle', ic: '🔁', title: T('دورة PDCA', 'The PDCA cycle'), center: T('تحسين مستمر', 'Continuous improvement'), items: [
          { h: T('P · خطّط', 'P · Plan'), p: T('هدف + خطة', 'goal + plan'), c: 'blue' },
          { h: T('D · نفّذ', 'D · Do'), p: T('حسب الخطة', 'as planned'), c: 'green' },
          { h: T('C · تحقّق', 'C · Check'), p: T('نقيس النتايج', 'measure'), c: 'amber' },
          { h: T('A · تصرّف', 'A · Act'), p: T('نقرّر الجاي', 'decide next'), c: 'red' },
        ] },
        { t: 'vflow', ic: '🌐', title: T('مثال: معدل الارتداد', 'Example: bounce rate'), items: [
          { ic: '🎯', h: T('هدف: نقلّل الارتداد 10%', 'Goal: cut bounce by 10%'), c: 'blue' },
          { ic: '🛠️', h: T('نغيّر الصفحة الرئيسية', 'Change the homepage'), c: 'green' },
          { ic: '📏', h: T('نقيس ونقارن بالهدف', 'Measure against the goal'), c: 'amber' },
          { ic: '↩️', h: T('نراجع العناوين أو الصور ونكرّر', 'Revise headings or images, repeat'), c: 'red' },
        ] },
      ],
      [{ t: 'flow', ic: '🧠', title: T('التفكير التصميمي', 'Design thinking'), items: [
        { ic: '🤝', h: T('① تعاطف', '① Empathize'), c: 'pink' },
        { ic: '🎯', h: T('② تعريف', '② Define'), c: 'violet' },
        { ic: '💡', h: T('③ أفكار', '③ Ideate'), c: 'amber' },
        { ic: '🧪', h: T('④ نموذج', '④ Prototype'), c: 'blue' },
        { ic: '👥', h: T('⑤ اختبار', '⑤ Test'), c: 'green' },
      ], back: T('على حسب النتيجة ممكن نرجع للتعاطف أو التعريف', 'Based on results we may return to empathize or define') }],
      [
        { t: 'link', ic: '🆎', title: T('اختبار A/B', 'A/B testing'), w: 1.4, nodes: [
          { ic: '🔴', h: T('الخيار A', 'Option A'), p: T('زرار أحمر', 'a red button'), c: 'red' },
          { ic: '🔵', h: T('الخيار B', 'Option B'), p: T('زرار أزرق', 'a blue button'), c: 'blue' },
        ], edges: [{ to: T('مستخدمين حقيقيين', 'real users'), back: T('نفحص البيانات', 'check the data') }] },
        { t: 'cards', ic: '🔑', title: T('القواعد', 'The rules'), cols: 1, items: [
          { ic: '1️⃣', h: T('عنصر واحد في المرة', 'One element at a time'), c: 'green' },
          { ic: '📊', h: T('بيانات كفاية قبل القرار', 'Enough data first'), c: 'blue' },
        ] },
      ],
      [{ t: 'cards', ic: '🧭', title: T('كل طريقة بتجاوب إيه؟', 'What each answers'), cols: 3, items: [
        { ic: '🔁', h: 'PDCA', p: T('إزاي نكرّر؟', 'how do we repeat?'), c: 'blue' },
        { ic: '🧠', h: T('التفكير التصميمي', 'Design thinking'), p: T('نحسّن إيه؟', 'what do we improve?'), c: 'violet' },
        { ic: '🆎', h: 'A/B', p: T('أنهي خيار؟', 'which option?'), c: 'green' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('PDCA بتخلص في جولة واحدة', 'PDCA ends after one round'), good: T('نتحسّن تدريجيًا بالتكرار', 'Improve gradually by repeating') },
        { bad: T('التفكير التصميمي من منظور المطوّر', 'Design thinking is the developer’s view'), good: T('من منظور المستخدم', 'The user’s view') },
        { bad: T('نغيّر كذا عنصر مع بعض', 'Change several elements together'), good: T('عنصر واحد في المرة', 'One element at a time') },
      ] }],
    ],
  });
})();
