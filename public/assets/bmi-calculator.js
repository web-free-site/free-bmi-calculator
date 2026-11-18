/**
 * Free BMI Calculator — derived from kriikx/bmi-calculator (MIT), extended for child WHO BMI-for-age.
 */
import { runPediatricGrowthRequest } from '/vendor/child-growth-standards/browser.mjs';

'use strict';

const NINETEEN_YEARS_DAYS = 6935;

const state = {
  personMode: 'adult',
  currentUnit: 'metric',
  imperialHeightMode: 'single',
  history: [],
};

const $ = (id) => document.getElementById(id);

function initApp() {
  cacheDom();
  setupEventListeners();
  setUnitUi();
  setTodayMeasurementDate();
  loadHistory();
  handlePersonModeChange();
  onChildAgeMode();
}

let el = {};
function cacheDom() {
  el = {
    form: $('bmi-form'),
    personAdult: $('person-adult'),
    personChild: $('person-child'),
    childFields: $('child-fields'),
    optionalAdultMetrics: $('optional-adult-metrics'),
    weight: $('weight'),
    heightCm: $('height-cm'),
    heightIn: $('height-in'),
    heightFt: $('height-ft'),
    heightInPart: $('height-in-part'),
    imperialHeightSingle: $('imperial-height-single'),
    imperialHeightFtIn: $('imperial-height-ftin'),
    childSex: $('child-sex'),
    childDob: $('child-dob'),
    childAgeYears: $('child-age-years'),
    childAgeModeDob: $('child-age-mode-dob'),
    childAgeModeYears: $('child-age-mode-years'),
    childMeasDate: $('child-meas-date'),
    bmrSection: $('bmr-section'),
    age: $('age'),
    gender: $('gender'),
    unitMetric: $('unit-metric'),
    unitImperial: $('unit-imperial'),
    results: $('results'),
    resultsAdult: $('results-adult'),
    resultsChild: $('results-child'),
    bmiNumber: $('bmi-number'),
    bmiCategoryBox: $('bmi-category-box'),
    bmiCategoryName: $('bmi-category-name'),
    idealWeight: $('ideal-weight'),
    idealWeightNote: $('ideal-weight-note'),
    bmrValue: $('bmr-value'),
    tdeeValue: $('tdee-value'),
    childBmiNumber: $('child-bmi-number'),
    childZ: $('child-z-score'),
    childPct: $('child-percentile'),
    childLabel: $('child-who-label'),
    childSdBand: $('child-sd-band'),
    childAgeDisplay: $('child-age-display'),
    disclaimerBanner: $('who-disclaimer-inline'),
    historySection: $('history-section'),
    historyList: $('history-list'),
    clearHistory: $('clear-history-btn'),
    resetBtn: $('reset-btn'),
    toast: $('error-toast'),
    heightModeSingle: $('height-mode-single'),
    heightModeFtIn: $('height-mode-ftin'),
  };
}

function setupEventListeners() {
  el.form.addEventListener('submit', onSubmit);
  el.personAdult?.addEventListener('change', handlePersonModeChange);
  el.personChild?.addEventListener('change', handlePersonModeChange);
  el.unitMetric?.addEventListener('change', onUnitChange);
  el.unitImperial?.addEventListener('change', onUnitChange);
  el.heightModeSingle?.addEventListener('change', onImperialHeightMode);
  el.heightModeFtIn?.addEventListener('change', onImperialHeightMode);
  el.childAgeModeDob?.addEventListener('change', onChildAgeMode);
  el.childAgeModeYears?.addEventListener('change', onChildAgeMode);
  el.resetBtn?.addEventListener('click', resetForm);
  el.clearHistory?.addEventListener('click', clearHistory);
}

function setTodayMeasurementDate() {
  if (el.childMeasDate && !el.childMeasDate.value) {
    el.childMeasDate.value = isoToday();
  }
}

function isoToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function handlePersonModeChange() {
  state.personMode = el.personChild?.checked ? 'child' : 'adult';
  const isChild = state.personMode === 'child';
  if (el.childFields) el.childFields.hidden = !isChild;
  if (el.optionalAdultMetrics) el.optionalAdultMetrics.hidden = isChild;
  if (el.bmrSection) el.bmrSection.hidden = isChild;
  document.querySelectorAll('.adult-only-chart').forEach((n) => {
    n.hidden = isChild;
  });
}

function onChildAgeMode() {
  const useYears = el.childAgeModeYears?.checked;
  if (el.childDob) el.childDob.closest('.form-group')?.classList.toggle('hidden-field', useYears);
  if (el.childAgeYears) el.childAgeYears.closest('.form-group')?.classList.toggle('hidden-field', !useYears);
}

function onUnitChange(e) {
  state.currentUnit = e.target.value;
  setUnitUi();
}

function onImperialHeightMode(e) {
  state.imperialHeightMode = e.target.value;
  setImperialHeightUi();
}

function setUnitUi() {
  const metric = state.currentUnit === 'metric';
  document.querySelectorAll('.unit-metric-label').forEach((n) => {
    n.hidden = !metric;
  });
  document.querySelectorAll('.unit-imperial-label').forEach((n) => {
    n.hidden = metric;
  });
  if (el.imperialHeightSingle && el.imperialHeightFtIn) {
    const showImp = !metric;
    el.imperialHeightSingle.hidden = !showImp;
    el.imperialHeightFtIn.hidden = !showImp;
    if (showImp) setImperialHeightUi();
    else {
      if (el.heightCm) el.heightCm.removeAttribute('disabled');
    }
  }
  if (el.heightCm) {
    if (metric) {
      el.heightCm.removeAttribute('disabled');
      el.heightCm.closest('.form-group')?.classList.remove('hidden-field');
    } else {
      el.heightCm.setAttribute('disabled', 'disabled');
      el.heightCm.closest('.form-group')?.classList.add('hidden-field');
    }
  }
}

function setImperialHeightUi() {
  if (state.currentUnit !== 'imperial') return;
  state.imperialHeightMode = el.heightModeFtIn?.checked ? 'ftin' : 'single';
  const ftIn = state.imperialHeightMode === 'ftin';
  if (el.heightIn) el.heightIn.closest('.form-group')?.classList.toggle('hidden-field', ftIn);
  if (el.heightFt) el.heightFt.closest('.form-group')?.classList.toggle('hidden-field', !ftIn);
  if (el.heightInPart) el.heightInPart.closest('.form-group')?.classList.toggle('hidden-field', !ftIn);
}

function getHeightCm() {
  if (state.currentUnit === 'metric') {
    return parseFloat(el.heightCm?.value);
  }
  let inches;
  if (state.imperialHeightMode === 'ftin') {
    const ft = parseFloat(el.heightFt?.value) || 0;
    const inch = parseFloat(el.heightInPart?.value) || 0;
    inches = ft * 12 + inch;
  } else {
    inches = parseFloat(el.heightIn?.value);
  }
  if (!Number.isFinite(inches)) return NaN;
  return inches * 2.54;
}

function getWeightKg() {
  const w = parseFloat(el.weight?.value);
  if (!Number.isFinite(w)) return NaN;
  return state.currentUnit === 'metric' ? w : w / 2.2046226218;
}

function calculateBmiFromMetric(weightKg, heightCm) {
  const m = heightCm / 100;
  return parseFloat((weightKg / (m * m)).toFixed(1));
}

function adultCategory(bmi) {
  if (bmi < 18.5) return { key: 'underweight', label: 'Underweight (adult)' };
  if (bmi < 25) return { key: 'normal', label: 'Normal weight (adult)' };
  if (bmi < 30) return { key: 'overweight', label: 'Overweight (adult)' };
  return { key: 'obese', label: 'Obesity (adult)' };
}

function idealWeightRange(heightCm, unit) {
  const m = heightCm / 100;
  const minKg = 18.5 * m * m;
  const maxKg = 24.9 * m * m;
  const formula = 'BMI 18.5–24.9 × height(m)²';
  if (unit === 'metric') {
    return {
      text: `${minKg.toFixed(1)} – ${maxKg.toFixed(1)} kg`,
      formula,
    };
  }
  return {
    text: `${(minKg * 2.2046226218).toFixed(1)} – ${(maxKg * 2.2046226218).toFixed(1)} lb`,
    formula,
  };
}

