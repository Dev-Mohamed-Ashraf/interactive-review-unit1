/* =========================================================
 * content/lesson-5-2.js — تنظيف البيانات وتحويلها
 * Pure data. Sources: textbook part 2, 5-2 (EN p.12–20) + memo (Arabic
 * wording, deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('5-2', {
  id: '5-2',
  color: '#06b6d4',
  cover: 'img/da-l2-cover.webp',
  title: { ar: 'تنظيف البيانات وتحويلها', en: 'Data Cleaning and Transformation' },
  guiding: { ar: 'ليه لازم ننظّف البيانات ونحوّلها قبل التحليل، وكل إصلاح فيه اختيارات إيه؟', en: 'Why must data be cleaned and transformed before analysis, and what choices does each fix involve?' },
  hook: {
    ar: 'البيانات الحقيقية بتوصل __فوضى__: خلايا فاضية، قيمة أكبر عشر مرات من المفروض، نفس الصف متسجّل مرتين، وتواريخ بتلات صيغ. قبل ما نثق في أي تحليل لازم البيانات __تتنظّف__ و__تتحوّل__ عشان تناسب السؤال. القاعدة: **«مدخلات خاطئة — مخرجات خاطئة»** — الحساب الدقيق على بيانات معيوبة بيدّي برضه __إجابة معيوبة__.',
    en: 'Real data arrives __messy__: empty cells, a value ten times too large, the same row entered twice, dates in three formats. Before any analysis can be trusted, data must be __cleaned__ and __transformed__ to fit the question. The rule: **"garbage in, garbage out"** — careful calculation on flawed data still gives __a flawed answer__.',
  },
  keyFact: { ar: 'البيانات الخام نادرًا ما تكون جاهزة. __التنظيف__ بيصلّح القيم المفقودة والشاذة والمكررة؛ و__التحويل__ بيغيّر الأنواع ويضبط المقياس ويعيد تشكيل البيانات على قد الغرض — وجودة أي تحليل معتمدة على التحضير ده.', en: 'Raw data is rarely ready. __Cleaning__ fixes missing values, outliers and duplicates; __transformation__ converts types, rescales and reshapes data to fit the purpose — the quality of any analysis depends on this preparation.' },
  concepts: ['data cleaning', 'data transformation', 'missing values', 'imputation', 'outliers', 'duplicate data', 'data type conversion', 'normalization', 'standardization', 'pivot', 'join', 'aggregation'],
  objectives: [
    { ar: 'أشرح إزاي بنتعامل مع القيم المفقودة والشاذة والمكررة لما ننظّف مجموعة بيانات.', en: 'Explain how missing values, outliers and duplicate data are handled when cleaning a dataset.' },
    { ar: 'أوصف تحويل نوع البيانات، والتحويل الكمي والتوحيد القياسي، وإعادة تشكيل البيانات على قد الغرض.', en: 'Describe data type conversion, normalization and standardization, and reshaping data to fit a purpose.' },
  ],

  stations: [
    /* ───────────── 1 · cleaning ───────────── */
    {
      id: 'clean', kind: 'learn',
      title: { ar: 'التنظيف: مفقودة · شاذة · مكررة', en: 'Cleaning: missing · outliers · duplicates' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'في جدول استبيان لقيت طالب كاتب إنه بيقعد «9999» ساعة على الموبايل… هتعمل إيه؟', en: 'In a survey table a student wrote "9999" hours of screen time… what would you do?' },
            options: [
              { emoji: '🗑️', text: { ar: 'أمسحها على طول', en: 'Delete it right away' } },
              { emoji: '🔍', text: { ar: 'أدوّر على السبب الأول', en: 'Find the cause first' } },
              { emoji: '🙈', text: { ar: 'أسيبها زي ما هي', en: 'Leave it as it is' } },
            ],
            after: { ar: 'كل قيمة غريبة ليها حكاية… يلا نشوف 👇', en: 'Every strange value has a story… let’s see 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: جدول فوضى… بيتنظّف قدّامك', en: '🎞️ Animation: a messy table… cleaned before your eyes' },
          enTitle: 'Cleaning a dataset',
          terms: ['data cleaning', 'missing values', 'imputation', 'outliers', 'duplicate data'],
          visual: { anim: 'cleanMovie', props: { scenes: [0, 4] } },
          beats: [
            { ar: 'البيانات المجمّعة ممكن تحتاج تنظيف أو تحويل قبل التحليل. **تنظيف البيانات** = اكتشاف مشاكلها وتصحيحها أو التعامل معاها بطريقة مناسبة، و**تحويل البيانات** = تعديل الصيغ أو البنية عشان تناسب السؤال وطريقة التحليل. المسار: **جمع ← تنظيف ← تحويل ← تحليل**. ولو سبنا المشاكل، ممكن نطلع __باستنتاجات غلط__ — **«مدخلات خاطئة — مخرجات خاطئة»**. ومفيش وصفة إصلاح واحدة لكل البيانات: القرار حسب __نوع المشكلة وسؤال التحليل__.', en: 'Collected data often __cannot be used as is__. Fixing issues such as missing values, outliers and duplicates, and arranging data into a format that fits the purpose, is **data cleaning** and **data transformation**. The path: **collect → clean → transform → analyze**. Left unaddressed, problems lead to __wrong conclusions__ — **"garbage in, garbage out"**. No single fix sequence fits all data: decisions depend on __the problem and the analysis question__.' },
            { ar: '😵 جدول استبيان «ساعات الشاشة» وصل كده: 🕳️ خلية __فاضية__ (قيمة مفقودة) · 📈 «9999» (__قيمة شاذة__) · 👯 نفس الصف __متسجّل مرتين__ (مكرر) · 📅 تواريخ __بصيغ مختلفة__، ورقم متخزّن كنص «"4"». كل مشكلة منهم ليها علاج… وهنصلّحها واحدة واحدة.', en: '😵 A "screen hours" survey table arrived like this: 🕳️ an __empty__ cell (missing value) · 📈 "9999" (an __outlier__) · 👯 the same row __entered twice__ (duplicate) · 📅 dates in __different formats__, plus a number stored as text "4". Each problem has its own fix… and we will fix them one by one.' },
            { ar: '🕳️ **القيم المفقودة:** لو استخدمناها مباشرة ممكن __الحساب مايشتغلش صح__ أو النتيجة __تتحيّز__. من الطرق الشائعة: 🗑️ **الحذف** (نشيل الصف/العمود) — لما الفقد __قليل وأثره صغير ومبعثر من غير تحيّز__ · 🧩 **التعويض** (نقدّر قيمة بديلة، بسيطة زي الوسيط أو أكتر تقدمًا) — بعد فهم سبب الفقد ونمطه، ومع __فحص أثره في التوزيع والنتائج__ · 🚩 **وضع علامة** (نسيب مؤشر إنها كانت مفقودة ونحلّل) — لما __الغياب نفسه ليه معنى__ (زي حد رفض يجاوب). الاختيار حسب __مقدار الفقد وسببه ونمطه وغرض التحليل__، والتعويض البسيط بالمتوسط ممكن يغيّر التوزيع ويقلّل التباين لو الفقد كبير.', en: '🕳️ **Missing values:** used directly they can __stop calculations working__ or __bias__ the result. One of three responses: 🗑️ **deletion** (remove the row/column) — when missing values are __few, low-impact and scattered without bias__ · 🧩 **imputation** (fill with the mean, median or a neighboring value) — when gaps are scattered and a representative value __will not change the overall trend__ · 🚩 **flagging** (mark that it was missing and analyze as is) — when __the absence itself has meaning__ (e.g. someone refused to answer). No single right answer: judge by __proportion, pattern and purpose__.' },
            { ar: '📈 **القيم الشاذة:** قيم __بعيدة جدًا__ عن الباقي — و__مش لازم تكون غلط__. ممكن تبقى **قيمة غير طبيعية** من خطأ إدخال أو قياس، وممكن تبقى __قيمة حقيقية نادرة__ (يوم مبيعات عالي جدًا بسبب عرض أو حدث). العلاج بيبدأ بـ__تحديد السبب__ والتحقق من مصدر القيمة وتعريف المتغير: ❌ خطأ ← __نصحّح أو نحذف__ · ✅ بتعكس الواقع ← __نحتفظ بيها مبدئيًا__ ونقرّر حسب الغرض. في جدولنا: «9999» طلعت غلطة كتابة ← 9.', en: '📈 **Outliers:** values that __deviate greatly__ from the rest — and __not necessarily errors__. One may be an **abnormal value** from an entry or measurement error, or a __genuinely rare real value__ (a very high sales day from a promotion or event). Handling starts with __the cause__: ❌ an error → __correct or delete__ · ✅ reflects reality → __keep it in principle__ and decide by purpose. In our table: "9999" turned out to be a typo → 9.' },
            { ar: '👯 **البيانات المكررة:** نفس المحتوى في أكتر من سجل — ممكن __تغيّر الحسابات__، بس __مابتتحذفش إلا بعد التأكد إنها تكرار غير مقصود لنفس الملاحظة__: سجلات شكلها متطابق ممكن تكون __أحداث حقيقية منفصلة__ لازم تفضل — زي عميل اشترى نفس المنتج __مرتين في نفس اليوم__ = عمليتين بيع. في جدولنا الطالب بعت نفس الرد مرتين ← نشيل التكرار.', en: '👯 **Duplicate data:** the same content in several records — it __distorts aggregation__, so it is removed in principle. But __confirm it is genuinely duplicated__: identical-looking records may be __separate real events__ to keep — e.g. a customer buying the same product __twice in one day__ = two sales. In our table the student submitted the same reply twice → remove the copy.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل موقف للقيم المفقودة بالاستجابة المناسبة:', en: 'Match each missing-value situation with the right response:' },
            left: [
              { ar: 'خليتين فاضيين بس من 500 ومبعثرين', en: 'Just 2 empty cells out of 500, scattered' },
              { ar: 'فراغات مبعثرة والمتوسط مش هيغيّر الاتجاه', en: 'Scattered gaps; a mean will not change the trend' },
              { ar: 'الخانة فاضية لأن الشخص رفض يجاوب', en: 'The cell is empty because the person refused' },
            ],
            right: [{ ar: 'وضع علامة', en: 'Flagging' }, { ar: 'الحذف', en: 'Deletion' }, { ar: 'التعويض', en: 'Imputation' }],
            answer: [1, 2, 0],
            explain: { ar: 'قليل = حذف · مبعثر = تعويض · الغياب ليه معنى = علامة.', en: 'Few = delete · scattered = impute · meaningful absence = flag.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'كل القيم الشاذة أخطاء ولازم تتمسح فورًا.', en: 'All outliers are errors and must be deleted at once.' }, answer: false, explain: { ar: 'نحدّد __السبب__ الأول؛ ممكن تكون حقيقية نادرة.', en: 'Find __the cause__ first; it may be a rare real value.' } },
            { text: { ar: 'البيانات المكررة بتتشال بس بعد ما نتأكّد إنها تكرار فعلي.', en: 'Duplicates are removed only after confirming they truly duplicate.' }, answer: true },
            { text: { ar: 'تنظيف البيانات بيتعمل قبل جمعها.', en: 'Data cleaning is done before collection.' }, answer: false, explain: { ar: 'بيتعمل __بعد__ الجمع.', en: 'It is done __after__ collection.' } },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**مدخلات خاطئة — مخرجات خاطئة:** جمع ← تنظيف ← تحويل ← تحليل.', en: '**Garbage in → garbage out:** collect → clean → transform → analyze.' },
            { ar: '**المفقودة:** حذف (قليل) · تعويض بالمتوسط/الوسيط (مبعثر) · علامة (الغياب ليه معنى).', en: '**Missing:** delete (few) · impute with mean/median (scattered) · flag (absence means something).' },
            { ar: '**الشاذة:** السبب الأول (خطأ ← صحّح/احذف · حقيقية ← احتفظ) · **المكررة:** نشيلها لو تكرار فعلي بس.', en: '**Outliers:** cause first (error → fix/delete · real → keep) · **duplicates:** remove only true copies.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · transformation ───────────── */
    {
      id: 'transform', kind: 'learn',
      title: { ar: 'التحويل: النوع · المقياس · التشكيل', en: 'Transformation: type · scale · shape' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: نوحّد الصيغة والمقياس… ونعيد التشكيل', en: '🎞️ Animation: one format, one scale… then reshape' },
          enTitle: 'Transforming data',
          terms: ['data type conversion', 'normalization', 'standardization', 'pivot', 'join', 'aggregation'],
          visual: { anim: 'cleanMovie', props: { scenes: [5, 9] } },
          beats: [
            { ar: '🔢 **تحويل نوع البيانات:** نفرّق بين __تغيير نوع البيانات__ (نص رقمي ← رقم) و__توحيد الصيغ أو الترميز__ (كتابة التاريخ أو القيم الفئوية). لو الصيغ مختلفة، البرنامج ممكن يعامل القيم المتشابهة كأنها مختلفة: __أرقام متخزّنة كنص__ ممكن تفشّل بعض الحسابات، و__تواريخ مش موحّدة__ بتتعامل كأيام مختلفة. أنواعه: **من نص لرقم** ("123" ← 123) · **توحيد صيغة التاريخ** ("2026/4/1" و"01 Apr 2026" ← 2026-04-01) · **توحيد طريقة الكتابة** ("M/F" + "ذكر/أنثى" ← "ذكر/أنثى").', en: '🔢 **Data type conversion:** arranging the format so data __can be analyzed__. Without aligned formats we cannot aggregate correctly: __numbers stored as strings__ cannot be summed or averaged, and __un-unified dates__ are treated as different days. Kinds: **string → numeric** ("123" → 123) · **unify date format** ("2026/4/1", "01 Apr 2026" → 2026-04-01) · **unify notation** ("M/F" + "Male/Female" → "Male/Female").' },
            { ar: '📏 في بعض الخوارزميات __الحساسة للمقياس__، المتغير ذو النطاق الأكبر ممكن __يبقى تأثيره أكبر__ لمجرد مقياسه: الطول (160–180 سم) أرقامه أكبر من الوزن (50–90 كجم) فيبان «أهم» بس عشان حجم أرقامه. ممكن نستخدم **التحويل الكمي (تحجيم Min–Max)**: بيحوّل البيانات لنطاق __من 0 لـ 1__ — `(القيمة − الأصغر) ÷ (الأكبر − الأصغر)` ← 160 = 0 · 170 = 0.5 · 180 = 1. غرضه: نحط متغيرات بوحدات مختلفة __في صيغة قابلة للمقارنة__ لما الخوارزمية تحتاج ده، ومش مطلوب لكل تحليل.', en: '📏 When variables’ __units or ranges__ differ greatly, the variable with larger values __dominates__ the result: height (160–180 cm) has bigger numbers than weight (50–90 kg), so it looks "more important" just because of its size. The fix is **normalization (Min‑Max)**: it converts data to a range __from 0 to 1__ — `(value − min) ÷ (max − min)` → 160 = 0 · 170 = 0.5 · 180 = 1. Purpose: put variables with different units __into a comparable form__.' },
            { ar: '🔔 **التوحيد القياسي:** بيحوّل البيانات لصيغة __متوسطها 0 وانحرافها المعياري 1__ — `(القيمة − المتوسط) ÷ الانحراف المعياري` — فالنتيجة بتقول «القيمة دي __بعيدة كام انحراف معياري__ عن المتوسط». غرضه: __نحدّد مكان كل قيمة بالنسبة لتشتّت البيانات__ — مفيد نقارن طالب في امتحانات متوسطها وتشتّتها مختلف. والتفسير بيعتمد على شكل التوزيع. ⚠️ عايز نطاق ثابت 0–1 ← كمي؛ عايز المكان بالنسبة للتشتّت (ممكن تطلع برّه 0–1) ← قياسي.', en: '🔔 **Standardization:** converts data to a form with __mean 0 and standard deviation 1__ — `(value − mean) ÷ standard deviation` — so the result says "this value is __how many standard deviations__ from the mean". Purpose: __position each value relative to the spread__ — useful to compare a student across exams with different means and spreads. ⚠️ Want a fixed 0–1 range → normalization; want the position relative to spread (values may fall outside 0–1) → standardization.' },
            { ar: '🧩 **إعادة تشكيل البيانات:** تغيير ترتيبها أو تجميعها حسب غرض التحليل — __وضّح الغرض الأول__ وبعدين خطّط. 🔲 **التحويل المحوري (Pivot):** تحويل البيانات بين __شكل طويل وعريض__ ← جدول __صف × عمود__ (تاريخ، منتج، مبيعات ← جدول «تاريخ × منتج») · 🔑 **الربط (Join):** نوصل أكتر من مجموعة بيانات __بمفتاح أو شرط مطابق__ (سجل الطلبة + كشف الدرجات بـ«رقم الطالب») · Σ **التجميع (Aggregation):** نحسب __المجاميع والمتوسطات لكل مجموعة__ (الإجمالي الشهري من المبيعات اليومية).', en: '🧩 **Reshaping data:** changing its arrangement or aggregating it to fit the analysis purpose — __clarify the purpose first__, then plan. 🔲 **Pivot:** __vertically__ arranged data → a __row × column__ table (date, product, sales → a "date × product" table) · 🔑 **Join:** connect several datasets __through a common item__ (student roster + grade sheet by "student ID") · Σ **Aggregation:** compute __sums and means per group__ (monthly totals from daily sales).' },
            { ar: '📌 **الخلاصة:** نظّف (مفقودة بالحذف/التعويض/العلامة حسب نسبتها ومعناها · شاذة حسب السبب · مكررة لو فعلية بس) وبعدين حوّل (نوع البيانات · كمي 0–1 أو قياسي متوسط 0 · محوري/ربط/تجميع). كل خطوة __قرار بيقوده الغرض__ مش قاعدة ثابتة.', en: '📌 **The point:** clean (missing by delete/impute/flag by share and meaning · outliers by cause · duplicates only if real), then transform (type conversion · normalization 0–1 or standardization mean 0 · pivot/join/aggregation). Every step is __a judgment set by the purpose__, not a fixed rule.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«التحويل الكمي يخلّي المتوسط 0 والانحراف 1» ← __غلط__ (ده القياسي؛ الكمي = 0 لـ 1). توحيد "2026/4/1" و"01 Apr 2026" = __تحويل نوع البيانات__. الإجمالي الشهري من اليومي = __تجميع__ · جدولين بمفتاح = __ربط__ · «صف × عمود» = __محوري__.', en: '"Normalization makes the mean 0 and SD 1" → __false__ (that is standardization; normalization = 0 to 1). Unifying "2026/4/1" and "01 Apr 2026" = __data type conversion__. Monthly totals from daily = __aggregation__ · two tables by a key = __join__ · "row × column" = __pivot__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — ليه الرقم الأكبر بيسيطر، وإزاي نصلّحه', en: 'Deep dive — why the bigger number dominates, and how to fix it' }, text: { ar: 'لو حلّلت الطول (سم) والوزن (كجم) مع بعض، أرقام الطول (160–180) أكبر عدديًا، فيبان «أهم» بس بسبب حجمها. التحويل الكمي: الأصغر = 0 والأكبر = 1 ← 160 ← 0، 170 ← 0.5، 180 ← 1. التوحيد القياسي: نطرح المتوسط ونقسم على الانحراف المعياري ← «كام انحراف بعيد عن المتوسط». أنهي؟ عايز نطاق ثابت 0–1 (زي الصور والشبكات العصبية) ← كمي. عايز المكان بالنسبة للتشتّت ← قياسي.', en: 'If you analyze height (cm) and weight (kg) together, height numbers (160–180) are larger, so height looks "more important" only because of its size. Normalization: min = 0 and max = 1 → 160 → 0, 170 → 0.5, 180 → 1. Standardization: subtract the mean and divide by the standard deviation → "how many SDs from the mean". Which? A fixed 0–1 range (e.g. images, neural networks) → normalization. Position relative to spread → standardization.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1) — احسبها', en: '✋ Check yourself (1) — work it out' },
          q: { widget: 'numeric', prompt: { ar: 'الأطوال من 150 لـ 190 سم. بالتحويل الكمي (Min‑Max)، قيمة طول 170 سم كام؟', en: 'Heights range from 150 to 190 cm. With normalization (Min‑Max), what is 170 cm?' },
            answer: 0.5, tolerance: 0.001, hint: { ar: '`(170 − 150) ÷ (190 − 150)`', en: '(170 − 150) ÷ (190 − 150)' },
            explain: { ar: '`20 ÷ 40 = 0.5`', en: '20 ÷ 40 = 0.5' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل مهمة بعملية إعادة التشكيل:', en: 'Match each task with the reshaping operation:' },
            left: [
              { ar: 'الإجمالي الشهري لكل منتج من المبيعات اليومية', en: 'Monthly total per product from daily sales' },
              { ar: 'صف لكل يوم وعمود لكل منتج', en: 'One row per day and a column per product' },
              { ar: 'سجل الطلبة + كشف الدرجات برقم الطالب', en: 'Student roster + grade sheet by student ID' },
            ],
            right: [{ ar: 'التحويل المحوري', en: 'Pivot' }, { ar: 'الربط', en: 'Join' }, { ar: 'التجميع', en: 'Aggregation' }],
            answer: [2, 0, 1],
            explain: { ar: 'مجاميع = تجميع · صف × عمود = محوري · مفتاح مشترك = ربط.', en: 'Totals = aggregation · row × column = pivot · shared key = join.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**تحويل النوع:** نص ← رقم · تاريخ موحّد · كتابة موحّدة.', en: '**Type conversion:** text → number · one date format · one notation.' },
            { ar: '**كمي (Min‑Max):** 0 لـ 1 للمقارنة · **قياسي:** متوسط 0 وانحراف 1 (المكان بالنسبة للتشتّت).', en: '**Normalization:** 0 to 1 for comparison · **standardization:** mean 0, SD 1 (position vs spread).' },
            { ar: '**محوري** (صف × عمود) · **ربط** (مفتاح مشترك) · **تجميع** (مجاميع/متوسطات) — والغرض بيقرّر.', en: '**Pivot** (row × column) · **join** (shared key) · **aggregation** (sums/means) — the purpose decides.' },
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
            { text: { ar: 'A) تنظيف البيانات عمل بيتعمل قبل جمع البيانات.', en: 'A) Data cleaning is work done before collecting the data.' }, answer: false },
            { text: { ar: 'B) استجابات القيم المفقودة تلاتة: الحذف والتعويض ووضع العلامة.', en: 'B) The responses to missing values are three: deletion, imputation and flagging.' }, answer: true },
            { text: { ar: 'C) كل القيم الشاذة سببها أخطاء إدخال أو قياس، فلازم تتمسح دايمًا.', en: 'C) All outliers come from entry or measurement errors, so they must always be deleted.' }, answer: false },
            { text: { ar: 'D) التوحيد القياسي بيحوّل البيانات لصيغة متوسطها 0 وانحرافها المعياري 1.', en: 'D) Standardization converts data to a form with mean 0 and standard deviation 1.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) بيتعمل __بعد__ الجمع ← **✗**.', en: 'A) It is done __after__ collection → **✗**.' },
            { ar: 'B) حذف · تعويض · علامة ← **✓**.', en: 'B) Delete · impute · flag → **✓**.' },
            { ar: 'C) فيه قيم شاذة __حقيقية__ ماينفعش تتمسح دايمًا ← **✗**.', en: 'C) Some outliers are __real__ and must not always be deleted → **✗**.' },
            { ar: 'D) تعريف التوحيد القياسي ← **✓**.', en: 'D) The definition of standardization → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمعالجة (A–C):', en: '(2) Match each description (a–c) with the processing (A–C):' },
            left: [
              { ar: 'a) تحويل البيانات لنطاق من 0 لـ 1', en: 'a) Converting data to a range from 0 to 1' },
              { ar: 'b) ربط مجموعات بيانات مختلفة بعنصر مشترك', en: 'b) Linking different datasets through a shared element' },
              { ar: 'c) حساب المجاميع والمتوسطات لكل مجموعة وتلخيصها', en: 'c) Computing totals and averages per group and summarizing' },
            ],
            right: [{ ar: 'A التجميع', en: 'A Aggregation' }, { ar: 'B الربط', en: 'B Join' }, { ar: 'C التحويل الكمي', en: 'C Normalization' }],
            answer: [2, 1, 0] },
          solution: [
            { ar: 'a: 0 لـ 1 = **التحويل الكمي** ← C.', en: 'a: 0 to 1 = **normalization** → C.' },
            { ar: 'b: عنصر مشترك = **الربط** ← B.', en: 'b: shared element = **join** → B.' },
            { ar: 'c: مجاميع ومتوسطات = **التجميع** ← A.', en: 'c: totals and averages = **aggregation** → A.' },
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
            { q: { ar: '1. المعالجة اللي بتملأ الأجزاء المفقودة بقيم زي المتوسط أو الوسيط؟', en: '1. The processing that fills missing parts with values such as the mean or median?' }, a: { ar: 'التعويض', en: 'Imputation' } },
            { q: { ar: '2. المعالجة اللي بتحوّل البيانات لنطاق من 0 لـ 1؟', en: '2. The processing that converts data to a 0-to-1 range?' }, a: { ar: 'التحويل الكمي (Min‑Max)', en: 'Normalization (Min‑Max)' } },
            { q: { ar: '3. المعالجة اللي بتحوّل البيانات لمتوسط 0 وانحراف معياري 1؟', en: '3. The processing that converts data to mean 0 and SD 1?' }, a: { ar: 'التوحيد القياسي', en: 'Standardization' } },
            { q: { ar: '4. العملية اللي بتربط أكتر من مجموعة بيانات بعنصر مشترك؟', en: '4. The operation linking several datasets through a shared element?' }, a: { ar: 'الربط (Join)', en: 'Join' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ استجابة مناسبة للقيم المفقودة؟', en: 'Which is __not__ an appropriate response to missing values?' },
            options: [
              { ar: 'A فقد قليل وأثره صغير ← نحذف الصفوف اللي فيها مفقود', en: 'A Few missing, small effect → delete the rows with gaps' },
              { ar: 'B فقد مبعثر عشوائيًا ← نملأ بقيم زي المتوسط', en: 'B Gaps scattered at random → fill with values like the mean' },
              { ar: 'C الغياب نفسه ليه معنى ← نسيب علامة ونحلّل', en: 'C The absence itself has meaning → leave a flag and analyze' },
              { ar: 'D نعوّض بالمتوسط عناصر أغلب بياناتها مفقودة', en: 'D Impute the mean for items whose data is mostly missing' },
            ],
            fixedOrder: true, answer: 3,
            explain: { ar: 'تعويض المتوسط لما أغلب البيانات مفقودة __بيطلّع قيم بعيدة عن الواقع__ (D).', en: 'Imputing a mean when most data is missing __produces unrealistic values__ (D).' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'classify', prompt: { ar: 'لكل موقف اختار المعالجة:', en: 'Choose the processing for each situation:' },
            groups: [{ icon: 'refresh', label: { ar: 'A تحويل نوع البيانات (التاريخ)', en: 'A Data type conversion (date)' } }, { icon: 'layers', label: { ar: 'B التحويل الكمي', en: 'B Normalization' } }],
            items: [
              { text: { ar: 'a) توحيد تواريخ زي "2026/4/1" و"01 Apr 2026"', en: 'a) Reconciling dates like "2026/4/1" and "01 Apr 2026"' }, group: 0 },
              { text: { ar: 'b) مقارنة الطول (سم) والوزن (كجم)', en: 'b) Comparing height (cm) and weight (kg)' }, group: 1 },
            ],
            explain: { ar: 'a ← A · b ← B.', en: 'a → A · b → B.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (3)', en: 'Try 2 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف التعامل مع القيم الشاذة:', en: 'Choose the best description of handling outliers:' },
            options: [
              { ar: 'A كلها أخطاء، امسحها أول ما تلاقيها في الجدول', en: 'A They are all errors; delete them as soon as you find them' },
              { ar: 'B حدّد السبب: خطأ ← صحّح/احذف · حقيقية ← احتفظ', en: 'B Find the cause: error → fix/delete · real → keep' },
              { ar: 'C مابتأثّرش على التحليل، فمش محتاجة أي معالجة', en: 'C They do not affect the analysis, so no treatment is needed' },
              { ar: 'D بتتحل دايمًا بإننا نبدّلها بالمتوسط الحسابي', en: 'D They are always solved by replacing them with the mean' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'السبب الأول دايمًا (B).', en: 'Always the cause first (B).' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(e):', en: 'Read and fill blanks (a)–(e):' },
            text: { ar: 'البيانات ممكن تحتاج {0} لاكتشاف مشاكلها والتعامل معاها، و{1} لتغيير الصيغ أو البنية بما يناسب التحليل. ومن طرق التعامل مع الفقد {2} جنب الحذف أو الاحتفاظ بمؤشر للفقد. ولو الخوارزمية حساسة للمقياس، ممكن نستخدم {3} لتحويل القيم لنطاق 0–1، أو {4} لتحويلها لعدد الانحرافات المعيارية عن المتوسط.', en: 'Using data directly can lead to wrong conclusions, so {0}, which treats the problems, and {1}, which arranges the format to fit the purpose, are needed. For missing values we choose from deletion, {2} and flagging. When units differ greatly the scale is unified through {3}, converting to 0–1, or {4}, converting to mean 0 and SD 1.' },
            bank: [{ ar: 'تنظيف البيانات', en: 'data cleaning' }, { ar: 'تحويل البيانات', en: 'data transformation' }, { ar: 'التعويض', en: 'imputation' }, { ar: 'التحويل الكمي', en: 'normalization' }, { ar: 'التوحيد القياسي', en: 'standardization' }, { ar: 'التجميع', en: 'aggregation' }],
            answer: [0, 1, 2, 3, 4],
            explain: { ar: '(a) تنظيف (b) تحويل (c) التعويض (d) الكمي (e) القياسي.', en: '(a) cleaning (b) transformation (c) imputation (d) normalization (e) standardization.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي بيقابل __تحويل نوع البيانات__:', en: 'Choose what corresponds to __data type conversion__:' },
            options: [
              { ar: 'A ملء المفقود بالمتوسط', en: 'A Filling missing values with the mean' },
              { ar: 'B توحيد "2026/4/1" و"01 Apr 2026" لـ "2026-04-01"', en: 'B Unifying "2026/4/1" and "01 Apr 2026" into "2026-04-01"' },
              { ar: 'C مواءمة مقياس الطول والوزن لـ 0–1 قبل المقارنة', en: 'C Reconciling height and weight scales to 0–1 for comparison' },
              { ar: 'D تجميع المبيعات اليومية في إجمالي شهري', en: 'D Aggregating daily sales into monthly totals' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'توحيد صيغة التاريخ = تحويل نوع (B).', en: 'Unifying the date format = type conversion (B).' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف التحويل الكمي والتوحيد القياسي:', en: 'Choose the best description of normalization and standardization:' },
            options: [
              { ar: 'A الكمي بيخلّي المتوسط 0 والانحراف المعياري 1', en: 'A Normalization makes the mean 0 and the SD 1' },
              { ar: 'B القياسي بيحوّل البيانات لنطاق من 0 لـ 1 بالضبط', en: 'B Standardization converts data to exactly a 0–1 range' },
              { ar: 'C الكمي بيوحّد بيانات بوحدات مختلفة عشان نقارنها', en: 'C Normalization unifies differently-scaled data to compare it' },
              { ar: 'D القياسي بيتستخدم عشان نكبّر مقياس المتغيرات', en: 'D Standardization is used to enlarge the variables’ scale' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'A وB معكوسين، وD غلط ← الصح C.', en: 'A and B are swapped, D is wrong → C is correct.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (3)', en: 'Exercise 3 (3)' },
          q: { widget: 'classify', prompt: { ar: 'كل معالجة: تحويل محوري ولا ربط ولا تجميع؟', en: 'Is each processing a pivot, a join or an aggregation?' },
            groups: [{ icon: 'layers', label: { ar: 'محوري', en: 'Pivot' } }, { icon: 'key', label: { ar: 'ربط', en: 'Join' } }, { icon: 'database', label: { ar: 'تجميع', en: 'Aggregation' } }],
            items: [
              { text: { ar: 'a) سجل الطلبة + كشف الدرجات برقم الطالب', en: 'a) Student register + mark sheet by student number' }, group: 1 },
              { text: { ar: 'b) الإجمالي الشهري من المبيعات اليومية', en: 'b) Monthly total from daily sales' }, group: 2 },
              { text: { ar: 'c) مبيعات يومية ← جدول «تاريخ × منتج»', en: 'c) Daily product sales → a "date × product" table' }, group: 0 },
            ],
            explain: { ar: 'a ربط · b تجميع · c محوري.', en: 'a join · b aggregation · c pivot.' } },
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
          { front: { ar: 'تنظيف البيانات', en: 'Data cleaning' }, back: { ar: 'إصلاح القيم المفقودة والشاذة والمكررة.', en: 'Fixing missing values, outliers and duplicates.' } },
          { front: { ar: 'تحويل البيانات', en: 'Data transformation' }, back: { ar: 'تغيير النوع/المقياس/الشكل على قد الغرض.', en: 'Changing type/scale/shape to fit the purpose.' } },
          { front: { ar: 'القيمة المفقودة', en: 'Missing value' }, back: { ar: 'قيمة غايبة ← حذف أو تعويض أو علامة.', en: 'An absent value → delete, impute or flag.' } },
          { front: { ar: 'القيمة الشاذة', en: 'Outlier' }, back: { ar: 'قيمة بعيدة عن الباقي — ممكن تكون حقيقية.', en: 'A value far from the rest — may be real.' } },
          { front: { ar: 'القيمة غير الطبيعية', en: 'Abnormal value' }, back: { ar: 'قيمة شاذة سببها خطأ إدخال أو قياس.', en: 'An outlier caused by an entry or measurement error.' } },
          { front: { ar: 'التحويل الكمي (Min‑Max)', en: 'Normalization (Min‑Max)' }, back: { ar: '(القيمة − الأصغر) ÷ (الأكبر − الأصغر) ← 0 لـ 1.', en: '(value − min) ÷ (max − min) → 0 to 1.' } },
          { front: { ar: 'التوحيد القياسي', en: 'Standardization' }, back: { ar: '(القيمة − المتوسط) ÷ الانحراف ← متوسط 0 وانحراف 1.', en: '(value − mean) ÷ SD → mean 0, SD 1.' } },
          { front: { ar: 'محوري · ربط · تجميع', en: 'Pivot · join · aggregation' }, back: { ar: 'صف × عمود · مفتاح مشترك · مجاميع لكل مجموعة.', en: 'Row × column · shared key · totals per group.' } },
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
            prompt: { ar: 'اشرح، باستخدام «مدخلات خاطئة — مخرجات خاطئة»، ليه تحضير البيانات مهم زي التحليل نفسه. (أشِر إلى: إصلاح تنظيف واحد وتحويل واحد)', en: 'Explain, using "garbage in, garbage out", why data preparation matters as much as the analysis. (Refer to one cleaning fix and one transformation)' },
            points: [
              { ar: 'الحساب الدقيق على بيانات معيوبة = نتيجة معيوبة.', en: 'Precise calculation on flawed data = a flawed result.' },
              { ar: 'تنظيف: مثلًا قيمة شاذة غلط بتشدّ المتوسط.', en: 'Cleaning: e.g. an erroneous outlier pulls the mean.' },
              { ar: 'تحويل: مثلًا تواريخ/مقاييس مش موحّدة.', en: 'Transformation: e.g. un-unified dates/scales.' },
            ],
            model: { ar: '«مدخلات خاطئة — مخرجات خاطئة» معناها إن أي تحليل مهما كان دقيق هيطلّع نتيجة غلط لو البيانات اللي داخلة فيه معيوبة. مثال تنظيف: لو طالب كتب «9999» ساعة غلط وسبناها، هتشدّ المتوسط لفوق جدًا والنتيجة تبقى مضلّلة — فلازم نحدّد سببها ونصحّحها. مثال تحويل: لو التواريخ بصيغ مختلفة، نفس اليوم هيتحسب كأيام مختلفة والتجميع اليومي يبوظ، فلازم نوحّد الصيغة. عشان كده التحضير مش خطوة جانبية — هو اللي بيحدّد إذا كان التحليل هيقول الحقيقة ولا لأ.', en: '"Garbage in, garbage out" means that however precise an analysis is, it gives a wrong result if the data feeding it is flawed. A cleaning example: if a student mistakenly entered "9999" hours and we leave it, it drags the mean far up and misleads — so we must find its cause and correct it. A transformation example: if dates are in different formats, the same day is counted as several days and daily totals break, so we unify the format. So preparation is not a side step — it decides whether the analysis tells the truth.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — جدول وقت الشاشة', en: 'Think as an engineer — the screen-time table' },
            prompt: { ar: 'فصلك جمع استبيان عن وقت الشاشة، والجدول فيه خلايا فاضية، و«9999» ساعة، وتواريخ بتلات صيغ، وصفين متطابقين. ١) اذكر كل مشكلة وصنّفها وقول هتبوّظ التحليل إزاي. ٢) قرّر الإصلاح لكل واحدة وخطره (مين ممكن إجابته الحقيقية تتمسح بالغلط؟). ٣) خطّط التحويل.', en: 'Your class surveyed screen time; the table has empty cells, "9999" hours, dates in three formats and two identical rows. 1) List and classify each problem and how it would distort the analysis. 2) Decide each fix and its risk (whose real answer might be erased?). 3) Plan the transformation.' },
            points: [
              { ar: 'فاضية = مفقودة · 9999 = شاذة · صفين = مكرر · تواريخ = صيغة.', en: 'Empty = missing · 9999 = outlier · two rows = duplicate · dates = format.' },
              { ar: 'نفحص سبب 9999 (غلطة/وحدة/رمز رفض) قبل الحذف.', en: 'Check 9999’s cause (typo/unit/refusal code) before deleting.' },
              { ar: 'نوحّد التاريخ الأول، والمكرر نشيله لو فعلي بس.', en: 'Unify dates first; remove the duplicate only if real.' },
            ],
            model: { ar: '١) الخلايا الفاضية = قيم مفقودة (ممكن توقّف الحساب أو تحيّز المتوسط)، «9999» = قيمة شاذة (هتشدّ المتوسط)، الصفين = مكرر (طالب هيتحسب مرتين)، التواريخ = مشكلة صيغة (اليوم الواحد يتقسم). ٢) لو الفراغات قليلة ومبعثرة أعوّض بالوسيط؛ لو كتير أحط علامة. «9999» أشوف سببها: غلطة كتابة لـ 9؟ ولا وحدة دقايق؟ ولا رمز «رفض يجاوب»؟ قبل ما أمسحها. والصفين أتأكّد إنهم نفس الطالب بعت مرتين مش طالبين بنفس الإجابة — اللي ممكن إجابته الحقيقية تتمسح هو طالب فعلًا بيقضي وقت كبير جدًا. ٣) أوحّد صيغة التاريخ لـ YYYY-MM-DD، وأحوّل الأرقام المكتوبة كنص لأرقام، والتحويل الكمي مش ضروري لو بحلّل عمود واحد بس.', en: '1) Empty cells = missing values (may stop calculations or bias the mean); "9999" = an outlier (drags the mean); two rows = a duplicate (one student counted twice); dates = a format problem (one day split). 2) If gaps are few and scattered I impute the median; if many, I flag them. For "9999" I check the cause — a typo for 9? minutes instead of hours? a "refused" code? — before deleting. For the two rows I confirm it is the same student submitting twice, not two students with the same answer — the respondent at risk is someone who really does spend a very long time. 3) Unify dates to YYYY-MM-DD, convert text numbers to numbers; normalization is unnecessary if I analyze one column only.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'جدول مبيعات متجر فيه مبيعات كل يوم للمنتجات A وB وC في صفوف منفصلة، والمدير عايز صف واحد لكل يوم وعمود لكل منتج. سمِّ العملية، وبعدين سمِّ العملية اللي تطلّع الإجمالي الشهري لكل منتج.', en: 'A shop’s sales table lists each day’s sales of products A, B and C in separate rows; the manager wants one row per day and a column per product. Name the operation, then the operation for each product’s monthly total.' },
            points: [{ ar: 'صف لكل يوم × عمود لكل منتج = تحويل محوري.', en: 'Row per day × column per product = pivot.' }, { ar: 'الإجمالي الشهري = تجميع.', en: 'Monthly total = aggregation.' }],
            model: { ar: 'تحويل البيانات الرأسية (يوم، منتج، مبيعات) لجدول «يوم × منتج» = __تحويل محوري (Pivot)__. وعشان نطلّع الإجمالي الشهري لكل منتج نعمل __تجميع (Aggregation)__: نجمع مبيعات كل الأيام في كل شهر لكل منتج.', en: 'Turning vertical data (day, product, sales) into a "day × product" table = a __pivot__. To get each product’s monthly total we use __aggregation__: sum every day’s sales per month for each product.' } },
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
            prompt: { ar: 'ليه «ملء» البيانات المفقودة ممكن يضلّل أكتر من إنك تسيبها؟', en: 'Why can "filling in" missing data mislead more than leaving it out?' },
            points: [{ ar: 'القيم المملوءة بتبان حقيقية وهي تخمين.', en: 'Filled values look real but are guesses.' }, { ar: 'ممكن تخفي إن الغياب ليه معنى أو تغيّر الاتجاه.', en: 'They may hide a meaningful absence or shift the trend.' }],
            model: { ar: 'لأن القيمة المملوءة __بتبان كأنها بيانات حقيقية__ وهي في الحقيقة تخمين. لو الفقد كتير أو ليه سبب (ناس رفضت تجاوب)، المتوسط المملوء ممكن __يغيّر الاتجاه__ ويخفي معلومة مهمة، وبعدين محدش يعرف إنها كانت مفقودة أصلًا. أما لو سبناها بعلامة، اللي بيقرا عارف فين النقص.', en: 'Because a filled value __looks like real data__ when it is really a guess. If much is missing or the absence has a reason (people refused), a filled mean can __shift the trend__ and hide important information — and later nobody knows it was missing. Leaving it flagged tells the reader where the gaps are.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تحدّى', en: 'Challenge' },
            prompt: { ar: 'عندك عمود استبيان 70% من إجاباته فاضية. ناقش: تعوّض ولا تحط علامة ولا تشيل العمود؟ واذكر الشرط الوحيد اللي يغيّر اختيارك.', en: 'A survey column is 70% blank. Argue: impute, flag or drop the column? State the one condition that would change your choice.' },
            points: [{ ar: 'التعويض بالمتوسط هنا = قيم بعيدة عن الواقع.', en: 'Imputing a mean here = unrealistic values.' }, { ar: 'غالبًا علامة أو شيل العمود.', en: 'Likely flag it or drop the column.' }, { ar: 'الشرط: لو الغياب ليه معنى ← علامة.', en: 'Condition: if the absence has meaning → flag.' }],
            model: { ar: 'مش هعوّض، لأن تعويض المتوسط لعمود أغلبه فاضي بيطلّع قيم بعيدة عن الواقع. هشيل العمود من التحليل الرئيسي لأن الـ30% الباقيين ممكن مايمثّلوش الكل. الشرط اللي يغيّر اختياري: لو الفراغ نفسه __ليه معنى__ (مثلًا السؤال حسّاس والناس رفضت تجاوب)، ساعتها هحط __علامة__ وأحلّل مين اللي ماجاوبش، لأن ده في حد ذاته معلومة.', en: 'I would not impute, because a mean filled into a mostly blank column produces unrealistic values. I would drop the column from the main analysis, since the remaining 30% may not represent everyone. The condition that changes my choice: if the blank itself __has meaning__ (e.g. a sensitive question people refused), I would __flag__ it and analyze who did not answer, because that is information in itself.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '5-2', seconds: 60, items: [
          { text: { ar: 'مدخلات خاطئة — مخرجات خاطئة', en: 'Garbage in → garbage out' }, answer: true },
          { text: { ar: 'التنظيف بيتعمل قبل الجمع', en: 'Cleaning happens before collection' }, answer: false },
          { text: { ar: 'التعويض = نملأ بالمتوسط أو الوسيط', en: 'Imputation = fill with mean or median' }, answer: true },
          { text: { ar: 'العلامة لما الغياب ليه معنى', en: 'Flag when the absence has meaning' }, answer: true },
          { text: { ar: 'كل قيمة شاذة غلط', en: 'Every outlier is an error' }, answer: false },
          { text: { ar: 'غير الطبيعية = شاذة بسبب خطأ', en: 'Abnormal = an outlier caused by error' }, answer: true },
          { text: { ar: 'المكرر يتشال من غير ما نتأكّد', en: 'Remove duplicates without checking' }, answer: false },
          { text: { ar: 'رقم متخزّن كنص ممكن يفشّل الحساب', en: 'A number stored as text cannot be summed' }, answer: true },
          { text: { ar: 'الكمي = 0 لـ 1', en: 'Normalization = 0 to 1' }, answer: true },
          { text: { ar: 'الكمي = متوسط 0 وانحراف 1', en: 'Normalization = mean 0, SD 1' }, answer: false },
          { text: { ar: 'القياسي = متوسط 0 وانحراف 1', en: 'Standardization = mean 0, SD 1' }, answer: true },
          { text: { ar: 'الربط بعنصر مشترك', en: 'A join uses a shared item' }, answer: true },
          { text: { ar: 'الإجمالي الشهري = تحويل محوري', en: 'Monthly totals = a pivot' }, answer: false },
          { text: { ar: 'صف × عمود = تحويل محوري', en: 'Row × column = a pivot' }, answer: true },
          { text: { ar: 'فيه وصفة إصلاح واحدة لكل البيانات', en: 'One fix sequence fits all data' }, answer: false },
          { text: { ar: 'الغرض بيقرّر طريقة التشكيل', en: 'The purpose decides the reshaping' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 5-2', en: 'Lesson 5-2 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. ملء القيم المفقودة بالمتوسط أو الوسيط — أنهي استجابة؟', en: '1. Filling missing values with the mean/median — which response?' }, options: [{ ar: 'الحذف', en: 'Deletion' }, { ar: 'التعويض', en: 'Imputation' }, { ar: 'وضع علامة', en: 'Flagging' }, { ar: 'التجميع', en: 'Aggregation' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. تحويل البيانات لمتوسط 0 وانحراف معياري 1 — أنهي معالجة؟', en: '2. Converting to mean 0, SD 1 — which processing?' }, options: [{ ar: 'التحويل الكمي', en: 'Normalization' }, { ar: 'التوحيد القياسي', en: 'Standardization' }, { ar: 'التحويل المحوري', en: 'Pivoting' }, { ar: 'الربط', en: 'Join' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. ربط سجل الطلبة وكشف الدرجات بـ«رقم الطالب» في جدول واحد — أنهي عملية؟', en: '3. Linking the roster and grades by student ID — which operation?' }, options: [{ ar: 'التحويل المحوري', en: 'Pivoting' }, { ar: 'الربط', en: 'Join' }, { ar: 'التجميع', en: 'Aggregation' }, { ar: 'التعويض', en: 'Imputation' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. كل القيم الشاذة أخطاء ولازم تتمسح فورًا.', en: '4. All outliers are errors and must be deleted at once.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. البيانات المكررة بتتشال بس بعد التأكد إنها تكرار فعلي.', en: '5. Duplicates are removed only after confirming they truly duplicate.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. لو الأرقام متخزّنة كنصوص، بعض الحسابات ممكن تفشل.', en: '6. Numbers stored as strings cannot be summed or averaged.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. اذكر استجابات القيم المفقودة التلاتة وإمتى تناسب كل واحدة.', en: '7. Name the three responses to missing values and when each fits.' },
          points: [{ ar: 'الحذف: فقد قليل ومبعثر.', en: 'Deletion: few, scattered gaps.' }, { ar: 'التعويض: بعد فهم سبب الفقد وفحص الأثر.', en: 'Imputation: scattered; the substitute keeps the trend.' }, { ar: 'العلامة: الغياب ليه معنى.', en: 'Flagging: the absence has meaning.' }],
          model: { ar: 'الحذف: نشيل السجل أو المتغير، لما الفقد قليل ومايسببش تحيّز أو خسارة مهمة. التعويض: نقدّر قيمة بديلة زي الوسيط، بعد فهم سبب الفقد ونمطه وفحص أثر التعويض. وضع العلامة: نسيب مؤشر إن القيمة كانت مفقودة ونحلّل زي ما هي، لما الغياب نفسه ليه معنى زي إن حد رفض يجاوب.', en: 'Deletion: remove rows or columns with missing values, when they are few, low-impact and scattered without bias. Imputation: fill with the mean, median or neighboring values, when gaps are scattered and replacing them barely changes the overall trend. Flagging: leave a marker that the value was missing and analyze as is, when the absence itself has meaning, e.g. someone refused to answer.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. إيه الفرق بين القيمة الشاذة والقيمة غير الطبيعية؟ ومعالجة الشاذة بتبدأ إزاي؟', en: '8. What is the difference between an outlier and an abnormal value? How does handling an outlier start?' },
          points: [{ ar: 'الشاذة: بعيدة عن الباقي (ممكن حقيقية).', en: 'Outlier: far from the rest (may be real).' }, { ar: 'غير الطبيعية: شاذة بسبب خطأ.', en: 'Abnormal: an outlier caused by error.' }, { ar: 'نبدأ بتحديد السبب.', en: 'Start by identifying the cause.' }],
          model: { ar: 'القيمة الشاذة قيمة بعيدة جدًا عن باقي القيم، وممكن تكون حقيقية نادرة (زي يوم مبيعات عالي بسبب عرض). القيمة غير الطبيعية هي قيمة شاذة سببها خطأ إدخال أو قياس. المعالجة بتبدأ بتحديد السبب: لو خطأ نصحّح أو نحذف، ولو بتعكس الواقع نحتفظ بيها مبدئيًا ونقرّر حسب الغرض.', en: 'An outlier is a value far from the others and may be a genuinely rare real value (such as a high sales day from a promotion). An abnormal value is an outlier caused by an entry or measurement error. Handling starts by identifying the cause: if it is an error we correct or delete it; if it reflects reality we keep it in principle and decide by purpose.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اشرح بمثال رقمي إزاي التحويل الكمي (Min‑Max) بيحوّل طول من 160–180 سم لـ 0–1.', en: '9. Explain with numbers how normalization (Min‑Max) maps heights of 160–180 cm to 0–1.' },
          points: [{ ar: 'القاعدة: (القيمة − الأصغر) ÷ (الأكبر − الأصغر).', en: 'Rule: (value − min) ÷ (max − min).' }, { ar: '160 ← 0 · 170 ← 0.5 · 180 ← 1.', en: '160 → 0 · 170 → 0.5 · 180 → 1.' }],
          model: { ar: 'القاعدة: (القيمة − الأصغر) ÷ (الأكبر − الأصغر)، والأصغر 160 والأكبر 180 فالمقام = 20. الطول 160: (160−160)÷20 = 0. الطول 170: (170−160)÷20 = 0.5. الطول 180: (180−160)÷20 = 1. فكل الأطوال بقت بين 0 و1 ونقدر نقارنها بمتغير تاني زي الوزن.', en: 'Rule: (value − min) ÷ (max − min); min 160, max 180, so the denominator is 20. Height 160: (160−160)÷20 = 0. Height 170: (170−160)÷20 = 0.5. Height 180: (180−160)÷20 = 1. All heights now lie between 0 and 1 and can be compared with another variable such as weight.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. عرّف التحويل المحوري والربط والتجميع بمثال لكل واحد.', en: '10. Define pivot, join and aggregation with an example of each.' },
          points: [{ ar: 'محوري: رأسي ← صف × عمود.', en: 'Pivot: vertical → row × column.' }, { ar: 'ربط: بعنصر مشترك.', en: 'Join: by a shared item.' }, { ar: 'تجميع: مجاميع/متوسطات لكل مجموعة.', en: 'Aggregation: sums/means per group.' }],
          model: { ar: 'التحويل المحوري: تحويل البيانات المترتّبة رأسي لجدول صف × عمود، زي (تاريخ، منتج، مبيعات) ← جدول «تاريخ × منتج». الربط: توصيل أكتر من مجموعة بيانات بعنصر مشترك، زي سجل الطلبة وكشف الدرجات بـ«رقم الطالب». التجميع: حساب المجاميع والمتوسطات لكل مجموعة وتلخيصها، زي الإجمالي الشهري من المبيعات اليومية.', en: 'Pivot: reshaping vertically arranged data into a row × column table, e.g. (date, product, sales) → a "date × product" table. Join: connecting several datasets through a common item, e.g. the student roster and grade sheet by "student ID". Aggregation: computing and summarizing sums and means per group, e.g. monthly totals from daily sales.' } } },
      ],
    },
  ],
});
