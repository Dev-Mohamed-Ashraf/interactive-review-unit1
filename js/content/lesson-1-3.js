/* =========================================================
 * content/lesson-1-3.js — الذكاء الاصطناعي في الحياة اليومية والصناعة
 * Pure data. Sources: textbook 1-3 (EN p.19–25) + memo.
 * ========================================================= */
RV.lessons.add('1-3', {
  id: '1-3',
  color: '#34d399',
  cover: 'img/l3-cover.webp',
  title: { ar: 'الذكاء الاصطناعي في الحياة اليومية والصناعة', en: 'AI in Daily Life and Industry' },
  guiding: { ar: 'فين بنستخدم الذكاء الاصطناعي في حياتنا وفي الصناعة، وإيه اللي هو شاطر فيه، وإيه اللي محتاج حذر؟', en: 'Where is AI used in daily life and industry, what is it good at, and what needs caution?' },
  hook: {
    ar: 'موقع فيديو بيقترح المقطع الجاي، **مساعد صوتي** بيرد على سؤالك، أداة **ترجمة** بتفهّمك منيو أجنبي، وموبايلك بيتفتح بـ**وشّك**. وفي المصانع والمستشفيات الـAI بيحلّل أشعة ويتنبّأ بالأعطال. بس… هل ينفع نسيبه يقرّر كل حاجة لوحده؟',
    en: 'A video site suggests the next clip, a **voice assistant** answers you, a **translation** tool decodes a foreign menu, and your phone unlocks with your **face**. In factories and hospitals AI reads scans and predicts failures. But… should it decide everything alone?',
  },
  keyFact: { ar: 'الذكاء الاصطناعي __شاطر في إيجاد الأنماط في البيانات__، لكن __الحكم البشري__ لسه ضروري لما الموضوع يخص الأخلاق والخصوصية والمسؤولية.', en: 'AI is __good at finding patterns in data__, but __human judgment__ is still needed where ethics, privacy and responsibility are involved.' },
  concepts: ['recommendation system', 'voice assistant', 'machine translation', 'face recognition', 'image-diagnosis AI', 'predictive maintenance', 'black-box problem', 'hallucination'],
  objectives: [
    { ar: 'أذكر أمثلة لاستخدام الذكاء الاصطناعي في الحياة اليومية والصناعات المختلفة.', en: 'Give examples of AI in daily life and various industries.' },
    { ar: 'أشرح إيه اللي الذكاء الاصطناعي شاطر فيه وإيه اللي محتاج حذر.', en: 'Explain what AI is good at and what requires caution.' },
  ],

  stations: [
    /* ───────────── 1 · daily life ───────────── */
    {
      id: 'daily', kind: 'learn',
      title: { ar: 'الذكاء الاصطناعي في جيبك', en: 'AI in your pocket' },
      steps: [
        { type: 'intro' },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: الذكاء الاصطناعي في حياتنا اليومية', en: '🎞️ Animation: AI in daily life' },
          enTitle: 'AI in daily life',
          terms: ['recommendation system', 'voice assistant', 'machine translation', 'face recognition'],
          visual: { anim: 'aiLifeMovie', props: { scenes: [0, 3] } },
          beats: [
            { ar: '🎯 **أنظمة الترشيح:** بتجمع __سلوكك السابق__ (شفت إيه، حبّيت إيه، قعدت قد إيه) و__تتنبّأ بتفضيلاتك__ وتعرضلك توصيات — أمثلة: __YouTube · Amazon · Spotify__.', en: '🎯 **Recommendation systems:** collect __your past behaviour__ (what you watched, liked, stayed on) and __predict your preferences__ to show suggestions — e.g. __YouTube · Amazon · Spotify__.' },
            { ar: '🎙️ **المساعد الصوتي:** ① __يتعرّف على الصوت__ ② __يفهم الأمر__ ③ __ينفّذه__ — «صحّيني 7» ← منبّه 7:00. أمثلة: __Siri · Google Assistant__.', en: '🎙️ **Voice assistants:** ① __recognise the voice__ ② __understand the command__ ③ __execute it__ — “wake me at 7” → a 7:00 alarm. e.g. __Siri · Google Assistant__.' },
            { ar: '🌐 **الترجمة الآلية:** بتترجم النصوص __تلقائيًا__ للغات مختلفة — زي منيو مطعم أجنبي. أمثلة: __Google Translate · DeepL__.', en: '🌐 **Machine translation:** translates text __automatically__ into other languages — like a foreign restaurant menu. e.g. __Google Translate · DeepL__.' },
            { ar: '🙂 **التعرّف على الوجه:** يكتشف ويتعرّف على وجوه الناس في الصور __تلقائيًا__ — زي __فتح قفل الموبايل__. ⚠️ فخ: «الترجمة الآلية = بشر بيترجموا يدويًا» ← __غلط__: هي برنامج ذكاء اصطناعي.', en: '🙂 **Face recognition:** automatically detects and identifies faces in photos — like __unlocking a phone__. ⚠️ Trap: “machine translation = people translating by hand” → __false__: it is AI software.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: 'وصّل', en: 'Match' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل خدمة بالتقنية:', en: 'Match each service with the technology:' },
            left: [
              { ar: 'YouTube بيقترح فيديوهات تناسبك', en: 'YouTube suggests videos you like' },
              { ar: 'بتكلّم الموبايل تسأل عن الطقس', en: 'Asking your phone about the weather' },
              { ar: 'ترجمة موقع أجنبي للغتك', en: 'Translating a foreign website' },
              { ar: 'الكاميرا بتكتشف وش شخص', en: 'The camera detects a face' },
            ],
            right: [{ ar: 'A أنظمة الترشيح', en: 'A Recommendation system' }, { ar: 'B المساعد الصوتي', en: 'B Voice assistant' }, { ar: 'C الترجمة الآلية', en: 'C Machine translation' }, { ar: 'D التعرف على الوجه', en: 'D Face recognition' }],
            answer: [0, 1, 2, 3] },
        },
      ],
    },

    /* ───────────── 2 · industry ───────────── */
    {
      id: 'industry', kind: 'learn',
      title: { ar: 'الذكاء الاصطناعي في الصناعة', en: 'AI in industry' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: الذكاء الاصطناعي في أربع صناعات', en: '🎞️ Animation: AI in four industries' },
          enTitle: 'AI in four industries',
          terms: ['image diagnosis', 'harvest prediction', 'predictive maintenance', 'route optimisation'],
          visual: { anim: 'aiLifeMovie', props: { scenes: [4, 8] } },
          beats: [
            { ar: '🏥 **الرعاية الصحية:** __التشخيص بالصور__ — الـAI يكشف الأمراض من صور __الأشعة السينية والمقطعية__ ويعلّم على المكان المشكوك فيه، و__يدعم اكتشاف الأدوية__. والقرار النهائي للطبيب.', en: '🏥 **Healthcare:** __image diagnosis__ — AI detects disease in __X-ray and CT images__ and flags the suspicious spot, and it __supports drug discovery__. The final decision is the doctor’s.' },
            { ar: '🌾 **الزراعة:** __التنبؤ بميعاد الحصاد__، و__كشف الآفات وأمراض النبات__ بالصور.', en: '🌾 **Agriculture:** __predicting harvest timing__ and __detecting pests and plant disease__ from images.' },
            { ar: '🏭 **التصنيع:** __أتمتة فحص جودة المنتج__ (الكاميرا تطلّع القطعة البايظة) و__الصيانة التنبؤية__: نتنبّأ إن الآلة __هتعطل قبل ما تعطل__.', en: '🏭 **Manufacturing:** __automated quality inspection__ (the camera rejects the faulty item) and __predictive maintenance__: predicting a machine __will fail before it does__.' },
            { ar: '🚚 **اللوجستيات:** __تحسين مسارات التوصيل__ — بدل طريق عشوائي طويل، أقصر مسار بوقت وبنزين أقل.', en: '🚚 **Logistics:** __optimising delivery routes__ — instead of a long random route, the shortest one with less time and fuel.' },
            { ar: '📌 **الخلاصة:** التشخيص بالصور ← __صحة__ · كشف الآفات ← __زراعة__ · الصيانة التنبؤية ← __تصنيع__ · تحسين المسارات ← __لوجستيات__.', en: '📌 **Recap:** image diagnosis → __healthcare__ · pest detection → __agriculture__ · predictive maintenance → __manufacturing__ · route optimisation → __logistics__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: 'صنّف', en: 'Classify' },
          q: { widget: 'classify', prompt: { ar: 'كل استخدام تبع أنهي صناعة؟', en: 'Which industry does each use belong to?' },
            groups: [{ icon: 'heart', label: { ar: 'الصحة', en: 'Healthcare' } }, { icon: 'leaf', label: { ar: 'الزراعة', en: 'Agriculture' } }, { icon: 'factory', label: { ar: 'التصنيع', en: 'Manufacturing' } }, { icon: 'truck', label: { ar: 'اللوجستيات', en: 'Logistics' } }],
            items: [
              { text: { ar: 'تحسين مسارات التوصيل', en: 'Optimising delivery routes' }, group: 3 },
              { text: { ar: 'كشف الأمراض من الأشعة', en: 'Detecting diseases from X-rays' }, group: 0 },
              { text: { ar: 'كشف الآفات والأمراض', en: 'Detecting pests and diseases' }, group: 1 },
              { text: { ar: 'أتمتة فحص الجودة', en: 'Automating quality inspection' }, group: 2 },
            ] },
        },
      ],
    },

    /* ───────────── 3 · good at vs caution ───────────── */
    {
      id: 'caution', kind: 'learn',
      title: { ar: 'شاطر في إيه؟ ومحتاج حذر في إيه؟', en: 'Good at what? Careful with what?' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'لو مستشفى عندها ذكاء اصطناعي بيقرا الأشعة بسرعة… تسيبه يقرّر التشخيص لوحده؟', en: 'If a hospital AI reads X-rays fast… should it decide the diagnosis alone?' },
            options: [
              { emoji: '🤖', text: { ar: 'أيوه، هو أسرع', en: 'Yes, it is faster' } },
              { emoji: '👨‍⚕️', text: { ar: 'لأ، لازم طبيب يراجع', en: 'No, a doctor must review' } },
              { emoji: '⚖️', text: { ar: 'على حسب', en: 'It depends' } },
            ],
            after: { ar: 'تعالى نشوف هو شاطر في إيه… وفين لازم ناخد بالنا 👇', en: 'Let’s see what it is good at… and where to be careful 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: شاطر في إيه؟ ومحتاج حذر في إيه؟', en: '🎞️ Full animation: what AI is good at — and where to be careful' },
          enTitle: 'Strengths, cautions & the black box, scene by scene',
          terms: ['patterns', 'human review', 'black box', 'accountability'],
          visual: { anim: 'cautionMovie' },
          beats: [
            { ar: '💪 الذكاء الاصطناعي __شاطر في__: إيجاد وتصنيف __الأنماط__ في بيانات معقّدة (صور ونصوص)، __التعرّف والتوليد__ للصور والصوت والنص، و__التنبؤ الاحتمالي__ من البيانات.', en: '💪 AI is __good at__: finding and sorting __patterns__ in complex data (images, text), __recognising and generating__ images, audio and text, and __probabilistic prediction__ from data.' },
            { ar: '⚠️ __محتاج حذر في__: الأحكام الأخلاقية، الخصوصية، القرار النهائي (مين المسؤول؟)، البيانات المتحيزة، الهلوسة، حقوق النشر، والصندوق الأسود.', en: '⚠️ It __needs caution in__: ethical judgements, privacy, the final decision (who is responsible?), biased data, hallucination, copyright and the black box.' },
            { ar: '🩻 **الحل:** الـAI __يقترح__ والإنسان __يراجع ويقرّر__ — زي الطبيب اللي لازم يأكّد تشخيص الأشعة، لأن الغلط بيأثر على حياة إنسان.', en: '🩻 **The fix:** AI __suggests__, a human __reviews and decides__ — like the doctor who must confirm an X-ray diagnosis, because a mistake affects a human life.' },
            { ar: '⬛ **مشكلة الصندوق الأسود:** النموذج بياخد قرار (رفض القرض)… بس __مش واضح إزاي وصل له__ — فصعب نتحقّق إنه صح أو نكتشف الغلط.', en: '⬛ **The black-box problem:** the model makes a decision (loan rejected)… but __it is not clear how it got there__ — so it is hard to check it or find the mistake.' },
            { ar: '🔦 جوّه الصندوق: شبكة عصبية فيها __ملايين ومليارات الأرقام (الأوزان)__ — النتيجة واضحة، بس __مفيش سبب مكتوب__ نقدر نقراه.', en: '🔦 Inside the box: a neural network with __millions or billions of numbers (weights)__ — the result is clear, but there is __no written reason__ we can read.' },
            { ar: '🚨 الصندوق الأسود ممكن يأذي في: قرض اترفض · وظيفة (يمكن بسبب تحيّز) · تشخيص طبي · تأمين — عشان كده __لازم إنسان يراجع__ في المهام الحسّاسة.', en: '🚨 The black box can hurt in: a rejected loan · a job (maybe bias) · a medical diagnosis · insurance — so __a human must review__ sensitive tasks.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz',
          q: { widget: 'tf', items: [
            { text: { ar: 'الصندوق الأسود معناه إن الكمبيوتر لونه أسود.', en: 'A black box means the computer is black.' }, answer: false, explain: { ar: 'معناه إن طريقة اتخاذ القرار مش واضحة لينا.', en: 'It means the decision process is not visible to us.' } },
            { text: { ar: 'نماذج التعلّم العميق فيها ملايين الأوزان، فصعب نشرح قرارها.', en: 'Deep-learning models have millions of weights, so their decisions are hard to explain.' }, answer: true },
            { text: { ar: 'من غير ما نعرف «ليه» صعب نكتشف التحيّز في القرار.', en: 'Without knowing "why", it is hard to detect bias in a decision.' }, answer: true },
            { text: { ar: 'مادام النتيجة طلعت صح مرة، يبقى نثق في الصندوق الأسود دايمًا.', en: 'If the result was right once, we can always trust the black box.' }, answer: false },
          ] },
        },
        {
          type: 'quiz',
          q: { widget: 'tf', items: [
            { text: { ar: 'الـAI شاطر في الاستدلال والتنبؤ الاحتمالي من البيانات.', en: 'AI is good at probabilistic reasoning and prediction.' }, answer: true },
            { text: { ar: 'الـAI شاطر في التعرف على الصور والصوت.', en: 'AI is good at recognising images and audio.' }, answer: true },
            { text: { ar: 'عادي نسيب الأحكام الأخلاقية للـAI بالكامل.', en: 'It is fine to leave ethical judgments entirely to AI.' }, answer: false, explain: { ar: 'ممكن تؤدّي لتمييز أو تحيّز.', en: 'They can lead to discrimination or bias.' } },
            { text: { ar: 'أحكام الـAI ممكن تبقى غير دقيقة لو بيانات التدريب متحيزة.', en: 'AI judgments can be inaccurate when training data is biased.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: 'في حياتنا: **الترشيحات · المساعد الصوتي · الترجمة الآلية · التعرف على الوجه**.', en: 'Daily life: **recommendations · voice assistants · machine translation · face recognition**.' },
            { ar: 'في الصناعة: **صحة** (تشخيص بالصور) · **زراعة** (حصاد/آفات) · **تصنيع** (جودة/صيانة تنبؤية) · **لوجستيات** (مسارات).', en: 'Industry: **healthcare** (image diagnosis) · **agriculture** (harvest/pests) · **manufacturing** (quality/predictive maintenance) · **logistics** (routes).' },
            { ar: 'شاطر في __الأنماط والتعرّف والتنبؤ__ · محتاج حذر في __الأخلاق والخصوصية والقرار النهائي__.', en: 'Good at __patterns, recognition, prediction__ · caution for __ethics, privacy, final decisions__.' },
            { ar: '**الصندوق الأسود** = مش واضح إزاي قرّر → لازم إنسان يراجع في المهام الحسّاسة.', en: '**Black box** = unclear how it decided → a human must review sensitive tasks.' },
          ],
        },
      ],
    },

    /* ───────────── 4 · worked examples ───────────── */
    {
      id: 'worked', kind: 'example',
      title: { ar: 'أمثلة الكتاب المحلولة', en: 'Textbook worked examples' },
      steps: [
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(1) وافِق كل خدمة بتقنيتها:', en: '(1) Match each service to its technology:' },
            left: [
              { ar: 'YouTube يقترح فيديوهات تناسب تفضيلاتك', en: 'YouTube recommends videos you like' },
              { ar: 'تكلّم الموبايل تعرف الطقس', en: 'Speaking to your phone for the weather' },
              { ar: 'ترجمة موقع أجنبي للغتك', en: 'Translating a foreign website' },
              { ar: 'الكاميرا تكتشف وش شخص', en: 'Camera detects a face' },
            ],
            right: [{ ar: 'A الترشيح', en: 'A Recommendation' }, { ar: 'B المساعد الصوتي', en: 'B Voice assistant' }, { ar: 'C الترجمة الآلية', en: 'C Machine translation' }, { ar: 'D التعرف على الوجه', en: 'D Face recognition' }],
            answer: [0, 1, 2, 3] },
          solution: [
            { ar: 'a: توصيات حسب تفضيلاتك = **نظام ترشيح** ← A.', en: 'a: recommendations by preference = **recommendation system** → A.' },
            { ar: 'b: التشغيل بالكلام = **مساعد صوتي** ← B.', en: 'b: operating by voice = **voice assistant** → B.' },
            { ar: 'c: لغة أجنبية للغتك = **ترجمة آلية** ← C.', en: 'c: foreign language to yours = **machine translation** → C.' },
            { ar: 'd: اكتشاف الوجه = **تعرف على الوجه** ← D.', en: 'd: detecting a face = **face recognition** → D.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'tf', prompt: { ar: '(2) ضع ✓ أو ✗:', en: '(2) Mark ✓ or ✗:' }, items: [
            { text: { ar: 'الـAI شاطر في الاستدلال والتنبؤ الاحتمالي.', en: 'AI is good at probabilistic reasoning.' }, answer: true },
            { text: { ar: 'الـAI شاطر في التعرف على الصور والصوت.', en: 'AI is good at recognising images and audio.' }, answer: true },
            { text: { ar: 'عادي نسيب الأحكام الأخلاقية للـAI بالكامل.', en: 'Ethical judgments can be left entirely to AI.' }, answer: false },
            { text: { ar: 'البيانات المتحيزة ممكن تخلّي أحكامه غير دقيقة.', en: 'Biased data can make its judgments inaccurate.' }, answer: true },
          ] },
          solution: [
            { ar: 'A و B: من الحاجات اللي هو __شاطر فيها__ ← **✓**.', en: 'A and B: things AI is __good at__ → **✓**.' },
            { ar: 'C: الأحكام الأخلاقية ممكن تؤدي لتمييز، فمش بنسيبها له بالكامل ← **✗**.', en: 'C: ethical judgments can cause discrimination → **✗**.' },
            { ar: 'D: تحيّز بيانات التدريب بيأثّر على الدقة ← **✓**.', en: 'D: biased training data affects accuracy → **✓**.' },
          ],
        },
      ],
    },

    /* ───────────── 5 · textbook practice ───────────── */
    {
      id: 'practice', kind: 'practice',
      title: { ar: 'تدريبات الكتاب (Try + Exercise)', en: 'Textbook practice (Try + Exercise)' },
      steps: [
        {
          type: 'quiz', title: { ar: 'تمرين 1', en: 'Try 1' },
          q: { widget: 'recall', prompt: { ar: 'قول الإجابة وبعدين اكشفها:', en: 'Say it, then reveal:' }, items: [
            { q: { ar: 'النظام اللي بيتنبّأ بالتفضيلات من السلوك السابق ويعرض توصيات؟', en: 'System that predicts preferences from past behaviour and recommends?' }, a: { ar: 'نظام الترشيح', en: 'Recommendation system' } },
            { q: { ar: 'تقنية بتتعرّف على الصوت وتفهم الأوامر وتنفّذها؟', en: 'Technology that recognises voice, understands and executes commands?' }, a: { ar: 'المساعد الصوتي', en: 'Voice assistant' } },
            { q: { ar: 'في أنهي صناعة بيُستخدم الذكاء الاصطناعي للتشخيص بالصور؟', en: 'Which industry uses image-diagnosis AI?' }, a: { ar: 'الرعاية الصحية', en: 'Healthcare' } },
            { q: { ar: 'في التصنيع، اسم النظام اللي بيتنبّأ بأعطال المنتج مقدّمًا؟', en: 'In manufacturing, the system that predicts failures in advance?' }, a: { ar: 'الصيانة التنبؤية', en: 'Predictive maintenance' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي __مش__ من «اللي محتاج حذر»:', en: 'Choose the one NOT among "requires caution":' },
            options: [{ ar: 'الأحكام الأخلاقية (تمييز وتحيّز)', en: 'Ethical judgments (discrimination, bias)' }, { ar: 'إيجاد وتصنيف الأنماط في الصور', en: 'Finding and classifying patterns in images' }, { ar: 'المعلومات الشخصية والخصوصية', en: 'Personal information and privacy' }, { ar: 'القرار النهائي ومين المسؤول عنه', en: 'The final decision and who is responsible' }], answer: 1 },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'املأ الفراغات:', en: 'Fill the blanks:' },
            text: { ar: 'توصيات الفيديوهات اللي تناسب تفضيلاتك جاية من نظام {0}. وبنستخدم الـAI في {1} اللي بنكلّمه عشان يشغّل الموبايل، وفي {2} اللي بتحوّل نص أجنبي للغتنا.', en: 'Video recommendations matching your taste come from a {0} system. AI is also used in the {1} you speak to, and in {2}, which converts foreign text into your language.' },
            bank: [{ ar: 'الترشيح', en: 'recommendation' }, { ar: 'المساعد الصوتي', en: 'voice assistant' }, { ar: 'الترجمة الآلية', en: 'machine translation' }, { ar: 'الصيانة التنبؤية', en: 'predictive maintenance' }],
            answer: [0, 1, 2] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — سؤال 2', en: 'Exercise 2 — Q2' },
          q: { widget: 'mcq', prompt: { ar: 'اختار __كل__ اللي محتاج حذر:', en: 'Choose ALL that require caution:' },
            options: [{ ar: 'المعالجة السريعة لكمية كبيرة من البيانات', en: 'Fast processing of large data' }, { ar: 'الأحكام الأخلاقية', en: 'Ethical judgments' }, { ar: 'أحكام المعلومات الشخصية والخصوصية', en: 'Personal info & privacy judgments' }, { ar: 'التعرف على الصور والصوت', en: 'Image & audio recognition' }], answer: [1, 2] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار __كل__ اللي الـAI شاطر فيه:', en: 'Choose ALL that AI excels at:' },
            options: [{ ar: 'الأحكام الأخلاقية', en: 'Ethical judgments' }, { ar: 'إيجاد الخصائص في الصور والنصوص وتصنيفها', en: 'Finding & classifying features' }, { ar: 'أحكام المعلومات الشخصية', en: 'Personal-info judgments' }, { ar: 'الاستدلال والتنبؤ الاحتمالي', en: 'Probabilistic reasoning & prediction' }, { ar: 'قرارات بتتحمّل مسؤولية النتائج', en: 'Decisions bearing responsibility' }, { ar: 'التعرّف على الصور والصوت والنص وتوليدها', en: 'Recognising & generating images/audio/text' }], answer: [1, 3, 5] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف __غير__ المناسب:', en: 'Choose the INAPPROPRIATE description:' },
            options: [
              { ar: 'نظام الترشيح بيتنبّأ بالتفضيلات من السلوك السابق.', en: 'Recommenders predict preferences from past behaviour.' },
              { ar: 'المساعد الصوتي بيتعرّف على الصوت وينفّذ الأوامر.', en: 'Voice assistants recognise and execute commands.' },
              { ar: 'الترجمة الآلية نظام بيترجم فيه البشر يدويًا.', en: 'Machine translation is humans translating manually.' },
              { ar: 'التعرف على الوجه بيكتشف الوجوه في الصور تلقائيًا.', en: 'Face recognition detects faces automatically.' },
            ], answer: 2 },
        },
      ],
    },

    /* ───────────── 6 · key terms ───────────── */
    {
      id: 'terms', kind: 'flash',
      title: { ar: 'كروت المصطلحات', en: 'Key-term cards' },
      steps: [{
        type: 'quiz',
        q: { widget: 'flash', cards: [
          { front: { ar: 'نظام الترشيح', en: 'Recommendation system' }, back: { ar: 'يتنبّأ بالتفضيلات من بيانات السلوك السابق ويعرض توصيات.', en: 'Predicts preferences from past behaviour data and displays recommendations.' } },
          { front: { ar: 'المساعد الصوتي', en: 'Voice assistant' }, back: { ar: 'يتعرّف على الصوت ويفهم الأوامر وينفّذها.', en: 'Recognises a voice, understands commands and executes them.' } },
          { front: { ar: 'الترجمة الآلية', en: 'Machine translation' }, back: { ar: 'تترجم النصوص تلقائيًا للغات مختلفة.', en: 'Automatically translates text into different languages.' } },
          { front: { ar: 'التعرف على الوجه', en: 'Face recognition' }, back: { ar: 'يكتشف ويتعرّف على وجوه الأشخاص في الصور تلقائيًا.', en: 'Automatically detects and identifies faces in photos.' } },
          { front: { ar: 'الصيانة التنبؤية', en: 'Predictive maintenance' }, back: { ar: 'التنبؤ بأعطال المنتج/الآلة مقدّمًا (تصنيع).', en: 'Predicting product/machine failures in advance (manufacturing).' } },
          { front: { ar: 'مشكلة الصندوق الأسود', en: 'Black-box problem' }, back: { ar: 'عدم وضوح إزاي الذكاء الاصطناعي وصل لحكمه.', en: 'When it is unclear how an AI reached its judgment.' } },
          { front: { ar: 'الهلوسة', en: 'Hallucination' }, back: { ar: 'توليد محتوى يبدو صحيح لكنه مخالف للحقائق.', en: 'Generating content that differs from the facts.' } },
        ] },
      }],
    },

    /* ───────────── 7 · think like an engineer ───────────── */
    {
      id: 'think', kind: 'challenge',
      title: { ar: 'فكّر كمهندس + السؤال المقالي', en: 'Think like an engineer + essay' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', marks: 6, tag: { ar: 'سؤال بنمط الامتحان · 6 درجات', en: 'Exam-style · 6 marks' },
            prompt: { ar: 'حلّل ليه الـAI مناسب لبعض المهام ومحتاج حذر في غيرها. اذكر اللي هو شاطر فيه (الأنماط، التعرّف، التنبؤ) واللي محتاج حذر (الأخلاق، الخصوصية، القرار النهائي).', en: 'Analyze why AI suits some tasks but needs caution in others: what it is good at (patterns, recognition, prediction) and what needs caution (ethics, privacy, final decisions).' },
            points: [
              { ar: 'شاطر في الأنماط/التعرّف/التنبؤ لأنها مهام إحصائية من بيانات كتير.', en: 'Good at patterns/recognition/prediction because they are statistical tasks from lots of data.' },
              { ar: 'محتاج حذر في الأحكام الأخلاقية (تحيّز وتمييز).', en: 'Caution in ethical judgments (bias, discrimination).' },
              { ar: 'الخصوصية والمعلومات الشخصية.', en: 'Privacy and personal information.' },
              { ar: 'القرار النهائي ومين المسؤول + الصندوق الأسود → إنسان يراجع.', en: 'Final decisions & responsibility + black box → human review.' },
            ],
            model: { ar: 'الذكاء الاصطناعي بيتعلّم من ملايين الأمثلة، فهو ممتاز في المهام الإحصائية زي إيجاد الأنماط وتصنيف الصور والتنبؤ من البيانات. لكنه محتاج حذر في الأحكام الأخلاقية لأنه ممكن يكون متحيز لو بياناته متحيزة، وفي الخصوصية لأنه بيستخدم بيانات شخصية، وفي القرار النهائي لأن مش واضح مين المسؤول ومش واضح إزاي وصل لحكمه (الصندوق الأسود). عشان كده لازم إنسان يراجع النتيجة في المهام الحسّاسة.', en: 'AI learns from millions of examples, so it excels at statistical tasks like finding patterns, classifying images and predicting from data. It needs caution in ethical judgments (it can be biased if its data is), in privacy (it uses personal data), and in final decisions (unclear responsibility, black-box reasoning). So a human must review sensitive results.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر', en: 'Think it through' },
            prompt: { ar: 'مستشفى عايزة تستخدم ذكاء اصطناعي يكشف الأمراض من الأشعة. ليه التشخيص النهائي لازم يأكّده طبيب بشري؟', en: 'A hospital wants AI to detect diseases from X-rays. Why must a human doctor confirm the final diagnosis?' },
            points: [{ ar: 'الغلط بيأثر على حياة إنسان.', en: 'A mistake affects a human life.' }, { ar: 'الـAI ممكن يغلط بثقة / بيانات متحيزة / صندوق أسود.', en: 'AI can be confidently wrong / biased / a black box.' }, { ar: 'مسؤولية القرار لازم تكون على إنسان.', en: 'Responsibility must rest with a human.' }],
            model: { ar: 'لأن خطأ التشخيص بيأثر على حياة المريض، والذكاء الاصطناعي ممكن يغلط وهو واثق أو يكون متحيز، ومش دايمًا بيشرح ليه قرّر. فالطبيب بيراجع ويتحمّل مسؤولية القرار النهائي.', en: 'A misdiagnosis affects a patient\'s life; AI can be confidently wrong or biased and may not explain its reasoning. The doctor reviews it and takes responsibility for the final decision.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مكتبة المدرسة عايزة ذكاء اصطناعي يرشّح كتب للطلاب حسب استعارتهم السابقة. اشرح هيشتغل إزاي، واذكر تنبيه لازم المدرسة تاخد بالها منه.', en: 'A school library wants AI to recommend books from past borrowing. Explain how it works and one caution.' },
            points: [{ ar: 'نظام ترشيح يتنبّأ من بيانات الاستعارة السابقة.', en: 'A recommender predicts from past borrowing data.' }, { ar: 'تنبيه: الخصوصية / يحصر الطالب في نوع واحد.', en: 'Caution: privacy / trapping students in one genre.' }],
            model: { ar: 'النظام هيحلّل الكتب اللي كل طالب استعارها قبل كده، ويتنبّأ بتفضيلاته، ويرشّحله كتب شبهها. لكن لازم المدرسة تحمي خصوصية بيانات الطلاب، وتتأكد إن النظام مايحصرش الطالب في نوع واحد بس من الكتب.', en: 'It analyses each student\'s past loans, predicts preferences and suggests similar books. The school must protect students\' data privacy and make sure it does not trap a student in only one kind of book.' } },
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
          q: { widget: 'poll', prompt: { ar: 'استكشف: من الخدمات اللي استخدمتها الأسبوع ده (فيديو مقترح، مساعد صوتي، ترجمة…) — أنهي واحدة لو غلطت هتفرق معاك أكتر؟', en: 'Explore: of the AI services you used this week — which one would matter most if it made a mistake?' },
            options: [
              { emoji: '🎬', text: { ar: 'ترشيح الفيديوهات', en: 'Video recommendations' } },
              { emoji: '🎤', text: { ar: 'المساعد الصوتي', en: 'Voice assistant' } },
              { emoji: '🌐', text: { ar: 'الترجمة', en: 'Translation' } },
              { emoji: '🔓', text: { ar: 'فتح الموبايل بالوش', en: 'Face unlock' } },
            ],
            after: { ar: 'فكّر: إيه البيانات اللي كل خدمة محتاجاها عشان تشتغل؟', en: 'Think: what data does each service need to work?' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر لحظة', en: 'Pause & think' },
            prompt: { ar: 'خدمات الذكاء الاصطناعي بتستخدم بياناتك الشخصية (اللي بتشوفه وتشتريه وتقوله). ليه ده بيثير قلق على الخصوصية؟ ومين المفروض يقرّر إزاي بياناتك تُستخدم؟', en: 'AI services use your personal data. Why does this raise privacy concerns, and who should decide how your data is used?' },
            points: [
              { ar: 'البيانات ممكن تتسرّب أو تُستخدم لغرض تاني', en: 'Data may leak or be used for other purposes' },
              { ar: 'رأي في مين يقرر (المستخدم بموافقته + قوانين)', en: 'A view on who decides (the user’s consent + laws)' },
            ],
            model: { ar: 'لأن البيانات دي بتكشف عادات الشخص وأماكنه واهتماماته، وممكن تتسرّب أو تتباع أو تُستخدم في حاجة ماوافقش عليها. المفروض صاحب البيانات هو اللي يقرر بموافقته، مع قوانين تحمي الخصوصية.', en: 'This data reveals habits, places and interests, and may leak, be sold or used without consent. The data owner should decide through consent, backed by privacy laws.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس', en: 'Think as an engineer' },
            prompt: { ar: 'اختار صناعة (صحة / تصنيع / لوجستيات) ودوّر على مثال حقيقي لاستخدام الذكاء الاصطناعي فيها واكتب مصدره. اذكر منفعة وتنبيه، وقرّر: يستخدموه لوحده ولا مع مراجعة إنسان؟', en: 'Pick an industry, find a real documented AI example (with source), give a benefit and a caution, and decide: alone or with a human checking?' },
            points: [
              { ar: 'مثال حقيقي + مصدر', en: 'A real example + source' },
              { ar: 'منفعة + تنبيه', en: 'A benefit + a caution' },
              { ar: 'قرار + سببين', en: 'A decision + two reasons' },
            ],
            model: { ar: 'مثال: مصانع بتستخدم كاميرات بالذكاء الاصطناعي لفحص جودة المنتجات (مصدر: موقع الشركة المصنعة). المنفعة: سرعة ودقة في اكتشاف العيوب. التنبيه: ممكن يغلط في عيب جديد. القرار: مع مراجعة إنسان للحالات المشكوك فيها، لأن الغلط مكلف والمسؤولية لازم تكون على حد.', en: 'Example: factories use AI cameras for quality inspection (source: manufacturer site). Benefit: fast, precise defect detection. Caution: it may miss a new kind of defect. Decision: with human review of doubtful cases — mistakes are costly and someone must be responsible.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: أنهي استخدام للذكاء الاصطناعي في الدرس فاجئك؟ وفين في حياتك الذكاء الاصطناعي بياخد قرارات عنك؟ تحدّى: اقترح قاعدة تخلي استخدامه أأمن في مهمة حساسة.', en: 'Reflect: which AI use surprised you, and where does AI make decisions about you? Challenge: suggest a rule that makes AI safer in a sensitive task.' },
            points: [
              { ar: 'استخدام فاجئك + مكان بياخد فيه قرارات عنك', en: 'A surprising use + where it decides about you' },
              { ar: 'قاعدة واضحة لمهمة حساسة', en: 'A clear rule for a sensitive task' },
            ],
            model: { ar: 'فاجئني إن الذكاء الاصطناعي بيتنبأ بأعطال الآلات قبل ما تحصل. وفي حياتي بيقرّر الفيديوهات والإعلانات اللي بتظهرلي. القاعدة: في التشخيص الطبي، القرار النهائي لازم يكون للطبيب، والنظام يوضّح سبب اقتراحه.', en: 'It surprised me that AI predicts machine failures before they happen; in my life it decides which videos and ads I see. Rule: in medical diagnosis the doctor makes the final decision, and the system must show why it suggested it.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '1-3', seconds: 60, items: [
            { text: { ar: 'YouTube بيستخدم نظام ترشيح', en: 'YouTube uses a recommendation system' }, answer: true },
            { text: { ar: 'المساعد الصوتي بيترجم القوائم الأجنبية', en: 'A voice assistant translates menus' }, answer: false },
            { text: { ar: 'فتح الموبايل بالوش = تعرّف على الوجه', en: 'Face unlock = face recognition' }, answer: true },
            { text: { ar: 'الترجمة الآلية بيعملها بشر يدويًا', en: 'Machine translation is done by hand' }, answer: false },
            { text: { ar: 'الصيانة التنبؤية في التصنيع', en: 'Predictive maintenance is in manufacturing' }, answer: true },
            { text: { ar: 'تحسين مسارات التوصيل في الزراعة', en: 'Route optimisation is in agriculture' }, answer: false },
            { text: { ar: 'كشف الأمراض من الأشعة في الرعاية الصحية', en: 'Disease detection from X-rays is healthcare' }, answer: true },
            { text: { ar: 'كشف الآفات استخدام زراعي', en: 'Pest detection is agricultural' }, answer: true },
            { text: { ar: 'الـ AI شاطر في إيجاد الأنماط', en: 'AI is good at finding patterns' }, answer: true },
            { text: { ar: 'نسيب الأحكام الأخلاقية للـ AI بالكامل', en: 'Leave ethical judgments entirely to AI' }, answer: false },
            { text: { ar: 'البيانات المتحيزة بتقلل دقة الـ AI', en: 'Biased data reduces AI accuracy' }, answer: true },
            { text: { ar: 'الصندوق الأسود = مش واضح إزاي قرّر', en: 'Black box = unclear how it decided' }, answer: true },
            { text: { ar: 'القرار النهائي في المهام الحساسة للإنسان', en: 'Humans make final decisions in sensitive tasks' }, answer: true },
            { text: { ar: 'المعالجة السريعة للبيانات من قائمة الحذر', en: 'Fast data processing is a caution item' }, answer: false },
            { text: { ar: 'الـ AI ممكن يكون واثق وهو غلطان', en: 'AI can be confidently wrong' }, answer: true },
            { text: { ar: 'حقوق النشر في بيانات التدريب من قضايا الحذر', en: 'Copyright in training data is a caution' }, answer: true },
        ] },
      }],
    },

    /* ───────────── 8 · lesson test ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 1-3', en: 'Lesson 1-3 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. «يتنبّأ بالتفضيلات من السلوك السابق ويعرض توصيات»:', en: '1. "Predicts preferences from past behaviour and recommends":' }, options: [{ ar: 'المساعد الصوتي', en: 'Voice assistant' }, { ar: 'نظام الترشيح', en: 'Recommendation system' }, { ar: 'الترجمة الآلية', en: 'Machine translation' }, { ar: 'التعرف على الوجه', en: 'Face recognition' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. الصيانة التنبؤية مثال على الـAI في أنهي صناعة؟', en: '2. Predictive maintenance belongs to which industry?' }, options: [{ ar: 'الرعاية الصحية', en: 'Healthcare' }, { ar: 'الزراعة', en: 'Agriculture' }, { ar: 'التصنيع', en: 'Manufacturing' }, { ar: 'الخدمات اللوجستية', en: 'Logistics' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. أيّ دول __مش__ من اللي محتاج حذر؟', en: '3. Which is NOT a caution item?' }, options: [{ ar: 'الأحكام الأخلاقية زي التمييز', en: 'Ethical judgments such as discrimination' }, { ar: 'إيجاد الأنماط في البيانات', en: 'Finding patterns in data' }, { ar: 'القرار النهائي في حالة مهمة', en: 'The final decision in a serious case' }, { ar: 'حماية البيانات الشخصية', en: 'Protecting personal data' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. ينفع نسيب الأحكام الأخلاقية للـAI بالكامل بلا مشكلة.', en: '4. Ethical judgments can be left entirely to AI.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. أحكام الـAI ممكن تبقى غير دقيقة لما بيانات التدريب تكون متحيزة.', en: '5. Biased training data can make AI judgments inaccurate.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. «مشكلة الصندوق الأسود» = مش واضح إزاي الـAI وصل لحكمه.', en: '6. The black-box problem = unclear how the AI reached its judgment.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'match', prompt: { ar: '7. وصّل كل استخدام بصناعته:', en: '7. Match each use to its industry:' }, left: [{ ar: 'تحسين مسارات التوصيل', en: 'Optimising delivery routes' }, { ar: 'كشف الأمراض من الأشعة', en: 'Detecting diseases from X-rays' }, { ar: 'كشف الآفات', en: 'Detecting pests' }], right: [{ ar: 'الصحة', en: 'Healthcare' }, { ar: 'الزراعة', en: 'Agriculture' }, { ar: 'اللوجستيات', en: 'Logistics' }], answer: [2, 0, 1] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. ليه لازم طبيب بشري يأكّد تشخيص الـAI من صور الأشعة؟', en: '8. Why must a human doctor confirm an AI X-ray diagnosis?' },
          points: [{ ar: 'الخطأ بيأثر على حياة إنسان.', en: 'An error affects a life.' }, { ar: 'الـAI ممكن يغلط / مسؤولية القرار على الإنسان.', en: 'AI can err / the human bears responsibility.' }],
          model: { ar: 'لأن الخطأ بيأثر على حياة المريض، والـAI ممكن يغلط وهو واثق، فالطبيب بيراجع ويتحمّل مسؤولية القرار.', en: 'Because an error affects the patient\'s life and AI can be confidently wrong; the doctor reviews and takes responsibility.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اذكر ميزة وتنبيه لإدخال الـAI في الزراعة.', en: '9. Give one advantage and one caution of AI in agriculture.' },
          points: [{ ar: 'ميزة: كشف الآفات بدري / التنبؤ بموعد الحصاد.', en: 'Advantage: early pest detection / harvest prediction.' }, { ar: 'تنبيه: تكلفة / بيانات قليلة أو متحيزة / محتاج مراجعة بشرية.', en: 'Caution: cost / scarce or biased data / needs human review.' }],
          model: { ar: 'ميزة: يكتشف الآفات والأمراض بدري ويتنبّأ بأنسب موعد للحصاد. تنبيه: لو بيانات التدريب قليلة أو من بيئة مختلفة ممكن يغلط، فلازم المزارع يراجع.', en: 'Advantage: detects pests early and predicts the best harvest time. Caution: with scarce or unrepresentative data it may err, so the farmer should verify.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. اشرح بمثال «مشكلة الصندوق الأسود» وليه بتخلّي الاعتماد الكامل على الـAI خطر.', en: '10. Explain the black-box problem with an example and why full reliance is risky.' },
          points: [{ ar: 'مثال: نظام رفض طلب وظيفة من غير ما نعرف ليه.', en: 'Example: a system rejects a job application without saying why.' }, { ar: 'مانقدرش نتحقّق أو نكتشف التحيز ونصلّحه.', en: 'We cannot verify it or detect and fix bias.' }],
          model: { ar: 'مثلًا نظام توظيف رفض متقدّم ومحدش عارف ليه. لو مش فاهمين إزاي قرّر، مانقدرش نتأكد إن القرار صح أو نكتشف لو فيه تحيّز ونصلّحه، فالاعتماد عليه بالكامل خطر.', en: 'E.g. a hiring system rejects an applicant and nobody knows why. If we cannot see how it decided, we cannot verify the decision or detect and fix bias, so full reliance is risky.' } } },
      ],
    },
  ],
});
