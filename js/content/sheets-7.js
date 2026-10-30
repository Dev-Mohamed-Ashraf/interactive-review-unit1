/* =========================================================
 * content/sheets-7.js — printable summaries of chapter 7.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('7-1', {
    lead: T('تعلّم الآلة بيلاقي القواعد من البيانات — أداة بتدعم حكم الإنسان مش بديل عنه.', 'Machine learning finds the rules in data — a tool that supports human judgment, not a replacement.'),
    rows: [
      [
        { t: 'flow', ic: '👨‍💻', title: T('البرمجة التقليدية', 'Conventional programming'), items: [
          { ic: '📜', h: T('قواعد + بيانات', 'Rules + data'), p: T('الإنسان يكتب القواعد', 'humans give the rules'), c: 'slate' },
          { ic: '💻', h: T('إجابات', 'Answers'), c: 'blue' },
        ] },
        { t: 'flow', ic: '🤖', title: T('تعلّم الآلة', 'Machine learning'), items: [
          { ic: '🗃️', h: T('بيانات + إجابات', 'Data + answers'), p: T('أمثلة كتير', 'many examples'), c: 'violet' },
          { ic: '💻', h: T('القواعد', 'The rules'), p: T('الجهاز يلاقيها', 'found by the machine'), c: 'green' },
        ] },
      ],
      [{ t: 'compare', ic: '🎯', title: T('بينفع في إيه؟', 'Where it fits'),
        cols: [{ ic: '✅', h: T('بينفع', 'Fits'), c: 'green' }, { ic: '✗', h: T('مش محتاج', 'Not needed'), c: 'red' }],
        rows: [{ k: T('أمثلة', 'Examples'), v: [T('صورة كلب ولا قطة؟ · إيميل مزعج؟ · صوت ← نص', 'dog or cat? · spam? · speech → text'), T('جمع رقمين: قاعدة بسيطة', 'adding two numbers: a simple rule')] }] }],
      [{ t: 'tree', ic: '🧭', title: T('تلات أنواع للتعلّم', 'Three kinds of learning'), root: { h: T('الاختيار حسب البيانات والمشكلة', 'Choose by data and problem'), c: 'violet' }, kids: [
        { ic: '🏷️', h: T('خاضع للإشراف', 'Supervised learning'), p: T('إدخال + إجابة (وسم) ← يتنبّأ', 'input + answer (label) → predict'), list: [T('عندك إجابات قديمة؟', 'have past answers?')], c: 'blue' },
        { ic: '📦', h: T('غير خاضع للإشراف', 'Unsupervised learning'), p: T('من غير إجابات ← بنية ومجموعات', 'no answers → structure, groups'), list: [T('عايز تكتشف مجموعات؟', 'want to find groups?')], c: 'green' },
        { ic: '🎮', h: T('التعلّم المعزَّز', 'Reinforcement learning'), p: T('أفعال ونتايجها (مكافآت)', 'actions and rewards'), list: [T('تجربة وخطأ؟', 'trial and error?')], c: 'amber' },
      ] }],
      [
        { t: 'draw', art: 'classify', ic: '🏷️', title: T('التصنيف (إشراف)', 'Classification (supervised)'), cap: T('① تدريب: أوسمة ← حد فاصل ② تنبّؤ: فئة بيانات جديدة', '① Training: labels → a boundary ② Prediction: class of new data') },
        { t: 'draw', art: 'cluster', ic: '📦', title: T('التجميع (غير إشراف)', 'Clustering (unsupervised)'), cap: T('الجهاز يلاقي «إيه المتشابه» · البشر يفسّروا', 'The machine finds similarity · humans interpret') },
        { t: 'draw', art: 'grid', ic: '🎮', title: T('المعزَّز', 'Reinforcement'), cap: T('الحالة · الفعل · المكافأة (−5 / +10)', 'State · action · reward (−5 / +10)') },
      ],
      [{ t: 'compare', ic: '🔍', title: T('أمثلة كل نوع', 'Examples of each'),
        cols: [{ h: T('التصنيف', 'Classification'), c: 'blue' }, { h: T('التجميع', 'Clustering'), c: 'green' }, { h: T('المعزَّز', 'Reinforcement'), c: 'amber' }],
        rows: [
          { k: '1', v: [T('إيميل مزعج/عادي', 'spam/normal mail'), T('عملاء بشراء متشابه', 'customers with similar buying'), T('درجة عالية في لعبة', 'a high game score')] },
          { k: '2', v: [T('صورة طبية طبيعية/غير طبيعية', 'normal/abnormal medical image'), T('مستمعين ← ترشيحات', 'listeners → recommendations'), T('روبوت يتعلّم يمشي', 'a robot learns to walk')] },
          { k: '3', v: [T('كلب/قطة/طائر', 'dog/cat/bird'), T('مقالات متشابهة', 'similar news articles'), T('قيادة آمنة', 'safe driving')] },
        ] }],
      [{ t: 'note', ic: '🔎', c: 'blue', p: T('**السمة (Feature):** دليل في البيانات مفيد للتنبّؤ — نوع الكلمات · عنوان المرسِل · طول النص. واختيارها بيأثّر جامد على الدقة.', 'A **feature** is a clue useful for prediction — words · sender · text length. Choosing features strongly affects accuracy.') }],
      [{ t: 'flow', ic: '⚖️', title: T('الحدود', 'The limits'), items: [
        { ic: '🗃️', h: T('التحيّز', 'Bias'), p: T('بيانات متحيّزة ← أحكام متحيّزة', 'biased data → biased judgments'), c: 'red' },
        { ic: '🙊', h: T('مثال', 'Example'), p: T('اتعلّم «مين بيطلب» مش «مين محتاج»', 'learned “who asks”, not “who needs”'), c: 'amber' },
        { ic: '⬛', h: T('مشكلة الصندوق الأسود', 'Black-box problem'), p: T('أساس الحكم صعب يتشاف', 'its basis is hard to see'), c: 'slate' },
        { ic: '🧑‍⚖️', h: T('إنسان في الحلقة', 'Human in the loop'), p: T('النموذج يقترح والإنسان يقرّر', 'the model suggests, a human decides'), c: 'green' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الإشراف من غير أوسمة', 'Supervised has no labels'), good: T('بأوسمة', 'It has labels') },
        { bad: T('التجميع حسب أوسمة مدّية', 'Clustering uses given labels'), good: T('من غير أوسمة', 'No labels') },
        { bad: T('حل لكل حاجة وأحسن من الإنسان', 'It solves all, better than humans'), good: T('أداة بتدعم الإنسان', 'A tool supporting humans') },
        { bad: T('أساس الحكم بيتعرض بسهولة', 'Its basis is easy to show'), good: T('صندوق أسود', 'A black box') },
      ] }],
    ],
  });

  RV.addSheet('7-2', {
    lead: T('خلايا بسيطة متوصّلة في طبقات، والتدريب بيظبط أوزانها — والعمق بيبني السمات خطوة خطوة.', 'Simple cells in layers, training tunes their weights — and depth builds features step by step.'),
    rows: [
      [
        { t: 'draw', art: 'nn', ic: '🧠', title: T('الشبكة العصبية', 'The neural network'), w: 1.2, cap: T('عُقد متوصّلة · عدد الطبقات حسب صعوبة المشكلة', 'Connected nodes · layers depend on the problem’s difficulty') },
        { t: 'vflow', ic: '🧱', title: T('الطبقات', 'The layers'), items: [
          { h: T('طبقة الإدخال', 'Input layer'), p: T('تستقبل البيانات من برّه', 'receives outside data'), c: 'blue' },
          { h: T('الطبقات المخفية', 'Hidden layers'), p: T('تعالج وتستخرج السمات', 'process, extract features'), c: 'violet' },
          { h: T('طبقة الإخراج', 'Output layer'), p: T('تطلّع الإجابة: كلب ولا قطة', 'gives the answer: dog or cat'), c: 'green' },
        ] },
      ],
      [
        { t: 'draw', art: 'neuron', ic: '⚪', title: T('خلية عصبية واحدة', 'One neuron') },
        { t: 'formula', w: 1.35, f: '0.9×1 + 0.2×0 + (−0.7)×1 + 0.1 = 0.3', p: T('المدخلات × الأوزان ← مجموع ← دالة تنشيط ← الطبقة الجاية', 'inputs × weights → sum → activation function → next layer'), ex: T('الوزن: قد إيه بنركّز على المدخل (موجب/سالب، الأكبر أقوى)', 'Weight: how much an input counts (+/−, larger is stronger)') },
      ],
      [{ t: 'note', ic: '⚡', c: 'amber', p: T('**دالة التنشيط** بتخلّي الشبكة تتعلّم علاقات مش تناسبية بس.', 'The **activation function** lets the network learn non-proportional relationships.') }],
      [{ t: 'flow', ic: '🔧', title: T('التدريب = ظبط الأوزان', 'Training = tuning weights'), items: [
        { ic: '🎲', h: T('قبل التدريب', 'Before'), p: T('أوزان عشوائية', 'random weights'), c: 'red' },
        { ic: '🔧', h: T('أثناء التدريب', 'During'), p: T('تتظبط شوية شوية حسب الفرق بين التنبّؤ والإجابة', 'adjusted by the gap to the right answer'), c: 'amber' },
        { ic: '✅', h: T('بعد التدريب', 'After'), p: T('صح حتى على بيانات جديدة', 'right even on new data'), c: 'green' },
      ] }],
      [{ t: 'draw', art: 'features', ic: '🪜', title: T('التعلّم العميق: سمات هرمية', 'Deep learning: hierarchical features'), cap: T('الطبقات الضحلة: خطوط وتغيّر ألوان ← الوسطى: أجزاء (عيون، أنف، حلقات) ← العميقة: الوجه أو الرقم كله', 'Shallow: lines, colour changes → middle: parts (eyes, nose, loops) → deep: the whole face or digit') }],
      [
        { t: 'link', ic: '🚀', title: T('إيه اللي خلّاه عملي؟', 'What made it practical'), w: 1.3, nodes: [
          { ic: '🗃️', h: T('بيانات كتير', 'Big data'), c: 'blue' },
          { ic: '🖥️', h: T('قدرة حسابية', 'Computing power'), p: 'GPU · TPU', c: 'amber' },
          { ic: '✅', h: T('عملي', 'Practical'), c: 'green' },
        ], edges: [{ sign: '+' }, { sign: '=' }] },
        { t: 'note', ic: '⚠️', c: 'red', p: T('**فرط التخصيص:** عمق أكتر مش ضمان — الشبكة تحفظ الأمثلة وتطارد الضوضاء ومايعمّمش. اتأكّد إن البيانات كفاية ومتنوّعة.', '**Overfitting:** more depth guarantees nothing — it memorizes and chases noise. Ensure data is enough and varied.') },
      ],
      [{ t: 'cards', ic: '📈', title: T('القفزة: دقة قريبة من البشر أو أعلى', 'The leap: near-human accuracy or better'), cols: 3, items: [
        { ic: '🖼️', h: T('التعرّف على الصور', 'Image recognition'), p: T('وجوه · صور طبية · كشف أجسام للعربيات', 'faces · medical images · object detection'), c: 'blue' },
        { ic: '🎙️', h: T('التعرّف على الكلام', 'Speech recognition'), p: T('سماعات ذكية · تفريغ · ترجمة كلام', 'smart speakers · transcription · speech translation'), c: 'violet' },
        { ic: '💬', h: T('معالجة اللغة الطبيعية', 'Natural language processing'), p: T('ترجمة آلية · تلخيص · إجابة أسئلة', 'translation · summarizing · Q&A'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '🤖', c: 'blue', p: T('**قبل وبعد:** زمان البشر بيصمّموا السمات واحدة واحدة، ودلوقتي بتتعلّم تلقائيًا — وده مهّد للذكاء التوليدي. وظيفة الخلية بسيطة، بس خلايا كتير مع بعض بتخلّي الأحكام المعقّدة ممكنة.', '**Before and after:** humans once designed features by hand; now they are learned — paving the way for generative AI. One cell is simple; many together make complex judgments possible.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('طبقة الإدخال بتطلّع النتايج', 'The input layer gives results'), good: T('دي الإخراج', 'That is the output') },
        { bad: T('التعلّم العميق بطبقة مخفية واحدة', 'Deep learning has one hidden layer'), good: T('طبقات مخفية كتير', 'Many hidden layers') },
        { bad: T('الأوزان مظبوطة قبل التدريب', 'Weights are set before training'), good: T('عشوائية', 'Random') },
        { bad: T('زيادة الطبقات مابتغيّرش صعوبة المشاكل', 'Layers do not affect problem difficulty'), good: T('المشكلة الأصعب محتاجة أكتر', 'Harder problems need more') },
      ] }],
    ],
  });

  RV.addSheet('7-3', {
    lead: T('بيتنبّأ بالكلمة المحتملة ويكرّر — الطلاقة مش الصدق، فاتحقّق دايمًا.', 'It predicts the likely word and repeats — fluency is not truth, so always verify.'),
    rows: [
      [
        { t: 'draw', art: 'nextword', ic: '🔮', title: T('نموذج اللغة: التنبؤ بالكلمة الجاية', 'Language model: next-word prediction') },
        { t: 'vflow', ic: '🔁', title: T('توليد النص', 'Generating text'), items: [
          { h: T('يحسب احتمال كل كلمة مرشّحة', 'Scores each candidate word'), c: 'violet' },
          { h: T('يختار حسب الاحتمال', 'Picks by probability'), c: 'blue' },
          { h: T('يكرّر: «مشمس» ← «و» ← «دافئ»', 'Repeats: “sunny” → “and” → “warm”'), c: 'green' },
        ] },
      ],
      [{ t: 'flow', ic: '🌀', title: T('الهلوسة: ليه بتحصل؟', 'Hallucination: why it happens'), items: [
        { ic: '🎲', h: T('بيختار المحتمل', 'Picks the likely'), p: T('مش الكلمة الصحيحة', 'not the correct word'), c: 'amber' },
        { ic: '💬', h: T('رد مقنع', 'A convincing reply'), p: T('مسجد ابن طولون: تاريخ بثقة كاملة', 'Ibn Tulun Mosque: a date, fully confident'), c: 'blue' },
        { ic: '❌', h: T('مخالف للحقيقة', 'Factually wrong'), c: 'red' },
        { ic: '🔍', h: T('اتحقّق', 'Verify'), p: T('كل تاريخ واسم ورقم ادعاء', 'every date, name, number is a claim'), c: 'green' },
      ] }],
      [{ t: 'cards', ic: '🏔️', title: T('نموذج اللغة الكبير (LLM): «كبير» = حاجتين', 'Large language model (LLM): “large” = two things'), cols: 2, items: [
        { ic: '📚', h: T('كمية بيانات التدريب', 'Amount of training data'), p: T('نصوص إنترنت: مليارات لتريليونات كلمة (Tokens)', 'Internet text: billions to trillions of words (tokens)'), c: 'blue' },
        { ic: '⚙️', h: T('عدد المعلمات', 'Number of parameters'), p: T('قيم الأوزان: مليارات لتريليونات', 'weight values: billions to trillions'), c: 'violet' },
      ] }],
      [{ t: 'note', ic: '✨', c: 'amber', p: T('**لما الحجم يعدّي مقياس معيّن** بتظهر قدرات جديدة: استدلال معقّد · تلخيص · ترجمة · توليد كود. ومن خدماته: ChatGPT · Claude · Gemini.', '**Past a certain scale** new abilities appear: complex reasoning · summarizing · translation · code. Services: ChatGPT · Claude · Gemini.') }],
      [{ t: 'flow', ic: '👍', title: T('الضبط بـ RLHF: التعلّم المعزَّز من التغذية الراجعة البشرية', 'Tuning by RLHF: reinforcement learning from human feedback'), items: [
        { ic: '📚', h: T('① تدريب أولي', '① Initial training'), p: T('استخدام اللغة من نصوص كتير', 'language use from lots of text'), c: 'blue' },
        { ic: '👍', h: T('② تقييم بشري', '② Human evaluation'), p: T('أنهي رد أحسن؟', 'which reply is better?'), c: 'amber' },
        { ic: '🏆', h: T('③ ضبط معزَّز', '③ RL tuning'), p: T('التقييم = مكافأة', 'rating = reward'), c: 'green' },
      ] }],
      [
        { t: 'compare', ic: '⚖️', title: T('RLHF بيصلّح إيه ومابيصلّحش إيه؟', 'What RLHF fixes and does not'), w: 1.2,
          cols: [{ ic: '✅', h: T('بيحسّن', 'Improves'), c: 'green' }, { ic: '✗', h: T('مابيضمنش', 'Does not guarantee'), c: 'red' }],
          rows: [
            { k: '1', v: [T('الأسلوب · ردود طبيعية ومهذّبة', 'style · natural, polite replies'), T('الحقيقة', 'truth')] },
            { k: '2', v: [T('إتباع التعليمات وقصد السؤال', 'following instructions and intent'), T('الأمان الكامل', 'full safety')] },
            { k: '3', v: [T('جزء من الأمان', 'part of safety'), T('معتمد على المقيّمين والتصميم', 'depends on raters and design')] },
          ] },
        { t: 'draw', art: 'hub', ic: '🎛️', title: T('تعدّد الوسائط', 'Multimodality'), cap: T('كل نوع بيانات = وسيط · تمثيل عددي موحّد جوّه الشبكة', 'Each data type = a modality · one numeric form inside the network') },
      ],
      [{ t: 'note', ic: '🔁', c: 'blue', p: T('**أمثلة تعدّد الوسائط:** صورة ← وصف نصي · صوت ← تفريغ نص · تعليمات نصية ← صورة · تلخيص فيديو.', '**Multimodal examples:** image → text description · audio → transcript · text → image · video summary.') }],
      [{ t: 'cards', ic: '🛡️', title: T('استخدمه بأمان', 'Use it safely'), cols: 2, items: [
        { ic: '✔', h: T('بيوفّر جهد في', 'Saves effort in'), p: T('المسودة · التنظيم · الصياغة', 'drafting · organizing · wording'), c: 'green' },
        { ic: '✘', h: T('ماتثقش زي ما هو في', 'Do not trust as-is'), p: T('التواريخ · الأسماء · الأرقام — إنسان يراجع من مصدر موثوق قبل النشر', 'dates · names · numbers — a person checks a trusted source before publishing'), c: 'red' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('بيرجّع نفس جمل التدريب دايمًا', 'It repeats training sentences'), good: T('بيولّد بتكرار التنبّؤ', 'It generates by repeated prediction') },
        { bad: T('RLHF بيخلّيه يقول الحقيقة دايمًا', 'RLHF makes it always truthful'), good: T('مش بيضمن الحقيقة', 'No truth guarantee') },
        { bad: T('تعدّد الوسائط = نص بس', 'Multimodality = text only'), good: T('نص وصورة وصوت وفيديو', 'Text, image, audio, video') },
        { bad: T('نموذج أكبر = أصدق', 'A bigger model = more truthful'), good: T('أطلق، مش بالضرورة أصدق', 'More fluent, not more truthful') },
      ] }],
    ],
  });
})();
