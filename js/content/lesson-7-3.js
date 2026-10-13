/* =========================================================
 * content/lesson-7-3.js — نماذج اللغة الكبيرة والذكاء التوليدي
 * Pure data. Sources: textbook part 2, 7-3 (EN p.77–85) + memo (Arabic
 * wording, deep dive, "comes up in the exam", lesson test + answer key).
 * ========================================================= */
RV.lessons.add('7-3', {
  id: '7-3',
  color: '#a855f7',
  cover: 'img/ml-l3-cover.webp',
  title: { ar: 'نماذج اللغة الكبيرة (LLM) والذكاء التوليدي', en: 'Large Language Models (LLM) and Generative AI' },
  guiding: { ar: 'نموذج اللغة بيولّد النص إزاي، ويعني إيه «كبير»، وليه ممكن يغلط في الحقايق برضه؟', en: 'How does a language model generate text, what makes a model "large", and why can it still get facts wrong?' },
  hook: {
    ar: 'لما روبوت محادثة يكتب فقرة سلسة، هو __مش بيدوّر على إجابة__ — هو __بيخمّن الكلمة الجاية__، وبعدين اللي بعدها، بأنماط اتعلّمها من كميات هائلة من النصوص. الحيلة البسيطة دي، لما تتكبّر لـ__مليارات المعلمات__، بتدّي **نماذج اللغة الكبيرة** قدرتها على الترجمة والتلخيص والمحادثة. بس لأن كل كلمة __بتتختار عشان محتملة إحصائيًا مش عشان أكيد صح__، النماذج دي ممكن __تقول معلومة غلط بثقة__ — عيب اسمه **الهلوسة**.',
    en: 'When a chatbot writes a smooth paragraph, it is __not looking up an answer__ — it is __guessing the next word__, then the next, using patterns learned from vast amounts of text. That simple trick, scaled to __billions of parameters__, gives **large language models** their power to translate, summarize and converse. But because each word is chosen __for being statistically likely, not certainly true__, these models can __state wrong information confidently__ — a flaw called **hallucination**.',
  },
  keyFact: { ar: 'نموذج اللغة بيولّد النص __بالتنبّؤ بالكلمة الجاية مرة ورا مرة__ — بيختار المحتمل إحصائيًا مش المؤكد صحّته (سبب __الهلوسة__). النماذج الكبيرة بتكبّر ده ببيانات هائلة و__مليارات لتريليونات المعلمات__، وبتتظبط بـ__RLHF__ عشان تبقى مفيدة، وبتتعامل عن طريق __تعدّد الوسائط__ مع نص وصورة وصوت مع بعض.', en: 'A language model generates text by __predicting the next word again and again__ — choosing the statistically likely, not the surely correct (the cause of __hallucination__). Large models scale this with vast data and __billions to trillions of parameters__, are tuned with __RLHF__ to be helpful, and through __multimodality__ handle text, images and audio together.' },
  concepts: ['language model', 'next-word prediction', 'hallucination', 'large language model (LLM)', 'parameters', 'RLHF', 'multimodality', 'modality'],
  objectives: [
    { ar: 'أشرح إزاي نموذج اللغة بيولّد نص بالتنبّؤ بالكلمة الجاية، وليه ده بيسبّب الهلوسة.', en: 'Explain how a language model generates text by predicting the next word, and why this causes hallucination.' },
    { ar: 'أوصف إيه اللي بيخلّي نموذج اللغة «كبير»، وأشرح دور الضبط بـ RLHF وتعدّد الوسائط.', en: 'Describe what makes a language model large, and explain the roles of RLHF tuning and multimodality.' },
  ],

  stations: [
    /* ───────────── 1 · generation, hallucination, scale ───────────── */
    {
      id: 'generate', kind: 'learn',
      title: { ar: 'الكلمة الجاية… الهلوسة… ويعني إيه كبير', en: 'The next word… hallucination… and what "large" means' },
      steps: [
        { type: 'intro' },
        {
          type: 'quiz', optional: true,
          q: { widget: 'poll', prompt: { ar: 'لما تسأل روبوت محادثة سؤال… تفتكر بيعمل إيه؟', en: 'When you ask a chatbot a question… what do you think it does?' },
            options: [
              { emoji: '🔎', text: { ar: 'بيدوّر على الإجابة في قاعدة بيانات', en: 'Looks the answer up in a database' } },
              { emoji: '🔮', text: { ar: 'بيخمّن الكلمة الجاية كلمة كلمة', en: 'Guesses the next word, one at a time' } },
              { emoji: '🧠', text: { ar: 'بيفهم ويفكّر زي الإنسان بالظبط', en: 'Understands and thinks exactly like a person' } },
            ],
            after: { ar: 'التاني هو الصح… ومن هنا بييجي غلطه 👇', en: 'The second is right… and that is where its mistakes come from 👇' } },
        },
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: كلمة… ورا كلمة… ورا كلمة', en: '🎞️ Animation: word… after word… after word' },
          enTitle: 'Language models and hallucination',
          terms: ['language model', 'next-word prediction', 'hallucination', 'large language model (LLM)', 'parameters'],
          visual: { anim: 'llmMovie', props: { scenes: [0, 2] } },
          beats: [
            { ar: '🔮 **نموذج اللغة:** نموذج __بيتعلّم من نصوص كتير ويتنبّأ أنهي كلمة غالبًا هتيجي بعد كده__ في الجملة، وبالتدريب بيكتسب أنماط استخدام الكلمات والصياغة حسب السياق. **توليد النص** = __تكرار التنبّؤ بالكلمة الجاية__: «طقس اليوم» ← «مشمس» ← «و» ← «دافئ». لكل كلمة مرشّحة بيحسب __احتمال إنها تيجي بعد كده__ ويختار حسب الاحتمال — والاحتمالات جاية من الأنماط اللي اتعلّمها، فيقدر يتعامل حتى مع __صياغات ماظهرتش حرفيًا__ في بيانات التدريب.', en: '🔮 **A language model:** a model that __learns from lots of text and predicts which word is likely to come next__ in a sentence; training gives it patterns of word use and phrasing by context. **Text generation** = __repeating next-word prediction__: "Today’s weather is" → "sunny" → "and" → "warm". For each candidate word it computes __the probability of coming next__ and picks by that probability — learned from patterns, so it can handle even __wording that never appeared verbatim__ in its training data.' },
            { ar: '🌀 **الهلوسة:** اللي النموذج بيختاره __مش الكلمة الصحيحة، لكن الكلمة المحتملة إحصائيًا__ — وعشان كده ممكن يرجّع __ردود مخالفة للحقيقة بس متصاغة بشكل مقنع__. مثال: «مسجد أحمد بن طولون اتبنى إمتى؟» — لو التاريخ الدقيق مش منتشر كفاية في بيانات التدريب، النموذج __مش بالضرورة يقول «مش عارف»__؛ ممكن يختار تاريخ شكله معقول __بثقة كاملة__. الحماية: اعتبر __كل تاريخ واسم ورقم__ ادعاء محتاج __تحقّق__.', en: '🌀 **Hallucination:** what the model picks is __not the correct word but the statistically likely one__ — so it can return __replies that differ from the facts yet are phrased convincingly__. Example: "When was the Mosque of Ibn Tulun built?" — if the exact date is not common enough in its training data, the model does __not necessarily say "I don’t know"__; it may pick a plausible-looking date __with full confidence__. Protection: treat __every date, name and number__ as a claim that needs __checking__.' },
            { ar: '🏔️ **نموذج اللغة الكبير (LLM):** نموذج لغة مبني على __شبكة عصبية ضخمة جدًا__، متدرّب على __كميات هائلة من نصوص الإنترنت__. «كبير» = حاجتين: 📚 __كمية بيانات التدريب__ (مليارات لتريليونات كلمة أو Tokens) و⚙️ __عدد المعلمات__ (قيم الأوزان — مليارات لتريليونات). ✨ لما الحجم يعدّي مقياس معيّن، __بتظهر قدرات جديدة نوعيًا__: استدلال معقّد، تلخيص، ترجمة، توليد كود. ومن الخدمات المبنية عليه: __ChatGPT وClaude وGemini__.', en: '🏔️ **A large language model (LLM):** a language model built on __a very large neural network__, trained on __vast amounts of Internet text__. "Large" = two things: 📚 __the amount of training data__ (billions to trillions of words or tokens) and ⚙️ __the number of parameters__ (the weights — billions to trillions). ✨ Past a certain scale, __qualitatively new abilities appear__: complex reasoning, summarizing, translation, generating code. Services built on it include __ChatGPT, Claude and Gemini__.' },
          ],
          notes: [{ kind: 'tip', text: { ar: 'كل «التالي» = مشهد واحد بيتحرك وبعدين يقف عشان تشرح. زرار ⟲ فوق بيعيد المشهد.', en: 'Each "Next" = one scene that plays, then freezes so you can explain. The ⟲ button replays the scene.' } }],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'mcq', prompt: { ar: 'ليه نموذج اللغة ممكن يقول تاريخ غلط بثقة كاملة؟', en: 'Why can a language model state a wrong date with full confidence?' },
            options: [
              { ar: 'لأنه بيختار الكلمة المحتملة إحصائيًا مش المؤكد صحّتها', en: 'It picks the statistically likely word, not the surely true one' },
              { ar: 'لأنه بيرجّع جمل من بيانات التدريب زي ما هي بالحرف دايمًا', en: 'It always returns sentences from its training data word for word' },
              { ar: 'لأنه مبني يرجّع ردود قايمة على الحقايق بس من غير أي تخمين', en: 'It is built to return only fact-based replies with no guessing' },
              { ar: 'لأنه بيتجنّب الإجابة وبيرجّع نص مالوش علاقة بالسؤال', en: 'It avoids answering and returns text unrelated to the question' },
            ],
            answer: 0,
            explain: { ar: 'المحتمل ≠ الصحيح ← __هلوسة__.', en: 'Likely ≠ correct → __hallucination__.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'tf', items: [
            { text: { ar: 'نموذج اللغة بيولّد النص بتكرار التنبّؤ بالكلمة الجاية.', en: 'A language model generates text by repeatedly predicting the next word.' }, answer: true },
            { text: { ar: '«كبير» في LLM معناها عدد المعلمات بس.', en: '"Large" in LLM means only the number of parameters.' }, answer: false, explain: { ar: 'البيانات __و__ المعلمات — الاتنين.', en: 'Data __and__ parameters — both.' } },
            { text: { ar: 'بعد حجم معيّن ممكن تظهر قدرات جديدة زي الترجمة وتوليد الكود.', en: 'Past a certain scale new abilities such as translation and code can appear.' }, answer: true },
          ] },
        },
        {
          type: 'summary',
          points: [
            { ar: '**نموذج اللغة:** يتنبّأ بالكلمة الجاية ويكرّر ← نص كامل.', en: '**Language model:** predicts the next word and repeats → full text.' },
            { ar: '**الهلوسة:** بيختار المحتمل مش الصح ← اتحقّق من التواريخ والأسماء والأرقام.', en: '**Hallucination:** it picks the likely, not the true → verify dates, names, numbers.' },
            { ar: '**LLM:** بيانات هائلة + مليارات لتريليونات المعلمات ← قدرات جديدة.', en: '**LLM:** vast data + billions to trillions of parameters → new abilities.' },
          ],
        },
      ],
    },

    /* ───────────── 2 · RLHF + multimodality ───────────── */
    {
      id: 'tune', kind: 'learn',
      title: { ar: 'RLHF وتعدّد الوسائط والاستخدام الآمن', en: 'RLHF, multimodality and safe use' },
      steps: [
        {
          type: 'scene', wide: true,
          title: { ar: '🎞️ الأنيميشن: تقييم بشري… ونموذج بكذا وسيط', en: '🎞️ Animation: human ratings… and a many-modality model' },
          enTitle: 'RLHF and multimodality',
          terms: ['RLHF', 'multimodality', 'modality'],
          visual: { anim: 'llmMovie', props: { scenes: [3, 7] } },
          beats: [
            { ar: '👍 التعلّم من نصوص هائلة لوحده __مايضمنش ردود مرغوبة__: ممكن يجاوب من غير ما يفهم قصد السؤال أو يرجّع محتوى غير مناسب. الحل المشهور **RLHF** (التعلّم المعزَّز من التغذية الراجعة البشرية) — تطبيق للتعلّم المعزَّز في ضبط نماذج اللغة: ① __تدريب أولي__ (يتعلّم استخدام اللغة من نصوص كتير) ← ② __تقييم بشري__ (البشر يقيّموا الردود: «أنهي رد أحسن؟») ← ③ __ضبط بالتعلّم المعزَّز__ (التقييمات البشرية = __مكافأة__ تظبط النموذج نحو ردود أحسن). النتيجة: ردود __طبيعية ومهذّبة، مناسبة لقصد السؤال، وبتتجنّب المحتوى غير المناسب__.', en: '👍 Learning from vast text alone __does not guarantee desirable replies__: it may answer without grasping the question’s intent or return inappropriate content. The standard fix is **RLHF** (Reinforcement Learning from Human Feedback) — reinforcement learning applied to tuning language models: ① __initial training__ (learns language use from lots of text) → ② __human evaluation__ (people rate replies: "which is better?") → ③ __tuning by RL__ (the human ratings = a __reward__ steering the model to better replies). The result: replies that are __natural and polite, fit the question’s intent, and avoid inappropriate content__.' },
            { ar: '⚖️ **RLHF بيصلّح إيه ومابيصلّحش إيه؟** ✔ بيحسّن __إتباع التعليمات والأسلوب وجزء من الأمان__ (أدب، ملاءمة، تجنّب الضار) · ✘ __مابيضمنش الحقيقة ولا الأمان الكامل__ — لأن ده معتمد كمان على جودة المقيّمين البشر والتدريب الأولي وتصميم النظام والتقييم المستمر. 📏 ونموذج __أكبر__ = __أطلق في الكلام، مش بالضرورة أصدق__: لسه بيختار الأرجح إحصائيًا مش الأصح.', en: '⚖️ **What RLHF fixes and does not:** ✔ it improves __following instructions, tone and some safety__ (politeness, appropriateness, avoiding harm) · ✘ it __does not guarantee truth or complete safety__ — that also depends on the quality of human raters, pre-training, system design and ongoing evaluation. 📏 And a __bigger__ model is __more fluent, not necessarily more truthful__: it still picks the statistically likeliest, not the most correct.' },
            { ar: '🎛️ **تعدّد الوسائط:** خاصية إن __نموذج واحد يتعامل مع أنواع بيانات متعدّدة__: نص وصورة وصوت وفيديو — وكل نوع بيانات اسمه **وسيط**. أوائل نماذج اللغة كانت نص بس؛ دلوقتي: __تبص على صورة وتوصفها نصًا__، __تسمع صوت وتفرّغه نص__، __تدّيها تعليمات نصية تولّد صورة__، __تلخّص فيديو__. السر: الشبكات بقت __تحوّل كل الأنواع لتمثيل عددي موحّد__ — جوّه الشبكة النص والصورة والصوت كلهم __مجموعات أرقام__ بتتعالج بنفس الطريقة.', en: '🎛️ **Multimodality:** the ability of __one model to handle multiple kinds of data__: text, images, audio and video — each kind of data is a **modality**. Early language models handled text only; now they __look at an image and describe it in text__, __listen to audio and transcribe it__, __take text instructions and generate an image__, __summarize a video__. The secret: networks now __convert every kind into a unified numeric representation__ — inside the network text, images and audio are all __sets of numbers__ processed the same way.' },
            { ar: '🛡️ **استخدمه بأمان:** لو نادي المدرسة هيكتب مقالات تاريخ المنطقة بروبوت محادثة: ✔ بيوفّر جهد في __المسودة والتنظيم والصياغة__ · ✘ ماتثقش في ناتجه زي ما هو في __التواريخ والأسماء والأرقام__ (ممكن يخترع اسم مدرّس محلي بثقة). القاعدة: __كل تاريخ واسم ورقم يتراجع من مصدر موثوق قبل النشر__، و__إنسان يراجع المقال__. الطلاقة __مش__ الصدق.', en: '🛡️ **Use it safely:** if the school club writes local-history articles with a chatbot: ✔ it saves effort in __drafting, organizing and wording__ · ✘ do not trust its output as-is for __dates, names and numbers__ (it may confidently invent a local teacher’s name). The rule: __check every date, name and number against a reliable source before publishing__, and __a person reviews the article__. Fluency is __not__ truth.' },
            { ar: '📌 **الخلاصة:** بيتنبّأ بالكلمة المحتملة (مش دايمًا الصح ← هلوسة) · LLM = بيانات هائلة + مليارات لتريليونات المعلمات · RLHF بيظبطه بتقييم بشري كمكافأة (أسلوب، مش حقيقة مضمونة) · تعدّد الوسائط بيوحّد نص وصورة وصوت — و__اتحقّق دايمًا__.', en: '📌 **The point:** it predicts the likely word (not always true → hallucination) · LLM = vast data + billions to trillions of parameters · RLHF tunes it with human ratings as reward (style, not guaranteed truth) · multimodality unifies text, image and audio — and __always verify__.' },
          ],
          notes: [
            { kind: 'exam', text: { ar: '«نموذج اللغة بيرجّع نفس جمل التدريب دايمًا» ← __غلط__ · «RLHF بيخلّي الذكاء يقول الحقيقة دايمًا» ← __غلط__ · «تعدّد الوسائط = نص بس» ← __غلط__. سبب الهلوسة: __اختيار المحتمل مش المؤكد__ · ترتيب RLHF: __تدريب أولي ← تقييم بشري ← ضبط معزَّز__ · «كبير» = __البيانات والمعلمات__ مع بعض.', en: '"A language model always returns training sentences" → __false__ · "RLHF makes AI always tell the truth" → __false__ · "multimodality = text only" → __false__. Cause of hallucination: __choosing the likely, not the certain__ · RLHF order: __initial training → human evaluation → RL tuning__ · "large" = __data AND parameters__.' } },
            { kind: 'fact', title: { ar: 'اشرحلي بالتفصيل — «معقول» مش «صحيح»', en: 'Deep dive — "plausible" is not "correct"' }, text: { ar: 'ليه الحجم لوحده مابيصلّحش الهلوسة؟ النموذج الأكبر أطلق، بس لسه بيختار الأرجح إحصائيًا مش الأصح واقعيًا. وRLHF بيحسّن إتباع التعليمات والأسلوب وجزء من الأمان، بس مابيضمنش الحقيقة. إزاي تحمي نفسك؟ اعتبر كل تاريخ واسم ورقم بيذكره النموذج __ادعاء محتاج تحقّق__ — خصوصًا التفاصيل الدقيقة، مش الأسلوب أو التنظيم العام.', en: 'Why does size alone not fix hallucination? A bigger model is more fluent but still picks the statistically likeliest, not the factually correct. RLHF improves instructions, tone and some safety, but does not guarantee truth. How to protect yourself? Treat every date, name and number the model states as __a claim needing verification__ — especially fine details, not the style or overall organization.' } },
          ],
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (1)', en: '✋ Check yourself (1)' },
          q: { widget: 'order', prompt: { ar: 'رتّب مراحل RLHF:', en: 'Put the stages of RLHF in order:' },
            items: [
              { ar: 'تدريب أولي على نصوص كتير', en: 'Initial training on lots of text' },
              { ar: 'البشر يقيّموا ردود النموذج', en: 'Humans rate the model’s replies' },
              { ar: 'ضبط بالتعلّم المعزَّز بالتقييمات كمكافأة', en: 'RL tuning with the ratings as reward' },
            ],
            explain: { ar: 'تدريب ← تقييم ← ضبط.', en: 'Train → evaluate → tune.' } },
        },
        {
          type: 'quiz', title: { ar: '✋ اختبر فهمك (2)', en: '✋ Check yourself (2)' },
          q: { widget: 'classify', prompt: { ar: 'كل استخدام: محتاج تعدّد وسائط ولا نص بس كفاية؟', en: 'Does each use need multimodality, or is text alone enough?' },
            groups: [{ icon: 'layers', label: { ar: 'تعدّد وسائط', en: 'Multimodal' } }, { icon: 'mail', label: { ar: 'نص بس', en: 'Text only' } }],
            items: [
              { text: { ar: 'يوصف صورة نصًا', en: 'Describe an image in text' }, group: 0 },
              { text: { ar: 'يلخّص مقال مكتوب', en: 'Summarize a written article' }, group: 1 },
              { text: { ar: 'يفرّغ تسجيل صوتي لنص', en: 'Transcribe an audio recording' }, group: 0 },
              { text: { ar: 'يولّد صورة من تعليمات نصية', en: 'Generate an image from text instructions' }, group: 0 },
              { text: { ar: 'يترجم فقرة من عربي لإنجليزي', en: 'Translate a paragraph Arabic → English' }, group: 1 },
            ],
            explain: { ar: 'أكتر من نوع بيانات = تعدّد وسائط.', en: 'More than one kind of data = multimodal.' } },
        },
        {
          type: 'summary',
          points: [
            { ar: '**RLHF:** تدريب أولي ← تقييم بشري ← ضبط معزَّز (التقييم = مكافأة).', en: '**RLHF:** initial training → human evaluation → RL tuning (rating = reward).' },
            { ar: 'بيحسّن **الأسلوب والتعليمات وجزء من الأمان** — **مش** بيضمن الحقيقة.', en: 'Improves **style, instructions and some safety** — does **not** guarantee truth.' },
            { ar: '**تعدّد الوسائط:** نموذج واحد لنص وصورة وصوت وفيديو (كله أرقام جوّه) · اتحقّق دايمًا.', en: '**Multimodality:** one model for text, image, audio, video (all numbers inside) · always verify.' },
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
            { text: { ar: 'A) نموذج اللغة بيتنبّأ أنهي كلمة غالبًا هتيجي بعد كده في الجملة.', en: 'A) A language model predicts which word is likely to come next in a sentence.' }, answer: true },
            { text: { ar: 'B) نموذج اللغة بيخلص بعد ما يتنبّأ بكلمة واحدة ومابيولّدش نص.', en: 'B) A language model stops after predicting one word and does not generate text.' }, answer: false },
            { text: { ar: 'C) في LLM لما المعلمات أو البيانات تعدّي مقياس معيّن ممكن تظهر قدرات جديدة.', en: 'C) In an LLM, past a certain scale of parameters or data, new abilities may appear.' }, answer: true },
            { text: { ar: 'D) تعدّد الوسائط خاصية التعامل مع النص بس.', en: 'D) Multimodality is the ability to handle text only.' }, answer: false },
          ] },
          solution: [
            { ar: 'A) تعريف نموذج اللغة ← **✓**.', en: 'A) The definition of a language model → **✓**.' },
            { ar: 'B) التوليد بـ__تكرار__ التنبّؤ ← **✗**.', en: 'B) Generation __repeats__ the prediction → **✗**.' },
            { ar: 'C) قدرات جديدة نوعيًا ← **✓**.', en: 'C) Qualitatively new abilities → **✓**.' },
            { ar: 'D) نص وصورة وصوت وفيديو… ← **✗**.', en: 'D) Text, image, audio, video… → **✗**.' },
          ],
        },
        {
          type: 'example',
          q: { widget: 'match', prompt: { ar: '(2) وافِق كل وصف (a–c) بالمصطلح (A–C):', en: '(2) Match each description (a–c) with the term (A–C):' },
            left: [
              { ar: 'a) نموذج لغة على شبكة ضخمة جدًا متدرّب على نصوص إنترنت هائلة', en: 'a) A language model on a huge network trained on vast Internet text' },
              { ar: 'b) طريقة بتستخدم التقييم البشري كمكافأة لضبط النموذج', en: 'b) A method using human feedback as reward to tune the model' },
              { ar: 'c) ردود مخالفة للحقيقة بشكل مقنع', en: 'c) Replies that differ from the facts in a plausible way' },
            ],
            right: [{ ar: 'A الهلوسة', en: 'A Hallucination' }, { ar: 'B نموذج اللغة الكبير', en: 'B Large language model' }, { ar: 'C RLHF', en: 'C RLHF' }],
            answer: [1, 2, 0] },
          solution: [
            { ar: 'a: شبكة ضخمة = **LLM** ← B.', en: 'a: a huge network = **LLM** → B.' },
            { ar: 'b: تقييم بشري كمكافأة = **RLHF** ← C.', en: 'b: human feedback as reward = **RLHF** → C.' },
            { ar: 'c: مقنع بس غلط = **الهلوسة** ← A.', en: 'c: plausible but wrong = **hallucination** → A.' },
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
            { q: { ar: '1. النموذج اللي بيتعلّم من نصوص كتير ويتنبّأ بالكلمة الجاية؟', en: '1. The model that learns from lots of text and predicts the next word?' }, a: { ar: 'نموذج اللغة', en: 'Language model' } },
            { q: { ar: '2. نموذج لغة على شبكة ضخمة جدًا متدرّب على نصوص إنترنت هائلة؟', en: '2. A language model on a huge network trained on vast Internet text?' }, a: { ar: 'نموذج اللغة الكبير (LLM)', en: 'Large language model (LLM)' } },
            { q: { ar: '3. طريقة بتستخدم التقييم البشري كمكافأة عشان النموذج يرجّع ردود أحسن؟', en: '3. The method using human feedback as reward for better replies?' }, a: { ar: 'RLHF', en: 'RLHF' } },
            { q: { ar: '4. خاصية التعامل مع نص وصورة وصوت وفيديو بنموذج واحد؟', en: '4. Handling text, image, audio and video with one model?' }, a: { ar: 'تعدّد الوسائط', en: 'Multimodality' } },
          ] },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (1)', en: 'Try 2 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف عمل نموذج اللغة:', en: 'Choose the best description of how a language model works:' },
            options: [
              { ar: 'A بيحفظ الجملة المدخلة ويرجّعها زي ما هي بالظبط', en: 'A Stores the input sentence and returns it exactly' },
              { ar: 'B بيولّد النص بتكرار التنبّؤ بالكلمة الجاية', en: 'B Generates text by repeatedly predicting the next word' },
              { ar: 'C بيختار الأقرب من قوالب جمل متجهّزة قبل كده', en: 'C Picks the closest of some pre-prepared template sentences' },
              { ar: 'D بيفهم المعنى كامل ويرجّع الرد الصح الوحيد', en: 'D Fully understands and returns the one correct reply' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B صح.', en: 'B is right.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (2)', en: 'Try 2 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف سبب الهلوسة:', en: 'Choose the best description of the cause of hallucination:' },
            options: [
              { ar: 'A لأنه دايمًا بيرجّع جمل التدريب زي ما هي', en: 'A It always returns training sentences unchanged' },
              { ar: 'B لأنه بيختار كلمات محتملة إحصائيًا مش أكيد صح', en: 'B It picks statistically likely words, not surely true ones' },
              { ar: 'C لأنه بيتجنّب الإجابة ويرجّع نص مالوش علاقة', en: 'C It avoids answering and returns unrelated text' },
              { ar: 'D لأنه مبني يرجّع ردود قايمة على الحقايق بس', en: 'D It is built to return only fact-based replies' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B صح.', en: 'B is right.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (3)', en: 'Try 2 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف RLHF:', en: 'Choose the best description of RLHF:' },
            options: [
              { ar: 'A طريقة لبناء نموذج لغة من الصفر بنصوص كتير', en: 'A A way to build a language model from scratch with text' },
              { ar: 'B ضبط النموذج لردود أحسن بتقييمات بشرية كمكافأة', en: 'B Tuning the model with human ratings as a reward' },
              { ar: 'C بتشيل بنية الشبكة العصبية وتبسّط المعالجة', en: 'C Removing the network structure to simplify processing' },
              { ar: 'D بتخلّيه يحلّ مسائل رياضة عشان دقة الحساب', en: 'D Making it solve maths problems to improve arithmetic' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B صح.', en: 'B is right.' } },
        },
        {
          type: 'quiz', title: { ar: 'تمرين 2 (4)', en: 'Try 2 (4)' },
          q: { widget: 'mcq', prompt: { ar: 'أنهي واحدة __مش__ تطبيق مناسب للذكاء متعدّد الوسائط؟', en: 'Which is __not__ a suitable application of multimodal AI?' },
            options: [
              { ar: 'A تعرض صورة ويوصفها نصًا', en: 'A Show an image and describe it in text' },
              { ar: 'B يسمع صوت ويفرّغه نص', en: 'B Listen to speech and transcribe it' },
              { ar: 'C تدّيله تعليمات نصية يولّد صورة', en: 'C Give text instructions to generate an image' },
              { ar: 'D يحسب أرقام بالعمليات الأربعة بس', en: 'D Compute numbers by the four operations only' },
            ],
            fixedOrder: true, answer: 3,
            explain: { ar: 'D حساب عادي مش متعدّد وسائط.', en: 'D is plain arithmetic, not multimodal.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 2 — املأ الفراغات', en: 'Exercise 2 — fill the blanks' },
          q: { widget: 'fill', prompt: { ar: 'اقرا الفقرة واملأ الفراغات (a)–(f):', en: 'Read and fill blanks (a)–(f):' },
            text: { ar: 'النموذج اللي بيتنبّأ بالكلمة الجاية اسمه {0}، والتوليد بيحصل بتكرار التنبّؤ بـ{1}. والنموذج على شبكة ضخمة جدًا متدرّب على نصوص إنترنت هائلة اسمه {2}؛ ولما عدد {3} أو البيانات يعدّي مقياس معيّن بتظهر قدرات جديدة. وعشان الردود تبقى مرغوبة بنستخدم {4} بتقييمات بشرية كمكافأة. وخاصية التعامل مع نص وصورة وصوت بنموذج واحد اسمها {5}.', en: 'The model predicting the next word is a {0}; generation repeats the prediction of {1}. A model on a huge network trained on vast Internet text is a {2}; when the number of {3} or the data passes a certain scale, new abilities appear. To make replies desirable we use {4} with human ratings as reward. Handling text, image and audio with one model is {5}.' },
            bank: [{ ar: 'نموذج اللغة', en: 'language model' }, { ar: 'الكلمة الجاية', en: 'the next word' }, { ar: 'نموذج اللغة الكبير', en: 'large language model' }, { ar: 'المعلمات', en: 'parameters' }, { ar: 'RLHF', en: 'RLHF' }, { ar: 'تعدّد الوسائط', en: 'multimodality' }, { ar: 'الهلوسة', en: 'hallucination' }],
            answer: [0, 1, 2, 3, 4, 5],
            explain: { ar: '(a) نموذج اللغة (b) الكلمة الجاية (c) LLM (d) المعلمات (e) RLHF (f) تعدّد الوسائط.', en: '(a) language model (b) the next word (c) LLM (d) parameters (e) RLHF (f) multimodality.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (1)', en: 'Exercise 3 (1)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الأنسب لوصف آلية توليد النص:', en: 'Choose the best description of the text-generation mechanism:' },
            options: [
              { ar: 'A بنربط نتايج تكرار التنبّؤ بالكلمة الجاية', en: 'A Linking the results of repeated next-word prediction' },
              { ar: 'B بنختار من آلاف القوالب المتجهّزة قبل كده', en: 'B Choosing from thousands of prepared templates' },
              { ar: 'C بنحدّد طول الجملة الأول وبعدين كل الكلمات مرة واحدة', en: 'C Fixing the length first, then all words at once' },
              { ar: 'D بنترجم الجملة المدخلة ترجمة آلية', en: 'D Machine-translating the input sentence' },
            ],
            fixedOrder: true, answer: 0,
            explain: { ar: 'A صح.', en: 'A is right.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (2)', en: 'Exercise 3 (2)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الخلفية الأنسب لاكتساب LLM قدرات جديدة:', en: 'Choose the best background to LLMs gaining new abilities:' },
            options: [
              { ar: 'A تقليل المعلمات تحت مستوى معيّن بسّط المعالجة', en: 'A Cutting parameters below a level simplified processing' },
              { ar: 'B حصر البيانات في كمية صغيرة عالية الجودة', en: 'B Limiting data to a small high-quality amount' },
              { ar: 'C قدرات جديدة بتظهر لما المعلمات أو البيانات تعدّي مقياس', en: 'C New abilities appear past a scale of parameters or data' },
              { ar: 'D البشر كتبوا قواعد اللغة واحدة واحدة وعلّموها له', en: 'D Humans wrote language rules one by one and taught it' },
            ],
            fixedOrder: true, answer: 2,
            explain: { ar: 'C صح.', en: 'C is right.' } },
        },
        {
          type: 'quiz', title: { ar: 'تدريب 3 (3)', en: 'Exercise 3 (3)' },
          q: { widget: 'mcq', prompt: { ar: 'اختار الغرض الأنسب من RLHF:', en: 'Choose the best purpose of RLHF:' },
            options: [
              { ar: 'A يزوّد عدد الكلمات اللي النموذج يتعامل معاها', en: 'A Increase the number of words the model handles' },
              { ar: 'B يخلّي الردود طبيعية ومناسبة لقصد السؤال', en: 'B Make replies natural and fit the question’s intent' },
              { ar: 'C يخلّي النموذج يتعامل مع بيانات غير النص', en: 'C Let the model handle data other than text' },
              { ar: 'D يقلّل عدد المعلمات في حسابات النموذج', en: 'D Reduce the number of parameters in its computing' },
            ],
            fixedOrder: true, answer: 1,
            explain: { ar: 'B صح.', en: 'B is right.' } },
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
          { front: { ar: 'نموذج اللغة', en: 'Language model' }, back: { ar: 'بيتنبّأ بالكلمة المحتملة الجاية ويكرّر.', en: 'Predicts the likely next word and repeats.' } },
          { front: { ar: 'الهلوسة', en: 'Hallucination' }, back: { ar: 'رد مقنع بس مخالف للحقيقة.', en: 'A plausible reply that is factually wrong.' } },
          { front: { ar: 'نموذج اللغة الكبير (LLM)', en: 'Large language model (LLM)' }, back: { ar: 'شبكة ضخمة متدرّبة على نصوص هائلة.', en: 'A huge network trained on vast text.' } },
          { front: { ar: 'المعلمة', en: 'Parameter' }, back: { ar: 'قيمة وزن — LLM فيها مليارات لتريليونات.', en: 'A weight — LLMs have billions to trillions.' } },
          { front: { ar: 'RLHF', en: 'RLHF' }, back: { ar: 'ضبط بتقييم بشري كمكافأة: تدريب ← تقييم ← ضبط.', en: 'Tuning by human feedback as reward: train → rate → tune.' } },
          { front: { ar: 'تعدّد الوسائط / الوسيط', en: 'Multimodality / modality' }, back: { ar: 'نموذج واحد لكذا نوع بيانات / نوع بيانات واحد.', en: 'One model, many data kinds / one data kind.' } },
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
            prompt: { ar: 'اشرح ليه نموذج اللغة ممكن يدّي إجابة سلسة بس غلط في الحقيقة (الهلوسة). (أشِر إلى: اختيار كلمات محتملة إحصائيًا)', en: 'Explain why a language model can produce a fluent answer that is factually wrong (hallucination). (Refer to: choosing statistically likely words)' },
            points: [
              { ar: 'بيولّد بتكرار التنبّؤ بالكلمة الجاية.', en: 'It generates by repeated next-word prediction.' },
              { ar: 'بيختار المحتمل إحصائيًا مش المؤكد صحّته.', en: 'It picks the statistically likely, not the surely true.' },
              { ar: 'الطلاقة ≠ الصدق ← لازم تحقّق.', en: 'Fluency ≠ truth → verification needed.' },
            ],
            model: { ar: 'نموذج اللغة مابيدوّرش على إجابة في مرجع؛ هو بيولّد النص __بتكرار التنبّؤ بالكلمة الجاية__، ولكل كلمة مرشّحة بيحسب احتمال إنها تيجي بعد كده ويختار حسب الاحتمال اللي اتعلّمه من الأنماط. فاللي بيختاره __المحتمل إحصائيًا مش المؤكد صحّته__. لو المعلومة الدقيقة (زي تاريخ بناء مسجد) مش منتشرة كفاية في بيانات التدريب، النموذج مش بالضرورة يقول «مش عارف»؛ هيختار تاريخ شكله معقول ويصيغه بثقة وطلاقة. وده سبب __الهلوسة__: الصياغة مقنعة بس المحتوى غلط — عشان كده الطلاقة مش دليل صدق، ولازم نتحقّق من التواريخ والأسماء والأرقام.', en: 'A language model does not look up an answer in a reference; it generates text by __repeatedly predicting the next word__, computing for each candidate the probability of coming next and choosing by the probabilities it learned from patterns. So what it picks is __statistically likely, not certainly true__. If an exact fact (such as when a mosque was built) is not common enough in its training data, the model does not necessarily say "I don’t know"; it picks a plausible-looking date and phrases it confidently and fluently. That is the cause of __hallucination__: convincing wording, wrong content — so fluency is not evidence of truth, and dates, names and numbers must be checked.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'فكّر كمهندس — مقالات تاريخ المنطقة', en: 'Think as an engineer — local-history articles' },
            prompt: { ar: 'نادي مدرسي عايز يستخدم روبوت محادثة يساعده يكتب مقالات قصيرة عن تاريخ المنطقة لموقع المدرسة. ١) فين بيساعد فعلًا، وفين ماينفعش نثق في ناتجه زي ما هو؟ ٢) باستخدام طريقة اختيار الكلمات، ليه ممكن يذكر تاريخ غلط أو اسم مدرّس مخترع بثقة كاملة؟ وإزاي النادي يمسك الهلوسة قبل النشر؟ ٣) القاعدة لكل مقال قبل النشر، ودور RLHF هنا إيه وإيه اللي مايقدرش يعمله.', en: 'A school club wants a chatbot to help write short local-history articles for the school website. 1) Where does it truly help, and where should its output not be trusted as-is? 2) Using how it picks words, why might it state a wrong date or invented teacher name confidently, and how would the club catch the hallucination before publishing? 3) The rule for every article before publishing, and what RLHF does and cannot do here.' },
            points: [
              { ar: 'بيساعد: مسودة/تنظيم/صياغة · ماتثقش: تواريخ/أسماء/أرقام.', en: 'Helps: drafting/organizing/wording · do not trust: dates/names/numbers.' },
              { ar: 'المحتمل مش الصح ← نراجع كل حقيقة من مصدر.', en: 'Likely, not true → check each fact against a source.' },
              { ar: 'RLHF: أسلوب ومناسبة، مش ضمان حقيقة.', en: 'RLHF: style and fit, not a guarantee of truth.' },
            ],
            model: { ar: '١) بيساعد في __المسودة الأولى وترتيب الأفكار وتحسين الصياغة__، بس ماينفعش نثق في __التواريخ والأسماء والأرقام__ زي ما هي. ٢) لأنه بيختار الكلمة __المحتملة إحصائيًا__؛ لو اسم مدرّس محلي أو تاريخ دقيق مش موجود كفاية في بيانات تدريبه، هيطلّع اسم أو تاريخ «شكله صح» بثقة. النادي يمسك ده بإنه يعلّم على كل تاريخ واسم ورقم في المقال ويراجعه من مصدر موثوق (كتاب، أرشيف المدرسة، شخص عاصر الحدث). ٣) القاعدة: __مفيش مقال يتنشر قبل ما كل حقيقة فيه تتراجع من مصدر وإنسان يوافق عليه__. RLHF بيخلّي ردوده مهذّبة ومناسبة لطلبنا، بس __مابيضمنش إن المعلومة صح__.', en: '1) It helps with __the first draft, ordering ideas and improving wording__, but __dates, names and numbers__ must not be trusted as-is. 2) Because it picks the __statistically likely__ word; if a local teacher’s name or an exact date is not well represented in its training data, it produces a name or date that "looks right", confidently. The club catches this by marking every date, name and number in the article and checking each against a reliable source (a book, the school archive, someone who witnessed the event). 3) The rule: __no article is published until every fact is checked against a source and a person approves it__. RLHF makes its replies polite and on-task, but __does not guarantee the information is true__.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'في سياق جديد', en: 'In a new context' },
            prompt: { ar: 'طالب رفع صورة لنوتة مكتوبة بخط الإيد وطلب من مساعد ذكاء اصطناعي يقراها بصوت عالي وبعدين يلخّصها نصًا. سمِّ الخاصية اللي بتخلّي نموذج واحد ينتقل بين صورة ونص وصوت، واشرح في سطر إزاي الشبكة بتتعامل مع التلاتة.', en: 'A student uploads a photo of handwritten notes and asks an AI assistant to read them aloud and then summarize them in text. Name the property letting one model move between image, text and audio, and explain in one line how the network handles all three.' },
            points: [{ ar: 'تعدّد الوسائط.', en: 'Multimodality.' }, { ar: 'كله بيتحوّل لتمثيل عددي موحّد.', en: 'Everything becomes a unified numeric representation.' }],
            model: { ar: 'دي خاصية __تعدّد الوسائط__. الشبكة بتحوّل الصورة والنص والصوت كلهم لـ__تمثيل عددي موحّد__ (مجموعات أرقام) وتعالجهم بنفس الطريقة جوّاها.', en: 'This is __multimodality__. The network converts the image, text and audio into a __unified numeric representation__ (sets of numbers) and processes them the same way inside.' } },
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
            prompt: { ar: 'آخر مرة استخدمت أداة ذكاء توليدي، اتحقّقت من معلوماتها؟ وكانت تكلفة إجابة غلط واثقة هتبقى إيه؟', en: 'The last time you used a generative-AI tool, did you check its facts? What would a confidently wrong answer have cost?' },
            points: [{ ar: 'موقف حقيقي + تكلفة الغلط.', en: 'A real situation + the cost of an error.' }],
            model: { ar: '(مثال) استخدمته في بحث مدرسي وماراجعتش تاريخ ذكره — لو كان غلط كنت هقدّم معلومة خاطئة للمدرّس وأخسر درجات، وأسوأ من كده أصدّقها وأذاكرها غلط. من دلوقتي هراجع أي تاريخ أو رقم من مصدر.', en: '(Example) I used it for a school project and did not check a date it gave — if wrong, I would have handed in false information and lost marks, and worse, believed and studied it. From now on I will check every date or number against a source.' } },
        },
        {
          type: 'quiz', optional: true,
          q: { widget: 'essay', tag: { ar: 'تحدّى', en: 'Challenge' },
            prompt: { ar: 'زميلك بيقول «RLHF بيخلّي الذكاء الاصطناعي يقول الحقيقة دايمًا». اشرح ليه ده غلط، واذكر RLHF بيحسّن إيه فعلًا.', en: 'A classmate says "RLHF makes AI always tell the truth". Explain why that is wrong, and what RLHF actually improves.' },
            points: [{ ar: 'RLHF بيكافئ الردود اللي البشر بيفضّلوها، مش الصح بالضرورة.', en: 'RLHF rewards replies humans prefer, not necessarily true ones.' }, { ar: 'بيحسّن التعليمات والأسلوب وجزء من الأمان.', en: 'It improves instructions, tone and some safety.' }],
            model: { ar: 'غلط، لأن RLHF بيظبط النموذج بتقييمات بشرية كمكافأة — يعني بيكافئ الردود اللي __شكلها أحسن__ للمقيّمين، والنموذج لسه في الأساس بيختار الكلمة المحتملة إحصائيًا. فممكن يفضل يهلوس. اللي RLHF بيحسّنه فعلًا: __إتباع التعليمات، والأسلوب المهذّب، ومناسبة الرد لقصد السؤال، وجزء من الأمان__ (تجنّب المحتوى الضار).', en: 'Wrong, because RLHF tunes the model with human ratings as a reward — it rewards replies that __look better__ to raters, while the model still fundamentally picks the statistically likely word. So it can still hallucinate. What RLHF actually improves: __following instructions, polite tone, fitting the question’s intent, and some safety__ (avoiding harmful content).' } },
        },
      ],
    },

    /* ───────────── speed round ───────────── */
    {
      id: 'speed', kind: 'game',
      title: { ar: 'تحدّي السرعة ⚡', en: 'Speed round ⚡' },
      steps: [{
        type: 'quiz', optional: true,
        q: { widget: 'speed', id: '7-3', seconds: 60, items: [
          { text: { ar: 'نموذج اللغة بيتنبّأ بالكلمة الجاية', en: 'A language model predicts the next word' }, answer: true },
          { text: { ar: 'بيدوّر على الإجابة في قاعدة بيانات', en: 'It looks answers up in a database' }, answer: false },
          { text: { ar: 'بيختار الكلمة المحتملة إحصائيًا', en: 'It picks the statistically likely word' }, answer: true },
          { text: { ar: 'بيختار دايمًا الكلمة الصح', en: 'It always picks the correct word' }, answer: false },
          { text: { ar: 'الهلوسة = رد مقنع بس غلط', en: 'Hallucination = plausible but wrong' }, answer: true },
          { text: { ar: '«كبير» = البيانات والمعلمات', en: '"Large" = data and parameters' }, answer: true },
          { text: { ar: 'المعلمات = أوزان الشبكة', en: 'Parameters = the network’s weights' }, answer: true },
          { text: { ar: 'نموذج أكبر = أصدق أكيد', en: 'Bigger model = surely more truthful' }, answer: false },
          { text: { ar: 'RLHF = تقييم بشري كمكافأة', en: 'RLHF = human ratings as reward' }, answer: true },
          { text: { ar: 'RLHF بيضمن الحقيقة', en: 'RLHF guarantees truth' }, answer: false },
          { text: { ar: 'RLHF يبدأ بالتقييم البشري', en: 'RLHF starts with human evaluation' }, answer: false },
          { text: { ar: 'تعدّد الوسائط = نص بس', en: 'Multimodality = text only' }, answer: false },
          { text: { ar: 'الوسيط = نوع بيانات واحد', en: 'A modality = one kind of data' }, answer: true },
          { text: { ar: 'جوّه الشبكة كله أرقام', en: 'Inside the network it is all numbers' }, answer: true },
          { text: { ar: 'اتحقّق من التواريخ والأسماء', en: 'Verify dates and names' }, answer: true },
          { text: { ar: 'الطلاقة = الصدق', en: 'Fluency = truth' }, answer: false },
        ] },
      }],
    },

    /* ───────────── lesson test (memo: 10 marks) ───────────── */
    {
      id: 'test', kind: 'test',
      title: { ar: 'امتحان الدرس 7-3', en: 'Lesson 7-3 test' },
      steps: [
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '1. رد مقنع بس مخالف للحقيقة — اسم الظاهرة؟', en: '1. A plausible but factually wrong answer — what is it called?' }, options: [{ ar: 'المعلمة', en: 'Parameter' }, { ar: 'الهلوسة', en: 'Hallucination' }, { ar: 'RLHF', en: 'RLHF' }, { ar: 'الوسيط', en: 'Modality' }], answer: 1 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '2. ضبط نموذج لغة بتقييمات بشرية كمكافأة — أنهي مصطلح؟', en: '2. Tuning a language model by human evaluations as reward — which term?' }, options: [{ ar: 'RLHF', en: 'RLHF' }, { ar: 'تعدّد الوسائط', en: 'Multimodality' }, { ar: 'الهلوسة', en: 'Hallucination' }, { ar: 'التدريب الأولي', en: 'Initial training' }], answer: 0 } },
        { type: 'quiz', q: { widget: 'mcq', prompt: { ar: '3. التعامل مع نص وصورة وصوت بنموذج واحد — اسم الخاصية؟', en: '3. Handling text, image and audio with one model — what property?' }, options: [{ ar: 'تعدّد الوسائط', en: 'Multimodality' }, { ar: 'عدد المعلمات', en: 'Parameter count' }, { ar: 'الهلوسة اللغوية', en: 'Hallucination' }, { ar: 'الضبط بـ RLHF', en: 'RLHF' }], answer: 0 } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '4. نموذج اللغة بيختار الكلمة الصحيحة دايمًا مش المحتملة إحصائيًا بس.', en: '4. A language model always chooses the correct word, not just the likely one.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '5. «كبير» في نموذج اللغة الكبير بيشير لكمية بيانات التدريب وعدد المعلمات.', en: '5. "Large" refers to the amount of training data and the number of parameters.' }, answer: true }] } },
        { type: 'quiz', q: { widget: 'tf', items: [{ text: { ar: '6. RLHF بيضمن إن الردود صح في الحقيقة دايمًا.', en: '6. RLHF guarantees replies are always factually correct.' }, answer: false }] } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '7. اوصف إزاي نموذج اللغة بيولّد جملة كاملة خطوة بخطوة.', en: '7. Describe step by step how a language model generates a full sentence.' },
          points: [{ ar: 'يتنبّأ بالكلمة الجاية ← يضيفها ← يكرّر.', en: 'Predict the next word → append it → repeat.' }, { ar: 'مثال طقس اليوم.', en: 'The weather example.' }],
          model: { ar: 'بياخد الجملة المدخلة («طقس اليوم») ويحسب احتمال كل كلمة مرشّحة تيجي بعدها، ويختار حسب الاحتمال («مشمس»). بيضيف الكلمة للجملة («طقس اليوم مشمس») ويتنبّأ بالجاية («و»)، وبعدين («دافئ») — وهكذا يربط نتايج التنبّؤ كلمة كلمة لحد ما الجملة تكمل: «طقس اليوم مشمس ودافئ».', en: 'It takes the input ("Today’s weather is"), computes the probability of each candidate next word, and picks by probability ("sunny"). It appends the word ("Today’s weather is sunny") and predicts the next ("and"), then ("warm") — chaining predictions word by word until the sentence is complete: "Today’s weather is sunny and warm".' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '8. إيه نوعين «الحجم» اللي بيخلّوا نموذج اللغة «كبير»؟', en: '8. What two kinds of "size" make a language model "large"?' },
          points: [{ ar: 'كمية بيانات التدريب (مليارات لتريليونات كلمة).', en: 'Training data (billions to trillions of words).' }, { ar: 'عدد المعلمات (مليارات لتريليونات).', en: 'Number of parameters (billions to trillions).' }],
          model: { ar: 'الأول: كمية بيانات التدريب — النموذج بيتدرّب على نصوص هائلة فيها مليارات لتريليونات كلمة (Tokens). التاني: عدد المعلمات — القيم العددية المقابلة لأوزان الشبكة العصبية بتتعدّ بالمليارات لحد التريليونات.', en: 'First, the amount of training data — the model is trained on vast text with billions to trillions of words (tokens). Second, the number of parameters — the values corresponding to the network’s weights number in the billions up to trillions.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '9. اذكر مراحل RLHF التلاتة بالترتيب.', en: '9. List the three stages of RLHF in order.' },
          points: [{ ar: 'تدريب أولي ← تقييم بشري ← ضبط بالتعلّم المعزَّز.', en: 'Initial training → human evaluation → RL tuning.' }],
          model: { ar: '① تدريب أولي: نبني نموذج لغة اتعلّم استخدام اللغة من نصوص كتير. ② تقييم بشري: البشر يقيّموا ردود النموذج (أنهي رد أحسن؟). ③ ضبط بالتعلّم المعزَّز: التقييمات البشرية بتستخدم كمكافأة عشان النموذج يتظبط نحو ردود مرغوبة أكتر.', en: '① Initial training: build a language model that learned language use from lots of text. ② Human evaluation: people rate the model’s replies (which is better?). ③ Tuning by RL: the human ratings are used as a reward to steer the model toward more desirable replies.' } } },
        { type: 'quiz', q: { widget: 'essay', prompt: { ar: '10. إيه تعدّد الوسائط؟ اضرب مثال بيجمع نوعين بيانات.', en: '10. What is multimodality? Give an example combining two kinds of data.' },
          points: [{ ar: 'نموذج واحد لكذا نوع بيانات.', en: 'One model for several kinds of data.' }, { ar: 'مثال: صورة ← وصف نصي.', en: 'Example: image → text description.' }],
          model: { ar: 'تعدّد الوسائط خاصية التعامل مع أنواع بيانات متعدّدة (نص، صورة، صوت، فيديو) بنموذج واحد، وكل نوع اسمه وسيط. مثال: تعرض صورة على النموذج فيوصف محتواها نصًا — هنا جمع بين الصورة والنص.', en: 'Multimodality is handling multiple kinds of data (text, image, audio, video) with one model; each kind is a modality. Example: show the model an image and it describes the content in text — combining image and text.' } } },
      ],
    },
  ],
});
