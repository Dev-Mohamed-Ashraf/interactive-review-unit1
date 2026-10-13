/* =========================================================
 * content/lesson-7-2.js — الشبكات العصبية والتعلّم العميق
 * Pure data. Sources: textbook part 2, 7-2 (EN p.68–76) + memo (Arabic
 * wording, deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('7-2', {
  id: '7-2',
  color: '#ec4899',
  cover: 'img/ml-l2-cover.webp',
  title: { ar: 'الشبكات العصبية والتعلّم العميق', en: 'Neural Networks and Deep Learning' },
  guiding: { ar: 'الشبكة العصبية بتتبني وتتدرّب إزاي، وإيه اللي بيضيفه إنها تبقى «عميقة»؟', en: 'How is a neural network built and trained, and what does making it "deep" add?' },
  hook: {
    ar: 'إزاي آلة تفرّق بين كلب وقطة، أو تحوّل الكلام لنص؟ الإجابة — مستوحاة من المخ — هي **الشبكة العصبية**: طبقات من وحدات بسيطة اسمها **خلايا عصبية**، كل واحدة بتعدّي إشارات للي بعدها. الخلية لوحدها __بسيطة جدًا__: بتضرب مدخلاتها في **أوزان** وتجمعها — بس كدّس منها كفاية في طبقات كفاية، والشبكة __تتعلّم الأنماط__ بإنها تظبط الأوزان على البيانات. ولما الكدسة تبقى __عميقة__ — **التعلّم العميق** — السمات بتتبني من __حواف بسيطة لحد أجسام كاملة__، وده اللي خلّى الذكاء الاصطناعي يسبق البشر في مهام كتير.',
    en: 'How can a machine tell a dog from a cat, or turn speech into text? The answer — loosely inspired by the brain — is the **neural network**: layers of simple units called **neurons**, each passing signals to the next. A neuron alone is __very simple__: it multiplies its inputs by **weights** and sums them — but stack enough across enough layers and the network __learns patterns__ by tuning those weights on data. Make the stack __deep__ — **deep learning** — and features are built up __from simple edges to whole objects__, which pushed AI beyond humans on many tasks.',
  },
  keyFact: { ar: 'الشبكة العصبية طبقات من خلايا متوصّلة: __طبقة إدخال__، و__طبقات مخفية__ بتستخرج السمات، و__طبقة إخراج__. كل خلية بتضرب مدخلاتها في __أوزان__ وتجمعها؛ و__التدريب__ بيظبط الأوزان من البيانات. و__التعلّم العميق__ بيكدّس طبقات مخفية كتير عشان يبني السمات خطوة خطوة — ودي القفزة ورا الذكاء الاصطناعي الحديث.', en: 'A neural network is layers of connected neurons: an __input layer__, __hidden layers__ that extract features, and an __output layer__. Each neuron multiplies its inputs by __weights__ and sums them; __training__ tunes the weights from data. __Deep learning__ stacks many hidden layers to build features step by step — the leap behind modern AI.' },
  concepts: ['neural network', 'node (neuron)', 'layer', 'input layer', 'hidden layer', 'output layer', 'weight', 'activation function', 'training', 'deep learning', 'hierarchical features', 'overfitting'],
  objectives: [
    { ar: 'أوصف بنية الشبكة العصبية وأشرح إزاي خلية واحدة بتعالج مدخلاتها.', en: 'Describe the structure of a neural network and explain how a single neuron processes its inputs.' },
    { ar: 'أشرح يعني إيه تعلّم عميق، وليه تكديس طبقات مخفية كتير عمل قفزة في أداء الذكاء الاصطناعي.', en: 'Explain what deep learning is, and why stacking many hidden layers brought a leap in AI performance.' },
  ],

  stations: [
    /* ───────────── 1 · structure, neuron, training ───────────── */
    {
      id: 'structure', kind: 'learn',
      title: { ar: 'البنية والخلية والتدريب', en: 'Structure, the neuron and training' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'خلية عصبية واحدة في الشبكة… تفتكر بتعمل إيه؟', en: 'A single neuron in the network… what do you think it does?' },
            options: [
              { emoji: '🧠', text: { ar: 'بتفهم الصورة كلها', en: 'Understands the whole image' } },
              { emoji: '🧮', text: { ar: 'عملية حسابية بسيطة', en: 'A simple calculation' } },
              { emoji: '📖', text: { ar: 'بتقرا قاعدة مكتوبة', en: 'Reads a written rule' } },
            ],
            after: { ar: 'هي أبسط مما تتخيّل… والسحر في العدد 👇', en: 'It is simpler than you think… the magic is in the numbers 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: طبقات… أوزان… وتدريب', en: '🎞️ Animation: layers… weights… and training' },
          enTitle: 'Neural networks and training',
          terms: ['node (neuron)', 'input layer', 'hidden layer', 'output layer', 'weight', 'activation function', 'training'],
          visual: { anim: 'nnMovie', props: { scenes: [0, 2] } },
          beats: [
            { ar: '🧠 **الشبكة العصبية:** بنية فيها __عُقد كتير (خلايا عصبية) متوصّلة__، مترتّبة في __طبقات__، وعُقد الطبقات الجنب بعض متوصّلة ببعض. **طبقة الإدخال** __بتستقبل البيانات من برّه__ · **الطبقات المخفية (الوسطى)** __بتعالج المعلومات وتستخرج السمات__ · **طبقة الإخراج** __بتطلّع نتيجة المعالجة كإجابة__ (كلب ولا قطة). البيانات بتدخل من الإدخال، تتعالج وهي معدّية على المخفية، وتوصل للإخراج — وعدد الطبقات والعُقد __حسب صعوبة المشكلة__.', en: '🧠 **A neural network:** a structure of __many connected nodes (neurons)__, arranged in __layers__, with nodes in adjacent layers connected. The **input layer** __receives data from outside__ · the **hidden (middle) layers** __process the information and extract features__ · the **output layer** __outputs the result as the answer__ (dog or cat). Data enters at the input, is processed passing through the hidden layers, and reaches the output — the number of layers and nodes is __designed by the problem’s difficulty__.' },
            { ar: '⚪ **إزاي الخلية بتشتغل:** بتستقبل كذا مدخل، __تضربهم في أوزان وتجمعهم__، وبعدين تعدّي المجموع على **دالة تنشيط** (بتخلّي الشبكة تتعلّم __علاقات مش تناسبية بس__) قبل ما تعدّي النتيجة للطبقة الجاية. **الوزن:** رقم بيمثّل __قد إيه بنركّز على كل مدخل__ — ممكن __موجب أو سالب__، وكل ما حجمه يكبر المدخل يأثّر أقوى. بالأرقام: x = (1، 0، 1) وw = (0.9، 0.2، −0.7) وb = 0.1 ← `0.9 + 0 − 0.7 + 0.1 = 0.3` ← دالة التنشيط ← الطبقة الجاية.', en: '⚪ **How a neuron works:** it receives several inputs, __multiplies them by weights and sums them__, then passes the sum through an **activation function** (letting the network learn __relationships that are not purely proportional__) before passing the result to the next layer. **Weight:** a number showing __how much each input is emphasized__ — it can be __positive or negative__, and the larger it is, the stronger the input’s influence. With numbers: x = (1, 0, 1), w = (0.9, 0.2, −0.7), b = 0.1 → `0.9 + 0 − 0.7 + 0.1 = 0.3` → activation → next layer.' },
            { ar: '🔧 **التدريب:** ظبط الأوزان عشان __الشبكة كلها__ تطلّع إجابات صح. 🎲 __قبل التدريب__: الأوزان __عشوائية__ فمفيش تنبّؤ صح · 🔧 __أثناء التدريب__: بندّي بيانات، والأوزان __بتتظبط شوية شوية حسب الفرق بين التنبّؤ والإجابة الصحيحة__ · ✅ __بعد التدريب__: بالأوزان المظبوطة بنتنبّأ صح __حتى على بيانات جديدة__. وظيفة كل خلية بسيطة، بس __خلايا كتير مع بعض بتخلّي الأحكام المعقّدة ممكنة__ — والتنبّؤ بيطلع من تفاعل معلمات كتير، مش من كلمة أو وزن واحد.', en: '🔧 **Training:** tuning the weights so __the whole network__ outputs correct answers. 🎲 __Before training__: weights are __arbitrary__, so correct prediction is impossible · 🔧 __During training__: data is given and the weights are __adjusted gradually from the gap between the prediction and the correct answer__ · ✅ __After training__: with tuned weights, correct predictions are possible __even on new data__. Each neuron is simple, but __many together make complex judgments possible__ — a prediction comes from many parameters interacting, not from one word or weight.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1) — احسبها', en: '✋ Check yourself (1) — work it out' },
          q: { widget: 'numeric', prompt: { ar: 'خلية مدخلاتها x = (1، 1، 0) وأوزانها w = (0.5، −0.2، 0.8) والانحياز b = 0.1. المجموع المرجَّح (قبل دالة التنشيط) كام؟', en: 'A neuron has inputs x = (1, 1, 0), weights w = (0.5, −0.2, 0.8) and bias b = 0.1. What is the weighted sum (before activation)?' },
            answer: 0.4, tolerance: 0.001, hint: { ar: '`0.5×1 + (−0.2)×1 + 0.8×0 + 0.1`', en: '0.5×1 + (−0.2)×1 + 0.8×0 + 0.1' },
            explain: { ar: '`0.5 − 0.2 + 0 + 0.1 = 0.4`', en: '0.5 − 0.2 + 0 + 0.1 = 0.4' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل طبقة بدورها:', en: 'Match each layer with its role:' },
            left: [{ ar: 'طبقة الإدخال', en: 'Input layer' }, { ar: 'الطبقة المخفية', en: 'Hidden layer' }, { ar: 'طبقة الإخراج', en: 'Output layer' }],
            right: [{ ar: 'بتعالج وتستخرج السمات', en: 'Processes and extracts features' }, { ar: 'بتطلّع النتيجة كإجابة', en: 'Outputs the result as the answer' }, { ar: 'بتستقبل البيانات من برّه', en: 'Receives data from outside' }],
            answer: [2, 0, 1],
            explain: { ar: 'إدخال يستقبل · مخفية تعالج · إخراج يجاوب.', en: 'Input receives · hidden processes · output answers.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**إدخال** (يستقبل) ← **مخفية** (سمات) ← **إخراج** (إجابة).', en: '**Input** (receives) → **hidden** (features) → **output** (answer).' },
            { ar: '**الخلية:** مدخلات × أوزان ← مجموع ← **دالة تنشيط** ← الطبقة الجاية.', en: '**Neuron:** inputs × weights → sum → **activation** → next layer.' },
            { ar: '**التدريب:** أوزان عشوائية ← تتظبط حسب الفرق ← إجابات صح حتى على الجديد.', en: '**Training:** random weights → tuned from the gap → correct even on new data.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · deep learning ───────────── */
    {
      id: 'deep', kind: 'learn',
      title: { ar: 'التعلّم العميق والقفزة', en: 'Deep learning and the leap' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: من الخطوط… للشكل كله', en: '🎞️ Animation: from lines… to the whole shape' },
          enTitle: 'Deep learning',
          terms: ['deep learning', 'hierarchical features', 'GPU / TPU', 'overfitting', 'image recognition', 'speech recognition', 'natural language processing'],
          visual: { anim: 'nnMovie', props: { scenes: [3, 6] } },
          beats: [
            { ar: '🪜 **التعلّم العميق:** تقنية بتستخدم شبكات عصبية __بطبقات مخفية كتير متكدّسة بعمق__ («عميق» = طبقات مخفية كتير). كل ما الطبقات تعمق، __السمات بتتبني خطوة خطوة__: **الطبقات الضحلة** ← سمات بسيطة (__خطوط وتغيّر ألوان__) · **الوسطى** ← __أشكال أجزاء__ (عيون، أنف، ودان — أو حلقات رقم مكتوب) · **العميقة** ← __بنية الوجه أو الجسم كله__ (أو الرقم «8» كامل). وكل ما الطبقة أعمق، __سمات أعقد__ — والبناء الهرمي ده بيخلّيه يتعرّف على أنماط معقّدة __بدقة عالية__.', en: '🪜 **Deep learning:** a technology using neural networks with __many hidden layers stacked deeply__ ("deep" = many hidden layers). As layers deepen, __features are built step by step__: **shallow layers** → simple features (__lines and colour changes__) · **middle** → __shapes of parts__ (eyes, nose, ears — or the loops of a handwritten digit) · **deep** → __the structure of the whole face or object__ (or the whole digit "8"). Deeper layers capture __more complex features__ — this hierarchy lets it recognize complex patterns __with high accuracy__.' },
            { ar: '🚀 بقى **عملي** لما اتوفّرت __كميات كبيرة من البيانات__ و__قدرة حسابية عالية__ (خصوصًا معالجات مناسبة للذكاء الاصطناعي زي __GPU وTPU__)؛ قبل كده تعميق الطبقات __لوحده ماكانش كفاية__. ⚠️ وزيادة العمق __لوحدها مش ضمان__ إن الأداء يتحسّن — ممكن يحصل **فرط تخصيص**: الشبكة __تحفظ الأمثلة__ وتطارد الضوضاء ومايعمّمش. فقبل ما تزوّد طبقات، اتأكّد إن البيانات __كفاية ومتنوّعة__.', en: '🚀 It became **practical** once __large amounts of data__ and __high computing power__ (especially AI-suited processors such as __GPUs and TPUs__) became available; before that, deeper layers __alone were not enough__. ⚠️ And more depth __alone does not guarantee__ better performance — **overfitting** can happen: the network __memorizes the examples__, chasing noise instead of generalizing. So before adding layers, check the data is __sufficient and varied__.' },
            { ar: '📈 **القفزة:** بقى ممكن نوصل __لدقة قريبة من البشر أو أعلى__ في مهام كتير كانت صعبة على الكمبيوتر: 🖼️ **التعرّف على الصور** (أنظمة الوجوه، دعم تشخيص الصور الطبية، كشف الأجسام للعربيات الذاتية) · 🎙️ **التعرّف على الكلام** (السماعات الذكية، التفريغ، ترجمة الكلام) · 💬 **معالجة اللغة الطبيعية** (ترجمة آلية، تلخيص، إجابة أسئلة). قبل التعلّم العميق __البشر كانوا بيصمّموا السمات واحدة واحدة__؛ دلوقتي __السمات بتتعلّم تلقائيًا من البيانات__ — وده مهّد الأرض للذكاء الاصطناعي اللي __بينشئ نصوص وصور__.', en: '📈 **The leap:** __human-level or better accuracy__ became possible in many tasks once hard for computers: 🖼️ **image recognition** (face systems, medical-image diagnosis support, object detection for self-driving cars) · 🎙️ **speech recognition** (smart speakers, transcription, speech translation) · 💬 **natural language processing** (machine translation, summarizing, question answering). Before deep learning __humans designed features one by one__; now __features are learned automatically from data__ — paving the way for AI that __creates text and images__.' },
            { ar: '📌 **الخلاصة:** إدخال ← مخفية (سمات) ← إخراج · الخلية: أوزان × مدخلات ← مجموع ← دالة تنشيط · التدريب بيظبط الأوزان · العميق = طبقات كتير بتبني السمات __هرميًا__ (خطوط ← أجزاء ← الكل)، اتمكّن بالبيانات الكبيرة وGPU/TPU.', en: '📌 **The point:** input → hidden (features) → output · a neuron: weights × inputs → sum → activation · training tunes weights · deep = many layers building features __hierarchically__ (lines → parts → whole), enabled by big data and GPUs/TPUs.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«طبقة الإدخال بتطلّع النتايج» ← __غلط__ (دي الإخراج) · «التعلّم العميق بطبقة مخفية واحدة» ← __غلط__ · «الأوزان مظبوطة قبل التدريب» ← __غلط__ (عشوائية) · «زيادة الطبقات مابتغيّرش صعوبة المشاكل» ← __غلط__. خلفية العملية: __بيانات كتير + قدرة حسابية (GPU/TPU)__. الترتيب (ضحلة ← عميقة): __خطوط ولون ← أجزاء ← الكل__.', en: '"The input layer outputs results" → __false__ (that is the output layer) · "deep learning uses one hidden layer" → __false__ · "weights are correct before training" → __false__ (arbitrary) · "more layers do not change problem difficulty" → __false__. What made it practical: __big data + compute (GPU/TPU)__. Order (shallow → deep): __lines and colour → parts → whole__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — ليه طبقات مخفية مش خطوة واحدة؟', en: 'Deep dive — why hidden layers, not one step?' }, text: { ar: 'خطوة واحدة بتتعلّم علاقات بسيطة بس (خط فاصل). الطبقات بتبني تمثيلات فوق تمثيلات: خطوط ← أجزاء ← أشكال كاملة. في رقم مكتوب بخط الإيد: «الحافة» = خط قصير أو منحنى، «الجزء» = حلقة أو ساق، «الكل» = تجميعهم في الرقم 8 أو 1. ولو الشبكة ماشافتش خطوط كل الطلبة (يمين وشمال، سريع وبطيء)، ممكن تفشل مع خط حد معيّن — فنوّع البيانات.', en: 'One step learns only simple relationships (a dividing line). Layers build representations on representations: lines → parts → whole shapes. For a handwritten digit: an "edge" = a short stroke or curve, a "part" = a loop or a stem, the "whole" = combining them into an 8 or a 1. If the network never saw every student’s handwriting (left- and right-handed, fast and slow), it may fail on someone’s — so vary the data.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'order', prompt: { ar: 'رتّب السمات من الطبقات الضحلة للعميقة:', en: 'Order the features from shallow to deep layers:' },
            items: [
              { ar: 'خطوط وتغيّرات لون', en: 'Lines and colour changes' },
              { ar: 'أشكال أجزاء (عيون، أنف، ودان)', en: 'Shapes of parts (eyes, nose, ears)' },
              { ar: 'بنية الوجه أو الجسم كله', en: 'The structure of the whole face or object' },
            ],
            explain: { ar: 'خطوط ← أجزاء ← الكل.', en: 'Lines → parts → whole.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'التعلّم العميق بقى عملي بفضل البيانات الكبيرة والقدرة الحسابية العالية.', en: 'Deep learning became practical thanks to big data and high computing power.' }, answer: true },
            { text: { ar: 'زيادة عمق الشبكة بتحسّن الأداء دايمًا.', en: 'Making a network deeper always improves performance.' }, answer: false, explain: { ar: 'ممكن يحصل __فرط تخصيص__.', en: '__Overfitting__ can happen.' } },
            { text: { ar: 'مع التعلّم العميق السمات بتتعلّم تلقائيًا بدل ما البشر يصمّموها.', en: 'With deep learning, features are learned automatically instead of hand-designed.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**التعلّم العميق** = طبقات مخفية كتير ← سمات هرمية: خطوط ← أجزاء ← الكل.', en: '**Deep learning** = many hidden layers → hierarchical features: lines → parts → whole.' },
            { ar: '**عملي** بالبيانات الكبيرة + **GPU/TPU** · عمق أكتر ≠ أحسن تلقائيًا (**فرط تخصيص**).', en: '**Practical** with big data + **GPU/TPU** · more depth ≠ better automatically (**overfitting**).' },
            { ar: '**القفزة:** صور · كلام · لغة — والسمات بتتعلّم تلقائيًا (أساس الذكاء التوليدي).', en: '**The leap:** images · speech · language — features learned automatically (the base of generative AI).' },
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
            { text: { ar: 'A) للشبكة العصبية تلات أنواع طبقات: إدخال ومخفية وإخراج.', en: 'A) A neural network has three kinds of layer: input, hidden and output.' }, answer: true },
            { text: { ar: 'B) طبقة الإدخال هي اللي بتطلّع نتايج المعالجة كإجابة لبرّه.', en: 'B) The input layer outputs the processing results as an answer.' }, answer: false },
            { text: { ar: 'C) التعلّم العميق بيستخدم شبكة بطبقة مخفية واحدة بس.', en: 'C) Deep learning uses a network with only one hidden layer.' }, answer: false },
            { text: { ar: 'D) تدريب الشبكة = ظبط الأوزان بين الخلايا باستخدام بيانات كتير.', en: 'D) Training a network = adjusting the weights between neurons using much data.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) التلات أنواع ← **✓**.', en: 'A) The three kinds → **✓**.' },
            { ar: 'B) دي __طبقة الإخراج__؛ الإدخال بتستقبل ← **✗**.', en: 'B) That is the __output layer__; the input receives → **✗**.' },
            { ar: 'C) العميق = طبقات مخفية __كتير__ ← **✗**.', en: 'C) Deep = __many__ hidden layers → **✗**.' },
            { ar: 'D) تعريف التدريب ← **✓**.', en: 'D) The definition of training → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمصطلح (A–C):', en: '(2) Match each description (a–c) with the term (A–C):' },
            left: [
              { ar: 'a) الطبقة اللي بتستقبل البيانات من برّه', en: 'a) The layer receiving data from outside' },
              { ar: 'b) رقم بيمثّل قد إيه بنركّز على كل مدخل', en: 'b) A number for how much each input is emphasized' },
              { ar: 'c) الطبقة اللي بتعالج وتستخرج السمات', en: 'c) The layer processing input and extracting features' },
            ],
            right: [{ ar: 'A الطبقة المخفية', en: 'A Hidden layer' }, { ar: 'B الوزن', en: 'B Weight' }, { ar: 'C طبقة الإدخال', en: 'C Input layer' }],
            answer: [2, 1, 0] },
          solution: [
            { ar: 'a: تستقبل = **الإدخال** ← C.', en: 'a: receives = **input layer** → C.' },
            { ar: 'b: تركيز = **الوزن** ← B.', en: 'b: emphasis = **weight** → B.' },
            { ar: 'c: تستخرج السمات = **المخفية** ← A.', en: 'c: extracts features = **hidden layer** → A.' },
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
            { q: { ar: '1. وحدة المعالجة الفردية اللي الشبكة العصبية مكوّنة منها؟', en: '1. The individual processing unit a neural network is made of?' }, a: { ar: 'العقدة (الخلية العصبية)', en: 'Node (neuron)' } },
            { q: { ar: '2. الطبقة اللي بتعالج معلومات الإدخال وتستخرج السمات؟', en: '2. The layer that processes input and extracts features?' }, a: { ar: 'الطبقة المخفية', en: 'Hidden layer' } },
            { q: { ar: '3. الرقم اللي بيمثّل قد إيه بنركّز على كل مدخل؟', en: '3. The number for how much each input is emphasized?' }, a: { ar: 'الوزن', en: 'Weight' } },
            { q: { ar: '4. التقنية اللي بتستخدم طبقات مخفية كتير متكدّسة بعمق؟', en: '4. The technology using many deeply stacked hidden layers?' }, a: { ar: 'التعلّم العميق', en: 'Deep learning' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف طبقات الشبكة العصبية:', en: 'Choose the best description of a neural network’s layers:' },
            options: [
              { ar: 'A طبقة الإدخال دورها تطلّع نتايج المعالجة لبرّه', en: 'A The input layer outputs the results to the outside' },
              { ar: 'B الطبقة المخفية دورها تستقبل البيانات الخام من برّه', en: 'B The hidden layer receives data from outside' },
              { ar: 'C طبقة الإخراج دورها تعالج وتستخرج السمات', en: 'C The output layer processes and extracts features' },
              { ar: 'D تدخل من الإدخال وتتعالج في المخفية وتوصل للإخراج', en: 'D Data enters the input → processed in hidden → reaches output' },
            ],
            fixedOrder: true, answer: 3,
            explain: { ar: 'D هو المسار الصح.', en: 'D is the correct flow.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف تدريب الشبكة العصبية:', en: 'Choose the best description of training a neural network:' },
            options: [
              { ar: 'A قبل التدريب الأوزان بتتظبط على قيم صحيحة', en: 'A Before training the weights are set to correct values' },
              { ar: 'B مع التدريب بنلاقي تركيبة أوزان تخلّي الشبكة تجاوب صح', en: 'B Training finds a weight mix that makes the network correct' },
              { ar: 'C التدريب بيحصل بإننا نزوّد عدد الخلايا وبس', en: 'C Training is done just by increasing the number of neurons' },
              { ar: 'D بعد ما التدريب يخلص الشبكة ماتقدرش تتعامل مع جديد', en: 'D After training the network cannot handle new data' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B صح.', en: 'B is right.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (3)', en: 'Try 2 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ خاصية مناسبة للتعلّم العميق؟', en: 'Which is __not__ an appropriate property of deep learning?' },
            options: [
              { ar: 'A بنيته طبقات مخفية كتير متكدّسة بعمق', en: 'A It has many deeply stacked hidden layers' },
              { ar: 'B بيقدر يبني سمات البيانات خطوة خطوة', en: 'B It can build the data’s features step by step' },
              { ar: 'C كل ما الطبقات تعمق بيلقط سمات أعقد', en: 'C Deeper layers capture more complex features' },
              { ar: 'D زيادة الطبقات مابتغيّرش صعوبة المشاكل', en: 'D More layers do not change problem difficulty' },
            ],
            fixedOrder: true, answer: 3,
            explain: { ar: 'D غلط.', en: 'D is wrong.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (4)', en: 'Try 2 (4)' },
          q: { widget: 'order', prompt: { ar: 'رتّب (A–C) من الطبقات الضحلة للعميقة في شبكة بتتعرّف على الصور:', en: 'Order (A–C) from shallow to deep layers in an image-recognition network:' },
            items: [
              { ar: 'B سمات بسيطة زي الخطوط وتغيّر الألوان', en: 'B Simple features such as lines and colour changes' },
              { ar: 'C أشكال الأجزاء زي العينين والأنف والودان', en: 'C Shapes of parts such as eyes, nose and ears' },
              { ar: 'A بنية الوجه أو الجسم كله', en: 'A The structure of the whole face or body' },
            ],
            explain: { ar: 'B ← C ← A.', en: 'B → C → A.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(h):', en: 'Read and fill blanks (a)–(h):' },
            text: { ar: 'الشبكة العصبية فيها وحدات كتير اسمها {0}، مترتّبة في {1} بتلات أنواع: {2} تستقبل البيانات، و{3} تعالج وتستخرج السمات، و{4} تطلّع الإجابة. كل خلية بتضرب مدخلاتها في {5} وتجمعها وتعدّيها على دالة تنشيط. والتقنية اللي فيها طبقات مخفية كتير اسمها {6}، وبتبني السمات {7}.', en: 'A neural network has many units called {0}, arranged in {1} of three kinds: the {2} receives data, the {3} processes and extracts features, and the {4} gives the answer. Each neuron multiplies its inputs by {5}, sums them and applies an activation function. The technique with many hidden layers is {6}, and it builds features {7}.' },
            bank: [{ ar: 'عُقد (خلايا)', en: 'nodes (neurons)' }, { ar: 'طبقات', en: 'layers' }, { ar: 'طبقة الإدخال', en: 'input layer' }, { ar: 'الطبقة المخفية', en: 'hidden layer' }, { ar: 'طبقة الإخراج', en: 'output layer' }, { ar: 'أوزان', en: 'weights' }, { ar: 'التعلّم العميق', en: 'deep learning' }, { ar: 'خطوة خطوة', en: 'step by step' }],
            answer: [0, 1, 2, 3, 4, 5, 6, 7],
            explain: { ar: '(a) عُقد (b) طبقات (c) الإدخال (d) المخفية (e) الإخراج (f) أوزان (g) التعلّم العميق (h) خطوة خطوة.', en: '(a) nodes (b) layers (c) input (d) hidden (e) output (f) weights (g) deep learning (h) step by step.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف عمل الخلية العصبية:', en: 'Choose the best description of what a neuron does:' },
            options: [
              { ar: 'A بتعدّي مدخل واحد زي ما هو للطبقة اللي بعدها', en: 'A Passes one input unchanged to the next layer' },
              { ar: 'B تضرب في أوزان وتجمع وتطبّق دالة تنشيط وتعدّي', en: 'B Weights, sums, applies activation, then passes on' },
              { ar: 'C بتحسب متوسط قيم كل المدخلات وتعدّيه للي بعدها', en: 'C Averages the input values and passes that on' },
              { ar: 'D بتعدّي أكبر مدخل بس وتهمل الباقي كله', en: 'D Passes on only the largest input, ignoring the rest' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B صح.', en: 'B is right.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الخلفية الأنسب اللي خلّت التعلّم العميق عملي:', en: 'Choose the best background to deep learning becoming practical:' },
            options: [
              { ar: 'A الحساب بقى أبسط لما قلّلنا المخفية لطبقة واحدة', en: 'A Computing got simpler by cutting hidden layers to one' },
              { ar: 'B اتوفّرت بيانات كتير وقدرة حسابية عالية', en: 'B Large data and high computing power became available' },
              { ar: 'C شلنا الوصلات بين الخلايا فالمعالجة بقت أبسط', en: 'C Removing links between neurons simplified processing' },
              { ar: 'D البشر بقوا يظبطوا الأوزان واحد واحد بإيديهم', en: 'D Humans began tuning the weights one by one by hand' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B صح.', en: 'B is right.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (3)', en: 'Exercise 3 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار السبب الأنسب لقفزة التعلّم العميق:', en: 'Choose the best reason for deep learning’s leap:' },
            options: [
              { ar: 'A السمات بقت تتعلّم تلقائيًا من غير ما البشر يصمّموها', en: 'A Features are learned automatically, not hand-designed' },
              { ar: 'B الكمبيوتر بقى يفكّر بنفس آلية مخ الإنسان بالظبط', en: 'B Computers now think with exactly the brain’s mechanism' },
              { ar: 'C الكمبيوتر بقى يفهم معنى الكلمات فهم كامل', en: 'C Computers now fully understand the meaning of words' },
              { ar: 'D بقى يحكم بدقة كاملة في أي مسألة من غير غلط', en: 'D It now judges any question with perfect accuracy' },
            ],
            fixedOrder: true, answer: 0,
            explain: { ar: 'A صح.', en: 'A is right.' } },
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
          { front: { ar: 'العقدة (الخلية العصبية)', en: 'Node (neuron)' }, back: { ar: 'وحدة معالجة واحدة.', en: 'A single processing unit.' } },
          { front: { ar: 'الطبقة', en: 'Layer' }, back: { ar: 'مجموعة خلايا في مرحلة واحدة.', en: 'A group of neurons at one stage.' } },
          { front: { ar: 'إدخال / مخفية / إخراج', en: 'Input / hidden / output' }, back: { ar: 'تستقبل · تعالج وتستخرج السمات · تجاوب.', en: 'Receives · processes and extracts features · answers.' } },
          { front: { ar: 'الوزن', en: 'Weight' }, back: { ar: 'قد إيه بنركّز على مدخل (موجب/سالب).', en: 'How much an input is emphasized (±).' } },
          { front: { ar: 'دالة التنشيط', en: 'Activation function' }, back: { ar: 'بتخلّي الشبكة تتعلّم علاقات مش تناسبية.', en: 'Lets the network learn non-proportional relations.' } },
          { front: { ar: 'التدريب', en: 'Training' }, back: { ar: 'ظبط الأوزان من البيانات: عشوائية ← مظبوطة.', en: 'Tuning weights from data: random → tuned.' } },
          { front: { ar: 'التعلّم العميق', en: 'Deep learning' }, back: { ar: 'طبقات مخفية كتير ← سمات هرمية.', en: 'Many hidden layers → hierarchical features.' } },
          { front: { ar: 'فرط التخصيص', en: 'Overfitting' }, back: { ar: 'يحفظ الأمثلة ومايعمّمش.', en: 'Memorizes examples, does not generalize.' } },
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
            prompt: { ar: 'اشرح إزاي شبكة من خلايا بسيطة تقدر تطلّع أحكام معقّدة. (أشِر إلى: ترجيح المدخلات وظبط الأوزان على البيانات)', en: 'Explain how a network of simple neurons can make complex judgments. (Refer to: weighting inputs and tuning weights on data)' },
            points: [
              { ar: 'كل خلية: أوزان × مدخلات ← مجموع ← تنشيط.', en: 'Each neuron: weights × inputs → sum → activation.' },
              { ar: 'التدريب بيظبط الأوزان من الفرق مع الإجابة.', en: 'Training tunes weights from the gap to the answer.' },
              { ar: 'طبقات كتير = سمات أعقد ← أحكام معقّدة.', en: 'Many layers = richer features → complex judgments.' },
            ],
            model: { ar: 'كل خلية لوحدها بسيطة: بتضرب مدخلاتها في __أوزان__ (تحدّد قد إيه كل مدخل مهم)، تجمعها، وتعدّيها على دالة تنشيط وتبعت النتيجة للطبقة الجاية. في الأول الأوزان عشوائية، و__التدريب__ بيظبطها شوية شوية على بيانات كتير حسب الفرق بين تنبّؤ الشبكة والإجابة الصحيحة، لحد ما تركيبة الأوزان تخلّي الشبكة كلها تجاوب صح. ولما نكدّس طبقات كتير، كل طبقة بتبني على اللي قبلها: خطوط ← أجزاء ← أشكال كاملة، فالقرار النهائي بيطلع من تفاعل آلاف الأوزان مع بعض — وده اللي بيخلّي الأحكام المعقّدة (زي التعرّف على وش) ممكنة.', en: 'Each neuron alone is simple: it multiplies its inputs by __weights__ (setting how much each input matters), sums them, applies an activation function and sends the result on. At first the weights are random; __training__ adjusts them step by step on lots of data from the gap between the network’s prediction and the correct answer, until the combination of weights makes the whole network answer correctly. Stacking many layers lets each build on the previous: lines → parts → whole shapes, so the final decision comes from thousands of weights interacting — which makes complex judgments (like recognizing a face) possible.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — قارئ الأرقام المكتوبة', en: 'Think as an engineer — the digit reader' },
            prompt: { ar: 'فريق عايز تطبيق يقرا الأرقام المكتوبة بخط الإيد (0–9) من سجلات المدرسة. ١) طبقة الإدخال بتستقبل إيه والإخراج بيطلّع إيه؟ وليه محتاجين طبقات مخفية؟ ٢) الطبقات الضحلة والوسطى والعميقة ممكن تلقط إيه في رقم مكتوب؟ ٣) الشبكة محتاجة إيه عشان تبقى عملية؟ وإزاي بيانات التدريب ممكن تبقى ضيّقة فيفشل مع خط بعض الطلبة؟', en: 'A team wants an app reading handwritten digits (0–9) from school records. 1) What does the input layer receive and the output produce? Why hidden layers? 2) What might shallow, middle and deep layers capture for a digit? 3) What does the network need to be practical, and how might narrow training data make it fail on some students’ handwriting?' },
            points: [
              { ar: 'إدخال: بكسلات · إخراج: 10 احتمالات (0–9).', en: 'Input: pixels · output: 10 classes (0–9).' },
              { ar: 'ضحلة: خطوط · وسطى: حلقات وسيقان · عميقة: الرقم كله.', en: 'Shallow: strokes · middle: loops/stems · deep: the whole digit.' },
              { ar: 'بيانات كتير متنوّعة + GPU · خطوط متنوّعة.', en: 'Lots of varied data + GPU · varied handwriting.' },
            ],
            model: { ar: '١) طبقة الإدخال بتستقبل __بكسلات__ صورة الرقم، والإخراج بيطلّع __أنهي رقم من 0 لـ 9__. محتاجين طبقات مخفية لأن خطوة واحدة بتتعلّم علاقات بسيطة بس، والرقم ممكن يتكتب بأشكال كتير. ٢) الضحلة: خطوط قصيرة ومنحنيات · الوسطى: حلقات وسيقان · العميقة: تجميعهم في رقم كامل زي 8 أو 1. ٣) محتاجة __بيانات كتير__ (آلاف الأرقام) و__قدرة حسابية__ (GPU). لو البيانات من طلبة بخط واضح بس، أو كلهم بيكتبوا بإيد واحدة، هتفشل مع الخط المستعجل أو الغريب — الحل: نجمع عيّنات __متنوّعة__ من كل الفصول.', en: '1) The input layer receives the digit image’s __pixels__; the output gives __which digit 0–9__. Hidden layers are needed because one step learns only simple relationships, and a digit can be written many ways. 2) Shallow: short strokes and curves · middle: loops and stems · deep: combining them into a whole digit like 8 or 1. 3) It needs __lots of data__ (thousands of digits) and __computing power__ (GPUs). If data came only from students with neat handwriting, or all of one style, it will fail on rushed or unusual writing — the fix: collect __varied__ samples from every class.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مساعد صوتي بيحوّل الأوامر المنطوقة لنص، وغالبًا بيشتغل كويس حتى مع كلمات ماحدّش برمجها له صراحة. سمِّ المجال، واشرح بالطبقات والتدريب إزاي بيتعامل مع كلام ماحدّش كتب له قواعد.', en: 'A voice assistant turns spoken commands into text and often works even for words nobody explicitly programmed. Name the field, and explain via layers and training how it handles speech with no written rules.' },
            points: [{ ar: 'التعرّف على الكلام.', en: 'Speech recognition.' }, { ar: 'اتدرّب على تسجيلات كتير فالأوزان اتظبطت.', en: 'Trained on many recordings, so weights were tuned.' }, { ar: 'الطبقات بتبني أصوات ← مقاطع ← كلمات.', en: 'Layers build sounds → syllables → words.' }],
            model: { ar: 'ده مجال __التعرّف على الكلام__. الشبكة العميقة اتدرّبت على آلاف التسجيلات مع نصّها الصحيح، فالتدريب ظبط أوزانها. الطبقات الضحلة بتلقط ملامح صوت بسيطة، والوسطى مقاطع، والعميقة كلمات — فلما يسمع كلمة جديدة بيركّبها من الأجزاء اللي اتعلّمها، من غير ما حد يكتب قاعدة لكل كلمة.', en: 'This is __speech recognition__. The deep network was trained on thousands of recordings with their correct text, so training tuned its weights. Shallow layers catch simple sound features, middle layers syllables, deep layers words — so a new word is assembled from learned parts, without anyone writing a rule for each word.' } },
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
            prompt: { ar: 'استخدمت فين أداة مبنية على التعلّم العميق (كتابة بالصوت، بحث بالصور، ترجمة)؟ كانت من أنهي مجال؟', en: 'Where have you used a deep-learning tool (voice typing, image search, translation)? Which field was it?' },
            points: [{ ar: 'مثال + مجال (صور/كلام/لغة).', en: 'An example + field (image/speech/language).' }],
            model: { ar: '(مثال) الترجمة الفورية في تطبيق الترجمة = __معالجة لغة طبيعية__؛ والبحث بصورة عن نبات = __تعرّف على الصور__؛ والكتابة بالصوت في الكيبورد = __تعرّف على الكلام__.', en: '(Example) instant translation in a translator app = __natural language processing__; searching by a photo of a plant = __image recognition__; voice typing on the keyboard = __speech recognition__.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تحدّى', en: 'Challenge' },
            prompt: { ar: 'فريق بيعمّق الشبكة أكتر وأكتر بس الدقة وقفت تتحسّن والتدريب بقى بطيء جدًا. باستخدام اللي خلّى التعلّم العميق عملي، اشرح الشبكة الأعمق محتاجة إيه أكتر، واذكر الحاجة الوحيدة — غير زيادة الطبقات — اللي لازم يفحصوها الأول.', en: 'A team keeps deepening its network, but accuracy stops improving and training becomes very slow. Using what made deep learning practical, explain what the deeper network now needs more of, and the one thing — other than adding layers — to check first.' },
            points: [{ ar: 'محتاجة بيانات أكتر وقدرة حسابية أكبر.', en: 'It needs more data and more compute.' }, { ar: 'يفحصوا: هل البيانات كفاية ومتنوّعة (فرط تخصيص).', en: 'Check: is the data sufficient and varied (overfitting).' }],
            model: { ar: 'الشبكة الأعمق فيها أوزان أكتر بكتير، فمحتاجة __بيانات أكتر__ عشان تتظبط صح، و__قدرة حسابية أكبر__ (GPU/TPU) عشان التدريب مايبقاش بطيء. لو البيانات زي ما هي، الشبكة ممكن __تحفظ الأمثلة__ (فرط تخصيص) فالدقة على الجديد ماتتحسّنش. أول حاجة يفحصوها: __هل البيانات كفاية ومتنوّعة__ — ويقيسوا الدقة على بيانات جديدة ماتدرّبتش عليها.', en: 'A deeper network has many more weights, so it needs __more data__ to tune them properly and __more computing power__ (GPU/TPU) so training is not too slow. With the same data it may __memorize the examples__ (overfitting), so accuracy on new data does not improve. The first thing to check: __is the data sufficient and varied__ — and measure accuracy on new data it was not trained on.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '7-2', seconds: 60, items: [
          { text: { ar: 'طبقة الإدخال بتستقبل البيانات', en: 'The input layer receives data' }, answer: true },
          { text: { ar: 'طبقة الإدخال بتطلّع الإجابة', en: 'The input layer gives the answer' }, answer: false },
          { text: { ar: 'المخفية بتستخرج السمات', en: 'Hidden layers extract features' }, answer: true },
          { text: { ar: 'الوزن ممكن يكون سالب', en: 'A weight can be negative' }, answer: true },
          { text: { ar: 'الخلية بتحسب متوسط المدخلات', en: 'A neuron averages its inputs' }, answer: false },
          { text: { ar: 'دالة التنشيط بعد المجموع', en: 'Activation comes after the sum' }, answer: true },
          { text: { ar: 'الأوزان صح قبل التدريب', en: 'Weights are correct before training' }, answer: false },
          { text: { ar: 'التدريب = ظبط الأوزان', en: 'Training = tuning weights' }, answer: true },
          { text: { ar: 'العميق = طبقة مخفية واحدة', en: 'Deep = one hidden layer' }, answer: false },
          { text: { ar: 'الضحلة = خطوط وألوان', en: 'Shallow = lines and colours' }, answer: true },
          { text: { ar: 'العميقة = الشكل كله', en: 'Deep layers = the whole shape' }, answer: true },
          { text: { ar: 'GPU وTPU خلّوه عملي', en: 'GPUs and TPUs made it practical' }, answer: true },
          { text: { ar: 'عمق أكتر = أحسن دايمًا', en: 'More depth = always better' }, answer: false },
          { text: { ar: 'السمات بتتعلّم تلقائيًا', en: 'Features are learned automatically' }, answer: true },
          { text: { ar: 'البشر لازم يصمّموا كل السمات', en: 'Humans must design every feature' }, answer: false },
          { text: { ar: 'الترجمة الآلية من معالجة اللغة', en: 'Machine translation is NLP' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 7-2', en: 'Lesson 7-2 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. الطبقة اللي بتعالج معلومات الإدخال وتستخرج السمات — أنهي؟', en: '1. The layer that processes input and extracts features — which?' }, options: [{ ar: 'طبقة الإدخال', en: 'The input layer' }, { ar: 'الطبقة المخفية', en: 'The hidden layer' }, { ar: 'طبقة الإخراج النهائية', en: 'The output layer' }, { ar: 'دالة التنشيط', en: 'The activation function' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. القيمة اللي بتمثّل قد إيه بنركّز على كل مدخل — اسمها؟', en: '2. The value for how much an input is emphasized — what is it?' }, options: [{ ar: 'العقدة', en: 'The node' }, { ar: 'الوزن', en: 'The weight' }, { ar: 'الطبقة', en: 'The layer' }, { ar: 'التدريب', en: 'Training' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. شبكات بطبقات مخفية كتير متكدّسة بعمق — اسم التقنية؟', en: '3. Networks with many deeply stacked hidden layers — which technology?' }, options: [{ ar: 'التعلّم المعزَّز', en: 'Reinforcement learning' }, { ar: 'التعلّم العميق', en: 'Deep learning' }, { ar: 'التجميع', en: 'Clustering' }, { ar: 'دالة التنشيط', en: 'Activation function' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. طبقة الإخراج هي اللي بتطلّع نتيجة المعالجة كإجابة لبرّه.', en: '4. The output layer outputs the result as an answer.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. قبل التدريب الأوزان بتبقى مظبوطة على القيم الصحيحة.', en: '5. Before training, weights are set to correct values.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. التعلّم العميق بقى عملي بفضل البيانات الكبيرة والقدرة الحسابية العالية.', en: '6. Deep learning became practical thanks to big data and compute.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. اذكر أنواع الطبقات التلاتة ودور كل واحدة.', en: '7. Name the three kinds of layer and the role of each.' },
          points: [{ ar: 'إدخال: تستقبل · مخفية: تعالج وتستخرج السمات · إخراج: تجاوب.', en: 'Input: receives · hidden: processes/extracts features · output: answers.' }],
          model: { ar: 'طبقة الإدخال: بتستقبل البيانات من برّه. الطبقة المخفية (الوسطى): بتعالج معلومات الإدخال وتستخرج السمات. طبقة الإخراج: بتطلّع نتيجة المعالجة كإجابة.', en: 'Input layer: receives data from outside. Hidden (middle) layer: processes the input information and extracts features. Output layer: outputs the result of processing as the answer.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اوصف خطوات عمل خلية عصبية واحدة بالترتيب.', en: '8. Describe the steps a single neuron performs, in order.' },
          points: [{ ar: 'تستقبل مدخلات ← تضرب في أوزان ← تجمع ← دالة تنشيط ← تعدّي النتيجة.', en: 'Receive inputs → multiply by weights → sum → activation → pass the result on.' }],
          model: { ar: 'الخلية بتستقبل كذا مدخل، بتضرب كل مدخل في وزنه، بتجمع النتايج (ومعاها الانحياز)، بتعدّي المجموع على دالة تنشيط، وبعدين بتبعت الناتج للطبقة اللي بعدها.', en: 'The neuron receives several inputs, multiplies each by its weight, sums the results (plus the bias), passes the sum through an activation function, then sends the output to the next layer.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. يعني إيه «التدريب»؟ وإيه الفرق بين حالة الأوزان قبله وبعده؟', en: '9. What is "training"? How do the weights differ before and after it?' },
          points: [{ ar: 'ظبط الأوزان من البيانات.', en: 'Tuning the weights from data.' }, { ar: 'قبل: عشوائية · بعد: مظبوطة تجاوب صح حتى على الجديد.', en: 'Before: random · after: tuned, correct even on new data.' }],
          model: { ar: 'التدريب هو ظبط الأوزان بين الخلايا باستخدام بيانات كتير، حسب الفرق بين تنبّؤ الشبكة والإجابة الصحيحة. قبل التدريب الأوزان عشوائية فالشبكة مابتتنبّأش صح؛ بعد التدريب الأوزان مظبوطة فالشبكة بتجاوب صح حتى على بيانات جديدة.', en: 'Training is adjusting the weights between neurons using lots of data, according to the gap between the network’s prediction and the correct answer. Before training the weights are random, so predictions are wrong; after training they are tuned, so the network answers correctly even on new data.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. اشرح بمثال (وش أو رقم) إزاي التعلّم العميق بيبني السمات هرميًا.', en: '10. Explain with an example (a face or a digit) how deep learning builds features hierarchically.' },
          points: [{ ar: 'ضحلة: خطوط ولون.', en: 'Shallow: lines and colour.' }, { ar: 'وسطى: أجزاء.', en: 'Middle: parts.' }, { ar: 'عميقة: الكل ← الحكم.', en: 'Deep: the whole → the judgment.' }],
          model: { ar: 'في التعرّف على وش: الطبقات الضحلة بتلقط خطوط وتغيّرات لون، والوسطى بتجمّعها في أجزاء زي العينين والأنف والودان، والعميقة بتجمّع الأجزاء في بنية الوش كله فتحكم «وش إنسان». وفي رقم مكتوب: خطوط ومنحنيات ← حلقات وسيقان ← الرقم 8 كامل. كل طبقة بتبني على اللي قبلها، فالسمات بتبقى أعقد كل ما نعمق.', en: 'For a face: shallow layers catch lines and colour changes, middle layers combine them into parts like eyes, nose and ears, and deep layers combine the parts into the whole face structure, judging "a human face". For a handwritten digit: strokes and curves → loops and stems → the whole 8. Each layer builds on the previous, so features grow more complex with depth.' } } },
      ],
    },
  ],
});
