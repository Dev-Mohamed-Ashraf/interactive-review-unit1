/* =========================================================
 * content/checks-1-4.js — "✋ Check yourself" questions for lesson 1-4.
 * Pure data (see content/checks-1-1.js for the design rules).
 * ========================================================= */
(function () {
  const q = (n, body) => ({ type: 'quiz', title: { ar: `✋ اختبر فهمك (${n})`, en: `✋ Check yourself (${n})` }, q: body });

  RV.addSteps('1-4', 'bias', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'شالوا عمود «الجنس» من بيانات ذكاء التوظيف، بس التحيّز رجع تاني. إيه السبب الأقرب؟', en: 'They removed the "gender" column from a hiring AI’s data, but the bias came back. What is the likeliest cause?' },
      options: [
        { ar: 'متغيّر تاني مرتبط بيه زي اسم النادي أو الحي', en: 'Another variable linked to it, like club name or area' },
        { ar: 'الكمبيوتر بيفتكر العمود حتى بعد ما يتشال', en: 'The computer remembers the column after removal' },
        { ar: 'سرعة المعالجة كانت عالية زيادة عن اللزوم', en: 'The processing speed was far too high' },
        { ar: 'عدد المتقدّمين كان كبير جدًا السنة دي', en: 'There were too many applicants this year' },
      ],
      answer: 0,
      explain: { ar: 'ده **المتغيّر البديل (proxy)**: متغيّر __بيمثّل المجموعة بشكل غير مباشر__ فبيرجّع التحيّز.', en: 'That is a **proxy variable**: something __linked__ to the group brings the bias back through the back door.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'نظام تعرّف على الوجه بيغلط أكتر مع مجموعة معيّنة من الناس. إيه أنسب حل؟', en: 'A face-recognition system makes more mistakes with one group of people. What is the best fix?' },
      options: [
        { ar: 'نزوّد صورها في التدريب ونختبر النتايج لكل مجموعة', en: 'Add enough photos of that group and test results per group' },
        { ar: 'نزوّد سرعة المعالج عشان يحلّل الصور بشكل أسرع', en: 'Use a faster processor so it analyses images faster' },
        { ar: 'نقلّل عدد الصور في بيانات التدريب كلها بالتساوي', en: 'Reduce the number of photos in all the training data' },
        { ar: 'نمنع المجموعة دي من استخدام النظام خالص عشان الغلط', en: 'Ban that group from using the system at all' },
      ],
      answer: 0,
      explain: { ar: 'السبب إن صورهم كانت __قليلة__ في التدريب. الحل: بيانات __متوازنة وممثّلة__ + اختبار النتايج __لكل مجموعة__.', en: 'Their photos were __scarce__ in training. Fix: __balanced, representative__ data + testing results __for every group__.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'التحيّز ممكن يدخل كمان من اختيار المتغيّرات أو تصميم النموذج.', en: 'Bias can also enter through the choice of variables or the model design.' }, answer: true },
        { text: { ar: 'شيل عمود «المجموعة» من البيانات كفاية لوحده إنه يمنع التحيّز.', en: 'Removing the "group" column is enough on its own to stop bias.' }, answer: false, explain: { ar: 'لأ — __المتغيّر البديل__ ممكن يرجّعه. لازم نختبر النتايج لكل مجموعة.', en: 'No — a __proxy variable__ can bring it back. Results must be tested per group.' } },
        { text: { ar: 'الذكاء الاصطناعي مستحيل يكون متحيّز لأنه آلة.', en: 'AI can never be biased because it is a machine.' }, answer: false, explain: { ar: 'بيتعلّم من __بيانات البشر__ — لو البيانات ظالمة، بيتعلّم الظلم ويكرّره.', en: 'It learns from __human data__ — if the data is unfair, it learns and repeats the unfairness.' } },
        { text: { ar: 'اختبار نتايج النموذج لكل مجموعة قبل استخدامه بيساعد يقلّل التحيّز.', en: 'Testing the model’s results for each group before use helps reduce bias.' }, answer: true },
      ],
    }),
  ]);

  RV.addSteps('1-4', 'privacy', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'اختار __كل__ المواقف اللي فيها خطر على الخصوصية:', en: 'Choose __all__ the situations that threaten privacy:' },
      options: [
        { ar: 'تطبيق كشّاف بيجمع مكانك طول الوقت من غير سبب', en: 'A flashlight app tracking your location all the time for no reason' },
        { ar: 'كاميرات شارع بتتعرّف على كل واحد وتسجّل حركته', en: 'Street cameras identifying everyone and logging their moves' },
        { ar: 'تطبيق خرايط بياخد مكانك وإنت بتستخدمه للطريق', en: 'A maps app using your location while you navigate' },
        { ar: 'آلة حاسبة بتحسب الأرقام اللي بتكتبها', en: 'A calculator computing the numbers you type' },
      ],
      answer: [0, 1],
      explain: { ar: 'الخطر = جمع بيانات __من غير داعي__ أو __تتبّع الأفراد__. الخرايط محتاجة مكانك لغرض واضح وقت الاستخدام = تعامل مناسب.', en: 'The risk = collecting data __with no need__ or __tracking individuals__. A maps app needs your location for a clear purpose while in use = appropriate.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'شركة جمعت أرقام تليفونات عشان توصيل الطلبات، وبعدين باعتها لشركة إعلانات. ده بيخالف أنهي مبدأ؟', en: 'A company collected phone numbers for deliveries, then sold them to an advertiser. Which principle does this break?' },
      options: [
        { ar: 'حماية الخصوصية', en: 'Privacy protection' },
        { ar: 'العدالة وعدم التمييز', en: 'Fairness (no discrimination)' },
        { ar: 'الشفافية في القرار', en: 'Transparency of decisions' },
        { ar: 'المساءلة والمحاسبة', en: 'Accountability' },
      ],
      answer: 0,
      explain: { ar: 'حماية الخصوصية = __ماتستخدمش البيانات لغرض غير اللي اتجمعت عشانه__.', en: 'Privacy protection = __do not use data for a purpose other than the one it was collected for__.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'اللايكات والبحث والمكان كلها بيانات ممكن تتجمع وتتحلّل عنك.', en: 'Likes, searches and location are all data that can be collected and analysed about you.' }, answer: true },
        { text: { ar: 'حماية الخصوصية معناها إن ماحدش يستخدم أي بيانات خالص.', en: 'Privacy protection means nobody may use any data at all.' }, answer: false, explain: { ar: 'معناها نتعامل معاها __بشكل مناسب__: يتشارك بس اللي لازم ولغرض واضح.', en: 'It means handling it __appropriately__: share only what is needed, for a clear purpose.' } },
        { text: { ar: 'كاميرات التعرف على الوجه في الأماكن العامة ممكن تتتبّع الأفراد.', en: 'Face-recognition cameras in public places can track individuals.' }, answer: true },
      ],
    }),
  ]);

  RV.addSteps('1-4', 'xai', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'XAI قال للمتقدّم: «لو خبرتك كانت 3 سنين كنت اتقبلت». دي أنهي طريقة شرح؟', en: 'XAI told an applicant: "with 3 years of experience you would have been accepted". Which explanation method is this?' },
      options: [
        { ar: '«لو كان… كان اتقبل»', en: '"If… you would have been accepted"' },
        { ar: 'أهمية كل عامل في القرار', en: 'Importance of each factor' },
        { ar: 'الخريطة الحرارية للصورة', en: 'Heat map on the image' },
        { ar: 'فتح الصندوق الأسود كله', en: 'Opening the whole black box' },
      ],
      answer: 0,
      explain: { ar: 'بيقول __أصغر تغيير__ كان هيقلب النتيجة — فالشخص يفهم ويقدر يتحسّن.', en: 'It states the __smallest change__ that would flip the result — so the person understands and can improve.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'تشخيص ذكاء اصطناعي طلع غلط وأذى مريض. حسب الدرس، مين المسؤول؟', en: 'An AI diagnosis was wrong and harmed a patient. According to the lesson, who is responsible?' },
      options: [
        { ar: 'مفيش معيار واحد لكل السياقات', en: 'There is no clear agreed standard yet; opinions differ' },
        { ar: 'المطوّر لوحده دايمًا وفي كل الحالات', en: 'Always the developer alone, in every case' },
        { ar: 'المريض، لأنه وافق إنه يستخدم النظام', en: 'The patient, for agreeing to use the system' },
        { ar: 'محدش خالص، لأن الآلة هي اللي غلطت', en: 'Nobody, because the machine made the mistake' },
      ],
      answer: 0,
      explain: { ar: 'الأدوار بتختلف بين __المطوّر والمشغِّل والجهة المستخدمة والمستخدِم__، و__مفيش معيار واحد لكل السياقات__ — بس لازم تتحدد الجهات المسؤولة (المساءلة).', en: 'Opinions differ between __developer, user and operator__, and __there is no clear standard yet__ — but someone must be accountable.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'الخريطة الحرارية بتلوّن المكان اللي النموذج بنى عليه التشخيص.', en: 'A heat map colours the area the model based its diagnosis on.' }, answer: true },
        { text: { ar: 'هدف XAI إنه يخلّي النموذج أسرع في المعالجة.', en: 'The goal of XAI is to make the model process faster.' }, answer: false, explain: { ar: 'هدفه إن البشر __يفهموا ليه__ النموذج أخد الحكم.', en: 'Its goal is for humans to __understand why__ the model made a decision.' } },
        { text: { ar: 'لما نفهم «ليه» النموذج قرّر، نقدر نكتشف التحيّز ونحاسب.', en: 'Once we understand why the model decided, we can detect bias and hold people accountable.' }, answer: true },
      ],
    }),
  ]);

  RV.addSteps('1-4', 'principles', [
    q(1, {
      widget: 'mcq',
      prompt: { ar: 'نظام بيقول للمتقدّم: «اترفضت بسبب نقص الخبرة، وده تأثير كل عامل في القرار». ده تطبيق لأنهي مبدأ؟', en: 'A system tells an applicant: "rejected for lack of experience — here is how each factor counted". Which principle is this?' },
      options: [
        { ar: 'الشفافية', en: 'Transparency' },
        { ar: 'العدالة', en: 'Fairness' },
        { ar: 'حماية الخصوصية', en: 'Privacy protection' },
        { ar: 'المساءلة', en: 'Accountability' },
      ],
      answer: 0,
      explain: { ar: 'الشفافية = __إظهار عملية اتخاذ القرار__ بوضوح للمستخدم.', en: 'Transparency = __showing how the decision is made__ clearly to the user.' },
    }),
    q(2, {
      widget: 'mcq',
      prompt: { ar: 'شركة عيّنت فريق مسؤول عن مراجعة أخطاء الذكاء الاصطناعي وتحمّل نتيجتها. ده أنهي مبدأ؟', en: 'A company appointed a team responsible for reviewing AI mistakes and answering for them. Which principle?' },
      options: [
        { ar: 'المساءلة', en: 'Accountability' },
        { ar: 'الشفافية', en: 'Transparency' },
        { ar: 'العدالة', en: 'Fairness' },
        { ar: 'حماية الخصوصية', en: 'Privacy protection' },
      ],
      answer: 0,
      explain: { ar: 'المساءلة = __تحديد الجهات المسؤولة__ وإمكان محاسبتها.', en: 'Accountability = someone is __responsible and answerable__ for the AI’s decisions.' },
    }),
    q(3, {
      widget: 'tf',
      items: [
        { text: { ar: 'العدالة معناها إن النظام مايميّزش ظلمًا ضد أي شخص أو مجموعة.', en: 'Fairness means the system does not unfairly discriminate against anyone.' }, answer: true },
        { text: { ar: 'الشفافية معناها إن بيانات المستخدمين تفضل سرّية.', en: 'Transparency means users’ data stays secret.' }, answer: false, explain: { ar: 'ده __حماية الخصوصية__. الشفافية = إظهار __إزاي النظام بيقرّر__.', en: 'That is __privacy protection__. Transparency = showing __how the system decides__.' } },
        { text: { ar: 'المساءلة معناها تحديد الجهات المسؤولة وإمكان محاسبتها وفق أدوارها.', en: 'Accountability means someone is responsible and answerable for AI decisions.' }, answer: true },
        { text: { ar: 'النظام يبقى عادل طالما سريع ودقيق، حتى لو ظلم مجموعة.', en: 'A system is fair as long as it is fast and accurate, even if it wrongs one group.' }, answer: false, explain: { ar: 'العدالة مش السرعة ولا الدقة العامة — لو ظلم __أي مجموعة__ يبقى مش عادل.', en: 'Fairness is not speed or overall accuracy — wronging __any group__ makes it unfair.' } },
      ],
    }),
  ]);
})();
