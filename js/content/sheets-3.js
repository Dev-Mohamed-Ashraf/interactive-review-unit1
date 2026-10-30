/* =========================================================
 * content/sheets-3.js — printable summaries of chapter 3.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('3-1', {
    lead: T('تطبيق الويب تلات طبقات بتتعاون عشان تحوّل فعل المستخدم لنتيجة.', 'A web app is three cooperating tiers that turn a user’s action into a result.'),
    rows: [
      [{ t: 'note', ic: '🌐', c: 'blue', p: T('**تطبيق الويب:** بيتستخدم عادةً عن طريق المتصفح، وبعضه ممكن يتثبّت على الجهاز — خدمات الفيديو والتسوق والبريد والخرائط.', 'A **web application** runs in a browser with no dedicated install — YouTube · Amazon · Gmail · Google Maps.') }],
      [{ t: 'link', ic: '🏗️', title: T('بنية الطبقات التلاتة (نموذج تعليمي مبسط، والبنية الفعلية ممكن تختلف)', 'Three-tier architecture'), nodes: [
        { ic: '🖥️', h: T('الواجهة الأمامية', 'Frontend'), p: T('تعرض وتجمع: الشاشة · على المتصفح · بتستقبل الإدخال', 'shows, collects: the screen · in the browser · takes input'), list: [T('شاشة البحث · صفحات المنتجات · النماذج', 'search screen · product pages · forms')], c: 'blue' },
        { ic: '⚙️', h: T('الواجهة الخلفية', 'Backend'), p: T('على الخادم · تعالج الطلبات وتطبّق قواعد التطبيق', 'on the server · hidden · processes, decides'), list: [T('البحث عن المنتجات · مصادقة الدخول', 'product search · login authentication')], c: 'violet' },
        { ic: '🗄️', h: T('قاعدة البيانات (طبقة البيانات)', 'Database'), p: T('تحفظ البيانات وتوفرها: قواعد بيانات · ملفات وكائنات · ذاكرة مخبأة · خدمات خارجية', 'organizes, stores, manages · retrieves, records'), list: [T('المنتجات · المستخدمين · سجل الطلبات', 'products · users · order history')], c: 'green' },
      ], edges: [{ to: T('طلب', 'request'), back: T('رد', 'reply') }, { to: T('بحث', 'query'), back: T('نتيجة', 'result') }] }],
      [{ t: 'flow', ic: '🔢', title: T('الست خطوات: بتدوّر على منتج', 'The six steps: searching for a product'), items: [
        { h: T('① تستقبل', '① Receive'), p: T('الأمامية: كلمات البحث', 'frontend: the words'), c: 'blue' },
        { h: T('② ترسل', '② Send'), p: T('الأمامية ← الخلفية', 'frontend → backend'), c: 'blue' },
        { h: T('③ تبحث', '③ Search'), p: T('الخلفية في القاعدة', 'backend in the database'), c: 'violet' },
        { h: T('④ ترجّع', '④ Return'), p: T('القاعدة ← الخلفية', 'database → backend'), c: 'green' },
        { h: T('⑤ ترتّب', '⑤ Arrange'), p: T('الخلفية ← الأمامية', 'backend → frontend'), c: 'violet' },
        { h: T('⑥ تعرض', '⑥ Display'), p: T('الأمامية على الشاشة', 'frontend on screen'), c: 'blue' },
      ], back: T('الطلب بينزل في الطبقات… والاستجابة بترجع في الاتجاه العكسي', 'The request goes down… the response comes back') }],
      [
        { t: 'cards', ic: '💡', title: T('ليه تلات طبقات؟', 'Why three tiers?'), cols: 4, items: [
          { ic: '🎯', h: T('التخصّص', 'Specialization'), p: T('كل طبقة مركّزة في شغلها', 'each tier does its job'), c: 'blue' },
          { ic: '♻️', h: T('إعادة الاستخدام', 'Reuse'), p: T('نفس الخلفية لموقع وتطبيق', 'one backend for site and app'), c: 'green' },
          { ic: '🔒', h: T('الأمان', 'Security'), p: T('القاعدة مش مكشوفة للمتصفح', 'the database is not exposed'), c: 'amber' },
          { ic: '🔧', h: T('تشخيص الأعطال', 'Fault finding'), p: T('الصفحة ظهرت والنتايج لأ؟ المشكلة ورا', 'page shows, results do not? it is behind'), c: 'red' },
        ] },
      ],
      [{ t: 'compare', ic: '🌍', title: T('كل الخدمات نفس البنية', 'Every service, same structure'),
        cols: [{ h: T('الأمامية (العرض والتفاعل)', 'Frontend (display, interaction)'), c: 'blue' }, { h: T('الخلفية (المعالجة والتحكم)', 'Backend (processing, control)'), c: 'violet' }, { h: T('قاعدة البيانات (التخزين)', 'Database (storage)'), c: 'green' }],
        rows: [
          { k: T('موقع فيديو', 'Video site'), v: [T('شاشات التشغيل والبحث · استقبال إجراءات المستخدم', 'playback and search screens · takes user actions'), T('اختيار الفيديوهات الموصى بها · تجميع المشاهدات', 'picks recommended videos · totals view counts'), T('الفيديو · المستخدمين · سجل المشاهدة', 'videos · user information · viewing history')] },
          { k: T('تواصل اجتماعي', 'SNS'), v: [T('الخط الزمني وشاشات النشر · إرسال المحتوى', 'timeline and post screens · sends the input'), T('تحديد جمهور المنشور · الإشعارات الفورية', 'audience of a post · push notifications'), T('المنشورات · المتابعات · الرسائل', 'posts · follow relationships · messages')] },
          { k: T('تجارة إلكترونية', 'E-commerce'), v: [T('قوائم المنتجات وسلة التسوق · استقبال الطلب', 'product lists and cart · takes orders'), T('التحقق من المخزون · إرسال طلبات الدفع والتعامل مع نتائجها', 'stock checking · runs the payment system'), T('المنتجات · سجل الطلبات · العملاء', 'products · order history · customers')] },
        ] }],
      [{ t: 'note', ic: '🔧', c: 'amber', p: T('**شخّص العطل:** صفحة الحجز فتحت بس مفيش مواعيد ظهرت ← الأمامية شغّالة، والمشكلة غالبًا في الخلفية أو قاعدة البيانات.', '**Diagnose:** the booking page opens but no times appear → the frontend works; the problem is likely in the backend or database.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الخلفية بتشتغل على المتصفح', 'The backend runs in the browser'), good: T('على الخادم', 'On the server') },
        { bad: T('التطبيق يشتغل بالأمامية لوحدها', 'The frontend alone runs an app'), good: T('تلات طبقات', 'Three tiers') },
        { bad: T('كل تطبيق لازم فيه قاعدة بيانات تقليدية', 'A web app needs dedicated software'), good: T('ده نموذج تعليمي، والبنية بتختلف', 'A browser is enough') },
      ] }],
    ],
  });

  RV.addSheet('3-2', {
    lead: T('في كتير من تطبيقات الويب العميل يبعت طلب والخادم يرجّع استجابة، بقواعد اسمها بروتوكولات.', 'The client sends a request and the server responds, by shared rules called protocols.'),
    rows: [
      [{ t: 'link', ic: '📡', title: T('طلب واحد ← استجابة واحدة مطابقة', 'One request → one matching response'), nodes: [
        { ic: '💻', h: T('العميل', 'Client'), p: T('برنامج أو جهاز بيبعت طلب لخدمة: متصفح · تطبيق هاتف', 'asks for data or processing: browser · mobile app'), c: 'blue' },
        { ic: '🗄️', h: T('الخادم', 'Server'), p: T('بيستقبل ويعالج ويرجّع · عملاء كتير وخادم واحد', 'receives, processes, replies · many clients, one server'), c: 'violet' },
      ], edges: [{ to: T('طلب HTTP', 'HTTP request'), back: T('استجابة + رمز حالة', 'response + status code') }] }],
      [{ t: 'compare', ic: '🔒', title: T('HTTP و HTTPS', 'HTTP and HTTPS'),
        cols: [{ h: 'HTTP', c: 'slate' }, { h: 'HTTPS', c: 'green' }],
        rows: [
          { k: T('الاسم', 'Full name'), v: ['HyperText Transfer Protocol', 'HTTP Secure'] },
          { k: T('التعريف', 'Definition'), v: [T('بروتوكول لتبادل الرسائل بين عميل وخادم على الويب', 'protocol exchanging data between clients and servers'), T('HTTP عبر اتصال TLS آمن', 'HTTP + SSL/TLS encryption')] },
          { k: T('المحتوى', 'Content'), v: [T('مقروء لأي حد في السكة', 'readable along the way'), T('سرية + سلامة + مصادقة الخادم', 'encrypted: less risk of reading')] },
          { k: T('العنوان', 'Address'), v: ['http://', T('https:// — لازم لصفحة الدخول', 'https:// — a must for login pages')] },
        ] }],
      [
        { t: 'compare', ic: '📮', title: T('طريقة طلب HTTP: الطلب عايز إيه؟', 'HTTP methods: what the request wants'), w: 1.3,
          cols: [{ h: 'GET', c: 'blue' }, { h: 'POST', c: 'amber' }],
          rows: [
            { k: T('المعنى', 'Meaning'), v: [T('عادةً لطلب مورد أو بيانات', 'retrieve from the server'), T('عادةً لإرسال بيانات يعالجها الخادم', 'send data to the server')] },
            { k: T('أمثلة', 'Examples'), v: [T('عرض صفحة · نتايج بحث', 'view a page · search results'), T('تسجيل دخول · نموذج', 'login · a form')] },
          ] },
        { t: 'cards', ic: '🚦', title: T('رمز حالة HTTP', 'Status codes'), cols: 3, items: [
          { h: '200', p: T('نجاح', 'success'), c: 'green' },
          { h: '404', p: T('المورد مش موجود بهذا العنوان', 'page not found: the URL does not exist'), c: 'amber' },
          { h: '500', p: T('خطأ داخلي منع إكمال الطلب، والرمز وحده مايحددش السبب', 'server error: a problem on the server side'), c: 'red' },
        ] },
      ],
      [{ t: 'flow', ic: '🚀', title: T('رحلة فتح صفحة', 'The journey of opening a page'), items: [
        { h: T('① طلب', '① Request'), p: T('المتصفح: طريقة + عنوان', 'browser: method + URL'), c: 'blue' },
        { h: T('② يسافر', '② Travels'), p: T('عبر الإنترنت', 'over the internet'), c: 'slate' },
        { h: T('③ يعالج', '③ Processes'), p: T('وممكن يسأل القاعدة', 'may query the database'), c: 'violet' },
        { h: T('④ يرد', '④ Responds'), p: T('رمز حالة + محتوى', 'status code + content'), c: 'green' },
        { h: T('⑤ يعرض', '⑤ Displays'), p: T('المتصفح', 'the browser'), c: 'blue' },
      ] }],
      [
        { t: 'link', ic: '🔌', title: T('API: قواعد تسمح لبرنامج يطلب بيانات أو وظائف من برنامج تاني', 'API (Application Programming Interface): exchanging data between programs'), w: 1.4, nodes: [
          { ic: '🖥️', h: T('الأمامية', 'Frontend'), c: 'blue' },
          { ic: '⚙️', h: T('الخلفية', 'Backend'), c: 'violet' },
        ], edges: [{ to: T('طلب عبر API', 'request via API'), back: 'JSON' }] },
        { t: 'draw', art: 'json', ic: '🧾', title: T('JSON: صيغة نصية شائعة: كائنات ومصفوفات وقيم', 'JSON (JavaScript Object Notation): easy for people and computers') },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('500 = نجاح', '500 = success'), good: T('النجاح 200؛ 500 خطأ خادم', 'Success is 200; 500 is a server error') },
        { bad: T('404 خطأ من الخادم', '404 is a server error'), good: T('خطأ العميل: عنوان مش موجود', 'Client error: no such address') },
        { bad: T('GET لإرسال البيانات', 'GET sends data'), good: T('GET استرجاع · POST إرسال', 'GET retrieves · POST sends') },
        { bad: T('الـAPI بروتوكول أو تشفير', 'An API is a protocol or encryption'), good: T('قواعد لتبادل البيانات والوظائف', 'A data exchange between programs') },
      ] }],
    ],
  });

  RV.addSheet('3-3', {
    lead: T('HTML البنية وCSS المظهر وJavaScript السلوك — والحديث بيضيف الدلالية والتجاوب والأطر.', 'HTML structure, CSS appearance, JavaScript behaviour — modern work adds semantics, responsiveness, frameworks.'),
    rows: [
      [{ t: 'cards', ic: '🏠', title: T('تلات أدوار مختلفة زي المبنى (ومش لازم الصفحة تستخدمهم كلهم)', 'Three separate roles, like a building'), cols: 3, items: [
        { ic: '🏗️', h: 'HTML', p: T('البنية: عناوين · فقرات · صور · لينكات — هيكل المبنى', 'structure: headings, text, images, links — the frame'), c: 'amber' },
        { ic: '🎨', h: 'CSS', p: T('المظهر: ألوان · تخطيط · حجم · خطوط — الديكور الداخلي والخارجي', 'appearance: colours, layout, size, fonts — interior and exterior'), c: 'blue' },
        { ic: '⚡', h: 'JavaScript', p: T('السلوك: يرد على الضغط ويحدّث جزء من الشاشة — الكهربا والسباكة', 'behaviour: reacts, updates part of the screen — wiring, plumbing'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '✂️', c: 'blue', p: T('**ليه الفصل بينهم؟** تعدّل المظهر (CSS) من غير ما تلمس المحتوى (HTML)، وتضيف سلوك (JS) من غير ما تعيد كتابة الصفحة.', '**Why separate them?** Change appearance (CSS) without touching content (HTML), add behaviour (JS) without rewriting the page.') }],
      [
        { t: 'draw', art: 'semantic', ic: '🏷️', title: T('HTML الدلالية', 'Semantic HTML'), cap: T('عناصر توضّح وظيفة أجزاء الصفحة بدل صناديق div', 'Element names (tags) that show meaning instead of div boxes') },
        { t: 'tree', ic: '➡️', title: T('فوايدها', 'Its benefits'), w: 1.3, root: { h: T('الوسوم الدلالية', 'Semantic tags'), c: 'violet' }, kids: [
          { ic: '♿', h: T('إمكانية الوصول', 'Accessibility'), p: T('قارئ الشاشة يفهم البنية ويتنقّل فيها، ومعاها ممارسات وصول تانية', 'screen readers follow the structure, helping visually impaired users'), c: 'blue' },
          { ic: '🔎', h: T('فهم محركات البحث (SEO)', 'SEO: Search Engine Optimization'), p: T('قد يساعدها تفهم البنية، لكن مايضمنش ترتيب أعلى', 'search engines understand and show it properly'), c: 'green' },
        ] },
      ],
      [
        { t: 'draw', art: 'responsive', ic: '📱', title: T('التصميم المتجاوب', 'Responsive design'), cap: T('التخطيط بيتظبط تلقائيًا: كمبيوتر · تابلت · موبايل', 'Layout adapts by itself: desktop · tablet · phone') },
        { t: 'vflow', ic: '📲', title: T('نهج الأولوية للجوال (mobile-first)', 'Mobile-first'), items: [
          { ic: '📱', h: T('نبدأ بالشاشة الصغيرة', 'Start with the small screen'), p: T('مع كتر التصفح من الموبايل', 'as phone browsing grew'), c: 'pink' },
          { ic: '💻', h: T('وبعدين نوسّع', 'Then widen'), c: 'blue' },
        ] },
      ],
      [{ t: 'tree', ic: '🧰', title: T('المكتبات وأطر العمل', 'Frameworks'), root: { h: T('مكوّنات جاهزة قابلة لإعادة الاستخدام: تطوير أكفأ من غير كتابة كل الكود من الصفر', 'Ready functions and components: efficient work without writing everything'), c: 'violet' }, kids: [
        { ic: '⚛️', h: 'React', p: T('مكتبة JavaScript لبناء الواجهات من مكوّنات وتحديثها لما البيانات تتغيّر', 'by Meta: efficient partial updates, for big apps'), c: 'blue' },
        { ic: '🟢', h: 'Vue', p: T('بسيط، تبني تدريجيًا من ميزات صغيرة', 'simple, built up gradually'), c: 'green' },
        { ic: '▲', h: 'Next.js', p: T('إطار مبني على React: التوجيه وطرق عرض الصفحات والعمل على الخادم والعميل', 'React + faster page display'), c: 'slate' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('CSS بيضيف السلوك', 'CSS adds behaviour'), good: T('السلوك JavaScript', 'JavaScript does') },
        { bad: T('المتجاوب عشان السرعة أو ترتيب البحث', 'Responsive is for speed or ranking'), good: T('عشان الأجهزة المختلفة', 'For different devices') },
        { bad: T('الإطار لغة بنية أو تشفير', 'A framework is a language or encryption'), good: T('بنية لتطوير أكفأ', 'A base for efficient development') },
        { bad: T('الدلالية بتسرّع الصفحة أو تضمن أعلى ترتيب', 'Semantic tags speed the page'), good: T('وصول + فهم محركات البحث', 'Accessibility + SEO') },
      ] }],
    ],
  });
})();
