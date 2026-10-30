/* =========================================================
 * content/lesson-3-1.js — البنية العامة لتطبيقات الويب
 * Pure data. Sources: textbook 3-1 (EN p.55–61) + memo (Arabic wording,
 * deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('3-1', {
  id: '3-1',
  color: '#38bdf8',
  cover: 'img/web-l1-cover.webp',
  title: { ar: 'البنية العامة لتطبيقات الويب', en: 'The Overall Structure of Web Applications' },
  guiding: { ar: 'إزاي تطبيق الويب متبني، وإزاي طبقاته التلاتة بتتعاون عشان ترد على اللي المستخدم بيعمله؟', en: 'How is a web application structured, and how do its three tiers work together to respond to what a user does?' },
  hook: {
    ar: 'كل مرة بتدوّر على YouTube، أو بتشتري من Amazon، أو بتفتح Gmail، إنت بتستخدم **تطبيق ويب** — برنامج بتستخدمه من __المتصفح__ من غير ما تسطّب حاجة. ورا الشاشة البسيطة دي فيه __تلات طبقات__ شغّالين مع بعض: الصفحة اللي قدامك، والخادم المستخبي اللي بيعالج طلبك، وقاعدة البيانات اللي شايلة كل البيانات.',
    en: 'Every time you search on YouTube, buy on Amazon or open Gmail, you are using a **web application** — a program you use through your __browser__, with nothing to install. Behind the simple screen, __three tiers__ work together: the page you interact with, the hidden server that processes your request, and the database that holds all the data.',
  },
  keyFact: { ar: 'تطبيق الويب متبني من __تلات طبقات__ — الواجهة الأمامية، والواجهة الخلفية، وقاعدة البيانات — بيتعاونوا عشان يحوّلوا __فعل المستخدم لنتيجة__.', en: 'A web application is built from __three tiers__ — frontend, backend and database — that cooperate to turn __a user’s action into a result__.' },
  concepts: ['web application', 'frontend', 'backend', 'database', 'three-tier architecture'],
  objectives: [
    { ar: 'أشرح يعني إيه تطبيق ويب، وأوصف دور كل طبقة من طبقاته التلاتة: الواجهة الأمامية والخلفية وقاعدة البيانات.', en: 'Explain what a web application is and describe the roles of its three tiers: frontend, backend and database.' },
    { ar: 'أتتبّع إزاي الطبقات التلاتة بتتعاون عشان تحوّل فعل المستخدم لنتيجة، بأمثلة من خدمات مألوفة.', en: 'Trace how the three tiers cooperate to turn a user’s action into a result, using familiar services.' },
  ],

  stations: [
    /* ───────────── 1 · web app + the three tiers ───────────── */
    {
      id: 'tiers', kind: 'learn',
      title: { ar: 'تطبيق الويب وطبقاته التلاتة', en: 'The web app and its three tiers' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'لما بتفتح YouTube من المتصفح… تفتكر الفيديوهات دي متخزّنة فين؟', en: 'When you open YouTube in the browser… where do you think the videos are stored?' },
            options: [
              { emoji: '💻', text: { ar: 'على جهازي أنا', en: 'On my own device' } },
              { emoji: '🗄️', text: { ar: 'في مكان بعيد على الإنترنت', en: 'Somewhere far away on the Internet' } },
              { emoji: '🤔', text: { ar: 'مش متأكد', en: 'Not sure' } },
            ],
            after: { ar: 'تعالى نشوف إيه اللي ورا الشاشة 👇', en: 'Let’s see what is behind the screen 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: تطبيق الويب وطبقاته التلاتة', en: '🎞️ Animation: the web app and its three tiers' },
          enTitle: 'Web app and three tiers',
          terms: ['web application', 'frontend', 'backend', 'database'],
          visual: { anim: 'webTiersMovie', props: { scenes: [0, 2] } },
          beats: [
            { ar: '🌐 **تطبيق الويب:** تطبيق بيتستخدم عن طريق __متصفح الويب__ — يكفي يكون عندك متصفح، __من غير ما تسطّب برنامج مخصّص__. أمثلة: YouTube · Amazon · Gmail · خرائط جوجل.', en: '🌐 **Web application:** an application used through a __web browser__ — a browser is enough, __no dedicated software to install__. e.g. YouTube · Amazon · Gmail · Google Maps.' },
            { ar: 'ورا الشاشة **تلات طبقات**: 🖥️ __الواجهة الأمامية__ = الشاشة اللي المستخدم بيشوفها، بتشتغل على __المتصفح__ وبتستقبل إدخاله · ⚙️ __الواجهة الخلفية__ = المعالجة على __جانب الخادم__ اللي المستخدم __مش شايفها__، بتعالج البيانات وتاخد القرارات · 🗄️ __قاعدة البيانات__ = نظام بـ__ينظّم البيانات ويخزّنها ويديرها__، يسترجعها وقت الحاجة ويسجّل الجديد.', en: 'Behind the screen there are **three tiers**: 🖥️ the __frontend__ = the screen users see, running on the __browser__ and accepting input · ⚙️ the __backend__ = __server-side__ processing users __do not see__, processing data and making decisions · 🗄️ the __database__ = a system that __organizes, stores and manages data__, retrieving it when needed and recording new data.' },
            { ar: 'أمثلة لكل طبقة: الأمامية ← __شاشة البحث، صفحات المنتجات، نماذج الإدخال__ · الخلفية ← __البحث عن المنتجات المطابقة، مصادقة تسجيل الدخول__ · قاعدة البيانات ← __معلومات المنتجات والمستخدمين وسجل الطلبات__.', en: 'Examples per tier: frontend → __search screen, product pages, input forms__ · backend → __finding matching products, login authentication__ · database → __product and user information, order history__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل وصف بالطبقة:', en: 'Match each description with the tier:' },
            left: [
              { ar: 'نظام بينظّم البيانات ويخزّنها ويديرها', en: 'A system that organizes, stores and manages data' },
              { ar: 'الشاشة اللي المستخدم بيشوفها وبيتفاعل معاها', en: 'The screen the user sees and interacts with' },
              { ar: 'معالجة على جانب الخادم مش ظاهرة للمستخدم', en: 'Server-side processing the user does not see' },
            ],
            right: [{ ar: 'الواجهة الأمامية', en: 'Frontend' }, { ar: 'الواجهة الخلفية', en: 'Backend' }, { ar: 'قاعدة البيانات', en: 'Database' }],
            answer: [2, 0, 1],
            explain: { ar: 'تخزين وإدارة = قاعدة البيانات · الشاشة = الأمامية · المعالجة المخفية = الخلفية.', en: 'Store and manage = database · the screen = frontend · hidden processing = backend.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'تطبيق الويب محتاج تسطيب برنامج مخصّص على الجهاز.', en: 'A web app needs dedicated software installed on the device.' }, answer: false, explain: { ar: 'يكفي __متصفح__ — من غير تسطيب.', en: 'A __browser__ is enough — nothing to install.' } },
            { text: { ar: 'الواجهة الأمامية بتشتغل على المتصفح وبتستقبل إدخال المستخدم.', en: 'The frontend runs on the browser and accepts the user’s input.' }, answer: true },
            { text: { ar: 'مصادقة تسجيل الدخول مثال لشغل الواجهة الخلفية.', en: 'Login authentication is an example of backend work.' }, answer: true },
            { text: { ar: 'قاعدة البيانات هي اللي بتعرض الشاشات للمستخدم.', en: 'The database is what displays the screens to the user.' }, answer: false, explain: { ar: 'العرض شغل __الأمامية__؛ قاعدة البيانات __بتخزّن وتسترجع__.', en: 'Display is the __frontend__’s job; the database __stores and retrieves__.' } },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**تطبيق الويب:** بيتستخدم عادةً من المتصفح (YouTube · Amazon · Gmail · خرائط جوجل).', en: '**Web app:** used through a browser with nothing to install (YouTube · Amazon · Gmail · Google Maps).' },
            { ar: '**الأمامية:** الشاشة · على المتصفح · بتستقبل الإدخال. **الخلفية:** على الخادم · مش ظاهرة · بتعالج وتقرّر.', en: '**Frontend:** the screen · on the browser · accepts input. **Backend:** on the server · unseen · processes and decides.' },
            { ar: '**قاعدة البيانات:** بتنظّم وتخزّن وتدير البيانات · تسترجع وتسجّل.', en: '**Database:** organizes, stores and manages data · retrieves and records.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · how the tiers cooperate ───────────── */
    {
      id: 'flow', kind: 'learn',
      title: { ar: 'إزاي الطبقات التلاتة بتتعاون', en: 'How the three tiers cooperate' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: رحلة طلب البحث في الطبقات التلاتة', en: '🎞️ Animation: a search request through the three tiers' },
          enTitle: 'How the tiers work together',
          terms: ['three-tier architecture', 'request', 'response'],
          visual: { anim: 'webTiersMovie', props: { scenes: [3, 8] } },
          beats: [
            { ar: 'مثال: بتدوّر على منتج في موقع تسوّق. **①** الأمامية __بتستقبل كلمات البحث__ اللي كتبتها · **②** الأمامية __بتبعت الكلمات للخلفية__.', en: 'Example: searching for a product on a shopping site. **①** The frontend __receives the search keywords__ · **②** the frontend __sends them to the backend__.' },
            { ar: '**③** الخلفية __بتدوّر في قاعدة البيانات__ على المنتجات المطابقة · **④** قاعدة البيانات __بترجّع بيانات المنتجات المطابقة__ للخلفية.', en: '**③** The backend __searches the database__ for matching products · **④** the database __returns the matching data__ to the backend.' },
            { ar: '**⑤** الخلفية __بترتّب النتايج__ وترجّعها للأمامية · **⑥** الأمامية __بتعرض النتايج__ على شاشتك. الطلب __بينزل__ في الطبقات… والاستجابة __بترجع__ في الاتجاه العكسي.', en: '**⑤** The backend __organizes the results__ and returns them to the frontend · **⑥** the frontend __displays the results__ on your screen. The request flows __down__ the tiers… and the reply comes __back up__.' },
            { ar: 'كل الخدمات المألوفة على نفس البنية: 🎬 موقع فيديو · 💬 تواصل اجتماعي · 🛒 متجر إلكتروني — اللي __بيتغيّر محتوى كل طبقة__، مش وجودها.', en: 'Every familiar service uses the same architecture: 🎬 video site · 💬 SNS · 🛒 e-commerce — what __changes is the content of each tier__, not whether it exists.' },
            { ar: '🔧 **شخّص العطل:** صفحة الحجز فتحت، بس مفيش مواعيد ظهرت ← الأمامية __شغّالة__، والمشكلة غالبًا في __الخلفية أو قاعدة البيانات__. ⚠️ فخّين: «الخلفية بتشتغل على المتصفح» ← __غلط__ (على الخادم) · «التطبيق يشتغل بالأمامية لوحدها» ← __غلط__ (تلات طبقات).', en: '🔧 **Diagnose a fault:** the booking page opens but no slots appear → the frontend __works__; the problem is probably the __backend or database__. ⚠️ Two traps: "the backend runs on the browser" → __false__ (on the server) · "the app works with the frontend alone" → __false__ (three tiers).' },
            { ar: '📌 **الخلاصة:** الأمامية __تعرض وتجمع__ · الخلفية __تقرّر وتعالج__ · قاعدة البيانات __تخزّن وتسترجع__ — تلات طبقات متعاونة = تطبيق ويب شغّال.', en: '📌 **The point:** frontend __shows and collects__ · backend __decides and processes__ · database __stores and retrieves__ — three tiers cooperating make a web app work.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'رتّب الست خطوات: الأمامية تستقبل ← ترسل للخلفية ← الخلفية تبحث في قاعدة البيانات ← قاعدة البيانات ترجّع ← الخلفية ترتّب وترجّع ← الأمامية تعرض.', en: 'The six steps: frontend receives → sends to backend → backend searches the database → database returns → backend organizes and returns → frontend displays.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — ليه نفصل الطبقات؟', en: 'Deep dive — why separate the tiers?' }, text: { ar: '(١) __التخصّص__: كل طبقة مركّزة في شغلها. (٢) __إعادة الاستخدام__: نفس الخلفية تخدم موقع وتطبيق موبايل. (٣) __الأمان__: قاعدة البيانات مش مكشوفة للمتصفح — الخلفية في النص. (٤) __تشخيص الأعطال__: لو الصفحة ظهرت والنتايج لأ، يبقى الأمامية سليمة والمشكلة ورا.', en: '(1) __Specialization__: each tier focuses on its job. (2) __Reuse__: one backend serves a website and a mobile app. (3) __Security__: the database is never exposed to the browser — the backend sits in between. (4) __Fault diagnosis__: if the page shows but the results do not, the frontend is fine and the problem is behind it.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'order', prompt: { ar: 'رتّب خطوات البحث عن منتج من الأول للآخر:', en: 'Order the steps of a product search from first to last:' },
            items: [
              { ar: 'الأمامية تستقبل كلمات البحث', en: 'The frontend receives the keywords' },
              { ar: 'الأمامية تبعت الكلمات للخلفية', en: 'The frontend sends them to the backend' },
              { ar: 'الخلفية تدوّر في قاعدة البيانات', en: 'The backend searches the database' },
              { ar: 'قاعدة البيانات ترجّع المنتجات المطابقة', en: 'The database returns the matching products' },
              { ar: 'الخلفية ترتّب النتايج وترجّعها', en: 'The backend organizes and returns the results' },
              { ar: 'الأمامية تعرض النتايج', en: 'The frontend displays the results' },
            ] },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'classify', prompt: { ar: 'في موقع فيديو: كل شغلانة تبع أنهي طبقة؟', en: 'On a video site: which tier does each job?' },
            groups: [{ icon: 'monitor', label: { ar: 'الأمامية', en: 'Frontend' } }, { icon: 'server', label: { ar: 'الخلفية', en: 'Backend' } }, { icon: 'database', label: { ar: 'قاعدة البيانات', en: 'Database' } }],
            items: [
              { text: { ar: 'تخزين سجل المشاهدة', en: 'Storing the viewing history' }, group: 2 },
              { text: { ar: 'اختيار الفيديوهات المقترحة', en: 'Choosing recommended videos' }, group: 1 },
              { text: { ar: 'عرض شاشة التشغيل والبحث', en: 'Showing the playback and search screens' }, group: 0 },
              { text: { ar: 'تجميع عدد المشاهدات', en: 'Aggregating view counts' }, group: 1 },
              { text: { ar: 'تخزين بيانات الفيديو', en: 'Storing the video data' }, group: 2 },
            ],
            explain: { ar: 'العرض ← الأمامية · الاختيار والتجميع ← الخلفية · التخزين ← قاعدة البيانات.', en: 'Display → frontend · choosing and counting → backend · storing → database.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (3)', en: '✋ Check yourself (3)' },
          q: { widget: 'mcq', prompt: { ar: 'صفحة الحجز في تطبيق عيادة فتحت عادي، بس مفيش مواعيد متاحة ظهرت. إيه الأقرب؟', en: 'A clinic’s booking page opens normally, but no free slots appear. Most likely?' },
            options: [
              { ar: 'الأمامية شغّالة والمشكلة في الخلفية أو قاعدة البيانات', en: 'The frontend works; the problem is in the backend or database' },
              { ar: 'الأمامية هي اللي واقعة لأن الشاشة مش بتعرض أي حاجة خالص', en: 'The frontend is down because the screen shows nothing at all' },
              { ar: 'المتصفح محتاج يتسطّب عليه برنامج مخصّص علشان المواعيد تظهر', en: 'The browser needs dedicated software installed for the slots to show' },
              { ar: 'التطبيق بيشتغل بالأمامية لوحدها فمفيش أي مشكلة في أي طبقة', en: 'The app runs on the frontend alone, so no tier has any problem' },
            ],
            answer: 0,
            explain: { ar: 'الصفحة __ظهرت__ ← الأمامية سليمة. المواعيد بتيجي من __الخلفية وقاعدة البيانات__.', en: 'The page __appeared__ → the frontend is fine. The slots come from the __backend and database__.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**الست خطوات:** تستقبل ← ترسل ← تبحث ← ترجّع ← ترتّب وترجّع ← تعرض. الطلب بينزل والاستجابة بترجع.', en: '**Six steps:** receive → send → search → return → organize and return → display. Request down, reply back.' },
            { ar: '**كل الخدمات** (فيديو · تواصل · تسوّق) نفس التلات طبقات — المحتوى بس اللي بيتغيّر.', en: '**Every service** (video · SNS · shopping) uses the same three tiers — only the content changes.' },
            { ar: '**الأمامية تعرض وتجمع · الخلفية تقرّر وتعالج · قاعدة البيانات تخزّن وتسترجع.**', en: '**Frontend shows and collects · backend decides and processes · database stores and retrieves.**' },
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
            { text: { ar: 'A) الواجهة الأمامية هي مكوّن الشاشة اللي المستخدمين بيشوفوه مباشرةً.', en: 'A) The frontend is the screen component that users see directly.' }, answer: true },
            { text: { ar: 'B) الواجهة الخلفية هي الجزء اللي بيشتغل على المتصفح.', en: 'B) The backend is the part that runs on the browser.' }, answer: false },
            { text: { ar: 'C) قاعدة البيانات نظام بينظّم البيانات ويخزّنها ويديرها.', en: 'C) A database is a system that organizes, stores and manages data.' }, answer: true },
            { text: { ar: 'D) تطبيق الويب بيشتغل بالواجهة الأمامية لوحدها.', en: 'D) A web application operates with the frontend alone.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) الأمامية = الشاشة اللي المستخدم بيشوفها ← **✓**.', en: 'A) Frontend = the screen users see → **✓**.' },
            { ar: 'B) الخلفية بتشتغل على __الخادم__ مش المتصفح ← **✗**.', en: 'B) The backend runs on the __server__, not the browser → **✗**.' },
            { ar: 'C) ده التعريف الصحيح لقاعدة البيانات ← **✓**.', en: 'C) Correct definition of a database → **✓**.' },
            { ar: 'D) تطبيق الويب بيشتغل بـ__تلات طبقات__ ← **✗**.', en: 'D) A web app works with __three tiers__ → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمصطلح (A–C):', en: '(2) Match each description (a–c) with the term (A–C):' },
            left: [
              { ar: 'a) الجزء المسؤول عن المعالجة على جانب الخادم اللي المستخدمين مش شايفينه', en: 'a) The part responsible for server-side processing users do not see' },
              { ar: 'b) مكوّن الشاشة اللي المستخدمين بيتفاعلوا معاه مباشرةً', en: 'b) The screen component users interact with directly' },
              { ar: 'c) نظام بينظّم البيانات ويخزّنها ويديرها', en: 'c) A system that organizes, stores and manages data' },
            ],
            right: [{ ar: 'A الواجهة الأمامية', en: 'A Frontend' }, { ar: 'B الواجهة الخلفية', en: 'B Backend' }, { ar: 'C قاعدة البيانات', en: 'C Database' }],
            answer: [1, 0, 2] },
          solution: [
            { ar: 'a: المعالجة على جانب الخادم = **الخلفية** ← B.', en: 'a: server-side processing = **backend** → B.' },
            { ar: 'b: الشاشة اللي المستخدم بيتفاعل معاها = **الأمامية** ← A.', en: 'b: the screen users interact with = **frontend** → A.' },
            { ar: 'c: التخزين والإدارة = **قاعدة البيانات** ← C.', en: 'c: storing and managing = **database** → C.' },
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
            { q: { ar: '1. مصطلح تطبيق بيتستخدم عن طريق متصفح الويب؟', en: '1. The term for an application used through a web browser?' }, a: { ar: 'تطبيق الويب', en: 'Web application' } },
            { q: { ar: '2. مصطلح مكوّن الشاشة اللي المستخدمين بيشوفوه مباشرةً؟', en: '2. The term for the screen component users see directly?' }, a: { ar: 'الواجهة الأمامية', en: 'Frontend' } },
            { q: { ar: '3. مصطلح الجزء المسؤول عن المعالجة على جانب الخادم اللي المستخدمين مش شايفينه؟', en: '3. The term for the server-side processing users do not see?' }, a: { ar: 'الواجهة الخلفية', en: 'Backend' } },
            { q: { ar: '4. مصطلح نظام بينظّم البيانات ويخزّنها ويديرها؟', en: '4. The term for a system that organizes, stores and manages data?' }, a: { ar: 'قاعدة البيانات', en: 'Database' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'وإنت بتدوّر على منتج في موقع تسوّق: مين المسؤول عن __البحث في البيانات__ عن المنتجات المطابقة لكلمات البحث؟', en: 'Searching for a product on a shopping site: which is responsible for __searching through the data__ for products matching the keywords?' },
            options: [{ ar: 'A الواجهة الأمامية', en: 'A Frontend' }, { ar: 'B الواجهة الخلفية', en: 'B Backend' }, { ar: 'C قاعدة البيانات', en: 'C Database' }],
            fixedOrder: true,
            answer: 1,
            explain: { ar: 'في جدول الكتاب «البحث عن منتجات تطابق المعايير» مثال لـ__الخلفية__: هي اللي بتدوّر (الخطوة ③) وقاعدة البيانات بترجّع البيانات (الخطوة ④).', en: 'In the textbook table "searching for products that match the criteria" is a __backend__ example: the backend searches (step ③) and the database returns the data (step ④).' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'classify', prompt: { ar: 'في متجر إلكتروني: كل بند (a–f) تبع أنهي طبقة؟', en: 'On an e-commerce site: which tier does each item (a–f) belong to?' },
            groups: [{ icon: 'monitor', label: { ar: 'A الأمامية', en: 'A Frontend' } }, { icon: 'server', label: { ar: 'B الخلفية', en: 'B Backend' } }, { icon: 'database', label: { ar: 'C قاعدة البيانات', en: 'C Database' } }],
            items: [
              { text: { ar: 'a) صفحة قائمة المنتجات', en: 'a) Product listing page' }, group: 0 },
              { text: { ar: 'b) معالجة فحص المخزون', en: 'b) Stock-checking processing' }, group: 1 },
              { text: { ar: 'c) تخزين معلومات العملاء', en: 'c) Storing customer information' }, group: 2 },
              { text: { ar: 'd) شاشة السلة', en: 'd) Cart screen' }, group: 0 },
              { text: { ar: 'e) معالجة الدفع', en: 'e) Payment processing' }, group: 1 },
              { text: { ar: 'f) تخزين سجل الطلبات', en: 'f) Storing order history' }, group: 2 },
            ],
            explain: { ar: 'a→A · b→B · c→C · d→A · e→B · f→C.', en: 'a→A · b→B · c→C · d→A · e→B · f→C.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(c):', en: 'Read and fill blanks (a)–(c):' },
            text: { ar: 'تطبيق الويب بيتكوّن أساسًا من تلات طبقات. مكوّن الشاشة اللي المستخدمين بيشوفوه مباشرةً اسمه {0}. والجزء المسؤول عن المعالجة على جانب الخادم اللي المستخدمين مش شايفينه اسمه {1}. والنظام اللي بينظّم البيانات ويخزّنها ويديرها اسمه {2}. ولما المستخدم يعمل حاجة، الطبقات التلاتة بيتعاونوا عشان ينفّذوا المعالجة.', en: 'A web application is broadly composed of three tiers. The screen component users see directly is called the {0}. The part responsible for server-side processing users do not see is called the {1}. A system that organizes, stores and manages data is called the {2}. In response to user actions, these three tiers cooperate to perform processing.' },
            bank: [{ ar: 'الواجهة الأمامية', en: 'frontend' }, { ar: 'الواجهة الخلفية', en: 'backend' }, { ar: 'قاعدة البيانات', en: 'database' }, { ar: 'المتصفح', en: 'browser' }],
            answer: [0, 1, 2],
            explain: { ar: '(a) الواجهة الأمامية (b) الواجهة الخلفية (c) قاعدة البيانات.', en: '(a) frontend (b) backend (c) database.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'classify', prompt: { ar: 'في شبكة تواصل اجتماعي: كل بند (a–f) تبع أنهي طبقة؟', en: 'On an SNS: which tier does each item (a–f) belong to?' },
            groups: [{ icon: 'monitor', label: { ar: 'A الأمامية', en: 'A Frontend' } }, { icon: 'server', label: { ar: 'B الخلفية', en: 'B Backend' } }, { icon: 'database', label: { ar: 'C قاعدة البيانات', en: 'C Database' } }],
            items: [
              { text: { ar: 'a) شاشة التايملاين', en: 'a) Timeline screen' }, group: 0 },
              { text: { ar: 'b) معالجة تحديد جمهور المنشور', en: 'b) Deciding a post’s audience' }, group: 1 },
              { text: { ar: 'c) تخزين بيانات المنشورات', en: 'c) Storing post data' }, group: 2 },
              { text: { ar: 'd) شاشة النشر', en: 'd) Post screen' }, group: 0 },
              { text: { ar: 'e) معالجة الإشعارات', en: 'e) Notification processing' }, group: 1 },
              { text: { ar: 'f) تخزين علاقات المتابعة', en: 'f) Storing follow relationships' }, group: 2 },
            ],
            explain: { ar: 'a→A · b→B · c→C · d→A · e→B · f→C.', en: 'a→A · b→B · c→C · d→A · e→B · f→C.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب لبنية الطبقات التلاتة لتطبيق الويب:', en: 'Choose the best description of the three-tier architecture of a web app:' },
            options: [
              { ar: 'الواجهة الأمامية دورها تخزين البيانات وإدارتها', en: 'The frontend’s role is to store and manage data' },
              { ar: 'الواجهة الخلفية هي اللي المستخدم بيتفاعل معاها على المتصفح', en: 'The backend is what users interact with on the browser' },
              { ar: 'مع فعل المستخدم بتتعاون التلات طبقات لتنفيذ المعالجة', en: 'On a user action the three tiers cooperate to process it' },
              { ar: 'قاعدة البيانات دورها عرض الشاشات للمستخدمين', en: 'The database’s role is to display screens to users' },
            ],
            answer: 2,
            explain: { ar: 'الوصف الصحيح: __التعاون__. التلاتة التانيين بيبدّلوا أدوار الطبقات.', en: 'The right description is __cooperation__. The other three swap the tiers’ roles.' } },
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
          { front: { ar: 'تطبيق الويب', en: 'Web application' }, back: { ar: 'تطبيق بيتستخدم عادةً من المتصفح، وبعضه ممكن يتثبّت على الجهاز.', en: 'An application used through a browser, with no dedicated software to install.' } },
          { front: { ar: 'الواجهة الأمامية', en: 'Frontend' }, back: { ar: 'الشاشة اللي المستخدم بيشوفها وبيتفاعل معاها — على المتصفح.', en: 'The screen the user sees and interacts with — on the browser.' } },
          { front: { ar: 'الواجهة الخلفية', en: 'Backend' }, back: { ar: 'المعالجة المخفية على جانب الخادم: بتعالج البيانات وتاخد القرارات.', en: 'Hidden server-side processing: processes data and makes decisions.' } },
          { front: { ar: 'قاعدة البيانات', en: 'Database' }, back: { ar: 'نظام بينظّم البيانات ويخزّنها ويديرها، ويسترجعها وقت الحاجة.', en: 'A system that organizes, stores and manages data and retrieves it when needed.' } },
          { front: { ar: 'بنية الطبقات التلاتة', en: 'Three-tier architecture' }, back: { ar: 'الأمامية + الخلفية + قاعدة البيانات بيتعاونوا.', en: 'Frontend + backend + database cooperating.' } },
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
            prompt: { ar: 'اشرح إزاي الطبقات التلاتة لتطبيق ويب بيتعاونوا لما مستخدم ينشر صورة على تطبيق تواصل اجتماعي. (أشِر إلى: دور الأمامية والخلفية وقاعدة البيانات)', en: 'Explain how the three tiers of a web application cooperate when a user posts a photo on a social media app. (Refer to: the roles of the frontend, backend and database)' },
            points: [
              { ar: 'الأمامية: شاشة النشر — تستقبل الصورة والتعليق وتبعتهم للخلفية.', en: 'Frontend: the post screen — takes the photo and caption and sends them to the backend.' },
              { ar: 'الخلفية: تعالج (تحدّد الجمهور، تجهّز الإشعارات) وتطلب التخزين.', en: 'Backend: processes (decides the audience, prepares notifications) and asks for storage.' },
              { ar: 'قاعدة البيانات: تخزّن بيانات المنشور، والخلفية ترجّع النتيجة للأمامية تعرضها.', en: 'Database: stores the post data; the backend returns the result for the frontend to display.' },
            ],
            model: { ar: 'المستخدم بيختار الصورة ويكتب تعليق على __شاشة النشر__ — دي الواجهة الأمامية، بتستقبل الإدخال وبتبعته للواجهة الخلفية. الواجهة الخلفية على الخادم بتعالج الطلب: بتتأكد من المستخدم، وبتحدّد مين يشوف المنشور، وبتجهّز إشعارات المتابعين، وبتطلب من __قاعدة البيانات__ تخزّن بيانات المنشور (الصورة والتعليق والوقت). قاعدة البيانات بتخزّن وبتأكّد، والخلفية بترجّع النتيجة للأمامية اللي بتعرض المنشور الجديد على التايملاين. يعني التطبيق مش شغّال بجزء واحد، لكن بتلات طبقات متعاونة لكل واحدة دور واضح.', en: 'The user picks a photo and writes a caption on the __post screen__ — the frontend, which accepts the input and sends it to the backend. The backend on the server processes the request: it checks the user, decides who will see the post, prepares notifications for followers, and asks the __database__ to store the post data (photo, caption, time). The database stores it and confirms, and the backend returns the result to the frontend, which shows the new post on the timeline. So the app works through three cooperating tiers, each with a clear role.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — تطبيق حجز عيادة', en: 'Think as an engineer — clinic booking app' },
            prompt: { ar: 'عيادة عايزة تطبيق ويب المرضى يحجزوا فيه مواعيد، ويشوفوا الأوقات الفاضية، ويطّلعوا على زياراتهم السابقة. ١) وزّع الشغل: نموذج الحجز، فحص الأوقات الفاضية، تخزين الزيارات السابقة — أنهي طبقة لكل واحدة وليه؟ ٢) صفحة الحجز فتحت بس مفيش أوقات ظهرت: أنهي طبقة شغّالة بوضوح وأنهي غالبًا وقعت؟ ٣) تنصح بفصل التطبيق لتلات طبقات؟ اذكر سببين.', en: 'A clinic wants a web app where patients book appointments, check free slots and see past visits. 1) Assign the work: booking form, checking free slots, storing past visits — which tier and why? 2) The booking page opens but no slots appear: which tier clearly works and which probably failed? 3) Recommend whether to split the app into three tiers, with two reasons.' },
            points: [
              { ar: 'نموذج الحجز ← أمامية · فحص الأوقات ← خلفية · تخزين الزيارات ← قاعدة بيانات.', en: 'Booking form → frontend · checking slots → backend · storing visits → database.' },
              { ar: 'الأمامية شغّالة (الصفحة ظهرت) والمشكلة في الخلفية/قاعدة البيانات.', en: 'Frontend works (the page appeared); the problem is backend/database.' },
              { ar: 'التوصية بالفصل + سببين (تشخيص الأعطال، الأمان، إعادة الاستخدام).', en: 'Recommend separation + two reasons (fault diagnosis, security, reuse).' },
            ],
            model: { ar: '١) نموذج الحجز ← الواجهة الأمامية لأنه شاشة بتستقبل إدخال المريض. فحص الأوقات الفاضية ← الواجهة الخلفية لأنه قرار ومعالجة على الخادم. تخزين الزيارات السابقة ← قاعدة البيانات لأنها بتخزّن وتسترجع. ٢) الصفحة ظهرت يبقى الأمامية شغّالة، والأوقات بتيجي من الخلفية اللي بتسأل قاعدة البيانات — فالعطل غالبًا في الخلفية أو قاعدة البيانات. ٣) أنصح بالفصل: أولًا تشخيص الأعطال أسهل زي ما شفنا، وثانيًا بيانات المرضى في قاعدة البيانات مش مكشوفة للمتصفح لأن الخلفية في النص (أمان).', en: '1) Booking form → frontend, because it is a screen taking the patient’s input. Checking free slots → backend, because it is a decision processed on the server. Storing past visits → database, because it stores and retrieves. 2) The page appeared, so the frontend works; the slots come from the backend asking the database — so the fault is probably in the backend or database. 3) I recommend separating: first, faults are easier to diagnose as we just saw; second, patient data in the database is not exposed to the browser because the backend sits in between (security).' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'تطبيق طقس المستخدم بيكتب فيه اسم مدينة ويشوف التوقعات. باستخدام نموذج الطبقات التلاتة: مين بياخد اسم المدينة؟ مين بيدوّر على بيانات التوقعات؟ مين بيخزّن التوقعات السابقة؟ وحدّد مهمة واحدة الأمامية متقدرش تعملها لوحدها.', en: 'A weather app: the user types a city and sees the forecast. Using the three-tier model: who takes the city name? who looks up the forecast? who stores past forecasts? Name one job the frontend cannot do on its own.' },
            points: [{ ar: 'اسم المدينة ← أمامية.', en: 'City name → frontend.' }, { ar: 'البحث عن التوقعات ← خلفية · التخزين ← قاعدة بيانات.', en: 'Looking up the forecast → backend · storing → database.' }, { ar: 'مهمة مستحيلة على الأمامية لوحدها: تجيب/تخزّن البيانات.', en: 'A job the frontend cannot do alone: fetch/store the data.' }],
            model: { ar: 'الأمامية بتاخد اسم المدينة من مربع الكتابة وتعرض النتيجة. الخلفية بتدوّر على بيانات التوقعات للمدينة دي وتجهّزها. قاعدة البيانات بتخزّن التوقعات السابقة وترجّعها وقت الطلب. والأمامية متقدرش لوحدها تجيب بيانات الطقس أو تخزّنها — لأنها مجرد شاشة على المتصفح، والبيانات موجودة ورا عند الخلفية وقاعدة البيانات.', en: 'The frontend takes the city name from the input box and displays the result. The backend looks up the forecast for that city and prepares it. The database stores past forecasts and returns them on request. The frontend cannot fetch or store weather data on its own — it is only a screen in the browser, while the data lives behind it in the backend and database.' } },
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
            prompt: { ar: 'لما بتكتب في مربع بحث وبتشوف النتايج: أنهي طبقة جمعت كلامك، وأنهي طبقة لقت الإجابة؟ وفي جدول الخدمات، كل الخدمات بتستخدم نفس الطبقات — إيه اللي بيتغيّر من خدمة للتانية؟', en: 'When you type in a search box and see results, which tier collected your input and which found the answer? And in the services table every service uses the same tiers — what changes from one to the next?' },
            points: [{ ar: 'الأمامية جمعت، والخلفية (بمساعدة قاعدة البيانات) لقت.', en: 'The frontend collected; the backend (with the database) found it.' }, { ar: 'اللي بيتغيّر محتوى كل طبقة مش وجودها.', en: 'What changes is the content of each tier, not its existence.' }],
            model: { ar: 'الواجهة الأمامية هي اللي جمعت الكلمات من مربع البحث، والواجهة الخلفية دوّرت في قاعدة البيانات ولقت المنتجات المطابقة ورجّعتها. وكل الخدمات (فيديو، تواصل، تسوّق) فيها نفس التلات طبقات؛ اللي بيتغيّر هو محتوى كل طبقة — يعني الشاشات اللي بتتعرض، والمعالجة اللي بتحصل، ونوع البيانات اللي بتتخزّن.', en: 'The frontend collected the words from the search box; the backend searched the database, found the matching products and returned them. Every service (video, SNS, shopping) has the same three tiers; what changes is the content of each tier — the screens shown, the processing done and the kind of data stored.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: أنهي طبقة عطلها بيبان للمستخدم أكتر، وليه؟ تحدّى: اختار خدمة أونلاين بتستخدمها، وقول الأمامية والخلفية وقاعدة البيانات بتاعتها كل واحدة بتعمل إيه.', en: 'Reflect: which tier’s failure is most noticeable to a user, and why? Challenge: pick an online service you use and describe what its frontend, backend and database each do.' },
            points: [{ ar: 'طبقة + سبب.', en: 'A tier + reason.' }, { ar: 'خدمة + دور كل طبقة.', en: 'A service + each tier’s role.' }],
            model: { ar: 'عطل الأمامية بيبان أكتر لأن المستخدم بيشوف الصفحة نفسها مكسورة أو مش بتفتح؛ أما عطل الخلفية أو قاعدة البيانات فبيظهر كنتايج ناقصة أو رسالة خطأ. مثال: Gmail — الأمامية بتعرض صندوق الوارد وشاشة الكتابة، والخلفية بتبعت الرسايل وتفلتر السبام، وقاعدة البيانات بتخزّن الرسايل وجهات الاتصال.', en: 'A frontend failure is most visible because the user sees the page itself broken or not loading; a backend or database failure shows up as missing results or an error message. Example: Gmail — the frontend shows the inbox and compose screen, the backend sends messages and filters spam, and the database stores messages and contacts.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '3-1', seconds: 60, items: [
          { text: { ar: 'تطبيق الويب بيتستخدم من المتصفح', en: 'A web app is used through a browser' }, answer: true },
          { text: { ar: 'تطبيق الويب لازم يتسطّب', en: 'A web app must be installed' }, answer: false },
          { text: { ar: 'الأمامية = الشاشة', en: 'Frontend = the screen' }, answer: true },
          { text: { ar: 'الخلفية بتشتغل على المتصفح', en: 'The backend runs on the browser' }, answer: false },
          { text: { ar: 'الخلفية بتعالج وتقرّر', en: 'The backend processes and decides' }, answer: true },
          { text: { ar: 'قاعدة البيانات بتعرض الشاشات', en: 'The database displays screens' }, answer: false },
          { text: { ar: 'قاعدة البيانات بتخزّن وتسترجع', en: 'The database stores and retrieves' }, answer: true },
          { text: { ar: 'التطبيق يشتغل بالأمامية لوحدها', en: 'An app works with the frontend alone' }, answer: false },
          { text: { ar: 'مصادقة الدخول شغل الخلفية', en: 'Login authentication is backend work' }, answer: true },
          { text: { ar: 'شاشة السلة شغل قاعدة البيانات', en: 'The cart screen is database work' }, answer: false },
          { text: { ar: 'سجل الطلبات بيتخزّن في قاعدة البيانات', en: 'Order history is stored in the database' }, answer: true },
          { text: { ar: 'الأمامية بتستقبل إدخال المستخدم', en: 'The frontend accepts user input' }, answer: true },
          { text: { ar: 'الطلب بينزل والاستجابة بترجع', en: 'Request goes down, reply comes back' }, answer: true },
          { text: { ar: 'كل خدمة ليها عدد طبقات مختلف', en: 'Each service has a different number of tiers' }, answer: false },
          { text: { ar: 'Gmail مثال لتطبيق ويب', en: 'Gmail is a web app example' }, answer: true },
          { text: { ar: 'المعالجة على الخادم بتبان للمستخدم', en: 'Server-side processing is visible to users' }, answer: false },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 3-1', en: 'Lesson 3-1 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. «مكوّن الشاشة اللي المستخدمين بيشوفوه مباشرةً» — أيّها؟', en: '1. "The screen component users see directly" — which?' }, options: [{ ar: 'الواجهة الخلفية', en: 'The backend' }, { ar: 'الواجهة الأمامية', en: 'The frontend' }, { ar: 'قاعدة البيانات', en: 'The database' }, { ar: 'الخادم', en: 'The server' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. فحص المخزون في متجر إلكتروني شغل أنهي طبقة؟', en: '2. Stock checking belongs to which tier?' }, options: [{ ar: 'الأمامية', en: 'Frontend' }, { ar: 'الخلفية', en: 'Backend' }, { ar: 'قاعدة البيانات', en: 'Database' }, { ar: 'المتصفح', en: 'Browser' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. إيه الوصف الأنسب لبنية الطبقات التلاتة؟', en: '3. Best description of the three-tier architecture?' }, options: [{ ar: 'الأمامية بتخزّن البيانات وتديرها', en: 'The frontend stores and manages data' }, { ar: 'الخلفية هي اللي بيتفاعل معاها المستخدم', en: 'The backend is what the user interacts with' }, { ar: 'مع فعل المستخدم بيتعاونوا التلاتة', en: 'On a user action the three cooperate' }, { ar: 'قاعدة البيانات بتعرض الشاشات', en: 'The database displays the screens' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. الواجهة الخلفية بتشتغل على المتصفح.', en: '4. The backend runs on the browser.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. قاعدة البيانات بتسترجع البيانات وقت الحاجة وبتسجّل بيانات جديدة.', en: '5. The database retrieves data when needed and records new data.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. تطبيق الويب ممكن يشتغل بالواجهة الأمامية لوحدها.', en: '6. A web app can work with the frontend alone.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. اذكر الطبقات التلاتة ودور كل واحدة في جملة.', en: '7. Name the three tiers and the role of each in one sentence.' },
          points: [{ ar: 'الأمامية: الشاشة وتستقبل الإدخال.', en: 'Frontend: the screen; accepts input.' }, { ar: 'الخلفية: معالجة على الخادم وقرارات.', en: 'Backend: server-side processing and decisions.' }, { ar: 'قاعدة البيانات: تنظيم وتخزين وإدارة.', en: 'Database: organize, store, manage.' }],
          model: { ar: 'الواجهة الأمامية: الشاشة اللي المستخدم بيشوفها وبتستقبل إدخاله على المتصفح. الواجهة الخلفية: المعالجة على جانب الخادم اللي بتعالج البيانات وتاخد القرارات. قاعدة البيانات: نظام بينظّم البيانات ويخزّنها ويديرها.', en: 'Frontend: the screen the user sees, accepting input on the browser. Backend: server-side processing that handles data and makes decisions. Database: a system that organizes, stores and manages data.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. رتّب خطوات البحث عن منتج عبر الطبقات (الست خطوات).', en: '8. Order the six steps of a product search through the tiers.' },
          points: [{ ar: 'الأمامية تستقبل ثم ترسل للخلفية.', en: 'Frontend receives, then sends to backend.' }, { ar: 'الخلفية تبحث في قاعدة البيانات، وقاعدة البيانات ترجّع.', en: 'Backend searches the database; the database returns.' }, { ar: 'الخلفية ترتّب وترجّع، والأمامية تعرض.', en: 'Backend organizes and returns; frontend displays.' }],
          model: { ar: '① الأمامية تستقبل كلمات البحث ② الأمامية ترسلها للخلفية ③ الخلفية تبحث في قاعدة البيانات ④ قاعدة البيانات ترجّع البيانات المطابقة ⑤ الخلفية ترتّب النتايج وترجّعها للأمامية ⑥ الأمامية تعرضها على الشاشة.', en: '① The frontend receives the keywords ② it sends them to the backend ③ the backend searches the database ④ the database returns the matching data ⑤ the backend organizes and returns the results ⑥ the frontend displays them.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اذكر مهمة واحدة الواجهة الأمامية متقدرش تعملها لوحدها، وليه.', en: '9. Name one job the frontend cannot do on its own, and why.' },
          points: [{ ar: 'مهمة زي: تخزين البيانات أو البحث فيها أو مصادقة الدخول.', en: 'A job such as storing/searching data or login authentication.' }, { ar: 'السبب: الأمامية شاشة على المتصفح، والبيانات والمعالجة ورا.', en: 'Reason: the frontend is a screen on the browser; data and processing are behind it.' }],
          model: { ar: 'مثلًا مصادقة تسجيل الدخول أو تخزين سجل الطلبات: الأمامية مجرد شاشة على المتصفح بتعرض وتجمع، أما التحقق من البيانات فشغل الخلفية على الخادم، والتخزين شغل قاعدة البيانات.', en: 'For example login authentication or storing order history: the frontend is only a screen in the browser that shows and collects; checking the data is the backend’s job on the server, and storing is the database’s.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. لموقع فيديو، صِف كل طبقة بتعمل إيه.', en: '10. For a video site, describe what each tier does.' },
          points: [{ ar: 'الأمامية: شاشات التشغيل والبحث واستقبال العمليات.', en: 'Frontend: playback and search screens; receives actions.' }, { ar: 'الخلفية: اختيار المقترحات وتجميع المشاهدات.', en: 'Backend: choosing recommendations; counting views.' }, { ar: 'قاعدة البيانات: الفيديوهات ومعلومات المستخدم وسجل المشاهدة.', en: 'Database: videos, user information, viewing history.' }],
          model: { ar: 'الأمامية: بتعرض شاشة التشغيل والبحث وبتستقبل عمليات المستخدم. الخلفية: بتختار الفيديوهات المقترحة وبتجمّع عدد المشاهدات. قاعدة البيانات: بتخزّن بيانات الفيديو ومعلومات المستخدم وسجل المشاهدة.', en: 'Frontend: shows the playback and search screens and receives user actions. Backend: selects recommended videos and aggregates view counts. Database: stores video data, user information and viewing history.' } } },
      ],
    },
  ],
});
