/* =========================================================
 * content/lesson-3-3.js — أساسيات تقنية الواجهة الأمامية
 * Pure data. Sources: textbook 3-3 (EN p.68–74) + memo (Arabic wording,
 * deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('3-3', {
  id: '3-3',
  color: '#f472b6',
  cover: 'img/web-l3-cover.webp',
  title: { ar: 'أساسيات تقنية الواجهة الأمامية', en: 'Fundamentals of Frontend Technology' },
  guiding: { ar: 'إزاي HTML و CSS و JavaScript بيشتغلوا مع بعض عشان يبنوا صفحة ويب، وإيه اللي بيخلّي الواجهة الأمامية الحديثة ليها معنى وتتكيّف وتتبني بكفاءة؟', en: 'How do HTML, CSS and JavaScript work together to build a web page, and what makes a modern frontend meaningful, adaptable and efficient to build?' },
  hook: {
    ar: 'افتح أي صفحة ويب وإنت بتشوف __تلات تقنيات__ شغّالين مع بعض. **HTML** بيبني __الهيكل__ — العناوين والفقرات والروابط، زي هيكل المبنى. **CSS** بيضيف __المظهر__ — الألوان والتخطيط والخطوط، زي ديكور المبنى. **JavaScript** بيضيف __السلوك__ — مربع بحث بيرد، زرار بيعدّ، شاشة بتتحدّث.',
    en: 'Open any web page and you see __three technologies__ at work. **HTML** builds the __structure__ — headings, paragraphs, links, like the frame of a building. **CSS** adds the __appearance__ — colors, layout, fonts, like its interior. **JavaScript** adds __behavior__ — a search box that responds, a button that counts, a screen that updates.',
  },
  keyFact: { ar: 'صفحة الويب متبنية من __HTML (البنية)__ و__CSS (المظهر)__ و__JavaScript (السلوك)__؛ والواجهة الأمامية الحديثة بتضيف __HTML الدلالية__ و__التصميم المتجاوب__ و__الأطر__.', en: 'A web page is built from __HTML (structure)__, __CSS (appearance)__ and __JavaScript (behavior)__; a modern frontend adds __semantic HTML__, __responsive design__ and __frameworks__.' },
  concepts: ['HTML', 'CSS', 'JavaScript', 'semantic HTML', 'accessibility', 'SEO', 'responsive design', 'mobile-first', 'framework'],
  objectives: [
    { ar: 'أشرح الأدوار المختلفة لـ HTML و CSS و JavaScript في بناء صفحة ويب.', en: 'Explain the distinct roles of HTML, CSS and JavaScript in building a web page.' },
    { ar: 'أوصف إزاي HTML الدلالية والتصميم المتجاوب والأطر بيحسّنوا الواجهة الأمامية الحديثة.', en: 'Describe how semantic HTML, responsive design and frameworks improve a modern frontend.' },
  ],

  stations: [
    /* ───────────── 1 · HTML · CSS · JavaScript ───────────── */
    {
      id: 'trio', kind: 'learn',
      title: { ar: 'HTML و CSS و JavaScript', en: 'HTML, CSS and JavaScript' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'لو صفحة الويب «مبنى»… تفتكر الألوان والخطوط تبقى أنهي جزء فيه؟', en: 'If a web page were a building… which part would the colors and fonts be?' },
            options: [
              { emoji: '🏗️', text: { ar: 'الهيكل الخرساني', en: 'The concrete frame' } },
              { emoji: '🎨', text: { ar: 'الديكور والدهانات', en: 'The decoration and paint' } },
              { emoji: '💡', text: { ar: 'الكهربا والسباكة', en: 'The electricity and plumbing' } },
            ],
            after: { ar: 'تعالى نبني الصفحة طبقة طبقة 👇', en: 'Let’s build the page layer by layer 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: نبني صفحة زي ما بنبني بيت', en: '🎞️ Animation: building a page like a house' },
          enTitle: 'HTML, CSS and JavaScript',
          terms: ['HTML', 'CSS', 'JavaScript'],
          visual: { anim: 'frontendMovie', props: { scenes: [0, 3] } },
          beats: [
            { ar: 'كتير من صفحات الويب بتستخدم **تلات تقنيات** لكل واحدة __دور مختلف__، و__مش لازم__ الصفحة تستخدم التلاتة مع بعض: ممكن HTML لوحده، أو مع CSS وJavaScript حسب الوظايف المطلوبة. تعالى نبنيها زي البيت 🏠.', en: 'Every web page is built mainly from **three technologies** — each with an __independent role__, and the page is made by using them __in combination__. Let’s build it like a house 🏠.' },
            { ar: '**HTML** بيحدّد __بنية (هيكل) الصفحة__: بيوصف العناصر زي __العناوين والفقرات والصور والروابط__. تشبيهه: __هيكل المبنى__ 🏗️.', en: '**HTML** defines the __structure (skeleton)__ of the page: it describes elements such as __headings, paragraphs, images and links__. Analogy: __the frame of a building__ 🏗️.' },
            { ar: '**CSS** بيحدّد __مظهر الصفحة__: الألوان، التخطيط، الحجم، الخطوط. تشبيهه: __الديكور الداخلي والخارجي__ للمبنى 🎨.', en: '**CSS** specifies the __appearance__ of the page: colors, layout, size, fonts. Analogy: __the interior and exterior__ of a building 🎨.' },
            { ar: '**JavaScript** بيضيف __السلوك والتفاعل__: بيرد لما تدوس على زرار، و__بيحدّث جزء بس من الشاشة__. تشبيهه: __الكهربا والسباكة__ في المبنى 💡. ⚠️ فخ: «CSS بيضيف السلوك» ← __غلط__.', en: '**JavaScript** adds __behavior and interactivity__: it responds when a button is pressed and __updates only part of the screen__. Analogy: __the electrical and plumbing systems__ 💡. ⚠️ Trap: "CSS adds behavior" → __false__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل مهمة بتتعمل بأنهي تقنية؟', en: 'Which technology does each task?' },
            groups: [{ icon: 'code', label: { ar: 'HTML (بنية)', en: 'HTML (structure)' } }, { icon: 'image', label: { ar: 'CSS (مظهر)', en: 'CSS (appearance)' } }, { icon: 'bolt', label: { ar: 'JavaScript (سلوك)', en: 'JavaScript (behavior)' } }],
            items: [
              { text: { ar: 'وصف العناوين والفقرات', en: 'Describing headings and paragraphs' }, group: 0 },
              { text: { ar: 'تغيير لون النص وحجمه', en: 'Changing text color and size' }, group: 1 },
              { text: { ar: 'تحديث جزء من الشاشة لما تدوس زرار', en: 'Updating part of the screen on a button press' }, group: 2 },
              { text: { ar: 'وضع الصور والروابط', en: 'Placing images and links' }, group: 0 },
              { text: { ar: 'التحقّق من محتويات النموذج', en: 'Validating form contents' }, group: 2 },
            ],
            explain: { ar: 'الهيكل ← HTML · الشكل ← CSS · الرد والتحديث والتحقق ← JavaScript.', en: 'Structure → HTML · looks → CSS · reacting, updating, validating → JavaScript.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل تقنية بتشبيهها في المبنى:', en: 'Match each technology with its building analogy:' },
            left: [{ ar: 'CSS', en: 'CSS' }, { ar: 'JavaScript', en: 'JavaScript' }, { ar: 'HTML', en: 'HTML' }],
            right: [{ ar: 'هيكل المبنى', en: 'The frame' }, { ar: 'الديكور الداخلي والخارجي', en: 'Interior and exterior' }, { ar: 'الكهربا والسباكة', en: 'Electricity and plumbing' }],
            answer: [1, 2, 0],
            explain: { ar: 'HTML هيكل · CSS ديكور · JavaScript كهربا وسباكة.', en: 'HTML frame · CSS decoration · JavaScript electricity and plumbing.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**HTML** = البنية (عناوين، فقرات، صور، روابط) — هيكل المبنى.', en: '**HTML** = structure (headings, paragraphs, images, links) — the frame.' },
            { ar: '**CSS** = المظهر (ألوان، تخطيط، حجم، خطوط) — الديكور.', en: '**CSS** = appearance (colors, layout, size, fonts) — the decoration.' },
            { ar: '**JavaScript** = السلوك والتفاعل (رد على الضغط، تحديث جزء من الشاشة) — الكهربا والسباكة. ومش لازم الصفحة تستخدم التلاتة مع بعض.', en: '**JavaScript** = behavior (responding, partial updates) — electricity and plumbing. The three are __independent roles combined__.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · the modern frontend ───────────── */
    {
      id: 'modern', kind: 'learn',
      title: { ar: 'HTML الدلالية · التصميم المتجاوب · الأطر', en: 'Semantic HTML · responsive design · frameworks' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: الواجهة الأمامية الحديثة', en: '🎞️ Animation: the modern frontend' },
          enTitle: 'The modern frontend',
          terms: ['semantic HTML', 'accessibility', 'SEO', 'responsive design', 'mobile-first', 'framework'],
          visual: { anim: 'frontendMovie', props: { scenes: [4, 8] } },
          beats: [
            { ar: '**HTML الدلالية:** استخدام __عناصر (وسوم tags) بتوضّح وظيفة أجزاء الصفحة__: ‎<header>‎ للأعلى · ‎<nav>‎ للتنقّل · ‎<main>‎ للمحتوى الرئيسي · ‎<footer>‎ للأسفل — بدل صناديق ‎<div>‎ عادية ملهاش معنى.', en: '**Semantic HTML:** describing each part of the page with __tags that indicate its meaning__: <header> at the top · <nav> for navigation · <main> for the body · <footer> at the bottom — instead of plain meaningless <div> boxes.' },
            { ar: 'فوايدها: **① إمكانية الوصول** — __برامج قراءة الشاشة__ بتفهم بنية الصفحة، فالمعلومة توصل أسهل لـ__ذوي الإعاقة البصرية__ 🔊 (ومع ده لسه محتاجين ممارسات وصول تانية) · **② SEO** (تحسين محركات البحث) — ممكن تساعد محركات البحث تفهم بنية المحتوى بصورة أفضل، __بس مابتضمنش ترتيب أعلى__ 🔎. ⚠️ __مش__ بالضرورة بتخلّي الصفحة أسرع!', en: 'Benefits: **① accessibility** — __screen readers__ understand the page structure, so information reaches __visually impaired users__ more easily 🔊 · **② SEO** — search engines understand the content correctly and show the page appropriately 🔎. ⚠️ It does __not__ necessarily make the page faster!' },
            { ar: '**التصميم المتجاوب:** التخطيط __بيتضبط تلقائيًا__ حسب حجم الشاشة (كمبيوتر، تابلت، موبايل) — __صفحة واحدة__ مريحة من أي جهاز. ولأن ناس كتير بتستخدم الويب من الموبايل، المطوّرين بيراعوا الشاشات الصغيرة من بداية التصميم، وده اسمه أحيانًا **نهج الأولوية للجوال**.', en: '**Responsive design:** the layout __adjusts automatically__ to the screen size (PC, tablet, phone) — __one page__ that is easy to view on any device. With so much mobile browsing, **mobile-first** spread: design starts from small screens.' },
            { ar: '**الإطار (Framework):** بنية بتوفّر __وظائف ومكوّنات جاهزة__ عشان تطوير تطبيقات الويب يبقى __أكفأ__ — من غير ما تكتب كل الكود من الصفر. **React** (مكتبة JavaScript لبناء الواجهات من مكوّنات قابلة لإعادة الاستخدام وتحديثها لما البيانات تتغيّر) · **Vue** (بنيته بسيطة، وبيتيح البناء تدريجيًا من ميزات صغيرة) · **Next.js** (إطار مبني على React: التوجيه وطرق مختلفة لعرض الصفحات والعمل على الخادم والعميل).', en: '**Framework:** a structure that provides __ready-made functions and components__ to make web development __more efficient__ — no writing all code from scratch. **React** (by Meta: efficiently updates part of the screen, for large apps) · **Vue** (simple, build incrementally from small features) · **Next.js** (React’s features + faster page display).' },
            { ar: '📌 **الخلاصة:** HTML __يبني__ · CSS __ينسّق__ · JavaScript __يتصرّف__ — والحديث: HTML الدلالية (__وصول + SEO__) · المتجاوب (__أي شاشة__) · الأطر (__بناء أكفأ__).', en: '📌 **The point:** HTML __structures__ · CSS __styles__ · JavaScript __behaves__ — and modern: semantic HTML (__accessibility + SEO__) · responsive (__any screen__) · frameworks (__efficient building__).' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'سبب الحاجة للتصميم المتجاوب: المواقع __بتتصفح من أجهزة مختلفة__ — مش لتحسين السرعة ولا لرفع ترتيب البحث. والإطار = __بنية لتطوير أكفأ__ (مش لغة بنية ولا تشفير).', en: 'Why responsive design: sites are __browsed on different devices__ — not for speed or search ranking. A framework = __a structure for efficient development__ (not a structure language or encryption).' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — ليه نفصل التلاتة؟', en: 'Deep dive — why keep the three apart?' }, text: { ar: 'لو كله متشابك في ملف واحد: تغيير لون بسيط ممكن يكسر البنية، وقارئ الشاشة يتوه. الفصل بيدّيك: تعدّل المظهر (CSS) من غير ما تلمس المحتوى (HTML)، وتضيف سلوك (JS) من غير ما تعيد كتابة الصفحة. و‎<nav>‎ بدل ‎<div>‎ بيقول لقارئ الشاشة «ده شريط تنقّل» ولمحركات البحث.', en: 'If everything is tangled in one file, a small color change may break the structure and a screen reader gets lost. Separating lets you restyle (CSS) without touching content (HTML) and add behavior (JS) without rewriting the page. A <nav> instead of a <div> tells a screen reader "this is navigation" and Google "this matters".' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ فايدة لاستخدام HTML الدلالية؟', en: 'Which is **NOT** a benefit of semantic HTML?' },
            options: [
              { ar: 'برامج قراءة الشاشة تفهم بنية الصفحة صح', en: 'Screen readers understand the page structure correctly' },
              { ar: 'محركات البحث تفهم محتوى الصفحة أسهل', en: 'Search engines understand the content more easily' },
              { ar: 'سرعة عرض الصفحة بتزيد بالضرورة دايمًا', en: 'The display speed necessarily always increases' },
              { ar: 'المعلومة توصل أسهل لذوي الإعاقة البصرية', en: 'Information reaches visually impaired users more easily' },
            ],
            answer: 2,
            explain: { ar: 'فوايدها __إمكانية الوصول وSEO__ — مش السرعة بالضرورة.', en: 'Its benefits are __accessibility and SEO__ — not necessarily speed.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'التصميم المتجاوب = صفحة واحدة بتتضبط على كل أحجام الشاشات.', en: 'Responsive design = one page that adjusts to every screen size.' }, answer: true },
            { text: { ar: 'نهج الأولوية للجوال معناها نبدأ التصميم من الشاشات الكبيرة.', en: 'Mobile-first means design starts from large screens.' }, answer: false, explain: { ar: 'نبدأ من __الشاشات الصغيرة__.', en: 'It starts from __small screens__.' } },
            { text: { ar: 'الإطار بيوفّر مكوّنات جاهزة فمش لازم نكتب كل الكود من الصفر.', en: 'A framework provides ready-made parts so not all code is written from scratch.' }, answer: true },
            { text: { ar: 'React مكتبة JavaScript لبناء واجهات المستخدم.', en: 'React was developed by Meta.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**HTML الدلالية:** عناصر بتوضّح وظيفة أجزاء الصفحة (header · nav · main · footer) ← إمكانية الوصول + SEO (من غير ضمان ترتيب أعلى، ومش السرعة بالضرورة).', en: '**Semantic HTML:** meaningful tags (header · nav · main · footer) → accessibility + SEO (not necessarily speed).' },
            { ar: '**التصميم المتجاوب:** التخطيط بيتكيّف مع حجم الشاشة · **نهج الأولوية للجوال**: نراعي الشاشات الصغيرة من البداية.', en: '**Responsive design:** layout adapts to screen size · **mobile-first**: start from small screens.' },
            { ar: '**الأطر:** وظائف جاهزة لتطوير أكفأ — React (مكتبة واجهات) · Vue (بسيط وتدريجي) · Next.js (إطار مبني على React).', en: '**Frameworks:** ready-made functions for efficient development — React (Meta) · Vue (simple, incremental) · Next.js (React + faster display).' },
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
            { text: { ar: 'A) HTML تقنية بتحدّد بنية (هيكل) صفحة الويب.', en: 'A) HTML defines the structure (skeleton) of a web page.' }, answer: true },
            { text: { ar: 'B) CSS تقنية بتضيف السلوك لصفحة الويب.', en: 'B) CSS adds behavior to a web page.' }, answer: false },
            { text: { ar: 'C) التصميم المتجاوب مفهوم التخطيط فيه بيتضبط تلقائيًا حسب أحجام الشاشات.', en: 'C) Responsive design adjusts the layout automatically to screen sizes.' }, answer: true },
            { text: { ar: 'D) استخدام إطار عمل بيغني عن كتابة كل الكود من الصفر ويتيح تطوير أكفأ.', en: 'D) A framework removes the need to write all code from scratch and allows efficient development.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) HTML = البنية ← **✓**.', en: 'A) HTML = structure → **✓**.' },
            { ar: 'B) CSS = __المظهر__؛ السلوك هو JavaScript ← **✗**.', en: 'B) CSS = __appearance__; behavior is JavaScript → **✗**.' },
            { ar: 'C) تعريف صحيح للتصميم المتجاوب ← **✓**.', en: 'C) Correct definition of responsive design → **✓**.' },
            { ar: 'D) وصف صحيح لفايدة الأطر ← **✓**.', en: 'D) Correct description of frameworks’ benefit → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل دور (a–c) بالتقنية (A–C):', en: '(2) Match each role (a–c) with the technology (A–C):' },
            left: [
              { ar: 'a) تحديد بنية صفحة الويب', en: 'a) Defines the structure of a web page' },
              { ar: 'b) تحديد مظهر صفحة الويب', en: 'b) Specifies the appearance of a web page' },
              { ar: 'c) إضافة السلوك والتفاعل لصفحة الويب', en: 'c) Adds behavior and interactivity to a web page' },
            ],
            right: [{ ar: 'A HTML', en: 'A HTML' }, { ar: 'B CSS', en: 'B CSS' }, { ar: 'C JavaScript', en: 'C JavaScript' }],
            answer: [0, 1, 2] },
          solution: [
            { ar: 'a: البنية = **HTML** ← A.', en: 'a: structure = **HTML** → A.' },
            { ar: 'b: المظهر = **CSS** ← B.', en: 'b: appearance = **CSS** → B.' },
            { ar: 'c: السلوك = **JavaScript** ← C.', en: 'c: behavior = **JavaScript** → C.' },
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
            { q: { ar: '1. الاختصار (4 حروف) للتقنية اللي بتحدّد بنية الصفحة؟', en: '1. The four-letter abbreviation for the technology defining page structure?' }, a: { ar: 'HTML', en: 'HTML' } },
            { q: { ar: '2. الاختصار (3 حروف) للتقنية اللي بتحدّد المظهر (ألوان، تخطيط، حجم)؟', en: '2. The three-letter abbreviation for the technology specifying appearance?' }, a: { ar: 'CSS', en: 'CSS' } },
            { q: { ar: '3. التقنية اللي بتضيف السلوك والتفاعل؟', en: '3. The technology that adds behavior and interactivity?' }, a: { ar: 'JavaScript', en: 'JavaScript' } },
            { q: { ar: '4. مفهوم ضبط التخطيط تلقائيًا حسب أحجام الشاشات؟', en: '4. The concept of automatically adjusting layout to screen sizes?' }, a: { ar: 'التصميم المتجاوب', en: 'Responsive design' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي __مش__ فايدة مناسبة لـ HTML الدلالية:', en: 'Choose the one that is **NOT** an appropriate benefit of semantic HTML:' },
            options: [
              { ar: 'برامج قراءة الشاشة بتفهم بنية الصفحة صح', en: 'Screen readers can correctly understand the page structure' },
              { ar: 'محركات البحث بتفهم محتوى الصفحة أسهل', en: 'Search engines can more easily understand the content' },
              { ar: 'سرعة عرض الصفحة بتبقى أسرع بالضرورة', en: 'The display speed necessarily becomes faster' },
              { ar: 'المعلومة بتوصل أسهل لذوي الإعاقة البصرية', en: 'Information is easier to convey to visually impaired users' },
            ],
            fixedOrder: true,
            answer: 2,
            explain: { ar: 'C ← مش صح؛ السرعة مش فايدة مضمونة.', en: 'C → not right; speed is not a guaranteed benefit.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب للإطار (Framework):', en: 'Choose the best description of a framework:' },
            options: [
              { ar: 'لغة لتحديد بنية صفحة الويب', en: 'A language for defining a page’s structure' },
              { ar: 'بنية لجعل تطوير تطبيقات الويب أكفأ', en: 'A structure to make web development efficient' },
              { ar: 'تقنية لتشفير البيانات وإرسالها بأمان', en: 'A technology for encrypting and sending data' },
              { ar: 'مفهوم تصميم لدعم أحجام الشاشات المختلفة', en: 'A design concept for different screen sizes' },
            ],
            answer: 1,
            explain: { ar: 'لغة البنية = HTML · التشفير = HTTPS · دعم الشاشات = المتجاوب · و__الإطار = تطوير أكفأ__.', en: 'Structure language = HTML · encryption = HTTPS · screen support = responsive · __framework = efficient development__.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(d):', en: 'Read and fill blanks (a)–(d):' },
            text: { ar: 'كتير من صفحات الويب بتستخدم {0} لتحديد البنية، وممكن تستخدم {1} لتنسيق المظهر، و{2} لإضافة السلوك والتفاعل. وتصميم التخطيط عشان يتكيّف مع أحجام الشاشات المختلفة اسمه {3}.', en: 'Web pages are mainly made of three technologies: {0}, which defines the structure; {1}, which specifies the appearance; and {2}, which adds behavior and interactivity. Adjusting the layout to screen sizes such as PCs, phones and tablets is called {3}.' },
            bank: [{ ar: 'HTML', en: 'HTML' }, { ar: 'CSS', en: 'CSS' }, { ar: 'JavaScript', en: 'JavaScript' }, { ar: 'التصميم المتجاوب', en: 'responsive design' }, { ar: 'إطار العمل', en: 'framework' }],
            answer: [0, 1, 2, 3],
            explain: { ar: '(a) HTML (b) CSS (c) JavaScript (d) التصميم المتجاوب.', en: '(a) HTML (b) CSS (c) JavaScript (d) responsive design.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'classify', prompt: { ar: 'لكل مهمة (a–f) حدّد التقنية المستخدمة:', en: 'For each task (a–f) choose the technology:' },
            groups: [{ icon: 'code', label: { ar: 'A HTML', en: 'A HTML' } }, { icon: 'image', label: { ar: 'B CSS', en: 'B CSS' } }, { icon: 'bolt', label: { ar: 'C JavaScript', en: 'C JavaScript' } }],
            items: [
              { text: { ar: 'a) وصف بنية العناوين والفقرات', en: 'a) Describing the structure of headings and paragraphs' }, group: 0 },
              { text: { ar: 'b) تغيير لون النص وحجمه', en: 'b) Changing the text color and size' }, group: 1 },
              { text: { ar: 'c) تحديث جزء من الشاشة لما تدوس زرار', en: 'c) Updating part of the screen when a button is pressed' }, group: 2 },
              { text: { ar: 'd) وضع الصور والروابط', en: 'd) Placing images and links' }, group: 0 },
              { text: { ar: 'e) ضبط لون خلفية الصفحة كلها', en: 'e) Setting the background color of the whole page' }, group: 1 },
              { text: { ar: 'f) التحقّق من محتويات النموذج المدخلة', en: 'f) Validating the contents entered into a form' }, group: 2 },
            ],
            explain: { ar: 'a→A · b→B · c→C · d→A · e→B · f→C.', en: 'a→A · b→B · c→C · d→A · e→B · f→C.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار أنسب سبب للحاجة للتصميم المتجاوب:', en: 'Choose the best reason responsive design is needed:' },
            options: [
              { ar: 'لتحسين سرعة عرض المواقع', en: 'To improve the display speed of websites' },
              { ar: 'لأن المواقع بتتصفح من أجهزة مختلفة', en: 'Because sites are viewed on various devices' },
              { ar: 'لرفع ترتيب الموقع في محركات البحث', en: 'To raise the site’s search-engine ranking' },
              { ar: 'لإضافة السلوك والتفاعل لصفحات الويب', en: 'To add behavior and interactivity to pages' },
            ],
            answer: 1,
            explain: { ar: 'السبب: __تنوّع الأجهزة__ (كمبيوتر، موبايل، تابلت).', en: 'The reason: __device variety__ (PC, phone, tablet).' } },
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
          { front: { ar: 'HTML', en: 'HTML' }, back: { ar: 'البنية: عناوين، فقرات، صور، روابط — هيكل المبنى.', en: 'Structure: headings, paragraphs, images, links — the frame.' } },
          { front: { ar: 'CSS', en: 'CSS' }, back: { ar: 'المظهر: ألوان، تخطيط، حجم، خطوط — الديكور.', en: 'Appearance: colors, layout, size, fonts — the decoration.' } },
          { front: { ar: 'JavaScript', en: 'JavaScript' }, back: { ar: 'السلوك والتفاعل — الكهربا والسباكة.', en: 'Behavior and interactivity — electricity and plumbing.' } },
          { front: { ar: 'HTML الدلالية', en: 'Semantic HTML' }, back: { ar: 'عناصر بتوضّح وظيفة أجزاء الصفحة (header · nav · main · footer).', en: 'Tags that indicate each part’s meaning (header · nav · main · footer).' } },
          { front: { ar: 'إمكانية الوصول', en: 'Accessibility' }, back: { ar: 'تصميم المحتوى والواجهة بحيث أصحاب القدرات والاحتياجات المختلفة يقدروا يستخدموها، ومنهم ذوو الإعاقة.', en: 'Usable by people with impairments — e.g. screen readers.' } },
          { front: { ar: 'SEO', en: 'SEO' }, back: { ar: 'تحسين محركات البحث: ممارسات بتخلّي الصفحة أيسر في الفهرسة والظهور في نتايج البحث.', en: 'Search engine optimization: being found and shown well in results.' } },
          { front: { ar: 'التصميم المتجاوب', en: 'Responsive design' }, back: { ar: 'التخطيط بيتكيّف تلقائيًا مع حجم الشاشة.', en: 'The layout adapts automatically to screen size.' } },
          { front: { ar: 'نهج الأولوية للجوال', en: 'Mobile-first' }, back: { ar: 'نبدأ التصميم من الشاشات الصغيرة.', en: 'Design starts from small screens.' } },
          { front: { ar: 'إطار العمل', en: 'Framework' }, back: { ar: 'وظائف ومكوّنات جاهزة لتطوير أكفأ (React · Vue · Next.js).', en: 'Ready-made functions and components for efficient development (React · Vue · Next.js).' } },
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
            prompt: { ar: 'اشرح إزاي HTML و CSS و JavaScript كل واحدة بتساهم في صفحة مكتبة بتعرض قايمة كتب، ومنسّقة، وبتصفّي النتايج وإنت بتكتب. (أشِر إلى: البنية، المظهر، السلوك)', en: 'Explain how HTML, CSS and JavaScript each contribute to a library page that lists books, is styled, and filters results as the user types. (Refer to: structure, appearance, behavior)' },
            points: [
              { ar: 'HTML: قايمة الكتب والعناوين ومربع البحث (البنية).', en: 'HTML: the book list, headings and search box (structure).' },
              { ar: 'CSS: الألوان والخطوط وترتيب القايمة (المظهر).', en: 'CSS: colors, fonts and list layout (appearance).' },
              { ar: 'JavaScript: يصفّي النتايج ويحدّث جزء من الشاشة وإنت بتكتب (السلوك).', en: 'JavaScript: filters results and updates part of the screen as you type (behavior).' },
            ],
            model: { ar: '__HTML__ بيبني البنية: عنوان الصفحة، ومربع البحث، وقايمة الكتب بعناصرها (اسم الكتاب والمؤلف والصورة). __CSS__ بيدّي المظهر: ألوان المكتبة والخطوط، وترتيب الكتب في صفوف، والمسافات بينها. و__JavaScript__ بيضيف السلوك: كل ما المستخدم يكتب حرف في مربع البحث، يصفّي الكتب ويحدّث القايمة بس من غير ما يحمّل الصفحة كلها من جديد. التلات أدوار مستقلة، والصفحة بتتعمل بيهم مع بعض.', en: '__HTML__ builds the structure: the page title, the search box and the book list with its items (title, author, image). __CSS__ gives the appearance: library colors and fonts, books arranged in rows, spacing. __JavaScript__ adds behavior: each time the user types a letter, it filters the books and updates just the list without reloading the whole page. The three roles are independent, and the page is made by combining them.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — صفحة نادي الطلاب', en: 'Think as an engineer — student club page' },
            prompt: { ar: 'نادي طلابي عايز صفحة بسيطة بتعرض فعالياته، بألوان النادي، وفيها زرار بيبيّن عدد المسجّلين. ١) لاحظ صفحة بتستخدمها: حاجتين بيتغيّروا لما تدوس أو تكتب. وبعدين: قايمة الفعاليات، وألوان النادي وتخطيطه، وعدّاد التسجيل الحي — كل واحدة بأنهي تقنية وليه؟ ٢) اقترح تغيير يخلّي الصفحة أسهل على الموبايل (متجاوب)، واختيار HTML دلالي يساعد قارئ الشاشة. ٣) تنصح بفصل التلات تقنيات؟ اذكر سببين.', en: 'A student club wants a simple page listing its events, in the club colors, with a button showing how many signed up. 1) Observe a page you use: two things that change when you click or type. Then: events list, club colors and layout, live sign-up counter — which technology each, and why? 2) Suggest one responsive change for phones and one semantic-HTML choice for screen readers. 3) Recommend whether to separate the three, with two reasons.' },
            points: [
              { ar: 'القايمة HTML · الألوان والتخطيط CSS · العدّاد JavaScript.', en: 'List HTML · colors/layout CSS · counter JavaScript.' },
              { ar: 'متجاوب: الفعاليات عمود واحد على الموبايل · دلالي: <nav> و<main>.', en: 'Responsive: one column on phones · semantic: <nav> and <main>.' },
              { ar: 'فصل + سببين (تعديل المظهر من غير المحتوى، إضافة سلوك بسهولة).', en: 'Separate + two reasons (restyle without touching content, add behavior easily).' },
            ],
            model: { ar: '١) قايمة الفعاليات ← HTML لأنها محتوى وبنية. ألوان النادي وتخطيطه ← CSS لأنه المظهر. عدّاد التسجيل الحي ← JavaScript لأنه سلوك بيتحدّث لما حد يدوس. ٢) متجاوب: على الموبايل تظهر الفعاليات في عمود واحد بخط أكبر بدل جدول عريض. دلالي: أستخدم ‎<nav>‎ لروابط النادي و‎<main>‎ لقايمة الفعاليات، فقارئ الشاشة يفهم الأجزاء. ٣) أنصح بالفصل: أولًا أقدر أغيّر ألوان النادي من CSS من غير ما ألمس المحتوى، وثانيًا أضيف أو أعدّل العدّاد في JavaScript من غير ما أعيد كتابة الصفحة.', en: '1) Events list → HTML because it is content and structure. Club colors and layout → CSS because it is appearance. Live counter → JavaScript because it is behavior that updates on a click. 2) Responsive: on phones the events show in one column with larger text instead of a wide table. Semantic: use <nav> for club links and <main> for the events list so a screen reader understands the parts. 3) Separate them: first, I can change the club colors in CSS without touching the content; second, I can add or change the counter in JavaScript without rewriting the page.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'موقع أخبار لازم يبان كويس على الموبايل ويتلاقى بسهولة في محركات البحث. اذكر اختيار تصميم متجاوب واختيار HTML دلالي، وكل واحد بيحسّن إيه.', en: 'A news site must look good on phones and be found easily by search engines. Name one responsive-design choice and one semantic-HTML choice, and what each improves.' },
            points: [{ ar: 'اختيار متجاوب + يحسّن العرض على الموبايل.', en: 'A responsive choice + improves phone viewing.' }, { ar: 'اختيار دلالي + يحسّن SEO وإمكانية الوصول.', en: 'A semantic choice + improves SEO and accessibility.' }],
            model: { ar: 'متجاوب: الأخبار تتعرض عمود واحد والصور تصغر تلقائيًا على شاشة الموبايل — ده بيحسّن سهولة القراءة على أي جهاز. دلالي: كل خبر جوّه ‎<article>‎ والعنوان الرئيسي ‎<h1>‎ وشريط الأقسام ‎<nav>‎ — ده بيخلّي محركات البحث تفهم المحتوى (SEO) وبرامج قراءة الشاشة تتنقّل صح (إمكانية الوصول).', en: 'Responsive: news shows in one column and images shrink automatically on phones — improving readability on any device. Semantic: each story in an <article>, the main headline in <h1> and the sections bar in <nav> — helping search engines understand the content (SEO) and screen readers navigate correctly (accessibility).' } },
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
            prompt: { ar: 'ليه قارئ الشاشة بيفهم الصفحة أحسن لما تستخدم ‎<header>‎ و‎<nav>‎ و‎<main>‎ بدل صناديق عادية؟', en: 'Why does a screen reader understand a page better with <header>, <nav> and <main> instead of plain boxes?' },
            points: [{ ar: 'الوسوم بتقول معنى كل جزء.', en: 'The tags state each part’s meaning.' }, { ar: 'فيقدر يقرأ ويتنقّل صح.', en: 'So it can read and navigate correctly.' }],
            model: { ar: 'لأن الوسوم الدلالية بتقول لقارئ الشاشة معنى كل جزء: «ده رأس الصفحة»، «ده شريط تنقّل»، «ده المحتوى الأساسي». الصناديق العادية ‎<div>‎ مابتقولش أي معنى، فقارئ الشاشة مايعرفش يرتّبها أو يتنقّل بينها.', en: 'Because semantic tags tell the screen reader what each part means: "this is the header", "this is navigation", "this is the main content". Plain <div> boxes say nothing, so the screen reader cannot order or move between them.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: من البنية والمظهر والسلوك، أنهي واحدة بتلاحظها أكتر لما صفحة تكون معمولة وحش، وليه؟ تحدّى: اختار موقع بتستخدمه وقول حاجة واحدة بيعملها HTML و CSS و JavaScript فيه.', en: 'Reflect: of structure, style and behavior, which do you notice most when a page is badly made, and why? Challenge: pick a site you use and name one thing HTML, CSS and JavaScript each do on it.' },
            points: [{ ar: 'اختيار + سبب.', en: 'A choice + reason.' }, { ar: 'موقع + دور كل تقنية.', en: 'A site + each technology’s role.' }],
            model: { ar: 'غالبًا بلاحظ السلوك: زرار مايردّش أو صفحة تعلّق بتضايق فورًا. مثال YouTube: HTML بيحط عنوان الفيديو والتعليقات، CSS بيضبط الألوان وترتيب الفيديوهات، وJavaScript بيشغّل الفيديو ويحدّث عدد اللايكات لما أدوس من غير ما الصفحة تتحمّل تاني.', en: 'Usually behavior: a button that does not respond or a page that freezes annoys at once. Example YouTube: HTML places the video title and comments, CSS sets the colors and layout of videos, and JavaScript plays the video and updates the like count on a click without reloading the page.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '3-3', seconds: 60, items: [
          { text: { ar: 'HTML = البنية', en: 'HTML = structure' }, answer: true },
          { text: { ar: 'CSS = السلوك', en: 'CSS = behavior' }, answer: false },
          { text: { ar: 'CSS = المظهر', en: 'CSS = appearance' }, answer: true },
          { text: { ar: 'JavaScript بيحدّث جزء من الشاشة', en: 'JavaScript updates part of the screen' }, answer: true },
          { text: { ar: 'HTML تشبيهه الكهربا والسباكة', en: 'HTML’s analogy is electricity and plumbing' }, answer: false },
          { text: { ar: '<nav> وسم دلالي للتنقّل', en: '<nav> is a semantic tag for navigation' }, answer: true },
          { text: { ar: 'HTML الدلالية ممكن تساعد في SEO', en: 'Semantic HTML improves SEO' }, answer: true },
          { text: { ar: 'HTML الدلالية بتسرّع الصفحة بالضرورة', en: 'Semantic HTML necessarily speeds up the page' }, answer: false },
          { text: { ar: 'المتجاوب: صفحة واحدة لكل الشاشات', en: 'Responsive: one page for all screens' }, answer: true },
          { text: { ar: 'نهج الأولوية للجوال = نبدأ بالشاشة الكبيرة', en: 'Mobile-first = start with the big screen' }, answer: false },
          { text: { ar: 'الإطار بيوفّر مكوّنات جاهزة', en: 'A framework provides ready-made parts' }, answer: true },
          { text: { ar: 'React مكتبة JavaScript', en: 'React is by Meta' }, answer: true },
          { text: { ar: 'الإطار تقنية تشفير', en: 'A framework is an encryption technology' }, answer: false },
          { text: { ar: 'Next.js إطار مبني على React', en: 'Next.js = React features + faster display' }, answer: true },
          { text: { ar: 'Vue بنيته بسيطة', en: 'Vue has a simple structure' }, answer: true },
          { text: { ar: 'التحقّق من النموذج شغل CSS', en: 'Form validation is CSS work' }, answer: false },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 3-3', en: 'Lesson 3-3 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. أنهي تقنية بتضيف السلوك والتفاعل للصفحة؟', en: '1. Which adds behavior and interactivity?' }, options: [{ ar: 'لغة HTML', en: 'HTML language' }, { ar: 'تنسيق CSS', en: 'CSS styling' }, { ar: 'JavaScript', en: 'JavaScript' }, { ar: 'تحسين SEO', en: 'SEO optimization' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. أنهي واحدة __مش__ فايدة لـ HTML الدلالية؟', en: '2. Which is NOT a benefit of semantic HTML?' }, options: [{ ar: 'قارئ الشاشة يفهم البنية', en: 'Screen readers understand the structure' }, { ar: 'محركات البحث تفهم المحتوى', en: 'Search engines understand the content' }, { ar: 'الصفحة تبقى أسرع بالضرورة', en: 'The page necessarily gets faster' }, { ar: 'توصيل المعلومة لذوي الإعاقة البصرية', en: 'Reaching visually impaired users' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. سبب الحاجة للتصميم المتجاوب؟', en: '3. Why is responsive design needed?' }, options: [{ ar: 'لتحسين سرعة عرض الصفحات على الإنترنت', en: 'To improve how fast pages display online' }, { ar: 'لأن المواقع بتتصفح من أجهزة مختلفة', en: 'Because sites are viewed on various devices' }, { ar: 'لرفع ترتيب الموقع في نتايج البحث', en: 'To raise the site’s place in search results' }, { ar: 'لإضافة سلوك وتفاعل لصفحات الموقع', en: 'To add behavior and interactivity to pages' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. HTML بيحدّد بنية الصفحة.', en: '4. HTML defines the structure of a page.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. CSS بيضيف السلوك للصفحة.', en: '5. CSS adds behavior to a page.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. استخدام إطار عمل بيغني عن كتابة كل الكود من الصفر.', en: '6. A framework removes the need to write all code from scratch.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. اذكر التلات تقنيات ودور كل واحدة بالتشبيه.', en: '7. Name the three technologies and each role, with the analogy.' },
          points: [{ ar: 'HTML بنية — هيكل المبنى.', en: 'HTML structure — the frame.' }, { ar: 'CSS مظهر — الديكور.', en: 'CSS appearance — the decoration.' }, { ar: 'JavaScript سلوك — الكهربا والسباكة.', en: 'JavaScript behavior — electricity and plumbing.' }],
          model: { ar: 'HTML بيحدّد بنية الصفحة (عناوين، فقرات، صور، روابط) زي هيكل المبنى. CSS بيحدّد المظهر (ألوان، تخطيط، خطوط) زي الديكور الداخلي والخارجي. JavaScript بيضيف السلوك والتفاعل زي الكهربا والسباكة في المبنى.', en: 'HTML defines structure (headings, paragraphs, images, links) like a building’s frame. CSS specifies appearance (colors, layout, fonts) like its interior and exterior. JavaScript adds behavior and interactivity like the electrical and plumbing systems.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. يعني إيه HTML الدلالية؟ اذكر فايدتين.', en: '8. What is semantic HTML? Give two benefits.' },
          points: [{ ar: 'عناصر بتوضّح وظيفة أجزاء الصفحة.', en: 'Tags indicating each part’s meaning.' }, { ar: 'إمكانية الوصول + SEO.', en: 'Accessibility + SEO.' }],
          model: { ar: 'HTML الدلالية = استخدام عناصر بتوضّح وظيفة أجزاء الصفحة، زي ‎<header>‎ و‎<nav>‎ و‎<main>‎ و‎<footer>‎. فوايدها: تحسين إمكانية الوصول (برامج قراءة الشاشة تفهم البنية) ومساعدة SEO (محركات البحث تفهم بنية المحتوى، من غير ضمان ترتيب أعلى).', en: 'Semantic HTML = describing each part of a page with tags that indicate its meaning, like <header>, <nav>, <main> and <footer>. Benefits: better accessibility (screen readers understand the structure) and better SEO (search engines understand the content).' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. يعني إيه التصميم المتجاوب؟ وليه «نهج الأولوية للجوال» بقت منتشرة؟', en: '9. What is responsive design, and why has mobile-first spread?' },
          points: [{ ar: 'التخطيط بيتضبط تلقائيًا حسب حجم الشاشة.', en: 'The layout adjusts automatically to screen size.' }, { ar: 'لأن التصفح من الموبايل كتير.', en: 'Because so much browsing is on phones.' }],
          model: { ar: 'التصميم المتجاوب = التخطيط بيتضبط تلقائيًا حسب حجم الشاشة (كمبيوتر، تابلت، موبايل) بصفحة واحدة. ونهج الأولوية للجوال انتشرت لأن المواقع بقت بتتصفح من الموبايل كتير، فبنبدأ التصميم من الشاشات الصغيرة.', en: 'Responsive design = the layout adjusts automatically to the screen size (PC, tablet, phone) with one page. Mobile-first spread because sites are so often browsed on phones, so design starts from small screens.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. إيه فايدة إطار العمل؟ اذكر إطار واحد وميزته.', en: '10. What is a framework for? Name one and its feature.' },
          points: [{ ar: 'وظائف جاهزة لتطوير أكفأ.', en: 'Ready-made functions for efficient development.' }, { ar: 'إطار + ميزة (React / Vue / Next.js).', en: 'A framework + feature (React / Vue / Next.js).' }],
          model: { ar: 'إطار العمل بيوفّر وظائف ومكوّنات جاهزة فالمطوّر مايكتبش كل الكود من الصفر ويطوّر بكفاءة. مثال: React — مكتبة JavaScript لبناء واجهات المستخدم من مكوّنات قابلة لإعادة الاستخدام.', en: 'A framework provides ready-made functions and components so developers do not write all code from scratch and work efficiently. Example: React by Meta — efficiently updates only part of the screen and suits large web apps.' } } },
      ],
    },
  ],
});
