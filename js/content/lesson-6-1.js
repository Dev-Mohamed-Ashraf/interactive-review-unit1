/* =========================================================
 * content/lesson-6-1.js — الاستدلال الإحصائي
 * Pure data. Sources: textbook part 2, 6-1 (EN p.29–38) + memo (Arabic
 * wording, deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('6-1', {
  id: '6-1',
  color: '#f59e0b',
  cover: 'img/an-l1-cover.webp',
  title: { ar: 'الاستدلال الإحصائي', en: 'Statistical Inference' },
  guiding: { ar: 'إزاي نستنتج من عينة على مجتمع كامل، وإزاي نقيس عدم اليقين في الاستنتاج ده؟', en: 'How can we reason from a sample to a whole population, and how do we measure the uncertainty in that reasoning?' },
  hook: {
    ar: 'مينفعش تسأل كل الناس، فبتدرس **عينة** وتستنتج منها على **المجتمع كله** — ده **الاستدلال الإحصائي**. وبيجاوب على نوعين أسئلة: «__قد إيه تقريبًا؟__» (**تقدير**) و«__ده حقيقي ولا مجرد صدفة؟__» (**اختبار فرضيات**). ولأن العينة جزء من الكل، كل إجابة فيها __عدم يقين__ — والشطارة مش إنك تخبّيه، لكن إنك __تقيسه__، وتفتكر إن «__دالّة إحصائيًا__» مش هي «__مهمة__».',
    en: 'You cannot survey everyone, so you study a **sample** and reason back to the **whole population** — that is **statistical inference**. It answers two kinds of question: "__about how big?__" (**estimation**) and "__is this real, or just chance?__" (**hypothesis testing**). Because the sample is only part of the whole, every answer carries __uncertainty__ — the skill is not hiding it but __measuring__ it, and remembering that "__statistically significant__" is not the same as "__important__".',
  },
  keyFact: { ar: 'الاستدلال الإحصائي بيستنتج من عينة على مجتمع، ودايمًا مع عدم يقين. __التقدير__ بيدّي قيمة (نقطي) أو مدى (فاصل بمستوى ثقة)؛ و__اختبار الفرضيات__ بيوزن __فرضية العدم__ قصاد __البديلة__ بمقارنة __القيمة الاحتمالية p__ بـ__مستوى الدلالة α__. والدلالة الإحصائية __مش__ هي الأهمية العملية.', en: 'Statistical inference reasons from a sample to a population, always with uncertainty. __Estimation__ gives a value (point) or a range (interval, with a confidence level); __hypothesis testing__ weighs a __null hypothesis__ against an __alternative__ by comparing a __p-value__ with a __significance level α__. Statistical significance is __not__ practical importance.' },
  concepts: ['statistical inference', 'point estimation', 'interval estimation', 'confidence interval', 'confidence level', 'null hypothesis', 'alternative hypothesis', 'p-value', 'significance level', 't-test', 'chi-squared test', 'Type I error', 'Type II error'],
  objectives: [
    { ar: 'أشرح الفرق بين التقدير النقطي والتقدير الفاصل، ومعنى مستوى الثقة.', en: 'Explain the difference between point and interval estimation, including the meaning of a confidence level.' },
    { ar: 'أوصف خطوات اختبار الفرضيات، وأشرح الحاجات اللي لازم ناخد بالنا منها وإحنا بنفسّر نتايجه.', en: 'Describe the procedure of hypothesis testing and the cautions needed when interpreting its results.' },
  ],

  stations: [
    /* ───────────── 1 · inference + estimation ───────────── */
    {
      id: 'estimate', kind: 'learn',
      title: { ar: 'الاستدلال والتقدير: نقطي وفاصل', en: 'Inference and estimation: point and interval' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'سألت 50 طالب ولقيت متوسط طولهم 168 سم. تقول إيه عن طول كل طلبة المدرسة؟', en: 'You measured 50 students and their mean height is 168 cm. What would you say about all students in the school?' },
            options: [
              { emoji: '🎯', text: { ar: 'بالضبط 168 سم', en: 'Exactly 168 cm' } },
              { emoji: '↔️', text: { ar: 'حوالي 166 لـ 170 سم', en: 'Around 166 to 170 cm' } },
              { emoji: '🤷‍♂️', text: { ar: 'مقدرش أقول حاجة', en: 'I can’t say anything' } },
            ],
            after: { ar: 'الإجابتين الأولانيين ليهم أسماء… يلا نشوف 👇', en: 'The first two answers have names… let’s see 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: من العينة للمجتمع… بعدم يقين', en: '🎞️ Animation: from sample to population… with uncertainty' },
          enTitle: 'Inference, point and interval estimation',
          terms: ['statistical inference', 'point estimation', 'interval estimation', 'confidence interval', 'confidence level'],
          visual: { anim: 'inferMovie', props: { scenes: [0, 2] } },
          beats: [
            { ar: 'بنسحب **عينة** من المجموعة الكاملة (**المجتمع**) وندرسها، وبعدين __نستنتج خصائص المجتمع__ من نتايج العينة — ده **الاستدلال الإحصائي**. وليه نهجين: 📏 **التقدير** (نستنتج خصائص المجتمع __بأرقام__ — زي تقدير متوسط طول المجتمع من متوسط طول العينة) و⚖️ **اختبار الفرضيات** (نحكم على __صحة ادعاء__ عن المجتمع — زي: هل طريقة تعلّم جديدة أحسن من التقليدية؟). وفي الحالتين العينة جزء بس، فالاستدلال __دايمًا فيه عدم يقين__.', en: 'We draw a **sample** from the whole group (the **population**), study it, then __infer the population’s properties__ from the sample results — that is **statistical inference**. It has two approaches: 📏 **estimation** (inferring the population __in numbers__ — e.g. estimating the population’s mean height from the sample’s) and ⚖️ **hypothesis testing** (judging __whether a claim__ about the population holds — e.g. is a new learning method better than the usual one?). Either way the sample is only part, so inference __always involves uncertainty__.' },
            { ar: '📍 **التقدير النقطي:** نقدّر خاصية المجتمع __كقيمة واحدة__ من العينة (متوسط العينة 168 سم ← متوسط المجتمع ≈ 168 سم) — __سهل الفهم بس عدم اليقين مش باين__. ↔️ **التقدير الفاصل:** نقدّر إن الخاصية __جوّه مدى__ (بين 166 و170 سم) — المدى ده اسمه **فترة الثقة**؛ ليه __عرض__ فمحتاج حذر في التفسير، بس __بيوضّح درجة عدم اليقين__.', en: '📍 **Point estimation:** estimate the property __as a single value__ from the sample (sample mean 168 cm → population mean ≈ 168 cm) — __easy to grasp but the uncertainty is invisible__. ↔️ **Interval estimation:** estimate that the property lies __within a range__ (166 to 170 cm) — that range is the **confidence interval**; it has a __width__, so it needs care in interpretation, but it __shows the degree of uncertainty__.' },
            { ar: '🔁 **مستوى الثقة:** __نسبة المرات__ اللي الفترات دي __بتحتوي فيها القيمة الحقيقية__ لو كرّرنا المسح (95% أو 99% الأشهر). يعني فترة «166–170 سم» بثقة 95%: __لو كرّرنا نفس طريقة المسح 100 مرة، حوالي 95 فترة هيبقى فيها المتوسط الحقيقي__. ⚠️ دي __جملة عن الطريقة__، __مش__ «احتمال 95% إن المتوسط الحقيقي جوّه الفترة دي بالذات».', en: '🔁 **Confidence level:** __how often__ such intervals __contain the true value__ when the survey is repeated (95% or 99% are common). So "166–170 cm" at 95% means: __if the same survey method were repeated 100 times, about 95 of the intervals would contain the true mean__. ⚠️ It is __a statement about the method__, __not__ "a 95% probability that the true mean is inside this particular interval".' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل جملة تقدير نقطي ولا فاصل؟', en: 'Is each statement a point or an interval estimate?' },
            groups: [{ icon: 'target', label: { ar: 'نقطي (قيمة)', en: 'Point (a value)' } }, { icon: 'layers', label: { ar: 'فاصل (مدى)', en: 'Interval (a range)' } }],
            items: [
              { text: { ar: 'متوسط الطول ≈ 168 سم', en: 'Mean height ≈ 168 cm' }, group: 0 },
              { text: { ar: 'المتوسط بين 166 و170 سم بثقة 95%', en: 'The mean is 166–170 cm at 95% confidence' }, group: 1 },
              { text: { ar: 'نسبة المؤيدين ≈ 62%', en: 'Share in favour ≈ 62%' }, group: 0 },
              { text: { ar: 'وقت المذاكرة بين 2.5 و3.1 ساعة', en: 'Study time between 2.5 and 3.1 hours' }, group: 1 },
            ],
            explain: { ar: 'رقم واحد = __نقطي__ · مدى = __فاصل__ (فترة ثقة).', en: 'One number = __point__ · a range = __interval__ (confidence interval).' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'فترة ثقة 95% لمتوسط الطول = 166–170 سم. المعنى الصح؟', en: 'A 95% confidence interval for mean height = 166–170 cm. What does it mean?' },
            options: [
              { ar: 'لو كرّرنا الطريقة 100 مرة، ~95 فترة هتحتوي المتوسط الحقيقي', en: 'If repeated 100 times, ~95 intervals would contain the true mean' },
              { ar: 'فيه احتمال 95% إن المتوسط الحقيقي جوّه الفترة دي بالذات', en: 'There is a 95% chance the true mean is inside this very interval' },
              { ar: '95% من الطلبة طولهم بين 166 و170 سم بالضبط في المدرسة', en: '95% of the students are exactly between 166 and 170 cm tall' },
              { ar: 'المتوسط الحقيقي 168 سم بالضبط وده مؤكد بنسبة 95%', en: 'The true mean is exactly 168 cm, and that is 95% certain' },
            ],
            answer: 0,
            explain: { ar: 'مستوى الثقة __جملة عن الطريقة__ عبر التكرار.', en: 'The confidence level is __a statement about the method__ over repetition.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**الاستدلال:** من عينة لمجتمع — تقدير («قد إيه؟») أو اختبار فرضيات («حقيقي؟») — ودايمًا بعدم يقين.', en: '**Inference:** sample → population — estimation ("how big?") or testing ("real?") — always with uncertainty.' },
            { ar: '**نقطي** = قيمة واحدة (عدم اليقين مش باين) · **فاصل** = مدى (فترة ثقة) بيوضّح عدم اليقين.', en: '**Point** = one value (uncertainty hidden) · **interval** = a range (confidence interval) showing it.' },
            { ar: '**مستوى الثقة 95%:** لو كرّرنا 100 مرة ~95 فترة فيها الحقيقة — جملة عن الطريقة.', en: '**95% confidence:** repeat 100 times and ~95 intervals hold the truth — about the method.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · hypothesis testing ───────────── */
    {
      id: 'testing', kind: 'learn',
      title: { ar: 'اختبار الفرضيات: H₀ وp وα والأخطاء', en: 'Hypothesis testing: H₀, p, α and the errors' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: حقيقي… ولا صدفة؟', en: '🎞️ Animation: real… or chance?' },
          enTitle: 'Hypothesis testing',
          terms: ['null hypothesis', 'alternative hypothesis', 'p-value', 'significance level', 't-test', 'chi-squared test', 'Type I error', 'Type II error'],
          visual: { anim: 'inferMovie', props: { scenes: [3, 9] } },
          beats: [
            { ar: '**اختبار الفرضيات:** إجراء بنحدّد بيه __هل فرضية عن المجتمع مقبولة__ بناءً على البيانات اللي معانا. بنحط فرضيتين: **فرضية العدم H₀** (نقطة البداية: «__مفيش فرق__» أو «__مفيش علاقة__») و**الفرضية البديلة H₁** (بندوّر على دليل يدعمها: «__فيه فرق/علاقة__»). بنقيّم احتمال إن البيانات تطلع كده __بافتراض إن H₀ صح__. ليه نفترض اللي عايزين ننفيه؟ لأن بدل ما نثبت «فيه فرق» مباشرة، __أسهل منطقيًا__ نبيّن إن «لو مفيش فرق، كانت البيانات دي هتبقى بعيدة الاحتمال». والحكم: H₀ __مرفوضة__ أو __مش مرفوضة__.', en: '**Hypothesis testing:** a procedure for judging __whether a hypothesis about the population is acceptable__ given the data at hand. Two hypotheses are set: the **null hypothesis H₀** (the starting point: "__no difference__" or "__no relationship__") and the **alternative hypothesis H₁** (adopted if H₀ is rejected: "__there is a difference/relationship__"). We assess how likely data like ours would be __assuming H₀ is true__. Why assume what we want to deny? Because rather than proving "there is a difference" directly, it is __logically easier__ to show that "if there were no difference, these data would be unlikely". The verdict: H₀ is __rejected__ or __not rejected__.' },
            { ar: '🪜 **الخطوات الأربعة:** ① __نحط الفرضيات__ (H₀: مفيش فرق في متوسط الدرجات بين طريقتين التعلّم · H₁: الطريقة الجديدة متوسطها أعلى) ← ② __نحدّد مستوى الدلالة α مسبقًا__ (5% = 0.05 أو 1% = 0.01) __قبل ما نشوف النتيجة__ ← ③ __نحسب القيمة الاحتمالية p__ من البيانات (مثلًا 0.02) ← ④ __نقارن ونحكم__: 0.02 < 0.05 ← __نرفض H₀__ ← إحصائيًا الطريقة الجديدة بتحقّق متوسط أعلى.', en: '🪜 **The four steps:** ① __state the hypotheses__ (H₀: no difference in mean score between the two methods · H₁: the new method has a higher mean) → ② __fix the significance level α in advance__ (5% = 0.05 or 1% = 0.01) __before seeing the result__ → ③ __compute the p-value__ from the data (say 0.02) → ④ __compare and judge__: 0.02 < 0.05 → __reject H₀__ → statistically, the new method achieves a higher mean.' },
            { ar: '🎯 **القيمة الاحتمالية p:** بافتراض إن H₀ صح، __احتمال نتيجة متطرفة كده أو أكتر__ — كل ما __تصغر__، البيانات تبقى __أبعد احتمالًا__ في ظل H₀. **مستوى الدلالة α:** __الحد__ اللي بنقرّر عنده نرفض H₀. القاعدة: **p ≤ α ← نرفض H₀ من غير إثبات H₁ يقينًا** (النتيجة __دالّة إحصائيًا__) · **p > α ← مانرفضش H₀** (مانقدرش نقول فيه دلالة). ⚠️ نفس p = 0.04: عند α = 0.05 __نرفض__، وعند α = 0.01 __مانرفضش__ — عشان كده α بتتحدّد __قبل__.', en: '🎯 **The p-value:** assuming H₀ is true, __the probability of a result this extreme or more__ — the __smaller__ it is, the __less likely__ the data under H₀. **The significance level α:** __the threshold__ at which we decide to reject H₀. The rule: **p < α → reject H₀, adopt H₁** (the result is __statistically significant__) · **p ≥ α → do not reject H₀** (no significance can be claimed). ⚠️ The same p = 0.04: at α = 0.05 we __reject__, at α = 0.01 we __do not__ — which is why α is fixed __beforehand__.' },
            { ar: '🧪 **أشهر طرق الاختبار:** 📊 **اختبار t** — بيفحص __فيه فرق بين متوسطي مجموعتين__ ولا لأ (متوسط درجات طريقة تعلّم معيّنة مقابل التقليدية). 🔢 **اختبار مربع كاي** — بيفحص __فيه علاقة بين متغيرين فئويين__ ولا لأ (بيانات تصنيف زي النوع أو المهنة أو التفضيل — زي علاقة الصف بتفضيل المادة من نتايج مسح).', en: '🧪 **Major test methods:** 📊 **the t-test** — examines whether __two groups’ means differ__ (average scores under one learning method vs the usual one). 🔢 **the chi-squared test** — examines whether __two categorical variables are related__ (classification data such as gender, occupation or preference — e.g. year group vs subject preference from a survey).' },
            { ar: '🚨 **خطأ من النوع الأول:** __نرفض H₀ وهي في الحقيقة صح__ — «__إنذار كاذب__». 🙈 **خطأ من النوع الثاني:** __مانرفضش H₀ وهي في الحقيقة غلط__ — «__تفويت اكتشاف__». ⚖️ __تقليل α بيقلّل النوع الأول بس بيميل يزوّد النوع التاني__: بينهم **علاقة مفاضلة**. أنهي أسوأ؟ حكم مش في الجداول — لو التغيير مكلّف، احترس من النوع الأول (α أصغر).', en: '🚨 **Type I error:** __rejecting H₀ when it is actually true__ — a "__false alarm__". 🙈 **Type II error:** __not rejecting H₀ when it is actually false__ — a "__miss__". ⚖️ __Lowering α reduces Type I but tends to raise Type II__: a **trade-off**. Which is worse? A judgment no table makes — if a change is costly, guard against Type I (a smaller α).' },
            { ar: '⚠️ **خد بالك في التفسير:** ❌ p __مش__ «احتمال إن H₀ صح» · ❌ p صغيرة __مش__ معناها «التأثير كبير» · ❌ مقارنة p بـα __قاعدة إجرائية__ للحكم مش حقيقة علمية مطلقة — النزول تحت 0.05 __مش__ معناه إن النتيجة مؤكدة · ⚠️ «__دالّة إحصائيًا__» ≠ «__مهمة عمليًا__»: مع 100,000 مستخدم، فرق نقر 0.4% مقابل 0.5% (0.1 نقطة مئوية) ممكن يبقى دالّ، بس هل بيجيب ربح أو تجربة أحسن؟ ده __حكم من منظور تاني__.', en: '⚠️ **Careful in interpretation:** ❌ p is __not__ "the probability that H₀ is true" · ❌ a small p does __not__ mean "the effect is large" · ❌ comparing p with α is __a procedural rule__, not absolute scientific truth — falling below 0.05 does __not__ make a result certain · ⚠️ "__statistically significant__" ≠ "__practically important__": with 100,000 users a click difference of 0.4% vs 0.5% (0.1 points) can be significant, but whether it brings profit or a better experience is __judged from a separate perspective__.' },
            { ar: '📌 **الخلاصة:** نقطي = قيمة وفاصل = مدى بمستوى ثقة (جملة عن الطريقة) · اختبار الفرضيات: H₀ وH₁ ← α مسبقًا ← p ← نرفض H₀ لو p ≤ α · النوع الأول = إنذار كاذب والتاني = تفويت (مفاضلة) · والدلالة ≠ الأهمية — النتايج __بتتفسّر، مش بتتحسب بس__.', en: '📌 **The point:** point = a value, interval = a range with a confidence level (about the method) · testing: H₀ & H₁ → α first → p → reject H₀ if p < α · Type I = false alarm, Type II = a miss (trade-off) · and significance ≠ importance — results are __interpreted, not just computed__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«التقدير النقطي بيقدّر جوّه مدى» ← __غلط__ (ده الفاصل) · «ثقة 95% = احتمال 95% إن الحقيقة جوّه» ← __غلط__ · «تقليل α بيقلّل الخطأين» ← __غلط__ (مفاضلة) · «p < 0.05 معيار صحة مطلق» ← __غلط__. الترتيب: __H₀/H₁ ← α ← p ← الحكم__. متوسطين = __t__ · متغيرين فئويين = __مربع كاي__.', en: '"Point estimation estimates within a range" → __false__ (that is interval) · "95% confidence = 95% chance the truth is inside" → __false__ · "lowering α reduces both errors" → __false__ (trade-off) · "p < 0.05 is an absolute criterion" → __false__. Order: __H₀/H₁ → α → p → judge__. Two means = __t__ · two categorical variables = __chi-squared__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — نادي المدرسة وأداة الاختبار', en: 'Deep dive — the school club and its quiz tool' }, text: { ar: 'نادي بيقول أداته الجديدة بترفع الدرجات: مجموعته جابت 74 ومجموعة ضابطة بنفس الحجم 70. ① H₀: مفيش فرق · H₁: متوسط مجموعة الأداة أعلى. ② نفترض H₀ ونسأل: «لو مفيش فرق حقيقي، احتمال فجوة 4 درجات زي دي بالصدفة قد إيه؟» ده p — نقول 0.04. ③ عند α = 0.05 نرفض H₀، وعند α = 0.01 مانرفضش. ④ النوع الأول هنا = نعلن إن الأداة نافعة وهي لأ (نغيّر كل الفصول على الفاضي)، والتاني = نتجاهل أداة نافعة فعلًا. ⑤ حتى لو دالّة، 4 درجات ممكن تبقى صغيرة عمليًا، والعينة ممكن ماتمثّلش كل الفصول — الدلالة بتبدأ الحوار مش بتنهيه.', en: 'A club says its new tool raises scores: its group scored 74 and a same-size control group 70. ① H₀: no difference · H₁: the tool group’s mean is higher. ② Assume H₀ and ask "if there were no real difference, how likely is a 4-mark gap by chance?" That is p — say 0.04. ③ At α = 0.05 we reject H₀; at α = 0.01 we do not. ④ Type I here = declaring the tool works when it does not (changing every class needlessly); Type II = ignoring a tool that really works. ⑤ Even if significant, 4 marks may be small in practice, and the sample may not represent every class — significance starts the conversation, it does not end it.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'order', prompt: { ar: 'رتّب خطوات اختبار الفرضيات:', en: 'Put the steps of hypothesis testing in order:' },
            items: [
              { ar: 'نحط فرضية العدم والبديلة', en: 'State the null and alternative hypotheses' },
              { ar: 'نحدّد مستوى الدلالة α', en: 'Set the significance level α' },
              { ar: 'نحسب القيمة الاحتمالية p', en: 'Compute the p-value' },
              { ar: 'نقارن p بـ α ونحكم', en: 'Compare p with α and judge' },
            ],
            explain: { ar: 'H₀/H₁ ← α ← p ← الحكم.', en: 'H₀/H₁ → α → p → judgment.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل موقف بالحكم أو نوع الخطأ:', en: 'Match each situation with the verdict or error type:' },
            left: [
              { ar: 'p = 0.03 و α = 0.05', en: 'p = 0.03 and α = 0.05' },
              { ar: 'p = 0.30 و α = 0.05', en: 'p = 0.30 and α = 0.05' },
              { ar: 'رفضنا H₀ وهي في الحقيقة صح', en: 'We rejected H₀ although it was true' },
              { ar: 'مارفضناش H₀ وهي في الحقيقة غلط', en: 'We kept H₀ although it was false' },
            ],
            right: [{ ar: 'مانرفضش H₀', en: 'Do not reject H₀' }, { ar: 'خطأ من النوع الثاني', en: 'Type II error' }, { ar: 'نرفض H₀', en: 'Reject H₀' }, { ar: 'خطأ من النوع الأول', en: 'Type I error' }],
            answer: [2, 0, 3, 1],
            explain: { ar: 'p ≤ α ← نرفض · p > α ← مانرفضش · إنذار كاذب = الأول · تفويت = التاني.', en: 'p < α → reject · p ≥ α → keep · false alarm = Type I · miss = Type II.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**H₀** = مفيش فرق (البداية) · **H₁** = فيه فرق · بنفترض H₀ ونشوف البيانات بعيدة الاحتمال ولا لأ.', en: '**H₀** = no difference (the start) · **H₁** = a difference · assume H₀ and see if the data are unlikely.' },
            { ar: '**p ≤ α ← نرفض H₀** (دالّة) · **p > α ← مانرفضش** · α بتتحدّد قبل · **t** للمتوسطين و**مربع كاي** للفئويين.', en: '**p < α → reject H₀** (significant) · **p ≥ α → keep** · α fixed first · **t** for two means, **chi-squared** for categories.' },
            { ar: '**النوع الأول** = إنذار كاذب · **التاني** = تفويت · مفاضلة · **دالّة ≠ مهمة**.', en: '**Type I** = false alarm · **Type II** = a miss · trade-off · **significant ≠ important**.' },
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
            { text: { ar: 'A) استنتاج خصائص المجتمع من العينة اسمه الاستدلال الإحصائي.', en: 'A) Inferring a population’s properties from a sample is called statistical inference.' }, answer: true },
            { text: { ar: 'B) التقدير النقطي طريقة بتقدّر خصائص المجتمع جوّه مدى معيّن.', en: 'B) Point estimation estimates the population’s properties within a certain range.' }, answer: false },
            { text: { ar: 'C) في اختبار الفرضيات بنقيّم احتمال البيانات اللي معانا بافتراض إن فرضية العدم صح.', en: 'C) In hypothesis testing, the probability of the data at hand is assessed assuming the null hypothesis is true.' }, answer: true },
            { text: { ar: 'D) لو النتيجة دالّة إحصائيًا، يبقى الفرق أكيد مهم عمليًا كمان.', en: 'D) If a result is statistically significant, the difference is necessarily practically important too.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) تعريف الاستدلال ← **✓**.', en: 'A) The definition of inference → **✓**.' },
            { ar: 'B) ده __الفاصل__؛ النقطي = قيمة واحدة ← **✗**.', en: 'B) That is __interval__; point = one value → **✗**.' },
            { ar: 'C) بنفترض H₀ ← **✓**.', en: 'C) We assume H₀ → **✓**.' },
            { ar: 'D) الدلالة ≠ الأهمية؛ مع بيانات كبيرة فرق ضئيل ممكن يبقى دالّ ← **✗**.', en: 'D) Significance ≠ importance; with big data a tiny difference can be significant → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمصطلح (A–C):', en: '(2) Match each description (a–c) with the term (A–C):' },
            left: [
              { ar: 'a) فرضية نقطة بداية للاختبار زي «مفيش فرق»', en: 'a) A starting-point hypothesis such as "no difference"' },
              { ar: 'b) احتمال نتيجة متطرفة كده أو أكتر لو H₀ صح', en: 'b) The probability of a result this extreme or more if H₀ holds' },
              { ar: 'c) الحد اللي بنقرّر عنده نرفض H₀', en: 'c) The threshold for deciding to reject H₀' },
            ],
            right: [{ ar: 'A القيمة الاحتمالية', en: 'A p-value' }, { ar: 'B مستوى الدلالة', en: 'B Significance level' }, { ar: 'C فرضية العدم', en: 'C Null hypothesis' }],
            answer: [2, 0, 1] },
          solution: [
            { ar: 'a: نقطة البداية = **فرضية العدم** ← C.', en: 'a: the starting point = **null hypothesis** → C.' },
            { ar: 'b: الاحتمال = **القيمة الاحتمالية** ← A.', en: 'b: the probability = **p-value** → A.' },
            { ar: 'c: الحد = **مستوى الدلالة** ← B.', en: 'c: the threshold = **significance level** → B.' },
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
            { q: { ar: '1. استنتاج خصائص المجتمع من العينة؟', en: '1. Inferring a population’s properties from a sample?' }, a: { ar: 'الاستدلال الإحصائي', en: 'Statistical inference' } },
            { q: { ar: '2. طريقة تقدير إن خصائص المجتمع جوّه مدى معيّن؟', en: '2. Estimating that a property lies within a range?' }, a: { ar: 'التقدير الفاصل', en: 'Interval estimation' } },
            { q: { ar: '3. المدى المستخدم في التقدير الفاصل؟', en: '3. The range used in interval estimation?' }, a: { ar: 'فترة الثقة', en: 'Confidence interval' } },
            { q: { ar: '4. اختبار بيفحص علاقة بين متغيرين فئويين؟', en: '4. The test for a relationship between two categorical variables?' }, a: { ar: 'اختبار مربع كاي', en: 'Chi-squared test' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف خطوات اختبار الفرضيات:', en: 'Choose the best description of the hypothesis-testing procedure:' },
            options: [
              { ar: 'A الفرضيات ← مستوى الدلالة ← حساب p ← الحكم', en: 'A Hypotheses → significance level → compute p → judge' },
              { ar: 'B حساب p ← فرضية العدم ← مستوى الدلالة ← الحكم', en: 'B Compute p → null hypothesis → significance level → judge' },
              { ar: 'C مستوى الدلالة ← البديلة ← حساب p ← فرضية العدم', en: 'C Significance level → alternative → compute p → null' },
              { ar: 'D الحكم ← فرضية العدم ← مستوى الدلالة ← حساب p', en: 'D Judge → null hypothesis → significance level → compute p' },
            ],
            fixedOrder: true, answer: 0,
            explain: { ar: 'الترتيب الصح A.', en: 'The correct order is A.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختبار مستوى دلالته 0.05 وطلعت p = 0.03. أنهي حكم أنسب؟', en: 'A test at significance level 0.05 gives p = 0.03. Which judgment fits best?' },
            options: [
              { ar: 'A نرفض فرضية العدم ونعتمد البديلة', en: 'A Reject the null and adopt the alternative' },
              { ar: 'B مانرفضش فرضية العدم ونسيبها زي ما هي', en: 'B Do not reject the null; keep it as it is' },
              { ar: 'C نرفض الفرضية البديلة ونعتمد العدم', en: 'C Reject the alternative and adopt the null' },
              { ar: 'D نغيّر مستوى الدلالة لـ 0.01 ونعيد الحساب', en: 'D Change α to 0.01 and recompute' },
            ],
            fixedOrder: true, answer: 0,
            explain: { ar: '0.03 < 0.05 ← __نرفض H₀__ (A). وتغيير α بعد النتيجة غلط.', en: '0.03 < 0.05 → __reject H₀__ (A). Changing α after the result is wrong.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (3)', en: 'Try 2 (3)' },
          q: { widget: 'classify', prompt: { ar: 'لكل غرض اختار الاختبار:', en: 'Choose the test for each purpose:' },
            groups: [{ icon: 'database', label: { ar: 'A مربع كاي', en: 'A Chi-squared' } }, { icon: 'target', label: { ar: 'B اختبار t', en: 'B t-test' } }],
            items: [
              { text: { ar: 'a) متوسط الدرجات بين طريقتين تدريس مختلف؟', en: 'a) Do mean scores differ between two teaching methods?' }, group: 1 },
              { text: { ar: 'b) علاقة بين النوع وفئة المنتجات المشتراة؟', en: 'b) A relationship between gender and product category bought?' }, group: 0 },
            ],
            explain: { ar: 'a ← B (متوسطين) · b ← A (فئويين).', en: 'a → B (two means) · b → A (categorical).' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (4)', en: 'Try 2 (4)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف القيمة الاحتمالية:', en: 'Choose the best description of the p-value:' },
            options: [
              { ar: 'A احتمال إن فرضية العدم نفسها صح في الحقيقة', en: 'A The probability that the null hypothesis is true' },
              { ar: 'B كل ما تصغر يبقى حجم التأثير الحقيقي أكبر', en: 'B The smaller it is, the larger the effect size' },
              { ar: 'C احتمال نتيجة متطرفة كده أو أكتر لو H₀ صح', en: 'C The chance of a result this extreme or more if H₀ holds' },
              { ar: 'D p < 0.05 معيار صحة مطلق ونهائي للنتيجة', en: 'D p < 0.05 is an absolute criterion of correctness' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'C هو التعريف؛ الباقي أخطاء شائعة.', en: 'C is the definition; the others are common mistakes.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(g):', en: 'Read and fill blanks (a)–(g):' },
            text: { ar: 'في الاستدلال الإحصائي بنستنتج خصائص المجتمع من العينة. التقدير كقيمة واحدة اسمه {0}، والتقدير جوّه مدى اسمه {1}. والحكم على فرضية عن المجتمع اسمه {2}. فيه بنحط {3} زي «مفيش فرق» وعكسها {4}، ونحكم بمقارنة {5} المحسوبة من البيانات بـ{6} المحدّد مسبقًا.', en: 'In statistical inference a population’s properties are inferred from a sample. Estimating as one value is {0}; estimating within a range is {1}. Judging a hypothesis about the population is {2}. In it we set {3}, such as "no difference", and its opposite {4}, and judge by comparing the {5} computed from the data with the {6} fixed in advance.' },
            bank: [{ ar: 'التقدير النقطي', en: 'point estimation' }, { ar: 'التقدير الفاصل', en: 'interval estimation' }, { ar: 'اختبار الفرضيات', en: 'hypothesis testing' }, { ar: 'فرضية العدم', en: 'the null hypothesis' }, { ar: 'الفرضية البديلة', en: 'the alternative hypothesis' }, { ar: 'القيمة الاحتمالية', en: 'p-value' }, { ar: 'مستوى الدلالة', en: 'significance level' }, { ar: 'مستوى الثقة', en: 'confidence level' }],
            answer: [0, 1, 2, 3, 4, 5, 6],
            explain: { ar: '(a) نقطي (b) فاصل (c) اختبار الفرضيات (d) العدم (e) البديلة (f) p (g) α.', en: '(a) point (b) interval (c) hypothesis testing (d) null (e) alternative (f) p-value (g) significance level.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف فترات ومستويات الثقة:', en: 'Choose the best description of confidence intervals and levels:' },
            options: [
              { ar: 'A ثقة 95% = القيمة الحقيقية جوّه الفترة باحتمال 95%', en: 'A 95% = the true value is inside with probability 95%' },
              { ar: 'B كل ما مستوى الثقة يعلى، الفترة تضيق أكتر', en: 'B The higher the confidence level, the narrower the interval' },
              { ar: 'C لو كرّرنا الطريقة، ~95% من الفترات فيها الحقيقة', en: 'C If repeated, ~95% of intervals contain the true value' },
              { ar: 'D مستوى الثقة هو معيار الحكم في اختبار الفرضيات', en: 'D The confidence level is the judging criterion in testing' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'C صح. وB غلط: ثقة أعلى = فترة __أوسع__.', en: 'C is right. B is wrong: higher confidence = a __wider__ interval.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ وصف صح لأخطاء الاختبار؟', en: 'Which is __not__ a correct description of test errors?' },
            options: [
              { ar: 'A النوع الأول = نرفض العدم وهي صح', en: 'A Type I = rejecting the null when it is true' },
              { ar: 'B النوع التاني = مانرفضش العدم وهي غلط', en: 'B Type II = not rejecting the null when false' },
              { ar: 'C تقليل α بيقلّل النوعين مع بعض', en: 'C Lowering α reduces both kinds together' },
              { ar: 'D بين النوعين علاقة مفاضلة دايمًا', en: 'D There is a trade-off between the two kinds' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'تقليل α بيقلّل الأول ويزوّد التاني (C غلط).', en: 'Lowering α cuts Type I but raises Type II (C is wrong).' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (3)', en: 'Exercise 3 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لتفسير الاستدلال الإحصائي:', en: 'Choose the best interpretation of statistical inference:' },
            options: [
              { ar: 'A الفرق الدالّ إحصائيًا أكيد مهم عمليًا', en: 'A A significant difference is surely important in practice' },
              { ar: 'B مع بيانات كتير، حتى فرق ضئيل ممكن يبقى دالّ', en: 'B With much data even a tiny difference can be significant' },
              { ar: 'C لو p نزلت تحت 0.05 يبقى الاستنتاج مؤكد', en: 'C If p falls below 0.05 the conclusion is certain' },
              { ar: 'D الاستدلال بيشيل عدم اليقين خالص', en: 'D Inference removes uncertainty completely' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B صح — الدلالة ≠ الأهمية.', en: 'B is right — significance ≠ importance.' } },
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
          { front: { ar: 'الاستدلال الإحصائي', en: 'Statistical inference' }, back: { ar: 'الاستنتاج من عينة على مجتمع — دايمًا بعدم يقين.', en: 'Reasoning from a sample to a population — always uncertain.' } },
          { front: { ar: 'التقدير النقطي', en: 'Point estimation' }, back: { ar: 'قيمة واحدة من العينة (168 سم).', en: 'One value from the sample (168 cm).' } },
          { front: { ar: 'التقدير الفاصل / فترة الثقة', en: 'Interval estimation / confidence interval' }, back: { ar: 'مدى (166–170 سم) بيوضّح عدم اليقين.', en: 'A range (166–170 cm) showing uncertainty.' } },
          { front: { ar: 'مستوى الثقة', en: 'Confidence level' }, back: { ar: 'نسبة الفترات اللي فيها الحقيقة لو كرّرنا الطريقة.', en: 'How often such intervals hold the truth over repetition.' } },
          { front: { ar: 'فرضية العدم H₀ / البديلة H₁', en: 'Null H₀ / alternative H₁' }, back: { ar: '«مفيش فرق» / «فيه فرق».', en: '"No difference" / "a difference".' } },
          { front: { ar: 'القيمة الاحتمالية p', en: 'p-value' }, back: { ar: 'احتمال نتيجة متطرفة كده أو أكتر لو H₀ صح.', en: 'Chance of a result this extreme or more if H₀ holds.' } },
          { front: { ar: 'مستوى الدلالة α', en: 'Significance level α' }, back: { ar: 'حد رفض H₀ (0.05 أو 0.01) — بيتحدّد قبل.', en: 'The threshold to reject H₀ (0.05 or 0.01) — set first.' } },
          { front: { ar: 'اختبار t / مربع كاي', en: 't-test / chi-squared' }, back: { ar: 'فرق متوسطين / علاقة متغيرين فئويين.', en: 'Two means differ / two categoricals related.' } },
          { front: { ar: 'خطأ النوع الأول / التاني', en: 'Type I / II error' }, back: { ar: 'إنذار كاذب / تفويت — بينهم مفاضلة.', en: 'False alarm / a miss — a trade-off.' } },
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
            prompt: { ar: 'اشرح ليه الباحثين بيختبروا فرضية عدم بيتمنّوا ينفوها، بدل ما يثبتوا التأثير مباشرة. (أشِر إلى: القيمة الاحتمالية الصغيرة بتوضّح إيه)', en: 'Explain why researchers test a null hypothesis they hope to disprove, rather than proving the effect directly. (Refer to: what a small p-value shows)' },
            points: [
              { ar: 'إثبات «فيه فرق» مباشرة صعب منطقيًا.', en: 'Proving "a difference" directly is logically hard.' },
              { ar: 'نفترض H₀ ونسأل: البيانات بعيدة الاحتمال؟', en: 'Assume H₀ and ask: are the data unlikely?' },
              { ar: 'p صغيرة = البيانات مش متوقعة لو مفيش فرق ← نرفض H₀.', en: 'Small p = data unexpected if no difference → reject H₀.' },
            ],
            model: { ar: 'إثبات إن «فيه فرق» بشكل مباشر صعب، لأن أي فرق في العينة ممكن يكون صدفة. فبدل كده بنبدأ من __فرضية العدم__ («مفيش فرق») ونفترض إنها صح، ونسأل: لو مفيش فرق فعلًا، احتمال نشوف بيانات زي اللي معانا أو أكتر تطرفًا قد إيه؟ ده هو __p__. لو p __صغيرة__ (أقل من α)، معناها إن البيانات دي __بعيدة الاحتمال__ في عالم مفيهوش فرق، فنرفض H₀ ونعتمد البديلة. يعني بنثبت الفرق __بشكل غير مباشر__ — بإننا نبيّن إن «مفيش فرق» مايفسّرش البيانات كويس. ومع ذلك p الصغيرة مش احتمال إن H₀ صح، ومش معناها إن التأثير كبير.', en: 'Proving "there is a difference" directly is hard, because any difference in a sample could be chance. Instead we start from the __null hypothesis__ ("no difference"), assume it is true, and ask: if there really were no difference, how likely is data like ours or more extreme? That is __p__. If p is __small__ (below α), the data would be __unlikely__ in a world with no difference, so we reject H₀ and adopt the alternative. We thus show the difference __indirectly__ — by showing that "no difference" explains the data poorly. Still, a small p is not the probability that H₀ is true, and it does not mean the effect is large.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — أداة الاختبار الأونلاين', en: 'Think as an engineer — the online quiz tool' },
            prompt: { ar: 'نادي مدرسي بيقول أداته الأونلاين بترفع متوسط الدرجات (74 مقابل 70 لمجموعة ضابطة بنفس الحجم). ١) اكتب H₀ وH₁، والبيانات اللي محتاجها غير المتوسطين، وأنهي α هتختار وليه. ٢) يعني إيه خطأ النوع الأول والتاني هنا، وأنهي عايز تتجنّبه؟ ٣) لو p = 0.04، قرارك إيه؟ ولو دالّة، ليه ممكن ماتبرّرش نقل كل الفصول للأداة؟', en: 'A school club says its online quiz tool raises mean scores (74 vs 70 for a same-size control group). 1) Write H₀ and H₁, the data you need besides the means, and which α you would set and why. 2) What do Type I and Type II mean here, and which would you rather avoid? 3) If p = 0.04, what is your decision? If significant, why might it still not justify switching every class?' },
            points: [
              { ar: 'H₀: مفيش فرق · H₁: الأداة أعلى · محتاج حجم العينة والتشتّت.', en: 'H₀: no difference · H₁: tool higher · need sample size and spread.' },
              { ar: 'الأول = نعتمد أداة مش نافعة · التاني = نفوّت أداة نافعة.', en: 'Type I = adopt a useless tool · Type II = miss a useful one.' },
              { ar: 'p = 0.04: نرفض عند 0.05 ومانرفضش عند 0.01 · الدلالة ≠ الأهمية.', en: 'p = 0.04: reject at 0.05, not at 0.01 · significance ≠ importance.' },
            ],
            model: { ar: '١) H₀: «مفيش فرق في متوسط الدرجات بين اللي استخدموا الأداة والضابطة». H₁: «متوسط مجموعة الأداة أعلى». محتاج درجات كل طالب (عشان التشتّت) وعدد الطلبة في كل مجموعة وإن التوزيع عليهم كان عشوائي. هختار α = 0.01 لأن نقل كل الفصول قرار مكلّف، فعايز أقلّل الإنذار الكاذب. ٢) النوع الأول: نعلن إن الأداة نافعة وهي مش نافعة، فنغيّر كل الفصول على الفاضي. النوع التاني: نتجاهل أداة نافعة فعلًا. هنا أفضّل أتجنّب الأول لأن تكلفته أعلى. ٣) p = 0.04 > 0.01 ← __مانرفضش H₀__ عند α اللي اخترتها (ولو كانت 0.05 كنا هنرفض). وحتى لو دالّة، فرق 4 درجات ممكن يكون صغير عمليًا مقارنة بالتكلفة، والمجموعة ممكن ماتمثّلش كل الفصول — فالدلالة بتبدأ النقاش مش بتنهيه.', en: '1) H₀: "no difference in mean score between tool users and the control group". H₁: "the tool group’s mean is higher". I need each student’s score (for the spread), the size of each group, and evidence the groups were assigned randomly. I would set α = 0.01 because switching every class is costly, so I want fewer false alarms. 2) Type I: declaring the tool works when it does not, changing every class needlessly. Type II: ignoring a tool that really works. Here I would rather avoid Type I because it costs more. 3) p = 0.04 > 0.01 → __do not reject H₀__ at my α (at 0.05 we would reject). Even if significant, 4 marks may be small in practice relative to the cost, and the group may not represent every class — significance starts the discussion, it does not end it.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'متجر جرّب لونين لزرار الدفع على 200,000 زائر، واللون الجديد نسبة نقره أعلى بـ 0.05 نقطة مئوية، وp = 0.01 عند مستوى دلالة 5%. النتيجة دالّة إحصائيًا؟ واشرح ليه المتجر ممكن برضه مايغيّرش الزرار.', en: 'A shop tested two pay-button colours on 200,000 visitors; the new colour’s click rate is 0.05 points higher, with p = 0.01 at a 5% level. Is it significant? Why might the shop still not change the button?' },
            points: [{ ar: 'أيوه دالّة (0.01 < 0.05).', en: 'Yes, significant (0.01 < 0.05).' }, { ar: 'الفرق ضئيل جدًا عمليًا مع عينة ضخمة.', en: 'The difference is tiny in practice with a huge sample.' }, { ar: 'التكلفة/الربح حكم منفصل.', en: 'Cost/profit is a separate judgment.' }],
            model: { ar: 'أيوه، النتيجة __دالّة إحصائيًا__ لأن p = 0.01 < α = 0.05، فنرفض «مفيش فرق». بس مع 200,000 زائر حتى فرق __ضئيل جدًا__ (0.05 نقطة مئوية) بيبقى دالّ. المتجر ممكن مايغيّرش الزرار لأن الفرق ده تقريبًا مالوش أثر على الربح، وتكلفة التغيير (تصميم، اختبار، تعارض مع هوية الموقع) ممكن تكون أكبر من فايدته. دالّة إحصائيًا ≠ مهمة عمليًا.', en: 'Yes, the result is __statistically significant__ because p = 0.01 < α = 0.05, so we reject "no difference". But with 200,000 visitors even a __tiny__ difference (0.05 points) becomes significant. The shop might not change the button because the difference barely affects profit, and the cost of changing (design, testing, clashing with the brand) could outweigh the benefit. Statistically significant ≠ practically important.' } },
        },
      ],
    },

    /* ───────────── textbook prompts ───────────── */
    {
      id: 'reflect', kind: 'challenge',
      title: { ar: 'أسئلة الكتاب: تأمّل · تحدّى', en: 'Textbook prompts: reflect · challenge' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل', en: 'Reflect' },
            prompt: { ar: 'ليه مستوى الثقة 95% جملة عن الطريقة، مش عن فترة بعينها؟', en: 'Why is a 95% confidence level a statement about the method, not one interval?' },
            points: [{ ar: 'الفترة الواحدة يا فيها الحقيقة يا لأ.', en: 'A single interval either contains the truth or not.' }, { ar: 'الـ95% = نسبة الفترات الصح لو كرّرنا الطريقة.', en: '95% = the share of correct intervals over repetition.' }],
            model: { ar: 'لأن القيمة الحقيقية للمجتمع ثابتة، والفترة اللي حسبناها __يا فيها الحقيقة يا لأ__ — مفيش 95% في فترة واحدة. اللي بيتغيّر هو العينة: لو كرّرنا نفس طريقة المسح 100 مرة، هنطلع 100 فترة مختلفة، وحوالي 95 منها هتحتوي الحقيقة. فالـ95% بتوصف __قد إيه الطريقة نفسها بتنجح__.', en: 'Because the population’s true value is fixed, and the interval we computed __either contains it or not__ — there is no 95% for one interval. What varies is the sample: repeating the same survey method 100 times gives 100 different intervals, about 95 of which contain the truth. So 95% describes __how often the method itself succeeds__.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تحدّى', en: 'Challenge' },
            prompt: { ar: 'دراسة على 500,000 مستخدم بتقول فيه تأثير «دالّ جدًا» (p < 0.001) حجمه 0.02 نقطة مئوية. ناقش: هتتصرّف على أساسه؟ واذكر المعلومة الوحيدة اللي ممكن تغيّر رأيك.', en: 'A study of 500,000 users reports a "highly significant" effect (p < 0.001) of 0.02 percentage points. Argue: would you act on it? State the one piece of information that would change your mind.' },
            points: [{ ar: 'دالّة بسبب العينة الضخمة، بس التأثير ضئيل.', en: 'Significant due to the huge sample, but the effect is tiny.' }, { ar: 'المعلومة: قيمة التأثير عمليًا (ربح/تكلفة).', en: 'The information: the effect’s practical value (profit/cost).' }],
            model: { ar: 'غالبًا مش هتصرّف عليه، لأن p الصغيرة جاية من __حجم العينة الضخم__ مش من تأثير كبير — 0.02 نقطة مئوية تقريبًا ولا حاجة. المعلومة اللي تغيّر رأيي: لو عرفت إن الـ0.02 نقطة دي بتساوي __مكسب كبير فعلًا__ (مثلًا ملايين الجنيهات لأن الحجم ضخم) وإن تكلفة التطبيق تقريبًا صفر، ساعتها ممكن يستاهل.', en: 'Probably not, because the small p comes from the __huge sample size__, not a big effect — 0.02 points is almost nothing. What would change my mind: learning that those 0.02 points are worth __a real gain__ (e.g. millions because of the scale) while the cost of applying it is near zero — then it might be worth it.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '6-1', seconds: 60, items: [
          { text: { ar: 'الاستدلال = من عينة لمجتمع', en: 'Inference = sample to population' }, answer: true },
          { text: { ar: 'الاستدلال بيشيل عدم اليقين', en: 'Inference removes uncertainty' }, answer: false },
          { text: { ar: 'النقطي = قيمة واحدة', en: 'Point = one value' }, answer: true },
          { text: { ar: 'النقطي = مدى', en: 'Point = a range' }, answer: false },
          { text: { ar: 'فترة الثقة بتستخدم في الفاصل', en: 'Confidence intervals belong to interval estimation' }, answer: true },
          { text: { ar: 'ثقة 95% = جملة عن الطريقة', en: '95% confidence = about the method' }, answer: true },
          { text: { ar: 'H₀ = «فيه فرق»', en: 'H₀ = "there is a difference"' }, answer: false },
          { text: { ar: 'α بتتحدّد قبل النتيجة', en: 'α is fixed before the result' }, answer: true },
          { text: { ar: 'p ≤ α ← نرفض H₀', en: 'p < α → reject H₀' }, answer: true },
          { text: { ar: 'p > α ← نرفض H₀', en: 'p ≥ α → reject H₀' }, answer: false },
          { text: { ar: 'اختبار t = فرق متوسطين', en: 't-test = two means differ' }, answer: true },
          { text: { ar: 'مربع كاي = متغيرين كمّيين', en: 'Chi-squared = two quantitative variables' }, answer: false },
          { text: { ar: 'النوع الأول = إنذار كاذب', en: 'Type I = a false alarm' }, answer: true },
          { text: { ar: 'تقليل α بيقلّل الخطأين', en: 'Lowering α cuts both errors' }, answer: false },
          { text: { ar: 'p = احتمال إن H₀ صح', en: 'p = the chance H₀ is true' }, answer: false },
          { text: { ar: 'دالّة ≠ مهمة عمليًا', en: 'Significant ≠ practically important' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 6-1', en: 'Lesson 6-1 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. تقدير خاصية المجتمع كقيمة واحدة من العينة — أنهي تقدير؟', en: '1. Estimating a population property as a single value — which?' }, options: [{ ar: 'التقدير الفاصل', en: 'Interval estimation' }, { ar: 'التقدير النقطي', en: 'Point estimation' }, { ar: 'فترة الثقة', en: 'Confidence interval' }, { ar: 'مستوى الدلالة', en: 'Significance level' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. لما p ≤ α بنرفض إيه؟', en: '2. When p < α, what do we reject?' }, options: [{ ar: 'الفرضية البديلة', en: 'The alternative hypothesis' }, { ar: 'فرضية العدم', en: 'The null hypothesis' }, { ar: 'مستوى الدلالة', en: 'The significance level' }, { ar: 'فترة الثقة', en: 'The confidence interval' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. رفض فرضية العدم وهي صح — أنهي خطأ؟', en: '3. Rejecting a true null hypothesis — which error?' }, options: [{ ar: 'خطأ النوع الثاني', en: 'Type II error' }, { ar: 'خطأ النوع الأول', en: 'Type I error' }, { ar: 'خطأ المفاضلة', en: 'Trade-off error' }, { ar: 'خطأ التقدير', en: 'Estimation error' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. مستوى ثقة 95% يعني احتمال 95% إن القيمة الحقيقية جوّه فترة بعينها.', en: '4. A 95% level = a 95% chance the truth is in this interval.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. بين خطأ النوع الأول وخطأ النوع التاني علاقة مفاضلة.', en: '5. Type I and Type II errors trade off.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. «دالّة إحصائيًا» معناها أكيد «مهمة عمليًا».', en: '6. Statistically significant necessarily means practically important.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. إيه الفرق بين التقدير النقطي والفاصل؟ واذكر ميزة لكل واحد.', en: '7. What is the difference between point and interval estimation? Give an advantage of each.' },
          points: [{ ar: 'نقطي: قيمة واحدة · ميزة: سهل الفهم.', en: 'Point: one value · advantage: easy to grasp.' }, { ar: 'فاصل: مدى (فترة ثقة) · ميزة: بيوضّح عدم اليقين.', en: 'Interval: a range · advantage: shows uncertainty.' }],
          model: { ar: 'التقدير النقطي بيقدّر خاصية المجتمع كقيمة واحدة من العينة (المتوسط ≈ 168 سم)، وميزته إنه سهل الفهم، بس عدم اليقين فيه مش باين. التقدير الفاصل بيقدّر إن الخاصية جوّه مدى (166–170 سم) اسمه فترة الثقة بمستوى ثقة معيّن، وميزته إنه بيوضّح درجة عدم اليقين، وإن كان محتاج حذر في التفسير.', en: 'Point estimation gives the population property as one value from the sample (mean ≈ 168 cm); its advantage is being easy to understand, though the uncertainty is hidden. Interval estimation says the property lies within a range (166–170 cm), the confidence interval, at a given confidence level; its advantage is that it shows the degree of uncertainty, though it needs care to interpret.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اذكر خطوات اختبار الفرضيات الأربعة بالترتيب.', en: '8. List the four steps of hypothesis testing in order.' },
          points: [{ ar: 'H₀ وH₁ ← α ← p ← المقارنة والحكم.', en: 'H₀ and H₁ → α → p → compare and judge.' }],
          model: { ar: '① نحط فرضية العدم H₀ والفرضية البديلة H₁. ② نحدّد مستوى الدلالة α مسبقًا (0.05 أو 0.01). ③ نحسب القيمة الاحتمالية p من البيانات. ④ نقارن p بـ α ونحكم: لو p ≤ α نرفض H₀ من غير إثبات H₁ يقينًا، ولو p > α مانرفضش H₀.', en: '① State the null hypothesis H₀ and the alternative H₁. ② Fix the significance level α in advance (0.05 or 0.01). ③ Compute the p-value from the data. ④ Compare p with α and judge: if p < α reject H₀ and adopt H₁; if p ≥ α do not reject H₀.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. إيه الفرق بين خطأ النوع الأول والتاني؟ اضرب مثال لكل واحد.', en: '9. What is the difference between Type I and Type II errors? Give an example of each.' },
          points: [{ ar: 'الأول: نرفض H₀ وهي صح (إنذار كاذب).', en: 'Type I: reject a true H₀ (false alarm).' }, { ar: 'التاني: مانرفضش H₀ وهي غلط (تفويت).', en: 'Type II: keep a false H₀ (a miss).' }],
          model: { ar: 'خطأ النوع الأول: نرفض H₀ وهي في الحقيقة صح — إنذار كاذب، زي إننا نعلن إن أداة تعليمية بترفع الدرجات وهي مابتعملش كده. خطأ النوع التاني: مانرفضش H₀ وهي في الحقيقة غلط — تفويت، زي إننا نتجاهل أداة بترفع الدرجات فعلًا. وتقليل α بيقلّل الأول ويزوّد التاني.', en: 'Type I: rejecting H₀ when it is actually true — a false alarm, e.g. declaring a learning tool raises scores when it does not. Type II: not rejecting H₀ when it is actually false — a miss, e.g. ignoring a tool that really raises scores. Lowering α reduces Type I but increases Type II.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. اشرح بمثال ليه «دالّة إحصائيًا» مش معناها «مهمة عمليًا».', en: '10. Explain with an example why "statistically significant" does not mean "practically important".' },
          points: [{ ar: 'مع عينة ضخمة فرق ضئيل يبقى دالّ.', en: 'With a huge sample a tiny difference becomes significant.' }, { ar: 'مثال 100,000 مستخدم: 0.4% مقابل 0.5%.', en: 'Example: 100,000 users, 0.4% vs 0.5%.' }],
          model: { ar: 'الدلالة الإحصائية بتقول إن الفرق غالبًا مش صدفة، مش إنه كبير أو مفيد. مع عينة ضخمة، حتى فرق صغير جدًا بيبقى دالّ: مثلًا مع 100,000 مستخدم، نسبة نقر 0.4% مقابل 0.5% (0.1 نقطة مئوية) ممكن تطلع دالّة، بس هل الفرق ده بيجيب ربح أو تجربة أحسن تستاهل التكلفة؟ ده حكم من منظور تاني.', en: 'Statistical significance says a difference is probably not chance, not that it is large or useful. With a huge sample even a very small difference becomes significant: with 100,000 users a click rate of 0.4% vs 0.5% (0.1 points) can be significant, but whether it brings profit or a better experience worth the cost is a separate judgment.' } } },
      ],
    },
  ],
});
