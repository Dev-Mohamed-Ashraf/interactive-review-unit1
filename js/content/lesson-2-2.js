/* =========================================================
 * content/lesson-2-2.js — تصميم أمن الشبكات
 * Pure data. Sources: textbook 2-2 (EN p.41–47) + memo (Arabic wording,
 * deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('2-2', {
  id: '2-2',
  color: '#34d399',
  cover: 'img/cy-l2-cover.webp',
  title: { ar: 'تصميم أمن الشبكات', en: 'Network Security Design' },
  guiding: { ar: 'إزاي المؤسسة تصمّم شبكتها بحيث تفضل محمية حتى لو طبقة دفاع واحدة اتخرقت؟', en: 'How can an organization design its network so that, even if one defense is breached, the system stays protected?' },
  hook: {
    ar: 'شبكة أي مؤسسة شايلة بيانات سرّية: __سجلات العملاء، ملفات مالية، رسايل خاصة__. والمهاجمين بيدوّروا طول الوقت على مدخل. __قفل واحد على الباب__ مش كفاية: لو اتفتح، كل حاجة جوّه اتكشفت. عشان كده أمن الشبكات الحديث بيستخدم **طبقات كتير** — لو طبقة اتخرقت، اللي بعدها لسه بتحمي.',
    en: 'An organization’s network holds confidential data: __customer records, financial files, private messages__. Attackers constantly look for a way in. __A single lock on the door__ is not enough: if it is picked, everything inside is exposed. So modern network security uses **several layers** — if one is breached, the next still protects.',
  },
  keyFact: { ar: 'أمن الشبكات القوي بييجي من __تراكُب الإجراءات__ — جدار حماية، VPN، DMZ، حماية الأجهزة الطرفية — ومن __التحقق من كل وصول__ (انعدام الثقة)، مش من حاجز واحد.', en: 'Strong network security comes from __layering measures__ — firewall, VPN, DMZ, endpoint protection — and from __verifying every access__ (zero trust), not from a single barrier.' },
  concepts: ['firewall', 'VPN', 'DMZ', 'defense in depth', 'zero trust', 'perimeter'],
  objectives: [
    { ar: 'أشرح أدوار جدار الحماية والشبكة الافتراضية الخاصة (VPN) والمنطقة المعزولة (DMZ) في حماية الشبكة.', en: 'Explain the roles of firewalls, VPNs, and DMZs in protecting a network.' },
    { ar: 'أوصف الدفاع في العمق ونهج انعدام الثقة، وأشرح ليه الوصول المتدرّج والمتحقَّق منه أقوى من حاجز واحد.', en: 'Describe defense in depth and zero trust, and explain why layered, verified access is stronger than a single barrier.' },
  ],

  stations: [
    /* ───────────── 1 · firewall · VPN · DMZ ───────────── */
    {
      id: 'blocks', kind: 'learn',
      title: { ar: 'جدار الحماية و VPN و DMZ', en: 'Firewall, VPN and DMZ' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'لو شركة حطّت حارس واحد قوي جدًا على باب المبنى… تفتكر كده بياناتها في أمان؟', en: 'If a company puts one very strong guard at the building door… is its data safe?' },
            options: [
              { emoji: '💪', text: { ar: 'أيوه، حارس قوي كفاية', en: 'Yes, one strong guard is enough' } },
              { emoji: '🧱', text: { ar: 'لأ، محتاجين أكتر من طبقة', en: 'No, it needs more than one layer' } },
              { emoji: '🤔', text: { ar: 'مش متأكد', en: 'Not sure' } },
            ],
            after: { ar: 'تعالى نتفرّج على «قلعة الشركة» 🏰 👇', en: 'Let’s watch "the company fortress" 🏰 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن الكامل: قلعة الشركة مشهد بمشهد', en: '🎞️ Full animation: the company fortress scene by scene' },
          enTitle: 'Network security design, scene by scene',
          terms: ['firewall', 'DMZ', 'VPN', 'defense in depth', 'zero trust'],
          visual: { anim: 'networkMovie' },
          beats: [
            { ar: '🏰 تخيّل شبكة الشركة __قلعة__: بره = الإنترنت (زوار… ومهاجمين)، الاستقبال = __DMZ__، وجوّه = __المكتب الداخلي__ وفيه الكنز: __بيانات العملاء__.', en: '🏰 Picture the company network as a __fortress__: outside = the Internet (visitors… and attackers), reception = the __DMZ__, inside = the __inner office__ with the treasure: __customer data__.' },
            { ar: '**① جدار الحماية** = __حارس على البوابة__ عند نقطة دخول/خروج الشبكة، معاه __قواعد مضبوطة مسبقًا__: الزائر اللي عايز الموقع ✅ يعدّي، والمهاجم اللي عايز قاعدة البيانات على طول ⛔ يتمنع.', en: '**① Firewall** = __a guard at the gate__ at the network’s entry/exit point, with __preset rules__: a visitor who wants the website ✅ passes; an attacker heading straight for the database ⛔ is denied.' },
            { ar: '**② DMZ** = __صالة استقبال منفصلة__ فيها __الخوادم العامة__ (ويب وبريد). حتى لو المهاجم ضرب خادم الويب، __جدار الحماية التاني__ بيمنعه يوصل للشبكة الداخلية.', en: '**② DMZ** = __a separate reception hall__ holding the __public servers__ (web, mail). Even if the attacker hits the web server, __the second firewall__ keeps him out of the internal network.' },
            { ar: '**③ VPN** = __نفق مشفّر__ عبر الإنترنت: الموظف من الكافيه (واي فاي عام) يوصل لشبكة الشركة بأمان، والمتنصّت شايف __رموز ملهاش معنى__. استخداماته: __العمل عن بُعد__ و__ربط الفروع__.', en: '**③ VPN** = __an encrypted tunnel__ over the Internet: staff in a café (public Wi-Fi) reach the company network safely; the eavesdropper sees __meaningless symbols__. Uses: __remote work__ and __linking branches__.' },
            { ar: '**④ الدفاع في العمق** = __طبقات ورا بعض__: مدخل الشبكة (جدار حماية) · مسار الاتصال (VPN) · وضع الخوادم (DMZ) · الأجهزة الطرفية (مكافح فيروسات + تحديث). لو طبقة وقعت، __اللي بعدها تحمي__.', en: '**④ Defense in depth** = __layer after layer__: network entry (firewall) · communication path (VPN) · server placement (DMZ) · endpoints (antivirus + updates). If one layer falls, __the next protects__.' },
            { ar: '**⑤ انعدام الثقة** = النظام __مابيثقش تلقائيًا في أي اتصال__ — حتى من جوّه الشبكة — وبيتحقّق من __الهوية والصلاحيات في كل مرة__. المهاجم اللي بقى «جوّه» برضه بيتمنع.', en: '**⑤ Zero trust** = the system __trusts no communication automatically__ — even from inside the network — and checks __identity and permissions every time__. An attacker already "inside" is still stopped.' },
            { ar: '📌 **الخلاصة:** جدار الحماية = __بوابة__ (يفلتر بقواعد) · VPN = __خط__ (نفق مشفّر) · DMZ = __منطقة__ (معزولة للخوادم العامة) — والطبقات مع بعض + التحقّق من كل وصول.', en: '📌 **The point:** firewall = __a gate__ (filters by rules) · VPN = __a line__ (encrypted tunnel) · DMZ = __an area__ (isolated for public servers) — layers together + verify every access.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎬 قصة متحركة: شبكة الشركة = قلعة', en: '🎬 Animated story: the company network = a fortress' },
          enTitle: 'Firewall · DMZ · VPN · defense in depth · zero trust',
          visual: { anim: 'fortressStory' },
          beats: [
            { ar: 'تخيّل شبكة الشركة __قلعة__: الكنز = __بيانات العملاء__ في المكتب الداخلي، وبره = الإنترنت فيه زوار… ومهاجمين.', en: 'Picture the company network as a __fortress__: the treasure = __customer data__ in the inner office; outside = the Internet with visitors… and attackers.' },
            { ar: '**① جدار الحماية** = __حارس على البوابة__ معاه __قواعد مضبوطة مسبقًا__: زائر الموقع ✅ يدخل الاستقبال، والمهاجم اللي عايز الخزنة على طول ⛔ يتمنع.', en: '**① Firewall** = __a guard at the gate__ with __preset rules__: a site visitor ✅ goes to reception; an attacker heading straight for the vault ⛔ is denied.' },
            { ar: '**② DMZ** = __صالة استقبال منفصلة__ فيها الخوادم العامة. حتى لو المهاجم ضرب خادم الويب، __الباب التاني__ بيمنعه يوصل للمكتب الداخلي.', en: '**② DMZ** = __a separate reception hall__ with the public servers. Even if the web server is hit, __the second door__ keeps the attacker out of the inner office.' },
            { ar: '**③ VPN** = __نفق مشفّر__: الموظف من الكافيه يوصل للمكتب بأمان، والمتنصّت على الواي فاي مش فاهم حاجة.', en: '**③ VPN** = __an encrypted tunnel__: staff in a café reach the office safely; a Wi-Fi eavesdropper understands nothing.' },
            { ar: '**④ الدفاع في العمق** = __طبقات ورا بعض__: حارس + نفق + صالة منفصلة + حماية كل جهاز. لو طبقة وقعت، اللي بعدها تحمي.', en: '**④ Defense in depth** = __layers one after another__: guard + tunnel + separate hall + protection on each PC. If one falls, the next protects.' },
            { ar: '**⑤ انعدام الثقة** = __مفيش حد موثوق تلقائيًا__ — حتى اللي جوّه لازم يوري الكارنيه عند __كل باب__، كل مرة.', en: '**⑤ Zero trust** = __no one is trusted automatically__ — even people inside show their badge at __every door__, every time.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'القصة دي «خريطة» الدرس كله. هنفصّل كل جزء منها دلوقتي بأنيميشن خاص بيه 👇', en: 'This story is a "map" of the whole lesson. Each part now gets its own animation 👇' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '١) جدار الحماية: يسمح أو يمنع حسب قواعد', en: '1) The firewall: allow or deny by rules' },
          enTitle: 'Firewall',
          terms: ['firewall', 'rules'],
          visual: { anim: 'firewallSim' },
          beats: [
            { ar: '**جدار الحماية:** نظام __بيتركّب عند نقطة دخول/خروج الشبكة__، و__بيسمح بالاتصال أو يمنعه__ بناءً على __قواعد مضبوطة مسبقًا__.', en: '**Firewall:** a system installed __at the network’s entry/exit point__ that __allows or denies communication__ based on __rules set in advance__.' },
            { ar: 'مثال: __اسمح__ بالوصول لخادم الويب ✅ — عشان الناس تفتح موقع الشركة.', en: 'Example: __allow__ access to the web server ✅ — so people can open the company site.' },
            { ar: '…و__امنع__ الوصول الخارجي __المباشر__ لخادم قاعدة البيانات ⛔.', en: '…and __deny__ __direct__ external access to the database server ⛔.' },
            { ar: '⚠️ بس جدار الحماية بيشوف «شكل» الطلب: هجوم مستخبي في طلب مسموح __ممكن يعدّي__ — عشان كده محتاجين __طبقات تانية__.', en: '⚠️ But a firewall judges the request’s "shape": an attack hidden in an allowed request __may pass__ — so we need __more layers__.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'البوابة اللي بتفلتر كل حاجة داخلة وخارجة', en: 'The gate that filters everything in and out' },
          visual: { anim: 'photo', props: { img: 'img/cy-firewall.webp', hotspots: [
            { x: 46, y: 30, icon: 'wall', label: { ar: 'جدار الحماية = بوابة', en: 'firewall = a gate' }, beat: 0 },
            { x: 74, y: 78, icon: 'check', label: { ar: 'المسموح يعدّي', en: 'allowed traffic passes' }, beat: 1 },
            { x: 20, y: 55, icon: 'x', label: { ar: 'الممنوع يرجع', en: 'denied traffic bounces' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'جدار الحماية زي __بوابة بحارس__ عند مدخل الشبكة.', en: 'A firewall is like __a guarded gate__ at the network entrance.' },
            { ar: 'كل اتصال بيتقارن __بالقواعد__: مسموح؟ يعدّي. ممنوع؟ يرجع.', en: 'Every connection is checked __against the rules__: allowed? it passes. Denied? it bounces.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '٢) VPN: نفق مشفّر عبر الإنترنت', en: '2) VPN: an encrypted tunnel over the Internet' },
          enTitle: 'VPN (Virtual Private Network)',
          terms: ['VPN', 'tunnel', 'remote work', 'public Wi-Fi'],
          visual: { anim: 'vpnTunnel' },
          beats: [
            { ar: 'من غير حماية: موظف على __واي فاي عام__ في كافيه — أي __متنصّت__ على نفس الشبكة يقدر يقرا ملفاته 👀.', en: 'Unprotected: staff on __public Wi-Fi__ in a café — any __eavesdropper__ on the same network can read the files 👀.' },
            { ar: '**VPN (الشبكة الافتراضية الخاصة):** تقنية بتعمل __خط افتراضي خاص مشفّر (نفق)__ عبر الإنترنت، فتسمح __بالاتصال الآمن بشبكة من مكان بعيد__. ولأن المحتوى __مشفّر__، خطر التنصّت بيقل حتى على الواي فاي العام.', en: '**VPN (Virtual Private Network):** creates __an encrypted virtual private line (tunnel)__ over the Internet, allowing __safe connection to a network from a remote location__. Because content is __encrypted__, eavesdropping risk drops even on public Wi-Fi.' },
            { ar: 'استخداماته: ① __العمل عن بُعد__ (توصل لشبكة الشركة من البيت أو وإنت مسافر) ② __ربط الفروع__ (مكاتب في أماكن مختلفة تتوصّل ببعض بأمان).', en: 'Uses: ① __remote work__ (reach the company network from home or while travelling) ② __connecting branches__ (offices in different places linked safely).' },
          ],
          notes: [{ kind: 'exam', text: { ar: '«الحذف التلقائي للملفات المصابة بالفيروسات» ← __مش__ استخدام للـVPN (ده شغل مكافح الفيروسات).', en: '"Automatically deleting virus-infected files" → __not__ a use of a VPN (that is antivirus work).' } }],
        },
        {
          type: 'scene',
          title: { ar: 'النفق المشفّر: المتنصّتين حواليه ومش فاهمين حاجة', en: 'The encrypted tunnel: eavesdroppers all around, understanding nothing' },
          visual: { anim: 'photo', props: { img: 'img/cy-vpn.webp', hotspots: [
            { x: 18, y: 50, icon: 'laptopHome', label: { ar: 'موظف من مكان بعيد', en: 'remote staff' }, beat: 0 },
            { x: 50, y: 48, icon: 'tunnel', label: { ar: 'نفق VPN مشفّر', en: 'encrypted VPN tunnel' }, beat: 0 },
            { x: 32, y: 14, icon: 'eye', label: { ar: 'متنصّتين… مش فاهمين', en: 'eavesdroppers… lost' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'البيانات بتمشي __جوّه النفق المشفّر__ من الموظف لشبكة الشركة.', en: 'Data travels __inside the encrypted tunnel__ from the staff member to the company network.' },
            { ar: 'المتنصّتين اللي حوالين الإنترنت شايفين __رموز مالهاش معنى__.', en: 'Eavesdroppers around the Internet see __meaningless symbols__.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '٣) DMZ: المنطقة المعزولة للخوادم العامة', en: '3) DMZ: the isolated zone for public servers' },
          enTitle: 'DMZ Network Configuration',
          terms: ['DMZ', 'public-facing servers', 'internal network'],
          visual: { anim: 'dmzMap' },
          beats: [
            { ar: '**DMZ (المنطقة المعزولة):** منطقة بتتحط فيها __الخوادم المواجهة للخارج__ (خوادم الويب والبريد) __منفصلة عن الشبكة الداخلية__ — وبينهم جدران حماية (▮).', en: '**DMZ (Demilitarized Zone):** an area where __servers exposed to the outside__ (web, mail) are placed __separately from the internal network__ — with firewalls (▮) in between.' },
            { ar: 'المستخدمين بيوصلوا __لخادم الويب في الـDMZ__ عادي.', en: 'Users reach the __web server in the DMZ__ normally.' },
            { ar: 'لو المهاجم __ضرب خادم عام__، الجدار التاني بيمنعه يوصل للشبكة الداخلية ← __الضرر بيتمنع عن البيانات السرّية__.', en: 'If an attacker __hits a public server__, the second firewall stops him reaching the internal network → __damage to confidential data is prevented__.' },
            { ar: 'قارن: لو خادم الويب كان __جوّه الشبكة الداخلية__، الهجوم عليه كان هيوصل __لقاعدة البيانات وأجهزة الموظفين__ 💥.', en: 'Compare: if the web server were __inside the internal network__, an attack on it would reach __the database and staff PCs__ 💥.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'سبب توفير DMZ: __منع الضرر عن الشبكة الداخلية حتى لو هوجم خادم عام__ (مش لتحسين السرعة). «DMZ بتعرّض كل الخوادم للخارج» ← __غلط__.', en: 'Why a DMZ: __keep damage away from the internal network even if a public server is attacked__ (not for speed). "A DMZ exposes all servers" → __false__.' } },
            { kind: 'confuse', title: { ar: 'فرق بيلخبط — التلاتة أدوار مختلفة', en: 'Easily confused — three different roles' }, text: { ar: '**جدار الحماية** = يفلتر بقواعد (__بوابة__) · **VPN** = نفق مشفّر للاتصال من بعيد (__خط__) · **DMZ** = مكان معزول للخوادم العامة (__منطقة__).', en: '**Firewall** = filters by rules (__a gate__) · **VPN** = encrypted tunnel for remote access (__a line__) · **DMZ** = isolated place for public servers (__an area__).' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل وصف بالمصطلح:', en: 'Match each description with the term:' },
            left: [
              { ar: 'نفق مشفّر عبر الإنترنت للاتصال الآمن من مكان بعيد', en: 'An encrypted tunnel over the Internet for safe remote access' },
              { ar: 'منطقة للخوادم المواجهة للخارج منفصلة عن الشبكة الداخلية', en: 'A zone for outward-facing servers, separate from the internal network' },
              { ar: 'نظام بيسمح أو يمنع الاتصال حسب قواعد مضبوطة مسبقًا', en: 'A system that allows or denies traffic by preset rules' },
            ],
            right: [{ ar: 'جدار الحماية', en: 'Firewall' }, { ar: 'VPN', en: 'VPN' }, { ar: 'DMZ', en: 'DMZ' }],
            answer: [1, 2, 0],
            explain: { ar: 'النفق = VPN · المنطقة المعزولة = DMZ · السماح/المنع بقواعد = جدار الحماية.', en: 'Tunnel = VPN · isolated zone = DMZ · allow/deny by rules = firewall.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'مدرسة عندها موقع إلكتروني للطلاب وقاعدة بيانات فيها درجاتهم. فين أنسب مكان لخادم الموقع؟', en: 'A school has a public website and a database of student grades. Where should the website server go?' },
            options: [
              { ar: 'في DMZ منفصلة عن قاعدة البيانات الداخلية', en: 'In a DMZ, separate from the internal database' },
              { ar: 'جوّه الشبكة الداخلية جنب قاعدة البيانات', en: 'Inside the internal network next to the database' },
              { ar: 'على لابتوب المدير عشان يكون تحت عينه', en: 'On the head’s laptop so it is under watch' },
              { ar: 'مش مهم مكانه طالما فيه جدار حماية', en: 'It does not matter as long as there is a firewall' },
            ],
            answer: 0,
            explain: { ar: 'الموقع __مواجه للخارج__ فمعرّض للهجوم — مكانه الـDMZ، علشان لو اتضرب مايوصلش لدرجات الطلاب.', en: 'The website __faces the outside__ and can be attacked — it belongs in the DMZ, so a breach cannot reach the grades.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (3)', en: '✋ Check yourself (3)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'جدار الحماية بيتركّب عند نقطة دخول/خروج الشبكة.', en: 'A firewall sits at the network’s entry/exit point.' }, answer: true },
            { text: { ar: 'الـVPN بيمسح الفيروسات من الأجهزة تلقائيًا.', en: 'A VPN automatically removes viruses from devices.' }, answer: false, explain: { ar: 'ده شغل __مكافح الفيروسات__؛ الـVPN بيشفّر الاتصال.', en: 'That is __antivirus__ work; a VPN encrypts the connection.' } },
            { text: { ar: 'الـVPN بيقلّل خطر التنصّت حتى على الواي فاي العام.', en: 'A VPN reduces eavesdropping risk even on public Wi-Fi.' }, answer: true },
            { text: { ar: 'الـDMZ معناها إن كل الخوادم تبقى مكشوفة للإنترنت.', en: 'A DMZ means every server is exposed to the Internet.' }, answer: false, explain: { ar: 'الخوادم __العامة بس__ في الـDMZ، والداخلية محمية وراها.', en: 'Only the __public__ servers sit in the DMZ; internal ones stay protected behind it.' } },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**جدار الحماية:** عند مدخل/مخرج الشبكة · يسمح أو يمنع حسب __قواعد مضبوطة مسبقًا__ (اسمح للويب، امنع الدخول المباشر لقاعدة البيانات).', en: '**Firewall:** at the network edge · allows or denies by __preset rules__ (allow web, deny direct DB access).' },
            { ar: '**VPN:** نفق مشفّر عبر الإنترنت · العمل عن بُعد + ربط الفروع · بيقلّل التنصّت على الواي فاي العام.', en: '**VPN:** encrypted tunnel over the Internet · remote work + branches · cuts eavesdropping on public Wi-Fi.' },
            { ar: '**DMZ:** منطقة للخوادم العامة (ويب/بريد) منفصلة عن الداخلية ← لو اتضربت، الداخلية سليمة.', en: '**DMZ:** zone for public servers (web/mail) apart from the internal network → if hit, the inside stays safe.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · defense in depth · zero trust ───────────── */
    {
      id: 'depth', kind: 'learn',
      title: { ar: 'الدفاع في العمق وانعدام الثقة', en: 'Defense in depth and zero trust' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '٤) الدفاع في العمق: لو طبقة وقعت… اللي بعدها تمسك', en: '4) Defense in depth: if one layer falls… the next holds' },
          enTitle: 'Defense in Depth',
          terms: ['defense in depth', 'endpoints', 'antivirus'],
          visual: { anim: 'defenseDepth' },
          beats: [
            { ar: 'بحاجز واحد بس (جدار حماية لوحده): لو المهاجم __عدّاه__… وصل لكل حاجة 💥.', en: 'With one barrier only (a firewall alone): once the attacker __gets past it__… he reaches everything 💥.' },
            { ar: '**الدفاع في العمق:** مفهوم __تراكُب عدة إجراءات أمنية__، بحيث لو إجراء اتخرق، اللي بعده يحمي. **الطبقة ١ — مدخل الشبكة:** __جدار حماية__ يمنع الاتصال غير المصرّح.', en: '**Defense in depth:** __layering several security measures__ so that if one is breached, the next protects. **Layer 1 — network entry:** a __firewall__ blocks unauthorized traffic.' },
            { ar: '**الطبقة ٢ — مسار الاتصال:** __VPN__ يشفّر الاتصال — لو المهاجم التقط البيانات، مايفهمهاش.', en: '**Layer 2 — communication path:** a __VPN__ encrypts traffic — intercepted data is unreadable.' },
            { ar: '**الطبقة ٣ — وضع الخوادم:** __DMZ__ تفصل الخوادم العامة — لو خادم الويب اتخرق، يفضل __محبوس__ بعيد عن البيانات الداخلية.', en: '**Layer 3 — server placement:** a __DMZ__ isolates public servers — a breached web server stays __trapped__ away from internal data.' },
            { ar: '**الطبقة ٤ — الأجهزة الطرفية:** __برنامج مكافحة فيروسات__ + __تحديث نظام التشغيل__ على كل جهاز. كل طبقة __بتكسب وقت وتقلّل الضرر__.', en: '**Layer 4 — endpoints:** __antivirus__ + __an updated OS__ on every device. Each layer __buys time and limits damage__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'الطبقات الأربعة بالترتيب: مدخل الشبكة (__جدار حماية__) ← مسار الاتصال (__VPN__) ← وضع الخوادم (__DMZ__) ← الأجهزة الطرفية (__مكافح فيروسات + تحديث__).', en: 'The four layers in order: network entry (__firewall__) → communication path (__VPN__) → server placement (__DMZ__) → endpoints (__antivirus + updates__).' } },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: '٥) انعدام الثقة: «اتحقّق من كل وصول»', en: '5) Zero trust: "verify every access"' },
          enTitle: 'Traditional vs. Zero Trust',
          terms: ['zero trust', 'perimeter'],
          visual: { anim: 'zeroTrust' },
          beats: [
            { ar: '**الأمان التقليدي (المحيط):** اتصمّم حوالين __حماية المحيط__ على فرضية إن «__جوّه الشبكة آمن… وبره خطر__». لو المهاجم عدّى المحيط ← __وصول واسع لكل حاجة__.', en: '**Traditional (perimeter) security:** built around __protecting a perimeter__, assuming "__inside the network is safe… outside is dangerous__". Once past it → __broad access to everything__.' },
            { ar: 'مع انتشار __الخدمات السحابية__ و__العمل عن بُعد__، الحد بين «جوّه» و«بره» __مابقاش واضح__ — فالتصميم اللي بيحمي المحيط بس __مابقاش كفاية__.', en: 'With the spread of __cloud services__ and __remote work__, the line between "inside" and "outside" has __blurred__ — so perimeter-only designs are __no longer enough__.' },
            { ar: '**انعدام الثقة:** مفهوم أمني معناه إن النظام __مابيثقش تلقائيًا في أي اتصال__ — حتى من __جوّه شبكة المؤسسة__ — وبيتحقق منه __دايمًا__: الهوية + الصلاحيات __في كل مرة__.', en: '**Zero trust:** the system __trusts no communication automatically__ — even from __inside the organization’s network__ — and __always__ verifies it: identity + permissions __every time__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'انعدام الثقة: __لا يُوثَق بأي اتصال ويُتحقَّق منه دائمًا__ — حتى من داخل الشبكة. «الوصول من الداخل آمن فلا حاجة للتحقق» ← __غلط__.', en: 'Zero trust: __no connection is trusted; every one is always verified__ — even from inside. "Inside access is safe, no need to verify" → __false__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — ليه الطبقات أقوى؟', en: 'Deep dive — why layers win' }, text: { ar: 'مهاجم عايز قاعدة بيانات العملاء: (١) جدار الحماية يوقف أغلب المحاولات (٢) لو ضرب خادم الويب، الخادم في DMZ منفصل (٣) لو التقط اتصال، الـVPN مشفّره (٤) لو أصاب جهاز، مكافح الفيروسات والتحديث يحدّوا منه. وانعدام الثقة يضيف: حتى لو بقى «جوّه»، كل مورد جديد محتاج تحقّق جديد — فالاختراق __مايتحوّلش لسيطرة كاملة__.', en: 'An attacker wants the customer database: (1) the firewall stops most attempts (2) a hit web server sits in a separate DMZ (3) intercepted traffic is VPN-encrypted (4) an infected PC is limited by antivirus and updates. Zero trust adds: even "inside", every new resource needs fresh verification — so one breach __never becomes full control__.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل إجراء تبع أنهي طبقة من طبقات الدفاع في العمق؟', en: 'Which defense-in-depth layer does each measure belong to?' },
            groups: [{ icon: 'wall', label: { ar: 'مدخل الشبكة', en: 'Network entry' } }, { icon: 'tunnel', label: { ar: 'مسار الاتصال', en: 'Communication path' } }, { icon: 'server', label: { ar: 'وضع الخوادم', en: 'Server placement' } }, { icon: 'monitor', label: { ar: 'الأجهزة الطرفية', en: 'Endpoints' } }],
            items: [
              { text: { ar: 'منع الاتصال غير المصرّح بجدار حماية', en: 'Blocking unauthorized traffic with a firewall' }, group: 0 },
              { text: { ar: 'تشفير الاتصال بـVPN', en: 'Encrypting traffic with a VPN' }, group: 1 },
              { text: { ar: 'فصل الخوادم العامة في DMZ', en: 'Separating public servers in a DMZ' }, group: 2 },
              { text: { ar: 'تثبيت مكافح فيروسات', en: 'Installing antivirus' }, group: 3 },
              { text: { ar: 'تحديث نظام التشغيل', en: 'Keeping the OS updated' }, group: 3 },
            ],
            explain: { ar: 'جدار حماية ← المدخل · VPN ← المسار · DMZ ← الخوادم · مكافح الفيروسات والتحديث ← الأجهزة.', en: 'Firewall → entry · VPN → path · DMZ → servers · antivirus and updates → endpoints.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'موظف شغّال من جوّه مبنى الشركة طلب يفتح ملف المرتّبات. حسب انعدام الثقة إيه اللي يحصل؟', en: 'An employee inside the office asks to open the payroll file. Under zero trust, what happens?' },
            options: [
              { ar: 'يتحقّق من هويته وصلاحياته قبل ما يفتح الملف', en: 'His identity and permissions are checked before access' },
              { ar: 'يفتحه على طول لأنه موجود جوّه شبكة الشركة', en: 'He opens it at once because he is inside the company network' },
              { ar: 'يتمنع تمامًا لأن مفيش أي موظف يقدر يفتح ملفات', en: 'He is always refused because no employee may ever open files' },
              { ar: 'يفتحه بس لو جدار الحماية مقفول في الوقت ده', en: 'He opens it only if the firewall happens to be switched off' },
            ],
            answer: 0,
            explain: { ar: 'انعدام الثقة = __مفيش «جوّه موثوق»__: كل وصول — حتى من جوّه — بيتحقّق منه كل مرة.', en: 'Zero trust = __no "trusted inside"__: every access — even from inside — is verified every time.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**الدفاع في العمق:** تراكُب إجراءات ← مدخل الشبكة (جدار حماية) · مسار الاتصال (VPN) · وضع الخوادم (DMZ) · الأجهزة الطرفية (مكافح فيروسات + تحديث).', en: '**Defense in depth:** layered measures → network entry (firewall) · communication path (VPN) · server placement (DMZ) · endpoints (antivirus + updates).' },
            { ar: '**المحيط:** فرضية «الداخل آمن» القديمة — السحابة والعمل عن بُعد طمسوها.', en: '**Perimeter:** the old "inside is safe" assumption — blurred by cloud and remote work.' },
            { ar: '**انعدام الثقة:** محدش موثوق تلقائيًا · الهوية والصلاحيات بتتفحص في كل مرة.', en: '**Zero trust:** nobody is trusted automatically · identity and permissions checked every time.' },
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
            { text: { ar: 'A) جدار الحماية بيسمح بالاتصال أو يمنعه بناءً على قواعد مضبوطة مسبقًا.', en: 'A) A firewall allows or denies communication based on preset rules.' }, answer: true },
            { text: { ar: 'B) استخدام VPN بيقلّل خطر التنصّت حتى على واي فاي عام.', en: 'B) Using a VPN reduces eavesdropping risk even on public Wi-Fi.' }, answer: true },
            { text: { ar: 'C) الـDMZ نظام بيعرّض كل الخوادم للخارج.', en: 'C) A DMZ is a system that exposes all servers to the outside.' }, answer: false },
            { text: { ar: 'D) الدفاع في العمق مفهوم تراكُب عدة إجراءات أمنية.', en: 'D) Defense in depth is layering multiple security measures.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) جدار الحماية بيتحكم في الاتصال بقواعد ← **✓**.', en: 'A) A firewall controls traffic by rules → **✓**.' },
            { ar: 'B) الـVPN بيشفّر الاتصال فيقلّل التنصّت ← **✓**.', en: 'B) A VPN encrypts traffic, reducing eavesdropping → **✓**.' },
            { ar: 'C) الـDMZ بتفصل الخوادم __العامة__ عن الداخلية، مش بتعرّض كل الخوادم ← **✗**.', en: 'C) A DMZ separates __public__ servers from the internal network; it does not expose all servers → **✗**.' },
            { ar: 'D) ده التعريف الصحيح ← **✓**.', en: 'D) Correct definition → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمصطلح (A–C):', en: '(2) Match each description (a–c) with the term (A–C):' },
            left: [
              { ar: 'a) تقنية بتعمل خط افتراضي خاص مشفّر عبر الإنترنت للاتصال الآمن من مكان بعيد', en: 'a) Creates an encrypted virtual private line over the Internet for safe remote connection' },
              { ar: 'b) منطقة بتتحط فيها الخوادم المواجهة للخارج منفصلة عن الشبكة الداخلية', en: 'b) An area where outward-facing servers are placed separately from the internal network' },
              { ar: 'c) نظام بيسمح بالاتصال أو يمنعه حسب قواعد مضبوطة مسبقًا', en: 'c) A system that allows or denies communication by preset rules' },
            ],
            right: [{ ar: 'A جدار الحماية', en: 'A Firewall' }, { ar: 'B VPN', en: 'B VPN' }, { ar: 'C DMZ', en: 'C DMZ' }],
            answer: [1, 2, 0] },
          solution: [
            { ar: 'a: خط افتراضي خاص مشفّر = **VPN** ← B.', en: 'a: encrypted virtual private line = **VPN** → B.' },
            { ar: 'b: منطقة الخوادم العامة المعزولة = **DMZ** ← C.', en: 'b: isolated public-server area = **DMZ** → C.' },
            { ar: 'c: السماح/المنع بقواعد = **جدار الحماية** ← A.', en: 'c: allow/deny by rules = **firewall** → A.' },
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
            { q: { ar: '1. اسم النظام اللي عند نقطة دخول/خروج الشبكة وبيسمح أو يمنع حسب قواعد؟', en: '1. The system at the network edge that allows or denies by rules?' }, a: { ar: 'جدار الحماية (Firewall)', en: 'Firewall' } },
            { q: { ar: '2. الاختصار التلاتي لتقنية الخط الافتراضي الخاص المشفّر عبر الإنترنت؟', en: '2. Three-letter abbreviation for the encrypted virtual private line?' }, a: { ar: 'VPN', en: 'VPN' } },
            { q: { ar: '3. الاختصار التلاتي للمنطقة اللي فيها الخوادم المواجهة للخارج منفصلة عن الداخلية؟', en: '3. Three-letter abbreviation for the zone of outward-facing servers?' }, a: { ar: 'DMZ', en: 'DMZ' } },
            { q: { ar: '4. اسم مفهوم تراكُب عدة إجراءات أمنية؟', en: '4. The concept of layering multiple security measures?' }, a: { ar: 'الدفاع في العمق', en: 'Defense in depth' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي **مش** استخدام مناسب للـVPN:', en: 'Choose the one that is **NOT** an appropriate use of a VPN:' },
            options: [
              { ar: 'الاتصال بأمان من البيت بشبكة المؤسسة', en: 'Connecting safely from home to the organization’s network' },
              { ar: 'ربط مكاتب في أماكن مختلفة بأمان', en: 'Connecting offices in different locations safely' },
              { ar: 'الحذف التلقائي للملفات المصابة بالفيروسات', en: 'Automatically deleting files infected with viruses' },
              { ar: 'تشفير محتوى الاتصال على واي فاي عام', en: 'Encrypting communication on public Wi-Fi' },
            ],
            answer: 2,
            explain: { ar: 'حذف الملفات المصابة = __مكافح الفيروسات__ مش VPN.', en: 'Deleting infected files = __antivirus__, not a VPN.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'classify', prompt: { ar: 'لكل إجراء (a–d) حدّد طبقته في الدفاع في العمق (A–D):', en: 'For each measure (a–d), choose its defense-in-depth layer (A–D):' },
            groups: [{ icon: 'wall', label: { ar: 'A مدخل الشبكة', en: 'A Network entry' } }, { icon: 'tunnel', label: { ar: 'B مسار الاتصال', en: 'B Communication path' } }, { icon: 'server', label: { ar: 'C وضع الخوادم', en: 'C Server placement' } }, { icon: 'monitor', label: { ar: 'D الأجهزة الطرفية', en: 'D Endpoints' } }],
            items: [
              { text: { ar: 'a) منع الاتصال غير المصرّح بجدار حماية', en: 'a) Blocking unauthorized traffic with a firewall' }, group: 0 },
              { text: { ar: 'b) تشفير الاتصال بـVPN', en: 'b) Encrypting traffic with a VPN' }, group: 1 },
              { text: { ar: 'c) تثبيت برنامج مكافحة فيروسات', en: 'c) Installing antivirus software' }, group: 3 },
              { text: { ar: 'd) فصل الخوادم العامة عن الداخلية بـDMZ', en: 'd) Separating public servers with a DMZ' }, group: 2 },
            ],
            explain: { ar: 'a→A · b→B · c→D · d→C.', en: 'a→A · b→B · c→D · d→C.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(d):', en: 'Read and fill blanks (a)–(d):' },
            text: { ar: 'لحماية شبكة المؤسسة لازم نجمع بين أكتر من إجراء. الأول، بيتركّب {0} عند نقطة دخول/خروج الشبكة يمنع الاتصال غير المصرّح حسب قواعد. والخوادم المواجهة للخارج بتتحط في {1} منفصلة عن الشبكة الداخلية. وللاتصال الآمن من بره (زي العمل عن بُعد) بيتشفّر الاتصال باستخدام {2}. ومفهوم تراكُب الإجراءات ده اسمه {3}.', en: 'To protect a network, several measures are combined. First, a {0} is installed at the entry/exit point to block unauthorized traffic by rules. Outward-facing servers are placed in a {1}, separated from the internal network. To connect safely from outside, such as remote work, traffic is encrypted using a {2}. Layering measures like this is called {3}.' },
            bank: [{ ar: 'جدار حماية', en: 'firewall' }, { ar: 'DMZ', en: 'DMZ' }, { ar: 'VPN', en: 'VPN' }, { ar: 'الدفاع في العمق', en: 'defense in depth' }, { ar: 'انعدام الثقة', en: 'zero trust' }],
            answer: [0, 1, 2, 3],
            explain: { ar: '(a) جدار حماية (b) DMZ (c) VPN (d) الدفاع في العمق.', en: '(a) firewall (b) DMZ (c) VPN (d) defense in depth.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار أنسب سبب لتوفير DMZ:', en: 'Choose the best reason for providing a DMZ:' },
            options: [
              { ar: 'علشان تتحسّن سرعة الاتصال بالموقع للزوار', en: 'To improve the site’s connection speed for visitors' },
              { ar: 'علشان كل الخوادم تبقى مكشوفة للخارج بسهولة', en: 'To expose every server to the outside easily' },
              { ar: 'علشان الداخلية تتحمي لو اتضرب خادم عام', en: 'To protect the inside if a public server is hit' },
              { ar: 'علشان الفيروسات تتكشف وتتشال تلقائيًا كلها', en: 'To detect and remove all viruses automatically' },
            ],
            answer: 2,
            explain: { ar: 'الـDMZ = __منع الضرر عن الشبكة الداخلية__ حتى لو خادم عام اتهاجم.', en: 'A DMZ = __keeps damage away from the internal network__ even if a public server is attacked.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار أنسب وصف لمفهوم انعدام الثقة:', en: 'Choose the best description of zero trust:' },
            options: [
              { ar: 'الوصول من جوّه الشبكة آمن، فالتحقق مش ضروري', en: 'Access from inside is safe, so checks are unnecessary' },
              { ar: 'جدار الحماية لوحده كفاية لحماية الشبكة كلها', en: 'A firewall alone is enough to protect the whole network' },
              { ar: 'مفيش اتصال موثوق، وكل اتصال بيتحقّق منه دايمًا', en: 'No connection is trusted; every one is always verified' },
              { ar: 'الوصول من بره بس هو اللي محتاج مراقبة', en: 'Only access from outside needs to be monitored' },
            ],
            answer: 2,
            explain: { ar: 'انعدام الثقة = __لا يُوثَق بأي اتصال ويُتحقَّق منه دائمًا__.', en: 'Zero trust = __no connection is trusted and each is always verified__.' } },
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
          { front: { ar: 'جدار الحماية', en: 'Firewall' }, back: { ar: 'يسمح بالاتصال أو يمنعه عند مدخل/مخرج الشبكة حسب قواعد مضبوطة مسبقًا.', en: 'Allows or denies traffic at the network edge by preset rules.' } },
          { front: { ar: 'VPN', en: 'VPN' }, back: { ar: 'نفق مشفّر عبر الإنترنت للاتصال الآمن من مكان بعيد (عمل عن بُعد، ربط فروع).', en: 'An encrypted tunnel over the Internet for safe remote access (remote work, branches).' } },
          { front: { ar: 'DMZ', en: 'DMZ' }, back: { ar: 'منطقة للخوادم العامة منفصلة عن الشبكة الداخلية.', en: 'A zone for public servers, isolated from the internal network.' } },
          { front: { ar: 'الدفاع في العمق', en: 'Defense in depth' }, back: { ar: 'تراكُب إجراءات أمنية: لو واحد اتخرق، اللي بعده يحمي.', en: 'Layering security measures: if one is breached, the next protects.' } },
          { front: { ar: 'انعدام الثقة', en: 'Zero trust' }, back: { ar: 'مفيش اتصال موثوق تلقائيًا — كل وصول بيتحقّق منه كل مرة.', en: 'No access is trusted automatically — every access is verified every time.' } },
          { front: { ar: 'المحيط', en: 'Perimeter' }, back: { ar: 'حدّ «الداخل آمن» القديم اللي طمسته السحابة والعمل عن بُعد.', en: 'The old "inside is safe" boundary blurred by cloud and remote work.' } },
          { front: { ar: 'الأجهزة الطرفية', en: 'Endpoints' }, back: { ar: 'الطبقة الرابعة: مكافح فيروسات + تحديث نظام التشغيل على كل جهاز.', en: 'Layer 4: antivirus + OS updates on every device.' } },
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
            prompt: { ar: 'اشرح ليه تراكُب عدة إجراءات أمنية (الدفاع في العمق) بيحمي المؤسسة أحسن من الاعتماد على جدار حماية لوحده. (أشِر إلى: إيه اللي يحصل لو إجراء واحد اتخرق)', en: 'Explain why layering several security measures (defense in depth) protects an organization better than relying on a firewall alone. (Refer to: what happens if one measure is breached)' },
            points: [
              { ar: 'بجدار حماية لوحده: لو اتعدّى ← وصول لكل حاجة.', en: 'Firewall alone: once passed → access to everything.' },
              { ar: 'الطبقات: VPN يشفّر، DMZ تعزل الخوادم العامة، مكافح الفيروسات والتحديث يحمي الأجهزة.', en: 'Layers: VPN encrypts, DMZ isolates public servers, antivirus/updates protect devices.' },
              { ar: 'لو طبقة اتخرقت، اللي بعدها لسه بتحمي وبتقلّل الضرر.', en: 'If one layer is breached, the next still protects and limits damage.' },
            ],
            model: { ar: 'لو المؤسسة معتمدة على جدار حماية لوحده، فالمهاجم أول ما يعدّيه بيوصل لكل حاجة جوّه. أما الدفاع في العمق فبيحط إجراءات ورا بعض: جدار الحماية يوقف أغلب الاتصالات غير المصرّح بيها، والـVPN يشفّر الاتصال فلو حد التقطه مايفهموش، والـDMZ تعزل الخوادم العامة فلو خادم الويب اتخرق مايوصلش للبيانات الداخلية، ومكافح الفيروسات وتحديث النظام يحدّوا من البرامج الخبيثة على الأجهزة. يعني لو إجراء واحد اتخرق، الإجراء اللي بعده لسه بيحمي النظام ويقلّل الضرر ويكسب وقت.', en: 'With a firewall alone, an attacker who gets past it reaches everything inside. Defense in depth stacks measures: the firewall stops most unauthorized traffic, a VPN encrypts communication so intercepted data is unreadable, a DMZ isolates public servers so a breached web server cannot reach internal data, and antivirus plus OS updates limit malware on devices. So if one measure is breached, the next still protects the system, limits damage and buys time.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — شبكة شركة', en: 'Think as an engineer — office network' },
            prompt: { ar: 'شركة في مدينتك بتجهّز شبكة مكتبها: عندها موقع عام، وموظفين بيشتغلوا من البيت، وبيانات عملاء سرّية. ١) اذكر الأصول التلاتة والتهديد الرئيسي لكل واحد. ٢) رتّب طبقات الدفاع الأربعة من الأهم للأقل لهذه الشركة وبرّر اختيارك الأول. ٣) أوصِ بتصميم واذكر سببين ليه التراكُب أأمن من جدار حماية واحد.', en: 'A company is setting up its office network: a public website, staff working from home, confidential customer data. 1) List the three assets and the main threat to each. 2) Rank the four layers for this company and justify your top choice. 3) Recommend a design with two reasons why layering beats one firewall.' },
            points: [
              { ar: 'الأصول + التهديدات (الموقع ← هجوم/اختراق، الموظفين عن بُعد ← تنصّت، قاعدة العملاء ← تسريب).', en: 'Assets + threats (site → attack, remote staff → eavesdropping, customer DB → leak).' },
              { ar: 'ترتيب مبرّر للطبقات (مثلًا: وضع الخوادم/DMZ أولًا لأن الموقع أكثر عرضة).', en: 'A justified ranking (e.g. server placement/DMZ first because the site is most exposed).' },
              { ar: 'تصميم: جدار حماية + VPN + DMZ + حماية الأجهزة + انعدام الثقة، وسببين.', en: 'Design: firewall + VPN + DMZ + endpoint protection + zero trust, with two reasons.' },
            ],
            model: { ar: '١) الموقع العام ← معرّض لهجمات من الإنترنت. الموظفين عن بُعد ← تنصّت على اتصالهم. قاعدة العملاء ← تسريب البيانات. ٢) أهم طبقة هنا «وضع الخوادم»: نحط الموقع في DMZ لأنه أكثر حاجة مكشوفة، وبعدين مسار الاتصال (VPN للموظفين)، ثم مدخل الشبكة (جدار حماية)، ثم الأجهزة الطرفية. ٣) التصميم: جدار حماية عند المدخل، الموقع في DMZ، VPN للعمل من البيت، مكافح فيروسات وتحديثات على كل جهاز، وتحقّق من كل وصول لقاعدة العملاء (انعدام الثقة). السببين: لو جدار الحماية اتخرق لسه فيه طبقات بتحمي البيانات، ولأن الهجوم على الموقع مايوصلش للبيانات الداخلية بسبب الـDMZ.', en: '1) Public site → Internet attacks. Remote staff → eavesdropping. Customer DB → data leak. 2) Top layer here is server placement: put the site in a DMZ because it is the most exposed, then the communication path (VPN), then network entry (firewall), then endpoints. 3) Design: firewall at the entry, site in a DMZ, VPN for home workers, antivirus and updates on each device, and verification of every access to the customer DB (zero trust). Reasons: if the firewall is breached other layers still protect the data, and an attack on the site cannot reach internal data thanks to the DMZ.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مستشفى نقلت سجلات المرضى لخدمة سحابية وبتسمح للأطباء يدخلوا عليها من البيت. باستخدام انعدام الثقة والدفاع في العمق، اقترح إجراءين وفين كل واحد بيساعد، وحدّد خطر واحد ممكن يفضل موجود.', en: 'A hospital moves patient records to the cloud and lets doctors access them from home. Using zero trust and defense in depth, suggest two measures and where each helps, and identify one remaining risk.' },
            points: [{ ar: 'إجراء انعدام ثقة (تحقق من الهوية والصلاحيات كل مرة، MFA).', en: 'A zero-trust measure (verify identity/permissions each time, MFA).' }, { ar: 'إجراء طبقات (VPN/تشفير + حماية أجهزة الأطباء).', en: 'A layering measure (VPN/encryption + doctors’ device protection).' }, { ar: 'خطر باقي (جهاز طبيب مصاب، أو طبيب بيشارك كلمة السر).', en: 'A remaining risk (an infected doctor’s device, or shared passwords).' }],
            model: { ar: 'إجراء ١ (انعدام الثقة): كل طبيب يتحقّق من هويته وصلاحياته في كل مرة يفتح سجل، بمصادقة متعددة العوامل، ويشوف بس سجلات مرضاه. إجراء ٢ (الدفاع في العمق): الاتصال من البيت يكون عبر VPN مشفّر، وأجهزة الأطباء عليها مكافح فيروسات وتحديثات. خطر ممكن يفضل: جهاز طبيب يكون مصاب ببرنامج خبيث بيسرق البيانات وهو داخل بصلاحياته.', en: 'Measure 1 (zero trust): every doctor’s identity and permissions are checked each time a record is opened, with MFA, and each sees only their own patients. Measure 2 (defense in depth): home access goes through an encrypted VPN, and doctors’ devices run antivirus and updates. A remaining risk: an infected doctor’s device stealing data while logged in with valid permissions.' } },
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
            prompt: { ar: 'ليه أأمن نحط خادم الويب العام في DMZ بدل ما نحطه جوّه الشبكة الداخلية؟', en: 'Why is it safer to place a public web server in a DMZ rather than inside the internal network?' },
            points: [{ ar: 'خادم الويب مكشوف للإنترنت فمعرّض للهجوم.', en: 'The web server faces the Internet and is likely attacked.' }, { ar: 'لو اتخرق في الـDMZ، الجدار التاني يحمي الداخلية.', en: 'If breached in the DMZ, the second firewall protects the inside.' }],
            model: { ar: 'لأن خادم الويب مفتوح لأي حد على الإنترنت فهو أكتر حاجة معرّضة للهجوم. لو كان جوّه الشبكة الداخلية، أي اختراق ليه هيوصل لقاعدة البيانات وأجهزة الموظفين. لكن في الـDMZ، حتى لو اتخرق، جدار الحماية التاني بيمنع المهاجم يوصل للشبكة الداخلية.', en: 'Because the web server is open to anyone on the Internet, it is the most attacked. Inside the internal network, a breach would reach the database and staff PCs. In a DMZ, even if it is breached, the second firewall keeps the attacker out of the internal network.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: أنهي طبقة دفاع تفتكر أسهل حاجة المهاجم يعدّيها وليه؟ تحدّى: اقترح إجراء واحد شركة صغيرة ممكن تضيفه غير جدار الحماية، وتهديد واحد لسه مش هيشيله.', en: 'Reflect: which defense layer is easiest for an attacker to get past, and why? Challenge: suggest one measure a small company could add beyond a firewall, and one threat it still would not remove.' },
            points: [{ ar: 'طبقة + سبب.', en: 'A layer + reason.' }, { ar: 'إجراء إضافي.', en: 'An extra measure.' }, { ar: 'تهديد باقي.', en: 'A remaining threat.' }],
            model: { ar: 'أسهل طبقة غالبًا «الأجهزة الطرفية» لأن موظف ممكن يفتح إيميل احتيال أو ينسى يحدّث جهازه. إجراء إضافي: VPN للموظفين اللي بيشتغلوا من بره مع مصادقة متعددة العوامل. تهديد باقي: الهندسة الاجتماعية، زي حد يقنع موظف يدّيه كلمة السر بالتليفون.', en: 'Often the endpoint layer, because a staff member may open a phishing email or skip updates. Extra measure: a VPN with MFA for remote staff. Remaining threat: social engineering, e.g. someone talking an employee into giving a password by phone.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '2-2', seconds: 60, items: [
          { text: { ar: 'جدار الحماية بيسمح أو يمنع حسب قواعد', en: 'A firewall allows or denies by rules' }, answer: true },
          { text: { ar: 'جدار الحماية لوحده كفاية دايمًا', en: 'A firewall alone is always enough' }, answer: false },
          { text: { ar: 'VPN = نفق مشفّر عبر الإنترنت', en: 'VPN = encrypted tunnel over the Internet' }, answer: true },
          { text: { ar: 'VPN بيمسح الفيروسات تلقائيًا', en: 'A VPN deletes viruses automatically' }, answer: false },
          { text: { ar: 'VPN مفيد للعمل عن بُعد', en: 'A VPN is useful for remote work' }, answer: true },
          { text: { ar: 'الـDMZ فيها الخوادم العامة', en: 'The DMZ holds public servers' }, answer: true },
          { text: { ar: 'الـDMZ بتعرّض كل الخوادم للخارج', en: 'A DMZ exposes all servers' }, answer: false },
          { text: { ar: 'الـDMZ هدفها تحسين السرعة', en: 'A DMZ exists to improve speed' }, answer: false },
          { text: { ar: 'الدفاع في العمق = تراكُب إجراءات', en: 'Defense in depth = layering measures' }, answer: true },
          { text: { ar: 'مكافح الفيروسات طبقة الأجهزة الطرفية', en: 'Antivirus is the endpoint layer' }, answer: true },
          { text: { ar: 'VPN طبقة وضع الخوادم', en: 'A VPN is the server-placement layer' }, answer: false },
          { text: { ar: 'انعدام الثقة = اتحقّق من كل وصول', en: 'Zero trust = verify every access' }, answer: true },
          { text: { ar: 'انعدام الثقة: اللي جوّه موثوق تلقائيًا', en: 'Zero trust: insiders are trusted automatically' }, answer: false },
          { text: { ar: 'السحابة والعمل عن بُعد طمسوا المحيط', en: 'Cloud and remote work blurred the perimeter' }, answer: true },
          { text: { ar: 'جدار الحماية عند مدخل/مخرج الشبكة', en: 'A firewall sits at the network edge' }, answer: true },
          { text: { ar: 'الأمان التقليدي: الداخل آمن والخارج خطر', en: 'Traditional view: inside safe, outside dangerous' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 2-2', en: 'Lesson 2-2 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. «بيعمل نفق مشفّر عبر الإنترنت للاتصال الآمن من بعيد» — أنهي؟', en: '1. "Creates an encrypted tunnel over the Internet for safe remote access" — which?' }, options: [{ ar: 'جدار الحماية', en: 'Firewall' }, { ar: 'VPN', en: 'VPN' }, { ar: 'DMZ', en: 'DMZ' }, { ar: 'انعدام الثقة', en: 'Zero trust' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. إيه أنسب سبب لتوفير DMZ؟', en: '2. Best reason to provide a DMZ?' }, options: [{ ar: 'تحسين سرعة الاتصال بالموقع', en: 'Improving the site’s connection speed' }, { ar: 'تعريض كل الخوادم للخارج', en: 'Exposing every server outside' }, { ar: 'حماية الداخلية لو اتضرب خادم عام', en: 'Protecting the inside if a public server is hit' }, { ar: 'كشف الفيروسات وإزالتها تلقائيًا', en: 'Detecting and removing viruses' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. إيه أنسب وصف لمفهوم انعدام الثقة؟', en: '3. Best description of zero trust?' }, options: [{ ar: 'الوصول من جوّه آمن فمفيش داعي للتحقق', en: 'Inside access is safe, so no checks' }, { ar: 'جدار الحماية لوحده كفاية للحماية', en: 'A firewall on its own is enough' }, { ar: 'مفيش اتصال موثوق وكله بيتحقّق منه', en: 'No connection is trusted; all are verified' }, { ar: 'الوصول من بره بس هو اللي يتراقب', en: 'Only outside access is monitored' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. جدار الحماية بيسمح بالاتصال أو يمنعه حسب قواعد مضبوطة مسبقًا.', en: '4. A firewall allows/denies traffic by preset rules.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. الـDMZ نظام بيعرّض كل الخوادم للخارج.', en: '5. A DMZ exposes all servers to the outside.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. الـVPN بيقلّل خطر التنصّت حتى على واي فاي عام.', en: '6. A VPN reduces eavesdropping risk even on public Wi-Fi.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. اذكر طبقات الدفاع في العمق الأربعة والإجراء المميّز لكل واحدة.', en: '7. Name the four defense-in-depth layers and the key measure of each.' },
          points: [{ ar: 'مدخل الشبكة ← جدار حماية.', en: 'Network entry → firewall.' }, { ar: 'مسار الاتصال ← VPN.', en: 'Communication path → VPN.' }, { ar: 'وضع الخوادم ← DMZ.', en: 'Server placement → DMZ.' }, { ar: 'الأجهزة الطرفية ← مكافح فيروسات + تحديث.', en: 'Endpoints → antivirus + updates.' }],
          model: { ar: '١) مدخل الشبكة: جدار حماية يمنع الاتصال غير المصرّح. ٢) مسار الاتصال: VPN يشفّر الاتصال. ٣) وضع الخوادم: DMZ تفصل الخوادم العامة عن الشبكة الداخلية. ٤) الأجهزة الطرفية: برنامج مكافحة فيروسات وتحديث نظام التشغيل.', en: '1) Network entry: a firewall blocks unauthorized traffic. 2) Communication path: a VPN encrypts traffic. 3) Server placement: a DMZ separates public servers from the internal network. 4) Endpoints: antivirus software and OS updates.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اشرح ليه تصميم «حماية المحيط» لوحده مابقاش كفاية.', en: '8. Explain why a perimeter-only design is no longer enough.' },
          points: [{ ar: 'كان قايم على «الداخل آمن والخارج خطر».', en: 'It assumed "inside safe, outside dangerous".' }, { ar: 'السحابة والعمل عن بُعد طمسوا الحد.', en: 'Cloud and remote work blurred the line.' }],
          model: { ar: 'التصميم التقليدي كان بيحمي المحيط على فرضية إن جوّه الشبكة آمن وبرّها خطر، فاللي يعدّي المحيط ياخد وصول واسع. لكن مع انتشار الخدمات السحابية والعمل عن بُعد، الموظفين والخدمات بقوا بره، والحد بين الداخل والخارج مابقاش واضح — فلازم نتحقّق من كل وصول (انعدام الثقة).', en: 'The traditional design protected a perimeter assuming inside is safe and outside dangerous, so anyone past it gets broad access. With cloud services and remote work, staff and services are outside and the inside/outside line has blurred — so every access must be verified (zero trust).' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. بمثال، اشرح إزاي الطبقات بتحمي لو طبقة واحدة اتخرقت.', en: '9. With an example, explain how layers protect when one layer is breached.' },
          points: [{ ar: 'مثال طبقة اتخرقت.', en: 'An example of a breached layer.' }, { ar: 'الطبقة اللي بعدها بتمنع/تقلّل الضرر.', en: 'The next layer stops or limits the damage.' }],
          model: { ar: 'مثال: مهاجم ضرب خادم الويب لأن الطلب كان شكله مسموح وعدّى جدار الحماية. لكن الخادم موجود في DMZ، فجدار الحماية التاني بيمنعه يوصل لقاعدة بيانات العملاء. ولو قدر يصيب جهاز موظف، مكافح الفيروسات والتحديث بيحدّوا منه.', en: 'Example: an attacker hits the web server because the request looked allowed and passed the firewall. But the server is in a DMZ, so the second firewall keeps him from the customer database. And if he infects a staff PC, antivirus and updates limit him.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. شركة عندها موقع عام وموظفين عن بُعد وبيانات عملاء — صمّم لها الحماية بالطبقات.', en: '10. A company with a public site, remote staff and customer data — design layered protection.' },
          points: [{ ar: 'جدار حماية + DMZ للموقع.', en: 'Firewall + DMZ for the site.' }, { ar: 'VPN للموظفين.', en: 'VPN for staff.' }, { ar: 'حماية الأجهزة + انعدام الثقة للبيانات.', en: 'Endpoint protection + zero trust for the data.' }],
          model: { ar: 'جدار حماية عند مدخل الشبكة بقواعد (اسمح للموقع، امنع الدخول المباشر لقاعدة البيانات). الموقع العام في DMZ منفصلة. الموظفين عن بُعد يدخلوا عبر VPN مشفّر. كل الأجهزة عليها مكافح فيروسات وتحديثات. وأي وصول لبيانات العملاء يتحقّق من الهوية والصلاحيات كل مرة (انعدام الثقة).', en: 'A firewall at the entry with rules (allow the site, deny direct DB access). The public site in a separate DMZ. Remote staff connect through an encrypted VPN. Every device has antivirus and updates. Every access to customer data verifies identity and permissions each time (zero trust).' } } },
      ],
    },
  ],
});
