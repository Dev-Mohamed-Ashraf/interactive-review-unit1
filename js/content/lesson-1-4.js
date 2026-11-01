/* =========================================================
 * content/lesson-1-4.js — القضايا الأخلاقية المتعلقة بالذكاء الاصطناعي
 * Pure data. Sources: textbook 1-4 (EN p.26–32) + memo.
 * ========================================================= */
RV.lessons.add('1-4', {
  id: '1-4',
  color: '#fbbf24',
  cover: 'img/l4-cover.webp',
  title: { ar: 'القضايا الأخلاقية المتعلقة بالذكاء الاصطناعي', en: 'Ethical Issues with AI' },
  guiding: { ar: 'إيه القضايا الأخلاقية اللي بتظهر مع انتشار الذكاء الاصطناعي، وإيه المبادئ اللي لازم توجّه استخدامنا ليه؟', en: 'What ethical issues arise as AI spreads, and what principles should guide how we use it?' },
  hook: {
    ar: 'الذكاء الاصطناعي بقى بيساعد في قرارات حقيقية عن الناس: مين يدخل **مقابلة شغل**، مين اللي ظاهر في **كاميرا المراقبة**، و**بياناتك** هتتستخدم إزاي. بس لو اتعلّم من بيانات **متحيزة**… ممكن يبقى ظالم. ولو غلط… **مين المسؤول**؟',
    en: 'AI now helps decide real things about people: who gets a **job interview**, who appears on a **surveillance camera**, how your **data** is used. If it learned from **biased** data… it will be unfair. And if it is wrong… **who is responsible**?',
  },
  keyFact: { ar: 'لو بيانات التدريب __متحيزة__، الـAI ممكن يكرّر التحيز ده في أحكامه. الاستخدام المسؤول = __نفحص التحيز__، __نقدر نشرح القرار__، و__نعرف مين المسؤول__.', en: 'If the training data is __biased__, AI reproduces that bias. Responsible use = __check for bias__, __explain decisions__, and __know who is accountable__.' },
  concepts: ['algorithmic bias', 'training data', 'privacy', 'explainable AI (XAI)', 'black-box problem', 'responsibility', 'fairness', 'transparency', 'privacy protection', 'accountability'],
  objectives: [
    { ar: 'أشرح يعني إيه التحيز الخوارزمي وأوصف أسبابه الرئيسية.', en: 'Explain what algorithmic bias is and its main causes.' },
    { ar: 'أربط مبادئ أخلاقيات الذكاء الاصطناعي (العدالة، الشفافية، حماية الخصوصية، المساءلة) بمواقف محددة.', en: 'Connect the AI-ethics principles (fairness, transparency, privacy protection, accountability) to situations.' },
    { ar: 'أقيّم موقفًا أخلاقيًا يتعلق بالذكاء الاصطناعي، وأبرّر قاعدة للاستخدام المسؤول، وأحدد الأطراف ذات المسؤولية.', en: 'Evaluate an ethical situation involving AI, justify a rule for responsible use, and identify who holds responsibility.' },
  ],

  stations: [
    /* ───────────── 1 · algorithmic bias ───────────── */
    {
      id: 'bias', kind: 'learn',
      title: { ar: 'التحيز الخوارزمي', en: 'Algorithmic bias' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'شركة درّبت ذكاء اصطناعي على قرارات توظيف قديمة كانت بتظلم مجموعة معينة… الذكاء ده هيبقى عادل؟', en: 'A company trains an AI on old hiring decisions that were unfair to one group… will the AI be fair?' },
            options: [
              { emoji: '⚖️', text: { ar: 'أيوه، الكمبيوتر محايد', en: 'Yes, computers are neutral' } },
              { emoji: '🔁', text: { ar: 'لأ، هيكرر نفس الظلم', en: 'No, it will repeat the unfairness' } },
              { emoji: '🤔', text: { ar: 'مش عارف', en: 'Not sure' } },
            ],
            after: { ar: 'تعالى نشغّل التجربة ونشوف بالأرقام 👇', en: 'Let’s run the experiment and see the numbers 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: التحيز الخوارزمي مشهد بمشهد', en: '🎞️ Full animation: algorithmic bias scene by scene' },
          enTitle: 'Algorithmic bias, scene by scene',
          terms: ['algorithmic bias', 'training data', 'balanced data', 'proxy variable'],
          visual: { anim: 'biasMovie' },
          beats: [
            { ar: '🏢 شركة درّبت ذكاء توظيف على __قرارات التعيين القديمة__ — والبيانات بتقول إن المجموعة ▲ __اتظلمت زمان__ رغم إن المهارات واحدة.', en: '🏢 A company trained a hiring AI on __old hiring decisions__ — and the data shows group ▲ was __treated unfairly__ even with the same skills.' },
            { ar: '🤖 **التحيز الخوارزمي:** __نمط في مخرجات الـAI__ ممكن يؤدي لنتايج __غير عادلة أو ضارة__ — وهنا النموذج اتعلّم الظلم من بيانات التدريب وكرّره: __70% مقابل 18%__ لنفس المهارات!', en: '🤖 **Algorithmic bias:** bias in AI judgments __caused by bias in the training data__ — the model learned the unfairness and repeated it: __70% vs 18%__ for the same skills!' },
            { ar: '🔧 نقلّله إزاي؟ نخلّي البيانات __متوازنة وممثّلة لكل المجموعات__، و__نختبر نتائج النموذج لكل مجموعة__ قبل ما نستخدمه، ونراجع تصميم النظام والسياق اللي هيتستخدم فيه.', en: '🔧 How to reduce it? Make the data __balanced and representative of every group__, and __test the model’s results per group__ before using it.' },
            { ar: '🕵️ **فخ المتغيّر البديل:** حتى لو شلنا عمود «المجموعة»، متغيّر تاني __بيمثّلها بشكل غير مباشر__ (زي اسم النادي أو الحي) ممكن __يرجّع التحيز__ — والتحيز ممكن يدخل كمان من اختيار غير مناسب للمتغيرات، أو تصميم النموذج، أو طريقة الاستخدام، أو السياق البشري والاجتماعي.', en: '🕵️ **The proxy-variable trap:** even after removing the "group" column, another variable __linked to it__ (like a club’s name or the area) can __bring the bias back__ — bias can also enter through variable choice or model design.' },
            { ar: '🌍 **أمثلة حقيقية:** ذكاء توظيف بيقيّم __فئة معيّنة__ بشكل غير عادل لأن قرارات الماضي كانت كده · والتعرّف على الوجه بيغلط أكتر مع __مجموعات عرقية__ صورها كانت قليلة في التدريب.', en: '🌍 **Real examples:** a hiring AI rating __one gender__ unfairly because past decisions did · face recognition erring more with __ethnic groups__ whose photos were few in training.' },
            { ar: '📌 **الخلاصة:** أهم سبب = __تحيّز بيانات التدريب__ (ناقصة أو فيها تمييز قديم) — __مش__ بطء الحاسب ولا ضعف الإنترنت. العلاج: بيانات متوازنة + اختبار لكل مجموعة.', en: '📌 **The point:** the cause = __biased training data__ (missing or old discrimination) — __not__ a slow computer or weak Internet. The fix: balanced data + testing per group.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz',
          q: { widget: 'mcq', prompt: { ar: 'إيه اللي __مش__ سبب مناسب للتحيز الخوارزمي؟', en: 'Which is NOT a cause of algorithmic bias?' },
            options: [{ ar: 'بيانات التدريب متحيزة', en: 'Biased training data' }, { ar: 'نزعات تمييزية قديمة في البيانات', en: 'Past discrimination in the data' }, { ar: 'سرعة معالجة الحاسب بطيئة', en: 'Slow computer processing' }, { ar: 'بيانات ناقصة عن سمات معينة', en: 'Insufficient data on some attributes' }], answer: 2 },
        },
      ],
    },

    /* ───────────── 2 · privacy ───────────── */
    {
      id: 'privacy', kind: 'learn',
      title: { ar: 'قضايا الخصوصية', en: 'Privacy issues' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: قضايا الخصوصية مشهد بمشهد', en: '🎞️ Full animation: privacy issues scene by scene' },
          enTitle: 'Privacy issues, scene by scene',
          terms: ['face-recognition surveillance', 'mass data collection', 'privacy protection'],
          visual: { anim: 'privacyMovie' },
          beats: [
            { ar: '📹 **المراقبة بتقنية التعرّف على الوجه:** كاميرات في الأماكن العامة تقدر __تتعرّف على الأفراد وتتبّعهم__ — مين، فين، وإمتى.', en: '📹 **Face-recognition surveillance:** cameras in public places can __identify and track people__ — who, where and when.' },
            { ar: '🗂️ **الجمع الجماعي للبيانات الشخصية:** كميات كبيرة من بيانات سلوكك على الإنترنت (__لايكات، بحث، مكان، مشتريات__) بتتجمع وتتحلّل.', en: '🗂️ **Mass collection of personal data:** huge amounts of your online behavior (__likes, searches, location, purchases__) are collected and analyzed.' },
            { ar: '⚖️ الكاميرات ممكن تحسّن __السلامة والراحة__… بس بتثير __مخاوف على الخصوصية__. التوازن محتاج قواعد: __مين يشوف البيانات؟ ولحد إمتى تتخزّن؟__', en: '⚖️ Cameras add __safety and convenience__… but threaten __privacy__. The balance needs rules: __who may see the data? How long is it kept?__' },
            { ar: '🔒 **حماية الخصوصية:** نتعامل مع البيانات __بشكل مناسب__ — يتشارك __بس اللي لازم__ و__لغرض واضح__.', en: '🔒 **Privacy protection:** handle data __properly__ — share __only what is needed__, for __a clear purpose__.' },
            { ar: '⚠️ **فخ الامتحان:** التتبّع بالتعرّف على الوجه + الجمع الجماعي للبيانات = __قضايا خصوصية__ · لكن «الـAI بيعمل أعمال إبداعية» أو «سرعته زادت» = __مش__ قضايا خصوصية.', en: '⚠️ **Exam trap:** face-recognition tracking + mass data collection = __privacy issues__ · but "AI makes creative works" or "it got faster" = __not__ privacy issues.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz',
          q: { widget: 'mcq', prompt: { ar: 'اختار __كل__ اللي يعتبر قضية خصوصية مرتبطة بالـAI:', en: 'Choose ALL that are AI privacy issues:' },
            options: [{ ar: 'تتبّع الأفراد بالتعرف على الوجه', en: 'Tracking people via face recognition' }, { ar: 'جمع بيانات السلوك على الإنترنت وتحليلها بكميات كبيرة', en: 'Mass collection & analysis of online behavior' }, { ar: 'الـAI بيعمل أعمال إبداعية', en: 'AI creating creative works' }, { ar: 'سرعة حوسبة الـAI بتزيد', en: 'AI computing speed improving' }], answer: [0, 1] },
        },
      ],
    },

    /* ───────────── 3 · XAI & responsibility ───────────── */
    {
      id: 'xai', kind: 'learn',
      title: { ar: 'الذكاء الاصطناعي القابل للتفسير والمسؤولية', en: 'Explainable AI & responsibility' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: الذكاء الاصطناعي القابل للتفسير (XAI) والمسؤولية', en: '🎞️ Full animation: explainable AI (XAI) and responsibility' },
          enTitle: 'XAI & responsibility, scene by scene',
          terms: ['black box', 'XAI', 'transparency', 'responsibility'],
          visual: { anim: 'xaiMovie' },
          beats: [
            { ar: '⬛ **الصندوق الأسود:** طلب الوظيفة اترفض… ومحدش يعرف __ليه__. وحتى لو النتيجة طلعت صح، الغموض __بيصعّب تقييمها واكتشاف الأخطاء أو التحيز__.', en: '⬛ **The black box:** the job application was rejected… and nobody knows __why__. Even if the result is right by chance, the mystery __blocks checking__.' },
            { ar: '🔍 **XAI (الذكاء الاصطناعي القابل للتفسير):** أساليب بتساعد البشر __يفهموا العوامل__ اللي وصّلت النظام لمخرج أو قرار معيّن — فنكتشف إنه رفض بسبب __«الحي»__ ونصلّح التحيز!', en: '🔍 **XAI (explainable AI):** lets humans __understand why__ the AI made a judgment — so we find it rejected because of __"the area"__ and fix the bias!' },
            { ar: '① **أهمية كل عامل:** XAI بيوضّح كل عامل __أثّر قد إيه__ في القرار. لو لقينا «الحي اللي ساكن فيه» مأثّر — ده __تحيّز لازم يتشال__!', en: '① **Factor importance:** XAI shows __how much each factor__ weighed in the decision. If "the area you live in" matters — that is __bias to remove__!' },
            { ar: '② **«لو كان… كان اتقبل»:** بيقولك __أصغر تغيير__ كان هيقلب النتيجة — «لو خبرتك 3 سنين كنت اتقبلت». كده الشخص فاهم ويقدر يتحسّن.', en: '② **"What if…":** it tells you __the smallest change__ that flips the result — "with 3 years of experience you would be hired". Now the person understands and can improve.' },
            { ar: '③ **الخريطة الحرارية:** في الصور الطبية بيلوّن __المكان اللي بنى عليه التشخيص__ — والطبيب يتأكد بعينه إنه مكان منطقي.', en: '③ **Heat map:** in medical images it colors __the area the diagnosis relied on__ — and the doctor checks it makes sense.' },
            { ar: '⚖️ **المسؤولية:** تحديد __أدوار وواجبات__ الأطراف: المطوّر والمشغِّل والجهة المستخدمة والمستخدِم — و__مفيش توزيع واحد يصلح لكل السياقات__. وXAI بيدعم الشفافية ويساعد العدالة والمساءلة.', en: '⚖️ **Responsibility:** if AI is wrong… who answers? The developer, the user or the operator — __there is still no clear agreed standard__. XAI delivers transparency and helps fairness and accountability.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: 'فكّر لحظة', en: 'Pause & think' },
          q: { widget: 'mcq', prompt: { ar: 'لو محدش يقدر يشرح ليه ذكاء اصطناعي رفض طلب وظيفة لشخص… أنهي مبدأ من مبادئ الأخلاقيات ناقص هنا؟', en: 'If no one can explain why an AI rejected someone’s job application… which ethics principle is missing?' },
            options: [{ ar: 'الشفافية', en: 'Transparency' }, { ar: 'السرعة', en: 'Speed' }, { ar: 'التجارة الإلكترونية', en: 'E-commerce' }, { ar: 'الحوسبة السحابية', en: 'Cloud computing' }], answer: 0,
            explain: { ar: 'الشفافية = إظهار عملية اتخاذ القرار. ومن غيرها مانقدرش نتأكد إن الرفض كان عادل.', en: 'Transparency = showing how the decision was made. Without it we cannot check the rejection was fair.' } },
        },
      ],
    },

    /* ───────────── 4 · four principles ───────────── */
    {
      id: 'principles', kind: 'learn',
      title: { ar: 'المبادئ الأربعة لأخلاقيات الذكاء الاصطناعي', en: 'The four principles of AI ethics' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: المبادئ الأربعة مشهد بمشهد', en: '🎞️ Full animation: the four principles scene by scene' },
          enTitle: 'The four principles, scene by scene',
          terms: ['fairness', 'transparency', 'privacy protection', 'accountability'],
          visual: { anim: 'principlesMovie' },
          beats: [
            { ar: '⚖️ **العدالة (Fairness):** __عدم التمييز ظلمًا__ ضد أي شخص أو مجموعة — زي ذكاء توظيف يقيّم بعدل بغضّ النظر عن الجنس.', en: '⚖️ **Fairness:** __no unjust discrimination__ against any person or group — like a hiring AI that rates fairly regardless of gender.' },
            { ar: '👁️ **الشفافية (Transparency):** __إتاحة معلومات واضحة ومناسبة__ عن النظام واستخدامه وعملية اتخاذ القرار وحدوده — زي الإفصاح للمستخدمين عن إزاي النظام بيقرّر.', en: '👁️ **Transparency:** __showing how decisions are made__ and how it works inside — like telling users how the system decides.' },
            { ar: '🛡️ **حماية الخصوصية:** التعامل __المناسب__ مع المعلومات الشخصية — ماتستخدمش البيانات __لغرض غير اللي اتجمعت عشانه__.', en: '🛡️ **Privacy protection:** __proper__ handling of personal information — never use data __for a purpose other than the one it was collected for__.' },
            { ar: '🙋‍♂️ **المساءلة (Accountability):** __تحديد الجهات المسؤولة__ عن النظام وقراراته وآثاره __وإمكان محاسبتها__ وفق أدوارها — زي المحاسبة لما تشخيص الـAI يطلع غلط. ⚠️ المساءلة __مش__ القدرة على شرح القرار (دي وظيفة XAI).', en: '🙋‍♂️ **Accountability:** there must be __someone responsible and answerable__ for AI decisions — like accountability when an AI diagnosis is wrong.' },
            { ar: '📌 **الخلاصة:** المبادئ الأربعة = __عدالة · شفافية · خصوصية · مساءلة__ — وسرّ الحفظ «عَشْخَم» 😄.', en: '📌 **The point:** the four principles = __fairness · transparency · privacy · accountability__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: 'وصّل', en: 'Match' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل موقف بالمبدأ الأقرب:', en: 'Match each situation with the closest principle:' },
            left: [
              { ar: 'ذكاء توظيف يقيّم بعدل بغضّ النظر عن الجنس', en: 'A hiring AI rates fairly regardless of gender' },
              { ar: 'الإفصاح عن عملية القرار للمستخدمين بشكل مفهوم', en: 'Explaining the decision process to users clearly' },
              { ar: 'عدم استخدام البيانات لغرض غير اللي اتجمعت له', en: 'Not using data beyond its collected purpose' },
              { ar: 'المحاسبة لما تشخيص الـAI يطلع غلط', en: 'Being accountable when an AI diagnosis is wrong' },
            ],
            right: [{ ar: 'العدالة', en: 'Fairness' }, { ar: 'الشفافية', en: 'Transparency' }, { ar: 'حماية الخصوصية', en: 'Privacy protection' }, { ar: 'المساءلة', en: 'Accountability' }],
            answer: [0, 1, 2, 3] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**التحيز الخوارزمي:** نمط في مخرجات الـAI ممكن يؤدي لنتايج غير عادلة أو ضارة. أهم أسبابه __بيانات التدريب__ (ناقصة أو فيها تمييز قديم) — وكمان اختيار المتغيرات أو المتغير البديل أو تصميم النموذج أو طريقة الاستخدام.', en: '**Algorithmic bias:** bias in AI judgments caused by biased __training data__ (missing or discriminatory) — also variable choice, proxies or model design.' },
            { ar: '**الخصوصية:** مراقبة بالتعرف على الوجه + جمع جماعي للبيانات الشخصية.', en: '**Privacy:** face-recognition surveillance + mass personal-data collection.' },
            { ar: '**XAI** بيفسّر «ليه» بدل الصندوق الأسود · **المسؤولية** أدوار بين المطوّر والمشغّل والجهة المستخدمة والمستخدم، من غير توزيع واحد لكل السياقات.', en: '**XAI** explains "why" instead of a black box · **responsibility** among developer, user and operator has no clear standard yet.' },
            { ar: 'أربعة مبادئ مهمة من بين مبادئ أخرى: **العدالة · الشفافية · حماية الخصوصية · المساءلة**.', en: 'Four principles: **fairness · transparency · privacy protection · accountability**.' },
          ],
        },
      ],
    },

    /* ───────────── 5 · worked examples ───────────── */
    {
      id: 'worked', kind: 'example',
      title: { ar: 'أمثلة الكتاب المحلولة', en: 'Textbook worked examples' },
      steps: [
        {
          type: 'example',
          q: { widget: 'tf', prompt: { ar: '(1) ضع ✓ أو ✗:', en: '(1) Mark ✓ or ✗:' }, items: [
            { text: { ar: 'التحيز الخوارزمي نمط في مخرجات الـAI ممكن ينشأ من البيانات أو تصميم النظام أو طريقة استخدامه، وممكن يؤدي لنتايج غير عادلة.', en: 'Algorithmic bias is bias in AI judgments caused by biased training data.' }, answer: true },
            { text: { ar: 'حتى لو عملية القرار مش واضحة، مفيش مشكلة مادام النتيجة صح.', en: 'An opaque process is fine as long as the result is correct.' }, answer: false },
            { text: { ar: 'الـXAI تقنية بتخلّي البشر يفهموا منطق الـAI.', en: 'XAI lets humans understand the AI\'s reasoning.' }, answer: true },
            { text: { ar: 'لما الـAI يغلط، تحديد المسؤول محسوم بوضوح بالفعل.', en: 'Who is responsible for an AI error is already clearly settled.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) ده التعريف الصحيح ← **✓**.', en: 'A) Correct definition → **✓**.' },
            { ar: 'B) لما العملية مش واضحة يبقى __صعب نتحقّق__ من صحة النتيجة ← **✗**.', en: 'B) An opaque process makes the result __hard to verify__ → **✗**.' },
            { ar: 'C) ده وصف صحيح للـXAI ← **✓**.', en: 'C) Correct description of XAI → **✓**.' },
            { ar: 'D) الآراء بتختلف بين المطوّر والمستخدم والمشغّل، ولسه ماتحدّدتش بوضوح ← **✗**.', en: 'D) Views differ among developer, user and operator; no standard yet → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق الوصف بالمبدأ:', en: '(2) Match description to principle:' },
            left: [
              { ar: 'عدم التمييز ظلمًا ضد أي شخص أو مجموعة', en: 'No unjust discrimination against anyone' },
              { ar: 'إتاحة معلومات واضحة عن النظام وعملية القرار وحدوده', en: 'Showing the decision process clearly' },
              { ar: 'التعامل المناسب مع المعلومات الشخصية', en: 'Handling personal information appropriately' },
              { ar: 'تحديد الجهات المسؤولة عن النتائج وإمكان محاسبتها', en: 'Being answerable for decisions' },
            ],
            right: [{ ar: 'A العدالة', en: 'A Fairness' }, { ar: 'B الشفافية', en: 'B Transparency' }, { ar: 'C حماية الخصوصية', en: 'C Privacy protection' }, { ar: 'D المساءلة', en: 'D Accountability' }],
            answer: [0, 1, 2, 3] },
          solution: [
            { ar: 'a: عدم التمييز = **العدالة** ← A · b: إظهار القرار = **الشفافية** ← B.', en: 'a: no discrimination = **fairness** → A · b: showing the process = **transparency** → B.' },
            { ar: 'c: حماية البيانات = **حماية الخصوصية** ← C · d: تحديد المسؤولين وإمكان محاسبتهم = **المساءلة** ← D.', en: 'c: protecting data = **privacy protection** → C · d: being answerable = **accountability** → D.' },
          ],
        },
      ],
    },

    /* ───────────── 6 · textbook practice ───────────── */
    {
      id: 'practice', kind: 'practice',
      title: { ar: 'تدريبات الكتاب (Try + Exercise)', en: 'Textbook practice (Try + Exercise)' },
      steps: [
        {
          type: 'quiz', title: { ar: 'تمرين 1', en: 'Try 1' },
          q: { widget: 'recall', prompt: { ar: 'قول الإجابة وبعدين اكشفها:', en: 'Say it, then reveal:' }, items: [
            { q: { ar: 'نمط في نظام ذكاء اصطناعي ممكن يؤدي لنتايج غير عادلة أو ضارة؟', en: 'Bias in AI judgments due to biased training data?' }, a: { ar: 'التحيز الخوارزمي', en: 'Algorithmic bias' } },
            { q: { ar: 'التقنية اللي بتخلّي البشر يفهموا ليه الـAI أخد حكم معين؟ واختصارها الثلاثي؟', en: 'Technology that lets humans understand why an AI judged? Its 3-letter abbreviation?' }, a: { ar: 'الذكاء الاصطناعي القابل للتفسير (XAI)', en: 'Explainable AI (XAI)' } },
            { q: { ar: 'المبدأ اللي بيقتضي عدم التمييز ظلمًا ضد أي شخص أو مجموعة؟', en: 'Principle requiring no unjust discrimination?' }, a: { ar: 'العدالة', en: 'Fairness' } },
            { q: { ar: 'المبدأ اللي بيقتضي التعامل المناسب مع المعلومات الشخصية؟', en: 'Principle requiring proper handling of personal information?' }, a: { ar: 'حماية الخصوصية', en: 'Privacy protection' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'املأ الفراغات:', en: 'Fill the blanks:' },
            text: { ar: 'ممكن يظهر {0} لما البيانات أو تصميم النظام أو استخدامه يؤدي لنتايج غير عادلة. ولمعالجة مشكلة الصندوق الأسود اتطوّرت أساليب اسمها {1} بتساعد على فهم العوامل المؤثرة في المخرجات. ولما النظام يطلّع قرار غلط أو ضار بتتطرح مسألة {2}، ومفيش معيار واحد يوزّعها بنفس الطريقة في كل السياقات.', en: 'One ethical issue is {0}, where AI is biased because of biased training data. For the black-box problem, a technology called {1} is researched. When AI errs, the question of {2} arises, but no clear standard exists yet.' },
            bank: [{ ar: 'التحيز الخوارزمي', en: 'algorithmic bias' }, { ar: 'الذكاء الاصطناعي القابل للتفسير (XAI)', en: 'explainable AI (XAI)' }, { ar: 'المسؤولية', en: 'responsibility' }, { ar: 'الصيانة التنبؤية', en: 'predictive maintenance' }],
            answer: [0, 1, 2] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار أنسب وصف للقضايا الأخلاقية للـAI:', en: 'Choose the best description of AI ethical issues:' },
            options: [{ ar: 'الـAI آلة محايدة، فمستحيل يكون عنده تحيّز أو قضايا أخلاقية.', en: 'AI is a neutral machine, so it can never be biased or unethical.' }, { ar: 'التحيّز الخوارزمي سببه سرعة المعالجة، مش البيانات اللي اتدرّب عليها.', en: 'Algorithmic bias comes from processing speed, not the training data.' }, { ar: 'تحيّز بيانات التدريب ممكن يسبّب تحيّز تمييزي في أحكام الـAI.', en: 'Biased training data can cause discriminatory AI judgments.' }, { ar: 'غموض طريقة اتخاذ القرار مش مشكلة طالما النتيجة بتطلع بسرعة.', en: 'An opaque decision process is fine as long as results come fast.' }], answer: 2 },
        },
      ],
    },

    /* ───────────── 7 · key terms ───────────── */
    {
      id: 'terms', kind: 'flash',
      title: { ar: 'كروت المصطلحات', en: 'Key-term cards' },
      steps: [{
        type: 'quiz',
        q: { widget: 'flash', cards: [
          { front: { ar: 'التحيز الخوارزمي', en: 'Algorithmic bias' }, back: { ar: 'نمط في مخرجات الـAI ممكن يؤدي لنتايج غير عادلة أو ضارة.', en: 'Bias in AI judgments caused by bias in the training data.' } },
          { front: { ar: 'XAI', en: 'Explainable AI (XAI)' }, back: { ar: 'تقنية بتخلّي البشر يفهموا ليه الـAI أخد حكم معين.', en: 'Technology that lets humans understand why an AI made a judgment.' } },
          { front: { ar: 'الخصوصية', en: 'Privacy' }, back: { ar: 'التعامل المناسب مع البيانات الشخصية وحمايتها.', en: 'Appropriate handling and protection of personal data.' } },
          { front: { ar: 'المسؤولية', en: 'Responsibility' }, back: { ar: 'مين بيتسأل لما حكم الـAI يطلع غلط (مطوّر/مستخدم/مشغّل).', en: 'Who answers when an AI judgment is wrong (developer/user/operator).' } },
          { front: { ar: 'العدالة', en: 'Fairness' }, back: { ar: 'عدم التمييز ظلمًا ضد أي شخص أو مجموعة.', en: 'No unjust discrimination against any person or group.' } },
          { front: { ar: 'الشفافية', en: 'Transparency' }, back: { ar: 'إتاحة معلومات واضحة عن النظام واستخدامه وعملية القرار وحدوده.', en: 'Showing the decision process and inner workings clearly.' } },
          { front: { ar: 'حماية الخصوصية', en: 'Privacy protection' }, back: { ar: 'التعامل المناسب مع المعلومات الشخصية وحماية الخصوصية.', en: 'Handling personal information appropriately.' } },
          { front: { ar: 'المساءلة', en: 'Accountability' }, back: { ar: 'تحديد الجهات المسؤولة عن النظام وقراراته وآثاره وإمكان محاسبتها.', en: 'Being answerable for the AI\'s decisions.' } },
        ] },
      }],
    },

    /* ───────────── 8 · think like an engineer ───────────── */
    {
      id: 'think', kind: 'challenge',
      title: { ar: 'فكّر كمهندس + السؤال المقالي', en: 'Think like an engineer + essay' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', marks: 6, tag: { ar: 'سؤال بنمط الامتحان · 6 درجات', en: 'Exam-style · 6 marks' },
            prompt: { ar: 'حلّل إزاي التحيز الخوارزمي ممكن ينشأ في نظام ذكاء اصطناعي، وإزاي نقلّله. اذكر سبب التحيز وإزاي مبدأي العدالة والشفافية بيساعدوا.', en: 'Analyze how algorithmic bias arises and how to reduce it, referring to its cause and to fairness and transparency.' },
            points: [
              { ar: 'السبب: بيانات تدريب متحيزة أو ناقصة (أو متغير بديل).', en: 'Cause: biased or insufficient training data (or a proxy).' },
              { ar: 'النموذج بيعيد إنتاج التحيز اللي في البيانات.', en: 'The model reproduces the data\'s bias.' },
              { ar: 'العدالة: نفحص البيانات ونختبر النتائج لكل مجموعة.', en: 'Fairness: audit data and test results per group.' },
              { ar: 'الشفافية/XAI: نفهم إزاي بيقرّر فنكتشف التحيز ونصلّحه.', en: 'Transparency/XAI: understand how it decides to find and fix bias.' },
            ],
            model: { ar: 'التحيز الخوارزمي بيحصل لما بيانات التدريب تكون متحيزة أو ناقصة — مثلًا قرارات توظيف قديمة كانت بتظلم مجموعة معينة — فالنموذج بيتعلّم نفس الظلم ويكرّره، وممكن يرجع حتى لو شلنا العمود الحساس بسبب متغير بديل. عشان نقلّله نطبّق مبدأ العدالة: نخلّي البيانات متوازنة وممثّلة لكل المجموعات ونختبر النتائج لكل مجموعة قبل الاستخدام. ومبدأ الشفافية (وXAI) بيخلّينا نفهم إزاي النظام بيقرّر فنكتشف لو بيعتمد على متغير غير عادل ونصلّحه.', en: 'Algorithmic bias arises when training data is biased or incomplete — e.g. past hiring decisions that disadvantaged a group — so the model learns and repeats that unfairness, even after removing the sensitive column, via a proxy variable. Fairness: balance the data, represent all groups, and test results per group before use. Transparency (and XAI): understand how the system decides, so we can spot reliance on an unfair variable and fix it.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مدرسة عايزة كاميرات تعرّف على الوجه على البوابة لتسجيل الحضور. اذكر منفعة وقلق على الخصوصية، ولو الكاميرا غلطت في طالب مين المسؤول؟', en: 'A school wants face-recognition cameras for attendance. One benefit, one privacy concern, and who is responsible if it misidentifies a student?' },
            points: [{ ar: 'منفعة: تسجيل حضور سريع وتلقائي.', en: 'Benefit: fast automatic attendance.' }, { ar: 'قلق: صور ووجوه الطلاب بيانات حساسة/تتبّع.', en: 'Concern: faces are sensitive data / tracking.' }, { ar: 'رأي مبرّر في المسؤولية (المدرسة/الشركة).', en: 'A justified view on responsibility (school/company).' }],
            model: { ar: 'المنفعة: الحضور بيتسجّل بسرعة ومن غير أخطاء ورقية. القلق: صور وجوه الطلاب بيانات شخصية حساسة ممكن تتسرّب أو تُستخدم في تتبّعهم. لو الكاميرا غلطت، أرى إن المدرسة مسؤولة قدام الطالب لأنها اختارت تشغّل النظام، وكمان الشركة مسؤولة عن دقة النموذج — ومفيش توزيع واحد للمسؤولية يصلح لكل الحالات.', en: 'Benefit: attendance is recorded quickly without paper errors. Concern: students\' faces are sensitive personal data that could leak or be used for tracking. If it errs, the school is answerable to the student because it chose to operate the system, while the company is responsible for model accuracy — and there is still no clear standard.' } },
        },
      ],
    },

    /* ───────────── textbook prompts: Pause & Think · Reflect & Challenge ───────────── */
    {
      id: 'reflect', kind: 'challenge',
      title: { ar: 'أسئلة الكتاب: فكّر · تأمّل · تحدّى', en: 'Textbook prompts: think · reflect · challenge' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'استكشف: ذكاء تعرّف على الوجه بيغلط أكتر مع مجموعات عرقية معينة. مين ممكن يتضرّر من ده؟', en: 'Explore: a face-recognition AI misidentifies some ethnic groups more. Who could be harmed?' },
            options: [
              { emoji: '🧍', text: { ar: 'اللي اتعرّف عليه غلط', en: 'The misidentified person' } },
              { emoji: '🏢', text: { ar: 'الشركة', en: 'The company' } },
              { emoji: '👥', text: { ar: 'المجتمع كله', en: 'Society as a whole' } },
              { emoji: '✅', text: { ar: 'كل اللي فات', en: 'All of the above' } },
            ],
            after: { ar: 'ممكن شخص بريء يتّهم غلط، والشركة تخسر الثقة، والمجتمع يفقد العدالة.', en: 'An innocent person may be wrongly accused, the company loses trust, and society loses fairness.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر لحظة', en: 'Pause & think' },
            prompt: { ar: 'كاميرات التعرف على الوجه في الأماكن العامة ممكن تحسّن السلامة والراحة، لكن بتثير مخاوف على الخصوصية. إزاي نوازن بين الراحة والسلامة وحماية الخصوصية؟ وأنهي مبدأ أقرب لرأيك؟', en: 'Face recognition in public adds safety and convenience but threatens privacy. How should we balance them, and which principle is closest to your view?' },
            points: [
              { ar: 'منفعة السلامة/الراحة', en: 'The safety/convenience benefit' },
              { ar: 'خطر الخصوصية', en: 'The privacy risk' },
              { ar: 'قواعد للتوازن + اسم المبدأ', en: 'Balancing rules + the principle named' },
            ],
            model: { ar: 'نستخدم الكاميرات في أماكن محددة لأسباب أمنية واضحة، مع قواعد: البيانات تتمسح بعد مدة قصيرة، ومحدش يشوفها إلا الجهات المسؤولة، والناس تعرف إن فيه كاميرا. ده أقرب لمبدأ حماية الخصوصية.', en: 'Use cameras only in defined places for clear security reasons, with rules: delete footage after a short time, restrict access to responsible bodies, and inform people. This is closest to privacy protection.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس', en: 'Think as an engineer' },
            prompt: { ar: 'دوّر على حالة موثّقة اتّهم فيها نظام ذكاء اصطناعي بالتحيز (واكتب المصدر). إيه الفئة اللي اتأثرت؟ وإيه العوامل في البيانات أو التصميم أو الاستخدام اللي ممكن تكون السبب؟ ومين المسؤول: المطوّر، الشركة المستخدمة، ولا المشغّل؟', en: 'Find a documented case of a biased AI (with source). Who was affected, what data may have caused it, and who is responsible?' },
            points: [
              { ar: 'حالة + مصدر', en: 'A case + source' },
              { ar: 'الفئة المتأثرة + العوامل المحتملة', en: 'Who was harmed + the data cause' },
              { ar: 'مسؤولية كل طرف + قاعدة لتقليل التحيز', en: 'Each party’s responsibility + a rule to reduce bias' },
            ],
            model: { ar: 'مثال معروف: نظام توظيف تجريبي اتعلّم من سير ذاتية قديمة أغلبها لرجال، فبقى يقلّل تقييم المتقدمات (مصدر: تقارير إخبارية سنة 2018). المطوّر مسؤول عن فحص البيانات، والشركة عن اختبار النتائج قبل الاستخدام، والمشغّل عن مراجعة القرارات. القاعدة: اختبار النظام على كل المجموعات قبل تشغيله.', en: 'A known example: an experimental hiring system learned from past CVs mostly from men and downgraded female applicants (news reports, 2018). The developer must audit data, the company must test results before use, the operator must review decisions. Rule: test the system across all groups before deployment.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: الدرس ده غيّر قد إيه ثقتك في قرار ذكاء اصطناعي عنك؟ وأنهي مبدأ من الأربعة أصعب في التطبيق وليه؟ تحدّى: اقترح قاعدة تخلي التوظيف أو التعرف على الوجه أو التوصيات أكتر ثقة.', en: 'Reflect: how has this lesson changed your trust in AI decisions? Which principle is hardest to guarantee and why? Challenge: suggest a rule that makes hiring, face recognition or recommendations more trustworthy.' },
            points: [
              { ar: 'رأي في الثقة', en: 'A view on trust' },
              { ar: 'أصعب مبدأ + سبب', en: 'Hardest principle + reason' },
              { ar: 'قاعدة مبنية على مبدأ', en: 'A rule based on a principle' },
            ],
            model: { ar: 'بقيت أثق بحذر، لازم أعرف ليه قرّر. أصعب مبدأ هو الشفافية لأن نماذج التعلّم العميق معقّدة وصعب تشرح قرارها. القاعدة: أي قرار توظيف بالذكاء الاصطناعي لازم يتشرح للمتقدّم ويقدر يطلب مراجعة بشرية.', en: 'I now trust carefully — I need to know why it decided. Transparency is hardest because deep models are complex to explain. Rule: every AI hiring decision must be explained to the applicant, who can request human review.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '1-4', seconds: 60, items: [
            { text: { ar: 'بيانات التدريب المتحيزة ممكن تسبّب تحيز خوارزمي', en: 'Algorithmic bias comes from biased training data' }, answer: true },
            { text: { ar: 'سبب التحيز الخوارزمي بطء الحاسب', en: 'Algorithmic bias is caused by slow computers' }, answer: false },
            { text: { ar: 'XAI بيشرح ليه الـ AI أخد قراره', en: 'XAI explains why the AI decided' }, answer: true },
            { text: { ar: 'لو النتيجة صح يبقى الغموض مش مشكلة', en: 'If the result is right, opacity is fine' }, answer: false },
            { text: { ar: 'المسؤولية عن خطأ الـ AI محسومة بوضوح', en: 'Responsibility for AI errors is clearly settled' }, answer: false },
            { text: { ar: 'العدالة = عدم التمييز ظلمًا', en: 'Fairness = no unjust discrimination' }, answer: true },
            { text: { ar: 'الشفافية = إظهار طريقة القرار', en: 'Transparency = showing how it decides' }, answer: true },
            { text: { ar: 'المساءلة = تحديد المسؤولين ومحاسبتهم', en: 'Accountability = someone is answerable' }, answer: true },
            { text: { ar: 'المساءلة هي القدرة على شرح القرار', en: 'Accountability is the ability to explain a decision' }, answer: false },
            { text: { ar: 'تتبّع الناس بالكاميرات قضية خصوصية', en: 'Tracking people by camera is a privacy issue' }, answer: true },
            { text: { ar: 'سرعة حوسبة الـ AI قضية خصوصية', en: 'AI computing speed is a privacy issue' }, answer: false },
            { text: { ar: 'المتغير البديل ممكن يرجّع التحيز', en: 'A proxy variable can bring bias back' }, answer: true },
            { text: { ar: 'شيل عمود الجنس بيمنع التحيز تمامًا', en: 'Removing the gender column always prevents bias' }, answer: false },
            { text: { ar: 'جمع بيانات السلوك بكميات كبيرة قضية خصوصية', en: 'Mass collection of behavior data is a privacy issue' }, answer: true },
            { text: { ar: 'المبادئ الأربعة: عدالة، شفافية، خصوصية، مساءلة', en: 'Four principles: fairness, transparency, privacy, accountability' }, answer: true },
            { text: { ar: 'الـ AI ممكن يعيد إنتاج تحيز بياناته', en: 'AI can reproduce its data’s bias' }, answer: true },
            { text: { ar: 'الكمبيوتر دايمًا محايد مهما كانت البيانات', en: 'Computers are always neutral whatever the data' }, answer: false },
        ] },
      }],
    },

    /* ───────────── 9 · lesson test ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 1-4', en: 'Lesson 1-4 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. إيه السبب الرئيسي للتحيز الخوارزمي؟', en: '1. Main cause of algorithmic bias?' }, options: [{ ar: 'بطء معالجة الحاسب', en: 'Slow processing' }, { ar: 'تحيّز بيانات التدريب', en: 'Biased training data' }, { ar: 'كثرة الطبقات المخفية', en: 'Too many hidden layers' }, { ar: 'ضعف الإنترنت', en: 'Weak Internet' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. «تقنية بتخلّي البشر يفهموا ليه الـAI أخد حكم»:', en: '2. "Lets humans understand why an AI judged":' }, options: [{ ar: 'التحيّز الخوارزمي في بيانات التدريب', en: 'Algorithmic bias in the data' }, { ar: 'مشكلة الصندوق الأسود في الذكاء الاصطناعي', en: 'The AI black-box problem' }, { ar: 'الذكاء الاصطناعي القابل للتفسير (XAI)', en: 'Explainable AI (XAI)' }, { ar: 'الصيانة التنبؤية للمصانع والمعدات', en: 'Predictive maintenance in factories' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. «عدم التمييز ظلمًا ضد أي شخص أو مجموعة» — أنهي مبدأ؟', en: '3. "No unjust discrimination" — which principle?' }, options: [{ ar: 'العدالة', en: 'Fairness' }, { ar: 'الشفافية', en: 'Transparency' }, { ar: 'حماية الخصوصية', en: 'Privacy protection' }, { ar: 'المساءلة', en: 'Accountability' }], answer: 0 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. مادام نتيجة الـAI صح، مفيش مشكلة في غموض عملية القرار.', en: '4. An opaque process is fine if the result is correct.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. تحديد المسؤول عن خطأ الـAI محسوم بوضوح بين المطوّر والمستخدم والمشغّل.', en: '5. Responsibility for AI errors is clearly settled.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. الـAI ممكن يعيد إنتاج تحيّز بياناته في أحكامه.', en: '6. AI can reproduce its data\'s bias in its judgments.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. عرّف التحيز الخوارزمي واذكر سببين له.', en: '7. Define algorithmic bias and give two causes.' },
          points: [{ ar: 'تعريف صحيح.', en: 'Correct definition.' }, { ar: 'سببين (بيانات ناقصة عن سمات / تمييز قديم في البيانات / متغير بديل / اختيار متغيرات).', en: 'Two causes (missing data / past discrimination / proxy / variable choice).' }],
          model: { ar: 'التحيز الخوارزمي هو نمط في مخرجات الـAI ممكن يؤدي لنتايج غير عادلة أو ضارة. من أسبابه: بيانات غير كافية عن سمات معينة، وانعكاس نزعات تمييزية قديمة في البيانات.', en: 'Algorithmic bias is bias in AI judgments caused by biased training data. Causes: insufficient data on certain attributes, and past discriminatory tendencies reflected in the data.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اذكر المبادئ الأربعة لأخلاقيات الـAI واربط كل واحد بموقف.', en: '8. Name the four principles and link each to a situation.' },
          points: [{ ar: 'العدالة + موقف.', en: 'Fairness + situation.' }, { ar: 'الشفافية + موقف.', en: 'Transparency + situation.' }, { ar: 'حماية الخصوصية + موقف.', en: 'Privacy protection + situation.' }, { ar: 'المساءلة + موقف.', en: 'Accountability + situation.' }],
          model: { ar: 'العدالة: ذكاء توظيف يقيّم بعدل بغضّ النظر عن الجنس. الشفافية: الإفصاح عن إزاي النظام بيقرّر. حماية الخصوصية: ماتستخدمش البيانات لغرض غير اللي اتجمعت له. المساءلة: المحاسبة لما تشخيص الـAI يطلع غلط.', en: 'Fairness: a hiring AI rating fairly regardless of gender. Transparency: disclosing how the system decides. Privacy protection: not using data beyond its purpose. Accountability: answering for a wrong AI diagnosis.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. إيه «مشكلة الصندوق الأسود» وليه مهم نحلّها؟', en: '9. What is the black-box problem and why does solving it matter?' },
          points: [{ ar: 'مش واضح إزاي الـAI وصل لحكمه.', en: 'Unclear how the AI reached its judgment.' }, { ar: 'حلّها (XAI) بيخلّينا نتحقّق ونكتشف التحيز ونحدد المسؤولية.', en: 'Solving it (XAI) lets us verify, detect bias and assign responsibility.' }],
          model: { ar: 'هي إن عملية قرار الـAI غامضة ومش واضح وصل لحكمه إزاي. حلّها مهم لأنه بيخلّينا نتحقّق من صحة النتيجة، ونكتشف التحيز ونصلّحه، ونعرف مين المسؤول.', en: 'It is when an AI\'s decision process is opaque. Solving it matters so we can verify results, detect and fix bias, and assign responsibility.' } } },
        { type: 'quiz', q: { widget: 'match', prompt: { ar: '10. وصّل كل موقف بالمبدأ:', en: '10. Match each situation to a principle:' }, left: [{ ar: 'نشرح للمستخدم إزاي النظام قرّر', en: 'Explaining how the system decided' }, { ar: 'نحمي بيانات الطلاب', en: 'Protecting students\' data' }, { ar: 'نقيّم الكل بنفس المعايير', en: 'Rating everyone by the same criteria' }], right: [{ ar: 'العدالة', en: 'Fairness' }, { ar: 'الشفافية', en: 'Transparency' }, { ar: 'حماية الخصوصية', en: 'Privacy protection' }], answer: [1, 2, 0] } },
      ],
    },
  ],
});
