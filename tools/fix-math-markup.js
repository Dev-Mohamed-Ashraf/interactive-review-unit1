#!/usr/bin/env node
/* tools/fix-math-markup.js — content linter/fixer for formulas.
 *   node tools/fix-math-markup.js js/content/lesson-1-1.js          (dry run: prints changes)
 *   node tools/fix-math-markup.js js/content/lesson-1-1.js --write  (apply)
 * 1) Unicode superscripts (2⁵, 2ⁿ) → caret form (2^5, 2^n) — rendered as <sup> by core/rich.js
 * 2) Formulas inside Arabic strings are wrapped in `backticks` so they stay LTR
 *    (otherwise "23 ÷ 2 = 11.5" is reordered by the bidi algorithm).
 */
'use strict';
const fs = require('fs');
const file = process.argv[2];
const write = process.argv.includes('--write');
let src = fs.readFileSync(file, 'utf8');

const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', 'ⁿ': 'n' };
src = src.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ]+/g, (m) => '^' + [...m].map((c) => SUP[c]).join(''));

// a formula = operands joined by operators; operands are numbers / N / n / t / N₀ / t₀ / 2^x
const OPERAND = '(?:√?\\(?[0-9]+(?:[,.][0-9]+)*(?:\\^[0-9n]+(?:\\.[0-9]+)?)?\\)?|N₀|t₀|N|n|t)';
const OP = '\\s*[=×÷−+≈]\\s*';
const FORMULA = new RegExp(`${OPERAND}(?:${OP}${OPERAND})+`, 'g');

let changes = 0;
src = src.replace(/ar: '((?:[^'\\]|\\.)*)'/g, (whole, text) => {
  // skip strings without Arabic letters or already marked up
  if (!/[؀-ۿ]/.test(text)) return whole;
  const parts = text.split(/(`[^`]*`)/);
  const out = parts.map((p) => (p.startsWith('`') ? p : p.replace(FORMULA, (f) => { changes++; return '`' + f.trim() + '`'; }))).join('');
  if (out !== text) console.log('  ' + text.slice(0, 90) + '\n→ ' + out.slice(0, 110) + '\n');
  return `ar: '${out}'`;
});

// 3) pull a highlighted result back inside the formula:  `a ÷ 2` = __11.5 مرة__  →  `a ÷ 2 = 11.5` __مرة__
src = src.replace(/`([^`]+)` ([=≈]) __([0-9][0-9,.]*)\s*([^_]*)__/g, (m, expr, op, num, rest) => {
  changes++;
  const tail = rest.trim();
  return '`' + expr + ' ' + op + ' ' + num + '`' + (tail ? ' __' + tail + '__' : '');
});

console.log(`${changes} formulas wrapped${write ? ' (written)' : ' (dry run)'}`);
if (write) fs.writeFileSync(file, src);
