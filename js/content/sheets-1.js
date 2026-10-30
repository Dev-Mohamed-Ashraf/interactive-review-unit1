/* =========================================================
 * content/sheets-1.js — printable summaries of chapter 1.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('1-1', {
    lead: T('في كل مرحلة، تكنولوجيا المعلومات جابت تقنية جديدة وغيّرت طريقة التواصل والشغل والتجارة.', 'Each stage brought a new technology and changed how we communicate, work and trade.'),
    rows: [
      [{ t: 'flow', ic: '🕰️', title: T('مراحل التطور', 'Stages of development'), items: [
        { ic: '🖥️', h: T('الحاسب', 'Computer'), p: T('40s–60s · ENIAC بالصمامات المفرغة · حوالي 30 طن · عسكري وعلمي', '1940s–60s · ENIAC, vacuum tubes · about 30 tons · military, science'), c: 'slate' },
        { ic: '💻', h: T('الحاسب الشخصي PC', 'Personal computer (PC)'), p: T('70s–80s · الأفراد يستخدموا الحاسب لأول مرة', '1970s–80s · individuals use computers for the first time'), c: 'blue' },
        { ic: '🌐', h: T('الإنترنت', 'Internet'), p: T('90s · تجاري + الويب · عولمة المعلومات والبريد', '1990s · commercial + web · global information, e-mail'), c: 'violet' },
        { ic: '📱', h: T('الموبايل', 'Mobile'), p: T('2000s · هواتف ذكية · انتشار هائل لإنترنت الموبايل', '2000s · smartphones (iPhone) · explosive mobile internet'), c: 'pink' },
        { ic: '☁️', h: T('الحوسبة السحابية', 'Cloud computing'), p: T('2010+ · موارد IT كخدمة · بيانات ضخمة وذكاء اصطناعي', '2010+ · IT resources as a service · big data and AI'), c: 'teal' },
      ] }],
      [
        { t: 'draw', art: 'moore', ic: '📈', title: T('قانون مور', 'Moore’s Law'), cap: T('عدد الترانزستورات في الدائرة المتكاملة بيتضاعف تقريبًا كل عامين · الترانزستور = مفتاح صغير 1/0 · من 2,300 (Intel 4004 سنة 1971) لأكتر من 100 مليار', 'The number of transistors on an integrated circuit doubles about every two years · a transistor is a tiny 1/0 switch · from 2,300 (Intel 4004, 1971) to over 100 billion') },
        { t: 'cards', ic: '🧱', title: T('مشاكله وحلوله', 'Its problems and solutions'), cols: 1, items: [
          { h: T('بيتكلم عن عدد الترانزستورات', 'It is about transistor count'), p: T('مش سرعة الإنترنت ولا المعالج · ملاحظة تجريبية مش قانون فيزيائي', 'not internet or CPU speed · an observation, not a law of physics'), c: 'amber' },
          { h: T('تحديات التصغير', 'The physical limit'), p: T('هندسية وفيزيائية: تيارات التسرّب + تأثيرات كمومية زي النفق الكمومي', 'quantum tunnelling + leakage current → hard to get higher performance and lower power together'), c: 'red' },
          { h: T('الحلول', 'New directions'), p: T('تعدد الأنوية والمعالجة المتوازية · تصميمات متخصصة', 'parallel processing on multiple cores · quantum computers'), c: 'green' },
          { h: T('الحوسبة الكمومية هنا', 'Quantum computers'), p: T('نهج مختلف لفئات محددة من المسائل، مش بديل لكل الحواسيب', 'based on the principles of quantum mechanics'), c: 'violet' },
        ] },
      ],
      [
        { t: 'formula', w: 1.1, f: 'N = N₀ × 2^n     n = (t − t₀) ÷ 2', p: T('N₀ في السنة t₀ (البداية) · N في السنة t (المطلوبة) · n مرات التضاعف', 'N₀ in year t₀ (start) · N in year t (asked) · n doublings'), ex: T('رايح للمستقبل: اضرب في 2^n · راجع للماضي: اقسم · 2^0.5 ≈ 1.414', 'To the future: × 2^n · to the past: ÷ 2^n · 2^0.5 ≈ 1.414') },
        { t: 'cards', ic: '✏️', title: T('أمثلة محلولة', 'Worked examples'), cols: 1, items: [
          { h: T('2002: 1,451 ← 2025؟', '2002: 1,451 → 2025?'), p: T('n = 23 ÷ 2 = 11.5 · 2^11.5 ≈ 2,896 ← ≈ 4.2 مليون', 'n = 23 ÷ 2 = 11.5 · 2^11.5 ≈ 2,896 → ≈ 4.2 million'), c: 'blue' },
          { h: T('2000: مليون ← 2010؟', '2000: one million → 2010?'), p: T('n = 5 · 2^5 = 32 ← 32 مليون', 'n = 5 · 2^5 = 32 → 32 million'), c: 'teal' },
          { h: T('2020: 8,000 ← 2014؟', '2020: 8,000 → 2014?'), p: T('n = 3 · N₀ = 8,000 ÷ 8 = 1,000', 'n = 3 · N₀ = 8,000 ÷ 8 = 1,000'), c: 'violet' },
          { h: T('16 ضعف بعد كام سنة؟', '16 times after how long?'), p: T('16 = 2^4 ← n = 4 ← 8 سنين', '16 = 2^4 → n = 4 → 8 years'), c: 'green' },
        ] },
      ],
      [{ t: 'cards', ic: '🔄', title: T('خمس تحوّلات في المجتمع', 'Five social transformations'), cols: 5, items: [
        { ic: '💬', h: 'SNS', p: T('منصات للتواصل ونشر المحتوى ومشاركته بسرعة', 'connect, post and share; spreads information rapidly'), c: 'blue' },
        { ic: '🛒', h: T('تجارة إلكترونية', 'E-commerce'), p: T('بيع وشراء أونلاين: Amazon · eBay', 'online trade: Amazon · eBay'), c: 'amber' },
        { ic: '🏠', h: T('عمل عن بُعد', 'Remote work'), p: T('من البيت أو أي مكان', 'from home or anywhere'), c: 'green' },
        { ic: '🎓', h: T('تعلّم أونلاين', 'Online learning'), p: T('دروس ومواد تعليمية عبر الإنترنت', 'classes and study materials over the Internet'), c: 'violet' },
        { ic: '💳', h: T('الدفع غير النقدي', 'Cashless payment'), p: T('بطاقات مصرفية · تطبيق هاتف · رموز QR', 'e-money · QR codes · credit/debit cards · payment apps'), c: 'pink' },
      ] }],
      [{ t: 'flow', ic: '🚗', title: T('القيادة الذاتية: ذكاء اصطناعي يساعد في القيادة بأقل تدخل بشري حسب مستوى الأتمتة (مثال Waymo)', 'Autonomous driving: AI drives a vehicle without human operation (e.g. Waymo)'), items: [
        { ic: '👀', h: T('بتشوف', 'Sees'), p: T('كاميرات وحسّاسات وLiDAR', 'cameras, sensors, LiDAR'), c: 'blue' },
        { ic: '🧠', h: T('بتفكّر', 'Thinks'), p: T('تتعرّف وتقرّر: أكمّل؟ أقف؟', 'recognizes, decides: go or stop?'), c: 'violet' },
        { ic: '🕹️', h: T('بتتصرّف', 'Acts'), p: T('الدريكسيون والفرامل والبنزين', 'steering, brakes, throttle'), c: 'green' },
      ] }],
      [
        { t: 'draw', art: 'edge', ic: '🛰️', title: T('الحوسبة الطرفية ولا السحابة؟', 'Edge computing or the cloud?'), cap: T('التأخير بيأثر في السلامة، فبعض البيانات بتتعالج محليًا على المركبة لتقليل زمن الاستجابة', 'A delay of even 0.1 seconds can lead to an accident, so processing is done instantly on the vehicle, not in the cloud') },
        { t: 'draw', art: 'arvr', ic: '🕶️', title: T('AR ولا VR؟', 'AR or VR?'), cap: T('AR: Pokémon GO · تجربة كنبة في أوضتك | VR: نظارة في لعبة أو جولة', 'AR: Pokémon GO · a sofa in your room | VR: a headset game or tour') },
      ],
      [
        { t: 'compare', ic: '⚛️', title: T('الحوسبة الكمومية: ممكن تتفوّق في فئات محددة من المسائل، مش كل الحسابات', 'Quantum computing: expected to dramatically speed up calculations hard for traditional computers'),
          cols: [{ h: T('البِت التقليدي', 'Classical bit'), c: 'slate' }, { h: T('الكيوبت', 'Qubit'), c: 'teal' }],
          rows: [
            { k: T('الحالة', 'State'), v: [T('0 أو 1', '0 or 1'), T('التراكب: 0 و1 مع بعض', 'superposition: 0 and 1 together')] },
            { k: T('مثال', 'Example'), v: [T('زي مفتاح النور', 'like a light switch'), T('IBM Q System One قرب الصفر المطلق', 'IBM Q System One, near absolute zero')] },
          ] },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الطرفية بتبعت للسحابة قبل القرار', 'Edge sends to the cloud first'), good: T('بتعالج على الجهاز فورًا', 'Processes on the device') },
        { bad: T('AR بيستبدل الواقع بالكامل', 'AR replaces reality'), good: T('ده VR؛ AR بيضيف', 'That is VR; AR adds') },
        { bad: T('VR بيحسّن سرعة المعالجة', 'VR speeds up processing'), good: T('خلط مع الحوسبة الكمومية', 'Confused with quantum') },
        { bad: T('التجارة الإلكترونية في محل بالكاش', 'E-commerce is a cash shop'), good: T('عبر الإنترنت', 'Over the internet') },
        { bad: T('الكمومية بديل لكل الحواسيب', 'Moore’s Law is about CPU speed'), good: T('لفئات محددة من المسائل', 'Transistor count') },
      ] }],
    ],
  });

  RV.addSheet('1-2', {
    lead: T('الذكاء الاصطناعي مجال واسع، والتعلّم الآلي والعميق والتوليدي مفاهيم مترابطة جوّاه.', 'AI is a wide field; machine, deep and generative learning are nested inside it.'),
    rows: [
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
        { ic: '🗃️', h: T('بيانات', 'Data'), p: T('أمثلة بإجاباتها', 'labelled examples'), c: 'slate' },
        { ic: '⚙️', h: T('تدريب', 'Training'), p: T('يكتشف الأنماط بنفسه', 'finds patterns itself'), c: 'violet' },
        { ic: '📦', h: T('نموذج', 'Model'), c: 'blue' },
        { ic: '🔮', h: T('تنبؤ', 'Prediction'), p: T('سبام 94% · سليم', 'spam 94% · safe'), c: 'green' },
      ] }],
      [
        { t: 'draw', art: 'nn', ic: '🧠', title: T('الشبكة العصبية', 'Neural network'), cap: T('مستوحاة بصورة مبسطة من ترابط العصبونات · وحدات مترابطة تتغيّر أوزانها أثناء التدريب', 'Modeled on the neurons of the brain · many connected components · the core technology behind recent AI') },
        { t: 'cards', ic: '🏋️', title: T('التدريب والتعلّم العميق', 'Training and deep learning'), cols: 1, items: [
          { h: T('التدريب', 'Training'), p: T('الغلطة بترجع لورا والأوزان تتغيّر شوية شوية', 'the error goes back, weights change little by little'), c: 'amber' },
          { h: T('التعلّم العميق', 'Deep learning'), p: T('طبقات مخفية كتير + ملايين الصور ← حواف ← أشكال ← مشاة', 'many hidden layers + millions of images → edges → shapes → pedestrians'), c: 'teal' },
          { h: T('حدوده', 'Its limit'), p: T('الحاجة النادرة في بياناته غالبًا بيغلط فيها', 'it often fails on what is rare in its data'), c: 'red' },
        ] },
      ],
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
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('AI وML نفس المعنى', 'AI and ML mean the same'), good: T('AI المجال الواسع', 'AI is the wide field') },
        { bad: T('DL منفصل عن ML', 'DL is separate from ML'), good: T('نوع متقدّم جوّاه', 'An advanced kind inside it') },
        { bad: T('فلتر السبام توليدي', 'A spam filter is generative'), good: T('تعلّم آلي بيصنّف', 'ML that classifies') },
        { bad: T('التوليدي مبني على ML عادي', 'GenAI rests on plain ML'), good: T('غالبيته على التعلّم العميق', 'It rests on deep learning') },
      ] }],
    ],
  });

  RV.addSheet('1-3', {
    lead: T('الذكاء الاصطناعي شاطر في إيجاد الأنماط، لكن الحكم البشري ضروري في الأخلاق والخصوصية والمسؤولية.', 'AI is great at patterns, but human judgment is essential for ethics, privacy and responsibility.'),
    rows: [
      [{ t: 'cards', ic: '🏠', title: T('في حياتنا اليومية', 'In daily life'), cols: 4, items: [
        { ic: '🎬', h: T('أنظمة التوصية', 'Recommendation systems'), p: T('تجمع سلوكك وتتنبّأ بتفضيلاتك: YouTube · Amazon · Spotify', 'use your behaviour to predict tastes: YouTube · Amazon · Spotify'), c: 'blue' },
        { ic: '🎙️', h: T('المساعد الصوتي', 'Voice assistant'), p: T('Siri · Google Assistant', 'Siri · Google Assistant'), c: 'violet' },
        { ic: '🌍', h: T('الترجمة الآلية', 'Machine translation'), p: T('تلقائيًا: Google Translate · DeepL', 'automatic: Google Translate · DeepL'), c: 'green' },
        { ic: '🙂', h: T('التعرف على الوجه', 'Face recognition'), p: T('يكشف الوجوه في الصور ويتعرّف عليها · فتح الموبايل', 'detects and identifies faces in photos · phone unlock'), c: 'pink' },
      ] }],
      [{ t: 'flow', ic: '🎙️', title: T('مثال: «صحّيني 7»', 'Example: “wake me at 7”'), items: [
        { ic: '🗣️', h: T('① يتعرّف على الصوت', '① Recognizes the voice'), c: 'blue' },
        { ic: '🧠', h: T('② يفهم الأمر', '② Understands the command'), c: 'violet' },
        { ic: '⏰', h: T('③ ينفّذ: منبّه 7:00', '③ Acts: alarm at 7:00'), c: 'green' },
      ] }],
      [{ t: 'tree', ic: '🏭', title: T('في الصناعة', 'In industry'), root: { h: T('الذكاء الاصطناعي في الصناعة', 'AI in industry'), c: 'teal' }, kids: [
        { ic: '🏥', h: T('الرعاية الصحية', 'Healthcare'), list: [T('التشخيص بالصور: أشعة ومقطعية', 'image diagnosis: X-ray, CT'), T('يدعم اكتشاف الأدوية', 'supports drug discovery'), T('القرار النهائي للطبيب', 'the doctor decides')], c: 'red' },
        { ic: '🌾', h: T('الزراعة', 'Agriculture'), list: [T('التنبؤ بميعاد الحصاد', 'harvest prediction'), T('كشف الآفات وأمراض النبات', 'detects pests and disease')], c: 'green' },
        { ic: '🏭', h: T('التصنيع', 'Manufacturing'), list: [T('أتمتة فحص الجودة', 'automated quality checks'), T('صيانة تنبؤية قبل العطل', 'predictive maintenance')], c: 'amber' },
        { ic: '🚚', h: T('الخدمات اللوجستية', 'Logistics'), list: [T('تحسين المسارات: أقصر طريق', 'route optimisation: the shortest way'), T('وقت وبنزين أقل', 'less time and fuel')], c: 'blue' },
      ] }],
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
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الترجمة الآلية = بشر بيترجموا', 'Machine translation = human translators'), good: T('برنامج ذكاء اصطناعي', 'An AI program') },
        { bad: T('نسيب له الأحكام الأخلاقية بالكامل', 'Leave ethics entirely to AI'), good: T('ممكن تؤدي لتمييز', 'It may discriminate') },
      ] }],
    ],
  });

  RV.addSheet('1-4', {
    lead: T('لو البيانات أو التصميم متحيّز، الـAI ممكن يكرر التحيّز: نفحص، ونشرح القرار، ونعرف مين المسؤول.', 'Biased training data means biased AI: test it, explain decisions, know who is responsible.'),
    rows: [
      [{ t: 'flow', ic: '⚖️', title: T('التحيّز الخوارزمي: نمط في المخرجات قد يؤدي لنتائج غير عادلة أو ضارة', 'Algorithmic bias: bias in AI judgments caused by bias in the training data'), items: [
        { ic: '🗃️', h: T('بيانات تدريب متحيّزة', 'Biased training data'), p: T('غير ممثلة للواقع أو فيها تمييز قديم', 'too little data on some groups, or past discrimination'), c: 'red' },
        { ic: '🤖', h: T('النموذج يتعلّم', 'The model learns'), p: T('قرارات تعيين قديمة', 'old hiring decisions'), c: 'violet' },
        { ic: '⚠️', h: T('أحكام متحيّزة', 'Biased judgments'), p: T('70% مقابل 18% لنفس المهارات', '70% vs 18% for the same skills'), c: 'amber' },
      ] }],
      [
        { t: 'cards', ic: '🕵️', title: T('مداخل تانية للتحيّز', 'Other ways in'), cols: 1, items: [
          { h: T('المتغيّر الوسيط', 'A proxy variable'), p: T('شلنا «المجموعة»… بس الحي أو النادي يرجّعها', 'remove the group… the area or club brings it back'), c: 'amber' },
          { h: T('تصميم النظام · طريقة استخدامه · السياق البشري والاجتماعي', 'Variable choice · model design'), c: 'violet' },
          { h: T('أمثلة حقيقية', 'Real examples'), p: T('توظيف غير عادل لجنس معيّن · وجوه بتتغلّط أكتر مع مجموعات عرقية معيّنة', 'a hiring AI unfair to one gender · faces misidentified more for some ethnic groups'), c: 'red' },
        ] },
        { t: 'vflow', ic: '🔧', title: T('نقلّله إزاي؟', 'How to reduce it'), items: [
          { h: T('بيانات متوازنة وممثّلة لكل المجموعات', 'Balanced data for every group'), c: 'green' },
          { h: T('نختبر النتايج لكل مجموعة قبل الاستخدام', 'Test results per group before use'), c: 'green' },
        ] },
      ],
      [{ t: 'tree', ic: '🔒', title: T('قضايا الخصوصية', 'Privacy issues'), root: { h: T('الأمان والراحة قصاد الخصوصية ← محتاجين قواعد: مين يشوف؟ ولحد إمتى؟', 'Safety vs privacy → rules: who sees it? for how long?'), c: 'blue' }, kids: [
        { ic: '📹', h: T('المراقبة بالتعرف على الوجه', 'Face-recognition surveillance'), p: T('تتبّع الأفراد: مين وفين وإمتى', 'tracking who, where, when'), c: 'red' },
        { ic: '🗂️', h: T('الجمع الضخم للبيانات', 'Mass data collection'), p: T('لايكات · بحث · مكان · مشتريات', 'likes · searches · location · purchases'), c: 'amber' },
        { ic: '🛡️', h: T('حماية الخصوصية', 'Privacy protection'), p: T('يتشارك اللي لازم ولغرض واضح', 'share only what is needed, for a clear purpose'), c: 'green' },
      ] }],
      [{ t: 'flow', ic: '🔦', title: T('من مشكلة الصندوق الأسود للتفسير', 'From the black-box problem to explanation'), items: [
        { ic: '⬛', h: T('صندوق أسود', 'Black box'), p: T('طلب اترفض ومحدش يعرف ليه · صعب تقييمه واكتشاف الأخطاء أو التحيّز', 'refused, nobody knows why · hard to verify the result is correct'), c: 'slate' },
        { ic: '🔦', h: T('XAI', 'XAI'), p: T('أساليب توضّح العوامل اللي أسهمت في القرار', 'lets humans understand why it judged so'), c: 'amber' },
        { ic: '🔧', h: T('نكتشف ونصلّح', 'Find and fix'), p: T('رفض بسبب «الحي» ← تحيّز', 'refused for the area → bias'), c: 'green' },
      ] }],
      [{ t: 'cards', ic: '🧰', title: T('أدوات XAI', 'XAI tools'), cols: 3, items: [
        { ic: '📊', h: T('أهمية كل عامل', 'Factor importance'), p: T('كل عامل أثّر قد إيه في القرار', 'how much each factor counted'), c: 'blue' },
        { ic: '🔀', h: T('«لو كان… كان اتقبل»', '“If… it would pass”'), p: T('أصغر تغيير يقلب النتيجة', 'the smallest change that flips it'), c: 'violet' },
        { ic: '🌡️', h: T('الخريطة الحرارية', 'Heat map'), p: T('تلوّن مكان التشخيص في الصورة الطبية', 'colours the diagnosed area'), c: 'red' },
      ] }],
      [{ t: 'note', ic: '🧾', c: 'amber', p: T('**المسؤولية:** تحديد أدوار وواجبات الأطراف: المطوّر والجهة المشغِّلة والمستخدم — ومفيش توزيع واحد يصلح لكل السياقات؛ بيختلف حسب النظام والاستخدام والقواعد.', '**Responsibility:** who answers when an AI judges wrongly? Views differ for developer, user and operator, and it is not yet clearly determined. XAI supports transparency, fairness and accountability.') }],
      [
        { t: 'cycle', ic: '🧭', title: T('أربعة مبادئ من بين مبادئ أخرى («عَشْخَم»)', 'The four principles'), center: T('استخدام مسؤول', 'Responsible use'), items: [
          { ic: '⚖️', h: T('العدالة', 'Fairness'), c: 'blue' },
          { ic: '👁️', h: T('الشفافية', 'Transparency'), c: 'violet' },
          { ic: '🛡️', h: T('الخصوصية', 'Privacy'), c: 'green' },
          { ic: '🧾', h: T('المساءلة', 'Accountability'), c: 'amber' },
        ] },
        { t: 'cards', ic: '📘', title: T('يعني إيه كل مبدأ؟', 'What each means'), cols: 1, items: [
          { h: T('العدالة', 'Fairness'), p: T('عدم التمييز ظلمًا — توظيف بعدل بغضّ النظر عن الجنس', 'no unfair discrimination — fair hiring regardless of sex'), c: 'blue' },
          { h: T('الشفافية', 'Transparency'), p: T('معلومات واضحة عن النظام واستخدامه وعملية القرار وحدوده', 'show the decision process and inner workings clearly'), c: 'violet' },
          { h: T('حماية الخصوصية', 'Privacy protection'), p: T('التعامل المناسب مع المعلومات الشخصية — مثال: مفيش استخدام لغرض غير اللي اتجمعت عشانه', 'handle personal information appropriately — e.g. no use beyond the original purpose'), c: 'green' },
          { h: T('المساءلة', 'Accountability'), p: T('تحديد الجهات المسؤولة وإمكان محاسبتها وفق أدوارها', 'being answerable for the AI’s decisions'), c: 'amber' },
        ] },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('التحيّز سببه بطء الحاسب', 'Bias comes from a slow computer'), good: T('البيانات أو التصميم أو الاستخدام', 'Biased training data') },
        { bad: T('المساءلة = القدرة على شرح القرار', 'Opaque is fine if the result is right'), good: T('ده XAI؛ المساءلة: مين يتحاسب', 'It is hard to verify it') },
        { bad: T('«الـAI مبدع» قضية خصوصية', '“AI is creative” is a privacy issue'), good: T('التتبّع والجمع الضخم بس', 'Only tracking and mass collection') },
      ] }],
    ],
  });
})();
