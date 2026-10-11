/* =========================================================
 * content/lesson-1-1.js — تطور تكنولوجيا المعلومات والتحول الاجتماعي
 * Pure data. Sources: textbook 1-1 (EN p.4–11 / AR p.4–11) + memo.
 * Markup: **term**  __keyword__  `code`
 * ========================================================= */
RV.lessons.add('1-1', {
  id: '1-1',
  color: '#38bdf8',
  cover: 'img/l1-cover.webp',
  title: { ar: 'تطور تكنولوجيا المعلومات والتحول الاجتماعي', en: 'Development of IT and Social Transformation' },
  guiding: { ar: 'إزاي تكنولوجيا المعلومات اتطوّرت عبر مراحلها الرئيسية، وإزاي كل مرحلة غيّرت المجتمع؟', en: 'How has IT developed through its major stages, and how has each stage changed society?' },
  hook: {
    ar: 'في يوم عادي، طالب في مصر بيقرا رسايله على **السوشيال ميديا**، بيدفع فطاره بـ**تطبيق دفع**، بيحضر حصة **أونلاين**، وبيطلب كتاب من **متجر إلكتروني**. من عشرين سنة أغلب ده ماكانش ممكن!',
    en: 'On an ordinary day, a student in Egypt checks messages on **SNS**, pays for breakfast with a **cashless app**, joins an **online lesson**, and orders a book from an **e-commerce** shop. Twenty years ago most of this was impossible!',
  },
  keyFact: { ar: 'في كل مرحلة، تكنولوجيا المعلومات جابت __تقنية أو خدمة جديدة__، وغيّرت كمان طريقة المجتمع في __التواصل والشغل والتجارة__.', en: 'At each stage, IT introduced a __new technology or service__ and also changed how society __communicates, works, and does business__.' },
  concepts: ["Moore's Law", 'SNS', 'e-commerce', 'remote work', 'online learning', 'cashless payment', 'edge computing', 'autonomous driving', 'AR / VR', 'quantum computing'],
  objectives: [
    { ar: 'أشرح المراحل الرئيسية في تطور تكنولوجيا المعلومات وأثرها في المجتمع.', en: 'Explain the major stages in the development of IT and their impact on society.' },
    { ar: 'أذكر أمثلة على التغيرات الاجتماعية والتقنيات الناشئة وأشرح خصائصها.', en: 'Give examples of social changes and emerging technologies and explain their characteristics.' },
    { ar: 'أحسب عدد الترانزستورات بقانون مور لأي سنة.', en: "Calculate transistor counts for any year using Moore's Law." },
  ],

  stations: [
    /* ───────────── 1 · history ───────────── */
    {
      id: 'history', kind: 'learn',
      title: { ar: 'رحلة عبر الزمن: مراحل تكنولوجيا المعلومات', en: 'A journey through time: the stages of IT' },
      steps: [
        { type: 'intro' },
        {
          type: 'scene', wide: true,
          title: { ar: 'يوم في حياة طالب… كله تكنولوجيا', en: 'A student’s day… all technology' },
          visual: { anim: 'cinema', props: { tint: 'blue', clips: [
              { src: 'media/mx-14669.mp4', beat: 0, title: { ar: 'شبكات التواصل', en: 'Social networks' }, sub: { ar: 'رسايل وصور في ثانية', en: 'messages & photos in a second' }, icon: 'share' },
              { src: 'media/mx-4915.mp4', beat: 1, title: { ar: 'دفع من غير كاش', en: 'Cashless payment' }, sub: { ar: 'الموبايل بقى محفظة', en: 'the phone is a wallet' }, icon: 'qr' },
              { src: 'media/mx-1781.mp4', beat: 2, title: { ar: 'حصة أونلاين', en: 'Online lesson' }, sub: { ar: 'الفصل جوه اللابتوب', en: 'the classroom in a laptop' }, icon: 'cap' },
              { src: 'media/mx-20770.mp4', beat: 3, title: { ar: 'طلب أونلاين', en: 'Online order' }, sub: { ar: 'الطلب بيتشحن لحد البيت', en: 'shipped to your door' }, icon: 'cart' },
          ] } },
          beats: [
            { ar: 'الصبح: بيقرا رسايله على **شبكات التواصل** — المعلومة بتوصل لآلاف في ثانية.', en: 'Morning: reads messages on **SNS** — information reaches thousands in a second.' },
            { ar: 'بيدفع فطاره بـ**الموبايل** من غير كاش — ده **الدفع غير النقدي**.', en: 'Pays for breakfast with his **phone**, no cash — **cashless payment**.' },
            { ar: 'بيحضر حصته من البيت — **التعلّم عبر الإنترنت**.', en: 'Attends class from home — **online learning**.' },
            { ar: 'وبيطلب كتاب يتشحن له — **التجارة الإلكترونية**. من 20 سنة أغلب ده ماكانش موجود!', en: 'Orders a book that ships to him — **e-commerce**. Twenty years ago most of this did not exist!' },
          ],
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'استكشف: من غير ما تقرا — أنهي مرحلة تفتكر غيّرت الحياة اليومية أكتر؟', en: 'Explore: before reading on — which stage changed daily life the most?' },
            options: [
              { emoji: '🖥️', text: { ar: 'الحاسب الشخصي', en: 'Personal computers' } },
              { emoji: '🌐', text: { ar: 'الإنترنت', en: 'The Internet' } },
              { emoji: '📱', text: { ar: 'الهاتف الذكي', en: 'Smartphones' } },
              { emoji: '☁️', text: { ar: 'الحوسبة السحابية', en: 'Cloud computing' } },
            ],
            after: { ar: 'افتكر اختيارك… وفي الآخر شوف هل غيّرت رأيك؟', en: 'Remember your choice… see at the end whether you changed your mind.' } },
        },
        {
          type: 'scene',
          title: { ar: 'خمس مراحل غيّرت العالم', en: 'Five stages that changed the world' },
          enTitle: 'The History of Information Technology',
          visual: {
            anim: 'eraTimeline',
            props: {
              eras: [
                { year: '1940s–60s', icon: 'server', title: { ar: 'ميلاد الحاسب (ENIAC)', en: 'Birth of the computer (ENIAC)' }, impact: { ar: 'استخدام عسكري وعلمي', en: 'Military & scientific computation' } },
                { year: '1970s–80s', icon: 'monitor', title: { ar: 'الحواسب الشخصية (PC)', en: 'Personal computers (PCs)' }, impact: { ar: 'الأفراد بدأوا يستخدموا الحاسب', en: 'Individuals start using computers' } },
                { year: '1990s', icon: 'globe', title: { ar: 'الإنترنت تجاريًا + الويب', en: 'Commercial Internet + the Web' }, impact: { ar: 'عولمة المعلومات + البريد الإلكتروني', en: 'Globalization of information + email' } },
                { year: '2000s', icon: 'phone', title: { ar: 'الهواتف الذكية (iPhone)', en: 'Smartphones (iPhone)' }, impact: { ar: 'انفجار إنترنت الموبايل', en: 'Explosive spread of mobile Internet' } },
                { year: '2010s →', icon: 'cloud', title: { ar: 'الحوسبة السحابية', en: 'Cloud computing' }, impact: { ar: 'بيانات ضخمة + ذكاء اصطناعي + «IT كخدمة»', en: 'Big data + AI + "IT as a service"' } },
              ],
            },
          },
          beats: [
            { ar: '**الأربعينيات–الستينيات:** ميلاد الحاسب (ENIAC) بالصمامات المفرغة — كان بيملا أوضة كاملة، واستخدامه __عسكري وعلمي__ بس.', en: '**1940s–60s:** birth of the computer (ENIAC, vacuum tubes) — it filled a whole room and was used for __military and scientific__ work only.' },
            { ar: '**السبعينيات–الثمانينيات:** انتشار **الحواسب الشخصية (PCs)** — لأول مرة __الأفراد__ يستخدموا الحاسب.', en: '**1970s–80s:** spread of **personal computers (PCs)** — for the first time __individuals__ use computers.' },
            { ar: '**التسعينيات:** الإنترنت بقى __تجاري__ وظهر الويب → **عولمة المعلومات** وانتشار البريد الإلكتروني.', en: '**1990s:** the Internet goes __commercial__ and the Web appears → **globalization of information** and email.' },
            { ar: '**العقد الأول من الألفية (2000s):** ظهور **الهواتف الذكية** → انتشار __سريع وواسع__ لإنترنت الموبايل.', en: '**2000s:** rise of **smartphones** → __explosive__ spread of mobile Internet.' },
            { ar: '**من 2010 فصاعدًا:** انتشار **الحوسبة السحابية** → تحليل بيانات ضخمة، ذكاء اصطناعي، و«تكنولوجيا المعلومات __كخدمة__».', en: '**2010s onward:** spread of **cloud computing** → big-data analysis, AI, and "IT __as a service__".' },
          ],
          notes: [{ kind: 'exam', text: { ar: 'الترتيب الزمني: ميلاد الحاسب ← الإنترنت تجاريًا ← الهواتف الذكية ← الحوسبة السحابية.', en: 'Chronological order: computer → commercial Internet → smartphones → cloud computing.' } }],
        },
        {
          type: 'scene',
          title: { ar: 'من أوضة كاملة… لحد جيبك', en: 'From a whole room… to your pocket' },
          visual: { anim: 'photo', props: { img: 'img/eras.webp', motion: 'in', hotspots: [
            { x: 12, y: 45, icon: 'server', label: { ar: '1940s: حاسب بحجم أوضة', en: '1940s: a room-sized computer' }, beat: 0 },
            { x: 37, y: 55, icon: 'monitor', label: { ar: '1970s: كمبيوتر شخصي', en: '1970s: personal computer' }, beat: 0 },
            { x: 62, y: 62, icon: 'phone', label: { ar: '2000s: لابتوب وموبايل', en: '2000s: laptop & phone' }, beat: 1 },
            { x: 86, y: 35, icon: 'cloud', label: { ar: '2010s: السحابة', en: '2010s: the cloud' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'بص على الرحلة: الأجهزة بتصغر وبتقرب من الإنسان — من **حاسب بيملا أوضة** لـ**كمبيوتر على المكتب**.', en: 'Look at the journey: devices shrink and come closer — from a **room-sized computer** to a **desktop PC**.' },
            { ar: 'وبعدين **اللابتوب والموبايل**… ولحد **السحابة** اللي مش شايفينها بس شغّالة لنا طول الوقت.', en: 'Then **laptops and phones**… all the way to **the cloud** we never see but use all the time.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'أول حاسب كان بيملا أوضة!', en: 'The first computers filled a whole room!' },
          visual: { anim: 'photo', props: { img: 'img/real-eniac.webp', credit: 'ENIAC, Univ. of Pennsylvania · Wikimedia Commons · CC BY-SA 3.0', hotspots: [
            { x: 42, y: 30, icon: 'server', label: { ar: 'ENIAC الحقيقي — محفوظ في متحف', en: 'The real ENIAC — kept in a museum' }, beat: 0 },
            { x: 58, y: 66, icon: 'wrench', label: { ar: 'كان بيتبرمج بالأسلاك والمفاتيح', en: 'Programmed with cables & switches' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'ENIAC كان وزنه حوالي __30 طن__ وبيملا أوضة كاملة.', en: 'ENIAC weighed about __30 tonnes__ and filled an entire room.' },
            { ar: 'النهارده موبايلك أقوى منه __ملايين المرات__ — والسر في **قانون مور** اللي جاي.', en: 'Today your phone is __millions of times__ more powerful — the secret is **Moore\'s Law**, coming next.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'ENIAC زي ما الكتاب رسمه', en: 'ENIAC as the textbook draws it' },
          visual: { anim: 'photo', props: { img: 'img/eniac.webp', motion: 'pan', hotspots: [
            { x: 66, y: 30, icon: 'server', label: { ar: 'آلاف الصمامات المفرغة', en: 'thousands of vacuum tubes' }, beat: 0 },
            { x: 19, y: 55, icon: 'user', label: { ar: 'مشغّل بيبرمجه يدويًا', en: 'an operator wiring it by hand' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'دواليب ورا دواليب من __الصمامات المفرغة__ — كل الأوضة دي = كمبيوتر واحد!', en: 'Cabinet after cabinet of __vacuum tubes__ — this whole room = one computer!' },
            { ar: 'ومافيش كيبورد ولا شاشة: كان __بيتبرمج بالأسلاك والمفاتيح__ بإيد المشغّلين.', en: 'No keyboard, no screen: it was __programmed with cables and switches__ by hand.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: '«السحابة» = أجهزة حقيقية في مكان حقيقي', en: '"The cloud" = real machines in a real place' },
          wide: true,
          visual: { anim: 'cinema', props: { tint: 'blue', clips: [
            { src: 'media/mx-23219.mp4', beat: 0, title: { ar: 'مركز بيانات حقيقي', en: 'A real data center' }, sub: { ar: 'ممرات طويلة من السيرفرات', en: 'corridors of servers' }, icon: 'server' },
            { src: 'media/mx-7887.mp4', beat: 1, title: { ar: 'هنا بتتخزّن صورك', en: 'Your photos live here' }, sub: { ar: 'Google Drive · iCloud · YouTube', en: 'Google Drive · iCloud · YouTube' }, icon: 'database' },
          ] } },
          beats: [
            { ar: '**الحوسبة السحابية:** تقديم موارد تكنولوجيا المعلومات (تخزين، معالجة، برامج) __كخدمة عبر الإنترنت__.', en: '**Cloud computing:** delivering IT resources (storage, processing, software) __as a service over the Internet__.' },
            { ar: 'لما ترفع صورة على Google Drive، هي فعلًا بتتخزّن على سيرفر في __مركز بيانات__ زي ده.', en: 'When you upload a photo to Google Drive, it is really stored on a server in a __data center__ like this one.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'جوّه مركز البيانات', en: 'Inside a data center' },
          visual: { anim: 'photo', props: { img: 'img/datacenter.webp', motion: 'in', hotspots: [
            { x: 15, y: 40, icon: 'server', label: { ar: 'صفوف سيرفرات شغّالة 24 ساعة', en: 'rows of servers running 24/7' }, beat: 0 },
            { x: 50, y: 48, icon: 'database', label: { ar: 'هنا بتتخزّن بياناتنا', en: 'our data lives here' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'مراكز البيانات فيها __آلاف السيرفرات__ شغّالة ليل ونهار — هي «جسم» السحابة.', en: 'Data centers hold __thousands of servers__ running day and night — the "body" of the cloud.' },
            { ar: 'ولما تستخدم خدمة سحابية، أنت __بتستأجر جزء__ من الأجهزة دي عبر الإنترنت — ده معنى **IT كخدمة**.', en: 'Using a cloud service means __renting part__ of these machines over the Internet — that is **IT as a service**.' },
          ],
        },
        {
          type: 'quiz',
          title: { ar: 'اختبر نفسك', en: 'Check yourself' },
          q: { widget: 'order', prompt: { ar: 'رتّب مراحل تطور تكنولوجيا المعلومات من الأقدم للأحدث:', en: 'Put the stages of IT in order, oldest first:' },
            items: [
              { ar: 'ميلاد الحاسب', en: 'Birth of the computer' },
              { ar: 'الحواسب الشخصية', en: 'Personal computers' },
              { ar: 'الإنترنت تجاريًا', en: 'Commercial Internet' },
              { ar: 'الهواتف الذكية', en: 'Smartphones' },
              { ar: 'الحوسبة السحابية', en: 'Cloud computing' },
            ],
            explain: { ar: '1940s حاسب ← 1970s PC ← 1990s إنترنت ← 2000s موبايل ← 2010s سحابة.', en: '1940s computer → 1970s PC → 1990s Internet → 2000s smartphone → 2010s cloud.' } },
        },
      ],
    },

    /* ───────────── 2 · Moore's law ───────────── */
    {
      id: 'moore', kind: 'learn',
      title: { ar: 'قانون مور ومشاكله', en: "Moore's Law and its limits" },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: 'جوّه كل جهاز… شريحة', en: 'Inside every device… a chip' },
          visual: { anim: 'cinema', props: { tint: 'green', clips: [
              { src: 'media/mx-47051.mp4', beat: 0, title: { ar: 'الشريحة = المخ', en: 'The chip = the brain' }, sub: { ar: 'معالج على لوحة إلكترونية', en: 'a processor on a circuit board' }, icon: 'cpu' },
              { src: 'media/mx-46965.mp4', beat: 1, title: { ar: 'مصنع الشرائح', en: 'Chip factory' }, sub: { ar: 'آلات بتركّب ملايين القطع', en: 'machines placing millions of parts' }, icon: 'factory' },
              { src: 'media/mx-47048.mp4', beat: 2, title: { ar: 'مسارات الكهربا', en: 'Electric pathways' }, sub: { ar: 'الإشارة بتجري بين الترانزستورات', en: 'signals racing between transistors' }, icon: 'bolt' },
          ] } },
          beats: [
            { ar: 'موبايلك ولابتوبك جوّاهم **شريحة (دائرة متكاملة)** — هي المخ اللي بيحسب كل حاجة.', en: 'Your phone and laptop contain a **chip (integrated circuit)** — the brain that computes everything.' },
            { ar: 'الشرائح بتتصنع بآلات دقيقة جدًا بتحط __ملايين__ القطع الصغيرة في مكانها.', en: 'Chips are built by ultra-precise machines placing __millions__ of tiny parts.' },
            { ar: 'جوّه الشريحة __مليارات الترانزستورات__ متوصّلة بمسارات — وعددهم ده هو موضوع **قانون مور**.', en: 'Inside are __billions of transistors__ linked by pathways — and their number is what **Moore’s Law** is about.' },
          ],
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'أول معالج سنة 1971 كان فيه 2,300 ترانزستور. تفتكر سنة 2021 بقوا كام؟', en: 'The first processor (1971) had 2,300 transistors. How many by 2021?' },
            options: [
              { emoji: '🔟', text: { ar: 'حوالي 10 أضعاف', en: 'About 10×' } },
              { emoji: '💯', text: { ar: 'حوالي 1000 ضعف', en: 'About 1000×' } },
              { emoji: '🚀', text: { ar: 'ملايين الأضعاف!', en: 'Millions of times!' } },
            ],
            after: { ar: 'خلّي تخمينك في دماغك — الإجابة هتفاجئك 😲', en: 'Keep your guess in mind — the answer will surprise you 😲' } },
        },
        {
          type: 'scene',
          title: { ar: 'قانون مور: «اتنين في كل سنتين»', en: "Moore's Law: \"×2 every two years\"" },
          enTitle: "Moore's Law",
          terms: ["Moore's Law", 'transistor', 'integrated circuit'],
          visual: { anim: 'mooreChip' },
          beats: [
            { ar: '**الترانزستور** = مفتاح صغير جدًا (شغّال/مقفول = 1/0). الشريحة (الدائرة المتكاملة) فيها __مليارات__ منه.', en: 'A **transistor** is a tiny switch (on/off = 1/0). A chip (integrated circuit) holds __billions__ of them.' },
            { ar: '**قانون مور:** ملاحظة تجريبية بتقول إن __عدد الترانزستورات__ في الدائرة المتكاملة __بيتضاعف كل سنتين تقريبًا__.', en: "**Moore's Law:** the empirical observation that the __number of transistors__ on an integrated circuit __doubles about every two years__." },
            { ar: 'فضل صحيح سنين طويلة: من __2,300__ ترانزستور (Intel 4004 — 1971) لأكتر من __100 مليار__ النهارده → قدرة الحوسبة زادت بشكل هائل.', en: 'It held for decades: from __2,300__ transistors (Intel 4004, 1971) to over __100 billion__ today → computing power grew dramatically.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'قانون مور بيتكلم عن __عدد الترانزستورات__ — مش سرعة الإنترنت ولا سرعة المعالج مباشرةً. وهو «ملاحظة» مش قانون فيزيائي.', en: "Moore's Law is about __transistor count__ — not Internet speed or CPU speed directly. It is an observation, not a law of physics." } },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'أول معالج في التاريخ: Intel 4004', en: 'The first microprocessor: Intel 4004' },
          visual: { anim: 'photo', props: { img: 'img/real-intel4004.webp', credit: 'Intel C4004 · Fouky / Wikimedia Commons · CC BY-SA 4.0', hotspots: [
            { x: 45, y: 30, icon: 'cpu', label: { ar: 'سنة 1971', en: 'Year 1971' }, beat: 0 },
            { x: 30, y: 75, icon: 'bolt', label: { ar: '2,300 ترانزستور بس!', en: 'only 2,300 transistors!' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'ده **Intel 4004** الحقيقي — أول معالج دقيق في التاريخ، اتعمل سنة __1971__.', en: 'This is the real **Intel 4004** — the first microprocessor, made in __1971__.' },
            { ar: 'كان فيه __2,300 ترانزستور__ بس. موبايلك النهارده فيه أكتر من __15 مليار__ — وده بالظبط اللي قانون مور اتوقّعه.', en: 'It had only __2,300 transistors__. Your phone today has over __15 billion__ — exactly what Moore’s Law predicted.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'الشرائح بتتولد على رقائق السيليكون', en: 'Chips are born on silicon wafers' },
          visual: { anim: 'photo', props: { img: 'img/real-wafer.webp', credit: 'Silicon wafers 2"–8" · Wikimedia Commons · CC BY-SA 3.0', hotspots: [
            { x: 68, y: 35, icon: 'cpu', label: { ar: 'كل مربع = شريحة', en: 'each square = one chip' }, beat: 0 },
            { x: 25, y: 78, icon: 'target', label: { ar: 'الرقاقة بتكبر = شرائح أكتر', en: 'bigger wafer = more chips' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'الشرائح بتتصنع على __رقائق سيليكون (Wafers)__ — كل مربع صغير فيها = شريحة كاملة.', en: 'Chips are made on __silicon wafers__ — every little square is a complete chip.' },
            { ar: 'ومع الوقت الترانزستورات بتصغر، فـ__نفس المساحة بتشيل ترانزستورات أكتر__ — ده محرّك قانون مور.', en: 'Over time transistors shrink, so __the same area holds more of them__ — the engine of Moore’s Law.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'ليه قانون مور قرّب يوقف؟ المشاكل واحدة واحدة', en: "Why is Moore's Law slowing? The problems, one by one" },
          terms: ['physical limit', 'quantum tunneling', 'leakage current'],
          visual: { anim: 'mooreLimit' },
          beats: [
            { ar: '**المشكلة 1 — الحدّ الفيزيائي:** الترانزستور صغر لحد ما بقى أصغر من __10 نانومتر__ — يعني عرضه __كام ذرة بس__! مش هينفع نصغّر للأبد.', en: '**Problem 1 — the physical limit:** transistors shrank below __10 nm__ — only __a few atoms__ wide! We cannot shrink forever.' },
            { ar: '**المشكلة 2 — تأثير النفق الكمومي:** الإلكترونات __بتتسرّب عبر الحاجز__ العازل كأنها بتعدّي من خلاله بدل ما تقف → المفتاح مابقاش «مقفول» بشكل موثوق.', en: '**Problem 2 — quantum tunneling:** electrons __slip through the barrier__ instead of being stopped → the switch is no longer reliably "off".' },
            { ar: '**المشكلة 3 — تيار التسرّب:** جزء من التيار __بيهرب بدون قصد__ حتى والترانزستور مقفول → طاقة ضايعة.', en: '**Problem 3 — leakage current:** some current __escapes unintentionally__ even when the transistor is off → wasted energy.' },
            { ar: '**النتيجة:** حرارة واستهلاك طاقة أعلى → صعب نجمع بين __أداء أعلى__ و__استهلاك طاقة أقل__ في نفس الوقت.', en: '**Result:** more heat and power use → hard to get __higher performance__ and __lower power__ at the same time.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'احفظ المشكلتين بالاسم: **تأثير النفق الكمومي** (الإلكترون يعدّي الحاجز) و**تيار التسرّب** (التيار يهرب).', en: 'Memorize both by name: **quantum tunneling** (electron passes the barrier) and **leakage current** (current escapes).' } }],
        },
        {
          type: 'scene',
          title: { ar: 'الحلول: اتجاهات جديدة لزيادة الأداء', en: 'The fixes: new directions for performance' },
          terms: ['parallel processing', 'multi-core', 'quantum computer'],
          visual: { anim: 'mooreParallel' },
          beats: [
            { ar: '**المعالجة المتوازية:** بدل نواة واحدة بتعمل المهام ورا بعض، نستخدم __أنوية كتير__ بتقسّم الشغل وتشتغل __في نفس الوقت__.', en: '**Parallel processing:** instead of one core doing tasks one after another, __many cores__ split the work and run __at the same time__.' },
            { ar: '**الحواسب الكمومية:** فكرة حساب مختلفة تمامًا مبنية على __مبادئ ميكانيكا الكم__ — هنشوفها بالتفصيل في التقنيات الناشئة.', en: '**Quantum computers:** a completely different way of computing based on __quantum mechanics__ — more in Emerging Technologies.' },
          ],
        },
        {
          type: 'quiz',
          q: { widget: 'tf', items: [
            { text: { ar: 'قانون مور: عدد الترانزستورات في الدائرة المتكاملة بيتضاعف كل سنتين تقريبًا.', en: "Moore's Law: transistor count on an IC doubles about every two years." }, answer: true },
            { text: { ar: 'قانون مور قانون فيزيائي ثابت لا يمكن أن يتوقف.', en: "Moore's Law is a fixed law of physics that can never stop." }, answer: false, explain: { ar: 'هو ملاحظة تجريبية، وبيقرّب من حدّ فيزيائي.', en: 'It is an empirical observation, and it is approaching a physical limit.' } },
            { text: { ar: 'في تأثير النفق الكمومي، الإلكترونات تعدّي الحاجز العازل بدل ما تقف.', en: 'In quantum tunneling, electrons pass through the insulating barrier instead of stopping.' }, answer: true },
            { text: { ar: 'المعالجة المتوازية معناها نواة واحدة تشتغل أسرع.', en: 'Parallel processing means one single core running faster.' }, answer: false, explain: { ar: 'معناها أنوية كتير بتشتغل في نفس الوقت.', en: 'It means many cores working at the same time.' } },
          ] },
        },
      ],
    },

    /* ───────────── 3 · Moore's law math ───────────── */
    {
      id: 'moore-math', kind: 'example',
      title: { ar: 'احسبها! مسائل قانون مور', en: "Calculate it! Moore's Law problems" },
      steps: [
        {
          type: 'scene',
          title: { ar: 'القانون الرياضي لقانون مور', en: "The formula behind Moore's Law" },
          visual: { anim: 'mooreFormula' },
          beats: [
            { ar: 'كل __سنتين__ العدد بيتضرب في __2__. يعني بعد 2 سنة ×2، بعد 4 سنين ×4، بعد 6 سنين ×8…', en: 'Every __2 years__ the count is multiplied by __2__: after 2 years ×2, after 4 ×4, after 6 ×8…' },
            { ar: '**عدد مرات التضاعف:** `n = (t − t₀) ÷ 2` — الفرق بين السنتين مقسوم على 2.', en: '**Number of doublings:** `n = (t − t₀) ÷ 2` — the years between, divided by 2.' },
            { ar: '**القانون:** `N = N₀ × 2^n` — العدد الجديد = العدد القديم × 2 أُس عدد مرات التضاعف.', en: '**The formula:** `N = N₀ × 2^n` — new count = old count × 2 to the power of doublings.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'N₀ = العدد في السنة الأولى t₀ · N = العدد في السنة المطلوبة t · n = عدد مرات التضاعف.', en: 'N₀ = count in the first year t₀ · N = count in the target year t · n = number of doublings.' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'يعني إيه t و t₀ و N₀ و N؟ ببساطة', en: 'What do t, t₀, N₀ and N mean? Simply' },
          visual: { anim: 'mooreSymbols', props: { y0: 2002, n0: 1451, y1: 2025 } },
          beats: [
            { ar: '**t₀** (تي صفر) = __سنة البداية__ — السنة اللي إحنا __عارفين__ فيها العدد. والعدد ده اسمه **N₀**. في مثالنا: `t₀ = 2002` و `N₀ = 1,451`.', en: '**t₀** (t-zero) = the __start year__ — the year whose count we __know__. That count is **N₀**. Here: `t₀ = 2002`, `N₀ = 1,451`.' },
            { ar: '**t** = __السنة المطلوبة__ — السنة اللي بنسأل عن العدد فيها. والعدد المجهول ده اسمه **N**. في مثالنا: `t = 2025` و N = ؟', en: '**t** = the __target year__ — the year we ask about. The unknown count there is **N**. Here: `t = 2025`, N = ?' },
            { ar: 'نمشي من t₀ لحد t: عدد السنين = `t − t₀ = 2025 − 2002 = 23` سنة. وكل __سنتين__ العدد بيتضاعف مرة (×2).', en: 'Walk from t₀ to t: years = `t − t₀ = 2025 − 2002 = 23`. Every __two years__ the count doubles once (×2).' },
            { ar: 'فعدد مرات التضاعف **n** = عدد السنين ÷ 2 = `23 ÷ 2 = 11.5`. خلاص كده عرفنا كل رمز بيعمل إيه! 🎯', en: 'So the number of doublings **n** = years ÷ 2 = `23 ÷ 2 = 11.5`. Now every symbol has a meaning! 🎯' },
          ],
          notes: [{ kind: 'tip', title: { ar: 'سرّ الحفظ', en: 'Memory trick' }, text: { ar: 'الصفر الصغير (₀) = «البداية». t₀ و N₀ = اللي عندي في الأول · t و N = اللي عايز أوصله.', en: 'The little zero (₀) = "start". t₀ and N₀ = what I have at the start · t and N = what I want to reach.' } }],
        },
        {
          type: 'quiz', title: { ar: 'وصّل كل رمز بمعناه', en: 'Match each symbol to its meaning' },
          q: { widget: 'match', prompt: { ar: 'في القانون `N = N₀ × 2^n` — كل رمز معناه إيه؟', en: 'In N = N₀ × 2^n — what does each symbol mean?' },
            left: [{ ar: 't₀', en: 't₀' }, { ar: 't', en: 't' }, { ar: 'N₀', en: 'N₀' }, { ar: 'N', en: 'N' }, { ar: 'n', en: 'n' }],
            right: [
              { ar: 'العدد اللي عايزين نعرفه', en: 'the count we want to find' },
              { ar: 'سنة البداية', en: 'the start year' },
              { ar: 'عدد مرات التضاعف = (`t − t₀`) ÷ 2', en: 'number of doublings = (t − t₀) ÷ 2' },
              { ar: 'السنة المطلوبة', en: 'the target year' },
              { ar: 'العدد في سنة البداية', en: 'the count in the start year' },
            ],
            answer: [1, 3, 4, 0, 2],
            explain: { ar: 't₀ = سنة البداية · t = السنة المطلوبة · N₀ = العدد في البداية · N = العدد المطلوب · n = عدد مرات التضاعف.', en: 't₀ = start year · t = target year · N₀ = start count · N = wanted count · n = doublings.' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'مثال 1: من 2002 لـ 2025', en: 'Example 1: from 2002 to 2025' },
          visual: { anim: 'mooreSolver', props: { mode: 'forward', y0: 2002, n0: 1451, y1: 2025 } },
          beats: [
            { ar: '**المعطيات:** سنة 2002 كان عدد الترانزستورات __1,451__. المطلوب: العدد سنة __2025__.', en: '**Given:** in 2002 the count was __1,451__. Find the count in __2025__.' },
            { ar: '**الخطوة 1 — عدد السنين:** `2025 − 2002 = 23` __سنة__.', en: '**Step 1 — years:** 2025 − 2002 = __23 years__.' },
            { ar: '**الخطوة 2 — عدد مرات التضاعف:** `n = 23 ÷ 2 = 11.5` __مرة__.', en: '**Step 2 — doublings:** n = 23 ÷ 2 = __11.5 times__.' },
            { ar: '**الخطوة 3 — نعوّض في القانون:** `N = 1,451 × 2^11.5`', en: '**Step 3 — substitute:** N = 1,451 × 2^11.5' },
            { ar: '**الخطوة 4 — نحسب 2^11.5:** = `2^11 × 2^0.5 = 2,048 × 1.414 ≈ 2,896` (يعني العدد اتضاعف حوالي 2,896 مرة!).', en: '**Step 4 — compute 2^11.5:** = 2^11 × 2^0.5 = 2,048 × 1.414 ≈ __2,896__ (the count grew about 2,896-fold!).' },
            { ar: '**الناتج:** `N = 1,451 × 2,896 ≈ 4,202,545` __ترانزستور__ (حوالي 4.2 مليون).', en: '**Answer:** N = 1,451 × 2,896 ≈ __4,202,545 transistors__ (about 4.2 million).' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'لو n فيها نص (زي 11.5)، استخدم `2^0.5 = √2 ≈ 1.414`.', en: 'If n has a half (like 11.5), use 2^0.5 = √2 ≈ 1.414.' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'مثال 2: من 2000 لـ 2010', en: 'Example 2: from 2000 to 2010' },
          visual: { anim: 'mooreSolver', props: { mode: 'forward', y0: 2000, n0: 1000000, y1: 2010 } },
          beats: [
            { ar: '**المعطيات:** سنة 2000 الشريحة فيها __1,000,000__ ترانزستور. كام سنة 2010؟', en: '**Given:** in 2000 a chip has __1,000,000__ transistors. How many in 2010?' },
            { ar: '**الخطوة 1:** `2010 − 2000 = 10` __سنين__.', en: '**Step 1:** 2010 − 2000 = __10 years__.' },
            { ar: '**الخطوة 2:** `n = 10 ÷ 2 = 5` __مرات__ تضاعف.', en: '**Step 2:** n = 10 ÷ 2 = __5 doublings__.' },
            { ar: '**الخطوة 3:** `N = 1,000,000 × 2^5`', en: '**Step 3:** N = 1,000,000 × 2^5' },
            { ar: '**الخطوة 4:** `2^5 = 2×2×2×2×2 = 32`.', en: '**Step 4:** 2^5 = 2×2×2×2×2 = __32__.' },
            { ar: '**الناتج:** N = __32,000,000__ ترانزستور (32 مليون).', en: '**Answer:** N = __32,000,000__ transistors (32 million).' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'مثال 3 (عكسي): نرجع بالزمن', en: 'Example 3 (reverse): going back in time' },
          visual: { anim: 'mooreSolver', props: { mode: 'backward', y1: 2020, n1: 8000, y0: 2014 } },
          beats: [
            { ar: '**المعطيات:** سنة 2020 العدد __8,000__. كان كام سنة __2014__؟', en: '**Given:** in 2020 the count is __8,000__. What was it in __2014__?' },
            { ar: '**الخطوة 1:** `2020 − 2014 = 6` __سنين__.', en: '**Step 1:** 2020 − 2014 = __6 years__.' },
            { ar: '**الخطوة 2:** `n = 6 ÷ 2 = 3` __مرات__ تضاعف.', en: '**Step 2:** n = 6 ÷ 2 = __3 doublings__.' },
            { ar: '**الخطوة 3 — نقلب القانون:** `N₀ = N ÷ 2^n = 8,000 ÷ 2^3`', en: '**Step 3 — rearrange:** N₀ = N ÷ 2^n = 8,000 ÷ 2^3' },
            { ar: '**الخطوة 4:** 2^3 = __8__.', en: '**Step 4:** 2^3 = __8__.' },
            { ar: '**الناتج:** `N₀ = 8,000 ÷ 8 = 1,000` ترانزستور.', en: '**Answer:** N₀ = 8,000 ÷ 8 = __1,000__ transistors.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'رايح للمستقبل؟ اضرب في 2^n. راجع للماضي؟ اقسم على 2^n.', en: 'Going forward? Multiply by 2^n. Going back? Divide by 2^n.' } }],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'مثال 4: بعد كام سنة يبقى 16 ضعف؟', en: 'Example 4: how many years to grow 16×?' },
          visual: { anim: 'mooreSolver', props: { mode: 'years', ratio: 16 } },
          beats: [
            { ar: '**المطلوب:** بعد كام سنة عدد الترانزستورات يبقى __16 ضعف__؟', en: '**Find:** after how many years is the count __16 times__ bigger?' },
            { ar: '**الخطوة 1:** نكتب 16 كـ أُس للـ 2: `16 = 2×2×2×2 = 2` __^4__.', en: '**Step 1:** write 16 as a power of 2: 16 = 2×2×2×2 = __2^4__.' },
            { ar: '**الخطوة 2:** يعني n = __4 مرات__ تضاعف.', en: '**Step 2:** so n = __4 doublings__.' },
            { ar: '**الناتج:** كل تضاعف = سنتين → `4 × 2 = 8` __سنين__.', en: '**Answer:** each doubling = 2 years → 4 × 2 = __8 years__.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'مثال أسطوري: هل قانون مور صدق فعلًا؟', en: "Legendary check: did Moore's Law really hold?" },
          visual: { anim: 'mooreSolver', props: { mode: 'forward', y0: 1971, n0: 2300, y1: 2021, actual: { value: 57000000000, label: { ar: 'Apple M1 Max الحقيقي (2021): 57 مليار', en: 'Real Apple M1 Max (2021): 57 billion' } } } },
          beats: [
            { ar: '**المعطيات:** Intel 4004 سنة 1971 كان فيه __2,300__ ترانزستور. نتوقّع كام سنة __2021__؟', en: '**Given:** the Intel 4004 (1971) had __2,300__ transistors. Predict the count in __2021__.' },
            { ar: '**الخطوة 1:** `2021 − 1971 = 50` __سنة__.', en: '**Step 1:** 2021 − 1971 = __50 years__.' },
            { ar: '**الخطوة 2:** `n = 50 ÷ 2 = 25` __مرة__ تضاعف.', en: '**Step 2:** n = 50 ÷ 2 = __25 doublings__.' },
            { ar: '**الخطوة 3:** `N = 2,300 × 2^25`', en: '**Step 3:** N = 2,300 × 2^25' },
            { ar: '**الخطوة 4:** 2^25 = __33,554,432__ (أكتر من 33 مليون ضعف!).', en: '**Step 4:** 2^25 = __33,554,432__ (over 33 million-fold!).' },
            { ar: '**الناتج:** ≈ __77 مليار__ ترانزستور… والشريحة الحقيقية Apple M1 Max سنة 2021 كان فيها __57 مليار__ — قريب جدًا! 🤯', en: '**Answer:** ≈ __77 billion__… and the real Apple M1 Max (2021) had __57 billion__ — remarkably close! 🤯' },
          ],
        },
        {
          type: 'quiz', optional: true, title: { ar: 'لعبة التخمين 🎯 — جولة 1', en: 'Guessing game 🎯 — round 1' },
          q: { widget: 'guess', prompt: { ar: 'خمّن: كام ترانزستور سنة 1991 حسب قانون مور؟', en: 'Guess: how many transistors in 1991 by Moore’s Law?' }, y0: 1971, n0: 2300, y1: 1991 },
        },
        {
          type: 'quiz', optional: true, title: { ar: 'لعبة التخمين 🎯 — جولة 2', en: 'Guessing game 🎯 — round 2' },
          q: { widget: 'guess', prompt: { ar: 'خمّن: شريحة سنة 1985 فيها 275,000 ترانزستور — كام سنة 2005؟', en: 'Guess: a 1985 chip had 275,000 — how many in 2005?' }, y0: 1985, n0: 275000, y1: 2005 },
        },
        {
          type: 'quiz', optional: true, title: { ar: 'لعبة التخمين 🎯 — جولة 3', en: 'Guessing game 🎯 — round 3' },
          q: { widget: 'guess', prompt: { ar: 'خمّن: شريحة سنة 2000 فيها 42 مليون — كام سنة 2016؟', en: 'Guess: a 2000 chip had 42 million — how many in 2016?' }, y0: 2000, n0: 42000000, y1: 2016 },
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'معمل قانون مور — جرّب بنفسك', en: "Moore's Law lab — try it yourself" },
          visual: { anim: 'mooreLab' },
          beats: [
            { ar: 'حرّك السنة وغيّر العدد الأولي، وشوف المنحنى __الأُسّي__ بيطلع إزاي — ده سر «الانفجار» في قدرة الحواسب.', en: 'Move the year and change the starting count — watch the __exponential__ curve shoot up. That is the secret of the computing explosion.' },
          ],
        },
        {
          type: 'quiz', title: { ar: 'دورك! مسألة 1', en: 'Your turn! Problem 1' },
          q: { widget: 'numeric', prompt: { ar: 'شريحة فيها 5,000 ترانزستور سنة 2010. حسب قانون مور، كام ترانزستور سنة 2016؟', en: 'A chip has 5,000 transistors in 2010. By Moore\'s Law, how many in 2016?' },
            answer: 40000, tolerance: 0, check: { mode: 'forward', y0: 2010, n0: 5000, y1: 2016 }, hint: { ar: 'عدد السنين 6 ← `6 ÷ 2 = 3` مرات تضاعف ← `5,000 × 2^3`', en: '6 years ÷ 2 = 3 doublings → 5,000 × 2^3' },
            explain: { ar: '2016−2010 = 6 → n = 3 → 5,000 × 8 = 40,000', en: '2016−2010 = 6 → n = 3 → 5,000 × 8 = 40,000' } },
        },
        {
          type: 'quiz', title: { ar: 'دورك! مسألة 2', en: 'Your turn! Problem 2' },
          q: { widget: 'numeric', prompt: { ar: 'سنة 2004 كان العدد 3,000. كام سنة 2024؟', en: 'In 2004 the count was 3,000. How many in 2024?' },
            answer: 3072000, tolerance: 0, check: { mode: 'forward', y0: 2004, n0: 3000, y1: 2024 }, hint: { ar: '20 سنة → `n = 10` → `2^10 = 1,024`', en: '20 years → n = 10 → 2^10 = 1,024' },
            explain: { ar: 'n = 20 ÷ 2 = 10 → 3,000 × 1,024 = 3,072,000', en: 'n = 20 ÷ 2 = 10 → 3,000 × 1,024 = 3,072,000' } },
        },
        {
          type: 'quiz', title: { ar: 'دورك! مسألة 3 (عكسية)', en: 'Your turn! Problem 3 (reverse)' },
          q: { widget: 'numeric', prompt: { ar: 'سنة 2022 الشريحة فيها 64,000 ترانزستور. كان فيها كام سنة 2012؟', en: 'In 2022 a chip has 64,000 transistors. How many did it have in 2012?' },
            answer: 2000, tolerance: 0, check: { mode: 'backward', y1: 2022, n1: 64000, y0: 2012 }, hint: { ar: 'راجع للماضي؟ اقسم: `n = 10 ÷ 2 = 5` → `64,000 ÷ 2^5`', en: 'Going back? Divide: n = 10 ÷ 2 = 5 → 64,000 ÷ 2^5' },
            explain: { ar: 'n = 5 → 64,000 ÷ 32 = 2,000', en: 'n = 5 → 64,000 ÷ 32 = 2,000' } },
        },
        {
          type: 'quiz', title: { ar: 'دورك! مسألة 4', en: 'Your turn! Problem 4' },
          q: { widget: 'numeric', prompt: { ar: 'بعد كام سنة يبقى عدد الترانزستورات 64 ضعف؟', en: 'After how many years will the transistor count be 64 times larger?' },
            answer: 12, tolerance: 0, check: { mode: 'years', ratio: 64 }, unit: { ar: 'سنة', en: 'years' }, hint: { ar: '`64 = 2^6` → `n = 6` → كل تضاعف سنتين', en: '64 = 2^6 → n = 6 → each doubling is 2 years' },
            explain: { ar: '`64 = 2^6` → `6 × 2 = 12` سنة', en: '64 = 2^6 → 6 × 2 = 12 years' } },
        },
        {
          type: 'quiz', title: { ar: 'دورك! مسألة 5 (فيها نص)', en: 'Your turn! Problem 5 (with a half)' },
          q: { widget: 'numeric', prompt: { ar: 'سنة 2001 كان العدد 1,000. كام تقريبًا سنة 2006؟ (قرّب لأقرب عدد صحيح)', en: 'In 2001 the count was 1,000. About how many in 2006? (round to a whole number)' },
            answer: 5657, tolerance: 0.01, check: { mode: 'forward', y0: 2001, n0: 1000, y1: 2006 }, hint: { ar: 'n = 5 ÷ 2 = 2.5 → 2^2.5 = 2^2 × √2 = 4 × 1.414', en: 'n = 5 ÷ 2 = 2.5 → 2^2.5 = 2^2 × √2 = 4 × 1.414' },
            explain: { ar: '2^2.5 ≈ 5.657 → 1,000 × 5.657 ≈ 5,657', en: '2^2.5 ≈ 5.657 → 1,000 × 5.657 ≈ 5,657' } },
        },
      ],
    },

    /* ───────────── 4 · social changes ───────────── */
    {
      id: 'social', kind: 'learn',
      title: { ar: 'خمس تحولات اجتماعية', en: 'Five social changes' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'فكّر لحظة: من الخمس تحولات دي — أنهي واحد صعب جدًا تستغنى عنه؟', en: 'Pause & think: of these five changes — which would be hardest to give up?' },
            options: [
              { emoji: '💬', text: { ar: 'شبكات التواصل', en: 'Social networks' } },
              { emoji: '🛒', text: { ar: 'التجارة الإلكترونية', en: 'E-commerce' } },
              { emoji: '🏠', text: { ar: 'العمل عن بُعد', en: 'Remote work' } },
              { emoji: '🎓', text: { ar: 'التعلّم أونلاين', en: 'Online learning' } },
              { emoji: '💳', text: { ar: 'الدفع غير النقدي', en: 'Cashless payment' } },
            ],
            after: { ar: 'مفيش إجابة غلط هنا — المهم تعرف تبرّر اختيارك 💡', en: 'No wrong answer — what matters is justifying your choice 💡' } },
        },
        {
          type: 'scene',
          title: { ar: 'إزاي تكنولوجيا المعلومات غيّرت حياتنا؟', en: 'How did IT change our lives?' },
          enTitle: 'Social Changes Resulting from IT',
          visual: { anim: 'iconCards', props: { cards: [
            { icon: 'share', motion: 'network', title: { ar: 'شبكات التواصل (SNS)', en: 'SNS' }, sub: { ar: 'Facebook · WhatsApp', en: 'Facebook · WhatsApp' } },
            { icon: 'cart', motion: 'cart', title: { ar: 'التجارة الإلكترونية (EC)', en: 'E-commerce (EC)' }, sub: { ar: 'Amazon · eBay', en: 'Amazon · eBay' } },
            { icon: 'laptopHome', motion: 'pulse', title: { ar: 'العمل عن بُعد', en: 'Remote work' }, sub: { ar: 'من البيت', en: 'From home' } },
            { icon: 'cap', motion: 'float', title: { ar: 'التعلّم عبر الإنترنت', en: 'Online learning' }, sub: { ar: 'حصص أونلاين', en: 'Online classes' } },
            { icon: 'qr', motion: 'scan', title: { ar: 'الدفع غير النقدي', en: 'Cashless payment' }, sub: { ar: 'كارت · QR · تطبيق', en: 'Card · QR · app' } },
          ] } },
          beats: [
            { ar: '**شبكات التواصل الاجتماعي (SNS):** خدمات بتخلّي المستخدمين __يتواصلوا وينشروا ويشاركوا__ المعلومات — وفعّالة جدًا في __نشر المعلومة بسرعة__.', en: '**SNS:** services that let users __connect, post and share__ information — highly effective at __spreading information rapidly__.' },
            { ar: '**التجارة الإلكترونية (EC):** __بيع وشراء__ السلع والخدمات __عبر الإنترنت__. مثال: Amazon و eBay.', en: '**E-commerce (EC):** __buying and selling__ goods and services __through the Internet__. e.g. Amazon, eBay.' },
            { ar: '**العمل عن بُعد:** نمط شغل بتعمل فيه مهامك من __البيت أو أي مكان بعيد__ باستخدام الإنترنت.', en: '**Remote work:** working from __home or another remote location__ using the Internet.' },
            { ar: '**التعلّم عبر الإنترنت:** الدروس والمواد الدراسية بتتقدّم __عن طريق الإنترنت__.', en: '**Online learning:** classes and study materials delivered __over the Internet__.' },
            { ar: '**الدفع غير النقدي:** الدفع بـ__نقود إلكترونية أو رموز QR__ من غير كاش. مثال: كروت ائتمان/خصم، تطبيقات دفع.', en: '**Cashless payment:** paying with __e-money or QR codes__ without cash. e.g. credit/debit cards, payment apps.' },
          ],
          notes: [
            { kind: 'confuse', title: { ar: 'فرق بيلخبط — التجارة الإلكترونية ≠ الدفع غير النقدي', en: 'Easily confused — e-commerce ≠ cashless payment' }, text: { ar: 'التجارة الإلكترونية = __عملية الشراء نفسها__ أونلاين. الدفع غير النقدي = تدفع __من غير كاش__ — وممكن يحصل في محل حقيقي (كارت أو QR).', en: 'E-commerce = the __purchase itself__ happens online. Cashless = paying __without cash__ — can happen in a physical shop (card or QR).' } },
            { kind: 'exam', text: { ar: '«التجارة الإلكترونية = شراء بالكاش من محل حقيقي» ← عبارة __خاطئة__.', en: '"E-commerce = paying cash in a physical shop" is __false__.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: 'وصّل', en: 'Match' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل تحوّل بالمثال بتاعه:', en: 'Match each change with its example:' },
            left: [
              { ar: 'شبكات التواصل (SNS)', en: 'SNS' },
              { ar: 'التجارة الإلكترونية', en: 'E-commerce' },
              { ar: 'العمل عن بُعد', en: 'Remote work' },
              { ar: 'الدفع غير النقدي', en: 'Cashless payment' },
            ],
            right: [
              { ar: 'طلب كتاب من Amazon', en: 'Ordering a book from Amazon' },
              { ar: 'الدفع بـ QR في الكافيتريا', en: 'Paying by QR in the cafeteria' },
              { ar: 'نشر صورة لأصحابك', en: 'Posting a photo for friends' },
              { ar: 'اجتماع الشغل من البيت', en: 'A work meeting from home' },
            ],
            answer: [2, 0, 3, 1] },
        },
      ],
    },

    /* ───────────── 5 · emerging technologies ───────────── */
    {
      id: 'emerging', kind: 'learn',
      title: { ar: 'التقنيات الناشئة: قيادة ذاتية · AR/VR · كمومية', en: 'Emerging tech: self-driving · AR/VR · quantum' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: 'الطريق مليان مفاجآت', en: 'The road is full of surprises' },
          visual: { anim: 'cinema', props: { tint: 'amber', clips: [
              { src: 'media/mx-42367.mp4', beat: 0, title: { ar: 'طريق سريع', en: 'Highway' }, sub: { ar: '60 كم/س = 16.7 متر كل ثانية', en: '60 km/h = 16.7 m every second' }, icon: 'car' },
              { src: 'media/mx-42039.mp4', beat: 1, title: { ar: 'زحمة بالليل', en: 'Night traffic' }, sub: { ar: 'عربيات + ناس + إشارات', en: 'cars + people + signals' }, icon: 'eye' },
              { src: 'media/mx-50998.mp4', beat: 2, title: { ar: 'تقاطع ضخم من فوق', en: 'A huge junction from above' }, sub: { ar: 'آلاف القرارات كل ثانية', en: 'thousands of decisions per second' }, icon: 'route' },
          ] } },
          beats: [
            { ar: 'السواق بيشوف ويقرّر طول الوقت: أكمّل؟ أهدّي؟ أقف؟ — وبسرعة 60 كم/س العربية بتمشي __16.7 متر كل ثانية__.', en: 'A driver sees and decides constantly: go? slow? stop? — at 60 km/h the car covers __16.7 m every second__.' },
            { ar: 'بالليل وفي الزحمة: عربيات، ناس بتعدّي، إشارات… أي __تأخير في القرار__ ممكن يبقى حادثة.', en: 'At night in traffic: cars, people crossing, lights… any __delay in deciding__ can mean an accident.' },
            { ar: 'السؤال: ينفع **ذكاء اصطناعي** يسوق بدل الإنسان؟ تعالى نشوف إزاي.', en: 'The question: can **AI** drive instead of a human? Let’s see how.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'القيادة الذاتية: العربية بتشوف وتفكّر وتتصرّف', en: 'Autonomous driving: the car sees, thinks and acts' },
          enTitle: 'Autonomous driving',
          terms: ['autonomous driving', 'sensors', 'camera', 'LiDAR'],
          visual: { anim: 'selfDriving' },
          beats: [
            { ar: '**القيادة الذاتية:** تقنية بتستخدم __الذكاء الاصطناعي__ عشان تسوق العربية __من غير سواق__.', en: '**Autonomous driving:** a technology that uses __AI__ to drive a vehicle __without a human__.' },
            { ar: '**بتشوف:** __كاميرات وحسّاسات__ حوالين العربية بتمسح الطريق — عربيات، ناس، إشارات.', en: '**It sees:** __cameras and sensors__ scan the surroundings — cars, people, signals.' },
            { ar: '**بتفكّر:** الذكاء الاصطناعي __بيتعرّف__ على كل حاجة ويقرّر: أكمّل؟ أهدّي؟ أقف؟', en: '**It thinks:** AI __recognizes__ everything and decides: continue? slow down? stop?' },
            { ar: '**بتتصرّف:** النظام __بيتحكم__ في الدريكسيون والفرامل والبنزين.', en: '**It acts:** the system __controls__ steering, brakes and throttle.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'عربية ذاتية القيادة حقيقية', en: 'A real self-driving car' },
          visual: { anim: 'photo', props: { img: 'img/real-waymo.webp', credit: 'Waymo Chrysler Pacifica · Dllu / Wikimedia Commons · CC BY-SA 4.0', hotspots: [
            { x: 84, y: 9, icon: 'compass', label: { ar: 'LiDAR بيلف 360°', en: 'spinning 360° LiDAR' }, beat: 0 },
            { x: 70, y: 50, icon: 'camera', label: { ar: 'كاميرات + رادار', en: 'cameras + radar' }, beat: 0 },
            { x: 40, y: 55, icon: 'brain', label: { ar: 'كمبيوتر جوّه العربية', en: 'an on-board computer' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'دي عربية **Waymo** حقيقية بتسوق نفسها في شوارع أمريكا — شايف الجهاز اللي فوقها؟ ده **LiDAR** بيمسح المكان 360 درجة.', en: 'A real **Waymo** car driving itself on US streets — see the device on top? That is a **LiDAR** scanning 360°.' },
            { ar: 'وجوّاها __كمبيوتر بياخد القرار في مكانه__ — يعني **حوسبة طرفية**. هنشوف ليه ده مهم جدًا في التجربة الجاية.', en: 'Inside, an __on-board computer decides right there__ — **edge computing**. The next experiment shows why that matters.' },
          ],
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'العربية ماشية 60 كم/س وفجأة واحد عدّى قدامها على بعد 25 متر. لو العربية بعتت الصورة للسحابة تستنى القرار… هتلحق تقف؟', en: 'The car does 60 km/h and someone steps out 25 m ahead. If it sends the image to the cloud and waits… will it stop in time?' },
            options: [
              { emoji: '✅', text: { ar: 'أيوه هتلحق', en: 'Yes, it will stop' } },
              { emoji: '💥', text: { ar: 'لأ مش هتلحق', en: 'No, it won’t' } },
              { emoji: '🤔', text: { ar: 'مش متأكد', en: 'Not sure' } },
            ],
            after: { ar: 'احفظ تخمينك… وتعالى نجرّب بالأرقام الحقيقية 👇', en: 'Remember your guess… let’s test it with real numbers 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'تجربة: شخص طلع قدام العربية فجأة!', en: 'Experiment: someone suddenly steps in front of the car!' },
          enTitle: 'Cloud vs edge computing',
          terms: ['edge computing', 'cloud', 'latency'],
          visual: { anim: 'edgeVsCloud' },
          beats: [
            { ar: 'العربية ماشية __60 كم/س__ (يعني __16.7 متر كل ثانية__). فجأة واحد عدّى قدامها على بعد __25 متر__! القرار لازم يكون فوري.', en: 'The car moves at __60 km/h__ (that is __16.7 m every second__). Suddenly someone steps out __25 m__ ahead! The decision must be instant.' },
            { ar: '**لو بعتنا البيانات للسحابة:** الإشارة تطلع للبرج ← السحابة ← ترجع… حوالي __0.8 ثانية__ — والعربية لسه ماشية __13 متر__ قبل ما تبدأ تفرمل → __خطر!__', en: '**If we send data to the cloud:** the signal goes to the tower → cloud → back… about __0.8 s__ — the car travels __13 m__ before braking even starts → __danger!__' },
            { ar: '**بالحوسبة الطرفية:** القرار بيتاخد __جوه العربية نفسها__ في حوالي __0.05 ثانية__ → تبدأ تفرمل فورًا وتقف __في أمان__.', en: '**With edge computing:** the decision is made __on the car itself__ in about __0.05 s__ → braking starts immediately and it stops __safely__.' },
            { ar: '**الخلاصة:** تأخير حتى __0.1 ثانية__ ممكن يسبّب حادثة، عشان كده القيادة الذاتية بتستخدم **الحوسبة الطرفية**: معالجة البيانات __فورًا على الجهاز نفسه__ بدل إرسالها للسحابة.', en: '**Bottom line:** even a __0.1 s__ delay can cause an accident, so self-driving uses **edge computing**: processing data __instantly on the device itself__ instead of sending it to the cloud.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'الحوسبة الطرفية __لا ترسل__ البيانات للسحابة أولًا قبل اتخاذ القرار.', en: 'Edge computing does __not__ send data to the cloud first before deciding.' } },
            { kind: 'think', text: { ar: 'فكّر: عربية سرعتها 60 كم/س ماشية كام متر في 0.1 ثانية؟ (الإجابة: حوالي 1.7 متر — ده طول إنسان!)', en: 'Think: how far does a car at 60 km/h travel in 0.1 s? (About 1.7 m — the height of a person!)' } },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'نظارة… وعالم كامل', en: 'A headset… and a whole world' },
          visual: { anim: 'cinema', props: { tint: 'violet', clips: [
              { src: 'media/mx-263.mp4', beat: 0, title: { ar: 'بيلبس نظارة VR', en: 'Putting on a VR headset' }, sub: { ar: 'العالم الحقيقي بيختفي', en: 'the real world disappears' }, icon: 'vr' },
              { src: 'media/mx-43563.mp4', beat: 1, title: { ar: 'جوّه العالم الافتراضي', en: 'Inside the virtual world' }, sub: { ar: 'إيده بتتحكم في أشياء مش موجودة', en: 'his hands control things that aren’t there' }, icon: 'sparkle' },
          ] } },
          beats: [
            { ar: 'أول ما يلبس النظارة، __العالم الحقيقي بيختفي__ ويشوف عالم كامل الحاسب عمله.', en: 'Once the headset is on, __the real world disappears__ and he sees a computer-made world.' },
            { ar: 'بيتحرك ويمسك حاجات __افتراضية__ بإيده — ده **الانغماس** اللي بيميّز الـ VR.', en: 'He moves and grabs __virtual__ objects — that **immersion** is what defines VR.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'الواقع المعزز (AR) ضد الواقع الافتراضي (VR)', en: 'Augmented reality (AR) vs virtual reality (VR)' },
          terms: ['AR', 'VR'],
          visual: { anim: 'arVr' },
          beats: [
            { ar: '**الواقع المعزز (AR):** بيضيف __معلومات رقمية فوق صورة العالم الحقيقي__ — إنت لسه شايف الحقيقة. مثال: لعبة Pokémon GO، أو تجربة كنبة في أوضتك قبل ما تشتريها.', en: '**Augmented Reality (AR):** __overlays digital information on real-world images__ — you still see reality. e.g. Pokémon GO, placing a sofa in your room before buying.' },
            { ar: '**الواقع الافتراضي (VR):** بيخليك __تنغمس جوه عالم افتراضي كامل__ يولّده الحاسب — العالم الحقيقي بيختفي. مثال: نظارة VR في لعبة أو جولة افتراضية.', en: '**Virtual Reality (VR):** lets you __immerse yourself in a fully virtual space__ generated by the computer — the real world disappears. e.g. a VR headset game or virtual tour.' },
            { ar: '**القاعدة:** AR = __يضيف__ على الحقيقي ➕ · VR = __يستبدل__ الحقيقي 🔄', en: '**Rule:** AR __adds__ to reality ➕ · VR __replaces__ reality 🔄' },
          ],
          notes: [{ kind: 'exam', text: { ar: '«الواقع المعزّز يستبدل العالم الحقيقي بالكامل» ← غلط (ده VR). و«VR يحسّن سرعة معالجة الحاسب» ← غلط (خلط مع الحوسبة الكمومية).', en: '"AR completely replaces the real world" is false (that is VR). "VR improves processing speed" is false (confused with quantum computing).' } }],
        },
        {
          type: 'scene',
          title: { ar: 'حاسب كمومي حقيقي', en: 'A real quantum computer' },
          visual: { anim: 'photo', props: { img: 'img/real-ibm-quantum.webp', credit: 'IBM Q System One · IBM Research / Wikimedia Commons · CC BY 2.0', hotspots: [
            { x: 50, y: 45, icon: 'atom', label: { ar: 'المعالج الكمومي جوّه', en: 'the quantum processor inside' }, beat: 0 },
            { x: 50, y: 80, icon: 'alert', label: { ar: 'أبرد من الفضاء الخارجي!', en: 'colder than outer space!' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'ده **IBM Q System One** — من أوائل الحواسب الكمومية التجارية. شكله مختلف تمامًا عن أي كمبيوتر عادي.', en: 'This is **IBM Q System One** — one of the first commercial quantum computers. It looks nothing like a normal computer.' },
            { ar: 'المعالج بيشتغل في برودة قريبة من __الصفر المطلق (−273°)__ عشان يحافظ على خصائص الكم الحساسة.', en: 'Its processor runs near __absolute zero (−273°C)__ to protect fragile quantum states.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'الحوسبة الكمومية: البِت ضد الكيوبت', en: 'Quantum computing: bit vs qubit' },
          terms: ['quantum computing', 'bit', 'qubit', 'superposition'],
          visual: { anim: 'bitQubit' },
          beats: [
            { ar: '**البِت التقليدي:** ليه حالة واحدة بس في المرة: __0 أو 1__ — زي مفتاح النور.', en: '**Classical bit:** one state at a time: __0 or 1__ — like a light switch.' },
            { ar: '**الكيوبت:** بيستخدم __التراكب (superposition)__ فيكون __0 و 1 مع بعض__ في نفس الوقت.', en: '**Qubit:** uses __superposition__ to be __0 and 1 at the same time__.' },
            { ar: '**الحوسبة الكمومية:** تقنية متوقع إنها __تسرّع بشكل هائل__ حسابات __صعبة أو مستحيلة__ على الحاسب التقليدي، باستخدام __مبادئ ميكانيكا الكم__.', en: '**Quantum computing:** expected to __dramatically speed up__ computations that are __difficult or impossible__ for traditional computers, using __quantum mechanics__.' },
          ],
        },
        {
          type: 'quiz', title: { ar: 'وصّل', en: 'Match' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل وصف بالتقنية المناسبة:', en: 'Match each description with the technology:' },
            left: [
              { ar: 'تضيف معلومات رقمية فوق صور العالم الحقيقي', en: 'Overlays digital information on real-world images' },
              { ar: 'تستخدم الذكاء الاصطناعي لقيادة مركبة بدون إنسان', en: 'Uses AI to drive a vehicle without a human' },
              { ar: 'تُغرق المستخدم في فضاء افتراضي', en: 'Immerses the user in a virtual space' },
            ],
            right: [
              { ar: 'القيادة الذاتية', en: 'Autonomous driving' },
              { ar: 'الواقع المعزز AR', en: 'AR' },
              { ar: 'الواقع الافتراضي VR', en: 'VR' },
            ],
            answer: [1, 0, 2], explain: { ar: 'a ← B (AR) · b ← A (قيادة ذاتية) · c ← C (VR)', en: 'a → B (AR) · b → A (autonomous) · c → C (VR)' } },
        },
        {
          type: 'summary',
          points: [
            { ar: 'تكنولوجيا المعلومات اتطوّرت __على مراحل__: حاسب ← PC ← إنترنت ← موبايل ← سحابة، وكل مرحلة غيّرت __المجتمع__ مش الأجهزة بس.', en: 'IT developed __in stages__: computer → PC → Internet → smartphone → cloud, and each reshaped __society__, not just devices.' },
            { ar: '**قانون مور:** الترانزستورات ×2 كل سنتين — `N = N₀ × 2^n`، و n = عدد السنين ÷ 2. وبيقرّب من __حدّ فيزيائي__ (نفق كمومي + تيار تسرّب).', en: "**Moore's Law:** transistors ×2 every two years — `N = N₀ × 2^n`, n = years ÷ 2. It is nearing a __physical limit__ (tunneling + leakage)." },
            { ar: 'خمس تحولات: **SNS · تجارة إلكترونية · عمل عن بُعد · تعلّم أونلاين · دفع غير نقدي**.', en: 'Five changes: **SNS · e-commerce · remote work · online learning · cashless payment**.' },
            { ar: 'تقنيات ناشئة: **القيادة الذاتية** (بحوسبة طرفية) · **AR** يضيف · **VR** يستبدل · **الحوسبة الكمومية** تسرّع الحسابات الصعبة.', en: 'Emerging: **autonomous driving** (with edge computing) · **AR** adds · **VR** replaces · **quantum** speeds up hard computations.' },
          ],
        },
      ],
    },

    /* ───────────── 6 · worked examples (textbook) ───────────── */
    {
      id: 'worked', kind: 'example',
      title: { ar: 'أمثلة الكتاب المحلولة', en: 'Textbook worked examples' },
      steps: [
        {
          type: 'example',
          q: { widget: 'mcq', prompt: { ar: '(1) اختر الترتيب الزمني الصحيح لمراحل تطور تكنولوجيا المعلومات:', en: '(1) Choose the correct chronological order of IT development:' },
            options: [
              { ar: 'ميلاد الحاسب ← الهواتف الذكية ← الإنترنت ← السحابة', en: 'Computer → smartphones → Internet → cloud' },
              { ar: 'ميلاد الحاسب ← الإنترنت ← الهواتف الذكية ← السحابة', en: 'Computer → Internet → smartphones → cloud' },
              { ar: 'الإنترنت ← ميلاد الحاسب ← السحابة ← الهواتف الذكية', en: 'Internet → computer → cloud → smartphones' },
              { ar: 'الهواتف الذكية ← الإنترنت ← ميلاد الحاسب ← السحابة', en: 'Smartphones → Internet → computer → cloud' },
            ], answer: 1 },
          solution: [
            { ar: 'نكتب سنة كل مرحلة: الحاسب __1940s__، الإنترنت تجاريًا __1990s__، الهواتف الذكية __2000s__، السحابة __2010s__.', en: 'Write each stage\'s date: computer __1940s__, commercial Internet __1990s__, smartphones __2000s__, cloud __2010s__.' },
            { ar: 'نرتّب من الأقدم للأحدث: حاسب ← إنترنت ← هواتف ذكية ← سحابة.', en: 'Order oldest → newest: computer → Internet → smartphones → cloud.' },
            { ar: 'الإجابة: **ب**.', en: 'Answer: **B**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'tf', prompt: { ar: '(2) ضع ✓ أو ✗:', en: '(2) Mark ✓ or ✗:' }, items: [
            { text: { ar: 'قانون مور ملاحظة تجريبية: عدد الترانزستورات يتضاعف كل سنتين تقريبًا.', en: "Moore's Law: transistor count doubles about every two years." }, answer: true },
            { text: { ar: 'قيل إن قانون مور يقترب من حدّ فيزيائي في السنوات الأخيرة.', en: "Moore's Law has been said to be nearing a physical limit." }, answer: true },
            { text: { ar: 'شبكات التواصل فعّالة جدًا في نشر المعلومات بسرعة.', en: 'SNS are highly effective at spreading information quickly.' }, answer: true },
            { text: { ar: 'التجارة الإلكترونية تعني شراء السلع من محل حقيقي بالكاش.', en: 'E-commerce means buying goods with cash in a physical shop.' }, answer: false, explain: { ar: 'التجارة الإلكترونية = بيع وشراء عبر الإنترنت.', en: 'E-commerce = buying and selling over the Internet.' } },
          ] },
          solution: [
            { ar: 'أ) ده التعريف الصحيح لقانون مور ← **✓**.', en: 'A) Correct definition of Moore\'s Law → **✓**.' },
            { ar: 'ب) فعلًا بيقرّب من حدّ فيزيائي ← **✓**.', en: 'B) It is indeed nearing a physical limit → **✓**.' },
            { ar: 'ج) SNS فعّالة جدًا في نشر المعلومة بسرعة ← **✓**.', en: 'C) SNS spread information rapidly → **✓**.' },
            { ar: 'د) التجارة الإلكترونية عبر __الإنترنت__ مش في محل بالكاش ← **✗**.', en: 'D) E-commerce is over the __Internet__, not cash in a shop → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(3) وافِق بين الوصف والتقنية:', en: '(3) Match description and technology:' },
            left: [
              { ar: 'تضيف معلومات رقمية فوق صور العالم الحقيقي', en: 'Overlays digital info on real-world images' },
              { ar: 'تقود مركبة بالذكاء الاصطناعي بدون إنسان', en: 'Drives a vehicle with AI, no human' },
              { ar: 'تُغرق المستخدم في فضاء افتراضي', en: 'Immerses the user in a virtual space' },
            ],
            right: [{ ar: 'A القيادة الذاتية', en: 'A Autonomous driving' }, { ar: 'B الواقع المعزز', en: 'B AR' }, { ar: 'C الواقع الافتراضي', en: 'C VR' }],
            answer: [1, 0, 2] },
          solution: [
            { ar: 'a: إضافة معلومات رقمية فوق الحقيقي = **AR** ← B.', en: 'a: overlaying digital info on reality = **AR** → B.' },
            { ar: 'b: قيادة بدون إنسان = **قيادة ذاتية** ← A.', en: 'b: driving without a human = **autonomous driving** → A.' },
            { ar: 'c: الانغماس في فضاء افتراضي = **VR** ← C.', en: 'c: immersion in a virtual space = **VR** → C.' },
          ],
        },
      ],
    },

    /* ───────────── 7 · textbook practice ───────────── */
    {
      id: 'practice', kind: 'practice',
      title: { ar: 'تدريبات الكتاب (Try + Exercise)', en: 'Textbook practice (Try + Exercise)' },
      steps: [
        {
          type: 'quiz', title: { ar: 'تمرين 1 — أجب', en: 'Try 1 — answer' },
          q: { widget: 'recall', prompt: { ar: 'قول الإجابة بصوت عالي، وبعدين اكشفها:', en: 'Say the answer out loud, then reveal it:' }, items: [
            { q: { ar: 'اسم الملاحظة التجريبية: «عدد الترانزستورات في الدائرة المتكاملة يتضاعف كل سنتين تقريبًا»؟', en: 'The observation "transistor count on an IC doubles ~every two years"?' }, a: { ar: 'قانون مور', en: "Moore's Law" } },
            { q: { ar: 'بيع وشراء السلع والخدمات باستخدام الإنترنت؟', en: 'Buying/selling goods and services using the Internet?' }, a: { ar: 'التجارة الإلكترونية (EC)', en: 'E-commerce (EC)' } },
            { q: { ar: 'نمط العمل من المنزل أو مكان بعيد باستخدام الإنترنت؟', en: 'Working from home or a remote location using the Internet?' }, a: { ar: 'العمل عن بُعد', en: 'Remote work' } },
            { q: { ar: 'نظام الدفع بالنقود الإلكترونية ورموز QR دون كاش؟', en: 'Paying with e-money / QR codes without cash?' }, a: { ar: 'الدفع غير النقدي', en: 'Cashless payment' } },
            { q: { ar: 'التقنية التي تستخدم الذكاء الاصطناعي لقيادة مركبة دون إنسان؟', en: 'Technology that uses AI to drive a vehicle without a human?' }, a: { ar: 'القيادة الذاتية', en: 'Autonomous driving' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1) — صنّف', en: 'Try 2 (1) — classify' },
          q: { widget: 'classify', prompt: { ar: 'حدّد كل مثال أقرب لأنهي نوع من التغيير:', en: 'Which kind of change is each example most related to?' },
            groups: [
              { icon: 'users', label: { ar: 'الحياة اليومية', en: 'Daily life' } },
              { icon: 'building', label: { ar: 'الصناعة والاقتصاد', en: 'Industry & economy' } },
              { icon: 'cap', label: { ar: 'الصحة والتعليم', en: 'Healthcare & education' } },
            ],
            items: [
              { text: { ar: 'حضور حصص عبر التعلّم الإلكتروني', en: 'Taking classes through online learning' }, group: 2 },
              { text: { ar: 'الدفع بتطبيق موبايل', en: 'Paying with a mobile payment app' }, group: 1 },
              { text: { ar: 'مشاركة صور مع الأصحاب على SNS', en: 'Sharing photos with friends on SNS' }, group: 0 },
              { text: { ar: 'شركة تطبّق نظام العمل من المنزل', en: 'A company adopting work-from-home' }, group: 1 },
            ],
            explain: { ar: 'التعلّم ← تعليم · الدفع غير النقدي والعمل عن بُعد ← اقتصاد وصناعة · مشاركة الصور ← حياة يومية.', en: 'Learning → education · cashless payment & remote work → economy · sharing photos → daily life.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختر الوصف __غير__ المناسب لتقنية ناشئة:', en: 'Choose the description that is NOT appropriate:' },
            options: [
              { ar: 'القيادة الذاتية تستخدم الذكاء الاصطناعي لقيادة مركبة دون إنسان.', en: 'Autonomous driving uses AI to drive without a human.' },
              { ar: 'الواقع المعزز يضيف معلومات رقمية فوق صور العالم الحقيقي.', en: 'AR overlays digital info on real-world images.' },
              { ar: 'الواقع الافتراضي يحسّن بشكل كبير سرعة معالجة الحاسب.', en: 'VR dramatically improves processing speed.' },
              { ar: 'الحوسبة الكمومية متوقّع أن تسرّع حسابات صعبة على الحاسب التقليدي.', en: 'Quantum computing is expected to speed up hard computations.' },
            ], answer: 2, explain: { ar: 'VR = انغماس في عالم افتراضي، مش تسريع معالجة (ده الحوسبة الكمومية).', en: 'VR = immersion in a virtual world, not faster processing (that is quantum).' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرأ الفقرة واملأ الفراغات:', en: 'Read and fill the blanks:' },
            text: {
              ar: 'اختُرعت الحواسب في الأربعينيات للحسابات العسكرية والعلمية. في السبعينيات والثمانينيات انتشر {0} فاستخدم الأفراد الحاسب. في التسعينيات أصبح {1} تجاريًا فتقدّمت عولمة المعلومات. وفي الألفية ظهر {2} فانتشر الإنترنت المحمول.',
              en: 'Computers were invented in the 1940s for military and scientific work. In the 1970s–80s {0} spread, letting individuals use computers. In the 1990s {1} was commercialized, globalizing information. In the 2000s {2} emerged, spreading mobile Internet.',
            },
            bank: [
              { ar: 'الحاسب الشخصي', en: 'personal computers' },
              { ar: 'الإنترنت', en: 'the Internet' },
              { ar: 'الهاتف الذكي', en: 'the smartphone' },
              { ar: 'الواقع الافتراضي', en: 'virtual reality' },
              { ar: 'البريد الإلكتروني', en: 'email' },
            ],
            answer: [0, 1, 2] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — سؤال 2 و 3', en: 'Exercise 2 — Q2 & Q3' },
          q: { widget: 'mcq', prompt: { ar: 'ما التقنية اللي انتشرت من 2010 وبتدعم تحليل البيانات الضخمة والذكاء الاصطناعي؟', en: 'Which technology spread from 2010 and supports big-data analysis and AI?' },
            options: [{ ar: 'الحوسبة السحابية', en: 'Cloud computing' }, { ar: 'الحواسب الشخصية', en: 'Personal computers' }, { ar: 'البريد الإلكتروني', en: 'Email' }, { ar: 'الصمامات المفرغة', en: 'Vacuum tubes' }], answer: 0 },
        },
        {
          type: 'quiz',
          q: { widget: 'mcq', prompt: { ar: 'حسب قانون مور، كل قد إيه يتضاعف عدد الترانزستورات تقريبًا؟', en: "By Moore's Law, about how often does the transistor count double?" },
            options: [{ ar: 'كل سنة', en: 'Every year' }, { ar: 'كل سنتين', en: 'Every two years' }, { ar: 'كل 5 سنين', en: 'Every five years' }, { ar: 'كل 10 سنين', en: 'Every ten years' }], answer: 1 },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختر __كل__ ما يُعدّ تقنية ناشئة:', en: 'Choose ALL that are emerging technologies:' },
            options: [{ ar: 'البريد الإلكتروني', en: 'Email' }, { ar: 'القيادة الذاتية', en: 'Autonomous driving' }, { ar: 'الحواسب الشخصية', en: 'Personal computers' }, { ar: 'الواقع المعزز', en: 'AR' }, { ar: 'الواقع الافتراضي', en: 'VR' }, { ar: 'الحوسبة الكمومية', en: 'Quantum computing' }],
            answer: [1, 3, 4, 5], explain: { ar: 'البريد والحواسب الشخصية تقنيات قديمة، مش ناشئة.', en: 'Email and PCs are older technologies, not emerging ones.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختر أنسب وصف لخصائص شبكات التواصل الاجتماعي:', en: 'Choose the best description of SNS:' },
            options: [
              { ar: 'خدمة للتواصل ونشر ومشاركة المعلومات، وفعّالة جدًا في نشرها بسرعة.', en: 'A service to connect, post and share info; spreads it rapidly.' },
              { ar: 'خدمة لبيع وشراء السلع عبر الإنترنت.', en: 'A service for buying/selling goods online.' },
              { ar: 'نمط عمل من المنزل أو مكان بعيد.', en: 'A style of working from home.' },
              { ar: 'نظام دفع بالنقود الإلكترونية أو QR.', en: 'A payment system using e-money or QR.' },
            ], answer: 0 },
        },
      ],
    },

    /* ───────────── 8 · key terms ───────────── */
    {
      id: 'terms', kind: 'flash',
      title: { ar: 'كروت المصطلحات', en: 'Key-term cards' },
      steps: [{
        type: 'quiz',
        q: { widget: 'flash', cards: [
          { front: { ar: 'قانون مور', en: "Moore's Law" }, back: { ar: 'عدد الترانزستورات في الشريحة يتضاعف كل سنتين تقريبًا.', en: 'Transistors per chip roughly double every ~2 years.' } },
          { front: { ar: 'الحوسبة الطرفية', en: 'Edge computing' }, back: { ar: 'معالجة البيانات على الجهاز نفسه فورًا بدل إرسالها للسحابة.', en: 'Processing data on the device itself, instantly, instead of the cloud.' } },
          { front: { ar: 'الحوسبة السحابية', en: 'Cloud computing' }, back: { ar: 'تقديم موارد تكنولوجيا المعلومات كـ«خدمة» عبر الإنترنت.', en: 'IT resources delivered "as a service" over the Internet.' } },
          { front: { ar: 'شبكات التواصل (SNS)', en: 'SNS' }, back: { ar: 'خدمات للتواصل ونشر ومشاركة المعلومات، تنشرها بسرعة.', en: 'Services to connect, post and share information; spread it fast.' } },
          { front: { ar: 'التجارة الإلكترونية', en: 'E-commerce' }, back: { ar: 'بيع وشراء السلع والخدمات عبر الإنترنت.', en: 'Buying and selling goods and services through the Internet.' } },
          { front: { ar: 'العمل عن بُعد', en: 'Remote work' }, back: { ar: 'العمل من المنزل أو مكان بعيد عبر الإنترنت.', en: 'Working from home or a remote location over the Internet.' } },
          { front: { ar: 'التعلّم عبر الإنترنت', en: 'Online learning' }, back: { ar: 'تقديم الدروس والمواد عبر الإنترنت.', en: 'Classes and materials delivered over the Internet.' } },
          { front: { ar: 'الدفع غير النقدي', en: 'Cashless payment' }, back: { ar: 'الدفع بنقود إلكترونية أو QR دون كاش.', en: 'Payment without cash (e-money, QR).' } },
          { front: { ar: 'القيادة الذاتية', en: 'Autonomous driving' }, back: { ar: 'تقنية تستخدم الذكاء الاصطناعي لقيادة المركبة بدون إنسان.', en: 'AI drives a vehicle without human operation.' } },
          { front: { ar: 'الواقع المعزز AR', en: 'AR' }, back: { ar: 'يضيف معلومات رقمية فوق صور العالم الحقيقي.', en: 'Overlays digital information on real-world images.' } },
          { front: { ar: 'الواقع الافتراضي VR', en: 'VR' }, back: { ar: 'ينغمس فيه المستخدم في عالم افتراضي كامل.', en: 'Immersion in a computer-generated virtual space.' } },
          { front: { ar: 'الحوسبة الكمومية', en: 'Quantum computing' }, back: { ar: 'تسرّع حسابات صعبة على الحاسب التقليدي بمبادئ ميكانيكا الكم.', en: 'Speeds up hard computations using quantum mechanics.' } },
        ] },
      }],
    },

    /* ───────────── 9 · think like an engineer ───────────── */
    {
      id: 'think', kind: 'challenge',
      title: { ar: 'فكّر كمهندس + سؤال الامتحان المقالي', en: 'Think like an engineer + exam essay' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', marks: 6, tag: { ar: 'سؤال بنمط الامتحان · 6 درجات', en: 'Exam-style · 6 marks' },
            prompt: { ar: 'حلّل كيف غيّر انتشار الحوسبة السحابية (من 2010 فصاعدًا) طريقة استخدام تكنولوجيا المعلومات. أشِر إلى: تحليل البيانات الضخمة، الذكاء الاصطناعي، و«تكنولوجيا المعلومات كخدمة».', en: 'Analyze how the spread of cloud computing (2010s onward) changed the way IT is used. Refer to: large-scale data analysis, AI, and "IT as a service".' },
            points: [
              { ar: 'السحابة وفّرت قدرة تخزين ومعالجة ضخمة → تحليل بيانات ضخمة ممكن.', en: 'Cloud gives huge storage/processing → big-data analysis becomes possible.' },
              { ar: 'القدرة دي دعمت تدريب وتشغيل الذكاء الاصطناعي.', en: 'This capacity supports training and running AI.' },
              { ar: '«IT كخدمة»: الناس والشركات بتستأجر الخدمة عبر الإنترنت بدل شراء أجهزة.', en: '"IT as a service": rent services online instead of buying hardware.' },
              { ar: 'مثال واقعي (Google Drive / Netflix / ChatGPT…).', en: 'A real example (Google Drive / Netflix / ChatGPT…).' },
            ],
            model: { ar: 'مع انتشار الحوسبة السحابية بقت موارد التخزين والمعالجة متاحة عبر الإنترنت بكميات ضخمة، فأصبح ممكن تحليل بيانات ضخمة جدًا كانت مستحيلة على جهاز واحد. القدرة دي هي اللي سمحت بتدريب وتشغيل أنظمة الذكاء الاصطناعي. وكمان اتغيّر مفهوم الاستخدام لـ«تكنولوجيا المعلومات كخدمة»: بدل ما الشركة تشتري سيرفرات، بتستأجر الخدمة وتدفع على قد استخدامها — زي تخزين الصور على Google Drive أو مشاهدة Netflix.', en: 'With cloud computing, huge storage and processing became available over the Internet, making large-scale data analysis possible. That capacity enabled training and running AI systems. Usage shifted to "IT as a service": instead of buying servers, organizations rent services and pay per use — e.g. Google Drive storage or Netflix streaming.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر', en: 'Pause & think' },
            prompt: { ar: 'في القيادة الذاتية، ليه لازم البيانات تتعالج فورًا في العربية (حوسبة طرفية) بدل ما تتبعت للسحابة؟', en: 'In autonomous driving, why must data be processed instantly on the vehicle (edge computing) rather than sent to the cloud?' },
            points: [
              { ar: 'الإرسال للسحابة والرجوع بياخد وقت (تأخير).', en: 'Sending to the cloud and back takes time (latency).' },
              { ar: 'تأخير حتى 0.1 ثانية ممكن يسبّب حادثة.', en: 'Even a 0.1 s delay can cause an accident.' },
              { ar: 'الحوسبة الطرفية بتقرّر فورًا على العربية نفسها (ومش محتاجة إنترنت).', en: 'Edge computing decides instantly on the car (and needs no connection).' },
            ],
            model: { ar: 'لأن العربية بتتحرك بسرعة، وأي تأخير في القرار معناه إنها هتمشي مسافة قبل ما تفرمل. إرسال البيانات للسحابة ورجوع القرار بياخد وقت، وتأخير حتى 0.1 ثانية ممكن يسبّب حادثة. أما الحوسبة الطرفية فبتعالج البيانات فورًا على العربية نفسها، فالقرار بيتاخد في لحظته حتى لو الإنترنت ضعيف.', en: 'The car moves fast, so any delay means it travels further before braking. Sending data to the cloud and waiting for a reply takes time, and even 0.1 s can cause an accident. Edge computing processes data instantly on the car, so the decision is immediate even with a weak connection.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'قرية ماكانش فيها إنترنت، وصلها إنترنت سريع ودفع غير نقدي لأول مرة. توقّع طريقتين هتتغيّر بيهم الحياة، وحدّد مشكلة جديدة ممكن تواجهها.', en: 'A village with no Internet gets high-speed Internet and cashless payment for the first time. Predict two changes in daily life and one new problem.' },
            points: [
              { ar: 'تغيير 1 (مثلًا: تعلّم أونلاين / شراء أونلاين).', en: 'Change 1 (e.g. online learning / online shopping).' },
              { ar: 'تغيير 2 (مثلًا: دفع أسرع / عمل عن بُعد / تواصل).', en: 'Change 2 (e.g. faster payment / remote work / communication).' },
              { ar: 'مشكلة: ناس من غير موبايل أو حساب بنكي ممكن يتحرموا من الخدمة.', en: 'Problem: people without a phone or bank account may be excluded.' },
            ],
            model: { ar: 'الطلاب هيقدروا يحضروا حصص أونلاين، والأهالي هيشتروا ويبيعوا عبر الإنترنت ويدفعوا بدون كاش بسرعة. لكن ممكن تظهر مشكلة إن الناس اللي معندهاش هاتف ذكي أو حساب بنكي (زي كبار السن) يتحرموا من الخدمات لو التحوّل حصل فجأة بدون بديل.', en: 'Students can attend online classes, and families can buy and sell online and pay quickly without cash. But people without a smartphone or bank account (e.g. the elderly) may be locked out if the switch happens suddenly with no fallback.' } },
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
          q: { widget: 'essay', tag: { ar: 'فكّر لحظة', en: 'Pause & think' },
            prompt: { ar: 'لو بقى عندنا مجتمع بلا نقد بالكامل: اختار ميزة واحدة ومخاوف واحدة، واشرح السبب لكل واحدة.', en: 'If a fully cashless society were realised: one advantage and one concern, with reasons.' },
            points: [
              { ar: 'ميزة + سببها (سرعة/أمان من السرقة/تتبع المصاريف)', en: 'An advantage + reason (speed / theft-safety / tracking spending)' },
              { ar: 'مخاوف + سببها (اللي معندوش موبايل أو حساب / الأعطال / الخصوصية)', en: 'A concern + reason (people without phones/accounts / outages / privacy)' },
            ],
            model: { ar: 'ميزة: الدفع أسرع وأأمن من حمل الكاش وسهل نتابع المصاريف. المخاوف: الناس اللي معندهاش هاتف ذكي أو حساب بنكي (زي كبار السن) ممكن يتحرموا، ولو الشبكة وقعت الدفع يقف.', en: 'Advantage: faster, safer than carrying cash, easy to track spending. Concern: people without a smartphone or bank account (e.g. the elderly) may be excluded, and payments stop if the network fails.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس', en: 'Think as an engineer' },
            prompt: { ar: 'استطلاع: اسأل 10 من زمايلك بيدفعوا كاش ولا بوسيلة غير نقدية. وبعدين لكل فئة (العميل · صاحب محل صغير · شخص بلا كارت أو موبايل) اكتب منفعة وعيب، وقرّر: نتّجه للدفع غير النقدي؟', en: 'Survey 10 classmates: cash or cashless? Then for each group (customer · small shop owner · person with no card/phone) note a benefit and drawback, and decide.' },
            points: [
              { ar: 'جدول نتايج الاستطلاع + الأكثر شيوعًا', en: 'Survey table + most common answer' },
              { ar: 'منفعة وعيب لكل فئة من التلاتة', en: 'Benefit and drawback for each of the three groups' },
              { ar: 'قرار + خطوة واحدة + سببين', en: 'A decision + one step + two reasons' },
            ],
            model: { ar: 'مثال: 7 من 10 بيدفعوا كاش. العميل: أسرع / محتاج موبايل. صاحب المحل: متابعة أسهل / عمولة على كل عملية. الشخص بلا كارت: مفيش منفعة تقريبًا / ممكن يتحرم. القرار: نتّجه تدريجيًا مع إبقاء الكاش متاح، لأن ده أسرع للأغلبية ومايظلمش اللي معندهمش وسيلة.', en: 'Example: 7/10 pay cash. Customer: faster / needs a phone. Shop owner: easier tracking / per-transaction fee. Person without a card: little benefit / may be excluded. Decision: move gradually while keeping cash available — faster for most, fair to those without access.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: أنهي مرحلة من مراحل تكنولوجيا المعلومات هتفرق أكتر في العشر سنين الجاية؟ وتحدّى: اختار تقنية ناشئة (قيادة ذاتية / AR / VR / كمومية) واقترح استخدام بيحل مشكلة حقيقية ومخاطرة واحدة.', en: 'Reflect: which IT stage will matter most in the next ten years? Challenge: pick an emerging tech and suggest one real use and one risk.' },
            points: [
              { ar: 'مرحلة + سبب', en: 'A stage + a reason' },
              { ar: 'تقنية ناشئة + استخدام مفيد حقيقي', en: 'An emerging tech + a real helpful use' },
              { ar: 'مخاطرة واحدة', en: 'One risk' },
            ],
            model: { ar: 'أعتقد إن الحوسبة السحابية مع الذكاء الاصطناعي هتفرق أكتر لأنها بتدعم تحليل بيانات ضخمة. تقنية ناشئة: القيادة الذاتية ممكن تقلل الحوادث الناتجة عن تعب السواقين، لكن المخاطرة إن خطأ في النظام أو اختراقه ممكن يسبب حادثة.', en: 'Cloud + AI will matter most because they power big-data analysis. Emerging tech: self-driving cars could cut accidents caused by tired drivers; the risk is that a system error or hack could cause a crash.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '1-1', seconds: 60, items: [
            { text: { ar: 'قانون مور بيتكلم عن عدد الترانزستورات', en: 'Moore’s Law is about transistor count' }, answer: true },
            { text: { ar: 'قانون مور: العدد بيتضاعف كل 10 سنين', en: 'Moore’s Law: it doubles every 10 years' }, answer: false },
            { text: { ar: 'ENIAC كان بيملا أوضة كاملة', en: 'ENIAC filled a whole room' }, answer: true },
            { text: { ar: 'الهواتف الذكية ظهرت قبل الإنترنت التجاري', en: 'Smartphones came before the commercial Internet' }, answer: false },
            { text: { ar: 'الحوسبة السحابية = تكنولوجيا المعلومات كخدمة', en: 'Cloud computing = IT as a service' }, answer: true },
            { text: { ar: 'التجارة الإلكترونية = شراء بالكاش من محل', en: 'E-commerce = paying cash in a shop' }, answer: false },
            { text: { ar: 'الدفع بـ QR مثال على الدفع غير النقدي', en: 'Paying by QR is cashless payment' }, answer: true },
            { text: { ar: 'الحوسبة الطرفية بتبعت البيانات للسحابة الأول', en: 'Edge computing sends data to the cloud first' }, answer: false },
            { text: { ar: 'القيادة الذاتية بتستخدم كاميرات وحسّاسات', en: 'Self-driving uses cameras and sensors' }, answer: true },
            { text: { ar: 'الواقع المعزز بيستبدل العالم الحقيقي بالكامل', en: 'AR replaces the real world entirely' }, answer: false },
            { text: { ar: 'الواقع الافتراضي بيخليك تنغمس في عالم افتراضي', en: 'VR immerses you in a virtual world' }, answer: true },
            { text: { ar: 'الكيوبت يقدر يكون 0 و 1 مع بعض', en: 'A qubit can be 0 and 1 at once' }, answer: true },
            { text: { ar: 'النفق الكمومي = الإلكترون بيعدّي الحاجز العازل', en: 'Quantum tunneling = electrons pass the barrier' }, answer: true },
            { text: { ar: 'المعالجة المتوازية = نواة واحدة أسرع', en: 'Parallel processing = one faster core' }, answer: false },
            { text: { ar: 'شبكات التواصل بتنشر المعلومة بسرعة', en: 'SNS spread information quickly' }, answer: true },
            { text: { ar: 'العمل عن بُعد لازم يكون من المكتب', en: 'Remote work must be from the office' }, answer: false },
            { text: { ar: 'من 2002 لـ `2025 = 11.5` مرة تضاعف', en: '2002 to 2025 = 11.5 doublings' }, answer: true },
            { text: { ar: 'من 2010 لـ `2016 = 6` مرات تضاعف', en: '2010 to 2016 = 6 doublings' }, answer: false },
        ] },
      }],
    },

    /* ───────────── 10 · lesson test (memo, 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 1-1', en: 'Lesson 1-1 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. أيّ ترتيب زمني صحيح لمراحل تطور تكنولوجيا المعلومات؟', en: '1. Which is the correct chronological order?' }, options: [
          { ar: 'حاسب ← هواتف ذكية ← إنترنت ← سحابة', en: 'Computer → smartphones → Internet → cloud' },
          { ar: 'حاسب ← إنترنت ← هواتف ذكية ← سحابة', en: 'Computer → Internet → smartphones → cloud' },
          { ar: 'إنترنت ← حاسب ← سحابة ← هواتف ذكية', en: 'Internet → computer → cloud → smartphones' },
          { ar: 'هواتف ذكية ← إنترنت ← حاسب ← سحابة', en: 'Smartphones → Internet → computer → cloud' },
        ], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. ما المصطلح الذي معناه «عدد الترانزستورات يتضاعف كل سنتين تقريبًا»؟', en: '2. Which term means "transistor count roughly doubles every two years"?' }, options: [
          { ar: 'الحوسبة الطرفية', en: 'Edge computing' }, { ar: 'قانون مور', en: "Moore's Law" }, { ar: 'الواقع المعزز', en: 'Augmented reality' }, { ar: 'الحوسبة الكمومية', en: 'Quantum computing' },
        ], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. أيّ هذه مثال صحيح على التجارة الإلكترونية؟', en: '3. Which is a correct example of e-commerce?' }, options: [
          { ar: 'الدفع كاش في محل حقيقي', en: 'Paying cash in a physical shop' }, { ar: 'الشراء من متجر إنترنت مثل أمازون', en: 'Buying from an online store like Amazon' }, { ar: 'التعلّم عن بُعد', en: 'Distance learning' }, { ar: 'القيادة الذاتية', en: 'Autonomous driving' },
        ], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '4. لماذا تستخدم القيادة الذاتية الحوسبة الطرفية بدل السحابة؟', en: '4. Why does autonomous driving use edge computing instead of the cloud?' }, options: [
          { ar: 'لتوفير المال', en: 'To save money' }, { ar: 'لتقليل استهلاك الإنترنت', en: 'To reduce Internet usage' }, { ar: 'لأن القرار يجب أن يُتّخذ في أقل من 0.1 ثانية', en: 'Because the decision must be taken in under 0.1 s' }, { ar: 'لأن السحابة غير متاحة', en: 'Because the cloud is unavailable' },
        ], answer: 2 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. الحوسبة الطرفية ترسل كل البيانات للسحابة أولًا قبل اتخاذ أي قرار.', en: '5. Edge computing sends all data to the cloud first.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. الواقع المعزّز (AR) يستبدل العالم الحقيقي بالكامل ببيئة افتراضية.', en: '6. AR completely replaces the real world.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '7. الحوسبة الكمومية هدفها تسريع حسابات صعبة على الحاسب التقليدي.', en: '7. Quantum computing aims to speed up hard computations.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'numeric', prompt: { ar: '8. شريحة فيها 2,000 ترانزستور سنة 2010. كام ترانزستور سنة 2018 حسب قانون مور؟', en: '8. A chip has 2,000 transistors in 2010. How many in 2018 by Moore\'s Law?' }, answer: 32000, tolerance: 0, check: { mode: 'forward', y0: 2010, n0: 2000, y1: 2018 }, explain: { ar: 'n = 8 ÷ 2 = 4 → 2,000 × 16 = 32,000', en: 'n = 8 ÷ 2 = 4 → 2,000 × 16 = 32,000' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اشرح باختصار لماذا يقترب قانون مور من حدّ فيزيائي، مع ذكر ظاهرة واحدة.', en: "9. Briefly explain why Moore's Law is approaching a physical limit; name one effect." },
          points: [{ ar: 'الترانزستورات صغرت لحجم بضع ذرات.', en: 'Transistors shrank to a few atoms wide.' }, { ar: 'ذِكر النفق الكمومي أو تيار التسرّب وشرحه.', en: 'Names and explains quantum tunneling or leakage current.' }],
          model: { ar: 'لأن الترانزستورات صغرت جدًا لحجم بضع ذرات، فبتظهر مشاكل زي تأثير النفق الكمومي اللي فيه الإلكترونات بتعدّي الحاجز العازل، فيصعب الجمع بين أداء أعلى واستهلاك طاقة أقل.', en: 'Transistors are now only a few atoms wide, so effects like quantum tunneling (electrons passing through the insulating barrier) appear, making it hard to get both higher performance and lower power.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. اذكر تحوّلين اجتماعيين أحدثتهما تكنولوجيا المعلومات، واشرح خاصية واحدة لكل منهما.', en: '10. Name two social changes brought by IT and one characteristic of each.' },
          points: [{ ar: 'تحوّل أول + خاصيته (مثلًا SNS: تنشر المعلومة بسرعة).', en: 'First change + characteristic (e.g. SNS spreads info fast).' }, { ar: 'تحوّل تاني + خاصيته (مثلًا التجارة الإلكترونية: بيع وشراء عبر الإنترنت).', en: 'Second change + characteristic (e.g. e-commerce: buying/selling online).' }],
          model: { ar: 'شبكات التواصل الاجتماعي: بتتيح التواصل ونشر المعلومات وتنشرها بسرعة كبيرة. التجارة الإلكترونية: بيع وشراء السلع والخدمات عبر الإنترنت مثل Amazon.', en: 'SNS: lets users connect and share, spreading information rapidly. E-commerce: buying and selling goods and services online, e.g. Amazon.' } } },
      ],
    },
  ],
});
