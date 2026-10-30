/* =========================================================
 * content/sheets-4.js — printable summaries of chapter 4.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('4-1', {
    lead: T('لكل وسيط قوة وقيود، والاختيار — وغالبًا كذا وسيط مع بعض — حسب الغرض والجمهور.', 'Each medium has strengths and limits; choose — often several — by purpose and audience.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('ما نقاط القوة والقيود في الوسائط المختلفة، وكيف تختار الوسيلة المناسبة لغرض وجمهور معينين؟', 'What are the strengths and constraints of different media, and how do you choose the right one?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تقارن بين خصائص الوسائط وتشرح قوة المواقع وقيودها', 'Compare media and explain website strengths and constraints'),
          T('تختار الوسيلة المناسبة لغرض وجمهور وتبرّر اختيارك', 'Choose suitable media for a purpose and audience'),
        ] }],
      [{ t: 'sec', n: '1', label: T('مقارنة خصائص الوسائط المختلفة', 'Comparison of the Characteristics of Different Media') }],
      [{ t: 'compare', ic: '📺', title: T('الوسائط الخمسة', 'The five media'),
        cols: [{ ic: '📺', h: T('تلفزيون', 'TV'), c: 'blue' }, { ic: '📻', h: T('راديو', 'Radio'), c: 'amber' }, { ic: '📰', h: T('صحيفة', 'Newspaper'), c: 'slate' }, { ic: '🌐', h: T('موقع إلكتروني', 'Website'), c: 'violet' }, { ic: '💬', h: T('وسائل التواصل', 'SNS'), c: 'pink' }],
        rows: [
          { k: T('المحتوى', 'Content'), v: [T('فيديو + صوت', 'video + audio'), T('صوت بس', 'audio only'), T('نص + صور', 'text + images'), T('كل الأنواع', 'all types'), T('ينشرها المستخدمين', 'shared by users')] },
          { k: T('بيخاطب', 'Reaches'), v: [T('النظر والسمع', 'sight, hearing'), T('السمع بس', 'hearing only'), T('النظر · مطبوع', 'sight · printed'), T('متنوّع', 'varied'), T('متنوّع', 'varied')] },
          { k: T('الاتجاه', 'Direction'), v: [T('واحد عادةً', 'one-way'), T('واحد عادةً', 'one-way'), T('واحد', 'one-way'), T('واحد أساسًا + نماذج وتعليقات', 'one-way + forms, comments'), T('اتجاهين', 'two-way')] },
          { k: T('ميزته', 'Strength'), v: [T('لكتير مرة واحدة', 'many at once'), T('أثناء التنقل أو مهام تانية حسب التغطية', 'anywhere, while busy'), T('من غير إنترنت', 'no internet'), T('يتحدّث في أي وقت', 'updated any time'), T('أسرع نشر', 'fastest spread')] },
        ] }],
      [{ t: 'link', ic: '↔️', title: T('اتجاه واحد ولا اتجاهين؟', 'One-way or two-way?'), nodes: [
        { ic: '📣', h: T('المرسل', 'Sender'), c: 'blue' },
        { ic: '👥', h: T('المستقبل', 'Receiver'), c: 'green' },
      ], edges: [{ to: T('واحد: تلفزيون · راديو · جرنال', 'one-way: TV · radio · paper'), back: T('اتجاهين: تواصل + نماذج الموقع', 'two-way: SNS + site forms') }] }],
      [{ t: 'sec', n: '2', label: T('نقاط القوة والقيود في المواقع الإلكترونية', 'Strengths and Constraints of Websites') }],
      [
        { t: 'cards', ic: '🌐', title: T('نقاط قوة المواقع', 'Website strengths'), cols: 1, items: [
          { ic: '✅', h: T('خمس نقاط', 'Five points'), list: [T('تجمع معلومات متنوعة', 'combine varied information'), T('تتحدّث في أي وقت', 'updated any time'), T('توصل من أي مكان فيه اتصال مناسب', 'reach almost anywhere'), T('تفاعل بالنماذج والتعليقات', 'interact via forms, comments'), T('من المتصفح، وبعض التطبيقات تتثبّت', 'just a browser, no app')], c: 'green' },
        ] },
        { t: 'cards', ic: '🚧', title: T('قيود المواقع', 'Website constraints'), cols: 1, items: [
          { ic: '⚠️', h: T('تلات قيود', 'Three limits'), list: [T('معظم الوظائف محتاجة اتصال (وبعض المواقع توفر محتوى محدود من غيره)', 'usually need internet (unless cached)'), T('غالبًا لازم يفتحها، إلا لو فيه إشعارات أو قنوات تانية', 'users must come themselves'), T('العرض والسرعة حسب الجهاز والشبكة', 'display, speed vary by device, network')], c: 'red' },
        ] },
      ],
      [{ t: 'sec', n: '3', label: T('اختيار الوسائط وفقًا للغرض', 'Choosing Media According to Purpose') }],
      [{ t: 'tree', ic: '🎯', title: T('الاختيار حسب الغرض', 'Choosing by purpose'), root: { h: T('اختيار الوسيط: الغرض؟ الجمهور المستهدف؟ الموارد؟', 'Choosing media: your goal? your target audience?'), c: 'violet' }, kids: [
        { ic: '📺', h: T('وصول واسع بسرعة', 'Wide, fast reach'), p: T('تلفزيون · إعلانات التواصل', 'TV · social ads'), c: 'blue' },
        { ic: '🌐', h: T('تفاصيل يرجعولها', 'Details to revisit'), p: T('موقع: كمية كبيرة منظمة في صفحات وأقسام', 'a website: no limit on volume, view any time'), c: 'violet' },
        { ic: '✉️', h: T('رسالة لناس بعينهم', 'To specific people'), p: T('إيميل · رسايل مباشرة', 'e-mail · direct messages'), c: 'amber' },
        { ic: '💬', h: T('انتشار بالتناقل', 'Spread by sharing'), p: T('تواصل: يشاركوا بإرادتهم', 'SNS: shared willingly'), c: 'pink' },
      ] }],
      [{ t: 'flow', ic: '🔗', title: T('بنجمع الوسائط: كل واحد يسدّ ضعف التاني', 'Combining media: each covers the other'), items: [
        { ic: '📺', h: T('إعلان تلفزيوني', 'TV advert'), p: T('يجذب الانتباه', 'grabs attention'), c: 'blue' },
        { ic: '🌐', h: T('موقع', 'Website'), p: T('العمق والتفاصيل', 'depth and detail'), c: 'violet' },
        { ic: '💬', h: T('تواصل اجتماعي', 'Social media'), p: T('ينشرها', 'spreads it'), c: 'pink' },
      ] }],
      [{ t: 'note', ic: '👨‍👦‍👦', c: 'amber', p: T('**فكّر في الجمهور:** عيلة من غير إنترنت مش هيوصلها الموقع — يوصلها راديو أو ملصق مطبوع.', '**Think of the audience:** a family with no internet will not get a website — radio or a printed poster reaches them.') }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('التلفزيون بيتيح تفاعلًا في الاتجاهين؟', 'TV allows two-way interaction?'), a: T('غلط: عادةً من المرسل للمتلقي', 'False: one-way') },
        { q: T('الموقع بيعرض نص وصور وفيديو مع بعض؟', 'A website combines text, images and video?'), a: T('صح', 'True') },
        { q: T('وسائل التواصل فعالة في نشر المعلومات بسرعة؟', 'SNS spreads information rapidly?'), a: T('صح', 'True') },
        { q: T('الموقع بيتشاف من غير اتصال؟', 'A website is normally viewable offline?'), a: T('غلط: معظم وظائفه محتاجة اتصال', 'False: it normally needs a connection') },
        { q: T('إتاحة معلومات تفصيلية للاطلاع في أي وقت', 'Detailed information viewable at any time'), a: T('الموقع الإلكتروني', 'Website') },
        { q: T('جعل المستخدمين ينشرون المعلومة بالتناقل', 'Users spread information by word of mouth'), a: T('وسائل التواصل الاجتماعي', 'SNS') },
        { q: T('إعلام عدد كبير من الناس في آن واحد بالفيديو', 'Inform many people at once with video'), a: T('التلفزيون', 'TV') },
        { q: T('إيصال معلومة لأشخاص محددين', 'Deliver information to specific people'), a: T('البريد الإلكتروني والرسائل المباشرة', 'Email and direct messages') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا قد تستخدم مؤسسة موقعًا وتلفزيونًا ووسائل تواصل معًا للترويج لخدمة جديدة.', 'Explain why an organization might use a website, TV, and SNS together to promote a new service.'), items: [
        T('التلفزيون: انتشار واسع', 'TV: wide reach'),
        T('الموقع: العمق والتفاصيل', 'Website: full detail, any time'),
        T('وسائل التواصل: النشر بالتناقل', 'SNS: word of mouth'),
        T('كل وسيلة بتقوم باللي بتجيده', 'Each medium does what it does best'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('التلفزيون تفاعل في الاتجاهين', 'TV is two-way'), good: T('اتجاه واحد', 'One-way') },
        { bad: T('الموقع بيتشاف من غير إنترنت', 'A website needs no internet'), good: T('معظم وظائفه محتاجة اتصال', 'Usually needs a connection') },
        { bad: T('المعلومة بتوصل من غير ما يدخلوا', 'Information arrives without visiting'), good: T('غالبًا لازم يفتحه', 'Users must visit') },
        { bad: T('وسيط واحد أو الموقع يكفي دايمًا', 'One medium or a site always suffices'), good: T('الأنسب حسب الغرض والجمهور', 'The best fit for purpose, audience') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('مفيش وسيلة هي الأفضل لكل شيء: طابق الوسيلة مع الغرض والجمهور، واجمع بين الوسائط بحيث تقوم كل واحدة بما تجيده.', 'No medium is best for everything — match the medium to the purpose and audience, and combine media so each does what it does best.') }],
    ],
  });

  RV.addSheet('4-2', {
    lead: T('التصميم الكويس بيبدأ من المستخدم: مين؟ إيه يتحط فين؟ وبعدين نوضّحها ونقرّر لصالحه.', 'Good design starts from the user: who? what goes where? then make it clear and decide for them.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف يخطط المصممون لموقع إلكتروني حول مستخدميه، وما المبادئ التي تجعل الصفحة واضحة وسهلة الاستخدام؟', 'How do designers plan a website around its users, and what principles make a page clear and easy to use?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تنشئ وصفًا لمستخدم مستهدف من بيانات مناسبة', 'Explain how personas are used'),
          T('تستخدم مخططًا هيكليًا قبل التصميم البصري', 'Explain how wireframes are used'),
          T('تطبّق مبادئ CRAP لتبرير قرارات تصميمية', 'Apply the four principles of design'),
          T('تقيّم قرارًا من منظور قابلية الاستخدام والوصول', 'Explain user-centered design'),
        ] }],
      [{ t: 'flow', ic: '🪜', title: T('الترتيب', 'The order'), items: [
        { ic: '🪪', h: T('شخصية المستخدم', 'Persona'), p: T('مين؟', 'who?'), c: 'pink' },
        { ic: '📐', h: T('المخطط الهيكلي', 'Wireframe'), p: T('فين؟ قبل الألوان', 'where? no colour'), c: 'slate' },
        { ic: '🎨', h: 'CRAP', p: T('وضّحها', 'make it clear'), c: 'violet' },
        { ic: '🧭', h: 'UCD', p: T('قرّر للمستخدم', 'decide for the user'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '1', label: T('شخصية المستخدم والمخطط الهيكلي', 'Persona and Wireframe') }],
      [
        { t: 'cards', ic: '🪪', title: T('شخصية المستخدم (Persona)', 'Persona'), cols: 1, items: [
          { h: T('تمثيل لنوع من المستخدمين، مبني قدر الإمكان على بحث أو بيانات', 'A typical user as a specific person'), p: T('الأهداف · الاحتياجات · السلوك · السياق · التحديات (العمر والمهنة لو مهمين للتصميم)', 'age · occupation · purpose · challenges'), c: 'pink' },
          { h: T('مثال', 'Example'), p: T('موظف في التلاتينات، يقارن منتجات من الموبايل في المواصلات بسرعة', 'an office worker in their 30s comparing products by phone on the commute'), c: 'blue' },
          { h: T('فايدتها', 'Its use'), p: T('نناقش احتياج حقيقي بدل الافتراضات، ومش خطوة إلزامية في كل مشروع', '“what does this user need?” keeps design on track'), c: 'green' },
        ] },
        { t: 'draw', art: 'wire', ic: '📐', title: T('المخطط الهيكلي (Wireframe)', 'Wireframe'), cap: T('مخطط أولي لأماكن العناصر وأولوياتها · تفاصيل بصرية قليلة', 'Placement and priority · not a final design') },
      ],
      [{ t: 'note', ic: '💬', c: 'amber', p: T('**ليه قبل الألوان؟** لو بدأنا بالألوان النقاش يروح للذوق الشخصي («بحب الأزرق!»). لو ثبّتنا المكان والأولوية، النقاش يبقى عن احتياج المستخدم وأصحاب المصلحة يتفقوا.', '**Why before colour?** Colour first turns talk to taste (“I like blue!”). Fix placement first, and talk stays on user needs and stakeholders agree.') }],
      [{ t: 'sec', n: '2', label: T('المبادئ الأربعة للتصميم (CRAP)', 'The Four Principles of Design (CRAP)') }],
      [{ t: 'cards', ic: '🎨', title: T('مبادئ CRAP الأربعة (بصرية، مش بديل لقابلية الاستخدام وإمكانية الوصول)', 'The four CRAP principles'), cols: 4, items: [
        { ic: '🔆', h: T('التباين', 'Contrast'), p: T('يبرز الأهم: عناوين واضحة · تباين للأزرار المهمة من غير الاعتماد على اللون وحده', 'highlights priority: large bold titles, an accent colour on the Buy button'), c: 'red' },
        { ic: '🔁', h: T('التكرار', 'Repetition'), p: T('يوحّد: لون وحجم وخط العناوين والأيقونات، فالمستخدم مايتشتتش', 'unifies: same heading style, matching icons, so users do not get lost'), c: 'blue' },
        { ic: '📏', h: T('المحاذاة', 'Alignment'), p: T('ينظّم: خط أساس مشترك حسب اتجاه اللغة (العربي يمين لشمال) وشبكة التصميم', 'orders: a common baseline, one rule for left or centre'), c: 'amber' },
        { ic: '🧲', h: T('التقارب', 'Proximity'), p: T('يجمّع: صورة واسم وسعر مع بعض + مسافات مناسبة', 'groups: image, name, price together, with margins between items'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '3', label: T('التصميم المتمحور حول المستخدم', 'User-Centered Design (UCD)') }],
      [{ t: 'tree', ic: '🧭', title: T('التصميم المتمحور حول المستخدم (UCD)', 'User-centered design (UCD)'), root: { h: T('فهم المستخدمين وسياقهم أساس القرارات: نفهم ← ننظّم ← نصمّم ← نختبر ← نكرّر', 'The user’s view, not the designer’s comfort: what need? in what situation?'), c: 'green' }, kids: [
        { ic: '👆', h: T('قابلية الاستخدام', 'Usability'), p: T('سهولة وفاعلية إنجاز المهمة', 'ease of use'), c: 'blue' },
        { ic: '♿', h: T('إمكانية الوصول', 'Accessibility'), p: T('تمكين ذوي الإعاقة من استخدام الموقع', 'for a wide range of people'), c: 'violet' },
        { ic: '🪪', h: T('الشخصية', 'Persona'), p: T('أداة ممكنة، مش شرط دايمًا', 'one way to apply it'), c: 'pink' },
      ] }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('المخطط الهيكلي تصميم نهائي بالألوان؟', 'A wireframe is a final design with color?'), a: T('غلط: مخطط أولي بتفاصيل قليلة', 'False: a blueprint without decoration') },
        { q: T('التصميم المتمحور حول المستخدم بيقدّم راحة المصمم؟', 'UCD prioritizes the creator’s convenience?'), a: T('غلط: من منظور المستخدم', 'False: from the user’s perspective') },
        { q: T('إبراز المعلومات المهمة والأولوية بصريًا', 'Highlight important information'), a: T('التباين', 'Contrast') },
        { q: T('تكرار نفس النمط لمظهر موحد', 'Repeat the same style for unity'), a: T('التكرار', 'Repetition') },
        { q: T('محاذاة مواضع العناصر لمظهر منظم', 'Align elements for an organized look'), a: T('المحاذاة', 'Alignment') },
        { q: T('تجميع المعلومات المرتبطة قريبة من بعضها', 'Group related information close together'), a: T('التقارب', 'Proximity') },
        { q: T('أداء خادم الموقع معلومة مناسبة لشخصية المستخدم؟', 'Server performance belongs in a persona?'), a: T('غلط: مش من صفات المستخدم', 'False: it is not about the user') },
        { q: T('اسم المبادئ الأربعة بالأحرف الأولى', 'The four principles by initials'), a: T('CRAP', 'CRAP') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا ينشئ المصمم شخصية مستخدم ومخططًا هيكليًا قبل اختيار الألوان والخطوط.', 'Explain why a designer creates a persona and a wireframe before choosing colors and fonts.'), items: [
        T('شخصية المستخدم بتركّز النقاش على احتياج المستخدم', 'A persona keeps the design on what the user needs'),
        T('المخطط بيحدد مكان المعلومات وأولويتها أولًا', 'A wireframe fixes placement and priority first'),
        T('الألوان أولًا بتجر النقاش للذوق؛ والمكان أولًا بيسهّل اتفاق أصحاب المصلحة', 'Colors first drift to taste; placement first helps stakeholders agree'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('عنوان كبير غامق = تكرار', 'A big bold title = repetition'), good: T('تباين', 'Contrast') },
        { bad: T('تجميع الاسم والسعر والصورة = محاذاة', 'Grouping name, price, image = alignment'), good: T('تقارب', 'Proximity') },
        { bad: T('توحيد خط العناوين = تباين', 'One heading font = contrast'), good: T('تكرار', 'Repetition') },
        { bad: T('التشفير من مبادئ CRAP', 'Encryption is a CRAP principle'), good: T('مش منها', 'It is not') },
        { bad: T('المخطط الهيكلي تصميم نهائي بألوان', 'A wireframe is a final colour design'), good: T('مخطط بتفاصيل بصرية قليلة', 'A plan with no colour') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('شخصية المستخدم (من) ← المخطط الهيكلي (أين) ← CRAP (وضّح) ← UCD (قرّر لصالح المستخدم): صمّم من المستخدم إلى الداخل.', 'Persona (who) → wireframe (where) → CRAP (make it clear) → UCD (decide for the user). Design from the user inward.') }],
    ],
  });

  RV.addSheet('4-3', {
    lead: T('نقيّم نوعيًا (ليه) وكميًا (قد إيه) — والجمع بينهم بيدّي أوضح صورة.', 'We evaluate qualitatively (why) and quantitatively (how much) — together they give the clearest picture.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف يمكن تقييم موقع إلكتروني، ولماذا من المفيد الجمع بين الأرقام وآراء المستخدمين؟', 'How can a website be evaluated, and why are numbers and users’ voices combined?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تميّز بين النوعي والكمي وتختار الطريقة المناسبة', 'Distinguish qualitative from quantitative evaluation'),
          T('تفسّر مؤشرات تحليلات الويب مع مراعاة حدودها', 'Explain the major indicators in web analytics'),
          T('تستخدم التقييم الإرشادي لتحديد مشكلة في الواجهة', 'Explain how heuristic evaluation works'),
          T('تجمع أكثر من نوع من الأدلة لتبرير توصية', 'Combine both approaches for a clearer picture'),
        ] }],
      [{ t: 'sec', n: '1', label: T('التقييم النوعي والكمي', 'Qualitative and Quantitative Evaluation') }],
      [{ t: 'tree', ic: '⚖️', title: T('نوعين التقييم', 'Two kinds of evaluation'), root: { h: T('تقييم الموقع', 'Evaluating a site'), c: 'violet' }, kids: [
        { ic: '🔍', h: T('التقييم النوعي = ليه؟', 'Qualitative evaluation = why?'), p: T('يفهم تجربة المستخدم وأسباب السلوك والمشكلات', 'explores reasons numbers cannot show'), list: [T('اختبار الاستخدام: نراقب الاستخدام الفعلي', 'usability testing: watch real use'), T('المقابلات: نسمع الاحتياجات والضيق', 'interviews: hear needs and frustrations'), T('التقييم الإرشادي: خبراء', 'heuristic evaluation: experts')], c: 'violet' },
        { ic: '📊', h: T('التقييم الكمّي = قد إيه؟', 'Quantitative evaluation = how much?'), p: T('يقيس السلوك والنتائج بأرقام ومقاييس محددة', 'numbers: objective, statistical'), list: [T('تحليلات الويب: إحدى أدواته', 'web analytics: the central method'), T('PV · الوقت · الارتداد · CVR', 'PV · time · bounce · CVR'), T('اختبار A/B: نقارن خيارين', 'A/B testing: compare two options')], c: 'blue' },
      ] }],
      [{ t: 'note', ic: '🤝', c: 'green', p: T('الأرقام بتوصف **اللي بيحصل**… والمقابلات والملاحظة بتساعد نفهم **ليه**. المؤشر لوحده مايفسّرش السبب، والملاحظة مش بتمثّل كل المستخدمين — فالدراسة ممكن تجمع النوعين.', 'Numbers say **where** to look… voices say **why** — together the evaluation is more accurate.') }],
      [{ t: 'sec', n: '2', label: T('المؤشرات الرئيسية في تحليلات الويب', 'Major Indicators in Web Analytics') }],
      [
        { t: 'draw', art: 'funnel', ic: '🎯', title: T('من الزيارة للهدف', 'From visit to goal') },
        { t: 'cards', ic: '📈', title: T('مؤشرات تحليلات الويب', 'Web analytics measures'), cols: 1, items: [
          { ic: '👁️', h: T('PV: مشاهدات الصفحة', 'PV: page views'), p: T('إجمالي مرات المشاهدة، وممكن فيها تكرار · مش عدد الأشخاص', 'total views · how widely seen'), c: 'blue' },
          { ic: '🚪', h: T('معدل الارتداد', 'Bounce rate'), p: T('تعريفه يختلف حسب أداة التحليل · مع مؤشرات تانية يوضّح ضعف التفاعل، ومايفسّرش السبب', 'visits that ended after only the first page · did it meet expectations?'), c: 'amber' },
          { ic: '🎯', h: T('معدل التحويل CVR', 'Conversion rate (CVR)'), p: T('نسبة المستخدمين أو الجلسات اللي حققت إجراء مستهدف (شراء، تسجيل)، مع تحديد المقام', 'share of visits reaching a target action (purchase, registration)'), c: 'green' },
        ] },
      ],
      [{ t: 'sec', n: '3', label: T('التقييم الإرشادي', 'Heuristic Evaluation') }],
      [{ t: 'cards', ic: '🧑‍💼', title: T('التقييم الإرشادي: خبراء يراجعوا الواجهة بقواعد عملية (نوعي) · 3 أمثلة', 'Heuristic evaluation: experts + rules of thumb on the UI (qualitative, with usability tests)'), cols: 3, items: [
        { ic: '🔁', h: T('الاتساق', 'Consistency'), p: T('التصميم والعمليات موحّدة', 'unified design and actions'), c: 'violet' },
        { ic: '🛑', h: T('منع الأخطاء', 'Error prevention'), p: T('التصميم يصعّب الغلط', 'design makes mistakes hard'), c: 'red' },
        { ic: '💡', h: T('وضوح حالة النظام', 'Visible system status'), p: T('مؤشر تحميل · رسايل خطأ الإدخال', 'loading indicator · input errors'), c: 'amber' },
      ] }],
      [{ t: 'flow', ic: '🛒', title: T('مثال: PV عالي و CVR واطي', 'Example: high PV, low CVR'), items: [
        { ic: '📊', h: T('الأرقام: فين؟', 'Numbers: where?'), p: T('بين الدخول والشراء', 'between arrival and purchase'), c: 'blue' },
        { ic: '🧪', h: T('اختبار استخدام: ليه؟', 'Usability test: why?'), p: T('زرار الدفع مستخبي', 'the pay button is hidden'), c: 'violet' },
        { ic: '🆎', h: T('A/B يحسم التغيير', 'A/B settles the change'), p: T('بعد ما الأصوات تكشف المشكلة', 'after voices reveal the problem'), c: 'green' },
      ] }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('التقييم النوعي بيستخدم بيانات عددية؟', 'Qualitative evaluation uses numerical data?'), a: T('غلط: ده الكمي', 'False: that is quantitative') },
        { q: T('عدد مرات مشاهدة صفحة', 'The number of times a page is viewed'), a: T('PV', 'PV') },
        { q: T('نسبة اللي حققوا إجراء مستهدفًا', 'Share of visits reaching a target action'), a: T('معدل التحويل CVR', 'Conversion rate (CVR)') },
        { q: T('معدل الارتداد بيوضح تحقيق الهدف؟', 'Bounce rate shows achieving a target?'), a: T('غلط: ده معدل التحويل', 'False: that is the conversion rate') },
        { q: T('خبراء يراجعون الواجهة بقواعد عملية', 'Experts identify UI problems by rules of thumb'), a: T('التقييم الإرشادي', 'Heuristic evaluation') },
        { q: T('مراقبة عمليات فعلية لتحديد نقاط صعبة', 'Observing real use to find hard points'), a: T('اختبار قابلية الاستخدام', 'Usability testing') },
        { q: T('مقارنة خيارين للتحقق من الأفضل', 'Comparing two options'), a: T('اختبار A/B', 'A/B testing') },
        { q: T('التصميم يصعّب ارتكاب الأخطاء', 'Design makes mistakes hard'), a: T('منع الأخطاء', 'Error prevention') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا ينبغي لفريق موقع استخدام التقييم النوعي والكمي معًا.', 'Explain why a website team should use both qualitative and quantitative evaluation.'), items: [
        T('الأرقام بتوضح اللي بيحصل ومقداره', 'Numbers show what is happening and how much'),
        T('الملاحظة والمقابلات بتساعد نفهم السبب', 'Users’ voices and expert checks reveal why'),
        T('الجمع بينهما بيعطي تقييمًا أدق وطريق تحسين أوضح', 'Together they give the clearest path to improvement'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الارتداد = نسبة تحقيق الهدف', 'Bounce = goal rate'), good: T('ده CVR', 'That is CVR') },
        { bad: T('التقييم الإرشادي كمّي', 'Heuristic evaluation is quantitative'), good: T('نوعي: خبراء + قواعد', 'Qualitative: experts + rules') },
        { bad: T('النوعي بيعتمد على الأرقام', 'Qualitative relies on numbers'), good: T('الأرقام = كمّي', 'Numbers = quantitative') },
        { bad: T('PV = عدد الأشخاص', 'Numbers alone explain why'), good: T('ممكن فيه تكرار', 'They show how much') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('التقييم الكمي (PV ومعدل الارتداد وCVR) يظهر مقدار الاستخدام، والتقييم النوعي (اختبارات الاستخدام والمقابلات والتقييم الإرشادي) يساعد نفهم السبب: اجمع بينهما.', 'Quantitative (PV, bounce rate, CVR) shows how much; qualitative (usability tests, interviews, heuristic checks) shows why. Combine both.') }],
    ],
  });

  RV.addSheet('4-4', {
    lead: T('الموقع عمره ما بيخلص: النسخة الأولى أحسن تخمين، والتحسين دورات متكرّرة.', 'A website is never finished: version one is a best guess, improvement comes in repeated cycles.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('لماذا يُعد تحسين الموقع عملية متكررة بدل مهمة تُنجز مرة واحدة، وكيف تقرر الفرق ما يجب تغييره؟', 'Why is improving a website a repeated loop rather than a one-time job, and how do teams decide what to change?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تطبّق دورة PDCA لتنظيم تحسين قابل للقياس', 'Explain the PDCA cycle'),
          T('تستخدم التفكير التصميمي لفهم مشكلة وتجربة حل', 'Explain the steps of design thinking'),
          T('تصمم اختبار A/B بفرق واضح ومقياس محدد', 'Describe how A/B testing compares two options'),
          T('تستخدم النتائج لتبرير قرار التحسين', 'Explain why improvement is repeated'),
        ] }],
      [{ t: 'sec', n: '1', label: T('دورة PDCA', 'The PDCA Cycle') }],
      [
        { t: 'cycle', ic: '🔁', title: T('دورة PDCA', 'The PDCA cycle'), center: T('تحسين مستمر', 'Continuous improvement'), items: [
          { h: T('P · خطّط', 'P · Plan'), p: T('هدف + خطة', 'goal + plan'), c: 'blue' },
          { h: T('D · نفّذ', 'D · Do'), p: T('حسب الخطة', 'as planned'), c: 'green' },
          { h: T('C · تحقّق', 'C · Check'), p: T('نقيس ونقارن بالهدف', 'measure'), c: 'amber' },
          { h: T('A · تصرّف', 'A · Act'), p: T('نعتمد أو نغيّر الخطة', 'next step'), c: 'red' },
        ] },
        { t: 'vflow', ic: '🌐', title: T('مثال: إكمال نموذج التسجيل', 'Example: bounce rate'), items: [
          { ic: '🎯', h: T('هدف: نرفع الإكمال من 40% لـ 50%', 'Goal: cut bounce by 10%'), p: T('ونخطّط لتغيير مناسب', 'plan: redesign the homepage'), c: 'blue' },
          { ic: '🛠️', h: T('نغيّر تصميم الصفحة الرئيسية', 'Change the homepage design'), c: 'green' },
          { ic: '📏', h: T('نقيس ونقارن بخط الأساس والهدف', 'Measure against the goal'), c: 'amber' },
          { ic: '↩️', h: T('حقق الهدف؟ نعتمده أو نوسّعه · لأ؟ نراجع السبب والخطة', 'Enough? continue · no? revise headings or images'), c: 'red' },
        ] },
      ],
      [{ t: 'note', ic: '🏭', c: 'blue', p: T('PDCA بتستخدم كمان في **تحسين الأعمال وإدارة الجودة**. المهم **مش نخلّص في جولة واحدة**، لكن نتعلّم من النتائج بالتكرار، والتغيير ممكن يكون صغير أو كبير حسب الهدف والدليل.', 'PDCA is also used in **business improvement and quality management**. The point is **not finishing in one round** but improving gradually.') }],
      [{ t: 'sec', n: '2', label: T('التفكير التصميمي', 'Design Thinking') }],
      [{ t: 'flow', ic: '🧠', title: T('التفكير التصميمي: طريقة مرنة لفهم المشكلة من منظور المستخدم وتجربة حلول', 'Design thinking: problems and solutions from the user’s view'), items: [
        { ic: '🤝', h: T('① التعاطف', '① Empathize'), p: T('تجربة المستخدم واحتياجاته', 'user challenges, needs'), c: 'pink' },
        { ic: '🎯', h: T('② التعريف', '② Define'), p: T('نوضّح المشكلة', 'clarify the problem'), c: 'violet' },
        { ic: '💡', h: T('③ توليد الأفكار', '③ Ideate'), p: T('أفكار كتير', 'many ideas'), c: 'amber' },
        { ic: '🧪', h: T('④ النموذج الأولي', '④ Prototype'), p: T('نموذج سريع', 'a quick model'), c: 'blue' },
        { ic: '👥', h: T('⑤ الاختبار', '⑤ Test'), p: T('يجرّبوه ونجمع ملاحظاتهم', 'users try, give feedback'), c: 'green' },
      ], back: T('نقدر نرجع بين الأنماط حسب النتيجة — مش مسار خطي صارم', 'Based on results we may return to empathize or define — back and forth') }],
      [{ t: 'sec', n: '3', label: T('اختبار A/B', 'A/B Testing') }],
      [
        { t: 'link', ic: '🆎', title: T('اختبار A/B', 'A/B testing'), w: 1.4, nodes: [
          { ic: '🔴', h: T('الخيار A', 'Option A'), p: T('زرار شراء أحمر', 'a red buy button'), c: 'red' },
          { ic: '🔵', h: T('الخيار B', 'Option B'), p: T('زرار شراء أزرق', 'a blue buy button'), c: 'blue' },
        ], edges: [{ to: T('مستخدمين حقيقيين', 'real users'), back: T('نفحص البيانات', 'check the data') }] },
        { t: 'cards', ic: '🔑', title: T('القواعد', 'The rules'), cols: 1, items: [
          { ic: '1️⃣', h: T('فرق واحد واضح ومحدد', 'One element at a time'), p: T('لو عايزين أثره؛ الحزمة بتقيس أثرها كلها بس', 'to know which change worked'), c: 'green' },
          { ic: '📊', h: T('المقياس وخطة التحليل قبل الاختبار، وعينة كافية قبل الحكم', 'Enough data first'), c: 'blue' },
        ] },
      ],
      [{ t: 'cards', ic: '🧭', title: T('كل طريقة بتجاوب إيه؟', 'What each answers'), cols: 3, items: [
        { ic: '🔁', h: 'PDCA', p: T('إزاي نكرّر؟', 'how do we repeat?'), c: 'blue' },
        { ic: '🧠', h: T('التفكير التصميمي', 'Design thinking'), p: T('نحسّن إيه وليه؟', 'what and why?'), c: 'violet' },
        { ic: '🆎', h: 'A/B', p: T('أنهي خيار؟ جوّه نفّذ/تحقّق', 'which option? inside Do/Check'), c: 'green' },
      ] }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('دورة PDCA بتخلص بعد تنفيذ واحد؟', 'PDCA is complete after one execution?'), a: T('غلط: قيمتها في التكرار', 'False: it is meaningful when repeated') },
        { q: T('التفكير التصميمي من منظور المطوّر؟', 'Design thinking uses the developer’s perspective?'), a: T('غلط: من منظور المستخدم', 'False: the user’s perspective') },
        { q: T('فهم تحديات المستخدم واحتياجاته', 'Understand the user’s challenges and needs'), a: T('التعاطف', 'Empathize') },
        { q: T('توضيح المشكلة المراد حلها', 'Clarify the problem'), a: T('التعريف', 'Define') },
        { q: T('توليد أفكار كثيرة', 'Generate many ideas'), a: T('توليد الأفكار', 'Ideate') },
        { q: T('إنشاء نموذج بسرعة', 'Quickly create a prototype'), a: T('النموذج الأولي', 'Prototype') },
        { q: T('جعل المستخدمين يجربون النموذج', 'Have users try the prototype'), a: T('الاختبار', 'Test') },
        { q: T('قياس النتيجة بعد التغيير: أنهي خطوة؟', 'Measuring after the change: which step?'), a: T('تحقّق (Check)', 'Check') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا يحسّن فريق موقعه عبر دورات PDCA متكررة بدل محاولة بناء موقع مثالي دفعة واحدة.', 'Explain why a website team improves in repeated PDCA cycles instead of trying to build a perfect site in one go.'), items: [
        T('النسخة الأولى مش مضمونة تكون مثالية', 'The first version is only a best guess'),
        T('كل دورة بتقيس النتائج وتتصرف بناءً عليها', 'Each cycle measures results and acts on them'),
        T('التحسين التكراري بيتعلم من الاستخدام الفعلي', 'Repeating learns from real use'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('PDCA بتخلص في جولة واحدة', 'PDCA ends after one round'), good: T('نتحسّن تدريجيًا بالتكرار', 'Improve gradually by repeating') },
        { bad: T('التفكير التصميمي من منظور المطوّر', 'Design thinking is the developer’s view'), good: T('من منظور المستخدم', 'The user’s view') },
        { bad: T('تغيير كذا عنصر يكشف أثر كل واحد', 'Change several elements together'), good: T('بيقيس أثر الحزمة بس', 'One element at a time') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('حسّن عبر حلقات: دورة PDCA للتحسين المستمر، والتفكير التصميمي من جانب المستخدم، واختبار A/B لحسم تغيير واحد بالبيانات.', 'Improve in loops: PDCA for continuous improvement, design thinking from the user’s side, and A/B testing to settle one change with data.') }],
    ],
  });
})();
