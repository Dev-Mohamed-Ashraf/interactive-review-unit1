/* =========================================================
 * content/lesson-1-2.js — كيف يعمل الذكاء الاصطناعي
 * Pure data. Sources: textbook 1-2 (EN p.12–18) + memo.
 * ========================================================= */
RV.lessons.add('1-2', {
  id: '1-2',
  color: '#a78bfa',
  cover: 'img/l2-cover.webp',
  title: { ar: 'كيف يعمل الذكاء الاصطناعي', en: 'How AI Works' },
  guiding: { ar: 'يعني إيه ذكاء اصطناعي، وإيه العلاقة بين التعلّم الآلي والتعلّم العميق والذكاء الاصطناعي التوليدي؟', en: 'What is AI, and how are machine learning, deep learning and generative AI related?' },
  hook: {
    ar: 'لما تمسك موبايلك، الذكاء الاصطناعي شغّال وراك: **فلتر السبام** بيرتّب إيميلك، المتجر بيـ**رشّحلك** منتجات، تطبيق **الترجمة** بيحوّل لغة لتانية، و**ChatGPT** بيولّد نص من طلبك. كلهم ذكاء اصطناعي… بس مش من نفس النوع!',
    en: 'When you use your phone, AI is at work: a **spam filter** sorts email, a store **recommends** products, a **translation** app converts languages, and **ChatGPT** generates text. All are AI… but not the same kind!',
  },
  keyFact: { ar: 'الذكاء الاصطناعي مجال واسع، والتعلّم الآلي والتعلّم العميق والتوليدي __فئات متداخلة جوّاه__ — مش أربع تقنيات منفصلة جنب بعض.', en: 'AI is a broad field; ML, DL and generative AI are __nested categories inside it__ — not four separate parallel technologies.' },
  concepts: ['AI', 'machine learning', 'deep learning', 'neural network', 'generative AI', 'hallucination'],
  objectives: [
    { ar: 'أشرح يعني إيه ذكاء اصطناعي.', en: 'Explain what AI is.' },
    { ar: 'أوضّح موقع الذكاء الاصطناعي التوليدي بين تقنيات الذكاء الاصطناعي.', en: 'Explain where generative AI sits within AI technologies.' },
    { ar: 'أفرّق بين القواعد المكتوبة يدويًا والتعلّم من البيانات.', en: 'Distinguish hand-written rules from learning from data.' },
  ],

  stations: [
    /* ───────────── 1 · what is AI ───────────── */
    {
      id: 'what', kind: 'learn',
      title: { ar: 'يعني إيه ذكاء اصطناعي؟ الدوائر المتداخلة', en: 'What is AI? The nested circles' },
      steps: [
        { type: 'intro' },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: يعني إيه ذكاء اصطناعي؟ وعيلته المتداخلة', en: '🎞️ Animation: what is AI? Its nested family' },
          enTitle: 'What AI is, scene by scene',
          terms: ['AI', 'machine learning', 'deep learning', 'generative AI'],
          visual: { anim: 'aiMovie' },
          beats: [
            { ar: '📱 الموبايل مليان ذكاء اصطناعي: __فلتر السبام__ بيرتّب إيميلك، المتجر بيـ__رشّحلك__ منتجات، تطبيق __الترجمة__ بيحوّل لغة لتانية، و__ChatGPT__ بيولّد نص من طلبك. **كلهم AI… بس مش من نفس النوع!**', en: '📱 Your phone is full of AI: a __spam filter__ sorts e-mail, a store __recommends__ products, a __translation__ app converts languages, and __ChatGPT__ writes text from a prompt. **All AI… but not the same kind!**' },
            { ar: '🧠 **الذكاء الاصطناعي (AI):** __مصطلح عام__ لتقنيات بتخلّي الحاسب __يعيد إنتاج أو ينفّذ سلوك إنساني ذكي__ — زي __التعلّم والاستدلال والحكم__. أمثلة يومية: __التعرّف على الكلام__ · __التعرّف على الصور__ · __الترجمة__.', en: '🧠 **Artificial intelligence (AI):** a __general term__ for technologies that make a computer __reproduce or perform intelligent human behaviour__ — __learning, reasoning, judgement__. Everyday examples: __speech recognition__ · __image recognition__ · __translation__.' },
            { ar: '🎯 ذكاء النهارده **«ضيّق»**: كل نظام __بارع في مهمة واحدة بس__ — روبوت الترجمة لو اديته صورة يتلخبط. الإنسان بقى عنده __ذكاء عام__ يعمل حاجات كتير.', en: '🎯 Today’s AI is **“narrow”**: each system is __expert at one task only__ — hand the translation robot a photo and it is lost. A human has __general intelligence__ for many tasks.' },
            { ar: '⭕ **العيلة المتداخلة** — كل دايرة جوّه اللي قبلها: **AI** (الأوسع، حتى الأنظمة بالقواعد — مثال: الترجمة) ⊃ **التعلّم الآلي** (فلتر السبام · التوصيات) ⊃ **التعلّم العميق** (تحليل صور القيادة الذاتية · تركيب الكلام) ⊃ **التوليدي** (ChatGPT · توليد الصور). من __الأوسع__ للـ__أكثر تخصصًا__.', en: '⭕ **The nested family** — each circle inside the last: **AI** (the broadest, even rule-based systems — e.g. translation) ⊃ **machine learning** (spam filter · recommendations) ⊃ **deep learning** (image analysis for self-driving · speech synthesis) ⊃ **generative AI** (ChatGPT · image generation). From the __broadest__ to the __most specialised__.' },
            { ar: '⚠️ **متداخلة مش متوازية:** دول __مش 4 تقنيات منفصلة جنب بعض__. فخاخ: «AI و ML نفس المعنى» ← __غلط__ (AI المجال الواسع) · «DL منفصل عن ML» ← __غلط__ (DL نوع متقدّم جوّه ML).', en: '⚠️ **Nested, not parallel:** these are __not 4 separate side-by-side technologies__. Traps: “AI and ML mean the same” → __false__ (AI is the broad field) · “DL is separate from ML” → __false__ (DL is an advanced kind inside ML).' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: 'رتّب الدوائر', en: 'Order the circles' },
          q: { widget: 'order', prompt: { ar: 'رتّب من الأوسع للأكثر تخصصًا:', en: 'Order from broadest to most specialised:' },
            items: [{ ar: 'الذكاء الاصطناعي', en: 'AI' }, { ar: 'التعلّم الآلي', en: 'Machine learning' }, { ar: 'التعلّم العميق', en: 'Deep learning' }, { ar: 'الذكاء الاصطناعي التوليدي', en: 'Generative AI' }],
            explain: { ar: 'AI ⊃ ML ⊃ DL ⊃ GenAI', en: 'AI ⊃ ML ⊃ DL ⊃ GenAI' } },
        },
      ],
    },

    /* ───────────── 2 · machine learning ───────────── */
    {
      id: 'ml', kind: 'learn',
      title: { ar: 'التعلّم الآلي: الحاسب بيتعلّم من الأمثلة', en: 'Machine learning: learning from examples' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'إزاي فلتر السبام في الإيميل بيعرف إن الرسالة مزعجة؟', en: 'How does an email spam filter know a message is spam?' },
            options: [
              { emoji: '✍️', text: { ar: 'مبرمج كتب كل قاعدة بإيده', en: 'A programmer wrote every rule' } },
              { emoji: '📚', text: { ar: 'اتعلّم من أمثلة كتير', en: 'It learned from many examples' } },
              { emoji: '🎲', text: { ar: 'بالصدفة', en: 'By chance' } },
            ],
            after: { ar: 'تعالى نشوف الطريقتين قدام بعض 👇', en: 'Let’s compare both ways 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: إزاي الحاسب بيتعلّم من الأمثلة؟', en: '🎞️ Animation: how does a computer learn from examples?' },
          enTitle: 'Machine learning, scene by scene',
          terms: ['machine learning', 'data', 'training', 'model', 'prediction'],
          visual: { anim: 'learnMovie' },
          beats: [
            { ar: '📜 **الطريقة القديمة:** المبرمج بيكتب __قاعدة ثابتة بإيده__: «لو الإيميل فيه free ← سبام». المحتال كتب __fr€e__ ← الإيميل عدّى و__القاعدة اتكسرت__. ومستحيل تكتب قاعدة لكل حالة!', en: '📜 **The old way:** the programmer writes a __fixed rule by hand__: “if the e-mail has free → spam”. The scammer wrote __fr€e__ → it got through and __the rule broke__. You can’t write a rule for everything!' },
            { ar: '📚 **الطريقة الجديدة (التعلّم الآلي):** بدل القواعد، بنديله __أمثلة كتير ومع كل مثال الإجابة الصح__ (سبام / سليم) — دي اسمها __البيانات المتعلّم عليها__.', en: '📚 **The new way (machine learning):** instead of rules we give it __many examples, each with the right answer__ (spam / OK) — that is __labelled data__.' },
            { ar: '⚙️ **التدريب:** الحاسب بيدوّر في البيانات و__يكتشف الأنماط بنفسه__: «فلوس ببلاش» و«جايزة» غالبًا سبام، «واجب» و«حصة» غالبًا سليم. __محدش كتب له القاعدة__ — وفي الآخر بيطلع __النموذج__.', en: '⚙️ **Training:** the computer searches the data and __finds the patterns itself__: “free money” and “prize” are usually spam, “homework” and “class” usually OK. __Nobody wrote the rule__ — and out comes __the model__.' },
            { ar: '🔮 **التنبؤ:** إيميل جديد __عمره ما شافه__ ← النموذج بيحكم: «مبروك كسبت فلوس» سبام 94% · «ميعاد الدرس اتغيّر» سبام 6% بس ← سليم. ده تعريف **التعلّم الآلي:** يتعلّم __أنماط من البيانات__ عشان __يتنبّأ ويحكم__.', en: '🔮 **Prediction:** a new e-mail it __has never seen__ → the model judges: “You won money” 94% spam · “Class time changed” only 6% → OK. That is **machine learning:** learning __patterns from data__ to __predict and judge__.' },
            { ar: '🛒 **نفس الفكرة في التوصيات:** المتجر بيتعلّم من __مشترياتك القديمة__ ويرشّحلك حاجة جديدة. فلتر السبام والتوصيات __شغلهم مختلف__، بس __الاتنين تعلّم آلي__: بيانات قديمة ← أنماط ← تنبؤ.', en: '🛒 **Same idea in recommendations:** the store learns from __your past purchases__ and suggests something new. Spam filters and recommendations __do different jobs__, but __both are machine learning__: past data → patterns → prediction.' },
            { ar: '📌 **الخلاصة:** قواعد مكتوبة بالإيد = __ثابتة وبتتكسر__ · التعلّم الآلي = __قواعد متعلّمة من البيانات__. الخطوات: __بيانات ← تدريب ← نموذج ← تنبؤ__.', en: '📌 **Recap:** hand-written rules = __fixed and they break__ · machine learning = __rules learned from data__. The steps: __data → training → model → prediction__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz',
          q: { widget: 'tf', items: [
            { text: { ar: 'التعلّم الآلي بيتعلّم أنماط من البيانات عشان يعمل تنبؤات وأحكام.', en: 'Machine learning learns patterns from data to make predictions and judgments.' }, answer: true },
            { text: { ar: 'التعلّم الآلي يقدر يشتغل من غير أي بيانات خالص.', en: 'Machine learning can work with no data at all.' }, answer: false, explain: { ar: 'هو أصلًا بيتعلّم من البيانات.', en: 'It learns from data by definition.' } },
            { text: { ar: 'فلتر الرسائل المزعجة مثال على التعلّم الآلي.', en: 'A spam filter is an example of machine learning.' }, answer: true },
          ] },
        },
      ],
    },

    /* ───────────── 3 · deep learning & neural networks ───────────── */
    {
      id: 'dl', kind: 'learn',
      title: { ar: 'التعلّم العميق والشبكات العصبية', en: 'Deep learning & neural networks' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: الشبكة العصبية والتعلّم العميق', en: '🎞️ Animation: neural networks and deep learning' },
          enTitle: 'Neural networks & deep learning, scene by scene',
          terms: ['neural network', 'layers', 'weights', 'training', 'deep learning'],
          visual: { anim: 'dlMovie' },
          beats: [
            { ar: '🧠 **الشبكة العصبية:** نظام __مستوحى من خلايا المخ العصبية (العصبونات)__ — __مكوّنات بسيطة كتير متوصّلة__ في طبقات: __إدخال ← طبقات مخفية ← إخراج__. بتتعلّم من البيانات وتاخد __أحكام معقّدة__.', en: '🧠 **Neural network:** a system __modelled on the brain’s nerve cells (neurons)__ — __many simple connected units__ in layers: __input → hidden layers → output__. It learns from data and makes __complex judgements__.' },
            { ar: '⚡ صورة من كاميرا عربية ذاتية القيادة بتدخل الشبكة، والإشارة __بتعدّي طبقة ورا طبقة__ لحد الإخراج: «مشاة». و__كل وصلة ليها وزن__ بيحدّد قوة الإشارة — الوصلة السميكة أقوى.', en: '⚡ A frame from a self-driving car’s camera enters the network and the signal __passes layer by layer__ to the output: “pedestrian”. __Every link has a weight__ that sets the signal’s strength — a thick link is stronger.' },
            { ar: '🏋️ **التدريب:** أول محاولة الشبكة __غلطت__ ← الغلطة بترجع لورا و__الأوزان بتتغيّر شوية شوية__ ← بعد آلاف الأمثلة الحكم بقى صح: مشاة 97%.', en: '🏋️ **Training:** on the first try the network __was wrong__ → the error travels back and __the weights change little by little__ → after thousands of examples it gets it right: pedestrian 97%.' },
            { ar: '📚 **التعلّم العميق:** تقنية متقدّمة __جوّه التعلّم الآلي__ = شبكات بـ__طبقات مخفية كتير__ + __بيانات ضخمة__ (ملايين الصور). __بيكتشف الخصائص بنفسه__ طبقة ورا طبقة (حواف ← أشكال ← مشاة). أمثلة: __تحليل صور القيادة الذاتية__ · __تركيب الكلام__. والشبكات العصبية هي __التقنية الأساسية ورا تقدّم الذكاء الاصطناعي__.', en: '📚 **Deep learning:** an advanced technology __inside machine learning__ = networks with __many hidden layers__ + __huge data__ (millions of images). It __discovers the features itself__ layer by layer (edges → shapes → pedestrian). Examples: __image analysis for self-driving__ · __speech synthesis__. Neural networks are __the core technology behind recent AI progress__.' },
            { ar: '🌾 **في سياق جديد:** مزارع عايز يفرّق __المحصول السليم من المريض__ بالصور ← الشبكة لازم تتدرّب على __آلاف الصور المعنونة «سليم / مريض»__. ولو ظهر __مرض نادر__ مااتدرّبتش عليه ← __ممكن تغلط__.', en: '🌾 **In a new context:** a farmer wants to tell __healthy crops from diseased ones__ in photos → the network must train on __thousands of photos labelled “healthy / diseased”__. A __rare disease__ it never trained on → __it may be wrong__.' },
            { ar: '💡 **الخلاصة:** شبكة عصبية بطبقات مستوحاة من المخ · __أوزان بتتظبط بالتدريب__ · التعلّم العميق = __طبقات كتير + بيانات ضخمة__ · الحاجة __النادرة في بياناته__ ← غالبًا بيغلط فيها.', en: '💡 **The point:** a layered neural network modelled on the brain · __weights tuned by training__ · deep learning = __many layers + huge data__ · something __rare in its data__ → it often gets it wrong.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz',
          q: { widget: 'mcq', prompt: { ar: '«تقنية بتستخدم الشبكات العصبية عشان تتعلّم أنماط معقّدة من بيانات ضخمة» — دي إيه؟', en: '"Uses neural networks to learn complex patterns from large data" — which?' },
            options: [{ ar: 'الذكاء الاصطناعي', en: 'AI' }, { ar: 'التعلّم الآلي', en: 'Machine learning' }, { ar: 'التعلّم العميق', en: 'Deep learning' }, { ar: 'القواعد المكتوبة يدويًا', en: 'Hand-written rules' }], answer: 2 },
        },
      ],
    },

    /* ───────────── 4 · generative AI ───────────── */
    {
      id: 'genai', kind: 'learn',
      title: { ar: 'الذكاء الاصطناعي التوليدي والهلوسة', en: 'Generative AI & hallucination' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: الذكاء التوليدي والهلوسة', en: '🎞️ Animation: generative AI and hallucination' },
          enTitle: 'Generative AI & hallucination, scene by scene',
          terms: ['generative AI', 'prompt', 'hallucination', 'verify'],
          visual: { anim: 'genaiMovie' },
          beats: [
            { ar: '✨ **الذكاء الاصطناعي التوليدي:** بيستخدم __التعلّم العميق__ عشان __يولّد بيانات جديدة__. نكتبله __طلب (prompt)__: «اكتب جملتين عن النيل» ← يكتب نص __ماكانش موجود قبل كده__.', en: '✨ **Generative AI:** uses __deep learning__ to __generate new data__. We write a __prompt__: “write two lines about the Nile” → it writes text __that did not exist before__.' },
            { ar: '🎨 ومش نص بس: __نص · صور · صوت · برامج__ — كلها محتوى جديد __مبني على الأنماط اللي اتعلّمها من بيانات التدريب__. أمثلة: __ChatGPT__ و__أدوات توليد الصور__.', en: '🎨 Not only text: __text · images · audio · programs__ — all new content __built on patterns learned from its training data__. Examples: __ChatGPT__ and __image-generation tools__.' },
            { ar: '🔤 **بيكتب إزاي؟** __كلمة ورا كلمة__: في كل خطوة بيختار كلمة __«شكلها مناسب»__ بنسبة احتمال اتعلّمها من ملايين النصوص — __مابيدوّرش في قاعدة حقائق__ ومابيتأكدش إنها صح.', en: '🔤 **How does it write?** __Word by word__: each step it picks a word that __“looks right”__ by a probability learned from millions of texts — it __does not look facts up__ or check they are true.' },
            { ar: '😵 **الهلوسة:** كتب «برج القاهرة اتبنى سنة 1890» __بثقة كاملة__ — والمصدر الموثوق بيقول __1961__! الهلوسة = النموذج التوليدي يطلّع كلام __يبدو معقول ومقنع لكنه غلط__.', en: '😵 **Hallucination:** it wrote “the Cairo Tower was built in 1890” __with total confidence__ — a reliable source says __1961__! Hallucination = a generative model producing __fluent, convincing but wrong__ output.' },
            { ar: '🧩 **أشكالها:** __حقيقة مزيفة__ · __مرجع أو كتاب مش موجود أصلًا__ · __رقم أو حساب غلط__ — وبتزيد لما المعلومة __نادرة أو مش موجودة في بيانات التدريب__.', en: '🧩 **Its forms:** a __fake fact__ · a __source or book that does not exist__ · a __wrong number or sum__ — more likely when the info is __rare or missing from the training data__.' },
            { ar: '📄 **تقرير المدرسة:** المنفعة __سرعة وأفكار__، والخطر __معلومة غلط__ — فـ__ماتنقلش إجابته زي ما هي__. تحمي نفسك: ① راجع مصدر موثوق ② اطلب المرجع واتأكد منه ③ قارن مصدرين ④ استخدمه للأفكار مش للحقيقة النهائية ⑤ افهم واكتب بأسلوبك.', en: '📄 **Your school report:** the benefit is __speed and ideas__, the risk is __a false fact__ — so __never paste its answer as-is__. Protect yourself: ① check a reliable source ② ask for the source and verify it ③ compare two sources ④ use it for ideas, not final facts ⑤ understand and write it yourself.' },
            { ar: '⚠️ **فخاخ الامتحان:** فلتر السبام __مش__ توليدي (تعلّم آلي __بيصنّف__) · التوليدي مبني على __التعلّم العميق__ مش تعلّم آلي عادي · وماتحطّش إجابته في التقرير زي ما هي — __اتحقّق واكتب بفهمك__.', en: '⚠️ **Exam traps:** a spam filter is __not__ generative (it is machine learning that __classifies__) · generative AI is built on __deep learning__, not ordinary ML · and never paste its answer into a report as-is — __verify and write it yourself__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: 'اكتشف الهلوسة 🕵️', en: 'Spot the hallucination 🕵️' },
          q: { widget: 'mcq', prompt: { ar: 'سألنا شات ذكاء اصطناعي عن الهرم الأكبر فكتب الجمل دي. اختار __كل__ الجمل اللي فيها هلوسة:', en: 'We asked an AI chatbot about the Great Pyramid and it wrote these sentences. Select ALL the hallucinated ones:' },
            options: [
              { ar: 'الهرم الأكبر موجود في الجيزة.', en: 'The Great Pyramid is in Giza.' },
              { ar: 'اتبنى في عهد الملك خوفو.', en: 'It was built for King Khufu.' },
              { ar: 'ارتفاعه الأصلي كان حوالي 146 متر.', en: 'Its original height was about 146 m.' },
              { ar: 'اتبنى سنة 1200 ميلادي.', en: 'It was built in 1200 AD.' },
              { ar: 'نجيب محفوظ كتب عنه كتاب اسمه «أسرار الجيزة» سنة 1950.', en: 'Naguib Mahfouz wrote a book about it called "Secrets of Giza" in 1950.' },
            ],
            answer: [3, 4],
            explain: { ar: 'الهرم اتبنى من حوالي 4500 سنة (مش 1200 ميلادي) ← حقيقة مزيفة. وكتاب «أسرار الجيزة» مش موجود أصلًا ← مرجع مخترع. لاحظ إنهم مكتوبين بنفس ثقة الجمل الصح!', en: 'The pyramid is about 4,500 years old (not 1200 AD) → a fake fact. And "Secrets of Giza" does not exist → an invented source. Notice they were written as confidently as the true ones!' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**الذكاء الاصطناعي** مصطلح عام لتقنيات بتنفّذ سلوك إنساني ذكي على الحاسب.', en: '**AI** is a general term for technologies that perform intelligent human behaviour on a computer.' },
            { ar: 'الفئات متداخلة: `AI ⊃ ML ⊃ DL ⊃ GenAI` — مش أربع تقنيات منفصلة.', en: 'The categories are nested: `AI ⊃ ML ⊃ DL ⊃ GenAI` — not four separate technologies.' },
            { ar: '**التعلّم الآلي** يتعلّم أنماط من البيانات · **التعلّم العميق** يستخدم شبكات عصبية وبيانات ضخمة · **التوليدي** يولّد محتوى جديد.', en: '**ML** learns patterns from data · **DL** uses neural networks + big data · **GenAI** generates new content.' },
            { ar: 'الذكاء التوليدي ممكن __يهلوس__ — راجع المصدر دايمًا.', en: 'Generative AI can __hallucinate__ — always check the source.' },
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
            { text: { ar: 'التعلّم الآلي واحدة من التقنيات اللي بتشغّل الذكاء الاصطناعي.', en: 'Machine learning is one of the technologies that make AI work.' }, answer: true },
            { text: { ar: 'التعلّم العميق تقنية مختلفة تمامًا عن التعلّم الآلي.', en: 'Deep learning is completely different from machine learning.' }, answer: false },
            { text: { ar: 'الذكاء التوليدي بيستخدم التعلّم العميق عشان يولّد بيانات جديدة.', en: 'Generative AI uses deep learning to generate new data.' }, answer: true },
            { text: { ar: 'الذكاء الاصطناعي والتعلّم الآلي ليهم نفس المعنى.', en: 'AI and machine learning mean the same thing.' }, answer: false },
          ] },
          solution: [
            { ar: 'أ) التعلّم الآلي إحدى تقنيات التعلّم اللي بتشغّل الـ AI ← **✓**.', en: 'A) ML is one of the learning technologies that power AI → **✓**.' },
            { ar: 'ب) التعلّم العميق __نوع متقدّم جوّه__ التعلّم الآلي ← **✗**.', en: 'B) DL is __an advanced kind within__ ML → **✗**.' },
            { ar: 'ج) ده التعريف الصحيح للتوليدي ← **✓**.', en: 'C) Correct description of generative AI → **✓**.' },
            { ar: 'د) الـ AI مفهوم واسع والتعلّم الآلي تقنية جوّاه ← **✗**.', en: 'D) AI is broad; ML is one technology inside it → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف بالمصطلح:', en: '(2) Match each description to the term:' },
            left: [
              { ar: 'بيتعلّم أنماط من البيانات عشان يتنبّأ ويحكم', en: 'Learns patterns from data to predict and judge' },
              { ar: 'بيستخدم شبكات عصبية لتعلّم أنماط معقّدة', en: 'Uses neural networks to learn complex patterns' },
              { ar: 'بيولّد بيانات جديدة زي النصوص والصور', en: 'Generates new data such as text and images' },
            ],
            right: [{ ar: 'A التعلّم الآلي', en: 'A Machine learning' }, { ar: 'B التعلّم العميق', en: 'B Deep learning' }, { ar: 'C الذكاء التوليدي', en: 'C Generative AI' }],
            answer: [0, 1, 2] },
          solution: [
            { ar: 'a: تعلّم أنماط من البيانات = **التعلّم الآلي** ← A.', en: 'a: learning patterns from data = **machine learning** → A.' },
            { ar: 'b: شبكات عصبية = **التعلّم العميق** ← B.', en: 'b: neural networks = **deep learning** → B.' },
            { ar: 'c: توليد بيانات جديدة = **الذكاء التوليدي** ← C.', en: 'c: generating new data = **generative AI** → C.' },
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
          q: { widget: 'recall', prompt: { ar: 'قول الإجابة وبعدين اكشفها:', en: 'Say the answer, then reveal:' }, items: [
            { q: { ar: 'المصطلح العام (اختصار من حرفين) لتقنيات بتنفّذ سلوك إنساني ذكي على الحاسب؟', en: 'The general term (two-letter abbreviation) for technologies performing intelligent human behaviour on a computer?' }, a: { ar: 'AI — الذكاء الاصطناعي', en: 'AI — Artificial Intelligence' } },
            { q: { ar: 'تقنية التعلّم اللي بتتعلّم أنماط من البيانات لعمل تنبؤات وأحكام؟', en: 'The learning technology that learns patterns from data to predict and judge?' }, a: { ar: 'التعلّم الآلي', en: 'Machine learning' } },
            { q: { ar: 'التقنية المتقدّمة جوّه التعلّم الآلي اللي بتستخدم شبكات عصبية؟', en: 'The advanced technology within ML that uses neural networks?' }, a: { ar: 'التعلّم العميق', en: 'Deep learning' } },
            { q: { ar: 'تقنية الذكاء الاصطناعي اللي بتستخدم التعلّم العميق لتوليد بيانات جديدة؟', en: 'The AI technology that uses deep learning to generate new data?' }, a: { ar: 'الذكاء الاصطناعي التوليدي', en: 'Generative AI' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الصحيح للعلاقة:', en: 'Choose the correct relationship:' },
            options: [{ ar: 'AI > تعلّم عميق > تعلّم آلي > توليدي', en: 'AI > DL > ML > GenAI' }, { ar: 'تعلّم آلي > AI > توليدي > تعلّم عميق', en: 'ML > AI > GenAI > DL' }, { ar: 'AI > تعلّم آلي > تعلّم عميق > توليدي', en: 'AI > ML > DL > GenAI' }, { ar: 'توليدي > تعلّم عميق > تعلّم آلي > AI', en: 'GenAI > DL > ML > AI' }], answer: 2 },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي __مش__ مثال على الذكاء التوليدي:', en: 'Choose the one that is NOT generative AI:' },
            options: [{ ar: 'ChatGPT لما يكتبلك موضوع تعبير', en: 'ChatGPT writing an essay for you' }, { ar: 'ذكاء بيرسم صورة من وصف مكتوب', en: 'AI that draws a picture from a description' }, { ar: 'فلتر الرسائل المزعجة في الإيميل', en: 'The spam filter in your email' }, { ar: 'ذكاء بيولّد صوت شبه صوت الإنسان', en: 'AI that generates a human-like voice' }], answer: 2, explain: { ar: 'فلتر السبام بيصنّف، مش بيولّد.', en: 'A spam filter classifies; it does not generate.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرأ الفقرة واملأ الفراغات:', en: 'Read and fill the blanks:' },
            text: {
              ar: 'المصطلح العام لتقنيات بتنفّذ سلوك إنساني ذكي على الحاسب هو {0}. وإحدى تقنيات التعلّم اللي بتتعلّم الأنماط من البيانات هي {1}. وجوّاها تقنية متقدّمة بتستخدم الشبكات العصبية هي {2}. والتقنية اللي بتستخدمها لتوليد بيانات جديدة هي {3}.',
              en: 'The general term for technologies performing intelligent human behaviour on a computer is {0}. One learning technology that learns patterns from data is {1}. Within it, an advanced technology using neural networks is {2}. The technology using that to generate new data is {3}.',
            },
            bank: [{ ar: 'الذكاء الاصطناعي', en: 'AI' }, { ar: 'التعلّم الآلي', en: 'machine learning' }, { ar: 'التعلّم العميق', en: 'deep learning' }, { ar: 'الذكاء التوليدي', en: 'generative AI' }, { ar: 'الحوسبة السحابية', en: 'cloud computing' }],
            answer: [0, 1, 2, 3] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1) — صنّف', en: 'Exercise 3 (1) — classify' },
          q: { widget: 'classify', prompt: { ar: 'كل مثال أقرب لأنهي تقنية؟', en: 'Which technology is each example closest to?' },
            groups: [{ icon: 'mail', label: { ar: 'التعلّم الآلي', en: 'Machine learning' } }, { icon: 'network', label: { ar: 'التعلّم العميق', en: 'Deep learning' } }, { icon: 'sparkle', label: { ar: 'التوليدي', en: 'Generative AI' } }],
            items: [
              { text: { ar: 'تصنيف السبام تلقائيًا', en: 'Sorting spam automatically' }, group: 0 },
              { text: { ar: 'التعرف على المشاة في القيادة الذاتية', en: 'Recognising pedestrians in self-driving' }, group: 1 },
              { text: { ar: 'توليد صور جديدة من نص', en: 'Generating new images from text' }, group: 2 },
              { text: { ar: 'توصية منتجات حسب تاريخ الشراء', en: 'Recommending products from purchase history' }, group: 0 },
            ] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار أنسب وصف للعلاقة:', en: 'Choose the best description of the relationship:' },
            options: [
              { ar: 'التعلّم الآلي نوع من الـ AI، والتعلّم العميق نوع من التعلّم الآلي.', en: 'ML is a type of AI, and DL is a type of ML.' },
              { ar: 'الـ AI نوع من التعلّم الآلي، والتعلّم العميق نوع من الذكاء التوليدي.', en: 'AI is a type of ML, and DL is a type of generative AI.' },
              { ar: 'التعلّم العميق والتعلّم الآلي تقنيتين منفصلتين ومالهمش علاقة ببعض.', en: 'DL and ML are two separate technologies with no relation.' },
              { ar: 'الذكاء التوليدي بيولّد بيانات جديدة من غير ما يستخدم التعلّم الآلي.', en: 'GenAI creates new data without using machine learning at all.' },
            ], answer: 0 },
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
          { front: { ar: 'الذكاء الاصطناعي (AI)', en: 'Artificial Intelligence (AI)' }, back: { ar: 'مصطلح عام لتقنيات بتعيد إنتاج أو تنفّذ سلوك إنساني ذكي (تعلّم، استدلال، حكم) على الحاسب.', en: 'General term for technologies that reproduce or perform intelligent human behaviour on a computer.' } },
          { front: { ar: 'التعلّم الآلي', en: 'Machine learning' }, back: { ar: 'يتعلّم أنماط من البيانات لعمل تنبؤات وأحكام.', en: 'Learns patterns from data to make predictions and judgments.' } },
          { front: { ar: 'التعلّم العميق', en: 'Deep learning' }, back: { ar: 'تقنية متقدّمة داخل التعلّم الآلي تستخدم الشبكات العصبية على بيانات ضخمة.', en: 'Advanced ML using neural networks on large-scale data.' } },
          { front: { ar: 'الشبكة العصبية', en: 'Neural network' }, back: { ar: 'نظام مستوحى من خلايا المخ العصبية؛ مكوّنات كتير متوصّلة بتتعلّم من البيانات وتاخد أحكام معقّدة.', en: 'Modelled on brain neurons; many connected components that learn from data and make complex judgments.' } },
          { front: { ar: 'الذكاء الاصطناعي التوليدي', en: 'Generative AI' }, back: { ar: 'يستخدم التعلّم العميق لتوليد بيانات جديدة (نص، صور، صوت، برامج).', en: 'Uses deep learning to generate new data (text, images, audio, programs).' } },
          { front: { ar: 'الهلوسة', en: 'Hallucination' }, back: { ar: 'إن النموذج التوليدي يطلّع نص يبدو معقول لكنه غلط.', en: 'A generative model producing fluent but factually wrong output.' } },
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
            prompt: { ar: 'حلّل العلاقة بين الذكاء الاصطناعي والتعلّم الآلي والتعلّم العميق والذكاء التوليدي. استخدم فكرة الفئات المتداخلة، وهات مثال لكل واحد.', en: 'Analyze the relationship between AI, ML, DL and generative AI using nested categories, with one example of each.' },
            points: [
              { ar: 'AI مجال واسع (مثال: الترجمة).', en: 'AI is the broad field (e.g. translation).' },
              { ar: 'ML جوّه AI ويتعلّم من البيانات (مثال: فلتر السبام).', en: 'ML is inside AI and learns from data (e.g. spam filter).' },
              { ar: 'DL جوّه ML ويستخدم شبكات عصبية (مثال: التعرف على المشاة).', en: 'DL is inside ML and uses neural networks (e.g. pedestrian recognition).' },
              { ar: 'التوليدي جوّه DL ويولّد محتوى (مثال: ChatGPT).', en: 'GenAI is inside DL and generates content (e.g. ChatGPT).' },
            ],
            model: { ar: 'الذكاء الاصطناعي هو المجال الأوسع لأي تقنية بتقلّد السلوك الذكي، زي الترجمة. جوّاه التعلّم الآلي اللي بيتعلّم أنماط من البيانات بدل القواعد المكتوبة، زي فلتر السبام. وجوّه التعلّم الآلي التعلّم العميق اللي بيستخدم شبكات عصبية وبيانات ضخمة، زي التعرف على المشاة في القيادة الذاتية. وجوّه التعلّم العميق الذكاء التوليدي اللي بيولّد محتوى جديد، زي ChatGPT. يعني دي فئات متداخلة من الأوسع للأكثر تخصصًا مش تقنيات منفصلة.', en: 'AI is the broadest field — any technology imitating intelligent behaviour, e.g. translation. Inside it, ML learns patterns from data instead of hand-written rules, e.g. spam filters. Inside ML, DL uses neural networks and big data, e.g. pedestrian recognition. Inside DL, generative AI creates new content, e.g. ChatGPT. They are nested categories, broad to specialised — not separate technologies.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مزارع عايز يستخدم الذكاء الاصطناعي عشان يفرّق المحاصيل السليمة من المريضة بالصور. يتعلّم من إيه؟ واذكر سبب ممكن يخلّي حكمه غلط.', en: 'A farmer wants AI to tell healthy from diseased crops in photos. What must it learn from, and why might it be wrong?' },
            points: [
              { ar: 'يتعلّم من آلاف الصور المعنونة «سليم/مريض».', en: 'Learns from thousands of labelled healthy/diseased photos.' },
              { ar: 'تعلّم عميق لتحليل الصور.', en: 'Deep learning for image analysis.' },
              { ar: 'سبب للخطأ: مرض نادر مااتدرّبش عليه / صور قليلة / إضاءة مختلفة.', en: 'Error cause: rare disease not in training / too few images / different lighting.' },
            ],
            model: { ar: 'النموذج محتاج يتدرّب بالتعلّم العميق على آلاف الصور لنباتات معنونة «سليم» و«مريض» عشان يكتشف الأنماط. ممكن يغلط لو ظهر مرض نادر ماكانش في بيانات التدريب، أو لو الصور اتصوّرت في إضاءة مختلفة عن اللي اتدرّب عليها.', en: 'The model must be trained with deep learning on thousands of photos labelled "healthy" and "diseased" to learn the patterns. It may be wrong on a rare disease missing from its training data, or on photos taken in very different lighting.' } },
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
          q: { widget: 'poll', prompt: { ar: 'استكشف: اكتب في دماغك 3 حاجات موبايلك بيعملها وشكلها محتاجة «ذكاء». تفتكر الكمبيوتر فيها بيمشي على قواعد ثابتة ولا بيتعلّم من أمثلة؟', en: 'Explore: think of 3 things your phone does that need "intelligence". Fixed rules or learning from examples?' },
            options: [
              { emoji: '📏', text: { ar: 'قواعد ثابتة', en: 'Fixed rules' } },
              { emoji: '📚', text: { ar: 'بيتعلّم من أمثلة', en: 'Learns from examples' } },
              { emoji: '🔀', text: { ar: 'الاتنين', en: 'Both' } },
            ],
            after: { ar: 'غالبًا الاتنين — بس الحاجات الذكية فعلًا (الترجمة، التوصيات، التعرف على الصوت) بتتعلّم من البيانات.', en: 'Usually both — but the truly smart ones (translation, recommendations, speech) learn from data.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر لحظة', en: 'Pause & think' },
            prompt: { ar: 'فلتر السبام وتوصيات المنتجات الاتنين تعلّم آلي رغم إن شغلهم مختلف. إيه المشترك بينهم من ناحية طريقة عمل الذكاء الاصطناعي؟', en: 'Spam filters and recommendations are both ML though their jobs differ. What do they share in how they work?' },
            points: [
              { ar: 'الاتنين بيتعلّموا أنماط من بيانات سابقة', en: 'Both learn patterns from past data' },
              { ar: 'الاتنين بيستخدموا الأنماط للتنبؤ/الحكم على حاجة جديدة', en: 'Both use the patterns to predict/judge something new' },
            ],
            model: { ar: 'الاتنين مابيمشوش على قواعد مكتوبة بإيد المبرمج، لكن بيتعلّموا أنماط من بيانات سابقة (إيميلات معنونة أو تاريخ شراء)، وبيستخدموها عشان يتنبّأوا بحاجة جديدة: الإيميل ده سبام؟ المستخدم ده هيحب المنتج ده؟', en: 'Neither follows hand-written rules; both learn patterns from past data (labelled emails or purchase history) and use them to predict something new: is this email spam? will this user like this product?' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس', en: 'Think as an engineer' },
            prompt: { ar: 'قاعدة للمدرسة: هل نسمح باستخدام الذكاء التوليدي في الواجبات؟ اذكر منفعة وخطر للطالب وللمدرس، واقترح قاعدة واحدة بسببين.', en: 'A school rule: allow generative AI for homework? One benefit and one risk for student and teacher; propose one rule with two reasons.' },
            points: [
              { ar: 'منفعة (سرعة/أفكار/شرح)', en: 'A benefit (speed / ideas / explanations)' },
              { ar: 'خطر (هلوسة/نقل بدون فهم)', en: 'A risk (hallucination / copying without understanding)' },
              { ar: 'قاعدة + سببين', en: 'A rule + two reasons' },
            ],
            model: { ar: 'نسمح بيه للمساعدة في الفهم والأفكار بشرط إن الطالب يتحقق من المعلومات من مصدر موثوق ويكتب بأسلوبه ويذكر إنه استخدمه — لأن ده بيفيد التعلم، وبيحمي من الهلوسة والغش.', en: 'Allow it for understanding and ideas, provided students verify facts with reliable sources, write in their own words and declare its use — it helps learning while guarding against hallucination and cheating.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تحدّى: الذكاء التوليدي بيعمل نص وصور وصوت. اقترح استخدام مفيد واحد، وسوء استخدام واحد، وإزاي نقلّل سوء الاستخدام ده.', en: 'Challenge: suggest one helpful use of generative AI, one misuse, and how to reduce the misuse.' },
            points: [
              { ar: 'استخدام مفيد', en: 'A helpful use' },
              { ar: 'سوء استخدام', en: 'A misuse' },
              { ar: 'طريقة تقليل', en: 'A way to reduce it' },
            ],
            model: { ar: 'مفيد: يشرح درس صعب بأمثلة. سوء استخدام: صور أو أصوات مزيفة (Deepfake) لنشر أخبار كاذبة. التقليل: علامات تبيّن إن المحتوى معمول بالذكاء الاصطناعي، والتحقق من المصادر قبل النشر.', en: 'Helpful: explaining a hard lesson with examples. Misuse: fake images/voices (deepfakes) spreading false news. Reduce: labels showing content is AI-made, and verifying sources before sharing.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '1-2', seconds: 60, items: [
            { text: { ar: 'التعلّم الآلي جوّه الذكاء الاصطناعي', en: 'ML is inside AI' }, answer: true },
            { text: { ar: 'الذكاء الاصطناعي والتعلّم الآلي نفس المعنى', en: 'AI and ML mean the same' }, answer: false },
            { text: { ar: 'التعلّم العميق بيستخدم شبكات عصبية', en: 'Deep learning uses neural networks' }, answer: true },
            { text: { ar: 'التعلّم العميق منفصل تمامًا عن التعلّم الآلي', en: 'DL is totally separate from ML' }, answer: false },
            { text: { ar: 'ChatGPT مثال على الذكاء التوليدي', en: 'ChatGPT is generative AI' }, answer: true },
            { text: { ar: 'فلتر السبام ذكاء توليدي', en: 'A spam filter is generative AI' }, answer: false },
            { text: { ar: 'الشبكة العصبية مستوحاة من خلايا المخ', en: 'Neural networks are inspired by brain cells' }, answer: true },
            { text: { ar: 'التعلّم الآلي يشتغل من غير بيانات', en: 'ML works without data' }, answer: false },
            { text: { ar: 'التعلّم العميق محتاج بيانات ضخمة', en: 'DL needs large-scale data' }, answer: true },
            { text: { ar: 'الهلوسة = كلام مقنع لكنه غلط', en: 'Hallucination = convincing but wrong' }, answer: true },
            { text: { ar: 'مخرجات الذكاء التوليدي دايمًا صح', en: 'GenAI output is always correct' }, answer: false },
            { text: { ar: 'الترتيب: AI ⊃ ML ⊃ DL ⊃ GenAI', en: 'Order: AI ⊃ ML ⊃ DL ⊃ GenAI' }, answer: true },
            { text: { ar: 'توصية المنتجات مثال على التعلّم الآلي', en: 'Product recommendation is ML' }, answer: true },
            { text: { ar: 'الذكاء التوليدي بيولّد صور وصوت كمان', en: 'GenAI also generates images and audio' }, answer: true },
            { text: { ar: 'القواعد المكتوبة بإيد المبرمج = تعلّم آلي', en: 'Hand-written rules = machine learning' }, answer: false },
            { text: { ar: 'ذكاء اليوم «ضيّق»: بارع في مهمة واحدة', en: 'Today’s AI is narrow: good at one task' }, answer: true },
        ] },
      }],
    },

    /* ───────────── 9 · lesson test ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 1-2', en: 'Lesson 1-2 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. أيّ ترتيب متداخل صحيح؟', en: '1. Which nested order is correct?' }, options: [
          { ar: 'AI ⊃ تعلم عميق ⊃ تعلّم آلي ⊃ توليدي', en: 'AI ⊃ DL ⊃ ML ⊃ GenAI' }, { ar: 'AI ⊃ تعلّم آلي ⊃ تعلم عميق ⊃ توليدي', en: 'AI ⊃ ML ⊃ DL ⊃ GenAI' }, { ar: 'توليدي ⊃ تعلم عميق ⊃ تعلّم آلي ⊃ AI', en: 'GenAI ⊃ DL ⊃ ML ⊃ AI' }, { ar: 'تعلّم آلي ⊃ AI ⊃ توليدي ⊃ تعلم عميق', en: 'ML ⊃ AI ⊃ GenAI ⊃ DL' },
        ], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. أيّ دول مش ذكاء توليدي؟', en: '2. Which is NOT generative AI?' }, options: [{ ar: 'ChatGPT وهو بيجاوب أسئلتك', en: 'ChatGPT answering your questions' }, { ar: 'أداة بترسم صورة من جملة بتكتبها', en: 'A tool that makes a picture from a sentence' }, { ar: 'فلتر السبام في الإيميل', en: 'The spam (junk mail) filter' }, { ar: 'أداة بتألّف موسيقى جديدة', en: 'A tool that composes new music' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. «تستخدم الشبكات العصبية لتعلّم أنماط معقّدة من بيانات ضخمة»:', en: '3. "Uses neural networks to learn complex patterns from big data":' }, options: [{ ar: 'الذكاء الاصطناعي', en: 'AI' }, { ar: 'التعلّم الآلي', en: 'Machine learning' }, { ar: 'التعلّم العميق', en: 'Deep learning' }, { ar: 'الذكاء التوليدي', en: 'Generative AI' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. التعلّم الآلي جوّه الـ AI، والتعلّم العميق جوّه التعلّم الآلي.', en: '4. ML sits inside AI; DL sits inside ML.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. الذكاء التوليدي بيستخدم تعلّم آلي عادي مش تعلّم عميق.', en: '5. Generative AI uses ordinary ML, not deep learning.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. الشبكة العصبية مستوحاة من طريقة عمل خلايا المخ.', en: '6. A neural network is inspired by brain cells.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '7. التعلّم الآلي يقدر يشتغل من غير أي بيانات.', en: '7. Machine learning can work with no data at all.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اشرح بمثال لكل واحدة العلاقة المتداخلة بين AI والتعلّم الآلي والعميق والتوليدي.', en: '8. Explain the nested relationship with one example of each.' },
          points: [{ ar: 'ترتيب التداخل الصحيح.', en: 'Correct nesting order.' }, { ar: 'مثال صحيح لكل فئة.', en: 'A correct example for each.' }],
          model: { ar: 'AI (الترجمة) ⊃ التعلّم الآلي (فلتر السبام) ⊃ التعلّم العميق (التعرف على المشاة) ⊃ التوليدي (ChatGPT).', en: 'AI (translation) ⊃ ML (spam filter) ⊃ DL (pedestrian recognition) ⊃ GenAI (ChatGPT).' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. الذكاء التوليدي ممكن «يهلوس». ليه خطر تستخدم مخرجاته زي ما هي في تقرير، وتعمل إيه بدل كده؟', en: '9. Why is a hallucination dangerous as-is in a report, and what should you do?' },
          points: [{ ar: 'الهلوسة = كلام مقنع لكنه غلط → معلومات خاطئة في التقرير.', en: 'Hallucination = convincing but wrong → false info in the report.' }, { ar: 'لازم تتحقّق من مصادر موثوقة وتكتب بفهمك.', en: 'Verify with reliable sources and write in your own words.' }],
          model: { ar: 'لأن الذكاء التوليدي ممكن يطلّع معلومات تبدو صحيحة لكنها غلط، فالتقرير هيبقى فيه أخطاء. لازم أراجع المعلومة من مصادر موثوقة وأكتب بفهمي.', en: 'Generative AI can produce information that sounds right but is false, so the report would contain errors. Check facts against reliable sources and write in your own words.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. ليه التعلّم العميق محتاج بيانات ضخمة؟ اذكر نتيجة لو بياناته ضيّقة.', en: '10. Why does deep learning need big data? One consequence if its data is narrow.' },
          points: [{ ar: 'بيكتشف الأنماط/الخصائص بنفسه فمحتاج أمثلة كتير جدًا.', en: 'It discovers features itself, so it needs very many examples.' }, { ar: 'لو البيانات ضيّقة هيغلط في الحالات النادرة/الجديدة.', en: 'With narrow data it fails on rare/new cases.' }],
          model: { ar: 'لأنه بيكتشف الخصائص بنفسه بدل ما الإنسان يحدّدها، فمحتاج يشوف أمثلة كتير جدًا. لو بياناته ضيّقة هيغلط في أي حالة نادرة أو مختلفة ماشافهاش.', en: 'It discovers features by itself rather than being told them, so it needs a great many examples. With narrow data it will fail on rare or unfamiliar cases.' } } },
      ],
    },
  ],
});
