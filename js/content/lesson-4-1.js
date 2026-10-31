/* =========================================================
 * content/lesson-4-1.js — أنواع الوسائط وخصائصها
 * Pure data. Sources: textbook 4-1 (EN p.75–80) + memo (Arabic wording,
 * deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('4-1', {
  id: '4-1',
  color: '#f59e0b',
  cover: 'img/md-l1-cover.webp',
  title: { ar: 'أنواع الوسائط وخصائصها', en: 'Types and Characteristics of Media' },
  guiding: { ar: 'إيه نقاط قوة الوسائط المختلفة وقيودها، وإزاي تختار الأنسب لغرض وجمهور معيّنين؟', en: 'What are the strengths and constraints of different media, and how do you choose the right one for a purpose and audience?' },
  hook: {
    ar: 'قبل ما تبني موقع، اسأل: ليه موقع أصلًا؟ **التلفزيون** بيوصل لجمهور كبير في وقت واحد، وعادةً __في اتجاه واحد__. **الراديو** بيتسمع وإنت بتتنقّل أو بتعمل حاجة تانية حسب التغطية، بس __صوت بس__. **الصحيفة** بتفضل على الورق __من غير إنترنت__. **الموقع** بيجمع نص وصور وفيديو ويتحدّث في أي وقت ويقدر __يتفاعل__ عن طريق النماذج — و**التواصل الاجتماعي** بينشر الخبر __بسرعة__ ويشجّع المشاركة. ولكل وسيلة قوتها وقيودها، فالاختيار بيعتمد على الرسالة والجمهور والموارد.',
    en: 'Before building a website, ask: why a website at all? **TV** reaches millions at once but __one way__. **Radio** reaches almost anywhere but is __sound only__. A **newspaper** lasts on paper __without the Internet__. A **website** combines text, images and video, updates any time and can __interact__ through forms — while **SNS** spreads news __fastest of all__. Each medium has its strengths and constraints.',
  },
  keyFact: { ar: 'لكل وسيلة __نقاط قوة وقيود مختلفة__؛ واختيار الوسيلة الصح — وغالبًا __كذا وسيلة مع بعض__ — بيعتمد على __الغرض والجمهور المستهدف__.', en: 'Each medium has __different strengths and constraints__; choosing the right one — often __several combined__ — depends on __the purpose and target audience__.' },
  concepts: ['TV', 'radio', 'newspaper', 'website', 'SNS', 'one-way', 'two-way', 'combining media'],
  objectives: [
    { ar: 'أقارن خصائص الوسائط المختلفة، وأشرح نقاط قوة المواقع وقيودها.', en: 'Compare the characteristics of different media, and explain the strengths and constraints of websites.' },
    { ar: 'أختار الوسيلة الأنسب لغرض وجمهور معيّنين، وأبرّر اختياري.', en: 'Choose suitable media for a purpose and audience, and justify the choice.' },
  ],

  stations: [
    /* ───────────── 1 · comparing media ───────────── */
    {
      id: 'compare', kind: 'learn',
      title: { ar: 'مقارنة خصائص الوسائط', en: 'Comparing media' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'عايز تعرّف أكبر عدد من الناس بخبر في نفس اللحظة… تختار إيه؟', en: 'You want to tell the most people at the same moment… what do you pick?' },
            options: [
              { emoji: '📺', text: { ar: 'التلفزيون', en: 'TV' } },
              { emoji: '📰', text: { ar: 'الصحيفة', en: 'Newspaper' } },
              { emoji: '💬', text: { ar: 'التواصل الاجتماعي', en: 'Social media' } },
            ],
            after: { ar: 'مفيش إجابة واحدة — تعالى نقارن الوسائط 👇', en: 'There is no single answer — let’s compare the media 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: خمس وسائط… لكل واحدة شخصيتها', en: '🎞️ Animation: five media… each with its character' },
          enTitle: 'Comparing media',
          terms: ['TV', 'radio', 'newspaper', 'website', 'SNS', 'one-way', 'two-way'],
          visual: { anim: 'mediaMovie', props: { scenes: [0, 3] } },
          beats: [
            { ar: '📺 **التلفزيون:** فيديو + صوت · بيوصل لـ__ناس كتير في نفس الوقت__ · بيخاطب __النظر والسمع__ · عادةً __في اتجاه واحد__ من المرسل للمتلقي.', en: '📺 **TV:** video + audio · reaches __many people at once__ · appeals to __sight and hearing__ · __one-way__ from sender to receiver.' },
            { ar: '📻 **الراديو:** صوت بس · بيخاطب __السمع بس__ · بيتسمع __أثناء التنقل أو أداء مهام تانية__ حسب التغطية ووسيلة الاستقبال · اتجاه واحد. 📰 **الصحيفة:** نص + صور · بتفضل __مطبوعة ماديًا__ · بتتقري __من غير إنترنت__ · اتجاه واحد.', en: '📻 **Radio:** audio only · appeals __only to hearing__ · received __almost anywhere, alongside other tasks__ · one-way. 📰 **Newspaper:** text + images · remains __physically printed__ · read __without the Internet__ · one-way.' },
            { ar: '🌐 **الموقع:** نص + صور + فيديو + صوت · بيجمع معلومات متنوعة · __يتحدّث في أي وقت__ · __أساسًا في اتجاه واحد__ بس التفاعل في الاتجاهين ممكن عن طريق __النماذج والتعليقات__. 💬 **التواصل الاجتماعي:** __فعّال جدًا في نشر المعلومة بسرعة__ · المستخدمين __بينشروا ويشاركوا__ · __في الاتجاهين__.', en: '🌐 **Website:** text + images + video + audio · combines diverse info · __updatable any time__ · __basically one-way__, but two-way through __forms and comments__. 💬 **SNS:** __very effective at spreading information fast__ · users __post and share__ · __two-way__.' },
            { ar: '↔️ **اتجاه واحد مقابل الاتجاهين:** اتجاه واحد = تلفزيون، راديو، صحيفة (المتلقي بيستقبل بس) · الاتجاهين = التواصل الاجتماعي (المستخدمين بينشروا ويشاركوا)، والموقع __عن طريق النماذج والتعليقات__. ⚠️ فخ: «التلفزيون بيتيح تفاعل في الاتجاهين» ← __غلط__.', en: '↔️ **One-way vs two-way:** one-way = TV, radio, newspaper (receive only) · two-way = SNS __always__, a website __through forms and comments__. ⚠️ Trap: "TV allows two-way interaction" → __false__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'صنّف كل وسيلة حسب اتجاهها:', en: 'Sort each medium by direction:' },
            groups: [{ icon: 'arrowNext', label: { ar: 'اتجاه واحد', en: 'One-way' } }, { icon: 'share', label: { ar: 'في الاتجاهين', en: 'Two-way' } }],
            items: [
              { text: { ar: 'التلفزيون', en: 'TV' }, group: 0 },
              { text: { ar: 'الراديو', en: 'Radio' }, group: 0 },
              { text: { ar: 'الصحيفة', en: 'Newspaper' }, group: 0 },
              { text: { ar: 'التواصل الاجتماعي', en: 'SNS' }, group: 1 },
            ],
            explain: { ar: 'التلاتة التقليديين اتجاه واحد · التواصل الاجتماعي في الاتجاهين.', en: 'The three traditional media are one-way · SNS is always two-way.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'الراديو بينقل فيديو وصوت.', en: 'Radio carries video and audio.' }, answer: false, explain: { ar: 'الراديو __صوت بس__.', en: 'Radio is __audio only__.' } },
            { text: { ar: 'الصحيفة ممكن تتقري من غير اتصال إنترنت.', en: 'A newspaper can be read without the Internet.' }, answer: true },
            { text: { ar: 'الموقع ممكن يتفاعل في الاتجاهين عن طريق النماذج والتعليقات.', en: 'A website can be two-way through forms and comments.' }, answer: true },
            { text: { ar: 'الصحف أكتر وسيلة فعّالة في نشر المعلومة بسرعة.', en: 'Newspapers are the most effective for spreading information fast.' }, answer: false, explain: { ar: 'الأسرع في النشر __التواصل الاجتماعي__.', en: 'The fastest at spreading is __SNS__.' } },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**التلفزيون:** فيديو+صوت · لكتير في نفس الوقت · اتجاه واحد. **الراديو:** صوت بس · أثناء التنقل حسب التغطية · اتجاه واحد.', en: '**TV:** video+audio · many at once · one-way. **Radio:** audio only · anywhere · one-way.' },
            { ar: '**الصحيفة:** نص+صور · مطبوعة · من غير إنترنت · اتجاه واحد.', en: '**Newspaper:** text+images · printed · no Internet · one-way.' },
            { ar: '**الموقع:** كل الأنواع · يتحدّث · أساسًا اتجاه واحد + تفاعل بالنماذج. **التواصل:** أسرع نشر · في الاتجاهين.', en: '**Website:** all kinds · updatable · basically one-way + forms. **SNS:** fastest spread · two-way.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · websites + choosing media ───────────── */
    {
      id: 'choose', kind: 'learn',
      title: { ar: 'نقاط قوة المواقع وقيودها · واختيار الوسيلة', en: 'Websites’ strengths and constraints · choosing media' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: الموقع… وإزاي نختار الوسيلة', en: '🎞️ Animation: the website… and how to choose' },
          enTitle: 'Websites and choosing media',
          terms: ['strengths', 'constraints', 'purpose', 'target audience', 'combining media'],
          visual: { anim: 'mediaMovie', props: { scenes: [4, 8] } },
          beats: [
            { ar: '✅ **نقاط قوة المواقع:** ① __تجمع معلومات متنوعة__ (نص، صور، فيديو) ② __تتحدّث في أي وقت__ ③ __توصل من أي مكان فيه اتصال مناسب__ ④ __تفاعل في الاتجاهين__ بالنماذج والتعليقات ⑤ __بتتستخدم من المتصفح__، وبعض تطبيقات الويب ممكن تتثبّت.', en: '✅ **Strengths of websites:** ① __combine diverse information__ (text, images, video) ② __update any time__ ③ __reach almost anywhere in the world__ ④ __two-way__ via forms and comments ⑤ __a browser is enough__, no app to install.' },
            { ar: '⚠️ **قيود المواقع:** ① __معظم وظايفها محتاجة اتصال بالشبكة__، وبعض المواقع ممكن توفّر محتوى أو وظايف محدودة من غير اتصال ② __غالبًا المستخدم محتاج يفتح الموقع__ عشان يوصل لمحتواه، إلا لو الخدمة بتستخدم إشعارات أو قنوات تانية ③ __العرض وسرعة التحميل بيختلفوا__ حسب جهاز المستخدم وشبكته.', en: '⚠️ **Constraints of websites:** ① usually __need an Internet connection__ (unless cached) ② __information does not reach users unless they visit__ ③ __display and loading speed vary__ with the user’s device and network.' },
            { ar: '🎯 **اختيار الوسيلة حسب الغرض:** تبلّغ ناس كتير مرة واحدة ← __تلفزيون، إعلانات التواصل__ (وصول واسع) · معلومات مفصّلة ← __موقع__ (كمية كبيرة منظمة في صفحات وأقسام، وتتشاف في أي وقت) · رسالة مباشرة لناس معيّنين ← __إيميل، رسايل مباشرة__ (توصيل فردي) · انتشار بالتناقل الشفهي ← __التواصل الاجتماعي__ (المستخدمين بيشاركوا بإرادتهم).', en: '🎯 **Choosing by purpose:** inform many at once → __TV, SNS ads__ (wide reach) · detailed info → __website__ (no limit, view any time) · deliver directly to specific people → __email, direct messages__ (one-to-one) · word of mouth → __SNS__ (users share voluntarily).' },
            { ar: '🔗 **عمليًا بنجمع كذا وسيلة:** إعلان __تلفزيوني__ بيوجّه الناس لـ__موقع__، والموقع بيشجّعهم ينشروا على __التواصل الاجتماعي__ — كل وسيلة بتعمل اللي بتجيده وتسدّ ضعف التانية. وفكّر في الجمهور: عيلة __من غير إنترنت__ مش هيوصلها الموقع — يوصلها راديو أو ملصق مطبوع.', en: '🔗 **In practice we combine media:** a __TV ad__ directs viewers to a __website__, which encourages sharing on __SNS__ — each does what it does best and covers another’s weakness. And think of the audience: a family __with no Internet__ will not get the website — radio or a printed poster will.' },
            { ar: '📌 **الخلاصة:** مفيش وسيلة أحسن في كل حاجة — اختار الوسيلة حسب __الغرض والجمهور__، واجمع الوسائط عشان كل واحدة تعمل اللي بتجيده. ⚠️ فخاخ: «الموقع بيتشاف من غير إنترنت» ← غلط · «المعلومة بتوصل تلقائيًا من غير ما يدخلوا» ← غلط.', en: '📌 **The point:** no medium is best for everything — choose by __purpose and audience__, and combine media so each does what it does best. ⚠️ Traps: "a website works without the Internet" → false · "information reaches users automatically" → false.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'الاختيار الصحيح دايمًا: «__اختار الوسيلة الأنسب حسب الغرض والجمهور المستهدف__» — مش «وسيلة واحدة دايمًا» ولا «الموقع يكفي دايمًا».', en: 'The right choice is always: "__choose the most suitable medium for the purpose and target audience__" — not "always one medium" or "a website is always enough".' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — إزاي تختار الوسيلة؟', en: 'Deep dive — how to choose?' }, text: { ar: 'اسأل الأول عن هدفك: (١) وصول واسع بسرعة؟ ← تلفزيون/إعلانات التواصل. (٢) تفاصيل كاملة يرجعولها؟ ← موقع. (٣) رسالة مباشرة لناس بعينهم؟ ← إيميل/رسايل. (٤) انتشار بالتناقل الشفهي؟ ← تواصل اجتماعي. وبعدين فكّر في جمهورك. الموقع قوي في العمق بس __سلبي__ (مستني حد يدوّر عليه)، فبنضيف له تلفزيون يجذب الانتباه وتواصل ينشر.', en: 'First ask your goal: (1) wide reach fast? → TV/SNS ads. (2) full detail to return to? → website. (3) a direct message to certain people? → email/messages. (4) word of mouth? → SNS. Then think about your audience. A website is deep but __passive__ (it waits to be found), so we add TV to grab attention and SNS to spread.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'نقطة قوة ولا قيد للمواقع؟', en: 'A strength or a constraint of websites?' },
            groups: [{ icon: 'check', label: { ar: 'نقطة قوة', en: 'Strength' } }, { icon: 'alert', label: { ar: 'قيد', en: 'Constraint' } }],
            items: [
              { text: { ar: 'تتحدّث في أي وقت', en: 'Can be updated any time' }, group: 0 },
              { text: { ar: 'محتاجة اتصال إنترنت عادةً', en: 'Usually needs an Internet connection' }, group: 1 },
              { text: { ar: 'بتتستخدم من المتصفح', en: 'A browser is enough, nothing to install' }, group: 0 },
              { text: { ar: 'غالبًا المستخدم لازم يفتح الموقع بنفسه', en: 'Info reaches users only if they visit' }, group: 1 },
              { text: { ar: 'السرعة بتختلف حسب الجهاز والشبكة', en: 'Speed varies with device and network' }, group: 1 },
            ],
            explain: { ar: 'القوة: متنوعة، تتحدّث، عالمية، تفاعلية، من المتصفح · القيود: إنترنت، لازم يدوّروا عليها، السرعة.', en: 'Strengths: diverse, updatable, global, interactive, browser-only · constraints: Internet, users must seek it, speed.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل غرض بالوسيلة الأنسب:', en: 'Match each purpose with the best medium:' },
            left: [
              { ar: 'تبعت عرض مباشرة لعملاء معيّنين', en: 'Send an offer directly to certain customers' },
              { ar: 'معلومات مفصّلة تتشاف في أي وقت', en: 'Detailed info viewable any time' },
              { ar: 'الناس ينشروا الخبر بالتناقل الشفهي', en: 'People spread it by word of mouth' },
              { ar: 'فيديو لناس كتير مرة واحدة', en: 'Video to many people at once' },
            ],
            right: [{ ar: 'التلفزيون', en: 'TV' }, { ar: 'الموقع', en: 'Website' }, { ar: 'التواصل الاجتماعي', en: 'SNS' }, { ar: 'الإيميل', en: 'Email' }],
            answer: [3, 1, 2, 0],
            explain: { ar: 'مباشر ← إيميل · تفاصيل ← موقع · تناقل ← تواصل · كتير مرة واحدة ← تلفزيون.', en: 'Direct → email · detail → website · word of mouth → SNS · many at once → TV.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**قوة المواقع:** متنوعة · تتحدّث · عالمية · تفاعلية · من المتصفح.', en: '**Website strengths:** diverse · updatable · global · two-way · browser only.' },
            { ar: '**قيود المواقع:** محتاجة إنترنت · لازم المستخدم يدوّر عليها · السرعة بتختلف.', en: '**Website constraints:** needs Internet · users must seek it · speed varies.' },
            { ar: '**الاختيار:** حسب الغرض والجمهور · وصول ← تلفزيون · تفاصيل ← موقع · مباشر ← إيميل · تناقل ← تواصل · **وبنجمع الوسائط**.', en: '**Choosing:** by purpose and audience · reach → TV · detail → website · direct → email · word of mouth → SNS · **and we combine media**.' },
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
            { text: { ar: 'A) الموقع يقدر يعرض معلومات متنوعة زي النص والصور والفيديو مع بعض.', en: 'A) A website can present diverse information such as text, images and video together.' }, answer: true },
            { text: { ar: 'B) التلفزيون وسيلة بتتيح تفاعل في الاتجاهين مع المستخدمين.', en: 'B) TV allows two-way interaction with users.' }, answer: false },
            { text: { ar: 'C) التواصل الاجتماعي فعّال جدًا في نشر المعلومة بسرعة.', en: 'C) SNS is highly effective at spreading information rapidly.' }, answer: true },
            { text: { ar: 'D) الموقع ممكن يتشاف حتى من غير اتصال إنترنت.', en: 'D) A website can normally be viewed without the Internet.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) دي نقطة قوة للمواقع ← **✓**.', en: 'A) A strength of websites → **✓**.' },
            { ar: 'B) التلفزيون __اتجاه واحد__ ← **✗**.', en: 'B) TV is __one-way__ → **✗**.' },
            { ar: 'C) وصف صحيح للتواصل الاجتماعي ← **✓**.', en: 'C) Correct description of SNS → **✓**.' },
            { ar: 'D) الموقع __محتاج إنترنت__ عادةً ← **✗**.', en: 'D) A website usually __needs the Internet__ → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل غرض (a–c) بالوسيلة الأنسب (A–C):', en: '(2) Match each purpose (a–c) with the best medium (A–C):' },
            left: [
              { ar: 'a) معلومات مفصّلة تتشاف في أي وقت', en: 'a) Detailed information viewable any time' },
              { ar: 'b) المستخدمين ينشروا المعلومة بالتناقل الشفهي', en: 'b) Users spread information by word of mouth' },
              { ar: 'c) تبلّغ ناس كتير مرة واحدة بالفيديو', en: 'c) Inform many people at once with video' },
            ],
            right: [{ ar: 'A التلفزيون', en: 'A TV' }, { ar: 'B الموقع', en: 'B Website' }, { ar: 'C التواصل الاجتماعي', en: 'C SNS' }],
            answer: [1, 2, 0] },
          solution: [
            { ar: 'a: التفاصيل في أي وقت = **الموقع** ← B.', en: 'a: detail any time = **website** → B.' },
            { ar: 'b: التناقل = **التواصل الاجتماعي** ← C.', en: 'b: word of mouth = **SNS** → C.' },
            { ar: 'c: فيديو لكتير مرة واحدة = **التلفزيون** ← A.', en: 'c: video to many at once = **TV** → A.' },
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
            { q: { ar: '1. اذكر نقطتين قوة للمواقع.', en: '1. Name two strengths of websites.' }, a: { ar: 'مثلًا: تجمع معلومات متنوعة · تتحدّث في أي وقت (أو: عالمية · تفاعلية · من المتصفح).', en: 'e.g. combine diverse info · update any time (or: global · two-way · browser only).' } },
            { q: { ar: '2. اذكر قيدين للمواقع.', en: '2. Name two constraints of websites.' }, a: { ar: 'مثلًا: محتاجة إنترنت · غالبًا المستخدم لازم يفتح الموقع بنفسه (أو: السرعة بتختلف).', en: 'e.g. need the Internet · reach users only if they visit (or: speed varies).' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي __مش__ خاصية مناسبة للمواقع:', en: 'Choose the one that is **NOT** an appropriate characteristic of websites:' },
            options: [
              { ar: 'المعلومة ممكن تتحدّث في أي وقت', en: 'Information can be updated at any time' },
              { ar: 'المعلومة بتوصل للمستخدمين تلقائيًا من غير ما يدخلوا', en: 'Information automatically reaches users without them visiting' },
              { ar: 'النص والصور والفيديو ممكن يتجمعوا ويتعرضوا', en: 'Text, images and video can be combined and presented' },
              { ar: 'التفاعل في الاتجاهين ممكن بالنماذج والتعليقات', en: 'Two-way interaction is possible through forms and comments' },
            ],
            fixedOrder: true,
            answer: 1,
            explain: { ar: 'B غلط: المستخدم __غالبًا لازم يفتحه بنفسه__.', en: 'B is wrong: users __must visit themselves__.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'classify', prompt: { ar: 'لكل موقف (a–d) اختار الوسيلة الأنسب:', en: 'For each situation (a–d) choose the best medium:' },
            groups: [{ icon: 'film', label: { ar: 'A التلفزيون', en: 'A TV' } }, { icon: 'globe', label: { ar: 'B الموقع', en: 'B Website' } }, { icon: 'users', label: { ar: 'C التواصل', en: 'C SNS' } }, { icon: 'mail', label: { ar: 'D الإيميل', en: 'D Email' } }],
            items: [
              { text: { ar: 'a) مواصفات منتج جديد وطريقة استخدامه متاحة في أي وقت', en: 'a) A new product’s specs and usage available any time' }, group: 1 },
              { text: { ar: 'b) المستخدمين ينشروا عن المنتج بالتناقل الشفهي', en: 'b) Users spread word of the product' }, group: 2 },
              { text: { ar: 'c) فيديو منتج جديد يوصل لناس كتير مرة واحدة', en: 'c) A product video to many people at once' }, group: 0 },
              { text: { ar: 'd) معلومات حملة توصل مباشرة للعملاء الحاليين', en: 'd) Campaign info sent directly to existing customers' }, group: 3 },
            ],
            explain: { ar: 'a→B · b→C · c→A · d→D.', en: 'a→B · b→C · c→A · d→D.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(c):', en: 'Read and fill blanks (a)–(c):' },
            text: { ar: 'لكل وسيلة خصائص مختلفة. الموقع يقدر يعرض نصوص وصور وصوت وفيديو ويحدّثها. ومعظم وظايفه محتاجة اتصال {0}، مع إمكانية توفير محتوى محدود من غير اتصال في بعض الحالات. وغالبًا المستخدم محتاج {1} الموقع عشان يشوف محتواه، إلا لو الخدمة بتستخدم إشعارات أو قنوات تانية. وفي الحملات الفعلية كتير بتتجمع {2} متعددة، زي توجيه المشاهد من إعلان لموقع.', en: 'Each medium has different characteristics. A website can present diverse information and be updated any time. Its constraints: it cannot be viewed without an {0} connection, and information does not reach users unless they actively {1} it. In practice, {2} media are often combined, such as directing viewers from a TV ad to a website.' },
            bank: [{ ar: 'إنترنت', en: 'Internet' }, { ar: 'فتح', en: 'access' }, { ar: 'وسائط', en: 'multiple' }, { ar: 'راديو', en: 'radio' }],
            answer: [0, 1, 2],
            explain: { ar: '(a) إنترنت (b) فتح (c) وسائط.', en: '(a) Internet (b) access (c) multiple.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب لخصائص الوسائط:', en: 'Choose the best description of media characteristics:' },
            options: [
              { ar: 'الراديو بينقل المعلومة بالفيديو والصوت', en: 'Radio conveys information with video and audio' },
              { ar: 'الصحف فعّالة جدًا في نشر المعلومة بسرعة', en: 'Newspapers are very effective at spreading fast' },
              { ar: 'التواصل بيخلّي المستخدمين ينشروا ويشاركوا', en: 'SNS lets users post and share information' },
              { ar: 'التلفزيون بيتيح تفاعل في الاتجاهين مع الناس', en: 'TV allows two-way interaction with people' },
            ],
            answer: 2,
            explain: { ar: 'الراديو صوت بس · الأسرع التواصل مش الصحف · التلفزيون اتجاه واحد.', en: 'Radio is audio only · SNS, not newspapers, is fastest · TV is one-way.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب لاختيار الوسائط:', en: 'Choose the best description of choosing media:' },
            options: [
              { ar: 'نشر المعلومة لازم دايمًا بوسيلة واحدة بس', en: 'Information must always use only one medium' },
              { ar: 'الموقع يكفي مهما كان الغرض أو الجمهور', en: 'A website is enough whatever the purpose or audience' },
              { ar: 'المهم نختار الأنسب حسب الغرض والجمهور', en: 'Choose the most suitable for purpose and audience' },
              { ar: 'مع التواصل مش محتاجين تلفزيون ولا مواقع', en: 'With SNS, TV and websites are not needed' },
            ],
            answer: 2,
            explain: { ar: 'القاعدة: __الغرض والجمهور__ يحدّدوا الوسيلة.', en: 'The rule: __purpose and audience__ decide the medium.' } },
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
          { front: { ar: 'اتجاه واحد', en: 'One-way' }, back: { ar: 'من المرسل للمتلقي بس (تلفزيون، راديو، صحيفة).', en: 'From sender to receiver only (TV, radio, newspaper).' } },
          { front: { ar: 'في الاتجاهين', en: 'Two-way' }, back: { ar: 'المستخدمين يقدروا يردّوا ويشاركوا (التواصل، والموقع بالنماذج).', en: 'Users can respond and share (SNS always; websites via forms).' } },
          { front: { ar: 'نقاط قوة المواقع', en: 'Website strengths' }, back: { ar: 'متنوعة · تتحدّث · عالمية · تفاعلية · من المتصفح.', en: 'Diverse · updatable · global · two-way · browser only.' } },
          { front: { ar: 'قيود المواقع', en: 'Website constraints' }, back: { ar: 'محتاجة إنترنت · لازم يدوّروا عليها · السرعة بتختلف.', en: 'Need the Internet · users must seek them · speed varies.' } },
          { front: { ar: 'اختيار الوسيلة', en: 'Choosing media' }, back: { ar: 'حسب الغرض والجمهور المستهدف — وغالبًا بنجمع كذا وسيلة.', en: 'By purpose and target audience — often several combined.' } },
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
            prompt: { ar: 'اشرح ليه مؤسسة ممكن تستخدم موقع وتلفزيون وتواصل اجتماعي مع بعض بدل واحد بس، عشان تروّج لخدمة جديدة. (أشِر إلى: الوصول، والعمق، والانتشار بالتناقل الشفهي)', en: 'Explain why an organization might use a website, TV and SNS together rather than one, to promote a new service. (Refer to: reach, depth, word of mouth)' },
            points: [
              { ar: 'التلفزيون: وصول واسع لكتير مرة واحدة.', en: 'TV: wide reach to many at once.' },
              { ar: 'الموقع: عمق — تفاصيل كاملة في أي وقت.', en: 'Website: depth — full details any time.' },
              { ar: 'التواصل: انتشار بالتناقل الشفهي — كل وسيلة بتسدّ ضعف التانية.', en: 'SNS: word of mouth — each covers another’s weakness.' },
            ],
            model: { ar: 'مفيش وسيلة واحدة بيعمل كل حاجة. __التلفزيون__ بيدّي __وصول واسع__: يعرّف ملايين بالخدمة في نفس الوقت، بس في اتجاه واحد ومن غير تفاصيل كتير. __الموقع__ بيدّي __العمق__: مواصفات وأسعار وطريقة اشتراك متاحة في أي وقت وبكمية كبيرة منظمة، بس هو سلبي ومستني الناس تدخله. __التواصل الاجتماعي__ بيدّي __الانتشار بالتناقل الشفهي__: الناس بتشارك الخبر بإرادتها وبيوصل بسرعة وفي الاتجاهين. فالمؤسسة بتجمعهم: إعلان التلفزيون يوجّه الناس للموقع، والموقع يشجّعهم ينشروا على التواصل — وكل وسيلة بتعمل اللي بتجيده وتسدّ ضعف التانية.', en: 'No single medium does everything. __TV__ gives __wide reach__: it informs millions at once, but one-way and without much detail. The __website__ gives __depth__: specs, prices and sign-up available any time with no limit, but it is passive and waits for people to visit. __SNS__ gives __word of mouth__: people share voluntarily and it spreads fast and two-way. So the organization combines them: the TV ad sends people to the website, which encourages sharing on SNS — each medium does what it does best and covers another’s weakness.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — برنامج المكتبة العامة', en: 'Think as an engineer — public library programme' },
            prompt: { ar: 'مكتبة عامة في مدينتك عايزة تعلن عن برنامج قراءة مجاني جديد. ١) اسأل عشرة: بيلاحظوا الإعلانات المحلية فين فعلًا — ملصق مطبوع، فيسبوك، واتساب، راديو محلي؟ ٢) لكل فئة — عيلة من غير إنترنت في البيت، طالب، أمين المكتبة — فايدة وعيب لو الموقع هو القناة الأساسية. ٣) أوصِ بخطة وسائط (أنهي وسائط وبأي أدوار) بسببين.', en: 'A public library wants to announce a free reading programme. 1) Survey ten people: where do they notice local announcements — poster, Facebook, WhatsApp, local radio? 2) For each group — a family with no home Internet, a student, the librarian — one benefit and one drawback of a website as the main channel. 3) Recommend a media plan (which media, what roles) with two reasons.' },
            points: [
              { ar: 'نتايج استبيان + الأكثر شيوعًا.', en: 'Survey results + the most common channel.' },
              { ar: 'فايدة وعيب لكل فئة (العيلة من غير إنترنت مش هيوصلها الموقع).', en: 'Benefit and drawback per group (the offline family will not get the website).' },
              { ar: 'خطة مجمّعة + سببين.', en: 'A combined plan + two reasons.' },
            ],
            model: { ar: '١) (مثال) أغلب العشرة قالوا واتساب وملصقات المكتبة، واتنين قالوا الراديو المحلي. ٢) العيلة من غير إنترنت: الموقع مش هيوصلها خالص (عيب)، بس الملصق والراديو يوصلوها. الطالب: الموقع مريح ومتاح في أي وقت (فايدة) بس ممكن مايدخلوش إلا لو حد قال له (عيب). أمين المكتبة: الموقع سهل يحدّثه (فايدة) بس مش هيعرف مين شافه (عيب). ٣) الخطة: ملصقات في المكتبة والمدارس + راديو محلي للوصول للي من غير إنترنت، ورسالة واتساب توجّه الناس للموقع اللي فيه التفاصيل والتسجيل. السببين: الجمع بيوصل لكل الفئات، وكل وسيلة بتعمل اللي بتجيده (الملصق للانتباه، والموقع للتفاصيل).', en: '1) (Example) most of the ten said WhatsApp and library posters; two said local radio. 2) Offline family: the website will not reach them (drawback), but posters and radio will. Student: the site is convenient any time (benefit) but they may not visit unless told (drawback). Librarian: easy to update (benefit) but cannot tell who saw it (drawback). 3) Plan: posters in the library and schools + local radio for those offline, and a WhatsApp message pointing to the website with details and sign-up. Reasons: combining reaches every group, and each medium does what it does best (posters for attention, website for detail).' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مستشفى عايزة تبلّغ المرضى بمواعيد عمل جديدة وتسمح لهم يسألوا. اذكر وسيلة توصل لكتير بسرعة، ووسيلة تتيح تفاعل في الاتجاهين، وليه كل واحد مناسب.', en: 'A hospital wants to inform patients about new hours and let them ask questions. Name one medium to reach many quickly and one allowing two-way interaction, and why each fits.' },
            points: [{ ar: 'وصول سريع: إعلانات التواصل/تلفزيون محلي/رسايل.', en: 'Fast reach: SNS ads/local TV/messages.' }, { ar: 'اتجاهين: التواصل أو نموذج أسئلة على الموقع.', en: 'Two-way: SNS or a question form on the website.' }],
            model: { ar: 'للوصول السريع لكتير: منشور وإعلان على صفحة المستشفى في التواصل الاجتماعي (بينتشر بسرعة). وللتفاعل في الاتجاهين: نموذج «اسأل سؤالك» على موقع المستشفى أو الرد على التعليقات في التواصل — لأن المريض يقدر يكتب سؤاله ويستقبل الرد.', en: 'For fast reach: a post and ad on the hospital’s SNS page (spreads quickly). For two-way interaction: an "ask a question" form on the hospital website or replying to SNS comments — because patients can write a question and receive an answer.' } },
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
            prompt: { ar: 'تختار أنهي وسيلة عشان توصل لأكبر عدد مرة واحدة — وأنهي عشان تخلّيهم يردّوا عليك؟', en: 'Which medium would you choose to reach the most people at once — and which to let them respond to you?' },
            points: [{ ar: 'أكبر عدد: تلفزيون/إعلانات التواصل.', en: 'Most people: TV/SNS ads.' }, { ar: 'الرد: التواصل أو نماذج الموقع.', en: 'Responses: SNS or website forms.' }],
            model: { ar: 'لأكبر عدد مرة واحدة: التلفزيون أو إعلانات التواصل الاجتماعي (وصول واسع). وعشان يردّوا: التواصل الاجتماعي لأنه في الاتجاهين، أو نموذج وتعليقات على الموقع.', en: 'To reach the most at once: TV or SNS ads (wide reach). To let them respond: SNS, because it is two-way, or a form and comments on the website.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: أنهي وسيلة بتثق فيها أكتر للأخبار المهمة، وليه؟ تحدّى: خطّط وسائط لإعلان حدث في المدرسة بميزانية مافيهاش تلفزيون — واذكر جمهور ممكن خطتك ماتوصلوش وليه.', en: 'Reflect: which medium do you trust most for important news, and why? Challenge: plan the media for a school event on a budget with no TV — then name one audience your mix might miss, and why.' },
            points: [{ ar: 'وسيلة + سبب الثقة.', en: 'A medium + reason.' }, { ar: 'خطة من غير تلفزيون + جمهور ممكن يتساب.', en: 'A no-TV plan + an audience it might miss.' }],
            model: { ar: 'بثق أكتر في موقع جهة رسمية لأن المعلومة مفصّلة ومن المصدر نفسه. للحدث: ملصقات في المدرسة، وجروب واتساب للفصول، ومنشور على صفحة المدرسة، وموقع فيه التفاصيل والتسجيل. ممكن ماتوصلش لأولياء الأمور اللي مش على التواصل ومابيجوش المدرسة — فنبعت لهم ورقة مع الطالب.', en: 'I trust an official body’s website most because the details come from the source. For the event: school posters, class WhatsApp groups, a post on the school page, and a website with details and sign-up. It might miss parents who are not on social media and do not visit the school — so we send a paper note home with students.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '4-1', seconds: 60, items: [
          { text: { ar: 'التلفزيون اتجاه واحد', en: 'TV is one-way' }, answer: true },
          { text: { ar: 'الراديو فيديو وصوت', en: 'Radio is video and audio' }, answer: false },
          { text: { ar: 'الصحيفة بتتقري من غير إنترنت', en: 'A newspaper is read without the Internet' }, answer: true },
          { text: { ar: 'التواصل الاجتماعي في الاتجاهين', en: 'SNS is two-way' }, answer: true },
          { text: { ar: 'الموقع بيتحدّث في أي وقت', en: 'A website updates any time' }, answer: true },
          { text: { ar: 'الموقع بيتشاف من غير إنترنت عادةً', en: 'A website is normally viewed offline' }, answer: false },
          { text: { ar: 'المعلومة بتوصل تلقائيًا لمستخدمي الموقع', en: 'Info reaches website users automatically' }, answer: false },
          { text: { ar: 'الموقع بيتستخدم من المتصفح', en: 'A website needs only a browser' }, answer: true },
          { text: { ar: 'تفاصيل كاملة ← موقع', en: 'Full details → website' }, answer: true },
          { text: { ar: 'تناقل ← تواصل اجتماعي', en: 'Word of mouth → SNS' }, answer: true },
          { text: { ar: 'رسالة مباشرة ← تلفزيون', en: 'Direct message → TV' }, answer: false },
          { text: { ar: 'وسيلة واحدة يكفي لكل حاجة', en: 'One medium is enough for everything' }, answer: false },
          { text: { ar: 'نختار حسب الغرض والجمهور', en: 'Choose by purpose and audience' }, answer: true },
          { text: { ar: 'إعلان تلفزيوني يوجّه لموقع = جمع وسائط', en: 'TV ad pointing to a site = combining media' }, answer: true },
          { text: { ar: 'الموقع بيخاطب السمع بس', en: 'A website appeals only to hearing' }, answer: false },
          { text: { ar: 'سرعة الموقع بتختلف حسب الجهاز والشبكة', en: 'Website speed varies with device and network' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 4-1', en: 'Lesson 4-1 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. أنهي وسيلة بتسمح للمستخدمين ينشروا ويشاركوا؟', en: '1. Which medium is always two-way?' }, options: [{ ar: 'التلفزيون', en: 'Television' }, { ar: 'التواصل الاجتماعي', en: 'Social media' }, { ar: 'الراديو المحلي', en: 'Local radio' }, { ar: 'الصحيفة المطبوعة', en: 'Printed newspaper' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. لمعلومات مفصّلة يرجعولها في أي وقت، الوسيلة الأنسب؟', en: '2. Best medium for detailed, always-available info?' }, options: [{ ar: 'التلفزيون', en: 'Television' }, { ar: 'الموقع', en: 'Website' }, { ar: 'الراديو', en: 'Radio' }, { ar: 'إعلانات التواصل', en: 'SNS adverts' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. أنهي واحدة __مش__ خاصية مناسبة للمواقع؟', en: '3. Which is NOT a characteristic of websites?' }, options: [{ ar: 'المعلومة تتحدّث في أي وقت', en: 'Information can be updated any time' }, { ar: 'المعلومة توصل تلقائيًا من غير دخول', en: 'Info arrives automatically without visiting' }, { ar: 'تجمع النص والصور والفيديو', en: 'Combines text, images and video together' }, { ar: 'تفاعل عن طريق النماذج والتعليقات', en: 'Interaction through forms and comments' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. التلفزيون وسيلة في اتجاه واحد من المرسل للمتلقي.', en: '4. TV is one-way from sender to receiver.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. الموقع عادةً بيتشاف من غير اتصال إنترنت.', en: '5. A website is normally viewable without the Internet.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. عمليًا بنجمع كذا وسيلة عشان كل واحدة تعمل اللي بتجيده.', en: '6. In practice, media are combined so each does what it does best.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. قارن بين التلفزيون والموقع من حيث الوصول والاتجاه.', en: '7. Compare TV and a website in reach and direction.' },
          points: [{ ar: 'التلفزيون: وصول واسع مرة واحدة · اتجاه واحد.', en: 'TV: wide reach at once · one-way.' }, { ar: 'الموقع: لمن يدخل في أي وقت · أساسًا اتجاه واحد + تفاعل بالنماذج.', en: 'Website: for those who visit, any time · basically one-way + forms.' }],
          model: { ar: 'التلفزيون بيوصل لناس كتير جدًا في نفس الوقت، بس في اتجاه واحد (المشاهد بيستقبل بس). الموقع مابيوصلش إلا للي بيدخله بنفسه، بس متاح في أي وقت ومن أي مكان، وهو أساسًا اتجاه واحد لكن بيسمح بالتفاعل عن طريق النماذج والتعليقات.', en: 'TV reaches very many people at the same time, but one-way (viewers only receive). A website reaches only those who visit, but is available any time and anywhere; it is basically one-way but allows interaction through forms and comments.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اذكر قيد للموقع واقترح وسيلة تعوّضه.', en: '8. Name one website constraint and a medium that makes up for it.' },
          points: [{ ar: 'قيد (محتاج إنترنت / لازم يدوّروا عليه).', en: 'A constraint (needs Internet / users must seek it).' }, { ar: 'وسيلة بتعوّض (راديو/ملصق/تلفزيون/تواصل).', en: 'A compensating medium (radio/poster/TV/SNS).' }],
          model: { ar: 'قيد: المعلومة مابتوصلش إلا لو المستخدم دخل الموقع بنفسه. يعوّضه: إعلان تلفزيوني أو منشور على التواصل يجذب الانتباه ويوجّه الناس للموقع. (أو: الموقع محتاج إنترنت ← الراديو أو ملصق مطبوع للي مش على الإنترنت.)', en: 'Constraint: information reaches users only if they visit the site. Make up for it: a TV ad or SNS post that grabs attention and points people to the site. (Or: the site needs the Internet → radio or a printed poster for people offline.)' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. ليه بنجمع إعلان تلفزيوني وموقع وتواصل اجتماعي للترويج؟', en: '9. Why combine a TV ad, a website and SNS for promotion?' },
          points: [{ ar: 'التلفزيون وصول · الموقع تفاصيل · التواصل انتشار.', en: 'TV reach · website detail · SNS spread.' }, { ar: 'كل وسيلة بتسدّ ضعف التانية.', en: 'Each covers another’s weakness.' }],
          model: { ar: 'لأن كل وسيلة بتجيد حاجة: التلفزيون بيدّي وصول واسع وبيوجّه الناس للموقع، والموقع بيدّي التفاصيل الكاملة في أي وقت، والتواصل بينشر الخبر بالتناقل الشفهي في الاتجاهين. فالجمع بيسدّ ضعف كل وسيلة لوحدها.', en: 'Because each medium is good at something: TV gives wide reach and points people to the site, the website gives full details any time, and SNS spreads the news by word of mouth, two-way. Combining covers each medium’s weakness.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. مكتبة عايزة تعلن عن برنامج جديد وجمهورها فيه عيلات من غير إنترنت — اقترح خطة وسائط.', en: '10. A library announces a new programme; its audience includes families with no Internet — propose a media plan.' },
          points: [{ ar: 'وسيلة للي من غير إنترنت (راديو/ملصق).', en: 'A medium for offline families (radio/poster).' }, { ar: 'موقع للتفاصيل + تواصل للانتشار.', en: 'A website for detail + SNS to spread.' }],
          model: { ar: 'ملصقات مطبوعة في المكتبة والمدارس وإعلان في الراديو المحلي عشان العيلات اللي من غير إنترنت، وموقع فيه كل التفاصيل والتسجيل لمن عنده إنترنت، ومنشورات على التواصل ورسايل واتساب تنشر الخبر وتوجّه للموقع.', en: 'Printed posters in the library and schools plus a local radio announcement for offline families, a website with all the details and sign-up for those online, and SNS posts and WhatsApp messages to spread the news and point to the site.' } } },
      ],
    },
  ],
});
