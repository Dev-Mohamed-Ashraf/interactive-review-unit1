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
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف يُبنى تطبيق الويب، وكيف تعمل طبقاته الثلاث معًا للاستجابة لما يفعله المستخدم؟', 'How is a web application structured, and how do its three tiers work together to respond to what a user does?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تميّز بين أدوار الواجهة الأمامية والخلفية وطبقة البيانات', 'Describe the roles of frontend, backend, and database'),
          T('تتتبع طلب المستخدم عبر الطبقات حتى ظهور النتيجة', 'Trace how the tiers turn an action into a result'),
          T('تصمم توزيعًا مناسبًا للمسؤوليات وتبرّر قراراتك', 'Use familiar services as examples'),
        ] }],
      [{ t: 'sec', n: '1', label: T('ماهية تطبيق الويب', 'What is a Web Application?') }],
      [{ t: 'note', ic: '🌐', c: 'blue', p: T('**تطبيق الويب:** بيتستخدم عادةً عن طريق المتصفح، وبعضه ممكن يتثبّت على الجهاز — خدمات الفيديو والتسوق والبريد والخرائط.', 'A **web application** runs in a browser with no dedicated install — YouTube · Amazon · Gmail · Google Maps.') }],
      [{ t: 'sec', n: '2', label: T('الطبقات الثلاث لتطبيق الويب', 'The Three Tiers of a Web Application') }],
      [{ t: 'link', ic: '🏗️', title: T('بنية الطبقات التلاتة (نموذج تعليمي مبسط، والبنية الفعلية ممكن تختلف)', 'Three-tier architecture'), nodes: [
        { ic: '🖥️', h: T('الواجهة الأمامية', 'Frontend'), p: T('تعرض وتجمع: الشاشة · على المتصفح · بتستقبل الإدخال', 'shows, collects: the screen · in the browser · takes input'), list: [T('شاشة البحث · صفحات المنتجات · النماذج', 'search screen · product pages · forms')], c: 'blue' },
        { ic: '⚙️', h: T('الواجهة الخلفية', 'Backend'), p: T('على الخادم · تعالج الطلبات وتطبّق قواعد التطبيق', 'on the server · hidden · processes, decides'), list: [T('البحث عن المنتجات · مصادقة الدخول', 'product search · login authentication')], c: 'violet' },
        { ic: '🗄️', h: T('قاعدة البيانات (طبقة البيانات)', 'Database'), p: T('تحفظ البيانات وتوفرها: قواعد بيانات · ملفات وكائنات · ذاكرة مخبأة · خدمات خارجية', 'organizes, stores, manages · retrieves, records'), list: [T('المنتجات · المستخدمين · سجل الطلبات', 'products · users · order history')], c: 'green' },
      ], edges: [{ to: T('طلب', 'request'), back: T('رد', 'reply') }, { to: T('بحث', 'query'), back: T('نتيجة', 'result') }] }],
      [{ t: 'sec', n: '3', label: T('كيف تتعاون الطبقات الثلاث', 'How the Three Tiers Cooperate') }],
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
      [{ t: 'sec', n: '4', label: T('تطبيقات الويب المألوفة', 'Familiar Web Application Configurations') }],
      [{ t: 'compare', ic: '🌍', title: T('كل الخدمات نفس البنية', 'Every service, same structure'),
        cols: [{ h: T('الأمامية (العرض والتفاعل)', 'Frontend (display, interaction)'), c: 'blue' }, { h: T('الخلفية (المعالجة والتحكم)', 'Backend (processing, control)'), c: 'violet' }, { h: T('قاعدة البيانات (التخزين)', 'Database (storage)'), c: 'green' }],
        rows: [
          { k: T('موقع فيديو', 'Video site'), v: [T('شاشات التشغيل والبحث · استقبال إجراءات المستخدم', 'playback and search screens · takes user actions'), T('اختيار الفيديوهات الموصى بها · تجميع المشاهدات', 'picks recommended videos · totals view counts'), T('الفيديو · المستخدمين · سجل المشاهدة', 'videos · user information · viewing history')] },
          { k: T('تواصل اجتماعي', 'SNS'), v: [T('الخط الزمني وشاشات النشر · إرسال المحتوى', 'timeline and post screens · sends the input'), T('تحديد جمهور المنشور · الإشعارات الفورية', 'audience of a post · push notifications'), T('المنشورات · المتابعات · الرسائل', 'posts · follow relationships · messages')] },
          { k: T('تجارة إلكترونية', 'E-commerce'), v: [T('قوائم المنتجات وسلة التسوق · استقبال الطلب', 'product lists and cart · takes orders'), T('التحقق من المخزون · إرسال طلبات الدفع والتعامل مع نتائجها', 'stock checking · runs the payment system'), T('المنتجات · سجل الطلبات · العملاء', 'products · order history · customers')] },
        ] }],
      [{ t: 'note', ic: '🔧', c: 'amber', p: T('**شخّص العطل:** صفحة الحجز فتحت بس مفيش مواعيد ظهرت ← الأمامية شغّالة، والمشكلة غالبًا في الخلفية أو قاعدة البيانات.', '**Diagnose:** the booking page opens but no times appear → the frontend works; the problem is likely in the backend or database.') }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('الواجهة الخلفية بتشتغل على المتصفح؟', 'The backend runs on the browser?'), a: T('غلط: على الخادم', 'False: on the server') },
        { q: T('تطبيق الويب بيشتغل بالواجهة الأمامية وحدها؟', 'A web app works with the frontend alone?'), a: T('غلط: ثلاث طبقات تتعاون', 'False: three tiers cooperate') },
        { q: T('الجزء اللي يراه المستخدم ويتعامل معه في المتصفح', 'The screen users interact with directly'), a: T('الواجهة الأمامية', 'Frontend') },
        { q: T('المعالجة على الخادم وتطبيق قواعد التطبيق', 'Server-side processing users do not see'), a: T('الواجهة الخلفية', 'Backend') },
        { q: T('حفظ البيانات وتوفيرها عند الحاجة', 'Organizes, stores and manages data'), a: T('قاعدة البيانات (طبقة البيانات)', 'Database') },
        { q: T('التحقق من المخزون في موقع تجارة إلكترونية', 'Stock checking on an e-commerce site'), a: T('الواجهة الخلفية', 'Backend') },
        { q: T('سجل المشاهدة في موقع فيديو', 'Viewing history on a video site'), a: T('قاعدة البيانات', 'Database') },
        { q: T('عرض الخط الزمني في شبكة تواصل', 'Displaying the timeline on SNS'), a: T('الواجهة الأمامية', 'Frontend') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح كيف تتعاون الطبقات الثلاث عندما ينشر المستخدم صورة على تطبيق تواصل اجتماعي.', 'Explain how the three tiers cooperate when a user posts a photo on a social media app.'), items: [
        T('الأمامية بتستقبل الصورة وترسلها للخلفية', 'The frontend takes the photo and sends it to the backend'),
        T('الخلفية تعالج الطلب وتحدد الجمهور وتحفظها في طبقة البيانات', 'The backend processes it and stores it in the database'),
        T('النتيجة بترجع والأمامية تعرض المنشور', 'The result returns and the frontend displays the post'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الخلفية بتشتغل على المتصفح', 'The backend runs in the browser'), good: T('على الخادم', 'On the server') },
        { bad: T('التطبيق يشتغل بالأمامية لوحدها', 'The frontend alone runs an app'), good: T('تلات طبقات', 'Three tiers') },
        { bad: T('كل تطبيق لازم فيه قاعدة بيانات تقليدية', 'A web app needs dedicated software'), good: T('ده نموذج تعليمي، والبنية بتختلف', 'A browser is enough') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('الواجهة الأمامية تعرض وتجمع، والواجهة الخلفية تقرر وتعالج، وقاعدة البيانات تخزن وتسترجع: ثلاث طبقات متعاونة تجعل تطبيق الويب يعمل، وهو نموذج للتعلم قد تختلف بنيته فعليًا.', 'Frontend shows and collects, backend decides and processes, database stores and retrieves — three tiers cooperating make a web application work.') }],
    ],
  });

  RV.addSheet('3-2', {
    lead: T('في كتير من تطبيقات الويب العميل يبعت طلب والخادم يرجّع استجابة، بقواعد اسمها بروتوكولات.', 'The client sends a request and the server responds, by shared rules called protocols.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف يتواصل العميل والخادم لتشغيل تطبيق الويب، وما القواعد والرسائل التي يستخدمانها؟', 'How do the client and server communicate, and what rules and messages do they use?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح نموذج العميل والخادم ودورة الطلب والاستجابة', 'Explain the client and server model'),
          T('تميّز بين HTTP وHTTPS وتستخدم GET وPOST', 'Tell HTTP from HTTPS; use GET and POST'),
          T('تفسّر رموز الحالة ودور API وJSON', 'Explain status codes, API and JSON'),
        ] }],
      [{ t: 'sec', n: '1', label: T('العميل والخادم', 'Client and Server') }],
      [{ t: 'link', ic: '📡', title: T('طلب واحد ← استجابة واحدة مطابقة', 'One request → one matching response'), nodes: [
        { ic: '💻', h: T('العميل', 'Client'), p: T('برنامج أو جهاز بيبعت طلب لخدمة: متصفح · تطبيق هاتف', 'asks for data or processing: browser · mobile app'), c: 'blue' },
        { ic: '🗄️', h: T('الخادم', 'Server'), p: T('بيستقبل ويعالج ويرجّع · عملاء كتير وخادم واحد', 'receives, processes, replies · many clients, one server'), c: 'violet' },
      ], edges: [{ to: T('طلب HTTP', 'HTTP request'), back: T('استجابة + رمز حالة', 'response + status code') }] }],
      [{ t: 'sec', n: '2', label: T('HTTP و HTTPS', 'HTTP and HTTPS') }],
      [{ t: 'compare', ic: '🔒', title: T('HTTP و HTTPS', 'HTTP and HTTPS'),
        cols: [{ h: 'HTTP', c: 'slate' }, { h: 'HTTPS', c: 'green' }],
        rows: [
          { k: T('الاسم', 'Full name'), v: ['HyperText Transfer Protocol', 'HTTP Secure'] },
          { k: T('التعريف', 'Definition'), v: [T('بروتوكول لتبادل الرسائل بين عميل وخادم على الويب', 'protocol exchanging data between clients and servers'), T('HTTP عبر اتصال TLS آمن', 'HTTP + SSL/TLS encryption')] },
          { k: T('المحتوى', 'Content'), v: [T('مقروء لأي حد في السكة', 'readable along the way'), T('سرية + سلامة + مصادقة الخادم', 'encrypted: less risk of reading')] },
          { k: T('العنوان', 'Address'), v: ['http://', T('https:// — لازم لصفحة الدخول', 'https:// — a must for login pages')] },
        ] }],
      [{ t: 'sec', n: '3', label: T('طلبات HTTP والاستجابات', 'HTTP Requests and Responses') }],
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
        { h: T('② يسافر', '② Travels'), p: T('عبر الإنترنت', 'over the Internet'), c: 'slate' },
        { h: T('③ يعالج', '③ Processes'), p: T('وممكن يسأل القاعدة', 'may query the database'), c: 'violet' },
        { h: T('④ يرد', '④ Responds'), p: T('رمز حالة + محتوى', 'status code + content'), c: 'green' },
        { h: T('⑤ يعرض', '⑤ Displays'), p: T('المتصفح', 'the browser'), c: 'blue' },
      ] }],
      [{ t: 'sec', n: '4', label: T('واجهة برمجة التطبيقات (API)', 'API (Application Programming Interface)') }],
      [
        { t: 'link', ic: '🔌', title: T('API: قواعد تسمح لبرنامج يطلب بيانات أو وظائف من برنامج تاني', 'API (Application Programming Interface): exchanging data between programs'), w: 1.4, nodes: [
          { ic: '🖥️', h: T('الأمامية', 'Frontend'), c: 'blue' },
          { ic: '⚙️', h: T('الخلفية', 'Backend'), c: 'violet' },
        ], edges: [{ to: T('طلب عبر API', 'request via API'), back: 'JSON' }] },
        { t: 'draw', art: 'json', ic: '🧾', title: T('JSON: صيغة نصية شائعة: كائنات ومصفوفات وقيم', 'JSON (JavaScript Object Notation): easy for people and computers') },
      ],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('GET مخصص لإرسال البيانات؟', 'GET is for sending data?'), a: T('غلط: لطلب مورد أو بيانات', 'False: it retrieves data') },
        { q: T('رمز الحالة 404 معناه؟', 'Status code 404 means?'), a: T('المورد غير موجود بهذا العنوان', 'Page not found') },
        { q: T('رمز الحالة 200 معناه؟', 'Status code 200 means?'), a: T('تمت معالجة الطلب بنجاح', 'Success') },
        { q: T('رمز الحالة 500 معناه؟', 'Status code 500 means?'), a: T('خطأ داخلي في الخادم', 'A server-side problem') },
        { q: T('إرسال معلومات تسجيل الدخول: أنهي طريقة؟', 'Sending login information: which method?'), a: T('POST', 'POST') },
        { q: T('بروتوكول يتبادل الرسائل بين العميل والخادم', 'Protocol exchanging data between clients and servers'), a: T('HTTP', 'HTTP') },
        { q: T('قواعد تسمح لبرنامج يطلب بيانات من برنامج آخر', 'A system for exchanging data between software'), a: T('API', 'API') },
        { q: T('صيغة نصية لتمثيل البيانات المهيكلة', 'Format easy for humans and computers'), a: T('JSON', 'JSON') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح خطوة بخطوة ما يحدث عندما يطلب المتصفح صفحة ويب ويستجيب الخادم.', 'Explain what happens, step by step, when a browser requests a web page and the server responds.'), items: [
        T('العميل (المتصفح) يرسل طلبًا بطريقة GET', 'The client (browser) sends a GET request'),
        T('الخادم يعالج الطلب، وقد يسأل قاعدة البيانات', 'The server processes it and may query the database'),
        T('الخادم يعيد استجابة فيها رمز حالة مثل 200 والمحتوى', 'The server returns a response with a status code such as 200'),
        T('المتصفح يعرض الصفحة', 'The browser displays the page'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('500 = نجاح', '500 = success'), good: T('النجاح 200؛ 500 خطأ خادم', 'Success is 200; 500 is a server error') },
        { bad: T('404 خطأ من الخادم', '404 is a server error'), good: T('خطأ العميل: عنوان مش موجود', 'Client error: no such address') },
        { bad: T('GET لإرسال البيانات', 'GET sends data'), good: T('GET استرجاع · POST إرسال', 'GET retrieves · POST sends') },
        { bad: T('الـAPI بروتوكول أو تشفير', 'An API is a protocol or encryption'), good: T('قواعد لتبادل البيانات والوظائف', 'A data exchange between programs') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('يتواصل تطبيق الويب كتبادل منظم: يطلب العميل ويستجيب الخادم باستخدام HTTP أو HTTPS، وطريقة طلب (GET/POST)، ورمز حالة، وغالبًا واجهة برمجة تطبيقات تعيد JSON.', 'Client requests, server responds — over HTTP/HTTPS, with a method (GET/POST), a status code, and often an API returning JSON.') }],
    ],
  });

  RV.addSheet('3-3', {
    lead: T('HTML البنية وCSS المظهر وJavaScript السلوك — والحديث بيضيف الدلالية والتجاوب والأطر.', 'HTML structure, CSS appearance, JavaScript behavior — modern work adds semantics, responsiveness, frameworks.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف تعمل HTML وCSS وJavaScript معًا لبناء صفحة ويب، وما الذي يجعل الواجهة الحديثة ذات معنى وقابلة للتكيف وفعالة؟', 'How do HTML, CSS, and JavaScript work together, and what makes a modern frontend meaningful, adaptable, and efficient?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح أدوار HTML وCSS وJavaScript', 'Explain the roles of HTML, CSS, and JavaScript'),
          T('تشرح إسهام HTML الدلالية والتصميم المتجاوب وأطر العمل', 'Describe semantic HTML, responsive design, and frameworks'),
        ] }],
      [{ t: 'sec', n: '1', label: T('أدوار HTML و CSS و JavaScript', 'The Roles of HTML, CSS, and JavaScript') }],
      [{ t: 'cards', ic: '🏠', title: T('تلات أدوار مختلفة زي المبنى (ومش لازم الصفحة تستخدمهم كلهم)', 'Three separate roles, like a building'), cols: 3, items: [
        { ic: '🏗️', h: 'HTML', p: T('البنية: عناوين · فقرات · صور · لينكات — هيكل المبنى', 'structure: headings, text, images, links — the frame'), c: 'amber' },
        { ic: '🎨', h: 'CSS', p: T('المظهر: ألوان · تخطيط · حجم · خطوط — الديكور الداخلي والخارجي', 'appearance: colors, layout, size, fonts — interior and exterior'), c: 'blue' },
        { ic: '⚡', h: 'JavaScript', p: T('السلوك: يرد على الضغط ويحدّث جزء من الشاشة — الكهربا والسباكة', 'behavior: reacts, updates part of the screen — wiring, plumbing'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '✂️', c: 'blue', p: T('**ليه الفصل بينهم؟** تعدّل المظهر (CSS) من غير ما تلمس المحتوى (HTML)، وتضيف سلوك (JS) من غير ما تعيد كتابة الصفحة.', '**Why separate them?** Change appearance (CSS) without touching content (HTML), add behavior (JS) without rewriting the page.') }],
      [{ t: 'sec', n: '2', label: T('HTML الدلالية', 'Semantic HTML') }],
      [
        { t: 'draw', art: 'semantic', ic: '🏷️', title: T('HTML الدلالية', 'Semantic HTML'), cap: T('عناصر توضّح وظيفة أجزاء الصفحة بدل صناديق div', 'Element names (tags) that show meaning instead of div boxes') },
        { t: 'tree', ic: '➡️', title: T('فوايدها', 'Its benefits'), w: 1.3, root: { h: T('الوسوم الدلالية', 'Semantic tags'), c: 'violet' }, kids: [
          { ic: '♿', h: T('إمكانية الوصول', 'Accessibility'), p: T('قارئ الشاشة يفهم البنية ويتنقّل فيها، ومعاها ممارسات وصول تانية', 'screen readers follow the structure, helping visually impaired users'), c: 'blue' },
          { ic: '🔎', h: T('فهم محركات البحث (SEO)', 'SEO: Search Engine Optimization'), p: T('قد يساعدها تفهم البنية، لكن مايضمنش ترتيب أعلى', 'search engines understand and show it properly'), c: 'green' },
        ] },
      ],
      [{ t: 'sec', n: '3', label: T('التصميم المتجاوب', 'Responsive Design') }],
      [
        { t: 'draw', art: 'responsive', ic: '📱', title: T('التصميم المتجاوب', 'Responsive design'), cap: T('التخطيط بيتضبط تلقائيًا: كمبيوتر · تابلت · موبايل', 'Layout adapts by itself: desktop · tablet · phone') },
        { t: 'vflow', ic: '📲', title: T('نهج الأولوية للجوال (mobile-first)', 'Mobile-first'), items: [
          { ic: '📱', h: T('نبدأ بالشاشة الصغيرة', 'Start with the small screen'), p: T('مع كتر التصفح من الموبايل', 'as phone browsing grew'), c: 'pink' },
          { ic: '💻', h: T('وبعدين نوسّع', 'Then widen'), c: 'blue' },
        ] },
      ],
      [{ t: 'sec', n: '4', label: T('المكتبات وأطر العمل', 'Frameworks') }],
      [{ t: 'tree', ic: '🧰', title: T('المكتبات وأطر العمل', 'Frameworks'), root: { h: T('مكوّنات جاهزة قابلة لإعادة الاستخدام: تطوير أكفأ من غير كتابة كل الكود من الصفر', 'Ready functions and components: efficient work without writing everything'), c: 'violet' }, kids: [
        { ic: '⚛️', h: 'React', p: T('مكتبة JavaScript لبناء الواجهات من مكوّنات وتحديثها لما البيانات تتغيّر', 'by Meta: efficient partial updates, for big apps'), c: 'blue' },
        { ic: '🟢', h: 'Vue', p: T('بسيط، تبني تدريجيًا من ميزات صغيرة', 'simple, built up gradually'), c: 'green' },
        { ic: '▲', h: 'Next.js', p: T('إطار مبني على React: التوجيه وطرق عرض الصفحات والعمل على الخادم والعميل', 'React + faster page display'), c: 'slate' },
      ] }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('تحدد بنية (هيكل) صفحة الويب', 'Defines the structure of a web page'), a: T('HTML', 'HTML') },
        { q: T('تحدد مظهر الصفحة', 'Specifies the appearance'), a: T('CSS', 'CSS') },
        { q: T('تضيف السلوك والتفاعلية', 'Adds behavior and interactivity'), a: T('JavaScript', 'JavaScript') },
        { q: T('CSS بتضيف سلوكًا للصفحة؟', 'CSS adds behavior to a page?'), a: T('غلط: ده JavaScript', 'False: that is JavaScript') },
        { q: T('التخطيط بيتضبط تلقائيًا لأحجام الشاشات', 'Layout adjusts automatically to screen sizes'), a: T('التصميم المتجاوب', 'Responsive design') },
        { q: T('HTML الدلالية بتسرّع عرض الصفحة بالضرورة؟', 'Semantic HTML always makes pages faster?'), a: T('غلط: فايدتها الوصول وفهم محركات البحث', 'False: it helps accessibility and SEO') },
        { q: T('مراعاة الشاشات الصغيرة من بداية التصميم', 'Prioritizing small screens from the design stage'), a: T('نهج الأولوية للجوال', 'Mobile-first') },
        { q: T('إطار العمل بيلغي كتابة كل الكود من الصفر؟', 'A framework removes writing all code from scratch?'), a: T('صح', 'True') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح كيف تساهم HTML وCSS وJavaScript في صفحة مكتبة تعرض كتبًا وتصفّي النتائج أثناء الكتابة.', 'Explain how HTML, CSS, and JavaScript each contribute to a library page that lists books and filters results as the user types.'), items: [
        T('HTML: بتبني قائمة الكتب ومربع البحث', 'HTML: the structure of the list and search box'),
        T('CSS: بتنسّق الألوان والتخطيط والخطوط', 'CSS: colors, layout and fonts'),
        T('JavaScript: بتصفّي النتائج أثناء الكتابة', 'JavaScript: filters the results as the user types'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('CSS بيضيف السلوك', 'CSS adds behavior'), good: T('السلوك JavaScript', 'JavaScript does') },
        { bad: T('المتجاوب عشان السرعة أو ترتيب البحث', 'Responsive is for speed or ranking'), good: T('عشان الأجهزة المختلفة', 'For different devices') },
        { bad: T('الإطار لغة بنية أو تشفير', 'A framework is a language or encryption'), good: T('بنية لتطوير أكفأ', 'A base for efficient development') },
        { bad: T('الدلالية بتسرّع الصفحة أو تضمن أعلى ترتيب', 'Semantic tags speed the page'), good: T('وصول + فهم محركات البحث', 'Accessibility + SEO') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('HTML يبني البنية، وCSS ينسّق المظهر، وJavaScript يضيف السلوك، وHTML الدلالية والتصميم المتجاوب وأطر العمل تجعل الواجهة الحديثة ذات معنى وقابلة للتكيف وفعالة.', 'HTML structures, CSS styles, JavaScript behaves — and semantic HTML, responsive design, and frameworks make a modern frontend meaningful, adaptable, and efficient.') }],
    ],
  });
})();