function calculateBMR(weightKg, heightCm, age, gender) {
  if (!age || !gender) return null;
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else if (gender === 'female') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 78;
  }
  return bmr;
}

function resolveChildDob() {
  if (el.childAgeModeYears?.checked) {
    const years = parseFloat(el.childAgeYears?.value);
    if (!Number.isFinite(years) || years < 0 || years > 19) return null;
    const meas = el.childMeasDate?.value || isoToday();
    const [y, m, d] = meas.split('-').map(Number);
    const measDate = new Date(y, m - 1, d);
    measDate.setFullYear(measDate.getFullYear() - Math.floor(years));
    const monthsFrac = (years - Math.floor(years)) * 12;
    measDate.setMonth(measDate.getMonth() - Math.round(monthsFrac));
    const yy = measDate.getFullYear();
    const mm = String(measDate.getMonth() + 1).padStart(2, '0');
    const dd = String(measDate.getDate()).padStart(2, '0');
    return `${yy}-${mm}-${dd}`;
  }
  const dob = el.childDob?.value;
  if (!dob) return null;
  return dob;
}

function ageDaysBetween(dobIso, measIso) {
  const [y1, m1, d1] = dobIso.split('-').map(Number);
  const [y2, m2, d2] = measIso.split('-').map(Number);
  const a = new Date(y1, m1 - 1, d1);
  const b = new Date(y2, m2 - 1, d2);
  return Math.round((b - a) / 86400000);
}

async function onSubmit(e) {
  e.preventDefault();
  const weightKg = getWeightKg();
  const heightCm = getHeightCm();
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    showError('Enter a valid weight.');
    return;
  }
  if (!Number.isFinite(heightCm) || heightCm < 30) {
    showError('Enter a valid height.');
    return;
  }

  if (state.personMode === 'adult') {
    await runAdult(weightKg, heightCm);
  } else {
    await runChild(weightKg, heightCm);
  }
}

