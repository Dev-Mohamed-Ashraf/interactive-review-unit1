/* =========================================================
 * content/lesson-6-2.js — استخدام وتقييم تحليل الانحدار
 * Pure data. Sources: textbook part 2, 6-2 (EN p.39–47) + memo (Arabic
 * wording, deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('6-2', {
  id: '6-2',
  color: '#f97316',
  cover: 'img/an-l2-cover.webp',
  title: { ar: 'استخدام وتقييم تحليل الانحدار', en: 'Use and Evaluation of Regression Analysis' },
  guiding: { ar: 'الانحدار بيحوّل البيانات لتنبّؤ إزاي، وإزاي نحكم إن التنبّؤ ده نقدر نثق فيه؟', en: 'How does regression turn data into a prediction, and how do we judge whether that prediction can be trusted?' },
  hook: {
    ar: 'كتير البيانات بتخبّي __علاقة__ تقدر تحوّلها لتنبّؤ: كل ما اليوم يدفى، مبيعات الآيس كريم تزيد. **تحليل الانحدار** بيكتب العلاقة دي __كمعادلة__، فتحط درجة حرارة بكرة المتوقعة وتتنبّأ بمبيعات بكرة. بس معادلة التنبّؤ مجرد **نموذج** — صورة مبسّطة — والمحلّل الشاطر بيسأل سؤالين كمان: __دقيقة قد إيه__ (بـ **R²** و**RMSE** و**MAE**)؟ وهل «__ملائمة كويس__» معناها «__سبب__» فعلًا؟ __الخط اللي ملائم للبيانات مش دليل على السبب.__',
    en: 'Data often hides a __relationship__ you can turn into a prediction: the warmer the day, the more ice cream sells. **Regression analysis** writes that relationship __as an equation__, so you plug in tomorrow’s expected temperature and predict tomorrow’s sales. But a prediction equation is only a **model** — a simplified picture — and a careful analyst asks two more questions: __how accurate is it__ (with **R²**, **RMSE** and **MAE**)? And does "__fits well__" really mean "__causes__"? __A line that fits the data is not proof of a cause.__',
  },
  keyFact: { ar: 'تحليل الانحدار بيعبّر عن العلاقة بين __متغير تفسيري__ (المدخل) و__متغير استجابة__ (النتيجة) في صورة __نموذج__ — خط y = ax + b للبسيط، أو مجموع متغيرات موزونة للمتعدد. بنحكم عليه بـ__R² وRMSE وMAE__، و__عمرنا ما نخلط__ حسن الملاءمة بإثبات السببية.', en: 'Regression expresses the relationship between an __explanatory variable__ (the input) and a __response variable__ (the result) as a __model__ — a line y = ax + b for simple, a weighted sum for multiple. Judge it with __R², RMSE and MAE__, and __never__ mistake a good fit for proof of causation.' },
  concepts: ['regression analysis', 'response variable', 'explanatory variable', 'model', 'simple regression', 'multiple regression', 'regression line', 'least squares', 'residual', 'coefficient', 'intercept', 'R²', 'RMSE', 'MAE', 'confounder'],
  objectives: [
    { ar: 'أشرح الفرق بين الانحدار البسيط والمتعدد، ونموذج الانحدار بيمثّل إيه.', en: 'Explain the difference between simple and multiple regression, and what a regression model represents.' },
    { ar: 'أقيّم نموذج انحدار بـ R² وRMSE وMAE، وأشرح ليه حسن الملاءمة مابيثبتش السببية.', en: 'Evaluate a regression model using R², RMSE and MAE, and explain why a good fit does not prove causation.' },
  ],

  stations: [
    /* ───────────── 1 · building the model ───────────── */
    {
      id: 'model', kind: 'learn',
      title: { ar: 'بناء النموذج: بسيط ومتعدد', en: 'Building the model: simple and multiple' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'مقصف المدرسة عايزة تعرف تطلب كام علبة آيس كريم بكرة… تعتمد على إيه؟', en: 'The school shop wants to know how many ice-cream tubs to order tomorrow… what would you rely on?' },
            options: [
              { emoji: '🌡️', text: { ar: 'درجة حرارة بكرة', en: 'Tomorrow’s temperature' } },
              { emoji: '📊', text: { ar: 'الحرارة + عدد الطلبة + يوم امتحان', en: 'Temperature + students + exam day' } },
              { emoji: '🎲', text: { ar: 'التخمين', en: 'Guessing' } },
            ],
            after: { ar: 'الاختيار الأول والتاني ليهم اسم في الانحدار 👇', en: 'The first two choices have names in regression 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: من نقط… لخط… لتنبّؤ', en: '🎞️ Animation: from dots… to a line… to a prediction' },
          enTitle: 'Regression models',
          terms: ['regression analysis', 'response variable', 'explanatory variable', 'model', 'simple regression', 'least squares', 'residual', 'multiple regression'],
          visual: { anim: 'regressMovie', props: { scenes: [0, 2] } },
          beats: [
            { ar: '**تحليل الانحدار:** طريقة لبناء __نموذج رياضي يصف العلاقة المقدّرة__ بين متغير استجابة ومتغير تفسيري أو أكتر، وممكن نستخدمها __للتفسير أو التنبّؤ__. المتغير اللي بيمثّل __النتيجة__ اسمه **متغير الاستجابة (التابع)**، والمتغير اللي __بنفسّر/نتنبّأ بيه__ اسمه **المتغير التفسيري** (ومش سبب بمجرد دخوله النموذج). في مثالنا: المبيعات = استجابة، والحرارة = تفسيري. والمعادلة اللي بتطلع من البيانات اسمها **النموذج** — __تمثيل مبسّط لعلاقة حقيقية__. وعشان نستخدمه عمليًا لازم __نقيّم__ ملاءمته وخطأ التنبؤ وافتراضاته وحدود النطاق اللي اتبنى منه.', en: '**Regression analysis:** a method expressing __relationships between variables in data as an equation__, used __for prediction and simulation__. The variable representing __the result__ is the **response (dependent) variable**; the one __used to explain/predict__ it is the **explanatory variable**. In our example: sales = response, temperature = explanatory. The equation obtained from the data is the **model** — __a simplified representation of a real relationship__. Building and evaluating it are __both important__: a model without evaluation is __not useful__.' },
            { ar: '📈 **الانحدار البسيط:** نتنبّأ بمتغير الاستجابة بـ__متغير تفسيري واحد__ (المبيعات y من الحرارة x بس). المعادلة __خط مستقيم__ `y = ax + b` اسمه **خط الانحدار**. a وb بيتحدّدوا بـ**طريقة المربعات الصغرى**: الخط اللي __بيقلّل مجموع مربعات الفروق__ بين القيم الفعلية والمتوقعة — وكل فرق اسمه **متبقّي**.', en: '📈 **Simple regression:** predict the response with __one explanatory variable__ (sales y from temperature x alone). The equation is a __straight line__ `y = ax + b`, the **regression line**. a and b are fixed by **least squares**: the line that __minimizes the sum of squared differences__ between actual values and the line — each difference is a **residual**.' },
            { ar: '🏠 **الانحدار المتعدد:** نتنبّأ بمتغير الاستجابة بـ__كذا متغير تفسيري__ — لأن في البيانات الحقيقية نادرًا ما النتيجة بيحدّدها سبب واحد (سعر المنزل من __الحجم والعمر والبعد عن المحطة__). الصيغة: كل متغير مضروب في **معامل** (تغيّر التنبؤ المرتبط بزيادة وحدة منه مع ثبات الباقي، من غير تفسير سببي تلقائي) + **نقطة التقاطع**: لمتغيرين `y = a₁x₁ + a₂x₂ + b`، وبنزوّد حدود بنفس الطريقة لتلاتة أو أكتر. ⚖️ **البسيط:** متغير واحد · بسيط وسهل التفسير · علاقة بين متغيرين باختصار. **المتعدد:** اتنين أو أكتر · بيعبّر عن علاقات معقّدة، بس __مابيضمنش تنبؤ أفضل__.', en: '🏠 **Multiple regression:** predict the response with __several explanatory variables__ — in real data a result is rarely set by one cause (house price from __floor area, age and distance to a station__). The form: each variable times a **coefficient** (its strength of effect) + an **intercept**: for two variables `y = a₁x₁ + a₂x₂ + b`, adding terms likewise for three or more. ⚖️ **Simple:** one variable · simple, easy to interpret · two variables concisely. **Multiple:** two or more · expresses complex relationships · when many factors influence the result.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'في كل نموذج: انحدار بسيط ولا متعدد؟', en: 'Is each model simple or multiple regression?' },
            groups: [{ icon: 'target', label: { ar: 'بسيط (x واحد)', en: 'Simple (one x)' } }, { icon: 'layers', label: { ar: 'متعدد (أكتر من x)', en: 'Multiple (several x)' } }],
            items: [
              { text: { ar: 'مبيعات الآيس كريم من الحرارة', en: 'Ice-cream sales from temperature' }, group: 0 },
              { text: { ar: 'سعر الشقة من الحجم والعمر والبعد عن المحطة', en: 'Flat price from area, age and distance' }, group: 1 },
              { text: { ar: 'درجة الامتحان من ساعات المذاكرة بس', en: 'Exam score from study hours only' }, group: 0 },
              { text: { ar: 'مبيعات المقصف من الحرارة وعدد الطلبة ويوم الامتحان', en: 'Shop sales from temperature, students and exam day' }, group: 1 },
            ],
            explain: { ar: 'متغير تفسيري واحد = __بسيط__ · أكتر = __متعدد__.', en: 'One explanatory variable = __simple__ · more = __multiple__.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2) — احسبها', en: '✋ Check yourself (2) — work it out' },
          q: { widget: 'numeric', prompt: { ar: 'خط الانحدار: المبيعات = 9 × الحرارة − 150. بكرة الحرارة 35°. المبيعات المتوقعة كام علبة؟', en: 'Regression line: sales = 9 × temperature − 150. Tomorrow is 35°. How many tubs are expected?' },
            answer: 165, tolerance: 0, hint: { ar: '`9 × 35 − 150`', en: '9 × 35 − 150' },
            explain: { ar: '`315 − 150 = 165` علبة.', en: '315 − 150 = 165 tubs.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**الاستجابة** = النتيجة (y) · **التفسيري** = المدخل (x) · **النموذج** = معادلة مبسّطة لازم تتقيّم.', en: '**Response** = the result (y) · **explanatory** = the input (x) · **model** = a simplified equation that must be evaluated.' },
            { ar: '**البسيط:** y = ax + b · المربعات الصغرى بتقلّل مجموع مربعات **المتبقيات**.', en: '**Simple:** y = ax + b · least squares minimizes the sum of squared **residuals**.' },
            { ar: '**المتعدد:** y = a₁x₁ + a₂x₂ + … + b · **المعامل** = تغيّر التنبؤ مع زيادة وحدة وثبات الباقي · **b** = نقطة التقاطع.', en: '**Multiple:** y = a₁x₁ + a₂x₂ + … + b · **coefficient** = strength of effect · **b** = intercept.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · evaluating the model ───────────── */
    {
      id: 'evaluate', kind: 'learn',
      title: { ar: 'تقييم النموذج: R² وRMSE وMAE… والسببية', en: 'Evaluating the model: R², RMSE, MAE… and causation' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: دقيق قد إيه؟… وهل هو سبب؟', en: '🎞️ Animation: how accurate?… and is it a cause?' },
          enTitle: 'Evaluating regression',
          terms: ['R²', 'RMSE', 'MAE', 'confounder', 'causation'],
          visual: { anim: 'regressMovie', props: { scenes: [3, 7] } },
          beats: [
            { ar: '🎯 **R² (معامل التحديد):** بيوضّح __مقدار التباين اللي النموذج بيفسّره__ مقارنة بنموذج مرجعي، وفي السياق التعليمي المبسط بيتعرض عادةً __بين 0 و1__ — __كل ما يقرب من 1، التفسير أحسن__. نقط ملمومة حوالين الخط = R² عالي (0.95)، ونقط متبعترة = R² منخفض (0.30). ⚠️ R² عالي معناه إن __الخط ملائم للتباين__، __مش__ إن x سبب y.', en: '🎯 **R² (coefficient of determination):** expresses __on a 0–1 scale__ __how well the model explains the variability__ in the data — __the closer to 1, the better__. Points hugging the line = high R² (0.95); scattered points = low R² (0.30). ⚠️ A high R² means __the line fits the variation__, __not__ that x causes y.' },
            { ar: '📏 **RMSE** = __الجذر التربيعي لمتوسط مربعات__ الفروق بين المتوقّع والفعلي؛ **MAE** = __متوسط القيم المطلقة__ للفروق. الاتنين __كل ما يصغروا الدقة تزيد__، و__بنفس وحدة متغير الاستجابة__. مثال: أخطاء +2، −3، +1، −2، +12 ← MAE = `(2+3+1+2+12) ÷ 5 = 4` · RMSE = `√((4+9+1+4+144) ÷ 5) = √32.4 ≈ 5.7` — أكبر لأن خطأ الـ12 __«اتعاقب» بالتربيع__. **RMSE بيدّي الفروق الكبيرة وزن أكبر**، و**MAE أقل تأثّرًا بالقيم الشاذة**.', en: '📏 **RMSE** = __the square root of the mean of squared__ differences between predicted and actual; **MAE** = __the mean of the absolute__ differences. For both, __smaller means more accurate__, and both are __in the response variable’s units__. Example: errors +2, −3, +1, −2, +12 → MAE = `(2+3+1+2+12) ÷ 5 = 4` · RMSE = `√((4+9+1+4+144) ÷ 5) = √32.4 ≈ 5.7` — larger because the 12 miss is __"punished" by squaring__. **RMSE weights large discrepancies more**; **MAE is less affected by outliers**.' },
            { ar: '🕵️ **ماتخلطش الارتباط بالسببية:** معادلة تنبّؤ ملائمة للبيانات __مابتثبتش السبب__. مبيعات الآيس كريم وحوادث السباحة بيطلعوا مع بعض بملاءمة قوية… بس الآيس كريم مش سبب الحوادث: فيه **عامل مربِك** (سبب تالت خفي) — __الصيف والحر__ — بيرفع الاتنين. عشان تدّعي سببية محتاج: ⏱️ __أسبقية زمنية__ (السبب قبل النتيجة) + 🚫 __استبعاد تأثير العوامل التانية__ + 📚 __تصميم دراسة وأدلة إضافية__ — والملاءمة أو الأسبقية الزمنية لوحدهم مش كفاية.', en: '🕵️ **Do not confuse correlation with causation:** a prediction equation that fits the data __does not prove a cause__. Ice-cream sales and swimming accidents rise together with a tight fit… but ice cream does not cause accidents: a **confounder** (a hidden third cause) — __summer heat__ — drives both. To claim causation you need: ⏱️ __temporal precedence__ (cause before effect) + 🚫 __ruling out other factors__ + 📚 __theoretical support__.' },
            { ar: '⚠️ **تنبيهات:** ① __النموذج مابيخلصش بإنشائه__ — أكّد دقّته بالمؤشرات واتأكّد إنه صالح للغرض، و__ماتطبّقوش برّه مدى البيانات__ اللي اتعمل عليها. ② __ماتحكمش بـ R² لوحده__ — افحص أخطاء التنبؤ والافتراضات والأداء على بيانات ماتستخدمتش في الملاءمة، وR² المعدل بيفيد في مقارنة نماذج مختلفة في عدد المتغيرات. ③ __زيادة متغيرات تفسيرية مش بالضرورة بتحسّن النموذج__ — اختار المناسب للغرض؛ النموذج __«المفرط في الملاءمة»__ بيطارد __التشويش__ مش الاتجاه. الانحدار __منظور واحد من البيانات__: بنفسّره، مش بنطيعه.', en: '⚠️ **Cautions:** ① __a model is not finished when built__ — confirm its accuracy with the indicators, check it is valid for the purpose, and __do not apply it outside the data range__ it was fitted on. ② __Do not judge by R² alone__ — use the other indicators too. ③ __Adding explanatory variables does not necessarily improve a model__ — choose suitable ones; an __"overfit"__ model chases __noise__, not the trend. Regression is __one perspective from the data__: interpret it, don’t obey it.' },
            { ar: '📌 **الخلاصة:** بسيط `y = ax + b` (متغير واحد) أو متعدد (مجموع موزون + b)، بيتلاءم بالمربعات الصغرى · نحكم بـ__R² وRMSE وMAE مع بعض__ (RMSE بيبرز الأخطاء الكبيرة وMAE بيقاوم الشواذ) · والملاءمة الكويسة __ارتباط مش سببية__.', en: '📌 **The point:** simple `y = ax + b` (one variable) or multiple (weighted sum + b), fitted by least squares · judge with __R², RMSE and MAE together__ (RMSE highlights big misses, MAE resists outliers) · and a good fit is __correlation, not causation__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«المتعدد بيستخدم متغير تفسيري واحد» ← __غلط__ · «ملاءمة المعادلة بتثبت السببية» ← __غلط__ · «R² قريب من 1 كفاية من غير مؤشرات تانية» ← __غلط__ · «RMSE وMAE نفس الحساب ودايمًا متساويين» ← __غلط__ · «MAE بيدّي الفروق الكبيرة وزن أكبر» ← __غلط__ (ده RMSE). خط الانحدار بـ__المربعات الصغرى__ · الفرق بين الفعلي والخط = __متبقّي__.', en: '"Multiple regression uses one explanatory variable" → __false__ · "a fitting equation proves causation" → __false__ · "R² near 1 is enough without other indicators" → __false__ · "RMSE and MAE are the same calculation and always equal" → __false__ · "MAE weights big gaps more" → __false__ (that is RMSE). The regression line comes from __least squares__ · the gap between actual and line = a __residual__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — أنهي مؤشر تبلّغ عنه؟', en: 'Deep dive — which indicator do you report?' }, text: { ar: 'لو فيه يوم واحد شاذ (مهرجان مثلًا) مش المفروض يحكم على النموذج ← __MAE__ أعدل. لو الأخطاء الكبيرة مكلّفة جدًا (البضاعة خلصت والطلبة مالقوش) ← __RMSE__ بيبرزها. وR² = 0.95 بيقول إن الخط ملائم للتباين، مش إن الحرارة سبب المبيعات — ممكن عامل تالت (زي الموسم) يرفع الاتنين.', en: 'If one odd day (a festival, say) should not judge the model → __MAE__ is fairer. If big misses are very costly (stock ran out and students found nothing) → __RMSE__ highlights them. And R² = 0.95 says the line fits the variation, not that temperature causes sales — a third factor (such as the season) may drive both.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1) — احسبها', en: '✋ Check yourself (1) — work it out' },
          q: { widget: 'numeric', prompt: { ar: 'أخطاء تنبّؤ: +1، −2، +2، −1. احسب MAE.', en: 'Prediction errors: +1, −2, +2, −1. Compute the MAE.' },
            answer: 1.5, tolerance: 0.001, hint: { ar: 'متوسط القيم المطلقة: `(1+2+2+1) ÷ 4`', en: 'Mean of absolute values: (1+2+2+1) ÷ 4' },
            explain: { ar: '`6 ÷ 4 = 1.5` · و RMSE = `√((1+4+4+1) ÷ 4) = √2.5 ≈ 1.58` (أكبر شوية).', en: '6 ÷ 4 = 1.5 · and RMSE = √((1+4+4+1) ÷ 4) = √2.5 ≈ 1.58 (slightly larger).' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل مؤشر بوصفه:', en: 'Match each indicator with its description:' },
            left: [{ ar: 'R²', en: 'R²' }, { ar: 'RMSE', en: 'RMSE' }, { ar: 'MAE', en: 'MAE' }],
            right: [{ ar: 'متوسط القيم المطلقة للأخطاء — بيقاوم الشواذ', en: 'Mean absolute error — resists outliers' }, { ar: 'من 0 لـ 1: قد إيه بيفسّر التباين', en: '0 to 1: how much variation is explained' }, { ar: 'جذر متوسط المربعات — بيبرز الأخطاء الكبيرة', en: 'Root mean square — highlights big misses' }],
            answer: [1, 2, 0],
            explain: { ar: 'R² تفسير · RMSE تربيع · MAE مطلق.', en: 'R² explained · RMSE squared · MAE absolute.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**R²:** 0–1 · أقرب لـ 1 = تفسير أحسن — بس مش لوحده.', en: '**R²:** 0–1 · closer to 1 = better — but never alone.' },
            { ar: '**RMSE** يبرز الأخطاء الكبيرة · **MAE** يقاوم الشواذ · الاتنين بوحدة الاستجابة وأصغر = أدق.', en: '**RMSE** highlights big misses · **MAE** resists outliers · both in response units, smaller = better.' },
            { ar: '**ارتباط ≠ سببية:** عامل مربِك ممكن يحرّك الاتنين · السببية = زمن + استبعاد + نظرية.', en: '**Correlation ≠ causation:** a confounder may drive both · causation = time + ruling out + theory.' },
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
            { text: { ar: 'A) الانحدار المتعدد طريقة للتنبّؤ بمتغير الاستجابة بمتغير تفسيري واحد.', en: 'A) Multiple regression predicts the response variable with one explanatory variable.' }, answer: false },
            { text: { ar: 'B) R² مؤشر بيوضّح قد إيه النموذج بيفسّر التباين في البيانات.', en: 'B) R² shows how much of the variance in the data the model explains.' }, answer: true },
            { text: { ar: 'C) المعادلة اللي بتطلع من البيانات في الانحدار اسمها النموذج، وهي تمثيل مبسّط لعلاقة حقيقية.', en: 'C) The equation obtained from data in regression is the model, a simplified representation of a real relationship.' }, answer: true },
            { text: { ar: 'D) لو معادلة التنبّؤ ملائمة، نقدر نقول فيه علاقة سببية بين المتغير التفسيري والاستجابة.', en: 'D) If the prediction equation fits, a causal relationship exists between the explanatory and response variables.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) ده __البسيط__؛ المتعدد بكذا متغير ← **✗**.', en: 'A) That is __simple__; multiple uses several → **✗**.' },
            { ar: 'B) تعريف R² ← **✓**.', en: 'B) The definition of R² → **✓**.' },
            { ar: 'C) تعريف النموذج ← **✓**.', en: 'C) The definition of a model → **✓**.' },
            { ar: 'D) الملاءمة لوحدها __مابتثبتش__ السببية ← **✗**.', en: 'D) A fit alone does __not__ prove causation → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمؤشر (A–C):', en: '(2) Match each description (a–c) with the indicator (A–C):' },
            left: [
              { ar: 'a) متوسط القيم المطلقة للفروق بين المتوقّع والفعلي', en: 'a) Mean of absolute differences between predicted and actual' },
              { ar: 'b) الجذر التربيعي لمتوسط مربعات الفروق', en: 'b) Square root of the mean of squared differences' },
              { ar: 'c) قد إيه النموذج بيفسّر التباين في البيانات', en: 'c) How much of the variance the model explains' },
            ],
            right: [{ ar: 'A RMSE', en: 'A RMSE' }, { ar: 'B R²', en: 'B R²' }, { ar: 'C MAE', en: 'C MAE' }],
            answer: [2, 0, 1] },
          solution: [
            { ar: 'a: مطلق = **MAE** ← C.', en: 'a: absolute = **MAE** → C.' },
            { ar: 'b: جذر مربعات = **RMSE** ← A.', en: 'b: root of squares = **RMSE** → A.' },
            { ar: 'c: تفسير التباين = **R²** ← B.', en: 'c: variance explained = **R²** → B.' },
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
            { q: { ar: '1. الانحدار اللي بيتنبّأ بالاستجابة من كذا متغير تفسيري؟', en: '1. The regression predicting the response from several explanatory variables?' }, a: { ar: 'تحليل الانحدار المتعدد', en: 'Multiple regression analysis' } },
            { q: { ar: '2. المؤشر اللي بيوضّح قد إيه النموذج بيفسّر التباين؟', en: '2. The indicator showing how much variance the model explains?' }, a: { ar: 'R² (معامل التحديد)', en: 'R² (coefficient of determination)' } },
            { q: { ar: '3. المتغير اللي عايزين نفسّره، والمتغير المستخدم للمساعدة على تفسيره — على الترتيب؟', en: '3. The variable for the outcome, and the one used to predict it — respectively?' }, a: { ar: 'متغير الاستجابة / المتغير التفسيري', en: 'Response variable / explanatory variable' } },
            { q: { ar: '4. «الفرق بين القيم الفعلية وخط الانحدار»؟', en: '4. "The difference between actual values and the regression line"?' }, a: { ar: 'المتبقّي', en: 'Residual' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف الفرق بين الانحدار البسيط والمتعدد:', en: 'Choose the best description of simple vs multiple regression:' },
            options: [
              { ar: 'A البسيط بيعبّر عن علاقات معقّدة، والمتعدد بسيط', en: 'A Simple expresses complex relationships; multiple is simple' },
              { ar: 'B البسيط بكذا متغير، والمتعدد بمتغير واحد بس', en: 'B Simple uses several variables; multiple uses just one' },
              { ar: 'C البسيط بمتغير تفسيري واحد، والمتعدد بكذا متغير', en: 'C Simple uses one explanatory variable; multiple, several' },
              { ar: 'D مفيش فرق في العدد، الحساب بس اللي بيختلف', en: 'D No difference in number; only the calculation differs' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'C صح.', en: 'C is correct.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'classify', prompt: { ar: 'لكل غرض اختار الطريقة:', en: 'Choose the method for each purpose:' },
            groups: [{ icon: 'target', label: { ar: 'A الانحدار البسيط', en: 'A Simple regression' } }, { icon: 'layers', label: { ar: 'B الانحدار المتعدد', en: 'B Multiple regression' } }],
            items: [
              { text: { ar: 'a) مبيعات الآيس كريم من الحرارة (متغير واحد)', en: 'a) Ice-cream sales from temperature (one variable)' }, group: 0 },
              { text: { ar: 'b) أسعار المنازل من الحجم والعمر والبعد عن المحطة', en: 'b) House prices from area, age and distance to a station' }, group: 1 },
            ],
            explain: { ar: 'a ← A · b ← B.', en: 'a → A · b → B.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (3)', en: 'Try 2 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لتفسير نتايج تحليل الانحدار:', en: 'Choose the best interpretation of regression results:' },
            options: [
              { ar: 'A أي معادلة تنبّؤ من الانحدار بتدلّ أكيد على علاقة سببية', en: 'A Any prediction equation surely indicates causation' },
              { ar: 'B النتايج منظور واحد من البيانات، والسببية لازم تتقيّم بحرص', en: 'B Results are one view; causation must be assessed carefully' },
              { ar: 'C لو R² عالي يبقى النموذج أكيد كويس في أي حاجة', en: 'C If R² is high the model is necessarily good' },
              { ar: 'D لو المعادلة ملائمة، المتغير التفسيري هو سبب الاستجابة', en: 'D If it fits, the explanatory variable caused the response' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B صح — بنفسّر مش بنطيع.', en: 'B is right — interpret, don’t obey.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (4)', en: 'Try 2 (4)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ وصف مناسب لمؤشرات التقييم؟', en: 'Which is __not__ an appropriate description of the indicators?' },
            options: [
              { ar: 'A R² بين 0 و1؛ أقرب لـ 1 = تفسير أحسن', en: 'A R² is 0–1; closer to 1 = better explained' },
              { ar: 'B RMSE جذر متوسط المربعات بوحدة الاستجابة', en: 'B RMSE is the root mean square, in response units' },
              { ar: 'C MAE متوسط الفروق المطلقة وأقل تأثّرًا بالكبيرة', en: 'C MAE is the mean absolute gap, less hit by big ones' },
              { ar: 'D لو R² قرّب من 1 يبقى النموذج كويس من غير فحص', en: 'D If R² nears 1 the model is good without other checks' },
            ],
            fixedOrder: true, answer: 3,
            explain: { ar: 'D غلط — مش بـ R² لوحده.', en: 'D is wrong — never R² alone.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(h):', en: 'Read and fill blanks (a)–(h):' },
            text: { ar: 'في تحليل الانحدار، المتغير اللي عايزين نفسّره أو نتنبّأ بيه اسمه {0}، والمتغير المستخدم للمساعدة على ده اسمه {1}. {2} بيستخدم متغير تفسيري واحد، و{3} بيستخدم كذا متغير. ومن مقاييس التقييم {4} للتباين المفسَّر، و{5} و{6} لأخطاء التنبؤ. ومانقدرش نستنتج {7} لمجرد ملاءمة النموذج للبيانات.', en: 'In regression, the variable for the outcome is the {0}, and the one used to predict it is the {1}. Predicting with one variable is {2}; with several, {3}. Quality indicators include {4}, showing variance explained, and {5} and {6}, showing the size of the gaps. We cannot conclude {7} merely because the equation fits.' },
            bank: [{ ar: 'متغير الاستجابة', en: 'response variable' }, { ar: 'المتغير التفسيري', en: 'explanatory variable' }, { ar: 'الانحدار البسيط', en: 'simple regression' }, { ar: 'الانحدار المتعدد', en: 'multiple regression' }, { ar: 'R²', en: 'R²' }, { ar: 'RMSE', en: 'RMSE' }, { ar: 'MAE', en: 'MAE' }, { ar: 'السببية', en: 'causation' }],
            answer: [0, 1, 2, 3, 4, 5, 6, 7],
            explain: { ar: '(a) الاستجابة (b) التفسيري (c) البسيط (d) المتعدد (e) R² (f) RMSE (g) MAE (h) السببية.', en: '(a) response (b) explanatory (c) simple (d) multiple (e) R² (f) RMSE (g) MAE (h) causation.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف الارتباط والسببية:', en: 'Choose the best description of correlation and causation:' },
            options: [
              { ar: 'A لو فيه ارتباط بين متغيرين يبقى أكيد فيه سببية', en: 'A If a correlation exists, causation surely holds' },
              { ar: 'B السببية محتاجة أدلة إضافية', en: 'B Causation needs precedence, ruling out and theory' },
              { ar: 'C معادلة الانحدار لوحدها بتثبت السببية تمامًا', en: 'C A regression equation proves causation completely' },
              { ar: 'D مفيش ارتباط = مفيش أي علاقة خالص بين المتغيرين', en: 'D No correlation means no relationship at all' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B هي الشروط التلاتة.', en: 'B lists the three conditions.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لتفسير المؤشرات:', en: 'Choose the best interpretation of the indicators:' },
            options: [
              { ar: 'A R² بين 0 و1؛ أقرب لـ 1 = تفسير أحسن', en: 'A R² is 0–1; closer to 1 = better explained' },
              { ar: 'B RMSE وMAE نفس الحساب ودايمًا متساويين', en: 'B RMSE and MAE are the same and always equal' },
              { ar: 'C نموذج R² بتاعه عالي كويس في أي موقف', en: 'C A model with high R² is good in any situation' },
              { ar: 'D MAE بيدّي الفروق الكبيرة وزن أكبر', en: 'D MAE gives larger gaps greater weight' },
            ],
            fixedOrder: true, answer: 0,
            explain: { ar: 'A صح · D ده RMSE.', en: 'A is right · D describes RMSE.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (3)', en: 'Exercise 3 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ نقطة انتباه صحيحة؟', en: 'Which is __not__ a correct point of care?' },
            options: [
              { ar: 'A ماتستنتجش سببية لمجرد إن المعادلة ملائمة', en: 'A Do not infer causation just because it fits' },
              { ar: 'B أكّد الدقة بالمؤشرات وصلاحية النموذج للغرض', en: 'B Confirm accuracy and validity for the purpose' },
              { ar: 'C لو R² قرّب من 1 احكم من غير مؤشرات تانية', en: 'C If R² nears 1, judge without other indicators' },
              { ar: 'D متغيرات أكتر مش أكيد أدق؛ اختار المناسب', en: 'D More variables are not surely better; choose well' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'C غلط.', en: 'C is wrong.' } },
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
          { front: { ar: 'تحليل الانحدار', en: 'Regression analysis' }, back: { ar: 'نعبّر عن علاقة كمعادلة للتنبّؤ.', en: 'Expressing a relationship as an equation for prediction.' } },
          { front: { ar: 'متغير الاستجابة', en: 'Response variable' }, back: { ar: 'النتيجة (التابع) — y.', en: 'The result (dependent) — y.' } },
          { front: { ar: 'المتغير التفسيري', en: 'Explanatory variable' }, back: { ar: 'المتغير المستخدم للتفسير أو التنبؤ — x، ومش سبب بالضرورة.', en: 'The input used to predict — x.' } },
          { front: { ar: 'خط الانحدار / المربعات الصغرى', en: 'Regression line / least squares' }, back: { ar: 'y = ax + b · يقلّل مجموع مربعات المتبقيات.', en: 'y = ax + b · minimizes the sum of squared residuals.' } },
          { front: { ar: 'المتبقّي', en: 'Residual' }, back: { ar: 'الفرق بين القيمة الفعلية والقيمة المتوقعة.', en: 'The gap between the actual value and the line.' } },
          { front: { ar: 'المعامل / نقطة التقاطع', en: 'Coefficient / intercept' }, back: { ar: 'وزن المتغير / الثابت b.', en: 'A variable’s weight / the constant b.' } },
          { front: { ar: 'R²', en: 'R²' }, back: { ar: '0–1: قد إيه بيفسّر التباين.', en: '0–1: how much variation is explained.' } },
          { front: { ar: 'RMSE / MAE', en: 'RMSE / MAE' }, back: { ar: 'جذر متوسط المربعات (يبرز الكبير) / متوسط المطلق (يقاوم الشواذ).', en: 'Root mean square (big misses) / mean absolute (resists outliers).' } },
          { front: { ar: 'العامل المربِك', en: 'Confounder' }, back: { ar: 'سبب تالت خفي ورا ارتباط.', en: 'A hidden third cause behind a correlation.' } },
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
            prompt: { ar: 'اشرح ليه نموذج انحدار R² بتاعه عالي ممكن يفضل أساس ضعيف للادعاء إن متغير سبب متغير تاني. (أشِر إلى: الارتباط مقابل السببية)', en: 'Explain why a high-R² regression model can still be a poor basis for claiming one variable causes another. (Refer to: correlation versus causation)' },
            points: [
              { ar: 'R² بيقيس الملاءمة للتباين = ارتباط.', en: 'R² measures fit to variation = correlation.' },
              { ar: 'عامل مربِك ممكن يحرّك الاتنين (مثال).', en: 'A confounder may drive both (example).' },
              { ar: 'السببية: زمن + استبعاد + نظرية.', en: 'Causation: time + ruling out + theory.' },
            ],
            model: { ar: 'R² العالي بيقول إن الخط __ملائم للتباين__ في البيانات، يعني المتغيرين بيتحرّكوا مع بعض — ده __ارتباط__. لكن مابيقولش مين سبب مين، ولا إن مفيش سبب تالت. مثلًا مبيعات الآيس كريم وحوادث السباحة ممكن يتلاءموا بـ R² عالي، بس السبب الحقيقي __عامل مربِك__ هو الصيف والحر اللي بيرفع الاتنين. عشان أدّعي سببية محتاج __أسبقية زمنية__ (السبب يحصل قبل النتيجة)، و__استبعاد العوامل التانية__، و__تصميم دراسة وأدلة إضافية__ يفسّر الآلية. فالملاءمة لوحدها، مهما كانت قوية، مش إثبات.', en: 'A high R² says the line __fits the variation__ in the data, i.e. the two variables move together — that is __correlation__. It does not say which causes which, nor that there is no third cause. For example, ice-cream sales and swimming accidents can fit with a high R², but the real driver is a __confounder__ — summer heat — raising both. To claim causation I need __temporal precedence__ (cause before effect), __ruling out other factors__, and __theoretical support__ explaining the mechanism. A fit alone, however strong, is not proof.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — مشروبات المقصف', en: 'Think as an engineer — the shop’s cold drinks' },
            prompt: { ar: 'مقصف المدرسة عايزة تتنبّأ بمبيعاتها اليومية من المشروبات الساقعة. ١) سمِّ متغير الاستجابة والمتغيرات التفسيرية (حرارة اليوم، عدد الطلبة الحاضرين، هل هو يوم امتحان) — بسيط ولا متعدد وليه؟ ٢) اختار المؤشر اللي هتبلّغ عنه وبرّر، واذكر عامل مربِك ممكن يضلّلك. ٣) لو R² طلع عالي، ده لوحده يسمح تقول «الأيام الحر بتسبّب مبيعات أعلى»؟', en: 'The school shop wants to predict daily cold-drink sales. 1) Name the response and the explanatory variables (temperature, students present, exam day) — simple or multiple and why? 2) Choose the indicator to report and justify; name a confounder that might mislead you. 3) If R² is high, does that alone allow "hot days cause higher sales"?' },
            points: [
              { ar: 'الاستجابة: المبيعات · متعدد (3 متغيرات).', en: 'Response: sales · multiple (3 variables).' },
              { ar: 'MAE/RMSE حسب تكلفة الخطأ + عامل مربِك.', en: 'MAE/RMSE by error cost + a confounder.' },
              { ar: 'لأ — محتاج زمن + استبعاد + نظرية.', en: 'No — need time + ruling out + theory.' },
            ],
            model: { ar: '١) الاستجابة: عدد المشروبات المباعة في اليوم. التفسيرية: الحرارة، عدد الحاضرين، يوم امتحان ولا لأ — ده __انحدار متعدد__ لأن المبيعات بتتأثّر بأكتر من عامل. ٢) هبلّغ عن __RMSE__ لأن الغلطة الكبيرة (المشروبات تخلص) مكلّفة ومحتاج أشوفها، ومعاه MAE وR² للصورة الكاملة. عامل مربِك: __الموسم__ — الصيف بيرفع الحرارة وفي نفس الوقت بيغيّر عدد الطلبة الحاضرين والأنشطة. ٣) لأ، R² العالي __ارتباط__ بس. محتاج أسبقية زمنية واستبعاد العوامل التانية (زي إن في الأيام الحر فيه أنشطة رياضية) وتصميم دراسة وأدلة إضافية.', en: '1) Response: drinks sold per day. Explanatory: temperature, students present, exam day or not — __multiple regression__, since sales depend on more than one factor. 2) I would report __RMSE__ because a big miss (running out) is costly and I need to see it, alongside MAE and R² for the full picture. A confounder: __the season__ — summer raises the heat and also changes how many students attend. 3) No, a high R² is only __correlation__. I need temporal precedence, ruling out other factors (e.g. sports events on hot days) and theoretical support.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مدينة لقت إن الشهور اللي مبيعات الآيس كريم فيها أعلى فيها حوادث سباحة أكتر، وخط انحدار ملائم للاتنين بإحكام. اشرح ليه ده مش معناه إن الآيس كريم بيسبّب الحوادث، واذكر العامل الخفي الأرجح.', en: 'A city finds months with more ice-cream sales also have more swimming accidents, and a regression line fits both tightly. Explain why ice cream does not cause accidents, and name the likely hidden factor.' },
            points: [{ ar: 'ارتباط مش سببية.', en: 'Correlation, not causation.' }, { ar: 'العامل المربِك: الصيف/الحر.', en: 'Confounder: summer/heat.' }],
            model: { ar: 'الملاءمة القوية معناها إن الاتنين __بيتحرّكوا مع بعض__ (ارتباط)، مش إن واحد سبب التاني. العامل الخفي الأرجح هو __الصيف والحر__: بيخلّي الناس تشتري آيس كريم أكتر، وفي نفس الوقت تنزل تعوم أكتر فالحوادث تزيد. ده __عامل مربِك__ بيحرّك الاتنين.', en: 'A tight fit means the two __move together__ (correlation), not that one causes the other. The likely hidden factor is __summer heat__: it makes people buy more ice cream and also swim more, so accidents rise. It is a __confounder__ driving both.' } },
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
            prompt: { ar: 'فكّر في حاجتين شفتهم بيزيدوا مع بعض (زي وقت الشاشة وقلّة النوم). إيه العامل الخفي اللي ممكن يحرّك الاتنين؟', en: 'Think of two things you have seen rise together (e.g. screen time and poor sleep). What hidden factor might drive both?' },
            points: [{ ar: 'مثال لعامل مربِك منطقي.', en: 'A plausible confounder.' }],
            model: { ar: 'وقت الشاشة وقلّة النوم ممكن يكون وراهم __ضغط المذاكرة أو القلق__ — الطالب المضغوط بيقعد على الموبايل يهرب، وفي نفس الوقت نومه بيقل من القلق. فمش لازم الشاشة هي السبب المباشر؛ لازم نستبعد العامل ده الأول.', en: 'Screen time and poor sleep might both be driven by __study stress or anxiety__ — a stressed student escapes to the phone and also sleeps badly from worry. So the screen is not necessarily the direct cause; that factor must be ruled out first.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تحدّى', en: 'Challenge' },
            prompt: { ar: 'مسموح تزوّد متغير تفسيري واحد بس لنموذج R² بتاعه عالي أصلًا. ناقش: هتزوّده؟ واذكر الفحص الوحيد اللي هتعمله قبل ما تثق في النموذج الأكبر.', en: 'You may add one explanatory variable to a model whose R² is already high. Argue: would you? State the one check you would run before trusting the bigger model.' },
            points: [{ ar: 'متغير أكتر ممكن يزوّد R² من غير فايدة (ملاءمة مفرطة).', en: 'More variables can raise R² without real benefit (overfitting).' }, { ar: 'الفحص: الأداء على بيانات جديدة (RMSE/MAE).', en: 'Check: performance on new data (RMSE/MAE).' }],
            model: { ar: 'هزوّده بس لو ليه __سبب منطقي__ مرتبط بالغرض، لأن أي متغير جديد ممكن يرفع R² شوية من غير ما يحسّن التنبّؤ فعلًا (ملاءمة مفرطة بتطارد التشويش). الفحص: أجرّب النموذج الأكبر على __بيانات جديدة ماشافهاش__ وأقارن RMSE وMAE بالنموذج القديم — لو ماتحسّنوش، المتغير مالوش لازمة.', en: 'I would add it only if it has a __logical reason__ tied to the purpose, since any new variable can nudge R² up without truly improving prediction (overfitting chases noise). The check: test the bigger model on __new data it has not seen__ and compare RMSE and MAE with the old model — if they do not improve, the variable is unnecessary.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '6-2', seconds: 60, items: [
          { text: { ar: 'الاستجابة = النتيجة (y)', en: 'Response = the result (y)' }, answer: true },
          { text: { ar: 'التفسيري = النتيجة', en: 'Explanatory = the result' }, answer: false },
          { text: { ar: 'البسيط = متغير تفسيري واحد', en: 'Simple = one explanatory variable' }, answer: true },
          { text: { ar: 'المتعدد = متغير واحد', en: 'Multiple = one variable' }, answer: false },
          { text: { ar: 'المربعات الصغرى بتحدّد الخط', en: 'Least squares fixes the line' }, answer: true },
          { text: { ar: 'المتبقّي = الفعلي − المتوقّع', en: 'Residual = actual − line' }, answer: true },
          { text: { ar: 'R² من 0 لـ 1', en: 'R² runs from 0 to 1' }, answer: true },
          { text: { ar: 'R² لوحده كفاية', en: 'R² alone is enough' }, answer: false },
          { text: { ar: 'RMSE بيبرز الأخطاء الكبيرة', en: 'RMSE highlights big misses' }, answer: true },
          { text: { ar: 'MAE بيبرز الأخطاء الكبيرة', en: 'MAE highlights big misses' }, answer: false },
          { text: { ar: 'RMSE دايمًا = MAE', en: 'RMSE always equals MAE' }, answer: false },
          { text: { ar: 'الملاءمة بتثبت السببية', en: 'A fit proves causation' }, answer: false },
          { text: { ar: 'العامل المربِك سبب تالت خفي', en: 'A confounder is a hidden third cause' }, answer: true },
          { text: { ar: 'متغيرات أكتر = نموذج أحسن دايمًا', en: 'More variables = always better' }, answer: false },
          { text: { ar: 'ماتطبّقش برّه مدى البيانات', en: 'Do not apply outside the data range' }, answer: true },
          { text: { ar: 'السببية محتاجة أسبقية زمنية', en: 'Causation needs temporal precedence' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 6-2', en: 'Lesson 6-2 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. التنبّؤ بمتغير الاستجابة من كذا متغير تفسيري — أنهي انحدار؟', en: '1. Predicting y from several explanatory variables — which regression?' }, options: [{ ar: 'الانحدار البسيط', en: 'Simple regression' }, { ar: 'الانحدار المتعدد', en: 'Multiple regression' }, { ar: 'المربعات الصغرى', en: 'Least squares' }, { ar: 'المتبقّي', en: 'Residual' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. مؤشر بيوضّح قد إيه النموذج بيفسّر التباين (0–1) — أنهي؟', en: '2. The indicator for variance explained (0–1) — which?' }, options: [{ ar: 'RMSE (الخطأ)', en: 'RMSE' }, { ar: 'R² (التحديد)', en: 'R² (coefficient of determination)' }, { ar: 'MAE (الخطأ)', en: 'MAE' }, { ar: 'المعامل', en: 'The coefficient' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. أنهي مؤشر خطأ بيميل يدّي الفروق الكبيرة وزن أكبر؟', en: '3. Which error measure weights large misses more?' }, options: [{ ar: 'MAE', en: 'MAE' }, { ar: 'RMSE', en: 'RMSE' }, { ar: 'R²', en: 'R²' }, { ar: 'نقطة التقاطع', en: 'The intercept' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. ملاءمة معادلة التنبّؤ للبيانات بتثبت إن فيه علاقة سببية.', en: '4. A fitting prediction equation proves causation.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. خط الانحدار في الانحدار البسيط بيتحدّد بطريقة المربعات الصغرى.', en: '5. The regression line is fitted by least squares.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. زيادة متغيرات تفسيرية أكتر بتحسّن النموذج دايمًا.', en: '6. Adding more explanatory variables always improves the model.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. إيه الفرق بين الانحدار البسيط والمتعدد؟ اكتب صيغة كل واحد.', en: '7. What is the difference between simple and multiple regression? Write each formula.' },
          points: [{ ar: 'بسيط: متغير واحد · y = ax + b.', en: 'Simple: one variable · y = ax + b.' }, { ar: 'متعدد: أكتر · y = a₁x₁ + a₂x₂ + … + b.', en: 'Multiple: several · y = a₁x₁ + a₂x₂ + … + b.' }],
          model: { ar: 'الانحدار البسيط بيتنبّأ بمتغير الاستجابة بمتغير تفسيري واحد، وصيغته خط مستقيم y = ax + b؛ بسيط وسهل التفسير. الانحدار المتعدد بيتنبّأ بكذا متغير تفسيري، وصيغته مجموع كل متغير مضروب في معامل + نقطة تقاطع: y = a₁x₁ + a₂x₂ + b (وبنزوّد حدود للأكتر)؛ بيعبّر عن علاقات معقّدة.', en: 'Simple regression predicts the response from one explanatory variable; its form is a straight line y = ax + b — simple and easy to interpret. Multiple regression predicts from several explanatory variables; its form is each variable times a coefficient plus an intercept: y = a₁x₁ + a₂x₂ + b (adding terms for more) — it can express complex relationships.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. عرّف R² وRMSE وMAE، وإمتى تفضّل MAE على RMSE؟', en: '8. Define R², RMSE and MAE. When would you prefer MAE to RMSE?' },
          points: [{ ar: 'R²: 0–1 تفسير التباين.', en: 'R²: 0–1 variance explained.' }, { ar: 'RMSE: جذر متوسط المربعات · MAE: متوسط المطلق.', en: 'RMSE: root mean square · MAE: mean absolute.' }, { ar: 'MAE لما فيه قيم شاذة مش عايزها تحكم.', en: 'MAE when outliers should not dominate.' }],
          model: { ar: 'R² بيعبّر من 0 لـ 1 عن قد إيه النموذج بيفسّر التباين (أقرب لـ 1 أحسن). RMSE هو الجذر التربيعي لمتوسط مربعات الفروق بين المتوقّع والفعلي، وبيدّي الأخطاء الكبيرة وزن أكبر. MAE متوسط القيم المطلقة للفروق، وأقل تأثّرًا بالقيم الشاذة. أفضّل MAE لما يكون فيه يوم أو قيمة شاذة (زي مهرجان) مش عايزها تحكم على النموذج كله.', en: 'R² expresses on 0–1 how much variation the model explains (closer to 1 is better). RMSE is the square root of the mean of squared differences between predicted and actual, weighting big errors more. MAE is the mean of absolute differences, less affected by outliers. I prefer MAE when an odd day or value (a festival) should not judge the whole model.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. احسب MAE وRMSE لأخطاء تنبّؤ: +1، −2، +2، −1.', en: '9. Compute MAE and RMSE for prediction errors +1, −2, +2, −1.' },
          points: [{ ar: 'MAE = 6 ÷ 4 = 1.5.', en: 'MAE = 6 ÷ 4 = 1.5.' }, { ar: 'RMSE = √(10 ÷ 4) = √2.5 ≈ 1.58.', en: 'RMSE = √(10 ÷ 4) = √2.5 ≈ 1.58.' }],
          model: { ar: 'MAE = (|+1| + |−2| + |+2| + |−1|) ÷ 4 = (1+2+2+1) ÷ 4 = 6 ÷ 4 = 1.5. RMSE = √((1 + 4 + 4 + 1) ÷ 4) = √(10 ÷ 4) = √2.5 ≈ 1.58 — أكبر شوية من MAE لأن التربيع بيدّي الخطأين (2) وزن أكبر.', en: 'MAE = (|+1| + |−2| + |+2| + |−1|) ÷ 4 = (1+2+2+1) ÷ 4 = 6 ÷ 4 = 1.5. RMSE = √((1 + 4 + 4 + 1) ÷ 4) = √(10 ÷ 4) = √2.5 ≈ 1.58 — slightly larger than MAE because squaring gives the two errors of 2 more weight.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. اذكر شروط ادعاء السببية التلاتة، وليه حسن الملاءمة مش كفاية.', en: '10. State the three conditions for claiming causation, and why a good fit is not enough.' },
          points: [{ ar: 'أسبقية زمنية · استبعاد العوامل التانية · تصميم دراسة وأدلة إضافية.', en: 'Temporal precedence · ruling out other factors · theoretical support.' }, { ar: 'الملاءمة = ارتباط (ممكن عامل مربِك).', en: 'Fit = correlation (a confounder is possible).' }],
          model: { ar: 'الشروط: (1) أسبقية زمنية — السبب يحصل قبل النتيجة. (2) استبعاد تأثير العوامل التانية. (3) تصميم دراسة وأدلة إضافية. حسن الملاءمة مش كفاية لأنه بيوضّح إن المتغيرين بيتحرّكوا مع بعض (ارتباط) بس، وممكن يكون فيه عامل مربِك خفي بيحرّك الاتنين، زي الحر اللي بيرفع مبيعات الآيس كريم وحوادث السباحة.', en: 'The conditions: (1) temporal precedence — the cause comes before the effect; (2) ruling out the effect of other factors; (3) theoretical support explaining the mechanism. A good fit is not enough because it only shows the variables move together (correlation), and a hidden confounder may drive both — like heat raising ice-cream sales and swimming accidents.' } } },
      ],
    },
  ],
});
