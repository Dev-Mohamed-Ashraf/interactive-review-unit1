/* =========================================================
 * content/lesson-6-3.js — تصور البيانات والتواصل
 * Pure data. Sources: textbook part 2, 6-3 (EN p.48–56) + memo (Arabic
 * wording, deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('6-3', {
  id: '6-3',
  color: '#10b981',
  cover: 'img/an-l3-cover.webp',
  title: { ar: 'تصور البيانات والتواصل', en: 'Data Visualization and Communication' },
  guiding: { ar: 'إزاي نختار رسم بيكشف النمط بصدق، وإزاي نحوّل الرسم لرسالة غيرنا يفهمها؟', en: 'How do we choose a visualization that reveals a pattern honestly, and how do we turn a chart into a message others understand?' },
  hook: {
    ar: 'جدول أرقام ممكن __يخبّي__ أهم حاجة محتاج تشوفها. حوّله للصورة المناسبة فالنمط __يقفز قدّامك__ — أزحم ساعة، أقوى علاقة، القيمة الشاذة. **تصور البيانات** ليه وظيفتين: يساعدك __تفهم__ بياناتك، ويساعدك __تشرحها__ لغيرك. لمتغير أو اتنين تكفي الأعمدة أو الخطوط أو المبعثر؛ ولتلاتة أو أكتر بنستخدم **الخرائط الحرارية** و**مخططات المستطيلات**. والرسم لوحده مش رسالة: **سرد قصص البيانات** هو اللي بيخلّي الجمهور يفهم فعلًا.',
    en: 'A table of numbers can __hide__ the thing you most need to see. Turn it into the right picture and the pattern __jumps out__ — the busiest hour, the strongest link, the outlier. **Data visualization** does two jobs: it helps you __understand__ your data and helps you __explain__ it to others. For one or two variables, bar, line or scatter charts are enough; for three or more, **heatmaps** and **mosaic plots** are used. And a chart alone is not a message: **data storytelling** is what makes an audience really understand.',
  },
  keyFact: { ar: 'تصور البيانات بيحوّل الأرقام لأنماط العين بتشوفها — __للمحلّل وللتواصل__. الرسوم الشائعة بتناسب __متغير أو اتنين__؛ و__الخريطة الحرارية__ و__مخطط المستطيلات__ بيتعاملوا مع توليفات أكتر. والتواصل الكويس بيستخدم __سرد قصص البيانات__: رسالة واضحة، وعناصر بتخدمها بس، وتسميات صادقة.', en: 'Visualization turns numbers into patterns the eye can see — __for the analyst and for communication__. Common charts suit __one or two variables__; __heatmaps__ and __mosaic plots__ handle more combinations. Good communication uses __data storytelling__: a clear message, only the elements that serve it, and honest labels.' },
  concepts: ['data visualization', 'bar graph', 'line graph', 'scatter plot', 'overplotting', 'heatmap', 'mosaic plot', 'data storytelling'],
  objectives: [
    { ar: 'أشرح دور تصور البيانات وأختار الرسوم المناسبة، ومنها للبيانات متعددة المتغيرات.', en: 'Explain the role of data visualization and select suitable graphs, including for multiple variables.' },
    { ar: 'أستخدم سرد قصص البيانات عشان أوصّل رسالة واضحة وصادقة من البيانات.', en: 'Apply data storytelling to communicate a clear and honest message from data.' },
  ],

  stations: [
    /* ───────────── 1 · choosing the chart ───────────── */
    {
      id: 'charts', kind: 'learn',
      title: { ar: 'نختار الرسم: من الأعمدة للخريطة الحرارية', en: 'Choosing the chart: from bars to heatmaps' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'عايز تعرف أزحم وقت في كافيتريا المدرسة طول الأسبوع… تبص على إيه؟', en: 'You want the busiest time in the school cafeteria all week… what would you look at?' },
            options: [
              { emoji: '🔢', text: { ar: 'جدول أرقام طويل', en: 'A long table of numbers' } },
              { emoji: '🌡️', text: { ar: 'شبكة ملوّنة يوم × وقت', en: 'A coloured day × time grid' } },
              { emoji: '🥧', text: { ar: 'دايرة واحدة', en: 'One pie chart' } },
            ],
            after: { ar: 'الشبكة الملوّنة دي ليها اسم 👇', en: 'That coloured grid has a name 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: الرسم الصح… يكشف النمط', en: '🎞️ Animation: the right chart… reveals the pattern' },
          enTitle: 'Choosing a visualization',
          terms: ['data visualization', 'bar graph', 'line graph', 'scatter plot', 'overplotting', 'heatmap', 'mosaic plot'],
          visual: { anim: 'vizMovie', props: { scenes: [0, 4] } },
          beats: [
            { ar: '**تصور البيانات:** عرض البيانات __كرسوم أو أشكال__ عشان ندرك بالعين سمات __صعب نقراها من الأرقام لوحدها__. وليه **دورين**: 🧠 __تعميق فهم المحلّل نفسه__ (نشوف التوزيع والاتجاه والقيم الشاذة — زي وقت المذاكرة كخط بيبيّن تغيّرات مش باينة في الجدول) و📣 __توصيل البيانات للآخرين__ (ننقل النتيجة بسهولة — زي متوسط درجة كل فصل كأعمدة، حتى اللي بيشوفها لأول مرة يقارن بنظرة).', en: '**Data visualization:** representing data __as graphs or figures__ so features __hard to read from numbers alone__ can be grasped visually. It has **two roles**: 🧠 __deepening the analyst’s own understanding__ (seeing distribution, trends and outliers — e.g. study time as a line reveals changes a table hides) and 📣 __communicating data to others__ (conveying results easily — e.g. each class’s average score as bars, so even a first-time viewer compares at a glance).' },
            { ar: '📊 **الأعمدة** (نقارن قيم) · 📈 **الخطوط** (تغيّر مع الزمن) · ✳️ **المبعثر** (علاقة متغيرين كمّيين) — دول بيناسبوا __متغير أو اتنين__. في الدورين: اختار __رسم يناسب المحتوى__، واستخدم تمثيل __مايخلّيش الناس تفهم غلط__؛ والطريقة المناسبة بتختلف حسب __عدد المتغيرات ونوعها وغرض التحليل__.', en: '📊 **Bar** (compare values) · 📈 **line** (change over time) · ✳️ **scatter** (two quantitative variables) — these suit __one or two variables__. In both roles: pick __a graph that fits the content__ and a representation that __does not invite misunderstanding__; the right method depends on __the number and type of variables and the purpose__.' },
            { ar: '😵 **التراكب الزائد للنقاط:** في المخطط المبعثر، لما النقط __تبقى كتير__ بتتداخل و__الكثافة بتختفي__ — 5000 طالب «وقت المذاكرة قصاد الدرجة» بيبقوا كتلة صمّاء. والمبعثر كمان __مابيناسبش توليفات المتغيرات الفئوية__. الحل: **خريطة حرارية** لخلايا بتوضّح __فين معظم الطلبة فعلًا__ بنظرة.', en: '😵 **Overplotting:** in a scatter plot, when points __are many__ they overlap and __density disappears__ — 5,000 students’ "study time vs score" become one blob. Scatter plots also __do not suit combinations of categorical variables__. The fix: a **heatmap** of cells showing __where most students actually are__ at a glance.' },
            { ar: '🌡️ **الخريطة الحرارية:** عناصر على __محورين__، وحجم __قيمة تالتة رقمية__ لكل توليفة بيتمثّل __بتدرّج اللون__ أو اختلاف الدرجة — زي عدد العملاء حسب __يوم الأسبوع × الوقت__، أو متوسط الحرارة حسب مدينة × شهر. كثافة اللون بتكشف النمط بنظرة: __مسا الخميس والجمعة والسبت__ أزحم أوقات.', en: '🌡️ **Heatmap:** items on __two axes__, and the size of __a third numeric value__ for each combination shown by __colour gradient__ or shade — e.g. customers by __day of week × time__, or mean temperature by city × month. Colour intensity reveals the pattern at a glance: __Thursday, Friday and Saturday evenings__ are busiest.' },
            { ar: '🧩 **مخطط المستطيلات (الفسيفساء):** بيمثّل العلاقة بين __متغيرين فئويين__ بـ__حجم مساحات مستطيلة__: __عرض__ العمود = نسبة الفئة، و__ارتفاع__ كل شريحة = نسبتها جوّه مجموعتها، و__مساحة__ كل مستطيل = نسبة التوليفة دي. حتى لو الجدول التقاطعي صعب يتفهم، المخطط بيبيّن فروق النسب __كمساحات__ فالعلاقة بين الفئات تبان بسهولة (زي الصف × المادة المفضّلة).', en: '🧩 **Mosaic plot:** shows the relationship between __two categorical variables__ by __the size of rectangular areas__: column __width__ = the category’s share, each slice’s __height__ = its share within its group, and each rectangle’s __area__ = that combination’s share. Even when a cross-table is hard to read, the plot shows the differences in proportion __as areas__, so relationships between categories are easy to see (e.g. year group × favourite subject).' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل بيانات بالرسم الأنسب:', en: 'Match each dataset with the best chart:' },
            left: [
              { ar: 'عدد الزوّار حسب اليوم × الساعة', en: 'Visitors by day × hour' },
              { ar: 'الصف × المادة المفضّلة بالنسب', en: 'Year group × favourite subject by proportion' },
              { ar: 'وقت المذاكرة والدرجة لـ 20 طالب', en: 'Study time vs score for 20 students' },
              { ar: 'متوسط درجة كل فصل', en: 'Each class’s average score' },
            ],
            right: [{ ar: 'مخطط مبعثر', en: 'Scatter plot' }, { ar: 'أعمدة', en: 'Bar graph' }, { ar: 'خريطة حرارية', en: 'Heatmap' }, { ar: 'مخطط المستطيلات', en: 'Mosaic plot' }],
            answer: [2, 3, 0, 1],
            explain: { ar: 'قيمة عبر محورين = حرارية · فئتين بالنسب = مستطيلات · متغيرين كمّيين بنقط قليلة = مبعثر · مقارنة = أعمدة.', en: 'A value across two axes = heatmap · two categories by share = mosaic · two quantities, few points = scatter · comparison = bar.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'لتمثيل البيانات دور واحد بس: التواصل مع الآخرين.', en: 'Visualization has only one role: communicating with others.' }, answer: false, explain: { ar: 'دورين: __فهم المحلّل نفسه__ + التواصل.', en: 'Two roles: __the analyst’s own understanding__ + communication.' } },
            { text: { ar: 'لما نقط المبعثر تكتر ممكن تخفي الكثافة الحقيقية.', en: 'Many scatter points can hide the true density.' }, answer: true },
            { text: { ar: 'مخطط المستطيلات بيمثّل متغيرين فئويين بحجم المساحات.', en: 'A mosaic plot shows two categorical variables by area.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**دورين:** فهم المحلّل نفسه + توصيل للآخرين — واختار رسم مايضلّلش.', en: '**Two roles:** the analyst’s understanding + communicating — pick a chart that does not mislead.' },
            { ar: '**متغير/اتنين:** أعمدة · خطوط · مبعثر · **التراكب الزائد** = نقط كتير تخفي الكثافة.', en: '**One/two variables:** bar · line · scatter · **overplotting** = many points hide density.' },
            { ar: '**خريطة حرارية** = قيمة تالتة باللون عبر محورين · **مستطيلات** = فئتين بالمساحة.', en: '**Heatmap** = a third value by colour on two axes · **mosaic** = two categories by area.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · data storytelling ───────────── */
    {
      id: 'story', kind: 'learn',
      title: { ar: 'سرد قصص البيانات', en: 'Data storytelling' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: رسالة واحدة… وعرض صادق', en: '🎞️ Animation: one message… shown honestly' },
          enTitle: 'Data storytelling',
          terms: ['data storytelling', 'message', 'supporting information'],
          visual: { anim: 'vizMovie', props: { scenes: [5, 9] } },
          beats: [
            { ar: '📝 **سرد قصص البيانات:** نستخدم البيانات وتصور البيانات عشان __ننقل الرسالة المطلوبة__، مبنية __كقصة__. وعناصره الأساسية تلاتة. ① **وضّح الرسالة:** اللي عايز الرسم يقوله __يتقال في جملة واحدة__ — خلّي __عنوان__ الرسم يحمل الادعاء: «__الفصل حقّق درجات عالية في الرياضيات__».', en: '📝 **Data storytelling:** using data and visualization to __convey the intended message__, structured __like a story__. It has three basic elements. ① **Clarify the message:** what you want the graph to say __fits in one sentence__ — let the graph’s __title__ carry the claim: "__The class scored highly in mathematics__".' },
            { ar: '② **اختار العناصر:** __شيل اللي مالوش علاقة بالرسالة__، و__أبرز الأجزاء اللي عايز تلفت النظر ليها__ — __لوّن العنصر المهم بس__ وخلّي الباقي بألوان باهتة. ⚠️ إضافة عناصر أكتر __مابتوضّحش__ الرسالة… __بتدفنها__.', en: '② **Select the elements:** __remove what does not serve the message__ and __emphasize the parts you want noticed__ — __colour only the important element__ and keep the rest faded. ⚠️ Adding more elements does __not__ clarify the message… it __buries__ it.' },
            { ar: '③ **وفّر معلومات داعمة:** رتّب __العنوان وتسميات المحاور والوحدات والملاحظات__ صح — زي عنوان «متوسط درجات الرياضيات حسب الفصل»، ووحدة «درجة» على المحور الرأسي و«الفصل» على الأفقي. ❌ «العناوين والتسميات بتبوّظ شكل الرسم ويفضّل نشيلها» ← __غلط__.', en: '③ **Provide supporting information:** arrange __the title, axis labels, units and notes__ properly — e.g. the title "Average mathematics scores by class", with "points" on the vertical axis and "class" on the horizontal. ❌ "Titles and axis labels spoil a graph and are better removed" → __false__.' },
            { ar: '⚠️ **إزاي رسم بياناته صح يضلّل؟** ① __محور رأسي مش بادئ من صفر__ ← فرق صغير (98 قصاد 100) يبان ضخم — الإصلاح: __ابدأ المحور من صفر__ (أو وضّح الكسر) من غير ما تغيّر ولا رقم · ② __مقياس ألوان من غير مفتاح__ ← الألوان مالهاش معنى · ③ __حذف فئات__ ← صورة ناقصة. 👥 وفي الآخر: نفس النتيجة __بتوصل مختلفة حسب طريقة عرضها__ — اقعد __مكان الجمهور__ واتأكّد إن الرسالة وصلت.', en: '⚠️ **How can a chart with correct data mislead?** ① __a vertical axis not starting at zero__ → a small difference (98 vs 100) looks huge — the fix: __start the axis at zero__ (or mark the break clearly) without changing one number · ② __a colour scale with no key__ → colours mean nothing · ③ __dropped categories__ → an incomplete picture. 👥 Finally: the same result __lands differently depending on how it is shown__ — stand __in the audience’s position__ and check the message arrives.' },
            { ar: '📌 **الخلاصة:** طابق الرسم بالبيانات (حرارية لقيمة عبر محورين · مستطيلات لفئتين بالمساحة · مبعثر/أعمدة/خطوط لمتغير أو اتنين)، وبعدين احكي قصة: __رسالة واحدة__، __عناصر بتخدمها__، __تسميات صادقة__ — واتأكّد إنها وصلت.', en: '📌 **The point:** match the chart to the data (heatmap for a value on two axes · mosaic for two categories by area · scatter/bar/line for one or two variables), then tell a story: __one message__, __serving elements__, __honest labels__ — and check it lands.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«في سرد القصص ضمّن أكبر عدد من العناصر» ← __غلط__ (شيل اللي مالوش علاقة) · «العناوين وتسميات المحاور يفضّل نشيلها» ← __غلط__. يوم × ساعة ← عدد زوّار = __خريطة حرارية__ · نوع × تفضيل مادة بالنسب = __مخطط المستطيلات__ · مبعثر نقطه قليلة = __مبعثر__ كفاية. دور «التوصيل للآخرين» = ننقل النتايج __بسهولة فهم__.', en: '"Include as many elements as possible in storytelling" → __false__ (remove what does not serve) · "titles and axis labels are better removed" → __false__. Day × hour → visitor count = __heatmap__ · gender × subject preference by share = __mosaic plot__ · a scatter with few points = __scatter__ is enough. The "communicate to others" role = conveying results __understandably__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — أنهي رسم لأنهي بيانات؟', en: 'Deep dive — which chart for which data?' }, text: { ar: 'اسأل البيانات بتتكوّن من إيه: متغير واحد عبر الزمن ← __خط__. متغيرين كمّيين ← __مبعثر__ (لو النقط مش كتير). قيمة عبر محورين (يوم × ساعة) ← __خريطة حرارية__ (لون). فئتين ونسبهم ← __مخطط المستطيلات__ (مساحة). والقصة قبل الزينة: اكتب الجملة الواحدة اللي عايز القارئ يطلع بيها، وبعدين احذف كل اللي مابيخدمهاش.', en: 'Ask what the data consists of: one variable over time → __line__. Two quantities → __scatter__ (if points are not too many). A value across two axes (day × hour) → __heatmap__ (colour). Two categories and their shares → __mosaic plot__ (area). Story before decoration: write the one sentence the reader should leave with, then delete everything that does not serve it.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل خيار تصميم: بيخدم القصة ولا بيضلّل/يدفن الرسالة؟', en: 'Does each design choice serve the story, or mislead/bury the message?' },
            groups: [{ icon: 'check', label: { ar: 'بيخدم القصة', en: 'Serves the story' } }, { icon: 'alert', label: { ar: 'بيضلّل أو يدفن', en: 'Misleads or buries' } }],
            items: [
              { text: { ar: 'عنوان بيقول الادعاء في جملة', en: 'A title stating the claim in one sentence' }, group: 0 },
              { text: { ar: 'محور رأسي بادئ من 96 مش صفر', en: 'A vertical axis starting at 96, not zero' }, group: 1 },
              { text: { ar: 'تلوين العمود المهم بس', en: 'Colouring only the key bar' }, group: 0 },
              { text: { ar: 'ألوان كتير من غير مفتاح', en: 'Many colours with no key' }, group: 1 },
              { text: { ar: 'تسميات المحاور والوحدات', en: 'Axis labels and units' }, group: 0 },
              { text: { ar: 'نزوّد كل العناصر الممكنة', en: 'Adding every possible element' }, group: 1 },
            ],
            explain: { ar: 'رسالة + عناصر بتخدمها + تسميات صادقة = قصة · محور مقطوع/ألوان من غير مفتاح/زحمة = تضليل.', en: 'Message + serving elements + honest labels = a story · truncated axis/no key/clutter = misleading.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'order', prompt: { ar: 'رتّب خطوات تحويل الرسم لقصة:', en: 'Order the steps to turn a chart into a story:' },
            items: [
              { ar: 'نكتب الرسالة في جملة واحدة', en: 'Write the message in one sentence' },
              { ar: 'نشيل اللي مالوش علاقة ونبرز المهم', en: 'Remove the irrelevant and highlight the key' },
              { ar: 'نحط العنوان والتسميات والوحدات', en: 'Add the title, labels and units' },
              { ar: 'نتأكّد من مكان الجمهور إن الرسالة وصلت', en: 'Check from the audience’s seat that it lands' },
            ],
            explain: { ar: 'رسالة ← عناصر ← معلومات داعمة ← مراجعة من مكان الجمهور.', en: 'Message → elements → supporting info → check from the audience’s seat.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**① الرسالة:** جملة واحدة والعنوان يحمل الادعاء.', en: '**① Message:** one sentence; the title carries the claim.' },
            { ar: '**② العناصر:** شيل اللي مالوش علاقة ولوّن المهم بس · **③ معلومات داعمة:** عنوان، محاور، وحدات، ملاحظات.', en: '**② Elements:** remove the irrelevant, colour only the key · **③ Supporting info:** title, axes, units, notes.' },
            { ar: '**تضليل ببيانات صح:** محور مش من صفر · ألوان من غير مفتاح · حذف فئات ← وراجع من مكان الجمهور.', en: '**Misleading with correct data:** axis not from zero · no colour key · dropped categories → check from the audience’s seat.' },
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
            { text: { ar: 'A) لتمثيل البيانات دور تعميق فهم المحلّل نفسه ودور توصيل البيانات للآخرين.', en: 'A) Visualization has a role deepening the analyst’s understanding and a role communicating data to others.' }, answer: true },
            { text: { ar: 'B) الخريطة الحرارية بتمثّل حجم قيمة تالتة لتوليفات على محورين بتدرّج اللون.', en: 'B) A heatmap shows the size of a third value for combinations on two axes by colour gradient.' }, answer: true },
            { text: { ar: 'C) مخطط المستطيلات بيمثّل العلاقة بين متغيرين فئويين بحجم مساحات مستطيلة.', en: 'C) A mosaic plot shows the relationship between two categorical variables by rectangle areas.' }, answer: true },
            { text: { ar: 'D) في سرد قصص البيانات المهم نضمّن أكبر عدد ممكن من العناصر المتعلّقة بالرسم.', en: 'D) In data storytelling it is important to include as many chart-related elements as possible.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) الدورين ← **✓**.', en: 'A) The two roles → **✓**.' },
            { ar: 'B) تعريف الخريطة الحرارية ← **✓**.', en: 'B) The definition of a heatmap → **✓**.' },
            { ar: 'C) تعريف مخطط المستطيلات ← **✓**.', en: 'C) The definition of a mosaic plot → **✓**.' },
            { ar: 'D) المهم __نشيل__ اللي مالوش علاقة بالرسالة ← **✗**.', en: 'D) The point is to __remove__ what does not serve the message → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالرسم (A–C):', en: '(2) Match each description (a–c) with the chart (A–C):' },
            left: [
              { ar: 'a) حجم قيمة رقمية لتوليفات على محورين بتدرّج اللون', en: 'a) A numeric value for combinations on two axes by colour' },
              { ar: 'b) علاقة متغيرين فئويين بحجم مساحات مستطيلة', en: 'b) Two categorical variables by rectangle areas' },
              { ar: 'c) علاقة متغيرين كمّيين بموضع النقط', en: 'c) Two quantitative variables by the position of points' },
            ],
            right: [{ ar: 'A المخطط المبعثر', en: 'A Scatter plot' }, { ar: 'B الخريطة الحرارية', en: 'B Heatmap' }, { ar: 'C مخطط المستطيلات', en: 'C Mosaic plot' }],
            answer: [1, 2, 0] },
          solution: [
            { ar: 'a: لون عبر محورين = **حرارية** ← B.', en: 'a: colour on two axes = **heatmap** → B.' },
            { ar: 'b: مساحات لفئتين = **مستطيلات** ← C.', en: 'b: areas for two categories = **mosaic** → C.' },
            { ar: 'c: نقط لكمّيين = **مبعثر** ← A.', en: 'c: points for two quantities = **scatter** → A.' },
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
            { q: { ar: '1. الرسم اللي بيمثّل قيمة تالتة لتوليفات على محورين بتدرّج اللون؟', en: '1. The chart showing a third value on two axes by colour gradient?' }, a: { ar: 'الخريطة الحرارية', en: 'Heatmap' } },
            { q: { ar: '2. الرسم اللي بيمثّل علاقة متغيرين فئويين بمساحات مستطيلة؟', en: '2. The chart showing two categorical variables by rectangle areas?' }, a: { ar: 'مخطط المستطيلات', en: 'Mosaic plot' } },
            { q: { ar: '3. دور «التواصل مع الآخرين» بيتعمل لأنهي غرض؟', en: '3. What is the "communicating with others" role for?' }, a: { ar: 'ننقل النتايج أو الاستنتاجات للآخرين بسهولة فهم', en: 'To convey results or claims to others understandably' } },
            { q: { ar: '4. استخدام البيانات والتمثيل لنقل رسالة مبنية كقصة؟', en: '4. Using data and visuals to convey a message as a story?' }, a: { ar: 'سرد قصص البيانات', en: 'Data storytelling' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'classify', prompt: { ar: 'لكل موقف اختار الرسم:', en: 'Choose the chart for each situation:' },
            groups: [{ icon: 'layers', label: { ar: 'A الخريطة الحرارية', en: 'A Heatmap' } }, { icon: 'database', label: { ar: 'B مخطط المستطيلات', en: 'B Mosaic plot' } }],
            items: [
              { text: { ar: 'a) نمط زيارات العملاء حسب يوم الأسبوع × الوقت بنظرة', en: 'a) Customer visits by day of week × time at a glance' }, group: 0 },
              { text: { ar: 'b) فروق نسب النوع × تفضيل المادة بالمساحات', en: 'b) Differences in gender × subject preference by area' }, group: 1 },
            ],
            explain: { ar: 'a ← A · b ← B.', en: 'a → A · b → B.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار موقف بنستخدم فيه الخريطة الحرارية:', en: 'Choose a situation that calls for a heatmap:' },
            options: [
              { ar: 'A نقارن قيمة ممثّلة بسيطة لمتغير واحد بس', en: 'A Comparing a simple representative value of one variable' },
              { ar: 'B علاقة متغيرين كمّيين ونقط قليلة بتكفي المبعثر', en: 'B Two quantities where few points make a scatter enough' },
              { ar: 'C ندرك توزيع وأنماط بيانات رقمية عبر توليفات محورين', en: 'C Grasping patterns of numeric data across two-axis combinations' },
              { ar: 'D نبيّن نسبة تركيب واحدة لمتغير فئوي واحد', en: 'D Showing one composition share of one categorical variable' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'C = قيمة رقمية عبر محورين.', en: 'C = a numeric value across two axes.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (3)', en: 'Try 2 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار موقف بنستخدم فيه مخطط المستطيلات:', en: 'Choose a situation that calls for a mosaic plot:' },
            options: [
              { ar: 'A نتابع تغيّرات سلسلة زمنية لمتغير كمّي واحد', en: 'A Following time-series changes of one quantity' },
              { ar: 'B ندرك نسب توليفات متغيرين فئويين بالمساحات', en: 'B Grasping two categoricals’ combination shares by area' },
              { ar: 'C نمثّل الارتباط بين متغيرين كمّيين بالنقط', en: 'C Showing correlation of two quantities by points' },
              { ar: 'D نبيّن نسبة تركيب الفئات في لحظة بالقطاعات', en: 'D Showing category shares at one moment by sectors' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B = فئتين بالمساحة.', en: 'B = two categories by area.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (4)', en: 'Try 2 (4)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف سرد قصص البيانات:', en: 'Choose the best description of data storytelling:' },
            options: [
              { ar: 'A حتى لو الرسالة مش واضحة هتوصل طالما الرسم حلو', en: 'A Even an unclear message lands if the chart is pretty' },
              { ar: 'B الرسالة والعناصر والمعلومات الداعمة هي الأساس', en: 'B Message, elements and supporting info are the core' },
              { ar: 'C الأحسن نضمّن أكبر عدد من العناصر المتعلّقة', en: 'C It is better to include as many related elements' },
              { ar: 'D العناوين وتسميات المحاور بتبوّظ الشكل فنشيلها', en: 'D Titles and axis labels spoil the look; remove them' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B هي العناصر التلاتة.', en: 'B lists the three elements.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(e):', en: 'Read and fill blanks (a)–(e):' },
            text: { ar: 'لتمثيل البيانات دور تعميق فهم المحلّل ودور {0} البيانات للآخرين. الرسم اللي بيمثّل قيمة تالتة على محورين بتدرّج اللون اسمه {1}، واللي بيمثّل متغيرين فئويين بمساحات مستطيلة اسمه {2}. وفي التواصل يهمّ مفهوم {3} اللي بيبني الرسالة كقصة؛ وعناصره: توضيح الرسالة واختيار العناصر وتوفير {4}.', en: 'Visualization has a role deepening the analyst’s understanding and a role {0} data to others. The chart showing a third value on two axes by colour is a {1}; the one showing two categorical variables by rectangle areas is a {2}. In communicating, {3} structures the message as a story; its elements are clarifying the message, selecting elements and providing {4}.' },
            bank: [{ ar: 'توصيل', en: 'communicating' }, { ar: 'الخريطة الحرارية', en: 'heatmap' }, { ar: 'مخطط المستطيلات', en: 'mosaic plot' }, { ar: 'سرد قصص البيانات', en: 'data storytelling' }, { ar: 'معلومات داعمة', en: 'supporting information' }, { ar: 'المخطط المبعثر', en: 'scatter plot' }],
            answer: [0, 1, 2, 3, 4],
            explain: { ar: '(a) توصيل (b) الحرارية (c) المستطيلات (d) سرد القصص (e) معلومات داعمة.', en: '(a) communicating (b) heatmap (c) mosaic plot (d) data storytelling (e) supporting information.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف الخريطة الحرارية:', en: 'Choose the best description of a heatmap:' },
            options: [
              { ar: 'A علاقة متغيرين كمّيين بموضع النقط على الرسم', en: 'A Two quantities shown by the position of points' },
              { ar: 'B قيمة تالتة لتوليفات على محورين بتدرّج اللون', en: 'B A third value on two axes shown by colour gradient' },
              { ar: 'C نسبة تركيب الفئات بمساحة القطاعات في الدايرة', en: 'C Category shares shown by the area of pie sectors' },
              { ar: 'D تغيّرات السلاسل الزمنية بالخطوط على الرسم', en: 'D Time-series changes shown by lines on a chart' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B تعريفها.', en: 'B is its definition.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ عنصر أساسي في سرد القصص؟', en: 'Which is __not__ a core element of storytelling?' },
            options: [
              { ar: 'A نعبّر في جملة واحدة عن اللي عايزين ننقله', en: 'A Expressing in one sentence what we want to convey' },
              { ar: 'B نشيل اللي مالوش علاقة ونبرز اللي عايزينه', en: 'B Removing the irrelevant and highlighting the key' },
              { ar: 'C نرتّب العنوان والمحاور والوحدات والملاحظات', en: 'C Arranging the title, axes, units and notes' },
              { ar: 'D نضمّن عناصر كتير مالهاش علاقة عشان المعلومات', en: 'D Adding many unrelated elements for more information' },
            ],
            fixedOrder: true, answer: 3,
            explain: { ar: 'D غلط.', en: 'D is wrong.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (3)', en: 'Exercise 3 (3)' },
          q: { widget: 'classify', prompt: { ar: 'لكل غرض اختار الرسم:', en: 'Choose the chart for each purpose:' },
            groups: [{ icon: 'target', label: { ar: 'A المبعثر', en: 'A Scatter' } }, { icon: 'layers', label: { ar: 'B الحرارية', en: 'B Heatmap' } }, { icon: 'database', label: { ar: 'C المستطيلات', en: 'C Mosaic' } }],
            items: [
              { text: { ar: 'a) متوسطات الحرارة الشهرية لكذا مدينة مع بعض بنظرة', en: 'a) Monthly mean temperatures of several cities at a glance' }, group: 1 },
              { text: { ar: 'b) فروق نسب الشراء للفئة العمرية × فئة المنتج بالمساحات', en: 'b) Purchase shares for age group × product category by area' }, group: 2 },
              { text: { ar: 'c) علاقة متغيرين كمّيين والنقط قليلة كفاية', en: 'c) Two quantities with few enough points' }, group: 0 },
            ],
            explain: { ar: 'a ← B · b ← C · c ← A.', en: 'a → B · b → C · c → A.' } },
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
          { front: { ar: 'تصور البيانات', en: 'Data visualization' }, back: { ar: 'عرض البيانات كرسوم لإدراك سماتها بالعين — للمحلّل وللتواصل.', en: 'Showing data as graphs to grasp it visually — for the analyst and for communication.' } },
          { front: { ar: 'الخريطة الحرارية', en: 'Heatmap' }, back: { ar: 'شبكة ملوّنة على محورين لقيمة تالتة.', en: 'A colour grid on two axes for a third value.' } },
          { front: { ar: 'مخطط المستطيلات', en: 'Mosaic plot' }, back: { ar: 'مساحات مستطيلة لمتغيرين فئويين.', en: 'Rectangle areas for two categorical variables.' } },
          { front: { ar: 'التراكب الزائد للنقاط', en: 'Overplotting' }, back: { ar: 'نقط كتير بتتداخل فالكثافة تختفي.', en: 'Many points overlap so density is hidden.' } },
          { front: { ar: 'سرد قصص البيانات', en: 'Data storytelling' }, back: { ar: 'رسالة واحدة · عناصر بتخدمها · معلومات داعمة صادقة.', en: 'One message · serving elements · honest supporting info.' } },
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
            prompt: { ar: 'اشرح ليه اختيار الرسم الغلط، أو إخفاء تسميات الرسم، ممكن يضلّل الجمهور حتى لو البيانات صح. (أشِر إلى: مطابقة الرسم للبيانات، والمعلومات الداعمة الصادقة)', en: 'Explain why the wrong graph, or hidden labels, can mislead an audience even when the data is correct. (Refer to: matching the graph to the data, and honest supporting information)' },
            points: [
              { ar: 'الرسم الغلط بيخفي النمط (مبعثر متكدّس، فئات…).', en: 'The wrong graph hides the pattern (crowded scatter, categories…).' },
              { ar: 'محور مش من صفر/ألوان من غير مفتاح بتضخّم أو تلخبط.', en: 'A non-zero axis/no colour key exaggerates or confuses.' },
              { ar: 'التسميات والوحدات بتخلّي القارئ يفهم صح.', en: 'Labels and units let the reader read it correctly.' },
            ],
            model: { ar: 'البيانات الصح ممكن تتعرض بشكل يضلّل. لو اخترت رسم __مش مناسب للبيانات__ — زي مبعثر لـ5000 نقطة متكدّسة — الكثافة الحقيقية بتختفي والقارئ يفهم غلط؛ الحل خريطة حرارية. ولو __أخفيت المعلومات الداعمة__ أو لعبت فيها — محور رأسي مش بادئ من صفر يخلّي فرق 98 و100 يبان ضخم، أو ألوان من غير مفتاح، أو شيلت تسميات المحاور والوحدات — القارئ مش هيعرف بيقرا إيه أو هياخد انطباع كاذب. عشان كده لازم نطابق الرسم بنوع البيانات، ونحط عنوان وتسميات ووحدات صادقة، ونبص من مكان الجمهور.', en: 'Correct data can be shown in a misleading way. If you choose a graph __unsuited to the data__ — e.g. a scatter of 5,000 crowded points — the true density disappears and the reader misreads it; a heatmap fixes that. If you __hide or distort the supporting information__ — a vertical axis not starting at zero makes 98 vs 100 look huge, colours with no key, or removed axis labels and units — the reader will not know what they are reading or will get a false impression. So match the chart to the type of data, add an honest title, labels and units, and look from the audience’s position.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — المحافظات والمطر', en: 'Think as an engineer — governorates and rainfall' },
            prompt: { ar: 'فصلك جمع بيانات عن (المحافظة × الرياضة المفضّلة) و(المدينة × الشهر — المطر). ١) اختار رسم لكل واحدة وبرّر لواحدة على الأقل. ٢) اذكر خيار تصميم ممكن يضلّل (ألوان من غير مفتاح أو فئات مقطوعة) وإزاي تمنعه. ٣) لرسم واحد اكتب جملة الرسالة والعنصر اللي هتبرزه.', en: 'Your class collected (governorate × favourite sport) and (city × month — rainfall). 1) Choose a chart for each and justify at least one. 2) Name a design choice that could mislead (no colour key, truncated categories) and how to prevent it. 3) For one chart, write the message sentence and the element you would highlight.' },
            points: [
              { ar: 'محافظة × رياضة = مستطيلات · مدينة × شهر = حرارية.', en: 'Governorate × sport = mosaic · city × month = heatmap.' },
              { ar: 'مفتاح ألوان + كل الفئات.', en: 'A colour key + all categories.' },
              { ar: 'جملة رسالة + عنصر مبرز.', en: 'A message sentence + a highlighted element.' },
            ],
            model: { ar: '١) (المحافظة × الرياضة) متغيرين فئويين ← __مخطط المستطيلات__ لأن المساحة بتبيّن نسبة كل رياضة جوّه كل محافظة؛ الخريطة الحرارية ممكن تنفع بالعدد، بس المستطيلات بتبيّن النسب أحسن. (المدينة × الشهر — المطر) قيمة رقمية عبر محورين ← __خريطة حرارية__. ٢) ألوان من غير مفتاح هتخلّي القارئ مايعرفش الغامق = مطر كتير ولا قليل ← أحط مفتاح ألوان واضح بالمللي، ومش هشيل محافظات قليلة العدد. ٣) جملة: «الإسكندرية أكتر مدينة بتمطر في الشتا» — وأبرز صف الإسكندرية وأبهّت الباقي.', en: '1) (governorate × sport) is two categorical variables → a __mosaic plot__, since area shows each sport’s share within each governorate; a heatmap of counts could work, but the mosaic shows shares better. (city × month — rainfall) is a numeric value across two axes → a __heatmap__. 2) Colours with no key leave the reader unsure whether dark means more or less rain → add a clear colour key in mm, and do not drop governorates with few students. 3) Message: "Alexandria gets the most winter rain" — highlight the Alexandria row and fade the rest.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'باحث رسم وقت المذاكرة قصاد درجة الامتحان لكل طالب في مدرسة كبيرة كمخطط مبعثر، بس النقط اتكدّست في كتلة صمّاء. سمِّ تمثيل يكشف فين معظم الطلبة فعلًا، واشرح ليه أحسن هنا.', en: 'A researcher plots study time vs exam score for every student in a big school as a scatter plot, but the points merge into a blob. Name a visualization that reveals where most students fall, and why it works better.' },
            points: [{ ar: 'خريطة حرارية لخلايا (وقت × درجة).', en: 'A heatmap of cells (time × score).' }, { ar: 'اللون بيبيّن الكثافة بدل النقط المتداخلة.', en: 'Colour shows density instead of overlapping points.' }],
            model: { ar: 'ده __تراكب زائد للنقاط__. الأحسن __خريطة حرارية__: نقسّم وقت المذاكرة والدرجة لخلايا (مثلًا كل ساعة × كل 10 درجات) ونلوّن كل خلية حسب عدد الطلبة فيها. اللون الغامق هيبيّن فين معظم الطلبة فعلًا، بدل ما النقط تغطّي بعضها.', en: 'This is __overplotting__. A __heatmap__ works better: split study time and score into cells (e.g. each hour × each 10 marks) and colour each cell by how many students fall in it. The dark cells show where most students really are, instead of points covering each other.' } },
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
            prompt: { ar: 'افتكر رسم لخبطك. كان الرسم الغلط، ولا عناصر كتير، ولا تسميات ناقصة؟', en: 'Recall a chart that confused you. Was it the wrong graph, too many elements, or missing labels?' },
            points: [{ ar: 'تحديد السبب.', en: 'Identify the cause.' }, { ar: 'إصلاح مناسب.', en: 'A suitable fix.' }],
            model: { ar: '(مثال) رسم لنتايج انتخابات فصل كان دايرة فيها 12 قطاع بألوان متشابهة ومن غير نسب — ده عناصر كتير وتسميات ناقصة. الإصلاح: أعمدة مترتّبة من الأكبر للأصغر، والفائز بس ملوّن، والنسبة مكتوبة على كل عمود.', en: '(Example) a class-election chart was a pie with 12 similar-coloured sectors and no percentages — too many elements and missing labels. The fix: bars sorted largest to smallest, only the winner coloured, and the percentage written on each bar.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تحدّى', en: 'Challenge' },
            prompt: { ar: 'اتدّتلك خريطة حرارية مقياس ألوانها مش بادئ من صفر، فالفروق الصغيرة بتبان درامية. اوصف الانطباع الكاذب، والتغيير الوحيد اللي يخلّيها صادقة من غير ما تغيّر البيانات.', en: 'You are given a heatmap whose colour scale does not start at zero, so small differences look dramatic. Describe the false impression, and the one change that makes it honest without changing the data.' },
            points: [{ ar: 'الانطباع: فروق ضخمة وهي صغيرة.', en: 'Impression: huge differences that are small.' }, { ar: 'التغيير: المقياس من صفر + مفتاح واضح.', en: 'Change: scale from zero + a clear key.' }],
            model: { ar: 'الانطباع الكاذب: خلايا قيمتها 48 و55 هتبان واحدة فاتحة جدًا والتانية غامقة جدًا، كأن الفرق ضخم، وهو في الحقيقة صغير. التغيير: أخلّي مقياس الألوان __يبدأ من صفر__ (وأحط مفتاح بيوضّح القيم)، فدرجات اللون تبقى متناسبة مع القيم الحقيقية من غير ما أغيّر ولا رقم.', en: 'The false impression: cells of 48 and 55 look very light and very dark, as if the gap were huge, when it is small. The change: make the colour scale __start at zero__ (with a key showing the values), so shades are proportional to the real values without changing a single number.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '6-3', seconds: 60, items: [
          { text: { ar: 'للتمثيل المرئي دورين', en: 'Visualization has two roles' }, answer: true },
          { text: { ar: 'التمثيل للتواصل بس', en: 'Visualization is only for communication' }, answer: false },
          { text: { ar: 'الخطوط = تغيّر مع الزمن', en: 'Line = change over time' }, answer: true },
          { text: { ar: 'المبعثر = متغيرين كمّيين', en: 'Scatter = two quantities' }, answer: true },
          { text: { ar: 'النقط الكتير بتوضّح الكثافة دايمًا', en: 'Many points always show density' }, answer: false },
          { text: { ar: 'الحرارية = لون عبر محورين', en: 'Heatmap = colour across two axes' }, answer: true },
          { text: { ar: 'الحرارية = مساحات لفئتين', en: 'Heatmap = areas for two categories' }, answer: false },
          { text: { ar: 'المستطيلات = متغيرين فئويين', en: 'Mosaic = two categorical variables' }, answer: true },
          { text: { ar: 'يوم × ساعة ← خريطة حرارية', en: 'Day × hour → heatmap' }, answer: true },
          { text: { ar: 'الرسالة في جملة واحدة', en: 'The message fits one sentence' }, answer: true },
          { text: { ar: 'نضمّن كل العناصر الممكنة', en: 'Include every possible element' }, answer: false },
          { text: { ar: 'نلوّن المهم بس', en: 'Colour only the key part' }, answer: true },
          { text: { ar: 'نشيل تسميات المحاور', en: 'Remove the axis labels' }, answer: false },
          { text: { ar: 'محور مش من صفر ممكن يضلّل', en: 'A non-zero axis can mislead' }, answer: true },
          { text: { ar: 'ألوان من غير مفتاح عادي', en: 'Colours with no key are fine' }, answer: false },
          { text: { ar: 'نراجع من مكان الجمهور', en: 'Check from the audience’s seat' }, answer: true },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 6-3', en: 'Lesson 6-3 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. شبكة ملوّنة على محورين بتمثّل قيمة تالتة — أنهي رسم؟', en: '1. A colour grid on two axes for a third value — which graph?' }, options: [{ ar: 'المخطط المبعثر', en: 'Scatter plot' }, { ar: 'الخريطة الحرارية', en: 'Heatmap' }, { ar: 'مخطط المستطيلات', en: 'Mosaic plot' }, { ar: 'الخط البياني', en: 'Line graph' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. تداخل نقط المبعثر لدرجة إن الكثافة تختفي — اسمه إيه؟', en: '2. Scatter points overlapping so density is hidden — what is it?' }, options: [{ ar: 'التراكب الزائد للنقاط', en: 'Overplotting' }, { ar: 'سرد قصص البيانات', en: 'Storytelling' }, { ar: 'الجدولة التقاطعية للبيانات', en: 'Cross-tabulation' }, { ar: 'التوحيد القياسي', en: 'Standardization' }], answer: 0 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. أنهي واحدة __مش__ عنصر أساسي في سرد قصص البيانات؟', en: '3. Which is NOT a basic element of data storytelling?' }, options: [{ ar: 'توضيح الرسالة', en: 'Clarifying the message' }, { ar: 'اختيار العناصر', en: 'Selecting the elements' }, { ar: 'توفير معلومات داعمة صادقة', en: 'Providing supporting information' }, { ar: 'عناصر كتير مالهاش علاقة', en: 'Many unrelated elements' }], answer: 3 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. مخطط المستطيلات بيمثّل العلاقة بين متغيرين فئويين بحجم المساحات.', en: '4. A mosaic plot shows two categorical variables by area.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. لتمثيل البيانات دور واحد بس هو التواصل مع الآخرين.', en: '5. Visualization has only one role: communicating to others.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. لما النقط تكتر في المبعثر ممكن تخفي الكثافة الحقيقية.', en: '6. Many scatter points can hide the true density.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. إيه دورين تمثيل البيانات؟ اضرب مثال لكل واحد.', en: '7. What are the two roles of visualization? Give an example of each.' },
          points: [{ ar: 'فهم المحلّل نفسه (خط وقت المذاكرة).', en: 'The analyst’s understanding (study-time line).' }, { ar: 'التوصيل للآخرين (أعمدة متوسط كل فصل).', en: 'Communicating (bars of each class’s average).' }],
          model: { ar: 'الدور الأول: تعميق فهم المحلّل نفسه — يشوف التوزيع والاتجاهات والقيم الشاذة، زي عرض وقت المذاكرة كخط بيبيّن تغيّرات مش باينة في الجدول. الدور التاني: توصيل البيانات للآخرين بسهولة فهم — زي عرض متوسط درجة كل فصل كأعمدة فأي حد يقارن بنظرة.', en: 'Role one: deepening the analyst’s own understanding — seeing distribution, trends and outliers, e.g. study time as a line showing changes a table hides. Role two: communicating data to others understandably — e.g. each class’s average as bars so anyone compares at a glance.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. إمتى تختار خريطة حرارية وإمتى مخطط المستطيلات؟', en: '8. When would you choose a heatmap, and when a mosaic plot?' },
          points: [{ ar: 'حرارية: قيمة رقمية تالتة عبر محورين (لون).', en: 'Heatmap: a third numeric value across two axes (colour).' }, { ar: 'مستطيلات: متغيرين فئويين ونسبهم (مساحة).', en: 'Mosaic: two categorical variables and their shares (area).' }],
          model: { ar: 'أختار الخريطة الحرارية لما يكون عندي قيمة رقمية لكل توليفة على محورين وعايز أبيّنها بتدرّج اللون، زي عدد العملاء حسب اليوم × الوقت، أو لما المبعثر يتكدّس. وأختار مخطط المستطيلات لما يكون عندي متغيرين فئويين وعايز أبيّن نسب توليفاتهم بالمساحات، زي الصف × المادة المفضّلة.', en: 'I choose a heatmap when I have a numeric value for each combination on two axes and want to show it by colour, e.g. customers by day × time, or when a scatter is overplotted. I choose a mosaic plot when I have two categorical variables and want to show their combination shares by area, e.g. year group × favourite subject.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اذكر عناصر سرد القصص التلاتة واشرح كل واحد بجملة.', en: '9. Name the three elements of storytelling and explain each in a sentence.' },
          points: [{ ar: 'توضيح الرسالة · اختيار العناصر · معلومات داعمة.', en: 'Clarify the message · select elements · supporting information.' }],
          model: { ar: 'توضيح الرسالة: اللي عايز الرسم يقوله يتقال في جملة واحدة ويبقى في العنوان. اختيار العناصر: نشيل اللي مالوش علاقة بالرسالة ونبرز المهم (نلوّنه والباقي باهت). توفير معلومات داعمة: عنوان وتسميات محاور ووحدات وملاحظات صادقة ومترتّبة.', en: 'Clarify the message: what the chart should say fits one sentence and goes in the title. Select the elements: remove what does not serve the message and emphasize the key part (colour it, fade the rest). Provide supporting information: an honest, well-arranged title, axis labels, units and notes.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. اذكر خيارين تصميم بيخلّوا رسم يضلّل رغم إن البيانات صح، وإزاي تصلّح كل واحد.', en: '10. Name two design choices that make a chart mislead despite correct data, and how to fix each.' },
          points: [{ ar: 'محور مش من صفر ← ابدأ من صفر.', en: 'Axis not from zero → start at zero.' }, { ar: 'ألوان من غير مفتاح ← حط مفتاح (أو حذف فئات ← اعرض الكل).', en: 'No colour key → add a key (or dropped categories → show all).' }],
          model: { ar: '(1) محور رأسي مش بادئ من صفر بيخلّي فرق صغير (98 و100) يبان ضخم — الإصلاح: أبدأ المحور من صفر أو أوضّح الكسر. (2) مقياس ألوان من غير مفتاح بيخلّي الألوان مالهاش معنى — الإصلاح: أحط مفتاح ألوان واضح بالقيم والوحدة. (ومن الأمثلة كمان حذف فئات، والإصلاح عرض كل الفئات.)', en: '(1) A vertical axis not starting at zero makes a small difference (98 vs 100) look huge — fix: start the axis at zero or mark the break. (2) A colour scale with no key makes colours meaningless — fix: add a clear key with values and units. (Another is dropping categories — fix: show all categories.)' } } },
      ],
    },
  ],
});
