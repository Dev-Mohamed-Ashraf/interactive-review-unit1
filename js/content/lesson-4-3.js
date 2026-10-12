/* =========================================================
 * content/lesson-4-3.js — أساليب تقييم المواقع الإلكترونية
 * Pure data. Sources: textbook 4-3 (EN p.88–94) + memo (Arabic wording,
 * deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('4-3', {
  id: '4-3',
  color: '#8b5cf6',
  cover: 'img/md-l3-cover.webp',
  title: { ar: 'أساليب تقييم المواقع الإلكترونية', en: 'Methods for Evaluating Websites' },
  guiding: { ar: 'إزاي بنقيّم الموقع، وليه بيفيد نجمع بين الأرقام وأصوات المستخدمين؟', en: 'How can a website be evaluated, and why is it useful to combine numbers with users’ voices?' },
  hook: {
    ar: 'إزاي تعرف إن الموقع شغّال كويس لمستخدميه؟ ممكن __تتفرّج على مستخدمين حقيقيين__ وهم بيجرّبوه وتسألهم إيه اللي لخبطهم — ده **تقييم نوعي**. أو __تعدّ__ كام واحد زار، وقعدوا قد إيه، وكام واحد اشترى — ده **تقييم كمّي**. الأرقام بتقول لك __«قد إيه»__ بيحصل؛ وأصوات المستخدمين بتقول لك __«ليه»__. والفرق الشاطرة بتستخدم الاتنين.',
    en: 'How do you know a website works well for its users? You can __watch real users__ try it and ask what confused them — **qualitative evaluation**. Or you can __count__ how many visit, how long they stay and how many buy — **quantitative evaluation**. Numbers tell you __how much__ is happening; users’ voices tell you __why__. The best teams use both.',
  },
  keyFact: { ar: 'المواقع بتتقيّم __نوعيًا__ (ليه — اختبارات الاستخدام، المقابلات، الفحص الإرشادي) و__كميًا__ (قد إيه — تحليلات الويب: PV، معدل الارتداد، CVR)؛ و__الجمع بينهم__ بيدّي أوضح صورة.', en: 'Websites are evaluated __qualitatively__ (why — usability tests, interviews, heuristic checks) and __quantitatively__ (how much — web analytics: PV, bounce rate, CVR); __combining both__ gives the clearest picture.' },
  concepts: ['qualitative evaluation', 'quantitative evaluation', 'usability testing', 'interviews', 'web analytics', 'A/B testing', 'PV', 'bounce rate', 'CVR', 'heuristic evaluation'],
  objectives: [
    { ar: 'أفرّق بين التقييم النوعي والكمّي، وأشرح المؤشرات الأساسية في تحليلات الويب.', en: 'Distinguish qualitative from quantitative evaluation, and explain the main web-analytics indicators.' },
    { ar: 'أشرح إزاي التقييم الإرشادي بيشتغل، وليه الجمع بين الطريقتين بيدّي صورة أوضح للموقع.', en: 'Explain how heuristic evaluation works, and why combining both approaches gives a clearer picture.' },
  ],

  stations: [
    /* ───────────── 1 · qualitative vs quantitative ───────────── */
    {
      id: 'kinds', kind: 'learn',
      title: { ar: 'التقييم النوعي والكمّي', en: 'Qualitative and quantitative evaluation' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'موقع زوّاره كتير بس قليلين اللي بيشتروا… تعرف السبب إزاي؟', en: 'A site has many visitors but few buyers… how do you find out why?' },
            options: [
              { emoji: '🔢', text: { ar: 'أعدّ الزيارات تاني', en: 'Count the visits again' } },
              { emoji: '👀', text: { ar: 'أتفرّج على ناس بتشتري وأسألهم', en: 'Watch people try to buy and ask them' } },
              { emoji: '🎨', text: { ar: 'أغيّر الألوان على طول', en: 'Change the colors right away' } },
            ],
            after: { ar: 'تعالى نشوف نوعين التقييم 👇', en: 'Let’s see the two kinds of evaluation 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: «ليه؟» و«قد إيه؟»', en: '🎞️ Animation: "why?" and "how much?"' },
          enTitle: 'Qualitative and quantitative evaluation',
          terms: ['qualitative evaluation', 'quantitative evaluation', 'usability testing', 'interviews', 'web analytics', 'A/B testing'],
          visual: { anim: 'evalMovie', props: { scenes: [0, 3] } },
          beats: [
            { ar: 'طرق التقييم نوعين أساسيين: **التقييم النوعي** (نتفرّج على المستخدمين ونسمعهم) و**التقييم الكمّي** (نعدّ ونقيس بالأرقام) — ونفس الفكرة بتنفع لتقييم المواقع.', en: 'Evaluation falls into two main kinds: **qualitative evaluation** (watch and listen to users) and **quantitative evaluation** (count and measure with numbers) — and the same idea applies to websites.' },
            { ar: '🔍 **التقييم النوعي:** بيستكشف __«أسباب»__ نفسية المستخدمين وسلوكهم بعمق، وبيقيّم جوانب __ماتتقاسش بالأرقام__. تقنياته: **اختبار الاستخدام** (نراقب استخدامهم الفعلي ونلاقي الحاجات الصعبة) و**المقابلات** (نسمع أصواتهم مباشرة ونفهم احتياجاتهم وضيقهم).', en: '🔍 **Qualitative evaluation:** explores the __reasons__ behind users’ psychology and behavior in depth, evaluating aspects that __cannot be expressed in numbers__. Techniques: **usability testing** (observe real use to find hard points) and **interviews** (hear users directly to understand needs and dissatisfaction).' },
            { ar: '📊 **التقييم الكمّي:** بيستخدم __بيانات عددية__ (عدد الزيارات، الوقت…) ويقيّم الوضع __بموضوعية وإحصائيًا__. تقنياته: **تحليلات الويب** (مقاييس زي PV والوقت) و**اختبار A/B** (نقارن خيارين ونشوف أنهي نتيجته أحسن).', en: '📊 **Quantitative evaluation:** uses __numerical data__ (visit counts, time…) to evaluate the current state __objectively and statistically__. Techniques: **web analytics** (measures such as PV and time) and **A/B testing** (compare two options to see which works better).' },
            { ar: '🤝 النوعي مناسب لسبب «__ليه صعب الاستخدام__»، والكمّي مناسب لاتجاه «__قد إيه بيتستخدم__». الأرقام بتقول لك __فين__ تبص… والأصوات بتقول لك __ليه__ — و__الجمع بينهم__ بيدّي تقييم أدق.', en: '🤝 Qualitative suits the cause of "__why is it hard to use__"; quantitative suits the trend of "__how much is it used__". Numbers tell you __where__ to look… voices tell you __why__ — and __combining both__ gives a more accurate evaluation.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل طريقة نوعي ولا كمّي؟', en: 'Is each method qualitative or quantitative?' },
            groups: [{ icon: 'eye', label: { ar: 'نوعي (ليه)', en: 'Qualitative (why)' } }, { icon: 'target', label: { ar: 'كمّي (قد إيه)', en: 'Quantitative (how much)' } }],
            items: [
              { text: { ar: 'اختبار الاستخدام', en: 'Usability testing' }, group: 0 },
              { text: { ar: 'تحليلات الويب', en: 'Web analytics' }, group: 1 },
              { text: { ar: 'المقابلات', en: 'Interviews' }, group: 0 },
              { text: { ar: 'اختبار A/B', en: 'A/B testing' }, group: 1 },
              { text: { ar: 'التقييم الإرشادي', en: 'Heuristic evaluation' }, group: 0 },
            ],
            explain: { ar: 'نوعي: اختبار الاستخدام والمقابلات والإرشادي · كمّي: تحليلات الويب و A/B.', en: 'Qualitative: usability tests, interviews, heuristic · quantitative: web analytics and A/B.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'التقييم النوعي بيستخدم بيانات عددية.', en: 'Qualitative evaluation uses numerical data.' }, answer: false, explain: { ar: 'ده __الكمّي__؛ النوعي بيراقب الأصوات والسلوك.', en: 'That is __quantitative__; qualitative watches voices and behavior.' } },
            { text: { ar: 'عدّ الزيارات لوحده بيقول ليه الناس بتمشي.', en: 'Counting visits alone tells why people leave.' }, answer: false, explain: { ar: 'الأرقام بتقول «قد إيه» مش «ليه».', en: 'Numbers say "how much", not "why".' } },
            { text: { ar: 'الجمع بين النوعي والكمّي بيدّي تقييم أدق.', en: 'Combining both gives a more accurate evaluation.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**النوعي = ليه:** اختبار الاستخدام (نراقب) + المقابلات (نسمع).', en: '**Qualitative = why:** usability testing (observe) + interviews (listen).' },
            { ar: '**الكمّي = قد إيه:** تحليلات الويب (PV، الوقت) + اختبار A/B.', en: '**Quantitative = how much:** web analytics (PV, time) + A/B testing.' },
            { ar: '**الأرقام بتقول فين… والأصوات بتقول ليه** ← نجمع الاتنين.', en: '**Numbers say where… voices say why** → combine both.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · analytics indicators + heuristic evaluation ───────────── */
    {
      id: 'metrics', kind: 'learn',
      title: { ar: 'مؤشرات تحليلات الويب والتقييم الإرشادي', en: 'Web-analytics indicators and heuristic evaluation' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: PV والارتداد والتحويل… والخبير', en: '🎞️ Animation: PV, bounce, conversion… and the expert' },
          enTitle: 'Indicators and heuristic evaluation',
          terms: ['web analytics', 'PV', 'bounce rate', 'conversion rate (CVR)', 'heuristic evaluation'],
          visual: { anim: 'evalMovie', props: { scenes: [4, 9] } },
          beats: [
            { ar: '**تحليلات الويب:** تقنية بتحلّل __إزاي الموقع بيتزار بقيم عددية__ — وهي __الطريقة المركزية للتقييم الكمّي__. أول مؤشر: **PV (مشاهدات الصفحة)** = __إجمالي عدد مرات مشاهدة الصفحة__ — مؤشر أساسي لقد إيه الموقع منتشر وظاهر.', en: '**Web analytics:** analyzing __how a site is accessed using numbers__ — the __central method of quantitative evaluation__. First indicator: **PV (page views)** = __the total number of times a page was viewed__ — a basic measure of how widely the site is seen.' },
            { ar: '**معدل الارتداد (Bounce rate):** __نسبة الزيارات اللي خلصت بعد مشاهدة الصفحة الأولى بس__ — بيقول هل محتوى الصفحة كان على قد __توقّع المستخدم__ وشجّعه يكمّل ولا لأ.', en: '**Bounce rate:** __the share of visits that ended after viewing only the first page__ — it shows whether the page met __the user’s expectations__ and prompted further action.' },
            { ar: '**معدل التحويل (CVR):** __نسبة الزيارات اللي حقّقت إجراء مستهدف__ (شراء، تسجيل…) — مؤشر __مهم جدًا__ بيقيس قد إيه الموقع بيساهم في __نتايج الشغل (الأرباح)__. ⚠️ فخ: «الارتداد = نسبة تحقيق الهدف» ← __غلط__ (ده CVR).', en: '**Conversion rate (CVR):** __the share of visits that achieved a target action__ (purchase, registration…) — a __very important__ measure of how much the site contributes to __business results (profit)__. ⚠️ Trap: "bounce rate = goal-achievement rate" → __false__ (that is CVR).' },
            { ar: '🧑‍💼 **التقييم الإرشادي:** __خبراء__ بيحدّدوا مشاكل __واجهة المستخدم (UI)__ على أساس __قواعد عملية (heuristics)__ — وهو __شكل من التقييم النوعي__، بيستخدم مع اختبار الاستخدام. منظوراته: **الاتساق** (التصميم والعمليات موحّدة) · **منع الأخطاء** (التصميم يصعّب الغلط) · **وضوح حالة النظام** (زي مؤشر جاري التحميل ورسايل خطأ الإدخال).', en: '🧑‍💼 **Heuristic evaluation:** __experts__ identify __UI__ problems based on __rules of thumb (heuristics)__ — a __form of qualitative evaluation__, used with usability testing. Perspectives: **consistency** (unified design and operation) · **error prevention** (hard to make mistakes) · **visibility of system status** (e.g. loading indicators, input error messages).' },
            { ar: '🛒 **مثال:** متجر PV __عالي__ بس CVR __واطي__ ← الناس بتيجي ومابتشتريش. الأرقام كشفت __فين__ المشكلة (بين الدخول والشراء)… بس مش __ليه__. اختبار استخدام قصير بيكشف السبب: زرار «الدفع» __مستخبي__!', en: '🛒 **Example:** a shop with __high__ PV but __low__ CVR → people arrive but do not buy. The numbers revealed __where__ the problem is (between arriving and buying)… but not __why__. A short usability test reveals the cause: the "Pay" button is __hidden__!' },
            { ar: '📌 **الخلاصة:** الكمّي (PV · الارتداد · CVR) بيقول __قد إيه__ · النوعي (اختبار الاستخدام · المقابلات · الإرشادي) بيقول __ليه__ — اجمع الاتنين عشان تقيّم الموقع بوضوح.', en: '📌 **The point:** quantitative (PV · bounce · CVR) shows __how much__ · qualitative (usability tests · interviews · heuristic checks) shows __why__ — combine both to evaluate a site clearly.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'PV = __كام مشاهدة__ · الارتداد = __نسبة اللي مشيوا بعد صفحة واحدة__ · CVR = __نسبة اللي حقّقوا الهدف__. والإرشادي = __خبراء + قواعد عملية__ (نوعي).', en: 'PV = __how many views__ · bounce = __share who left after one page__ · CVR = __share who reached the goal__. Heuristic = __experts + rules of thumb__ (qualitative).' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — الأرقام بتقول «فين»، والأصوات بتقول «ليه»', en: 'Deep dive — numbers say "where", voices say "why"' }, text: { ar: 'اختبار A/B بيحسم __تغيير واحد__ بالأرقام (زرار أحمر ولا أزرق)، بس مابيقولكش إيه اللي محتاج يتغيّر أصلًا — عشان كده بيجي __بعد__ ما الأصوات تكشف المشكلة. الخلاصة: الكمّي بيوجّهك __فين تبص__، والنوعي بيقول لك __تصلّح إيه__.', en: 'An A/B test settles __one change__ with numbers (red or blue button), but it does not tell you what needs changing in the first place — so it comes __after__ users’ voices reveal the problem. In short: quantitative points you __where to look__; qualitative tells you __what to fix__.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل مؤشر بمعناه:', en: 'Match each indicator with its meaning:' },
            left: [{ ar: 'معدل التحويل (CVR)', en: 'Conversion rate (CVR)' }, { ar: 'مشاهدات الصفحة (PV)', en: 'Page views (PV)' }, { ar: 'معدل الارتداد', en: 'Bounce rate' }],
            right: [{ ar: 'إجمالي مرات مشاهدة الصفحة', en: 'Total times a page was viewed' }, { ar: 'نسبة الزيارات اللي خلصت بعد الصفحة الأولى', en: 'Share of visits ending after the first page' }, { ar: 'نسبة الزيارات اللي حقّقت هدف', en: 'Share of visits reaching a target action' }],
            answer: [2, 0, 1],
            explain: { ar: 'CVR هدف · PV مشاهدات · الارتداد خروج بعد صفحة.', en: 'CVR goal · PV views · bounce left after one page.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'موقع مدرسة جديد زوّاره كتير بس أغلبهم بيمشوا بعد الصفحة الأولى. أنهي مؤشر بيكشف المشكلة، وتعرف السبب إزاي؟', en: 'A new school site gets many visits, but most leave after the first page. Which indicator shows it, and how do you find the cause?' },
            options: [
              { ar: 'معدل الارتداد العالي… واختبار استخدام أو مقابلة للسبب', en: 'A high bounce rate… and a usability test or interview for the cause' },
              { ar: 'PV العالي لوحده… ومفيش داعي لأي اختبار تاني', en: 'The high PV alone… and no further test is needed' },
              { ar: 'معدل التحويل… واختبار A/B بتغيير كل حاجة مرة واحدة', en: 'The conversion rate… and an A/B test changing everything at once' },
              { ar: 'التقييم الإرشادي… لأنه بيعدّ الزيارات بالأرقام', en: 'Heuristic evaluation… because it counts visits in numbers' },
            ],
            answer: 0,
            explain: { ar: 'الخروج بعد صفحة = __الارتداد__ (كمّي)، والسبب يتعرف بـ__النوعي__.', en: 'Leaving after one page = __bounce__ (quantitative); the cause comes from __qualitative__ methods.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**تحليلات الويب** = الطريقة المركزية للكمّي: **PV** (مشاهدات) · **الارتداد** (خرجوا بعد صفحة) · **CVR** (حقّقوا الهدف — أرباح).', en: '**Web analytics** = the core quantitative method: **PV** (views) · **bounce** (left after one page) · **CVR** (reached the goal — profit).' },
            { ar: '**التقييم الإرشادي:** خبراء + قواعد عملية · نوعي · الاتساق، منع الأخطاء، وضوح حالة النظام.', en: '**Heuristic evaluation:** experts + rules of thumb · qualitative · consistency, error prevention, visibility of system status.' },
            { ar: '**PV عالي + CVR واطي** ← الأرقام بتقول فين · اختبار استخدام بيقول ليه.', en: '**High PV + low CVR** → numbers say where · a usability test says why.' },
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
            { text: { ar: 'A) التقييم النوعي طريقة بتستخدم بيانات عددية للتقييم كميًا.', en: 'A) Qualitative evaluation uses numerical data to evaluate quantitatively.' }, answer: false },
            { text: { ar: 'B) PV مؤشر بيوضّح عدد مرات مشاهدة الصفحة.', en: 'B) PV shows the number of times a page has been viewed.' }, answer: true },
            { text: { ar: 'C) معدل الارتداد بيوضّح نسبة الزيارات اللي حقّقت إجراء مستهدف.', en: 'C) The bounce rate shows the share of visits that achieved a target action.' }, answer: false },
            { text: { ar: 'D) التقييم الإرشادي طريقة بيحدّد فيها خبراء مشاكل الواجهة بقواعد عملية.', en: 'D) Heuristic evaluation: experts identify UI problems by rules of thumb.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) الأرقام = __كمّي__؛ النوعي بيراقب الأصوات والسلوك ← **✗**.', en: 'A) Numbers = __quantitative__; qualitative observes voices and behavior → **✗**.' },
            { ar: 'B) تعريف صحيح لـ PV ← **✓**.', en: 'B) Correct definition of PV → **✓**.' },
            { ar: 'C) دي نسبة __معدل التحويل__؛ الارتداد = خرجوا بعد صفحة ← **✗**.', en: 'C) That is the __conversion rate__; bounce = left after one page → **✗**.' },
            { ar: 'D) تعريف صحيح للتقييم الإرشادي ← **✓**.', en: 'D) Correct definition of heuristic evaluation → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمؤشر (A–C):', en: '(2) Match each description (a–c) with the indicator (A–C):' },
            left: [
              { ar: 'a) عدد مرات مشاهدة الصفحة', en: 'a) The number of times a page was viewed' },
              { ar: 'b) نسبة الزيارات اللي خلصت بعد الصفحة الأولى بس', en: 'b) Share of visits ending after only the first page' },
              { ar: 'c) نسبة الزيارات اللي حقّقت إجراء مستهدف', en: 'c) Share of visits that achieved a target action' },
            ],
            right: [{ ar: 'A مشاهدات الصفحة (PV)', en: 'A Page views (PV)' }, { ar: 'B معدل الارتداد', en: 'B Bounce rate' }, { ar: 'C معدل التحويل', en: 'C Conversion rate' }],
            answer: [0, 1, 2] },
          solution: [
            { ar: 'a: عدد المشاهدات = **PV** ← A.', en: 'a: number of views = **PV** → A.' },
            { ar: 'b: خرجوا بعد صفحة = **الارتداد** ← B.', en: 'b: left after one page = **bounce rate** → B.' },
            { ar: 'c: حقّقوا هدف = **التحويل** ← C.', en: 'c: reached a goal = **conversion rate** → C.' },
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
            { q: { ar: '1. الطريقة اللي بتقيّم نوعيًا بمراقبة أصوات المستخدمين وسلوكهم؟', en: '1. The method evaluating qualitatively by observing users’ voices and behavior?' }, a: { ar: 'التقييم النوعي', en: 'Qualitative evaluation' } },
            { q: { ar: '2. الطريقة اللي بتقيّم كميًا ببيانات عددية؟', en: '2. The method evaluating quantitatively with numerical data?' }, a: { ar: 'التقييم الكمّي', en: 'Quantitative evaluation' } },
            { q: { ar: '3. الاختصار (حرفين) لمؤشر عدد مرات مشاهدة الصفحة؟', en: '3. The two-letter abbreviation for page views?' }, a: { ar: 'PV', en: 'PV' } },
            { q: { ar: '4. الطريقة اللي بيحدّد فيها خبراء مشاكل الواجهة بقواعد عملية؟', en: '4. The method in which experts identify UI problems by rules of thumb?' }, a: { ar: 'التقييم الإرشادي', en: 'Heuristic evaluation' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار __كل__ الطرق اللي من التقييم الكمّي:', en: 'Choose **all** the methods that are quantitative:' },
            options: [{ ar: 'A اختبار الاستخدام', en: 'A Usability testing' }, { ar: 'B تحليلات الويب', en: 'B Web analytics' }, { ar: 'C المقابلات', en: 'C Interviews' }, { ar: 'D اختبار A/B', en: 'D A/B testing' }],
            fixedOrder: true,
            answer: [1, 3],
            explain: { ar: 'الكمّي: __تحليلات الويب__ و__اختبار A/B__ · الباقي نوعي.', en: 'Quantitative: __web analytics__ and __A/B testing__ · the rest are qualitative.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب لمعدل التحويل:', en: 'Choose the best description of the conversion rate:' },
            options: [
              { ar: 'نسبة مرات مشاهدة الصفحة', en: 'The proportion of times a page has been viewed' },
              { ar: 'نسبة الزيارات اللي خلصت بعد الصفحة الأولى', en: 'The share of visits ending after the first page' },
              { ar: 'نسبة الزيارات اللي حقّقت هدف (شراء، تسجيل…)', en: 'The share of visits reaching a target (purchase, sign-up…)' },
              { ar: 'نسبة الصفحات المشاهَدة لإجمالي صفحات الموقع', en: 'Pages viewed relative to the site’s total pages' },
            ],
            answer: 2,
            explain: { ar: 'CVR = نسبة __تحقيق الهدف__.', en: 'CVR = the share __reaching the goal__.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(e):', en: 'Read and fill blanks (a)–(e):' },
            text: { ar: 'طرق تقييم الموقع فيها تقييم {0} بيراقب أصوات المستخدمين وسلوكهم، وتقييم {1} بيحلّل ببيانات عددية. من مؤشراته المشهورة: {2} اللي بيوضّح عدد مرات مشاهدة الصفحة، و{3} اللي بيوضّح نسبة الزيارات اللي خلصت بعد الصفحة الأولى بس، و{4} اللي بيوضّح نسبة الزيارات اللي حقّقت هدف.', en: 'Methods include {0} evaluation, which observes users’ voices and behavior, and {1} evaluation, which analyzes numerical data. Its typical indicators are {2}, the number of page views; {3}, the share of visits ending after only the first page; and {4}, the share of visits achieving a target action.' },
            bank: [{ ar: 'نوعي', en: 'qualitative' }, { ar: 'كمّي', en: 'quantitative' }, { ar: 'PV', en: 'PV' }, { ar: 'معدل الارتداد', en: 'bounce rate' }, { ar: 'معدل التحويل', en: 'conversion rate' }, { ar: 'اختبار A/B', en: 'A/B test' }],
            answer: [0, 1, 2, 3, 4],
            explain: { ar: '(a) نوعي (b) كمّي (c) PV (d) معدل الارتداد (e) معدل التحويل.', en: '(a) qualitative (b) quantitative (c) PV (d) bounce rate (e) conversion rate.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل طريقة (a–c) نوعي ولا كمّي؟', en: 'Is each method (a–c) qualitative or quantitative?' },
            groups: [{ icon: 'eye', label: { ar: 'A نوعي', en: 'A Qualitative' } }, { icon: 'target', label: { ar: 'B كمّي', en: 'B Quantitative' } }],
            items: [
              { text: { ar: 'a) المستخدمين يستكشفوا الموقع فعلًا ونراقب سهولة استخدامه', en: 'a) Users explore the site while usability is observed' }, group: 0 },
              { text: { ar: 'b) نجمع عدد زيارات الموقع ومشاهدات الصفحات', en: 'b) Tally the site’s access counts and page views' }, group: 1 },
              { text: { ar: 'c) نعمل مقابلات مع المستخدمين ونسمع انطباعاتهم وطلباتهم', en: 'c) Interview users about impressions and requests' }, group: 0 },
            ],
            explain: { ar: 'a→A · b→B · c→A.', en: 'a→A · b→B · c→A.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب للتقييم الإرشادي:', en: 'Choose the best description of heuristic evaluation:' },
            options: [
              { ar: 'مستخدمين بيستكشفوا الموقع ونراقب سهولته', en: 'Users explore the site and usability is observed' },
              { ar: 'بيانات عددية بتتجمع ونحلّل الاستخدام', en: 'Numerical data is tallied and usage analyzed' },
              { ar: 'خبراء بيحدّدوا مشاكل الواجهة بقواعد عملية', en: 'Experts identify UI problems by rules of thumb' },
              { ar: 'نمطين بيتجهّزوا ويتقارنوا بالبيانات', en: 'Two patterns are prepared and compared with data' },
            ],
            answer: 2,
            explain: { ar: 'الإرشادي = __خبراء + قواعد__ (A اختبار استخدام · B تحليلات · D A/B).', en: 'Heuristic = __experts + rules__ (A usability test · B analytics · D A/B).' } },
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
          { front: { ar: 'التقييم النوعي', en: 'Qualitative evaluation' }, back: { ar: '«ليه» من أصوات المستخدمين وسلوكهم (اختبار استخدام، مقابلات، إرشادي).', en: 'The "why" from users’ voices and behavior (usability tests, interviews, heuristic).' } },
          { front: { ar: 'التقييم الكمّي', en: 'Quantitative evaluation' }, back: { ar: '«قد إيه» من البيانات العددية (تحليلات الويب، A/B).', en: 'The "how much" from numerical data (web analytics, A/B).' } },
          { front: { ar: 'تحليلات الويب', en: 'Web analytics' }, back: { ar: 'تحليل زيارات الموقع بالأرقام — المركز في الكمّي.', en: 'Analyzing site access with numbers — the core of quantitative.' } },
          { front: { ar: 'PV', en: 'PV' }, back: { ar: 'إجمالي مرات مشاهدة الصفحة.', en: 'Total page views.' } },
          { front: { ar: 'معدل الارتداد', en: 'Bounce rate' }, back: { ar: 'نسبة الزيارات اللي خلصت بعد صفحة واحدة.', en: 'Share of visits that end after one page.' } },
          { front: { ar: 'معدل التحويل (CVR)', en: 'Conversion rate (CVR)' }, back: { ar: 'نسبة الزيارات اللي حقّقت الهدف — مقياس مساهمة الموقع في الأرباح.', en: 'Share of visits reaching the target — the site’s contribution to profit.' } },
          { front: { ar: 'التقييم الإرشادي', en: 'Heuristic evaluation' }, back: { ar: 'خبراء يفحصوا الواجهة بقواعد عملية: اتساق، منع أخطاء، وضوح حالة النظام.', en: 'Experts check the UI by rules of thumb: consistency, error prevention, system status.' } },
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
            prompt: { ar: 'اشرح ليه فريق موقع لازم يستخدم التقييم النوعي والكمّي مع بعض مش واحد بس. (أشِر إلى: اللي بتوضّحه الأرقام واللي بتوضّحه أصوات المستخدمين)', en: 'Explain why a website team should use both qualitative and quantitative evaluation rather than one. (Refer to: what numbers show and what users’ voices show)' },
            points: [
              { ar: 'الأرقام (PV، ارتداد، CVR) بتقول قد إيه وفين المشكلة.', en: 'Numbers (PV, bounce, CVR) show how much and where the problem is.' },
              { ar: 'الأصوات (اختبار استخدام، مقابلات) بتقول ليه.', en: 'Voices (usability tests, interviews) show why.' },
              { ar: 'الجمع = تقييم أدق وطريق واضح للتحسين.', en: 'Combining = more accurate evaluation and a clear path to improvement.' },
            ],
            model: { ar: 'الأرقام من تحليلات الويب بتوضّح __قد إيه__ الموقع بيتستخدم وفين المشكلة: مثلًا PV عالي بس CVR واطي يعني الناس بتيجي ومابتشتريش، أو معدل ارتداد عالي يعني بيمشوا من أول صفحة. بس الأرقام مابتقولش __ليه__. هنا ييجي التقييم النوعي: اختبار استخدام نراقب فيه ناس بتحاول تشتري، أو مقابلة نسمع فيها ضيقهم، فنكتشف السبب (زرار مستخبي أو خطوات كتير). علشان كده الفريق بيجمع الاتنين: الكمّي يوجّهه فين يبص، والنوعي يقول له يصلّح إيه — فالتقييم يبقى أدق والتحسين في المكان الصح.', en: 'Numbers from web analytics show __how much__ the site is used and where the problem is: high PV with low CVR means people arrive but do not buy; a high bounce rate means they leave from the first page. But numbers do not say __why__. That is where qualitative evaluation comes in: a usability test watching people try to buy, or an interview hearing their frustration, reveals the cause (a hidden button or too many steps). So the team combines both: quantitative points where to look, qualitative says what to fix — making the evaluation more accurate and the improvement well-aimed.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — مكتبة أونلاين صغيرة', en: 'Think as an engineer — small online bookstore' },
            prompt: { ar: 'مكتبة أونلاين صغيرة عايزة تعرف هل موقعها شغّال فعلًا لعملائها. ١) اطلب من 5 زمايل يزوروا متجر أونلاين وسجّل لكل واحد رقم تقدر تقيسه (كام صفحة شاف) وحاجة قالوا إنها ملخبطة. ٢) افترض PV عالي بس CVR واطي جدًا: معناه إيه؟ وأنهي طريقة تقول لك السبب؟ وفكّر في عميل البيانات ممكن تخبّيه (بيشتري من شاشة موبايل صغيرة أو زائر لأول مرة). ٣) أوصِ بطريقتين تقييم تبدأ بيهم بسببين من جدولك.', en: 'A small online bookstore wants to know whether its site really works. 1) Ask 5 classmates to visit a shop; record one measurable number and one confusing thing each. 2) Suppose PV is high but CVR very low: what might it mean, and which method tells you why? Consider a customer the data may hide. 3) Recommend two methods to start with, giving two reasons from your table.' },
            points: [
              { ar: 'جدول رقم + ملاحظة لكل زميل.', en: 'A table: a number + a remark per classmate.' },
              { ar: 'PV عالي + CVR واطي = بيجوا ومابيشتروش · السبب بالنوعي.', en: 'High PV + low CVR = arrive but do not buy · the cause via qualitative.' },
              { ar: 'طريقتين (تحليلات + اختبار استخدام) بسببين.', en: 'Two methods (analytics + usability test) with two reasons.' },
            ],
            model: { ar: '١) (مثال) زميل شاف 6 صفحات وقال «زرار الشراء صغير»، وتاني شاف صفحتين وقال «مالقيتش البحث». ٢) PV عالي وCVR واطي معناه إن الناس بتيجي وبتتفرّج بس مابتكمّلش الشراء — الأرقام قالت فين المشكلة، أما السبب فيبان بالتقييم النوعي (اختبار استخدام أو مقابلة). وعميل ممكن يتخبّى: حد بيشتري من موبايل صغير والزرار مش باين عنده، وده رقم PV مايبيّنهوش. ٣) أبدأ بتحليلات الويب علشان أتابع PV والارتداد وCVR، واختبار استخدام قصير علشان أعرف السبب. السببين: جدولي بيّن إن الناس بتيجي (أرقام) وفي نفس الوقت قالوا حاجات ملخبطة (أصوات) — فمحتاج الاتنين.', en: '1) (Example) one classmate viewed 6 pages and said "the buy button is small"; another viewed 2 and said "I couldn’t find search". 2) High PV with low CVR means people arrive and browse but do not finish buying — the numbers say where; the cause appears through qualitative evaluation (a usability test or interview). A hidden customer: someone on a small phone where the button is not visible — PV would never show it. 3) Start with web analytics to track PV, bounce and CVR, and a short usability test to find the cause. Reasons: my table showed people arrive (numbers) and also reported confusing things (voices) — so both are needed.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'موقع مدرسة جديد عليه زيارات كتير بس أغلب الناس بتمشي بعد الصفحة الأولى. اذكر مؤشر كمّي بيكشف المشكلة، وطريقة نوعية تلاقي بيها السبب، وإصلاح محتمل.', en: 'A new school site gets many visits but most leave after the first page. Name one quantitative indicator, one qualitative method for the cause, and one likely fix.' },
            points: [{ ar: 'المؤشر: معدل الارتداد.', en: 'Indicator: bounce rate.' }, { ar: 'الطريقة: اختبار استخدام/مقابلة.', en: 'Method: usability test/interview.' }, { ar: 'إصلاح (مثلًا لينكات واضحة للأخبار والنتايج في الصفحة الأولى).', en: 'A fix (e.g. clear links to news and results on the first page).' }],
            model: { ar: 'المؤشر الكمّي: __معدل الارتداد__ العالي (خرجوا بعد الصفحة الأولى). الطريقة النوعية: __اختبار استخدام__ — أخلّي كام طالب وولي أمر يدوّروا على النتيجة وأراقبهم. إصلاح محتمل: لو اكتشفت إنهم مش لاقيين رابط النتايج، أحطه زرار واضح فوق في الصفحة الرئيسية.', en: 'Quantitative indicator: a high __bounce rate__ (left after the first page). Qualitative method: a __usability test__ — have a few students and parents look for results while I observe. Likely fix: if they cannot find the results link, put it as a clear button at the top of the home page.' } },
        },
      ],
    },

    /* ───────────── textbook prompts ───────────── */
    {
      id: 'reflect', kind: 'challenge',
      title: { ar: 'أسئلة الكتاب: فكّر · تأمّل · تحدّى', en: 'Textbook prompts: think · reflect · challenge' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر لحظة', en: 'Pause & think' },
            prompt: { ar: 'هل عدّ الزيارات بيقول لك ليه الناس بتمشي من الصفحة؟ أنهي طريقة بتقول؟ ووصّل السؤال بالطريقة: «كام؟» ولا «ليه؟»', en: 'Would counting visits tell you why people leave a page? Which method would? Match the question to the method: "how many?" vs "why?"' },
            points: [{ ar: 'لأ — العدّ بيقول كام.', en: 'No — counting says how many.' }, { ar: 'ليه ← نوعي (اختبار استخدام/مقابلة).', en: 'Why → qualitative (usability test/interview).' }],
            model: { ar: 'لأ، العدّ بيقول «كام» واحد مشي، مش «ليه». اللي بيقول ليه هو التقييم النوعي: اختبار استخدام نراقب فيه الناس أو مقابلة نسمعهم. «كام؟» ← كمّي (تحليلات الويب)، «ليه؟» ← نوعي.', en: 'No — counting tells "how many" left, not "why". What tells why is qualitative evaluation: a usability test observing people or an interview listening to them. "How many?" → quantitative (web analytics); "why?" → qualitative.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: لو تقدر تشوف مؤشر واحد بس لموقع بتستخدمه — PV ولا الارتداد ولا CVR — هتختار أنهي وليه؟ تحدّى: صفحة معدل ارتدادها عالي — صمّم اختبار نوعي قصير يكشف السبب، وقول هتغيّر إيه الأول.', en: 'Reflect: if you could see only one metric for a site you use — PV, bounce or CVR — which and why? Challenge: a page has a high bounce rate — design a short qualitative test to reveal the cause, and say what you would change first.' },
            points: [{ ar: 'مؤشر + سبب.', en: 'A metric + reason.' }, { ar: 'اختبار نوعي قصير + أول تغيير.', en: 'A short qualitative test + the first change.' }],
            model: { ar: 'هختار CVR لأنه بيقول هل الموقع بيحقّق هدفه فعلًا مش بس بيتزار. الاختبار: 5 أشخاص يفتحوا الصفحة ويحاولوا يلاقوا المعلومة المطلوبة وأنا ساكت وبراقب وبسجّل فين وقفوا، وبعدين أسألهم «إيه اللي خلّاك تمشي؟». أول تغيير: أحط أهم معلومة وأوضح زرار فوق في أول الصفحة.', en: 'I would pick CVR because it shows whether the site actually achieves its goal, not just gets visits. The test: 5 people open the page and try to find the needed information while I silently observe and note where they stop, then ask "what made you leave?". First change: put the key information and clearest button at the top of the page.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '4-3', seconds: 60, items: [
          { text: { ar: 'النوعي = ليه', en: 'Qualitative = why' }, answer: true },
          { text: { ar: 'الكمّي = قد إيه', en: 'Quantitative = how much' }, answer: true },
          { text: { ar: 'المقابلات تقييم كمّي', en: 'Interviews are quantitative' }, answer: false },
          { text: { ar: 'اختبار A/B تقييم كمّي', en: 'A/B testing is quantitative' }, answer: true },
          { text: { ar: 'PV = إجمالي مشاهدات الصفحة', en: 'PV = total page views' }, answer: true },
          { text: { ar: 'الارتداد = نسبة اللي حقّقوا الهدف', en: 'Bounce = share reaching the goal' }, answer: false },
          { text: { ar: 'CVR = نسبة اللي حقّقوا هدف', en: 'CVR = share reaching a goal' }, answer: true },
          { text: { ar: 'الارتداد = خرجوا بعد صفحة واحدة', en: 'Bounce = left after one page' }, answer: true },
          { text: { ar: 'الإرشادي = خبراء + قواعد عملية', en: 'Heuristic = experts + rules of thumb' }, answer: true },
          { text: { ar: 'الإرشادي تقييم كمّي', en: 'Heuristic evaluation is quantitative' }, answer: false },
          { text: { ar: 'عدّ الزيارات بيقول ليه بيمشوا', en: 'Counting visits says why they leave' }, answer: false },
          { text: { ar: 'تحليلات الويب مركز التقييم الكمّي', en: 'Web analytics is the core of quantitative' }, answer: true },
          { text: { ar: 'منع الأخطاء من منظورات الإرشادي', en: 'Error prevention is a heuristic perspective' }, answer: true },
          { text: { ar: 'PV عالي + CVR واطي = بيجوا ومابيشتروش', en: 'High PV + low CVR = arrive but do not buy' }, answer: true },
          { text: { ar: 'CVR مالوش علاقة بالأرباح', en: 'CVR has nothing to do with profit' }, answer: false },
          { text: { ar: 'نجمع النوعي والكمّي', en: 'Combine qualitative and quantitative' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 4-3', en: 'Lesson 4-3 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. «نسبة الزيارات اللي خلصت بعد مشاهدة الصفحة الأولى بس» — أنهي مؤشر؟', en: '1. "Share of visits that ended after only the first page" — which?' }, options: [{ ar: 'مشاهدات الصفحة PV', en: 'Page views (PV)' }, { ar: 'معدل الارتداد', en: 'Bounce rate' }, { ar: 'معدل التحويل', en: 'Conversion rate' }, { ar: 'اختبار A/B', en: 'A/B testing' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. أنهي واحدة طريقة تقييم كمّي؟', en: '2. Which is a quantitative method?' }, options: [{ ar: 'المقابلات', en: 'Interviews' }, { ar: 'اختبار الاستخدام', en: 'Usability testing' }, { ar: 'تحليلات الويب', en: 'Web analytics' }, { ar: 'التقييم الإرشادي', en: 'Heuristic evaluation' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. الوصف الأنسب للتقييم الإرشادي؟', en: '3. Best description of heuristic evaluation?' }, options: [{ ar: 'مستخدمين يستكشفوا ونراقب السهولة', en: 'Users explore while usability is observed' }, { ar: 'بيانات عددية بتتجمع وتتحلّل', en: 'Numerical data is counted and analyzed' }, { ar: 'خبراء يحدّدوا مشاكل الواجهة بقواعد', en: 'Experts find UI problems by rules' }, { ar: 'نمطين يتجهّزوا ويتقارنوا بالبيانات', en: 'Two patterns compared with data' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. PV مؤشر بيوضّح عدد مرات مشاهدة الصفحة.', en: '4. PV shows how many times a page was viewed.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. عدّ الزيارات بيقول لك سبب مغادرة المستخدمين.', en: '5. Counting visits tells you why users leave.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. الجمع بين النوعي والكمّي بيدّي تقييم أدق.', en: '6. Combining both gives a more accurate evaluation.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. إيه الفرق بين التقييم النوعي والكمّي؟ اذكر تقنية لكل واحد.', en: '7. What is the difference between qualitative and quantitative evaluation? Give a technique for each.' },
          points: [{ ar: 'النوعي: ليه — أصوات وسلوك (اختبار استخدام/مقابلات).', en: 'Qualitative: why — voices and behavior (usability test/interviews).' }, { ar: 'الكمّي: قد إيه — أرقام (تحليلات الويب/A/B).', en: 'Quantitative: how much — numbers (web analytics/A/B).' }],
          model: { ar: 'التقييم النوعي بيستكشف «ليه» من أصوات المستخدمين وسلوكهم، زي اختبار الاستخدام اللي بنراقب فيه استخدامهم الفعلي. التقييم الكمّي بيقيس «قد إيه» ببيانات عددية بموضوعية، زي تحليلات الويب (PV والوقت).', en: 'Qualitative evaluation explores "why" from users’ voices and behavior, e.g. usability testing that observes real use. Quantitative evaluation measures "how much" objectively with numbers, e.g. web analytics (PV, time).' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. عرّف PV ومعدل الارتداد و CVR.', en: '8. Define PV, bounce rate and CVR.' },
          points: [{ ar: 'PV: إجمالي المشاهدات.', en: 'PV: total views.' }, { ar: 'الارتداد: نسبة اللي مشيوا بعد صفحة واحدة.', en: 'Bounce: share leaving after one page.' }, { ar: 'CVR: نسبة اللي حقّقوا الهدف.', en: 'CVR: share reaching the goal.' }],
          model: { ar: 'PV: إجمالي عدد مرات مشاهدة الصفحة. معدل الارتداد: نسبة الزيارات اللي خلصت بعد مشاهدة الصفحة الأولى بس. معدل التحويل (CVR): نسبة الزيارات اللي حقّقت إجراء مستهدف زي الشراء أو التسجيل.', en: 'PV: the total number of times a page was viewed. Bounce rate: the share of visits that ended after viewing only the first page. Conversion rate (CVR): the share of visits that achieved a target action such as a purchase or registration.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. إيه التقييم الإرشادي؟ اذكر منظورين من منظوراته.', en: '9. What is heuristic evaluation? Name two of its perspectives.' },
          points: [{ ar: 'خبراء يحدّدوا مشاكل الواجهة بقواعد عملية (نوعي).', en: 'Experts find UI problems by rules of thumb (qualitative).' }, { ar: 'منظورين: الاتساق، منع الأخطاء، وضوح حالة النظام.', en: 'Two perspectives: consistency, error prevention, system status.' }],
          model: { ar: 'التقييم الإرشادي طريقة بيحدّد فيها خبراء مشاكل واجهة المستخدم على أساس قواعد عملية، وهو شكل من التقييم النوعي. من منظوراته: الاتساق (التصميم والعمليات موحّدة في الموقع) ومنع الأخطاء (التصميم يصعّب على المستخدم يغلط).', en: 'Heuristic evaluation is a method in which experts identify UI problems based on rules of thumb; it is a form of qualitative evaluation. Perspectives include consistency (design and operations unified across the site) and error prevention (the design makes mistakes hard).' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. موقع PV بتاعه عالي و CVR واطي — تعرف السبب إزاي؟', en: '10. A site has high PV and low CVR — how do you find the cause?' },
          points: [{ ar: 'الأرقام بتقول فين (بيجوا ومابيشتروش).', en: 'Numbers say where (arrive, do not buy).' }, { ar: 'نوعي (اختبار استخدام/مقابلة/إرشادي) يكشف ليه.', en: 'Qualitative (usability test/interview/heuristic) reveals why.' }],
          model: { ar: 'PV عالي وCVR واطي معناه إن الناس بتيجي بس مابتكمّلش الهدف — الأرقام حدّدت فين المشكلة بس مش ليه. فأستخدم تقييم نوعي: اختبار استخدام أراقب فيه ناس بتحاول تشتري، أو مقابلة، أو فحص إرشادي من خبير، عشان أكتشف السبب (زي زرار دفع مستخبي) وأصلّحه.', en: 'High PV with low CVR means people arrive but do not complete the goal — the numbers locate the problem but not the cause. So I use qualitative evaluation: a usability test watching people try to buy, an interview, or an expert heuristic check, to discover the cause (such as a hidden pay button) and fix it.' } } },
      ],
    },
  ],
});
