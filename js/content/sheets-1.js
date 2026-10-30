/* =========================================================
 * content/sheets-1.js — printable summaries of chapter 1.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('1-1', {
    lead: T('في كل مرحلة أضافت تكنولوجيا المعلومات جهازًا جديدًا، وغيّرت معه طريقة تواصل المجتمع وعمله وتجارته.', 'At each stage, information technology introduced a new technology or service and changed how society communicates, works, and does business.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف تطورت تكنولوجيا المعلومات عبر مراحلها الرئيسية، وكيف غيّرت كل مرحلة المجتمع؟', 'How has information technology developed through its major stages, and how has each stage changed society?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح المراحل الرئيسية وأثرها في المجتمع', 'Explain the major stages and their impact on society'),
          T('تذكر أمثلة على التغيرات والتقنيات الناشئة وتشرح خصائصها', 'Give examples of social changes and emerging technologies'),
          T('تحلّل أثر تقنية على فئات مختلفة وتبرّر رأيك بالأدلة', 'Analyze a technology’s impact on different groups'),
        ] }],
      [{ t: 'sec', n: '1', label: T('تاريخ تكنولوجيا المعلومات (IT)', 'The History of Information Technology (IT)'), sub: T('الأجهزة بقت أصغر وأكثر ترابطًا', 'Each stage smaller and more connected') }],
      [{ t: 'stages', effect: T('التأثير', 'Impact'), items: [
        { when: T('الأربعينيات – الستينيات', '1940s–60s'), ic: '🖥️', h: T('ظهور الحواسيب الإلكترونية', 'Birth of the computer'), p: T('ومنها ENIAC · الصمامات المفرغة', 'ENIAC · vacuum tubes'), e: T('أساسًا للأغراض العسكرية والحسابات العلمية', 'Mainly military and scientific computation'), c: 'slate' },
        { when: T('السبعينيات – الثمانينيات', '1970s–80s'), ic: '💻', h: T('انتشار الحواسيب الشخصية', 'Spread of personal computers'), p: 'PCs', e: T('بداية استخدام الأفراد للحاسب', 'Beginning of personal computer use'), c: 'blue' },
        { when: T('التسعينيات', '1990s'), ic: '🌐', h: T('إتاحة الإنترنت تجاريًا', 'Commercialization of the Internet'), p: T('ظهور الويب', 'the Web'), e: T('وصول عالمي للمعلومات والبريد الإلكتروني', 'Globalization of information; spread of email'), c: 'violet' },
        { when: T('العقد الأول من الألفية', '2000s'), ic: '📱', h: T('ظهور الهواتف الذكية', 'Rise of smartphones'), p: T('آيفون وغيره', 'iPhone, etc.'), e: T('انتشار سريع وواسع للإنترنت عبر الهواتف', 'Explosive spread of mobile Internet'), c: 'pink' },
        { when: T('العقد الثاني فصاعدًا', '2010s onward'), ic: '☁️', h: T('انتشار الحوسبة السحابية', 'Spread of cloud computing'), p: T('موارد IT كخدمات عبر الإنترنت', '“IT as a service”'), e: T('تحليل البيانات الضخمة والذكاء الاصطناعي', 'Large-scale data analysis and AI'), c: 'teal' },
      ] }],
      [
        { t: 'draw', art: 'moore', big: true, w: 1.5, ic: '📈', title: T('قانون مور: عدد الترانزستورات عبر الزمن', 'Moore’s Law: transistor count over time') },
        { t: 'cards', ic: '🧱', title: T('افهم القانون', 'Understand the law'), cols: 1, items: [
          { h: T('الملاحظة', 'The observation'), p: T('عدد الترانزستورات في الدوائر المتكاملة بيزيد بمعدل يقارب الضعف كل عامين', 'Transistors on an integrated circuit double about every two years'), c: 'blue' },
          { h: T('مش قانون فيزيائي ثابت', 'An empirical observation'), p: T('اتجاه تاريخي استمر عقودًا وزوّد قدرات الحوسبة وأداء المعالجات', 'It held for many years and computing power rose dramatically'), c: 'amber' },
          { h: T('التحديات', 'The physical limit'), p: T('هندسية وفيزيائية: تيارات التسرّب + تأثيرات كمومية زي النفق الكمومي', 'quantum tunneling + leakage current: hard to raise performance and cut power together'), c: 'red' },
          { h: T('اتجاهات التحسين', 'New directions'), p: T('تعدد الأنوية · المعالجة المتوازية · تصميمات متخصصة', 'parallel processing on multiple cores · quantum computers'), c: 'green' },
        ] },
      ],
      [
        { t: 'formula', w: 1.05, title: T('إثراء من الموقع (مش في الكتاب)', 'Extra from the app (not in the book)'), ic: '➕', f: 'N = N₀ × 2^n  ·  n = (t − t₀) ÷ 2', p: T('N₀ في السنة t₀ (البداية) · N في السنة t (المطلوبة) · n مرات التضاعف', 'N₀ in year t₀ (start) · N in year t (asked) · n doublings'), ex: T('للمستقبل: اضرب في 2^n · للماضي: اقسم · 2^0.5 ≈ 1.414', 'To the future: × 2^n · to the past: ÷ 2^n · 2^0.5 ≈ 1.414') },
        { t: 'cards', ic: '✏️', title: T('أمثلة محلولة', 'Worked examples'), cols: 2, items: [
          { h: T('2002: 1,451 ← 2025؟', '2002: 1,451 → 2025?'), p: T('11.5 مرة تضاعف ← تقريبًا 4.2 مليون', 'n = 11.5 · ≈ 2,896 times → ≈ 4.2 million'), c: 'blue' },
          { h: T('2000: مليون ← 2010؟', '2000: one million → 2010?'), p: T('5 مرات تضاعف ← 32 مليون', 'n = 5 · 2^5 = 32 → 32 million'), c: 'teal' },
          { h: T('2020: 8,000 ← 2014؟', '2020: 8,000 → 2014?'), p: T('3 مرات للماضي ← نقسم على 8 ← 1,000', 'n = 3 · 8,000 ÷ 8 = 1,000'), c: 'violet' },
          { h: T('16 ضعف بعد كام سنة؟', '16 times after how long?'), p: T('4 مرات تضاعف ← 8 سنين', '16 = 2^4 → n = 4 → 8 years'), c: 'green' },
        ] },
      ],
      [{ t: 'sec', n: '2', label: T('التغيرات الاجتماعية الناتجة عن تكنولوجيا المعلومات', 'Social Changes Resulting from Information Technology'), sub: T('خمس تحوّلات', 'Five changes') }],
      [{ t: 'defs', items: [
        { ic: '💬', h: T('شبكات التواصل الاجتماعي', 'SNS (Social Networking Service)'), p: T('منصات تتيح للمستخدمين التواصل ونشر المحتوى ومشاركته بسرعة', 'Users connect, post and share; highly effective at spreading information rapidly'), c: 'blue' },
        { ic: '🛒', h: T('التجارة الإلكترونية', 'E-commerce (EC)'), p: T('بيع السلع والخدمات وشراؤها عبر الإنترنت', 'Buying and selling goods and services through the Internet'), tags: ['Amazon', 'eBay'], c: 'amber' },
        { ic: '🏠', h: T('العمل عن بُعد', 'Remote work'), p: T('الشخص يؤدي مهامه من المنزل أو موقع بعيد باستخدام الإنترنت', 'Work done from home or other remote locations using the Internet'), c: 'green' },
        { ic: '🎓', h: T('التعلّم عبر الإنترنت', 'Online learning'), p: T('نمط تعليمي تُقدَّم فيه الدروس والمواد التعليمية عبر الإنترنت', 'Classes and study materials delivered using the Internet'), c: 'violet' },
        { ic: '💳', h: T('الدفع غير النقدي', 'Cashless payment'), p: T('دفع قيمة السلع أو الخدمات بوسائل غير نقدية', 'Payments using electronic money, QR codes, etc., without cash'), tags: [T('بطاقات مصرفية', 'credit and debit cards'), T('تطبيقات الهاتف', 'mobile payment apps'), T('رموز QR', 'QR codes')], c: 'pink' },
      ] }],
      [{ t: 'note', ic: '⚖️', c: 'amber', p: T('**فكّر زي مهندس:** الدفع غير النقدي ميزته سرعة الدفع، وتحدّيه الحاجة لبطاقة أو هاتف — قيّمه من منظور العميل وصاحب المتجر الصغير واللي مش معاه بطاقة ولا هاتف ذكي.', '**Think as an engineer:** cashless payment is fast but needs a card or phone — weigh it for the customer, the small shop owner and a person with neither.') }],
      [{ t: 'sec', n: '3', label: T('تقنيات ناشئة بارزة', 'Notable Emerging Technologies') }],
      [
        { t: 'draw', art: 'edge', big: true, w: 1.45, ic: '🚗', title: T('القيادة الذاتية', 'Autonomous driving'), cap: T('ذكاء اصطناعي يساعد على قيادة المركبة، بأقل تدخل بشري حسب مستوى الأتمتة · وعشان التأخير بيأثر في السلامة، بعض البيانات بتتعالج محليًا لتقليل زمن الاستجابة', 'AI drives a vehicle without human operation · a delay of even 0.1 seconds can lead to an accident, so edge computing processes data instantly on the vehicle') },
        { t: 'vflow', ic: '🔁', title: T('بتشتغل إزاي؟', 'How it works'), items: [
          { ic: '👀', h: T('تدرك محيطها', 'Recognizes the surroundings'), p: T('كاميرات ومستشعرات', 'cameras and sensors'), c: 'blue' },
          { ic: '🧠', h: T('تعالج البيانات وتقرّر', 'Makes driving decisions'), c: 'violet' },
          { ic: '🕹️', h: T('تتحكم في القيادة', 'Controls the vehicle'), c: 'green' },
        ] },
      ],
      [
        { t: 'draw', art: 'arvr', ic: '🕶️', title: T('الواقع المعزز والواقع الافتراضي', 'AR / VR'), cap: T('AR: يضيف عناصر أو معلومات رقمية لمشهد من العالم الحقيقي · VR: يضع المستخدم داخل بيئة افتراضية مولّدة حاسوبيًا', 'AR overlays digital information on real-world images · VR immerses users in a computer-generated virtual space') },
        { t: 'draw', art: 'qubit', ic: '⚛️', title: T('الحوسبة الكمومية', 'Quantum computing'), cap: T('تستخدم خصائص ميكانيكا الكم، وممكن تتفوّق في فئات محددة من المسائل، لكنها مش بتسرّع كل الحسابات', 'Uses quantum mechanics; expected to dramatically speed up computations difficult for traditional computers') },
      ],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('رتّب مراحل تطور تكنولوجيا المعلومات زمنيًا', 'Put the stages of IT in order'), a: T('الحاسب ← الإنترنت تجاريًا ← الهواتف الذكية ← السحابة', 'Computer → commercial Internet → smartphones → cloud') },
        { q: T('ملاحظة: عدد الترانزستورات يتضاعف تقريبًا كل عامين', 'Transistors double about every two years'), a: T('قانون مور', 'Moore’s Law') },
        { q: T('بيع السلع والخدمات وشراؤها عبر الإنترنت', 'Buying and selling goods and services online'), a: T('التجارة الإلكترونية', 'E-commerce') },
        { q: T('أداء العمل من المنزل أو موقع بعيد عبر الإنترنت', 'Working from home or a remote location'), a: T('العمل عن بُعد', 'Remote work') },
        { q: T('مدفوعات بالنقود الإلكترونية ورموز QR دون نقد', 'Payments by electronic money or QR codes'), a: T('الدفع غير النقدي', 'Cashless payment') },
        { q: T('تقنية تقود مركبة بأقل تدخل بشري حسب مستوى الأتمتة', 'AI drives a vehicle without human operation'), a: T('القيادة الذاتية', 'Autonomous driving') },
        { q: T('انتشرت في السبعينيات والثمانينيات واستخدمها الأفراد', 'Spread in the 1970s–80s, used by individuals'), a: T('الحواسيب الشخصية', 'Personal computers') },
        { q: T('من العقد الثاني فصاعدًا، تدعم البيانات الضخمة والذكاء الاصطناعي', 'From the 2010s, supports big data and AI'), a: T('الحوسبة السحابية', 'Cloud computing') },
        { q: T('تضيف معلومات رقمية فوق صور من العالم الحقيقي', 'Overlays digital information on real-world images'), a: T('الواقع المعزز AR', 'AR') },
        { q: T('اختر الناشئة: بريد إلكتروني · قيادة ذاتية · حواسب شخصية · AR · VR · حوسبة كمومية', 'Pick the emerging ones: email · autonomous driving · PCs · AR · VR · quantum computing'), a: T('القيادة الذاتية · AR · VR · الكمومية', 'Autonomous driving · AR · VR · quantum') },
      ] }],
      [
        { t: 'qa', mark: T('توقف وفكّر', 'Pause & think'), q: T('ليه القيادة الذاتية بتعالج البيانات على المركبة مش في السحابة؟', 'Why process data on the vehicle, not in the cloud?'), items: [
          T('التأخير بيأثر في السلامة', 'A delay of even 0.1 seconds can lead to an accident'),
          T('المعالجة المحلية بتقلّل زمن الاستجابة', 'Edge computing decides instantly on the vehicle'),
        ] },
        { t: 'qa', mark: T('طبّق ما تعلمته · إجابة مقترحة', 'In a new context · suggested answer'), q: T('قرية اتصلت بالإنترنت والدفع غير النقدي لأول مرة: إيه اللي هيتغيّر؟', 'A village gets Internet and cashless payment for the first time: what changes?'), items: [
          T('تغييران: تعلّم وشراء عبر الإنترنت · دفع من غير نقد', 'Two changes: online learning and shopping · paying without cash'),
          T('تحدٍّ جديد: الأمان، وإتاحة الوصول لمن معهوش هاتف أو بطاقة', 'A new problem: security, and access for people with no phone or card'),
        ] },
      ],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('حلّل كيف غيّر انتشار الحوسبة السحابية طريقة استخدام تكنولوجيا المعلومات.', 'Analyze how the spread of cloud computing has changed the way information technology is used.'), items: [
        T('تحليل البيانات الضخمة: معالجة بيانات كبيرة بقت متاحة عبر الإنترنت', 'Large-scale data analysis became available over the Internet'),
        T('الذكاء الاصطناعي: موارد السحابة بتدعم استخدامه على نطاق واسع', 'AI: cloud resources support its wide use'),
        T('تكنولوجيا المعلومات كخدمة: نستخدم الموارد عبر الإنترنت بدل ما نمتلكها', '“IT as a service”: resources are used over the Internet instead of owned'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الطرفية بتبعت للسحابة قبل القرار', 'Edge sends to the cloud first'), good: T('بتعالج على الجهاز نفسه', 'Processes on the device itself') },
        { bad: T('AR بيستبدل الواقع بالكامل', 'AR replaces reality'), good: T('ده VR؛ AR بيضيف فوقه', 'That is VR; AR adds to it') },
        { bad: T('VR بيحسّن سرعة معالجة الحاسب', 'VR speeds up processing'), good: T('خلط مع الحوسبة الكمومية', 'Confused with quantum computing') },
        { bad: T('التجارة الإلكترونية شراء بالكاش من المحل', 'E-commerce is cash in a shop'), good: T('بيع وشراء عبر الإنترنت', 'Buying and selling online') },
        { bad: T('قانون مور عن سرعة الإنترنت', 'Moore’s Law is about CPU speed'), good: T('عن عدد الترانزستورات', 'About transistor count') },
        { bad: T('الكمومية بديل لكل الحواسيب', 'Stages: smartphones before the Internet'), good: T('لفئات محددة من المسائل', 'Computer → Internet → smartphone → cloud') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('تطورت تكنولوجيا المعلومات عبر مراحل: الحواسب، والإنترنت، والهواتف الذكية، والحوسبة السحابية. وفي كل مرحلة غيّرت طريقة التواصل والعمل والتعلّم والدفع، وظهرت معها تحديات في الأمان والإنصاف وإتاحة الوصول.', 'Information technology developed in stages — computers, the Internet, smartphones, and cloud computing. At each stage it introduced a new technology or service and changed how society communicates, works, learns, and pays.') }],
    ],
  });

  RV.addSheet('1-2', {
    lead: T('الذكاء الاصطناعي مجال واسع، والتعلّم الآلي والعميق والتوليدي مفاهيم مترابطة جوّاه.', 'AI is a wide field; machine learning, deep learning and generative AI are nested inside it.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('ما هو الذكاء الاصطناعي، وكيف يرتبط التعلّم الآلي والتعلّم العميق والذكاء الاصطناعي التوليدي ببعضهم؟', 'What is AI, and how are machine learning, deep learning, and generative AI related?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تعرّف الذكاء الاصطناعي وتميّز بين التعلّم الآلي والعميق والتوليدي', 'Explain what AI is'),
          T('تشرح العلاقة بينهم بأمثلة مناسبة', 'Explain how generative AI sits within AI technologies'),
          T('تقيّم خطر الهلوسة وتحدد إجراء للتحقق من المخرجات', 'Check generative AI output before using it'),
        ] }],
      [{ t: 'sec', n: '1', label: T('ماهية الذكاء الاصطناعي وعلاقته بالتعلّم الآلي', 'What is AI, and its relationship with machine learning') }],
      [
        { t: 'nest', ic: '🎯', title: T('فئات متداخلة (علاقة تعليمية مبسطة، مش تسلسل صارم في كل حالة)', 'The nested family: widest to most specialized'), w: 1.3, items: [
          { h: T('الذكاء الاصطناعي (AI)', 'Artificial intelligence (AI)'), p: T('أنظمة حاسوبية تنفّذ مهام زي التعلّم والتعرّف والتنبؤ وتوليد المحتوى — مثال: الكلام والصور والترجمة', 'reproduces learning, reasoning, judgment on a computer — e.g. speech and image recognition, translation'), c: 'violet' },
          { h: T('التعلّم الآلي (ML)', 'Machine learning (ML)'), p: T('فرع يتعلّم أنماط من البيانات بدل برمجة كل قاعدة: فلتر السبام · التوصيات', 'learns patterns from data to predict and judge: spam filter · recommendations'), c: 'blue' },
          { h: T('التعلّم العميق (DL)', 'Deep learning (DL)'), p: T('شبكات عصبية متعددة الطبقات: تحليل الصور · التعرف على الكلام', 'neural networks + large-scale data: driving images · speech synthesis'), c: 'teal' },
          { h: T('الذكاء التوليدي', 'Generative AI'), p: T('ينشئ محتوى جديد، وغالبية أنظمته الحديثة على التعلّم العميق: ChatGPT · توليد الصور', 'uses deep learning to generate new data: ChatGPT · image generation'), c: 'amber' },
        ] },
        { t: 'cards', ic: '🎯', title: T('ذكاء النهارده «ضيّق»', 'Today’s AI is “narrow”'), cols: 1, items: [
          { ic: '🌍', h: T('معظم الأنظمة: مهمة محددة', 'Expert at one task only'), p: T('روبوت الترجمة لو اديته صورة يتلخبط', 'a translation bot is lost with a photo'), c: 'amber' },
          { ic: '🧠', h: T('الإنسان ذكاؤه عام', 'Humans are general'), p: T('يعمل حاجات كتير', 'many kinds of tasks'), c: 'green' },
        ] },
      ],
      [{ t: 'compare', ic: '📧', title: T('القواعد ولا التعلّم؟ مثال السبام', 'Rules or learning? The spam example'),
        cols: [{ h: T('قواعد بالإيد', 'Hand-written rules'), c: 'slate' }, { h: T('التعلّم الآلي', 'Machine learning'), c: 'blue' }],
        rows: [
          { k: T('الفكرة', 'Idea'), v: [T('لو فيه free ← سبام', 'if it says free → spam'), T('أمثلة كتير + الإجابة الصح', 'many examples + the right answer')] },
          { k: T('النتيجة', 'Result'), v: [T('fr€e عدّت ← القاعدة اتكسرت', 'fr€e passes → the rule breaks'), T('الأنماط بتتعلّم لوحدها', 'patterns are learned')] },
        ] }],
      [{ t: 'flow', ic: '🔁', title: T('خطوات التعلّم الآلي', 'Steps of machine learning'), items: [
        { ic: '🗃️', h: T('بيانات', 'Data'), p: T('أمثلة بإجاباتها', 'labeled examples'), c: 'slate' },
        { ic: '⚙️', h: T('تدريب', 'Training'), p: T('يكتشف الأنماط بنفسه', 'finds patterns itself'), c: 'violet' },
        { ic: '📦', h: T('نموذج', 'Model'), c: 'blue' },
        { ic: '🔮', h: T('تنبؤ', 'Prediction'), p: T('سبام 94% · سليم', 'spam 94% · safe'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '2', label: T('الشبكة العصبية والتعلّم العميق', 'Neural networks and deep learning') }],
      [
        { t: 'draw', art: 'nn', ic: '🧠', title: T('الشبكة العصبية', 'Neural network'), cap: T('مستوحاة بصورة مبسطة من ترابط العصبونات · وحدات مترابطة تتغيّر أوزانها أثناء التدريب', 'Modeled on the neurons of the brain · many connected components · the core technology behind recent AI') },
        { t: 'cards', ic: '🏋️', title: T('التدريب والتعلّم العميق', 'Training and deep learning'), cols: 1, items: [
          { h: T('التدريب', 'Training'), p: T('الغلطة بترجع لورا والأوزان تتغيّر شوية شوية', 'the error goes back, weights change little by little'), c: 'amber' },
          { h: T('التعلّم العميق', 'Deep learning'), p: T('طبقات مخفية كتير + ملايين الصور ← حواف ← أشكال ← مشاة', 'many hidden layers + millions of images → edges → shapes → pedestrians'), c: 'teal' },
          { h: T('حدوده', 'Its limit'), p: T('الحاجة النادرة في بياناته غالبًا بيغلط فيها', 'it often fails on what is rare in its data'), c: 'red' },
        ] },
      ],
      [{ t: 'sec', n: '3', label: T('الذكاء الاصطناعي التوليدي والهلوسة', 'Generative AI and hallucination') }],
      [{ t: 'flow', ic: '✨', title: T('التوليدي بيكتب إزاي؟', 'How generative AI writes'), items: [
        { ic: '✍️', h: T('طلب (prompt)', 'A prompt'), c: 'blue' },
        { ic: '🔤', h: T('كلمة ورا كلمة', 'Word by word'), p: T('باحتمال اتعلّمه من النصوص', 'by learned probability'), c: 'violet' },
        { ic: '🎨', h: T('محتوى جديد', 'New content'), p: T('نص · صور · صوت · برامج', 'text · image · audio · code'), c: 'green' },
      ] }],
      [
        { t: 'cards', ic: '😵', title: T('الهلوسة: كلام مقنع لكنه غلط', 'Hallucination: convincing but wrong'), cols: 1, items: [
          { h: T('مثال', 'Example'), p: T('«برج القاهرة اتبنى 1890» — والحقيقة 1961', '“Cairo Tower was built in 1890” — it was 1961'), c: 'red' },
          { h: T('أشكالها', 'Its forms'), p: T('حقيقة مزيفة · مرجع مش موجود · رقم غلط', 'a fake fact · a missing reference · a wrong number'), c: 'amber' },
          { h: T('بتزيد لما', 'It grows when'), p: T('المعلومة نادرة أو مش في بيانات التدريب', 'the fact is rare or not in training data'), c: 'violet' },
        ] },
        { t: 'vflow', ic: '🛡️', title: T('تحمي نفسك في التقرير', 'Protect your report'), items: [
          { h: T('① راجع مصدر موثوق', '① Check a trusted source'), c: 'green' },
          { h: T('② اطلب المرجع واتأكد منه', '② Ask for the reference, verify it'), c: 'green' },
          { h: T('③ قارن مصدرين', '③ Compare two sources'), c: 'green' },
          { h: T('④ للأفكار مش للحقيقة النهائية', '④ For ideas, not final truth'), c: 'green' },
          { h: T('⑤ افهم واكتب بأسلوبك', '⑤ Understand, write your own'), c: 'green' },
        ] },
      ],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('المصطلح العام لأنظمة تنفّذ مهام زي التعلّم والتعرّف والتنبؤ وتوليد المحتوى', 'General term for technologies that perform intelligent human behavior'), a: T('الذكاء الاصطناعي', 'Artificial intelligence') },
        { q: T('فرع تتعلم فيه النماذج أنماطًا من البيانات', 'Learns patterns from data to predict and judge'), a: T('التعلّم الآلي', 'Machine learning') },
        { q: T('أسلوب تعلّم آلي يعتمد على شبكات عصبية متعددة الطبقات', 'Uses neural networks to learn complex patterns'), a: T('التعلّم العميق', 'Deep learning') },
        { q: T('أنظمة تنشئ محتوى جديدًا زي النصوص والصور', 'AI technology that generates new data'), a: T('الذكاء الاصطناعي التوليدي', 'Generative AI') },
        { q: T('التعلّم العميق تقنية مختلفة تمامًا عن التعلّم الآلي؟', 'Deep learning is completely different from machine learning?'), a: T('غلط: أسلوب ضمن التعلّم الآلي', 'False: it is a type of machine learning') },
        { q: T('الذكاء الاصطناعي والتعلّم الآلي ليهم نفس المعنى؟', 'AI and machine learning have the same meaning?'), a: T('غلط: AI مفهوم أوسع', 'False: AI is the broader concept') },
        { q: T('مين مش مثال توليدي: ChatGPT · توليد صور · مرشح الرسائل المزعجة · توليد صوت', 'Not generative: ChatGPT · image AI · spam filter · audio AI'), a: T('مرشح الرسائل المزعجة', 'The spam filter') },
        { q: T('التعرف على المشاة في القيادة الذاتية: أنهي نوع؟', 'Image analysis for autonomous driving: which kind?'), a: T('التعلّم العميق', 'Deep learning') },
      ] }],
      [{ t: 'qa', mark: T('توقف وفكّر', 'Pause & think'), q: T('ليه خطر تحط إجابة الذكاء التوليدي في تقرير زي ما هي؟', 'Why is it dangerous to use generative AI output as-is in a report?'), items: [
        T('ممكن تبقى مقنعة وهي غير صحيحة (هلوسة)', 'It can sound plausible but be factually wrong'),
        T('لازم نتحقق من مصدر موثوق ونكتب بأسلوبنا', 'Verify it in a trusted source and write it yourself'),
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('حلّل العلاقة بين الذكاء الاصطناعي والتعلّم الآلي والتعلّم العميق والذكاء الاصطناعي التوليدي.', 'Analyze the relationship between AI, machine learning, deep learning, and generative AI.'), items: [
        T('الذكاء الاصطناعي هو المجال الأوسع، مثال: الترجمة', 'AI is the broad field, e.g. translation'),
        T('التعلّم الآلي فرع منه، مثال: مرشح الرسائل المزعجة', 'Machine learning sits inside it, e.g. spam filters'),
        T('التعلّم العميق أسلوب ضمن التعلّم الآلي، مثال: تحليل الصور', 'Deep learning sits inside machine learning, e.g. image analysis'),
        T('غالبية الأنظمة التوليدية مبنية على التعلّم العميق، مثال: ChatGPT', 'Generative AI is built on deep learning, e.g. ChatGPT'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('AI وML نفس المعنى', 'AI and ML mean the same'), good: T('AI المجال الواسع', 'AI is the wide field') },
        { bad: T('DL منفصل عن ML', 'DL is separate from ML'), good: T('نوع متقدّم جوّاه', 'An advanced kind inside it') },
        { bad: T('فلتر السبام توليدي', 'A spam filter is generative'), good: T('تعلّم آلي بيصنّف', 'ML that classifies') },
        { bad: T('التوليدي مبني على ML عادي', 'GenAI rests on plain ML'), good: T('غالبيته على التعلّم العميق', 'It rests on deep learning') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('الذكاء الاصطناعي هو المجال الواسع، والتعلّم الآلي يقع ضمنه، والتعلّم العميق ضمن التعلّم الآلي، والذكاء الاصطناعي التوليدي الحالي مبني على التعلّم العميق: من الفكرة الأوسع إلى الأكثر تخصصًا.', 'AI is the broad field; machine learning sits inside it, deep learning inside machine learning, and today’s generative AI is built on deep learning.') }],
    ],
  });

  RV.addSheet('1-3', {
    lead: T('الذكاء الاصطناعي شاطر في إيجاد الأنماط، لكن الحكم البشري ضروري في الأخلاق والخصوصية والمسؤولية.', 'AI is great at patterns, but human judgment is essential for ethics, privacy and responsibility.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('أين يُستخدم الذكاء الاصطناعي في الحياة اليومية والصناعة، وما الذي يبرع فيه، وما الذي يتطلب الحذر؟', 'Where is AI used in daily life and industry, what is AI good at, and what needs caution?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تعطي أمثلة على استخدامه في الحياة اليومية والصناعات', 'Give examples of AI in daily life and industries'),
          T('تشرح ما يبرع فيه وما يتطلب الحذر', 'Explain what AI is good at and what requires caution'),
          T('تقيّم استخدامًا وتبرّر الحاجة للإشراف البشري', 'Justify human oversight for high-impact decisions'),
        ] }],
      [{ t: 'sec', n: '1', label: T('استخدام الذكاء الاصطناعي في الحياة اليومية', 'Use of AI in Daily Life') }],
      [{ t: 'cards', ic: '🏠', title: T('في حياتنا اليومية', 'In daily life'), cols: 4, items: [
        { ic: '🎬', h: T('أنظمة التوصية', 'Recommendation systems'), p: T('تجمع سلوكك وتتنبّأ بتفضيلاتك: YouTube · Amazon · Spotify', 'use your behavior to predict tastes: YouTube · Amazon · Spotify'), c: 'blue' },
        { ic: '🎙️', h: T('المساعد الصوتي', 'Voice assistant'), p: T('Siri · Google Assistant', 'Siri · Google Assistant'), c: 'violet' },
        { ic: '🌍', h: T('الترجمة الآلية', 'Machine translation'), p: T('تلقائيًا: Google Translate · DeepL', 'automatic: Google Translate · DeepL'), c: 'green' },
        { ic: '🙂', h: T('التعرف على الوجه', 'Face recognition'), p: T('يكشف الوجوه في الصور ويتعرّف عليها · فتح الموبايل', 'detects and identifies faces in photos · phone unlock'), c: 'pink' },
      ] }],
      [{ t: 'flow', ic: '🎙️', title: T('مثال: «صحّيني 7»', 'Example: “wake me at 7”'), items: [
        { ic: '🗣️', h: T('① يتعرّف على الصوت', '① Recognizes the voice'), c: 'blue' },
        { ic: '🧠', h: T('② يفهم الأمر', '② Understands the command'), c: 'violet' },
        { ic: '⏰', h: T('③ ينفّذ: منبّه 7:00', '③ Acts: alarm at 7:00'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '2', label: T('استخدام الذكاء الاصطناعي في الصناعة', 'Use of AI in Industry') }],
      [{ t: 'tree', ic: '🏭', title: T('في الصناعة', 'In industry'), root: { h: T('الذكاء الاصطناعي في الصناعة', 'AI in industry'), c: 'teal' }, kids: [
        { ic: '🏥', h: T('الرعاية الصحية', 'Healthcare'), list: [T('التشخيص بالصور: أشعة ومقطعية', 'image diagnosis: X-ray, CT'), T('يدعم اكتشاف الأدوية', 'supports drug discovery'), T('القرار النهائي للطبيب', 'the doctor decides')], c: 'red' },
        { ic: '🌾', h: T('الزراعة', 'Agriculture'), list: [T('التنبؤ بميعاد الحصاد', 'harvest prediction'), T('كشف الآفات وأمراض النبات', 'detects pests and disease')], c: 'green' },
        { ic: '🏭', h: T('التصنيع', 'Manufacturing'), list: [T('أتمتة فحص الجودة', 'automated quality checks'), T('صيانة تنبؤية قبل العطل', 'predictive maintenance')], c: 'amber' },
        { ic: '🚚', h: T('الخدمات اللوجستية', 'Logistics'), list: [T('تحسين المسارات: أقصر طريق', 'route optimization: the shortest way'), T('وقت وبنزين أقل', 'less time and fuel')], c: 'blue' },
      ] }],
      [{ t: 'sec', n: '3', label: T('خصائص الذكاء الاصطناعي واحتياطات الاستخدام', 'Characteristics of AI and Cautions for Use') }],
      [{ t: 'compare', ic: '⚖️', title: T('شاطر في إيه؟ ومحتاج حذر في إيه؟', 'Strong at… careful with…'),
        cols: [{ ic: '✅', h: T('شاطر في', 'Strong at'), c: 'green' }, { ic: '⚠️', h: T('محتاج حذر في', 'Careful with'), c: 'red' }],
        rows: [
          { k: '1', v: [T('إيجاد وتصنيف الأنماط في صور ونصوص', 'finding and sorting patterns in images and text'), T('القرارات الأخلاقية (تمييز أو تحيّز) · المعلومات الشخصية والحساسة · القرارات عالية الأثر (مين المسؤول؟)', 'ethical judgments (discrimination, prejudice) · personal information and privacy · final decisions (who is responsible?)')] },
          { k: '2', v: [T('التعرّف على الصور والصوت والنص · توليد بعض أنواع المحتوى', 'recognizing and generating images, audio, text'), T('بيانات تدريب غير كافية أو غير ممثلة أو متحيزة · الهلوسة · حقوق المؤلف في بيانات التدريب', 'biased training data · hallucination · copyright in training data')] },
          { k: '3', v: [T('التنبؤ الاحتمالي من البيانات', 'probabilistic prediction from data'), T('الصندوق الأسود', 'the black box')] },
        ] }],
      [{ t: 'flow', ic: '⬛', title: T('مشكلة الصندوق الأسود: مش واضح إزاي وصل للقرار', 'The black-box problem: how it decided is unclear'), items: [
        { ic: '📥', h: T('بيانات', 'Data'), c: 'slate' },
        { ic: '⬛', h: T('النموذج', 'Model'), p: T('ملايين الأوزان · مفيش سبب مكتوب', 'millions of weights, no written reason'), c: 'slate', solid: true },
        { ic: '📤', h: T('قرار', 'Decision'), p: T('رفض القرض', 'loan refused'), c: 'amber' },
        { ic: '🧑‍⚕️', h: T('إنسان يراجع', 'A human reviews'), p: T('الـAI يقترح والإنسان يقرّر', 'AI suggests, a human decides'), c: 'green' },
      ] }],
      [{ t: 'cards', ic: '🚨', title: T('كل ما زاد أثر القرار على الناس، زادت أهمية التحقق البشري', 'Human judgment stays essential in'), cols: 4, items: [
        { ic: '💳', h: T('قرض', 'A loan'), c: 'red' }, { ic: '💼', h: T('وظيفة', 'A job'), c: 'red' }, { ic: '🩺', h: T('تشخيص طبي', 'A diagnosis'), c: 'red' }, { ic: '🛡️', h: T('تأمين', 'Insurance'), c: 'red' },
      ] }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('يوتيوب يوصي بفيديوهات تناسب تفضيلاتك', 'YouTube recommends videos matching your preferences'), a: T('نظام التوصية', 'Recommendation system') },
        { q: T('تكلّم الهاتف عشان تعرف الطقس', 'Speaking to a phone to check the weather'), a: T('المساعد الصوتي', 'Voice assistant') },
        { q: T('ترجمة موقع بلغة أجنبية إلى لغتك', 'Translating a foreign website into your language'), a: T('الترجمة الآلية', 'Machine translation') },
        { q: T('كاميرا الهاتف بتكتشف وجه الشخص تلقائيًا', 'A phone camera detects a face automatically'), a: T('التعرف على الوجه', 'Face recognition') },
        { q: T('أنهي صناعة بتستخدم التشخيص بالصور؟', 'Which industry uses image-diagnosis AI?'), a: T('الرعاية الصحية', 'Healthcare') },
        { q: T('التنبؤ بالأعطال قبل حدوثها في التصنيع', 'Predicting failures in advance in manufacturing'), a: T('الصيانة التنبؤية', 'Predictive maintenance') },
        { q: T('نسيب الأحكام الأخلاقية بالكامل للذكاء الاصطناعي؟', 'Leave ethical judgments entirely to AI?'), a: T('غلط: ممكن تؤدي لتمييز أو تحيّز', 'False: they can lead to discrimination') },
        { q: T('بيانات تدريب متحيزة بتأثر على دقة الأحكام؟', 'Biased training data affects accuracy?'), a: T('صح', 'True') },
      ] }],
      [{ t: 'qa', mark: T('توقف وفكّر', 'Pause & think'), q: T('ليه القرار النهائي في التشخيص لازم يتأكد منه طبيب؟', 'Why should a human doctor confirm the final diagnosis?'), items: [
        T('الذكاء الاصطناعي ممكن يغلط، والخطأ أثره كبير على المريض', 'AI can be wrong, and the impact is high'),
        T('أساس الحكم ممكن مايبقاش واضح، والمسؤولية لازم تتحدد', 'The basis of its judgment may be unclear, and someone must be responsible'),
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('حلّل لماذا يناسب الذكاء الاصطناعي بعض المهام بينما يتطلب الحذر في مهام أخرى.', 'Analyze why AI is well suited to some tasks but requires caution in others.'), items: [
        T('يبرع في إيجاد الأنماط والتعرّف والتنبؤ من البيانات', 'It is good at finding patterns, recognition and prediction'),
        T('لكنه مش بيضمن صحة النتيجة أو عدالتها', 'But it does not guarantee a correct or fair result'),
        T('الحذر في الأخلاق والخصوصية والقرارات عالية الأثر والبيانات المتحيزة', 'Caution is needed for ethics, privacy, final decisions and biased data'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الترجمة الآلية = بشر بيترجموا', 'Machine translation = human translators'), good: T('برنامج ذكاء اصطناعي', 'An AI program') },
        { bad: T('نسيب له الأحكام الأخلاقية بالكامل', 'Leave ethics entirely to AI'), good: T('ممكن تؤدي لتمييز', 'It may discriminate') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('الذكاء الاصطناعي بارع في إيجاد الأنماط في البيانات وتصنيفها، لكن الحكم البشري ضروري عندما يتعلق الأمر بالأخلاق والخصوصية والمسؤولية.', 'AI is good at finding and classifying patterns in data, but human judgment is still needed where ethics, privacy, and responsibility are involved.') }],
    ],
  });

  RV.addSheet('1-4', {
    lead: T('لو البيانات أو التصميم متحيّز، الـAI ممكن يكرر التحيّز: نفحص، ونشرح القرار، ونعرف مين المسؤول.', 'Biased training data means biased AI: test it, explain decisions, know who is responsible.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('ما القضايا الأخلاقية التي تنشأ مع انتشار الذكاء الاصطناعي، وما المبادئ التي ينبغي أن توجه استخدامنا له؟', 'What ethical issues arise as AI spreads, and what principles should guide how we use it?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح التحيّز الخوارزمي وأسبابه الرئيسية', 'Explain algorithmic bias and its main causes'),
          T('تربط المبادئ الأربعة بمواقف محددة', 'Connect the four principles to specific situations'),
          T('تقيّم موقفًا وتحدد الأطراف المسؤولة', 'Judge a situation and name who is responsible'),
        ] }],
      [{ t: 'sec', n: '1', label: T('التحيّز الخوارزمي', 'Algorithmic Bias') }],
      [{ t: 'flow', ic: '⚖️', title: T('التحيّز الخوارزمي: نمط في المخرجات قد يؤدي لنتائج غير عادلة أو ضارة', 'Algorithmic bias: bias in AI judgments caused by bias in the training data'), items: [
        { ic: '🗃️', h: T('بيانات تدريب متحيّزة', 'Biased training data'), p: T('غير ممثلة للواقع أو فيها تمييز قديم', 'too little data on some groups, or past discrimination'), c: 'red' },
        { ic: '🤖', h: T('النموذج يتعلّم', 'The model learns'), p: T('قرارات تعيين قديمة', 'old hiring decisions'), c: 'violet' },
        { ic: '⚠️', h: T('أحكام متحيّزة', 'Biased judgments'), p: T('70% مقابل 18% لنفس المهارات', '70% vs 18% for the same skills'), c: 'amber' },
      ] }],
      [
        { t: 'cards', ic: '🕵️', title: T('مداخل تانية للتحيّز', 'Other ways in'), cols: 1, items: [
          { h: T('المتغيّر البديل', 'A proxy variable'), p: T('شلنا «المجموعة»… بس الحي أو النادي يرجّعها', 'remove the group… the area or club brings it back'), c: 'amber' },
          { h: T('تصميم النظام · طريقة استخدامه · السياق البشري والاجتماعي', 'Variable choice · model design'), c: 'violet' },
          { h: T('أمثلة حقيقية', 'Real examples'), p: T('توظيف غير عادل لجنس معيّن · وجوه بتتغلّط أكتر مع مجموعات عرقية معيّنة', 'a hiring AI unfair to one gender · faces misidentified more for some ethnic groups'), c: 'red' },
        ] },
        { t: 'vflow', ic: '🔧', title: T('نقلّله إزاي؟', 'How to reduce it'), items: [
          { h: T('بيانات متوازنة وممثّلة لكل المجموعات', 'Balanced data for every group'), c: 'green' },
          { h: T('نختبر النتايج لكل مجموعة قبل الاستخدام', 'Test results per group before use'), c: 'green' },
        ] },
      ],
      [{ t: 'sec', n: '2', label: T('قضايا الخصوصية', 'Privacy Issues') }],
      [{ t: 'tree', ic: '🔒', title: T('قضايا الخصوصية', 'Privacy issues'), root: { h: T('الأمان والراحة قصاد الخصوصية ← محتاجين قواعد: مين يشوف؟ ولحد إمتى؟', 'Safety vs privacy → rules: who sees it? for how long?'), c: 'blue' }, kids: [
        { ic: '📹', h: T('المراقبة بالتعرف على الوجه', 'Face-recognition surveillance'), p: T('تتبّع الأفراد: مين وفين وإمتى', 'tracking who, where, when'), c: 'red' },
        { ic: '🗂️', h: T('الجمع الجماعي للبيانات', 'Mass data collection'), p: T('لايكات · بحث · مكان · مشتريات', 'likes · searches · location · purchases'), c: 'amber' },
        { ic: '🛡️', h: T('حماية الخصوصية', 'Privacy protection'), p: T('يتشارك اللي لازم ولغرض واضح', 'share only what is needed, for a clear purpose'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '3', label: T('الذكاء الاصطناعي القابل للتفسير والمسؤولية', 'Explainable AI (XAI) and Responsibility') }],
      [{ t: 'flow', ic: '🔦', title: T('من مشكلة الصندوق الأسود للتفسير', 'From the black-box problem to explanation'), items: [
        { ic: '⬛', h: T('صندوق أسود', 'Black box'), p: T('طلب اترفض ومحدش يعرف ليه · صعب تقييمه واكتشاف الأخطاء أو التحيّز', 'refused, nobody knows why · hard to verify the result is correct'), c: 'slate' },
        { ic: '🔦', h: T('XAI', 'XAI'), p: T('أساليب توضّح العوامل اللي أسهمت في القرار', 'lets humans understand why it judged so'), c: 'amber' },
        { ic: '🔧', h: T('نكتشف ونصلّح', 'Find and fix'), p: T('رفض بسبب «الحي» ← تحيّز', 'refused for the area → bias'), c: 'green' },
      ] }],
      [{ t: 'cards', ic: '🧰', title: T('أدوات XAI', 'XAI tools'), cols: 3, items: [
        { ic: '📊', h: T('أهمية كل عامل', 'Factor importance'), p: T('كل عامل أثّر قد إيه في القرار', 'how much each factor counted'), c: 'blue' },
        { ic: '🔀', h: T('«لو كان… كان اتقبل»', '“If… it would pass”'), p: T('أصغر تغيير يقلب النتيجة', 'the smallest change that flips it'), c: 'violet' },
        { ic: '🌡️', h: T('الخريطة الحرارية', 'Heat map'), p: T('تلوّن مكان التشخيص في الصورة الطبية', 'colors the diagnosed area'), c: 'red' },
      ] }],
      [{ t: 'note', ic: '🧾', c: 'amber', p: T('**المسؤولية:** تحديد أدوار وواجبات الأطراف: المطوّر والجهة المشغِّلة والمستخدم — ومفيش توزيع واحد يصلح لكل السياقات؛ بيختلف حسب النظام والاستخدام والقواعد.', '**Responsibility:** who answers when an AI judges wrongly? Views differ for developer, user and operator, and it is not yet clearly determined. XAI supports transparency, fairness and accountability.') }],
      [{ t: 'sec', n: '4', label: T('المبادئ الأساسية لأخلاقيات الذكاء الاصطناعي', 'Basic Principles of AI Ethics') }],
      [
        { t: 'cycle', ic: '🧭', title: T('أربعة مبادئ من بين مبادئ أخرى («عَشْخَم»)', 'The four principles'), center: T('استخدام مسؤول', 'Responsible use'), items: [
          { ic: '⚖️', h: T('العدالة', 'Fairness'), c: 'blue' },
          { ic: '👁️', h: T('الشفافية', 'Transparency'), c: 'violet' },
          { ic: '🛡️', h: T('الخصوصية', 'Privacy'), c: 'green' },
          { ic: '🧾', h: T('المساءلة', 'Accountability'), c: 'amber' },
        ] },
        { t: 'cards', ic: '📘', title: T('يعني إيه كل مبدأ؟', 'What each means'), cols: 1, items: [
          { h: T('العدالة', 'Fairness'), p: T('عدم التمييز ظلمًا — توظيف بعدل بغضّ النظر عن الجنس', 'no unfair discrimination — fair hiring regardless of gender'), c: 'blue' },
          { h: T('الشفافية', 'Transparency'), p: T('معلومات واضحة عن النظام واستخدامه وعملية القرار وحدوده', 'show the decision process and inner workings clearly'), c: 'violet' },
          { h: T('حماية الخصوصية', 'Privacy protection'), p: T('التعامل المناسب مع المعلومات الشخصية — مثال: مفيش استخدام لغرض غير اللي اتجمعت عشانه', 'handle personal information appropriately — e.g. no use beyond the original purpose'), c: 'green' },
          { h: T('المساءلة', 'Accountability'), p: T('تحديد الجهات المسؤولة وإمكان محاسبتها وفق أدوارها', 'being answerable for the AI’s decisions'), c: 'amber' },
        ] },
      ],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('عدم التمييز ظلمًا ضد أي شخص أو مجموعة', 'Not unjustly discriminating against anyone'), a: T('العدالة', 'Fairness') },
        { q: T('إتاحة معلومات واضحة عن النظام وعملية القرار وحدوده', 'Showing the decision process clearly'), a: T('الشفافية', 'Transparency') },
        { q: T('التعامل المناسب مع المعلومات الشخصية', 'Handling personal information appropriately'), a: T('حماية الخصوصية', 'Privacy protection') },
        { q: T('تحديد الجهات المسؤولة وإمكان محاسبتها', 'Being answerable for the AI’s decisions'), a: T('المساءلة', 'Accountability') },
        { q: T('لو القرار غامض مفيش مشكلة طالما النتيجة صحيحة؟', 'Opaque is no problem if the result is correct?'), a: T('غلط: يصعب تقييمه واكتشاف الأخطاء', 'False: it is hard to verify') },
        { q: T('المسؤول عن خطأ الذكاء الاصطناعي متحدد بوضوح؟', 'Who is responsible has been clearly determined?'), a: T('غلط: بيختلف حسب النظام والاستخدام والقواعد', 'False: views differ and it is not settled') },
        { q: T('التحيّز ناتج عن سرعة المعالجة؟', 'Bias comes from processing speed?'), a: T('غلط: من البيانات أو التصميم أو الاستخدام', 'False: from biased training data') },
        { q: T('تقنية بتوضّح سبب حكم الذكاء الاصطناعي', 'Lets humans understand why an AI judged so'), a: T('XAI', 'XAI') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('حلّل كيف يمكن أن ينشأ التحيّز الخوارزمي في نظام ذكاء اصطناعي، وكيف يمكن تقليله.', 'Analyze how algorithmic bias can arise in an AI system, and how it can be reduced.'), items: [
        T('السبب: بيانات تدريب متحيزة أو غير كافية، أو تصميم النظام', 'Cause: biased or insufficient training data, or the design'),
        T('التقليل: بيانات ممثلة واختبار النتائج لكل مجموعة', 'Reduce it: balanced data and testing results per group'),
        T('العدالة تمنع التمييز، والشفافية بتساعد نكشف السبب', 'Fairness guards against discrimination; transparency reveals the cause'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('التحيّز سببه بطء الحاسب', 'Bias comes from a slow computer'), good: T('البيانات أو التصميم أو الاستخدام', 'Biased training data') },
        { bad: T('المساءلة = القدرة على شرح القرار', 'Opaque is fine if the result is right'), good: T('ده XAI؛ المساءلة: مين يتحاسب', 'It is hard to verify it') },
        { bad: T('«الـAI مبدع» قضية خصوصية', '“AI is creative” is a privacy issue'), good: T('التتبّع والجمع الجماعي بس', 'Only tracking and mass collection') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('لو البيانات أو التصميم متحيز، الذكاء الاصطناعي ممكن يكرر التحيز؛ والاستخدام المسؤول معناه نتحقق من التحيز، ونقدر نشرح القرارات، ونعرف مين المسؤول.', 'If training data is biased, an AI can reproduce that bias; using AI responsibly means checking for bias, explaining decisions, and knowing who is accountable.') }],
    ],
  });
})();
