/* =========================================================
 * content/lesson-5-1.js — طرق جمع البيانات
 * Pure data. Sources: textbook part 2, 5-1 (EN p.4–11) + memo (Arabic
 * wording, deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('5-1', {
  id: '5-1',
  color: '#0ea5e9',
  cover: 'img/da-l1-cover.webp',
  title: { ar: 'طرق جمع البيانات', en: 'Methods of Data Collection' },
  guiding: { ar: 'إزاي تجمع بيانات تقدر تثق فيها، وإزاي عينة صغيرة تمثّل مجتمع كامل بعدل؟', en: 'How do you collect data you can trust, and how can a small sample fairly represent a whole population?' },
  hook: {
    ar: 'قبل ما تثق في اللي البيانات بتقوله، لازم تثق في __طريقة جمعها__. التحليل الكويس بيمشي في تلات مراحل: **جمع ← تنظيم ← تحليل** — ولو جمعت البيانات الغلط، مفيش شغل دقيق بعد كده يصلّحها. بيانات بتجمعها بنفسك لغرضك (**أولية**)، وبيانات جمعها غيرك (**ثانوية**). ولما المجموعة تبقى أكبر من إنك تسأل كل الناس، بتدرس **عينة** — بس العينة العادلة بس هي اللي تتكلم باسم الكل. __العينة المتحيّزة بتدّي إجابة واثقة… بس غلط.__',
    en: 'Before you can trust what data tells you, you have to trust __how it was gathered__. Good analysis moves through **collection → organization → analysis** — and if the wrong data is collected, no careful work later can rescue it. Some data you gather yourself for your purpose (**primary**); some already exists, gathered by others (**secondary**). When a group is too large to survey, you study a **sample** — but only a fair sample can speak for the whole. __A biased sample gives a confident answer that is simply wrong.__',
  },
  keyFact: { ar: 'التحليل الكويس بيبدأ بجمع كويس: __الأولية__ بتتجمع من جديد لغرض، و__الثانوية__ موجودة قبل كده، و__أخذ العينات__ بيدرس جزء من المجتمع عشان يقدّر الكل — و__العينة غير المتحيّزة__ بس هي اللي بتدعم استنتاجات صحيحة.', en: 'Good analysis starts with good collection: __primary__ data is gathered fresh for a purpose, __secondary__ data already exists, __sampling__ studies part of a population to estimate the whole — and only an __unbiased sample__ supports valid conclusions.' },
  concepts: ['data collection', 'primary data', 'secondary data', 'population', 'sample', 'census', 'simple random sampling', 'stratified sampling', 'sampling bias'],
  objectives: [
    { ar: 'أفرّق بين البيانات الأولية والثانوية وأشرح إمتى تناسب كل واحدة.', en: 'Distinguish primary from secondary data and explain when each is appropriate.' },
    { ar: 'أشرح إزاي أخذ العينات بيشتغل، وإزاي تحيّز المعاينة بيوصّل لاستنتاجات واثقة بس غلط.', en: 'Explain how sampling works, and how sampling bias can lead to confident but wrong conclusions.' },
  ],

  stations: [
    /* ───────────── 1 · primary & secondary data ───────────── */
    {
      id: 'collect', kind: 'learn',
      title: { ar: 'مرحلة الجمع: بيانات أولية وثانوية', en: 'The collection stage: primary and secondary data' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'عايز تعرف طلبة مدرستك بيناموا كام ساعة… هتعمل إيه؟', en: 'You want to know how long students at your school sleep… what would you do?' },
            options: [
              { emoji: '📋', text: { ar: 'أعمل استبيان بنفسي', en: 'Make my own survey' } },
              { emoji: '🌐', text: { ar: 'أدوّر على إحصائية جاهزة', en: 'Look for a ready-made statistic' } },
              { emoji: '🤷‍♂️', text: { ar: 'أسأل صحابي بس', en: 'Just ask my friends' } },
            ],
            after: { ar: 'كل اختيار ليه اسم… وليه مشاكله 👇', en: 'Each choice has a name… and its own problems 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: من الغرض لحد نوع البيانات', en: '🎞️ Animation: from the purpose to the kind of data' },
          enTitle: 'Collection, primary and secondary data',
          terms: ['data collection', 'primary data', 'secondary data'],
          visual: { anim: 'collectMovie', props: { scenes: [0, 3] } },
          beats: [
            { ar: 'تحليل البيانات بيمشي في تدفّق **«جمع ← تنظيم ← تحليل»** بعد ما __الغرض يتوضّح__. في **جمع البيانات** (أول مرحلة) لازم نخطّط __هنجمع إيه وإزاي__ حسب الغرض. ولو جمعنا بيانات __مش مطابقة للغرض__، __مستحيل__ نطلع باستنتاجات مناسبة مهما كان التنظيم والتحليل دقيق — عشان كده مرحلة الجمع بتحدّد __جودة التحليل كله__.', en: 'Data analysis follows **"collection → organization → analysis"** after the __purpose is clear__. In **data collection** (the first stage) we must plan __what to gather and how__, in line with the purpose. If data that __does not match the purpose__ is collected, it is __impossible__ to draw proper conclusions however careful the later work — so collection decides __the quality of the entire analysis__.' },
            { ar: '🆕 **البيانات الأولية:** بيانات __بتتجمع من جديد__ عشان تناسب __غرض محدّد__ — زي __الاستبيانات والمقابلات والملاحظة والتجارب__. ✅ قوتها: بنودها متصمّمة على قد الغرض ← __جودتها حسب التصميم والتنفيذ__ (قلب التحليل). ⏳ قيدها: الجمع بياخد __وقت وجهد وتكلفة__.', en: '🆕 **Primary data:** data __newly collected__ to fit a __specific purpose__ — e.g. __surveys, interviews, observations, experiments__. ✅ Strength: the items are designed for the purpose → __excellent originality and reliability__ (the core of an analysis). ⏳ Constraint: collection takes __time, effort and cost__.' },
            { ar: '📚 **البيانات الثانوية:** بيانات __موجودة مسبقًا جمعها غيرنا__ وبنستخدمها في التحليل — زي __البيانات المفتوحة، الإحصائيات الموجودة، تقارير القطاعات__. ⚡ قوتها: __كمية كبيرة في وقت قصير__. ⚠️ قيدها: ممكن __ماتطابقش غرضك بالظبط__، وممكن يكون حصل __تحيّز أو حذف__ وهي بتتحرّر أو تتلخّص.', en: '📚 **Secondary data:** data __already collected and made public by others__, used in analysis — e.g. __open datasets, existing statistics, industry reports__. ⚡ Strength: __large amounts quickly__. ⚠️ Constraints: it may __not match your purpose exactly__, and __bias or omissions__ may have arisen during editing or summarizing.' },
            { ar: '🤝 الأولية __قيمتها في موثوقيتها وأصالتها__، والثانوية __قيمتها في الحجم__ — إحصائيات كبيرة مانقدرش نجمعها لوحدنا. في التحليل الحقيقي بنجمع __الاتنين__ حسب الغرض والقيود. 💡 فكّر: تعداد حكومي __نزّلته__ = بيانات __ثانوية__ بالنسبة لك (أنت ماجمعتهوش).', en: '🤝 Primary data is valued for __reliability and originality__; secondary for __scale__ — large statistics we could not gather alone. In real analysis the __two are combined__ by purpose and constraints. 💡 Think: a government census __you download__ is __secondary__ data for you (you did not gather it).' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل مصدر بيانات أولية ولا ثانوية (بالنسبة لك)؟', en: 'Is each source primary or secondary data (for you)?' },
            groups: [{ icon: 'target', label: { ar: 'أولية', en: 'Primary' } }, { icon: 'book', label: { ar: 'ثانوية', en: 'Secondary' } }],
            items: [
              { text: { ar: 'استبيان صمّمته لزمايلك', en: 'A survey you designed for classmates' }, group: 0 },
              { text: { ar: 'إحصائية سكان من الحكومة', en: 'Government population statistics' }, group: 1 },
              { text: { ar: 'تجربة عملتها في المعمل', en: 'An experiment you ran in the lab' }, group: 0 },
              { text: { ar: 'تقرير منشور لهيئة قطاعية', en: 'A published industry-body report' }, group: 1 },
              { text: { ar: 'ملاحظتك لحركة الشارع قدّام المدرسة', en: 'Your own observation of traffic outside school' }, group: 0 },
            ],
            explain: { ar: 'أنت جمعتها لغرضك = __أولية__ · غيرك جمعها قبل كده = __ثانوية__.', en: 'You gathered it for your purpose = __primary__ · someone else gathered and published it = __secondary__.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'البيانات الأولية موجودة مسبقًا جمعها غيرنا قبل كده.', en: 'Primary data was already collected and published by others.' }, answer: false, explain: { ar: 'دي __الثانوية__؛ الأولية بنجمعها من جديد لغرضنا.', en: 'That is __secondary__; primary is gathered fresh for our purpose.' } },
            { text: { ar: 'لو جمعنا بيانات مش مطابقة للغرض، التحليل الدقيق بعد كده يصلّحها.', en: 'If unsuitable data is collected, careful analysis later can fix it.' }, answer: false, explain: { ar: 'مستحيل — الجمع بيحدّد جودة التحليل كله.', en: 'Impossible — collection decides the quality of the whole analysis.' } },
            { text: { ar: 'عمليًا بنجمع بين الأولية والثانوية حسب الغرض والقيود.', en: 'In practice primary and secondary data are combined by purpose and constraints.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**جمع ← تنظيم ← تحليل** بعد وضوح الغرض · الجمع بيحدّد جودة كل حاجة بعده.', en: '**Collect → organize → analyze** once the purpose is clear · collection decides the quality of everything after.' },
            { ar: '**أولية:** نجمعها من جديد (استبيان، مقابلة، ملاحظة، تجربة) · موثوقة بس مكلّفة.', en: '**Primary:** gathered fresh (survey, interview, observation, experiment) · reliable but costly.' },
            { ar: '**ثانوية:** جمعها غيرنا (بيانات مفتوحة، إحصائيات، تقارير) · سريعة وكبيرة بس ممكن ماتطابقش أو تبقى متحيّزة.', en: '**Secondary:** gathered by others (open data, statistics, reports) · fast and large but may not fit or may be biased.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · sampling + sampling bias ───────────── */
    {
      id: 'sample', kind: 'learn',
      title: { ar: 'أخذ العينات وتحيّز المعاينة', en: 'Sampling and sampling bias' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: عينة عادلة… وعينة بتضلّل', en: '🎞️ Animation: a fair sample… and a misleading one' },
          enTitle: 'Sampling and sampling bias',
          terms: ['population', 'sample', 'census', 'simple random sampling', 'stratified sampling', 'sampling bias'],
          visual: { anim: 'collectMovie', props: { scenes: [4, 9] } },
          beats: [
            { ar: 'المجموعة __الكاملة__ اللي بنحلّلها اسمها **المجتمع الإحصائي**، والجزء اللي __بندرسه فعلًا__ منها اسمه **العينة**. لو مسحنا المجتمع كله = **حصر شامل (تعداد)**؛ ولو مسحنا عينة مختارة = **مسح بالعينة**. و**أخذ العينات** = اختيار عينة من المجتمع — و__موثوقية الاستنتاجات بتفرق جدًا حسب الطريقة__.', en: 'The __whole__ group being analyzed is the **population**; the part __actually surveyed__ is the **sample**. Surveying everyone = a **census**; surveying a chosen sample = a **sample survey**. **Sampling** = selecting a sample from the population — and __the reliability of conclusions varies greatly with the method__.' },
            { ar: '🎲 **المعاينة العشوائية البسيطة:** بنختار العينة من المجتمع __بالصدفة البحتة من غير تحيّز__ — __كل واحد ليه فرصة معروفة ومتساوية__. دي الطريقة الأساسية، وتنفع __حتى لو معلوماتنا عن المجتمع قليلة__. المعاينة العشوائية بتخلّي العينة غالبًا __تمثّل المجتمع__، فنقدر نعمّم النتايج على الكل.', en: '🎲 **Simple random sampling:** the sample is chosen __purely by chance, without bias__ — __every unit has a known, equal chance__. It is the basic method and works __even with little knowledge of the population__. Random sampling makes the sample likely to __represent the population__, so results can be generalized.' },
            { ar: '🧁 **المعاينة الطبقية:** بنقسّم المجتمع __طبقات__ (زي النوع أو الفئة العمرية أو الصف)، وبعدين بنختار __عينة عشوائية من كل طبقة__ — فالعينة __بتعكس تركيب المجتمع__ (لو طبقة = 50% من المجتمع، تبقى 50% من العينة). مفيدة لما __الفروق بين الطبقات بتأثّر__ في التحليل، فتقلّل التحيّز.', en: '🧁 **Stratified sampling:** divide the population into __strata__ (e.g. gender, age group, year), then choose __a random sample from each stratum__ — so the sample __mirrors the population’s make-up__ (a stratum that is 50% of the population is 50% of the sample). Useful when __differences between strata matter__, reducing bias.' },
            { ar: '⚠️ **تحيّز المعاينة:** لما __طريقة اختيار العينة نفسها متحيّزة__ فماتعكسش حالة المجتمع الحقيقية ← __مانقدرش نعمّم__ الاستنتاجات. أنواعه: 🙋‍♂️ **الاختيار الذاتي** (اللي عايز يرد بس هو اللي بيرد — استبيان ويب يرد عليه المهتمين بس) · 🎭 **تحيّز الاستجابة** (مش مشكلة اختيار — الناس بتقول الإجابة «المرغوبة» مش الدقيقة، زي وقت مذاكرة أطول من الحقيقة: __خطأ قياس__) · 🚉 **تحيّز الزمان/المكان** (مسح قدّام محطة الضهر أيام الشغل ← يغيب الموظفين والطلبة).', en: '⚠️ **Sampling bias:** when __the way the sample is selected is biased__ so it does not reflect the population → conclusions __cannot be generalized__. Kinds: 🙋‍♂️ **self-selection** (only those who want to reply do — a web survey answered only by the keen) · 🎭 **response bias** (not a selection problem — people give the desirable answer, e.g. a longer study time than real: a __measurement error__) · 🚉 **time/location bias** (surveying outside a station at weekday noon → workers and students are missed).' },
            { ar: '😬 ليه العينة المتحيّزة __بتبوّظ التحليل حتى لو الحساب صح__؟ لأنك __بتحسب بدقة على المجموعة الغلط__: استبيان ويب عن النوم بيرد عليه غالبًا اللي بيناموا قليل وبيشتكوا — فمتوسطك «الدقيق» بيمثّلهم هم بس. 🛡️ التحيّز __صعب يتشال خالص__، بس __بيقلّ بتصميم دقيق__: إزاي نختار المبحوثين، وإزاي نصيغ الأسئلة، وإزاي نعمل المسح.', en: '😬 Why does a biased sample __ruin the analysis even with correct arithmetic__? Because you __compute precisely on the wrong group__: a web survey on sleep is answered mostly by short sleepers who complain — so your "precise" mean represents only them. 🛡️ Bias is __hard to remove completely__, but it is __reduced by careful design__: how respondents are chosen, how questions are worded, and how the survey is conducted.' },
            { ar: '📌 **الخلاصة:** أولية (نجمعها) وثانوية (جاهزة) · المجتمع = الكل والعينة = جزء عادل منه · بسيطة = صدفة بحتة وطبقية = عشوائي من كل طبقة · والعينة المتحيّزة بتدّي إجابة واثقة… بس __غلط__.', en: '📌 **The point:** primary (we gather) and secondary (ready-made) · population = the whole, sample = a fair part · simple = pure chance, stratified = random from each stratum · and a biased sample gives a confident answer… that is __wrong__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: 'الطبقية = طبقات __وبعدين عشوائي من كل طبقة__ (مش «ممثّل واحد من كل طبقة») · البسيطة = __صدفة بحتة__ (مش «اللي سهل نوصله») · الحصر الشامل = __المجتمع كله__. ومسح قدّام محطة الضهر وتعميمه على «كل المواطنين» = __تحيّز معاينة__.', en: 'Stratified = strata __then random from each__ (not "one representative per stratum") · simple = __pure chance__ (not "whoever is easiest to reach") · census = __the whole population__. Surveying outside a station at noon and generalizing to "all citizens" = __sampling bias__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — العينة كنسخة مصغّرة من المجتمع', en: 'Deep dive — the sample as a miniature population' }, text: { ar: 'فكّر في العينة كـ__نسخة مصغّرة__ من المجتمع: لو المجتمع 60% من فئة و40% من فئة تانية، العينة العادلة تبقى تقريبًا بنفس النسب — ساعتها تقدر تقول بثقة «اللي ينطبق على العينة ينطبق على المجتمع». بسيطة ولا طبقية؟ لو __مش متوقّع فرق منهجي__ بين المجموعات ← البسيطة تكفي. لو __متوقّع__ (مثلًا أولى ثانوي بتذاكر غير تالتة) ← الطبقية تضمن تمثيل كل صف بنسبته. وافتكر: تحيّز __الاختيار__ (مين اتسأل) ≠ تحيّز __الاستجابة__ (إزاي جاوبوا).', en: 'Think of the sample as a __miniature copy__ of the population: if the population is 60% one group and 40% another, a fair sample has roughly the same shares — then you can say "what holds for the sample holds for the population". Simple or stratified? If __no systematic difference__ is expected between groups → simple is enough. If one __is expected__ (e.g. year 1 studies differently from year 3) → stratified guarantees each year its share. Remember: __selection__ bias (who is asked) ≠ __response__ bias (how they answer).' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل موقف بنوع التحيّز:', en: 'Match each situation with the kind of bias:' },
            left: [
              { ar: 'استبيان ويب يرد عليه المهتمين بالموضوع بس', en: 'A web survey answered only by those interested' },
              { ar: 'طالب بيقول إنه بيذاكر 5 ساعات وهو بيذاكر ساعتين', en: 'A student claims 5 study hours but studies 2' },
              { ar: 'مسح قدّام محطة الضهر أيام الشغل', en: 'A survey outside a station at weekday noon' },
            ],
            right: [{ ar: 'تحيّز الاستجابة', en: 'Response bias' }, { ar: 'تحيّز الزمان/المكان', en: 'Time/location bias' }, { ar: 'تحيّز الاختيار الذاتي', en: 'Self-selection bias' }],
            answer: [2, 0, 1],
            explain: { ar: 'مين ردّ = اختيار ذاتي · إزاي جاوب = استجابة · إمتى/فين = زمان/مكان.', en: 'Who replied = self-selection · how they answered = response · when/where = time/location.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'مدرسة فيها 600 طالب في أولى و300 في تانية و100 في تالتة، وعايزين عينة 100 تعكس المدرسة. أنهي طريقة أحسن؟', en: 'A school has 600 year-1, 300 year-2 and 100 year-3 students and wants a 100-student sample mirroring it. Which is best?' },
            options: [
              { ar: 'طبقية: 60 و30 و10 عشوائيًا من كل صف بنسبته', en: 'Stratified: 60, 30 and 10 at random from each year' },
              { ar: 'نسأل أول 100 طالب يدخلوا من باب المدرسة الصبح', en: 'Ask the first 100 students arriving at the school gate each morning' },
              { ar: 'طبقية: نختار طالب واحد ممثّل من كل صف وخلاص', en: 'Stratified: choose one representative student from each year only' },
              { ar: 'استبيان ويب على جروب المدرسة واللي يرد يتحسب', en: 'A web survey on the school group, counting whoever replies' },
            ],
            answer: 0,
            explain: { ar: 'الطبقية = عشوائي من كل طبقة __بنسبتها__ (60% · 30% · 10%). أول 100 = تحيّز زمان/مكان، والويب = اختيار ذاتي.', en: 'Stratified = random from each stratum __in proportion__ (60% · 30% · 10%). The first 100 = time/location bias; the web survey = self-selection.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**المجتمع** = الكل · **العينة** = الجزء المدروس · **حصر شامل** = الكل · **مسح بالعينة** = جزء.', en: '**Population** = the whole · **sample** = the part studied · **census** = everyone · **sample survey** = a part.' },
            { ar: '**بسيطة:** صدفة بحتة بفرص متساوية · **طبقية:** طبقات وبعدين عشوائي من كل طبقة بنسبتها.', en: '**Simple:** pure chance, equal chances · **stratified:** strata, then random from each in proportion.' },
            { ar: '**تحيّز المعاينة:** اختيار ذاتي · استجابة · زمان/مكان ← يقلّ بتصميم دقيق للاختيار والأسئلة والإجراء.', en: '**Sampling bias:** self-selection · response · time/location → reduced by careful design of selection, wording and conduct.' },
          ],
        },
      ],
    },

    /* ───────────── 3 · worked examples ───────────── */
    {
      id: 'worked', kind: 'example',
      title: { ar: 'أمثلة الكتاب المحلولة', en: 'Textbook worked examples' },
      steps: [
        {
          type: 'example',
          q: { widget: 'tf', prompt: { ar: '(1) ضع ✓ للصحيحة و✗ للخاطئة:', en: '(1) Mark ✓ if true or ✗ if false:' }, items: [
            { text: { ar: 'A) البيانات الأولية هي بيانات موجودة مسبقًا جمعها آخرون سلفًا.', en: 'A) Primary data is data already collected and published by others.' }, answer: false },
            { text: { ar: 'B) اختيار عينة من مجتمع يُسمى أخذ العينات.', en: 'B) Selecting a sample from a population is called sampling.' }, answer: true },
            { text: { ar: 'C) المعاينة الطبقية تقسّم المجتمع لطبقات وتختار عينة عشوائية من كل طبقة.', en: 'C) Stratified sampling divides the population into strata and picks a random sample from each.' }, answer: true },
            { text: { ar: 'D) عند وجود تحيّز معاينة، قد لا تنطبق الاستنتاجات على المجتمع كله.', en: 'D) With sampling bias, the conclusions may not apply to the whole population.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) دي __الثانوية__؛ الأولية بتتجمع من جديد لغرض ← **✗**.', en: 'A) That is __secondary__; primary is gathered fresh for a purpose → **✗**.' },
            { ar: 'B) تعريف أخذ العينات ← **✓**.', en: 'B) The definition of sampling → **✓**.' },
            { ar: 'C) تعريف المعاينة الطبقية ← **✓**.', en: 'C) The definition of stratified sampling → **✓**.' },
            { ar: 'D) العينة المتحيّزة ماتعكسش المجتمع ← **✓**.', en: 'D) A biased sample does not reflect the population → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a, b) بالطريقة (A, B):', en: '(2) Match each description (a, b) with the method (A, B):' },
            left: [
              { ar: 'a) اختيار عينة من المجتمع بالصدفة من غير تحيّز', en: 'a) Selecting a sample by chance without bias' },
              { ar: 'b) تقسيم المجتمع لطبقات (نوع/سن) واختيار عشوائي من كل طبقة', en: 'b) Dividing into strata (gender/age) and picking randomly from each' },
            ],
            right: [{ ar: 'A المعاينة الطبقية', en: 'A Stratified sampling' }, { ar: 'B المعاينة العشوائية البسيطة', en: 'B Simple random sampling' }],
            answer: [1, 0] },
          solution: [
            { ar: 'a: صدفة بحتة = **البسيطة** ← B.', en: 'a: pure chance = **simple random** → B.' },
            { ar: 'b: طبقات + عشوائي = **الطبقية** ← A.', en: 'b: strata + random = **stratified** → A.' },
          ],
        },
      ],
    },

    /* ───────────── 4 · textbook practice ───────────── */
    {
      id: 'practice', kind: 'practice',
      title: { ar: 'تدريبات الكتاب (Try + Exercise)', en: 'Textbook practice (Try + Exercise)' },
      steps: [
        {
          type: 'quiz', title: { ar: 'تمرين 1', en: 'Try 1' },
          q: { widget: 'recall', prompt: { ar: 'جاوب في دماغك وبعدين اكشف:', en: 'Answer in your head, then reveal:' }, items: [
            { q: { ar: '1. مصطلح بيانات بتتجمع من جديد لغرض محدّد؟', en: '1. The term for data collected afresh for a specific purpose?' }, a: { ar: 'بيانات أولية', en: 'Primary data' } },
            { q: { ar: '2. مصطلح بيانات موجودة مسبقًا جمعها آخرون وبتستخدم في التحليل؟', en: '2. The term for data collected and published by others and used in analysis?' }, a: { ar: 'بيانات ثانوية', en: 'Secondary data' } },
            { q: { ar: '3. مصطلح اختيار عينة من مجتمع؟', en: '3. The term for selecting a sample from a population?' }, a: { ar: 'أخذ العينات (المعاينة)', en: 'Sampling' } },
            { q: { ar: '4. تحيّز طريقة الاختيار بحيث العينة ماتعكسش المجتمع؟', en: '4. Bias in selection so the sample does not reflect the population?' }, a: { ar: 'تحيّز المعاينة', en: 'Sampling bias' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب كطريقة لجمع __بيانات أولية__:', en: 'Choose the most suitable way to collect __primary data__:' },
            options: [
              { ar: 'A استخدام إحصائيات بتنشرها جهة حكومية', en: 'A Using statistics published by a government body' },
              { ar: 'B تعمل استبيان يناسب غرضك وتجمع الردود', en: 'B Creating a questionnaire for your purpose and collecting replies' },
              { ar: 'C تنقل أرقام من تقرير هيئة قطاعية', en: 'C Quoting figures from an industry-body report' },
              { ar: 'D تستخدم بيانات مسح عمله حد تاني زي ما هي', en: 'D Using someone else’s earlier survey data as it stands' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'أنت اللي صمّمت وجمعت = __أولية__ (B). الباقي جمعه غيرك = ثانوية.', en: 'You designed and collected it = __primary__ (B). The rest were gathered by others = secondary.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'classify', prompt: { ar: 'لكل موقف اختار طريقة المعاينة:', en: 'Choose the sampling method for each situation:' },
            groups: [{ icon: 'target', label: { ar: 'A البسيطة', en: 'A Simple' } }, { icon: 'layers', label: { ar: 'B الطبقية', en: 'B Stratified' } }],
            items: [
              { text: { ar: 'a) وقت مذاكرة كل طلبة مدرسة مع مراعاة الفروق بين الصفوف', en: 'a) Study time of all students, accounting for year-group differences' }, group: 1 },
              { text: { ar: 'b) آراء كل الناخبين في مدينة من غير تحيّز', en: 'b) Opinions of all eligible voters in a city without bias' }, group: 0 },
            ],
            explain: { ar: 'a ← B (فيه فروق بين الصفوف) · b ← A.', en: 'a → B (year groups differ) · b → A.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (3)', en: 'Try 2 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار مثال حصل فيه __تحيّز معاينة__:', en: 'Choose an example in which __sampling bias__ occurred:' },
            options: [
              { ar: 'A مسح 100 طالب اتختاروا بالقرعة من كل طلبة المدرسة', en: 'A Surveying 100 students chosen by lot from the whole school' },
              { ar: 'B تقسيم السكان لفئات عمرية ومسح عينة عشوائية من كل فئة', en: 'B Splitting people into age strata and surveying randomly in each' },
              { ar: 'C سؤال المارّة قدّام المحطة الضهر وإعلانها «رأي كل المواطنين»', en: 'C Asking passers-by at the station at noon as "all citizens’ views"' },
              { ar: 'D صياغة سؤال المسح بعناية عشان الناس تجاوب بصدق', en: 'D Wording the question carefully so people answer honestly' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'وقت ومكان محصورين + تعميم على الكل = __تحيّز معاينة__ (C).', en: 'Limited time and place + generalizing to everyone = __sampling bias__ (C).' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(d):', en: 'Read and fill blanks (a)–(d):' },
            text: { ar: 'البيانات المجمّعة نوعين: {0} بتتجمع من جديد، و{1} موجودة مسبقًا جمعها غيرنا. ولما يصعب ندرس المجتمع كله، بنعمل {2} عشان نختار جزء منه. ولو طريقة الاختيار فيها تحيّز، بيحصل {3} وممكن النتايج ماتنطبقش على المجتمع كله.', en: 'Collected data has two kinds: {0}, gathered afresh, and {1}, already gathered and published by others. When studying the whole population is hard, {2} is carried out to select a part of it. If the selection is biased, {3} occurs and results may not apply to the whole population.' },
            bank: [{ ar: 'بيانات أولية', en: 'primary data' }, { ar: 'بيانات ثانوية', en: 'secondary data' }, { ar: 'أخذ العينات', en: 'sampling' }, { ar: 'تحيّز المعاينة', en: 'sampling bias' }, { ar: 'حصر شامل', en: 'a census' }],
            answer: [0, 1, 2, 3],
            explain: { ar: '(a) أولية (b) ثانوية (c) أخذ العينات (d) تحيّز المعاينة.', en: '(a) primary (b) secondary (c) sampling (d) sampling bias.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار مثال على __بيانات ثانوية__:', en: 'Choose an example of __secondary data__:' },
            options: [
              { ar: 'A ردود مسح من طلبة فصلك', en: 'A Survey replies from students in your class' },
              { ar: 'B إحصاءات سكان بتنشرها الحكومة', en: 'B Population statistics published by the government' },
              { ar: 'C ملاحظتك بنفسك لحركة طريق المدرسة', en: 'C Your own observation of traffic on the school road' },
              { ar: 'D مقابلة صمّمتها وعملتها بنفسك', en: 'D An interview you designed and conducted yourself' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'جهة تانية جمعتها ونشرتها = __ثانوية__ (B).', en: 'Gathered and published by another body = __secondary__ (B).' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب لطرق المعاينة:', en: 'Choose the most appropriate description of sampling methods:' },
            options: [
              { ar: 'A البسيطة: الباحث يختار اللي يسهل يوصلهم', en: 'A Simple: the researcher picks whoever is easy to reach' },
              { ar: 'B الطبقية: طبقات وبعدين عشوائي من كل طبقة', en: 'B Stratified: strata, then random from each one' },
              { ar: 'C البسيطة: طبقات وممثّل واحد من كل طبقة', en: 'C Simple: strata and one representative from each' },
              { ar: 'D الحصر الشامل: بيمسح جزء من المجتمع بس', en: 'D Census: it surveys only part of the population' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B هو تعريف الطبقية. A وC غلط في البسيطة، وD الحصر = الكل.', en: 'B is the definition of stratified. A and C misdescribe simple; D: a census = everyone.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (3)', en: 'Exercise 3 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ طريقة لتقليل التحيّز؟', en: 'Which is __not__ a way to reduce bias?' },
            options: [
              { ar: 'A اختيار من غير تحيّز من المجتمع كله بالقرعة', en: 'A Unbiased selection from the whole population by lot' },
              { ar: 'B نحصر الوقت والمكان ونجمع ردود من فئة معيّنة', en: 'B Restrict time and place, collecting from one group' },
              { ar: 'C نراعي طبقات المجتمع ونسبها في الاختيار', en: 'C Take the population’s strata and shares into account' },
              { ar: 'D نصيغ الأسئلة بحياد عشان الناس تجاوب بصدق', en: 'D Word the questions neutrally so people answer honestly' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'حصر الوقت والمكان __بيعمل__ تحيّز زمان/مكان (B).', en: 'Restricting time and place __creates__ time/location bias (B).' } },
        },
      ],
    },

    /* ───────────── 5 · key terms ───────────── */
    {
      id: 'terms', kind: 'flash',
      title: { ar: 'كروت المصطلحات', en: 'Key-term cards' },
      steps: [{
        type: 'quiz',
        q: { widget: 'flash', cards: [
          { front: { ar: 'جمع البيانات', en: 'Data collection' }, back: { ar: 'أول مرحلة: نخطّط نجمع إيه وإزاي حسب الغرض.', en: 'The first stage: plan what to gather and how, by purpose.' } },
          { front: { ar: 'بيانات أولية', en: 'Primary data' }, back: { ar: 'بتتجمع من جديد لغرض محدّد — موثوقة بس مكلّفة.', en: 'Gathered fresh for a purpose — reliable but costly.' } },
          { front: { ar: 'بيانات ثانوية', en: 'Secondary data' }, back: { ar: 'موجودة مسبقًا جمعها غيرنا — كتير وسريع بس ممكن ماتطابقش.', en: 'Gathered and published by others — plentiful and fast, may not fit.' } },
          { front: { ar: 'المجتمع الإحصائي', en: 'Population' }, back: { ar: 'المجموعة الكاملة اللي بنحلّلها.', en: 'The whole group being analyzed.' } },
          { front: { ar: 'العينة', en: 'Sample' }, back: { ar: 'الجزء اللي بندرسه فعلًا من المجتمع.', en: 'The part of the population actually surveyed.' } },
          { front: { ar: 'المعاينة العشوائية البسيطة', en: 'Simple random sampling' }, back: { ar: 'اختيار بالصدفة البحتة — فرصة متساوية لكل واحد.', en: 'Selection by pure chance — an equal chance for everyone.' } },
          { front: { ar: 'المعاينة الطبقية', en: 'Stratified sampling' }, back: { ar: 'طبقات (نوع/سن) وبعدين عشوائي من كل طبقة.', en: 'Strata (gender/age), then random from each.' } },
          { front: { ar: 'تحيّز المعاينة', en: 'Sampling bias' }, back: { ar: 'عينة غير عادلة بتشوّه صورة الكل (اختيار ذاتي، استجابة، زمان/مكان).', en: 'An unfair sample that misrepresents the whole (self-selection, response, time/location).' } },
        ] },
      }],
    },

    /* ───────────── 6 · think like an engineer + essays ───────────── */
    {
      id: 'think', kind: 'challenge',
      title: { ar: 'فكّر كمهندس + السؤال المقالي', en: 'Think like an engineer + essay' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', marks: 6, tag: { ar: 'سؤال بنمط الامتحان · 6 درجات', en: 'Exam-style · 6 marks' },
            prompt: { ar: 'اشرح ليه العينة المتحيّزة بتبوّظ التحليل حتى لو الحسابات صح. (أشِر إلى: العينة كنسخة مصغّرة من المجتمع)', en: 'Explain why a biased sample can make an analysis worthless even when the calculations are correct. (Refer to: the sample as a miniature population)' },
            points: [
              { ar: 'العينة العادلة = نسخة مصغّرة من المجتمع بنفس النسب.', en: 'A fair sample = a miniature copy with the same shares.' },
              { ar: 'المتحيّزة = حساب دقيق على المجموعة الغلط.', en: 'A biased one = precise arithmetic on the wrong group.' },
              { ar: 'مثال + النتيجة: مانقدرش نعمّم.', en: 'An example + the result: no generalizing.' },
            ],
            model: { ar: 'العينة المفروض تكون __نسخة مصغّرة__ من المجتمع: نفس النسب والتركيب، عشان اللي ينطبق عليها ينطبق على الكل. لو طريقة الاختيار متحيّزة، العينة بتمثّل __جزء بس__ من المجتمع، فالحساب ممكن يكون دقيق جدًا بس على __المجموعة الغلط__. مثلًا استبيان ويب عن ساعات النوم بيرد عليه غالبًا اللي بيناموا قليل وبيشتكوا، فالمتوسط «الدقيق» بيوصف هم بس مش كل الناس. النتيجة: إجابة __واثقة لكنها غلط__، ومانقدرش نعمّمها على المجتمع.', en: 'A sample should be a __miniature copy__ of the population: the same shares and make-up, so what holds for it holds for the whole. If the selection method is biased, the sample represents __only part__ of the population, so the arithmetic can be very precise but on __the wrong group__. For example, a web survey on sleep hours is answered mostly by short sleepers who complain, so the "precise" mean describes only them. The result is an answer that is __confident but wrong__ and cannot be generalized.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — وقت المواصلات', en: 'Think as an engineer — commute time' },
            prompt: { ar: 'مدرستك عايزة تعرف الطلبة بياخدوا قد إيه في المواصلات كل يوم، بس مينفعش تسأل الكل. ١) خطّط العينة: هتسأل كام وإزاي تختارهم؟ وحدّد المجتمع والعينة. ٢) سمِّ مجموعة طريقتك ممكن تسقطها (الغايبين يومها، أو اللي مابيفتحوش رابط الاستبيان) وأقرب نوع تحيّز. ٣) اختار بسيطة ولا طبقية وبرّر.', en: 'Your school wants to know daily commute times but cannot survey everyone. 1) Plan the sample: how many and how chosen? State the population and sample. 2) Name a group your method might drop (absentees, those who ignore a survey link) and the closest bias. 3) Choose simple or stratified and justify.' },
            points: [
              { ar: 'المجتمع = كل طلبة المدرسة · العينة = عدد مختار.', en: 'Population = all students · sample = the chosen number.' },
              { ar: 'مجموعة ممكن تسقط + نوع التحيّز.', en: 'A group that may be dropped + the bias type.' },
              { ar: 'طبقية لو فيه فروق (صف/منطقة) + سبب.', en: 'Stratified if groups differ (year/area) + a reason.' },
            ],
            model: { ar: '١) المجتمع: كل طلبة المدرسة (مثلًا 900). العينة: 90 طالب نختارهم بالقرعة من كشوف الفصول. ٢) لو وزّعت رابط أونلاين، اللي مابيفتحوش الرابط هيسقطوا (اختيار ذاتي)، ولو سألت يوم واحد بس الغايبين هيسقطوا — وغالبًا دول اللي بيجوا من بعيد، فالتقدير هيطلع أقل من الحقيقة (زمان/مكان). ٣) أختار __الطبقية__: أقسّم حسب الصف أو المنطقة وأختار عشوائي من كل طبقة بنسبتها، لأن اللي ساكنين بعيد ممكن يختلفوا بشكل منهجي عن القريبين.', en: '1) Population: all students (say 900). Sample: 90 students drawn by lot from class lists. 2) An online link drops those who never open it (self-selection); asking on one day drops absentees — often those who live far, so the estimate comes out too low (time/location). 3) I choose __stratified__: split by year or area and pick randomly from each in proportion, because students living far away may differ systematically from those nearby.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'مول بيعمل مسح لزوّار السبت بعد الضهر بس، ويقدّم النتيجة كـ«رأي كل عملائنا». سمِّ التحيّز، واشرح مين بيغيب، واقترح تغيير يخلّي العينة أعدل.', en: 'A mall surveys only Saturday-afternoon visitors and presents it as "the opinion of all our customers". Name the bias, who is missed, and one change to make the sample fairer.' },
            points: [{ ar: 'تحيّز زمان/مكان (معاينة).', en: 'Time/location (sampling) bias.' }, { ar: 'بيغيب زوّار أيام الأسبوع والصبح.', en: 'Weekday and morning visitors are missed.' }, { ar: 'نوزّع المسح على أيام وأوقات مختلفة عشوائيًا.', en: 'Spread the survey randomly across days and times.' }],
            model: { ar: 'ده __تحيّز زمان/مكان__ (نوع من تحيّز المعاينة). بيغيب اللي بيزوروا المول أيام الأسبوع أو الصبح أو بالليل — زي الموظفين بعد الشغل أو الكبار في السن الصبح. التغيير: نوزّع المسح على __أيام وأوقات مختلفة__ ونختار الزوّار عشوائيًا في كل فترة (ممكن طبقية حسب اليوم والوقت)، فالعينة تعكس كل العملاء.', en: 'This is __time/location bias__ (a kind of sampling bias). It misses those who visit on weekdays, in the morning or at night — such as workers after hours or older people in the morning. The change: spread the survey over __different days and times__ and pick visitors randomly in each period (possibly stratified by day and time), so the sample reflects all customers.' } },
        },
      ],
    },

    /* ───────────── textbook prompts ───────────── */
    {
      id: 'reflect', kind: 'challenge',
      title: { ar: 'أسئلة الكتاب: فكّر · تأمّل · تحدّى', en: 'Textbook prompts: think · reflect · challenge' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر لحظة', en: 'Pause & think' },
            prompt: { ar: 'تعداد حكومي نزّلته من الإنترنت — بيانات أولية ولا ثانوية بالنسبة لك؟ وليه؟', en: 'A government census you download — is it primary or secondary data for you? Why?' },
            points: [{ ar: 'ثانوية.', en: 'Secondary.' }, { ar: 'لأن جهة تانية جمعتها ونشرتها، مش أنت لغرضك.', en: 'Another body gathered and published it, not you for your purpose.' }],
            model: { ar: '__ثانوية__ بالنسبة لي، لأن الحكومة هي اللي جمعتها ونشرتها لغرضها هي، وأنا بستخدمها بعدين. (بالنسبة للجهة اللي عملت التعداد كانت أولية.)', en: '__Secondary__ for me, because the government gathered and published it for its own purpose, and I am reusing it. (For the body that ran the census it was primary.)' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: افتكر استطلاع رأي شفته على السوشيال ميديا — مين اللي غالبًا ردّ عليه، ومين اللي غاب؟ تحدّى: صمّم طريقة تخلّي نفس الاستطلاع أعدل.', en: 'Reflect: recall a social-media poll you saw — who probably answered, and who was missing? Challenge: design a way to make the same poll fairer.' },
            points: [{ ar: 'اللي ردّوا = المتابعين المهتمين (اختيار ذاتي).', en: 'Responders = keen followers (self-selection).' }, { ar: 'طريقة أعدل: اختيار عشوائي/طبقي + أسئلة محايدة.', en: 'Fairer: random/stratified selection + neutral wording.' }],
            model: { ar: 'غالبًا ردّ عليه متابعين الصفحة المهتمين جدًا بالموضوع، وغاب اللي مش متابعين أو مش مهتمين أو مش على السوشيال ميديا أصلًا — ده __اختيار ذاتي__. عشان يبقى أعدل: نختار عينة __عشوائية__ من القائمة الكاملة للناس اللي عايزين رأيهم (أو __طبقية__ حسب السن والمنطقة)، ونصيغ السؤال بشكل محايد يسمح بإجابة صادقة.', en: 'It was probably answered by the page’s very interested followers, missing non-followers, the uninterested and people not on social media at all — __self-selection__. To make it fairer: draw a __random__ sample from the full list of people whose opinion we want (or __stratified__ by age and area), and word the question neutrally so people can answer honestly.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '5-1', seconds: 60, items: [
          { text: { ar: 'الأولية = بنجمعها من جديد لغرضنا', en: 'Primary = gathered fresh for our purpose' }, answer: true },
          { text: { ar: 'الثانوية = بنجمعها بنفسنا', en: 'Secondary = we gather it ourselves' }, answer: false },
          { text: { ar: 'الاستبيان اللي بتصمّمه = أولية', en: 'A survey you design = primary' }, answer: true },
          { text: { ar: 'الأولية رخيصة وسريعة دايمًا', en: 'Primary data is always cheap and fast' }, answer: false },
          { text: { ar: 'الثانوية ممكن ماتطابقش غرضك', en: 'Secondary data may not fit your purpose' }, answer: true },
          { text: { ar: 'العينة = المجتمع كله', en: 'Sample = the whole population' }, answer: false },
          { text: { ar: 'الحصر الشامل = نمسح الكل', en: 'Census = survey everyone' }, answer: true },
          { text: { ar: 'البسيطة = صدفة بحتة', en: 'Simple = pure chance' }, answer: true },
          { text: { ar: 'البسيطة = اللي سهل نوصله', en: 'Simple = whoever is easy to reach' }, answer: false },
          { text: { ar: 'الطبقية = عشوائي من كل طبقة', en: 'Stratified = random from each stratum' }, answer: true },
          { text: { ar: 'الطبقية = ممثّل واحد من كل طبقة', en: 'Stratified = one representative per stratum' }, answer: false },
          { text: { ar: 'استبيان الويب بيعمل اختيار ذاتي', en: 'A web survey causes self-selection' }, answer: true },
          { text: { ar: 'تحيّز الاستجابة = مشكلة في الاختيار', en: 'Response bias = a selection problem' }, answer: false },
          { text: { ar: 'العينة المتحيّزة ماتتعمّمش', en: 'A biased sample cannot be generalized' }, answer: true },
          { text: { ar: 'حصر الوقت والمكان بيقلّل التحيّز', en: 'Restricting time and place reduces bias' }, answer: false },
          { text: { ar: 'الجمع بيحدّد جودة التحليل', en: 'Collection decides analysis quality' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 5-1', en: 'Lesson 5-1 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. «بيانات موجودة مسبقًا جمعها آخرون» — أنهي؟', en: '1. "Data already collected and made public by others" — which?' }, options: [{ ar: 'بيانات أولية', en: 'Primary data' }, { ar: 'بيانات ثانوية', en: 'Secondary data' }, { ar: 'عينة', en: 'A sample' }, { ar: 'مجتمع إحصائي', en: 'A population' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. تقسيم المجتمع لطبقات واختيار عشوائي من كل طبقة — أنهي معاينة؟', en: '2. Divide into strata, pick randomly from each — which sampling?' }, options: [{ ar: 'العشوائية البسيطة', en: 'Simple random sampling' }, { ar: 'الطبقية', en: 'Stratified sampling' }, { ar: 'الحصر الشامل', en: 'A census' }, { ar: 'بالراحة (اللي قدّامنا)', en: 'Convenience sampling' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. استبيان ويب يرد عليه أصحاب الاهتمام العالي بس — أنهي تحيّز؟', en: '3. Only highly interested people answer a web survey — which bias?' }, options: [{ ar: 'تحيّز الاستجابة', en: 'Response bias' }, { ar: 'تحيّز الاختيار الذاتي', en: 'Self-selection bias' }, { ar: 'تحيّز الزمان/المكان', en: 'Time/location bias' }, { ar: 'مفيش تحيّز', en: 'No bias' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. عند وجود تحيّز معاينة، ممكن النتايج ماتنطبقش على المجتمع كله.', en: '4. With sampling bias, results may not apply to the whole population.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. البيانات الأولية جمعها آخرون قبل كده.', en: '5. Primary data was collected by others beforehand.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. المعاينة الطبقية بتعكس تركيب المجتمع في العينة.', en: '6. Stratified sampling mirrors the population’s make-up in the sample.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. إيه الفرق بين البيانات الأولية والثانوية؟ اذكر قوة وقيد لكل واحدة.', en: '7. What is the difference between primary and secondary data? Give a strength and a constraint of each.' },
          points: [{ ar: 'أولية: من جديد لغرضنا · قوة: موثوقة · قيد: وقت وتكلفة.', en: 'Primary: fresh for our purpose · strength: reliable · constraint: time and cost.' }, { ar: 'ثانوية: جمعها غيرنا · قوة: كتير وبسرعة · قيد: ممكن ماتطابقش/متحيّزة.', en: 'Secondary: gathered by others · strength: plenty, fast · constraint: may not fit/biased.' }],
          model: { ar: 'البيانات الأولية بنجمعها من جديد لغرض محدّد (استبيان، مقابلة، ملاحظة، تجربة)؛ قوتها إنها مصمّمة على قد الغرض فموثوقة وأصيلة، وقيدها إنها بتاخد وقت وجهد وتكلفة. البيانات الثانوية موجودة مسبقًا جمعها غيرنا (بيانات مفتوحة، إحصائيات، تقارير)؛ قوتها إننا بناخد كمية كبيرة بسرعة، وقيدها إنها ممكن ماتطابقش غرضنا بالظبط أو يكون فيها تحيّز أو حذف.', en: 'Primary data is newly gathered for a specific purpose (survey, interview, observation, experiment); its strength is being designed for the purpose, so reliable and original; its constraint is the time, effort and cost. Secondary data was gathered and published by others (open data, statistics, reports); its strength is getting a lot quickly; its constraint is that it may not match our purpose exactly or may contain bias or omissions.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. إيه الفرق بين المجتمع والعينة والحصر الشامل؟', en: '8. What is the difference between population, sample and census?' },
          points: [{ ar: 'المجتمع = الكل.', en: 'Population = the whole.' }, { ar: 'العينة = الجزء المدروس.', en: 'Sample = the part studied.' }, { ar: 'الحصر الشامل = مسح المجتمع كله.', en: 'Census = surveying the whole population.' }],
          model: { ar: 'المجتمع الإحصائي هو المجموعة الكاملة اللي هدف التحليل. العينة هي الجزء اللي بندرسه فعلًا منه. والحصر الشامل (التعداد) هو إننا نمسح المجتمع كله، عكس المسح بالعينة اللي بيمسح جزء مختار بس.', en: 'The population is the whole group targeted by the analysis. The sample is the part actually studied. A census surveys the entire population, unlike a sample survey, which surveys only a chosen part.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اذكر تلات أنواع للتحيّز مع مثال لكل واحد.', en: '9. Name three kinds of bias with an example of each.' },
          points: [{ ar: 'اختيار ذاتي: استبيان ويب.', en: 'Self-selection: web survey.' }, { ar: 'استجابة: وقت مذاكرة مبالغ فيه.', en: 'Response: exaggerated study time.' }, { ar: 'زمان/مكان: محطة الضهر أيام الشغل.', en: 'Time/location: station at weekday noon.' }],
          model: { ar: 'تحيّز الاختيار الذاتي: في استبيان على الويب يرد المهتمين بس. تحيّز الاستجابة: الطالب يقول إنه بيذاكر وقت أطول من الحقيقة عشان يبان كويس. تحيّز الزمان/المكان: مسح قدّام محطة الضهر أيام الشغل فيغيب الموظفين والطلبة.', en: 'Self-selection: in a web survey only the interested reply. Response bias: a student reports more study time than real to look good. Time/location bias: surveying outside a station at weekday noon misses workers and students.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. إمتى تختار المعاينة الطبقية بدل البسيطة؟', en: '10. When would you choose stratified sampling over simple random?' },
          points: [{ ar: 'لما يكون فيه فروق منهجية بين مجموعات بتأثّر في التحليل.', en: 'When groups differ systematically in ways that affect the analysis.' }, { ar: 'عشان كل طبقة تتمثّل بنسبتها.', en: 'So each stratum is represented in proportion.' }],
          model: { ar: 'لما أتوقّع إن فيه فروق منهجية بين مجموعات في المجتمع بتأثّر في اللي بقيسه (مثلًا أولى ثانوي بتذاكر غير تالتة)، فأقسّم المجتمع طبقات وأختار عشوائي من كل طبقة بنسبتها، عشان العينة تعكس تركيب المجتمع ويقلّ التحيّز. لو مفيش فروق متوقّعة، البسيطة تكفي.', en: 'When I expect systematic differences between groups that affect what I measure (e.g. year 1 studies differently from year 3), I divide the population into strata and pick randomly from each in proportion, so the sample mirrors the population and bias falls. If no differences are expected, simple random sampling is enough.' } } },
      ],
    },
  ],
});
