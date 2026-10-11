/* =========================================================
 * core/i18n.js — language state + UI dictionary.
 * Responsibility: turn bilingual values {ar, en} into text,
 * and switch document direction. Content never calls DOM here.
 * ========================================================= */
(function () {
  'use strict';

  const UI = {
    appTitle:     { ar: 'المراجعة التفاعلية', en: 'Interactive Review' },
    subject:      { ar: 'البرمجة والذكاء الاصطناعي', en: 'Programming & AI' },
    grade:        { ar: 'ثانية ثانوي', en: 'Grade 2 Secondary' },
    unit:         { ar: 'الفصل', en: 'Chapter' },
    lesson:       { ar: 'الدرس', en: 'Lesson' },
    start:        { ar: 'ابدأ', en: 'Start' },
    continue:     { ar: 'كمّل', en: 'Continue' },
    review:       { ar: 'راجع تاني', en: 'Review' },
    next:         { ar: 'التالي', en: 'Next' },
    prev:         { ar: 'السابق', en: 'Back' },
    finish:       { ar: 'إنهاء', en: 'Finish' },
    back:         { ar: 'رجوع', en: 'Back' },
    home:         { ar: 'الرئيسية', en: 'Home' },
    check:        { ar: 'تحقّق', en: 'Check' },
    tryAgain:     { ar: 'حاول تاني', en: 'Try again' },
    showSolution: { ar: 'شوف الحل خطوة بخطوة', en: 'Show the solution step by step' },
    nextStep:     { ar: 'الخطوة الجاية', en: 'Next step' },
    showModel:    { ar: 'اعرض الإجابة النموذجية', en: 'Show model answer' },
    correct:      { ar: 'إجابة صحيحة!', en: 'Correct!' },
    wrong:        { ar: 'مش دي…', en: 'Not quite…' },
    partly:       { ar: 'قربت!', en: 'Almost!' },
    explain:      { ar: 'التفسير', en: 'Why' },
    score:        { ar: 'الدرجة', en: 'Score' },
    stationDone:  { ar: 'خلّصت المحطة!', en: 'Station complete!' },
    backToPath:   { ar: 'ارجع لطريق الدرس', en: 'Back to lesson path' },
    nextStation:  { ar: 'المحطة الجاية', en: 'Next station' },
    locked:       { ar: 'خلّص المحطة اللي قبلها الأول', en: 'Finish the previous station first' },
    objectives:   { ar: 'أهداف الحصة', en: 'Learning objectives' },
    guiding:      { ar: 'سؤال الدرس', en: 'Guiding question' },
    keyFact:      { ar: 'الفكرة المحورية', en: 'Key fact' },
    keyTerms:     { ar: 'مصطلحات لازم تحفظها', en: 'Key terms' },
    exam:         { ar: 'بيجي في الامتحان', en: 'Comes up in the exam' },
    confuse:      { ar: 'فرق بيلخبط', en: 'Easily confused' },
    tip:          { ar: 'خد بالك', en: 'Note' },
    think:        { ar: 'فكّر', en: 'Think' },
    tapToFlip:    { ar: 'المس الكارت عشان تقلبه', en: 'Tap the card to flip' },
    known:        { ar: 'حافظه ✓', en: 'Got it ✓' },
    again:        { ar: 'محتاج أراجعه', en: 'Review again' },
    unitChallenge:{ ar: 'تحدّي الفصل الأول', en: 'Chapter 1 Challenge' },
    unitChallengeSub: { ar: '20 سؤال عشوائي من الأربع دروس', en: '20 random questions from all four lessons' },
    teacherMode:  { ar: 'وضع المدرس', en: 'Teacher mode' },
    sound:        { ar: 'الصوت', en: 'Sound' },
    fullscreen:   { ar: 'ملء الشاشة', en: 'Fullscreen' },
    stations:     { ar: 'محطات', en: 'stations' },
    selectAll:    { ar: 'اختار كل الإجابات الصح', en: 'Select all that apply' },
    tapPair:      { ar: 'اختار من اليمين وبعدين اللي يقابله', en: 'Pick an item, then its match' },
    tapOrder:     { ar: 'المس العناصر بالترتيب الصحيح', en: 'Tap the items in the correct order' },
    tapClassify:  { ar: 'اختار البطاقة وبعدين المجموعة بتاعتها', en: 'Pick a card, then its group' },
    tapFill:      { ar: 'اختار الفراغ وبعدين الكلمة المناسبة', en: 'Pick a blank, then the right word' },
    reset:        { ar: 'إعادة', en: 'Reset' },
    yourAnswer:   { ar: 'اكتب إجابتك هنا (أو قولها بصوت عالي)…', en: 'Write your answer here (or say it out loud)…' },
    checklist:    { ar: 'إجابتك فيها النقط دي؟', en: 'Does your answer include these points?' },
    marks:        { ar: 'درجات', en: 'marks' },
    resultGreat:  { ar: 'ممتاز! إنت فاهم الدرس كويس جدًا', en: 'Excellent! You really get this lesson' },
    resultGood:   { ar: 'كويس! راجع الأسئلة اللي غلطت فيها', en: 'Good! Review the ones you missed' },
    resultLow:    { ar: 'محتاج تراجع محطات الشرح تاني', en: 'Go back over the learning stations' },
    retake:       { ar: 'أعد الاختبار', en: 'Retake' },
    madeBy:       { ar: 'إعداد م. محمد أشرف', en: 'By Eng. Mohamed Ashraf' },
    tf_true:      { ar: 'صح', en: 'True' },
    tf_false:     { ar: 'غلط', en: 'False' },
    interact:     { ar: 'جرّب بنفسك', en: 'Try it yourself' },
    progress:     { ar: 'التقدّم', en: 'Progress' },
    selftest:     { ar: 'فحص ذاتي', en: 'Self-test' },
    readAloud:    { ar: 'اقرا الشرح بصوت', en: 'Read aloud' },
    present:      { ar: 'وضع العرض (الشاشة كاملة للمشهد)', en: 'Presentation mode (full-stage)' },
  };

  const listeners = new Set();
  let lang = 'ar';

  const i18n = {
    get lang() { return lang; },
    /** Resolve a bilingual value: string | {ar, en} | null */
    t(v) {
      if (v == null) return '';
      if (typeof v === 'string' || typeof v === 'number') return String(v);
      return v[lang] != null ? v[lang] : (v.ar != null ? v.ar : v.en || '');
    },
    /** The other-language text (used for small English term chips). */
    alt(v) {
      if (v == null || typeof v !== 'object') return '';
      return lang === 'ar' ? v.en || '' : v.ar || '';
    },
    ui(key) {
      if (!UI[key]) { console.warn('Missing UI string', key); return key; }
      return i18n.t(UI[key]);
    },
    hasUI: (key) => key in UI,
    /** Switch language. opts.silent → don't notify listeners (used by self-test). */
    set(next, opts) {
      if (next !== 'ar' && next !== 'en') return;
      lang = next;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      if (!(opts && opts.silent)) listeners.forEach((fn) => fn(lang));
    },
    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };

  RV.i18n = i18n;
  RV.t = i18n.t;
})();
