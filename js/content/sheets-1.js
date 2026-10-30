/* =========================================================
 * content/sheets-1.js — printable summaries of chapter 1.
 * Only data: js/screens/sheet.js draws it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('1-1', {
    lead: T('كل مرحلة في تكنولوجيا المعلومات غيّرت المجتمع — مش الأجهزة بس.', 'Each stage of IT changed society — not just the devices.'),
    rows: [
      [{ t: 'flow', ic: '🕰️', title: T('مراحل التطور', 'Stages of development'), items: [
        { ic: '🖥️', h: T('الحاسب', 'Computer'), c: 'slate' },
        { ic: '💻', h: 'PC', c: 'blue' },
        { ic: '🌐', h: T('الإنترنت', 'Internet'), c: 'violet' },
        { ic: '📱', h: T('الموبايل', 'Mobile'), c: 'pink' },
        { ic: '☁️', h: T('السحابة', 'Cloud'), c: 'teal' },
      ] }],
      [
        { t: 'draw', art: 'moore', ic: '📈', title: T('قانون مور', 'Moore’s Law') },
        { t: 'cards', ic: '🧮', title: T('حساب قانون مور', 'Computing it'), cols: 1, items: [
          { h: T('الترانزستورات ×2 كل سنتين تقريبًا', 'Transistors ×2 about every 2 years'), c: 'amber' },
          { h: '`N = N₀ × 2^n`', p: T('n = عدد السنين ÷ 2', 'n = years ÷ 2'), c: 'blue' },
          { h: T('بعد 10 سنين: n = 5 ← ×32', 'After 10 years: n = 5 → ×32'), c: 'green' },
          { h: T('الحد الفيزيائي', 'The physical limit'), p: T('نفق كمومي + تيار تسرّب', 'quantum tunnelling + leakage current'), c: 'red' },
        ] },
      ],
      [{ t: 'cards', ic: '🔄', title: T('خمس تحوّلات في المجتمع', 'Five social transformations'), cols: 5, items: [
        { ic: '💬', h: 'SNS', p: T('تواصل ونشر سريع', 'share fast'), c: 'blue' },
        { ic: '🛒', h: T('تجارة إلكترونية', 'E-commerce'), p: T('بيع وشراء أونلاين', 'buy and sell online'), c: 'amber' },
        { ic: '🏠', h: T('عمل عن بُعد', 'Remote work'), p: T('من أي مكان', 'from anywhere'), c: 'green' },
        { ic: '🎓', h: T('تعلّم أونلاين', 'Online learning'), p: T('دروس عبر النت', 'lessons online'), c: 'violet' },
        { ic: '💳', h: T('دفع غير نقدي', 'Cashless'), p: T('QR ونقود إلكترونية', 'QR, e-money'), c: 'pink' },
      ] }],
      [{ t: 'tree', ic: '🚀', title: T('تقنيات ناشئة', 'Emerging technologies'), root: { h: T('التقنيات الناشئة', 'Emerging tech'), c: 'violet' }, kids: [
        { ic: '🚗', h: T('القيادة الذاتية', 'Self-driving'), p: T('ذكاء اصطناعي + حوسبة طرفية', 'AI + edge computing'), c: 'blue' },
        { ic: '🕶️', h: 'AR', p: T('يضيف فوق الواقع', 'adds to reality'), c: 'amber' },
        { ic: '🥽', h: 'VR', p: T('يستبدل بعالم افتراضي', 'replaces with a virtual world'), c: 'pink' },
        { ic: '⚛️', h: T('الحوسبة الكمومية', 'Quantum'), p: T('تسرّع الحسابات الصعبة', 'speeds hard calculations'), c: 'teal' },
      ] }],
      [
        { t: 'draw', art: 'arvr', ic: '🕶️', title: T('AR ولا VR؟', 'AR or VR?') },
        { t: 'draw', art: 'edge', ic: '🛰️', title: T('طرفية ولا سحابة؟', 'Edge or cloud?') },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الطرفية بتبعت للسحابة قبل القرار', 'Edge sends to the cloud first'), good: T('بتعالج على الجهاز فورًا', 'Processes on the device') },
        { bad: T('AR بيستبدل الواقع بالكامل', 'AR replaces reality'), good: T('ده VR؛ AR بيضيف', 'That is VR; AR adds') },
        { bad: T('VR بيحسّن سرعة المعالجة', 'VR speeds up processing'), good: T('خلط مع الحوسبة الكمومية', 'Confused with quantum') },
      ] }],
    ],
  });

  RV.addSheet('1-2', {
    lead: T('الذكاء الاصطناعي مش تقنية واحدة: فئات جوّه بعض، وكل فئة بتعتمد على اللي برّاها.', 'AI is not one technology: categories inside each other.'),
    rows: [
      [
        { t: 'nest', ic: '🎯', title: T('فئات متداخلة', 'Nested categories'), w: 1.15, items: [
          { h: T('الذكاء الاصطناعي (AI)', 'Artificial intelligence (AI)'), p: T('سلوك إنساني ذكي على الحاسب', 'intelligent human behaviour on a computer'), c: 'violet' },
          { h: T('التعلّم الآلي (ML)', 'Machine learning (ML)'), p: T('يتعلّم أنماط من البيانات', 'learns patterns from data'), c: 'blue' },
          { h: T('التعلّم العميق (DL)', 'Deep learning (DL)'), p: T('شبكات عصبية + بيانات ضخمة', 'neural networks + big data'), c: 'teal' },
          { h: T('الذكاء التوليدي', 'Generative AI'), p: T('يولّد محتوى جديد', 'generates new content'), c: 'amber' },
        ] },
        { t: 'draw', art: 'nn', ic: '🧠', title: T('الشبكة العصبية', 'Neural network'), cap: T('مكوّنات كتير متوصّلة بتتعلّم من البيانات', 'Many connected parts learning from data') },
      ],
      [{ t: 'flow', ic: '🧩', title: T('الذكاء بيتكوّن من إيه؟', 'What intelligent behaviour means'), items: [
        { ic: '📚', h: T('تعلّم', 'Learning'), c: 'blue' },
        { ic: '🧠', h: T('استدلال', 'Reasoning'), c: 'violet' },
        { ic: '⚖️', h: T('حكم', 'Judgment'), c: 'green' },
      ] }],
      [{ t: 'compare', ic: '🔍', title: T('الفرق بين الفئات', 'How they differ'),
        cols: [{ h: 'ML', c: 'blue' }, { h: 'DL', c: 'teal' }, { h: T('توليدي', 'GenAI'), c: 'amber' }],
        rows: [
          { k: T('بيعمل إيه', 'Does'), v: [T('تنبؤ وحكم من الأنماط', 'predict and judge from patterns'), T('أحكام معقّدة بالشبكات العصبية', 'complex judgments with neural networks'), T('نص · صورة · صوت · برامج', 'text · image · audio · code')] },
          { k: T('بيعتمد على', 'Relies on'), v: [T('البيانات', 'data'), T('بيانات ضخمة', 'big data'), T('التعلّم العميق', 'deep learning')] },
        ] }],
      [{ t: 'flow', ic: '💬', title: T('إزاي تستخدم التوليدي صح', 'Using generative AI well'), items: [
        { ic: '✍️', h: T('طلب واضح', 'Clear prompt'), p: 'prompt', c: 'blue' },
        { ic: '🤖', h: T('رد النموذج', 'Model reply'), c: 'violet' },
        { ic: '🔎', h: T('راجع المصدر', 'Check the source'), p: T('ممكن يهلوس', 'it may hallucinate'), c: 'red' },
        { ic: '✅', h: T('استخدم بفهم', 'Use with understanding'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '🌀', c: 'red', p: T('**الهلوسة:** النموذج التوليدي بيطلّع نص يبدو معقول لكنه غلط ← راجع المصدر دايمًا.', '**Hallucination:** a generative model outputs plausible but wrong text → always check the source.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('AI وML وDL أربع تقنيات منفصلة', 'They are four separate technologies'), good: T('فئات متداخلة', 'Nested categories') },
        { bad: T('التعلّم العميق برّه التعلّم الآلي', 'DL is outside ML'), good: T('تقنية متقدّمة جوّاه', 'An advanced technique inside it') },
      ] }],
    ],
  });

  RV.addSheet('1-3', {
    lead: T('الذكاء الاصطناعي شاطر في الأنماط والتنبؤ — والقرار الحسّاس محتاج إنسان.', 'AI excels at patterns and prediction — sensitive decisions need a human.'),
    rows: [
      [{ t: 'cards', ic: '🏠', title: T('في حياتنا اليومية', 'In daily life'), cols: 4, items: [
        { ic: '🎬', h: T('الترشيحات', 'Recommendations'), p: T('تنبؤ بالتفضيلات من السلوك', 'predict tastes from behaviour'), c: 'blue' },
        { ic: '🎙️', h: T('المساعد الصوتي', 'Voice assistant'), p: T('يتعرّف ويفهم وينفّذ', 'recognizes, understands, acts'), c: 'violet' },
        { ic: '🌍', h: T('الترجمة الآلية', 'Machine translation'), p: T('تلقائيًا للغات مختلفة', 'automatically across languages'), c: 'green' },
        { ic: '🙂', h: T('التعرف على الوجه', 'Face recognition'), p: T('يكتشف الوجوه في الصور', 'detects faces in images'), c: 'pink' },
      ] }],
      [{ t: 'flow', ic: '🎙️', title: T('مثال: المساعد الصوتي', 'Example: a voice assistant'), items: [
        { ic: '🗣️', h: T('صوت', 'Voice'), c: 'slate' },
        { ic: '📝', h: T('يتعرّف على الكلام', 'Recognizes speech'), c: 'blue' },
        { ic: '🧠', h: T('يفهم الأمر', 'Understands'), c: 'violet' },
        { ic: '⚙️', h: T('ينفّذ', 'Acts'), c: 'green' },
      ] }],
      [{ t: 'tree', ic: '🏭', title: T('في الصناعة', 'In industry'), root: { h: T('الذكاء الاصطناعي في الصناعة', 'AI in industry'), c: 'teal' }, kids: [
        { ic: '🏥', h: T('الصحة', 'Health'), p: T('تشخيص بالصور', 'image diagnosis'), c: 'red' },
        { ic: '🌾', h: T('الزراعة', 'Agriculture'), p: T('حصاد ومكافحة آفات', 'harvest and pests'), c: 'green' },
        { ic: '🏭', h: T('التصنيع', 'Manufacturing'), p: T('جودة + صيانة تنبؤية', 'quality + predictive maintenance'), c: 'amber' },
        { ic: '🚚', h: T('اللوجستيات', 'Logistics'), p: T('أحسن المسارات', 'best routes'), c: 'blue' },
      ] }],
      [{ t: 'compare', ic: '⚖️', title: T('شاطر في إيه؟ ومحتاج حذر في إيه؟', 'Strong at… careful with…'),
        cols: [{ ic: '✅', h: T('شاطر في', 'Strong at'), c: 'green' }, { ic: '⚠️', h: T('محتاج حذر في', 'Careful with'), c: 'red' }],
        rows: [
          { k: T('المهام', 'Tasks'), v: [T('الأنماط · التعرّف · التنبؤ', 'patterns · recognition · prediction'), T('الأخلاق · الخصوصية · القرار النهائي', 'ethics · privacy · the final decision')] },
          { k: T('الدور', 'Role'), v: [T('بيساعد ويقترح', 'helps and suggests'), T('الإنسان يراجع في المهام الحسّاسة', 'a human reviews sensitive tasks')] },
        ] }],
      [{ t: 'flow', ic: '⬛', title: T('مشكلة الصندوق الأسود', 'The black-box problem'), items: [
        { ic: '📥', h: T('بيانات', 'Data'), c: 'slate' },
        { ic: '⬛', h: T('النموذج', 'Model'), p: T('مش واضح إزاي قرّر', 'how it decided is unclear'), c: 'slate', solid: true },
        { ic: '📤', h: T('قرار', 'Decision'), c: 'amber' },
        { ic: '🧑‍⚕️', h: T('إنسان يراجع', 'A human reviews'), p: T('في المهام الحسّاسة', 'in sensitive tasks'), c: 'green' },
      ] }],
    ],
  });

  RV.addSheet('1-4', {
    lead: T('القوة من غير ضوابط خطر: التحيّز والخصوصية والمسؤولية، وأربع مبادئ بتحكم الاستخدام.', 'Power without rules is risky: bias, privacy, responsibility and four guiding principles.'),
    rows: [
      [{ t: 'flow', ic: '⚖️', title: T('التحيّز الخوارزمي بييجي منين؟', 'Where algorithmic bias comes from'), items: [
        { ic: '🗃️', h: T('بيانات تدريب متحيّزة', 'Biased training data'), p: T('ناقصة أو فيها تمييز قديم', 'incomplete or old discrimination'), c: 'red' },
        { ic: '🤖', h: T('النموذج يتعلّم', 'The model learns'), c: 'violet' },
        { ic: '⚠️', h: T('أحكام متحيّزة', 'Biased judgments'), c: 'amber' },
      ] }],
      [{ t: 'note', ic: '🔍', c: 'amber', p: T('وكمان التحيّز ممكن ييجي من **اختيار المتغيرات** أو **المتغير الوسيط** أو **تصميم النموذج**.', 'Bias can also come from **variable choice**, a **proxy variable** or **model design**.') }],
      [
        { t: 'cards', ic: '🔒', title: T('قضايا كبيرة', 'Big issues'), cols: 1, items: [
          { ic: '👁️', h: T('الخصوصية', 'Privacy'), p: T('مراقبة بالتعرف على الوجه + جمع ضخم للبيانات الشخصية', 'face-recognition surveillance + mass data collection'), c: 'blue' },
          { ic: '🧾', h: T('المسؤولية', 'Responsibility'), p: T('بين المطوّر والمستخدم والمشغّل — لسه من غير معيار واضح', 'developer, user or operator — no clear standard yet'), c: 'amber' },
        ] },
        { t: 'flow', ic: '💡', title: T('من الصندوق الأسود للتفسير', 'From black box to explanation'), w: 1.3, items: [
          { ic: '⬛', h: T('صندوق أسود', 'Black box'), p: T('القرار من غير سبب', 'a decision with no reason'), c: 'slate' },
          { ic: '🔦', h: 'XAI', p: T('بيفسّر «ليه»', 'explains “why”'), c: 'amber' },
          { ic: '🤝', h: T('ثقة ومراجعة', 'Trust and review'), c: 'green' },
        ] },
      ],
      [{ t: 'cycle', ic: '🧭', title: T('المبادئ الأربعة', 'The four principles'), center: T('استخدام مسؤول', 'Responsible use'), items: [
        { ic: '⚖️', h: T('العدالة', 'Fairness'), c: 'blue' },
        { ic: '🔎', h: T('الشفافية', 'Transparency'), c: 'violet' },
        { ic: '🔒', h: T('الخصوصية', 'Privacy'), c: 'green' },
        { ic: '🧾', h: T('المساءلة', 'Accountability'), c: 'amber' },
      ] },
      { t: 'cards', ic: '📘', title: T('يعني إيه كل مبدأ؟', 'What each means'), cols: 1, items: [
        { h: T('العدالة', 'Fairness'), p: T('عدم التمييز ظلمًا ضد أي شخص أو مجموعة', 'no unfair discrimination'), c: 'blue' },
        { h: T('الشفافية', 'Transparency'), p: T('إظهار عملية القرار بوضوح', 'show how decisions are made'), c: 'violet' },
        { h: T('حماية الخصوصية', 'Privacy protection'), p: T('التعامل المناسب مع المعلومات الشخصية', 'handle personal data properly'), c: 'green' },
        { h: T('المساءلة', 'Accountability'), p: T('حد مسؤول وقابل للمحاسبة', 'someone answerable'), c: 'amber' },
      ] }],
    ],
  });
})();
