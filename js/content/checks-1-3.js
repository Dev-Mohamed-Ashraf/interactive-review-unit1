/* =========================================================
 * content/checks-1-3.js — "✋ Check yourself" questions for lesson 1-3.
 * Pure data (see content/checks-1-1.js for the design rules).
 * ========================================================= */
(function () {
  const q = (n, body) => ({ type: 'quiz', title: { ar: `✋ اختبر فهمك (${n})`, en: `✋ Check yourself (${n})` }, q: body });

  RV.addSteps('1-3', 'daily', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'قلت «يا Siri، اضبط منبّه الساعة 7» واتضبط فعلًا. أنهي خدمة دي؟', en: 'You said "Hey Siri, set an alarm for 7" and it did. Which service is this?' },
      options: [
        { ar: 'مساعد صوتي', en: 'Voice assistant' },
        { ar: 'نظام توصية', en: 'Recommendation system' },
        { ar: 'ترجمة آلية', en: 'Machine translation' },
        { ar: 'تعرّف على الوجه', en: 'Face recognition' },
      ],
      answer: 0,
      explain: { ar: 'المساعد الصوتي: __يتعرّف على الصوت، يفهم الأمر، وينفّذه__.', en: 'A voice assistant __recognizes speech, understands the command and carries it out__.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'YouTube بقى يعرضلك فيديوهات كورة بعد ما اتفرجت على ماتشات كتير. بيعتمد على إيه؟', en: 'YouTube now shows you football videos after you watched many matches. What does it rely on?' },
      options: [
        { ar: 'بيانات سلوكك السابق: شفت إيه وقعدت قد إيه', en: 'Your past behavior: what you watched and for how long' },
        { ar: 'إنه بيسمعك من مايك الموبايل طول الوقت', en: 'It listens to you through the phone mic all the time' },
        { ar: 'إن كل المستخدمين بيظهرلهم نفس الفيديوهات', en: 'Every user is shown exactly the same videos' },
        { ar: 'إن الفيديوهات بتترتّب عشوائيًا كل مرة', en: 'Videos are ordered randomly every time' },
      ],
      answer: 0,
      explain: { ar: 'نظام التوصية بيتنبّأ بتفضيلاتك من __بيانات سلوكك السابق__ ويعرض حاجات شبهها.', en: 'A recommender predicts your taste from __your past behavior data__ and shows similar items.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'فتح قفل الموبايل بوشّك مثال على التعرف على الوجه.', en: 'Unlocking your phone with your face is face recognition.' }, answer: true },
        { text: { ar: 'الترجمة الآلية لازم مترجم إنسان يراجع كل جملة عشان تشتغل.', en: 'Machine translation needs a human to check every sentence to work.' }, answer: false, explain: { ar: 'الترجمة الآلية بتترجم __تلقائيًا__ (زي Google Translate) — وإن كانت المراجعة مفيدة في الحاجات المهمة.', en: 'It translates __automatically__ (e.g. Google Translate) — though checking helps for important texts.' } },
        { text: { ar: 'المساعد الصوتي بيتعرّف على الصوت ويفهم الأمر وينفّذه.', en: 'A voice assistant recognizes speech, understands and executes the command.' }, answer: true },
        { text: { ar: 'أنظمة التوصية بتعرض لكل المستخدمين نفس التوصيات بالضبط.', en: 'Recommenders show every user exactly the same suggestions.' }, answer: false, explain: { ar: 'التوصيات __مخصّصة لكل شخص__ حسب سلوكه.', en: 'Suggestions are __personal__, based on each user’s behavior.' } },
      ],
    }),
  ]);

  RV.addSteps('1-3', 'industry', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'مصنع عنده حسّاسات بتقول «الموتور ده هيعطل خلال أسبوع» فيصلّحوه قبلها. ده اسمه إيه؟', en: 'A factory’s sensors say "this motor will fail within a week", so it is fixed beforehand. What is this called?' },
      options: [
        { ar: 'الصيانة التنبؤية', en: 'Predictive maintenance' },
        { ar: 'أتمتة فحص الجودة', en: 'Automated quality checks' },
        { ar: 'تحسين مسارات التوصيل', en: 'Delivery route optimization' },
        { ar: 'التشخيص بالصور', en: 'Image-based diagnosis' },
      ],
      answer: 0,
      explain: { ar: 'الصيانة التنبؤية = التنبؤ بأعطال الآلة __قبل ما تحصل__.', en: 'Predictive maintenance = predicting machine failures __before they happen__.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'شركة شحن عايزة توفّر بنزين ووقت لعربياتها. الذكاء الاصطناعي يساعدها إزاي؟', en: 'A delivery company wants to save fuel and time. How can AI help?' },
      options: [
        { ar: 'يحسّن مسارات التوصيل لأقصر وأوفر طريق', en: 'Optimize delivery routes to the shortest, cheapest path' },
        { ar: 'يكشف الآفات في المحاصيل قبل ما تنتشر', en: 'Detect crop pests before they spread' },
        { ar: 'يقرا صور الأشعة ويكتشف الأمراض بدري', en: 'Read X-rays and catch diseases early' },
        { ar: 'يفحص جودة كل منتج على خط الإنتاج', en: 'Check the quality of every product on the line' },
      ],
      answer: 0,
      explain: { ar: 'ده استخدام **الخدمات اللوجستية**: __تحسين مسارات التوصيل__. الباقي: زراعة · رعاية صحية · تصنيع.', en: 'That is the **logistics** use: __route optimization__. The others: agriculture · healthcare · manufacturing.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'الذكاء الاصطناعي في الزراعة ممكن يتنبّأ بموعد الحصاد.', en: 'AI in agriculture can predict harvest time.' }, answer: true },
        { text: { ar: 'الصيانة التنبؤية معناها نصلّح الآلة بعد ما تعطل.', en: 'Predictive maintenance means repairing a machine after it breaks.' }, answer: false, explain: { ar: 'بالعكس: نتنبّأ بالعطل __قبل ما يحصل__.', en: 'The opposite: we predict the failure __before it happens__.' } },
        { text: { ar: 'في الرعاية الصحية الذكاء الاصطناعي بيدعم اكتشاف أدوية جديدة.', en: 'In healthcare AI supports discovering new drugs.' }, answer: true },
      ],
    }),
  ]);

  RV.addSteps('1-3', 'caution', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'أنهي مهمة ينفع الذكاء الاصطناعي يعملها لوحده من غير خطر كبير؟', en: 'Which task can AI safely do on its own without major risk?' },
      options: [
        { ar: 'يرتّب آلاف الصور حسب اللي فيها', en: 'Sort thousands of photos by what they show' },
        { ar: 'يقرّر لوحده مين يتعالج الأول في الطوارئ', en: 'Decide alone who is treated first in an emergency' },
        { ar: 'يحكم في قضية ويحدّد مين المذنب', en: 'Judge a court case and decide who is guilty' },
        { ar: 'يرفض أو يقبل قرض من غير أي مراجعة', en: 'Approve or reject a loan with no review at all' },
      ],
      answer: 0,
      explain: { ar: 'الـAI __شاطر في الأنماط والتصنيف__. أما القرارات الأخلاقية والنهائية اللي بتأثر على حياة الناس فلازم __إنسان يراجع ويقرّر__.', en: 'AI is __good at patterns and classification__. Ethical, final decisions that affect lives need __a human to review and decide__.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'نظام رفض طلب قرض، والموظف نفسه مش عارف يقول للعميل السبب. دي أنهي مشكلة؟', en: 'A system rejected a loan and even the employee cannot tell the customer why. Which problem is this?' },
      options: [
        { ar: 'الصندوق الأسود', en: 'The black box' },
        { ar: 'الهلوسة', en: 'Hallucination' },
        { ar: 'حقوق المؤلف', en: 'Copyright' },
        { ar: 'التعرف على الوجه', en: 'Face recognition' },
      ],
      answer: 0,
      explain: { ar: 'الصندوق الأسود: القرار بيطلع، بس __«ليه؟» مستخبي__ جوّه ملايين الأرقام — فصعب نتحقّق أو نحاسب.', en: 'Black box: the decision comes out but __the "why" is hidden__ in millions of numbers — hard to verify or hold anyone accountable.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'في التشخيص الطبي، الذكاء الاصطناعي يقترح والطبيب هو اللي يقرّر.', en: 'In medical diagnosis, AI suggests and the doctor decides.' }, answer: true },
        { text: { ar: 'النموذج الكبير فيه ملايين أو مليارات الأوزان، وده سبب إن «ليه» صعب يتقري.', en: 'Big models hold millions or billions of weights — that is why the "why" is hard to read.' }, answer: true },
        { text: { ar: 'الذكاء الاصطناعي ضعيف في التعرّف على الأنماط في الصور.', en: 'AI is weak at recognizing patterns in images.' }, answer: false, explain: { ar: 'بالعكس — ده من أقوى حاجاته. ضعفه في __الحكم الأخلاقي والقرار النهائي__.', en: 'The opposite — that is one of its strengths. Its weakness is __ethical judgment and final decisions__.' } },
        { text: { ar: 'لو القرار طلع صح، مش مهم نفهم إزاي اتاخد.', en: 'If the decision turned out right, it does not matter how it was made.' }, answer: false, explain: { ar: 'من غير «ليه» __مانقدرش نتحقّق__ إنه صح لسبب صح، ولا نكتشف التحيّز.', en: 'Without the "why" we __cannot verify__ it was right for the right reason, or detect bias.' } },
      ],
    }),
  ]);
})();
