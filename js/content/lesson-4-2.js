/* =========================================================
 * content/lesson-4-2.js — تصميم المعلومات وتجربة المستخدم للمواقع
 * Pure data. Sources: textbook 4-2 (EN p.81–87) + memo (Arabic wording,
 * deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('4-2', {
  id: '4-2',
  color: '#10b981',
  cover: 'img/md-l2-cover.webp',
  title: { ar: 'تصميم المعلومات وتجربة المستخدم للمواقع', en: 'Information Design and User Experience for Websites' },
  guiding: { ar: 'إزاي المصمّمين بيخطّطوا الموقع حوالين مستخدميه، وإيه المبادئ اللي بتخلّي الصفحة واضحة وسهلة الاستخدام؟', en: 'How do designers plan a website around its users, and what principles make a page clear and easy to use?' },
  hook: {
    ar: 'موقع منطقي جدًا لمصمّمه ممكن __يلخبط زوّاره__. عشان كده التصميم الكويس __بيبدأ من المستخدم مش من المصمّم__: نتخيّل الأول مستخدم حقيقي (**شخصية المستخدم**)، ونرسم المعلومات هتروح فين قبل أي ألوان (**الإطار السلكي**)، ونمشي على أربع مبادئ بسيطة — **تباين، تكرار، محاذاة، تقارب** — فالصفحة تبقى واضحة من أول نظرة. العقلية دي اسمها **التصميم المتمحور حول المستخدم**.',
    en: 'A website that makes sense to its designer can still __confuse its visitors__. So good design __starts from the user, not the creator__: first picture a real user (a **persona**), sketch where information goes before any colors (a **wireframe**), and follow four simple principles — **contrast, repetition, alignment, proximity** — so the page is clear at a glance. This mindset is **user-centered design**.',
  },
  keyFact: { ar: 'التصميم الكويس بيبدأ من المستخدم: __شخصية المستخدم__ بتوضّح هو مين، و__الإطار السلكي__ بيثبّت إيه يتحط فين، و__مبادئ CRAP__ بتخلّيها واضحة، و__التصميم المتمحور حول المستخدم__ بيخلّي كل قرار في صف المستخدم.', en: 'Good design starts from the user: a __persona__ clarifies who they are, a __wireframe__ fixes what goes where, the __CRAP principles__ make it clear, and __user-centered design__ keeps every choice on the user’s side.' },
  concepts: ['persona', 'wireframe', 'contrast', 'repetition', 'alignment', 'proximity', 'user-centered design (UCD)', 'usability', 'accessibility'],
  objectives: [
    { ar: 'أشرح إزاي شخصية المستخدم والإطار السلكي بيستخدموا لتخطيط الموقع قبل تصميم شكله.', en: 'Explain how personas and wireframes are used to plan a website before designing its appearance.' },
    { ar: 'أطبّق مبادئ التصميم الأربعة (التباين، التكرار، المحاذاة، التقارب) وأشرح فكرة التصميم المتمحور حول المستخدم.', en: 'Apply the four principles of design (contrast, repetition, alignment, proximity) and explain user-centered design.' },
  ],

  stations: [
    /* ───────────── 1 · persona + wireframe ───────────── */
    {
      id: 'plan', kind: 'learn',
      title: { ar: 'شخصية المستخدم والإطار السلكي', en: 'Persona and wireframe' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'هتصمّم موقع لعيادة… تبدأ بإيه؟', en: 'You are designing a clinic website… where do you start?' },
            options: [
              { emoji: '🎨', text: { ar: 'أختار الألوان والخطوط', en: 'Choose colors and fonts' } },
              { emoji: '🙋', text: { ar: 'أفهم مين هيستخدمه وعايز إيه', en: 'Understand who will use it and what they need' } },
              { emoji: '🖼️', text: { ar: 'أدوّر على صور حلوة', en: 'Look for nice pictures' } },
            ],
            after: { ar: 'تعالى نشوف المصمّمين المحترفين بيبدأوا منين 👇', en: 'Let’s see where professional designers start 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: نبدأ من المستخدم', en: '🎞️ Animation: start from the user' },
          enTitle: 'Persona and wireframe',
          terms: ['persona', 'wireframe', 'stakeholders'],
          visual: { anim: 'designMovie', props: { scenes: [0, 3] } },
          beats: [
            { ar: '🤔 موقع واضح جدًا لمصمّمه… بس الزوّار تايهين فيه! عشان كده التصميم الكويس __بيبدأ من المستخدم، مش من المصمّم__.', en: '🤔 A site that is crystal clear to its designer… yet visitors get lost! So good design __starts from the user, not the creator__.' },
            { ar: '🪪 **شخصية المستخدم (Persona):** صورة لمستخدم نموذجي للموقع __متصاغة كشخص محدّد__ — __العمر، المهنة، الهدف، التحديات__. مثال: موظف في التلاتينات، عايز __يقارن منتجات من الموبايل في المواصلات__ ويوصل للمعلومة __في وقت قصير__. فايدتها: نفكّر تحديدًا في «__المستخدم ده محتاج إيه__» فالتصميم __مايتوهش__.', en: '🪪 **Persona:** a typical user of the site __pictured as a concrete person__ — __age, occupation, purpose, challenges__. e.g. an office worker in his 30s who wants to __compare products on his phone while commuting__ and get information __quickly__. Benefit: we think specifically about "__what this user needs__", so the design __does not drift__.' },
            { ar: '🔲 **الإطار السلكي (Wireframe):** مخطّط تقريبي لتخطيط الصفحة __من غير ألوان ولا زخرفة__ — بيتعمل عشان __يحدّد مكان المعلومات وأولويتها__. صناديق رمادية بس… وبعدين بيكبر لتصميم نهائي.', en: '🔲 **Wireframe:** a rough blueprint of the page layout __with no color or decoration__ — made to __fix the placement and priority of information__. Just grey boxes… later it grows into a finished design.' },
            { ar: '💬 **ليه الإطار السلكي قبل الألوان؟** لو بدأنا بالألوان والخطوط النقاش بيروح لـ__الذوق الشخصي__ («أنا بحب الأزرق!») ومابيخلصش. لكن لو ثبّتنا __مكان المعلومات وأولويتها__ الأول، النقاش بيبقى عن __احتياج المستخدم__ — فـ__أصحاب المصلحة يتفقوا أسهل__. ⚠️ الإطار السلكي __مش__ تصميم نهائي ومافيهوش ألوان.', en: '💬 **Why a wireframe before colors?** Starting with colors and fonts pushes the discussion to __personal taste__ ("I like blue!") and it never ends. Fixing __placement and priority__ first keeps it on __the user’s needs__ — so __stakeholders agree more easily__. ⚠️ A wireframe is __not__ a final design and has no colors.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'تتحط في شخصية المستخدم ولا لأ؟', en: 'Does it belong in a persona?' },
            groups: [{ icon: 'user', label: { ar: 'تتحط في الشخصية', en: 'In the persona' } }, { icon: 'x', label: { ar: 'مش من الشخصية', en: 'Not persona info' } }],
            items: [
              { text: { ar: 'العمر والمهنة', en: 'Age and occupation' }, group: 0 },
              { text: { ar: 'هدفه من الموقع', en: 'Purpose for visiting' }, group: 0 },
              { text: { ar: 'أداء خادم الموقع', en: 'Server performance' }, group: 1 },
              { text: { ar: 'التحديات اللي بتقابله', en: 'Challenges they face' }, group: 0 },
              { text: { ar: 'لون زرار الشراء', en: 'The buy-button color' }, group: 1 },
            ],
            explain: { ar: 'الشخصية = __عمر، مهنة، هدف، تحديات__ — مش أداء خادم ولا ألوان.', en: 'A persona = __age, occupation, purpose, challenges__ — not server performance or colors.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'الإطار السلكي تصميم نهائي فيه الألوان والزخرفة.', en: 'A wireframe is a final design with colors and decoration.' }, answer: false, explain: { ar: '__من غير لون__ — لمكان المعلومات وأولويتها.', en: '__No color__ — for placement and priority.' } },
            { text: { ar: 'شخصية المستخدم بتمنع التصميم إنه يتوه عن احتياج المستخدم.', en: 'A persona keeps the design from drifting away from the user’s needs.' }, answer: true },
            { text: { ar: 'تثبيت مكان المعلومات الأول بيسهّل اتفاق أصحاب المصلحة.', en: 'Fixing placement first helps stakeholders agree.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**التصميم بيبدأ من المستخدم** مش من المصمّم.', en: '**Design starts from the user**, not the creator.' },
            { ar: '**شخصية المستخدم:** مستخدم نموذجي كشخص محدّد (عمر، مهنة، هدف، تحديات) ← التصميم مايتوهش.', en: '**Persona:** a typical user as a concrete person (age, occupation, purpose, challenges) → the design does not drift.' },
            { ar: '**الإطار السلكي:** مخطّط من غير لون لمكان المعلومات وأولويتها ← النقاش على البنية وأصحاب المصلحة يتفقوا.', en: '**Wireframe:** a colorless blueprint for placement and priority → discussion stays on structure and stakeholders agree.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · CRAP + UCD ───────────── */
    {
      id: 'crap', kind: 'learn',
      title: { ar: 'مبادئ التصميم الأربعة (CRAP) والتصميم المتمحور حول المستخدم', en: 'The four design principles (CRAP) and UCD' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: CRAP بيرتّب الصفحة قدام عينك', en: '🎞️ Animation: CRAP tidies the page before your eyes' },
          enTitle: 'CRAP and user-centered design',
          terms: ['contrast', 'repetition', 'alignment', 'proximity', 'user-centered design (UCD)', 'usability', 'accessibility'],
          visual: { anim: 'designMovie', props: { scenes: [4, 9] } },
          beats: [
            { ar: '**① التباين (Contrast):** __نوضّح أولوية المعلومات ونبرز أهم العناصر فورًا__ — عناوين __كبيرة وغامقة__ تتميّز عن النص، و__لون مميّز__ لزرار مهم زي «اشترِ».', en: '**① Contrast:** __make priority clear and highlight the most important elements immediately__ — __large, bold__ headings that stand out from body text, and an __accent color__ for an important button like "Buy".' },
            { ar: '**② التكرار (Repetition):** __نكرّر خصائص معيّنة__ فالتصميم كله يبقى __متّسق__ والمستخدم يتنقّل __من غير ما يتوه__ — نفس لون وحجم وخط العناوين في كل صفحة، ونفس شكل أيقونات النقاط.', en: '**② Repetition:** __repeat specific characteristics__ so the whole design is __consistent__ and users navigate __without getting lost__ — the same heading color, size and font on every page, matching bullet icons.' },
            { ar: '**③ المحاذاة (Alignment):** __نحاذي كل عنصر على خط أساس مشترك__ فالشاشة كلها يبقى ليها __نظام__ — حواف النص والصور على خط واحد بالظبط، وقاعدة ثابتة (وسط ولا جنب).', en: '**③ Alignment:** __align every element to a common baseline__, giving the whole screen __order__ — text and image edges on exactly one line, and one consistent rule (centered or side).' },
            { ar: '**④ التقارب (Proximity):** __نحط المعلومات المرتبطة قريبة من بعض__ فتتشاف __كمجموعة واحدة__ من أول نظرة — صورة المنتج واسمه وسعره مع بعض، و__مسافات مناسبة__ بين المجموعات.', en: '**④ Proximity:** __place related information close together__ so it is seen __as one group__ at a glance — product image, name and price together, with __suitable spacing__ between groups.' },
            { ar: '🧭 **التصميم المتمحور حول المستخدم (UCD):** نصمّم المواقع والخدمات __من منظور المستخدم مش راحة المصمّم__. بيبدأ من «__المستخدم محتاج إيه__» و«__هيستخدمه في أنهي موقف__»، و__شخصية المستخدم__ طريقة من طرق تطبيقه. أهدافه: تحسين __قابلية الاستخدام__ و__إمكانية الوصول__ لفئات واسعة.', en: '🧭 **User-Centered Design (UCD):** design sites and services __from the user’s perspective, not the creator’s convenience__. It starts from "__what the user needs__" and "__in what situation__", and a __persona__ is one way to practice it. Goals: better __usability__ and __accessibility__ for a wide range of people.' },
            { ar: '📌 **الخلاصة:** شخصية (__مين__) ← إطار سلكي (__فين__، من غير لون) ← CRAP (__وضّحها__) ← UCD (__قرّر للمستخدم__). التباين __يبرز__ · التكرار __يوحّد__ · المحاذاة __تنظّم__ · التقارب __يجمّع__.', en: '📌 **The point:** persona (__who__) → wireframe (__where__, no color) → CRAP (__make it clear__) → UCD (__decide for the user__). Contrast __highlights__ · repetition __unifies__ · alignment __orders__ · proximity __groups__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'عناوين كبيرة غامقة ← __تباين__ · تجميع الاسم والسعر والصورة ← __تقارب__ · محاذاة الحواف ← __محاذاة__ · توحيد خط العناوين في كل الصفحات ← __تكرار__. و«التشفير» __مش__ من مبادئ CRAP.', en: 'Large bold headings → __contrast__ · grouping name, price and image → __proximity__ · aligning edges → __alignment__ · same heading font on all pages → __repetition__. "Encryption" is __not__ a CRAP principle.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — كارت منتج واحد', en: 'Deep dive — one product card' }, text: { ar: 'السعر بخط كبير غامق = __تباين__ · نفس شكل كل الكروت = __تكرار__ · حواف الصور والنصوص على خط واحد = __محاذاة__ · الصورة والاسم والسعر لازقين والفراغ بيفصلهم عن الكارت اللي بعده = __تقارب__.', en: 'Price in large bold = __contrast__ · every card the same style = __repetition__ · image and text edges on one line = __alignment__ · image, name and price together with space before the next card = __proximity__.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل تحسين بمبدأه:', en: 'Match each improvement with its principle:' },
            left: [
              { ar: 'توحيد خط ولون العناوين في كل الصفحات', en: 'Same heading font and color on every page' },
              { ar: 'تجميع اسم المنتج وسعره وصورته', en: 'Grouping product name, price and photo' },
              { ar: 'عناوين كبيرة وغامقة عن النص', en: 'Large bold headings over body text' },
              { ar: 'محاذاة الحواف اليمين للنص والصور', en: 'Aligning text and image edges' },
            ],
            right: [{ ar: 'التباين', en: 'Contrast' }, { ar: 'التكرار', en: 'Repetition' }, { ar: 'المحاذاة', en: 'Alignment' }, { ar: 'التقارب', en: 'Proximity' }],
            answer: [1, 3, 0, 2],
            explain: { ar: 'توحيد ← تكرار · تجميع ← تقارب · إبراز ← تباين · حواف ← محاذاة.', en: 'Unify → repetition · group → proximity · highlight → contrast · edges → alignment.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'إيه الوصف الأنسب للتصميم المتمحور حول المستخدم؟', en: 'Best description of user-centered design?' },
            options: [
              { ar: 'نبدأ التصميم من اللي المستخدم محتاجه وموقف استخدامه', en: 'Start the design from what users need and their situation' },
              { ar: 'نقدّم التصميم اللي المطوّر شايفه أسهل في الشغل', en: 'Put first the design the developer finds easiest to build' },
              { ar: 'ندّي أكبر أولوية للشكل والزخرفة في كل الصفحات', en: 'Give the highest priority to looks and decoration everywhere' },
              { ar: 'نستخدم أحدث التقنيات على قد ما نقدر في الموقع', en: 'Use as many of the newest technologies as possible' },
            ],
            answer: 0,
            explain: { ar: 'UCD = __منظور المستخدم__؛ أهدافه قابلية الاستخدام وإمكانية الوصول.', en: 'UCD = __the user’s perspective__; goals: usability and accessibility.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**CRAP:** التباين يبرز الأولوية · التكرار يوحّد · المحاذاة تنظّم · التقارب يجمّع المرتبط.', en: '**CRAP:** contrast highlights priority · repetition unifies · alignment orders · proximity groups related items.' },
            { ar: '**UCD:** من منظور المستخدم مش راحة المصمّم · يبدأ من احتياجه وموقفه · الشخصية طريقة لتطبيقه.', en: '**UCD:** from the user’s perspective, not the creator’s convenience · starts from needs and situation · personas practice it.' },
            { ar: '**أهداف UCD:** قابلية الاستخدام + إمكانية الوصول. والترتيب: شخصية ← إطار سلكي ← CRAP ← UCD.', en: '**UCD goals:** usability + accessibility. Order: persona → wireframe → CRAP → UCD.' },
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
            { text: { ar: 'A) شخصية المستخدم صورة لمستخدم نموذجي للموقع متصاغة كشخص محدّد.', en: 'A) A persona is a typical user of the website set up as a concrete person.' }, answer: true },
            { text: { ar: 'B) الإطار السلكي تصميم نهائي فيه اللون والزخرفة.', en: 'B) A wireframe is a final design including color and decoration.' }, answer: false },
            { text: { ar: 'C) «التقارب» في مبادئ التصميم معناه تجميع المعلومات المرتبطة قريبة.', en: 'C) "Proximity" means grouping related information close together.' }, answer: true },
            { text: { ar: 'D) التصميم المتمحور حول المستخدم بيقدّم راحة المصمّم.', en: 'D) User-centered design prioritizes the creator’s convenience.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) تعريف صحيح للشخصية ← **✓**.', en: 'A) Correct definition of a persona → **✓**.' },
            { ar: 'B) الإطار السلكي مخطّط لمكان المعلومات وأولويتها __من غير لون__ ← **✗**.', en: 'B) A wireframe fixes placement and priority __without color__ → **✗**.' },
            { ar: 'C) تعريف صحيح للتقارب ← **✓**.', en: 'C) Correct definition of proximity → **✓**.' },
            { ar: 'D) UCD __من منظور المستخدم__ ← **✗**.', en: 'D) UCD is __from the user’s perspective__ → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–d) بالمبدأ (A–D):', en: '(2) Match each description (a–d) with the principle (A–D):' },
            left: [
              { ar: 'a) إبراز المعلومات المهمة وبيان الأولوية بصريًا', en: 'a) Highlight important information and show priority' },
              { ar: 'b) تكرار نفس النمط لمظهر موحّد', en: 'b) Repeat the same style for a unified look' },
              { ar: 'c) محاذاة مواضع العناصر لمظهر منظّم', en: 'c) Align element positions for an organized look' },
              { ar: 'd) تجميع المعلومات المرتبطة قريبة', en: 'd) Group related information close together' },
            ],
            right: [{ ar: 'A التباين', en: 'A Contrast' }, { ar: 'B التكرار', en: 'B Repetition' }, { ar: 'C المحاذاة', en: 'C Alignment' }, { ar: 'D التقارب', en: 'D Proximity' }],
            answer: [0, 1, 2, 3] },
          solution: [
            { ar: 'a: الإبراز = **تباين** ← A.', en: 'a: highlighting = **contrast** → A.' },
            { ar: 'b: المظهر الموحّد = **تكرار** ← B.', en: 'b: unified look = **repetition** → B.' },
            { ar: 'c: ترتيب المواضع = **محاذاة** ← C.', en: 'c: aligning positions = **alignment** → C.' },
            { ar: 'd: التجميع = **تقارب** ← D.', en: 'd: grouping = **proximity** → D.' },
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
            { q: { ar: '1. صورة لمستخدم نموذجي للموقع متصاغة كشخص محدّد؟', en: '1. A typical user of the site set up as a concrete person?' }, a: { ar: 'شخصية المستخدم (Persona)', en: 'Persona' } },
            { q: { ar: '2. مخطّط بيوضّح مكان المعلومات وأولويتها في الصفحة؟', en: '2. A blueprint showing placement and priority of information?' }, a: { ar: 'الإطار السلكي (Wireframe)', en: 'Wireframe' } },
            { q: { ar: '3. اسم مبادئ التصميم الأربعة بحروفها الإنجليزي؟', en: '3. The four design principles by their English initials?' }, a: { ar: 'CRAP', en: 'CRAP' } },
            { q: { ar: '4. منهج تصميم المواقع من منظور المستخدم؟ واختصاره؟', en: '4. The approach designing from the user’s perspective? Its abbreviation?' }, a: { ar: 'التصميم المتمحور حول المستخدم — UCD', en: 'User-centered design — UCD' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار المعلومة اللي __مش__ مناسبة لشخصية المستخدم:', en: 'Choose the information that is **NOT** appropriate for a persona:' },
            options: [
              { ar: 'عمر المستخدم ومهنته', en: 'The user’s age and occupation' },
              { ar: 'هدف المستخدم من استخدام الموقع', en: 'The user’s purpose for using the site' },
              { ar: 'أداء خادم الموقع وسرعته', en: 'The performance of the website’s server' },
              { ar: 'التحديات اللي المستخدم بيواجهها', en: 'The challenges the user faces' },
            ],
            fixedOrder: true,
            answer: 2,
            explain: { ar: 'أداء الخادم مش من صفات المستخدم.', en: 'Server performance is not about the user.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'classify', prompt: { ar: 'كل تحسين (a–d) بيطبّق أنهي مبدأ؟', en: 'Which principle does each improvement (a–d) apply?' },
            groups: [{ icon: 'star', label: { ar: 'A التباين', en: 'A Contrast' } }, { icon: 'refresh', label: { ar: 'B التكرار', en: 'B Repetition' } }, { icon: 'layers', label: { ar: 'C المحاذاة', en: 'C Alignment' } }, { icon: 'users', label: { ar: 'D التقارب', en: 'D Proximity' } }],
            items: [
              { text: { ar: 'a) عناوين كبيرة وغامقة تتميّز عن النص', en: 'a) Large bold headings distinct from body text' }, group: 0 },
              { text: { ar: 'b) تجميع اسم المنتج وسعره وصورته قريب', en: 'b) Grouping product name, price and photo' }, group: 3 },
              { text: { ar: 'c) محاذاة حواف النص والصور', en: 'c) Aligning the edges of text and images' }, group: 2 },
              { text: { ar: 'd) توحيد خط ولون العناوين في كل الصفحات', en: 'd) Same heading font and color on all pages' }, group: 1 },
            ],
            explain: { ar: 'a→A · b→D · c→C · d→B.', en: 'a→A · b→D · c→C · d→B.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(c):', en: 'Read and fill blanks (a)–(c):' },
            text: { ar: 'وإنت بتصمّم موقع، مهم تبصّ عليه من منظور المستخدم. الأول اعمل {0}، اللي بنصيغ فيها مستخدم نموذجي كشخص محدّد ونوضّح «المستخدم ده محتاج إيه». بعدين اعمل {1}، مخطّط لمكان المعلومات وأولويتها. وفي التصميم، عشان الوضوح، خلّي في بالك {2} — التباين والتكرار والمحاذاة والتقارب.', en: 'When designing a website, view it from the user’s perspective. First create a {0}, a typical user set up as a concrete person, clarifying "what this user needs". Next create a {1}, a blueprint for placement and priority. In design, keep the {2} — contrast, repetition, alignment and proximity — in mind.' },
            bank: [{ ar: 'شخصية المستخدم', en: 'persona' }, { ar: 'الإطار السلكي', en: 'wireframe' }, { ar: 'مبادئ CRAP', en: 'CRAP principles' }, { ar: 'اختبار A/B', en: 'A/B test' }],
            answer: [0, 1, 2],
            explain: { ar: '(a) شخصية المستخدم (b) الإطار السلكي (c) مبادئ CRAP.', en: '(a) persona (b) wireframe (c) CRAP principles.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي __مش__ من مبادئ التصميم الأربعة (CRAP):', en: 'Choose the one **NOT** among the four CRAP principles:' },
            options: [{ ar: 'A التباين', en: 'A Contrast' }, { ar: 'B التشفير', en: 'B Encryption' }, { ar: 'C المحاذاة', en: 'C Alignment' }, { ar: 'D التقارب', en: 'D Proximity' }],
            fixedOrder: true,
            answer: 1,
            explain: { ar: 'التشفير من الأمن السيبراني مش من التصميم.', en: 'Encryption belongs to cybersecurity, not design.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب لمفهوم التصميم المتمحور حول المستخدم:', en: 'Choose the best description of user-centered design:' },
            options: [
              { ar: 'نقدّم التصميم اللي المطوّر شايفه سهل', en: 'Prioritize what the developer finds easy' },
              { ar: 'ندّي أكبر أهمية للتصميم البصري', en: 'Give top importance to visual design' },
              { ar: 'نبدأ التصميم من اللي المستخدم محتاجه', en: 'Start the design from what the user needs' },
              { ar: 'نستخدم أحدث التقنيات على قد ما نقدر', en: 'Use the latest technologies as much as possible' },
            ],
            answer: 2,
            explain: { ar: 'UCD = نبدأ من __احتياج المستخدم__.', en: 'UCD = start from __the user’s need__.' } },
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
          { front: { ar: 'شخصية المستخدم', en: 'Persona' }, back: { ar: 'مستخدم نموذجي كشخص محدّد: عمر، مهنة، هدف، تحديات.', en: 'A typical user as a concrete person: age, occupation, purpose, challenges.' } },
          { front: { ar: 'الإطار السلكي', en: 'Wireframe' }, back: { ar: 'مخطّط تخطيط من غير لون أو زخرفة لمكان المعلومات وأولويتها.', en: 'A colorless layout blueprint for placement and priority.' } },
          { front: { ar: 'التباين', en: 'Contrast' }, back: { ar: 'يبرز الأهم ويوضّح الأولوية (عنوان كبير غامق، زرار ملوّن).', en: 'Highlights the most important (bold heading, accent button).' } },
          { front: { ar: 'التكرار', en: 'Repetition' }, back: { ar: 'نفس الخصائص في كل مكان ← تصميم متّسق.', en: 'The same features everywhere → a consistent design.' } },
          { front: { ar: 'المحاذاة', en: 'Alignment' }, back: { ar: 'كل عنصر على خط أساس مشترك ← نظام.', en: 'Every element on a common baseline → order.' } },
          { front: { ar: 'التقارب', en: 'Proximity' }, back: { ar: 'المرتبط قريب من بعضه ← مجموعة واحدة.', en: 'Related items close together → one group.' } },
          { front: { ar: 'التصميم المتمحور حول المستخدم (UCD)', en: 'User-centered design (UCD)' }, back: { ar: 'التصميم من منظور المستخدم مش راحة المصمّم.', en: 'Designing from the user’s perspective, not the creator’s.' } },
          { front: { ar: 'قابلية الاستخدام / إمكانية الوصول', en: 'Usability / accessibility' }, back: { ar: 'سهولة الاستخدام / إنه ينفع لفئات واسعة.', en: 'Ease of use / usable by a wide range of people.' } },
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
            prompt: { ar: 'اشرح ليه المصمّم بيعمل شخصية مستخدم وإطار سلكي قبل ما يختار الألوان والخطوط. (أشِر إلى: احتياج المستخدم، والاتفاق مع أصحاب المصلحة)', en: 'Explain why a designer creates a persona and a wireframe before choosing colors and fonts. (Refer to: the user’s needs and agreement with stakeholders)' },
            points: [
              { ar: 'الشخصية بتوضّح المستخدم محتاج إيه فالتصميم مايتوهش.', en: 'The persona clarifies what the user needs, so the design does not drift.' },
              { ar: 'الإطار السلكي بيثبّت المكان والأولوية من غير لون.', en: 'The wireframe fixes placement and priority without color.' },
              { ar: 'الألوان الأول ← نقاش أذواق؛ البنية الأول ← اتفاق أصحاب المصلحة.', en: 'Colors first → taste debates; structure first → stakeholders agree.' },
            ],
            model: { ar: 'شخصية المستخدم بتخلّي الفريق يتخيّل مستخدم حقيقي (عمره ومهنته وهدفه وتحدياته)، فيفكّر تحديدًا في اللي المستخدم ده محتاجه بدل ذوق المصمّم، والتصميم مايتوهش. وبعدها الإطار السلكي بيحدّد إيه يتحط فين وأولوية كل معلومة من غير ألوان ولا زخرفة. لو بدأنا بالألوان والخطوط، النقاش هيبقى أذواق شخصية («أنا بحب الأزرق») ومش هيخلص؛ لكن لما نثبّت مكان المعلومات وأولويتها الأول، النقاش بيبقى عن احتياج المستخدم، وده أسهل يتفق عليه أصحاب المصلحة.', en: 'A persona makes the team picture a real user (age, job, purpose, challenges), so they think about what that user needs instead of the designer’s taste, and the design does not drift. Then the wireframe fixes what goes where and the priority of each item, without color or decoration. Starting with colors and fonts turns the discussion into personal taste ("I like blue") that never ends; fixing placement and priority first keeps it on the user’s needs, which stakeholders can agree on more easily.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — موقع العيادة المجتمعية', en: 'Think as an engineer — community clinic site' },
            prompt: { ar: 'عيادة مجتمعية عايزة موقع بسيط المرضى يلاقوا فيه مواعيد العمل والخدمات والاتجاهات. ١) اسأل 8–10: «لو فتحت موقع عيادة، أول حاجة تدوّر عليها إيه؟» وسجّل في جدول تكرار. ٢) قسّم الإجابات لأنواع مستخدمين، وضيف مستخدم مش معتاد (مريض كبير في السن نظره ضعيف، أو حد من غير إنترنت في البيت بيستخدم كمبيوتر المكتبة). ٣) رتّب أولوية الأربع كتل في الصفحة الرئيسية من بياناتك، واختار مبدأ CRAP واحد تطبّقه للمستخدم اللي ضفته.', en: 'A community clinic wants a simple site with hours, services and directions. 1) Ask 8–10 people what they would look for first; tally it. 2) Group answers into user types, adding an atypical user (an elderly patient with low vision, or someone using a library computer). 3) Rank the four home-page blocks from your data, and apply one CRAP principle for the user you added.' },
            points: [
              { ar: 'جدول تكرار + أنواع مستخدمين.', en: 'A tally table + user types.' },
              { ar: 'ترتيب الكتل من البيانات مش الذوق.', en: 'Block order from data, not taste.' },
              { ar: 'مبدأ CRAP مناسب للمستخدم المضاف (مثلًا تباين للنظر الضعيف).', en: 'A fitting CRAP principle for the added user (e.g. contrast for low vision).' },
            ],
            model: { ar: '١) (مثال) 5 قالوا مواعيد العمل، 3 الاتجاهات، 2 الخدمات. ٢) أنواع: مريض مستعجل عايز المواعيد، زائر جديد عايز العنوان، مريض كبير في السن نظره ضعيف محتاج خط كبير وألوان واضحة. ٣) الترتيب من البيانات: مواعيد العمل فوق، بعدها الاتجاهات، بعدها الخدمات، وفي الآخر التواصل. للمريض اللي نظره ضعيف أطبّق __التباين__: مواعيد العمل بخط كبير جدًا وغامق على خلفية فاتحة، ورقم التليفون بلون مميّز.', en: '1) (Example) 5 said opening hours, 3 directions, 2 services. 2) Types: a hurried patient wanting hours, a new visitor wanting the address, an elderly low-vision patient needing large text and clear colors. 3) Order from the data: hours on top, then directions, then services, then contact. For the low-vision patient I apply __contrast__: opening hours in very large bold text on a light background, and the phone number in an accent color.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مدرسة عايزة تعيد تصميم صفحة النتايج الزحمة عشان أولياء الأمور يلاقوا درجات أولادهم بسرعة. اذكر الشخصية اللي هتحدّدها، وقرار واحد في الإطار السلكي، ومبدأ CRAP واحد تطبّقه، وكل واحد بيحسّن إيه.', en: 'A school redesigns its cluttered results page so parents find grades quickly. Name the persona, one wireframe decision and one CRAP principle, and what each improves.' },
            points: [{ ar: 'شخصية: ولي أمر (عمر، شغل، هدف، تحدي).', en: 'Persona: a parent (age, job, goal, challenge).' }, { ar: 'قرار إطار سلكي: مربع البحث بالاسم فوق.', en: 'Wireframe decision: name search at the top.' }, { ar: 'مبدأ: تقارب/تباين + أثره.', en: 'Principle: proximity/contrast + effect.' }],
            model: { ar: 'الشخصية: أب في الأربعينات شغّال طول اليوم، بيفتح الموقع من الموبايل بالليل وعايز درجة ابنه في أقل وقت. قرار الإطار السلكي: مربع «اكتب كود الطالب» أول حاجة فوق، والنتيجة تحته مباشرة — ده بيوصّله للمعلومة أسرع. مبدأ التقارب: اسم المادة والدرجة والتقدير جنب بعض في نفس الصف، وفراغ بين المواد — فيقرا كل مادة كمجموعة واحدة من غير ما يتوه.', en: 'Persona: a father in his 40s who works all day, opens the site on his phone at night and wants his son’s grade fast. Wireframe decision: the "enter student code" box first at the top with the result right below — getting him to the information faster. Proximity: subject, mark and grade side by side in one row with space between subjects — so he reads each subject as one group without getting lost.' } },
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
            prompt: { ar: 'ليه نقرّر مكان المعلومات (الإطار السلكي) قبل ما نختار الألوان والخطوط؟ وأنهي مبدأ بيجمّع العناصر المرتبطة، وأنهي بيبرز أهم عنصر؟', en: 'Why decide where information goes (wireframe) before colors and fonts? Which principle groups related items, and which makes the most important stand out?' },
            points: [{ ar: 'الإطار الأول ← النقاش على البنية مش الذوق.', en: 'Wireframe first → discussion on structure, not taste.' }, { ar: 'يجمّع = التقارب · يبرز = التباين.', en: 'Groups = proximity · highlights = contrast.' }],
            model: { ar: 'لأن الألوان بتفتح نقاش أذواق، لكن مكان المعلومات وأولويتها مرتبطين باحتياج المستخدم فسهل نتفق عليهم. المبدأ اللي بيجمّع المرتبط = التقارب، واللي بيبرز الأهم = التباين.', en: 'Because colors open taste debates, while placement and priority depend on the user’s needs and are easy to agree on. The principle that groups related items is proximity; the one that highlights the most important is contrast.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: في موقع بيلخبطك، أنهي مبدأ CRAP شكله مكسور أكتر وليه؟ تحدّى: العيادة تقدر تموّل تحسين واحد بس لإمكانية الوصول السنة دي — للمستخدم اللي نظره ضعيف أو من غير إنترنت، اختار مبدأ CRAP تطبّقه، وقول هتستغنى عن إيه (زخرفة أو ميزة) عشانه وليه الاختيار ده أحسن للمستخدم.', en: 'Reflect: on a confusing site, which CRAP principle seems most broken and why? Challenge: the clinic can fund one accessibility improvement — for the low-vision or offline user, pick one CRAP principle, say what you would give up for it, and why that trade-off serves the user better.' },
            points: [{ ar: 'مبدأ مكسور + مثال.', en: 'A broken principle + example.' }, { ar: 'مبدأ للمستخدم + حاجة نستغنى عنها + سبب.', en: 'A principle for the user + what to give up + why.' }],
            model: { ar: 'في مواقع كتير التقارب مكسور: السعر بعيد عن صورة المنتج فمش عارف أنهي سعر لأنهي منتج. للمريض اللي نظره ضعيف أطبّق التباين: خط كبير غامق وألوان واضحة، وأستغنى عن صورة الخلفية الزخرفية اللي بتقلّل وضوح الكلام — لأن قدرته يقرا المواعيد أهم من شكل الصفحة.', en: 'On many sites proximity is broken: the price sits far from the photo, so you cannot tell which price is whose. For the low-vision patient I apply contrast — large bold text and clear colors — and drop the decorative background image that reduces legibility, because reading the hours matters more than decoration.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '4-2', seconds: 60, items: [
          { text: { ar: 'التصميم بيبدأ من المستخدم', en: 'Design starts from the user' }, answer: true },
          { text: { ar: 'الشخصية فيها عمر ومهنة وهدف وتحديات', en: 'A persona has age, job, purpose, challenges' }, answer: true },
          { text: { ar: 'أداء الخادم من معلومات الشخصية', en: 'Server performance is persona info' }, answer: false },
          { text: { ar: 'الإطار السلكي من غير ألوان', en: 'A wireframe has no colors' }, answer: true },
          { text: { ar: 'الإطار السلكي تصميم نهائي', en: 'A wireframe is a final design' }, answer: false },
          { text: { ar: 'عنوان كبير غامق = تباين', en: 'Large bold heading = contrast' }, answer: true },
          { text: { ar: 'تجميع الاسم والسعر = تقارب', en: 'Grouping name and price = proximity' }, answer: true },
          { text: { ar: 'توحيد خط العناوين = محاذاة', en: 'Same heading font = alignment' }, answer: false },
          { text: { ar: 'محاذاة الحواف = محاذاة', en: 'Aligning edges = alignment' }, answer: true },
          { text: { ar: 'التشفير من مبادئ CRAP', en: 'Encryption is a CRAP principle' }, answer: false },
          { text: { ar: 'UCD من منظور المستخدم', en: 'UCD is from the user’s view' }, answer: true },
          { text: { ar: 'UCD بيقدّم راحة المطوّر', en: 'UCD puts the developer first' }, answer: false },
          { text: { ar: 'هدف UCD قابلية الاستخدام وإمكانية الوصول', en: 'UCD aims at usability and accessibility' }, answer: true },
          { text: { ar: 'الألوان الأول بتسهّل الاتفاق', en: 'Colors first make agreement easier' }, answer: false },
          { text: { ar: 'الشخصية طريقة لتطبيق UCD', en: 'A persona is a way to practice UCD' }, answer: true },
          { text: { ar: 'التكرار بيدّي اتّساق', en: 'Repetition gives consistency' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 4-2', en: 'Lesson 4-2 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. «مخطّط تخطيط من غير لون لتحديد مكان المعلومات وأولويتها» — أيّها؟', en: '1. "A layout blueprint with no color for placement and priority" — which?' }, options: [{ ar: 'شخصية المستخدم', en: 'Persona' }, { ar: 'الإطار السلكي', en: 'Wireframe' }, { ar: 'مبدأ التباين', en: 'The contrast principle' }, { ar: 'منهج UCD', en: 'The UCD approach' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. تجميع صورة المنتج واسمه وسعره قريب بيطبّق أنهي مبدأ؟', en: '2. Grouping product image, name and price applies which principle?' }, options: [{ ar: 'التباين', en: 'Contrast' }, { ar: 'التكرار', en: 'Repetition' }, { ar: 'المحاذاة', en: 'Alignment' }, { ar: 'التقارب', en: 'Proximity' }], answer: 3 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. أنهي واحدة __مش__ من معلومات شخصية المستخدم؟', en: '3. Which is NOT persona information?' }, options: [{ ar: 'العمر والمهنة', en: 'Age and occupation' }, { ar: 'الهدف من الموقع', en: 'Purpose of visiting' }, { ar: 'أداء خادم الموقع', en: 'Site server performance' }, { ar: 'التحديات اللي بيواجهها', en: 'Challenges the user faces' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. «التقارب» معناه تجميع المعلومات المرتبطة قريبة.', en: '4. Proximity = grouping related information close.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. الإطار السلكي فيه الألوان والخطوط النهائية.', en: '5. A wireframe includes final colors and fonts.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. UCD بيبدأ من احتياج المستخدم وموقف استخدامه.', en: '6. UCD starts from the user’s need and use situation.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. رتّب: شخصية ← إطار سلكي ← CRAP ← UCD، واشرح ليه الترتيب ده.', en: '7. Order persona → wireframe → CRAP → UCD and explain why.' },
          points: [{ ar: 'مين (شخصية) ← فين (إطار) ← وضّح (CRAP).', en: 'Who (persona) → where (wireframe) → clarify (CRAP).' }, { ar: 'UCD العقلية اللي بتوجّه الكل.', en: 'UCD is the mindset guiding it all.' }],
          model: { ar: 'نبدأ بـ«مين» المستخدم (الشخصية) عشان نعرف احتياجه، بعدين «فين» تتحط المعلومات وأولويتها (الإطار السلكي) من غير ألوان، بعدين نوضّح الصفحة بمبادئ CRAP، وكل ده بتوجّهه عقلية UCD اللي بتخلّي كل قرار في صف المستخدم. الترتيب ده بيخلّي التصميم مبني على احتياج المستخدم مش على الذوق.', en: 'Start with "who" the user is (persona) to know their needs, then "where" information goes and its priority (wireframe) without color, then make the page clear with CRAP — all guided by the UCD mindset that keeps every decision on the user’s side. This order bases the design on the user’s needs, not taste.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اذكر مبادئ CRAP الأربعة ومثال لكل واحد.', en: '8. Name the four CRAP principles with an example each.' },
          points: [{ ar: 'تباين: عنوان كبير/زرار ملوّن.', en: 'Contrast: big heading/accent button.' }, { ar: 'تكرار: نفس خط العناوين.', en: 'Repetition: same heading font.' }, { ar: 'محاذاة: حواف على خط واحد · تقارب: الاسم والسعر والصورة مع بعض.', en: 'Alignment: edges on one line · proximity: name, price, image together.' }],
          model: { ar: 'التباين: عناوين كبيرة غامقة وزرار «اشترِ» بلون مميّز. التكرار: نفس لون وحجم وخط العناوين في كل الصفحات. المحاذاة: حواف النص والصور على خط واحد بالظبط. التقارب: صورة المنتج واسمه وسعره جنب بعض ومسافة بينهم وبين المنتج اللي بعده.', en: 'Contrast: large bold headings and a "Buy" button in an accent color. Repetition: the same heading color, size and font on every page. Alignment: text and image edges exactly on one line. Proximity: product image, name and price together with space before the next product.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. ليه بنثبّت مكان المعلومات قبل الألوان؟', en: '9. Why fix information placement before colors?' },
          points: [{ ar: 'الألوان الأول ← نقاش أذواق.', en: 'Colors first → taste debates.' }, { ar: 'المكان والأولوية ← اتفاق أصحاب المصلحة على احتياج المستخدم.', en: 'Placement and priority → stakeholders agree on user needs.' }],
          model: { ar: 'لأن لو بدأنا بالألوان والخطوط النقاش بيروح للذوق الشخصي ومايخلصش، لكن لما نثبّت مكان المعلومات وأولويتها الأول، النقاش بيبقى عن احتياج المستخدم وده بيسهّل اتفاق أصحاب المصلحة.', en: 'Because starting with colors and fonts drifts into personal taste that never ends, while fixing placement and priority first keeps the discussion on the user’s needs and helps stakeholders agree.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. إيه الهدفين المهمّين لـ UCD؟', en: '10. What are the two important goals of UCD?' },
          points: [{ ar: 'قابلية الاستخدام.', en: 'Usability.' }, { ar: 'إمكانية الوصول لفئات واسعة.', en: 'Accessibility for a wide range of people.' }],
          model: { ar: 'تحسين قابلية الاستخدام (إن الموقع يبقى سهل الاستخدام)، وتحسين إمكانية الوصول (إنه ينفع لفئات واسعة من الناس، زي ذوي الإعاقات).', en: 'Improving usability (the site is easy to use) and improving accessibility (it works for a wide range of people, including those with impairments).' } } },
      ],
    },
  ],
});
