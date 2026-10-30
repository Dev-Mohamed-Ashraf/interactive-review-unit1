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
      [{ t: 'note', ic: '🌐', c: 'blue', p: T('**تطبيق الويب:** بيتستخدم عن طريق متصفح الويب من غير تسطيب برنامج مخصّص — YouTube · Amazon · Gmail · خرائط جوجل.', 'A **web application** runs in a browser with no dedicated install — YouTube · Amazon · Gmail · Google Maps.') }],
      [{ t: 'link', ic: '🏗️', title: T('بنية الطبقات التلاتة', 'Three-tier architecture'), nodes: [
        { ic: '🖥️', h: T('الواجهة الأمامية', 'Frontend'), p: T('تعرض وتجمع: الشاشة · على المتصفح · بتستقبل الإدخال', 'shows, collects: the screen · in the browser · takes input'), list: [T('شاشة البحث · صفحات المنتجات · النماذج', 'search screen · product pages · forms')], c: 'blue' },
        { ic: '⚙️', h: T('الواجهة الخلفية', 'Backend'), p: T('على الخادم · مش ظاهرة · تعالج وتقرّر', 'on the server · hidden · processes, decides'), list: [T('البحث عن المنتجات · مصادقة الدخول', 'product search · login authentication')], c: 'violet' },
        { ic: '🗄️', h: T('قاعدة البيانات', 'Database'), p: T('تنظّم وتخزّن وتدير · تسترجع وتسجّل', 'organizes, stores, manages · retrieves, records'), list: [T('المنتجات · المستخدمين · سجل الطلبات', 'products · users · order history')], c: 'green' },
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
        { t: 'cards', ic: '💡', title: T('ليه تلات طبقات؟', 'Why three tiers?'), cols: 2, w: 1.3, items: [
          { ic: '🎯', h: T('التخصّص', 'Specialization'), p: T('كل طبقة مركّزة في شغلها', 'each tier does its job'), c: 'blue' },
          { ic: '♻️', h: T('إعادة الاستخدام', 'Reuse'), p: T('نفس الخلفية لموقع وتطبيق', 'one backend for site and app'), c: 'green' },
          { ic: '🔒', h: T('الأمان', 'Security'), p: T('القاعدة مش مكشوفة للمتصفح', 'the database is not exposed'), c: 'amber' },
          { ic: '🔧', h: T('تشخيص الأعطال', 'Fault finding'), p: T('الصفحة ظهرت والنتايج لأ؟ المشكلة ورا', 'page shows, results do not? it is behind'), c: 'red' },
        ] },
        { t: 'cards', ic: '🌍', title: T('كل الخدمات نفس البنية', 'Every service, same structure'), cols: 1, items: [
          { ic: '🎬', h: T('فيديو', 'Video'), c: 'red' },
          { ic: '💬', h: T('تواصل اجتماعي', 'Social media'), c: 'blue' },
          { ic: '🛒', h: T('متجر إلكتروني', 'Online shop'), p: T('المحتوى بيتغيّر، مش وجود الطبقات', 'content changes, not the tiers'), c: 'amber' },
        ] },
      ],
      [{ t: 'note', ic: '🔧', c: 'amber', p: T('**شخّص العطل:** صفحة الحجز فتحت بس مفيش مواعيد ظهرت ← الأمامية شغّالة، والمشكلة غالبًا في الخلفية أو قاعدة البيانات.', '**Diagnose:** the booking page opens but no times appear → the frontend works; the problem is likely in the backend or database.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الخلفية بتشتغل على المتصفح', 'The backend runs in the browser'), good: T('على الخادم', 'On the server') },
        { bad: T('التطبيق يشتغل بالأمامية لوحدها', 'The frontend alone runs an app'), good: T('تلات طبقات', 'Three tiers') },
      ] }],
    ],
  });

  RV.addSheet('3-2', {
    lead: T('العميل يبعت طلب والخادم يرجّع استجابة، بقواعد مشتركة اسمها بروتوكولات.', 'The client sends a request and the server responds, by shared rules called protocols.'),
    rows: [
      [{ t: 'link', ic: '📡', title: T('طلب واحد ← استجابة واحدة مطابقة', 'One request → one matching response'), nodes: [
        { ic: '💻', h: T('العميل', 'Client'), p: T('بيطلب بيانات أو معالجة: متصفح · تطبيق موبايل', 'asks for data or processing: browser · mobile app'), c: 'blue' },
        { ic: '🗄️', h: T('الخادم', 'Server'), p: T('بيستقبل ويعالج ويرجّع · عملاء كتير وخادم واحد', 'receives, processes, replies · many clients, one server'), c: 'violet' },
      ], edges: [{ to: T('طلب HTTP', 'HTTP request'), back: T('استجابة + رمز حالة', 'response + status code') }] }],
      [{ t: 'compare', ic: '🔒', title: T('HTTP و HTTPS', 'HTTP and HTTPS'),
        cols: [{ h: 'HTTP', c: 'slate' }, { h: 'HTTPS', c: 'green' }],
        rows: [
          { k: T('التعريف', 'Definition'), v: [T('بروتوكول تبادل البيانات بين العملاء والخوادم', 'protocol exchanging data between clients and servers'), T('HTTP + تشفير SSL/TLS', 'HTTP + SSL/TLS encryption')] },
          { k: T('المحتوى', 'Content'), v: [T('مقروء لأي حد في السكة', 'readable along the way'), T('مشفّر: خطر القراءة بيقلّ', 'encrypted: less risk of reading')] },
          { k: T('العنوان', 'Address'), v: ['http://', T('https:// — لازم لصفحة الدخول', 'https:// — a must for login pages')] },
        ] }],
      [
        { t: 'compare', ic: '📮', title: T('طرق HTTP: الطلب عايز إيه؟', 'HTTP methods: what the request wants'), w: 1.3,
          cols: [{ h: 'GET', c: 'blue' }, { h: 'POST', c: 'amber' }],
          rows: [
            { k: T('المعنى', 'Meaning'), v: [T('استرجاع من الخادم', 'retrieve from the server'), T('إرسال للخادم يعالجه', 'send for processing')] },
            { k: T('أمثلة', 'Examples'), v: [T('عرض صفحة · نتايج بحث', 'view a page · search results'), T('تسجيل دخول · نموذج', 'login · a form')] },
          ] },
        { t: 'cards', ic: '🚦', title: T('رموز الحالة', 'Status codes'), cols: 3, items: [
          { h: '200', p: T('نجاح', 'success'), c: 'green' },
          { h: '404', p: T('مش موجودة: من جهة العميل', 'not found: client side'), c: 'amber' },
          { h: '500', p: T('خطأ عند الخادم', 'server error'), c: 'red' },
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
        { t: 'link', ic: '🔌', title: T('الـ API: تبادل بيانات بين برامج مختلفة', 'API: exchanging data between programs'), w: 1.4, nodes: [
          { ic: '🖥️', h: T('الأمامية', 'Frontend'), c: 'blue' },
          { ic: '⚙️', h: T('الخلفية', 'Backend'), c: 'violet' },
        ], edges: [{ to: T('طلب عبر API', 'request via API'), back: 'JSON' }] },
        { t: 'draw', art: 'json', ic: '🧾', title: T('JSON: سهل للبشر والحاسب', 'JSON: easy for people and computers') },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('500 = نجاح', '500 = success'), good: T('النجاح 200؛ 500 خطأ خادم', 'Success is 200; 500 is a server error') },
        { bad: T('404 خطأ من الخادم', '404 is a server error'), good: T('خطأ العميل: عنوان مش موجود', 'Client error: no such address') },
        { bad: T('GET لإرسال البيانات', 'GET sends data'), good: T('GET استرجاع · POST إرسال', 'GET retrieves · POST sends') },
        { bad: T('الـAPI بروتوكول أو تشفير', 'An API is a protocol or encryption'), good: T('نظام تبادل بيانات بين البرامج', 'A data exchange between programs') },
      ] }],
    ],
  });

  RV.addSheet('3-3', {
    lead: T('HTML البنية وCSS المظهر وJavaScript السلوك — والحديث بيضيف الدلالية والتجاوب والأطر.', 'HTML structure, CSS appearance, JavaScript behaviour — modern work adds semantics, responsiveness, frameworks.'),
    rows: [
      [{ t: 'cards', ic: '🏠', title: T('تلات أدوار مستقلة زي البيت', 'Three separate roles, like a house'), cols: 3, items: [
        { ic: '🏗️', h: 'HTML', p: T('البنية: عناوين · فقرات · صور · لينكات — هيكل المبنى', 'structure: headings, text, images, links — the frame'), c: 'amber' },
        { ic: '🎨', h: 'CSS', p: T('المظهر: ألوان · تخطيط · حجم · خطوط — الديكور', 'appearance: colours, layout, size, fonts — the decor'), c: 'blue' },
        { ic: '⚡', h: 'JavaScript', p: T('السلوك: يرد على الضغط ويحدّث جزء من الشاشة — الكهربا والسباكة', 'behaviour: reacts, updates part of the screen — wiring, plumbing'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '✂️', c: 'blue', p: T('**ليه الفصل بينهم؟** تعدّل المظهر (CSS) من غير ما تلمس المحتوى (HTML)، وتضيف سلوك (JS) من غير ما تعيد كتابة الصفحة.', '**Why separate them?** Change appearance (CSS) without touching content (HTML), add behaviour (JS) without rewriting the page.') }],
      [
        { t: 'draw', art: 'semantic', ic: '🏷️', title: T('HTML الدلالية', 'Semantic HTML'), cap: T('وسوم بتدل على المعنى بدل صناديق div', 'Tags that carry meaning instead of div boxes') },
        { t: 'tree', ic: '➡️', title: T('فوايدها', 'Its benefits'), w: 1.3, root: { h: T('الوسوم الدلالية', 'Semantic tags'), c: 'violet' }, kids: [
          { ic: '♿', h: T('إمكانية الوصول', 'Accessibility'), p: T('قارئ الشاشة يفهم البنية، فتوصل لذوي الإعاقة البصرية', 'screen readers follow the structure, helping visually impaired users'), c: 'blue' },
          { ic: '🔎', h: 'SEO', p: T('محركات البحث تفهم المحتوى فتظهر الصفحة صح', 'search engines understand and show it properly'), c: 'green' },
        ] },
      ],
      [
        { t: 'draw', art: 'responsive', ic: '📱', title: T('التصميم المتجاوب', 'Responsive design'), cap: T('التخطيط بيتظبط تلقائيًا: كمبيوتر · تابلت · موبايل', 'Layout adapts by itself: desktop · tablet · phone') },
        { t: 'vflow', ic: '📲', title: T('الأولوية للموبايل (mobile-first)', 'Mobile-first'), items: [
          { ic: '📱', h: T('نبدأ بالشاشة الصغيرة', 'Start with the small screen'), p: T('مع كتر التصفح من الموبايل', 'as phone browsing grew'), c: 'pink' },
          { ic: '💻', h: T('وبعدين نوسّع', 'Then widen'), c: 'blue' },
        ] },
      ],
      [{ t: 'tree', ic: '🧰', title: T('أطر العمل (Framework)', 'Frameworks'), root: { h: T('وظائف ومكوّنات جاهزة: تطوير أكفأ من غير كتابة كل الكود', 'Ready functions and components: efficient work without writing everything'), c: 'violet' }, kids: [
        { ic: '⚛️', h: 'React', p: T('من Meta: يحدّث جزء من الشاشة بكفاءة، للتطبيقات الكبيرة', 'by Meta: efficient partial updates, for big apps'), c: 'blue' },
        { ic: '🟢', h: 'Vue', p: T('بسيط، تبني تدريجيًا من ميزات صغيرة', 'simple, built up gradually'), c: 'green' },
        { ic: '▲', h: 'Next.js', p: T('مزايا React + تسريع عرض الصفحة', 'React + faster page display'), c: 'slate' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('CSS بيضيف السلوك', 'CSS adds behaviour'), good: T('السلوك JavaScript', 'JavaScript does') },
        { bad: T('المتجاوب عشان السرعة أو ترتيب البحث', 'Responsive is for speed or ranking'), good: T('عشان الأجهزة المختلفة', 'For different devices') },
        { bad: T('الإطار لغة بنية أو تشفير', 'A framework is a language or encryption'), good: T('بنية لتطوير أكفأ', 'A base for efficient development') },
        { bad: T('الدلالية بتسرّع الصفحة', 'Semantic tags speed the page'), good: T('وصول + SEO', 'Accessibility + SEO') },
      ] }],
    ],
  });
})();
