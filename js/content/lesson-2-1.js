/* =========================================================
 * content/lesson-2-1.js — تقنيات التشفير والمصادقة
 * Pure data. Sources: textbook 2-1 (EN p.33–40) + memo (Arabic wording,
 * deep dives, "comes up in the exam", lesson test + answer key).
 * Markup: **term**  __keyword__  `code`
 * ========================================================= */
RV.lessons.add('2-1', {
  id: '2-1',
  color: '#a78bfa',
  cover: 'img/cy-l1-cover.webp',
  title: { ar: 'تقنيات التشفير والمصادقة', en: 'Cryptographic Technologies and Authentication' },
  guiding: { ar: 'إزاي تقنيات التشفير والمصادقة بتشتغل مع بعض عشان الاتصال والخدمات على الإنترنت تفضل آمنة؟', en: 'How do cryptographic technologies and authentication work together to keep online communication and services secure?' },
  hook: {
    ar: 'كل مرة بتدخل **تطبيق البنك**، أو تشتري حاجة **أونلاين**، أو تفتح موقع جنبه **قفل صغير 🔒** — فيه تقنيات مستخبية شغّالة تحميك: الرسايل __بتتشفّر__ فمحدش غيرك يقراها، والموقع __بيثبت إنه حقيقي__، و__هويتك بتتفحص__ قبل ما تدخل. من غيرها كلمات المرور ممكن تتسرق والبيانات الخاصة تتقري. بس ده __مايعنيش__ إن محتوى الموقع موثوق أو إن الحماية مطلقة.',
    en: 'Every time you open a **bank app**, buy something **online**, or visit a site with a small **padlock 🔒** — hidden technologies protect you: messages are __encrypted__ so no one else can read them, the site __proves it is genuine__, and __your identity is checked__ before access. Without them, passwords could be stolen and private data read.',
  },
  keyFact: { ar: 'الاتصال والخدمات الآمنة على الإنترنت بتعتمد على __الجمع بين التشفير والمصادقة__ — مش على تقنية واحدة لوحدها.', en: 'Secure online communication and services depend on __combining cryptography and authentication__ — not on any single technology.' },
  concepts: ['HTTPS', 'common-key cryptography', 'public-key cryptography', 'TLS handshake', 'multi-factor authentication', 'digital signature', 'digital certificate', 'non-repudiation'],
  objectives: [
    { ar: 'أشرح إزاي اتصالات HTTPS بتستخدم تقنيات مختلفة لحماية الاتصال.', en: 'Explain how HTTPS secures communication: how the TLS handshake uses public-key cryptography to share a key safely, and how common-key cryptography then protects the data.' },
    { ar: 'أميّز بين دور التشفير، والشهادات الرقمية، والمصادقة الثنائية، والتوقيعات الرقمية.', en: 'Describe how authentication, including multi-factor authentication, is used in real services, and explain why security technologies are combined.' },
    { ar: 'أقيّم طريقة مصادقة في سياق محدد، وأبرّر اختياري باستخدام متطلبات الأمان وإمكانية الوصول.', en: 'Evaluate an authentication method in a given context and justify the choice using security and accessibility needs.' },
  ],

  stations: [
    /* ───────────── 1 · how HTTPS works ───────────── */
    {
      id: 'https', kind: 'learn',
      title: { ar: 'إزاي اتصال HTTPS بيشتغل؟', en: 'How HTTPS communication works' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'فتحت موقع البنك ولقيت 🔒 جنب العنوان. تفتكر القفل ده معناه إيه؟', en: 'You open your bank’s site and see 🔒 next to the address. What do you think it means?' },
            options: [
              { emoji: '🙈', text: { ar: 'إن الموقع مقفول ومحدش يقدر يدخله', en: 'The site is closed to everyone' } },
              { emoji: '🔐', text: { ar: 'إن الاتصال مشفّر وهوية الخادم اتفحصت', en: 'The connection is encrypted and the site is verified' } },
              { emoji: '⚡', text: { ar: 'إن الموقع أسرع من غيره', en: 'The site is faster than others' } },
            ],
            after: { ar: 'تعالى نفهم الأول __نوعين التشفير__، وبعدين نشوف HTTPS بيستخدمهم إزاي 👇', en: 'First the __two kinds of encryption__, then how HTTPS uses them 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: نوعين التشفير — المتماثل والمفتاح العام', en: '🎞️ Animation: the two kinds of cryptography' },
          enTitle: 'Common-key vs public-key cryptography',
          terms: ['common-key', 'symmetric-key', 'public key', 'private key'],
          visual: { anim: 'keysMovie' },
          beats: [
            { ar: '🔑 **التشفير المتماثل:** __مفتاح واحد__ بيقفل الرسالة و__نفس المفتاح__ بيفتحها عند الطرف التاني. ميزته: __سريع جدًا__ — مناسب لـ__كميات كبيرة من البيانات__.', en: '🔑 **Common-key (symmetric) cryptography:** __one key__ locks the message and __the same key__ opens it at the other end. Strength: __very fast__ — good for __large amounts of data__.' },
            { ar: '😈 **عيبه:** المتجر لازم ياخد __نسخة من نفس المفتاح__ الأول — والمفتاح نفسه بيسافر في السكة. لو المهاجم __نسخه__، يفتح __كل الرسايل__.', en: '😈 **Its weakness:** the shop must first get __a copy of the same key__ — and the key itself travels on the way. If the attacker __copies it__, he opens __every message__.' },
            { ar: '🔓 **التشفير بالمفتاح العام:** لكل طرف مفتاحين: **مفتاح عام** (قفل مفتوح أي حد ياخده) و**مفتاح خاص** (مع صاحبه بس). اللي __يتقفل بالعام مايتفتحش غير بالخاص__ — فالمهاجم لو مسك الصندوق __مايقدرش يفتحه__. ميزته: تبعت سر __من غير ما تتفقوا على مفتاح قبل كده__.', en: '🔓 **Public-key cryptography:** each side has two keys: a **public key** (an open padlock anyone may take) and a **private key** (kept by its owner). What is __locked with the public key opens only with the private key__ — an attacker who grabs the box __cannot open it__. Strength: send a secret __with no key agreed beforehand__.' },
            { ar: '🐢 **عيبه:** المفتاح العام __بطيء نسبيًا__ على البيانات الكتير — نفس الملف الكبير بيخلص بالمتماثل في ثواني وبالعام لسه بيحمّل.', en: '🐢 **Its weakness:** public-key cryptography is __relatively slow__ on lots of data — the same big file finishes in seconds with a common key and is still crawling with a public key.' },
            { ar: '🤝 **الحل (اللي HTTPS بيعمله):** آليات المفتاح العام __للمصادقة والاتفاق الآمن على مفاتيح الجلسة__، وبعدين المتماثل __يحمي البيانات بسرعة__ ⇒ __أمان + كفاءة__.', en: '🤝 **The fix (what HTTPS does):** the public key __delivers the shared key safely__, then the common key __sends the bulk data quickly__ ⇒ __security + speed__. Textbook note: current TLS versions agree on the key with __Diffie-Hellman__ instead.' },
          ],
          notes: [
            { kind: 'confuse', title: { ar: 'فرق بيلخبط — نوعين التشفير', en: 'Easily confused — the two types' }, text: { ar: '**مفتاح عام** = زوج مفاتيح مرتبطين (عام وخاص)، أبطأ، للمصادقة والاتفاق على مفاتيح الجلسة. **مفتاح متماثل** = مفتاح واحد، سريع، لحماية بيانات الجلسة.', en: '**Public-key** = a key pair (public locks, private opens), slow, for sharing the key. **Common-key** = one key, fast, for the data.' } },
            { kind: 'tip', text: { ar: 'في **التوقيع الرقمي** الاتجاه بيتعكس: المفتاح __الخاص بيوقّع__ والعام __بيتحقّق__ — هنشوفه في الجزء التالت.', en: 'In a **digital signature** the direction reverses: the __private key signs__ and the public key __verifies__ — coming in part 3.' } },
            { kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: HTTPS مشهد بمشهد', en: '🎞️ Full animation: HTTPS scene by scene' },
          enTitle: 'HTTPS, scene by scene',
          terms: ['digital certificate', 'public key', 'private key', 'session key', 'symmetric encryption'],
          visual: { anim: 'httpsMovie' },
          beats: [
            { ar: '🔒 القفل الصغير جنب عنوان موقع البنك… وراه __حوار سري__ بيحصل في أقل من ثانية. تعالوا نشوفه مشهد مشهد.', en: '🔒 The small padlock next to the bank’s address… behind it a __secret conversation__ happens in under a second. Let’s watch it scene by scene.' },
            { ar: '👀 من غير حماية: أي حد في السكة (المهاجم) يقدر __يقرأ كلمة المرور__ وهي ماشية — ده اسمه __التنصت__.', en: '👀 Without protection: anyone on the way (the attacker) can __read the password__ as it travels — that is __eavesdropping__.' },
            { ar: '✏️ ويقدر كمان __يغيّر رسالتك__ (100 تبقى 10,000) 🎭 أو __ينتحل شخصية البنك__ بموقع مزيّف.', en: '✏️ He can also __change your message__ (100 becomes 10,000) 🎭 or __pretend to be the bank__ with a fake site.' },
            { ar: '🛡️ بروتوكول __HTTPS__ بيقلّل مخاطر التلاتة: التنصت، والتعديل، والانتحال. **HTTPS = HTTP عبر اتصال TLS مؤمّن**: بيوفّر __سرية البيانات__ و__سلامتها أثناء النقل__، وبيساعد المتصفح __يتحقق من هوية الخادم واسم النطاق__. ⚠️ مش معناه إن محتوى الموقع موثوق.', en: '🛡️ The __HTTPS__ protocol stops all three: eavesdropping, tampering and impersonation. **HTTPS = HTTP + TLS encryption**: it provides __encryption__, __tamper detection__ and __verification of the other side__.' },
            { ar: 'الشخصيات: **المتصفح** = جهازك · **الخادم** = موقع البنك · **جهة إصدار الشهادات (CA)** = بتوقّع الشهادة، والمتصفح بيفحص سلسلة الثقة لحدها.', en: 'The players: **browser** = your device · **server** = the bank site · **certificate authority (CA)** = vouches that the site is real.' },
            { ar: '**المرحلة ①** الخادم بيبعت __شهادة رقمية__ 📜 + __مفتاح عام__ 🔓 (قفل مفتوح أي حد ياخده) — و__المفتاح الخاص__ 🔐 بيفضل معاه هو بس.', en: '**Stage ①** The server sends a __digital certificate__ 📜 + a __public key__ 🔓 (an open lock anyone may take) — the __private key__ 🔐 stays with it only.' },
            { ar: '**المرحلة ①** المتصفح بيتحقق من __صلاحية الشهادة__ و__سلسلة الثقة__ و__ملاءمتها لاسم الموقع__ ✅ → يبقى ده __خادم البنك الفعلي__.', en: '**Stage ①** The browser asks the __certificate authority__: is the certificate valid? ✅ Yes, signed → this is __the real bank__.' },
            { ar: '**المرحلة ②** في نفس المصافحة الطرفين بيتبادلوا __معاملات تبادل المفاتيح__ 🧩 باستخدام آليات المفتاح العام — ودي __مش__ مفتاح الجلسة نفسه.', en: '**Stage ②** The browser creates a __new session key__ 🔑 — a __symmetric (common) key__ (the same key locks and unlocks).' },
            { ar: '**المرحلة ②** المعاملات بتتحمى بآليات المفتاح العام وتسافر على الشبكة. ⚠️ __مفتاح الجلسة نفسه مابيتبعتش__ — كل طرف بيشتقّه عنده.', en: '**Stage ②** It puts it in a box and __locks it with the public key__. ⚠️ The public key is __not converted__ into a common key — it is only the lock that delivers the new key.' },
            { ar: '**المرحلة ②** المهاجم مسك اللي ماشي في السكة… بس __مايقدرش يوصل لمفتاح الجلسة__ ❌.', en: '**Stage ②** The attacker grabs the box on the way… but __cannot open it__ ❌ — he has no __private key__.' },
            { ar: '**المرحلة ②** كل طرف __بيشتق مفتاح الجلسة عنده__ 🔑 من غير ما المفتاح يتبعت على الشبكة → دلوقتي الطرفين معاهم __نفس مفتاح الجلسة__ 🤝، وده __مفتاح متماثل__.', en: '**Stage ②** The server __opens it with its private key__ 🔐 → now both sides share __the same session key__ 🤝.' },
            { ar: '**المرحلة ③** بيانات الجلسة __بتتحمى بالتشفير المتماثل وآليات سلامة البيانات__ — سريع جدًا ⚡ — والمهاجم مش شايف غير رموز ملهاش معنى 🤯.', en: '**Stage ③** All data is __encrypted with the common key__ — very fast ⚡ — and the attacker sees only meaningless symbols 🤯.' },
            { ar: '📌 **الخلاصة:** آليات المفتاح العام → __المصادقة والاتفاق الآمن على مفاتيح الجلسة__ · التشفير المتماثل → __حماية البيانات بسرعة__ ⇒ __أمان + كفاءة__.', en: '📌 **The point:** public key → __deliver the session key safely__ · common key → __move the data fast__ ⇒ __security + speed__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ تحت بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل مرحلة من مصافحة TLS بتستخدم أنهي نوع تشفير؟', en: 'Which cryptography does each TLS stage use?' },
            groups: [{ icon: 'unlock', label: { ar: 'مفتاح عام', en: 'Public-key' } }, { icon: 'key', label: { ar: 'مفتاح متماثل', en: 'Common-key' } }],
            items: [
              { text: { ar: '① الخادم يبعت شهادته + مفتاحه العام', en: '① Server sends certificate + public key' }, group: 0 },
              { text: { ar: '② الاتفاق على مفاتيح الجلسة', en: '② Browser sends the locked session key' }, group: 0 },
              { text: { ar: '③ تبادل الصفحات والصور والبيانات', en: '③ Exchanging pages, images and data' }, group: 1 },
            ],
            explain: { ar: 'أول مرحلتين بآليات المفتاح __العام__ (مصادقة واتفاق آمن على المفاتيح)، والتالتة بالمتماثل (عشان السرعة).', en: 'The first two stages use __public-key__ (to deliver the key safely); the third uses common-key (for speed).' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'ليه HTTPS مابيستخدمش المفتاح العام في كل البيانات، رغم إنه آمن؟', en: 'Why doesn’t HTTPS use public-key for all the data, even though it is secure?' },
            options: [
              { ar: 'لأنه بطيء نسبيًا على البيانات الكتير', en: 'Because it is relatively slow for lots of data' },
              { ar: 'لأن أي حد معاه المفتاح العام يقدر يفك', en: 'Because anyone with the public key can decrypt' },
              { ar: 'لأنه مش بيشتغل غير مع الصور بس', en: 'Because it only works with images' },
              { ar: 'لأن جهة الشهادات بتمنع استخدامه', en: 'Because the CA forbids using it' },
            ],
            answer: 0,
            explain: { ar: 'آليات المفتاح العام __أبطأ__، فبنستخدمها في المصادقة والاتفاق على مفاتيح الجلسة، وبعدها المتماثل __السريع__.', en: 'Public-key is __slow__, so it is used once to deliver the session key, then the __fast__ common key. (And the public key cannot decrypt — the private key does.)' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (3)', en: '✋ Check yourself (3)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'في التشفير المتماثل نفس المفتاح بيقفل وبيفتح.', en: 'In common-key cryptography the same key locks and unlocks.' }, answer: true },
            { text: { ar: 'المفتاح الخاص بيتوزّع على كل الناس عشان يقدروا يبعتوا رسايل.', en: 'The private key is handed to everyone so they can send messages.' }, answer: false, explain: { ar: 'اللي بيتوزّع هو __العام__؛ الخاص __سرّي__ مع صاحبه بس.', en: 'The __public__ key is shared; the private key stays __secret__ with its owner.' } },
            { text: { ar: 'المتصفح بيتحقق من هوية الخادم بفحص شهادته وسلسلة الثقة.', en: 'The browser verifies the server through a certificate authority (CA).' }, answer: true },
            { text: { ar: 'مصافحة TLS بتحصل بعد ما البيانات كلها تتبادل.', en: 'The TLS handshake happens after all the data has been exchanged.' }, answer: false, explain: { ar: 'المصافحة هي __أول حاجة__: تأسيس الاتصال الآمن قبل البيانات.', en: 'The handshake comes __first__: setting up the secure connection before any data.' } },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**HTTPS** = HTTP عبر اتصال TLS مؤمّن ← سرية، سلامة، تحقق من هوية الخادم — ضد التنصّت والتلاعب وانتحال الهوية.', en: '**HTTPS** = HTTP + TLS ← encryption, tamper detection, partner verification — against eavesdropping, tampering, impersonation.' },
            { ar: '**المفتاح المتماثل:** مفتاح واحد · __سريع__ · لتبادل البيانات · مشكلته: توصيل المفتاح.', en: '**Common-key:** one key · __fast__ · for the data · problem: delivering the key.' },
            { ar: '**المفتاح العام:** زوج مفاتيح عام وخاص · __أبطأ__ · للمصادقة والاتفاق الآمن على مفاتيح الجلسة.', en: '**Public-key:** public locks + private opens · __slow__ · for sharing the key safely.' },
            { ar: '**مصافحة TLS:** ① التحقق من الشهادة ② اشتقاق مفاتيح الجلسة بآليات المفتاح العام ③ حماية البيانات بالمتماثل.', en: '**TLS handshake:** ① certificate + public key (verified via CA) ② session key locked with public key ③ data with common key.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · authentication in real services ───────────── */
    {
      id: 'auth', kind: 'learn',
      title: { ar: 'المصادقة في الخدمات الحقيقية (2FA)', en: 'Authentication in real services (MFA)' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'كلمة مرور حسابك اتسرّبت في موقع تاني. إيه اللي ممكن لسه يحمي حسابك؟', en: 'Your password leaked from another site. What could still protect your account?' },
            options: [
              { emoji: '🔁', text: { ar: 'كلمة مرور تانية جنب الأولى', en: 'A second password' } },
              { emoji: '📱', text: { ar: 'كود بيوصل على موبايلي', en: 'A code sent to my phone' } },
              { emoji: '🤷‍♂️', text: { ar: 'مفيش حاجة تحميه', en: 'Nothing can protect it' } },
            ],
            after: { ar: 'خلّي إجابتك في دماغك… وشوف التجربة 👇', en: 'Keep your answer in mind… and watch the experiment 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: المصادقة الثنائية مشهد بمشهد', en: '🎞️ Full animation: multi-factor authentication scene by scene' },
          enTitle: 'Multi-factor authentication, scene by scene',
          terms: ['knowledge', 'possession', 'biometric', 'multi-factor authentication'],
          visual: { anim: 'mfaMovie' },
          beats: [
            { ar: '🧠 حساب أحمد في البنك محمي بـ__كلمة مرور بس__ — يعني __عامل واحد__ (المعرفة). أحمد شايف إن ده كفاية… تعالوا نشوف.', en: '🧠 Ahmed’s bank account is protected by __a password only__ — __one factor__ (knowledge). Ahmed thinks that is enough… let’s see.' },
            { ar: '🚨 موقع تاني اتسرّق وكلمة مرور أحمد بقت في __قايمة مسرّبة__ — المهاجم دخل بيها على طول، لأن __العامل الوحيد اتكسر__.', en: '🚨 Another site was breached and Ahmed’s password ended up in a __leaked list__ — the attacker walks right in, because __the only factor broke__.' },
            { ar: '🔐 أحمد فعّل **المصادقة الثنائية (2FA)**: كلمة المرور 🧠 (__معرفة__) + __كود بيوصل على موبايله__ 📱 (__حيازة__).', en: '🔐 Ahmed turns on **multi-factor authentication (MFA)**: password 🧠 (__knowledge__) + __a code sent to his phone__ 📱 (__possession__).' },
            { ar: '⛔ المهاجم جرّب تاني: كلمة المرور صح… بس البنك طلب الكود، والكود راح __لموبايل أحمد__ مش للمهاجم — فـ__اتمنع__.', en: '⛔ The attacker tries again: the password is right… but the bank asks for the code, and it goes __to Ahmed’s phone__, not the attacker — __blocked__.' },
            { ar: '✅ أحمد بيدخل عادي: كلمة المرور + الكود من موبايله — __عاملين من نوعين مختلفين__.', en: '✅ Ahmed signs in normally: password + the code from his phone — __two different kinds of factor__.' },
            { ar: '⚠️ **فخ الامتحان:** __كلمتين مرور__ = نفس العامل (معرفة) مرتين ⇒ __مش__ 2FA — المهاجم ممكن يسرق الاتنين من نفس القايمة.', en: '⚠️ **Exam trap:** __two passwords__ = the same factor (knowledge) twice ⇒ __not__ MFA — the attacker can steal both from the same list.' },
            { ar: '📌 **الخلاصة:** عوامل المصادقة التلاتة: **المعرفة** (حاجة إنت عارفها) · **الحيازة** (حاجة معاك) · **السمات الحيوية** (حاجة هي إنت). **2FA** = عاملين مستقلين من __فئتين مختلفتين__، و**MFA** = عاملين أو أكتر من فئات مختلفة. أمثلة: البنك (كلمة مرور + كلمة مرور لمرة واحدة) · السوشيال (كلمة مرور + SMS) · دخول مبنى مؤمّن (بطاقة دخول + بصمة) · التسوّق (كلمة مرور + التحقق من هوية بطاقة الائتمان).', en: '📌 **The point:** the three factors: **knowledge** (something you know) · **possession** (something you have) · **biometric** (something you are). **MFA** = two or more __different factors__. Real examples: banking (password + OTP) · social media (password + SMS) · company laptop (smart card + fingerprint) · shopping (password + 3-D Secure code).' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: المصادقة الثنائية في خدمات حقيقية', en: '🎞️ Animation: multi-factor authentication in real services' },
          enTitle: 'MFA in real services',
          terms: ['multi-factor authentication', 'one-time password', 'SMS', '3-D Secure', 'smart card'],
          visual: { anim: 'mfaUseMovie' },
          beats: [
            { ar: '🏦 أمثلة الكتاب: **البنك أونلاين** كلمة مرور (معرفة) + كلمة مرور لمرة واحدة (حيازة) · **السوشيال ميديا** كلمة مرور + كود SMS (حيازة) · **التسوّق أونلاين** كلمة مرور + __التحقق من هوية بطاقة الائتمان__ (حيازة) · **دخول مبنى مؤمّن** بطاقة دخول (حيازة) + بصمة (سمات حيوية).', en: '🏦 Textbook examples: **online banking** password (knowledge) + one-time password (possession) · **social media** password + SMS code (possession) · **online shopping** password + one-time __3-D Secure__ code (possession) · **company laptop** smart card (possession) + fingerprint (biometric).' },
            { ar: '🛡️ **ليه بنجمع؟** لو استخدمنا __عامل واحد__ واتكسر، المهاجم يدخل. لو جمعنا __عاملين من نوعين مختلفين__ واتكسر واحد (كلمة المرور اتسرّبت)، __التاني لسه بيمنع الدخول__.', en: '🛡️ **Why combine?** With __one factor__, breaking it lets an attacker in. With __two different kinds__, if one breaks (the password leaks), __the other still blocks the way in__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'صنّف كل حاجة حسب عامل المصادقة بتاعها:', en: 'Sort each item by its authentication factor:' },
            groups: [{ icon: 'brain', label: { ar: 'المعرفة', en: 'Knowledge' } }, { icon: 'phone', label: { ar: 'الحيازة', en: 'Possession' } }, { icon: 'fingerprint', label: { ar: 'السمات الحيوية', en: 'Biometric' } }],
            items: [
              { text: { ar: 'كلمة المرور', en: 'Password' }, group: 0 },
              { text: { ar: 'رقم PIN', en: 'PIN' }, group: 0 },
              { text: { ar: 'إجابة سؤال سري', en: 'Secret-question answer' }, group: 0 },
              { text: { ar: 'كود OTP على الموبايل', en: 'OTP code on the phone' }, group: 1 },
              { text: { ar: 'بطاقة ذكية', en: 'Smart card' }, group: 1 },
              { text: { ar: 'بصمة الإصبع', en: 'Fingerprint' }, group: 2 },
              { text: { ar: 'التعرّف على الوجه', en: 'Face recognition' }, group: 2 },
            ],
            explain: { ar: 'اللي __بتفتكره__ = معرفة · اللي __في إيدك__ = حيازة · اللي __هو جسمك__ = سمات حيوية.', en: 'What you __remember__ = knowledge · what is __in your hand__ = possession · what is __your body__ = biometric.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحد من دول **مش** مصادقة ثنائية؟', en: 'Which of these is **NOT** multi-factor authentication?' },
            options: [
              { ar: 'كلمة مرور + إشعار على الموبايل', en: 'Password + phone notification' },
              { ar: 'كلمة مرور + سؤال سري', en: 'Password + secret question' },
              { ar: 'بصمة الإصبع + بطاقة ذكية', en: 'Fingerprint + smart card' },
              { ar: 'كلمة مرور + رسالة SMS', en: 'Password + SMS' },
            ],
            answer: 1,
            explain: { ar: 'كلمة المرور والسؤال السري __الاتنين معرفة__ — نفس العامل، فمش 2FA.', en: 'A password and a secret question are __both knowledge__ — the same factor, so not MFA.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: 'عوامل المصادقة التلاتة: **معرفة** (كلمة مرور) · **حيازة** (موبايل/كارت) · **سمات حيوية** (بصمة/وجه).', en: 'Three factors: **knowledge** (password) · **possession** (phone/card) · **biometric** (fingerprint/face).' },
            { ar: '**2FA** = عاملين مستقلين من __فئتين مختلفتين__، و**MFA** = عاملين أو أكتر — لو عامل اتكسر، التاني لسه بيقلّل احتمال الدخول.', en: '**MFA** = two or more __different factors__ — if one breaks, another still blocks access.' },
            { ar: 'كلمتين مرور = __مش__ 2FA (نفس العامل).', en: 'Two passwords = __not__ MFA (same factor).' },
          ],
        },
      ],
    },

    /* ───────────── 3 · combining technologies ───────────── */
    {
      id: 'combine', kind: 'learn',
      title: { ar: 'التوقيع الرقمي والشهادة… والجمع بين التقنيات', en: 'Digital signature, certificate… and combining technologies' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: التوقيع الرقمي والشهادة الرقمية', en: '🎞️ Animation: digital signature and digital certificate' },
          enTitle: 'Digital signature · non-repudiation · digital certificate',
          terms: ['digital signature', 'non-repudiation', 'digital certificate', 'certificate authority'],
          visual: { anim: 'signMovie' },
          beats: [
            { ar: '✍️ **التوقيع الرقمي:** أحمد __بيوقّع__ طلب الشراء بـ__مفتاحه الخاص__ — والاتجاه هنا __معكوس عن التشفير__: الخاص بيوقّع والعام بيتحقّق.', en: '✍️ **Digital signature:** Ahmed __signs__ the order with __his private key__ — the direction is __reversed vs encryption__: the private key signs, the public key verifies.' },
            { ar: '✅ المتجر __يتحقّق__ بـ__مفتاح أحمد العام__: التوقيع سليم ⇒ الطلب __ماتغيّرش__ واللي بعته __أحمد فعلًا__.', en: '✅ The shop __verifies__ with __Ahmed’s public key__: a valid signature ⇒ the order is __unchanged__ and __Ahmed really sent it__.' },
            { ar: '✏️ المهاجم غيّر المبلغ __100 ← 900__ في السكة ⇒ التحقق __فشل__. التوقيع الرقمي __بيكشف التلاعب__ في البيانات و__انتحال هوية المرسِل__.', en: '✏️ The attacker changed the amount __100 → 900__ on the way ⇒ verification __fails__. A digital signature __detects tampering__ and __sender impersonation__.' },
            { ar: '🙅‍♂️ **عدم التنصل:** أحمد قال «مابعتّش الطلب ده» — بس التوقيع __ماطلعش غير من مفتاحه الخاص__ ⇒ ده __دليل يدعم عدم التنصل__.', en: '🙅‍♂️ **Non-repudiation:** Ahmed says “I never sent that order” — but only __his private key__ could make the signature ⇒ __he cannot deny it__.' },
            { ar: '📜 **الشهادة الرقمية:** بتساعد المتصفح __يتحقق من هوية الخادم واسم النطاق__ عبر سلسلة ثقة بتوصل لـ__جهة إصدار الشهادات (CA)__ (bank.com.eg 🔒)، والموقع المزيّف من غير شهادة سليمة __بيتكشف__.', en: '📜 **Digital certificate:** proves __the other side is genuine__ — a __certificate authority (CA)__ vouches for the real site (bank.com.eg 🔒), and a fake site without a valid certificate __is exposed__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'التوقيع الرقمي ← يكشف التلاعب + __عدم التنصل__. «التوقيع الرقمي يحسّن سرعة الاتصال» ← __غلط__.', en: 'Digital signature → detects tampering + __non-repudiation__. "A digital signature improves speed" → __false__.' } },
            { kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: رحلة شراء أونلاين — 4 أخطار و4 تقنيات', en: '🎞️ Animation: one online purchase — 4 threats, 4 technologies' },
          enTitle: 'Combinations of Security Technologies',
          terms: ['encryption', 'digital certificate', 'multi-factor authentication', 'digital signature'],
          visual: { anim: 'stackMovie' },
          beats: [
            { ar: '🛒 هتشتري من متجر أونلاين… والمهاجم مستني بـ4 أخطار: __التنصّت__ · __موقع مزيّف__ (انتحال) · __دخول غير مصرّح__ · __التلاعب__.', en: '🛒 You buy from an online shop… and the attacker waits with 4 threats: __eavesdropping__ · a __fake site__ (impersonation) · __unauthorized login__ · __tampering__.' },
            { ar: '① أول ما تفتح الموقع يبدأ HTTPS و**التشفير** يحوّل رقم الكارت لرموز ملهاش معنى ⇒ __يمنع قراءة المحتوى__ من أطراف تالتة.', en: '① As you open the site HTTPS starts and **encryption** turns your card number into gibberish ⇒ it __stops third parties reading the content__.' },
            { ar: '② المتصفح يفحص **الشهادة الرقمية** ⇒ يتأكد إن ده __المتجر الحقيقي__ ويحذّرك من الموقع المزيّف.', en: '② The browser checks the **digital certificate** ⇒ it confirms the __real shop__ and warns you about the fake one.' },
            { ar: '③ وقت الدخول، **المصادقة الثنائية** (كلمة مرور + كود SMS) ⇒ المهاجم معاه كلمة المرور بس، ومن غير موبايلك __مايقدرش يدخل__.', en: '③ At login, **multi-factor authentication** (password + SMS code) ⇒ the attacker has only the password, and without your phone __cannot get in__.' },
            { ar: '④ لما تبعت الطلب، **TLS** بيحمي سرية البيانات وسلامتها أثناء النقل، و**التوقيع الرقمي** بيتستخدم على بيانات أو رسائل محددة لما النظام يتطلب ده ⇒ أي __تلاعب__ في السكة (800 ← 8) __بيتكشف__.', en: '④ When you send the order, a **digital signature** ⇒ any __tampering__ on the way (800 → 8) __is caught__.' },
            { ar: '🛡️ **الخلاصة:** التشفير ← يمنع القراءة · الشهادة ← تثبت إن الطرف التاني حقيقي · 2FA ← تقلّل احتمال الدخول غير المصرّح · التوقيع ← يكشف التلاعب وانتحال المرسِل + عدم التنصل. __الأمان = جمع تقنيات كتير__، مش تقنية واحدة.', en: '🛡️ **Recap:** encryption → stops reading · certificate → proves the other side is genuine · MFA → blocks unauthorized logins · signature → detects tampering & sender impersonation + non-repudiation. __Security = combining many technologies__, not one.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'التشفير ← يمنع القراءة · التوقيع الرقمي ← يكشف التلاعب + عدم التنصل · الشهادة الرقمية ← تثبت هوية الموقع · 2FA ← تقلّل احتمال الدخول غير المصرّح.', en: 'Encryption → prevents reading · digital signature → detects tampering + non-repudiation · digital certificate → proves the site’s identity · MFA → blocks unauthorized login.' } },
            { kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل مشكلة بالتقنية اللي بتعالجها أساسًا:', en: 'Match each problem with the technology that mainly addresses it:' },
            left: [
              { ar: 'كلمة مرور اتسرّبت وحصل دخول غير مصرّح', en: 'A password leaked and an unauthorized login happened' },
              { ar: 'البيانات اتعدّلت أثناء الاتصال', en: 'Data was altered during communication' },
              { ar: 'مستخدم اتوجّه لموقع مزيّف', en: 'A user was led to a fake website' },
              { ar: 'طرف تالت اعترض محتوى الاتصال', en: 'A third party intercepted the content' },
            ],
            right: [{ ar: 'التشفير', en: 'Encryption' }, { ar: 'التوقيع الرقمي', en: 'Digital signature' }, { ar: 'الشهادة الرقمية', en: 'Digital certificate' }, { ar: 'المصادقة الثنائية', en: 'Multi-factor authentication' }],
            answer: [3, 1, 2, 0],
            explain: { ar: 'تسريب كلمة المرور ← 2FA · التعديل ← التوقيع · الموقع المزيّف ← الشهادة · الاعتراض ← التشفير.', en: 'Leaked password → MFA · alteration → signature · fake site → certificate · interception → encryption.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'أحمد بعت طلب شراء موقّع رقميًا، وبعدين قال «أنا مابعتّش حاجة». إيه اللي يثبت إنه بعت؟', en: 'Ahmed sent a digitally signed order, then said "I never sent it". What proves he did?' },
            options: [
              { ar: 'التوقيع الرقمي — عدم التنصل', en: 'The digital signature — non-repudiation' },
              { ar: 'الشهادة الرقمية بتاعة المتجر', en: 'The shop’s digital certificate' },
              { ar: 'تشفير الاتصال بالتشفير المتماثل', en: 'Common-key encryption of the link' },
              { ar: 'كلمة المرور اللي دخل بيها', en: 'The password he logged in with' },
            ],
            answer: 0,
            explain: { ar: 'التوقيع ماطلعش غير من __مفتاحه الخاص__، فده دليل يدعم **عدم التنصل**.', en: 'Only __his private key__ could make the signature, so he cannot deny it — **non-repudiation**.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**التوقيع الرقمي:** الخاص يوقّع، العام يتحقق ← يكشف التلاعب وانتحال المرسِل + **عدم التنصل**.', en: '**Digital signature:** private key signs, public key verifies → detects tampering and impersonation + **non-repudiation**.' },
            { ar: '**الشهادة الرقمية:** بتساعد المتصفح يتحقق من هوية الخادم واسم النطاق.', en: '**Digital certificate:** proves the partner is genuine (vouched by a CA).' },
            { ar: 'الأمان = **الجمع**: تشفير + شهادات + تواقيع + 2FA ← تهديدات كتير في نفس الوقت.', en: 'Security = **combining**: encryption + certificates + signatures + MFA → many threats at once.' },
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
          q: { widget: 'tf', prompt: { ar: '(1) ضع ✓ للصحيحة و✗ للخاطئة:', en: '(1) Mark ✓ if true or ✗ if false:' }, items: [
            { text: { ar: 'A) اتصال HTTPS بيستخدم التشفير بالمفتاح العام والتشفير المتماثل مع بعض.', en: 'A) HTTPS uses both public-key and common-key cryptography.' }, answer: true },
            { text: { ar: 'B) اتصال HTTPS بيتبادل كل البيانات بالتشفير بالمفتاح العام.', en: 'B) HTTPS exchanges all data using public-key cryptography.' }, answer: false },
            { text: { ar: 'C) المصادقة الثنائية بتستخدم عاملين مستقلين من فئتين مختلفتين لإثبات الهوية.', en: 'C) MFA combines two or more of the three authentication factors.' }, answer: true },
            { text: { ar: 'D) مثال على المصادقة الثنائية: تعيين كلمتين مرور.', en: 'D) An example of MFA is setting two passwords.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) آليات المفتاح العام للمصادقة والاتفاق على مفاتيح الجلسة، والمتماثل لحماية البيانات ← **✓**.', en: 'A) Public-key for key exchange, common-key for data → **✓**.' },
            { ar: 'B) تبادل كل البيانات بالعام __بطيء__، فالمتماثل بيُستخدم للبيانات ← **✗**.', en: 'B) Exchanging all data with public-key would be __slow__ → **✗**.' },
            { ar: 'C) ده التعريف الصحيح ← **✓**.', en: 'C) Correct definition → **✓**.' },
            { ar: 'D) كلمتين المرور الاتنين «معرفة» — دي مصادقة متعددة الخطوات بنفس العامل، مش 2FA ← **✗**.', en: 'D) Both passwords are "knowledge" — two steps with one factor, not MFA → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل تهديد (a–c) بالتقنية المناسبة (A–C):', en: '(2) Match each threat (a–c) with the technology (A–C):' },
            left: [
              { ar: 'a) عايز أمنع أطراف تالتة من قراءة محتوى الاتصال', en: 'a) Stop third parties reading the content' },
              { ar: 'b) عايز أتأكد إن رسالة موقّعة ماتعدّلتش وإنها صدرت عن موقّعها المزعوم', en: 'b) Verify data was not altered in transit' },
              { ar: 'c) عايز أتأكد إن الطرف المقابل حقيقي', en: 'c) Verify the partner is authentic' },
            ],
            right: [{ ar: 'A التشفير', en: 'A Encryption' }, { ar: 'B التوقيع الرقمي', en: 'B Digital signature' }, { ar: 'C الشهادة الرقمية', en: 'C Digital certificate' }],
            answer: [0, 1, 2] },
          solution: [
            { ar: 'a: منع القراءة = **التشفير** ← A.', en: 'a: preventing reading = **encryption** → A.' },
            { ar: 'b: سلامة الرسالة وهوية موقّعها = **التوقيع الرقمي** ← B.', en: 'b: detecting tampering = **digital signature** → B.' },
            { ar: 'c: التحقق من هوية الطرف = **الشهادة الرقمية** ← C.', en: 'c: verifying the partner = **digital certificate** → C.' },
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
          q: { widget: 'recall', prompt: { ar: 'جاوب في دماغك وبعدين اكشف:', en: 'Answer in your head, then reveal:' }, items: [
            { q: { ar: '1. إيه دور الشهادة الرقمية وآليات المفتاح العام في بدء اتصال TLS آمن؟', en: '1. In HTTPS, which method lets browser and server share a common key safely?' }, a: { ar: 'التشفير بالمفتاح العام', en: 'Public-key cryptography' } },
            { q: { ar: '2. إيه نوع التشفير المستخدم لحماية بيانات الجلسة بعد إنشاء مفاتيحها؟', en: '2. After the key is shared, which method is used for data?' }, a: { ar: 'التشفير المتماثل', en: 'Common-key cryptography' } },
            { q: { ar: '3. اشرح باختصار إزاي HTTPS بيبدأ اتصال آمن، وبعدين بيحمي البيانات.', en: '3. Why combine the two methods?' }, a: { ar: 'الشهادة بتساعد في التحقق من هوية الخادم، وآليات المفتاح العام بتتفق بأمان على مفاتيح الجلسة، وبعدين المفاتيح المتماثلة بتحمي البيانات بسرعة.', en: 'Public-key shares the key safely (but is slow); common-key moves data fast → security + speed.' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'classify', prompt: { ar: 'لكل خدمة، حدّد تركيبة عوامل المصادقة:', en: 'For each service, identify the factor combination:' },
            groups: [{ icon: 'key', label: { ar: 'A معرفة + حيازة', en: 'A Knowledge + possession' } }, { icon: 'fingerprint', label: { ar: 'B معرفة + سمات حيوية', en: 'B Knowledge + biometric' } }, { icon: 'card', label: { ar: 'C سمات حيوية + حيازة', en: 'C Biometric + possession' } }],
            items: [
              { text: { ar: 'a) كلمة مرور + كلمة مرور لمرة واحدة', en: 'a) Password + one-time password' }, group: 0 },
              { text: { ar: 'b) كلمة مرور + بصمة إصبع', en: 'b) Password + fingerprint' }, group: 1 },
              { text: { ar: 'c) كلمة مرور + مصادقة SMS', en: 'c) Password + SMS authentication' }, group: 0 },
              { text: { ar: 'd) التعرّف على الوجه + بطاقة ذكية', en: 'd) Face recognition + smart card' }, group: 2 },
            ],
            explain: { ar: 'a→A · b→B · c→A · d→C.', en: 'a→A · b→B · c→A · d→C.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف **غير** المناسب للجمع بين تقنيات الأمان:', en: 'Choose the description that is **NOT** appropriate:' },
            options: [
              { ar: 'التشفير تقنية بتمنع أطراف تالتة من قراءة المحتوى.', en: 'Encryption stops third parties reading the content.' },
              { ar: 'التواقيع الرقمية تقنية بتحسّن سرعة الاتصال.', en: 'Digital signatures are a technology that improves speed.' },
              { ar: 'الشهادات الرقمية نظام للتحقق إن الطرف المقابل حقيقي.', en: 'Digital certificates verify the partner is authentic.' },
              { ar: 'بالجمع بين تقنيات كتير بنواجه تهديدات مختلفة.', en: 'Combining technologies addresses many threats.' },
            ],
            answer: 1,
            explain: { ar: 'التوقيع الرقمي __بيكشف التلاعب ويوفّر عدم التنصل__ — مالوش علاقة بالسرعة.', en: 'A digital signature __detects tampering and gives non-repudiation__ — it has nothing to do with speed.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(c):', en: 'Read and fill blanks (a)–(c):' },
            text: { ar: 'عند بدء اتصال HTTPS الخادم بيبعت {0} للمتصفح، فالمتصفح يتحقق من صلاحيتها وملاءمتها لاسم الموقع — والخطوات دي اسمها {1}. وفي نفس الخطوات الطرفين بيتفقوا على إعدادات الحماية وتتشتق مفاتيح الجلسة، وبعد كده بيانات الجلسة بتتحمى بـ{2} وآليات سلامة البيانات.', en: 'HTTPS combines several cryptographic technologies. First, the web server sends a {0} and a public key to the browser. The browser verifies the server through {1}. Next, the browser creates a {2} and encrypts it with the server’s public key before sending. After this, all data is encrypted using this key.' },
            bank: [{ ar: 'شهادة رقمية', en: 'digital certificate' }, { ar: 'مصافحة TLS', en: 'a certificate authority (CA)' }, { ar: 'التشفير المتماثل', en: 'common key' }, { ar: 'توقيع رقمي', en: 'digital signature' }, { ar: 'مفتاح خاص', en: 'private key' }],
            answer: [0, 1, 2],
            explain: { ar: '(a) شهادة رقمية · (b) مصافحة TLS · (c) التشفير المتماثل. وبنستخدم مفاتيح جلسة متماثلة لأنها أسرع مع كميات البيانات الكبيرة.', en: '(a) digital certificate · (b) CA · (c) common key. Common-key is used for data because public-key is slow for bulk data.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'match', prompt: { ar: 'لكل تهديد (a–d)، أنهي تقنية بتعالجه أساسًا؟', en: 'For each threat (a–d), which technology mainly addresses it?' },
            left: [
              { ar: 'a) تسرّبت كلمة مرور فحصل دخول غير مصرّح', en: 'a) A password leaked; unauthorized login' },
              { ar: 'b) البيانات اتعدّلت أثناء الاتصال', en: 'b) Data altered in transit' },
              { ar: 'c) مستخدم اتوجّه لموقع مزيّف', en: 'c) A user led to a fake site' },
              { ar: 'd) طرف تالت اعترض محتوى الاتصال', en: 'd) Content intercepted by a third party' },
            ],
            right: [{ ar: 'A التشفير', en: 'A Encryption' }, { ar: 'B التوقيع الرقمي', en: 'B Digital signature' }, { ar: 'C الشهادة الرقمية', en: 'C Digital certificate' }, { ar: 'D المصادقة الثنائية', en: 'D Multi-factor authentication' }],
            answer: [3, 1, 2, 0],
            explain: { ar: 'a→D · b→B · c→C · d→A.', en: 'a→D · b→B · c→C · d→A.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي **مش** مثال مناسب على المصادقة الثنائية:', en: 'Choose the one that is **NOT** an example of MFA:' },
            options: [
              { ar: 'كلمة مرور + إشعار على الموبايل', en: 'Password + smartphone notification' },
              { ar: 'كلمة مرور + سؤال سري', en: 'Password + secret question' },
              { ar: 'بصمة إصبع + بطاقة ذكية', en: 'Fingerprint + smart card' },
              { ar: 'كلمة مرور + مصادقة SMS', en: 'Password + SMS authentication' },
            ],
            answer: 1,
            explain: { ar: 'الاتنين «معرفة» ← نفس العامل.', en: 'Both are "knowledge" → the same factor.' } },
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
          { front: { ar: 'HTTPS', en: 'HTTPS' }, back: { ar: 'HTTP عبر اتصال TLS مؤمّن: سرية وسلامة البيانات، والتحقق من هوية الخادم واسم النطاق.', en: 'HTTP + TLS encryption: encryption, tamper detection, partner verification.' } },
          { front: { ar: 'مصافحة TLS', en: 'TLS handshake' }, back: { ar: 'خطوات إنشاء الاتصال الآمن (التحقق من الشهادة ← اشتقاق مفاتيح الجلسة ← حماية البيانات).', en: 'The procedure that sets up the secure connection (certificate + public key → session key → data).' } },
          { front: { ar: 'التشفير المتماثل', en: 'Common-key cryptography' }, back: { ar: 'مفتاح واحد مشترك للتشفير والفك — سريع — لحماية بيانات الجلسة.', en: 'One shared key to encrypt and decrypt — fast — for exchanging data.' } },
          { front: { ar: 'التشفير بالمفتاح العام', en: 'Public-key cryptography' }, back: { ar: 'زوج مفاتيح مرتبطين عام وخاص — أبطأ — للمصادقة والاتفاق الآمن على مفاتيح الجلسة.', en: 'A key pair: public locks, private opens — slow — for sharing the key safely.' } },
          { front: { ar: 'جهة إصدار الشهادات (CA)', en: 'Certificate authority (CA)' }, back: { ar: 'جهة بتوقّع الشهادات الرقمية، والمتصفح بيتتبّع سلسلة الثقة لحدها.', en: 'A body that vouches a site is genuine; the browser verifies the server through it.' } },
          { front: { ar: 'المصادقة الثنائية', en: 'Multi-factor authentication' }, back: { ar: 'عاملين مستقلين من فئتين مختلفتين؛ وMFA = عاملين أو أكتر من: المعرفة · الحيازة · السمات الحيوية.', en: 'Combining two or more of: knowledge · possession · biometric.' } },
          { front: { ar: 'التوقيع الرقمي', en: 'Digital signature' }, back: { ar: 'يكشف التلاعب وانتحال الشخصية، ويوفّر دليل يدعم عدم التنصل.', en: 'Detects tampering and sender impersonation, and provides non-repudiation.' } },
          { front: { ar: 'عدم التنصل', en: 'Non-repudiation' }, back: { ar: 'دليل يصعّب على المرسِل إنكار إنه بعت البيانات.', en: 'The sender cannot later deny having sent the data.' } },
          { front: { ar: 'الشهادة الرقمية', en: 'Digital certificate' }, back: { ar: 'بتساعد المتصفح يتحقق من هوية الخادم واسم النطاق.', en: 'Verifies that the communication partner is authentic.' } },
        ] },
      }],
    },

    /* ───────────── 7 · think like an engineer + essays ───────────── */
    {
      id: 'think', kind: 'challenge',
      title: { ar: 'فكّر كمهندس + السؤال المقالي', en: 'Think like an engineer + essay' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', marks: 6, tag: { ar: 'سؤال بنمط الامتحان · 6 درجات', en: 'Exam-style · 6 marks' },
            prompt: { ar: 'اشرح ليه TLS بيستخدم آليات المفتاح العام للمصادقة والاتفاق الآمن على مفاتيح الجلسة، وبعدين بيستخدم التشفير المتماثل لحماية بيانات الجلسة. (استعن بـ: الأمان والكفاءة)', en: 'Explain why HTTPS uses public-key cryptography to share the key but common-key cryptography to exchange the data. (Refer to: security and speed)' },
            points: [
              { ar: 'آليات المفتاح العام بتسمح بالمصادقة والاتفاق الآمن على مفاتيح الجلسة من غير سر مشترك سابق.', en: 'Public-key delivers the key safely with no prior agreement (only the private key opens it).' },
              { ar: 'لكنها أبطأ على البيانات الكتير.', en: 'But it is slow for large amounts of data.' },
              { ar: 'المتماثل سريع جدًا، بس محتاج مفتاح مشترك يتجهّز الأول بأمان.', en: 'Common-key is very fast but needs the key delivered safely first.' },
              { ar: 'الجمع ← أمان + كفاءة.', en: 'Combining → security + speed.' },
            ],
            model: { ar: 'آليات المفتاح العام بتستخدم زوج مفاتيح مرتبطين، فالمتصفح يقدر يتحقق من هوية الخادم عن طريق شهادته، والطرفين يتفقوا بأمان على أسرار مشتركة ويشتق كل طرف مفتاح الجلسة عنده من غير ما المفتاح نفسه يتبعت على الشبكة؛ لكن الآليات دي أبطأ مع كميات البيانات الكبيرة. أما التشفير المتماثل فبيستخدم مفتاح واحد مشترك وسريع جدًا، بس لازم المفتاح يكون موجود عند الطرفين بأمان الأول. عشان كده TLS بيستخدم آليات المفتاح العام في المصافحة، وبعدها بيستخدم التشفير المتماثل لحماية بيانات الجلسة — فيحقق الأمان والكفاءة مع بعض.', en: 'Public-key cryptography uses a key pair: what the public key locks only the private key opens, so the browser can send the session key safely with no prior agreement — but it is relatively slow for bulk data. Common-key uses one shared key and is very fast, but the key must first reach both sides safely. So HTTPS uses public-key once at the start to deliver the session key, then the fast common key for all data — achieving security and speed together.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — بوابة المدرسة', en: 'Think as an engineer — school portal' },
            prompt: { ar: 'مدرسة في مدينتك بتبني بوابة إلكترونية الطلاب يشوفوا فيها درجاتهم ويدفعوا الرسوم. لازم تختار طريقة الدخول: (كلمة مرور بس) ولا (كلمة مرور + كود لمرة واحدة على الموبايل)؟ ١) لو سألت 10 زملاء عن طرق الدخول اللي بيثقوا فيها، إيه المتوقع؟ ٢) لكل فئة — طالب، المدرسة، طالب معندوش موبايل ذكي — اذكر منفعة وعيب لطلب عامل تاني. ٣) قرّر واذكر سببين.', en: 'A school is building a portal where students check grades and pay fees. Choose: (password only) or (password + one-time code on the phone)? 1) What would a survey of ten classmates likely show? 2) For a student, the school, and a student with no smartphone — one benefit and one drawback of a second factor. 3) Decide and give two reasons.' },
            points: [
              { ar: 'نتيجة استبيان متوقعة (أغلبهم بيستخدم/بيثق في OTP أو SMS).', en: 'A likely survey result (most use/trust OTP or SMS).' },
              { ar: 'منفعة وعيب لكل فئة (بما فيهم طالب من غير موبايل).', en: 'A benefit and a drawback for each group (incl. no-smartphone student).' },
              { ar: 'قرار: كلمة مرور + OTP، بسبب: كلمة المرور لوحدها بتفشل لو اتسرّبت + فيه دفع فلوس.', en: 'Decision: password + OTP, because a password alone fails once leaked + money is involved.' },
              { ar: 'حل للطالب اللي معندوش موبايل (كارت/كود مطبوع).', en: 'A fallback for students without a phone (card/printed codes).' },
            ],
            model: { ar: 'المتوقع إن أغلب الزملاء بيستخدموا كود SMS أو OTP في البنك والسوشيال وبيثقوا فيه. بالنسبة للطالب: المنفعة إن حسابه ودرجاته في أمان، والعيب خطوة زيادة في الدخول. المدرسة: المنفعة حماية المدفوعات والبيانات، والعيب تكلفة الرسايل والدعم. الطالب اللي معندوش موبايل ذكي: المنفعة نفس الأمان، والعيب إنه ممكن مايقدرش يستقبل الكود — فنوفّر له بطاقة ذكية أو أكواد مطبوعة. القرار: كلمة مرور + كود لمرة واحدة، لأن كلمة المرور لوحدها لو اتسرّبت أي حد يدخل، ولأن البوابة فيها دفع فلوس فلازم حماية أقوى.', en: 'Most classmates likely use and trust SMS/OTP codes for banking and social media. Student: benefit — account and grades stay safe; drawback — one extra step. School: benefit — protects payments and data; drawback — cost of messages and support. Student with no smartphone: same security benefit, but may not receive the code — provide a smart card or printed codes. Decision: password + one-time code, because a leaked password alone lets anyone in, and the portal handles money so it needs stronger protection.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'متجر إلكتروني صغير عايز يأمّن دخول العملاء والدفع مع بعض. اذكر تقنيتين أمان لازم يستخدمهم وفين كل واحدة بتساعد، وبعدين حدّد تهديد واحد ممكن يفضل موجود.', en: 'A small online shop wants to secure customer login and payment. Name two technologies it should use and where each helps, then identify one threat that could still remain.' },
            points: [
              { ar: 'HTTPS/تشفير للدفع والبيانات (ضد التنصّت).', en: 'HTTPS/encryption for payment and data (against eavesdropping).' },
              { ar: '2FA لتسجيل الدخول (ضد الدخول غير المصرّح).', en: 'MFA for login (against unauthorized login).' },
              { ar: 'تهديد باقي (مثلًا: التصيّد/خداع العميل نفسه، أو جهاز العميل مصاب).', en: 'A remaining threat (e.g. phishing the customer, or an infected customer device).' },
            ],
            model: { ar: 'يستخدم HTTPS مع شهادة رقمية: التشفير يحمي بيانات الكارت والطلب من التنصّت، والشهادة تثبت للعميل إنه على المتجر الحقيقي. ويستخدم المصادقة الثنائية في الدخول (كلمة مرور + SMS) عشان لو كلمة المرور اتسرّبت مايدخلش حد غريب. تهديد ممكن يفضل: إن العميل نفسه يتخدع ويدّي الكود لحد بيمثّل إنه خدمة العملاء، أو إن جهازه يكون فيه برنامج خبيث.', en: 'Use HTTPS with a digital certificate: encryption protects card and order data from eavesdropping, and the certificate proves it is the real shop. Use MFA at login (password + SMS) so a leaked password is not enough. A remaining threat: the customer being tricked into giving the code to someone posing as support, or malware on their device.' } },
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
            prompt: { ar: 'لو كلمة المرور اتسرّبت، ليه عامل تاني بيوصل للموبايل لسه يقدر يحمي الحساب؟', en: 'If a password is leaked, why can a second factor sent to a phone still keep the account safe?' },
            points: [{ ar: 'العامل التاني من نوع مختلف (حيازة).', en: 'The second factor is a different type (possession).' }, { ar: 'المهاجم معاه كلمة المرور بس، مش الموبايل.', en: 'The attacker has the password, not the phone.' }],
            model: { ar: 'لأن العامل التاني من نوع مختلف: كلمة المرور «معرفة» لكن الكود اللي على الموبايل «حيازة». المهاجم ممكن يعرف كلمة المرور، لكن مش معاه الموبايل نفسه، فمايقدرش يكمّل الدخول.', en: 'Because the second factor is a different type: the password is "knowledge" but the phone code is "possession". The attacker may know the password but does not hold the phone, so cannot finish logging in.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: أنهي حماية من دول بتعتمد عليها أكتر لما تكون أونلاين؟ تحدّى: اقترح إجراء أمان زيادة ممكن متجر إلكتروني يضيفه، وتهديد واحد لسه مش هيشيله.', en: 'Reflect: which protection do you rely on most online? Challenge: suggest one extra measure an online shop could add, and one threat it still would not remove.' },
            points: [{ ar: 'حماية بتعتمد عليها + سبب.', en: 'A protection you rely on + why.' }, { ar: 'إجراء زيادة للمتجر.', en: 'An extra measure for the shop.' }, { ar: 'تهديد باقي.', en: 'A remaining threat.' }],
            model: { ar: 'بعتمد أكتر على HTTPS (القفل) لأني بدخل بياناتي في مواقع كتير. إجراء زيادة للمتجر: يطلب التحقق من هوية بطاقة الائتمان في كل عملية دفع. تهديد باقي: رسايل التصيّد اللي بتخدع العميل يدخل بياناته في موقع شبه المتجر.', en: 'I rely most on HTTPS (the padlock) because I enter data on many sites. Extra measure: require a 3-D Secure code on every payment. Remaining threat: phishing messages that trick customers into a look-alike site.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '2-1', seconds: 60, items: [
          { text: { ar: 'HTTPS = HTTP عبر اتصال TLS مؤمّن', en: 'HTTPS = HTTP + TLS encryption' }, answer: true },
          { text: { ar: 'HTTPS بيبادل كل البيانات بالمفتاح العام', en: 'HTTPS sends all data with public-key' }, answer: false },
          { text: { ar: 'المفتاح المتماثل = مفتاح واحد للقفل والفتح', en: 'Common-key = one key to lock and unlock' }, answer: true },
          { text: { ar: 'المفتاح العام أسرع من المتماثل', en: 'Public-key is faster than common-key' }, answer: false },
          { text: { ar: 'اللي يتقفل بالعام يتفتح بالخاص', en: 'What the public key locks, the private key opens' }, answer: true },
          { text: { ar: 'المفتاح الخاص بيتوزّع على الكل', en: 'The private key is shared with everyone' }, answer: false },
          { text: { ar: 'الشهادة الرقمية بتساعد في التحقق من هوية الخادم', en: 'A digital certificate proves a site is genuine' }, answer: true },
          { text: { ar: 'التوقيع الرقمي بيحسّن سرعة الاتصال', en: 'A digital signature speeds up communication' }, answer: false },
          { text: { ar: 'التوقيع الرقمي بيوفّر دليل يدعم عدم التنصل', en: 'A digital signature gives non-repudiation' }, answer: true },
          { text: { ar: 'كلمتين مرور = مصادقة ثنائية', en: 'Two passwords = multi-factor authentication' }, answer: false },
          { text: { ar: 'البصمة عامل «سمات حيوية»', en: 'A fingerprint is a "biometric" factor' }, answer: true },
          { text: { ar: 'البطاقة الذكية عامل «معرفة»', en: 'A smart card is a "knowledge" factor' }, answer: false },
          { text: { ar: 'التشفير بيمنع قراءة المحتوى', en: 'Encryption prevents reading the content' }, answer: true },
          { text: { ar: 'المتصفح بيتحقق من شهادة الخادم وسلسلة الثقة', en: 'The browser verifies the server via a CA' }, answer: true },
          { text: { ar: 'الأمان بييجي من تقنية واحدة قوية', en: 'Security comes from one strong technology' }, answer: false },
          { text: { ar: '2FA بتقلّل احتمال الدخول غير المصرّح', en: 'MFA prevents unauthorized logins' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 2-1', en: 'Lesson 2-1 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. في HTTPS، أنهي تشفير بيُستخدم في الاتفاق الآمن على مفاتيح الجلسة؟', en: '1. Which cryptography shares the session key safely in HTTPS?' }, options: [{ ar: 'التشفير المتماثل', en: 'Common-key cryptography' }, { ar: 'التشفير بالمفتاح العام', en: 'Public-key cryptography' }, { ar: 'التوقيع الرقمي', en: 'Digital signature' }, { ar: 'المصادقة الثنائية (2FA)', en: 'Multi-factor authentication' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. أنهي واحد من دول **مش** مصادقة ثنائية؟', en: '2. Which is NOT multi-factor authentication?' }, options: [{ ar: 'كلمة مرور + إشعار موبايل', en: 'Password + phone notification' }, { ar: 'كلمة مرور + كلمة مرور تانية', en: 'Password + a second password' }, { ar: 'بصمة + بطاقة ذكية', en: 'Fingerprint + smart card' }, { ar: 'كلمة مرور + رسالة SMS', en: 'Password + SMS' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. «يكشف تلاعب البيانات ويوفّر عدم التنصل» — أنهي تقنية؟', en: '3. "Detects tampering and provides non-repudiation" — which?' }, options: [{ ar: 'التشفير', en: 'Encryption' }, { ar: 'التوقيع الرقمي', en: 'Digital signature' }, { ar: 'الشهادة الرقمية', en: 'Digital certificate' }, { ar: 'جدار الحماية', en: 'Firewall' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. HTTPS بيتبادل كل البيانات باستخدام التشفير بالمفتاح العام.', en: '4. HTTPS exchanges all data using public-key cryptography.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. الشهادة الرقمية بتتحقق إن الطرف المقابل حقيقي.', en: '5. A digital certificate verifies the partner is authentic.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. استخدام كلمتين مرور يُعتبر مصادقة ثنائية.', en: '6. Using two passwords counts as MFA.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '7. لو كلمة المرور اتسرّبت، عامل الحيازة (OTP على الموبايل) لسه بيمنع الدخول.', en: '7. If the password leaks, a possession factor still blocks login.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اذكر مراحل مصافحة TLS التلاتة وإيه اللي بيحصل في كل واحدة.', en: '8. Name the three stages of the TLS handshake and what happens in each.' },
          points: [{ ar: '① التحقق من الشهادة: صلاحيتها وسلسلة الثقة واسم الموقع.', en: '① Connection: certificate + public key, verified via CA.' }, { ar: '② اشتقاق مفاتيح الجلسة بآليات المفتاح العام، من غير إرسال المفتاح نفسه.', en: '② Key exchange: session key encrypted with the public key, decrypted with the private key.' }, { ar: '③ تبادل البيانات بالتشفير المتماثل.', en: '③ Data exchanged with the common key.' }],
          model: { ar: '① التحقق من الشهادة: الخادم بيبعت شهادته الرقمية، والمتصفح بيتحقق من صلاحيتها وسلسلة الثقة وملاءمتها لاسم الموقع (مفتاح عام). ② مفاتيح الجلسة: الطرفين بيتفاوضوا بآليات المفتاح العام، وكل طرف بيشتق المفتاح عنده من غير ما يتبعت نفسه (مفتاح عام). ③ تبادل البيانات: كل البيانات بتتشفّر بالتشفير المتماثل المشترك (مفتاح متماثل — سريع).', en: '① Connection: the server sends its certificate and public key; the browser verifies it via a CA (public-key). ② Key exchange: the browser creates a common session key, encrypts it with the server’s public key and sends it; the server decrypts it with its private key (public-key). ③ Data: everything is encrypted with the shared common key (common-key — fast).' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اشرح ليه الجمع بين تقنيات الأمان أقوى من تقنية واحدة، بمثال من التسوّق الإلكتروني.', en: '9. Explain why combining security technologies is stronger than one, with an online-shopping example.' },
          points: [{ ar: 'كل تقنية بتواجه تهديد مختلف.', en: 'Each technology tackles a different threat.' }, { ar: 'مثال الخطوات الأربعة في التسوّق.', en: 'The four shopping steps as an example.' }],
          model: { ar: 'لأن كل تقنية بتحمي من تهديد معيّن بس: التشفير ضد التنصّت، والشهادة ضد الموقع المزيّف، والـ2FA ضد الدخول غير المصرّح، والتوقيع ضد التلاعب. في التسوّق: HTTPS يشفّر الاتصال، والمتصفح يفحص شهادة المتجر، والدخول بكلمة مرور + SMS، وتفاصيل الطلب ممكن تتوقّع رقميًا — فبنواجه كل التهديدات مع بعض.', en: 'Each technology only covers certain threats: encryption vs eavesdropping, certificate vs fake sites, MFA vs unauthorized login, signature vs tampering. When shopping: HTTPS encrypts the link, the browser checks the certificate, login uses password + SMS, and the order can be signed — covering all threats together.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. عرّف عوامل المصادقة التلاتة واذكر مثال لكل واحد، وبعدين صمّم مصادقة ثنائية لخدمة بنكية.', en: '10. Define the three authentication factors with an example of each, then design two-factor authentication for a bank.' },
          points: [{ ar: 'معرفة/حيازة/سمات حيوية + مثال لكل واحد.', en: 'Knowledge/possession/biometric + an example each.' }, { ar: 'تصميم من عاملين مختلفين.', en: 'A design using two different factors.' }],
          model: { ar: 'المعرفة: حاجة إنت عارفها (كلمة المرور). الحيازة: حاجة معاك (الموبايل أو بطاقة ذكية). السمات الحيوية: حاجة هي إنت (البصمة أو الوجه). تصميم للبنك: كلمة مرور (معرفة) + كلمة مرور لمرة واحدة OTP بتوصل على موبايل العميل (حيازة).', en: 'Knowledge: something you know (password). Possession: something you have (phone or smart card). Biometric: something you are (fingerprint or face). Bank design: a password (knowledge) + a one-time password sent to the customer’s phone (possession).' } } },
      ],
    },
  ],
});
