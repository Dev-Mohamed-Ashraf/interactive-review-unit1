/* =========================================================
 * content/sheets-7.js — printable summaries of chapter 7.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('7-1', {
    lead: T('التعلّم الآلي بيستخرج القواعد من البيانات — أداة بتدعم حكم الإنسان مش بديل عنه.', 'Machine learning finds the rules in data — a tool that supports human judgment, not a replacement.'),
    rows: [
      [
        { t: 'flow', ic: '👨‍💻', title: T('البرمجة التقليدية', 'Conventional programming'), items: [
          { ic: '📜', h: T('قواعد + بيانات', 'Rules + data'), p: T('الإنسان يكتب القواعد', 'humans give the rules'), c: 'slate' },
          { ic: '💻', h: T('إجابات', 'Answers'), c: 'blue' },
        ] },
        { t: 'flow', ic: '🤖', title: T('التعلّم الآلي', 'Machine learning'), items: [
          { ic: '🗃️', h: T('بيانات + إجابات', 'Data + answers'), p: T('كميات كبيرة وأمثلة صحيحة', 'many examples'), c: 'violet' },
          { ic: '💻', h: T('القواعد', 'The rules'), p: T('الجهاز يلاقيها', 'found by the machine'), c: 'green' },
        ] },
      ],
      [{ t: 'compare', ic: '🎯', title: T('بينفع في إيه؟', 'Where it fits'),
        cols: [{ ic: '✅', h: T('بينفع', 'Fits'), c: 'green' }, { ic: '✗', h: T('مش محتاج', 'Not needed'), c: 'red' }],
        rows: [{ k: T('أمثلة', 'Examples'), v: [T('صورة كلب ولا قطة؟ · إيميل مزعج؟ · صوت ← نص', 'dog or cat? · spam? · speech → text'), T('جمع رقمين: قاعدة بسيطة', 'adding two numbers: a simple rule')] }] }],
      [{ t: 'note', ic: '🧑‍💻', c: 'amber', p: T('**البشر** بيحددوا المهمة والبيانات والهدف والتقييم. و**زيادة البيانات لوحدها** مش بتضمن التحسن: الأداء حسب جودتها وتمثيلها والتدريب والتقييم.', '**Machine learning** is the most common way to make AI work, used where rules are too complex for humans to write out. It is not a panacea.') }],
      [{ t: 'tree', ic: '🧭', title: T('تلات أنواع رئيسية (وفيه أساليب تانية)', 'Three kinds of learning'), root: { h: T('الاختيار حسب البيانات والمشكلة', 'Choose by data and problem'), c: 'violet' }, kids: [
        { ic: '🏷️', h: T('خاضع للإشراف', 'Supervised learning'), p: T('مدخلات + قيم أو فئات مستهدفة (وسوم) ← نموذج يتنبّأ', 'input + answer (label) → predict'), list: [T('عندك إجابات قديمة؟', 'have past answers?')], c: 'blue' },
        { ic: '📦', h: T('غير خاضع للإشراف', 'Unsupervised learning'), p: T('من غير قيم مستهدفة ← أنماط أو بنية أو مجموعات محتملة', 'no answers → structure, groups'), list: [T('عايز تكتشف مجموعات؟', 'want to find groups?')], c: 'green' },
        { ic: '🎮', h: T('التعلّم المعزَّز', 'Reinforcement learning'), p: T('حالات وأفعال ومكافآت ← سياسة لأفضل النتائج مع الزمن', 'actions and rewards'), list: [T('تقدر تعرّف مكافأة ويتفاعل وكيل مع بيئة؟', 'trial and error?')], c: 'amber' },
      ] }],
      [
        { t: 'draw', art: 'classify', ic: '🏷️', title: T('التصنيف (إشراف)', 'Classification (supervised)'), cap: T('① تدريب: أوسمة ← حد فاصل ② تنبّؤ: فئة بيانات جديدة', '① Training: labels → a boundary ② Prediction: class of new data') },
        { t: 'draw', art: 'cluster', ic: '📦', title: T('التجميع (غير إشراف)', 'Clustering (unsupervised)'), cap: T('عناقيد حسب السمات ومقياس التشابه · بنية محتملة مش مجموعات طبيعية مؤكدة · k-means يحدد العدد مسبقًا · البشر يفسّروا', 'The machine finds “what is similar”, even with group names and number unknown · humans interpret, e.g. for marketing') },
        { t: 'draw', art: 'grid', ic: '🎮', title: T('المعزَّز', 'Reinforcement'), cap: T('وكيل: الحالة · الفعل · المكافأة (−5 / +10) · بيئة آمنة زي المحاكاة والألعاب', 'Agent: state · action · reward (−5 / +10) · right answer unknown, result can be judged · simulators, games') },
      ],
      [{ t: 'compare', ic: '🔍', title: T('أمثلة كل نوع', 'Examples of each'),
        cols: [{ h: T('التصنيف', 'Classification'), c: 'blue' }, { h: T('التجميع', 'Clustering'), c: 'green' }, { h: T('المعزَّز', 'Reinforcement'), c: 'amber' }],
        rows: [
          { k: '1', v: [T('إيميل مزعج/عادي', 'spam/normal mail'), T('عملاء بشراء متشابه', 'customers with similar buying'), T('درجة عالية في لعبة', 'a high game score')] },
          { k: '2', v: [T('صورة طبية طبيعية/غير طبيعية', 'normal/abnormal medical image'), T('مستمعين ← ترشيحات', 'listeners → recommendations'), T('روبوت يتعلّم يمشي', 'a robot learns to walk')] },
          { k: '3', v: [T('كلب/قطة/طائر', 'dog/cat/bird'), T('مقالات متشابهة', 'similar news articles'), T('قيادة آمنة', 'safe driving')] },
        ] }],
      [{ t: 'note', ic: '🔎', c: 'blue', p: T('**السمة (Feature):** دليل في البيانات مفيد للتنبّؤ — نوع الكلمات · عنوان المرسِل · طول النص. بعضها يحدده المطوّر وبعض النماذج تتعلّم تمثيلاتها تلقائيًا، ونتجنب تسرب البيانات والتحيّز.', 'A **feature** is a clue useful for prediction — words · sender · text length. Choosing features strongly affects accuracy.') }],
      [{ t: 'flow', ic: '⚖️', title: T('الحدود', 'The limits'), items: [
        { ic: '🗃️', h: T('التحيّز', 'Bias'), p: T('بيانات غير ممثلة ← فروق غير عادلة أو دقة أقل', 'biased data → biased judgments'), c: 'red' },
        { ic: '🙊', h: T('مثال', 'Example'), p: T('اتعلّم «مين بيطلب» مش «مين محتاج»', 'learned “who asks”, not “who needs”'), c: 'amber' },
        { ic: '⬛', h: T('مشكلة الصندوق الأسود', 'Black-box problem'), p: T('أساس الحكم صعب يتشاف', 'its basis is hard to see'), c: 'slate' },
        { ic: '🧑‍⚖️', h: T('إنسان في الحلقة', 'Human in the loop'), p: T('شخص يراجع أو يوافق · الرقابة تزيد مع خطورة القرار', 'the model suggests, a human decides'), c: 'green' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الإشراف من غير أوسمة', 'Supervised has no labels'), good: T('بأوسمة', 'It has labels') },
        { bad: T('التجميع حسب أوسمة مدّية', 'Clustering uses given labels'), good: T('من غير أوسمة', 'No labels') },
        { bad: T('حل لكل حاجة وأحسن من الإنسان', 'It solves all, better than humans'), good: T('أداة بتدعم الإنسان', 'A tool supporting humans') },
        { bad: T('أساس الحكم بيتعرض بسهولة', 'Its basis is easy to show'), good: T('صندوق أسود', 'A black box') },
        { bad: T('التجميع بيثبت مجموعات طبيعية', 'Clustering = classification'), good: T('بنية محتملة بس', 'They differ in labels') },
      ] }],
    ],
  });

  RV.addSheet('7-2', {
    lead: T('خلايا بسيطة متوصّلة في طبقات، والتدريب بيظبط أوزانها — والعمق بيبني السمات خطوة خطوة.', 'Simple cells in layers, training tunes their weights — and depth builds features step by step.'),
    rows: [
      [
        { t: 'draw', art: 'nn', ic: '🧠', title: T('الشبكة العصبية', 'The neural network'), w: 1.2, cap: T('نماذج رياضية استوحت اسمها من الخلايا العصبية، مش نسخة من الدماغ · البنية حسب المهمة والبيانات والموارد', 'Connected nodes (neurons) · layers depend on the problem’s difficulty') },
        { t: 'vflow', ic: '🧱', title: T('الطبقات', 'The layers'), items: [
          { h: T('طبقة الإدخال', 'Input layer'), p: T('تمثل القيم الداخلة: بكسلات الصورة', 'receives outside data'), c: 'blue' },
          { h: T('الطبقات المخفية (الوسطى)', 'Hidden (middle) layers'), p: T('تحوّل التمثيل لتمثيلات جديدة', 'process, extract features'), c: 'violet' },
          { h: T('طبقة الإخراج', 'Output layer'), p: T('قيم مناسبة للمهمة: درجات «كلب» و«قطة»', 'gives the answer: dog or cat'), c: 'green' },
        ] },
      ],
      [
        { t: 'draw', art: 'neuron', ic: '⚪', title: T('خلية عصبية واحدة', 'One neuron') },
        { t: 'formula', w: 1.35, f: '0.9×1 + 0.2×0 + (−0.7)×1 + 0.1 = 0.3', p: T('المدخلات × الأوزان ← مجموع + حد الانحياز (هنا 0.1) ← دالة تنشيط ← الجزء التالي', 'inputs × weights → sum → activation function → next layer'), ex: T('الوزن: مقدار واتجاه المساهمة (موجب/سالب)، ومابيقررش النتيجة لوحده', 'Weight: how much an input counts (+/−, larger is stronger)') },
      ],
      [{ t: 'note', ic: '⚡', c: 'amber', p: T('**دالة التنشيط** بتخلّي الشبكة تتعلّم علاقات مش تناسبية بس.', 'The **activation function** lets the network learn non-proportional relationships.') }],
      [{ t: 'flow', ic: '🔧', title: T('التدريب = تعديل المعلمات لتقليل دالة الخسارة', 'Training = tuning weights'), items: [
        { ic: '🎲', h: T('قبل التدريب', 'Before'), p: T('تهيئة عشوائية، فالتنبؤات ضعيفة', 'random weights'), c: 'red' },
        { ic: '🔧', h: T('أثناء التدريب', 'During'), p: T('نقيس الخسارة ونعدّل تدريجيًا · الانتشار العكسي يحسب التدرجات', 'adjusted by the gap to the right answer'), c: 'amber' },
        { ic: '✅', h: T('بعد التدريب', 'After'), p: T('نقيس الأداء على بيانات منفصلة (التعميم)، ومفيش ضمان لصحة كل تنبؤ', 'right even on new data'), c: 'green' },
      ] }],
      [{ t: 'draw', art: 'features', ic: '🪜', title: T('التعلّم العميق: سمات هرمية', 'Deep learning: hierarchical features'), cap: T('مثال تقريبي، مش مسار ثابت: الطبقات الضحلة: خطوط وتغيّر ألوان ← الوسطى: أجزاء (عيون، أنف، حلقات) ← العميقة: الوجه أو الرقم كله', 'Shallow: lines, colour changes → middle: parts (eyes, nose, loops) → deep: the whole face or digit') }],
      [
        { t: 'link', ic: '🚀', title: T('إيه اللي ساعد ينتشر؟', 'What made it practical'), w: 1.3, nodes: [
          { ic: '🗃️', h: T('بيانات وأدوات وخوارزميات أفضل', 'Big data'), c: 'blue' },
          { ic: '🖥️', h: T('قدرة حاسوبية', 'Computing power'), p: T('GPU · TPU، مش شرط لكل استخدام', 'GPU · TPU'), c: 'amber' },
          { ic: '✅', h: T('انتشار', 'Practical'), c: 'green' },
        ], edges: [{ sign: '+' }, { sign: '=' }] },
        { t: 'note', ic: '⚠️', c: 'red', p: T('**عمق أكتر مش ضمان:** بيزوّد الكلفة، والشبكة ممكن تحفظ الأمثلة ومايعمّمش. مفيش عدد عالمي للطبقات، وكمان زيادة البيانات لوحدها مش ضمان.', '**Overfitting:** more depth guarantees nothing — it memorizes and chases noise. Ensure data is enough and varied.') },
      ],
      [{ t: 'cards', ic: '📈', title: T('القفزة: تقدّم كبير في مهام محددة', 'The leap: near-human accuracy or better'), cols: 3, items: [
        { ic: '🖼️', h: T('التعرّف على الصور', 'Image recognition'), p: T('وجوه · صور طبية · كشف أجسام للعربيات', 'faces · medical images · object detection'), c: 'blue' },
        { ic: '🎙️', h: T('التعرّف على الكلام', 'Speech recognition'), p: T('تشغيل صوتي للسماعات · كلام ← نص · ترجمة آلية', 'smart speakers · transcription · speech translation'), c: 'violet' },
        { ic: '💬', h: T('معالجة اللغة الطبيعية', 'Natural language processing'), p: T('ترجمة آلية · تلخيص · إجابة أسئلة', 'translation · summarizing · Q&A'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '🤖', c: 'blue', p: T('**قبل وبعد:** في أساليب كتير البشر صمّموا السمات يدويًا، والتعلّم العميق يقدر يتعلّم تمثيلات كتير من البيانات، مع بقاء المهمة والبيانات والبنية والتقييم مسؤولية بشرية — وده دعم نماذج التوليد. وقد يقارب أداء البشر أو يتفوق في اختبار محدد، لكن ممكن يفشل خارج ظروف التقييم، ومش معناه فهم أو ذكاء عام.', '**Before and after:** humans once designed features by hand; now they are learned — paving the way for generative AI. One cell is simple; many together make complex judgments possible.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('طبقة الإدخال بتطلّع النتايج', 'The input layer gives results'), good: T('دي الإخراج', 'That is the output') },
        { bad: T('التعلّم العميق بطبقة مخفية واحدة', 'Deep learning has one hidden layer'), good: T('شبكات متعددة الطبقات', 'Many hidden layers') },
        { bad: T('الأوزان مظبوطة قبل التدريب', 'Weights are set before training'), good: T('تهيئة عشوائية', 'Random') },
        { bad: T('عمق أكبر = أداء أحسن دايمًا', 'Layers do not affect problem difficulty'), good: T('مايضمنش', 'Harder problems need more') },
      ] }],
    ],
  });

  RV.addSheet('7-3', {
    lead: T('بيتنبّأ بالرمز المحتمل ويكرّر — الطلاقة مش الحقيقة، فاتحقّق من الادعاءات المهمة.', 'It predicts the likely word and repeats — fluency is not truth, so always verify.'),
    rows: [
      [
        { t: 'draw', art: 'nextword', ic: '🔮', title: T('نموذج اللغة: التنبؤ بالرمز (Token) التالي', 'Language model: next-word prediction') },
        { t: 'vflow', ic: '🔁', title: T('توليد النص', 'Generating text'), items: [
          { h: T('يحسب احتمال كل رمز مرشّح حسب السياق', 'Scores each candidate word'), p: T('الرمز: كلمة أو جزء كلمة أو علامة ترقيم', 'from training patterns, so new wordings work too'), c: 'violet' },
          { h: T('خوارزمية التوليد تختار', 'Picks by probability'), p: T('حسب إعدادات: أخذ العينات · درجة الحرارة', 'statistically plausible, not correct'), c: 'blue' },
          { h: T('يكرّر لحد التوقف: «مشمس» ← «و» ← «دافئ»', 'Repeats: “sunny” → “and” → “warm”'), c: 'green' },
        ] },
      ],
      [{ t: 'flow', ic: '🌀', title: T('الهلوسة: ليه بتحصل؟ (وليها أسباب متعددة)', 'Hallucination: why it happens'), items: [
        { ic: '🎲', h: T('بيختار المحتمل', 'Picks the likely'), p: T('مش الكلمة الصحيحة', 'not the correct word'), c: 'amber' },
        { ic: '💬', h: T('رد مقنع', 'A convincing reply'), p: T('مسجد ابن طولون: تاريخ بثقة كاملة', 'Ibn Tulun Mosque: a date, fully confident'), c: 'blue' },
        { ic: '❌', h: T('غير صحيحة أو مختلقة أو غير مدعومة', 'Factually wrong'), c: 'red' },
        { ic: '🔍', h: T('اتحقّق', 'Verify'), p: T('كل تاريخ واسم ورقم ادعاء', 'every date, name, number is a claim'), c: 'green' },
      ] }],
      [{ t: 'cards', ic: '🏔️', title: T('نموذج اللغة الكبير (LLM): «الكبر» = تلات جوانب، ومفيش حد رسمي', 'Large language model (LLM): “large” = data + parameters'), cols: 3, items: [
        { ic: '📚', h: T('كمية بيانات التدريب', 'Amount of training data'), p: T('ضخمة، وبتتقاس عادةً بالرموز (Tokens)', 'Internet text: billions to trillions of words (tokens)'), c: 'blue' },
        { ic: '⚙️', h: T('عدد المعلمات', 'Number of parameters'), p: T('مليارات في نماذج كتير، وبتختلف من نموذج لنموذج', 'weight values: billions to trillions'), c: 'violet' },
        { ic: '🖥️', h: T('القدرة الحاسوبية', 'What it is'), p: T('الحوسبة المستخدمة في التدريب', 'a very large neural network trained on vast Internet text'), c: 'teal' },
      ] }],
      [{ t: 'note', ic: '✨', c: 'amber', p: T('**مفيش حد ثابت** يضمن قدرة بعينها: القدرات ممكن تتحسن مع الحجم والبيانات والحوسبة وجودة التدريب، والنموذج ممكن يفضل يغلط حتى لو نجح في التلخيص والترجمة والبرمجيات. وكتير من النماذج مبني على بنية Transformer. ومن الأنظمة: ChatGPT · Claude · Gemini (أسماء منتجات قد تتغير).', '**Past a certain scale** new abilities appear: complex reasoning · summarizing · translation · code. Services: ChatGPT · Claude · Gemini.') }],
      [{ t: 'flow', ic: '👍', title: T('RLHF: إحدى طرق الضبط (التعلّم المعزَّز من التغذية الراجعة البشرية)', 'Tuning by RLHF: reinforcement learning from human feedback'), items: [
        { ic: '📚', h: T('① تدريب أولي', '① Initial training'), p: T('استخدام اللغة من نصوص كتير', 'language use from lots of text'), c: 'blue' },
        { ic: '👍', h: T('② تقييم بشري', '② Human evaluation'), p: T('مقيّمون يقارنوا المخرجات: تفضيلات', 'which reply is better?'), c: 'amber' },
        { ic: '🏆', h: T('③ ضبط معزَّز', '③ RL tuning'), p: T('نموذج مكافأة من التفضيلات يضبط النموذج', 'rating = reward'), c: 'green' },
      ] }],
      [
        { t: 'compare', ic: '⚖️', title: T('RLHF بيصلّح إيه ومابيصلّحش إيه؟', 'What RLHF fixes and does not'), w: 1.2,
          cols: [{ ic: '✅', h: T('بيحسّن', 'Improves'), c: 'green' }, { ic: '✗', h: T('مابيضمنش', 'Does not guarantee'), c: 'red' }],
          rows: [
            { k: '1', v: [T('الأسلوب · ردود طبيعية ومهذّبة', 'style · natural, polite replies'), T('الحقيقة', 'truth')] },
            { k: '2', v: [T('إتباع التعليمات وقصد السؤال', 'following instructions and intent'), T('الأمان الكامل', 'full safety')] },
            { k: '3', v: [T('بعض جوانب السلامة', 'part of safety'), T('مناسبة كل مخرج', 'depends on raters and design')] },
          ] },
        { t: 'draw', art: 'hub', ic: '🎛️', title: T('تعدّد الوسائط', 'Multimodality'), cap: T('قدرة نموذج أو نظام على أكتر من وسيط · في المدخلات أو المخرجات أو الاتنين · مش كل نظام يدعم الكل', 'Each data type = a modality · one model handles many kinds, converted to one numeric form') },
      ],
      [{ t: 'note', ic: '🔁', c: 'blue', p: T('**أمثلة تعدّد الوسائط:** صورة ← وصف نصي · صوت ← نص · تعليمات نصية ← صورة. ومايلغيش فحص الدقة والخصوصية وحقوق الاستخدام والتحيّز والسلامة.', '**Multimodal examples:** image → text description · audio → transcript · text → image · video summary.') }],
      [{ t: 'cards', ic: '🛡️', title: T('استخدمه بأمان', 'Use it safely'), cols: 2, items: [
        { ic: '✔', h: T('بيوفّر جهد في', 'Saves effort in'), p: T('المسودة · التنظيم · الصياغة', 'drafting · organizing · wording'), c: 'green' },
        { ic: '✘', h: T('ماتثقش زي ما هو في', 'Do not trust as-is'), p: T('التواريخ · الأسماء · الأرقام — إنسان يراجع من مصدر موثوق قبل النشر', 'dates · names · numbers — a person checks a trusted source before publishing'), c: 'red' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('بيرجّع نفس جمل التدريب دايمًا', 'It repeats training sentences'), good: T('بيولّد رمز بعد رمز', 'It generates by repeated prediction') },
        { bad: T('RLHF بيخلّيه يقول الحقيقة دايمًا', 'RLHF makes it always truthful'), good: T('مش بيضمن الحقيقة', 'No truth guarantee') },
        { bad: T('تعدّد الوسائط = نص بس', 'Multimodality = text only'), good: T('أكتر من وسيط حسب النظام', 'Text, image, audio, video') },
        { bad: T('نموذج أكبر = أصدق', 'A bigger model = more truthful'), good: T('أطلق، مش بالضرورة أصدق', 'More fluent, not more truthful') },
      ] }],
    ],
  });
})();
