/* =========================================================
 * content/checks-1-1.js — "✋ Check yourself" questions for lesson 1-1.
 * Pure data, added to each explanation station just before its summary
 * (see RV.addSteps in core/registry.js). Design rules (checked by tests):
 *   • situations & misconceptions, not copy-the-sentence recall
 *   • distractors as long and as plausible as the right answer
 *   • options / statements are shuffled at run time by the widgets
 * ========================================================= */
(function () {
  const q = (n, body) => ({ type: 'quiz', title: { ar: `✋ اختبر فهمك (${n})`, en: `✋ Check yourself (${n})` }, q: body });

  RV.addSteps('1-1', 'history', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'جدّك بيحكي إن أول مرة يبقى عنده كمبيوتر في البيت كانت في الثمانينيات. ده بيمثّل أنهي مرحلة؟', en: 'Your grandfather says he first had a computer at home in the 1980s. Which stage is that?' },
      options: [
        { ar: 'ميلاد الحاسب (ENIAC)', en: 'Birth of the computer (ENIAC)' },
        { ar: 'انتشار الحواسب الشخصية', en: 'Spread of personal computers' },
        { ar: 'الإنترنت بقى تجاري', en: 'The Internet goes commercial' },
        { ar: 'انتشار الحوسبة السحابية', en: 'Spread of cloud computing' },
      ],
      answer: 1,
      explain: { ar: 'السبعينيات–الثمانينيات = الحواسب الشخصية: لأول مرة __الأفراد__ يستخدموا الحاسب في البيت.', en: '1970s–80s = personal computers: for the first time __individuals__ used computers at home.' },
    }),
    q(2, {
      widget: 'tf',
      items: [
        { text: { ar: 'ENIAC كان الناس بيستخدموه في بيوتهم.', en: 'People used ENIAC in their homes.' }, answer: false, explain: { ar: 'كان بيملا أوضة كاملة، واستخدامه __عسكري وعلمي__ بس.', en: 'It filled a whole room and was used for __military and scientific__ work only.' } },
        { text: { ar: 'عولمة المعلومات اتقدّمت لما الإنترنت بقى تجاري في التسعينيات.', en: 'Information globalized when the Internet went commercial in the 1990s.' }, answer: true },
        { text: { ar: 'الهواتف الذكية ظهرت قبل الحواسب الشخصية.', en: 'Smartphones appeared before personal computers.' }, answer: false, explain: { ar: 'الحواسب الشخصية في السبعينيات–الثمانينيات، والهواتف الذكية في الألفية (2000s).', en: 'PCs came in the 1970s–80s, smartphones in the 2000s.' } },
        { text: { ar: 'لما ترفع صورة على Google Drive، بتتخزّن على سيرفر حقيقي في مركز بيانات.', en: 'A photo uploaded to Google Drive is stored on a real server in a data center.' }, answer: true },
      ],
    }),
    q(3, {
      widget: 'mcq',
      prompt: { ar: '«تكنولوجيا المعلومات كخدمة» (IT as a service) معناها إيه؟', en: 'What does "IT as a service" mean?' },
      options: [
        { ar: 'إنك بتستأجر تخزين ومعالجة وبرامج عبر الإنترنت', en: 'You rent storage, processing and software over the Internet' },
        { ar: 'إنك بتشتري سيرفر وتحطّه في بيتك عشان برامجك', en: 'You buy a server and keep it at home for your programs' },
        { ar: 'إن شركات التكنولوجيا بتصلّح الأجهزة ببلاش', en: 'Tech companies repair your devices for free' },
        { ar: 'إن كل برنامج لازم يتسطّب على جهازك الأول', en: 'Every program must first be installed on your device' },
      ],
      answer: 0,
      explain: { ar: 'الحوسبة السحابية = موارد تكنولوجيا المعلومات __كخدمة عبر الإنترنت__ — بتستأجر جزء من أجهزة مركز البيانات.', en: 'Cloud computing = IT resources __as a service over the Internet__ — you rent part of a data center.' },
    }),
  ]);

  RV.addSteps('1-1', 'moore', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'شريحة سنة 2010 فيها مليار ترانزستور. حسب قانون مور، سنة 2014 هيبقى فيها تقريبًا كام؟', en: 'A 2010 chip has 1 billion transistors. By Moore’s Law, about how many in 2014?' },
      options: [
        { ar: '2 مليار', en: '2 billion' },
        { ar: '4 مليار', en: '4 billion' },
        { ar: '8 مليار', en: '8 billion' },
        { ar: '5 مليار', en: '5 billion' },
      ],
      answer: 1,
      explain: { ar: '4 سنين = `n = 4 ÷ 2 = 2` تضاعف → `1 × 2^2 = 4` مليار. (اللي اختار 2 حسب تضاعف واحد بس، واللي اختار 8 حسب كل سنة.)', en: '4 years = `n = 4 ÷ 2 = 2` doublings → `1 × 2^2 = 4` billion. (2 counts one doubling only; 8 doubles every year.)' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'ليه بقى صعب نجمع بين أداء أعلى واستهلاك طاقة أقل في الشرائح الحديثة؟', en: 'Why is it hard to get both higher performance and lower power in modern chips?' },
      options: [
        { ar: 'الترانزستور صغر لحد كام ذرة، فظهر تسرّب وحرارة', en: 'Transistors shrank to a few atoms, causing leakage and heat' },
        { ar: 'المصانع بطّلت تستخدم السيليكون في الشرائح', en: 'Factories stopped using silicon in chips' },
        { ar: 'عدد الترانزستورات بقى بيقل كل سنتين', en: 'Transistor counts now halve every two years' },
        { ar: 'البرامج الحديثة مابقتش محتاجة سرعة معالجة', en: 'Modern software no longer needs processing speed' },
      ],
      answer: 0,
      explain: { ar: 'الحدّ الفيزيائي + __النفق الكمومي__ + __تيار التسرّب__ → طاقة ضايعة وحرارة.', en: 'Physical limit + __quantum tunneling__ + __leakage current__ → wasted energy and heat.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'قانون مور بيتكلم عن عدد الترانزستورات، مش عن سرعة الإنترنت.', en: 'Moore’s Law is about transistor counts, not Internet speed.' }, answer: true },
        { text: { ar: 'تيار التسرّب معناه إن جزء من التيار بيعدّي حتى والترانزستور مقفول.', en: 'Leakage current means some current flows even when the transistor is off.' }, answer: true },
        { text: { ar: 'المعالجة المتوازية = نواة واحدة بتخلّص المهام ورا بعض بسرعة أكبر.', en: 'Parallel processing = one core finishing tasks one after another, faster.' }, answer: false, explain: { ar: 'معناها __أنوية كتير__ بتقسّم الشغل وتشتغل __في نفس الوقت__.', en: 'It means __many cores__ splitting the work and running __at the same time__.' } },
        { text: { ar: 'كل ما الترانزستور يصغر أكتر، المشاكل الفيزيائية بتقل.', en: 'The smaller the transistor, the fewer the physical problems.' }, answer: false, explain: { ar: 'بالعكس: لما يوصل لحجم الذرات بيظهر __النفق الكمومي__ و__التسرّب__.', en: 'The opposite: at atomic sizes __tunneling__ and __leakage__ appear.' } },
        { text: { ar: 'الحواسب الكمومية اتجاه جديد لزيادة الأداء مبني على ميكانيكا الكم.', en: 'Quantum computers are a new direction for performance, based on quantum mechanics.' }, answer: true },
      ],
    }),
  ]);

  RV.addSteps('1-1', 'social', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'مدرّسة بتشرح من بيتها على Zoom، والطلاب بيحضروا من بيوتهم. اختار __كل__ التحولات اللي ظاهرة هنا:', en: 'A teacher explains from home on Zoom while students join from their homes. Choose __all__ the changes shown:' },
      options: [
        { ar: 'التجارة الإلكترونية', en: 'E-commerce' },
        { ar: 'العمل عن بُعد', en: 'Remote work' },
        { ar: 'التعلّم عبر الإنترنت', en: 'Online learning' },
        { ar: 'الدفع غير النقدي', en: 'Cashless payment' },
      ],
      answer: [1, 2],
      explain: { ar: 'المدرّسة __بتشتغل من بُعد__، والطلاب __بيتعلّموا عبر الإنترنت__ — الموقف الواحد ممكن يجمع أكتر من تحوّل.', en: 'The teacher __works remotely__ and the students __learn online__ — one situation can show several changes.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'إيه أكتر حاجة بتميّز شبكات التواصل الاجتماعي (SNS) عن باقي التحولات؟', en: 'What best distinguishes SNS from the other changes?' },
      options: [
        { ar: 'إنها فعّالة جدًا في نشر المعلومة بسرعة', en: 'It is very effective at spreading information fast' },
        { ar: 'إنها بتخليك تدفع من غير ما تستخدم كاش', en: 'It lets you pay without using cash' },
        { ar: 'إنها بتخليك تشتري حاجات توصل لحد بيتك', en: 'It lets you buy things delivered to your door' },
        { ar: 'إنها بتخليك تشتغل من أي مكان بعيد', en: 'It lets you work from any remote place' },
      ],
      answer: 0,
      explain: { ar: 'SNS = تواصل ونشر ومشاركة، وأهم ميزة: __نشر المعلومة بسرعة__. الباقي: دفع غير نقدي · تجارة إلكترونية · عمل عن بُعد.', en: 'SNS = connect, post, share — key feature: __spreading information fast__. The rest: cashless · e-commerce · remote work.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'الدفع بكارت الخصم (Debit card) يعتبر دفع غير نقدي.', en: 'Paying with a debit card is cashless payment.' }, answer: true },
        { text: { ar: 'التجارة الإلكترونية لازم يكون فيها دفع كاش عند الاستلام.', en: 'E-commerce must involve paying cash on delivery.' }, answer: false, explain: { ar: 'التجارة الإلكترونية = __بيع وشراء عبر الإنترنت__ — الدفع ممكن يكون بأي طريقة.', en: 'E-commerce = __buying and selling online__ — payment can be any method.' } },
        { text: { ar: 'العمل عن بُعد بيعتمد على الإنترنت عشان تخلّص شغلك من أي مكان.', en: 'Remote work relies on the Internet to do your job from anywhere.' }, answer: true },
        { text: { ar: 'شبكات التواصل خدمة هدفها الأساسي بيع السلع.', en: 'The main purpose of SNS is selling goods.' }, answer: false, explain: { ar: 'هدفها التواصل والنشر والمشاركة. بيع السلع = التجارة الإلكترونية.', en: 'Its purpose is connecting, posting and sharing. Selling goods = e-commerce.' } },
      ],
    }),
  ]);

  RV.addSteps('1-1', 'emerging', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'عربية ماشية 72 كم/س (يعني 20 متر كل ثانية). لو القرار اتأخر 0.5 ثانية بسبب السحابة، هتمشي كام متر قبل ما تبدأ تفرمل؟', en: 'A car does 72 km/h (20 m every second). If the cloud delays the decision by 0.5 s, how far does it travel before braking starts?' },
      options: [
        { ar: '5 متر', en: '5 m' },
        { ar: '10 متر', en: '10 m' },
        { ar: '20 متر', en: '20 m' },
        { ar: '40 متر', en: '40 m' },
      ],
      answer: 1,
      explain: { ar: 'المسافة = السرعة × الزمن = `20 × 0.5 = 10` متر من غير فرامل — عشان كده القرار لازم يكون __جوّه العربية__ (حوسبة طرفية).', en: 'Distance = speed × time = `20 × 0.5 = 10` m with no braking — that is why the decision must be made __inside the car__ (edge computing).' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'أنهي مثال ده **واقع معزز (AR)** مش واقع افتراضي؟', en: 'Which example is **AR**, not VR?' },
      options: [
        { ar: 'تجرّب كنبة افتراضية في أوضتك الحقيقية بالموبايل', en: 'Trying a virtual sofa in your real room on your phone' },
        { ar: 'تلبس نظارة وتلعب جوّه عالم افتراضي كامل', en: 'Wearing a headset to play inside a fully virtual world' },
        { ar: 'تعمل جولة جوّه متحف مش موجود قدامك أصلًا', en: 'Touring a museum that is not in front of you at all' },
        { ar: 'تتدرّب على الطيران في محاكي بيخفي العالم الحقيقي', en: 'Training to fly in a simulator that hides the real world' },
      ],
      answer: 0,
      explain: { ar: 'AR __يضيف__ فوق الحقيقي (الأوضة لسه قدامك) ➕ · VR __يستبدل__ الحقيقي بعالم كامل 🔄.', en: 'AR __adds__ to the real world (your room is still there) ➕ · VR __replaces__ it with a whole world 🔄.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'الكيوبت ممكن يكون 0 و 1 في نفس الوقت بالتراكب.', en: 'A qubit can be 0 and 1 at the same time through superposition.' }, answer: true },
        { text: { ar: 'في الحوسبة الطرفية البيانات بتروح السحابة الأول وترجع بالقرار.', en: 'In edge computing the data goes to the cloud first and the decision comes back.' }, answer: false, explain: { ar: 'الحوسبة الطرفية = المعالجة __على الجهاز نفسه فورًا__، من غير رحلة للسحابة.', en: 'Edge computing = processing __on the device itself, instantly__, with no trip to the cloud.' } },
        { text: { ar: 'العربية ذاتية القيادة بتشوف الطريق بالكاميرات والحسّاسات زي LiDAR.', en: 'A self-driving car sees the road with cameras and sensors such as LiDAR.' }, answer: true },
        { text: { ar: 'الواقع الافتراضي بيضيف معلومات فوق العالم الحقيقي اللي إنت شايفه.', en: 'VR adds information on top of the real world you see.' }, answer: false, explain: { ar: 'ده __الواقع المعزز (AR)__. الواقع الافتراضي بيخفي الحقيقي ويحطّك في عالم كامل.', en: 'That is __AR__. VR hides the real world and puts you in a whole new one.' } },
        { text: { ar: 'معالج الحاسب الكمومي بيشتغل في برودة قريبة من الصفر المطلق.', en: 'A quantum processor works at temperatures near absolute zero.' }, answer: true },
      ],
    }),
  ]);
})();
