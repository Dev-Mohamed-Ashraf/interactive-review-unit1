/* =========================================================
 * content/sheets-3.js — printable summaries of chapter 3.
 * Only data: js/screens/sheet.js draws it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('3-1', {
    lead: T('أي تطبيق ويب تلات طبقات بتتعاون: واحدة بتعرض، وواحدة بتقرّر، وواحدة بتخزّن.', 'Every web app is three tiers: one shows, one decides, one stores.'),
    rows: [
      [{ t: 'link', ic: '🏗️', title: T('بنية الطبقات التلاتة', 'Three-tier architecture'), nodes: [
        { ic: '🖥️', h: T('الواجهة الأمامية', 'Frontend'), p: T('الشاشة · على المتصفح · بتستقبل الإدخال', 'the screen · in the browser · takes input'), c: 'blue' },
        { ic: '⚙️', h: T('الواجهة الخلفية', 'Backend'), p: T('على الخادم · مش ظاهرة · بتعالج وتقرّر', 'on the server · hidden · processes and decides'), c: 'violet' },
        { ic: '🗄️', h: T('قاعدة البيانات', 'Database'), p: T('بتنظّم وتخزّن وتدير البيانات', 'organizes, stores, manages data'), c: 'green' },
      ], edges: [{ to: T('طلب', 'request'), back: T('رد', 'reply') }, { to: T('بحث', 'query'), back: T('نتيجة', 'result') }] }],
      [{ t: 'flow', ic: '🔢', title: T('الست خطوات بالترتيب', 'The six steps in order'), items: [
        { h: T('① تستقبل', '① Receive'), p: T('الأمامية', 'frontend'), c: 'blue' },
        { h: T('② ترسل', '② Send'), p: T('للخلفية', 'to backend'), c: 'blue' },
        { h: T('③ تبحث', '③ Search'), p: T('في القاعدة', 'the database'), c: 'violet' },
        { h: T('④ ترجّع', '④ Return'), p: T('القاعدة', 'database'), c: 'green' },
        { h: T('⑤ ترتّب', '⑤ Arrange'), p: T('الخلفية', 'backend'), c: 'violet' },
        { h: T('⑥ تعرض', '⑥ Display'), p: T('الأمامية', 'frontend'), c: 'blue' },
      ], back: T('الطلب بينزل… والاستجابة بترجع', 'The request goes down… the response comes back') }],
      [{ t: 'compare', ic: '🧭', title: T('مثال: البحث عن ساعة في متجر', 'Example: searching a shop for a watch'),
        cols: [{ h: T('الأمامية', 'Frontend'), c: 'blue' }, { h: T('الخلفية', 'Backend'), c: 'violet' }, { h: T('قاعدة البيانات', 'Database'), c: 'green' }],
        rows: [
          { k: T('الدور', 'Role'), v: [T('تعرض وتجمع', 'shows and collects'), T('تقرّر وتعالج', 'decides and processes'), T('تخزّن وتسترجع', 'stores and retrieves')] },
          { k: T('المثال', 'Example'), v: [T('كلمة «ساعة» وعرض النتايج', 'the word “watch”, showing results'), T('بتدوّر وترتّب النتايج', 'searches and sorts'), T('بيانات المنتجات', 'product data')] },
        ] }],
      [{ t: 'cards', ic: '🌍', title: T('نفس البنية في كل الخدمات', 'The same structure everywhere'), cols: 4, items: [
        { ic: '▶️', h: 'YouTube', p: T('فيديو', 'video'), c: 'red' },
        { ic: '🛒', h: 'Amazon', p: T('تسوّق', 'shopping'), c: 'amber' },
        { ic: '✉️', h: 'Gmail', p: T('بريد', 'mail'), c: 'blue' },
        { ic: '🗺️', h: T('خرائط جوجل', 'Google Maps'), p: T('خرائط', 'maps'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '💡', p: T('**تطبيق الويب** بيتستخدم من المتصفح من غير تسطيب برنامج مخصّص — والمحتوى بس اللي بيتغيّر بين خدمة وخدمة.', 'A **web app** runs in the browser with no installation — only the content changes between services.') }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الخلفية بتشتغل على المتصفح', 'The backend runs in the browser'), good: T('على الخادم', 'On the server') },
        { bad: T('الأمامية لوحدها كفاية', 'The frontend alone is enough'), good: T('تلات طبقات بتتعاون', 'Three tiers cooperate') },
      ] }],
    ],
  });

  RV.addSheet('3-2', {
    lead: T('العميل بيطلب والخادم بيرد — وكل طلب ليه طريقة وكل رد ليه رمز.', 'The client asks, the server answers — each request has a method, each reply a code.'),
    rows: [
      [{ t: 'link', ic: '📡', title: T('طلب واحد ← استجابة واحدة', 'One request → one response'), nodes: [
        { ic: '💻', h: T('العميل', 'Client'), p: T('بيطلب: متصفح أو تطبيق موبايل', 'asks: browser or mobile app'), c: 'blue' },
        { ic: '🗄️', h: T('الخادم', 'Server'), p: T('بيستقبل ويعالج ويرجّع', 'receives, processes, replies'), c: 'violet' },
      ], edges: [{ to: T('طلب HTTP', 'HTTP request'), back: T('استجابة + رمز حالة', 'response + status code') }] }],
      [
        { t: 'compare', ic: '📮', title: T('طرق HTTP', 'HTTP methods'),
          cols: [{ h: 'GET', c: 'blue' }, { h: 'POST', c: 'amber' }],
          rows: [
            { k: T('المعنى', 'Meaning'), v: [T('استرجاع', 'retrieve'), T('إرسال', 'send')] },
            { k: T('أمثلة', 'Examples'), v: [T('عرض صفحة · نتايج بحث', 'view a page · search results'), T('تسجيل دخول · نموذج', 'login · a form')] },
          ] },
        { t: 'cards', ic: '🚦', title: T('رموز الحالة', 'Status codes'), cols: 3, items: [
          { h: '200', p: T('نجاح', 'success'), c: 'green' },
          { h: '404', p: T('مش موجودة (العميل)', 'not found (client)'), c: 'amber' },
          { h: '500', p: T('خطأ الخادم', 'server error'), c: 'red' },
        ] },
      ],
      [{ t: 'flow', ic: '🔒', title: T('من HTTP لـ HTTPS', 'From HTTP to HTTPS'), items: [
        { ic: '📨', h: 'HTTP', p: T('بروتوكول تبادل البيانات', 'the data-exchange protocol'), c: 'slate' },
        { ic: '🔐', h: T('تشفير SSL/TLS', 'SSL/TLS encryption'), c: 'amber' },
        { ic: '✅', h: 'HTTPS', p: T('خطر القراءة من طرف تالت بيقلّ', 'less risk of third-party reading'), c: 'green' },
      ] }],
      [
        { t: 'link', ic: '🔌', title: T('الـ API: برامج بتكلّم بعض', 'APIs: programs talking'), w: 1.4, nodes: [
          { ic: '📱', h: T('تطبيق الطقس', 'Weather app'), c: 'blue' },
          { ic: '🌦️', h: T('خدمة بيانات', 'Data service'), c: 'violet' },
        ], edges: [{ to: 'API', back: 'JSON' }] },
        { t: 'draw', art: 'json', ic: '🧾', title: 'JSON' },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('500 = نجاح', '500 = success'), good: T('النجاح 200؛ 500 خطأ خادم', 'Success is 200; 500 is a server error') },
        { bad: T('404 خطأ من الخادم', '404 is a server error'), good: T('خطأ العميل: عنوان مش موجود', 'Client error: no such address') },
        { bad: T('GET لإرسال كلمة السر', 'GET to send a password'), good: T('POST للإرسال', 'POST sends') },
      ] }],
    ],
  });

  RV.addSheet('3-3', {
    lead: T('صفحة الويب زي البيت: هيكل، وديكور، وكهربا — تلات أدوار بتتجمع.', 'A web page is like a house: structure, decor, wiring — three roles.'),
    rows: [
      [{ t: 'cards', ic: '🏠', title: T('التلاتة زي البيت', 'The trio as a house'), cols: 3, items: [
        { ic: '🏗️', h: 'HTML', p: T('البنية: عناوين، فقرات، صور، لينكات — هيكل المبنى', 'structure: headings, text, images, links — the frame'), c: 'amber' },
        { ic: '🎨', h: 'CSS', p: T('المظهر: ألوان، تخطيط، حجم، خطوط — الديكور', 'appearance: colours, layout, sizes, fonts — the decor'), c: 'blue' },
        { ic: '⚡', h: 'JavaScript', p: T('السلوك: رد على الضغط، تحديث جزء من الشاشة — الكهربا والسباكة', 'behaviour: reacts, updates the screen — wiring and plumbing'), c: 'green' },
      ] }],
      [
        { t: 'draw', art: 'semantic', ic: '🏷️', title: T('HTML الدلالية', 'Semantic HTML') },
        { t: 'flow', ic: '➡️', title: T('ليه الوسوم الدلالية؟', 'Why semantic tags?'), w: 1.4, items: [
          { ic: '🏷️', h: T('وسوم بمعنى', 'Meaningful tags'), c: 'violet' },
          { ic: '♿', h: T('إمكانية الوصول', 'Accessibility'), p: T('برامج قراءة الشاشة', 'screen readers'), c: 'blue' },
          { ic: '🔎', h: 'SEO', p: T('يتلاقى في البحث', 'found in search'), c: 'green' },
        ] },
      ],
      [
        { t: 'draw', art: 'responsive', ic: '📱', title: T('التصميم المتجاوب', 'Responsive design') },
        { t: 'vflow', ic: '📲', title: T('الأولوية للموبايل', 'Mobile-first'), items: [
          { ic: '📱', h: T('نبدأ بالشاشة الصغيرة', 'Start with the small screen'), c: 'pink' },
          { ic: '💻', h: T('وبعدين نوسّع', 'Then widen'), c: 'blue' },
        ] },
      ],
      [{ t: 'tree', ic: '🧰', title: T('أطر العمل', 'Frameworks'), root: { h: T('وظائف ومكوّنات جاهزة لتطوير أكفأ', 'Ready functions and components'), c: 'violet' }, kids: [
        { ic: '⚛️', h: 'React', p: T('من Meta', 'by Meta'), c: 'blue' },
        { ic: '🟢', h: 'Vue', p: T('بسيط وتدريجي', 'simple and gradual'), c: 'green' },
        { ic: '▲', h: 'Next.js', p: T('React + عرض أسرع', 'React + faster display'), c: 'slate' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('المتجاوب عشان السرعة أو ترتيب البحث', 'Responsive is for speed or ranking'), good: T('عشان الأجهزة المختلفة', 'For different devices') },
        { bad: T('الإطار لغة بنية', 'A framework is a structure language'), good: T('بنية لتطوير أكفأ', 'A base for efficient development') },
        { bad: T('الدلالية بتسرّع الصفحة', 'Semantic tags speed the page'), good: T('وصول + SEO', 'Accessibility + SEO') },
      ] }],
    ],
  });
})();
