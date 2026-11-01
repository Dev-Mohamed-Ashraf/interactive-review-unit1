/* =========================================================
 * content/lesson-5-3.js — البيانات المفتوحة وواجهات برمجة التطبيقات
 * Pure data. Sources: textbook part 2, 5-3 (EN p.21–28) + memo (Arabic
 * wording, deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('5-3', {
  id: '5-3',
  color: '#6366f1',
  cover: 'img/da-l3-cover.webp',
  title: { ar: 'البيانات المفتوحة وواجهات برمجة التطبيقات', en: 'Open Data and APIs' },
  guiding: { ar: 'البيانات المفتوحة الموثوقة بتيجي منين، والبرامج بتجيبها إزاي، وإيه القواعد اللي بتحكم استخدامها؟', en: 'Where does reliable open data come from, how do programs fetch it, and what rules govern its use?' },
  hook: {
    ar: 'بيانات كتير مفيدة __متاحة بشروط تسمح بإعادة استخدامها__ — أرقام السكان من البنك الدولي، الإحصائيات العالمية من الأمم المتحدة، ومجموعات المسابقات على Kaggle. بس **«مجاني» مش معناه «مفتوح» ولا «من غير قواعد»**. عشان تعتمد على البيانات المفتوحة لازم تعرف: __منين__ تجيبها، و__إزاي__ تجيبها (تنزيل من المتصفح، أو **API** بيرجّع البيانات لبرنامجك مباشرة)، و__مسموح لك__ تستخدمها إزاي. فحص **شروط الاستخدام** و**الإشارة إلى المصدر** هما اللي بيحوّلوا بيانات مستعارة لتحليل موثوق.',
    en: 'Some of the world’s most powerful data is __free__ — population figures from the World Bank, global statistics from the UN, competition datasets on Kaggle. But **"free" does not mean "no rules"**. To rely on open data you must know __where__ to get it, __how__ to fetch it (a browser download, or an **API** that returns data straight to your program), and how you are __allowed__ to use it. Checking the **terms of use** and **citing the source** turn borrowed data into trustworthy analysis.',
  },
  keyFact: { ar: 'البيانات المفتوحة بتيجي من مزوّدين رسميين (__World Bank Open Data__ و__UN Data__) ومنصّات زي __Kaggle__ موثوقيتها بتختلف؛ بتتجاب من المتصفح أو عن طريق __API__ (غالبًا بصيغة __JSON__). ولكل مجموعة __شروط استخدام__ لازم نمشي عليها، و__مصدر__ لازم نذكره.', en: 'Open data comes from official providers (__World Bank Open Data__, __UN Data__) and platforms such as __Kaggle__ whose reliability varies; it is fetched in a browser or via an __API__ (often as __JSON__). Every dataset has __terms of use__ to follow and a __source__ to cite.' },
  concepts: ['open data', 'World Bank Open Data', 'UN Data', 'Kaggle', 'API', 'endpoint', 'JSON', 'terms of use', 'source citation'],
  objectives: [
    { ar: 'أشرح يعني إيه بيانات مفتوحة وأحدّد أهم مصادرها الموثوقة.', en: 'Explain what open data is and identify major reliable sources of it.' },
    { ar: 'أوصف إزاي البيانات بتتجاب عن طريق API، وأشرح أهمية شروط الاستخدام والإشارة إلى المصدر.', en: 'Describe how data is obtained through an API, and explain the importance of terms of use and source citation.' },
  ],

  stations: [
    /* ───────────── 1 · open data & its sources ───────────── */
    {
      id: 'open', kind: 'learn',
      title: { ar: 'البيانات المفتوحة ومصادرها', en: 'Open data and its sources' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'لقيت رسم بياني حلو على النت من غير ما يقول البيانات جاية منين… هتصدّقه؟', en: 'You find a nice chart online that does not say where its data came from… would you trust it?' },
            options: [
              { emoji: '👍', text: { ar: 'أيوه، شكله احترافي', en: 'Yes, it looks professional' } },
              { emoji: '🤔', text: { ar: 'لأ، لازم أعرف المصدر', en: 'No, I need the source' } },
              { emoji: '🤷‍♂️', text: { ar: 'مش فارقة', en: 'It doesn’t matter' } },
            ],
            after: { ar: 'المصدر هو اللي بيفرّق… يلا نشوف 👇', en: 'The source makes the difference… let’s see 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: بيانات مجانية… ليها قواعد', en: '🎞️ Animation: free data… with rules' },
          enTitle: 'Open data and its providers',
          terms: ['open data', 'World Bank Open Data', 'UN Data', 'Kaggle', 'API'],
          visual: { anim: 'apiMovie', props: { scenes: [0, 2] } },
          beats: [
            { ar: '🎁 **البيانات المفتوحة:** بيانات متاحة بـ__ترخيص أو شروط واضحة تسمح بالوصول وإعادة الاستخدام وإعادة التوزيع__ — فالمجانية أو الإتاحة العامة لوحدها __مش كفاية__. عند استخدامها نتحقق من أربع حاجات: __المصدر وجودته، وطريقة الوصول، والترخيص أو شروط الاستخدام، ومناسبتها لسؤال التحليل__. بتيجي من مصادر كتير: منظمات، جهات حكومية، وباحثين وشركات — والترخيص والجودة والتعريفات بيختلفوا من مجموعة لتانية.', en: '🎁 **Open data:** data __made public for anyone to use freely__. To use it in analysis we must understand three things: __where__ to get it, __how__ to get it, and __how to use__ it. It comes from many sources: international organizations, government bodies, and datasets published by researchers and companies — the key is choosing sources that are __highly reliable and match the analysis purpose__.' },
            { ar: '🏦 **World Bank Open Data:** إحصائيات __الاقتصاد والسكان والتعليم والصحة لدول العالم__ ← للمقارنات الدولية وتحليل اتجاهات كل دولة. 🌐 **UN Data:** __إحصائيات دولية__ بتنشرها __الأمم المتحدة ووكالاتها__ ← لتحليل قضايا عالمية (سكان، تنمية، بيئة). 🏆 **Kaggle:** __منصّة بتعمل مسابقات تحليل بيانات__ وفيها مجموعات في مجالات متنوعة ← بيانات لدراسة __التعلّم الآلي__ والبحث، ولازم نقيّم مصدر كل مجموعة وترخيصها. على المنصّات دي نقدر ندوّر وننزّل من المتصفح، وفي حالات كتير نجيبها عن طريق __API__.', en: '🏦 **World Bank Open Data:** statistics on __the economy, population, education and health of the world’s countries__ → international comparisons and each country’s trends. 🌐 **UN Data:** __international statistics__ published by __the UN and its agencies__ → analysis of global issues (population, development, environment). 🏆 **Kaggle:** __a platform running data-analysis competitions__, with datasets in many fields → data for __machine-learning__ study and research. On these platforms we can search and download in a browser, and in many cases fetch via an __API__.' },
            { ar: '🔌 **واجهة برمجة التطبيقات (API):** __مجموعة قواعد بتتيح لبرنامج يطلب بيانات أو وظايف من برنامج أو خدمة تانية__. البرنامج __يبعت الطلب مباشرة__ للـAPI بدل ما نعمل خطوات المتصفح بإيدينا، فيكرّر الطلبات ويعالج النتايج __آليًا ضمن حدود الخدمة__. جرّب تجيب 200 دولة × 20 سنة يدوي… صعب جدًا؛ بالـAPI ممكن يتكرّر آليًا.', en: '🔌 **Application Programming Interface (API):** __a set of rules for how pieces of software interact__. In web services it is used __as a way to obtain data__: a program __sends the request directly__ to the API instead of us going through browser steps by hand, so it handles __large amounts efficiently__. Try fetching 200 countries × 20 years by hand… practically impossible; with an API it is one line.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل غرض بالمزوّد الأنسب:', en: 'Match each purpose with the best provider:' },
            left: [
              { ar: 'مقارنة الناتج المحلي بين الدول', en: 'Comparing GDP between countries' },
              { ar: 'مجموعات متنوعة لدراسة التعلّم الآلي', en: 'Varied datasets to study machine learning' },
              { ar: 'إحصائيات الأمم المتحدة عن البيئة والتنمية', en: 'UN statistics on environment and development' },
            ],
            right: [{ ar: 'UN Data', en: 'UN Data' }, { ar: 'World Bank Open Data', en: 'World Bank Open Data' }, { ar: 'Kaggle', en: 'Kaggle' }],
            answer: [1, 2, 0],
            explain: { ar: 'دول واقتصاد = البنك الدولي · مسابقات وتعلّم آلي = Kaggle · الأمم المتحدة = UN Data.', en: 'Countries and economy = World Bank · competitions and ML = Kaggle · the UN = UN Data.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'بالـAPI نقدر نجيب البيانات مباشرة من غير متصفح.', en: 'With an API, data can be fetched directly without a browser.' }, answer: true },
            { text: { ar: 'Kaggle بوابة البنك الدولي لإحصائيات الدول.', en: 'Kaggle is the World Bank’s portal for country statistics.' }, answer: false, explain: { ar: 'Kaggle = __منصّة مسابقات__ ومجموعات بيانات.', en: 'Kaggle = a __competition platform__ with datasets.' } },
            { text: { ar: 'المهم نختار مصدر موثوق ومطابق لغرض التحليل.', en: 'The key is a reliable source matching the analysis purpose.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**البيانات المفتوحة:** ترخيص أو شروط تسمح بإعادة الاستخدام · نتحقق من: المصدر، طريقة الوصول، الترخيص، المناسبة للسؤال.', en: '**Open data:** available to all — but know where, how, and how it may be used.' },
            { ar: '**World Bank** (إحصائيات الدول) · **UN Data** (إحصائيات الأمم المتحدة) · **Kaggle** (مسابقات + تعلّم آلي).', en: '**World Bank** (country statistics) · **UN Data** (UN statistics) · **Kaggle** (competitions + ML).' },
            { ar: '**API:** قواعد تعامل البرامج — يطلب البيانات مباشرة ويكرّر آليًا ضمن حدود الخدمة.', en: '**API:** rules for software interaction — fetches data directly and at scale.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · the API call + rules ───────────── */
    {
      id: 'api', kind: 'learn',
      title: { ar: 'رحلة طلب الـAPI… وقواعد الاستخدام', en: 'The API call… and the rules of use' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: طلب ← رد JSON ← استخدام… بشروط', en: '🎞️ Animation: request → JSON response → use… with rules' },
          enTitle: 'Fetching data through an API',
          terms: ['API', 'endpoint', 'JSON', 'terms of use', 'source citation'],
          visual: { anim: 'apiMovie', props: { scenes: [3, 9] } },
          beats: [
            { ar: '① **الطلب:** عايز عدد سكان مصر 2024 من البنك الدولي جوّه برنامجك. __العميل__ (برنامجك) بيبعت طلب لـ**نقطة نهاية (Endpoint)** — __عنوان أو مسار محدّد__ بيستقبل نوع معيّن من الطلبات، زي `api.worldbank.org/…/EGY/indicator/SP.POP.TOTL`. الرابط بيحدّد «__أنهي بيانات__» بالضبط.', en: '① **The request:** you want Egypt’s 2024 population from the World Bank inside your program. The __client__ (your program) sends a request to an **endpoint** — __a specific address/path__ such as `api.worldbank.org/…/EGY/indicator/SP.POP.TOTL`. The URL says exactly "__which data__".' },
            { ar: '② **الاستجابة:** __الخادم بيعالج الطلب__ ويرجّع رد __بصيغة بتحدّدها الخدمة__ — زي **JSON** (JavaScript Object Notation): صيغة نصية شائعة للبيانات المهيكلة (ومش الوحيدة)، على شكل __أزواج «اسم: قيمة»__ زي `{"country":"EGY","year":2024,"value":114500000}` — __سهلة يقراها البشر__ و__سهل نتعامل معاها بلغات برمجة مختلفة__. ⚠️ ممكن يرجع __رد خطأ__ لو الرابط غلط.', en: '② **The response:** __the server processes the request__ and returns a response __in a set format__ — usually **JSON** (JavaScript Object Notation): data as __"name: value" pairs__, e.g. `{"country":"EGY","year":2024,"value":114500000}` — __easy for people to read__ and __easy to handle in many programming languages__. ⚠️ An __error response__ may come back if the URL is wrong.' },
            { ar: '③ **الاستخدام:** البرنامج __بيقرا الرد ويطلّع اللي محتاجه__ (قيمة value) ويستخدمها في التحليل — __من غير ما يفتح متصفح__، ويقدر __يكرّر ده آليًا__ لآلاف الدول والسنين. ده سرّ قوة الـAPI: __السرعة والحجم__.', en: '③ **Use:** the program __reads the response and extracts what it needs__ (the value) and uses it in the analysis — __without opening a browser__, and it can __repeat this automatically__ for thousands of countries and years. That is the API’s power: __speed and volume__.' },
            { ar: '🚦 الـAPI __مابيلغيش القواعد__. وأنت بتستخدمه: ✔ __امشِ على شروط استخدام المزوّد__ · ✔ __ماتبعتش طلبات كتير جدًا في وقت قصير__ (حد الطلبات — ماتتقّلش على الخادم) · ✔ __اتأكّد من نطاق إعادة الاستخدام المسموح__ وسياسات الحفظ والنشر. ⚠️ احترس: في نموذج الـAPI الخادم __مابيبعتش بيانات من طرف واحد على طول__، والعملاء __مابيتبادلوش البيانات مباشرة__ مع بعض.', en: '🚦 An API __does not cancel the rules__. When using one: ✔ __follow the provider’s terms of use__ · ✔ __do not send excessive requests in a short time__ (request limits — do not overload the server) · ✔ __confirm the permitted scope of use__ of the data. ⚠️ Careful: in the API model the server __does not keep sending data one-sidedly__, and clients __do not exchange data directly__ with each other.' },
            { ar: '📜 **شروط الاستخدام:** حتى مع البيانات المفتوحة، __نطاق الاستخدام الحر بيتحدّد لكل مجموعة لوحدها__ — مجموعة تسمح بالاستخدام الحر مع الإشارة إلى المصدر، وتانية تمنع الاستخدام التجاري، وتالتة تمنع إعادة النشر. عشان كده __دايمًا اقرا شروط الاستخدام قبل ما تستخدم__.', en: '📜 **Terms of use:** even with open data, __the scope of free use is set for each dataset separately__ — one allows free use with attribution, another forbids commercial use, a third forbids redistribution. So __always check the terms of use before using__.' },
            { ar: '🏷️ **الإشارة إلى المصدر:** لما تستخدم البيانات __لازم تشير إلى المصدر__، وممكن يشمل: __الجهة الناشرة (المزوّد)، واسم مجموعة البيانات، والإصدار أو تاريخ التحديث أو الحصول عليها، والرابط URL__، حسب الترخيص ومعيار الاستشهاد. ليه مهم؟ ذكر المصدر __لوحده مايثبتش موثوقية البيانات__، بس __بيساعد غيرك يلاقيها ويقيّمها ويراجع التحليل__ — حتى للبيانات المجانية.', en: '🏷️ **Source citation:** when using data you __must cite the source__, usually: __the provider, the dataset name, the date obtained, and the URL__. Why it matters: it is __evidence of the data’s reliability__ and __lets others verify the analysis__ — and it is required __always__, even for free data.' },
            { ar: '📌 **الخلاصة:** اختار مزوّد موثوق مناسب لغرضك · اجلب بالمتصفح أو بالـAPI (العميل ← نقطة النهاية · الخادم ← JSON · البرنامج يستخدم) · وامشِ على __شروط الاستخدام__ واذكر __المصدر__ (مزوّد · اسم · تاريخ · رابط).', en: '📌 **The point:** pick a reliable provider for your purpose · fetch by browser or API (client → endpoint · server → JSON · program uses it) · follow the __terms of use__ and cite the __source__ (provider · name · date · URL).' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«البيانات المفتوحة تتستخدم بحرية من غير فحص الشروط» ← __غلط__ · «الإشارة إلى المصدر مطلوب للبيانات المدفوعة بس» ← __غلط__ · «بيانات الـAPI مش محتاجة شروط» ← __غلط__. تسلسل الـAPI الصح: __العميل يبعت طلب للخادم ← الخادم يرجّع البيانات بصيغة زي JSON__.', en: '"Open data can be used freely without checking terms" → __false__ · "citation is only needed for paid data" → __false__ · "API data needs no terms" → __false__. The correct API sequence: __the client sends a request to the server → the server returns data in a format such as JSON__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — ليه API مش متصفح؟', en: 'Deep dive — why an API and not a browser?' }, text: { ar: 'السرعة والحجم: جلب 200 دولة × 20 سنة يدوي صعب جدًا، والـAPI بيخلّي برنامجك يكرّره آليًا ضمن حدود الخدمة. بس الـAPI مابيلغيش القواعد: التزم بحد الطلبات عشان ماتتقّلش على الخادم، واقرا شروط الاستخدام قبل ما تنشر أي حاجة مبنية على البيانات، واكتب سطر المصدر.', en: 'Speed and volume: fetching 200 countries × 20 years by hand is practically impossible, while an API makes it one line in your program, repeated automatically. But an API does not cancel the rules: respect request limits so you do not overload the server, read the terms of use before publishing anything built on the data, and write the citation line.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'order', prompt: { ar: 'رتّب خطوات جلب البيانات عن طريق API:', en: 'Put the steps of fetching data through an API in order:' },
            items: [
              { ar: 'العميل يبعت طلب لنقطة النهاية', en: 'The client sends a request to the endpoint' },
              { ar: 'الخادم يعالج الطلب', en: 'The server processes the request' },
              { ar: 'الخادم يرجّع رد بصيغة JSON', en: 'The server returns a JSON response' },
              { ar: 'البرنامج يقرا القيمة ويستخدمها', en: 'The program reads the value and uses it' },
            ],
            explain: { ar: 'طلب ← معالجة ← رد JSON ← استخدام.', en: 'Request → processing → JSON response → use.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'نزّلت مجموعة من البنك الدولي النهارده وعايز تحط رسمها في تقرير عام. تعمل إيه؟', en: 'You downloaded a World Bank dataset today and want its chart in a public report. What do you do?' },
            options: [
              { ar: 'أقرا الشروط وأشير إلى المصدر (مزوّد · اسم · تاريخ · رابط)', en: 'Read the terms and cite: provider, name, date and URL' },
              { ar: 'أنشره على طول من غير قراية لأن البيانات مفتوحة ومجانية', en: 'Publish it straight away because the data is open and free' },
              { ar: 'أكتب «المصدر: الإنترنت» تحت الرسم وخلاص', en: 'Write "Source: the Internet" under the chart and that’s it' },
              { ar: 'أشر إلى المصدر بس لو كنت دفعت فلوس عشان أجيب البيانات', en: 'Cite the source only if I had paid for the data' },
            ],
            answer: 0,
            explain: { ar: 'الشروط __لكل مجموعة__ + المصدر __دايمًا__ (مزوّد · اسم · تاريخ · رابط).', en: 'Terms __per dataset__ + citation __always__ (provider · name · date · URL).' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**① طلب** لنقطة النهاية (رابط محدّد) ← **② رد** JSON (اسم: قيمة) ← **③ استخدام** آلي.', en: '**① Request** to the endpoint (a precise URL) → **② JSON response** (name: value) → **③ automated use**.' },
            { ar: '**الـAPI:** امشِ على الشروط · ماتكترش الطلبات · اتأكّد من النطاق المسموح.', en: '**API:** follow the terms · no excessive requests · confirm the permitted scope.' },
            { ar: '**شروط الاستخدام** لكل مجموعة · **الإشارة إلى المصدر** دايمًا: مزوّد · اسم · تاريخ · رابط.', en: '**Terms of use** per dataset · **citation** always: provider · name · date · URL.' },
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
            { text: { ar: 'A) World Bank Open Data بينشر إحصائيات عن الاقتصاد والسكان والتعليم لدول العالم.', en: 'A) World Bank Open Data publishes statistics on the economy, population and education of the world’s countries.' }, answer: true },
            { text: { ar: 'B) باستخدام API نقدر نجيب البيانات مباشرة من غير متصفح.', en: 'B) Using an API, data can be obtained directly without a browser.' }, answer: true },
            { text: { ar: 'C) طالما البيانات مفتوحة، نستخدمها بحرية من غير ما نتحقّق من شروط الاستخدام.', en: 'C) As long as data is open, it can be used freely without checking the terms of use.' }, answer: false },
            { text: { ar: 'D) لما نستخدم البيانات لازم نذكر المزوّد واسم البيانات وتاريخ الحصول والرابط كمصدر.', en: 'D) When using data, the provider, data name, date obtained and URL must be cited as the source.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) تعريف صحيح ← **✓**.', en: 'A) A correct description → **✓**.' },
            { ar: 'B) ده دور الـAPI ← **✓**.', en: 'B) That is the API’s role → **✓**.' },
            { ar: 'C) شروط الاستخدام __بتختلف لكل مجموعة__ ولازم تتفحص ← **✗**.', en: 'C) Terms __differ per dataset__ and must be checked → **✗**.' },
            { ar: 'D) عناصر الإشارة إلى المصدر الأربعة ← **✓**.', en: 'D) The four elements of a citation → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمزوّد (A–C):', en: '(2) Match each description (a–c) with the provider (A–C):' },
            left: [
              { ar: 'a) بينشر إحصائيات الاقتصاد والسكان والتعليم لدول العالم', en: 'a) Publishes economic, population and education stats for countries' },
              { ar: 'b) بيوفّر إحصائيات دولية من الأمم المتحدة ووكالاتها', en: 'b) Provides international statistics from the UN and its agencies' },
              { ar: 'c) منصّة بتعمل مسابقات تحليل البيانات', en: 'c) A platform that runs data-analysis competitions' },
            ],
            right: [{ ar: 'A UN Data', en: 'A UN Data' }, { ar: 'B World Bank Open Data', en: 'B World Bank Open Data' }, { ar: 'C Kaggle', en: 'C Kaggle' }],
            answer: [1, 0, 2] },
          solution: [
            { ar: 'a: إحصائيات الدول = **World Bank** ← B.', en: 'a: country statistics = **World Bank** → B.' },
            { ar: 'b: الأمم المتحدة = **UN Data** ← A.', en: 'b: the UN = **UN Data** → A.' },
            { ar: 'c: مسابقات = **Kaggle** ← C.', en: 'c: competitions = **Kaggle** → C.' },
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
            { q: { ar: '1. اسم بوابة البيانات المفتوحة للبنك الدولي؟', en: '1. The name of the World Bank’s open-data portal?' }, a: { ar: 'World Bank Open Data', en: 'World Bank Open Data' } },
            { q: { ar: '2. قواعد تعامل أجزاء البرامج مع بعض، وبتستخدم لجلب البيانات؟', en: '2. Rules by which software parts interact, also used to fetch data?' }, a: { ar: 'API', en: 'API' } },
            { q: { ar: '3. اذكر صيغة نصية شائعة ممكن الـAPI يستخدمها لتمثيل البيانات المهيكلة.', en: '3. The common data format returned by an API?' }, a: { ar: 'JSON', en: 'JSON' } },
            { q: { ar: '4. ذكر معلومات المصدر بالطريقة اللي الترخيص أو معيار الاستشهاد بيطلبها؟', en: '4. Citing source information the way the license or citation standard requires?' }, a: { ar: 'الإشارة إلى المصدر (الإسناد)', en: 'Source citation' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف تسلسل جلب البيانات عن طريق API:', en: 'Choose the best description of fetching data through an API:' },
            options: [
              { ar: 'A العميل يبعت طلب للخادم، والخادم يرجّع البيانات بصيغة زي JSON', en: 'A The client requests from the server, which returns data as JSON' },
              { ar: 'B الخادم بيفضل يبعت بيانات للعميل من طرف واحد على طول', en: 'B The server keeps sending data to the client one-sidedly' },
              { ar: 'C العملاء بيتبادلوا البيانات مع بعض مباشرة من غير خادم', en: 'C Clients exchange data directly with each other, no server' },
              { ar: 'D الخادم بيخزّن البيانات بس والعملاء مايقدروش يجيبوها', en: 'D The server only stores data and clients cannot retrieve it' },
            ],
            fixedOrder: true, answer: 0,
            explain: { ar: 'طلب من العميل ← رد من الخادم (A).', en: 'A request from the client → a response from the server (A).' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'classify', prompt: { ar: 'لكل غرض اختار المزوّد:', en: 'Choose the provider for each purpose:' },
            groups: [{ icon: 'globe', label: { ar: 'A UN Data', en: 'A UN Data' } }, { icon: 'building', label: { ar: 'B World Bank Open Data', en: 'B World Bank Open Data' } }, { icon: 'star', label: { ar: 'C Kaggle', en: 'C Kaggle' } }],
            items: [
              { text: { ar: 'a) مقارنة الناتج المحلي الإجمالي بين الدول', en: 'a) Comparing GDP between countries' }, group: 1 },
              { text: { ar: 'b) مجموعات من مجالات متنوعة لدراسة التعلّم الآلي', en: 'b) Datasets from many fields to study ML' }, group: 2 },
            ],
            explain: { ar: 'a ← B · b ← C.', en: 'a → B · b → C.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (3)', en: 'Try 2 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف استخدام البيانات المفتوحة:', en: 'Choose the best description of using open data:' },
            options: [
              { ar: 'A بتتستخدم بحرية ومفيش داعي نتحقّق من شروط الاستخدام', en: 'A Used freely; no need to check the terms of use' },
              { ar: 'B الإشارة إلى المصدر مطلوب بس للبيانات اللي بتتنشر بفلوس', en: 'B Citing the source is only needed for paid data' },
              { ar: 'C حتى المفتوحة: نذكر المزوّد والاسم والتاريخ والرابط', en: 'C Even open data: cite provider, name, date and URL' },
              { ar: 'D البيانات اللي جاية من API مش لازم نمشي على شروطها', en: 'D Data from an API need not follow its terms of use' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'المصدر مطلوب دايمًا (C).', en: 'Citation is always required (C).' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(e):', en: 'Read and fill blanks (a)–(e):' },
            text: { ar: 'لاستخدام البيانات المفتوحة لازم نعرف المصدر وطريقة الوصول وشروط الاستخدام. نقدر نلاقي مؤشرات دولية في بوابات زي {0}، مع فحص تعريف المؤشر ومصدره. وممكن المصدر يوفّر {1} عشان البرنامج يستقبل استجابة بصيغة زي {2} حسب الخدمة. ولازم دايمًا نتحقق من {3} الخاصة بالمجموعة، وبعدين نشير إلى {4} وفق الترخيص ومعيار الاستشهاد.', en: 'Economic, population and education statistics for countries can be obtained from sources such as {0}, run by the World Bank. Besides downloading in a browser, using {1} data can be obtained directly in formats such as {2}. When using open data we must always check the {3} set for each dataset, and cite the provider, name, date and URL as the {4}.' },
            bank: [{ ar: 'World Bank Open Data', en: 'World Bank Open Data' }, { ar: 'API', en: 'an API' }, { ar: 'JSON', en: 'JSON' }, { ar: 'شروط الاستخدام', en: 'terms of use' }, { ar: 'المصدر', en: 'source' }, { ar: 'Kaggle', en: 'Kaggle' }],
            answer: [0, 1, 2, 3, 4],
            explain: { ar: '(a) World Bank Open Data (b) API (c) JSON (d) شروط الاستخدام (e) المصدر.', en: '(a) World Bank Open Data (b) API (c) JSON (d) terms of use (e) source.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف __Kaggle__:', en: 'Choose the best description of __Kaggle__:' },
            options: [
              { ar: 'A بوابة للبنك الدولي بتنشر إحصائيات الدول', en: 'A A World Bank portal publishing country statistics' },
              { ar: 'B موقع إحصائيات دولية تابع للأمم المتحدة', en: 'B An international statistics site of the UN' },
              { ar: 'C منصّة مسابقات تحليل بيانات فيها مجموعات متنوعة', en: 'C A data-analysis competition platform with datasets' },
              { ar: 'D نظام بيسجّل تلقائيًا سجلّات تصفّح المواقع', en: 'D A system that automatically logs website browsing' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'Kaggle = مسابقات + مجموعات (C).', en: 'Kaggle = competitions + datasets (C).' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ وصف مناسب للإشارة إلى المصدر؟', en: 'Which is __not__ an appropriate description of source citation?' },
            options: [
              { ar: 'A مايثبتش الموثوقية لوحده، بس بيساعد غيرك يقيّمها', en: 'A It matters as evidence of the data’s reliability' },
              { ar: 'B مهم عشان غيرك يتحقّق من التحليل', en: 'B It matters so others can verify the analysis' },
              { ar: 'C بيشمل المزوّد والاسم والتاريخ والرابط', en: 'C It includes the provider, name, date and URL' },
              { ar: 'D مع البيانات المفتوحة مش لازم نذكره', en: 'D With open data it is not required' },
            ],
            fixedOrder: true, answer: 3,
            explain: { ar: 'المصدر لازم __حتى__ مع المفتوحة (D غلط).', en: 'Citation is needed __even__ for open data (D is wrong).' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (3)', en: 'Exercise 3 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ نقطة انتباه صحيحة وأنت بتستخدم API؟', en: 'Which is __not__ a correct point of care when using an API?' },
            options: [
              { ar: 'A استخدمه حسب شروط المزوّد بالضبط', en: 'A Use it exactly according to the provider’s terms' },
              { ar: 'B ابعد عن الطلبات الكتير في وقت قصير', en: 'B Avoid excessive requests in a short time' },
              { ar: 'C اتأكّد قبلها من نطاق الاستخدام المسموح', en: 'C Confirm the permitted scope of use beforehand' },
              { ar: 'D عشان طبيعة الـAPI، استخدمه من غير شروط', en: 'D By its nature, an API needs no terms check' },
            ],
            fixedOrder: true, answer: 3,
            explain: { ar: 'الـAPI __مابيلغيش__ الشروط (D غلط).', en: 'An API does __not__ cancel the terms (D is wrong).' } },
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
          { front: { ar: 'البيانات المفتوحة', en: 'Open data' }, back: { ar: 'بيانات متاحة بترخيص أو شروط تسمح بالوصول وإعادة الاستخدام وإعادة التوزيع.', en: 'Data made public for anyone to use — under terms.' } },
          { front: { ar: 'World Bank Open Data', en: 'World Bank Open Data' }, back: { ar: 'إحصائيات الدول: اقتصاد، سكان، تعليم، صحة.', en: 'Country statistics: economy, population, education, health.' } },
          { front: { ar: 'UN Data', en: 'UN Data' }, back: { ar: 'إحصائيات دولية من الأمم المتحدة ووكالاتها.', en: 'International statistics from the UN and its agencies.' } },
          { front: { ar: 'Kaggle', en: 'Kaggle' }, back: { ar: 'منصّة مسابقات تحليل بيانات + مجموعات للتعلّم الآلي.', en: 'Data-analysis competitions + datasets for ML.' } },
          { front: { ar: 'API', en: 'API' }, back: { ar: 'قواعد بتتيح لبرنامج يطلب بيانات أو وظايف من برنامج أو خدمة تانية.', en: 'Rules for software interaction — fetches data directly.' } },
          { front: { ar: 'نقطة النهاية (Endpoint)', en: 'Endpoint' }, back: { ar: 'العنوان/الرابط اللي الطلب بيتبعت له.', en: 'The address/URL a request is sent to.' } },
          { front: { ar: 'JSON', en: 'JSON' }, back: { ar: 'صيغة بيانات بأزواج «اسم: قيمة».', en: 'A data format of "name: value" pairs.' } },
          { front: { ar: 'شروط الاستخدام', en: 'Terms of use' }, back: { ar: 'القواعد المحدّدة لكل مجموعة بيانات.', en: 'The rules set for each dataset.' } },
          { front: { ar: 'الإشارة إلى المصدر', en: 'Source citation' }, back: { ar: 'مزوّد · اسم البيانات · تاريخ الحصول · رابط.', en: 'Provider · data name · date obtained · URL.' } },
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
            prompt: { ar: 'اشرح ليه المحلّل لازم يتحقّق من شروط الاستخدام ويشير إلى المصدر حتى لو البيانات مجانية ومفتوحة. (أشِر إلى: حقّك في استخدام البيانات، والموثوقية، وإن غيرك يتحقّق)', en: 'Explain why an analyst must check the terms of use and cite the source even when data is free and open. (Refer to: your right to use the data, reliability, and letting others verify)' },
            points: [
              { ar: 'الشروط بتحدّد حقّك في الاستخدام (لكل مجموعة).', en: 'Terms define your right to use (per dataset).' },
              { ar: 'المصدر بيساعد غيرك يلاقيها ويقيّمها.', en: 'Citation is evidence of reliability.' },
              { ar: 'المصدر بيخلّي غيرك يتحقّق.', en: 'Citation lets others verify.' },
            ],
            model: { ar: '«مجاني» مش معناه «من غير قواعد». أولًا شروط الاستخدام __بتختلف لكل مجموعة__: ممكن تمنع الاستخدام التجاري أو إعادة النشر، فلازم أعرف إذا كان __مسموح لي__ أستخدمها بالشكل اللي عايزه. ثانيًا الإشارة إلى المصدر (المزوّد، اسم البيانات، تاريخ الحصول، الرابط) __مابتثبتش الموثوقية لوحدها__، بس بتساعد اللي بيقرا تحليلي يلاقي البيانات ويقيّمها. ثالثًا المصدر __بيخلّي غيري يتحقّق__ من التحليل ويرجع لنفس البيانات ويكرّر الحساب. فالشروط والمصدر هما اللي بيحوّلوا بيانات مستعارة لتحليل موثوق.', en: '"Free" does not mean "no rules". First, terms of use __differ for each dataset__: they may forbid commercial use or redistribution, so I must know whether I am __allowed__ to use it the way I want. Second, citing the source (provider, data name, date obtained, URL) is __evidence of the data’s reliability__ — readers know it comes from a trusted body such as the World Bank. Third, the citation __lets others verify__ the analysis by returning to the same data and repeating the calculation. Terms and citation turn borrowed data into trustworthy analysis.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — الوصول للإنترنت', en: 'Think as an engineer — Internet access' },
            prompt: { ar: 'لمشروع مدرسي عايز توضّح إزاي الوصول للإنترنت في مصر اتغيّر في 10 سنين مقارنة ببلدين جيران. ١) افحص مزوّدين (World Bank وUN Data): فيه أرقام الوصول للإنترنت حسب الدولة والسنة؟ وآخر سنة متاحة؟ ٢) قارنهم في نقطة مش في جدول الدرس (البيانات بترجع لورا قد إيه، أو الشروط تسمح بنشر الرسم؟) وسمِّ خطر لاختيار مصدر غلط. ٣) اختار مزوّد وطريقة جلب واكتب سطر المصدر.', en: 'For a school project you want to show how Internet access in Egypt changed over 10 years versus two neighbors. 1) Check two providers (World Bank, UN Data): do they carry Internet-access figures by country and year? Latest year? 2) Compare them on a point not in the lesson table (how far back, or whether the terms allow publishing a chart) and name a risk of the wrong source. 3) Choose one provider and one fetch method and write the citation line.' },
            points: [
              { ar: 'نبدأ من الأعمدة المطلوبة: دولة، سنة، نسبة الوصول.', en: 'Start from the fields needed: country, year, access rate.' },
              { ar: 'خطر: بيانات قديمة/ناقصة أو شروط تمنع النشر.', en: 'Risk: old/incomplete data or terms forbidding publication.' },
              { ar: 'مزوّد + طريقة + سطر مصدر كامل.', en: 'Provider + method + a full citation line.' },
            ],
            model: { ar: '١) محتاج: الدولة والسنة ونسبة مستخدمي الإنترنت. World Bank Open Data فيه مؤشر «نسبة الأفراد المستخدمين للإنترنت» حسب الدولة والسنة، وUN Data فيه إحصائيات مشابهة من وكالات الأمم المتحدة. ٢) أقارن مدى رجوع البيانات للخلف (لازم تغطّي 10 سنين كاملة للتلات دول) وهل الشروط بتسمح أنشر رسم في تقرير عام. الخطر: لو اخترت مصدر ناقص سنين، المقارنة هتبان فيها قفزات مش حقيقية. ٣) هختار World Bank Open Data وأنزّل بالمتصفح (3 دول × 10 سنين = بيانات قليلة)، والـAPI لو هكرّر لدول كتير. سطر المصدر: «World Bank Open Data — Individuals using the Internet (% of population) — تاريخ الحصول: 2026-10-13 — data.worldbank.org».', en: '1) I need country, year and the share of Internet users. World Bank Open Data has an "individuals using the Internet" indicator by country and year; UN Data has similar statistics from UN agencies. 2) I compare how far back the data goes (it must cover all 10 years for the three countries) and whether the terms allow publishing a chart in a public report. The risk: a source with missing years would show jumps that are not real. 3) I choose World Bank Open Data and download in a browser (3 countries × 10 years is small), or use the API if repeating for many countries. Citation: "World Bank Open Data — Individuals using the Internet (% of population) — obtained 2026-10-13 — data.worldbank.org".' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'تطبيق طقس على الموبايل بيعرض توقّع النهارده بيجيبه من خدمة طقس عامة. اوصف خطوات الطلب والاستجابة بين التطبيق والخادم، وسمِّ صيغة بيانات محتملة زي JSON (الصيغة بتعتمد على الخدمة).', en: 'A phone weather app shows today’s forecast fetched from a public weather service. Describe the request/response steps between the app and the server, and name the likely data format.' },
            points: [{ ar: 'التطبيق (عميل) يبعت طلب لنقطة نهاية فيها المدينة.', en: 'The app (client) requests an endpoint with the city.' }, { ar: 'الخادم يرجّع JSON (درجة، حالة الجو…).', en: 'The server returns JSON (temperature, conditions…).' }, { ar: 'التطبيق يقرا القيم ويعرضها.', en: 'The app reads the values and displays them.' }],
            model: { ar: '١) التطبيق (العميل) بيبعت طلب لنقطة نهاية خدمة الطقس، والرابط فيه المدينة والتاريخ. ٢) الخادم بيعالج الطلب ويرجّع رد غالبًا بصيغة __JSON__ زي {"city":"Cairo","temp":31,"sky":"sunny"}. ٣) التطبيق بيقرا القيم دي ويعرضها على الشاشة — ولازم يلتزم بحد الطلبات وشروط الخدمة.', en: '1) The app (client) sends a request to the weather service’s endpoint, with the city and date in the URL. 2) The server processes it and returns a response, most likely __JSON__, e.g. {"city":"Cairo","temp":31,"sky":"sunny"}. 3) The app reads these values and shows them — while respecting the service’s request limits and terms.' } },
        },
      ],
    },

    /* ───────────── textbook prompts ───────────── */
    {
      id: 'reflect', kind: 'challenge',
      title: { ar: 'أسئلة الكتاب: تأمّل · تحدّى', en: 'Textbook prompts: reflect · challenge' },
      steps: [
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل', en: 'Reflect' },
            prompt: { ar: 'افتكر رسم بياني شفته من غير مصدر — صدّقته؟ وأنهي سطر كان هيغيّر رأيك؟', en: 'Think of a chart you saw with no source — did you trust it, and which line would have changed that?' },
            points: [{ ar: 'من غير مصدر صعب نثق أو نتحقّق.', en: 'Without a source it is hard to trust or verify.' }, { ar: 'سطر المصدر (مزوّد · اسم · تاريخ · رابط).', en: 'A citation line (provider · name · date · URL).' }],
            model: { ar: 'رسم من غير مصدر مقدرش أعرف أرقامه جاية منين ولا إمتى، فثقتي فيه ضعيفة ومقدرش أتحقّق منه. لو كان تحته سطر زي «World Bank Open Data — Population, total — 2026-10-13 — data.worldbank.org» كنت هعرف إنه من جهة موثوقة وأقدر أرجع للبيانات بنفسي.', en: 'With no source I cannot tell where or when its numbers came from, so my trust is low and I cannot verify it. A line underneath such as "World Bank Open Data — Population, total — 2026-10-13 — data.worldbank.org" would show it comes from a trusted body and let me check the data myself.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تحدّى', en: 'Challenge' },
            prompt: { ar: 'مسموح لك بسطر مصدر واحد بس لرسم مبني على مجموعة من البنك الدولي نزّلتها النهارده. اكتب السطر ده، وقول أنهي عنصر عمرك ما هتشيله وليه.', en: 'You may write only one citation line for a chart built on a World Bank dataset you downloaded today. Write it, and say which element you would never drop and why.' },
            points: [{ ar: 'سطر فيه المزوّد والاسم والتاريخ والرابط.', en: 'A line with provider, name, date and URL.' }, { ar: 'عنصر لا يُشال + سبب.', en: 'An element never dropped + reason.' }],
            model: { ar: '«المصدر: World Bank Open Data — Population, total — تاريخ الحصول 2026-10-13 — data.worldbank.org». عمري ما هشيل __الرابط__ (أو المزوّد) لأنه الطريق الوحيد إن غيري يرجع لنفس البيانات ويتحقّق؛ والتاريخ مهم كمان لأن البيانات المفتوحة بتتحدّث.', en: '"Source: World Bank Open Data — Population, total — obtained 2026-10-13 — data.worldbank.org". I would never drop the __URL__ (or provider), because it is the only way others can return to the same data and verify; the date also matters because open data gets updated.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '5-3', seconds: 60, items: [
          { text: { ar: 'مفتوحة = من غير أي قواعد', en: 'Open = no rules at all' }, answer: false },
          { text: { ar: 'World Bank = إحصائيات الدول', en: 'World Bank = country statistics' }, answer: true },
          { text: { ar: 'UN Data = إحصائيات الأمم المتحدة', en: 'UN Data = UN statistics' }, answer: true },
          { text: { ar: 'Kaggle = مسابقات تحليل بيانات', en: 'Kaggle = data-analysis competitions' }, answer: true },
          { text: { ar: 'Kaggle بوابة البنك الدولي', en: 'Kaggle is the World Bank portal' }, answer: false },
          { text: { ar: 'API = قواعد تعامل البرامج', en: 'API = rules for software interaction' }, answer: true },
          { text: { ar: 'الـAPI محتاج متصفح', en: 'An API needs a browser' }, answer: false },
          { text: { ar: 'نقطة النهاية = عنوان الطلب', en: 'Endpoint = the request’s address' }, answer: true },
          { text: { ar: 'JSON = أزواج اسم: قيمة', en: 'JSON = name: value pairs' }, answer: true },
          { text: { ar: 'العملاء بيتبادلوا البيانات مباشرة', en: 'Clients swap data directly' }, answer: false },
          { text: { ar: 'نكتّر الطلبات عادي', en: 'Send as many requests as we like' }, answer: false },
          { text: { ar: 'الشروط بتختلف لكل مجموعة', en: 'Terms differ per dataset' }, answer: true },
          { text: { ar: 'المصدر للبيانات المدفوعة بس', en: 'Citation only for paid data' }, answer: false },
          { text: { ar: 'المصدر فيه التاريخ والرابط', en: 'A citation includes date and URL' }, answer: true },
          { text: { ar: 'المصدر بيخلّي غيرك يتحقّق', en: 'Citation lets others verify' }, answer: true },
          { text: { ar: 'بيانات الـAPI من غير شروط', en: 'API data has no terms' }, answer: false },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 5-3', en: 'Lesson 5-3 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. «قواعد لإزاي أجزاء البرامج تتعامل، وبتستخدم لجلب البيانات» — أنهي؟', en: '1. "Rules for how software interacts, used to fetch data" — which?' }, options: [{ ar: 'JSON', en: 'JSON' }, { ar: 'API', en: 'API' }, { ar: 'نقطة النهاية', en: 'Endpoint' }, { ar: 'شروط الاستخدام', en: 'Terms of use' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. بوابة بتنشر إحصائيات الاقتصاد والسكان لدول العالم — أنهي؟', en: '2. A portal publishing economy/population statistics for countries — which?' }, options: [{ ar: 'منصّة Kaggle', en: 'Kaggle' }, { ar: 'World Bank Open Data', en: 'World Bank Open Data' }, { ar: 'نقطة النهاية (Endpoint)', en: 'Endpoint' }, { ar: 'صيغة JSON', en: 'JSON' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. العنوان/المسار اللي طلب الـAPI بيتبعت له — اسمه إيه؟', en: '3. The address/path an API request is sent to — what is it called?' }, options: [{ ar: 'الخادم (Server)', en: 'The server' }, { ar: 'نقطة النهاية', en: 'The endpoint' }, { ar: 'العميل (Client)', en: 'The client' }, { ar: 'المصدر (Source)', en: 'The source' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. طالما البيانات مفتوحة، مفيش داعي نفحص شروط الاستخدام.', en: '4. Open data needs no terms-of-use check.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. باستخدام API نقدر نجيب البيانات مباشرة من غير متصفح.', en: '5. An API fetches data directly without a browser.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. الإشارة إلى المصدر بيخلّي غيرك يتحقّق من التحليل.', en: '6. Source citation lets others verify the analysis.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. عرّف البيانات المفتوحة واذكر تلات مصادر موثوقة ليها واستخدام كل واحد.', en: '7. Define open data and name three reliable sources and the use of each.' },
          points: [{ ar: 'بيانات بترخيص يسمح بالوصول وإعادة الاستخدام وإعادة التوزيع.', en: 'Data made public for anyone to use.' }, { ar: 'World Bank: مقارنات الدول · UN Data: قضايا عالمية · Kaggle: تعلّم آلي.', en: 'World Bank: country comparisons · UN Data: global issues · Kaggle: ML.' }],
          model: { ar: 'البيانات المفتوحة بيانات متاحة بترخيص أو شروط تسمح بالوصول وإعادة الاستخدام وإعادة التوزيع. مصادرها: World Bank Open Data لإحصائيات الاقتصاد والسكان والتعليم والصحة للدول (مقارنات دولية)، وUN Data لإحصائيات الأمم المتحدة ووكالاتها (قضايا عالمية زي السكان والتنمية والبيئة)، وKaggle منصّة مسابقات تحليل بيانات فيها مجموعات متنوعة (دراسة التعلّم الآلي والبحث).', en: 'Open data is data made public for anyone to use freely (under terms). Sources: World Bank Open Data for countries’ economy, population, education and health statistics (international comparisons); UN Data for statistics from the UN and its agencies (global issues such as population, development and environment); Kaggle, a data-analysis competition platform with varied datasets (ML study and research).' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. اذكر خطوات جلب البيانات عن طريق API التلاتة بالترتيب.', en: '8. State the three steps of obtaining data through an API, in order.' },
          points: [{ ar: '① العميل يبعت طلب لنقطة نهاية.', en: '① The client sends a request to an endpoint.' }, { ar: '② الخادم يرجّع رد بصيغة محدّدة (JSON).', en: '② The server returns a formatted response (JSON).' }, { ar: '③ البرنامج يقرا ويستخدم.', en: '③ The program reads and uses it.' }],
          model: { ar: '① العميل (البرنامج) بيبعت طلب لنقطة نهاية — عنوان/مسار محدّد. ② الخادم بيعالج الطلب ويرجّع استجابة بصيغة محدّدة، غالبًا JSON. ③ البرنامج بيقرا الاستجابة ويطلّع اللي محتاجه ويستخدمه في التحليل.', en: '① The client (program) sends a request to an endpoint — a specific address/path. ② The server processes it and returns a response in a set format, usually JSON. ③ The program reads the response, extracts what it needs and uses it in the analysis.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. إيه عناصر الإشارة إلى المصدر الأربعة، وليه مهم؟', en: '9. What are the four elements of a source citation, and why does it matter?' },
          points: [{ ar: 'المزوّد · اسم البيانات · تاريخ الحصول · الرابط.', en: 'Provider · data name · date obtained · URL.' }, { ar: 'غيرك يلاقيها ويقيّمها ويتحقق.', en: 'Evidence of reliability + others can verify.' }],
          model: { ar: 'العناصر: الجهة الناشرة (المزوّد)، واسم مجموعة البيانات، وتاريخ الحصول عليها، والرابط URL. أهميته: بيساعد غيرك يلاقي البيانات ويقيّمها ويراجع التحليل، بس مايثبتش الموثوقية لوحده.', en: 'Elements: the publishing body (provider), the dataset name, the date obtained, and the URL. It matters as evidence of the data’s reliability and so others can verify the analysis by returning to the same data.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. اذكر نقطتين انتباه وأنت بتستخدم API غير «امشِ على شروط الاستخدام».', en: '10. Name two points of care when using an API besides "follow the terms of use".' },
          points: [{ ar: 'ماتبعتش طلبات كتير في وقت قصير.', en: 'No excessive requests in a short time.' }, { ar: 'اتأكّد من نطاق الاستخدام المسموح للبيانات.', en: 'Confirm the permitted scope of use of the data.' }],
          model: { ar: 'أولًا: ماتبعتش طلبات كتير جدًا في وقت قصير عشان ماتتقّلش على الخادم (التزم بحد الطلبات). ثانيًا: اتأكّد من نطاق الاستخدام المسموح للبيانات قبل ما تستخدمها أو تنشرها.', en: 'First: do not send excessive requests in a short time, so you do not overload the server (respect request limits). Second: confirm the permitted scope of use of the data before using or publishing it.' } } },
      ],
    },
  ],
});
