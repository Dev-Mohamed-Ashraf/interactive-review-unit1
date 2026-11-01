/* =========================================================
 * content/checks-1-2.js — "✋ Check yourself" questions for lesson 1-2.
 * Pure data (see content/checks-1-1.js for the design rules).
 * ========================================================= */
(function () {
  const q = (n, body) => ({ type: 'quiz', title: { ar: `✋ اختبر فهمك (${n})`, en: `✋ Check yourself (${n})` }, q: body });

  RV.addSteps('1-2', 'what', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'ChatGPT ذكاء توليدي. اختار __كل__ الدواير اللي هو جوّاها:', en: 'ChatGPT is generative AI. Choose __all__ the circles it sits inside:' },
      options: [
        { ar: 'الذكاء الاصطناعي (AI)', en: 'Artificial intelligence (AI)' },
        { ar: 'التعلّم الآلي (ML)', en: 'Machine learning (ML)' },
        { ar: 'التعلّم العميق (DL)', en: 'Deep learning (DL)' },
        { ar: 'قواعد مكتوبة بإيد المبرمج', en: 'Rules hand-written by a programmer' },
      ],
      answer: [0, 1, 2],
      explain: { ar: '`AI ⊃ ML ⊃ DL ⊃ GenAI` — التوليدي جوّه التلات دواير كلهم. أما «القواعد المكتوبة» فهي الطريقة القديمة، مش تعلّم.', en: '`AI ⊃ ML ⊃ DL ⊃ GenAI` — GenAI is inside all three. Hand-written rules are the old way, not learning.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'فلتر السبام تعلّم آلي. هل ده معناه إنه ذكاء توليدي؟', en: 'A spam filter is machine learning. Does that make it generative AI?' },
      options: [
        { ar: 'لأ — بيصنّف الإيميلات، مش بيولّد محتوى جديد', en: 'No — it classifies emails, it does not create new content' },
        { ar: 'أيوه — أي تعلّم آلي لازم يكون توليدي', en: 'Yes — all machine learning is generative' },
        { ar: 'أيوه — لأنه بيكتب إيميلات جديدة بنفسه', en: 'Yes — because it writes new emails by itself' },
        { ar: 'لأ — لأنه مش جزء من الذكاء الاصطناعي أصلًا', en: 'No — because it is not part of AI at all' },
      ],
      answer: 0,
      explain: { ar: 'التوليدي دايرة صغيرة جوّه التعلّم الآلي: مش كل ML بيولّد. فلتر السبام __بيتنبّأ ويصنّف__ بس.', en: 'GenAI is a small circle inside ML: not all ML generates. A spam filter only __predicts and classifies__.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'كل تعلّم عميق هو تعلّم آلي.', en: 'All deep learning is machine learning.' }, answer: true },
        { text: { ar: 'كل ذكاء اصطناعي هو تعلّم عميق.', en: 'All AI is deep learning.' }, answer: false, explain: { ar: 'الـAI هو الأوسع؛ التعلّم العميق __جزء__ جوّاه (جوّه التعلّم الآلي).', en: 'AI is the widest; deep learning is only __a part__ of it (inside ML).' } },
        { text: { ar: 'الذكاء الاصطناعي بيعيد إنتاج سلوك إنساني ذكي زي التعلّم والاستدلال والحكم.', en: 'AI reproduces intelligent human behavior such as learning, reasoning and judgment.' }, answer: true },
        { text: { ar: 'الذكاء التوليدي هو الدايرة الأوسع اللي فيها كل الأنواع.', en: 'Generative AI is the widest circle that contains all the others.' }, answer: false, explain: { ar: 'بالعكس: هو __الأكثر تخصصًا__ — الدايرة الصغيرة جوّه الكل.', en: 'The opposite: it is the __most specialized__ — the smallest circle inside all.' } },
      ],
    }),
  ]);

  RV.addSteps('1-2', 'ml', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'المحتال كتب «fr€e» بدل «free» فالقاعدة المكتوبة فشلت. ليه التعلّم الآلي يقدر يكشفه؟', en: 'A scammer wrote "fr€e" instead of "free" and the written rule failed. Why can ML still catch it?' },
      options: [
        { ar: 'لأنه اتعلّم أنماط من آلاف الأمثلة، مش كلمة واحدة', en: 'It learned patterns from thousands of examples, not one word' },
        { ar: 'لأن المبرمج كتب قاعدة لكل شكل ممكن لكلمة free', en: 'The programmer wrote a rule for every spelling' },
        { ar: 'لأنه بيمسح تلقائيًا أي إيميل فيه رموز غريبة زي €', en: 'It deletes any email with strange symbols' },
        { ar: 'لأنه بيسأل المستخدم عن كل إيميل جديد قبل ما يحكم', en: 'It asks the user about every email first' },
      ],
      answer: 0,
      explain: { ar: 'النموذج بيبص على __أنماط كتير مع بعض__ (جايزة، فلوس، اضغط…) فمش بيعتمد على كلمة واحدة يتحايل عليها المحتال.', en: 'The model looks at __many patterns together__ (prize, money, click…), so one disguised word does not fool it.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'عايز تدرّب نموذج يفرّق بين صور القطط والكلاب. محتاج إيه أساسًا؟', en: 'You want to train a model to tell cats from dogs. What do you mainly need?' },
      options: [
        { ar: 'صور كتير متعلّم عليها «قطة» أو «كلب»', en: 'Many photos labeled "cat" or "dog"' },
        { ar: 'قواعد مكتوبة لشكل ودن ووش كل حيوان', en: 'Written rules for each animal’s ears and face' },
        { ar: 'كاميرا دقتها أعلى من كاميرا الموبايل', en: 'A camera sharper than a phone camera' },
        { ar: 'إنترنت أسرع عشان الصور تتحمّل بسرعة', en: 'Faster Internet so the photos load quickly' },
      ],
      answer: 0,
      explain: { ar: 'التعلّم الآلي = __أمثلة متعلّم عليها__ والنموذج يكتشف الأنماط بنفسه — من غير قواعد مكتوبة بالإيد.', en: 'ML = __labeled examples__; the model finds the patterns itself — no hand-written rules.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'النموذج المدرَّب يقدر يحكم على أمثلة جديدة ماشافهاش قبل كده.', en: 'A trained model can judge new examples it has never seen.' }, answer: true },
        { text: { ar: 'في التعلّم الآلي المبرمج بيكتب كل قاعدة بإيده.', en: 'In ML the programmer writes every rule by hand.' }, answer: false, explain: { ar: 'ده الطريقة القديمة. في التعلّم الآلي النموذج __بيستخرج الأنماط من البيانات__.', en: 'That is the old way. In ML the model __extracts the patterns from data__.' } },
        { text: { ar: 'توصية المنتجات في المتاجر الإلكترونية مثال على التعلّم الآلي.', en: 'Product recommendations in online shops are an example of ML.' }, answer: true },
      ],
    }),
  ]);

  RV.addSteps('1-2', 'dl', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'في الشبكة العصبية، إيه اللي بيتغيّر أثناء التدريب عشان الشبكة تتعلّم؟', en: 'In a neural network, what changes during training so the network learns?' },
      options: [
        { ar: 'الأوزان اللي على الوصلات', en: 'The weights on the connections' },
        { ar: 'عدد الطبقات كل ثانية', en: 'The number of layers every second' },
        { ar: 'الصور نفسها اللي بتدخل', en: 'The input images themselves' },
        { ar: 'شكل الخلايا في المخ', en: 'The shape of brain cells' },
      ],
      answer: 0,
      explain: { ar: 'كل وصلة ليها __وزن__، والأوزان بتتعدّل شوية شوية لحد ما الشبكة تحكم صح.', en: 'Each connection has a __weight__; weights are adjusted bit by bit until the network judges correctly.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'مزارع درّب نموذج على آلاف صور النبات السليم والمريض، وبعدين ظهر مرض نادر جديد. إيه المتوقع؟', en: 'A farmer trained a model on thousands of healthy/diseased plant photos, then a new rare disease appeared. What to expect?' },
      options: [
        { ar: 'ممكن يغلط لأنه ماتدرّبش على المرض ده', en: 'It may be wrong: it never trained on that disease' },
        { ar: 'هيعرفه أكيد لأنه ذكاء اصطناعي', en: 'It will surely know it because it is AI' },
        { ar: 'هيوقف شغل خالص ومش هيدّي نتيجة', en: 'It will stop working and give no result' },
        { ar: 'هيكتشفه أسرع من الأمراض المعروفة', en: 'It will spot it faster than known diseases' },
      ],
      answer: 0,
      explain: { ar: 'التعلّم العميق بيتعلّم من __البيانات اللي شافها__. الحاجة النادرة اللي مش في بياناته غالبًا هيغلط فيها.', en: 'Deep learning learns from __the data it has seen__. Something rare and missing from its data is likely to fool it.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'الشبكة العصبية مستوحاة من طريقة عمل الخلايا العصبية في المخ.', en: 'Neural networks are inspired by how neurons in the brain work.' }, answer: true },
        { text: { ar: 'التعلّم العميق بيحتاج بيانات قليلة جدًا عشان يتعلّم.', en: 'Deep learning needs very little data to learn.' }, answer: false, explain: { ar: 'بالعكس: محتاج __بيانات ضخمة__ وطبقات مخفية كتير.', en: 'The opposite: it needs __huge data__ and many hidden layers.' } },
        { text: { ar: 'الشبكة فيها طبقة إدخال وطبقات مخفية وطبقة إخراج.', en: 'A network has an input layer, hidden layers and an output layer.' }, answer: true },
        { text: { ar: 'كل الوصلات في الشبكة ليها نفس القوة ومابتتغيّرش.', en: 'All connections have the same strength and never change.' }, answer: false, explain: { ar: 'كل وصلة ليها __وزن مختلف__، والتدريب هو تعديل الأوزان دي.', en: 'Each connection has __its own weight__; training means adjusting those weights.' } },
      ],
    }),
  ]);

  RV.addSteps('1-2', 'genai', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'ليه الذكاء التوليدي ممكن يقول معلومة غلط وهو واثق جدًا؟', en: 'Why can generative AI state something wrong with full confidence?' },
      options: [
        { ar: 'بيختار الكلمة الأرجح، مش بيدوّر في قاعدة حقائق', en: 'It picks the most likely word; it does not look facts up' },
        { ar: 'قاصد يضلّل المستخدم عشان يختبر ذكاءه وتركيزه', en: 'It deliberately misleads the user to test them' },
        { ar: 'الإنترنت بيقطع وهو بيكتب فبيكمّل أي كلام وخلاص', en: 'The Internet drops while it writes, so it fills in anything' },
        { ar: 'بيدوّر في قاعدة حقائق بس القاعدة كلها غلط', en: 'It searches a fact database that is entirely wrong' },
      ],
      answer: 0,
      explain: { ar: 'بيكتب __كلمة ورا كلمة__ حسب الاحتمال اللي اتعلّمه — الكلمة «شكلها مناسب» حتى لو غلط. ده **الهلوسة**.', en: 'It writes __word after word__ by learned probability — a word can "look right" and still be wrong. That is **hallucination**.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'صاحبك كتب في بحثه «حسب كتاب: تاريخ الحوسبة في مصر، 1975» والمرجع ده جاي من ChatGPT. تعمل إيه الأول؟', en: 'Your friend’s report cites "History of Computing in Egypt, 1975", a source suggested by ChatGPT. What do you do first?' },
      options: [
        { ar: 'تدوّر على الكتاب وتتأكد إنه موجود فعلًا', en: 'Search for the book and check it really exists' },
        { ar: 'تعتمده على طول لأن الاسم شكله حقيقي', en: 'Accept it right away; the title looks real' },
        { ar: 'تسأل ChatGPT تاني هل هو متأكد منه', en: 'Ask ChatGPT again whether it is sure' },
        { ar: 'تمسح البحث كله وتبدأ من الأول', en: 'Delete the whole report and start over' },
      ],
      answer: 0,
      explain: { ar: '__المرجع المخترع__ من أشهر أشكال الهلوسة. سؤال نفس النموذج تاني مش تحقّق — لازم __مصدر موثوق خارجي__.', en: 'An __invented source__ is a classic hallucination. Asking the same model again is not checking — you need an __independent trusted source__.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'الهلوسة بتزيد لما المعلومة نادرة أو مش موجودة في بيانات التدريب.', en: 'Hallucination increases when the information is rare or missing in the training data.' }, answer: true },
        { text: { ar: 'الذكاء التوليدي بيولّد نص بس، مايقدرش يولّد صور أو صوت.', en: 'Generative AI can only create text, not images or audio.' }, answer: false, explain: { ar: 'بيولّد __نص وصور وصوت وبرامج__.', en: 'It creates __text, images, audio and programs__.' } },
        { text: { ar: 'مرجع أو مصدر مش موجود أصلًا يعتبر شكل من أشكال الهلوسة.', en: 'A source that does not exist at all is a form of hallucination.' }, answer: true },
        { text: { ar: 'طالما الإجابة مكتوبة بثقة وبأسلوب حلو، تبقى صحيحة.', en: 'If an answer is written confidently and nicely, it must be correct.' }, answer: false, explain: { ar: 'الهلوسة __شكلها مقنع جدًا__ — الثقة مش دليل. اتحقّق من مصدر موثوق.', en: 'Hallucinations __look very convincing__ — confidence is no proof. Check a trusted source.' } },
      ],
    }),
  ]);
})();
