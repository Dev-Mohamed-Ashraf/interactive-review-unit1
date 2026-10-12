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
    ar: 'كل مرة بتدخل **تطبيق البنك**، أو تشتري حاجة **أونلاين**، أو تفتح موقع جنبه **قفل صغير 🔒** — فيه تقنيات مستخبية شغّالة تحميك: الرسايل __بتتشفّر__ فمحدش غيرك يقراها، والموقع __بيثبت إنه حقيقي__، و__هويتك بتتفحص__ قبل ما تدخل. من غيرها كلمات السر ممكن تتسرق والبيانات الخاصة تتقري.',
    en: 'Every time you open a **bank app**, buy something **online**, or visit a site with a small **padlock 🔒** — hidden technologies protect you: messages are __encrypted__ so no one else can read them, the site __proves it is genuine__, and __your identity is checked__ before access. Without them, passwords could be stolen and private data read.',
  },
  keyFact: { ar: 'الاتصال والخدمات الآمنة على الإنترنت بتعتمد على __الجمع بين التشفير والمصادقة__ — مش على تقنية واحدة لوحدها.', en: 'Secure online communication and services depend on __combining cryptography and authentication__ — not on any single technology.' },
  concepts: ['HTTPS', 'common-key cryptography', 'public-key cryptography', 'TLS handshake', 'multi-factor authentication', 'digital signature', 'digital certificate', 'non-repudiation'],
  objectives: [
    { ar: 'أشرح إزاي HTTPS بيأمّن الاتصال: إزاي مصافحة TLS بتستخدم التشفير بالمفتاح العام عشان تشارك مفتاح بأمان، وإزاي التشفير بالمفتاح المتناظر بيحمي البيانات بعدها.', en: 'Explain how HTTPS secures communication: how the TLS handshake uses public-key cryptography to share a key safely, and how common-key cryptography then protects the data.' },
    { ar: 'أوصف إزاي المصادقة — ومنها المصادقة متعددة العوامل — بتتستخدم في خدمات حقيقية، وأشرح ليه تقنيات الأمان بتتجمع مع بعض.', en: 'Describe how authentication, including multi-factor authentication, is used in real services, and explain why security technologies are combined.' },
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
              { emoji: '🔐', text: { ar: 'إن الاتصال مشفّر والموقع اتأكّدنا إنه حقيقي', en: 'The connection is encrypted and the site is verified' } },
              { emoji: '⚡', text: { ar: 'إن الموقع أسرع من غيره', en: 'The site is faster than others' } },
            ],
            after: { ar: 'تعالى نشوف إيه اللي ممكن يحصل لو القفل ده __مش__ موجود 👇', en: 'Let’s see what can happen when that padlock is __missing__ 👇' } },
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
            { ar: '🛡️ بروتوكول __HTTPS__ بيمنع التلاتة: التنصت، والتعديل، والانتحال.', en: '🛡️ The __HTTPS__ protocol stops all three: eavesdropping, tampering and impersonation.' },
            { ar: 'الشخصيات: **المتصفح** = جهازك · **الخادم** = موقع البنك · **جهة إصدار الشهادات (CA)** = بتضمن إن الموقع حقيقي.', en: 'The players: **browser** = your device · **server** = the bank site · **certificate authority (CA)** = vouches that the site is real.' },
            { ar: '**المرحلة ①** الخادم بيبعت __شهادة رقمية__ 📜 + __مفتاح عام__ 🔓 (قفل مفتوح أي حد ياخده) — و__المفتاح الخاص__ 🔐 بيفضل معاه هو بس.', en: '**Stage ①** The server sends a __digital certificate__ 📜 + a __public key__ 🔓 (an open lock anyone may take) — the __private key__ 🔐 stays with it only.' },
            { ar: '**المرحلة ①** المتصفح بيسأل __جهة إصدار الشهادات__: الشهادة سليمة؟ ✅ أيوه وموقّعة → يبقى ده __البنك الحقيقي__.', en: '**Stage ①** The browser asks the __certificate authority__: is the certificate valid? ✅ Yes, signed → this is __the real bank__.' },
            { ar: '**المرحلة ②** المتصفح بيعمل __مفتاح جلسة جديد__ 🔑 — وده __مفتاح متناظر__ (نفس المفتاح بيقفل وبيفتح).', en: '**Stage ②** The browser creates a __new session key__ 🔑 — a __symmetric (common) key__ (the same key locks and unlocks).' },
            { ar: '**المرحلة ②** يحطه في صندوق و__يقفله بالمفتاح العام__. ⚠️ المفتاح العام __مش بيتحوّل__ لمتناظر — هو بس القفل اللي بيوصّل المفتاح الجديد.', en: '**Stage ②** It puts it in a box and __locks it with the public key__. ⚠️ The public key is __not converted__ into a common key — it is only the lock that delivers the new key.' },
            { ar: '**المرحلة ②** المهاجم مسك الصندوق في السكة… بس __مايقدرش يفتحه__ ❌ لأن مفيش معاه __المفتاح الخاص__.', en: '**Stage ②** The attacker grabs the box on the way… but __cannot open it__ ❌ — he has no __private key__.' },
            { ar: '**المرحلة ②** الخادم __يفتحه بمفتاحه الخاص__ 🔐 → دلوقتي الطرفين معاهم __نفس مفتاح الجلسة__ 🤝.', en: '**Stage ②** The server __opens it with its private key__ 🔐 → now both sides share __the same session key__ 🤝.' },
            { ar: '**المرحلة ③** كل البيانات __بتتشفّر بالمفتاح المتناظر__ — سريع جدًا ⚡ — والمهاجم مش شايف غير رموز ملهاش معنى 🤯.', en: '**Stage ③** All data is __encrypted with the common key__ — very fast ⚡ — and the attacker sees only meaningless symbols 🤯.' },
            { ar: '📌 **الخلاصة:** المفتاح العام → __توصيل مفتاح الجلسة بأمان__ · المفتاح المتناظر → __البيانات بسرعة__ ⇒ __أمان + سرعة__.', en: '📌 **The point:** public key → __deliver the session key safely__ · common key → __move the data fast__ ⇒ __security + speed__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ تحت بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎬 قصة متحركة: إزاي HTTPS بيحميك؟', en: '🎬 Animated story: how HTTPS protects you' },
          enTitle: 'HTTPS as a story',
          terms: ['digital certificate', 'public key', 'private key', 'session key'],
          visual: { anim: 'tlsStory' },
          beats: [
            { ar: 'تعالى نتفرّج على القصة كأنها فيلم 🎬: **المتصفح** (جهازك) عايز يتكلم مع **الخادم** (موقع البنك) بأمان.', en: 'Watch it like a film 🎬: the **browser** (your device) wants to talk to the **server** (the bank site) safely.' },
            { ar: '**①** الخادم بيدّي المتصفح __شهادة رقمية__ 📜 و__مفتاح عام__ 🔓 — والمفتاح __الخاص__ بيفضل معاه هو بس.', en: '**①** The server gives the browser a __digital certificate__ 📜 and a __public key__ 🔓 — the __private__ key stays with it only.' },
            { ar: '**①** المتصفح بيتأكد من الشهادة عند __جهة إصدار الشهادات (CA)__ ✅ — يبقى ده البنك الحقيقي.', en: '**①** The browser checks the certificate with the __certificate authority (CA)__ ✅ — so this is the real bank.' },
            { ar: '**②** المتصفح __بيعمل مفتاح جلسة جديد__ (متناظر) 🔑 و__يقفله بالمفتاح العام__ في صندوق. (المفتاح العام __مش بيتحوّل__ لمتناظر — ده قفل بنستخدمه نوصّل بيه المفتاح الجديد.)', en: '**②** The browser __creates a new session key__ (common key) 🔑 and __locks it with the public key__ in a box. (The public key is __not converted__ into a common key — it is just the padlock used to deliver the new key.)' },
            { ar: '**②** المهاجم مسك الصندوق في السكة… بس __مايقدرش يفتحه__ — مفيش معاه المفتاح الخاص ❌.', en: '**②** The attacker grabs the box on the way… but __cannot open it__ — he has no private key ❌.' },
            { ar: '**②** الخادم __بيفتحه بمفتاحه الخاص__ ← دلوقتي الاتنين معاهم __نفس مفتاح الجلسة__ 🤝.', en: '**②** The server __opens it with its private key__ → now both share __the same session key__ 🤝.' },
            { ar: '**③** من هنا ورايح كل الرسايل __بتتقفل بالمفتاح المتناظر__ — سريع جدًا ⚡ والمهاجم مش فاهم حاجة.', en: '**③** From now on every message is __locked with the common key__ — very fast ⚡ and the attacker understands nothing.' },
            { ar: '📌 **الخلاصة:** المفتاح العام لـ__توصيل مفتاح الجلسة بأمان__، والمتناظر لـ__البيانات بسرعة__ ⇒ أمان + سرعة.', en: '📌 **The point:** public key to __deliver the session key safely__, common key to __move the data fast__ ⇒ security + speed.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'القصة شغّالة زي الفيديو: ▶ / ⏸ / ⟲ فوق. وكل ما تدوس «التالي» بتروح للمشهد اللي بعده.', en: 'The story plays like a video: ▶ / ⏸ / ⟲ at the top. Each "Next" jumps to the following scene.' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'من غير حماية: 3 تهديدات حقيقية', en: 'Without protection: three real threats' },
          enTitle: 'Eavesdropping · Tampering · Impersonation',
          terms: ['eavesdropping', 'tampering', 'impersonation', 'HTTPS'],
          visual: { anim: 'threatsDemo' },
          beats: [
            { ar: '**التنصّت:** لو الاتصال __مش مشفّر__، أي حد في السكة (زي واي فاي عام) يقدر __يقرا__ كلمة السر والرسايل.', en: '**Eavesdropping:** if the connection is __not encrypted__, anyone on the path (e.g. public Wi-Fi) can __read__ passwords and messages.' },
            { ar: '**التلاعب:** المهاجم ممكن __يغيّر__ الرسالة وهي ماشية — «حوّل 100» تبقى «حوّل 10,000» — والمستقبِل مايعرفش.', en: '**Tampering:** an attacker can __change__ the message in transit — "send 100" becomes "send 10,000" — and the receiver never knows.' },
            { ar: '**انتحال الهوية:** موقع مزيّف __بيدّعي إنه البنك__ عشان تسلّمه بياناتك بإيدك.', en: '**Impersonation:** a fake site __pretends to be the bank__ so you hand it your data yourself.' },
            { ar: '**HTTPS (HTTP Secure):** بروتوكول اتصال بيضيف __تشفير TLS__ لـ HTTP، فيوفّر **التشفير** و**كشف التلاعب** و**التحقق من هوية الطرف المقابل** — ويحمي من التنصّت والتلاعب وانتحال الهوية. وإجراء إنشاء الاتصال الآمن اسمه **مصافحة TLS**.', en: '**HTTPS (HTTP Secure):** a protocol that adds __TLS encryption__ to HTTP, providing **encryption**, **tamper detection** and **verification of the partner** — protecting against eavesdropping, tampering and impersonation. Setting up the secure connection is the **TLS handshake**.' },
          ],
          notes: [{ kind: 'exam', text: { ar: 'HTTPS = HTTP + __تشفير TLS__ ← (تشفير · كشف تلاعب · تحقق من الطرف التاني).', en: 'HTTPS = HTTP + __TLS encryption__ → (encryption · tamper detection · partner verification).' } }],
        },
        {
          type: 'scene',
          title: { ar: 'البيانات بتتقفل قبل ما تمشي في السكة', en: 'Data is locked before it travels' },
          visual: { anim: 'photo', props: { img: 'img/cy-https.webp', hotspots: [
            { x: 17, y: 42, icon: 'lock', label: { ar: 'الرسالة بتتقفل (تتشفّر)', en: 'the message is locked (encrypted)' }, beat: 0 },
            { x: 50, y: 50, icon: 'tunnel', label: { ar: 'تمشي مشفّرة — محدش يقراها', en: 'travels encrypted — unreadable' }, beat: 0 },
            { x: 22, y: 75, icon: 'key', label: { ar: 'مفتاح للقفل…', en: 'a key to lock…' }, beat: 1 },
            { x: 72, y: 72, icon: 'key', label: { ar: '…ومفتاح للفتح', en: '…and a key to open' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'التشفير = نحوّل الرسالة لـ__رموز مالهاش معنى__ قبل ما تتبعت، فلو حد مسكها في السكة مايفهمش حاجة.', en: 'Encryption = turning the message into __meaningless symbols__ before sending, so anyone who grabs it on the way understands nothing.' },
            { ar: 'السؤال المهم: __مين معاه مفتاح الفتح؟__ وإزاي يوصله بأمان؟ ده اللي هيفرّق بين نوعين التشفير. 👇', en: 'The key question: __who holds the opening key?__ And how does it get there safely? That is what separates the two kinds of encryption. 👇' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'النوع الأول: التشفير بالمفتاح المتناظر (المشترك)', en: 'Type 1: common-key (symmetric) cryptography' },
          enTitle: 'Common-key cryptography',
          terms: ['common-key', 'symmetric-key'],
          visual: { anim: 'commonKey' },
          beats: [
            { ar: '**التشفير بالمفتاح المتناظر:** __مفتاح واحد مشترك__ بيستخدم للتشفير… جرّب تحرّك المفتاح تحت وشوف الحروف بتتغيّر!', en: '**Common-key cryptography:** __one shared key__ is used to encrypt… move the key slider below and watch the letters change!' },
            { ar: '…و__نفس المفتاح__ بيفك التشفير ويرجّع الرسالة زي ما كانت.', en: '…and __the same key__ decrypts it, giving back the original message.' },
            { ar: 'ميزته الكبيرة: __سريع جدًا__ — مناسب لـ__تبادل كميات كبيرة من البيانات__.', en: 'Its big strength: __very fast__ — ideal for __exchanging large amounts of data__.' },
            { ar: 'عيبه: لازم الطرفين __يتشاركوا المفتاح الأول بأمان__ — ولو المفتاح اتسرق في السكة، كل الرسايل تتكشف. المشكلة دي بالظبط هي اللي بيحلّها المفتاح العام.', en: 'Its weakness: both sides must __first share the key safely__ — and if it is stolen on the way, every message is exposed. Exactly the problem public-key solves.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'النوع التاني: التشفير بالمفتاح العام', en: 'Type 2: public-key cryptography' },
          enTitle: 'Public-key cryptography',
          terms: ['public key', 'private key', 'key pair'],
          visual: { anim: 'keyPair' },
          beats: [
            { ar: '**التشفير بالمفتاح العام:** لكل طرف __مفتاحين مرتبطين__ — **مفتاح عام** بيوزّعه للكل، و**مفتاح خاص** بيخبّيه. اللي يتقفل بالعام __مايتفتحش غير بالخاص__.', en: '**Public-key cryptography:** each side has __two linked keys__ — a **public key** shared with everyone and a **private key** kept secret. What the public key locks __only the private key opens__.' },
            { ar: 'المتصفح ياخد المفتاح العام بتاع الخادم (القفل المفتوح 🔓) ويقفل بيه صندوق فيه السر.', en: 'The browser takes the server’s public key (the open padlock 🔓) and locks a box holding the secret.' },
            { ar: 'المهاجم لو مسك الصندوق __مايقدرش يفتحه__ — الخادم بس يفتحه بمفتاحه الخاص. ميزته: تقدر تبعت سر لحد __من غير ما تكونوا اتفقتوا على مفتاح قبل كده__.', en: 'An attacker who grabs the box __cannot open it__ — only the server can, with its private key. Strength: you can send a secret __with no key agreed beforehand__.' },
            { ar: 'عيبه: __بطيء نسبيًا__ على البيانات الكتير — عشان كده مش بنستخدمه لكل الكلام.', en: 'Weakness: __relatively slow__ for lots of data — so we don’t use it for everything.' },
          ],
          notes: [
            { kind: 'confuse', title: { ar: 'فرق بيلخبط — نوعين التشفير', en: 'Easily confused — the two types' }, text: { ar: '**مفتاح عام** = مفتاحين (العام يقفل، الخاص يفتح)، بطيء، لمشاركة المفتاح. **مفتاح متناظر** = مفتاح واحد، سريع، لتبادل البيانات.', en: '**Public-key** = a key pair (public locks, private opens), slow, for sharing the key. **Common-key** = one key, fast, for the data.' } },
            { kind: 'tip', text: { ar: 'في **التوقيع الرقمي** الاتجاه بيتعكس: المفتاح __الخاص بيوقّع__ والعام __بيتحقّق__ — هنشوفه في الجزء التالت.', en: 'In a **digital signature** the direction reverses: the __private key signs__ and the public key __verifies__ — coming in part 3.' } },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'مصافحة TLS: 3 مراحل بتحصل في أقل من ثانية', en: 'The TLS handshake: 3 stages in under a second' },
          enTitle: 'HTTPS Communication Flow',
          terms: ['TLS handshake', 'digital certificate', 'certificate authority (CA)', 'session key'],
          visual: { anim: 'tlsHandshake' },
          beats: [
            { ar: 'تلات أطراف: **المتصفح** (إنت) و**خادم الويب** و**جهة إصدار الشهادات (CA)**. المصافحة بتحصل __قبل__ أي بيانات، وفي أقل من ثانية.', en: 'Three players: the **browser** (you), the **web server**, and the **certificate authority (CA)**. The handshake happens __before__ any data, in under a second.' },
            { ar: '**① الاتصال:** الخادم يبعت للمتصفح __شهادة رقمية + مفتاح عام__ 🔓. ← تشفير بالمفتاح العام.', en: '**① Connection:** the server sends the browser a __digital certificate + public key__ 🔓. → public-key cryptography.' },
            { ar: '**① (كمّلة):** المتصفح __يتحقق من هوية الخادم__ عن طريق __جهة إصدار الشهادات (CA)__: الشهادة سليمة؟ ✅ يبقى الموقع حقيقي مش مزيّف.', en: '**① (cont.):** the browser __verifies the server__ through the __certificate authority (CA)__: valid certificate? ✅ the site is real, not fake.' },
            { ar: '**② تبادل المفتاح:** المتصفح __يعمل مفتاح متناظر للجلسة__ 🔑، __يقفله بالمفتاح العام للخادم__ ويبعته. ← تشفير بالمفتاح العام.', en: '**② Key exchange:** the browser __creates a common session key__ 🔑, __locks it with the server’s public key__ and sends it. → public-key cryptography.' },
            { ar: '**② (كمّلة):** الخادم __يفكّه بمفتاحه الخاص__ — ودلوقتي __الاتنين معاهم نفس مفتاح الجلسة__، ومحدش غيرهم يعرفه.', en: '**② (cont.):** the server __opens it with its private key__ — now __both hold the same session key__, and no one else knows it.' },
            { ar: '**③ تبادل البيانات:** كل البيانات (صفحات، كلمات سر، صور) __بتتشفّر بالمفتاح المتناظر المشترك__ — بسرعة ⚡. المتنصّت شايف رموز بس. ← تشفير بالمفتاح المتناظر.', en: '**③ Data communication:** all data (pages, passwords, images) is __encrypted with the shared common key__ — fast ⚡. An eavesdropper sees only symbols. → common-key cryptography.' },
            { ar: '**تقسيم الأدوار:** المفتاح العام لـ«__مشاركة المفتاح بأمان__»، والمتناظر لـ«__تبادل بيانات كتير بسرعة__» — فنكسب __الأمان والسرعة مع بعض__.', en: '**Division of roles:** public-key to "__share the key safely__", common-key to "__exchange lots of data quickly__" — giving __security and speed together__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«HTTPS بيتبادل __كل__ البيانات بالمفتاح العام» ← __غلط__ (بطيء). المفتاح العام لتبادل المفتاح، والمتناظر للبيانات.', en: '"HTTPS exchanges __all__ data with public-key" → __false__ (too slow). Public-key for the key, common-key for the data.' } },
            { kind: 'fact', text: { ar: 'ملاحظة من الكتاب: ده __طريقة من الطرق__ لمشاركة المفتاح؛ إصدارات TLS الحديثة بتستخدم __اتفاق مفاتيح ديفي–هيلمان__ بدلها.', en: 'Textbook note: this is __one way__ to share the key; current TLS versions use __Diffie-Hellman key agreement__ instead.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل مرحلة من مصافحة TLS بتستخدم أنهي نوع تشفير؟', en: 'Which cryptography does each TLS stage use?' },
            groups: [{ icon: 'unlock', label: { ar: 'مفتاح عام', en: 'Public-key' } }, { icon: 'key', label: { ar: 'مفتاح متناظر', en: 'Common-key' } }],
            items: [
              { text: { ar: '① الخادم يبعت شهادته + مفتاحه العام', en: '① Server sends certificate + public key' }, group: 0 },
              { text: { ar: '② المتصفح يبعت مفتاح الجلسة مقفول', en: '② Browser sends the locked session key' }, group: 0 },
              { text: { ar: '③ تبادل الصفحات والصور والبيانات', en: '③ Exchanging pages, images and data' }, group: 1 },
            ],
            explain: { ar: 'أول مرحلتين بالمفتاح __العام__ (عشان المفتاح يوصل بأمان)، والتالتة بالمتناظر (عشان السرعة).', en: 'The first two stages use __public-key__ (to deliver the key safely); the third uses common-key (for speed).' } },
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
            explain: { ar: 'المفتاح العام __بطيء__، فبنستخدمه مرة واحدة لتوصيل مفتاح الجلسة، وبعدها المتناظر __السريع__. (والعام مايفتحش — الخاص هو اللي يفتح.)', en: 'Public-key is __slow__, so it is used once to deliver the session key, then the __fast__ common key. (And the public key cannot decrypt — the private key does.)' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (3)', en: '✋ Check yourself (3)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'في التشفير بالمفتاح المتناظر نفس المفتاح بيقفل وبيفتح.', en: 'In common-key cryptography the same key locks and unlocks.' }, answer: true },
            { text: { ar: 'المفتاح الخاص بيتوزّع على كل الناس عشان يقدروا يبعتوا رسايل.', en: 'The private key is handed to everyone so they can send messages.' }, answer: false, explain: { ar: 'اللي بيتوزّع هو __العام__؛ الخاص __سرّي__ مع صاحبه بس.', en: 'The __public__ key is shared; the private key stays __secret__ with its owner.' } },
            { text: { ar: 'المتصفح بيتحقق من هوية الخادم عن طريق جهة إصدار الشهادات (CA).', en: 'The browser verifies the server through a certificate authority (CA).' }, answer: true },
            { text: { ar: 'مصافحة TLS بتحصل بعد ما البيانات كلها تتبادل.', en: 'The TLS handshake happens after all the data has been exchanged.' }, answer: false, explain: { ar: 'المصافحة هي __أول حاجة__: تأسيس الاتصال الآمن قبل البيانات.', en: 'The handshake comes __first__: setting up the secure connection before any data.' } },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**HTTPS** = HTTP + تشفير TLS ← تشفير، كشف تلاعب، تحقق من الطرف — ضد التنصّت والتلاعب وانتحال الهوية.', en: '**HTTPS** = HTTP + TLS ← encryption, tamper detection, partner verification — against eavesdropping, tampering, impersonation.' },
            { ar: '**المفتاح المتناظر:** مفتاح واحد · __سريع__ · لتبادل البيانات · مشكلته: توصيل المفتاح.', en: '**Common-key:** one key · __fast__ · for the data · problem: delivering the key.' },
            { ar: '**المفتاح العام:** عام يقفل + خاص يفتح · __بطيء__ · لمشاركة المفتاح بأمان.', en: '**Public-key:** public locks + private opens · __slow__ · for sharing the key safely.' },
            { ar: '**مصافحة TLS:** ① شهادة + مفتاح عام (تحقق عبر CA) ② مفتاح الجلسة مقفول بالعام ③ البيانات بالمتناظر.', en: '**TLS handshake:** ① certificate + public key (verified via CA) ② session key locked with public key ③ data with common key.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · authentication in real services ───────────── */
    {
      id: 'auth', kind: 'learn',
      title: { ar: 'المصادقة في الخدمات الحقيقية (MFA)', en: 'Authentication in real services (MFA)' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'كلمة سر حسابك اتسرّبت في موقع تاني. إيه اللي ممكن لسه يحمي حسابك؟', en: 'Your password leaked from another site. What could still protect your account?' },
            options: [
              { emoji: '🔁', text: { ar: 'كلمة سر تانية جنب الأولى', en: 'A second password' } },
              { emoji: '📱', text: { ar: 'كود بيوصل على موبايلي', en: 'A code sent to my phone' } },
              { emoji: '🤷', text: { ar: 'مفيش حاجة تحميه', en: 'Nothing can protect it' } },
            ],
            after: { ar: 'خلّي إجابتك في دماغك… وشوف التجربة 👇', en: 'Keep your answer in mind… and watch the experiment 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: المصادقة متعددة العوامل مشهد بمشهد', en: '🎞️ Full animation: multi-factor authentication scene by scene' },
          enTitle: 'Multi-factor authentication, scene by scene',
          terms: ['knowledge', 'possession', 'biometric', 'multi-factor authentication'],
          visual: { anim: 'mfaMovie' },
          beats: [
            { ar: '🧠 حساب أحمد في البنك محمي بـ__كلمة سر بس__ — يعني __عامل واحد__ (المعرفة). أحمد شايف إن ده كفاية… تعالوا نشوف.', en: '🧠 Ahmed’s bank account is protected by __a password only__ — __one factor__ (knowledge). Ahmed thinks that is enough… let’s see.' },
            { ar: '🚨 موقع تاني اتسرّق وكلمة سر أحمد بقت في __قايمة مسرّبة__ — المهاجم دخل بيها على طول، لأن __العامل الوحيد اتكسر__.', en: '🚨 Another site was breached and Ahmed’s password ended up in a __leaked list__ — the attacker walks right in, because __the only factor broke__.' },
            { ar: '🔐 أحمد فعّل **المصادقة متعددة العوامل (MFA)**: كلمة السر 🧠 (__معرفة__) + __كود بيوصل على موبايله__ 📱 (__حيازة__).', en: '🔐 Ahmed turns on **multi-factor authentication (MFA)**: password 🧠 (__knowledge__) + __a code sent to his phone__ 📱 (__possession__).' },
            { ar: '⛔ المهاجم جرّب تاني: كلمة السر صح… بس البنك طلب الكود، والكود راح __لموبايل أحمد__ مش للمهاجم — فـ__اتمنع__.', en: '⛔ The attacker tries again: the password is right… but the bank asks for the code, and it goes __to Ahmed’s phone__, not the attacker — __blocked__.' },
            { ar: '✅ أحمد بيدخل عادي: كلمة السر + الكود من موبايله — __عاملين من نوعين مختلفين__.', en: '✅ Ahmed signs in normally: password + the code from his phone — __two different kinds of factor__.' },
            { ar: '⚠️ **فخ الامتحان:** __كلمتين سر__ = نفس العامل (معرفة) مرتين ⇒ __مش__ MFA — المهاجم ممكن يسرق الاتنين من نفس القايمة.', en: '⚠️ **Exam trap:** __two passwords__ = the same factor (knowledge) twice ⇒ __not__ MFA — the attacker can steal both from the same list.' },
            { ar: '📌 **الخلاصة:** عوامل المصادقة التلاتة: **المعرفة** (حاجة إنت عارفها) · **الحيازة** (حاجة معاك) · **الحيوية** (حاجة هي إنت). **MFA** = اتنين أو أكتر من __عوامل مختلفة__.', en: '📌 **The point:** the three factors: **knowledge** (something you know) · **possession** (something you have) · **biometric** (something you are). **MFA** = two or more __different factors__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎬 قصة متحركة: كلمة سر أحمد اتسرّبت!', en: '🎬 Animated story: Ahmed’s password leaked!' },
          enTitle: 'Why one factor is not enough',
          terms: ['knowledge', 'possession', 'multi-factor authentication'],
          visual: { anim: 'mfaStory' },
          beats: [
            { ar: 'أحمد حسابه في البنك محمي بـ__كلمة سر بس__ — يعني __عامل واحد__ (المعرفة 🧠).', en: 'Ahmed’s bank account is protected by __a password only__ — __one factor__ (knowledge 🧠).' },
            { ar: '**①** موقع تاني اتسرّق وكلمة السر بقت في __قايمة مسرّبة__ — المهاجم دخل على طول، لأن __العامل الوحيد اتكسر__ 🚨.', en: '**①** Another site was breached and the password ended up in a __leaked list__ — the attacker walks right in, because __the only factor broke__ 🚨.' },
            { ar: '**②** أحمد فعّل **المصادقة متعددة العوامل**: كلمة سر 🧠 + __كود على موبايله__ 📱 (عامل __حيازة__).', en: '**②** Ahmed turns on **multi-factor authentication**: password 🧠 + a __code on his phone__ 📱 (a __possession__ factor).' },
            { ar: '**③** المهاجم جرّب تاني: كلمة السر صح… بس الكود راح __لموبايل أحمد__ — المهاجم __اتمنع__ ⛔.', en: '**③** The attacker tries again: the password is right… but the code goes __to Ahmed’s phone__ — the attacker is __blocked__ ⛔.' },
            { ar: '**④** أحمد بيدخل عادي بـ__عاملين من نوعين مختلفين__: كلمة السر + الكود ✅.', en: '**④** Ahmed signs in normally with __two different kinds of factor__: password + code ✅.' },
            { ar: '⚠️ **فخ:** كلمتين سر = نفس العامل مرتين ⇒ __مش__ MFA — المهاجم ممكن يسرق الاتنين من نفس القايمة.', en: '⚠️ **Trap:** two passwords = the same factor twice ⇒ __not__ MFA — the attacker can steal both from the same list.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'تلات عوامل… والأمان في الجمع بينها', en: 'Three factors… security comes from combining them' },
          enTitle: 'Multi-factor authentication',
          terms: ['knowledge', 'possession', 'biometric', 'multi-factor authentication'],
          visual: { anim: 'mfaDemo' },
          beats: [
            { ar: 'عوامل المصادقة التلاتة: **المعرفة** (حاجة إنت عارفها: كلمة سر) · **الحيازة** (حاجة معاك: موبايل/كارت ذكي) · **الحيوية** (حاجة هي إنت: بصمة/وجه).', en: 'The three factors: **knowledge** (something you know: password) · **possession** (something you have: phone/smart card) · **biometric** (something you are: fingerprint/face).' },
            { ar: 'لو بنستخدم __عامل واحد بس__ (كلمة السر) واتكسر… المهاجم __يدخل__ على طول.', en: 'With __only one factor__ (the password), once it breaks… the attacker __gets in__ immediately.' },
            { ar: '**المصادقة متعددة العوامل (MFA):** الجمع بين __اتنين أو أكتر__ من العوامل التلاتة. كلمة السر اتسرّبت؟ لسه محتاج __الموبايل__ (حيازة) — فالمهاجم __يتمنع__.', en: '**Multi-factor authentication (MFA):** combining __two or more__ of the three factors. Password leaked? The __phone__ (possession) is still needed — so the attacker is __blocked__.' },
            { ar: '⚠️ فخ الامتحان: __كلمتين سر__ = مش MFA، لأن الاتنين نفس العامل (معرفة) — ده تحقق من خطوتين بنفس العامل.', en: '⚠️ Exam trap: __two passwords__ = NOT MFA, both are the same factor (knowledge) — that is two steps with one factor.' },
            { ar: 'أمثلة حقيقية: البنك (كلمة سر + OTP) · السوشيال (كلمة سر + SMS) · لابتوب الشركة (كارت ذكي + بصمة) · التسوّق (كلمة سر + كود 3-D Secure).', en: 'Real examples: banking (password + OTP) · SNS (password + SMS) · company laptop (smart card + fingerprint) · shopping (password + 3-D Secure code).' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'كلمتا مرور ← __ليست__ مصادقة متعددة العوامل (نفس العامل). كلمة مرور + سؤال سري ← برضه __مش__ MFA (الاتنين معرفة).', en: 'Two passwords → __not__ MFA (same factor). Password + secret question → also __not__ MFA (both knowledge).' } },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'بوابة دخول بأكتر من مفتاح', en: 'A login gate with more than one key' },
          visual: { anim: 'photo', props: { img: 'img/cy-mfa.webp', hotspots: [
            { x: 20, y: 45, icon: 'key', label: { ar: 'كلمة السر = معرفة', en: 'password = knowledge' }, beat: 0 },
            { x: 82, y: 62, icon: 'phone', label: { ar: 'الموبايل = حيازة', en: 'phone = possession' }, beat: 1 },
            { x: 78, y: 18, icon: 'fingerprint', label: { ar: 'البصمة = حيوية', en: 'fingerprint = biometric' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'كلمة السر لوحدها زي __مفتاح واحد للبيت__: لو اتنسخ، البيت اتفتح.', en: 'A password alone is like __one house key__: copy it and the house is open.' },
            { ar: 'لما نضيف عامل من __نوع تاني__ (موبايل أو بصمة)، حتى لو كلمة السر اتكسرت __عامل تاني لسه بيمنع الدخول__.', en: 'Add a factor of a __different type__ (phone or fingerprint) and even if the password breaks, __another factor still blocks access__.' },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'صنّف كل حاجة حسب عامل المصادقة بتاعها:', en: 'Sort each item by its authentication factor:' },
            groups: [{ icon: 'brain', label: { ar: 'المعرفة', en: 'Knowledge' } }, { icon: 'phone', label: { ar: 'الحيازة', en: 'Possession' } }, { icon: 'fingerprint', label: { ar: 'الحيوية', en: 'Biometric' } }],
            items: [
              { text: { ar: 'كلمة السر', en: 'Password' }, group: 0 },
              { text: { ar: 'رقم PIN', en: 'PIN' }, group: 0 },
              { text: { ar: 'إجابة سؤال سري', en: 'Secret-question answer' }, group: 0 },
              { text: { ar: 'كود OTP على الموبايل', en: 'OTP code on the phone' }, group: 1 },
              { text: { ar: 'كارت ذكي', en: 'Smart card' }, group: 1 },
              { text: { ar: 'بصمة الإصبع', en: 'Fingerprint' }, group: 2 },
              { text: { ar: 'التعرّف على الوجه', en: 'Face recognition' }, group: 2 },
            ],
            explain: { ar: 'اللي __بتفتكره__ = معرفة · اللي __في إيدك__ = حيازة · اللي __هو جسمك__ = حيوية.', en: 'What you __remember__ = knowledge · what is __in your hand__ = possession · what is __your body__ = biometric.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحد من دول **مش** مصادقة متعددة العوامل؟', en: 'Which of these is **NOT** multi-factor authentication?' },
            options: [
              { ar: 'كلمة سر + إشعار على الموبايل', en: 'Password + phone notification' },
              { ar: 'كلمة سر + سؤال سري', en: 'Password + secret question' },
              { ar: 'بصمة الإصبع + كارت ذكي', en: 'Fingerprint + smart card' },
              { ar: 'كلمة سر + رسالة SMS', en: 'Password + SMS' },
            ],
            answer: 1,
            explain: { ar: 'كلمة السر والسؤال السري __الاتنين معرفة__ — نفس العامل، فمش MFA.', en: 'A password and a secret question are __both knowledge__ — the same factor, so not MFA.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: 'عوامل المصادقة التلاتة: **معرفة** (كلمة سر) · **حيازة** (موبايل/كارت) · **حيوية** (بصمة/وجه).', en: 'Three factors: **knowledge** (password) · **possession** (phone/card) · **biometric** (fingerprint/face).' },
            { ar: '**MFA** = اتنين أو أكتر من __عوامل مختلفة__ — لو عامل اتكسر، التاني لسه بيمنع الدخول.', en: '**MFA** = two or more __different factors__ — if one breaks, another still blocks access.' },
            { ar: 'كلمتين سر = __مش__ MFA (نفس العامل).', en: 'Two passwords = __not__ MFA (same factor).' },
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
          title: { ar: 'التوقيع الرقمي والشهادة الرقمية', en: 'Digital signature and digital certificate' },
          enTitle: 'Digital signature · non-repudiation · digital certificate',
          terms: ['digital signature', 'non-repudiation', 'digital certificate', 'certificate authority'],
          visual: { anim: 'signCert' },
          beats: [
            { ar: '**التوقيع الرقمي:** المرسِل __بيوقّع__ الرسالة بـ__مفتاحه الخاص__ (الاتجاه معكوس عن التشفير).', en: '**Digital signature:** the sender __signs__ the message with __their private key__ (the reverse direction of encryption).' },
            { ar: 'المستقبِل __يتحقّق__ بـ__المفتاح العام__ للمرسِل: لو التوقيع سليم يبقى الرسالة __ماتغيّرتش__ والمرسِل __هو فعلًا__.', en: 'The receiver __verifies__ with the sender’s __public key__: a valid signature means the message is __unchanged__ and the sender is __genuine__.' },
            { ar: 'لو حد غيّر ولو رقم واحد، التحقق __يفشل__ ← التوقيع الرقمي __بيكشف التلاعب وانتحال هوية المرسِل__.', en: 'Change even one digit and verification __fails__ → a digital signature __detects tampering and sender impersonation__.' },
            { ar: '**عدم الإنكار:** المرسِل __مايقدرش ينكر__ بعد كده إنه بعت الرسالة، لأن التوقيع ماطلعش غير من مفتاحه الخاص.', en: '**Non-repudiation:** the sender __cannot deny__ sending the message later, since only their private key could make the signature.' },
            { ar: '**الشهادة الرقمية:** بتتحقق إن __الطرف المقابل حقيقي__ — __جهة إصدار الشهادات (CA)__ بتضمن إن الموقع هو الموقع الحقيقي، والمزيّف بيتكشف.', en: '**Digital certificate:** verifies that __the communication partner is authentic__ — a __certificate authority (CA)__ vouches the site is real, and a fake gets exposed.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'التوقيع الرقمي ← يكشف التلاعب + __عدم الإنكار__. «التوقيع الرقمي يحسّن سرعة الاتصال» ← __غلط__.', en: 'Digital signature → detects tampering + __non-repudiation__. "A digital signature improves speed" → __false__.' } },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'جهة الشهادات: «الختم» اللي بيثبت إن الموقع حقيقي', en: 'The CA: the "stamp" that proves a site is real' },
          visual: { anim: 'photo', props: { img: 'img/cy-cert.webp', hotspots: [
            { x: 28, y: 62, icon: 'stamp', label: { ar: 'جهة الشهادات بتختم', en: 'the CA stamps it' }, beat: 0 },
            { x: 62, y: 45, icon: 'shield', label: { ar: 'المتصفح يتحقق', en: 'the browser checks' }, beat: 1 },
            { x: 78, y: 30, icon: 'lock', label: { ar: '🔒 اتصال آمن', en: '🔒 secure connection' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'جهة إصدار الشهادات (CA) __بتضمن__ إن الموقع حقيقي — زي ختم رسمي على بطاقة هوية.', en: 'A certificate authority (CA) __vouches__ that the site is genuine — like an official stamp on an ID card.' },
            { ar: 'المتصفح __بيفحص الشهادة__ قبل ما يكمّل: سليمة؟ يظهر 🔒. مزيّفة؟ تحذير أحمر ⚠️.', en: 'The browser __checks the certificate__ first: valid? 🔒 appears. Fake? A red warning ⚠️.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'الجمع بين تقنيات الأمان: مثال التسوّق أونلاين', en: 'Combining security technologies: online shopping' },
          enTitle: 'Combinations of Security Technologies',
          visual: { anim: 'securityStack' },
          beats: [
            { ar: '① أول ما تفتح المتجر يبدأ اتصال HTTPS و**التشفير** يمنع قراءة المحتوى من أطراف تالتة (ضد __التنصّت__).', en: '① As you open the shop, HTTPS starts and **encryption** stops third parties reading the content (against __eavesdropping__).' },
            { ar: '② المتصفح يفحص **الشهادة الرقمية** عشان يتأكد إن الوجهة هي __المتجر الحقيقي__ (ضد __الموقع المزيّف__).', en: '② The browser checks the **digital certificate** to confirm it is the __real shop__ (against __fake sites__).' },
            { ar: '③ وقت تسجيل الدخول، **المصادقة متعددة العوامل** (كلمة سر + SMS) تمنع __الدخول غير المصرّح__.', en: '③ At login, **multi-factor authentication** (password + SMS) blocks __unauthorized login__.' },
            { ar: '④ ولما تبعت تفاصيل الطلب، **التوقيع الرقمي** يكشف أي __تلاعب__ في السكة.', en: '④ When you send the order, a **digital signature** detects any __tampering__ on the way.' },
            { ar: 'بالجمع بينهم بنواجه «التنصّت» و«التلاعب» و«انتحال الهوية» و«الدخول غير المصرّح» __في نفس الوقت__ — الأمان مش تقنية واحدة.', en: 'Combined, they tackle "eavesdropping", "tampering", "impersonation" and "unauthorized login" __at the same time__ — security is never one technology.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'التشفير ← يمنع القراءة · التوقيع الرقمي ← يكشف التلاعب + عدم الإنكار · الشهادة الرقمية ← تثبت هوية الموقع · MFA ← تمنع الدخول غير المصرّح.', en: 'Encryption → prevents reading · digital signature → detects tampering + non-repudiation · digital certificate → proves the site’s identity · MFA → blocks unauthorized login.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل مشكلة بالتقنية اللي بتعالجها أساسًا:', en: 'Match each problem with the technology that mainly addresses it:' },
            left: [
              { ar: 'كلمة سر اتسرّبت وحصل دخول غير مصرّح', en: 'A password leaked and an unauthorized login happened' },
              { ar: 'البيانات اتعدّلت أثناء الاتصال', en: 'Data was altered during communication' },
              { ar: 'مستخدم اتوجّه لموقع مزيّف', en: 'A user was led to a fake website' },
              { ar: 'طرف تالت اعترض محتوى الاتصال', en: 'A third party intercepted the content' },
            ],
            right: [{ ar: 'التشفير', en: 'Encryption' }, { ar: 'التوقيع الرقمي', en: 'Digital signature' }, { ar: 'الشهادة الرقمية', en: 'Digital certificate' }, { ar: 'المصادقة متعددة العوامل', en: 'Multi-factor authentication' }],
            answer: [3, 1, 2, 0],
            explain: { ar: 'تسريب كلمة السر ← MFA · التعديل ← التوقيع · الموقع المزيّف ← الشهادة · الاعتراض ← التشفير.', en: 'Leaked password → MFA · alteration → signature · fake site → certificate · interception → encryption.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'أحمد بعت طلب شراء موقّع رقميًا، وبعدين قال «أنا مابعتّش حاجة». إيه اللي يثبت إنه بعت؟', en: 'Ahmed sent a digitally signed order, then said "I never sent it". What proves he did?' },
            options: [
              { ar: 'التوقيع الرقمي — عدم الإنكار', en: 'The digital signature — non-repudiation' },
              { ar: 'الشهادة الرقمية بتاعة المتجر', en: 'The shop’s digital certificate' },
              { ar: 'تشفير الاتصال بالمفتاح المتناظر', en: 'Common-key encryption of the link' },
              { ar: 'كلمة السر اللي دخل بيها', en: 'The password he logged in with' },
            ],
            answer: 0,
            explain: { ar: 'التوقيع ماطلعش غير من __مفتاحه الخاص__، فمايقدرش ينكر — ده **عدم الإنكار**.', en: 'Only __his private key__ could make the signature, so he cannot deny it — **non-repudiation**.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**التوقيع الرقمي:** الخاص يوقّع، العام يتحقق ← يكشف التلاعب وانتحال المرسِل + **عدم الإنكار**.', en: '**Digital signature:** private key signs, public key verifies → detects tampering and impersonation + **non-repudiation**.' },
            { ar: '**الشهادة الرقمية:** تثبت إن الطرف المقابل حقيقي (بضمان جهة الشهادات CA).', en: '**Digital certificate:** proves the partner is genuine (vouched by a CA).' },
            { ar: 'الأمان = **الجمع**: تشفير + شهادات + تواقيع + MFA ← تهديدات كتير في نفس الوقت.', en: 'Security = **combining**: encryption + certificates + signatures + MFA → many threats at once.' },
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
            { text: { ar: 'A) اتصال HTTPS بيستخدم التشفير بالمفتاح العام والتشفير بالمفتاح المتناظر مع بعض.', en: 'A) HTTPS uses both public-key and common-key cryptography.' }, answer: true },
            { text: { ar: 'B) اتصال HTTPS بيتبادل كل البيانات بالتشفير بالمفتاح العام.', en: 'B) HTTPS exchanges all data using public-key cryptography.' }, answer: false },
            { text: { ar: 'C) المصادقة متعددة العوامل بتجمع اتنين أو أكتر من عوامل المصادقة التلاتة.', en: 'C) MFA combines two or more of the three authentication factors.' }, answer: true },
            { text: { ar: 'D) مثال على المصادقة متعددة العوامل: تعيين كلمتين سر.', en: 'D) An example of MFA is setting two passwords.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) المفتاح العام لتبادل المفتاح والمتناظر لتبادل البيانات ← **✓**.', en: 'A) Public-key for key exchange, common-key for data → **✓**.' },
            { ar: 'B) تبادل كل البيانات بالعام __بطيء__، فالمتناظر بيُستخدم للبيانات ← **✗**.', en: 'B) Exchanging all data with public-key would be __slow__ → **✗**.' },
            { ar: 'C) ده التعريف الصحيح ← **✓**.', en: 'C) Correct definition → **✓**.' },
            { ar: 'D) كلمتين السر الاتنين «معرفة» — ده تحقق من خطوتين بنفس العامل، مش MFA ← **✗**.', en: 'D) Both passwords are "knowledge" — two steps with one factor, not MFA → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل تهديد (a–c) بالتقنية المناسبة (A–C):', en: '(2) Match each threat (a–c) with the technology (A–C):' },
            left: [
              { ar: 'a) عايز أمنع أطراف تالتة من قراءة محتوى الاتصال', en: 'a) Stop third parties reading the content' },
              { ar: 'b) عايز أتأكد إن البيانات ماتعدّلتش أثناء الاتصال', en: 'b) Verify data was not altered in transit' },
              { ar: 'c) عايز أتأكد إن الطرف المقابل حقيقي', en: 'c) Verify the partner is authentic' },
            ],
            right: [{ ar: 'A التشفير', en: 'A Encryption' }, { ar: 'B التوقيع الرقمي', en: 'B Digital signature' }, { ar: 'C الشهادة الرقمية', en: 'C Digital certificate' }],
            answer: [0, 1, 2] },
          solution: [
            { ar: 'a: منع القراءة = **التشفير** ← A.', en: 'a: preventing reading = **encryption** → A.' },
            { ar: 'b: كشف التلاعب = **التوقيع الرقمي** ← B.', en: 'b: detecting tampering = **digital signature** → B.' },
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
            { q: { ar: '1. في HTTPS، أنهي طريقة تشفير بتخلّي المتصفح والخادم يتشاركوا مفتاح متناظر بأمان؟', en: '1. In HTTPS, which method lets browser and server share a common key safely?' }, a: { ar: 'التشفير بالمفتاح العام', en: 'Public-key cryptography' } },
            { q: { ar: '2. وبعد مشاركة المفتاح، أنهي طريقة بتتستخدم لتبادل البيانات؟', en: '2. After the key is shared, which method is used for data?' }, a: { ar: 'التشفير بالمفتاح المتناظر', en: 'Common-key cryptography' } },
            { q: { ar: '3. ليه بنجمع بين الطريقتين؟', en: '3. Why combine the two methods?' }, a: { ar: 'العام بيشارك المفتاح بأمان (بس بطيء)، والمتناظر بيبادل البيانات بسرعة ← أمان + سرعة.', en: 'Public-key shares the key safely (but is slow); common-key moves data fast → security + speed.' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'classify', prompt: { ar: 'لكل خدمة، حدّد تركيبة عوامل المصادقة:', en: 'For each service, identify the factor combination:' },
            groups: [{ icon: 'key', label: { ar: 'A معرفة + حيازة', en: 'A Knowledge + possession' } }, { icon: 'fingerprint', label: { ar: 'B معرفة + حيوية', en: 'B Knowledge + biometric' } }, { icon: 'card', label: { ar: 'C حيوية + حيازة', en: 'C Biometric + possession' } }],
            items: [
              { text: { ar: 'a) كلمة سر + كلمة سر لمرة واحدة', en: 'a) Password + one-time password' }, group: 0 },
              { text: { ar: 'b) كلمة سر + بصمة إصبع', en: 'b) Password + fingerprint' }, group: 1 },
              { text: { ar: 'c) كلمة سر + مصادقة SMS', en: 'c) Password + SMS authentication' }, group: 0 },
              { text: { ar: 'd) التعرّف على الوجه + كارت ذكي', en: 'd) Face recognition + smart card' }, group: 2 },
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
            explain: { ar: 'التوقيع الرقمي __بيكشف التلاعب ويوفّر عدم الإنكار__ — مالوش علاقة بالسرعة.', en: 'A digital signature __detects tampering and gives non-repudiation__ — it has nothing to do with speed.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(c):', en: 'Read and fill blanks (a)–(c):' },
            text: { ar: 'اتصال HTTPS بيجمع بين أكتر من تقنية تشفير. الأول، الخادم بيبعت {0} ومفتاح عام للمتصفح، والمتصفح بيتحقق من صحة الخادم عن طريق {1}. بعدين المتصفح بيعمل {2} للاتصال ويشفّره بالمفتاح العام للخادم قبل ما يبعته، وبعد كده كل تبادل البيانات بيتشفّر بالمفتاح ده.', en: 'HTTPS combines several cryptographic technologies. First, the web server sends a {0} and a public key to the browser. The browser verifies the server through {1}. Next, the browser creates a {2} and encrypts it with the server’s public key before sending. After this, all data is encrypted using this key.' },
            bank: [{ ar: 'شهادة رقمية', en: 'digital certificate' }, { ar: 'جهة إصدار الشهادات (CA)', en: 'a certificate authority (CA)' }, { ar: 'مفتاح متناظر', en: 'common key' }, { ar: 'توقيع رقمي', en: 'digital signature' }, { ar: 'مفتاح خاص', en: 'private key' }],
            answer: [0, 1, 2],
            explain: { ar: '(a) شهادة رقمية · (b) جهة إصدار الشهادات CA · (c) مفتاح متناظر. وبنستخدم المتناظر للبيانات لأن العام بطيء على البيانات الكتير.', en: '(a) digital certificate · (b) CA · (c) common key. Common-key is used for data because public-key is slow for bulk data.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'match', prompt: { ar: 'لكل تهديد (a–d)، أنهي تقنية بتعالجه أساسًا؟', en: 'For each threat (a–d), which technology mainly addresses it?' },
            left: [
              { ar: 'a) تسرّبت كلمة سر فحصل دخول غير مصرّح', en: 'a) A password leaked; unauthorized login' },
              { ar: 'b) البيانات اتعدّلت أثناء الاتصال', en: 'b) Data altered in transit' },
              { ar: 'c) مستخدم اتوجّه لموقع مزيّف', en: 'c) A user led to a fake site' },
              { ar: 'd) طرف تالت اعترض محتوى الاتصال', en: 'd) Content intercepted by a third party' },
            ],
            right: [{ ar: 'A التشفير', en: 'A Encryption' }, { ar: 'B التوقيع الرقمي', en: 'B Digital signature' }, { ar: 'C الشهادة الرقمية', en: 'C Digital certificate' }, { ar: 'D المصادقة متعددة العوامل', en: 'D Multi-factor authentication' }],
            answer: [3, 1, 2, 0],
            explain: { ar: 'a→D · b→B · c→C · d→A.', en: 'a→D · b→B · c→C · d→A.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي **مش** مثال مناسب على المصادقة متعددة العوامل:', en: 'Choose the one that is **NOT** an example of MFA:' },
            options: [
              { ar: 'كلمة سر + إشعار على الموبايل', en: 'Password + smartphone notification' },
              { ar: 'كلمة سر + سؤال سري', en: 'Password + secret question' },
              { ar: 'بصمة إصبع + كارت ذكي', en: 'Fingerprint + smart card' },
              { ar: 'كلمة سر + مصادقة SMS', en: 'Password + SMS authentication' },
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
          { front: { ar: 'HTTPS', en: 'HTTPS' }, back: { ar: 'HTTP + تشفير TLS: تشفير، كشف تلاعب، تحقق من هوية الطرف المقابل.', en: 'HTTP + TLS encryption: encryption, tamper detection, partner verification.' } },
          { front: { ar: 'مصافحة TLS', en: 'TLS handshake' }, back: { ar: 'إجراء إنشاء الاتصال الآمن (شهادة + مفتاح عام ← مفتاح جلسة ← بيانات).', en: 'The procedure that sets up the secure connection (certificate + public key → session key → data).' } },
          { front: { ar: 'التشفير بالمفتاح المتناظر', en: 'Common-key cryptography' }, back: { ar: 'مفتاح واحد مشترك للتشفير والفك — سريع — لتبادل البيانات.', en: 'One shared key to encrypt and decrypt — fast — for exchanging data.' } },
          { front: { ar: 'التشفير بالمفتاح العام', en: 'Public-key cryptography' }, back: { ar: 'زوج مفاتيح: العام يقفل والخاص يفتح — بطيء — لمشاركة المفتاح بأمان.', en: 'A key pair: public locks, private opens — slow — for sharing the key safely.' } },
          { front: { ar: 'جهة إصدار الشهادات (CA)', en: 'Certificate authority (CA)' }, back: { ar: 'جهة بتضمن إن الموقع حقيقي، والمتصفح بيتحقق من الخادم عن طريقها.', en: 'A body that vouches a site is genuine; the browser verifies the server through it.' } },
          { front: { ar: 'المصادقة متعددة العوامل', en: 'Multi-factor authentication' }, back: { ar: 'الجمع بين اتنين أو أكتر من: المعرفة · الحيازة · الحيوية.', en: 'Combining two or more of: knowledge · possession · biometric.' } },
          { front: { ar: 'التوقيع الرقمي', en: 'Digital signature' }, back: { ar: 'يكشف تلاعب البيانات وانتحال هوية المرسِل، ويوفّر عدم الإنكار.', en: 'Detects tampering and sender impersonation, and provides non-repudiation.' } },
          { front: { ar: 'عدم الإنكار', en: 'Non-repudiation' }, back: { ar: 'المرسِل مايقدرش ينكر بعد كده إنه بعت البيانات.', en: 'The sender cannot later deny having sent the data.' } },
          { front: { ar: 'الشهادة الرقمية', en: 'Digital certificate' }, back: { ar: 'بتتحقق إن الطرف المقابل في الاتصال حقيقي.', en: 'Verifies that the communication partner is authentic.' } },
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
            prompt: { ar: 'اشرح ليه HTTPS بيستخدم التشفير بالمفتاح العام لمشاركة المفتاح، لكنه بيستخدم التشفير بالمفتاح المتناظر لتبادل البيانات. (أشِر إلى: الأمان والسرعة)', en: 'Explain why HTTPS uses public-key cryptography to share the key but common-key cryptography to exchange the data. (Refer to: security and speed)' },
            points: [
              { ar: 'المفتاح العام بيسمح بتوصيل المفتاح بأمان من غير اتفاق سابق (الخاص بس يفتح).', en: 'Public-key delivers the key safely with no prior agreement (only the private key opens it).' },
              { ar: 'لكنه بطيء على البيانات الكتير.', en: 'But it is slow for large amounts of data.' },
              { ar: 'المتناظر سريع جدًا، بس محتاج المفتاح يوصل الأول بأمان.', en: 'Common-key is very fast but needs the key delivered safely first.' },
              { ar: 'الجمع ← أمان + سرعة.', en: 'Combining → security + speed.' },
            ],
            model: { ar: 'التشفير بالمفتاح العام بيستخدم زوج مفاتيح، واللي يتقفل بالمفتاح العام مايتفتحش غير بالمفتاح الخاص، فالمتصفح يقدر يبعت مفتاح الجلسة للخادم بأمان من غير ما يكونوا اتفقوا على مفتاح قبل كده؛ لكن الطريقة دي بطيئة نسبيًا على كميات البيانات الكبيرة. أما التشفير بالمفتاح المتناظر فبيستخدم مفتاح واحد مشترك وسريع جدًا، بس مشكلته إن المفتاح لازم يوصل للطرفين بأمان الأول. عشان كده HTTPS بيستخدم المفتاح العام مرة واحدة في البداية لتوصيل مفتاح الجلسة بأمان، وبعدها بيستخدم المتناظر السريع لكل البيانات — فيحقق الأمان والسرعة مع بعض.', en: 'Public-key cryptography uses a key pair: what the public key locks only the private key opens, so the browser can send the session key safely with no prior agreement — but it is relatively slow for bulk data. Common-key uses one shared key and is very fast, but the key must first reach both sides safely. So HTTPS uses public-key once at the start to deliver the session key, then the fast common key for all data — achieving security and speed together.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — بوابة المدرسة', en: 'Think as an engineer — school portal' },
            prompt: { ar: 'مدرسة في مدينتك بتبني بوابة إلكترونية الطلاب يشوفوا فيها درجاتهم ويدفعوا الرسوم. لازم تختار طريقة الدخول: (كلمة سر بس) ولا (كلمة سر + كود لمرة واحدة على الموبايل)؟ ١) لو سألت 10 زملاء عن طرق الدخول اللي بيثقوا فيها، إيه المتوقع؟ ٢) لكل فئة — طالب، المدرسة، طالب معندوش موبايل ذكي — اذكر منفعة وعيب لطلب عامل تاني. ٣) قرّر واذكر سببين.', en: 'A school is building a portal where students check grades and pay fees. Choose: (password only) or (password + one-time code on the phone)? 1) What would a survey of ten classmates likely show? 2) For a student, the school, and a student with no smartphone — one benefit and one drawback of a second factor. 3) Decide and give two reasons.' },
            points: [
              { ar: 'نتيجة استبيان متوقعة (أغلبهم بيستخدم/بيثق في OTP أو SMS).', en: 'A likely survey result (most use/trust OTP or SMS).' },
              { ar: 'منفعة وعيب لكل فئة (بما فيهم طالب من غير موبايل).', en: 'A benefit and a drawback for each group (incl. no-smartphone student).' },
              { ar: 'قرار: كلمة سر + OTP، بسبب: كلمة السر لوحدها بتفشل لو اتسرّبت + فيه دفع فلوس.', en: 'Decision: password + OTP, because a password alone fails once leaked + money is involved.' },
              { ar: 'حل للطالب اللي معندوش موبايل (كارت/كود مطبوع).', en: 'A fallback for students without a phone (card/printed codes).' },
            ],
            model: { ar: 'المتوقع إن أغلب الزملاء بيستخدموا كود SMS أو OTP في البنك والسوشيال وبيثقوا فيه. بالنسبة للطالب: المنفعة إن حسابه ودرجاته في أمان، والعيب خطوة زيادة في الدخول. المدرسة: المنفعة حماية المدفوعات والبيانات، والعيب تكلفة الرسايل والدعم. الطالب اللي معندوش موبايل ذكي: المنفعة نفس الأمان، والعيب إنه ممكن مايقدرش يستقبل الكود — فنوفّر له كارت ذكي أو أكواد مطبوعة. القرار: كلمة سر + كود لمرة واحدة، لأن كلمة السر لوحدها لو اتسرّبت أي حد يدخل، ولأن البوابة فيها دفع فلوس فلازم حماية أقوى.', en: 'Most classmates likely use and trust SMS/OTP codes for banking and social media. Student: benefit — account and grades stay safe; drawback — one extra step. School: benefit — protects payments and data; drawback — cost of messages and support. Student with no smartphone: same security benefit, but may not receive the code — provide a smart card or printed codes. Decision: password + one-time code, because a leaked password alone lets anyone in, and the portal handles money so it needs stronger protection.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'متجر إلكتروني صغير عايز يأمّن دخول العملاء والدفع مع بعض. اذكر تقنيتين أمان لازم يستخدمهم وفين كل واحدة بتساعد، وبعدين حدّد تهديد واحد ممكن يفضل موجود.', en: 'A small online shop wants to secure customer login and payment. Name two technologies it should use and where each helps, then identify one threat that could still remain.' },
            points: [
              { ar: 'HTTPS/تشفير للدفع والبيانات (ضد التنصّت).', en: 'HTTPS/encryption for payment and data (against eavesdropping).' },
              { ar: 'MFA لتسجيل الدخول (ضد الدخول غير المصرّح).', en: 'MFA for login (against unauthorized login).' },
              { ar: 'تهديد باقي (مثلًا: التصيّد/خداع العميل نفسه، أو جهاز العميل مصاب).', en: 'A remaining threat (e.g. phishing the customer, or an infected customer device).' },
            ],
            model: { ar: 'يستخدم HTTPS مع شهادة رقمية: التشفير يحمي بيانات الكارت والطلب من التنصّت، والشهادة تثبت للعميل إنه على المتجر الحقيقي. ويستخدم المصادقة متعددة العوامل في الدخول (كلمة سر + SMS) عشان لو كلمة السر اتسرّبت مايدخلش حد غريب. تهديد ممكن يفضل: إن العميل نفسه يتخدع ويدّي الكود لحد بيمثّل إنه خدمة العملاء، أو إن جهازه يكون فيه برنامج خبيث.', en: 'Use HTTPS with a digital certificate: encryption protects card and order data from eavesdropping, and the certificate proves it is the real shop. Use MFA at login (password + SMS) so a leaked password is not enough. A remaining threat: the customer being tricked into giving the code to someone posing as support, or malware on their device.' } },
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
            prompt: { ar: 'لو كلمة السر اتسرّبت، ليه عامل تاني بيوصل للموبايل لسه يقدر يحمي الحساب؟', en: 'If a password is leaked, why can a second factor sent to a phone still keep the account safe?' },
            points: [{ ar: 'العامل التاني من نوع مختلف (حيازة).', en: 'The second factor is a different type (possession).' }, { ar: 'المهاجم معاه كلمة السر بس، مش الموبايل.', en: 'The attacker has the password, not the phone.' }],
            model: { ar: 'لأن العامل التاني من نوع مختلف: كلمة السر «معرفة» لكن الكود اللي على الموبايل «حيازة». المهاجم ممكن يعرف كلمة السر، لكن مش معاه الموبايل نفسه، فمايقدرش يكمّل الدخول.', en: 'Because the second factor is a different type: the password is "knowledge" but the phone code is "possession". The attacker may know the password but does not hold the phone, so cannot finish logging in.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: أنهي حماية من دول بتعتمد عليها أكتر لما تكون أونلاين؟ تحدّى: اقترح إجراء أمان زيادة ممكن متجر إلكتروني يضيفه، وتهديد واحد لسه مش هيشيله.', en: 'Reflect: which protection do you rely on most online? Challenge: suggest one extra measure an online shop could add, and one threat it still would not remove.' },
            points: [{ ar: 'حماية بتعتمد عليها + سبب.', en: 'A protection you rely on + why.' }, { ar: 'إجراء زيادة للمتجر.', en: 'An extra measure for the shop.' }, { ar: 'تهديد باقي.', en: 'A remaining threat.' }],
            model: { ar: 'بعتمد أكتر على HTTPS (القفل) لأني بدخل بياناتي في مواقع كتير. إجراء زيادة للمتجر: يطلب كود 3-D Secure على كل عملية دفع. تهديد باقي: رسايل التصيّد اللي بتخدع العميل يدخل بياناته في موقع شبه المتجر.', en: 'I rely most on HTTPS (the padlock) because I enter data on many sites. Extra measure: require a 3-D Secure code on every payment. Remaining threat: phishing messages that trick customers into a look-alike site.' } },
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
          { text: { ar: 'HTTPS = HTTP + تشفير TLS', en: 'HTTPS = HTTP + TLS encryption' }, answer: true },
          { text: { ar: 'HTTPS بيبادل كل البيانات بالمفتاح العام', en: 'HTTPS sends all data with public-key' }, answer: false },
          { text: { ar: 'المفتاح المتناظر = مفتاح واحد للقفل والفتح', en: 'Common-key = one key to lock and unlock' }, answer: true },
          { text: { ar: 'المفتاح العام أسرع من المتناظر', en: 'Public-key is faster than common-key' }, answer: false },
          { text: { ar: 'اللي يتقفل بالعام يتفتح بالخاص', en: 'What the public key locks, the private key opens' }, answer: true },
          { text: { ar: 'المفتاح الخاص بيتوزّع على الكل', en: 'The private key is shared with everyone' }, answer: false },
          { text: { ar: 'الشهادة الرقمية بتثبت إن الموقع حقيقي', en: 'A digital certificate proves a site is genuine' }, answer: true },
          { text: { ar: 'التوقيع الرقمي بيحسّن سرعة الاتصال', en: 'A digital signature speeds up communication' }, answer: false },
          { text: { ar: 'التوقيع الرقمي بيوفّر عدم الإنكار', en: 'A digital signature gives non-repudiation' }, answer: true },
          { text: { ar: 'كلمتين سر = مصادقة متعددة العوامل', en: 'Two passwords = multi-factor authentication' }, answer: false },
          { text: { ar: 'البصمة عامل «حيوية»', en: 'A fingerprint is a "biometric" factor' }, answer: true },
          { text: { ar: 'الكارت الذكي عامل «معرفة»', en: 'A smart card is a "knowledge" factor' }, answer: false },
          { text: { ar: 'التشفير بيمنع قراءة المحتوى', en: 'Encryption prevents reading the content' }, answer: true },
          { text: { ar: 'المتصفح بيتحقق من الخادم عن طريق CA', en: 'The browser verifies the server via a CA' }, answer: true },
          { text: { ar: 'الأمان بييجي من تقنية واحدة قوية', en: 'Security comes from one strong technology' }, answer: false },
          { text: { ar: 'MFA بتمنع الدخول غير المصرّح', en: 'MFA prevents unauthorized logins' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 2-1', en: 'Lesson 2-1 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. في HTTPS، أنهي تشفير بيُستخدم لمشاركة مفتاح الجلسة بأمان؟', en: '1. Which cryptography shares the session key safely in HTTPS?' }, options: [{ ar: 'التشفير بالمفتاح المتناظر', en: 'Common-key cryptography' }, { ar: 'التشفير بالمفتاح العام', en: 'Public-key cryptography' }, { ar: 'التوقيع الرقمي', en: 'Digital signature' }, { ar: 'المصادقة متعددة العوامل', en: 'Multi-factor authentication' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. أنهي واحد من دول **مش** مصادقة متعددة العوامل؟', en: '2. Which is NOT multi-factor authentication?' }, options: [{ ar: 'كلمة سر + إشعار موبايل', en: 'Password + phone notification' }, { ar: 'كلمة سر + كلمة سر تانية', en: 'Password + a second password' }, { ar: 'بصمة + كارت ذكي', en: 'Fingerprint + smart card' }, { ar: 'كلمة سر + رسالة SMS', en: 'Password + SMS' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. «يكشف تلاعب البيانات ويوفّر عدم الإنكار» — أنهي تقنية؟', en: '3. "Detects tampering and provides non-repudiation" — which?' }, options: [{ ar: 'التشفير', en: 'Encryption' }, { ar: 'التوقيع الرقمي', en: 'Digital signature' }, { ar: 'الشهادة الرقمية', en: 'Digital certificate' }, { ar: 'جدار الحماية', en: 'Firewall' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. HTTPS بيتبادل كل البيانات باستخدام التشفير بالمفتاح العام.', en: '4. HTTPS exchanges all data using public-key cryptography.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. الشهادة الرقمية بتتحقق إن الطرف المقابل حقيقي.', en: '5. A digital certificate verifies the partner is authentic.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. استخدام كلمتين سر يُعتبر مصادقة متعددة العوامل.', en: '6. Using two passwords counts as MFA.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '7. لو كلمة السر اتسرّبت، عامل الحيازة (OTP على الموبايل) لسه بيمنع الدخول.', en: '7. If the password leaks, a possession factor still blocks login.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اذكر مراحل مصافحة TLS التلاتة وإيه اللي بيحصل في كل واحدة.', en: '8. Name the three stages of the TLS handshake and what happens in each.' },
          points: [{ ar: '① الاتصال: شهادة + مفتاح عام، والتحقق عبر CA.', en: '① Connection: certificate + public key, verified via CA.' }, { ar: '② تبادل المفتاح: مفتاح الجلسة مشفّر بالعام ويتفك بالخاص.', en: '② Key exchange: session key encrypted with the public key, decrypted with the private key.' }, { ar: '③ تبادل البيانات بالمفتاح المتناظر.', en: '③ Data exchanged with the common key.' }],
          model: { ar: '① الاتصال: الخادم بيبعت شهادته الرقمية ومفتاحه العام، والمتصفح بيتحقق من هويته عن طريق جهة إصدار الشهادات (مفتاح عام). ② تبادل المفتاح: المتصفح بيعمل مفتاح متناظر للجلسة ويشفّره بالمفتاح العام للخادم ويبعته، والخادم بيفكّه بمفتاحه الخاص (مفتاح عام). ③ تبادل البيانات: كل البيانات بتتشفّر بالمفتاح المتناظر المشترك (مفتاح متناظر — سريع).', en: '① Connection: the server sends its certificate and public key; the browser verifies it via a CA (public-key). ② Key exchange: the browser creates a common session key, encrypts it with the server’s public key and sends it; the server decrypts it with its private key (public-key). ③ Data: everything is encrypted with the shared common key (common-key — fast).' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اشرح ليه الجمع بين تقنيات الأمان أقوى من تقنية واحدة، بمثال من التسوّق الإلكتروني.', en: '9. Explain why combining security technologies is stronger than one, with an online-shopping example.' },
          points: [{ ar: 'كل تقنية بتواجه تهديد مختلف.', en: 'Each technology tackles a different threat.' }, { ar: 'مثال الخطوات الأربعة في التسوّق.', en: 'The four shopping steps as an example.' }],
          model: { ar: 'لأن كل تقنية بتحمي من تهديد معيّن بس: التشفير ضد التنصّت، والشهادة ضد الموقع المزيّف، والـMFA ضد الدخول غير المصرّح، والتوقيع ضد التلاعب. في التسوّق: HTTPS يشفّر الاتصال، والمتصفح يفحص شهادة المتجر، والدخول بكلمة سر + SMS، وتفاصيل الطلب ممكن تتوقّع رقميًا — فبنواجه كل التهديدات مع بعض.', en: 'Each technology only covers certain threats: encryption vs eavesdropping, certificate vs fake sites, MFA vs unauthorized login, signature vs tampering. When shopping: HTTPS encrypts the link, the browser checks the certificate, login uses password + SMS, and the order can be signed — covering all threats together.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. عرّف عوامل المصادقة التلاتة واذكر مثال لكل واحد، وبعدين صمّم مصادقة ثنائية لخدمة بنكية.', en: '10. Define the three authentication factors with an example of each, then design two-factor authentication for a bank.' },
          points: [{ ar: 'معرفة/حيازة/حيوية + مثال لكل واحد.', en: 'Knowledge/possession/biometric + an example each.' }, { ar: 'تصميم من عاملين مختلفين.', en: 'A design using two different factors.' }],
          model: { ar: 'المعرفة: حاجة إنت عارفها (كلمة السر). الحيازة: حاجة معاك (الموبايل أو كارت ذكي). الحيوية: حاجة هي إنت (البصمة أو الوجه). تصميم للبنك: كلمة سر (معرفة) + كلمة سر لمرة واحدة OTP بتوصل على موبايل العميل (حيازة).', en: 'Knowledge: something you know (password). Possession: something you have (phone or smart card). Biometric: something you are (fingerprint or face). Bank design: a password (knowledge) + a one-time password sent to the customer’s phone (possession).' } } },
      ],
    },
  ],
});
