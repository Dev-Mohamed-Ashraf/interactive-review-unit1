/* =========================================================
 * content/sheets-2.js — printable summaries of chapter 2.
 * Only data: js/screens/sheet.js draws it. A sheet covers every point of the
 * lesson; it runs to a second page when the lesson needs it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('2-1', {
    lead: T('الاتصال الآمن بيعتمد على الجمع بين التشفير والمصادقة — مش على تقنية واحدة.', 'Secure services rely on combining encryption and authentication — never one technology.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف تعمل تقنيات التشفير والمصادقة معًا للحفاظ على أمان الاتصال والخدمات عبر الإنترنت؟', 'How do cryptographic technologies and authentication work together to keep online communication and services secure?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح كيف تحمي HTTPS الاتصال بتقنيات مختلفة', 'Explain how HTTPS secures communication'),
          T('تميّز بين التشفير والشهادات والمصادقة الثنائية والتوقيعات', 'Describe how authentication is used in real services'),
          T('تقيّم طريقة مصادقة في سياق محدد', 'Explain why security technologies are combined'),
        ] }],
      [{ t: 'sec', n: '1', label: T('كيف تعمل اتصالات HTTPS', 'How HTTPS Communication Works') }],
      [
        { t: 'tree', ic: '🔐', title: T('HTTPS = HTTP + تشفير TLS', 'HTTPS = HTTP + TLS encryption'), w: 1.3, root: { h: T('TLS يحمي النقل، بس مش معناه إن محتوى الموقع موثوق', 'The padlock beside the bank’s address'), c: 'green' }, kids: [
          { ic: '🕵️', h: T('السرية', 'Encryption'), p: T('ضد التنصّت على كلمة المرور', 'stops eavesdropping'), c: 'blue' },
          { ic: '🧪', h: T('السلامة', 'Tamper detection'), p: T('100 تبقى 10,000', '100 becomes 10,000'), c: 'amber' },
          { ic: '🪪', h: T('هوية الخادم واسم النطاق', 'Identity check'), p: T('ضد موقع مزيّف', 'stops a fake site'), c: 'violet' },
        ] },
        { t: 'draw', art: 'keys', ic: '🔑', title: T('نوعين التشفير', 'Two kinds of encryption') },
      ],
      [{ t: 'compare', ic: '⚖️', title: T('المتماثل والعام', 'Common key vs public key'),
        cols: [{ h: T('التشفير المتماثل', 'Common-key (symmetric) cryptography'), c: 'amber' }, { h: T('التشفير بالمفتاح العام', 'Public-key cryptography'), c: 'blue' }],
        rows: [
          { k: T('المفاتيح', 'Keys'), v: [T('مفتاح واحد يقفل ويفتح', 'one key locks and opens'), T('عام يقفل + خاص مع صاحبه يفتح', 'public locks + private opens')] },
          { k: T('ميزته', 'Strength'), v: [T('سريع جدًا لكميات كبيرة', 'very fast for large data'), T('تبعت سر من غير اتفاق مسبق', 'send a secret with no prior agreement')] },
          { k: T('عيبه', 'Weakness'), v: [T('المفتاح نفسه بيسافر في السكة', 'the key itself travels'), T('بطيء على البيانات الكتير', 'slow on much data')] },
          { k: T('بيتستخدم في', 'Used for'), v: [T('تبادل البيانات', 'exchanging data'), T('مشاركة المفتاح بأمان', 'sharing the key safely')] },
        ] }],
      [{ t: 'flow', ic: '🤝', title: T('مصافحة TLS: المتصفح · الخادم · جهة إصدار الشهادات CA', 'TLS handshake: browser · server · CA'), items: [
        { ic: '📜', h: T('① الشهادة', '① Certificate + public key'), p: T('الخادم يبعتها · المتصفح يتحقق من صلاحيتها وسلسلة الثقة ومطابقتها لاسم الموقع', 'the server sends · the browser verifies authenticity through the CA'), c: 'violet' },
        { ic: '🔑', h: T('② مفاتيح الجلسة', '② Key exchange'), p: T('يتفاوضوا بآليات المفتاح العام، وكل طرف يشتق المفتاح لديه من غير ما يتبعت نفسه', 'a new common key, locked with the server’s public key · opened with its private key'), c: 'blue' },
        { ic: '📦', h: T('③ تبادل البيانات', '③ Data'), p: T('بالتشفير المتماثل وآليات سلامة البيانات', 'with the common key: fast, attackers see symbols'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '💡', c: 'blue', p: T('**أمان + كفاءة:** آليات المفتاح العام للمصادقة والاتفاق الآمن على مفاتيح الجلسة، والمتماثل لحماية البيانات بسرعة. المفتاح العام مش بيتحوّل لمتماثل.', '**Security + speed:** the public key delivers the key, the common key carries data. It does not turn into a common key. The exchange above is one way to share a key; current TLS uses Diffie-Hellman key agreement.') }],
      [{ t: 'sec', n: '2', label: T('استخدام المصادقة في الخدمات الفعلية', 'Use of Authentication in Real Services') }],
      [
        { t: 'tree', ic: '🛡️', title: T('المصادقة الثنائية (2FA) ومتعددة العوامل (MFA)', 'Multi-factor authentication (MFA)'), w: 1.15, root: { h: T('2FA: عاملين مستقلين من فئتين مختلفتين · MFA: عاملين أو أكتر', 'Two or more of the three factors'), c: 'teal' }, kids: [
          { ic: '🧠', h: T('معرفة', 'Knowledge'), p: T('حاجة عارفها: كلمة مرور', 'you know it: a password'), c: 'blue' },
          { ic: '📱', h: T('حيازة', 'Possession'), p: T('حاجة معاك: موبايل · كارت', 'you have it: phone · card'), c: 'amber' },
          { ic: '👆', h: T('سمات حيوية', 'Biometric'), p: T('حاجة هي إنت: بصمة · وجه', 'you are it: fingerprint · face'), c: 'pink' },
        ] },
        { t: 'compare', ic: '🏦', title: T('أمثلة حقيقية', 'Real examples'),
          cols: [{ h: T('العامل الأول', 'First factor'), c: 'blue' }, { h: T('التاني', 'Second'), c: 'amber' }],
          rows: [
            { k: T('البنك أونلاين', 'Online bank'), v: [T('كلمة مرور', 'password'), T('كلمة مرور لمرة واحدة OTP', 'one-time password')] },
            { k: T('السوشيال ميديا', 'Social media'), v: [T('كلمة مرور', 'password'), T('كود SMS', 'SMS code')] },
            { k: T('التسوّق أونلاين', 'Online shopping'), v: [T('كلمة مرور', 'password'), T('التحقق من هوية بطاقة الائتمان', '3-D Secure one-time code')] },
            { k: T('دخول مبنى مؤمَّن', 'Company laptop'), v: [T('بطاقة دخول', 'smart card'), T('بصمة إصبع', 'fingerprint')] },
          ] },
      ],
      [{ t: 'note', ic: '🔓', c: 'amber', p: T('**ليه بنجمع؟** بعامل واحد لو اتكسر المهاجم يدخل (قايمة كلمات مرور مسرّبة). بعاملين مختلفين، لو كلمة المرور اتسرّبت الكود لسه بيمنعه.', '**Why combine?** One broken factor lets an attacker in. With two different factors, a leaked password still fails without the code.') }],
      [{ t: 'sec', n: '3', label: T('تركيبات تقنيات الأمان', 'Combinations of Security Technologies') }],
      [
        { t: 'vflow', ic: '✍️', title: T('التوقيع الرقمي', 'Digital signature'), items: [
          { ic: '🔏', h: T('الخاص يوقّع (الاتجاه معكوس)', 'Private key signs (reversed)'), c: 'red' },
          { ic: '🔍', h: T('العام يتحقق', 'Public key verifies'), p: T('المهاجم غيّر 100 ← 900؟ التحقق يفشل', 'attacker changed 100 → 900? it fails'), c: 'blue' },
          { ic: '✅', h: T('كشف تلاعب وانتحال + دليل يدعم عدم التنصل', 'Tamper and spoof detection + non-repudiation'), p: T('عندما يتطلب النظام ذلك', 'cannot deny sending'), c: 'green' },
        ] },
        { t: 'cards', ic: '🧩', title: T('شراء من متجر: 4 أخطار و4 حلول', 'Shopping: 4 threats, 4 answers'), cols: 1, items: [
          { ic: '🔒', h: T('تنصّت ← التشفير', 'Eavesdropping → encryption'), p: T('يمنع القراءة', 'stops reading'), c: 'blue' },
          { ic: '📜', h: T('موقع مزيّف ← الشهادة الرقمية', 'Fake site → digital certificate'), p: T('المتصفح يتحقق من الشهادة واسم النطاق', 'a certificate authority (CA) vouches for the site'), c: 'violet' },
          { ic: '🛡️', h: T('دخول غير مصرّح ← 2FA', 'Unauthorized access → MFA'), p: T('تقلّل احتمال الدخول', 'blocks entry'), c: 'green' },
          { ic: '✍️', h: T('تلاعب ← TLS + التوقيع عند الحاجة', 'Tampering → signature'), p: T('800 ← 8 بيتكشف', '800 → 8 is caught'), c: 'amber' },
        ] },
      ],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('HTTPS بتستخدم المفتاح العام والتشفير المتماثل مع بعض؟', 'HTTPS uses both public-key and common-key cryptography?'), a: T('صح', 'True') },
        { q: T('كل بيانات HTTPS بتتبادل بالمفتاح العام؟', 'All HTTPS data uses public-key cryptography?'), a: T('غلط: بطيء؛ البيانات بالمتماثل', 'False: too slow; data uses the common key') },
        { q: T('تعيين كلمتي مرور = مصادقة ثنائية؟', 'Two passwords count as multi-factor authentication?'), a: T('غلط: نفس فئة المعرفة', 'False: both are knowledge factors') },
        { q: T('عايز تمنع أطراف ثالثة تقرأ المحتوى', 'Prevent third parties reading the content'), a: T('التشفير', 'Encryption') },
        { q: T('عايز تتأكد إن الرسالة ماتعدلتش وصدرت عن الموقّع', 'Verify data was not altered'), a: T('التوقيع الرقمي', 'Digital signature') },
        { q: T('عايز تتأكد إن الطرف المقابل حقيقي', 'Verify the partner is authentic'), a: T('الشهادة الرقمية', 'Digital certificate') },
        { q: T('كلمة مرور + رمز من تطبيق على هاتفك', 'Password + a code on your phone'), a: T('معرفة + حيازة', 'Knowledge + possession') },
        { q: T('إثبات يدعم إن المرسل مايقدرش ينكر الإرسال', 'Sender cannot deny having sent it'), a: T('عدم التنصل', 'Non-repudiation') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا يستخدم TLS آليات المفتاح العام للمصادقة والاتفاق على مفاتيح الجلسة، ثم التشفير المتماثل لحماية البيانات.', 'Explain why HTTPS uses public-key cryptography to share the key but common-key cryptography to exchange the data.'), items: [
        T('الأمان: آليات المفتاح العام بتصادق وتتفق على المفاتيح بأمان', 'Security: public-key cryptography shares a key safely'),
        T('الكفاءة: المتماثل سريع مع البيانات الكتير', 'Speed: common-key cryptography moves much data quickly'),
        T('الجمع بينهم بيحقق الأمان والسرعة مع بعض', 'Together they give both security and speed'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('كلمتين مرور = 2FA', 'Two passwords = MFA'), good: T('نفس العامل، مش 2FA', 'Two-step with the same factor, not MFA') },
        { bad: T('HTTPS = موقع موثوق وحماية مطلقة', 'HTTPS uses only one kind of key'), good: T('بيقلّل المخاطر بس', 'It combines public-key and common-key') },
        { bad: T('التوقيع يحسّن سرعة الاتصال', 'A signature speeds the connection'), good: T('يكشف التلاعب + عدم التنصل', 'Tamper detection + non-repudiation') },
        { bad: T('كل البيانات بالمفتاح العام', 'All data by public key'), good: T('بطيء؛ البيانات بالمتماثل', 'Slow; data uses the common key') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('الأمان عبر الإنترنت مش من تقنية واحدة: بنجمع التشفير والشهادات والتوقيعات والمصادقة، فنقلّل مخاطر التنصت والتلاعب وانتحال الهوية والدخول غير المصرح به.', 'HTTPS shares a key with public-key cryptography and moves data with common-key cryptography; services stay safe by layering encryption, certificates, signatures and multi-factor authentication.') }],
    ],
  });

  RV.addSheet('2-2', {
    lead: T('الأمن القوي من تكديس الإجراءات والتحقق من كل وصول — مش من حاجز واحد.', 'Strong security comes from layered measures and checking every access — not one barrier.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('كيف يمكن لمؤسسة أن تصمم شبكتها بحيث يظل النظام محميًا حتى لو تم اختراق أحد الدفاعات؟', 'How can an organization design its network so that, even if one defense is breached, the system stays protected?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح أدوار جدار الحماية وVPN وDMZ وضوابط الأجهزة الطرفية', 'Explain the roles of firewalls, VPNs, and DMZs'),
          T('تشرح ليه الدفاع في العمق أقوى من إجراء واحد', 'Describe defense in depth and zero trust'),
          T('تقيّم تصميمًا أمنيًا وتبرّر اختيار الضوابط', 'Explain why layered, verified access is stronger'),
        ] }],
      [{ t: 'sec', n: '1', label: T('جدار الحماية والشبكة الخاصة والمنطقة المعزولة', 'Firewalls, VPN and DMZ') }],
      [
        { t: 'draw', art: 'network', ic: '🏰', title: T('الشبكة زي قلعة', 'The network as a castle'), w: 1.2, cap: T('برّه = الإنترنت · الاستقبال = DMZ · جوّه = المكتب وكنز بيانات العملاء', 'Outside = Internet · reception = DMZ · inside = the office and customer data') },
        { t: 'cards', ic: '🧱', title: T('الأدوات', 'The tools'), cols: 1, items: [
          { ic: '🧱', h: T('جدار الحماية', 'Firewall'), p: T('نظام أو برنامج يراقب حركة الشبكة ويسمح أو يمنع بقواعد أمنية · عند الحدود أو بين أجزائها أو على جهاز · مثال: يسمح بخادم الويب ويمنع الوصول الخارجي المباشر لقاعدة البيانات', 'allows or denies communication at the entry/exit point by preset rules · e.g. allow the web server, deny direct external access to the database · it sees a request’s “shape”, so a hidden attack may pass'), c: 'amber' },
          { ic: '🏢', h: 'DMZ', p: T('منطقة منفصلة للخوادم المعرَّضة للخارج (ويب وبريد)، بتقلّل احتمال وصول الهجوم للشبكة الداخلية', 'a zone for public servers (web, mail), separate from the internal network, so an attack on them does not reach it'), c: 'violet' },
          { ic: '🚇', h: 'VPN', p: T('اتصال أو شبكة منطقية خاصة عبر شبكة عامة، بتستخدم عادةً التشفير والنفق · أأمن على Wi-Fi عامة · عمل عن بُعد + ربط فروع', 'an encrypted virtual private line (tunnel) over the Internet · less eavesdropping on public Wi-Fi · remote work + connecting branches'), c: 'blue' },
        ] },
      ],
      [{ t: 'sec', n: '2', label: T('الدفاع في العمق', 'Defense in Depth') }],
      [{ t: 'layers', ic: '🧅', title: T('الدفاع في العمق: طبقات تقلّل الخطر وتحدّ من أثر الاختراق لو طبقة فشلت', 'Defense in depth: if one fails, the next protects'), items: [
        { ic: '🧱', h: T('١ مدخل الشبكة', '1 Network entrance'), p: T('جدار حماية يمنع الاتصال غير المصرّح', 'a firewall blocks unauthorized traffic'), c: 'amber' },
        { ic: '🚇', h: T('٢ مسار الاتصال', '2 Communication path'), p: T('VPN يشفّر: اللي يلتقط البيانات مايفهمهاش', 'VPN encrypts: captured data is unreadable'), c: 'blue' },
        { ic: '🏢', h: T('٣ وضع الخوادم', '3 Server placement'), p: T('DMZ: فصل الخوادم العامة عن الشبكة الداخلية', 'DMZ: separates public servers from the internal network'), c: 'violet' },
        { ic: '💻', h: T('٤ الأجهزة الطرفية', '4 Endpoints'), p: T('مكافح فيروسات + تحديث نظام التشغيل', 'antivirus + OS updates'), c: 'green' },
      ] }],
      [{ t: 'sec', n: '3', label: T('مفهوم نهج انعدام الثقة', 'The Concept of Zero Trust') }],
      [{ t: 'compare', ic: '🚪', title: T('من المحيط الأمني لنهج انعدام الثقة', 'From perimeter to zero trust'),
        cols: [{ h: T('المحيط الأمني (التقليدي)', 'Perimeter (traditional)'), c: 'slate' }, { h: T('نهج انعدام الثقة', 'Zero trust'), c: 'green' }],
        rows: [
          { k: T('الفرضية', 'Assumption'), v: [T('جوّه آمن وبرّه خطر', 'inside safe, outside dangerous'), T('مفيش ثقة تلقائية لمجرد إن المستخدم جوّه الشبكة أو الجهاز ملك المؤسسة', 'trusts no communication automatically, even from inside')] },
          { k: T('التحقق', 'Checking'), v: [T('عند الحدود بس', 'at the border only'), T('الهوية والصلاحيات والسياق عند كل طلب وصول', 'identity + access rights every time')] },
          { k: T('لو مهاجم دخل', 'If breached'), v: [T('وصول واسع لكل حاجة', 'wide access to everything'), T('كل مورد محتاج تحقّق جديد', 'each resource needs a new check')] },
        ] }],
      [{ t: 'note', ic: '☁️', c: 'amber', p: T('**ليه اتغيّر؟** الخدمات السحابية والعمل عن بُعد خلّوا الحد بين جوّه وبرّه مش واضح، فحماية المحيط بس مابقتش كفاية.', '**Why it changed:** cloud services and remote work blurred inside and outside, so guarding the perimeter alone is not enough.') }],
      [{ t: 'flow', ic: '🎯', title: T('مهاجم عايز قاعدة بيانات العملاء', 'An attacker wants the customer database'), items: [
        { h: T('جدار الحماية', 'Firewall'), p: T('يوقف أغلب المحاولات', 'stops most attempts'), c: 'amber' },
        { h: 'DMZ', p: T('خادم الويب منفصل', 'web server is apart'), c: 'violet' },
        { h: 'VPN', p: T('الاتصال مشفّر', 'traffic is encrypted'), c: 'blue' },
        { h: T('الأجهزة', 'Endpoints'), p: T('مكافح + تحديث يحدّوا منه', 'antivirus and updates limit it'), c: 'green' },
        { h: T('انعدام الثقة', 'Zero trust'), p: T('الاختراق مايبقاش سيطرة كاملة', 'no full control after a breach'), c: 'teal' },
      ] }],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('يسمح بالاتصال أو يمنعه وفق قواعد أمنية', 'Allows or denies communication by preset rules'), a: T('جدار الحماية', 'Firewall') },
        { q: T('اتصال خاص عبر شبكة عامة بالتشفير والنفق', 'An encrypted virtual private line over the Internet'), a: T('VPN', 'VPN') },
        { q: T('منطقة منفصلة للخوادم المعرضة للخارج', 'Zone for public servers, apart from the internal network'), a: T('المنطقة المعزولة DMZ', 'DMZ') },
        { q: T('المنطقة المعزولة بتعرّض كل الخوادم للخارج؟', 'A DMZ exposes all servers?'), a: T('غلط: بتفصل العامة عن الداخلية', 'False: it separates public servers') },
        { q: T('VPN بيقلل التنصت حتى على Wi-Fi عامة؟', 'A VPN reduces eavesdropping on public Wi-Fi?'), a: T('صح', 'True') },
        { q: T('مفيش ثقة تلقائية، والوصول بيتفحص دايمًا', 'No automatic trust; every access is verified'), a: T('نهج انعدام الثقة', 'Zero trust') },
        { q: T('مكافح الفيروسات وتحديث نظام التشغيل', 'Antivirus software and OS updates'), a: T('الطبقة 4: الأجهزة الطرفية', 'Layer 4: endpoints') },
        { q: T('ليه حماية المحيط وحدها مابقتش كافية؟', 'Why is guarding the perimeter no longer enough?'), a: T('الخدمات السحابية والعمل عن بُعد', 'Cloud services and remote work') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح لماذا يحمي تكديس عدة إجراءات أمنية في طبقات المؤسسة بشكل أفضل من الاعتماد على جدار الحماية وحده.', 'Explain why layering several security measures protects an organization better than relying on a firewall alone.'), items: [
        T('لو جدار الحماية فشل، كل اللي جوّه ممكن ينكشف', 'If the firewall alone fails, everything inside may be exposed'),
        T('مع الطبقات، طبقة تانية بتقلّل الخطر وتحدّ من أثر الاختراق', 'With layers, the next one still protects the system'),
        T('مثال: خادم في DMZ بيقلل وصول الهجوم للشبكة الداخلية', 'Example: a DMZ keeps an attack away from internal data'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الوصول من الداخل آمن', 'Inside access is safe'), good: T('يُتحقّق منه دايمًا', 'Always verified') },
        { bad: T('الـDMZ بتعرّض كل الخوادم', 'A DMZ exposes all servers'), good: T('بتفصل العامة عن الداخلية', 'It separates public from internal') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('دفاعاتك تبقى طبقات: جدار الحماية، والشبكة الخاصة، والمنطقة المعزولة، والأجهزة الطرفية، وتحقق من كل عملية وصول؛ كده خرق واحد صعب يكشف الشبكة كلها.', 'Layer your defenses — firewall, VPN, DMZ, endpoints — and verify every access (zero trust). One breach is then far less likely to expose the whole network.') }],
    ],
  });

  RV.addSheet('2-3', {
    lead: T('ست مراحل تنظّم الاستجابة، والمخاطر تترتّب بالتأثير × الاحتمالية.', 'Response has six ordered stages; risks are ranked by impact × likelihood.'),
    rows: [
      [{ t: 'goal', label: T('السؤال الرئيسي', 'Guiding question'), q: T('عندما يقع حادث أمني، كيف تنظم المؤسسة استجابتها، وكيف تقرر أي المخاطر تعالجها أولًا؟', 'When a security incident happens, how should an organization respond in order, and how does it decide which risks to address first?'),
        aimsLabel: T('هتطلع من الدرس قادر', 'By the end you can'), aims: [
          T('تشرح مراحل الاستجابة للحوادث والغرض من كل مرحلة', 'Describe the stages of incident response in order'),
          T('تستخدم التأثير والاحتمالية لتحديد أولويات المخاطر', 'Prioritize risks by impact and likelihood'),
          T('تصمم استجابة وتربطها بالضوابط الوقائية', 'Link a response to preventive controls'),
        ] }],
      [{ t: 'sec', n: '1', label: T('ماهية الحادث الأمني', 'What is a Security Incident') }],
      [
        { t: 'tree', ic: '💥', title: T('الحادث الأمني', 'A security incident'), w: 1.25, root: { h: T('حدث يؤثر في سرية المعلومات أو سلامتها أو توافرها، أو يهددها بجدية، أو يخالف سياسة أمنية', 'A situation where actual damage occurs due to an information security problem'), c: 'red' }, kids: [
          { ic: '📤', h: T('تسرّب معلومات', 'Information leak'), p: T('شخصية أو سرّية', 'personal or secret'), c: 'amber' },
          { ic: '✏️', h: T('تلاعب بالبيانات', 'Data tampering'), p: T('رصيد 500 بقى 5,000', 'balance 500 → 5,000'), c: 'violet' },
          { ic: '⛔', h: T('انقطاع خدمة', 'Service outage'), p: T('هجوم على الخادم', 'an attack on the server'), c: 'blue' },
        ] },
        { t: 'note', ic: '✋', c: 'green', p: T('**مش حادث:** تحديث برمجي لإضافة ميزات. **حوادث:** فدية تشفّر الملفات · تسريب بيانات العملاء · انقطاع خدمة بهجوم.', '**Not an incident:** a feature update — no harm. **Incidents:** ransomware · a customer-data leak · an outage from an attack.') },
      ],
      [{ t: 'sec', n: '2', label: T('تدفق الاستجابة للحوادث', 'The Flow of Incident Response') }],
      [{ t: 'layers', ic: '🚨', title: T('نموذج تعليمي مبسط من ست مراحل (مثال: برنامج فدية)', 'The six stages in order (ransomware example)'), items: [
        { ic: '📋', h: T('① التحضير', '① Preparation'), p: T('قبل الحادث: خطة مكتوبة + فريق + نسخ احتياطية', 'before: a written plan + team + backups'), c: 'slate' },
        { ic: '🔔', h: T('② الاكتشاف', '② Detection'), p: T('اكتشاف الحادث وتأكيده: الملفات اتشفّرت', 'find and confirm it: files are encrypted'), c: 'amber' },
        { ic: '🧯', h: T('③ الاحتواء', '③ Containment'), p: T('نعزل الجزء المتأثر أو نقيّد أثره: نفصل الأجهزة المصابة', 'limit the spread: disconnect infected devices'), c: 'red' },
        { ic: '🧹', h: T('④ الاستئصال', '④ Eradication'), p: T('نشيل السبب: نمسح البرنامج الخبيث', 'remove the cause: delete the malware'), c: 'violet' },
        { ic: '♻️', h: T('⑤ الاستعادة', '⑤ Recovery'), p: T('حالة تشغيل آمنة وطبيعية، وممكن من نسخة احتياطية سليمة', 'back to normal, e.g. from a clean backup'), c: 'blue' },
        { ic: '🛡️', h: T('⑥ الدروس المستفادة والتحسين', '⑥ Prevention of recurrence'), p: T('نحلّل السبب ونحسّن الضوابط: تحديث + تدريب الموظفين', 'analyze the cause: updates + staff training'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '⚠️', c: 'red', p: T('**التسلسل العام مهم:** الاحتواء قبل الاستئصال، والاستئصال قبل الاستعادة؛ الاستعادة قبل إزالة السبب ← الحادث يرجع. وممكن المراحل تتداخل أو نرجع لمرحلة سابقة حسب الحادث.', '**Order matters:** contain before eradicating, eradicate before recovering. Recovering first → the cause remains and it returns.') }],
      [{ t: 'sec', n: '3', label: T('مفهوم تقييم المخاطر', 'The Concept of Risk Assessment') }],
      [{ t: 'formula', f: T('درجة الخطر = درجة التأثير × درجة الاحتمالية', 'Risk size = impact × likelihood'), p: T('طريقة مبسطة · الخطر: احتمال حدث يسبب ضررًا · التأثير: حجم الضرر · الاحتمالية: مدى احتمال وقوعه · ترتيب باقي الحالات حسب المصفوفة والسياق والضوابط', 'Risk: a possible future problem and its effect · impact: how much harm · likelihood: how probable') }],
      [
        { t: 'draw', art: 'risk', ic: '📊', title: T('مصفوفة المخاطر', 'Risk matrix') },
        { t: 'vflow', ic: '🥇', title: T('الترتيب: a، بعدين b وc متساويتين، بعدين d', 'Order: a > c > b > d'), items: [
          { h: T('a = 3 × 3 = 9 — الأول', 'a = 3 × 3 = 9 — first'), p: T('تأثير كبير × احتمالية عالية', 'large impact × high likelihood'), c: 'red' },
          { h: T('c = 3 × 1 = 3', 'c = 3 × 2 = 6'), p: T('كبير × منخفضة', 'large × medium'), c: 'amber' },
          { h: T('b = 1 × 3 = 3 — زي c', 'b = 1 × 3 = 3'), p: T('صغير × عالية', 'small × high'), c: 'amber' },
          { h: T('d = 1 × 1 = 1 — الأخير', 'd = 1 × 1 = 1 — last'), p: T('صغير × منخفضة', 'small × low'), c: 'green' },
        ] },
      ],
      [{ t: 'sec', page: true, n: '✓', label: T('راجع نفسك: أسئلة الكتاب بإجاباتها', 'Check yourself: the book’s questions, answered') }],
      [{ t: 'drill', items: [
        { q: T('إنشاء إجراءات استجابة استعدادًا للحوادث', 'Establishing procedures in advance'), a: T('التحضير', 'Preparation') },
        { q: T('فصل حاسوب مصاب عن الشبكة', 'Disconnecting an infected computer'), a: T('الاحتواء', 'Containment') },
        { q: T('إزالة البرمجية الخبيثة', 'Removing the malware'), a: T('الاستئصال', 'Eradication') },
        { q: T('تحليل السبب واتخاذ تدابير لعدم التكرار', 'Analyzing the cause so it does not recur'), a: T('الدروس المستفادة والتحسين', 'Prevention of recurrence') },
        { q: T('لازم نمنع انتشار الضرر قبل إزالة السبب؟', 'Prevent the spread before removing the cause?'), a: T('صح', 'True') },
        { q: T('حجم المخاطرة بيتحدد بالتأثير وحده؟', 'Risk size is determined by impact alone?'), a: T('غلط: التأثير × الاحتمالية', 'False: impact × likelihood') },
        { q: T('آخر مرحلة في الاستجابة؟', 'The final stage of the six?'), a: T('الدروس المستفادة والتحسين', 'Prevention of recurrence') },
        { q: T('أنهي مخاطر نعالجها الأول؟', 'Which risks come first?'), a: T('تأثير عالٍ واحتمالية عالية', 'High impact and high likelihood') },
      ] }],
      [{ t: 'qa', mark: T('سؤال بنمط الامتحان · 6 درجات · نقاط الإجابة', 'Exam-style question · 6 marks · points to make'), q: T('اشرح أهمية التسلسل العام لمراحل الاستجابة، مستخدمًا الاحتواء والاستئصال والاستعادة كمثال.', 'Explain why the six stages must be carried out in order, using recovery and eradication as an example.'), items: [
        T('نحتوي الأول عشان الضرر مايكبرش', 'Contain first so the damage does not spread'),
        T('لو استعدنا قبل إزالة السبب، الحادث ممكن يرجع', 'Recovering before removing the cause lets it return'),
        T('وممكن نرجع لمرحلة سابقة حسب طبيعة الحادث', 'The real response may return to an earlier stage'),
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('تحديث لإضافة ميزات = حادث', 'A feature update = an incident'), good: T('مش حادث', 'Not an incident') },
        { bad: T('المخاطرة بالتأثير لوحده', 'Risk is impact alone'), good: T('التأثير × الاحتمالية', 'Impact × likelihood') },
        { bad: T('نعالج كل المخاطر مع بعض', 'Treat all risks together'), good: T('نرتّب الأولويات', 'Prioritize') },
      ] }],
      [{ t: 'takeaway', label: T('الخلاصة', 'Key takeaway'), p: T('اتبع التسلسل العام: تحضير، اكتشاف، احتواء، استئصال، استعادة، ثم الدروس المستفادة والتحسين، مع إمكانية التداخل أو الرجوع، وحدد أولويات المخاطر بالتأثير × الاحتمالية.', 'Follow the six stages in order (prepare → detect → contain → eradicate → recover → prevent), and prioritize risks by impact × likelihood.') }],
    ],
  });
})();
