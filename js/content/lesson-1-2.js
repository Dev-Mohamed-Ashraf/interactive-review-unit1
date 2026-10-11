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
          title: { ar: 'من الأوامر… للتعلّم… للإبداع', en: 'From commands… to learning… to creating' },
          visual: { anim: 'cinema', props: { tint: 'violet', clips: [
              { src: 'media/mx-22760.mp4', beat: 0, title: { ar: 'زمان: كود وقواعد', en: 'Before: code & rules' }, sub: { ar: 'المبرمج بيكتب كل قاعدة بإيده', en: 'every rule written by hand' }, icon: 'code' },
              { src: 'media/mx-31774.mp4', beat: 1, title: { ar: 'النهارده: شبكات بتتعلّم', en: 'Today: networks that learn' }, sub: { ar: 'ملايين الوصلات زي خلايا المخ', en: 'millions of links like brain cells' }, icon: 'network' },
              { src: 'media/mx-26776.mp4', beat: 2, title: { ar: 'وبعدين: بيولّد جديد', en: 'Then: it creates' }, sub: { ar: 'نص وصور وصوت من طلب صغير', en: 'text, images, audio from a prompt' }, icon: 'sparkle' },
          ] } },
          beats: [
            { ar: 'زمان الحاسب كان بيعمل __بس اللي اتكتب له__: قواعد بالكود سطر سطر.', en: 'Computers once did __only what they were told__: hand-written rules, line by line.' },
            { ar: 'النهارده بقى __بيتعلّم من البيانات__ بشبكات عصبية فيها ملايين الوصلات.', en: 'Today they __learn from data__ with neural networks of millions of connections.' },
            { ar: 'ووصل إنه __يولّد محتوى جديد__ — ده **الذكاء الاصطناعي التوليدي**. تعالى نرتّب الأنواع دي.', en: 'And now they __generate new content__ — **generative AI**. Let’s organise these kinds.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'أربع دوائر… كل واحدة جوّه اللي قبلها', en: 'Four circles… each inside the last' },
          enTitle: 'Hierarchy of AI Technologies',
          terms: ['AI', 'machine learning', 'deep learning', 'generative AI'],
          visual: { anim: 'nestedCircles' },
          beats: [
            { ar: '**الذكاء الاصطناعي (AI):** مصطلح عام لتقنيات بتخلّي الحاسب __يعيد إنتاج أو ينفّذ سلوك إنساني ذكي__ (تعلّم، استدلال، حكم). مثال: التعرف على الكلام والصور والترجمة.', en: '**AI:** a general term for technologies that __reproduce or perform intelligent human behaviour__ (learning, reasoning, judgment) on a computer. e.g. speech/image recognition, translation.' },
            { ar: '**التعلّم الآلي (ML):** جوّه الـ AI — بيتعلّم __أنماط من البيانات__ عشان يتنبّأ ويحكم. مثال: فلتر السبام، توصية المنتجات.', en: '**Machine learning:** inside AI — learns __patterns from data__ to predict and judge. e.g. spam filters, product recommendations.' },
            { ar: '**التعلّم العميق (DL):** جوّه الـ ML — أسلوب متقدّم بيستخدم __الشبكات العصبية__ ويتعلّم أنماط معقّدة من __بيانات ضخمة__. مثال: تحليل صور القيادة الذاتية، تركيب الكلام.', en: '**Deep learning:** inside ML — uses __neural networks__ to learn complex patterns from __large-scale data__. e.g. image analysis for self-driving, speech synthesis.' },
            { ar: '**الذكاء الاصطناعي التوليدي:** جوّه الـ DL — بيستخدم التعلّم العميق عشان __يولّد بيانات جديدة__ (نص، صور، صوت، برامج). مثال: ChatGPT.', en: '**Generative AI:** inside DL — uses deep learning to __generate new data__ (text, images, audio, programs). e.g. ChatGPT.' },
            { ar: 'القاعدة الذهبية: `AI ⊃ ML ⊃ DL ⊃ GenAI` — من __الأوسع__ للأكثر __تخصصًا__.', en: 'Golden rule: `AI ⊃ ML ⊃ DL ⊃ GenAI` — from the __broadest__ to the most __specialised__.' },
          ],
          notes: [
            { kind: 'tip', title: { ar: 'ذكاء اليوم «ضيّق»', en: 'Today’s AI is "narrow"' }, text: { ar: 'كل نظام ذكاء اصطناعي النهارده __بارع في مهمة واحدة بس__ (يترجم، أو يتعرّف على وشوش…) — مش ذكاء عام يعرف يعمل كل حاجة زي الإنسان.', en: 'Each AI system today is __expert at one task only__ (translating, recognising faces…) — not a general intelligence that can do everything like a human.' } },
            { kind: 'confuse', title: { ar: 'فرق بيلخبط — الأربعة مش نفس الحاجة', en: 'Easily confused — the four are not the same' }, text: { ar: 'AI ≠ ML: الأول مجال واسع والتاني تقنية جوّاه. DL ≠ ML: التعلّم العميق __نوع من__ التعلّم الآلي بيستخدم شبكات عصبية.', en: 'AI ≠ ML: AI is the broad field, ML one technology inside it. DL ≠ ML: deep learning is __a kind of__ ML using neural networks.' } },
            { kind: 'exam', text: { ar: '«التعلّم العميق تقنية منفصلة تمامًا عن التعلّم الآلي» ← __غلط__. و«AI والتعلّم الآلي بنفس المعنى» ← __غلط__.', en: '"DL is completely separate from ML" → __false__. "AI and ML mean the same" → __false__.' } },
          ],
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
          type: 'scene',
          title: { ar: 'طريقتين يخلّوا الكمبيوتر «ذكي»', en: 'Two ways to make a computer "smart"' },
          visual: { anim: 'photo', props: { img: 'img/rules-vs-learned.webp', motion: 'pan', hotspots: [
            { x: 66, y: 40, icon: 'pen', label: { ar: 'قواعد مكتوبة بالإيد', en: 'hand-written rules' }, beat: 0 },
            { x: 25, y: 45, icon: 'brain', label: { ar: 'بيتعلّم من آلاف الأمثلة', en: 'learns from thousands of examples' }, beat: 1 },
          ] } },
          beats: [
            { ar: '**الطريقة الأولى:** الإنسان يكتب __كل قاعدة بإيده__ (لو كذا… يبقى كذا) — مرهقة وبتفشل مع أي حاجة جديدة.', en: '**Way 1:** a human writes __every rule by hand__ (if this… then that) — tiring and fails on anything new.' },
            { ar: '**الطريقة التانية:** نديله __آلاف الأمثلة__ ويستخرج هو الأنماط بنفسه — ده **التعلّم الآلي**.', en: '**Way 2:** give it __thousands of examples__ and it extracts the patterns itself — that is **machine learning**.' },
          ],
        },
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
          title: { ar: 'قواعد مكتوبة ضد التعلّم من البيانات', en: 'Hand-written rules vs learning from data' },
          terms: ['machine learning', 'training data', 'pattern'],
          visual: { anim: 'spamTrainer' },
          beats: [
            { ar: '**الطريقة القديمة:** المبرمج يكتب قاعدة بإيده: «لو الإيميل فيه free يبقى سبام». بس المحتال كتب __fr€e__ → القاعدة __فشلت__!', en: '**The old way:** a programmer writes a rule by hand: "if the email contains free → spam". But a scammer writes __fr€e__ → the rule __fails__!' },
            { ar: '**التعلّم الآلي:** بنديله __أمثلة كتير متعلّم عليها__ (سبام / سليم)، وهو بنفسه __يكتشف الأنماط__: كلمات زي «جايزة» و«فلوس» بتزوّد احتمال السبام.', en: '**Machine learning:** we give it __many labelled examples__ (spam / safe) and it __discovers the patterns__ itself: words like "prize" and "money" raise the spam likelihood.' },
            { ar: '**النتيجة:** النموذج بقى يقدر __يتنبّأ ويحكم__ على إيميلات __جديدة ماشافهاش__ قبل كده — ده بالظبط تعريف التعلّم الآلي.', en: '**Result:** the model can now __predict and judge__ __new emails it has never seen__ — that is exactly what machine learning means.' },
          ],
          notes: [{ kind: 'think', text: { ar: 'فلتر السبام وتوصيات المنتجات مختلفين في الشغل، بس الاتنين __بيتعلّموا أنماط من بيانات سابقة__ عشان يتنبّأوا — ده المشترك بينهم.', en: 'Spam filters and recommendations do different jobs, but both __learn patterns from past data__ to make predictions — that is what they share.' } }],
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
          title: { ar: 'الشبكة العصبية: مستوحاة من خلايا المخ', en: 'Neural networks: inspired by brain cells' },
          terms: ['neural network', 'neuron', 'deep learning'],
          visual: { anim: 'neuralNet' },
          beats: [
            { ar: '**الشبكة العصبية:** نظام مستوحى من طريقة عمل __الخلايا العصبية (العصبونات)__ في المخ — مكوّنات بسيطة كتير متوصّلة ببعض في __طبقات__: إدخال ← مخفية ← إخراج.', en: '**Neural network:** a system modelled on the brain\'s __nerve cells (neurons)__ — many simple components connected in __layers__: input → hidden → output.' },
            { ar: 'الإشارات بتمشي من طبقة للي بعدها، وكل وصلة ليها __وزن__ بيحدّد قوتها.', en: 'Signals flow from layer to layer, and each connection has a __weight__ that sets its strength.' },
            { ar: '**التدريب:** الأوزان بتتغيّر شوية شوية لحد ما الشبكة __تتعلّم من البيانات__ وتقدر تاخد __أحكام معقّدة__ (قطة ولا كلب؟ 96%).', en: '**Training:** the weights change little by little until the network __learns from data__ and makes __complex judgments__ (cat or dog? 96%).' },
            { ar: '**التعلّم العميق** = شبكات بطبقات مخفية __كتير__ + __بيانات ضخمة__. ولو حاجة نادرة في بياناته، غالبًا هيغلط فيها.', en: '**Deep learning** = networks with __many__ hidden layers + __large-scale data__. If something is rare in its data, it will likely get it wrong.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'الشبكة العصبية هي __التقنية الأساسية__ ورا التقدّم الكبير في الذكاء الاصطناعي حديثًا.', en: 'Neural networks are the __core technology__ behind recent AI advances.' } }],
        },
        {
          type: 'scene',
          title: { ar: 'مثال: التعلّم العميق في الأشعة', en: 'Example: deep learning reads X-rays' },
          visual: { anim: 'photo', props: { img: 'img/ai-xray.webp', hotspots: [
            { x: 50, y: 30, icon: 'image', label: { ar: 'آلاف الصور المعنونة', en: 'Thousands of labelled images' }, beat: 0 },
            { x: 45, y: 72, icon: 'network', label: { ar: 'شبكة عصبية عميقة', en: 'Deep neural network' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'عشان النموذج يميّز الصورة السليمة من المريضة، لازم __يتدرّب على آلاف الصور__ المتعلّم عليها «سليم» و«مريض».', en: 'To tell healthy from diseased images, the model must __train on thousands of images__ labelled "healthy" and "diseased".' },
            { ar: 'نفس الفكرة لمزارع عايز يفرّق النبات السليم من المريض — ولو ظهر __مرض نادر__ مااتدرّبش عليه، ممكن يغلط.', en: 'Same idea for a farmer separating healthy and diseased crops — and a __rare disease__ it never trained on may fool it.' },
          ],
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
          title: { ar: 'من طلب صغير… محتوى جديد كامل', en: 'From a short prompt… brand-new content' },
          terms: ['generative AI', 'prompt', 'hallucination'],
          visual: { anim: 'genAI' },
          beats: [
            { ar: '**الذكاء الاصطناعي التوليدي:** بيستخدم __التعلّم العميق__ عشان __يولّد بيانات جديدة__ — نكتبله طلب (prompt) فيكتب نص جديد.', en: '**Generative AI:** uses __deep learning__ to __generate new data__ — we type a prompt and it writes new text.' },
            { ar: 'ومش نص بس: كمان __صور وصوت وبرامج__. مثال: ChatGPT وأدوات توليد الصور.', en: 'Not only text: also __images, audio and programs__. e.g. ChatGPT and image generators.' },
            { ar: '**الهلوسة:** ساعات يولّد كلام __يبدو مقنع جدًا لكنه غلط__! هنا قال إن برج القاهرة اتبنى سنة 1890 — وده غير صحيح.', en: '**Hallucination:** sometimes it produces text that __sounds convincing but is wrong__! Here it claims Cairo Tower was built in 1890 — false.' },
            { ar: '**الحل:** __راجع المصدر دايمًا__ قبل ما تعتمد على إجابته — برج القاهرة اتفتح فعليًا سنة 1961.', en: '**The fix:** __always check the source__ before relying on its answer — Cairo Tower actually opened in 1961.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'فلتر السبام __مش__ مثال على الذكاء التوليدي (هو تعلّم آلي بيصنّف، مش بيولّد محتوى جديد).', en: 'A spam filter is __not__ generative AI (it is classifying ML; it creates no new content).' } },
            { kind: 'think', text: { ar: 'ليه خطر تحط إجابة ذكاء توليدي في تقرير المدرسة زي ما هي؟ لأنها ممكن تكون __هلوسة__ — لازم تتحقّق من مصادر موثوقة وتكتب بفهمك.', en: 'Why is it risky to paste a generative-AI answer into a report as-is? It may be a __hallucination__ — verify with reliable sources and write in your own words.' } },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'ليه الذكاء التوليدي بيهلوس؟ تعالى جوّه دماغه', en: 'Why does generative AI hallucinate? Look inside' },
          enTitle: 'Hallucination — how it happens',
          terms: ['hallucination', 'next-word prediction', 'probability'],
          visual: { anim: 'hallucinationWhy' },
          beats: [
            { ar: 'الذكاء التوليدي بيكتب __كلمة ورا كلمة__: في كل خطوة بيسأل نفسه «إيه الكلمة الجاية الأنسب؟» — زي الإكمال التلقائي في الكيبورد بس أقوى بمراحل.', en: 'Generative AI writes __word after word__: at each step it asks "what is the most suitable next word?" — like keyboard autocomplete, far stronger.' },
            { ar: 'لكل كلمة ممكنة __نسبة احتمال__ اتعلّمها من ملايين النصوص. «1961» و«1890» و«1956» كلهم بيتنافسوا على المكان الفاضي.', en: 'Each possible word has a __probability__ learned from millions of texts. "1961", "1890" and "1956" all compete for the blank.' },
            { ar: 'المشكلة: النموذج __مابيدوّرش في قاعدة حقائق__ — بيختار كلمة «شكلها مناسب». لو اختار 1890 يطلع كلام مقنع جدًا… وغلط. ده **الهلوسة**.', en: 'The catch: the model __does not look anything up__ — it picks a word that "fits". If it picks 1890, the result sounds convincing… and is wrong. That is **hallucination**.' },
            { ar: 'وبتزيد الهلوسة لما المعلومة __نادرة أو مش موجودة__ في بيانات التدريب: بدل ما يقول «مش عارف»، بيأّلف إجابة واثقة.', en: 'Hallucination grows when the information is __rare or missing__ in the training data: instead of "I don’t know", it composes a confident answer.' },
            { ar: '**أشكال الهلوسة:** حقيقة مزيفة · __مرجع أو مصدر مش موجود أصلًا__ · رقم أو حساب غلط. الثلاثة شكلهم مقنع جدًا!', en: '**Kinds of hallucination:** a fake fact · __a source that does not exist__ · a wrong number or calculation. All three look very convincing!' },
          ],
          notes: [{ kind: 'exam', text: { ar: 'الهلوسة = محتوى __يبدو صحيحًا ومقنعًا لكنه مخالف للحقائق__. سببها إن النموذج بيتنبّأ بالكلام المحتمل مش بيتحقّق من الحقيقة.', en: 'Hallucination = content that __sounds right and convincing but contradicts the facts__. It happens because the model predicts likely words instead of checking truth.' } }],
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
          type: 'scene',
          title: { ar: 'إزاي تحمي نفسك من الهلوسة؟ 5 خطوات', en: 'How to protect yourself from hallucination: 5 steps' },
          visual: { anim: 'iconCards', props: { cards: [
            { icon: 'search', motion: 'scan', title: { ar: 'راجع مصدر موثوق', en: 'Check a reliable source' }, sub: { ar: 'كتاب المدرسة · موقع رسمي', en: 'textbook · official site' } },
            { icon: 'book', motion: 'float', title: { ar: 'اطلب المرجع واتأكد منه', en: 'Ask for the source — and verify it' }, sub: { ar: 'افتح الرابط فعلًا', en: 'actually open the link' } },
            { icon: 'scale', motion: 'pulse', title: { ar: 'قارن مصدرين', en: 'Compare two sources' }, sub: { ar: 'لو اختلفوا ← دوّر أكتر', en: 'if they differ → dig deeper' } },
            { icon: 'bulb', motion: 'float', title: { ar: 'للأفكار مش للحقيقة النهائية', en: 'For ideas, not final facts' }, sub: { ar: 'نقطة بداية بس', en: 'only a starting point' } },
            { icon: 'pen', motion: 'pulse', title: { ar: 'افهم واكتب بأسلوبك', en: 'Understand and write it yourself' }, sub: { ar: 'متنقلش زي ما هو', en: 'never copy as-is' } },
          ] } },
          beats: [
            { ar: '**1. راجع مصدر موثوق:** أي معلومة مهمة قارنها بكتاب المدرسة أو موقع رسمي.', en: '**1. Check a reliable source:** compare any important fact with the textbook or an official site.' },
            { ar: '**2. اطلب المرجع واتأكد منه:** لو قالك «حسب كتاب كذا» — دوّر عليه، ممكن يكون __مخترع__!', en: '**2. Ask for the source and verify it:** if it says "according to book X" — look it up; it may be __invented__!' },
            { ar: '**3. قارن مصدرين:** لو المصادر اختلفت، دي علامة إنك محتاج تدوّر أكتر.', en: '**3. Compare two sources:** if they disagree, that is a sign to dig deeper.' },
            { ar: '**4. استخدمه للأفكار:** الذكاء التوليدي ممتاز في الشرح والأفكار، بس __مش مصدر نهائي للحقائق__.', en: '**4. Use it for ideas:** generative AI is great for explanations and ideas, but __not a final source of facts__.' },
            { ar: '**5. افهم واكتب بأسلوبك:** ماتنقلش الإجابة زي ما هي في الواجب — ده بيحميك من الغلط ومن الغش.', en: '**5. Understand and write it yourself:** never paste the answer as-is into homework — this protects you from errors and cheating.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'العادة الذهبية: اتحقّق!', en: 'The golden habit: verify!' },
          visual: { anim: 'photo', props: { img: 'img/verify.webp', motion: 'in', hotspots: [
            { x: 20, y: 55, icon: 'sparkle', label: { ar: 'إجابة الذكاء التوليدي', en: 'the generative-AI answer' }, beat: 0 },
            { x: 60, y: 55, icon: 'search', label: { ar: 'اتحقّق قبل ما تصدّق', en: 'check before you trust' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'الذكاء التوليدي ممكن يقول «مشمس» والدنيا بتمطر — __الإجابة شكلها واثق__ حتى لو غلط.', en: 'Generative AI may say "sunny" while it rains — __the answer sounds confident__ even when wrong.' },
            { ar: 'عشان كده: __قارن بمصدر موثوق__ قبل ما تعتمد على أي معلومة — خصوصًا في الواجبات والتقارير.', en: 'So: __compare with a reliable source__ before relying on any fact — especially in homework and reports.' },
          ],
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
            options: [{ ar: 'ChatGPT', en: 'ChatGPT' }, { ar: 'ذكاء لتوليد الصور', en: 'Image-generation AI' }, { ar: 'فلتر الرسائل المزعجة', en: 'Spam filter' }, { ar: 'ذكاء لتوليد الصوت', en: 'Audio-generation AI' }], answer: 2, explain: { ar: 'فلتر السبام بيصنّف، مش بيولّد.', en: 'A spam filter classifies; it does not generate.' } },
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
              { ar: 'الـ AI نوع من التعلّم الآلي، والتوليدي نوع من الـ AI.', en: 'AI is a type of ML, and GenAI is a type of AI.' },
              { ar: 'التعلّم العميق والتعلّم الآلي تقنيتين مختلفتين تمامًا.', en: 'DL and ML are completely different.' },
              { ar: 'التوليدي بيولّد بيانات من غير ما يستخدم التعلّم الآلي.', en: 'GenAI generates data without using ML.' },
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
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. أيّ دول مش ذكاء توليدي؟', en: '2. Which is NOT generative AI?' }, options: [{ ar: 'ChatGPT', en: 'ChatGPT' }, { ar: 'أداة توليد صور', en: 'Image generator' }, { ar: 'فلتر الرسائل المزعجة', en: 'Spam filter' }, { ar: 'أداة توليد صوت', en: 'Audio generator' }], answer: 2 } },
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
