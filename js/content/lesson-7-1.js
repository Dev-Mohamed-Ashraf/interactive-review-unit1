/* =========================================================
 * content/lesson-7-1.js — أساسيات التعلّم الآلي
 * Pure data. Sources: textbook part 2, 7-1 (EN p.57–67) + memo (Arabic
 * wording, deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('7-1', {
  id: '7-1',
  color: '#8b5cf6',
  cover: 'img/ml-l1-cover.webp',
  title: { ar: 'أساسيات التعلّم الآلي', en: 'The Basics of Machine Learning' },
  guiding: { ar: 'التعلّم الآلي بيحلّ المشاكل إزاي بشكل مختلف عن البرمجة العادية، وإيه أنواعه الأساسية وحدوده؟', en: 'How does machine learning solve problems differently from ordinary programming, and what are its main types and limits?' },
  hook: {
    ar: 'إزاي تعلّم كمبيوتر يفرّق بين قطة وكلب من غير ما تكتب له قاعدة؟ __ماتكتبش القاعدة__ — ورّيه __آلاف الأمثلة__ وسيبه يلاقي القاعدة بنفسه. ده **التعلّم الآلي**، جزء مهم من كتير من أنظمة الذكاء الاصطناعي الحديثة. بيتعلّم أنماط من البيانات عشان يحكم على بيانات جديدة، والبشر هم اللي بيحدّدوا المهمة والبيانات ودالة الهدف وطريقة التقييم. بس هو __مش سحر__: لو الأمثلة **متحيّزة** الأحكام هتبقى متحيّزة، وتفكيره ممكن يبقى **صندوق أسود** حتى لصانعيه — عشان كده بنستخدمه __يدعم__ حكم الإنسان مش __يستبدله__.',
    en: 'How do you teach a computer to tell a cat from a dog without writing it a rule? __Don’t write the rule__ — show it __thousands of examples__ and let it find the rule itself. That is **machine learning**, the engine behind most AI today. It learns patterns from data to judge new data. But it is __not magic__: if the examples are **biased**, so are the judgments, and its reasoning can be a **black box** even to its makers — so it is used to __support__ human judgment, not __replace__ it.',
  },
  keyFact: { ar: 'التعلّم الآلي __بيلاقي القواعد من البيانات__ بدل ما تتدّي له. ليه تلات أشكال — __خاضع للإشراف__ (من أمثلة موسومة)، __غير خاضع للإشراف__ (يلاقي مجموعات محتملة)، و__معزَّز__ (يتعلّم من مكافآت) — بس نتايجه معتمدة على البيانات، فـ__التحيّز__ و__الصندوق الأسود__ بيخلّوه دعم لحكم الإنسان مش بديل.', en: 'Machine learning __finds rules from data__ instead of being given them. It has three forms — __supervised__ (learns from labeled examples), __unsupervised__ (finds hidden groups) and __reinforcement__ (learns from rewards) — but results depend on the data, so __bias__ and the __black box__ make it a support for human judgment, not a substitute.' },
  concepts: ['machine learning', 'supervised learning', 'unsupervised learning', 'reinforcement learning', 'label', 'classification', 'feature', 'clustering', 'state', 'action', 'reward', 'bias', 'black-box problem'],
  objectives: [
    { ar: 'أشرح فكرة التعلّم الآلي وأفرّق بين التعلّم الخاضع للإشراف وغير الخاضع والمعزَّز.', en: 'Explain the idea of machine learning and distinguish supervised, unsupervised and reinforcement learning.' },
    { ar: 'أوصف التصنيف والتجميع والتعلّم المعزَّز بأمثلة، وأشرح حدود تحيّز البيانات ومشكلة الصندوق الأسود.', en: 'Describe classification, clustering and reinforcement learning with examples, and explain the limits from data bias and the black-box problem.' },
  ],

  stations: [
    /* ───────────── 1 · the idea + three kinds ───────────── */
    {
      id: 'idea', kind: 'learn',
      title: { ar: 'فكرة التعلّم الآلي وأنواعه التلاتة', en: 'The idea of ML and its three kinds' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'عايز برنامج يعرف الإيميل المزعج… هتعمل إيه؟', en: 'You want a program that spots spam email… what would you do?' },
            options: [
              { emoji: '📜', text: { ar: 'أكتب قواعد بإيدي لكل حالة', en: 'Write rules by hand for every case' } },
              { emoji: '📚', text: { ar: 'أدّيله آلاف الإيميلات المتعلّم عليها', en: 'Give it thousands of labeled emails' } },
              { emoji: '🎲', text: { ar: 'يختار عشوائي', en: 'Let it pick at random' } },
            ],
            after: { ar: 'الاختيار التاني هو قلب التعلّم الآلي 👇', en: 'The second choice is the heart of machine learning 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: ماتكتبش القاعدة… ورّيه أمثلة', en: '🎞️ Animation: don’t write the rule… show examples' },
          enTitle: 'The idea of machine learning',
          terms: ['machine learning', 'supervised learning', 'unsupervised learning', 'reinforcement learning'],
          visual: { anim: 'mlMovie', props: { scenes: [0, 2] } },
          beats: [
            { ar: '**التعلّم الآلي:** مجال بيستخدم __خوارزميات بتتعلّم أنماط من البيانات__ عشان تبني __نموذج يؤدي مهمة محددة__ (تنبؤ، تصنيف، دعم قرار) على بيانات جديدة — وهو __أحد الأساليب الرئيسة__ في بناء أنظمة الذكاء الاصطناعي. الفرق عن **البرمجة التقليدية**: في التقليدية الإنسان بيدّي __قواعد القرار + بيانات الإدخال__ والجهاز __يطلّع الإجابات__ باتباع القواعد؛ في التعلّم الآلي الإنسان بيدّي __بيانات كتير (بإجابات صحيحة لو موجودة)__ والجهاز __يلاقي قواعد القرار بنفسه__.', en: '**Machine learning:** a technology that __learns patterns and regularities from large amounts of data__ to __judge and predict on new data__ — __the most common way AI works__. Versus **conventional programming**: there, humans provide __the decision rules + input data__ and the computer __produces answers__ by following the rules; in ML, humans provide __lots of data (with correct answers where available)__ and the computer __finds the decision rules itself__.' },
            { ar: '🎯 التعلّم الآلي بينفع في المشاكل اللي __صعب الإنسان يعبّر عن قواعدها بالكلام__: الصورة كلب ولا قطة؟ الإيميل مزعج؟ تحويل الصوت لنص — القواعد __أعقد من إن الإنسان يكتبها كاملة__، فنخلّي الجهاز يتعلّم من الأمثلة. ❌ أما جمع رقمين = __قاعدة بسيطة__، مش محتاج تعلّم آلي. وهو __مش حل سحري__: جودة البيانات وتمثيلها والتدريب والتقييم بيأثّروا في الأداء، وزيادة البيانات لوحدها مابتضمنش التحسن.', en: '🎯 ML suits problems where __rules are hard for humans to put into words__: is the photo a dog or a cat? is the email spam? speech-to-text — the rules are __too complex to write out in full__, so we let the computer learn from examples. ❌ Adding two numbers = __a simple rule__, no ML needed. And it is __not a solution to everything__.' },
            { ar: '🧭 **تلات أنواع رئيسية (مع وجود أساليب تانية):** 🏷️ **خاضع للإشراف** — بياناته __أزواج إدخال + إجابة صحيحة (وسم)__ ← يتعلّم قواعد يتنبّأ بيها بالإجابة · 📦 **غير خاضع للإشراف** — __الإدخال بس من غير إجابات__ ← يلاقي __بنية أو مجموعات محتملة__ · 🎮 **معزَّز** — __حالات وأفعال ومكافآت من التفاعل مع البيئة__ ← يتعلّم __سياسة لاختيار الأفعال__ عشان أفضل النتايج مع الزمن. الاختيار حسب البيانات والمشكلة: عندك إجابات قديمة؟ إشراف · مفيش إجابات وعايز مجموعات؟ غير إشراف · تجربة وخطأ؟ معزَّز.', en: '🧭 **Three kinds:** 🏷️ **supervised** — data are __input + correct answer (label) pairs__ → learns rules to predict the answer · 📦 **unsupervised** — __input only, no answers__ → finds __hidden structure or groups__ · 🎮 **reinforcement** — __actions and their results (rewards)__ → learns __to choose actions leading to better results__. Choose by the data and problem: past answers? supervised · no answers, want groups? unsupervised · trial and error? reinforcement.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل مشكلة: محتاجة تعلّم آلي ولا قاعدة بسيطة تكفي؟', en: 'Does each problem need ML, or is a simple rule enough?' },
            groups: [{ icon: 'brain', label: { ar: 'تعلّم آلي', en: 'Machine learning' } }, { icon: 'code', label: { ar: 'قاعدة بسيطة', en: 'A simple rule' } }],
            items: [
              { text: { ar: 'التعرّف على نوع الحيوان في صورة', en: 'Recognizing the animal in a photo' }, group: 0 },
              { text: { ar: 'جمع رقمين صحيحين', en: 'Adding two integers' }, group: 1 },
              { text: { ar: 'تحويل الكلام لنص', en: 'Turning speech into text' }, group: 0 },
              { text: { ar: 'حساب متوسط درجات فصل', en: 'Computing a class’s average score' }, group: 1 },
              { text: { ar: 'معرفة الإيميل المزعج', en: 'Spotting spam email' }, group: 0 },
            ],
            explain: { ar: 'قواعد معقّدة صعب تتكتب = تعلّم آلي · حساب واضح = قاعدة.', en: 'Complex, hard-to-write rules = ML · a clear calculation = a rule.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل نوع تعلّم بالبيانات اللي بياخدها:', en: 'Match each kind of learning with the data it receives:' },
            left: [{ ar: 'خاضع للإشراف', en: 'Supervised' }, { ar: 'غير خاضع للإشراف', en: 'Unsupervised' }, { ar: 'معزَّز', en: 'Reinforcement' }],
            right: [{ ar: 'إدخال بس من غير إجابات', en: 'Input only, no answers' }, { ar: 'أفعال ونتايجها (مكافآت)', en: 'Actions and their rewards' }, { ar: 'أزواج إدخال + وسم', en: 'Input + label pairs' }],
            answer: [2, 0, 1],
            explain: { ar: 'إشراف = وسم · غير إشراف = إدخال بس · معزَّز = مكافآت.', en: 'Supervised = labels · unsupervised = input only · reinforcement = rewards.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**تقليدية:** الإنسان يكتب القواعد · **تعلّم آلي:** الجهاز يلاقي القواعد من البيانات.', en: '**Conventional:** humans write the rules · **ML:** the computer finds the rules from data.' },
            { ar: 'بينفع لما القواعد __صعب تتكتب__ (صور، إيميل مزعج، كلام) — مش لجمع رقمين.', en: 'Fits when rules are __hard to write__ (images, spam, speech) — not for adding numbers.' },
            { ar: '**إشراف** (وسوم) · **غير إشراف** (مجموعات) · **معزَّز** (مكافآت).', en: '**Supervised** (labels) · **unsupervised** (groups) · **reinforcement** (rewards).' },
          ],
        },
      ],
    },

    /* ───────────── 2 · the tasks + limits ───────────── */
    {
      id: 'tasks', kind: 'learn',
      title: { ar: 'تصنيف · تجميع · معزَّز… والحدود', en: 'Classification · clustering · reinforcement… and the limits' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: وسوم… مجموعات… مكافآت… وصندوق أسود', en: '🎞️ Animation: labels… groups… rewards… and a black box' },
          enTitle: 'ML tasks and limits',
          terms: ['classification', 'label', 'feature', 'clustering', 'state', 'action', 'reward', 'bias', 'black-box problem'],
          visual: { anim: 'mlMovie', props: { scenes: [3, 9] } },
          beats: [
            { ar: '🏷️ **التصنيف:** طريقة بتتنبّأ __البيانات دي تبع أنهي نوع (فئة)__ — مثال مشهور للتعلّم الخاضع للإشراف: فرز الإيميل «مزعج» أو «عادي»، الصور الطبية «غير طبيعي» أو «طبيعي»، الحيوانات «كلب/قطة/طائر». ① __التدريب__: بندّيله بيانات كتير بإجابات صحيحة (**وسوم**) فيلاقي قواعد التصنيف (حد فاصل) · ② __التنبّؤ__: بعد التدريب يحدّد فئة __بيانات جديدة من غير وسم__.', en: '🏷️ **Classification:** predicting __which kind (class) the input belongs to__ — a classic supervised task: sorting email into "spam" or "normal", medical images into "abnormal" or "normal", animals into "dog/cat/bird". ① __Training__: give it lots of data with correct answers (**labels**) so it finds the classification rules (a boundary) · ② __Prediction__: after training it assigns __new, unlabeled data__ to a class.' },
            { ar: '🔤 **السمة (Feature):** المعلومة في بيانات التدريب اللي __تنفع دليل للتنبّؤ__ — زي __نوع الكلمات في الإيميل، وعنوان المرسِل، وطول النص__. و__اختيار السمات أو تعلّم تمثيل مناسب ليها بيأثّر في الأداء__: بعض السمات المطوّر بيحدّدها يدويًا، وبعض النماذج الحديثة بتتعلّم تمثيلاتها تلقائيًا، ولازم نتجنّب تسرب البيانات والتحيز غير الضروري.', en: '🔤 **Feature:** the information in the training data that __serves as a clue for prediction__ — e.g. __the kinds of words in the email, the sender’s address, the text length__. __Choosing features greatly affects classification accuracy__.' },
            { ar: '📦 **التجميع (Clustering):** طريقة بتقسّم البيانات لعناقيد __وفق السمات ومقياس التشابه والإعدادات__ — بتقترح بنية محتملة، ومابتثبتش وجود مجموعات «طبيعية» حقيقية — مثال للتعلّم غير الخاضع للإشراف: عملاء متجر باتجاهات شراء متشابهة، مستمعين موسيقى بأنماط متشابهة للتوصيات، مقالات أخبار متشابهة تلقائيًا. التشابه بيتقاس حسب اللي المصمّم بيحدّده، وبعض الخوارزميات زي __k-means__ بتتطلب تحديد عدد العناقيد مسبقًا. ⚖️ الفرق عن التصنيف = __الوسوم__: التصنيف (وسوم مدّية ← فئة بيانات جديدة) · التجميع (من غير وسوم ← مجموعات محتملة) — والبشر بيفسّروا نتايجه ويستخدموها في التسويق وتطوير المنتجات.', en: '📦 **Clustering:** __grouping similar items into groups (clusters)__ — an unsupervised example: shoppers with similar buying trends, music listeners with similar patterns for recommendations, similar news articles automatically. __The computer itself finds "what is similar"__, even when __the groups’ names or number are unknown__. ⚖️ The difference from classification = __labels__: classification (labels given → class of new data) · clustering (no labels → natural groups) — humans interpret the results for marketing and product development.' },
            { ar: '🎮 **التعلّم المعزَّز:** __وكيل بيتفاعل مع بيئة__، ويختار أفعال، ويستقبل إشارات مكافأة، ويتعلّم __سياسة هدفها زيادة مجموع المكافآت المتوقعة مع الزمن__ — زي إحراز درجة عالية في لعبة بالتجربة والخطأ، روبوت يتعلّم يمشي من غير ما يقع، عربية ذاتية القيادة تتعلّم قيادة آمنة. عناصره: 📍 **الحالة** (الموقف اللي الوكيل فيه) · 🕹️ **الفعل** (الاختيارات المتاحة) · 🏆 **المكافأة** (رقم بيقيّم الفعل). بيتميّز إنه __بيتعلّم من نتايج أفعاله هو__ مش من «إدخال ← إجابة»، وبيناسب مهام __نقدر نعرّف ليها هدف أو مكافأة__، والوكيل يتفاعل فيها مع __بيئة آمنة ومناسبة__ (غالبًا محاكيات أو ألعاب).', en: '🎮 **Reinforcement learning:** __actions__ are chosen in a situation, and __better choices are learned from the resulting reward__ — e.g. scoring high in a game by trial and error, a robot learning to walk without falling, a self-driving car learning safe driving. Elements: 📍 **state** (the agent’s situation) · 🕹️ **action** (the available choices) · 🏆 **reward** (a number scoring the action). It is distinct in __learning from the consequences of its own actions__ rather than "input → answer", and suits problems with __no known answer but a judgeable result__ (often simulators or games).' },
            { ar: '⚖️ **التحيّز:** جودة بيانات التدريب وتحيّزها بيأثّروا في النتايج — __بيانات متحيّزة ← أحكام متحيّزة__. مثال: نموذج بينبّه على الطلبة اللي محتاجين دعم، اتدرّب بس على طلبة __طلبوا مساعدة قبل كده__ ← اتعلّم نمط «__مين بيطلب__» مش «__مين محتاج__»، ففات __الطلبة الساكتين__. الإصلاح: بيانات فيها نتايج فعلية لطلبة ماطلبوش.', en: '⚖️ **Bias:** the quality and bias of training data affect results — __biased data → biased judgments__. Example: a model flagging students who need support, trained only on students __who had already asked for help__ → it learned "__who asks__", not "__who needs__", and missed __quiet students__. The fix: data including real outcomes for students who never asked.' },
            { ar: '⬛ **مشكلة الصندوق الأسود:** __أساس حكم النموذج صعب البشر يشوفوه__. لو مدرّس اتصرّف على تنبيه من غير ما يفهم سببه، ممكن يظلم طالب. عشان كده: __خلّي إنسان في الحلقة__ — النموذج __يقترح__ والإنسان __يقرّر__، خصوصًا في القرارات اللي غلطتها مكلّفة. التعلّم الآلي __أداة بتدعم حكم الإنسان مش بديل عنه__.', en: '⬛ **The black-box problem:** __the basis of the model’s judgment is hard for humans to see__. If a teacher acted on a flag without understanding why, a student could be treated unfairly. So: __keep a human in the loop__ — the model __suggests__, the human __decides__, especially for costly decisions. ML is __a tool that supports human judgment, not a replacement for it__.' },
            { ar: '📌 **الخلاصة:** الجهاز بيلاقي القواعد من البيانات · إشراف (وسوم ← تصنيف بسمات) · غير إشراف (من غير وسوم ← تجميع) · معزَّز (حالة · فعل · مكافأة) · والتحيّز والصندوق الأسود بيخلّوه __دعم للإنسان__.', en: '📌 **The point:** the computer finds rules from data · supervised (labels → classification with features) · unsupervised (no labels → clustering) · reinforcement (state · action · reward) · bias and the black box keep it __a support for humans__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«الخاضع للإشراف بياخد بيانات من غير وسوم» ← __غلط__ · «التجميع بيجمّع حسب وسوم مدّية» ← __غلط__ · «التعلّم الآلي حل لكل حاجة وأحسن من الإنسان» ← __غلط__ · «أساس الحكم بيتعرض دايمًا بسهولة» ← __غلط__ (صندوق أسود). جمع رقمين ← __مش محتاج تعلّم آلي__ · روبوت يمشي بالتجربة ← __معزَّز__ · فئة مقال جديد من فئات معروفة ← __تصنيف__.', en: '"Supervised learning gets unlabeled data" → __false__ · "clustering groups by given labels" → __false__ · "ML solves everything, beating humans" → __false__ · "the basis of judgment is always shown clearly" → __false__ (black box). Adding two numbers → __no ML needed__ · a robot learning to walk by trial → __reinforcement__ · a new article into known categories → __classification__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — أنهي طريقة؟', en: 'Deep dive — which method?' }, text: { ar: 'ابدأ من بياناتك: عندي أمثلة بإجابات صحيحة؟ ← __خاضع للإشراف__ (ولو الهدف «أنهي فئة؟» يبقى تصنيف). مفيش إجابات وعايز أكتشف مجموعات؟ ← __غير خاضع__ (تجميع). مفيش إجابة معروفة بس أقدر أقيّم النتيجة بالتجربة؟ ← __معزَّز__. مثال: «رتّب الرسايل مزعج/عادي» ومعايا 10,000 رسالة موسومة ← تصنيف. «اكتشف أنواع الرسايل الموجودة من غير ما أعرف أساميها» ← تجميع.', en: 'Start from your data: examples with correct answers? → __supervised__ (if the goal is "which class?", it is classification). No answers and want to discover groups? → __unsupervised__ (clustering). No known answer but the result can be judged by trial? → __reinforcement__. E.g. "sort messages into spam/normal" with 10,000 labeled messages → classification. "Discover what kinds of messages exist without knowing their names" → clustering.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل موقف: تصنيف ولا تجميع ولا معزَّز؟', en: 'Is each situation classification, clustering or reinforcement?' },
            groups: [{ icon: 'target', label: { ar: 'تصنيف', en: 'Classification' } }, { icon: 'users', label: { ar: 'تجميع', en: 'Clustering' } }, { icon: 'star', label: { ar: 'معزَّز', en: 'Reinforcement' } }],
            items: [
              { text: { ar: 'مقالات أخبار وفئاتها، ونحدّد فئة مقال جديد', en: 'News articles with categories; assign a new article' }, group: 0 },
              { text: { ar: 'سجلات شراء، ونلاقي مجموعات عملاء متشابهين', en: 'Purchase records; find groups of similar customers' }, group: 1 },
              { text: { ar: 'كمبيوتر بيلعب لعبة ويتعلّم يجيب درجات عالية', en: 'A computer plays a game and learns to score high' }, group: 2 },
              { text: { ar: 'صور أشعة موسومة، ونحكم على صورة جديدة', en: 'Labeled X-rays; judge a new image' }, group: 0 },
              { text: { ar: 'روبوت بيتعلّم يمشي من غير ما يقع', en: 'A robot learns to walk without falling' }, group: 2 },
            ],
            explain: { ar: 'وسوم + فئة = تصنيف · من غير وسوم + مجموعات = تجميع · تجربة ومكافأة = معزَّز.', en: 'Labels + class = classification · no labels + groups = clustering · trial and reward = reinforcement.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'نموذج بينبّه على الطلبة المحتاجين دعم، اتدرّب بس على طلبة طلبوا مساعدة قبل كده. إيه المشكلة؟', en: 'A model flags students needing support, trained only on students who had asked for help. What is the problem?' },
            options: [
              { ar: 'تحيّز: اتعلّم «مين بيطلب» ففات الطلبة الساكتين', en: 'Bias: it learned "who asks" and misses quiet students' },
              { ar: 'مفيش مشكلة لأن البيانات حقيقية ومن المدرسة نفسها', en: 'No problem, because the data is real and from the school' },
              { ar: 'المشكلة إنه تعلّم معزَّز ومالوش مكافأة واضحة خالص', en: 'The issue is that it is reinforcement with no clear reward' },
              { ar: 'المشكلة إن عدد السمات قليل بس، والحل نزوّد سمات', en: 'The issue is just too few features; add more features' },
            ],
            answer: 0,
            explain: { ar: 'بيانات متحيّزة ← أحكام متحيّزة.', en: 'Biased data → biased judgments.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**التصنيف:** وسوم ← حد فاصل ← فئة بيانات جديدة · **السمة:** دليل للتنبّؤ.', en: '**Classification:** labels → boundary → class of new data · **feature:** a clue for prediction.' },
            { ar: '**التجميع:** من غير وسوم ← مجموعات محتملة · **المعزَّز:** حالة · فعل · مكافأة.', en: '**Clustering:** no labels → natural groups · **reinforcement:** state · action · reward.' },
            { ar: '**التحيّز** + **الصندوق الأسود** ← إنسان في الحلقة: النموذج يقترح والإنسان يقرّر.', en: '**Bias** + **black box** → a human in the loop: the model suggests, the human decides.' },
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
            { text: { ar: 'A) التعلّم الآلي تقنية بتتعلّم أنماط من بيانات كتير عشان تحكم وتتنبّأ على بيانات جديدة.', en: 'A) ML learns patterns from large data to judge and predict on new data.' }, answer: true },
            { text: { ar: 'B) في التعلّم الخاضع للإشراف، النموذج بيتعلّم من بيانات من غير إجابات صحيحة (وسوم).', en: 'B) In supervised learning, the model learns from data with no correct answers (labels).' }, answer: false },
            { text: { ar: 'C) التجميع طريقة بتجمّع البيانات حسب وسوم مدّية مسبقًا.', en: 'C) Clustering groups data according to labels given in advance.' }, answer: false },
            { text: { ar: 'D) التعلّم المعزَّز بيتعلّم يختار أفعال أحسن على أساس المكافأة الناتجة.', en: 'D) Reinforcement learning learns to choose better actions from the resulting reward.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) تعريف التعلّم الآلي ← **✓**.', en: 'A) The definition of ML → **✓**.' },
            { ar: 'B) من غير وسوم = __غير خاضع__؛ الخاضع بتتدّي فيه الإجابات ← **✗**.', en: 'B) No labels = __unsupervised__; supervised is given the answers → **✗**.' },
            { ar: 'C) التجميع بيلاقي مجموعات __من غير وسوم__ ← **✗**.', en: 'C) Clustering finds groups __without labels__ → **✗**.' },
            { ar: 'D) تعريف المعزَّز ← **✓**.', en: 'D) The definition of reinforcement → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمصطلح (A–C):', en: '(2) Match each description (a–c) with the term (A–C):' },
            left: [
              { ar: 'a) يتعلّم قواعد التنبّؤ من أزواج (إدخال + إجابة صحيحة)', en: 'a) Learns prediction rules from (input + correct answer) pairs' },
              { ar: 'b) يلاقي مجموعات متشابهة من بيانات من غير إجابات', en: 'b) Finds groups of similar items in data with no answers' },
              { ar: 'c) معلومة في الإدخال تنفع دليل للتنبّؤ في التصنيف', en: 'c) Information in the input serving as a clue in classification' },
            ],
            right: [{ ar: 'A السمة', en: 'A Feature' }, { ar: 'B الخاضع للإشراف', en: 'B Supervised learning' }, { ar: 'C التجميع', en: 'C Clustering' }],
            answer: [1, 2, 0] },
          solution: [
            { ar: 'a: أزواج بإجابات = **إشراف** ← B.', en: 'a: pairs with answers = **supervised** → B.' },
            { ar: 'b: مجموعات من غير إجابات = **تجميع** ← C.', en: 'b: groups without answers = **clustering** → C.' },
            { ar: 'c: دليل للتنبّؤ = **سمة** ← A.', en: 'c: a clue for prediction = **feature** → A.' },
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
            { q: { ar: '1. التقنية اللي بتتعلّم أنماط من بيانات كتير عشان تحكم على بيانات جديدة؟', en: '1. The technology that learns patterns from big data to judge new data?' }, a: { ar: 'التعلّم الآلي', en: 'Machine learning' } },
            { q: { ar: '2. المعلومة في الإدخال اللي تنفع دليل مفيد للتنبّؤ؟', en: '2. The information in the input that is a useful clue for prediction?' }, a: { ar: 'السمة', en: 'Feature' } },
            { q: { ar: '3. طريقة غير خاضعة للإشراف بتجمّع المتشابه مع بعض؟', en: '3. The unsupervised method that groups similar items?' }, a: { ar: 'التجميع', en: 'Clustering' } },
            { q: { ar: '4. في المعزَّز، الرقم اللي بيقيّم نتيجة الفعل؟', en: '4. In reinforcement learning, the number rating an action’s result?' }, a: { ar: 'المكافأة', en: 'Reward' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ موقف مناسب للتعلّم الآلي؟', en: 'Which is __not__ a suitable situation for machine learning?' },
            options: [
              { ar: 'A تمييز نوع الحيوان في صورة', en: 'A Telling which animal is in an image' },
              { ar: 'B تحويل الكلام لنص مكتوب', en: 'B Transcribing speech into text' },
              { ar: 'C حساب مجموع رقمين صحيحين', en: 'C Computing the sum of two integers' },
              { ar: 'D معرفة إذا كان الإيميل مزعج', en: 'D Telling whether an email is spam' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'الجمع قاعدة بسيطة (C).', en: 'Addition is a simple rule (C).' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'classify', prompt: { ar: 'لكل غرض اختار طريقة التعلّم:', en: 'Choose the learning method for each purpose:' },
            groups: [{ icon: 'users', label: { ar: 'A غير خاضع للإشراف', en: 'A Unsupervised' } }, { icon: 'target', label: { ar: 'B خاضع للإشراف', en: 'B Supervised' } }, { icon: 'star', label: { ar: 'C معزَّز', en: 'C Reinforcement' } }],
            items: [
              { text: { ar: 'a) نتنبّأ هل عميل جديد هيشتري من سجل شراء قديم (اشترى/لأ)', en: 'a) Predict whether a new customer will buy, from past buy/no-buy records' }, group: 1 },
              { text: { ar: 'b) نلاقي مجموعات عملاء باتجاهات شراء متشابهة', en: 'b) Find groups of customers with similar buying tendencies' }, group: 0 },
              { text: { ar: 'c) روبوت بيتعلّم يمشي من غير ما يقع بالتجربة والخطأ', en: 'c) A robot learns to walk without falling by trial and error' }, group: 2 },
            ],
            explain: { ar: 'a ← B · b ← A · c ← C.', en: 'a → B · b → A · c → C.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (3)', en: 'Try 2 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف الفرق بين التصنيف والتجميع:', en: 'Choose the best description of classification vs clustering:' },
            options: [
              { ar: 'A التصنيف لمجموعات قليلة، والتجميع لمجموعات كتير', en: 'A Classification makes few groups; clustering many' },
              { ar: 'B التصنيف للأرقام بس، والتجميع للنصوص بس', en: 'B Classification is for numbers only; clustering text only' },
              { ar: 'C التصنيف من بيانات بوسوم، والتجميع من غير وسوم', en: 'C Classification uses labeled data; clustering unlabeled' },
              { ar: 'D التصنيف غير خاضع للإشراف، والتجميع خاضع', en: 'D Classification is unsupervised; clustering supervised' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'الفرق = الوسوم (C).', en: 'The difference = labels (C).' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (4)', en: 'Try 2 (4)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ نقطة انتباه صحيحة للتعلّم الآلي؟', en: 'Which is __not__ a correct point of care for machine learning?' },
            options: [
              { ar: 'A لو بيانات التدريب متحيّزة، أحكامه ممكن تتحيّز', en: 'A Biased training data may bias its judgments' },
              { ar: 'B أساس أحكامه ممكن مايبانش، فالمهم يتراجع بشريًا', en: 'B Its basis may be hidden, so key decisions need humans' },
              { ar: 'C حل لكل حاجة وأدق من الإنسان في أي مشكلة', en: 'C It solves everything and beats humans on any problem' },
              { ar: 'D مهم نستخدمه أداة بتدعم حكم الإنسان', en: 'D It should be used as a tool supporting human judgment' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'C غلط.', en: 'C is wrong.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(g):', en: 'Read and fill blanks (a)–(g):' },
            text: { ar: 'التعلّم الآلي بيبني نماذج بتتعلّم أنماط من البيانات عشان تؤدي مهمة على بيانات جديدة. الدرس بيركّز على التعلّم {0} من أمثلة ليها أهداف معروفة، و{1} للبحث عن بنية من غير أهداف معروفة، و{2} اللي بيتعلّم من {3} خلال التفاعل. وفي {4} بنتنبّأ بالفئة باستخدام {5} أو تمثيلات مناسبة، بينما {6} بيقسّم البيانات لعناقيد وفق مقياس تشابه وإعدادات محددة.', en: 'ML has three kinds: {0} learning from input–answer pairs, {1} learning that finds groups in data with no answers, and {2} learning that chooses better actions based on the {3}. In {4} (a supervised example) the choice of {5} greatly affects the result. In {6} (an unsupervised example) the computer finds "what is similar" itself.' },
            bank: [{ ar: 'الخاضع للإشراف', en: 'supervised' }, { ar: 'غير الخاضع للإشراف', en: 'unsupervised' }, { ar: 'المعزَّز', en: 'reinforcement' }, { ar: 'المكافأة', en: 'reward' }, { ar: 'التصنيف', en: 'classification' }, { ar: 'السمات', en: 'features' }, { ar: 'التجميع', en: 'clustering' }],
            answer: [0, 1, 2, 3, 4, 5, 6],
            explain: { ar: '(a) إشراف (b) غير إشراف (c) معزَّز (d) المكافأة (e) التصنيف (f) السمات (g) التجميع.', en: '(a) supervised (b) unsupervised (c) reinforcement (d) reward (e) classification (f) features (g) clustering.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف الفرق بين البرمجة التقليدية والتعلّم الآلي:', en: 'Choose the best description of conventional programming vs ML:' },
            options: [
              { ar: 'A التقليدية: الإنسان بيدّي القواعد · التعلّم الآلي: الجهاز يلاقيها', en: 'A Conventional: humans give rules · ML: the computer finds them' },
              { ar: 'B التقليدية محتاجة بيانات كتير، والتعلّم الآلي محتاج قواعد بس', en: 'B Conventional needs much data; ML needs only rules' },
              { ar: 'C التقليدية جزء من الذكاء الاصطناعي، والتعلّم الآلي مش منه', en: 'C Conventional is part of AI, but ML is not' },
              { ar: 'D التقليدية بتحلّ المشاكل الجديدة، والتعلّم الآلي الثابتة بس', en: 'D Conventional handles new problems; ML only fixed ones' },
            ],
            fixedOrder: true, answer: 0,
            explain: { ar: 'A صح.', en: 'A is right.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'classify', prompt: { ar: 'لكل موقف اختار المصطلح:', en: 'Choose the term for each situation:' },
            groups: [{ icon: 'star', label: { ar: 'A معزَّز', en: 'A Reinforcement' } }, { icon: 'users', label: { ar: 'B تجميع', en: 'B Clustering' } }, { icon: 'target', label: { ar: 'C تصنيف', en: 'C Classification' } }],
            items: [
              { text: { ar: 'a) نصوص مقالات وفئاتها، ونحدّد فئة الجديد تلقائيًا', en: 'a) Article texts with categories; categorize new ones' }, group: 2 },
              { text: { ar: 'b) سجلات شراء، ونلاقي مستخدمين متشابهين', en: 'b) Purchase records; find similar users' }, group: 1 },
              { text: { ar: 'c) كمبيوتر بيلعب ويتعلّم يجيب درجات عالية', en: 'c) A computer plays and learns to score high' }, group: 0 },
            ],
            explain: { ar: 'a ← C · b ← B · c ← A.', en: 'a → C · b → B · c → A.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (3)', en: 'Exercise 3 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ وصف صح لخصائص التعلّم الآلي وحدوده؟', en: 'Which is __not__ a correct description of ML’s traits and limits?' },
            options: [
              { ar: 'A بيتستخدم لما القواعد صعب تتقال بالكلام', en: 'A Used where rules are hard to put into words' },
              { ar: 'B نتايجه بتتأثّر بجودة بيانات التدريب وتحيّزها', en: 'B Results depend on training-data quality and bias' },
              { ar: 'C أساس حكمه بيتعرض دايمًا للبشر بسهولة', en: 'C Its basis is always shown to humans clearly' },
              { ar: 'D نستخدمه يدعم حكم الإنسان مش بديل عنه', en: 'D Use it to support humans, not replace them' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'C غلط — صندوق أسود.', en: 'C is wrong — the black box.' } },
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
          { front: { ar: 'التعلّم الآلي', en: 'Machine learning' }, back: { ar: 'يتعلّم القواعد من البيانات عشان يحكم على بيانات جديدة.', en: 'Learns rules from data to judge new data.' } },
          { front: { ar: 'الوسم', en: 'Label' }, back: { ar: 'الإجابة الصحيحة مع بيانات التدريب.', en: 'The correct answer attached to training data.' } },
          { front: { ar: 'التصنيف', en: 'Classification' }, back: { ar: 'نتنبّأ الإدخال تبع أنهي فئة (إشراف).', en: 'Predict which class an input belongs to (supervised).' } },
          { front: { ar: 'السمة', en: 'Feature' }, back: { ar: 'دليل في البيانات مفيد للتنبّؤ.', en: 'A clue in the data useful for prediction.' } },
          { front: { ar: 'التجميع', en: 'Clustering' }, back: { ar: 'نجمّع المتشابه من غير وسوم (غير إشراف).', en: 'Group similar items with no labels (unsupervised).' } },
          { front: { ar: 'الحالة · الفعل · المكافأة', en: 'State · action · reward' }, back: { ar: 'عناصر التعلّم المعزَّز.', en: 'The elements of reinforcement learning.' } },
          { front: { ar: 'التحيّز', en: 'Bias' }, back: { ar: 'بيانات منحرفة ← أحكام منحرفة.', en: 'Skewed data → skewed judgments.' } },
          { front: { ar: 'مشكلة الصندوق الأسود', en: 'Black-box problem' }, back: { ar: 'أساس الحكم صعب يتشاف ← إنسان في الحلقة.', en: 'The basis of judgment is hard to see → a human in the loop.' } },
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
            prompt: { ar: 'اشرح ليه التعلّم الآلي لازم يدعم حكم الإنسان مش يستبدله. (أشِر إلى: تحيّز البيانات ومشكلة الصندوق الأسود)', en: 'Explain why machine learning should support human judgment rather than replace it. (Refer to: data bias and the black-box problem)' },
            points: [
              { ar: 'النتايج بجودة البيانات: متحيّزة ← أحكام متحيّزة (مثال).', en: 'Results follow data quality: biased → biased (example).' },
              { ar: 'الصندوق الأسود: أساس الحكم مخفي.', en: 'Black box: the basis is hidden.' },
              { ar: 'إنسان في الحلقة للقرارات المكلّفة.', en: 'A human in the loop for costly decisions.' },
            ],
            model: { ar: 'التعلّم الآلي بيتعلّم من البيانات، فنتايجه على قد جودتها: لو البيانات __متحيّزة__ الأحكام هتبقى متحيّزة — زي نموذج اتدرّب بس على طلبة طلبوا مساعدة، فاتعلّم «مين بيطلب» وفات الطلبة الساكتين المحتاجين. كمان فيه __مشكلة الصندوق الأسود__: أساس حكم النموذج صعب البشر يشوفوه، فلو مدرّس اتصرّف على تنبيه من غير ما يفهم سببه ممكن يظلم طالب. عشان كده نخلّي __إنسان في الحلقة__: النموذج يقترح والإنسان يراجع ويقرّر، خصوصًا في القرارات اللي غلطتها مكلّفة.', en: 'ML learns from data, so its results are only as good as the data: if the data is __biased__, the judgments are biased — like a model trained only on students who asked for help, learning "who asks" and missing quiet students in need. There is also the __black-box problem__: the basis of the model’s judgment is hard for humans to see, so a teacher acting on a flag without understanding it might treat a student unfairly. So we keep __a human in the loop__: the model suggests, the human reviews and decides, especially when mistakes are costly.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — بيانات المدرسة', en: 'Think as an engineer — the school’s data' },
            prompt: { ar: 'مدرستك عندها بيانات سنين وعايزة: (i) تنبّه بدري على طلبة ممكن يحتاجوا دعم، و(ii) تكتشف مجموعات محتملة لعادات المذاكرة مكانتش معروفة. ١) سمِّ نوع التعلّم لكل مهمة، وعنصر بيانات هتجمعه، ونوع طالب ممكن البيانات تفوّته. ٢) سمِّ طريقة ممكن تخلّي بيانات (i) متحيّزة، والضرر من الصندوق الأسود. ٣) حدّد القرارات اللي هيفضل فيها إنسان مسؤول، والضمانة اللي عمرك ما هتشيلها.', en: 'Your school has years of data and wants (i) to flag early students who may need support and (ii) to discover natural groups of study habits. 1) Name the learning type for each task, a data item to collect, and a kind of student the data may miss. 2) Name a way (i)’s data could be biased, and the harm from the black box. 3) State which decisions keep a human in charge, and the one safeguard you would never remove.' },
            points: [
              { ar: '(i) خاضع للإشراف (تصنيف) · (ii) غير خاضع (تجميع).', en: '(i) supervised (classification) · (ii) unsupervised (clustering).' },
              { ar: 'تحيّز: بيانات اللي طلبوا مساعدة بس · ضرر: ظلم طالب.', en: 'Bias: only students who asked · harm: unfair treatment.' },
              { ar: 'إنسان يقرّر في أي تدخّل مع طالب.', en: 'A human decides any intervention with a student.' },
            ],
            model: { ar: '١) (i) __خاضع للإشراف__ (تصنيف: يحتاج دعم/لأ) — محتاج درجات وحضور ونتايج فعلية سابقة؛ ممكن يفوّت طلبة جداد مالهمش تاريخ. (ii) __غير خاضع__ (تجميع) — محتاج أوقات المذاكرة وطرقها؛ ممكن يفوّت اللي مابيسجّلوش عاداتهم. ٢) لو بيانات (i) شاملة بس الطلبة اللي طلبوا مساعدة، النموذج هيتعلّم «مين بيطلب» ويفوّت الساكتين. والصندوق الأسود: مدرّس يعامل طالب كأنه ضعيف بسبب تنبيه مش فاهم سببه فيحبطه. ٣) أي قرار بيمسّ طالب (تدخّل، تواصل مع ولي الأمر) يفضل في إيد إنسان؛ النموذج يرتّب الأولويات بس. الضمانة اللي مش هتتشال: __مراجعة بشرية قبل أي إجراء__.', en: '1) (i) __supervised__ (classification: needs support/not) — needs grades, attendance and real past outcomes; may miss new students with no history. (ii) __unsupervised__ (clustering) — needs study times and methods; may miss those who never record their habits. 2) If (i)’s data includes only students who asked for help, the model learns "who asks" and misses quiet ones. Black box: a teacher treating a student as weak because of an unexplained flag, discouraging them. 3) Any decision affecting a student (intervention, contacting parents) stays with a human; the model only prioritizes. The safeguard never removed: __human review before any action__.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'بنك عايز برنامج يقرا كل طلب قرض وينبّه على الطلبات اللي شكلها خطر عشان موظف يراجعها. سمِّ نوع التعلّم، وسمة ممكن النموذج يستخدمها، واشرح ليه الموظف لازم يفضل في الحلقة.', en: 'A bank wants a program to read each loan application and flag risky ones for a human officer. Name the learning type, one feature, and why the officer must stay in the loop.' },
            points: [{ ar: 'خاضع للإشراف (تصنيف خطر/آمن).', en: 'Supervised (risky/safe classification).' }, { ar: 'سمة: الدخل، تاريخ السداد…', en: 'Feature: income, repayment history…' }, { ar: 'تحيّز + صندوق أسود + قرار مكلّف.', en: 'Bias + black box + a costly decision.' }],
            model: { ar: 'ده __تعلّم خاضع للإشراف (تصنيف)__: النموذج يتعلّم من طلبات قديمة موسومة «سدّد/ماسدّدش». سمة ممكن يستخدمها: __الدخل الشهري__ أو تاريخ السداد. الموظف لازم يفضل في الحلقة لأن البيانات القديمة ممكن تكون __متحيّزة__ ضد فئات معيّنة، وأساس حكم النموذج __صندوق أسود__، والقرار مكلّف وبيأثّر على حياة الناس — فالنموذج ينبّه والإنسان يقرّر.', en: 'This is __supervised learning (classification)__: the model learns from past applications labeled "repaid/defaulted". A feature: __monthly income__ or repayment history. The officer must stay in the loop because past data may be __biased__ against some groups, the model’s basis is a __black box__, and the decision is costly and affects people’s lives — so the model flags and the human decides.' } },
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
            prompt: { ar: 'قابلت التعلّم الآلي فين النهارده (توصيات، وسم صور، إدخال صوتي)؟ تفتكر كان أنهي نوع؟', en: 'Where did you meet ML today (recommendations, photo tagging, voice input)? Which kind do you think it was?' },
            points: [{ ar: 'مثال + نوع مناسب.', en: 'An example + a fitting kind.' }],
            model: { ar: '(مثال) توصيات الفيديوهات بتعتمد على __تجميع__ المستخدمين المتشابهين (غير إشراف)؛ والكتابة بالصوت على الموبايل __خاضع للإشراف__ لأنه اتدرّب على تسجيلات معاها النص الصحيح.', en: '(Example) video recommendations rely on __clustering__ similar users (unsupervised); voice typing on the phone is __supervised__, since it was trained on recordings paired with the correct text.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تحدّى', en: 'Challenge' },
            prompt: { ar: 'نموذج تعرّف على الوجوه اتدرّب أساسًا على مجموعة واحدة من الناس وبيشتغل وحش مع غيرهم. اشرح إزاي بيانات التدريب المتحيّزة عملت كده، واذكر تغيير واحد في البيانات يقلّل التحيّز.', en: 'A face-recognition model trained mostly on one group of people works poorly on others. Explain how biased training data caused this, and name one data change that reduces the bias.' },
            points: [{ ar: 'اتعلّم سمات مجموعة واحدة بس.', en: 'It learned one group’s features only.' }, { ar: 'الإصلاح: بيانات متنوّعة متوازنة.', en: 'Fix: diverse, balanced data.' }],
            model: { ar: 'النموذج اتعلّم __السمات المشتركة في المجموعة اللي شافها__ بس، فلما قابل ناس شكلهم مختلف (لون بشرة، ملامح، سن) القواعد اللي اتعلّمها ماتنطبقش، فأخطاؤه بتزيد معاهم — بيانات متحيّزة ← أحكام متحيّزة. التغيير: نجمع بيانات تدريب __متنوّعة ومتوازنة__ تمثّل كل المجموعات اللي هيتعامل معاها، ونقيس الدقة لكل مجموعة لوحدها.', en: 'The model learned __the features common to the group it saw__, so with people who look different (skin tone, features, age) its learned rules do not fit and its errors rise — biased data → biased judgments. The change: collect __diverse, balanced__ training data representing every group it will meet, and measure accuracy for each group separately.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '7-1', seconds: 60, items: [
          { text: { ar: 'التعلّم الآلي بيلاقي القواعد من البيانات', en: 'ML finds rules from data' }, answer: true },
          { text: { ar: 'في التقليدية الجهاز بيلاقي القواعد', en: 'In conventional programming the computer finds the rules' }, answer: false },
          { text: { ar: 'جمع رقمين محتاج تعلّم آلي', en: 'Adding two numbers needs ML' }, answer: false },
          { text: { ar: 'الإشراف = وسوم', en: 'Supervised = labels' }, answer: true },
          { text: { ar: 'غير الإشراف = وسوم', en: 'Unsupervised = labels' }, answer: false },
          { text: { ar: 'المعزَّز = مكافآت', en: 'Reinforcement = rewards' }, answer: true },
          { text: { ar: 'التصنيف مثال للإشراف', en: 'Classification is supervised' }, answer: true },
          { text: { ar: 'التجميع محتاج وسوم', en: 'Clustering needs labels' }, answer: false },
          { text: { ar: 'السمة = دليل للتنبّؤ', en: 'Feature = a clue for prediction' }, answer: true },
          { text: { ar: 'روبوت يمشي بالتجربة = معزَّز', en: 'A robot walking by trial = reinforcement' }, answer: true },
          { text: { ar: 'الحالة والفعل والمكافأة من عناصر التجميع', en: 'State, action, reward belong to clustering' }, answer: false },
          { text: { ar: 'بيانات متحيّزة ← أحكام متحيّزة', en: 'Biased data → biased judgments' }, answer: true },
          { text: { ar: 'أساس حكم النموذج باين دايمًا', en: 'The model’s basis is always visible' }, answer: false },
          { text: { ar: 'إنسان في الحلقة', en: 'Keep a human in the loop' }, answer: true },
          { text: { ar: 'التعلّم الآلي حل لكل حاجة', en: 'ML solves everything' }, answer: false },
          { text: { ar: 'التعلّم الآلي يدعم الإنسان', en: 'ML supports humans' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 7-1', en: 'Lesson 7-1 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. تعلّم من أزواج (إدخال + إجابة صحيحة) — أنهي نوع؟', en: '1. Learning from (input + correct answer) pairs — which type?' }, options: [{ ar: 'الخاضع للإشراف', en: 'Supervised' }, { ar: 'غير الخاضع للإشراف', en: 'Unsupervised' }, { ar: 'التعلّم المعزَّز', en: 'Reinforcement' }, { ar: 'البرمجة التقليدية', en: 'Traditional' }], answer: 0 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. تجميع المتشابه في مجموعات من غير وسوم — اسمه إيه؟', en: '2. Grouping similar items without labels — what is it?' }, options: [{ ar: 'التصنيف', en: 'Classification' }, { ar: 'التجميع', en: 'Clustering' }, { ar: 'السمة', en: 'Feature' }, { ar: 'المكافأة', en: 'Reward' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. بيانات تدريب منحرفة بتوصّل لأحكام منحرفة — اسم المشكلة؟', en: '3. Skewed training data leading to skewed judgments — what is it?' }, options: [{ ar: 'التحيّز', en: 'Bias' }, { ar: 'الصندوق الأسود', en: 'The black box' }, { ar: 'فرط التخصيص', en: 'Overfitting' }, { ar: 'التعميم', en: 'Generalization' }], answer: 0 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. التجميع بيجمّع البيانات حسب وسوم مدّية مسبقًا.', en: '4. Clustering groups data by pre-given labels.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. التعلّم المعزَّز بيتعلّم من نتايج أفعاله عن طريق المكافأة.', en: '5. Reinforcement learning learns from its actions’ consequences via reward.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. التعلّم الآلي بيتستخدم للمشاكل اللي صعب نكتب قواعدها بالكلام.', en: '6. ML is used where rules are hard to put into words.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. إيه الفرق بين البرمجة التقليدية والتعلّم الآلي في «الإنسان بيدّي إيه»؟', en: '7. What is the difference between conventional programming and ML in "what humans provide"?' },
          points: [{ ar: 'التقليدية: القواعد + البيانات.', en: 'Conventional: rules + data.' }, { ar: 'التعلّم الآلي: بيانات كتير (بإجابات) والجهاز يلاقي القواعد.', en: 'ML: lots of data (with answers); the computer finds the rules.' }],
          model: { ar: 'في البرمجة التقليدية الإنسان بيدّي قواعد القرار (الإجراءات) وبيانات الإدخال، والجهاز بيطلّع الإجابات باتباع القواعد. في التعلّم الآلي الإنسان بيدّي كميات كبيرة من البيانات (بإجابات صحيحة لو موجودة)، والجهاز بيلاقي قواعد القرار من البيانات بنفسه.', en: 'In conventional programming humans provide the decision rules (procedure) and the input data, and the computer produces answers by following the rules. In ML humans provide large amounts of data (with correct answers where available), and the computer finds the decision rules from the data itself.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اذكر أنواع التعلّم التلاتة والبيانات اللي بياخدها كل واحد.', en: '8. Name the three kinds of learning and the data each receives.' },
          points: [{ ar: 'إشراف: إدخال + وسم.', en: 'Supervised: input + label.' }, { ar: 'غير إشراف: إدخال بس.', en: 'Unsupervised: input only.' }, { ar: 'معزَّز: أفعال ومكافآت.', en: 'Reinforcement: actions and rewards.' }],
          model: { ar: 'الخاضع للإشراف: بياخد أزواج إدخال + إجابة صحيحة (وسم) ويتعلّم يتنبّأ بالإجابة. غير الخاضع للإشراف: بياخد الإدخال بس من غير إجابات ويلاقي بنية أو مجموعات محتملة. المعزَّز: بياخد الأفعال ونتايجها (المكافآت) ويتعلّم يختار أفعال توصّل لنتايج أحسن.', en: 'Supervised: receives input + correct-answer (label) pairs and learns to predict the answer. Unsupervised: receives input only, no answers, and finds hidden structure or groups. Reinforcement: receives actions and their results (rewards) and learns to choose actions that lead to better results.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. إيه الفرق بين التصنيف والتجميع؟ اضرب مثال لكل واحد.', en: '9. What is the difference between classification and clustering? Give an example of each.' },
          points: [{ ar: 'تصنيف: وسوم مدّية ← فئة جديد (إيميل مزعج/عادي).', en: 'Classification: labels given → class of new data (spam/normal).' }, { ar: 'تجميع: من غير وسوم ← مجموعات (عملاء متشابهين).', en: 'Clustering: no labels → groups (similar shoppers).' }],
          model: { ar: 'الفرق في الوسوم: التصنيف بياخد وسوم مسبقًا ويتنبّأ بفئة بيانات جديدة — زي فرز الإيميل لمزعج أو عادي. التجميع مابياخدش وسوم ويلاقي مجموعات محتملة في البيانات — زي تجميع عملاء متجر باتجاهات شراء متشابهة.', en: 'The difference is labels: classification is given labels in advance and predicts the class of new data — e.g. sorting email into spam or normal. Clustering is given no labels and finds natural groups in the data — e.g. grouping shoppers with similar buying trends.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. اشرح التحيّز ومشكلة الصندوق الأسود، وليه بيخلّوا الإنسان في الحلقة.', en: '10. Explain bias and the black-box problem, and why they keep a human in the loop.' },
          points: [{ ar: 'التحيّز: بيانات متحيّزة ← أحكام متحيّزة.', en: 'Bias: biased data → biased judgments.' }, { ar: 'الصندوق الأسود: أساس الحكم مخفي.', en: 'Black box: the basis is hidden.' }, { ar: 'الإنسان يراجع ويقرّر.', en: 'A human reviews and decides.' }],
          model: { ar: 'التحيّز: لو بيانات التدريب منحرفة أو ناقصة، النموذج بيتعلّم النمط الغلط فأحكامه تتحيّز. مشكلة الصندوق الأسود: أساس حكم النموذج صعب البشر يشوفوه أو يفهموه. عشان الاتنين، ماينفعش نسيب النموذج يقرّر لوحده في القرارات المهمة: النموذج يقترح والإنسان يراجع ويقرّر.', en: 'Bias: if training data is skewed or incomplete, the model learns the wrong pattern and its judgments are biased. The black-box problem: the basis of the model’s judgment is hard for humans to see or understand. Because of both, the model must not decide alone on important matters: it suggests, and a human reviews and decides.' } } },
      ],
    },
  ],
});
