/* =========================================================
 * content/sheets-7.js — printable summaries of chapter 7.
 * Only data: js/screens/sheet.js draws it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('7-1', {
    lead: T('بدل ما نكتب القواعد، الجهاز بيلاقيها من البيانات.', 'Instead of writing rules, the machine finds them in data.'),
    rows: [
      [
        { t: 'flow', ic: '👨‍💻', title: T('البرمجة التقليدية', 'Conventional programming'), items: [
          { ic: '📜', h: T('قواعد + بيانات', 'Rules + data'), p: T('الإنسان يكتب القواعد', 'humans write rules'), c: 'slate' },
          { ic: '💻', h: T('إجابات', 'Answers'), c: 'blue' },
        ] },
        { t: 'flow', ic: '🤖', title: T('تعلّم الآلة', 'Machine learning'), items: [
          { ic: '🗃️', h: T('بيانات + إجابات', 'Data + answers'), p: T('أمثلة كتير', 'many examples'), c: 'violet' },
          { ic: '💻', h: T('القواعد', 'The rules'), p: T('الجهاز يلاقيها', 'found by the machine'), c: 'green' },
        ] },
      ],
      [{ t: 'tree', ic: '🧭', title: T('تلات أنواع للتعلّم', 'Three kinds of learning'), root: { h: T('تعلّم الآلة', 'Machine learning'), c: 'violet' }, kids: [
        { ic: '🏷️', h: T('خاضع للإشراف', 'Supervised'), p: T('إدخال + وسم ← التصنيف', 'input + label → classification'), c: 'blue' },
        { ic: '📦', h: T('غير خاضع للإشراف', 'Unsupervised'), p: T('من غير أوسمة ← التجميع', 'no labels → clustering'), c: 'green' },
        { ic: '🎮', h: T('معزَّز', 'Reinforcement'), p: T('حالة · فعل · مكافأة', 'state · action · reward'), c: 'amber' },
      ] }],
      [
        { t: 'draw', art: 'classify', ic: '🏷️', title: T('التصنيف', 'Classification'), cap: T('حد فاصل من أمثلة بأوسمة', 'A boundary from labelled examples') },
        { t: 'draw', art: 'cluster', ic: '📦', title: T('التجميع', 'Clustering'), cap: T('مجموعات طبيعية من غير أوسمة', 'Natural groups, no labels') },
        { t: 'draw', art: 'grid', ic: '🎮', title: T('المعزَّز', 'Reinforcement'), cap: T('−5 في الحفرة · +10 عند العلم', '−5 in the hole · +10 at the flag') },
      ],
      [{ t: 'note', ic: '🔎', c: 'blue', p: T('**السمة (Feature):** دليل في البيانات مفيد للتنبّؤ — زي نوع الكلمات وعنوان المرسل وطول النص في الإيميل. واختيارها بيأثّر جامد على الدقة.', 'A **feature** is a clue in the data — like words, sender and length of an e-mail. Choosing features strongly affects accuracy.') }],
      [{ t: 'flow', ic: '⚖️', title: T('حدود تعلّم الآلة', 'The limits of ML'), items: [
        { ic: '🗃️', h: T('بيانات منحرفة', 'Skewed data'), c: 'red' },
        { ic: '⚠️', h: T('أحكام منحرفة', 'Skewed judgments'), c: 'amber' },
        { ic: '⬛', h: T('صندوق أسود', 'Black box'), p: T('أساس الحكم صعب يتشاف', 'its basis is hard to see'), c: 'slate' },
        { ic: '🧑‍⚖️', h: T('إنسان في الحلقة', 'Human in the loop'), p: T('النموذج يقترح والإنسان يقرّر', 'the model suggests, a human decides'), c: 'green' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الإشراف من غير أوسمة', 'Supervised has no labels'), good: T('بأوسمة', 'It has labels') },
        { bad: T('التجميع حسب أوسمة مدّية', 'Clustering uses given labels'), good: T('من غير أوسمة', 'No labels') },
        { bad: T('جمع رقمين محتاج تعلّم آلة', 'Adding two numbers needs ML'), good: T('قاعدة بسيطة', 'A simple rule') },
      ] }],
    ],
  });

  RV.addSheet('7-2', {
    lead: T('خلايا بسيطة متوصّلة في طبقات، والتدريب بيظبط أوزانها — فتطلع أحكام معقّدة.', 'Simple cells in layers, training tunes their weights — and complex judgments emerge.'),
    rows: [
      [
        { t: 'draw', art: 'nn', ic: '🧠', title: T('بنية الشبكة', 'The network’s structure'), w: 1.2 },
        { t: 'vflow', ic: '🧱', title: T('الطبقات', 'The layers'), items: [
          { h: T('إدخال', 'Input'), p: T('تستقبل البيانات (بكسلات)', 'receives data (pixels)'), c: 'blue' },
          { h: T('مخفية', 'Hidden'), p: T('تعالج وتستخرج السمات', 'processes, extracts features'), c: 'violet' },
          { h: T('إخراج', 'Output'), p: T('تطلّع الإجابة', 'gives the answer'), c: 'green' },
        ] },
      ],
      [
        { t: 'draw', art: 'neuron', ic: '⚪', title: T('خلية عصبية واحدة', 'One neuron') },
        { t: 'formula', w: 1.35, f: '0.9×1 + 0.2×0 + (−0.7)×1 + 0.1 = 0.3', p: T('المدخلات × الأوزان ← مجموع ← دالة تنشيط', 'inputs × weights → sum → activation'), ex: T('الوزن: قد إيه بنركّز على المدخل (موجب/سالب)', 'Weight: how much an input counts (+/−)') },
      ],
      [{ t: 'flow', ic: '🔧', title: T('التدريب = ظبط الأوزان', 'Training = tuning weights'), items: [
        { ic: '🎲', h: T('قبل التدريب', 'Before'), p: T('أوزان عشوائية', 'random weights'), c: 'red' },
        { ic: '🔧', h: T('أثناء التدريب', 'During'), p: T('نظبط حسب الفرق بين التنبؤ والإجابة', 'adjust by the gap to the answer'), c: 'amber' },
        { ic: '✅', h: T('بعد التدريب', 'After'), p: T('إجابات صح حتى على الجديد', 'right even on new data'), c: 'green' },
      ] }],
      [{ t: 'draw', art: 'features', ic: '🪜', title: T('التعلّم العميق: سمات طبقة فوق طبقة', 'Deep learning: features layer on layer'), cap: T('كل ما الطبقة أعمق ← السمات أعقد (حواف ← عيون وأنف ← الوجه كله)', 'Deeper layer → more complex features (edges → eyes and nose → the face)') }],
      [
        { t: 'link', ic: '🚀', title: T('إيه اللي خلّاه عملي؟', 'What made it practical'), w: 1.3, nodes: [
          { ic: '🗃️', h: T('بيانات كتير', 'Big data'), c: 'blue' },
          { ic: '🖥️', h: T('قدرة حسابية', 'Computing power'), p: 'GPU · TPU', c: 'amber' },
          { ic: '✅', h: T('عملي', 'Practical'), c: 'green' },
        ], edges: [{ sign: '+' }, { sign: '=' }] },
        { t: 'cards', ic: '📈', title: T('القفزة', 'The leap'), cols: 3, items: [
          { ic: '🖼️', h: T('صور', 'Images'), c: 'blue' },
          { ic: '🎙️', h: T('كلام', 'Speech'), c: 'violet' },
          { ic: '💬', h: T('لغة', 'Language'), c: 'green' },
        ] },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('طبقة الإدخال بتطلّع النتايج', 'The input layer gives results'), good: T('دي الإخراج', 'That is the output') },
        { bad: T('التعلّم العميق بطبقة مخفية واحدة', 'Deep learning has one hidden layer'), good: T('طبقات مخفية كتير', 'Many hidden layers') },
        { bad: T('الأوزان مظبوطة قبل التدريب', 'Weights are set before training'), good: T('عشوائية', 'Random') },
        { bad: T('عمق أكتر = أحسن تلقائيًا', 'Deeper = better'), good: T('فرط تخصيص: يحفظ ومايعمّمش', 'Overfitting: memorizes') },
      ] }],
    ],
  });

  RV.addSheet('7-3', {
    lead: T('النموذج بيتنبّأ بالكلمة المحتملة ويكرّر — مش بيعرف الحقيقة.', 'The model predicts the likely word and repeats — it does not know the truth.'),
    rows: [
      [
        { t: 'draw', art: 'nextword', ic: '🔮', title: T('التنبؤ بالكلمة الجاية', 'Next-word prediction') },
        { t: 'vflow', ic: '🔁', title: T('إزاي بيكتب؟', 'How it writes'), items: [
          { h: T('يتنبّأ بالكلمة المحتملة', 'Predict the likely word'), c: 'violet' },
          { h: T('يضيفها للجملة', 'Add it to the sentence'), c: 'blue' },
          { h: T('يكرّر ← نص كامل', 'Repeat → a whole text'), c: 'green' },
        ] },
      ],
      [{ t: 'flow', ic: '🌀', title: T('ليه بيهلوس؟', 'Why it hallucinates'), items: [
        { ic: '🎲', h: T('بيختار المحتمل', 'Picks the likely'), p: T('مش المؤكد', 'not the sure'), c: 'amber' },
        { ic: '💬', h: T('رد مقنع', 'A convincing reply'), c: 'blue' },
        { ic: '❌', h: T('مخالف للحقيقة', 'Factually wrong'), c: 'red' },
        { ic: '🔍', h: T('اتحقّق', 'Verify'), p: T('تواريخ · أسماء · أرقام', 'dates · names · numbers'), c: 'green' },
      ] }],
      [{ t: 'cards', ic: '🏔️', title: T('يعني إيه «كبير»؟', 'What makes it “large”?'), cols: 2, items: [
        { ic: '📚', h: T('كمية بيانات التدريب', 'Amount of training data'), p: T('نصوص إنترنت هائلة: مليارات لتريليونات كلمة', 'vast Internet text: billions to trillions of words'), c: 'blue' },
        { ic: '⚙️', h: T('عدد المعلمات', 'Number of parameters'), p: T('قيم الأوزان: مليارات لتريليونات', 'weight values: billions to trillions'), c: 'violet' },
      ] }],
      [{ t: 'flow', ic: '👍', title: T('الضبط بـ RLHF', 'Tuning by RLHF'), items: [
        { ic: '📚', h: T('① تدريب أولي', '① Initial training'), p: T('من نصوص كتير', 'on lots of text'), c: 'blue' },
        { ic: '👍', h: T('② تقييم بشري', '② Human evaluation'), p: T('أنهي رد أحسن؟', 'which reply is better?'), c: 'amber' },
        { ic: '🏆', h: T('③ ضبط معزَّز', '③ RL tuning'), p: T('التقييم = مكافأة', 'rating = reward'), c: 'green' },
      ] }],
      [
        { t: 'compare', ic: '⚖️', title: T('RLHF بيصلّح إيه؟', 'What RLHF fixes'), w: 1.2,
          cols: [{ ic: '✅', h: T('بيحسّن', 'Improves'), c: 'green' }, { ic: '✗', h: T('مابيضمنش', 'Does not guarantee'), c: 'red' }],
          rows: [
            { k: '1', v: [T('الأسلوب', 'style'), T('الحقيقة', 'truth')] },
            { k: '2', v: [T('اتباع التعليمات', 'following instructions'), T('الأمان الكامل', 'full safety')] },
            { k: '3', v: [T('جزء من الأمان', 'some safety'), T('—', '—')] },
          ] },
        { t: 'draw', art: 'hub', ic: '🎛️', title: T('تعدّد الوسائط', 'Multimodality'), cap: T('كله أرقام جوّه الشبكة', 'All numbers inside the network') },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('بيرجّع نفس جمل التدريب دايمًا', 'It repeats training sentences'), good: T('بيولّد كلمة كلمة', 'It generates word by word') },
        { bad: T('RLHF بيخلّيه يقول الحقيقة دايمًا', 'RLHF makes it always truthful'), good: T('مش بيضمن الحقيقة', 'No truth guarantee') },
        { bad: T('تعدّد الوسائط = نص بس', 'Multimodality = text only'), good: T('نص وصورة وصوت وفيديو', 'Text, image, audio, video') },
      ] }],
    ],
  });
})();
