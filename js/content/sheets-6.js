/* =========================================================
 * content/sheets-6.js — printable summaries of chapter 6.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('6-1', {
    lead: T('من عينة بنستنتج عن المجتمع، ودايمًا مع عدم يقين — والدلالة الإحصائية مش هي الأهمية العملية.', 'From a sample we infer about a population, always with uncertainty — significance is not practical importance.'),
    rows: [
      [{ t: 'tree', ic: '🔎', title: T('الاستدلال الإحصائي: نهجين', 'Statistical inference: two approaches'), root: { h: T('عينة ← نستنتج خصائص المجتمع', 'Sample → infer about the population'), c: 'amber' }, kids: [
        { ic: '📏', h: T('التقدير', 'Estimation'), p: T('بأرقام: متوسط طول المجتمع', 'in numbers: the mean height'), c: 'green' },
        { ic: '⚖️', h: T('اختبار الفرضيات', 'Hypothesis testing'), p: T('نحكم على ادعاء: طريقة جديدة أحسن؟', 'judge a claim: is the new method better?'), c: 'violet' },
      ] }],
      [{ t: 'compare', ic: '📍', title: T('نقطي ولا فاصل؟', 'Point or interval?'),
        cols: [{ h: T('التقدير النقطي', 'Point estimation'), c: 'pink' }, { h: T('التقدير الفاصل', 'Interval estimation'), c: 'amber' }],
        rows: [
          { k: T('الناتج', 'Result'), v: [T('قيمة واحدة: ≈ 168 سم', 'one value: ≈ 168 cm'), T('مدى = فترة الثقة: 166–170 سم', 'a range = confidence interval: 166–170 cm')] },
          { k: T('ميزته', 'Pro'), v: [T('سهل الفهم', 'easy to grasp'), T('بيوضّح عدم اليقين', 'shows the uncertainty')] },
          { k: T('عيبه', 'Con'), v: [T('عدم اليقين مش باين', 'uncertainty is hidden'), T('ليه عرض: حذر في التفسير', 'has a width: interpret with care')] },
        ] }],
      [
        { t: 'draw', art: 'intervals', ic: '🔁', title: T('مستوى الثقة (95% أو 99%)', 'Confidence level (95% or 99%)') },
        { t: 'cards', ic: '💡', title: T('افهمها صح', 'Read it right'), cols: 1, items: [
          { h: T('نكرّر الطريقة 100 مرة', 'Repeat the method 100 times'), p: T('~95 فترة فيها المتوسط الحقيقي', '~95 intervals contain the true mean'), c: 'green' },
          { h: T('جملة عن الطريقة', 'A statement about the method'), p: T('مش «احتمال 95%» للفترة دي بالذات', 'not “95% chance” for this interval'), c: 'amber' },
        ] },
      ],
      [{ t: 'compare', ic: '⚖️', title: T('الفرضيتين', 'The two hypotheses'),
        cols: [{ h: T('فرضية العدم H₀', 'Null hypothesis H₀'), c: 'slate' }, { h: T('الفرضية البديلة H₁', 'Alternative hypothesis H₁'), c: 'violet' }],
        rows: [
          { k: T('المعنى', 'Meaning'), v: [T('نقطة البداية: مفيش فرق/علاقة', 'the start: no difference/relationship'), T('نعتمدها لو رفضنا H₀: فيه فرق', 'adopted if H₀ is rejected')] },
          { k: T('ليه؟', 'Why?'), v: [T('أسهل نبيّن إن البيانات بعيدة الاحتمال لو H₀ صح', 'easier to show the data is unlikely under H₀'), T('الحكم: H₀ مرفوضة أو مش مرفوضة', 'verdict: reject H₀ or not')] },
        ] }],
      [{ t: 'flow', ic: '🪜', title: T('الخطوات الأربعة (مثال طريقتين تعلّم)', 'The four steps (two teaching methods)'), items: [
        { h: T('① الفرضيات', '① Hypotheses'), p: T('H₀: مفيش فرق · H₁: الجديدة أعلى', 'H₀: none · H₁: new is higher'), c: 'slate' },
        { h: T('② مستوى الدلالة α', '② Significance level α'), p: T('0.05 أو 0.01 قبل النتيجة', '0.05 or 0.01 beforehand'), c: 'amber' },
        { h: T('③ القيمة الاحتمالية p', '③ The p-value'), p: T('من البيانات: 0.02', 'from the data: 0.02'), c: 'pink' },
        { h: T('④ الحكم', '④ Judgment'), p: T('0.02 < 0.05 ← نرفض H₀', '0.02 < 0.05 → reject H₀'), c: 'green' },
      ] }],
      [
        { t: 'draw', art: 'pvalue', ic: '🎯', title: T('p قصاد α', 'p versus α'), cap: T('p: احتمال نتيجة متطرفة كده أو أكتر لو H₀ صح · نفس p = 0.04: نرفض عند 0.05 ومانرفضش عند 0.01', 'p: chance of a result this extreme if H₀ holds · p = 0.04: reject at 0.05, not at 0.01') },
        { t: 'cards', ic: '🧪', title: T('أشهر طرق الاختبار', 'Major tests'), cols: 1, items: [
          { ic: '📊', h: T('اختبار t', 't-test'), p: T('فرق بين متوسطي مجموعتين', 'difference of two group means'), c: 'blue' },
          { ic: '🔢', h: T('اختبار مربع كاي', 'Chi-squared test'), p: T('علاقة متغيرين فئويين: الصف × تفضيل المادة', 'two categorical variables: year × favourite subject'), c: 'amber' },
        ] },
      ],
      [
        { t: 'compare', ic: '🚨', title: T('الخطأين', 'The two errors'), w: 1.4,
          cols: [{ h: T('خطأ النوع الأول', 'Type I error'), c: 'red' }, { h: T('خطأ النوع الثاني', 'Type II error'), c: 'amber' }],
          rows: [
            { k: T('إيه اللي حصل', 'What happened'), v: [T('رفضنا H₀ وهي صح', 'rejected a true H₀'), T('مارفضناش H₀ وهي غلط', 'kept a false H₀')] },
            { k: T('يعني', 'Means'), v: [T('إنذار كاذب', 'false alarm'), T('تفويت اكتشاف', 'a missed discovery')] },
          ] },
        { t: 'draw', art: 'balance', ic: '⚖️', title: T('مفاضلة', 'A trade-off') },
      ],
      [{ t: 'note', ic: '📉', c: 'amber', p: T('**خد بالك في التفسير:** مع 100,000 مستخدم، فرق نقر 0.4% قصاد 0.5% ممكن يبقى دالّ — بس هل بيجيب ربح؟ ده حكم من منظور تاني. ولو التغيير مكلّف، احترس من النوع الأول (α أصغر).', '**Interpret with care:** with 100,000 users, 0.4% vs 0.5% clicks may be significant — but profitable? A separate judgment. If change is costly, guard against Type I (smaller α).') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('النقطي بيقدّر جوّه مدى', 'Point estimation gives a range'), good: T('ده الفاصل', 'That is the interval') },
        { bad: T('ثقة 95% = احتمال الحقيقة جوّه', '95% = chance the truth is inside'), good: T('جملة عن الطريقة', 'About the method') },
        { bad: T('تقليل α بيقلّل الخطأين', 'Lower α cuts both errors'), good: T('مفاضلة', 'A trade-off') },
        { bad: T('p = احتمال إن H₀ صح', 'p = chance H₀ is true'), good: T('مش كده', 'It is not') },
        { bad: T('p صغيرة = تأثير كبير', 'Small p = big effect'), good: T('مش معناها كده', 'It does not mean that') },
        { bad: T('p < 0.05 حقيقة مطلقة', 'p < 0.05 is absolute truth'), good: T('قاعدة إجرائية للحكم', 'A procedural rule') },
        { bad: T('دالّة إحصائيًا = مهمة عمليًا', 'Significant = important'), good: T('حكم منفصل', 'A separate judgment') },
      ] }],
    ],
  });

  RV.addSheet('6-2', {
    lead: T('الانحدار بيعبّر عن العلاقة كمعادلة للتنبّؤ والمحاكاة — نقيّمه، وماتخلطش الملاءمة بالسببية.', 'Regression states a relationship as an equation to predict and simulate — evaluate it, and never confuse fit with cause.'),
    rows: [
      [
        { t: 'draw', art: 'regression', ic: '📈', title: T('الانحدار البسيط: خط الانحدار', 'Simple regression: the regression line') },
        { t: 'cards', ic: '🧩', title: T('مكوّنات تحليل الانحدار', 'Parts of regression analysis'), cols: 1, items: [
          { h: T('متغير الاستجابة y', 'Response variable y'), p: T('النتيجة (التابع): المبيعات', 'the result: sales'), c: 'blue' },
          { h: T('المتغير التفسيري x', 'Explanatory variable x'), p: T('المدخل: الحرارة', 'the input: temperature'), c: 'green' },
          { h: T('النموذج', 'The model'), p: T('تمثيل مبسّط · من غير تقييم مالوش فايدة', 'a simplified picture · useless unevaluated'), c: 'violet' },
          { h: T('المربعات الصغرى', 'Least squares'), p: T('تقلّل مجموع مربعات المتبقيات (الفعلي − الخط)', 'minimize squared residuals (actual − line)'), c: 'amber' },
        ] },
      ],
      [{ t: 'compare', ic: '🏠', title: T('بسيط ولا متعدد؟', 'Simple or multiple?'),
        cols: [{ h: T('الانحدار البسيط', 'Simple regression'), c: 'amber' }, { h: T('الانحدار المتعدد', 'Multiple regression'), c: 'violet' }],
        rows: [
          { k: T('المعادلة', 'Equation'), v: ['`y = ax + b`', '`y = a₁x₁ + a₂x₂ + … + b`'] },
          { k: T('المتغيرات', 'Variables'), v: [T('متغير تفسيري واحد', 'one explanatory variable'), T('اتنين أو أكتر', 'two or more')] },
          { k: T('ميزته', 'Pro'), v: [T('بسيط وسهل التفسير', 'simple to interpret'), T('علاقات معقّدة وعوامل كتير', 'complex relationships, many factors')] },
          { k: T('مثال', 'Example'), v: [T('الحرارة ← المبيعات', 'temperature → sales'), T('المساحة + العمر + البعد عن المحطة ← السعر', 'area + age + distance → price')] },
        ] }],
      [{ t: 'note', ic: '🔤', c: 'blue', p: T('**المعامل** (a) = قوة تأثير المتغير · **نقطة التقاطع** (b) = الثابت.', 'The **coefficient** (a) = the variable’s strength · the **intercept** (b) = the constant.') }],
      [{ t: 'cards', ic: '🎯', title: T('مؤشرات التقييم: مع بعض', 'Evaluation measures: together'), cols: 3, items: [
        { ic: '📐', h: T('R² معامل التحديد', 'R² coefficient of determination'), p: T('0 لـ 1: قد إيه بيفسّر التباين · ملموم 0.95 · متبعتر 0.30', '0–1: variation explained · tight 0.95 · scattered 0.30'), c: 'green' },
        { ic: '📏', h: 'RMSE', p: T('جذر متوسط المربعات · يبرز الأخطاء الكبيرة (مكلّفة؟ استخدمه)', 'root mean square · stresses big errors (use when costly)'), c: 'red' },
        { ic: '📐', h: 'MAE', p: T('متوسط القيم المطلقة · يقاوم الشواذ (يوم مهرجان)', 'mean absolute · resists outliers (a festival day)'), c: 'blue' },
      ] }],
      [
        { t: 'formula', f: 'MAE = (2+3+1+2+12) ÷ 5 = 4', p: T('الأخطاء: +2، −3، +1، −2، +12', 'Errors: +2, −3, +1, −2, +12'), ex: T('الاتنين بوحدة الاستجابة · أصغر = أدق', 'Both in response units · smaller = better') },
        { t: 'formula', f: 'RMSE = √((4+9+1+4+144) ÷ 5) ≈ 5.7', p: T('√32.4 ≈ 5.7', '√32.4 ≈ 5.7'), ex: T('خطأ الـ12 «اتعاقب» بالتربيع', 'The 12 is “punished” by squaring') },
      ],
      [
        { t: 'draw', art: 'confounder', ic: '🕵️', title: T('ارتباط ≠ سببية: العامل المربِك', 'Correlation ≠ causation: the confounder') },
        { t: 'vflow', ic: '✅', title: T('عشان تدّعي سببية', 'To claim causation'), items: [
          { h: T('أسبقية زمنية', 'Temporal precedence'), p: T('السبب قبل النتيجة', 'cause before effect'), c: 'blue' },
          { h: T('استبعاد العوامل التانية', 'Rule out other factors'), c: 'amber' },
          { h: T('سند نظري', 'Theoretical support'), c: 'green' },
        ] },
      ],
      [{ t: 'cards', ic: '⚠️', title: T('تنبيهات', 'Cautions'), cols: 3, items: [
        { h: T('النموذج مابيخلصش بإنشائه', 'Not done when built'), p: T('أكّد الدقة وماتطبّقوش برّه مدى البيانات', 'confirm accuracy; stay in the data’s range'), c: 'amber' },
        { h: T('مش R² لوحده', 'Not R² alone'), p: T('مع المؤشرات التانية', 'with the other measures'), c: 'blue' },
        { h: T('متغيرات أكتر ≠ أحسن', 'More variables ≠ better'), p: T('المفرط في الملاءمة بيطارد الضوضاء', 'overfitting chases noise'), c: 'red' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('المتعدد بمتغير تفسيري واحد', 'Multiple uses one variable'), good: T('اتنين أو أكتر', 'Two or more') },
        { bad: T('الملاءمة بتثبت السببية', 'A fit proves causation'), good: T('ارتباط بس', 'Correlation only') },
        { bad: T('R² قريب من 1 كفاية', 'R² near 1 is enough'), good: T('مع مؤشرات تانية', 'With other measures') },
        { bad: T('RMSE وMAE دايمًا متساويين', 'RMSE and MAE are always equal'), good: T('حسابين مختلفين', 'Different calculations') },
        { bad: T('MAE بيدّي الكبير وزن أكبر', 'MAE weights big errors'), good: T('ده RMSE', 'That is RMSE') },
      ] }],
    ],
  });

  RV.addSheet('6-3', {
    lead: T('التمثيل المرئي بيحوّل الأرقام لأنماط — للمحلّل وللتواصل — برسالة واضحة وتسميات صادقة.', 'Visualization turns numbers into patterns — for the analyst and for others — with a clear message and honest labels.'),
    rows: [
      [{ t: 'cards', ic: '🎭', title: T('تمثيل البيانات المرئي: دورين', 'Data visualization: two roles'), cols: 2, items: [
        { ic: '🧠', h: T('فهم المحلّل نفسه', 'The analyst’s own understanding'), p: T('التوزيع · الاتجاه · القيم الشاذة (وقت المذاكرة كخط)', 'distribution · trend · outliers (study time as a line)'), c: 'violet' },
        { ic: '📣', h: T('التوصيل للآخرين', 'Communicating to others'), p: T('ننقل النتيجة بسهولة (متوسط كل فصل كأعمدة)', 'convey results easily (class means as bars)'), c: 'green' },
      ] }],
      [{ t: 'draw', art: 'charts', ic: '📊', title: T('اختار الرسم المناسب', 'Choose the right chart') }],
      [{ t: 'compare', ic: '🧭', title: T('إمتى أستخدم إيه؟ حسب عدد المتغيرات ونوعها والغرض', 'Which when? By number and type of variables, and purpose'),
        cols: [{ h: T('السؤال', 'Question'), c: 'slate' }, { h: T('الرسم', 'Chart'), c: 'blue' }],
        rows: [
          { k: '1', v: [T('نقارن قيم', 'compare values'), T('أعمدة (Bar)', 'bar graph')] },
          { k: '2', v: [T('تغيّر مع الزمن', 'change over time'), T('خطوط (Line)', 'line graph')] },
          { k: '3', v: [T('متغيرين كمّيين (نقط مش كتير)', 'two quantities (few points)'), T('مبعثر (Scatter)', 'scatter plot')] },
          { k: '4', v: [T('قيمة تالتة باللون عبر محورين: يوم × وقت · مدينة × شهر', 'a third value by colour: day × hour · city × month'), T('خريطة حرارية', 'heatmap')] },
          { k: '5', v: [T('فئتين بالنسب: الصف × المادة المفضّلة', 'two categories by share: year × subject'), T('مخطط المستطيلات', 'mosaic plot')] },
        ] }],
      [{ t: 'flow', ic: '😵', title: T('التراكب الزائد للنقاط', 'Overplotting'), items: [
        { ic: '✳️', h: T('5000 نقطة', '5,000 points'), p: T('وقت المذاكرة × الدرجة', 'study time × score'), c: 'slate' },
        { ic: '🌫️', h: T('كتلة صمّاء', 'A solid blob'), p: T('الكثافة بتختفي', 'density disappears'), c: 'red' },
        { ic: '🌡️', h: T('خريطة حرارية', 'Heatmap'), p: T('فين معظم الطلبة بنظرة', 'where most students are'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '🧩', c: 'blue', p: T('**مخطط المستطيلات (الفسيفساء):** عرض العمود = نسبة الفئة · ارتفاع الشريحة = نسبتها جوّه مجموعتها · المساحة = نسبة التوليفة.', '**Mosaic plot:** column width = category share · slice height = share within its group · area = share of the combination.') }],
      [{ t: 'flow', ic: '📖', title: T('سرد القصص بالبيانات', 'Data storytelling'), items: [
        { ic: '1️⃣', h: T('وضّح الرسالة', 'Clarify the message'), p: T('جملة واحدة والعنوان يحمل الادعاء', 'one sentence, the title claims it'), c: 'amber' },
        { ic: '2️⃣', h: T('اختار العناصر', 'Select elements'), p: T('شيل اللي مالوش علاقة ولوّن المهم بس', 'cut the rest, colour the key part'), c: 'blue' },
        { ic: '3️⃣', h: T('معلومات داعمة', 'Supporting information'), p: T('عنوان · محاور · وحدات · ملاحظات', 'title · axes · units · notes'), c: 'green' },
      ] }],
      [{ t: 'cards', ic: '⚠️', title: T('رسم بياناته صح… بيضلّل', 'Correct data, a misleading chart'), cols: 3, items: [
        { ic: '📉', h: T('محور مش من صفر', 'Axis not from zero'), p: T('98 قصاد 100 تبان ضخمة ← ابدأ من صفر', '98 vs 100 looks huge → start at zero'), c: 'red' },
        { ic: '🎨', h: T('ألوان من غير مفتاح', 'Colours without a key'), p: T('مالهاش معنى', 'meaningless'), c: 'amber' },
        { ic: '✂️', h: T('حذف فئات', 'Dropped categories'), p: T('صورة ناقصة', 'an incomplete picture'), c: 'violet' },
      ] }],
      [{ t: 'note', ic: '👥', c: 'green', p: T('وفي الآخر: **اقعد مكان الجمهور** واتأكّد إن الرسالة وصلت.', 'Finally, **sit in the audience’s seat** and check the message lands.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('ضمّن أكبر عدد من العناصر', 'Include as many elements as possible'), good: T('شيل اللي مالوش علاقة', 'Remove what is irrelevant') },
        { bad: T('نشيل العناوين والمحاور', 'Remove titles and axes'), good: T('معلومات داعمة لازمة', 'Needed supporting info') },
        { bad: T('نقط كتير = مبعثر كفاية', 'Many points = scatter is fine'), good: T('تراكب زائد ← خريطة حرارية', 'Overplotting → heatmap') },
      ] }],
    ],
  });
})();
