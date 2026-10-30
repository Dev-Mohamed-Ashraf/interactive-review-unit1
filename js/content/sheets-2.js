/* =========================================================
 * content/sheets-2.js — printable summaries of chapter 2.
 * Only data: js/screens/sheet.js draws it.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => ({ ar, en });

  RV.addSheet('2-1', {
    lead: T('كل تقنية بتحمي من حاجة مختلفة — والأمان الحقيقي في الجمع بينهم.', 'Each technology stops a different threat — real security combines them.'),
    rows: [
      [
        { t: 'tree', ic: '🔐', title: T('HTTPS = HTTP + TLS', 'HTTPS = HTTP + TLS'), w: 1.3, root: { h: 'HTTPS', c: 'green' }, kids: [
          { ic: '🕵️', h: T('تشفير', 'Encryption'), p: T('ضد التنصّت', 'stops eavesdropping'), c: 'blue' },
          { ic: '🧪', h: T('كشف تلاعب', 'Tamper detection'), p: T('ضد التلاعب', 'stops tampering'), c: 'amber' },
          { ic: '🪪', h: T('تحقق من الطرف', 'Identity check'), p: T('ضد انتحال الهوية', 'stops impersonation'), c: 'violet' },
        ] },
        { t: 'draw', art: 'keys', ic: '🔑', title: T('نوعين التشفير', 'Two kinds of encryption') },
      ],
      [{ t: 'compare', ic: '⚖️', title: T('المتناظر والعام', 'Symmetric vs public-key'),
        cols: [{ h: T('المفتاح المتناظر', 'Common key'), c: 'amber' }, { h: T('المفتاح العام', 'Public key'), c: 'blue' }],
        rows: [
          { k: T('المفاتيح', 'Keys'), v: [T('مفتاح واحد مشترك', 'one shared key'), T('عام يقفل + خاص يفتح', 'public locks + private opens')] },
          { k: T('السرعة', 'Speed'), v: [T('سريع', 'fast'), T('بطيء', 'slow')] },
          { k: T('بيتستخدم في', 'Used for'), v: [T('تبادل البيانات', 'exchanging data'), T('مشاركة المفتاح بأمان', 'sharing the key safely')] },
          { k: T('المشكلة', 'Problem'), v: [T('توصيل المفتاح', 'delivering the key'), T('السرعة', 'speed')] },
        ] }],
      [{ t: 'flow', ic: '🤝', title: T('مصافحة TLS: الاتنين مع بعض', 'TLS handshake: both together'), items: [
        { ic: '📜', h: T('① شهادة + مفتاح عام', '① Certificate + public key'), p: T('تحقق عبر CA', 'verified through a CA'), c: 'violet' },
        { ic: '🔑', h: T('② مفتاح الجلسة', '② Session key'), p: T('مقفول بالمفتاح العام', 'locked with the public key'), c: 'blue' },
        { ic: '📦', h: T('③ البيانات', '③ Data'), p: T('بالمفتاح المتناظر', 'with the common key'), c: 'green' },
      ] }],
      [
        { t: 'tree', ic: '🛡️', title: T('المصادقة متعددة العوامل (MFA)', 'Multi-factor authentication'), w: 1.3, root: { h: T('اتنين أو أكتر من عوامل مختلفة', 'Two or more different factors'), c: 'teal' }, kids: [
          { ic: '🧠', h: T('معرفة', 'Knowledge'), p: T('كلمة سر', 'password'), c: 'blue' },
          { ic: '📱', h: T('حيازة', 'Possession'), p: T('موبايل · كارت', 'phone · card'), c: 'amber' },
          { ic: '👆', h: T('حيوية', 'Biometric'), p: T('بصمة · وجه', 'fingerprint · face'), c: 'pink' },
        ] },
        { t: 'vflow', ic: '✍️', title: T('التوقيع الرقمي', 'Digital signature'), items: [
          { ic: '🔏', h: T('الخاص يوقّع', 'Private key signs'), c: 'red' },
          { ic: '🔍', h: T('العام يتحقق', 'Public key verifies'), c: 'blue' },
          { ic: '✅', h: T('كشف تلاعب + عدم إنكار', 'Tamper detection + non-repudiation'), c: 'green' },
        ] },
      ],
      [{ t: 'cards', ic: '🧩', title: T('كل تقنية بتعمل إيه؟', 'What each one does'), cols: 4, items: [
        { ic: '🔒', h: T('التشفير', 'Encryption'), p: T('يمنع القراءة', 'stops reading'), c: 'blue' },
        { ic: '✍️', h: T('التوقيع', 'Signature'), p: T('يكشف التلاعب', 'detects tampering'), c: 'amber' },
        { ic: '📜', h: T('الشهادة', 'Certificate'), p: T('تثبت هوية الموقع', 'proves site identity'), c: 'violet' },
        { ic: '🛡️', h: 'MFA', p: T('تمنع الدخول غير المصرّح', 'stops unauthorized access'), c: 'green' },
      ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('كلمتين سر = MFA', 'Two passwords = MFA'), good: T('نفس العامل، مش MFA', 'Same factor, not MFA') },
        { bad: T('التوقيع يحسّن سرعة الاتصال', 'A signature speeds the connection'), good: T('يكشف التلاعب + عدم الإنكار', 'Tamper detection + non-repudiation') },
      ] }],
    ],
  });

  RV.addSheet('2-2', {
    lead: T('مفيش إجراء واحد كفاية: نحمي الشبكة في طبقات، ومانثقش في حد تلقائيًا.', 'No single measure is enough: protect in layers and trust no one automatically.'),
    rows: [
      [
        { t: 'draw', art: 'network', ic: '🌐', title: T('شكل الشبكة', 'The network'), w: 1.2, cap: T('لو الـ DMZ اتضربت، الشبكة الداخلية بتفضل سليمة', 'If the DMZ is hit, the internal network stays safe') },
        { t: 'cards', ic: '🧱', title: T('الأدوات', 'The tools'), cols: 1, items: [
          { ic: '🧱', h: T('جدار الحماية', 'Firewall'), p: T('عند المدخل: يسمح أو يمنع بقواعد مسبقة', 'at the entrance: allow or block by rules'), c: 'amber' },
          { ic: '🚇', h: 'VPN', p: T('نفق مشفّر: عمل عن بُعد + ربط فروع', 'encrypted tunnel: remote work + branches'), c: 'blue' },
          { ic: '🏢', h: 'DMZ', p: T('للخوادم العامة، منفصلة عن الداخلية', 'public servers, apart from internal'), c: 'violet' },
        ] },
      ],
      [{ t: 'layers', ic: '🧅', title: T('الدفاع في العمق: أربع طبقات بالترتيب', 'Defense in depth: four layers in order'), items: [
        { ic: '🧱', h: T('مدخل الشبكة', 'Network entrance'), p: T('جدار حماية', 'firewall'), c: 'amber' },
        { ic: '🚇', h: T('مسار الاتصال', 'Communication path'), p: 'VPN', c: 'blue' },
        { ic: '🏢', h: T('وضع الخوادم', 'Server placement'), p: 'DMZ', c: 'violet' },
        { ic: '💻', h: T('الأجهزة الطرفية', 'Endpoints'), p: T('مكافح فيروسات + تحديث', 'antivirus + updates'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '🛡️', c: 'green', p: T('**ليه طبقات؟** لو إجراء واحد اتخرق، اللي بعده يحمي.', '**Why layers?** If one measure is breached, the next one protects.') }],
      [{ t: 'compare', ic: '🚪', title: T('القديم والجديد', 'Old and new thinking'),
        cols: [{ h: T('المحيط (القديم)', 'Perimeter (old)'), c: 'slate' }, { h: T('انعدام الثقة (الجديد)', 'Zero trust (new)'), c: 'green' }],
        rows: [
          { k: T('الفرضية', 'Assumption'), v: [T('الداخل آمن', 'inside is safe'), T('محدش موثوق تلقائيًا', 'no one is trusted automatically')] },
          { k: T('التحقق', 'Checking'), v: [T('عند الحدود بس', 'at the border only'), T('الهوية والصلاحيات كل مرة', 'identity and rights every time')] },
          { k: T('ليه اتغيّر', 'Why it changed'), v: [T('السحابة والعمل عن بُعد طمسوا الحدود', 'cloud and remote work blurred the border'), T('التحقق حتى من داخل الشبكة', 'checks even inside the network')] },
        ] }],
      [{ t: 'traps', ic: '🎯', title: T('فخاخ الامتحان', 'Exam traps'), items: [
        { bad: T('الوصول من الداخل آمن', 'Inside access is safe'), good: T('يُتحقّق منه دايمًا', 'Always verified') },
        { bad: T('VPN بيغني عن كل حاجة', 'A VPN replaces everything else'), good: T('طبقة واحدة ضمن أربع', 'One of four layers') },
      ] }],
    ],
  });

  RV.addSheet('2-3', {
    lead: T('الحادث بيتعالج بالترتيب… والمخاطر بتترتّب بالأرقام.', 'Incidents are handled in order… risks are ranked with numbers.'),
    rows: [
      [{ t: 'flow', ic: '🚨', title: T('المراحل الست بالترتيب', 'The six stages in order'), items: [
        { ic: '📋', h: T('تحضير', 'Prepare'), c: 'slate' },
        { ic: '🔔', h: T('اكتشاف', 'Detect'), c: 'amber' },
        { ic: '🧯', h: T('احتواء', 'Contain'), p: T('وقف الانتشار', 'stop the spread'), c: 'red' },
        { ic: '🧹', h: T('إزالة', 'Eradicate'), p: T('شيل السبب', 'remove the cause'), c: 'violet' },
        { ic: '♻️', h: T('استعادة', 'Recover'), c: 'blue' },
        { ic: '🛡️', h: T('منع تكرار', 'Prevent'), c: 'green' },
      ] }],
      [{ t: 'note', ic: '⚠️', c: 'red', p: T('**الترتيب مهم:** الاستعادة قبل الإزالة ← الحادث يرجع تاني.', '**Order matters:** recovering before eradicating → the incident returns.') }],
      [
        { t: 'tree', ic: '💥', title: T('الحادث الأمني', 'A security incident'), w: 1.25, root: { h: T('ضرر فعلي بسبب مشكلة أمن معلومات', 'Actual harm from a security problem'), c: 'red' }, kids: [
          { ic: '📤', h: T('تسرّب معلومات', 'Data leak'), c: 'amber' },
          { ic: '✏️', h: T('تلاعب بالبيانات', 'Data tampering'), c: 'violet' },
          { ic: '⛔', h: T('توقّف خدمة', 'Service outage'), c: 'blue' },
        ] },
        { t: 'formula', f: T('المخاطرة = التأثير × الاحتمالية', 'Risk = impact × likelihood'), p: T('التأثير: قد إيه الضرر · الاحتمالية: قد إيه ممكن تحصل', 'impact: how much harm · likelihood: how probable'), ex: T('a = 3 × 3 = 9', 'a = 3 × 3 = 9') },
      ],
      [
        { t: 'draw', art: 'risk', ic: '📊', title: T('مصفوفة المخاطر', 'Risk matrix') },
        { t: 'vflow', ic: '🥇', title: T('ترتيب المعالجة', 'Treatment order'), items: [
          { h: T('a = 9 — الأول', 'a = 9 — first'), p: T('تأثير كبير × احتمالية عالية', 'large impact × high likelihood'), c: 'red' },
          { h: T('c = 6', 'c = 6'), p: T('كبير × متوسطة', 'large × medium'), c: 'amber' },
          { h: T('b = 3', 'b = 3'), p: T('صغير × عالية', 'small × high'), c: 'amber' },
          { h: T('d = 1 — الأخير', 'd = 1 — last'), p: T('صغير × منخفضة', 'small × low'), c: 'green' },
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
