/* =========================================================
 * content/sheets-6.js — printable summaries of chapter 6.
 * Only data: js/screens/sheet.js draws it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('6-1', {
    lead: T('من عينة صغيرة نستنتج عن المجتمع كله — ودايمًا بعدم يقين، فبنقيسه.', 'From a small sample we infer about everyone — always with uncertainty, so we measure it.'),
    rows: [
      [{ t: 'tree', ic: '🔎', title: T('الاستدلال الإحصائي', 'Statistical inference'), root: { h: T('من العينة للمجتمع', 'From sample to population'), c: 'amber' }, kids: [
        { ic: '📏', h: T('التقدير: قد إيه؟', 'Estimation: how much?'), list: [T('نقطي: قيمة واحدة (168 سم)', 'point: one value (168 cm)'), T('فاصل: مدى (166–170 سم)', 'interval: a range (166–170 cm)')], c: 'green' },
        { ic: '⚖️', h: T('اختبار الفرضيات: حقيقي؟', 'Hypothesis testing: real?'), list: [T('H₀: مفيش فرق', 'H₀: no difference'), T('H₁: فيه فرق', 'H₁: a difference')], c: 'violet' },
      ] }],
      [
        { t: 'draw', art: 'intervals', ic: '🎯', title: T('معنى ثقة 95%', 'What 95% confidence means') },
        { t: 'cards', ic: '💡', title: T('افهمها صح', 'Read it right'), cols: 1, items: [
          { h: T('نكرّر الطريقة 100 مرة', 'Repeat the method 100 times'), p: T('~95 فترة فيها الحقيقة', '~95 intervals contain the truth'), c: 'green' },
          { h: T('جملة عن الطريقة', 'A statement about the method'), p: T('مش عن فترة واحدة بعينها', 'not about one interval'), c: 'amber' },
        ] },
      ],
      [{ t: 'flow', ic: '🪜', title: T('خطوات اختبار الفرضيات', 'Steps of a hypothesis test'), items: [
        { h: T('① الفرضيات', '① Hypotheses'), p: 'H₀ · H₁', c: 'slate' },
        { h: T('② مستوى الدلالة', '② Significance level'), p: T('α قبل ما نشوف النتيجة', 'α before seeing results'), c: 'amber' },
        { h: T('③ القيمة الاحتمالية', '③ The p-value'), p: T('من البيانات', 'from the data'), c: 'pink' },
        { h: T('④ الحكم', '④ Judgment'), p: T('نقارن p بـ α', 'compare p with α'), c: 'green' },
      ] }],
      [
        { t: 'draw', art: 'pvalue', ic: '🎯', title: T('p قصاد α', 'p versus α') },
        { t: 'cards', ic: '🧪', title: T('أشهر الاختبارات', 'Major tests'), cols: 2, items: [
          { ic: '📊', h: T('اختبار t', 't-test'), p: T('فرق بين متوسطين', 'difference of two means'), c: 'blue' },
          { ic: '🔢', h: T('مربع كاي χ²', 'Chi-squared χ²'), p: T('علاقة متغيرين فئويين', 'two categorical variables'), c: 'amber' },
        ] },
      ],
      [
        { t: 'compare', ic: '🚨', title: T('الخطأين', 'The two errors'), w: 1.4,
          cols: [{ h: T('النوع الأول', 'Type I'), c: 'red' }, { h: T('النوع التاني', 'Type II'), c: 'amber' }],
          rows: [
            { k: T('إيه اللي حصل', 'What happened'), v: [T('رفضنا H₀ وهي صح', 'rejected a true H₀'), T('ماترفضتش H₀ وهي غلط', 'kept a false H₀')] },
            { k: T('يعني', 'Means'), v: [T('إنذار كاذب', 'false alarm'), T('تفويت اكتشاف', 'a missed discovery')] },
          ] },
        { t: 'draw', art: 'balance', ic: '⚖️', title: T('مفاضلة', 'A trade-off') },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('النقطي بيقدّر جوّه مدى', 'Point estimation gives a range'), good: T('ده الفاصل', 'That is the interval') },
        { bad: T('ثقة 95% = احتمال الحقيقة جوّه', '95% = chance the truth is inside'), good: T('جملة عن الطريقة', 'About the method') },
        { bad: T('تقليل α بيقلّل الخطأين', 'Lower α cuts both errors'), good: T('مفاضلة', 'A trade-off') },
        { bad: T('دالّة إحصائيًا = مهمة عمليًا', 'Significant = important'), good: T('حكم منفصل', 'A separate judgment') },
      ] }],
    ],
  });

  RV.addSheet('6-2', {
    lead: T('معادلة بسيطة تتنبّأ بالنتيجة — بس لازم تتقيّم، وماتثبتش السبب.', 'A simple equation predicts a result — it must be evaluated, and it proves no cause.'),
    rows: [
      [
        { t: 'draw', art: 'regression', ic: '📈', title: T('الانحدار البسيط', 'Simple regression') },
        { t: 'cards', ic: '🧩', title: T('مكوّنات النموذج', 'Parts of the model'), cols: 1, items: [
          { h: T('الاستجابة y', 'Response y'), p: T('النتيجة (التابع)', 'the result'), c: 'blue' },
          { h: T('التفسيري x', 'Explanatory x'), p: T('المدخل اللي بنتنبّأ بيه', 'the input'), c: 'green' },
          { h: T('المعامل a · التقاطع b', 'Coefficient a · intercept b'), p: T('قوة التأثير · الثابت', 'strength · constant'), c: 'amber' },
          { h: T('المربعات الصغرى', 'Least squares'), p: T('تقلّل مجموع مربعات المتبقيات', 'minimizes squared residuals'), c: 'violet' },
        ] },
      ],
      [{ t: 'compare', ic: '🏠', title: T('بسيط ولا متعدد؟', 'Simple or multiple?'),
        cols: [{ h: T('بسيط', 'Simple'), c: 'amber' }, { h: T('متعدد', 'Multiple'), c: 'violet' }],
        rows: [
          { k: T('المعادلة', 'Equation'), v: ['`y = ax + b`', '`y = a₁x₁ + a₂x₂ + … + b`'] },
          { k: T('المتغيرات', 'Variables'), v: [T('متغير تفسيري واحد', 'one explanatory variable'), T('اتنين أو أكتر', 'two or more')] },
          { k: T('مثال', 'Example'), v: [T('الحرارة ← المبيعات', 'temperature → sales'), T('المساحة + العمر + البعد ← السعر', 'area + age + distance → price')] },
        ] }],
      [{ t: 'cards', ic: '🎯', title: T('مؤشرات التقييم مع بعض', 'Evaluation measures together'), cols: 3, items: [
        { ic: '📐', h: 'R²', p: T('0 لـ 1: أقرب لـ 1 = تفسير أحسن', '0–1: closer to 1 explains better'), c: 'green' },
        { ic: '📏', h: 'RMSE', p: T('بيبرز الأخطاء الكبيرة (التربيع)', 'stresses big errors (squaring)'), c: 'red' },
        { ic: '📐', h: 'MAE', p: T('بيقاوم الشواذ', 'resists outliers'), c: 'blue' },
      ] }],
      [
        { t: 'formula', f: 'MAE = (2+3+1+2+12) ÷ 5 = 4', p: T('متوسط الأخطاء المطلقة', 'mean of absolute errors') },
        { t: 'formula', f: 'RMSE = √((4+9+1+4+144) ÷ 5) ≈ 5.7', p: T('الخطأ الكبير 12 رفع الرقم', 'the big error 12 pulls it up') },
      ],
      [
        { t: 'draw', art: 'confounder', ic: '🕵️', title: T('ارتباط ≠ سببية', 'Correlation ≠ causation') },
        { t: 'vflow', ic: '✅', title: T('عشان نقول سببية', 'To claim causation'), items: [
          { h: T('أسبقية زمنية', 'Temporal precedence'), c: 'blue' },
          { h: T('استبعاد العوامل التانية', 'Rule out other factors'), c: 'amber' },
          { h: T('سند نظري', 'Theoretical support'), c: 'green' },
        ] },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('المتعدد بمتغير تفسيري واحد', 'Multiple uses one variable'), good: T('اتنين أو أكتر', 'Two or more') },
        { bad: T('الملاءمة بتثبت السببية', 'A fit proves causation'), good: T('ارتباط بس', 'Correlation only') },
        { bad: T('R² قريب من 1 كفاية', 'R² near 1 is enough'), good: T('مع مؤشرات تانية', 'With other measures') },
        { bad: T('MAE بيدّي الكبير وزن أكبر', 'MAE weights big errors'), good: T('ده RMSE', 'That is RMSE') },
      ] }],
    ],
  });

  RV.addSheet('6-3', {
    lead: T('الرسم الصح بيخلّي النمط يقفز قدامك — بشرط مايضلّلش.', 'The right chart makes the pattern jump out — provided it does not mislead.'),
    rows: [
      [{ t: 'cards', ic: '🎭', title: T('دورين للرسم', 'Two roles of a chart'), cols: 2, items: [
        { ic: '🧠', h: T('فهم المحلّل نفسه', 'The analyst’s understanding'), p: T('التوزيع · الاتجاه · القيم الشاذة', 'distribution · trend · outliers'), c: 'violet' },
        { ic: '📣', h: T('التوصيل للآخرين', 'Communicating to others'), p: T('ننقل النتايج بسهولة فهم', 'convey results clearly'), c: 'green' },
      ] }],
      [{ t: 'draw', art: 'charts', ic: '📊', title: T('اختار الرسم المناسب', 'Choose the right chart') }],
      [{ t: 'compare', ic: '🧭', title: T('إمتى أستخدم إيه؟', 'When to use which'),
        cols: [{ h: T('السؤال', 'Question'), c: 'slate' }, { h: T('الرسم', 'Chart'), c: 'blue' }],
        rows: [
          { k: '1', v: [T('نقارن قيم', 'compare values'), T('أعمدة', 'bar')] },
          { k: '2', v: [T('تغيّر مع الزمن', 'change over time'), T('خطوط', 'line')] },
          { k: '3', v: [T('العلاقة بين كميتين', 'two quantities'), T('مبعثر', 'scatter')] },
          { k: '4', v: [T('قيمة تالتة عبر محورين (يوم × ساعة)', 'a third value on two axes'), T('خريطة حرارية', 'heatmap')] },
          { k: '5', v: [T('فئتين بالنسب (نوع × تفضيل)', 'two categories by share'), T('مخطط المستطيلات', 'mosaic plot')] },
        ] }],
      [{ t: 'flow', ic: '📖', title: T('سرد القصص بالبيانات', 'Data storytelling'), items: [
        { ic: '1️⃣', h: T('الرسالة', 'The message'), p: T('جملة واحدة والعنوان يحملها', 'one sentence, in the title'), c: 'amber' },
        { ic: '2️⃣', h: T('العناصر', 'The elements'), p: T('شيل الزيادة ولوّن المهم', 'cut the rest, colour the key'), c: 'blue' },
        { ic: '3️⃣', h: T('معلومات داعمة', 'Supporting info'), p: T('عنوان · محاور · وحدات · ملاحظات', 'title · axes · units · notes'), c: 'green' },
      ] }],
      [{ t: 'cards', ic: '⚠️', title: T('رسم صح… بيضلّل', 'A correct chart that misleads'), cols: 3, items: [
        { ic: '📉', h: T('محور مش من صفر', 'Axis not from zero'), p: T('98 قصاد 100 تبان أضعاف', '98 vs 100 looks huge'), c: 'red' },
        { ic: '🎨', h: T('ألوان من غير مفتاح', 'Colours without a key'), p: T('مالهاش معنى', 'meaningless'), c: 'amber' },
        { ic: '✂️', h: T('حذف فئات', 'Dropped categories'), p: T('صورة ناقصة', 'an incomplete picture'), c: 'violet' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('ضمّن أكبر عدد من العناصر', 'Include as many elements as possible'), good: T('شيل اللي مالوش علاقة', 'Remove what is irrelevant') },
        { bad: T('نشيل العناوين والمحاور', 'Remove titles and axes'), good: T('معلومات داعمة لازمة', 'Needed supporting info') },
        { bad: T('نقط كتير = مبعثر كفاية', 'Many points = scatter is fine'), good: T('تراكب زائد ← خريطة حرارية', 'Overplotting → heatmap') },
      ] }],
    ],
  });
})();
