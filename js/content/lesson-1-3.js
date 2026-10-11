/* =========================================================
 * content/lesson-1-3.js — الذكاء الاصطناعي في الحياة اليومية والصناعة
 * Pure data. Sources: textbook 1-3 (EN p.19–25) + memo.
 * ========================================================= */
RV.lessons.add('1-3', {
  id: '1-3',
  color: '#34d399',
  cover: 'img/l3-cover.webp',
  title: { ar: 'الذكاء الاصطناعي في الحياة اليومية والصناعة', en: 'AI in Daily Life and Industry' },
  guiding: { ar: 'فين بنستخدم الذكاء الاصطناعي في حياتنا وفي الصناعة، وإيه اللي هو شاطر فيه، وإيه اللي محتاج حذر؟', en: 'Where is AI used in daily life and industry, what is it good at, and what needs caution?' },
  hook: {
    ar: 'موقع فيديو بيقترح المقطع الجاي، **مساعد صوتي** بيرد على سؤالك، أداة **ترجمة** بتفهّمك منيو أجنبي، وموبايلك بيتفتح بـ**وشّك**. وفي المصانع والمستشفيات الـAI بيحلّل أشعة ويتنبّأ بالأعطال. بس… هل ينفع نسيبه يقرّر كل حاجة لوحده؟',
    en: 'A video site suggests the next clip, a **voice assistant** answers you, a **translation** tool decodes a foreign menu, and your phone unlocks with your **face**. In factories and hospitals AI reads scans and predicts failures. But… should it decide everything alone?',
  },
  keyFact: { ar: 'الذكاء الاصطناعي __شاطر في إيجاد الأنماط في البيانات__، لكن __الحكم البشري__ لسه ضروري لما الموضوع يخص الأخلاق والخصوصية والمسؤولية.', en: 'AI is __good at finding patterns in data__, but __human judgment__ is still needed where ethics, privacy and responsibility are involved.' },
  concepts: ['recommendation system', 'voice assistant', 'machine translation', 'face recognition', 'image-diagnosis AI', 'predictive maintenance', 'black-box problem', 'hallucination'],
  objectives: [
    { ar: 'أذكر أمثلة لاستخدام الذكاء الاصطناعي في الحياة اليومية والصناعات المختلفة.', en: 'Give examples of AI in daily life and various industries.' },
    { ar: 'أشرح إيه اللي الذكاء الاصطناعي شاطر فيه وإيه اللي محتاج حذر.', en: 'Explain what AI is good at and what requires caution.' },
  ],

  stations: [
    /* ───────────── 1 · daily life ───────────── */
    {
      id: 'daily', kind: 'learn',
      title: { ar: 'الذكاء الاصطناعي في جيبك', en: 'AI in your pocket' },
      steps: [
        { type: 'intro' },
        {
          type: 'scene', wide: true,
          title: { ar: 'أربع خدمات بتستخدمها كل يوم', en: 'Four services you use every day' },
          enTitle: 'Use of AI in Daily Life',
          terms: ['recommendation system', 'voice assistant', 'machine translation', 'face recognition'],
          visual: { anim: 'dailyAI' },
          beats: [
            { ar: '**أنظمة الترشيح:** بتتنبّأ بتفضيلاتك من __بيانات سلوكك السابق__ وتعرضلك توصيات. مثال: YouTube، Amazon، Spotify.', en: '**Recommendation systems:** predict your preferences from __past behaviour data__ and display recommendations. e.g. YouTube, Amazon, Spotify.' },
            { ar: '**المساعدات الصوتية:** __تتعرّف على الصوت، تفهم الأمر، وتنفّذه__. مثال: Siri، Google Assistant.', en: '**Voice assistants:** __recognise a voice, understand the command, and execute it__. e.g. Siri, Google Assistant.' },
            { ar: '**الترجمة الآلية:** بتترجم النصوص __تلقائيًا__ للغات مختلفة. مثال: Google Translate، DeepL.', en: '**Machine translation:** __automatically__ translates text into other languages. e.g. Google Translate, DeepL.' },
            { ar: '**التعرف على الوجه:** __يكتشف ويتعرّف__ على وجوه الناس في الصور تلقائيًا. مثال: فتح قفل الموبايل.', en: '**Face recognition:** automatically __detects and identifies__ human faces in photos. e.g. phone unlocking.' },
          ],
          notes: [{ kind: 'exam', text: { ar: '«الترجمة الآلية نظام بيترجم فيه البشر يدويًا» ← __غلط__؛ هي تلقائية.', en: '"Machine translation is humans translating manually" → __false__; it is automatic.' } }],
        },
        {
          type: 'scene',
          title: { ar: 'إزاي نظام الترشيح بيعرف ذوقك؟', en: 'How does a recommender know your taste?' },
          visual: { anim: 'photo', props: { img: 'img/recommend.webp', motion: 'pan', hotspots: [
            { x: 22, y: 40, icon: 'film', label: { ar: 'اللي اتفرجت عليه قبل كده', en: 'what you watched before' }, beat: 0 },
            { x: 55, y: 40, icon: 'network', label: { ar: 'بيتعلّم ذوقك', en: 'learns your taste' }, beat: 1 },
            { x: 72, y: 45, icon: 'sparkle', label: { ar: 'اقتراحات على مقاسك', en: 'suggestions made for you' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'النظام بيجمع __سلوكك السابق__: شفت إيه، حبّيت إيه، قعدت قد إيه.', en: 'The system collects your __past behaviour__: what you watched, liked, and for how long.' },
            { ar: 'ويتنبّأ بـ__تفضيلاتك__ ويعرضلك حاجات شبهها — ده **نظام الترشيح**.', en: 'Then it predicts your __preferences__ and shows similar things — a **recommendation system**.' },
          ],
        },
        {
          type: 'quiz', title: { ar: 'وصّل', en: 'Match' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل خدمة بالتقنية:', en: 'Match each service with the technology:' },
            left: [
              { ar: 'YouTube بيقترح فيديوهات تناسبك', en: 'YouTube suggests videos you like' },
              { ar: 'بتكلّم الموبايل تسأل عن الطقس', en: 'Asking your phone about the weather' },
              { ar: 'ترجمة موقع أجنبي للغتك', en: 'Translating a foreign website' },
              { ar: 'الكاميرا بتكتشف وش شخص', en: 'The camera detects a face' },
            ],
            right: [{ ar: 'A أنظمة الترشيح', en: 'A Recommendation system' }, { ar: 'B المساعد الصوتي', en: 'B Voice assistant' }, { ar: 'C الترجمة الآلية', en: 'C Machine translation' }, { ar: 'D التعرف على الوجه', en: 'D Face recognition' }],
            answer: [0, 1, 2, 3] },
        },
      ],
    },

    /* ───────────── 2 · industry ───────────── */
    {
      id: 'industry', kind: 'learn',
      title: { ar: 'الذكاء الاصطناعي في الصناعة', en: 'AI in industry' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: 'الذكاء الاصطناعي شغّال في الواقع', en: 'AI at work in the real world' },
          visual: { anim: 'cinema', props: { tint: 'green', clips: [
              { src: 'media/mx-17625.mp4', beat: 0, title: { ar: 'الرعاية الصحية', en: 'Healthcare' }, sub: { ar: 'صور الأشعة بتتحلّل بالذكاء الاصطناعي', en: 'scans analysed by AI' }, icon: 'heart' },
              { src: 'media/mx-35854.mp4', beat: 1, title: { ar: 'الزراعة', en: 'Agriculture' }, sub: { ar: 'ري ومتابعة المحصول بالبيانات', en: 'data-driven irrigation & crops' }, icon: 'leaf' },
              { src: 'media/mx-47260.mp4', beat: 2, title: { ar: 'الزراعة الذكية', en: 'Smart farming' }, sub: { ar: 'روبوت بيزرع الشتلات', en: 'a robot planting seedlings' }, icon: 'leaf' },
              { src: 'media/mx-47257.mp4', beat: 3, title: { ar: 'التصنيع', en: 'Manufacturing' }, sub: { ar: 'ذراع روبوت في خط الإنتاج', en: 'a robot arm on the line' }, icon: 'factory' },
              { src: 'media/mx-4011.mp4', beat: 4, title: { ar: 'الخدمات اللوجستية', en: 'Logistics' }, sub: { ar: 'آلاف الحاويات بتتوزّع بأذكى طريق', en: 'thousands of containers routed smartly' }, icon: 'truck' },
          ] } },
          beats: [
            { ar: 'في المستشفيات: الذكاء الاصطناعي __بيقرا صور الأشعة__ ويساعد الطبيب يكتشف المرض بدري.', en: 'Hospitals: AI __reads scans__ and helps doctors spot disease early.' },
            { ar: 'في الأراضي: بيانات الري والطقس بتساعد __نتنبّأ بموعد الحصاد__.', en: 'Fields: irrigation and weather data help __predict harvest time__.' },
            { ar: 'روبوتات بتزرع وبتراقب النبات و__تكشف الآفات__.', en: 'Robots plant, watch crops and __detect pests__.' },
            { ar: 'في المصانع: روبوتات بتجمّع و__تفحص الجودة__، والنظام بيتنبّأ بالأعطال قبل ما تحصل.', en: 'Factories: robots assemble and __inspect quality__; systems predict failures in advance.' },
            { ar: 'في الموانئ والشحن: __أقصر وأوفر مسار__ لكل شحنة.', en: 'Ports and shipping: the __shortest, cheapest route__ for every shipment.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'أربع صناعات… كل واحدة بتستخدمه بطريقتها', en: 'Four industries, four ways to use AI' },
          enTitle: 'Use of AI in Industry',
          terms: ['image-diagnosis AI', 'predictive maintenance', 'route optimization'],
          visual: { anim: 'industries' },
          beats: [
            { ar: '**الرعاية الصحية:** __الذكاء الاصطناعي للتشخيص بالصور__ — يكشف الأمراض من صور الأشعة السينية والمقطعية، ويدعم اكتشاف الأدوية.', en: '**Healthcare:** __image-diagnosis AI__ detects diseases from X-ray and CT images; drug-discovery support.' },
            { ar: '**الزراعة:** التنبؤ بـ__موعد الحصاد__، و__كشف الآفات والأمراض__ في النبات.', en: '**Agriculture:** predicting __harvest timing__ and __detecting pests and diseases__.' },
            { ar: '**التصنيع:** __أتمتة فحص جودة المنتج__، و**الصيانة التنبؤية** = التنبؤ بأعطال الآلة __قبل ما تحصل__.', en: '**Manufacturing:** __automated quality inspection__ and **predictive maintenance** = predicting machine failures __before they happen__.' },
            { ar: '**الخدمات اللوجستية:** __تحسين مسارات التوصيل__ — أقصر وأوفر طريق للعربية.', en: '**Logistics:** __optimising delivery routes__ — the shortest, cheapest path.' },
          ],
          notes: [{ kind: 'exam', text: { ar: 'الصيانة التنبؤية ← **تصنيع** · التشخيص بالصور ← **صحة** · تحسين المسارات ← **لوجستيات** · كشف الآفات ← **زراعة**.', en: 'Predictive maintenance → **manufacturing** · image diagnosis → **healthcare** · route optimisation → **logistics** · pest detection → **agriculture**.' } }],
        },
        {
          type: 'quiz', title: { ar: 'صنّف', en: 'Classify' },
          q: { widget: 'classify', prompt: { ar: 'كل استخدام تبع أنهي صناعة؟', en: 'Which industry does each use belong to?' },
            groups: [{ icon: 'heart', label: { ar: 'الصحة', en: 'Healthcare' } }, { icon: 'leaf', label: { ar: 'الزراعة', en: 'Agriculture' } }, { icon: 'factory', label: { ar: 'التصنيع', en: 'Manufacturing' } }, { icon: 'truck', label: { ar: 'اللوجستيات', en: 'Logistics' } }],
            items: [
              { text: { ar: 'تحسين مسارات التوصيل', en: 'Optimising delivery routes' }, group: 3 },
              { text: { ar: 'كشف الأمراض من الأشعة', en: 'Detecting diseases from X-rays' }, group: 0 },
              { text: { ar: 'كشف الآفات والأمراض', en: 'Detecting pests and diseases' }, group: 1 },
              { text: { ar: 'أتمتة فحص الجودة', en: 'Automating quality inspection' }, group: 2 },
            ] },
        },
      ],
    },

    /* ───────────── 3 · good at vs caution ───────────── */
    {
      id: 'caution', kind: 'learn',
      title: { ar: 'شاطر في إيه؟ ومحتاج حذر في إيه؟', en: 'Good at what? Careful with what?' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'لو مستشفى عندها ذكاء اصطناعي بيقرا الأشعة بسرعة… تسيبه يقرّر التشخيص لوحده؟', en: 'If a hospital AI reads X-rays fast… should it decide the diagnosis alone?' },
            options: [
              { emoji: '🤖', text: { ar: 'أيوه، هو أسرع', en: 'Yes, it is faster' } },
              { emoji: '👩‍⚕️', text: { ar: 'لأ، لازم طبيب يراجع', en: 'No, a doctor must review' } },
              { emoji: '⚖️', text: { ar: 'على حسب', en: 'It depends' } },
            ],
            after: { ar: 'تعالى نشوف هو شاطر في إيه… وفين لازم ناخد بالنا 👇', en: 'Let’s see what it is good at… and where to be careful 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'قوي في الأنماط… ضعيف في الحكم', en: 'Strong at patterns… weak at judgment' },
          enTitle: 'Characteristics of AI and Cautions for Use',
          visual: { anim: 'goodVsCaution' },
          beats: [
            { ar: '**شاطر في:** إيجاد وتصنيف __الأنماط__ في بيانات معقّدة (صور ونصوص)، __التعرّف والتوليد__ للصور والصوت والنص، و__التنبؤ الاحتمالي__ من البيانات.', en: '**Good at:** finding and classifying __patterns__ in complex data, __recognising and generating__ images/audio/text, and __probabilistic prediction__ from data.' },
            { ar: '**محتاج حذر في:** الأحكام __الأخلاقية__، __الخصوصية__، __القرار النهائي__ (مين المسؤول؟)، البيانات __المتحيزة__، __الهلوسة__، __حقوق النشر__، و__الصندوق الأسود__.', en: '**Needs caution:** __ethical__ judgments, __privacy__, __final decisions__ (who is responsible?), __biased__ data, __hallucination__, __copyright__, and the __black box__.' },
            { ar: '**الحل:** الـAI __يقترح__ والإنسان __يراجع ويقرّر__ — زي الطبيب اللي لازم يأكّد تشخيص الأشعة لأن الغلط بيأثر على حياة إنسان.', en: '**The fix:** AI __suggests__, a human __reviews and decides__ — like a doctor confirming an X-ray diagnosis, because a mistake affects a life.' },
          ],
          notes: [
            { kind: 'confuse', title: { ar: 'فرق بيلخبط', en: 'Easily confused' }, text: { ar: '«المعالجة السريعة لكمية كبيرة من البيانات» و«التعرف على الصور» = حاجات هو __شاطر فيها__، مش من قائمة الحذر.', en: '"Fast processing of lots of data" and "image recognition" are things AI is __good at__ — not caution items.' } },
            { kind: 'exam', text: { ar: '«مفيش مشكلة نسيب الأحكام الأخلاقية للـAI بالكامل» ← __غلط__.', en: '"It is fine to leave ethical judgments entirely to AI" → __false__.' } },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'الذكاء الاصطناعي يقترح… والطبيب يقرّر', en: 'AI suggests… the doctor decides' },
          visual: { anim: 'photo', props: { img: 'img/doctor-xray.webp', motion: 'in', hotspots: [
            { x: 42, y: 40, icon: 'target', label: { ar: 'مكان مشكوك فيه في الأشعة', en: 'a suspicious spot on the X-ray' }, beat: 0 },
            { x: 82, y: 45, icon: 'userCheck', label: { ar: 'الطبيب يراجع ويقرّر', en: 'the doctor reviews and decides' }, beat: 1 },
          ] } },
          beats: [
            { ar: 'الـAI __بيعلّم على مكان مشكوك فيه__ في صورة الأشعة بسرعة ودقة عالية.', en: 'AI __marks a suspicious spot__ on the X-ray quickly and accurately.' },
            { ar: 'بس __القرار النهائي للطبيب__ — لأن الغلط بيأثر على حياة إنسان، ولازم حد يكون مسؤول.', en: 'But the __final decision is the doctor’s__ — a mistake affects a life, and someone must be responsible.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'مشكلة الصندوق الأسود', en: 'The black-box problem' },
          terms: ['black-box problem'],
          visual: { anim: 'blackBox', props: { open: false } },
          beats: [
            { ar: '**مشكلة الصندوق الأسود:** النموذج بياخد قرار، بس __مش واضح إزاي وصل له__.', en: '**The black-box problem:** the model makes a decision, but it is __unclear how it got there__.' },
            { ar: 'لو مش فاهمين «ليه»، يبقى __صعب نتحقّق__ إن القرار صح أو نكتشف الغلط ونصلّحه — عشان كده الاعتماد الكامل عليه خطر.', en: 'If we cannot see "why", it is __hard to verify__ the decision or find and fix mistakes — so relying on it completely is risky.' },
          ],
        },
        {
          type: 'scene', wide: true,
          title: { ar: 'ليه اسمه «صندوق أسود»؟ تعالى نفتحه', en: 'Why is it called a "black box"? Let’s look inside' },
          enTitle: 'The black-box problem — why it happens',
          terms: ['black-box problem', 'weights', 'deep learning'],
          visual: { anim: 'blackBoxWhy' },
          beats: [
            { ar: 'نموذج التعلّم العميق = __شبكة عصبية__ فيها طبقات كتير من الخلايا متوصّلة ببعض.', en: 'A deep-learning model = a __neural network__ with many layers of connected units.' },
            { ar: 'كل وصلة ليها __رقم (وزن)__ النموذج اتعلّمه لوحده أثناء التدريب — والنماذج الكبيرة فيها __ملايين ومليارات__ من الأرقام دي.', en: 'Each link has a __number (weight)__ the model learned by itself in training — big models have __millions or billions__ of them.' },
            { ar: 'القرار بيطلع من __ملايين عمليات الضرب والجمع__ على الأرقام دي. النتيجة واضحة (مقبول/مرفوض)… بس __مفيش سبب مكتوب__ نقدر نقراه.', en: 'The decision comes from __millions of multiplications__ on those numbers. The result is clear (accept/reject)… but there is __no written reason__ we can read.' },
            { ar: 'ده **الصندوق الأسود**: البيانات بتدخل والقرار بيطلع، و«ليه؟» __مستخبي جوّه__. ومن غير «ليه» مانقدرش نتحقّق ولا نكتشف التحيّز ولا نعرف نحاسب مين.', en: 'That is the **black box**: data goes in, a decision comes out, and the "why" is __hidden inside__. Without the "why" we cannot verify, detect bias or hold anyone accountable.' },
          ],
        },
        {
          type: 'scene',
          title: { ar: 'فين الصندوق الأسود ممكن يأذي؟', en: 'Where can a black box cause harm?' },
          visual: { anim: 'iconCards', props: { cards: [
            { icon: 'building', motion: 'pulse', title: { ar: 'قرض بنكي اترفض', en: 'A rejected bank loan' }, sub: { ar: 'ليه؟ محدش عارف', en: 'why? nobody knows' } },
            { icon: 'userCheck', motion: 'network', title: { ar: 'طلب وظيفة اترفض', en: 'A rejected job application' }, sub: { ar: 'يمكن بسبب تحيّز', en: 'maybe because of bias' } },
            { icon: 'heart', motion: 'float', title: { ar: 'تشخيص طبي', en: 'A medical diagnosis' }, sub: { ar: 'الطبيب لازم يفهم', en: 'the doctor must understand' } },
            { icon: 'shield', motion: 'scan', title: { ar: 'رفض تأمين', en: 'A refused insurance claim' }, sub: { ar: 'مين المسؤول؟', en: 'who is responsible?' } },
          ] } },
          beats: [
            { ar: '**قرض بنكي:** النظام رفض طلب قرض — والموظف نفسه مش عارف يشرح السبب للعميل.', en: '**A bank loan:** the system refuses a loan — and even the employee cannot explain why.' },
            { ar: '**وظيفة:** لو النظام بيرفض بسبب حاجة ظالمة (زي الحي اللي ساكن فيه)، __مش هنكتشف__ ده من غير ما نفهم «ليه».', en: '**A job:** if the system rejects for an unfair reason (like the neighbourhood), we __will not find out__ without the "why".' },
            { ar: '**تشخيص طبي:** الطبيب محتاج يعرف الذكاء الاصطناعي __شاف إيه بالظبط__ عشان يوافق أو يرفض.', en: '**A diagnosis:** the doctor needs to know __exactly what the AI saw__ to agree or disagree.' },
            { ar: '**تأمين:** لو القرار غلط، مين يتحاسب؟ عشان كده العالم بيشتغل على **XAI** — هنشوفه في الدرس الجاي.', en: '**Insurance:** if the decision is wrong, who answers? That is why the world is building **XAI** — next lesson.' },
          ],
        },
        {
          type: 'quiz',
          q: { widget: 'tf', items: [
            { text: { ar: 'الصندوق الأسود معناه إن الكمبيوتر لونه أسود.', en: 'A black box means the computer is black.' }, answer: false, explain: { ar: 'معناه إن طريقة اتخاذ القرار مش واضحة لينا.', en: 'It means the decision process is not visible to us.' } },
            { text: { ar: 'نماذج التعلّم العميق فيها ملايين الأوزان، فصعب نشرح قرارها.', en: 'Deep-learning models have millions of weights, so their decisions are hard to explain.' }, answer: true },
            { text: { ar: 'من غير ما نعرف «ليه» صعب نكتشف التحيّز في القرار.', en: 'Without knowing "why", it is hard to detect bias in a decision.' }, answer: true },
            { text: { ar: 'مادام النتيجة طلعت صح مرة، يبقى نثق في الصندوق الأسود دايمًا.', en: 'If the result was right once, we can always trust the black box.' }, answer: false },
          ] },
        },
        {
          type: 'quiz',
          q: { widget: 'tf', items: [
            { text: { ar: 'الـAI شاطر في الاستدلال والتنبؤ الاحتمالي من البيانات.', en: 'AI is good at probabilistic reasoning and prediction.' }, answer: true },
            { text: { ar: 'الـAI شاطر في التعرف على الصور والصوت.', en: 'AI is good at recognising images and audio.' }, answer: true },
            { text: { ar: 'عادي نسيب الأحكام الأخلاقية للـAI بالكامل.', en: 'It is fine to leave ethical judgments entirely to AI.' }, answer: false, explain: { ar: 'ممكن تؤدّي لتمييز أو تحيّز.', en: 'They can lead to discrimination or bias.' } },
            { text: { ar: 'أحكام الـAI ممكن تبقى غير دقيقة لو بيانات التدريب متحيزة.', en: 'AI judgments can be inaccurate when training data is biased.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: 'في حياتنا: **الترشيحات · المساعد الصوتي · الترجمة الآلية · التعرف على الوجه**.', en: 'Daily life: **recommendations · voice assistants · machine translation · face recognition**.' },
            { ar: 'في الصناعة: **صحة** (تشخيص بالصور) · **زراعة** (حصاد/آفات) · **تصنيع** (جودة/صيانة تنبؤية) · **لوجستيات** (مسارات).', en: 'Industry: **healthcare** (image diagnosis) · **agriculture** (harvest/pests) · **manufacturing** (quality/predictive maintenance) · **logistics** (routes).' },
            { ar: 'شاطر في __الأنماط والتعرّف والتنبؤ__ · محتاج حذر في __الأخلاق والخصوصية والقرار النهائي__.', en: 'Good at __patterns, recognition, prediction__ · caution for __ethics, privacy, final decisions__.' },
            { ar: '**الصندوق الأسود** = مش واضح إزاي قرّر → لازم إنسان يراجع في المهام الحسّاسة.', en: '**Black box** = unclear how it decided → a human must review sensitive tasks.' },
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
          q: { widget: 'match', prompt: { ar: '(1) وافِق كل خدمة بتقنيتها:', en: '(1) Match each service to its technology:' },
            left: [
              { ar: 'YouTube يقترح فيديوهات تناسب تفضيلاتك', en: 'YouTube recommends videos you like' },
              { ar: 'تكلّم الموبايل تعرف الطقس', en: 'Speaking to your phone for the weather' },
              { ar: 'ترجمة موقع أجنبي للغتك', en: 'Translating a foreign website' },
              { ar: 'الكاميرا تكتشف وش شخص', en: 'Camera detects a face' },
            ],
            right: [{ ar: 'A الترشيح', en: 'A Recommendation' }, { ar: 'B المساعد الصوتي', en: 'B Voice assistant' }, { ar: 'C الترجمة الآلية', en: 'C Machine translation' }, { ar: 'D التعرف على الوجه', en: 'D Face recognition' }],
            answer: [0, 1, 2, 3] },
          solution: [
            { ar: 'a: توصيات حسب تفضيلاتك = **نظام ترشيح** ← A.', en: 'a: recommendations by preference = **recommendation system** → A.' },
            { ar: 'b: التشغيل بالكلام = **مساعد صوتي** ← B.', en: 'b: operating by voice = **voice assistant** → B.' },
            { ar: 'c: لغة أجنبية للغتك = **ترجمة آلية** ← C.', en: 'c: foreign language to yours = **machine translation** → C.' },
            { ar: 'd: اكتشاف الوجه = **تعرف على الوجه** ← D.', en: 'd: detecting a face = **face recognition** → D.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'tf', prompt: { ar: '(2) ضع ✓ أو ✗:', en: '(2) Mark ✓ or ✗:' }, items: [
            { text: { ar: 'الـAI شاطر في الاستدلال والتنبؤ الاحتمالي.', en: 'AI is good at probabilistic reasoning.' }, answer: true },
            { text: { ar: 'الـAI شاطر في التعرف على الصور والصوت.', en: 'AI is good at recognising images and audio.' }, answer: true },
            { text: { ar: 'عادي نسيب الأحكام الأخلاقية للـAI بالكامل.', en: 'Ethical judgments can be left entirely to AI.' }, answer: false },
            { text: { ar: 'البيانات المتحيزة ممكن تخلّي أحكامه غير دقيقة.', en: 'Biased data can make its judgments inaccurate.' }, answer: true },
          ] },
          solution: [
            { ar: 'A و B: من الحاجات اللي هو __شاطر فيها__ ← **✓**.', en: 'A and B: things AI is __good at__ → **✓**.' },
            { ar: 'C: الأحكام الأخلاقية ممكن تؤدي لتمييز، فمش بنسيبها له بالكامل ← **✗**.', en: 'C: ethical judgments can cause discrimination → **✗**.' },
            { ar: 'D: تحيّز بيانات التدريب بيأثّر على الدقة ← **✓**.', en: 'D: biased training data affects accuracy → **✓**.' },
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
          q: { widget: 'recall', prompt: { ar: 'قول الإجابة وبعدين اكشفها:', en: 'Say it, then reveal:' }, items: [
            { q: { ar: 'النظام اللي بيتنبّأ بالتفضيلات من السلوك السابق ويعرض توصيات؟', en: 'System that predicts preferences from past behaviour and recommends?' }, a: { ar: 'نظام الترشيح', en: 'Recommendation system' } },
            { q: { ar: 'تقنية بتتعرّف على الصوت وتفهم الأوامر وتنفّذها؟', en: 'Technology that recognises voice, understands and executes commands?' }, a: { ar: 'المساعد الصوتي', en: 'Voice assistant' } },
            { q: { ar: 'في أنهي صناعة بيُستخدم الذكاء الاصطناعي للتشخيص بالصور؟', en: 'Which industry uses image-diagnosis AI?' }, a: { ar: 'الرعاية الصحية', en: 'Healthcare' } },
            { q: { ar: 'في التصنيع، اسم النظام اللي بيتنبّأ بأعطال المنتج مقدّمًا؟', en: 'In manufacturing, the system that predicts failures in advance?' }, a: { ar: 'الصيانة التنبؤية', en: 'Predictive maintenance' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار اللي __مش__ من «اللي محتاج حذر»:', en: 'Choose the one NOT among "requires caution":' },
            options: [{ ar: 'الأحكام الأخلاقية (تمييز وتحيّز)', en: 'Ethical judgments (discrimination, bias)' }, { ar: 'إيجاد وتصنيف الأنماط في الصور', en: 'Finding and classifying patterns in images' }, { ar: 'المعلومات الشخصية والخصوصية', en: 'Personal information and privacy' }, { ar: 'القرار النهائي ومين المسؤول عنه', en: 'The final decision and who is responsible' }], answer: 1 },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'املأ الفراغات:', en: 'Fill the blanks:' },
            text: { ar: 'توصيات الفيديوهات اللي تناسب تفضيلاتك جاية من نظام {0}. وبنستخدم الـAI في {1} اللي بنكلّمه عشان يشغّل الموبايل، وفي {2} اللي بتحوّل نص أجنبي للغتنا.', en: 'Video recommendations matching your taste come from a {0} system. AI is also used in the {1} you speak to, and in {2}, which converts foreign text into your language.' },
            bank: [{ ar: 'الترشيح', en: 'recommendation' }, { ar: 'المساعد الصوتي', en: 'voice assistant' }, { ar: 'الترجمة الآلية', en: 'machine translation' }, { ar: 'الصيانة التنبؤية', en: 'predictive maintenance' }],
            answer: [0, 1, 2] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — سؤال 2', en: 'Exercise 2 — Q2' },
          q: { widget: 'mcq', prompt: { ar: 'اختار __كل__ اللي محتاج حذر:', en: 'Choose ALL that require caution:' },
            options: [{ ar: 'المعالجة السريعة لكمية كبيرة من البيانات', en: 'Fast processing of large data' }, { ar: 'الأحكام الأخلاقية', en: 'Ethical judgments' }, { ar: 'أحكام المعلومات الشخصية والخصوصية', en: 'Personal info & privacy judgments' }, { ar: 'التعرف على الصور والصوت', en: 'Image & audio recognition' }], answer: [1, 2] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار __كل__ اللي الـAI شاطر فيه:', en: 'Choose ALL that AI excels at:' },
            options: [{ ar: 'الأحكام الأخلاقية', en: 'Ethical judgments' }, { ar: 'إيجاد الخصائص في الصور والنصوص وتصنيفها', en: 'Finding & classifying features' }, { ar: 'أحكام المعلومات الشخصية', en: 'Personal-info judgments' }, { ar: 'الاستدلال والتنبؤ الاحتمالي', en: 'Probabilistic reasoning & prediction' }, { ar: 'قرارات بتتحمّل مسؤولية النتائج', en: 'Decisions bearing responsibility' }, { ar: 'التعرّف على الصور والصوت والنص وتوليدها', en: 'Recognising & generating images/audio/text' }], answer: [1, 3, 5] },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف __غير__ المناسب:', en: 'Choose the INAPPROPRIATE description:' },
            options: [
              { ar: 'نظام الترشيح بيتنبّأ بالتفضيلات من السلوك السابق.', en: 'Recommenders predict preferences from past behaviour.' },
              { ar: 'المساعد الصوتي بيتعرّف على الصوت وينفّذ الأوامر.', en: 'Voice assistants recognise and execute commands.' },
              { ar: 'الترجمة الآلية نظام بيترجم فيه البشر يدويًا.', en: 'Machine translation is humans translating manually.' },
              { ar: 'التعرف على الوجه بيكتشف الوجوه في الصور تلقائيًا.', en: 'Face recognition detects faces automatically.' },
            ], answer: 2 },
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
          { front: { ar: 'نظام الترشيح', en: 'Recommendation system' }, back: { ar: 'يتنبّأ بالتفضيلات من بيانات السلوك السابق ويعرض توصيات.', en: 'Predicts preferences from past behaviour data and displays recommendations.' } },
          { front: { ar: 'المساعد الصوتي', en: 'Voice assistant' }, back: { ar: 'يتعرّف على الصوت ويفهم الأوامر وينفّذها.', en: 'Recognises a voice, understands commands and executes them.' } },
          { front: { ar: 'الترجمة الآلية', en: 'Machine translation' }, back: { ar: 'تترجم النصوص تلقائيًا للغات مختلفة.', en: 'Automatically translates text into different languages.' } },
          { front: { ar: 'التعرف على الوجه', en: 'Face recognition' }, back: { ar: 'يكتشف ويتعرّف على وجوه الأشخاص في الصور تلقائيًا.', en: 'Automatically detects and identifies faces in photos.' } },
          { front: { ar: 'الصيانة التنبؤية', en: 'Predictive maintenance' }, back: { ar: 'التنبؤ بأعطال المنتج/الآلة مقدّمًا (تصنيع).', en: 'Predicting product/machine failures in advance (manufacturing).' } },
          { front: { ar: 'مشكلة الصندوق الأسود', en: 'Black-box problem' }, back: { ar: 'عدم وضوح إزاي الذكاء الاصطناعي وصل لحكمه.', en: 'When it is unclear how an AI reached its judgment.' } },
          { front: { ar: 'الهلوسة', en: 'Hallucination' }, back: { ar: 'توليد محتوى يبدو صحيح لكنه مخالف للحقائق.', en: 'Generating content that differs from the facts.' } },
        ] },
      }],
    },

    /* ───────────── 7 · think like an engineer ───────────── */
    {
      id: 'think', kind: 'challenge',
      title: { ar: 'فكّر كمهندس + السؤال المقالي', en: 'Think like an engineer + essay' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', marks: 6, tag: { ar: 'سؤال بنمط الامتحان · 6 درجات', en: 'Exam-style · 6 marks' },
            prompt: { ar: 'حلّل ليه الـAI مناسب لبعض المهام ومحتاج حذر في غيرها. اذكر اللي هو شاطر فيه (الأنماط، التعرّف، التنبؤ) واللي محتاج حذر (الأخلاق، الخصوصية، القرار النهائي).', en: 'Analyze why AI suits some tasks but needs caution in others: what it is good at (patterns, recognition, prediction) and what needs caution (ethics, privacy, final decisions).' },
            points: [
              { ar: 'شاطر في الأنماط/التعرّف/التنبؤ لأنها مهام إحصائية من بيانات كتير.', en: 'Good at patterns/recognition/prediction because they are statistical tasks from lots of data.' },
              { ar: 'محتاج حذر في الأحكام الأخلاقية (تحيّز وتمييز).', en: 'Caution in ethical judgments (bias, discrimination).' },
              { ar: 'الخصوصية والمعلومات الشخصية.', en: 'Privacy and personal information.' },
              { ar: 'القرار النهائي ومين المسؤول + الصندوق الأسود → إنسان يراجع.', en: 'Final decisions & responsibility + black box → human review.' },
            ],
            model: { ar: 'الذكاء الاصطناعي بيتعلّم من ملايين الأمثلة، فهو ممتاز في المهام الإحصائية زي إيجاد الأنماط وتصنيف الصور والتنبؤ من البيانات. لكنه محتاج حذر في الأحكام الأخلاقية لأنه ممكن يكون متحيز لو بياناته متحيزة، وفي الخصوصية لأنه بيستخدم بيانات شخصية، وفي القرار النهائي لأن مش واضح مين المسؤول ومش واضح إزاي وصل لحكمه (الصندوق الأسود). عشان كده لازم إنسان يراجع النتيجة في المهام الحسّاسة.', en: 'AI learns from millions of examples, so it excels at statistical tasks like finding patterns, classifying images and predicting from data. It needs caution in ethical judgments (it can be biased if its data is), in privacy (it uses personal data), and in final decisions (unclear responsibility, black-box reasoning). So a human must review sensitive results.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر', en: 'Think it through' },
            prompt: { ar: 'مستشفى عايزة تستخدم ذكاء اصطناعي يكشف الأمراض من الأشعة. ليه التشخيص النهائي لازم يأكّده طبيب بشري؟', en: 'A hospital wants AI to detect diseases from X-rays. Why must a human doctor confirm the final diagnosis?' },
            points: [{ ar: 'الغلط بيأثر على حياة إنسان.', en: 'A mistake affects a human life.' }, { ar: 'الـAI ممكن يغلط بثقة / بيانات متحيزة / صندوق أسود.', en: 'AI can be confidently wrong / biased / a black box.' }, { ar: 'مسؤولية القرار لازم تكون على إنسان.', en: 'Responsibility must rest with a human.' }],
            model: { ar: 'لأن خطأ التشخيص بيأثر على حياة المريض، والذكاء الاصطناعي ممكن يغلط وهو واثق أو يكون متحيز، ومش دايمًا بيشرح ليه قرّر. فالطبيب بيراجع ويتحمّل مسؤولية القرار النهائي.', en: 'A misdiagnosis affects a patient\'s life; AI can be confidently wrong or biased and may not explain its reasoning. The doctor reviews it and takes responsibility for the final decision.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مكتبة المدرسة عايزة ذكاء اصطناعي يرشّح كتب للطلاب حسب استعارتهم السابقة. اشرح هيشتغل إزاي، واذكر تنبيه لازم المدرسة تاخد بالها منه.', en: 'A school library wants AI to recommend books from past borrowing. Explain how it works and one caution.' },
            points: [{ ar: 'نظام ترشيح يتنبّأ من بيانات الاستعارة السابقة.', en: 'A recommender predicts from past borrowing data.' }, { ar: 'تنبيه: الخصوصية / يحصر الطالب في نوع واحد.', en: 'Caution: privacy / trapping students in one genre.' }],
            model: { ar: 'النظام هيحلّل الكتب اللي كل طالب استعارها قبل كده، ويتنبّأ بتفضيلاته، ويرشّحله كتب شبهها. لكن لازم المدرسة تحمي خصوصية بيانات الطلاب، وتتأكد إن النظام مايحصرش الطالب في نوع واحد بس من الكتب.', en: 'It analyses each student\'s past loans, predicts preferences and suggests similar books. The school must protect students\' data privacy and make sure it does not trap a student in only one kind of book.' } },
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
          q: { widget: 'poll', prompt: { ar: 'استكشف: من الخدمات اللي استخدمتها الأسبوع ده (فيديو مقترح، مساعد صوتي، ترجمة…) — أنهي واحدة لو غلطت هتفرق معاك أكتر؟', en: 'Explore: of the AI services you used this week — which one would matter most if it made a mistake?' },
            options: [
              { emoji: '🎬', text: { ar: 'ترشيح الفيديوهات', en: 'Video recommendations' } },
              { emoji: '🎤', text: { ar: 'المساعد الصوتي', en: 'Voice assistant' } },
              { emoji: '🌐', text: { ar: 'الترجمة', en: 'Translation' } },
              { emoji: '🔓', text: { ar: 'فتح الموبايل بالوش', en: 'Face unlock' } },
            ],
            after: { ar: 'فكّر: إيه البيانات اللي كل خدمة محتاجاها عشان تشتغل؟', en: 'Think: what data does each service need to work?' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر لحظة', en: 'Pause & think' },
            prompt: { ar: 'خدمات الذكاء الاصطناعي بتستخدم بياناتك الشخصية (اللي بتشوفه وتشتريه وتقوله). ليه ده بيثير قلق على الخصوصية؟ ومين المفروض يقرّر إزاي بياناتك تُستخدم؟', en: 'AI services use your personal data. Why does this raise privacy concerns, and who should decide how your data is used?' },
            points: [
              { ar: 'البيانات ممكن تتسرّب أو تُستخدم لغرض تاني', en: 'Data may leak or be used for other purposes' },
              { ar: 'رأي في مين يقرر (المستخدم بموافقته + قوانين)', en: 'A view on who decides (the user’s consent + laws)' },
            ],
            model: { ar: 'لأن البيانات دي بتكشف عادات الشخص وأماكنه واهتماماته، وممكن تتسرّب أو تتباع أو تُستخدم في حاجة ماوافقش عليها. المفروض صاحب البيانات هو اللي يقرر بموافقته، مع قوانين تحمي الخصوصية.', en: 'This data reveals habits, places and interests, and may leak, be sold or used without consent. The data owner should decide through consent, backed by privacy laws.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس', en: 'Think as an engineer' },
            prompt: { ar: 'اختار صناعة (صحة / تصنيع / لوجستيات) ودوّر على مثال حقيقي لاستخدام الذكاء الاصطناعي فيها واكتب مصدره. اذكر منفعة وتنبيه، وقرّر: يستخدموه لوحده ولا مع مراجعة إنسان؟', en: 'Pick an industry, find a real documented AI example (with source), give a benefit and a caution, and decide: alone or with a human checking?' },
            points: [
              { ar: 'مثال حقيقي + مصدر', en: 'A real example + source' },
              { ar: 'منفعة + تنبيه', en: 'A benefit + a caution' },
              { ar: 'قرار + سببين', en: 'A decision + two reasons' },
            ],
            model: { ar: 'مثال: مصانع بتستخدم كاميرات بالذكاء الاصطناعي لفحص جودة المنتجات (مصدر: موقع الشركة المصنعة). المنفعة: سرعة ودقة في اكتشاف العيوب. التنبيه: ممكن يغلط في عيب جديد. القرار: مع مراجعة إنسان للحالات المشكوك فيها، لأن الغلط مكلف والمسؤولية لازم تكون على حد.', en: 'Example: factories use AI cameras for quality inspection (source: manufacturer site). Benefit: fast, precise defect detection. Caution: it may miss a new kind of defect. Decision: with human review of doubtful cases — mistakes are costly and someone must be responsible.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: أنهي استخدام للذكاء الاصطناعي في الدرس فاجئك؟ وفين في حياتك الذكاء الاصطناعي بياخد قرارات عنك؟ تحدّى: اقترح قاعدة تخلي استخدامه أأمن في مهمة حساسة.', en: 'Reflect: which AI use surprised you, and where does AI make decisions about you? Challenge: suggest a rule that makes AI safer in a sensitive task.' },
            points: [
              { ar: 'استخدام فاجئك + مكان بياخد فيه قرارات عنك', en: 'A surprising use + where it decides about you' },
              { ar: 'قاعدة واضحة لمهمة حساسة', en: 'A clear rule for a sensitive task' },
            ],
            model: { ar: 'فاجئني إن الذكاء الاصطناعي بيتنبأ بأعطال الآلات قبل ما تحصل. وفي حياتي بيقرّر الفيديوهات والإعلانات اللي بتظهرلي. القاعدة: في التشخيص الطبي، القرار النهائي لازم يكون للطبيب، والنظام يوضّح سبب اقتراحه.', en: 'It surprised me that AI predicts machine failures before they happen; in my life it decides which videos and ads I see. Rule: in medical diagnosis the doctor makes the final decision, and the system must show why it suggested it.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '1-3', seconds: 60, items: [
            { text: { ar: 'YouTube بيستخدم نظام ترشيح', en: 'YouTube uses a recommendation system' }, answer: true },
            { text: { ar: 'المساعد الصوتي بيترجم القوائم الأجنبية', en: 'A voice assistant translates menus' }, answer: false },
            { text: { ar: 'فتح الموبايل بالوش = تعرّف على الوجه', en: 'Face unlock = face recognition' }, answer: true },
            { text: { ar: 'الترجمة الآلية بيعملها بشر يدويًا', en: 'Machine translation is done by hand' }, answer: false },
            { text: { ar: 'الصيانة التنبؤية في التصنيع', en: 'Predictive maintenance is in manufacturing' }, answer: true },
            { text: { ar: 'تحسين مسارات التوصيل في الزراعة', en: 'Route optimisation is in agriculture' }, answer: false },
            { text: { ar: 'كشف الأمراض من الأشعة في الرعاية الصحية', en: 'Disease detection from X-rays is healthcare' }, answer: true },
            { text: { ar: 'كشف الآفات استخدام زراعي', en: 'Pest detection is agricultural' }, answer: true },
            { text: { ar: 'الـ AI شاطر في إيجاد الأنماط', en: 'AI is good at finding patterns' }, answer: true },
            { text: { ar: 'نسيب الأحكام الأخلاقية للـ AI بالكامل', en: 'Leave ethical judgments entirely to AI' }, answer: false },
            { text: { ar: 'البيانات المتحيزة بتقلل دقة الـ AI', en: 'Biased data reduces AI accuracy' }, answer: true },
            { text: { ar: 'الصندوق الأسود = مش واضح إزاي قرّر', en: 'Black box = unclear how it decided' }, answer: true },
            { text: { ar: 'القرار النهائي في المهام الحساسة للإنسان', en: 'Humans make final decisions in sensitive tasks' }, answer: true },
            { text: { ar: 'المعالجة السريعة للبيانات من قائمة الحذر', en: 'Fast data processing is a caution item' }, answer: false },
            { text: { ar: 'الـ AI ممكن يكون واثق وهو غلطان', en: 'AI can be confidently wrong' }, answer: true },
            { text: { ar: 'حقوق النشر في بيانات التدريب من قضايا الحذر', en: 'Copyright in training data is a caution' }, answer: true },
        ] },
      }],
    },

    /* ───────────── 8 · lesson test ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 1-3', en: 'Lesson 1-3 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. «يتنبّأ بالتفضيلات من السلوك السابق ويعرض توصيات»:', en: '1. "Predicts preferences from past behaviour and recommends":' }, options: [{ ar: 'المساعد الصوتي', en: 'Voice assistant' }, { ar: 'نظام الترشيح', en: 'Recommendation system' }, { ar: 'الترجمة الآلية', en: 'Machine translation' }, { ar: 'التعرف على الوجه', en: 'Face recognition' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. الصيانة التنبؤية مثال على الـAI في أنهي صناعة؟', en: '2. Predictive maintenance belongs to which industry?' }, options: [{ ar: 'الرعاية الصحية', en: 'Healthcare' }, { ar: 'الزراعة', en: 'Agriculture' }, { ar: 'التصنيع', en: 'Manufacturing' }, { ar: 'الخدمات اللوجستية', en: 'Logistics' }], answer: 2 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. أيّ دول __مش__ من اللي محتاج حذر؟', en: '3. Which is NOT a caution item?' }, options: [{ ar: 'الأحكام الأخلاقية زي التمييز', en: 'Ethical judgments such as discrimination' }, { ar: 'إيجاد الأنماط في البيانات', en: 'Finding patterns in data' }, { ar: 'القرار النهائي في حالة مهمة', en: 'The final decision in a serious case' }, { ar: 'حماية البيانات الشخصية', en: 'Protecting personal data' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. ينفع نسيب الأحكام الأخلاقية للـAI بالكامل بلا مشكلة.', en: '4. Ethical judgments can be left entirely to AI.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. أحكام الـAI ممكن تبقى غير دقيقة لما بيانات التدريب تكون متحيزة.', en: '5. Biased training data can make AI judgments inaccurate.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. «مشكلة الصندوق الأسود» = مش واضح إزاي الـAI وصل لحكمه.', en: '6. The black-box problem = unclear how the AI reached its judgment.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'match', prompt: { ar: '7. وصّل كل استخدام بصناعته:', en: '7. Match each use to its industry:' }, left: [{ ar: 'تحسين مسارات التوصيل', en: 'Optimising delivery routes' }, { ar: 'كشف الأمراض من الأشعة', en: 'Detecting diseases from X-rays' }, { ar: 'كشف الآفات', en: 'Detecting pests' }], right: [{ ar: 'الصحة', en: 'Healthcare' }, { ar: 'الزراعة', en: 'Agriculture' }, { ar: 'اللوجستيات', en: 'Logistics' }], answer: [2, 0, 1] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. ليه لازم طبيب بشري يأكّد تشخيص الـAI من صور الأشعة؟', en: '8. Why must a human doctor confirm an AI X-ray diagnosis?' },
          points: [{ ar: 'الخطأ بيأثر على حياة إنسان.', en: 'An error affects a life.' }, { ar: 'الـAI ممكن يغلط / مسؤولية القرار على الإنسان.', en: 'AI can err / the human bears responsibility.' }],
          model: { ar: 'لأن الخطأ بيأثر على حياة المريض، والـAI ممكن يغلط وهو واثق، فالطبيب بيراجع ويتحمّل مسؤولية القرار.', en: 'Because an error affects the patient\'s life and AI can be confidently wrong; the doctor reviews and takes responsibility.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اذكر ميزة وتنبيه لإدخال الـAI في الزراعة.', en: '9. Give one advantage and one caution of AI in agriculture.' },
          points: [{ ar: 'ميزة: كشف الآفات بدري / التنبؤ بموعد الحصاد.', en: 'Advantage: early pest detection / harvest prediction.' }, { ar: 'تنبيه: تكلفة / بيانات قليلة أو متحيزة / محتاج مراجعة بشرية.', en: 'Caution: cost / scarce or biased data / needs human review.' }],
          model: { ar: 'ميزة: يكتشف الآفات والأمراض بدري ويتنبّأ بأنسب موعد للحصاد. تنبيه: لو بيانات التدريب قليلة أو من بيئة مختلفة ممكن يغلط، فلازم المزارع يراجع.', en: 'Advantage: detects pests early and predicts the best harvest time. Caution: with scarce or unrepresentative data it may err, so the farmer should verify.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. اشرح بمثال «مشكلة الصندوق الأسود» وليه بتخلّي الاعتماد الكامل على الـAI خطر.', en: '10. Explain the black-box problem with an example and why full reliance is risky.' },
          points: [{ ar: 'مثال: نظام رفض طلب وظيفة من غير ما نعرف ليه.', en: 'Example: a system rejects a job application without saying why.' }, { ar: 'مانقدرش نتحقّق أو نكتشف التحيز ونصلّحه.', en: 'We cannot verify it or detect and fix bias.' }],
          model: { ar: 'مثلًا نظام توظيف رفض متقدّم ومحدش عارف ليه. لو مش فاهمين إزاي قرّر، مانقدرش نتأكد إن القرار صح أو نكتشف لو فيه تحيّز ونصلّحه، فالاعتماد عليه بالكامل خطر.', en: 'E.g. a hiring system rejects an applicant and nobody knows why. If we cannot see how it decided, we cannot verify the decision or detect and fix bias, so full reliance is risky.' } } },
      ],
    },
  ],
});
