/* =========================================================
 * content/lesson-3-2.js — طرق اتصال تطبيقات الويب
 * Pure data. Sources: textbook 3-2 (EN p.62–67) + memo (Arabic wording,
 * deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('3-2', {
  id: '3-2',
  color: '#818cf8',
  cover: 'img/web-l2-cover.webp',
  title: { ar: 'طرق اتصال تطبيقات الويب', en: 'Web Application Communication Methods' },
  guiding: { ar: 'إزاي العميل والخادم بيتواصلوا عشان تطبيق الويب يشتغل، وبيستخدموا قواعد ورسايل إيه؟', en: 'How do the client and server communicate to make a web application work, and what rules and messages do they use?' },
  hook: {
    ar: 'لما بتدوس على رابط أو زرار «بحث»، جهازك مش شايل الموقع كله — هو __بيطلبه__ من حاسب بعيد. متصفحك هو **العميل** اللي بيبعت الطلب، و**خادم** في مكان ما بيرد بـ**استجابة**. التبادل ده بتحكمه قواعد مشتركة اسمها **البروتوكولات** — وهو ده اللي بيحصل بين ضغطتك والصفحة اللي بتشوفها.',
    en: 'When you click a link or press "search", your device does not hold the whole website — it __asks__ a distant computer for it. Your browser is the **client** making the request; a **server** somewhere answers with a **response**. This exchange is governed by shared rules called **protocols** — and it is what happens between your click and the page you see.',
  },
  keyFact: { ar: 'تطبيقات الويب بتشتغل بأن __العميل يبعت طلبات__ و__الخادم يرجّع استجابات__، باستخدام بروتوكولات (HTTP/HTTPS) وغالبًا __API__ بيتبادل البيانات بصيغ زي __JSON__.', en: 'Web apps work by __a client sending requests__ and __a server returning responses__, using protocols (HTTP/HTTPS) and often __APIs__ that exchange data in formats like __JSON__.' },
  concepts: ['client', 'server', 'HTTP', 'HTTPS', 'HTTP method', 'status code', 'API', 'JSON'],
  objectives: [
    { ar: 'أشرح نموذج العميل والخادم ودورة الطلب والاستجابة.', en: 'Explain the client–server model and the difference between HTTP and HTTPS.' },
    { ar: 'أميّز بين HTTP وHTTPS، وأستخدم GET وPOST في سياقات مناسبة.', en: 'Describe how HTTP requests and responses work, and explain the role of an API in exchanging data.' },
    { ar: 'أفسّر رموز حالة HTTP الشائعة، وأشرح دور API وJSON في تبادل البيانات.', en: 'Interpret common HTTP status codes and explain the role of API and JSON in exchanging data.' },
    { ar: 'أصمّم طريقة اتصال مناسبة لمهمة في تطبيق ويب، وأبرّر اختياري.', en: 'Design a suitable communication method for a web-app task and justify the choice.' },
  ],

  stations: [
    /* ───────────── 1 · client/server + HTTP/HTTPS ───────────── */
    {
      id: 'client', kind: 'learn',
      title: { ar: 'العميل والخادم · HTTP و HTTPS', en: 'Client and server · HTTP and HTTPS' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'صفحة تسجيل الدخول في موقع بنك… تفضّل عنوانها يبدأ بإيه؟', en: 'A bank’s login page… which address start would you prefer?' },
            options: [
              { emoji: '🔓', text: { ar: 'http://', en: 'http://' } },
              { emoji: '🔒', text: { ar: 'https://', en: 'https://' } },
              { emoji: '🤷‍♂️', text: { ar: 'مش فارقة', en: 'No difference' } },
            ],
            after: { ar: 'تعالى نشوف الفرق بين الاتنين في السكة 👇', en: 'Let’s see the difference between them on the way 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: العميل يطلب… والخادم يستجيب', en: '🎞️ Animation: the client asks… the server responds' },
          enTitle: 'Client, server, HTTP and HTTPS',
          terms: ['client', 'server', 'request', 'response', 'HTTP', 'HTTPS'],
          visual: { anim: 'webCommMovie', props: { scenes: [0, 3] } },
          beats: [
            { ar: '**العميل:** __برنامج أو جهاز__ بيبعت طلب لخدمة تانية، يعني الجانب اللي __بيطلب بيانات أو معالجة__ — زي __المتصفحات وتطبيقات الموبايل__. **الخادم:** الجانب اللي __بيستقبل الطلبات ويعالجها ويرجّع الاستجابات__. عملاء كتير بيطلبوا… وخادم واحد بيستجيب.', en: '**Client:** the side that __requests data or processing__ from the server — such as __browsers and mobile apps__. **Server:** the side that __receives requests, processes them and returns responses__. Many clients ask… one server responds.' },
            { ar: 'تطبيق الويب بيشتغل بإن __العميل يبعت طلب__ ← و__الخادم يرجّع استجابة__. طلب واحد ← استجابة واحدة مطابقة. والتبادل ده بتحكمه قواعد مشتركة اسمها __بروتوكولات__، ونموذج الطلب والاستجابة أساسي في كتير من التطبيقات مع وجود وسائل اتصال تانية عند الحاجة.', en: 'A web app works by the __client sending a request__ → and the __server returning a response__. One request → one matching response. This exchange is governed by shared rules called __protocols__.' },
            { ar: '**HTTP** (بروتوكول نقل النص التشعبي): بروتوكول بيتستخدم __لتبادل الرسائل بين عميل وخادم على الويب__. بس المحتوى بيمشي __مقروء__ — أي حد في السكة يقدر يقراه 👀.', en: '**HTTP** (HyperText Transfer Protocol): a protocol __for exchanging data between clients (browsers, apps) and servers__. But the content travels __readable__ — anyone on the way can read it 👀.' },
            { ar: '**HTTPS** = استخدام HTTP عبر __اتصال TLS آمن__: TLS بيساعد على حماية __سرية الاتصال وسلامته__ و__مصادقة الخادم__، فالمتجسس مايقدرش يقرا المحتوى أو يعدّله بسهولة أثناء النقل. المواقع اللي عنوانها بيبدأ بـ __https://__ بتستخدمه — وصفحة تسجيل الدخول لازم تكون HTTPS 🔒.', en: '**HTTPS** (HTTP Secure) = HTTP + __TLS (SSL/TLS) encryption__ — content is __encrypted__, so the risk of third parties reading it is __reduced__. Sites whose URL starts with __https://__ use it — and a login page must use HTTPS 🔒.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'تطبيق الموبايل ممكن يكون عميل.', en: 'A mobile app can be a client.' }, answer: true },
            { text: { ar: 'الخادم هو الجانب اللي بيبدأ ويبعت الطلب للمتصفح.', en: 'The server is the side that starts by sending a request to the browser.' }, answer: false, explain: { ar: 'العميل هو اللي __بيطلب__، والخادم __بيستجيب__.', en: 'The client __requests__; the server __responds__.' } },
            { text: { ar: 'HTTPS بيضيف تشفير TLS لـ HTTP.', en: 'HTTPS adds TLS encryption to HTTP.' }, answer: true },
            { text: { ar: 'مع HTTP العادي المحتوى بيمشي مشفّر.', en: 'With plain HTTP the content travels encrypted.' }, answer: false, explain: { ar: 'التشفير ده اللي __بيزوّده HTTPS__.', en: 'Encryption is what __HTTPS adds__.' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'mcq', prompt: { ar: 'ليه صفحة تسجيل الدخول لازم تستخدم HTTPS مش HTTP؟', en: 'Why should a login page use HTTPS rather than HTTP?' },
            options: [
              { ar: 'علشان كلمة المرور تتشفّر وماتتقريش في السكة', en: 'So the password is encrypted and not read on the way' },
              { ar: 'علشان الصفحة تفتح أسرع على كل الأجهزة', en: 'So the page opens faster on every device' },
              { ar: 'علشان الخادم يبعت رمز الحالة 200 دايمًا', en: 'So the server always sends status code 200' },
              { ar: 'علشان المتصفح مايحتاجش يبعت أي طلب خالص', en: 'So the browser never needs to send any request' },
            ],
            answer: 0,
            explain: { ar: 'HTTPS = __تشفير__ ← كلمة المرور ماتتقريش من طرف تالت.', en: 'HTTPS = __encryption__ → a third party cannot read the password.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**العميل** بيطلب (متصفح، تطبيق موبايل) · **الخادم** بيستقبل ويعالج ويرجّع استجابة.', en: '**Client** requests (browser, mobile app) · **server** receives, processes and returns a response.' },
            { ar: '**HTTP:** بروتوكول لتبادل الرسائل بين عميل وخادم على الويب.', en: '**HTTP:** the protocol for exchanging data between clients and servers.' },
            { ar: '**HTTPS = HTTP عبر اتصال TLS آمن** ← سرية وسلامة ومصادقة الخادم · العنوان بيبدأ بـ https://.', en: '**HTTPS = HTTP + SSL/TLS encryption** → less risk of third parties reading · the URL starts with https://.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · methods, status codes, API + JSON ───────────── */
    {
      id: 'messages', kind: 'learn',
      title: { ar: 'الطلبات والاستجابات · API و JSON', en: 'Requests, responses · API and JSON' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: GET و POST ورموز الحالة و API', en: '🎞️ Animation: GET, POST, status codes and API' },
          enTitle: 'Methods, status codes, API and JSON',
          terms: ['HTTP method', 'GET', 'POST', 'status code', 'API', 'JSON'],
          visual: { anim: 'webCommMovie', props: { scenes: [4, 8] } },
          beats: [
            { ar: 'كل طلب فيه **طريقة طلب HTTP** بتقول __«عايز إيه»__. **GET** = بيتستخدم عادةً __لطلب مورد أو بيانات من الخادم__: عرض صفحة ويب، استرجاع نتايج البحث.', en: 'Every request carries an **HTTP method** that says __"what is wanted"__. **GET** = __retrieve data from the server__: displaying a page, getting search results.' },
            { ar: '**POST** = بيتستخدم عادةً __لإرسال بيانات__ عشان الخادم يعالجها: إرسال __معلومات تسجيل الدخول__، إرسال __محتويات نموذج__. ⚠️ فخ: «GET لإرسال البيانات» ← __غلط__.', en: '**POST** = __send data to the server__ to process: sending __login details__, submitting __form contents__. ⚠️ Trap: "GET is for sending data" → __false__.' },
            { ar: 'كل استجابة فيها **رمز حالة HTTP** بيبلّغ بالنتيجة: **200** ✅ __نجاح__ · **404** ❓ __المورد المطلوب مش موجود بالعنوان ده__ (غالبًا من جهة العميل) · **500** 💥 __خطأ داخلي في الخادم__ منعه يكمّل الطلب، والرمز لوحده مابيحددش السبب التفصيلي.', en: 'Every response carries a **status code** reporting the result: **200** ✅ __success__ · **404** ❓ __page not found__ (wrong URL — the client’s side) · **500** 💥 __server error__ (the problem is on the server).' },
            { ar: '**API** (واجهة برمجة التطبيقات): __مجموعة قواعد واضحة__ بتسمح لبرنامج يطلب __بيانات أو وظائف__ من برنامج تاني — والأمامية ممكن تطلب البيانات من خدمة خلفية __عن طريق API__. وممكن ترجع بصيغة **JSON** (JavaScript Object Notation): __صيغة نصية شائعة__ لتمثيل وتبادل البيانات المهيكلة بكائنات ومصفوفات وقيم بسيطة. مثال: في {"city": "Cairo", "temperature": 31} المفتاح (key) هو city والقيمة (value) هي Cairo.', en: '**API** (Application Programming Interface): a system __for exchanging data between different pieces of software__ — the frontend often requests data from the backend __through an API__. The data is often in **JSON**: __easy for humans to read and computers to process__.' },
            { ar: '📌 **الخلاصة:** العميل يطلب ← الخادم يستجيب · عبر HTTP/HTTPS · كل طلب فيه طريقة (GET/POST) · كل استجابة فيها رمز حالة (200/404/500) · وغالبًا API بيرجّع JSON. ⚠️ الـAPI __مش__ بروتوكول ولا تقنية تشفير ولا لضبط مظهر الصفحة.', en: '📌 **The point:** the client asks → the server responds · over HTTP/HTTPS · each request has a method (GET/POST) · each response a status code (200/404/500) · often an API returning JSON. ⚠️ An API is __not__ a protocol, encryption or page styling.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '404 = غالبًا من جهة __العميل__ (مورد مش موجود بالعنوان ده) · 500 = خطأ داخلي في __الخادم__. «500 = نجاح» ← غلط؛ النجاح 200.', en: '404 = the __client’s__ error (asked for a missing URL) · 500 = the __server’s__ error. "500 = success" → false; success is 200.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — رحلة نقرة واحدة', en: 'Deep dive — the journey of one click' }, text: { ar: '(١) المتصفح يبني طلب HTTP فيه طريقة (غالبًا GET) والعنوان. (٢) الطلب يسافر عبر الإنترنت للخادم. (٣) الخادم يعالجه وممكن يسأل قاعدة البيانات. (٤) الخادم يرد باستجابة فيها رمز حالة + المحتوى. (٥) المتصفح يعرض. ولو الصفحة محتاجة بيانات بعد التحميل، الأمامية تطلبها من الخلفية عن طريق __API__ وترجع __JSON__.', en: '(1) The browser builds an HTTP request with a method (usually GET) and the URL. (2) It travels over the Internet to the server. (3) The server processes it, maybe asking the database. (4) The server replies with a status code + the content. (5) The browser displays it. If the page needs more data after loading, the frontend asks the backend through an __API__, which returns __JSON__.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'classify', prompt: { ar: 'كل عملية بتستخدم أنهي طريقة؟', en: 'Which method does each operation use?' },
            groups: [{ icon: 'search', label: { ar: 'GET (استرجاع)', en: 'GET (retrieve)' } }, { icon: 'share', label: { ar: 'POST (إرسال)', en: 'POST (send)' } }],
            items: [
              { text: { ar: 'عرض صفحة ويب', en: 'Displaying a web page' }, group: 0 },
              { text: { ar: 'إرسال الاسم وكلمة المرور في نموذج الدخول', en: 'Submitting ID and password in a login form' }, group: 1 },
              { text: { ar: 'عرض نتايج البحث', en: 'Displaying search results' }, group: 0 },
              { text: { ar: 'إرسال محتويات نموذج «اتصل بنا»', en: 'Submitting a contact form' }, group: 1 },
            ],
            explain: { ar: 'العرض/الاسترجاع ← GET · إرسال بيانات ← POST.', en: 'Display/retrieve → GET · sending data → POST.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'match', prompt: { ar: 'وصّل كل رمز حالة بمعناه:', en: 'Match each status code with its meaning:' },
            left: [{ ar: '404', en: '404' }, { ar: '200', en: '200' }, { ar: '500', en: '500' }],
            right: [{ ar: 'نجاح — الطلب اتعالج', en: 'Success — request processed' }, { ar: 'المورد المطلوب مش موجود', en: 'Page not found' }, { ar: 'خطأ في الخادم', en: 'Server error' }],
            answer: [1, 0, 2],
            explain: { ar: '200 نجاح · 404 المورد مش موجود · 500 خطأ الخادم.', en: '200 success · 404 not found · 500 server error.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (3)', en: '✋ Check yourself (3)' },
          q: { widget: 'mcq', prompt: { ar: 'تطبيق طقس بيطلب توقعات النهارده من خدمة تانية ويستقبلها نص منظّم زي {"temp": 31}. ده مثال على إيه؟', en: 'A weather app asks another service for today’s forecast and receives organized text like {"temp": 31}. What is this an example of?' },
            options: [
              { ar: 'API بيرجّع البيانات بصيغة JSON', en: 'An API returning data in JSON' },
              { ar: 'رمز حالة 500 بسبب خطأ في الخادم', en: 'Status code 500 because of a server error' },
              { ar: 'تشفير TLS بيضيفه بروتوكول HTTPS', en: 'TLS encryption added by HTTPS' },
              { ar: 'طريقة POST بتبعت نموذج تسجيل الدخول', en: 'The POST method sending a login form' },
            ],
            answer: 0,
            explain: { ar: 'تبادل بيانات بين برنامجين = __API__، والنص المنظّم ده = __JSON__.', en: 'Data exchanged between two programs = an __API__, and that organized text = __JSON__.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**GET** استرجاع (عرض صفحة، نتايج بحث) · **POST** إرسال (تسجيل دخول، نموذج).', en: '**GET** retrieves (page, search results) · **POST** sends (login, form).' },
            { ar: '**رموز الحالة:** 200 نجاح · 404 المورد مش موجود (العميل) · 500 خطأ الخادم.', en: '**Status codes:** 200 success · 404 not found (client) · 500 server error.' },
            { ar: '**API:** قواعد بتسمح لبرنامج يطلب بيانات أو وظائف من برنامج تاني · **JSON:** صيغة نصية للبيانات المهيكلة.', en: '**API:** data exchange between different software · **JSON:** a format easy for humans and computers.' },
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
            { text: { ar: 'A) العميل هو الجانب اللي بيطلب البيانات أو المعالجة من الخادم، والخادم هو اللي بيرجّع الاستجابة.', en: 'A) The client requests data or processing from the server, and the server returns the response.' }, answer: true },
            { text: { ar: 'B) HTTPS هو استخدام HTTP عبر اتصال محمي بـ TLS.', en: 'B) HTTPS is a protocol that adds encryption to HTTP.' }, answer: true },
            { text: { ar: 'C) طريقة GET لإرسال البيانات للخادم.', en: 'C) The GET method is for sending data to the server.' }, answer: false },
            { text: { ar: 'D) رمز الحالة 404 معناه إن المورد المطلوب مش موجود.', en: 'D) Status code 404 means the page is not found.' }, answer: true },
          ] },
          solution: [
            { ar: 'A) وصف صحيح لدور العميل والخادم ← **✓**.', en: 'A) Correct description of client and server → **✓**.' },
            { ar: 'B) HTTPS بيستخدم HTTP عبر اتصال محمي بـ TLS ← **✓**.', en: 'B) HTTPS adds SSL/TLS encryption to HTTP → **✓**.' },
            { ar: 'C) GET عادةً __لطلب مورد أو بيانات__، و__POST__ لإرسال بيانات للخادم ← **✗**.', en: 'C) GET __retrieves__; __POST__ sends → **✗**.' },
            { ar: 'D) 404 = المورد المطلوب مش موجود ← **✓**.', en: 'D) 404 = page not found → **✓**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمصطلح (A–C):', en: '(2) Match each description (a–c) with the term (A–C):' },
            left: [
              { ar: 'a) بروتوكول اتصال لتبادل البيانات بين المتصفحات والخوادم', en: 'a) A protocol for exchanging data between browsers and servers' },
              { ar: 'b) واجهة أو مجموعة قواعد بتتيح لبرنامج يطلب بيانات أو وظائف من برنامج أو خدمة تانية', en: 'b) A system for exchanging data between different pieces of software' },
              { ar: 'c) بروتوكول اتصال بيضيف التشفير لـ HTTP', en: 'c) A protocol that adds encryption to HTTP' },
            ],
            right: [{ ar: 'A HTTP', en: 'A HTTP' }, { ar: 'B API', en: 'B API' }, { ar: 'C HTTPS', en: 'C HTTPS' }],
            answer: [0, 1, 2] },
          solution: [
            { ar: 'a: بروتوكول الويب = **HTTP** ← A.', en: 'a: the web protocol = **HTTP** → A.' },
            { ar: 'b: القواعد اللي بتتيح لبرنامج يطلب من برنامج تاني = **API** ← B.', en: 'b: data exchange between software = **API** → B.' },
            { ar: 'c: HTTP + تشفير = **HTTPS** ← C.', en: 'c: HTTP + encryption = **HTTPS** → C.' },
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
            { q: { ar: '1. الجانب اللي بيطلب بيانات أو معالجة من الخادم (زي المتصفح)؟', en: '1. The side that requests data or processing from the server (e.g. a browser)?' }, a: { ar: 'العميل', en: 'Client' } },
            { q: { ar: '2. الجانب اللي بيستقبل الطلبات ويعالجها ويرجّع الاستجابات؟', en: '2. The side that receives requests, processes them and returns responses?' }, a: { ar: 'الخادم', en: 'Server' } },
            { q: { ar: '3. البروتوكول المستخدم للوصول للويب عبر اتصال TLS آمن؟', en: '3. The protocol that adds encryption to HTTP?' }, a: { ar: 'HTTPS', en: 'HTTPS' } },
            { q: { ar: '4. طريقة طلب HTTP لاسترجاع البيانات من الخادم؟', en: '4. The HTTP method for retrieving data from the server?' }, a: { ar: 'GET', en: 'GET' } },
            { q: { ar: '5. النظام اللي بيبادل البيانات بين برامج مختلفة؟', en: '5. The system for exchanging data between different pieces of software?' }, a: { ar: 'API', en: 'API' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار تركيبة رمز الحالة ومعناها اللي __مش__ مناسبة:', en: 'Choose the status code/meaning pair that is **NOT** appropriate:' },
            options: [
              { ar: '200 — الطلب اتعالج بنجاح', en: '200 — the request was processed successfully' },
              { ar: '404 — المورد المطلوب مش موجود', en: '404 — page not found' },
              { ar: '500 — الطلب اتعالج بنجاح', en: '500 — the request was processed successfully' },
              { ar: '500 — حصلت مشكلة على جانب الخادم', en: '500 — a problem occurred on the server side' },
            ],
            fixedOrder: true,
            answer: 2,
            explain: { ar: '500 = __خطأ الخادم__ مش نجاح.', en: '500 = a __server error__, not success.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب لـ API:', en: 'Choose the best description of an API:' },
            options: [
              { ar: 'تقنية لضبط مظهر صفحات الويب', en: 'A technology for adjusting the appearance of web pages' },
              { ar: 'نظام لتبادل البيانات بين برامج مختلفة', en: 'A system for exchanging data between different pieces of software' },
              { ar: 'تقنية لتشفير البيانات وإرسالها بأمان', en: 'A technology for encrypting data and sending it safely' },
              { ar: 'طريقة طلب HTTP لاسترجاع البيانات من الخادم', en: 'An HTTP method for retrieving data from the server' },
            ],
            answer: 1,
            explain: { ar: 'المظهر = CSS · التشفير = HTTPS · الاسترجاع = GET · و__API = تبادل بيانات بين برامج__.', en: 'Appearance = CSS · encryption = HTTPS · retrieving = GET · and __API = data exchange between software__.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(d):', en: 'Read and fill blanks (a)–(d):' },
            text: { ar: 'كتير من تطبيقات الويب بيعتمد على الاتصال بين {0} اللي بيبعت طلب، و{1} اللي بيستقبل الطلب ويعالجه ويرجّع استجابة. والويب بيستخدم بروتوكول اسمه {2} لتبادل الرسايل. واستخدام البروتوكول ده عبر اتصال TLS آمن اسمه {3}.', en: 'A web application operates by communication between a {0}, which requests data or processing from the server, and a {1}, which receives the request, processes it and returns a response. This uses a protocol called {2}. The protocol that adds SSL/TLS encryption to it is called {3}.' },
            bank: [{ ar: 'العميل', en: 'client' }, { ar: 'الخادم', en: 'server' }, { ar: 'HTTP', en: 'HTTP' }, { ar: 'HTTPS', en: 'HTTPS' }, { ar: 'API', en: 'API' }],
            answer: [0, 1, 2, 3],
            explain: { ar: '(a) العميل (b) الخادم (c) HTTP (d) HTTPS.', en: '(a) client (b) server (c) HTTP (d) HTTPS.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'classify', prompt: { ar: 'لكل عملية (a–d) حدّد طريقة طلب HTTP:', en: 'For each operation (a–d) choose the HTTP method:' },
            groups: [{ icon: 'search', label: { ar: 'A GET', en: 'A GET' } }, { icon: 'share', label: { ar: 'B POST', en: 'B POST' } }],
            items: [
              { text: { ar: 'a) عرض صفحة ويب', en: 'a) Displaying a web page' }, group: 0 },
              { text: { ar: 'b) إدخال المعرّف وكلمة المرور في نموذج الدخول وإرسالهم', en: 'b) Entering an ID and password in a login form and submitting them' }, group: 1 },
              { text: { ar: 'c) عرض نتايج البحث', en: 'c) Displaying search results' }, group: 0 },
              { text: { ar: 'd) إرسال محتويات نموذج تواصل', en: 'd) Submitting a contact form' }, group: 1 },
            ],
            explain: { ar: 'a→A · b→B · c→A · d→B.', en: 'a→A · b→B · c→A · d→B.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الوصف الأنسب لـ HTTPS:', en: 'Choose the best description of HTTPS:' },
            options: [
              { ar: 'طريقة لاسترجاع البيانات من الخادم', en: 'A method for retrieving data from the server' },
              { ar: 'نظام لتبادل البيانات بين برامج مختلفة', en: 'A system for exchanging data between software' },
              { ar: 'بروتوكول بيستخدم HTTP عبر اتصال TLS', en: 'A protocol that adds SSL/TLS encryption to HTTP' },
              { ar: 'رمز حالة لمشكلة على جانب الخادم', en: 'A status code for a server-side problem' },
            ],
            answer: 2,
            explain: { ar: 'HTTPS = HTTP عبر اتصال __TLS__.', en: 'HTTPS = HTTP + __SSL/TLS__.' } },
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
          { front: { ar: 'العميل', en: 'Client' }, back: { ar: 'الجانب اللي بيطلب بيانات أو معالجة (متصفح، تطبيق موبايل).', en: 'The side that requests data or processing (browser, mobile app).' } },
          { front: { ar: 'الخادم', en: 'Server' }, back: { ar: 'بيستقبل الطلبات ويعالجها ويرجّع الاستجابات.', en: 'Receives requests, processes them and returns responses.' } },
          { front: { ar: 'HTTP', en: 'HTTP' }, back: { ar: 'بروتوكول لتبادل الرسائل بين عميل وخادم على الويب.', en: 'The protocol for exchanging data between clients and servers.' } },
          { front: { ar: 'HTTPS', en: 'HTTPS' }, back: { ar: 'استخدام HTTP عبر اتصال TLS آمن: سرية وسلامة ومصادقة الخادم.', en: 'HTTP + SSL/TLS encryption — content is encrypted.' } },
          { front: { ar: 'طريقة طلب HTTP', en: 'HTTP method' }, back: { ar: 'بتقول المطلوب: GET استرجاع · POST إرسال.', en: 'Says what is wanted: GET retrieves · POST sends.' } },
          { front: { ar: 'رمز حالة HTTP', en: 'Status code' }, back: { ar: 'بيبلّغ بالنتيجة: 200 نجاح · 404 المورد مش موجود · 500 خطأ الخادم.', en: 'Reports the result: 200 success · 404 not found · 500 server error.' } },
          { front: { ar: 'API', en: 'API' }, back: { ar: 'مجموعة قواعد واضحة بتسمح لبرنامج يطلب بيانات أو وظائف من برنامج تاني.', en: 'A system for exchanging data between different software.' } },
          { front: { ar: 'JSON', en: 'JSON' }, back: { ar: 'صيغة نصية شائعة لتمثيل وتبادل البيانات المهيكلة (كائنات ومصفوفات وقيم بسيطة).', en: 'A data format easy for humans to read and computers to process.' } },
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
            prompt: { ar: 'اشرح خطوة بخطوة إيه اللي بيحصل لما متصفح يطلب صفحة ويب والخادم يستجيب. (أشِر إلى: العميل، الطلب، طريقة طلب HTTP، الاستجابة، رمز الحالة)', en: 'Explain step by step what happens when a browser requests a web page and the server responds. (Refer to: client, request, HTTP method, response, status code)' },
            points: [
              { ar: 'المتصفح (العميل) يبعت طلب HTTP بطريقة GET للعنوان.', en: 'The browser (client) sends an HTTP request with GET for the URL.' },
              { ar: 'الخادم يستقبل ويعالج ويجهّز الصفحة.', en: 'The server receives, processes and prepares the page.' },
              { ar: 'الخادم يرد باستجابة فيها رمز حالة (200/404/500) + المحتوى، والمتصفح يعرض.', en: 'The server responds with a status code (200/404/500) + content; the browser displays it.' },
            ],
            model: { ar: 'أولًا المتصفح — وهو العميل — بيبني طلب HTTP فيه الطريقة GET لأنه عايز __يسترجع__ صفحة، ومعاه عنوان الصفحة، وبيبعته للخادم عبر الإنترنت (ولو العنوان https:// يبقى الطلب مشفّر). الخادم بيستقبل الطلب ويعالجه ويجهّز الصفحة. بعد كده بيرد بـ__استجابة__ فيها __رمز حالة__: 200 لو نجح ومعاه محتوى الصفحة، أو 404 لو العنوان مش موجود، أو 500 لو حصلت مشكلة عنده. وفي الآخر المتصفح بيعرض المحتوى للمستخدم.', en: 'First the browser — the client — builds an HTTP request with the GET method, because it wants to __retrieve__ a page, plus the page URL, and sends it to the server over the Internet (encrypted if the URL is https://). The server receives and processes the request and prepares the page. Then it replies with a __response__ carrying a __status code__: 200 if it succeeded, with the page content; 404 if the URL does not exist; or 500 if a problem occurred on its side. Finally the browser displays the content.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — تطبيق المدرسة', en: 'Think as an engineer — school app' },
            prompt: { ar: 'مدرسة عايزة تطبيق ويب الطلاب يسجّلوا فيه دخول ويشوفوا جدولهم وينزّلوا PDF. ١) لتلات أفعال — تحميل سجل درجات طالب، إرسال نموذج الدخول، طلب جدول النهارده من نظام مدرسة تانية — GET ولا POST؟ وفي الأخير هل فيه API؟ ٢) الدخول يستخدم HTTP ولا HTTPS وليه؟ ٣) أوصِ بتصميم الاتصال بسببين.', en: 'A school wants a web app where students log in, view their timetable and download a PDF. 1) For three actions — loading a grade history, submitting the login form, requesting today’s schedule from another school system — GET or POST? Is an API involved in the last? 2) Should login use HTTP or HTTPS, and why? 3) Recommend the design with two reasons.' },
            points: [
              { ar: 'سجل الدرجات GET · نموذج الدخول POST · الجدول من نظام تاني GET عبر API.', en: 'Grade history GET · login form POST · schedule from another system GET via an API.' },
              { ar: 'الدخول HTTPS علشان كلمة المرور تتشفّر.', en: 'Login uses HTTPS so the password is encrypted.' },
              { ar: 'تصميم + سببين.', en: 'A design + two reasons.' },
            ],
            model: { ar: '١) تحميل سجل الدرجات = استرجاع ← GET. إرسال نموذج الدخول = إرسال بيانات ← POST. طلب جدول النهارده من نظام مدرسة تانية = استرجاع ← GET، وفيه __API__ لأنه تبادل بيانات بين برنامجين مختلفين. ٢) HTTPS، لأن كلمة المرور لازم تتشفّر علشان ماتتقريش من طرف تالت. ٣) أنصح بـHTTPS لكل التطبيق، واستخدام الطريقة الصح لكل فعل: أولًا الأمان (البيانات الحساسة مشفّرة)، وثانيًا التنظيم (الخادم يفهم المطلوب من الطريقة، والبيانات من الأنظمة التانية توصل بصيغة JSON واضحة).', en: '1) Loading the grade history = retrieving → GET. Submitting the login form = sending data → POST. Requesting today’s schedule from another school system = retrieving → GET, and an __API__ is involved because two different programs exchange data. 2) HTTPS, because the password must be encrypted so no third party can read it. 3) I recommend HTTPS for the whole app and the right method for each action: first, security (sensitive data is encrypted); second, clarity (the server knows what is wanted from the method, and data from other systems arrives in clear JSON).' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'خدمة طقس بتقدّم API بيرجّع توقعات النهارده لما العميل يبعت طلب. سمِّ طريقة طلب HTTP اللي العميل هيستخدمها، وليه الخدمة لازم تستخدم HTTPS، وميزة واحدة لاستقبال البيانات بصيغة JSON.', en: 'A weather service offers an API that returns today’s forecast on request. Name the HTTP method the client uses, why the service should use HTTPS, and one advantage of receiving JSON.' },
            points: [{ ar: 'GET (استرجاع).', en: 'GET (retrieve).' }, { ar: 'HTTPS: التشفير يقلّل الاعتراض.', en: 'HTTPS: encryption reduces interception.' }, { ar: 'JSON: صيغة نصية منظمة.', en: 'JSON: easy for humans and computers.' }],
            model: { ar: 'العميل هيستخدم __GET__ لأنه بيسترجع بيانات التوقعات. والخدمة لازم تستخدم __HTTPS__ علشان المحتوى يتشفّر فيقلّ خطر إن طرف تالت يقراه أو يعدّله. وميزة __JSON__ إنه صيغة نصية منظمة بتدعمها لغات وأدوات كتير، فالتطبيق يقدر يعرض الحرارة مثلًا على طول.', en: 'The client uses __GET__ because it retrieves forecast data. The service should use __HTTPS__ so the content is encrypted, reducing the risk of a third party reading or changing it. An advantage of __JSON__ is that it is easy for people to read and computers to process, so the app can show the temperature straight away.' } },
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
            prompt: { ar: 'لو المتصفح استقبل رمز الحالة 404، يقول للمستخدم إيه — والمشكلة عند مين؟', en: 'If a browser receives status code 404, what should it tell the user — and whose side had the problem?' },
            points: [{ ar: 'المورد المطلوب مش موجود.', en: 'The page is not found.' }, { ar: 'المشكلة غالبًا من جهة العميل (عنوان غلط).', en: 'The client’s side (a wrong URL).' }],
            model: { ar: 'يقول له إن __الصفحة المطلوبة مش موجودة__، والمشكلة غالبًا من جهة __العميل__: العنوان اللي اتطلب غلط أو اتشال — مش عطل في الخادم (ده يبقى 500).', en: 'It should tell the user that __the requested page does not exist__; the problem is usually on the __client’s__ side: the requested URL is wrong or removed — not a server failure (that would be 500).' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تأمّل وتحدّى', en: 'Reflect & challenge' },
            prompt: { ar: 'تأمّل: لما صفحة ماتفتحش، أنهي رمز حالة يساعدك أكتر تفهم السبب، وهيقول لك إيه؟ تحدّى: اختار تطبيق بتستخدمه، ووصّف طلب واحد بيبعته والاستجابة اللي بيستناها.', en: 'Reflect: when a page fails to load, which status code helps you most to understand why, and what would it tell you? Challenge: pick an app you use and describe one request it sends and the response it expects.' },
            points: [{ ar: 'رمز + معناه.', en: 'A code + its meaning.' }, { ar: 'طلب + استجابة متوقّعة.', en: 'A request + the expected response.' }],
            model: { ar: 'رمز 500 مفيد لأنه يقول إن المشكلة __عند الخادم__ مش في العنوان، و404 يقول إن العنوان غلط. مثال: تطبيق توصيل أكل لما أفتح المطاعم بيبعت طلب GET لقائمة المطاعم القريبة، ويستنى استجابة 200 فيها البيانات بصيغة JSON (الأسماء والتقييمات) يعرضها.', en: 'Code 500 helps because it says the problem is __on the server__, not in the URL; 404 says the URL is wrong. Example: when I open a food-delivery app it sends a GET request for nearby restaurants and expects a 200 response with the data in JSON (names, ratings) to display.' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '3-2', seconds: 60, items: [
          { text: { ar: 'المتصفح عميل', en: 'A browser is a client' }, answer: true },
          { text: { ar: 'الخادم بيطلب والعميل بيرد', en: 'The server asks, the client replies' }, answer: false },
          { text: { ar: 'HTTPS = HTTP + تشفير', en: 'HTTPS = HTTP + encryption' }, answer: true },
          { text: { ar: 'HTTP بيشفّر المحتوى', en: 'HTTP encrypts the content' }, answer: false },
          { text: { ar: 'GET للاسترجاع', en: 'GET retrieves' }, answer: true },
          { text: { ar: 'GET لإرسال نموذج الدخول', en: 'GET submits the login form' }, answer: false },
          { text: { ar: 'POST لإرسال البيانات', en: 'POST sends data' }, answer: true },
          { text: { ar: '200 = نجاح', en: '200 = success' }, answer: true },
          { text: { ar: '500 = نجاح', en: '500 = success' }, answer: false },
          { text: { ar: '404 = المورد المطلوب مش موجود', en: '404 = page not found' }, answer: true },
          { text: { ar: '500 = خطأ في الخادم', en: '500 = server error' }, answer: true },
          { text: { ar: 'API = تبادل بيانات بين برامج', en: 'API = data exchange between software' }, answer: true },
          { text: { ar: 'API تقنية تشفير', en: 'An API is an encryption technology' }, answer: false },
          { text: { ar: 'JSON صيغة نصية منظمة', en: 'JSON is easy for humans and computers' }, answer: true },
          { text: { ar: 'عنوان https:// يعني HTTPS', en: 'An https:// URL means HTTPS' }, answer: true },
          { text: { ar: 'عرض نتايج البحث بـ POST', en: 'Search results are shown with POST' }, answer: false },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 3-2', en: 'Lesson 3-2 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. أنهي طريقة طلب HTTP بتبعت بيانات تسجيل الدخول؟', en: '1. Which HTTP method sends login data?' }, options: [{ ar: 'طريقة GET', en: 'The GET method' }, { ar: 'طريقة POST', en: 'The POST method' }, { ar: 'رمز الحالة 200', en: 'Status code 200' }, { ar: 'واجهة API', en: 'An API interface' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. رمز الحالة 404 معناه؟', en: '2. Status code 404 means?' }, options: [{ ar: 'نجاح والطلب اتعالج كويس', en: 'Success, request processed' }, { ar: 'المورد المطلوب مش موجود', en: 'Page not found' }, { ar: 'خطأ حصل في الخادم نفسه', en: 'An error on the server itself' }, { ar: 'إعادة توجيه لصفحة تانية', en: 'Redirect to another page' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. إيه الوصف الأنسب لـ API؟', en: '3. Best description of an API?' }, options: [{ ar: 'تقنية لضبط مظهر وألوان الصفحات', en: 'A technology for page looks and colours' }, { ar: 'نظام لتبادل البيانات بين برامج', en: 'A system for data exchange between software' }, { ar: 'تقنية لتشفير البيانات في السكة', en: 'A technology encrypting data on the way' }, { ar: 'رمز حالة بيرجّعه الخادم للمتصفح', en: 'A status code the server sends back' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. HTTPS بيضيف تشفير TLS لـ HTTP.', en: '4. HTTPS adds TLS encryption to HTTP.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. طريقة GET بتستخدم لإرسال البيانات للخادم.', en: '5. GET is used to send data to the server.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. صيغة JSON نصية ومقروءة وبتدعمها لغات كتير.', en: '6. JSON is easy for humans and computers.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. اشرح دور العميل والخادم في تطبيق الويب.', en: '7. Explain the roles of the client and the server in a web app.' },
          points: [{ ar: 'العميل يطلب بيانات/معالجة (متصفح، تطبيق).', en: 'The client requests data/processing (browser, app).' }, { ar: 'الخادم يستقبل ويعالج ويرجّع استجابة.', en: 'The server receives, processes and returns a response.' }],
          model: { ar: 'العميل — زي المتصفح أو تطبيق الموبايل — هو الجانب اللي بيطلب البيانات أو المعالجة. والخادم هو اللي بيستقبل الطلب ويعالجه ويرجّع استجابة. تطبيق الويب بيشتغل بالتبادل ده: طلب من العميل واستجابة من الخادم.', en: 'The client — such as a browser or mobile app — is the side that requests data or processing. The server receives the request, processes it and returns a response. A web app works through this exchange: a request from the client and a response from the server.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. إيه الفرق بين GET و POST؟ اذكر مثال لكل واحدة.', en: '8. What is the difference between GET and POST? Give an example of each.' },
          points: [{ ar: 'GET استرجاع (عرض صفحة/نتايج بحث).', en: 'GET retrieves (page/search results).' }, { ar: 'POST إرسال (تسجيل دخول/نموذج).', en: 'POST sends (login/form).' }],
          model: { ar: 'GET بتسترجع بيانات من الخادم، زي عرض صفحة ويب أو نتايج بحث. POST بتبعت بيانات للخادم عشان يعالجها، زي إرسال بيانات تسجيل الدخول أو محتويات نموذج.', en: 'GET retrieves data from the server, such as displaying a page or search results. POST sends data to the server to process, such as login details or form contents.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. يعني إيه 200 و 404 و 500؟ وأنهي خطأ العميل وأنهي خطأ الخادم؟', en: '9. What do 200, 404 and 500 mean? Which is the client’s error and which the server’s?' },
          points: [{ ar: '200 نجاح · 404 المورد مش موجود · 500 خطأ الخادم.', en: '200 success · 404 not found · 500 server error.' }, { ar: '404 خطأ العميل · 500 خطأ الخادم.', en: '404 client’s error · 500 server’s error.' }],
          model: { ar: '200 = الطلب اتعالج بنجاح. 404 = المورد المطلوب مش موجود بالعنوان ده — وغالبًا من جهة العميل. 500 = خطأ داخلي في الخادم منعه يكمّل الطلب.', en: '200 = the request was processed successfully. 404 = page not found because the URL is wrong — the client’s side. 500 = a problem occurred on the server — the server’s side.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. إيه دور API و JSON في تبادل البيانات بين الأمامية والخلفية؟', en: '10. What do an API and JSON do in data exchange between frontend and backend?' },
          points: [{ ar: 'الأمامية تطلب البيانات من الخلفية عبر API.', en: 'The frontend requests data from the backend through an API.' }, { ar: 'البيانات بترجع غالبًا JSON سهل للطرفين.', en: 'The data usually returns as JSON, easy for both.' }],
          model: { ar: 'الـAPI نظام لتبادل البيانات بين برامج مختلفة، فالأمامية بتبعت طلباتها للخلفية عن طريقه وتستقبل البيانات. والبيانات دي غالبًا بصيغة JSON، وهي نصية ومقروءة وبتدعمها لغات كتير.', en: 'An API is a system for exchanging data between different software, so the frontend sends its requests to the backend through it and receives data. That data is usually JSON, which is easy for people to read and for computers to process.' } } },
      ],
    },
  ],
});
