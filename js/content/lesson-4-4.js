/* =========================================================
 * content/lesson-4-4.js — عملية التحسين التكراري للمواقع
 * Pure data. Sources: textbook 4-4 (EN p.95–101) + memo (Arabic wording,
 * deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('4-4', {
  id: '4-4',
  color: '#f87171',
  cover: 'img/md-l4-cover.webp',
  title: { ar: 'عملية التحسين التكراري للمواقع', en: 'The Iterative Improvement Process for Websites' },
  guiding: { ar: 'ليه تحسين الموقع دايرة بتتكرّر مش شغلانة مرة واحدة، وإزاي الفرق بتقرّر تغيّر إيه؟', en: 'Why is improving a website a repeated loop rather than a one-time job, and how do teams decide what to change?' },
  hook: {
    ar: 'الموقع __عمره ما بيخلص__ فعلًا. النسخة الأولى مجرد __أحسن تخمين__، والفريق مابيعرفش اللي بينجح فعلًا إلا بعد ما ناس حقيقيين يستخدموه. عشان كده الفرق الشاطرة بتحسّن __في دواير__: تخطّط لتغيير، تنفّذه، تقيس النتيجة، وتتصرّف على حسب اللي اتعلمته — دي **دورة PDCA**. وبتصمّم من جانب المستخدم (**التفكير التصميمي**)، وبتختبر الاختيارات بالبيانات (**اختبار A/B**).',
    en: 'A website is __never truly finished__. The first version is only a __best guess__, and a team learns what works only after real people use it. So good teams improve __in loops__: plan a change, make it, measure the result, act on what they learn — the **PDCA cycle**. They also design from the user’s side (**design thinking**) and test real choices with data (**A/B testing**).',
  },
  keyFact: { ar: 'المواقع بتتحسّن عن طريق __دورات متكرّرة__: __PDCA__ (خطّط، نفّذ، تحقّق، تصرّف) بيقود التحسين المستمر؛ و__التفكير التصميمي__ بيلاقي المشاكل من جانب المستخدم؛ و__اختبار A/B__ بيقارن خيارين ببيانات حقيقية.', en: 'Websites improve through __repeated cycles__: __PDCA__ (Plan, Do, Check, Act) drives continuous improvement; __design thinking__ finds problems from the user’s side; __A/B testing__ compares two options with real data.' },
  concepts: ['PDCA cycle', 'Plan / Do / Check / Act', 'continuous improvement', 'design thinking', 'prototype', 'A/B testing'],
  objectives: [
    { ar: 'أشرح دورة PDCA وخطوات التفكير التصميمي كطرق لتحسين الموقع.', en: 'Explain the PDCA cycle and the steps of design thinking as ways of improving a website.' },
    { ar: 'أوصف إزاي اختبار A/B بيقارن خيارين ببيانات حقيقية، وأشرح ليه التحسين بيتكرّر في دورات.', en: 'Describe how A/B testing compares two options using real data, and explain why improvement is repeated in cycles.' },
  ],

  stations: [
    /* ───────────── 1 · PDCA ───────────── */
    {
      id: 'pdca', kind: 'learn',
      title: { ar: 'دورة PDCA', en: 'The PDCA cycle' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'موقع نادي المدرسة قليلين اللي بيسجّلوا فيه… تعمل إيه؟', en: 'Few students sign up on the club’s page… what do you do?' },
            options: [
              { emoji: '💥', text: { ar: 'أغيّر كل حاجة مرة واحدة', en: 'Change everything at once' } },
              { emoji: '🔁', text: { ar: 'أغيّر حاجة واحدة وأقيس وأكرّر', en: 'Change one thing, measure, repeat' } },
              { emoji: '🙈', text: { ar: 'أسيبه زي ما هو', en: 'Leave it as it is' } },
            ],
            after: { ar: 'تعالى نشوف الطريقة اللي الفرق المحترفة بتستخدمها 👇', en: 'Let’s see the method professional teams use 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: دورة PDCA بتلف… والموقع بيتحسّن', en: '🎞️ Animation: the PDCA cycle turns… and the site improves' },
          enTitle: 'The PDCA cycle',
          terms: ['PDCA cycle', 'Plan', 'Do', 'Check', 'Act', 'continuous improvement'],
          visual: { anim: 'improveMovie', props: { scenes: [0, 4] } },
          beats: [
            { ar: '🔁 الموقع __عمره ما بيخلص__: النسخة الأولى __أحسن تخمين__. **دورة PDCA** = طريقة بتدفع التحسين __باستمرار__ بتكرار أربع خطوات — وبتستخدم في مجالات كتير زي __تحسين الأعمال وإدارة الجودة__، مش المواقع بس.', en: '🔁 A website is __never finished__: version one is a __best guess__. The **PDCA cycle** advances improvement __continuously__ by repeating four steps — used widely in __business improvement and quality management__, not just websites.' },
            { ar: '**P · خطّط (Plan):** __نحدّد هدف ونعمل خطة للتحسين__ — مثال: هدف «__نقلّل معدل الارتداد 10%__» ونخطّط لإعادة تصميم الصفحة الرئيسية.', en: '**P · Plan:** __set a goal and plan the improvement__ — e.g. the goal "__reduce the bounce rate by 10%__" and plan a homepage redesign.' },
            { ar: '**D · نفّذ (Do):** __ننفّذ حسب الخطة__ — نغيّر تصميم الصفحة الرئيسية.', en: '**D · Do:** __carry out the plan__ — change the homepage design.' },
            { ar: '**C · تحقّق (Check):** __نقيس النتايج ونقيّم قد إيه حقّقنا الهدف__ — نقيس معدل الارتداد بعد التغيير ونقارنه بالهدف (10%).', en: '**C · Check:** __measure the results and evaluate how far the goal was met__ — measure the bounce rate after the change against the goal (10%).' },
            { ar: '**A · تصرّف (Act):** __على حسب التقييم نفكّر في التحسين الجاي__ — لو الأثر كفاية نكمّل، ولو لأ نراجع العناوين أو مكان الصور… ونرجع لـ«خطّط» تاني. ⚠️ المهم __مش إننا نخلّص في جولة واحدة__ لكن __نتحسّن تدريجيًا بالتكرار__.', en: '**A · Act:** __based on the evaluation, decide the next improvement__ — if the effect is enough, continue; if not, revise headings or image placement… and back to "Plan". ⚠️ The point is __not finishing in one round__ but __improving gradually through repetition__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل خطوة في تحسين الموقع بخطوتها في PDCA:', en: 'Match each website step with its PDCA step:' },
            left: [
              { ar: 'نقيس معدل الارتداد بعد التغيير', en: 'Measure the bounce rate after the change' },
              { ar: 'نحدّد هدف تقليل الارتداد 10%', en: 'Set the goal of cutting bounce by 10%' },
              { ar: 'نفكّر في تحسين تاني', en: 'Consider another improvement' },
              { ar: 'نغيّر تصميم الصفحة الرئيسية', en: 'Change the homepage design' },
            ],
            right: [{ ar: 'خطّط (Plan)', en: 'Plan' }, { ar: 'نفّذ (Do)', en: 'Do' }, { ar: 'تحقّق (Check)', en: 'Check' }, { ar: 'تصرّف (Act)', en: 'Act' }],
            answer: [2, 0, 3, 1],
            explain: { ar: 'الهدف = خطّط · التغيير = نفّذ · القياس = تحقّق · الخطوة الجاية = تصرّف.', en: 'Goal = Plan · change = Do · measure = Check · next step = Act.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'دورة PDCA بتخلص بعد تنفيذ واحد.', en: 'The PDCA cycle is complete after one execution.' }, answer: false, explain: { ar: 'معناها في __التكرار__.', en: 'Its meaning is in __repetition__.' } },
            { text: { ar: 'PDCA بتستخدم كمان في إدارة الجودة وتحسين الأعمال.', en: 'PDCA is also used in quality management and business improvement.' }, answer: true },
            { text: { ar: 'خطوة «تحقّق» هي اللي بتقول لك التغيير نجح ولا لأ.', en: 'The Check step tells you whether the change worked.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**PDCA:** خطّط (هدف + خطة) ← نفّذ ← تحقّق (قِس) ← تصرّف (قرّر الجاي) ← وتاني.', en: '**PDCA:** Plan (goal + plan) → Do → Check (measure) → Act (decide next) → again.' },
            { ar: '**المهم:** التحسّن التدريجي بالتكرار — مش الكمال في جولة واحدة.', en: '**The point:** gradual improvement by repetition — not perfection in one round.' },
            { ar: 'بتستخدم في **تحسين الأعمال وإدارة الجودة** كمان.', en: 'Also used in **business improvement and quality management**.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · design thinking + A/B testing ───────────── */
    {
      id: 'design', kind: 'learn',
      title: { ar: 'التفكير التصميمي واختبار A/B', en: 'Design thinking and A/B testing' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: من المستخدم… للبيانات', en: '🎞️ Animation: from the user… to the data' },
          enTitle: 'Design thinking and A/B testing',
          terms: ['design thinking', 'empathize', 'define', 'ideate', 'prototype', 'test', 'A/B testing'],
          visual: { anim: 'improveMovie', props: { scenes: [5, 9] } },
          beats: [
            { ar: '🧠 **التفكير التصميمي:** طريقة تفكير بتوصّلنا لـ__اكتشاف المشاكل وتوليد الحلول من منظور المستخدم__، في خمس خطوات: **① التعاطف** — نحط نفسنا مكان المستخدم ونفهم تحدياته واحتياجاته · **② التعريف** — من اللي فهمناه نوضّح المشكلة اللي هنحلّها.', en: '🧠 **Design thinking:** a way of thinking that leads to __discovering problems and generating solutions from the user’s perspective__, in five steps: **① Empathize** — put yourself in the user’s position and understand their challenges and needs · **② Define** — clarify the problem to solve.' },
            { ar: '**③ توليد الأفكار** — نطلّع __أفكار كتير__ للحل · **④ النموذج الأولي** — نعمل __نموذج سريع__ من الأفكار · **⑤ الاختبار** — المستخدمين __يجرّبوه__ وناخد ملاحظاتهم. ↩️ وعلى حسب النتيجة __ممكن نرجع للتعاطف أو التعريف__ — التحسين __رايح جاي__ مش في اتجاه واحد.', en: '**③ Ideate** — generate __many ideas__ · **④ Prototype** — build a __quick prototype__ · **⑤ Test** — users __try it__ and give feedback. ↩️ Based on the results __we may go back to empathize or define__ — improvement moves __back and forth__, not one-way.' },
            { ar: '🅰️🅱️ **اختبار A/B:** نجهّز __نمطين__ (الخيار A والخيار B)، ونعرض كل واحد على __مستخدمين حقيقيين__، ونفحص __البيانات__ عشان نعرف أنهي أكتر فاعلية. مثال: زرار شراء __أحمر (A)__ مقابل __أزرق (B)__ — أنهي بيتداس أكتر؟', en: '🅰️🅱️ **A/B testing:** prepare __two patterns__ (option A and option B), show each to __real users__, and examine __the data__ to see which is more effective. e.g. a __red (A)__ vs __blue (B)__ buy button — which gets clicked more?' },
            { ar: '🔑 **قواعد اختبار A/B:** ① __غيّر عنصر واحد بس في المرة__ — لو غيّرت كذا حاجة مش هتعرف أنهي تغيير عمل الأثر ② __قرّر بعد ما تجمع بيانات كفاية__. ⚠️ «نغيّر كذا عنصر مع بعض» ← طريقة __غلط__.', en: '🔑 **A/B rules:** ① __change only one element at a time__ — change several and you cannot tell which one made the effect ② __decide only after collecting enough data__. ⚠️ "change several elements together" → a __wrong__ practice.' },
            { ar: '📌 **الخلاصة:** حسّن في دواير — **PDCA** للتحسين المستمر (__إزاي نكرّر__) · **التفكير التصميمي** (تعاطف، تعريف، أفكار، نموذج، اختبار) من جانب المستخدم (__نحسّن إيه__) · **اختبار A/B** يحسم تغيير واحد بالبيانات (__أنهي خيار__).', en: '📌 **The point:** improve in loops — **PDCA** for continuous improvement (__how we repeat__) · **design thinking** (empathize, define, ideate, prototype, test) from the user’s side (__what to improve__) · **A/B testing** settles one change with data (__which option__).' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'ترتيب التفكير التصميمي: __تعاطف ← تعريف ← توليد أفكار ← نموذج أولي ← اختبار__. و«التفكير التصميمي من منظور المطوّر» ← __غلط__ (المستخدم).', en: 'Design-thinking order: __empathize → define → ideate → prototype → test__. "Design thinking takes the developer’s view" → __false__ (the user’s).' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — ليه دواير صغيرة؟', en: 'Deep dive — why small loops?' }, text: { ar: 'لو غيّرت كل حاجة مرة واحدة والموقع اتحسّن أو باظ، مش هتعرف أنهي تغيير عمل كده. الدورة الصغيرة __بتعزل السبب وبتقلّل المخاطرة__. التفكير التصميمي بيقول __نحسّن إيه وليه__، وPDCA بيخلّيه __دورة مقيسة__، واختبار A/B بيحسم __تغيير واحد__ جوّه «نفّذ/تحقّق» — غيّر لون الزرار بس، فأي فرق في الضغطات سببه اللون لوحده.', en: 'Change everything at once and if the site improves or breaks, you cannot tell which change did it. A small loop __isolates the cause and cuts risk__. Design thinking says __what to improve and why__, PDCA makes it a __measured loop__, and A/B testing settles __one change__ inside Do/Check — change only the button color, so any click difference is due to color alone.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'order', prompt: { ar: 'رتّب خطوات التفكير التصميمي:', en: 'Order the steps of design thinking:' },
            items: [
              { ar: 'التعاطف', en: 'Empathize' }, { ar: 'التعريف', en: 'Define' }, { ar: 'توليد الأفكار', en: 'Ideate' }, { ar: 'النموذج الأولي', en: 'Prototype' }, { ar: 'الاختبار', en: 'Test' },
            ],
            explain: { ar: 'تعاطف ← تعريف ← أفكار ← نموذج ← اختبار (وممكن نرجع).', en: 'Empathize → define → ideate → prototype → test (and we may loop back).' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'متجر عايز يعرف لون زرار «اشترِ» الأحسن بـ A/B. يعمل إيه؟', en: 'A shop wants the best "Buy" button color via A/B testing. What should it do?' },
            options: [
              { ar: 'يغيّر اللون بس، ويستنى بيانات كفاية قبل ما يقرّر', en: 'Change only the color and wait for enough data before deciding' },
              { ar: 'يغيّر اللون والكلام والمكان مع بعض عشان يوفّر وقت', en: 'Change color, text and position together to save time' },
              { ar: 'يقرّر بعد أول عشر ضغطات علشان النتيجة تبان بسرعة', en: 'Decide after the first ten clicks so results come fast' },
              { ar: 'يسأل المصمّم بس عن اللون اللي يعجبه من غير بيانات', en: 'Just ask the designer which color he likes, no data' },
            ],
            answer: 0,
            explain: { ar: '__عنصر واحد__ + __بيانات كفاية__.', en: '__One element__ + __enough data__.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**التفكير التصميمي:** من منظور المستخدم · تعاطف ← تعريف ← أفكار ← نموذج ← اختبار · رايح جاي.', en: '**Design thinking:** the user’s perspective · empathize → define → ideate → prototype → test · back and forth.' },
            { ar: '**اختبار A/B:** نمطين على مستخدمين حقيقيين + بيانات · __عنصر واحد__ في المرة · __بيانات كفاية__.', en: '**A/B testing:** two patterns on real users + data · __one element__ at a time · __enough data__.' },
            { ar: '**PDCA** إزاي نكرّر · **التفكير التصميمي** نحسّن إيه · **A/B** أنهي خيار.', en: '**PDCA** how to repeat · **design thinking** what to improve · **A/B** which option.' },
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
            { text: { ar: 'A) دورة PDCA طريقة بتكرّر الأربع خطوات خطّط ← نفّذ ← تحقّق ← تصرّف.', en: 'A) The PDCA cycle repeats Plan → Do → Check → Act.' }, answer: true },
            { text: { ar: 'B) التفكير التصميمي بيحلّ المشاكل من منظور المطوّر.', en: 'B) Design thinking solves problems from the developer’s perspective.' }, answer: false },
            { text: { ar: 'C) في اختبار A/B مهم نغيّر عنصر واحد بس في المرة.', en: 'C) In A/B testing, change only one element at a time.' }, answer: true },
            { text: { ar: 'D) دورة PDCA بتخلص بعد تنفيذ واحد.', en: 'D) The PDCA cycle is complete after one execution.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) تعريف صحيح لـ PDCA ← **✓**.', en: 'A) Correct definition of PDCA → **✓**.' },
            { ar: 'B) التفكير التصميمي من منظور __المستخدم__ ← **✗**.', en: 'B) Design thinking takes __the user’s__ perspective → **✗**.' },
            { ar: 'C) مهم نحصر التغيير في عنصر واحد ← **✓**.', en: 'C) Limit the change to one element → **✓**.' },
            { ar: 'D) PDCA ليها معنى لما __تتكرّر__ ← **✗**.', en: 'D) PDCA is meaningful when __repeated__ → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) كل بند (a–e) بيقابل أنهي خطوة من التفكير التصميمي (A–E)؟', en: '(2) Which design-thinking step (A–E) matches each item (a–e)?' },
            left: [
              { ar: 'a) نفهم تحديات المستخدم واحتياجاته', en: 'a) Understand the user’s challenges and needs' },
              { ar: 'b) نوضّح المشكلة اللي هنحلّها', en: 'b) Clarify the problem to be solved' },
              { ar: 'c) نطلّع أفكار كتير', en: 'c) Generate many ideas' },
              { ar: 'd) نعمل نموذج أولي بسرعة', en: 'd) Quickly create a prototype' },
              { ar: 'e) المستخدمين يجرّبوا النموذج', en: 'e) Have users try the prototype' },
            ],
            right: [{ ar: 'A التعاطف', en: 'A Empathize' }, { ar: 'B التعريف', en: 'B Define' }, { ar: 'C توليد الأفكار', en: 'C Ideate' }, { ar: 'D النموذج الأولي', en: 'D Prototype' }, { ar: 'E الاختبار', en: 'E Test' }],
            answer: [0, 1, 2, 3, 4] },
          solution: [
            { ar: 'a: فهم المستخدم = **التعاطف** ← A · b: توضيح المشكلة = **التعريف** ← B.', en: 'a: understanding the user = **empathize** → A · b: clarifying = **define** → B.' },
            { ar: 'c: أفكار كتير = **توليد الأفكار** ← C · d: نموذج سريع = **النموذج الأولي** ← D.', en: 'c: many ideas = **ideate** → C · d: quick draft = **prototype** → D.' },
            { ar: 'e: المستخدمين يجرّبوا = **الاختبار** ← E.', en: 'e: users try it = **test** → E.' },
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
            { q: { ar: '1. طريقة التحسين اللي بتكرّر خطّط ← نفّذ ← تحقّق ← تصرّف؟', en: '1. The improvement method repeating Plan → Do → Check → Act?' }, a: { ar: 'دورة PDCA', en: 'PDCA cycle' } },
            { q: { ar: '2. طريقة التفكير لاكتشاف المشاكل وتوليد الحلول من منظور المستخدم؟', en: '2. The way of thinking that finds problems and solutions from the user’s view?' }, a: { ar: 'التفكير التصميمي', en: 'Design thinking' } },
            { q: { ar: '3. طريقة تجهيز نمطين ومقارنتهم بالبيانات؟', en: '3. Preparing two patterns and comparing them with data?' }, a: { ar: 'اختبار A/B', en: 'A/B testing' } },
            { q: { ar: '4. خطوات التفكير التصميمي الخمسة بالترتيب؟', en: '4. The five steps of design thinking in order?' }, a: { ar: 'التعاطف ← التعريف ← توليد الأفكار ← النموذج الأولي ← الاختبار', en: 'Empathize → Define → Ideate → Prototype → Test' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي بيقابل «تحقّق (Check)» في دورة PDCA:', en: 'Choose the one corresponding to "Check" in PDCA:' },
            options: [
              { ar: 'نحدّد هدف تقليل معدل الارتداد 10%', en: 'Set the goal of reducing the bounce rate by 10%' },
              { ar: 'نغيّر تصميم الصفحة الرئيسية', en: 'Change the design of the homepage' },
              { ar: 'نقيس معدل الارتداد بعد التغيير', en: 'Measure the bounce rate after the change' },
              { ar: 'نفكّر في إجراء تحسين تاني', en: 'Consider another improvement measure' },
            ],
            fixedOrder: true,
            answer: 2,
            explain: { ar: 'A خطّط · B نفّذ · __C تحقّق__ · D تصرّف.', en: 'A Plan · B Do · __C Check__ · D Act.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي __مش__ طريقة مناسبة لإجراء اختبار A/B:', en: 'Choose the one that is **NOT** an appropriate way to run an A/B test:' },
            options: [
              { ar: 'نجهّز نمطين ونقارنهم', en: 'Prepare two patterns and compare them' },
              { ar: 'نغيّر كذا عنصر في نفس الوقت', en: 'Change multiple elements at the same time' },
              { ar: 'نقرّر بعد ما نجمع بيانات كفاية', en: 'Decide only after collecting enough data' },
              { ar: 'نعرض كل نمط على مستخدمين حقيقيين', en: 'Show each pattern to actual users' },
            ],
            fixedOrder: true,
            answer: 1,
            explain: { ar: 'تغيير كذا عنصر مايخلّيكش تعرف أنهي اللي أثّر.', en: 'Changing several elements hides which one made the effect.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(f):', en: 'Read and fill blanks (a)–(f):' },
            text: { ar: 'من طرق تحسين المواقع دورة {0}، وبتكرّر أربع خطوات: {1} بنحدّد فيها الأهداف؛ و{2} بننفّذ فيها الخطة؛ و{3} بنقيس فيها النتايج؛ و{4} بندرس فيها إجراءات التحسين. وكمان {5}، اللي بنجهّز فيها نمطين ونقارنهم بالبيانات، طريقة مفيدة.', en: 'One method for improving websites is the {0} cycle, repeating four steps: {1}, where goals are set; {2}, where the plan is executed; {3}, where results are measured; and {4}, where improvement measures are considered. Also {5}, preparing two patterns and comparing them with data, is useful.' },
            bank: [{ ar: 'PDCA', en: 'PDCA' }, { ar: 'خطّط', en: 'Plan' }, { ar: 'نفّذ', en: 'Do' }, { ar: 'تحقّق', en: 'Check' }, { ar: 'تصرّف', en: 'Act' }, { ar: 'اختبار A/B', en: 'A/B testing' }, { ar: 'المخطط الهيكلي', en: 'wireframe' }],
            answer: [0, 1, 2, 3, 4, 5],
            explain: { ar: '(a) PDCA (b) خطّط (c) نفّذ (d) تحقّق (e) تصرّف (f) اختبار A/B.', en: '(a) PDCA (b) Plan (c) Do (d) Check (e) Act (f) A/B testing.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب للتفكير التصميمي:', en: 'Choose the best description of design thinking:' },
            options: [
              { ar: 'طريقة بتحلّل استخدام الموقع كله ببيانات عددية وإحصاءات', en: 'A method analyzing all site usage with numbers and statistics' },
              { ar: 'تفكير بيكتشف المشاكل ويولّد حلول من منظور المستخدم', en: 'Thinking that finds problems and solutions from the user’s view' },
              { ar: 'خبراء بيحدّدوا مشاكل واجهة المستخدم بقواعد عملية', en: 'Experts identifying user-interface problems by rules of thumb' },
              { ar: 'عمل مخطّط بيوضّح تخطيط صفحة الويب تقريبًا من غير ألوان', en: 'Creating a rough colorless blueprint of a page layout' },
            ],
            answer: 1,
            explain: { ar: 'A كمّي · C إرشادي · D مخطط هيكلي · __B تفكير تصميمي__.', en: 'A quantitative · C heuristic · D wireframe · __B design thinking__.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب لمفهوم عملية تحسين الموقع:', en: 'Choose the best description of the website improvement process:' },
            options: [
              { ar: 'لو الموقع اتبنى مثالي من الأول مش محتاج أي تحسين', en: 'If the site is built perfectly at first, no improvement is needed' },
              { ar: 'يكفي إننا نحسّن الشكل والتصميم البصري بس من غير حاجة تانية', en: 'It is enough to improve only the visual design, nothing else' },
              { ar: 'المهم نتحسّن تدريجيًا بتكرار التقييم والتحسين', en: 'Improve gradually by repeating evaluation and improvement' },
              { ar: 'كل التحسينات لازم تتعمل باختبار A/B لوحده من غير أي طريقة تانية', en: 'All improvements should be done by A/B testing alone, nothing else' },
            ],
            answer: 2,
            explain: { ar: 'التحسين = __تكرار التقييم والتحسين__ تدريجيًا.', en: 'Improvement = __repeating evaluation and improvement__ gradually.' } },
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
          { front: { ar: 'دورة PDCA', en: 'PDCA cycle' }, back: { ar: 'خطّط ← نفّذ ← تحقّق ← تصرّف، وبتتكرّر.', en: 'Plan → Do → Check → Act, repeated.' } },
          { front: { ar: 'التحسين المستمر', en: 'Continuous improvement' }, back: { ar: 'نتحسّن شوية في كل مرة.', en: 'Getting better a little at a time.' } },
          { front: { ar: 'التفكير التصميمي', en: 'Design thinking' }, back: { ar: 'حل من منظور المستخدم: تعاطف، تعريف، أفكار، نموذج، اختبار.', en: 'Solving from the user’s view: empathize, define, ideate, prototype, test.' } },
          { front: { ar: 'النموذج الأولي', en: 'Prototype' }, back: { ar: 'مسوّدة سريعة ينفع نختبرها.', en: 'A quick, testable draft.' } },
          { front: { ar: 'اختبار A/B', en: 'A/B testing' }, back: { ar: 'نمطين على مستخدمين حقيقيين + بيانات · عنصر واحد · بيانات كفاية.', en: 'Two patterns on real users + data · one element · enough data.' } },
          { front: { ar: 'التكرار (Iterate)', en: 'Iterate' }, back: { ar: 'نعيد الدورة عشان نتحسّن.', en: 'Repeat the loop to improve.' } },
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
            prompt: { ar: 'اشرح ليه فريق موقع بيحسّن في دورات PDCA متكرّرة بدل ما يحاول يبني موقع مثالي مرة واحدة. (أشِر إلى: قياس النتايج والتصرّف على أساسها)', en: 'Explain why a website team improves in repeated PDCA cycles instead of building a perfect site in one go. (Refer to: measuring results and acting on them)' },
            points: [
              { ar: 'النسخة الأولى تخمين — مانعرفش اللي بينجح إلا بعد الاستخدام.', en: 'Version one is a guess — what works is known only after use.' },
              { ar: 'تحقّق: نقيس النتيجة ونقارنها بالهدف.', en: 'Check: measure the result against the goal.' },
              { ar: 'تصرّف: نكمّل أو نعدّل… ودورات صغيرة بتعزل السبب وتقلّل المخاطرة.', en: 'Act: keep or adjust… small loops isolate the cause and cut risk.' },
            ],
            model: { ar: 'مستحيل نعرف الموقع المثالي من الأول، لأن النسخة الأولى مجرد أحسن تخمين، وماحدّش يعرف اللي بينجح إلا بعد ما ناس حقيقيين يستخدموه. في دورة PDCA بنحدّد هدف (مثلًا نقلّل الارتداد 10%)، وننفّذ تغيير، وبعدين في خطوة «تحقّق» __نقيس النتيجة__ ونقارنها بالهدف، وفي «تصرّف» __نقرّر على أساسها__: لو كفاية نكمّل، ولو لأ نعدّل حاجة تانية ونرجع نخطّط. ولو غيّرنا كل حاجة مرة واحدة مش هنعرف أنهي تغيير نفع وأنهي ضرّ، لكن الدورات الصغيرة المتكرّرة بتعزل السبب وبتقلّل المخاطرة — فالموقع بيتحسّن تدريجيًا وبشكل مضمون.', en: 'Nobody can know the perfect site from the start: version one is only a best guess, and what works becomes clear only after real people use it. In a PDCA cycle we set a goal (e.g. cut bounce by 10%), make a change, then in "Check" we __measure the result__ against the goal, and in "Act" we __decide based on it__: keep it if it is enough, otherwise adjust something else and plan again. If we changed everything at once we could not tell which change helped or hurt; small repeated loops isolate the cause and reduce risk — so the site improves gradually and reliably.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — صفحة فعالية النادي', en: 'Think as an engineer — club event page' },
            prompt: { ar: 'نادي مدرستك بيدير صفحة لفعاليته السنوية بس قليلين اللي بيسجّلوا منها. قود جولة تحسين واحدة بـ PDCA: ١) (تحقّق الأول) حدّد رقم تقدر تقيسه دلوقتي — مثلًا كام واحد من عشرة يلاقي لينك «سجّل» في 5 ثواني. ٢) (خطّط) سمِّ أكبر عائق لفئة معيّنة (طالب على شاشة موبايل صغيرة) وخطّط لتغيير واحد يصلّحه، والهدف رقم. ٣) (نفّذ، تحقّق، تصرّف) اوصف إزاي هتنفّذ وتقيس تاني وتقرّر، واختار عنصر واحد تحسمه بـ A/B وقول ليه عنصر واحد بس.', en: 'Your club’s event page gets few sign-ups. Lead one PDCA round: 1) (Check first) pick a number you can measure now — e.g. how many of ten find "Sign up" within five seconds. 2) (Plan) name the biggest obstacle for a group (a student on a small phone) and plan one fix, with a numeric goal. 3) (Do, Check, Act) describe doing it, measuring again and deciding; choose one element to settle with an A/B test and say why only one.' },
            points: [
              { ar: 'رقم بداية مقيس.', en: 'A measured starting number.' },
              { ar: 'عائق + تغيير واحد + هدف رقمي.', en: 'An obstacle + one change + a numeric goal.' },
              { ar: 'نفّذ/قِس/قرّر + A/B بعنصر واحد وسببه.', en: 'Do/measure/decide + one-element A/B with the reason.' },
            ],
            model: { ar: '١) قست: 3 من 10 بس لقوا «سجّل» في 5 ثواني. ٢) أكبر عائق: على الموبايل الصغير زرار «سجّل» تحت آخر الصفحة. التغيير: أحط الزرار فوق كبير وواضح. الهدف: 8 من 10 يلاقوه في 5 ثواني. ٣) أنفّذ التغيير، وأعيد نفس الاختبار مع 10 تانيين (تحقّق)؛ لو وصلنا 8 من 10 أكمّل (تصرّف)، ولو لأ أراجع لون الزرار أو كلامه وأبدأ دورة جديدة. وبعدين أعمل اختبار A/B على __لون الزرار بس__ (أخضر ضد برتقالي) — عنصر واحد علشان أي فرق في التسجيل يبقى سببه اللون لوحده.', en: '1) Measured: only 3 of 10 found "Sign up" in five seconds. 2) Biggest obstacle: on small phones the button sits at the bottom. Change: put a large, clear button at the top. Goal: 8 of 10 find it in five seconds. 3) Make the change, repeat the same test with 10 others (Check); if we reach 8 of 10, keep it (Act); if not, revise the button’s color or text and start a new loop. Then run an A/B test on __the button color only__ (green vs orange) — one element so any sign-up difference is due to the color alone.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'متجر أونلاين لقى إن زرار «اشترِ» نادرًا ما بيتداس. اوصف إزاي تستخدم اختبار A/B واحد (بتغيير عنصر واحد) ودورة PDCA واحدة لتحسينه، وأنهي رقم هيقول لك إنه نجح.', en: 'An online shop finds its "buy" button rarely clicked. Describe one A/B test (one element) and one PDCA loop to improve it, and which number tells you it worked.' },
            points: [{ ar: 'A/B: عنصر واحد (لون/كلام) على مستخدمين حقيقيين.', en: 'A/B: one element (color/text) on real users.' }, { ar: 'PDCA: هدف ← تغيير ← قياس ← قرار.', en: 'PDCA: goal → change → measure → decide.' }, { ar: 'الرقم: نسبة الضغط/معدل التحويل.', en: 'The number: click rate/conversion rate.' }],
            model: { ar: 'خطّط: هدف «نرفع نسبة الضغط على اشترِ من 2% لـ 4%». نفّذ: اختبار A/B — النسخة A الزرار الحالي، والنسخة B نفس الزرار بس بلون برتقالي (عنصر واحد)، ونعرضهم على زوّار حقيقيين. تحقّق: بعد بيانات كفاية نقارن نسبة الضغط (ومعدل التحويل). تصرّف: لو B أحسن نعتمده، ولو لأ نجرّب عنصر تاني (زي كلمة الزرار) في دورة جديدة. الرقم اللي يقول نجح: __نسبة الضغط على الزرار / معدل التحويل__.', en: 'Plan: goal "raise buy-button clicks from 2% to 4%". Do: an A/B test — version A the current button, version B the same button in orange (one element), shown to real visitors. Check: after enough data, compare click rates (and conversion rate). Act: adopt B if better; otherwise try another element (e.g. the button text) in a new loop. The number that shows success: __the button click rate / conversion rate__.' } },
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
            prompt: { ar: 'أنهي خطوة في PDCA بتقول لك التغيير نجح فعلًا؟ وفي اختبار A/B ليه بنغيّر عنصر واحد بس في المرة؟', en: 'Which PDCA step tells you whether your change worked? In A/B testing, why change only one element at a time?' },
            points: [{ ar: 'تحقّق (Check).', en: 'Check.' }, { ar: 'عشان نعرف أنهي تغيير عمل الأثر.', en: 'To know which change caused the effect.' }],
            model: { ar: 'خطوة __تحقّق__ لأننا بنقيس النتيجة ونقارنها بالهدف. وفي A/B بنغيّر عنصر واحد بس، لأننا لو غيّرنا كذا حاجة مش هنعرف أنهي فيهم اللي عمل الفرق.', en: 'The __Check__ step, because we measure the result against the goal. In A/B testing we change one element only, because if we changed several we could not tell which one made the difference.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: فكّر في موقع بتستخدمه كتير — أنهي تغيير صغير تفتكر هيفيد أكتر، وهتقيس إنه نجح إزاي؟ تحدّى: مسموح لك اختبار A/B واحد بس الشهر ده على صفحة الفعالية — اختار العنصر، وتوقّع أنهي خيار هيكسب وليه، وأنهي رقم هيثبت إنك صح أو غلط.', en: 'Reflect: for a site you use often, which small change would help most, and how would you measure it? Challenge: one A/B test this month on the event page — choose the element, predict the winner and why, and name the number that proves you right or wrong.' },
            points: [{ ar: 'تغيير صغير + طريقة قياس.', en: 'A small change + a measure.' }, { ar: 'عنصر + توقّع + رقم.', en: 'An element + a prediction + a number.' }],
            model: { ar: 'في تطبيق المدرسة: أحط لينك «الواجبات» فوق في الصفحة الرئيسية، وأقيس الوقت اللي الطالب بياخده يوصل للواجب. التحدّي: أختبر كلمة الزرار بس — «سجّل» ضد «احجز مكانك» — وأتوقّع «احجز مكانك» يكسب لأنها بتحسّس الطالب إن الأماكن محدودة. الرقم: نسبة اللي بيدوسوا ويكمّلوا التسجيل لكل نسخة بعد بيانات كفاية.', en: 'In the school app: put the "Homework" link at the top of the home page and measure how long a student takes to reach it. Challenge: test only the button wording — "Sign up" vs "Book your place" — and predict "Book your place" wins because it suggests limited places. The number: the share who click and finish signing up for each version, after enough data.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '4-4', seconds: 60, items: [
          { text: { ar: 'PDCA = خطّط، نفّذ، تحقّق، تصرّف', en: 'PDCA = Plan, Do, Check, Act' }, answer: true },
          { text: { ar: 'PDCA بتخلص في جولة واحدة', en: 'PDCA ends after one round' }, answer: false },
          { text: { ar: 'تحديد الهدف = خطّط', en: 'Setting the goal = Plan' }, answer: true },
          { text: { ar: 'قياس الارتداد بعد التغيير = نفّذ', en: 'Measuring bounce after the change = Do' }, answer: false },
          { text: { ar: 'قياس النتيجة = تحقّق', en: 'Measuring the result = Check' }, answer: true },
          { text: { ar: 'التفكير التصميمي من منظور المستخدم', en: 'Design thinking takes the user’s view' }, answer: true },
          { text: { ar: 'التفكير التصميمي في اتجاه واحد بس', en: 'Design thinking goes one way only' }, answer: false },
          { text: { ar: 'أول خطوة في التفكير التصميمي التعاطف', en: 'The first design-thinking step is empathize' }, answer: true },
          { text: { ar: 'النموذج الأولي = مسوّدة سريعة', en: 'A prototype = a quick draft' }, answer: true },
          { text: { ar: 'في A/B نغيّر كذا عنصر مع بعض', en: 'In A/B we change several elements together' }, answer: false },
          { text: { ar: 'A/B محتاج بيانات كفاية', en: 'A/B needs enough data' }, answer: true },
          { text: { ar: 'A/B بيتعرض على مستخدمين حقيقيين', en: 'A/B is shown to real users' }, answer: true },
          { text: { ar: 'الموقع المثالي مش محتاج تحسين', en: 'A perfect site needs no improvement' }, answer: false },
          { text: { ar: 'PDCA بتستخدم في إدارة الجودة', en: 'PDCA is used in quality management' }, answer: true },
          { text: { ar: 'الاختبار آخر خطوة في التفكير التصميمي', en: 'Test is the last design-thinking step' }, answer: true },
          { text: { ar: 'تحسين الشكل البصري بس يكفي', en: 'Improving only visuals is enough' }, answer: false },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 4-4', en: 'Lesson 4-4 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. «قياس معدل الارتداد بعد التغيير» بيقابل أنهي خطوة في PDCA؟', en: '1. "Measure the bounce rate after the change" = which PDCA step?' }, options: [{ ar: 'P — خطوة خطّط', en: 'P — the Plan step' }, { ar: 'D — خطوة نفّذ', en: 'D — the Do step' }, { ar: 'C — خطوة تحقّق', en: 'C — the Check step' }, { ar: 'A — خطوة تصرّف', en: 'A — the Act step' }], fixedOrder: true, answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. أنهي واحدة __مش__ طريقة صحيحة لاختبار A/B؟', en: '2. Which is NOT a correct A/B testing practice?' }, options: [{ ar: 'نجهّز نمطين ونقارنهم', en: 'Prepare two patterns and compare' }, { ar: 'نغيّر كذا عنصر مع بعض', en: 'Change several elements at once' }, { ar: 'نقرّر بعد بيانات كفاية', en: 'Decide after enough data' }, { ar: 'نعرض كل نمط على مستخدمين', en: 'Show each pattern to real users' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. الوصف الأنسب للتفكير التصميمي؟', en: '3. Best description of design thinking?' }, options: [{ ar: 'تحليل استخدام الموقع كله ببيانات عددية', en: 'Analyzing all site usage with numerical data' }, { ar: 'نكتشف المشاكل ونولّد حلول من منظور المستخدم', en: 'Finding problems and solutions from the user’s view' }, { ar: 'خبراء بيفحصوا واجهة المستخدم بقواعد عملية', en: 'Experts checking the user interface by rules of thumb' }, { ar: 'إنشاء مخطط هيكلي للصفحة كلها قبل أي ألوان', en: 'Creating a whole-page wireframe before any colors' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. دورة PDCA بتكرّر خطّط ← نفّذ ← تحقّق ← تصرّف.', en: '4. PDCA repeats Plan → Do → Check → Act.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. دورة PDCA بتخلص بعد تنفيذ واحد.', en: '5. PDCA is complete after one execution.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. في اختبار A/B بنغيّر عنصر واحد بس في المرة.', en: '6. In A/B testing, change only one element at a time.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. اذكر خطوات PDCA الأربعة ومثال لكل واحدة في تحسين موقع.', en: '7. Name the four PDCA steps with a website example each.' },
          points: [{ ar: 'خطّط: هدف تقليل الارتداد 10% · نفّذ: تغيير التصميم.', en: 'Plan: cut bounce 10% · Do: change the design.' }, { ar: 'تحقّق: قياس الارتداد · تصرّف: نكمّل أو نعدّل.', en: 'Check: measure bounce · Act: keep or adjust.' }],
          model: { ar: 'خطّط: نحدّد هدف «نقلّل معدل الارتداد 10%» ونخطّط لإعادة تصميم الصفحة الرئيسية. نفّذ: نغيّر تصميم الصفحة الرئيسية. تحقّق: نقيس معدل الارتداد بعد التغيير ونقارنه بالهدف. تصرّف: لو الأثر كفاية نكمّل، ولو لأ نفكّر في تعديل العناوين أو مكان الصور ونبدأ دورة جديدة.', en: 'Plan: set the goal "cut the bounce rate by 10%" and plan a homepage redesign. Do: change the homepage design. Check: measure the bounce rate after the change against the goal. Act: if the effect is enough, continue; if not, consider revising headings or image placement and start a new cycle.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اذكر خطوات التفكير التصميمي الخمسة بالترتيب.', en: '8. Name the five design-thinking steps in order.' },
          points: [{ ar: 'تعاطف ← تعريف ← توليد أفكار ← نموذج أولي ← اختبار.', en: 'Empathize → define → ideate → prototype → test.' }],
          model: { ar: '① التعاطف (نفهم تحديات المستخدم واحتياجاته) ② التعريف (نوضّح المشكلة) ③ توليد الأفكار (أفكار كتير للحل) ④ النموذج الأولي (نموذج سريع) ⑤ الاختبار (المستخدمين يجرّبوا وياخدوا ملاحظاتهم) — وممكن نرجع للتعاطف أو التعريف.', en: '① Empathize (understand the user’s challenges and needs) ② Define (clarify the problem) ③ Ideate (many ideas) ④ Prototype (a quick draft) ⑤ Test (users try it and give feedback) — and we may go back to empathize or define.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. ليه بنغيّر عنصر واحد بس في اختبار A/B؟', en: '9. Why change only one element in an A/B test?' },
          points: [{ ar: 'لو كذا عنصر مش هنعرف أنهي عمل الأثر.', en: 'With several, we cannot tell which caused the effect.' }],
          model: { ar: 'عشان لو غيّرنا كذا عنصر مع بعض (مثلًا اللون والكلام والمكان) وطلع فرق في النتيجة، مش هنعرف أنهي تغيير اللي عمله. لما نغيّر عنصر واحد بس، أي فرق يبقى سببه العنصر ده لوحده.', en: 'Because if we change several elements together (e.g. color, text and position) and the result differs, we cannot tell which change caused it. Changing just one element means any difference is due to that element alone.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. ليه التحسين دايرة بتتكرّر مش شغلانة مرة واحدة؟', en: '10. Why is improvement a repeated loop, not a one-time job?' },
          points: [{ ar: 'النسخة الأولى تخمين — بنتعلّم من الاستخدام الحقيقي.', en: 'Version one is a guess — we learn from real use.' }, { ar: 'التحسّن التدريجي بالتكرار وبقياس النتايج.', en: 'Gradual improvement by repeating and measuring.' }],
          model: { ar: 'لأن النسخة الأولى من الموقع مجرد أحسن تخمين، وإحنا مابنعرفش اللي بينجح إلا بعد ما ناس حقيقيين يستخدموه. فبنحسّن في دورات: نخطّط وننفّذ ونقيس ونتصرّف، ونكرّر — والتحسّن التدريجي ده أحسن من انتظار إطلاق واحد مثالي.', en: 'Because the first version is only a best guess, and we learn what works only after real people use it. So we improve in loops — plan, do, measure, act, and repeat — and this gradual improvement beats waiting for one perfect launch.' } } },
      ],
    },
  ],
});