async function runAdult(weightKg, heightCm) {
  const age = el.age?.value ? parseFloat(el.age.value) : null;
  if (age != null && age < 20) {
    showError('For ages under 20, use Child & adolescent mode (WHO growth references).');
    return;
  }
  const bmi = calculateBmiFromMetric(weightKg, heightCm);
  const cat = adultCategory(bmi);
  el.resultsAdult.hidden = false;
  el.resultsChild.hidden = true;
  el.bmiNumber.textContent = bmi.toFixed(1);
  el.bmiCategoryBox.className = `bmi-category ${cat.key}`;
  el.bmiCategoryName.textContent = cat.label;
  const ideal = idealWeightRange(heightCm, state.currentUnit);
  el.idealWeight.textContent = ideal.text;
  if (el.idealWeightNote) {
    el.idealWeightNote.textContent = `Estimated weight range for adult BMI 18.5–24.9 at this height (${ideal.formula}). Not used for children.`;
  }
  const gender = el.gender?.value;
  const bmr = calculateBMR(weightKg, heightCm, age, gender);
  if (bmr != null) {
    el.bmrValue.textContent = `${Math.round(bmr)} cal/day (estimate, adults only)`;
    el.tdeeValue.textContent = `${Math.round(bmr * 1.55)} cal/day (moderate activity estimate)`;
  } else {
    el.bmrValue.textContent = 'Optional: add age (20+) & sex for an estimate';
    el.tdeeValue.textContent = '—';
  }
  document.querySelectorAll('.chart-bar').forEach((bar) => bar.classList.remove('active'));
  const idx = ['underweight', 'normal', 'overweight', 'obese'].indexOf(cat.key);
  document.querySelectorAll('.chart-bar')[idx]?.classList.add('active');
  el.results.removeAttribute('hidden');
  addHistory({ kind: 'adult', bmi, label: cat.label, unit: state.currentUnit });
  el.results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function runChild(weightKg, heightCm) {
  const sex = el.childSex?.value;
  if (!sex) {
    showError('Select sex for WHO BMI-for-age.');
    return;
  }
  const dob = resolveChildDob();
  const meas = el.childMeasDate?.value || isoToday();
  if (!dob) {
    showError('Enter date of birth or age in years (0–19).');
    return;
  }
  const days = ageDaysBetween(dob, meas);
  if (days < 0) {
    showError('Measurement date must be on or after date of birth.');
    return;
  }
  if (days > NINETEEN_YEARS_DAYS) {
    showError('Child mode is for ages 0–19 years. For adults (20+), use Adult mode.');
    return;
  }
  let assessment;
  try {
    const response = await runPediatricGrowthRequest({
      mode: 'all',
      standard: 'who',
      sex,
      dateOfBirth: dob,
      dateOfMeasurement: meas,
      weightKg,
      lengthHeightCm: heightCm,
    });
    assessment = response.assessment;
  } catch (err) {
    showError(err.message || 'Could not compute WHO growth result.');
    return;
  }
  const bfa = assessment.results.find((r) => r.indicator === 'bmi-for-age');
  if (!bfa) {
    showError('BMI-for-age is not available for these inputs.');
    return;
  }
  const bmi = calculateBmiFromMetric(weightKg, heightCm);
  el.resultsChild.hidden = false;
  el.resultsAdult.hidden = true;
  el.childBmiNumber.textContent = bmi.toFixed(1);
  el.childZ.textContent = bfa.zScore != null ? bfa.zScore.toFixed(2) : '—';
  el.childPct.textContent = bfa.percentile != null ? `${bfa.percentile.toFixed(1)}%` : '—';
  el.childLabel.textContent = bfa.nutritionalStatus || '—';
  el.childSdBand.textContent = bfa.sdBand ? `WHO SD band: ${bfa.sdBand}` : '';
  const years = Math.floor(days / 365.25);
  const months = assessment.ageMonthsCompleted;
  el.childAgeDisplay.textContent = `Age at measurement: ${years} y (${months} completed months, ${days} days)`;
  el.results.removeAttribute('hidden');
  addHistory({
    kind: 'child',
    bmi,
    label: bfa.nutritionalStatus,
    unit: state.currentUnit,
  });
  el.results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function addHistory(item) {
  state.history.unshift({ ...item, at: new Date().toISOString() });
  if (state.history.length > 10) state.history.pop();
  try {
    localStorage.setItem('freeBmiHistory', JSON.stringify(state.history));
  } catch (_) {}
  renderHistory();
}

function loadHistory() {
  try {
    const raw = localStorage.getItem('freeBmiHistory');
    if (raw) state.history = JSON.parse(raw);
  } catch (_) {}
  renderHistory();
}

function renderHistory() {
  if (!el.historyList) return;
  if (!state.history.length) {
    el.historySection?.setAttribute('hidden', '');
    return;
  }
  el.historySection?.removeAttribute('hidden');
  el.historyList.innerHTML = state.history
    .map(
      (h) => `<div class="history-item"><div class="history-item-info">
      <div class="history-item-bmi">${h.kind === 'child' ? 'Child' : 'Adult'} BMI: ${h.bmi}</div>
      <div class="history-item-category">${escapeHtml(h.label || '')}</div>
      </div></div>`,
    )
    .join('');
}

function clearHistory() {
  if (!confirm('Clear calculation history on this device?')) return;
  state.history = [];
  localStorage.removeItem('freeBmiHistory');
  el.historySection?.setAttribute('hidden', '');
  el.historyList.innerHTML = '';
}

function resetForm() {
  el.form.reset();
  setTodayMeasurementDate();
  el.results.setAttribute('hidden', '');
  handlePersonModeChange();
  onChildAgeMode();
  setUnitUi();
}

function showError(message) {
  if (!el.toast) return;
  el.toast.textContent = message;
  el.toast.hidden = false;
  clearTimeout(showError._t);
  showError._t = setTimeout(() => {
    el.toast.hidden = true;
  }, 5000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}