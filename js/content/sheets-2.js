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
      [
        { t: 'tree', ic: '🔐', title: T('HTTPS = HTTP + تشفير TLS', 'HTTPS = HTTP + TLS encryption'), w: 1.3, root: { h: T('القفل جنب عنوان موقع البنك', 'The padlock beside the bank’s address'), c: 'green' }, kids: [
          { ic: '🕵️', h: T('تشفير', 'Encryption'), p: T('ضد التنصّت على كلمة المرور', 'stops eavesdropping'), c: 'blue' },
          { ic: '🧪', h: T('كشف تلاعب', 'Tamper detection'), p: T('100 تبقى 10,000', '100 becomes 10,000'), c: 'amber' },
          { ic: '🪪', h: T('تحقق من الطرف', 'Identity check'), p: T('ضد موقع مزيّف', 'stops a fake site'), c: 'violet' },
        ] },
        { t: 'draw', art: 'keys', ic: '🔑', title: T('نوعين التشفير', 'Two kinds of encryption') },
      ],
      [{ t: 'compare', ic: '⚖️', title: T('المتناظر والعام', 'Common key vs public key'),
        cols: [{ h: T('التشفير بالمفتاح المتناظر (المشترك)', 'Common-key (symmetric) cryptography'), c: 'amber' }, { h: T('التشفير بالمفتاح العام', 'Public-key cryptography'), c: 'blue' }],
        rows: [
          { k: T('المفاتيح', 'Keys'), v: [T('مفتاح واحد يقفل ويفتح', 'one key locks and opens'), T('عام يقفل + خاص مع صاحبه يفتح', 'public locks + private opens')] },
          { k: T('ميزته', 'Strength'), v: [T('سريع جدًا لكميات كبيرة', 'very fast for large data'), T('تبعت سر من غير اتفاق مسبق', 'send a secret with no prior agreement')] },
          { k: T('عيبه', 'Weakness'), v: [T('المفتاح نفسه بيسافر في السكة', 'the key itself travels'), T('بطيء على البيانات الكتير', 'slow on much data')] },
          { k: T('بيتستخدم في', 'Used for'), v: [T('تبادل البيانات', 'exchanging data'), T('مشاركة المفتاح بأمان', 'sharing the key safely')] },
        ] }],
      [{ t: 'flow', ic: '🤝', title: T('مصافحة TLS: المتصفح · الخادم · جهة إصدار الشهادات CA', 'TLS handshake: browser · server · CA'), items: [
        { ic: '📜', h: T('① شهادة + مفتاح عام', '① Certificate + public key'), p: T('الخادم يبعت · المتصفح يسأل CA: سليمة؟', 'the server sends · the browser asks the CA'), c: 'violet' },
        { ic: '🔑', h: T('② مفتاح الجلسة', '② Session key'), p: T('متناظر جديد، مقفول بالعام · الخادم يفتحه بالخاص', 'a new common key, locked with the public key · opened with the private key'), c: 'blue' },
        { ic: '📦', h: T('③ البيانات', '③ Data'), p: T('بالمتناظر: سريع والمهاجم يشوف رموز', 'with the common key: fast, attackers see symbols'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '💡', c: 'blue', p: T('**أمان + سرعة:** العام يوصّل المفتاح والمتناظر يبعت البيانات. المفتاح العام مش بيتحوّل لمتناظر. وإصدارات TLS الحالية بتتفق على المفتاح بطريقة Diffie-Hellman.', '**Security + speed:** the public key delivers the key, the common key carries data. It does not turn into a common key. Current TLS agrees keys by Diffie-Hellman.') }],
      [
        { t: 'tree', ic: '🛡️', title: T('المصادقة متعددة العوامل (MFA)', 'Multi-factor authentication (MFA)'), w: 1.15, root: { h: T('اتنين أو أكتر من عوامل مختلفة', 'Two or more different factors'), c: 'teal' }, kids: [
          { ic: '🧠', h: T('معرفة', 'Knowledge'), p: T('حاجة عارفها: كلمة سر', 'you know it: a password'), c: 'blue' },
          { ic: '📱', h: T('حيازة', 'Possession'), p: T('حاجة معاك: موبايل · كارت', 'you have it: phone · card'), c: 'amber' },
          { ic: '👆', h: T('حيوية', 'Biometric'), p: T('حاجة هي إنت: بصمة · وجه', 'you are it: print · face'), c: 'pink' },
        ] },
        { t: 'compare', ic: '🏦', title: T('أمثلة حقيقية', 'Real examples'),
          cols: [{ h: T('العامل الأول', 'First factor'), c: 'blue' }, { h: T('التاني', 'Second'), c: 'amber' }],
          rows: [
            { k: T('البنك أونلاين', 'Online bank'), v: [T('كلمة سر', 'password'), T('كلمة سر لمرة واحدة OTP', 'one-time password')] },
            { k: T('السوشيال ميديا', 'Social media'), v: [T('كلمة سر', 'password'), T('كود SMS', 'SMS code')] },
            { k: T('التسوّق أونلاين', 'Online shopping'), v: [T('كلمة سر', 'password'), T('كود 3-D Secure', '3-D Secure code')] },
            { k: T('لابتوب الشركة', 'Company laptop'), v: [T('كارت ذكي', 'smart card'), T('بصمة', 'fingerprint')] },
          ] },
      ],
      [{ t: 'note', ic: '🔓', c: 'amber', p: T('**ليه بنجمع؟** بعامل واحد لو اتكسر المهاجم يدخل (قايمة كلمات سر مسرّبة). بعاملين مختلفين، لو كلمة السر اتسرّبت الكود لسه بيمنعه.', '**Why combine?** One broken factor lets an attacker in. With two different factors, a leaked password still fails without the code.') }],
      [
        { t: 'vflow', ic: '✍️', title: T('التوقيع الرقمي', 'Digital signature'), items: [
          { ic: '🔏', h: T('الخاص يوقّع (الاتجاه معكوس)', 'Private key signs (reversed)'), c: 'red' },
          { ic: '🔍', h: T('العام يتحقق', 'Public key verifies'), p: T('المهاجم غيّر 100 ← 900 ؟ التحقق يفشل', 'attacker changed 100 → 900? it fails'), c: 'blue' },
          { ic: '✅', h: T('كشف تلاعب وانتحال + عدم إنكار', 'Tamper and spoof detection + non-repudiation'), p: T('مايقدرش يقول «مابعتّش»', 'cannot deny sending'), c: 'green' },
        ] },
        { t: 'cards', ic: '🧩', title: T('شراء من متجر: 4 أخطار و4 حلول', 'Shopping: 4 threats, 4 answers'), cols: 1, items: [
          { ic: '🔒', h: T('تنصّت ← التشفير', 'Eavesdropping → encryption'), p: T('يمنع القراءة', 'stops reading'), c: 'blue' },
          { ic: '📜', h: T('موقع مزيّف ← الشهادة الرقمية', 'Fake site → digital certificate'), p: T('جهة إصدار الشهادات (CA) بتضمن إن الموقع حقيقي', 'a certificate authority (CA) vouches for the site'), c: 'violet' },
          { ic: '🛡️', h: T('دخول غير مصرّح ← MFA', 'Unauthorized access → MFA'), p: T('تمنع الدخول', 'blocks entry'), c: 'green' },
          { ic: '✍️', h: T('تلاعب ← التوقيع', 'Tampering → signature'), p: T('800 ← 8 بيتكشف', '800 → 8 is caught'), c: 'amber' },
        ] },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('كلمتين سر = MFA', 'Two passwords = MFA'), good: T('نفس العامل، مش MFA', 'Same factor, not MFA') },
        { bad: T('التوقيع يحسّن سرعة الاتصال', 'A signature speeds the connection'), good: T('يكشف التلاعب + عدم الإنكار', 'Tamper detection + non-repudiation') },
        { bad: T('كل البيانات بالمفتاح العام', 'All data by public key'), good: T('بطيء؛ البيانات بالمتناظر', 'Slow; data uses the common key') },
      ] }],
    ],
  });

  RV.addSheet('2-2', {
    lead: T('الأمن القوي من تراكُب الإجراءات والتحقق من كل وصول — مش من حاجز واحد.', 'Strong security comes from layered measures and checking every access — not one barrier.'),
    rows: [
      [
        { t: 'draw', art: 'network', ic: '🏰', title: T('الشبكة زي قلعة', 'The network as a castle'), w: 1.2, cap: T('برّه = الإنترنت · الاستقبال = DMZ · جوّه = المكتب وكنز بيانات العملاء', 'Outside = Internet · reception = DMZ · inside = the office and customer data') },
        { t: 'cards', ic: '🧱', title: T('الأدوات', 'The tools'), cols: 1, items: [
          { ic: '🧱', h: T('جدار الحماية', 'Firewall'), p: T('حارس البوابة: قواعد مسبقة تسمح أو تمنع. بيشوف «شكل» الطلب بس، فهجوم مستخبي ممكن يعدّي', 'a gate guard with preset rules. It sees only a request’s “shape”, so a hidden attack may pass'), c: 'amber' },
          { ic: '🏢', h: 'DMZ', p: T('صالة منفصلة للخوادم العامة (ويب وبريد). لو الخادم جوّه الداخلية، الهجوم يوصل لقاعدة البيانات', 'a separate hall for public servers. Inside the network, an attack would reach the database'), c: 'violet' },
          { ic: '🚇', h: 'VPN', p: T('نفق مشفّر: من الكافيه بأمان والمتنصّت شايف رموز · عمل عن بُعد + ربط فروع', 'an encrypted tunnel: safe from a café · remote work + branches'), c: 'blue' },
        ] },
      ],
      [{ t: 'layers', ic: '🧅', title: T('الدفاع في العمق: لو إجراء اتخرق، اللي بعده يحمي', 'Defense in depth: if one fails, the next protects'), items: [
        { ic: '🧱', h: T('١ مدخل الشبكة', '1 Network entrance'), p: T('جدار حماية يمنع الاتصال غير المصرّح', 'a firewall blocks unauthorized traffic'), c: 'amber' },
        { ic: '🚇', h: T('٢ مسار الاتصال', '2 Communication path'), p: T('VPN يشفّر: اللي يلتقط البيانات مايفهمهاش', 'VPN encrypts: captured data is unreadable'), c: 'blue' },
        { ic: '🏢', h: T('٣ وضع الخوادم', '3 Server placement'), p: T('DMZ: خادم ويب مخترق يفضل محبوس', 'DMZ: a breached web server stays contained'), c: 'violet' },
        { ic: '💻', h: T('٤ الأجهزة الطرفية', '4 Endpoints'), p: T('مكافح فيروسات + تحديث نظام التشغيل', 'antivirus + OS updates'), c: 'green' },
      ] }],
      [{ t: 'compare', ic: '🚪', title: T('من المحيط لانعدام الثقة', 'From perimeter to zero trust'),
        cols: [{ h: T('المحيط (التقليدي)', 'Perimeter (traditional)'), c: 'slate' }, { h: T('انعدام الثقة', 'Zero trust'), c: 'green' }],
        rows: [
          { k: T('الفرضية', 'Assumption'), v: [T('جوّه آمن وبرّه خطر', 'inside safe, outside dangerous'), T('مابيثقش تلقائيًا في أي اتصال', 'trusts no connection automatically')] },
          { k: T('التحقق', 'Checking'), v: [T('عند الحدود بس', 'at the border only'), T('الهوية + الصلاحيات في كل مرة', 'identity + rights every time')] },
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
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الوصول من الداخل آمن', 'Inside access is safe'), good: T('يُتحقّق منه دايمًا', 'Always verified') },
        { bad: T('الـDMZ بتعرّض كل الخوادم', 'A DMZ exposes all servers'), good: T('بتفصل العامة عن الداخلية', 'It separates public from internal') },
      ] }],
    ],
  });

  RV.addSheet('2-3', {
    lead: T('الاستجابة في ست مراحل مرتّبة، والمخاطر تترتّب بالتأثير × الاحتمالية.', 'Response has six ordered stages; risks are ranked by impact × likelihood.'),
    rows: [
      [
        { t: 'tree', ic: '💥', title: T('الحادث الأمني', 'A security incident'), w: 1.25, root: { h: T('ضرر فعلي بسبب مشكلة أمن معلومات', 'Actual harm from a security problem'), c: 'red' }, kids: [
          { ic: '📤', h: T('تسرّب معلومات', 'Information leak'), p: T('شخصية أو سرّية', 'personal or secret'), c: 'amber' },
          { ic: '✏️', h: T('تلاعب بالبيانات', 'Data tampering'), p: T('رصيد 500 بقى 5,000', 'balance 500 → 5,000'), c: 'violet' },
          { ic: '⛔', h: T('توقّف خدمة', 'Service outage'), p: T('هجوم على الخادم', 'an attack on the server'), c: 'blue' },
        ] },
        { t: 'note', ic: '✋', c: 'green', p: T('**مش حادث:** تحديث برمجي لإضافة ميزات — مفيش ضرر. **حوادث:** فدية تشفّر الملفات · تسريب بيانات العملاء · توقّف خدمة بهجوم.', '**Not an incident:** a feature update — no harm. **Incidents:** ransomware · a customer-data leak · an outage from an attack.') },
      ],
      [{ t: 'layers', ic: '🚨', title: T('المراحل الست بالترتيب (مثال: برنامج فدية)', 'The six stages in order (ransomware example)'), items: [
        { ic: '📋', h: T('① التحضير', '① Preparation'), p: T('قبل الحادث: خطة مكتوبة + فريق + نسخ احتياطية', 'before: a written plan + team + backups'), c: 'slate' },
        { ic: '🔔', h: T('② الاكتشاف', '② Detection'), p: T('اكتشاف الحادث وتأكيده: الملفات اتشفّرت', 'find and confirm it: files are encrypted'), c: 'amber' },
        { ic: '🧯', h: T('③ الاحتواء', '③ Containment'), p: T('نحدّ الانتشار: نفصل الأجهزة المصابة', 'limit the spread: disconnect infected devices'), c: 'red' },
        { ic: '🧹', h: T('④ الإزالة', '④ Eradication'), p: T('نشيل السبب: نمسح البرنامج الخبيث', 'remove the cause: delete the malware'), c: 'violet' },
        { ic: '♻️', h: T('⑤ الاستعادة', '⑤ Recovery'), p: T('نرجّع الأنظمة من نسخة احتياطية نضيفة', 'restore from a clean backup'), c: 'blue' },
        { ic: '🛡️', h: T('⑥ منع التكرار', '⑥ Prevention of recurrence'), p: T('نحلّل السبب: تحديث + تدريب الموظفين', 'analyze the cause: updates + staff training'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '⚠️', c: 'red', p: T('**الترتيب مهم:** الاحتواء قبل الإزالة، والإزالة قبل الاستعادة. الاستعادة قبل الإزالة ← السبب موجود والحادث يرجع.', '**Order matters:** contain before eradicating, eradicate before recovering. Recovering first → the cause remains and it returns.') }],
      [{ t: 'formula', f: T('حجم المخاطرة = التأثير × الاحتمالية', 'Risk size = impact × likelihood'), p: T('المخاطرة: إمكانية مشكلة مستقبلًا وتأثيرها · التأثير: قد إيه الضرر · الاحتمالية: قد إيه ممكن تحصل', 'Risk: a possible future problem and its effect · impact: how much harm · likelihood: how probable') }],
      [
        { t: 'draw', art: 'risk', ic: '📊', title: T('مصفوفة المخاطر', 'Risk matrix') },
        { t: 'vflow', ic: '🥇', title: T('الترتيب: a > c > b > d', 'Order: a > c > b > d'), items: [
          { h: T('a = 3 × 3 = 9 — الأول', 'a = 3 × 3 = 9 — first'), p: T('تأثير كبير × احتمالية عالية', 'large impact × high likelihood'), c: 'red' },
          { h: 'c = 3 × 2 = 6', p: T('كبير × متوسطة', 'large × medium'), c: 'amber' },
          { h: 'b = 1 × 3 = 3', p: T('صغير × عالية', 'small × high'), c: 'amber' },
          { h: T('d = 1 × 1 = 1 — الأخير', 'd = 1 × 1 = 1 — last'), p: T('صغير × منخفضة', 'small × low'), c: 'green' },
        ] },
      ],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('تحديث لإضافة ميزات = حادث', 'A feature update = an incident'), good: T('مش حادث؛ مفيش ضرر', 'Not an incident') },
        { bad: T('المخاطرة بالتأثير لوحده', 'Risk is impact alone'), good: T('التأثير × الاحتمالية', 'Impact × likelihood') },
        { bad: T('نعالج كل المخاطر مع بعض', 'Treat all risks together'), good: T('نرتّب الأولويات', 'Prioritize') },
      ] }],
    ],
  });
})();
