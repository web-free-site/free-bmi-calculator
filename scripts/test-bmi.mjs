#!/usr/bin/env node
import { runPediatricGrowthRequest } from '../public/vendor/child-growth-standards/browser.mjs';

const NINETEEN_YEARS_DAYS = 6935;

function bmiKgCm(w, h) {
  const m = h / 100;
  return parseFloat((w / (m * m)).toFixed(1));
}

function adultCategory(bmi) {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

function idealRange(heightCm) {
  const m = heightCm / 100;
  return [18.5 * m * m, 24.9 * m * m];
}

let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    failed++;
  } else {
    console.log('OK:', msg);
  }
}

const bmi709 = bmiKgCm(70, 175);
assert(bmi709 === 22.9, `70kg 175cm => BMI ${bmi709}`);
assert(adultCategory(bmi709) === 'normal', 'adult category normal');
const [minI, maxI] = idealRange(175);
assert(minI > 55 && maxI < 90, `ideal range ${minI.toFixed(1)}-${maxI.toFixed(1)} kg`);

const wLb = 70 * 2.2046226218;
const hIn = 175 / 2.54;
const bmiImp = parseFloat(((wLb / (hIn * hIn)) * 703).toFixed(1));
assert(bmiImp === 22.9, `imperial equivalent BMI ${bmiImp}`);

const child05 = await runPediatricGrowthRequest({
  mode: 'all',
  standard: 'who',
  sex: 'female',
  dateOfBirth: '2022-06-01',
  dateOfMeasurement: '2024-06-01',
  weightKg: 12,
  lengthHeightCm: 85,
});
const bfa05 = child05.assessment.results.find((r) => r.indicator === 'bmi-for-age');
assert(bfa05 && bfa05.nutritionalStatus === 'Normal', 'child 0-5 WHO label present, not adult cutoff');
assert(bfa05.zScore != null, 'child 0-5 z-score');

const child519 = await runPediatricGrowthRequest({
  mode: 'all',
  standard: 'who',
  sex: 'male',
  dateOfBirth: '2010-01-15',
  dateOfMeasurement: '2024-01-15',
  weightKg: 45,
  lengthHeightCm: 160,
});
const bfa519 = child519.assessment.results.find((r) => r.indicator === 'bmi-for-age');
assert(bfa519 && bfa519.nutritionalStatus === 'Normal weight', 'child 5-19 WHO label');

const dob = '2000-01-01';
const meas = '2024-01-01';
const days =
  Math.round((new Date(2024, 0, 1) - new Date(2000, 0, 1)) / 86400000);
assert(days > NINETEEN_YEARS_DAYS, 'test subject over 19 for adult-only');

const indexHtml = await import('fs').then((fs) =>
  fs.readFileSync(new URL('../public/index.html', import.meta.url), 'utf8'),
);
assert(indexHtml.includes('Medical disclaimer'), 'disclaimer on index');
assert(indexHtml.includes('who.int/tools/child-growth-standards'), 'WHO citation');
assert(indexHtml.includes('wf-more-tools'), 'more tools block');
assert(indexHtml.includes('Free Percentage Calculator'), 'percentage calculator link');
assert(indexHtml.includes('<strong>Free BMI Calculator</strong>'), 'bold BMI in hub');
assert(!indexHtml.includes('hreflang'), 'no hreflang fr');

process.exit(failed ? 1 : 0);