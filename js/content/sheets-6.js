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
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف يمكننا الاستنتاج من عينة إلى مجتمع كامل، وكيف نقيس عدم اليقين في هذا الاستنتاج؟', 'How do we reason from a sample to a whole population, and how do we measure the uncertainty?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح الفرق بين التقدير النقطي والفاصل ومعنى مستوى الثقة', 'Explain point and interval estimation and confidence level'),
          T('تصف إجراءات اختبار الفرضيات والمحاذير عند التفسير', 'Describe hypothesis testing and its cautions'),
        ] }],
      [{ t: 'sec', n: '1', label: T('مرحلة الاستدلال الإحصائي', 'The Statistical Inference Stage') }],
      [{ t: 'tree', ic: '🔎', title: T('الاستدلال الإحصائي: نهجين', 'Statistical inference: two approaches'), root: { h: T('عينة ← نستنتج خصائص المجتمع', 'Sample → infer about the population'), c: 'amber' }, kids: [
        { ic: '📏', h: T('التقدير', 'Estimation'), p: T('بقيمة واحدة أو بنطاق: متوسط طول المجتمع', 'in numbers: the mean height'), c: 'green' },
        { ic: '⚖️', h: T('اختبار الفرضيات', 'Hypothesis testing'), p: T('نقيّم الدليل ضد فرضية العدم، ومانثبتش فرضية يقينًا', 'judge a claim: is the new method better?'), c: 'violet' },
      ] }],
      [{ t: 'sec', n: '2', label: T('التقدير النقطي والتقدير الفاصل', 'Point Estimation and Interval Estimation') }],
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
          { h: T('جملة عن الطريقة', 'A statement about the method'), p: T('مش «احتمال 95%» للفترة دي بالذات · المستوى بيتحدد قبل التحليل', 'not “95% chance” for this interval'), c: 'amber' },
        ] },
      ],
      [{ t: 'sec', n: '3', label: T('فكرة اختبار الفرضيات وإجراءاته', 'The Idea and Procedure of Hypothesis Testing') }],
      [{ t: 'compare', ic: '⚖️', title: T('الفرضيتين', 'The two hypotheses'),
        cols: [{ h: T('فرضية العدم H₀', 'Null hypothesis H₀'), c: 'slate' }, { h: T('الفرضية البديلة H₁', 'Alternative hypothesis H₁'), c: 'violet' }],
        rows: [
          { k: T('المعنى', 'Meaning'), v: [T('نقطة البداية: مفيش فرق/علاقة', 'the start: no difference/relationship'), T('نوع الفرق اللي بيهمنا، ونبحث عن دليل يدعمها', 'adopted if H₀ is rejected')] },
          { k: T('ليه؟', 'Why?'), v: [T('أسهل نبيّن إن البيانات بعيدة الاحتمال لو H₀ صح', 'easier to show the data is unlikely under H₀'), T('الحكم: H₀ مرفوضة أو مش مرفوضة', 'verdict: reject H₀ or not')] },
        ] }],
      [{ t: 'flow', ic: '🪜', title: T('الخطوات الأربعة (مثال طريقتين تعلّم)', 'The four steps (two teaching methods)'), items: [
        { h: T('① الفرضيات', '① Hypotheses'), p: T('قبل النظر للنتيجة: H₀ مفيش فرق · H₁ الجديدة أعلى', 'H₀: none · H₁: new is higher'), c: 'slate' },
        { h: T('② مستوى الدلالة α', '② Significance level α'), p: T('0.05 أو 0.01 قبل النتيجة', '0.05 or 0.01 beforehand'), c: 'amber' },
        { h: T('③ القيمة الاحتمالية p', '③ The p-value'), p: T('نختار الاختبار ونتحقق من افتراضاته ونحسب: 0.02', 'from the data: 0.02'), c: 'pink' },
        { h: T('④ الحكم', '④ Judgment'), p: T('0.02 ≤ 0.05 ← نرفض H₀', '0.02 < 0.05 → reject H₀'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '4', label: T('القيمة الاحتمالية وطرق الاختبار الرئيسية', 'The p-value and Major Hypothesis Tests') }],
      [
        { t: 'draw', art: 'pvalue', ic: '🎯', title: T('p قصاد α', 'p versus α'), cap: T('p: احتمال نتيجة بنفس التطرف أو أشد لو H₀ صح · α حد بيتحدد مسبقًا · رفض H₀ = دلالة إحصائية من غير إثبات H₁ يقينًا · p = 0.04: نرفض عند 0.05 ومانرفضش عند 0.01', 'p: chance of a result this extreme if H₀ holds · rejecting H₀ = statistically significant · p = 0.04: reject at 0.05, not at 0.01') },
        { t: 'cards', ic: '🧪', title: T('أشهر طرق الاختبار', 'Major tests'), cols: 1, items: [
          { ic: '📊', h: T('اختبار t', 't-test'), p: T('عائلة لمقارنة المتوسطات: مثال فرق متوسطي مجموعتين', 'difference of two group means'), c: 'blue' },
          { ic: '🔢', h: T('اختبار مربع كاي', 'Chi-squared test'), p: T('ارتباط متغيرين فئويين في جدول تقاطعي: الجنس × تفضيل المادة', 'two categorical variables: year × favorite subject'), c: 'amber' },
        ] },
      ],
      [{ t: 'sec', n: '5', label: T('تنبيهات بخصوص الاستدلال', 'Cautions Regarding Inference') }],
      [
        { t: 'compare', ic: '🚨', title: T('الخطأين', 'The two errors'), w: 1.4,
          cols: [{ h: T('خطأ النوع الأول', 'Type I error'), c: 'red' }, { h: T('خطأ النوع الثاني', 'Type II error'), c: 'amber' }],
          rows: [
            { k: T('إيه اللي حصل', 'What happened'), v: [T('رفضنا H₀ وهي صح', 'rejected a true H₀'), T('مارفضناش H₀ وهي غلط', 'kept a false H₀')] },
            { k: T('يعني', 'Means'), v: [T('إنذار كاذب', 'false alarm'), T('تفويت اكتشاف', 'a missed discovery')] },
          ] },
        { t: 'draw', art: 'balance', ic: '⚖️', title: T('مفاضلة (عند ثبات حجم العينة والتصميم)', 'A trade-off') },
      ],
      [{ t: 'note', ic: '📉', c: 'amber', p: T('**خد بالك في التفسير:** مع 100,000 شخص، فرق 0.1 نقطة مئوية ممكن يبقى دالّ — بس هل بيجيب ربح؟ ده حكم من منظور تاني. راجع كمان حجم الأثر وفترة الثقة والتصميم وتكلفة القرار.', '**Interpret with care:** with 100,000 users, 0.4% vs 0.5% clicks may be significant — but profitable? A separate judgment. If change is costly, guard against Type I (smaller α).') }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('استنتاج خصائص المجتمع من العينة', 'Inferring the population from the sample'), a: T('الاستدلال الإحصائي', 'Statistical inference') },
        { q: T('التقدير النقطي بيقدّر ضمن مدى؟', 'Point estimation gives a range?'), a: T('غلط: قيمة واحدة', 'False: a single value') },
        { q: T('ذات دلالة إحصائية = مهمة عمليًا بالضرورة؟', 'Significant is always important in practice?'), a: T('غلط: حكم منفصل', 'False: they are different') },
        { q: T('نقطة البداية «لا فرق»', 'The starting point “no difference”'), a: T('فرضية العدم H₀', 'Null hypothesis') },
        { q: T('احتمال نتيجة بنفس التطرف أو أشد لو H₀ صحيحة', 'Chance of a result this extreme if H₀ holds'), a: T('القيمة الاحتمالية', 'p-value') },
        { q: T('القيمة الحدية لقرار رفض H₀', 'The threshold for rejecting H₀'), a: T('مستوى الدلالة α', 'Significance level') },
        { q: T('رفض H₀ وهي صحيحة', 'Rejecting a true H₀'), a: T('خطأ من النوع الأول', 'Type I error') },
        { q: T('علاقة متغيرين فئويين', 'Relationship between two categorical variables'), a: T('اختبار مربع كاي', 'Chi-squared test') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح سبب اختبار الباحثين فرضية العدم التي يأملون في دحضها بدل إثبات التأثير مباشرة.', 'Explain why researchers test a null hypothesis they hope to disprove, rather than proving the effect directly.'), items: [
        T('إثبات التأثير مباشرة صعب', 'Showing the effect directly is difficult'),
        T('نفترض «لا فرق» ونقيس ندرة النتيجة تحت الافتراض ده', 'Assume “no effect” and see how unlikely the result is'),
        T('القيمة الاحتمالية الصغيرة دليل ضد H₀، مش إثبات يقيني', 'A small p-value is evidence against H₀, not certain proof'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('النقطي بيقدّر جوّه مدى', 'Point estimation gives a range'), good: T('ده الفاصل', 'That is the interval') },
        { bad: T('ثقة 95% = احتمال الحقيقة جوّه', '95% = chance the truth is inside'), good: T('جملة عن الطريقة', 'About the method') },
        { bad: T('تقليل α بيقلّل الخطأين', 'Lower α cuts both errors'), good: T('مفاضلة؛ الاتنين يقلّوا بتصميم أحسن أو عينة أكبر', 'A trade-off') },
        { bad: T('p = احتمال إن H₀ صح', 'p = chance H₀ is true'), good: T('مش كده', 'It is not') },
        { bad: T('p صغيرة = تأثير كبير', 'Small p = big effect'), good: T('مش معناها كده', 'It does not mean that') },
        { bad: T('رفض H₀ يثبت H₁ يقينًا', 'p < 0.05 is absolute truth'), good: T('دليل إحصائي مش يقين', 'A procedural rule') },
        { bad: T('دالّة إحصائيًا = مهمة عمليًا', 'Significant = important'), good: T('حكم منفصل', 'A separate judgment') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('قدّر بقيمة نقطية أو بفاصل، واختبر بمقارنة القيمة الاحتمالية بمستوى الدلالة. راقب خطأي النوع الأول والثاني، ولا تخلط بين الدلالة الإحصائية والأهمية العملية.', 'Estimate with a point or an interval; test by comparing a p-value with a significance level. Watch Type I / II errors, and never confuse statistical significance with practical importance.') }],
    ],
  });

  RV.addSheet('6-2', {
    lead: T('الانحدار نموذج رياضي بيوصف علاقة مقدّرة للتفسير أو التنبؤ — نقيّمه، وماتخلطش الملاءمة بالسببية.', 'Regression states a relationship as an equation to predict and simulate — evaluate it, and never confuse fit with cause.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف يحوّل الانحدار البيانات إلى تنبؤ، وكيف نحكم على مدى إمكانية الوثوق بذلك التنبؤ؟', 'How does regression turn data into a prediction, and how do we judge whether it can be trusted?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('توضّح الفرق بين الانحدار البسيط والمتعدد وما يمثله النموذج', 'Explain simple and multiple regression and what a model represents'),
          T('تقيّم النموذج بـ R² وRMSE وMAE وتوضّح إن الملاءمة مش سببية', 'Evaluate with R², RMSE, MAE; a good fit does not prove causation'),
        ] }],
      [{ t: 'sec', n: '1', label: T('مرحلة تحليل الانحدار', 'The Regression Analysis Stage') }],
      [
        { t: 'draw', art: 'regression', ic: '📈', title: T('الانحدار البسيط: خط الانحدار', 'Simple regression: the regression line') },
        { t: 'cards', ic: '🧩', title: T('مكوّنات تحليل الانحدار', 'Parts of regression analysis'), cols: 1, items: [
          { h: T('متغير الاستجابة y', 'Response variable y'), p: T('النتيجة (التابع): المبيعات', 'the result: sales'), c: 'blue' },
          { h: T('المتغير التفسيري x', 'Explanatory variable x'), p: T('نستخدمه للتفسير أو التنبؤ: الحرارة · مش سبب بالضرورة', 'the input: temperature'), c: 'green' },
          { h: T('النموذج', 'The model'), p: T('تمثيل مبسّط · نقيّم ملاءمته وخطأ التنبؤ وافتراضاته وحدود نطاقه', 'a simplified picture · useless unevaluated'), c: 'violet' },
          { h: T('المربعات الصغرى', 'Least squares'), p: T('تقدّر معاملات الخط بتصغير مجموع مربعات المتبقيات (الفعلية − المتوقعة)', 'minimize squared residuals (actual − line)'), c: 'amber' },
        ] },
      ],
      [{ t: 'sec', n: '2', label: T('الانحدار البسيط والمتعدد', 'Simple and Multiple Regression') }],
      [{ t: 'compare', ic: '🏠', title: T('بسيط ولا متعدد؟', 'Simple or multiple?'),
        cols: [{ h: T('الانحدار البسيط', 'Simple regression'), c: 'amber' }, { h: T('الانحدار المتعدد', 'Multiple regression'), c: 'violet' }],
        rows: [
          { k: T('المعادلة', 'Equation'), v: ['`y = ax + b`', '`y = a₁x₁ + a₂x₂ + … + b`'] },
          { k: T('المتغيرات', 'Variables'), v: [T('متغير تفسيري واحد', 'one explanatory variable'), T('اتنين أو أكتر', 'two or more')] },
          { k: T('ميزته', 'Pro'), v: [T('بسيط وسهل التفسير', 'simple to interpret'), T('علاقات معقّدة، بس مايضمنش تنبؤ أفضل', 'complex relationships, many factors')] },
          { k: T('مثال', 'Example'), v: [T('الحرارة ← المبيعات', 'temperature → sales'), T('المساحة + العمر + البعد عن المحطة ← السعر', 'area + age + distance → price')] },
        ] }],
      [{ t: 'note', ic: '🔤', c: 'blue', p: T('**المعامل** = تغيّر التنبؤ المرتبط بزيادة وحدة من المتغير مع ثبات الباقي، من غير تفسير سببي تلقائي · **b** = الثابت.', 'The **coefficient** (a) = the variable’s strength · the **intercept** (b) = the constant.') }],
      [{ t: 'sec', n: '3', label: T('مؤشرات تقييم النماذج', 'Evaluation Indicators for Models') }],
      [{ t: 'cards', ic: '🎯', title: T('مؤشرات التقييم: مع بعض', 'Evaluation measures: together'), cols: 3, items: [
        { ic: '📐', h: T('R² معامل التحديد', 'R² coefficient of determination'), p: T('0 لـ 1: قد إيه بيفسّر التباين · ملموم 0.95 · متبعتر 0.30', '0–1: variation explained · tight 0.95 · scattered 0.30'), c: 'green' },
        { ic: '📏', h: 'RMSE', p: T('جذر متوسط المربعات · يبرز الأخطاء الكبيرة (مكلّفة؟ استخدمه)', 'root mean square · stresses big errors (use when costly)'), c: 'red' },
        { ic: '📐', h: 'MAE', p: T('متوسط القيم المطلقة · يقاوم الشواذ (يوم مهرجان)', 'mean absolute · resists outliers (a festival day)'), c: 'blue' },
      ] }],
      [
        { t: 'formula', f: 'MAE = (2+3+1+2+12) ÷ 5 = 4', p: T('الأخطاء: +2، −3، +1، −2، +12', 'Errors: +2, −3, +1, −2, +12'), ex: T('الاتنين بوحدة الاستجابة · أصغر = أدق', 'Both in response units · smaller = better') },
        { t: 'formula', f: 'RMSE = √((4+9+1+4+144) ÷ 5) ≈ 5.7', p: T('√32.4 ≈ 5.7', '√32.4 ≈ 5.7'), ex: T('خطأ الـ12 «اتعاقب» بالتربيع', 'The 12 is “punished” by squaring') },
      ],
      [{ t: 'sec', n: '4', label: T('تنبيهات عند استخدام نماذج الانحدار', 'Cautions When Using Regression Models') }],
      [
        { t: 'draw', art: 'confounder', ic: '🕵️', title: T('ارتباط ≠ سببية: العامل المربِك', 'Correlation ≠ causation: the confounder') },
        { t: 'vflow', ic: '✅', title: T('عشان تدّعي سببية', 'To claim causation'), items: [
          { h: T('أسبقية زمنية', 'Temporal precedence'), p: T('مش كفاية لوحدها', 'cause before effect'), c: 'blue' },
          { h: T('استبعاد العوامل التانية', 'Rule out other factors'), c: 'amber' },
          { h: T('تصميم دراسة وأدلة إضافية', 'Theoretical support'), c: 'green' },
        ] },
      ],
      [{ t: 'cards', ic: '⚠️', title: T('تنبيهات', 'Cautions'), cols: 3, items: [
        { h: T('النموذج مابيخلصش بإنشائه', 'Not done when built'), p: T('أكّد الدقة وماتطبّقوش برّه مدى البيانات', 'confirm accuracy; stay in the data’s range'), c: 'amber' },
        { h: T('مش R² لوحده', 'Not R² alone'), p: T('أخطاء التنبؤ والافتراضات والأداء على بيانات جديدة · R² المعدّل لمقارنة نماذج', 'with the other measures'), c: 'blue' },
        { h: T('متغيرات أكتر ≠ أحسن', 'More variables ≠ better'), p: T('اختار المناسب للغرض · المفرط في الملاءمة بيطارد الضوضاء', 'overfitting chases noise'), c: 'red' },
      ] }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('الانحدار المتعدد بيستخدم متغيرًا تفسيريًا واحدًا؟', 'Multiple regression uses one explanatory variable?'), a: T('غلط: عدة متغيرات', 'False: multiple variables') },
        { q: T('R² مؤشر لقدرة النموذج على تفسير التباين؟', 'R² shows how well variability is explained?'), a: T('صح', 'True') },
        { q: T('ملاءمة المعادلة تثبت علاقة سببية؟', 'A fitting equation proves causation?'), a: T('غلط: ارتباط فقط', 'False: correlation only') },
        { q: T('متوسط القيم المطلقة للفروق', 'Mean of absolute discrepancies'), a: T('MAE', 'MAE') },
        { q: T('جذر متوسط مربعات الفروق', 'Root of the mean of squared discrepancies'), a: T('RMSE', 'RMSE') },
        { q: T('المتغير اللي النموذج بيحاول يتنبأ بقيمته', 'The variable that is the result'), a: T('متغير الاستجابة', 'Response variable') },
        { q: T('الفرق بين القيمة الفعلية والمتوقعة', 'Actual minus fitted value'), a: T('المتبقي', 'Residual') },
        { q: T('طريقة تقدير معاملات الخط', 'Method that determines the line'), a: T('المربعات الصغرى', 'Least squares') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا يمكن لنموذج انحدار ذي R² عالٍ أن يظل أساسًا غير كافٍ للادعاء بأن متغيرًا يسبب آخر.', 'Explain why a regression model with a high R² can still be a poor basis for claiming that one variable causes another.'), items: [
        T('R² بيقيس الملاءمة والارتباط، مش السبب', 'R² measures fit and association, not cause'),
        T('ممكن عامل تالت يأثّر في الاتنين', 'A third factor may affect both'),
        T('الادعاء السببي محتاج تصميم دراسة وأدلة إضافية', 'Causation needs precedence, excluding other factors, and theory'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('المتعدد بمتغير تفسيري واحد', 'Multiple uses one variable'), good: T('اتنين أو أكتر', 'Two or more') },
        { bad: T('الملاءمة بتثبت السببية', 'A fit proves causation'), good: T('ارتباط بس', 'Correlation only') },
        { bad: T('R² قريب من 1 كفاية', 'R² near 1 is enough'), good: T('مع مؤشرات تانية', 'With other measures') },
        { bad: T('RMSE وMAE دايمًا متساويين', 'RMSE and MAE are always equal'), good: T('حسابين مختلفين', 'Different calculations') },
        { bad: T('MAE بيدّي الكبير وزن أكبر', 'MAE weights big errors'), good: T('ده RMSE', 'That is RMSE') },
        { bad: T('نتيجة الانحدار حقيقة مطلقة', 'Regression results are absolute truth'), good: T('منظور واحد من البيانات', 'One perspective from the data') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('الانحدار يحوّل علاقة إلى معادلة: متغير استجابة نتنبأ به من متغير تفسيري واحد أو عدة متغيرات. قيّمه بـ R² وRMSE وMAE معًا، والملاءمة الجيدة ليست دليلًا على السببية.', 'Regression predicts a response variable from one or several explanatory variables. Judge it with R², RMSE, and MAE together — and never read a good fit as proof of cause.') }],
    ],
  });

  RV.addSheet('6-3', {
    lead: T('تصور البيانات بيحوّل الأرقام لأنماط — للمحلّل وللتواصل — برسالة واضحة وتسميات صادقة.', 'Visualization turns numbers into patterns — for the analyst and for others — with a clear message and honest labels.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف نختار تصورًا يكشف نمطًا بصدق، وكيف نحوّل رسمًا بيانيًا إلى رسالة يفهمها الآخرون؟', 'How do we choose a visualization that reveals a pattern honestly, and turn a chart into a message others understand?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح دور تصور البيانات واختيار الرسوم المناسبة', 'Explain the role of data visualization and select suitable graphs'),
          T('توظّف سرد قصص البيانات لنقل رسالة واضحة وصادقة', 'Apply data storytelling for a clear, honest message'),
        ] }],
      [{ t: 'sec', n: '1', label: T('دور تصور البيانات', 'The Role of Data Visualization') }],
      [{ t: 'cards', ic: '🎭', title: T('تصور البيانات: دورين', 'Data visualization: two roles'), cols: 2, items: [
        { ic: '🧠', h: T('فهم المحلّل نفسه', 'The analyst’s own understanding'), p: T('التوزيع · الاتجاه · القيم الشاذة (وقت المذاكرة كخط)', 'distribution · trend · outliers (study time as a line)'), c: 'violet' },
        { ic: '📣', h: T('التوصيل للآخرين', 'Communicating to others'), p: T('ننقل النتيجة بسهولة (متوسط كل فصل كأعمدة)', 'convey results easily (class means as bars)'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '2', label: T('اختيار الرسم المناسب', 'Visualization Handling Multiple Variables') }],
      [{ t: 'draw', art: 'charts', ic: '📊', title: T('اختار الرسم المناسب', 'Choose the right chart') }],
      [{ t: 'compare', ic: '🧭', title: T('إمتى أستخدم إيه؟ حسب نوع البيانات والسؤال والجمهور، مش عدد المتغيرات بس', 'Which when? By number and type of variables, and purpose'),
        cols: [{ h: T('السؤال', 'Question'), c: 'slate' }, { h: T('الرسم', 'Chart'), c: 'blue' }],
        rows: [
          { k: '1', v: [T('نقارن فئات', 'compare values'), T('أعمدة (Bar)', 'bar graph')] },
          { k: '2', v: [T('تغيّر عبر الزمن أو الترتيب', 'change over time'), T('خطوط (Line)', 'line graph')] },
          { k: '3', v: [T('علاقة متغيرين كمّيين', 'two quantities (few points); not for categorical combinations'), T('مبعثر (Scatter)', 'scatter plot')] },
          { k: '4', v: [T('قيمة لكل خلية في شبكة باللون + مفتاح الألوان: مدينة × شهر', 'a third value by color: day × hour · city × month'), T('خريطة حرارية', 'heatmap')] },
          { k: '5', v: [T('تكرارات أو نسب متغيرين فئويين: الصف × المادة المفضّلة', 'two categories by share: year × subject'), T('مخطط المستطيلات', 'mosaic plot')] },
        ] }],
      [{ t: 'flow', ic: '😵', title: T('التراكب الزائد للنقاط', 'Overplotting'), items: [
        { ic: '✳️', h: T('5000 نقطة', '5,000 points'), p: T('وقت المذاكرة × الدرجة', 'study time × score'), c: 'slate' },
        { ic: '🌫️', h: T('كتلة صمّاء', 'A solid blob'), p: T('الكثافة بتختفي', 'density disappears'), c: 'red' },
        { ic: '🌡️', h: T('الحلول', 'Heatmap'), p: T('شفافية · تجميع النقط في خلايا · تمثيل كثافة ثنائية الأبعاد', 'where most students are'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '🧩', c: 'blue', p: T('**مخطط المستطيلات (الفسيفساء):** مساحة كل مستطيل = تكرار أو نسبة التوليفة حسب إعداد الرسم، فوضّح أعداد ولا نسب وكيف اتحسبت. والأعمدة المكدسة أحيانًا أوضح.', '**Mosaic plot:** column width = category share · slice height = share within its group · area = share of the combination.') }],
      [{ t: 'sec', n: '3', label: T('سرد قصص البيانات', 'Data Storytelling') }],
      [{ t: 'flow', ic: '📖', title: T('سرد قصص البيانات: حول سؤال أو نتيجة، من غير إخفاء اللي يغيّر التفسير', 'Data storytelling'), items: [
        { ic: '1️⃣', h: T('وضّح الرسالة', 'Clarify the message'), p: T('جملة واحدة والعنوان يحمل الادعاء', 'one sentence, the title claims it'), c: 'amber' },
        { ic: '2️⃣', h: T('اختار العناصر', 'Select elements'), p: T('شيل اللي مالوش علاقة وأبرز المهم، من غير إخفاء السياق أو الأدلة المخالفة', 'cut the rest, color the key part'), c: 'blue' },
        { ic: '3️⃣', h: T('معلومات داعمة', 'Supporting information'), p: T('عنوان · محاور · وحدات · المصدر والفترة · تعريف المقياس', 'title · axes · units · notes'), c: 'green' },
      ] }],
      [{ t: 'cards', ic: '⚠️', title: T('رسم بياناته صح… بيضلّل', 'Correct data, a misleading chart'), cols: 3, items: [
        { ic: '📉', h: T('محور مش من صفر', 'Axis not from zero'), p: T('98 قصاد 100 تبان ضخمة ← ابدأ من صفر', '98 vs 100 looks huge → start at zero'), c: 'red' },
        { ic: '🎨', h: T('ألوان من غير مفتاح', 'Colors without a key'), p: T('مالهاش معنى', 'meaningless'), c: 'amber' },
        { ic: '✂️', h: T('حذف فئات', 'Dropped categories'), p: T('صورة ناقصة', 'an incomplete picture'), c: 'violet' },
      ] }],
      [{ t: 'note', ic: '👥', c: 'green', p: T('وفي الآخر: **اقعد مكان الجمهور** واتأكّد إن الرسالة وصلت.', 'Finally, **sit in the audience’s seat** and check the message lands.') }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('تصور البيانات ليه دورين: فهم المحلل والتوصيل للآخرين؟', 'Visualization deepens understanding and communicates?'), a: T('صح', 'True') },
        { q: T('قيمة ممثلة باللون عبر محورين', 'A value shown by color across two axes'), a: T('الخريطة الحرارية', 'Heatmap') },
        { q: T('علاقة متغيرين فئويين بمساحات مستطيلة', 'Two categorical variables by rectangle areas'), a: T('مخطط المستطيلات (الفسيفساء)', 'Mosaic plot') },
        { q: T('علاقة متغيرين كميين بموضع النقاط', 'Two quantitative variables by the position of points'), a: T('المخطط المبعثر', 'Scatter plot') },
        { q: T('نقط كتير متداخلة فالكثافة تختفي', 'Many points overlap and density is hidden'), a: T('التراكب الزائد للنقاط', 'Overplotting') },
        { q: T('نضمّن أكبر عدد من العناصر في الرسم؟', 'Include as many elements as possible?'), a: T('غلط: نشيل اللي مالوش علاقة', 'False: remove what is unrelated') },
        { q: T('عناصر سرد القصص الثلاثة', 'The three elements of storytelling'), a: T('الرسالة · اختيار العناصر · معلومات داعمة', 'Message · elements · supporting information') },
        { q: T('مقارنة درجات الفصول بنظرة واحدة', 'Compare class scores at a glance'), a: T('رسم بالأعمدة', 'Bar graph') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا يمكن أن يؤدي اختيار الرسم الخطأ أو إخفاء تسمياته إلى تضليل الجمهور حتى عندما تكون البيانات صحيحة.', 'Explain why choosing the wrong graph, or hiding a chart’s labels, can mislead an audience even when the data is correct.'), items: [
        T('الرسم لازم يناسب نوع البيانات والسؤال', 'The graph must match the data and the question'),
        T('من غير عنوان ومحاور ووحدات القارئ مش هيفهم صح', 'Without title, axes and units the reader misunderstands'),
        T('المقياس الخاطئ بيدّي انطباع مش مدعوم بالبيانات', 'A misleading scale gives an impression the data does not support'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('ضمّن أكبر عدد من العناصر', 'Include as many elements as possible'), good: T('شيل اللي مالوش علاقة', 'Remove what is irrelevant') },
        { bad: T('نشيل العناوين والمحاور', 'Remove titles and axes'), good: T('معلومات داعمة لازمة', 'Needed supporting info') },
        { bad: T('الخريطة الحرارية حل تلقائي لكل تراكب', 'Many points = scatter is fine'), good: T('بحسب الحالة', 'Overplotting → heatmap') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('اختر الرسم المناسب للبيانات والسؤال، ثم ابنِ قصة بيانات: رسالة واضحة، وعناصر تخدمها، وتسميات صادقة، وتأكد إنها وصلت للجمهور.', 'Match the graph to the data, then tell a data story: one message, only the elements that serve it, honest labels — and check the audience receives it.') }],
    ],
  });
})();
