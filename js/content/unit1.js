/* =========================================================
 * content/unit1.js — chapter metadata (pure data).
 * To add a lesson: create js/content/lesson-X-Y.js, add its id
 * below, and add a <script> tag in index.html.
 * ========================================================= */
RV.addChapter({
  id: 'u1',
  number: 1,
  title: { ar: 'تكنولوجيا المعلومات والمجتمع', en: 'Information Technology and Society' },
  subtitle: {
    ar: 'رحلة من أول حاسب بيملا أوضة لحد الذكاء الاصطناعي اللي في جيبك — بالأنيميشن، والأمثلة، والحل خطوة بخطوة.',
    en: 'A journey from room-sized computers to the AI in your pocket — with animation, examples, and step-by-step solutions.',
  },
  lessons: ['1-1', '1-2', '1-3', '1-4'],
  challengeCount: 20,
  route: '#/challenge',
  challengeId: 'unit', // store key (kept from before multi-chapter, so saved scores survive)
  challengeTitle: { ar: 'تحدّي الفصل الأول', en: 'Chapter 1 Challenge' },
  challengeSub: { ar: '20 سؤال عشوائي من الأربع دروس', en: '20 random questions from all four lessons' },
});
