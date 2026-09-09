/* =========================================================
   EKONOMI — APBN & APBD — Ujian SMA Kelas XII
   ========================================================= */

/* ---------- decorative floating economic terms ---------- */
const floatTerms = ["Rp","%","APBN","APBD","PAD","DAU","DAK","SURPLUS","DEFISIT","PENDAPATAN","BELANJA"];
const field = document.getElementById('floatField');
floatTerms.forEach((term, i) => {
  const el = document.createElement('div');
  el.className = 'float-el' + (i % 2 === 0 ? '' : ' green');
  el.textContent = term;
  const size = term.length <= 2 ? 3.2 : (term.length <= 4 ? 1.4 : 0.9);
  el.style.fontSize = size + 'rem';
  el.style.top = (Math.random() * 80 + 5) + '%';
  el.style.left = (Math.random() * 85 + 3) + '%';
  el.style.setProperty('--fd', (Math.random() * 1.2) + 's');
  el.style.animationDuration = '1s, ' + (14 + Math.random() * 10) + 's';
  field.appendChild(el);
});

/* ---------- exam data ---------- */
const questions = [
  { q: "Dokumen yang memuat rencana keuangan tahunan pemerintah pusat dan disetujui oleh DPR disebut...",
    options: ["APBD", "APBN", "RAPBN", "Nota Keuangan", "Kebijakan Fiskal"], answer: 1 },
  { q: "Sumber pendapatan asli daerah (PAD) yang berasal dari pungutan atas jasa yang disediakan pemerintah daerah disebut...",
    options: ["Pajak Daerah", "Retribusi Daerah", "Dana Bagi Hasil", "Hibah Daerah", "Dana Alokasi Umum"], answer: 1 },
  { q: "Dana Alokasi Umum (DAU) bertujuan utama untuk...",
    options: ["Membiayai proyek khusus daerah", "Mengurangi kesenjangan fiskal antar daerah", "Membayar utang luar negeri", "Menambah cadangan devisa", "Membiayai belanja pegawai pusat"], answer: 1 },
  { q: "Kondisi ketika belanja negara lebih besar daripada pendapatan negara disebut...",
    options: ["Surplus anggaran", "Anggaran berimbang", "Defisit anggaran", "Anggaran fungsional", "Anggaran dinamis"], answer: 2 },
  { q: "Berikut ini yang termasuk komponen belanja negara dalam APBN adalah...",
    options: ["Pajak Penghasilan", "Bea Cukai", "Belanja Pemerintah Pusat", "Penerimaan Hibah", "Pendapatan Bukan Pajak"], answer: 2 },
  { q: "Dana Alokasi Khusus (DAK) dialokasikan untuk...",
    options: ["Kebutuhan umum daerah", "Membiayai kegiatan khusus sesuai prioritas nasional", "Gaji aparatur sipil negara pusat", "Subsidi bahan bakar minyak", "Cadangan umum negara"], answer: 1 },
  { q: "Salah satu fungsi APBN dalam perekonomian adalah fungsi stabilisasi, yang bertujuan untuk...",
    options: ["Menentukan besaran pajak daerah", "Menjaga kestabilan perekonomian dan mengendalikan inflasi", "Mengatur belanja partai politik", "Menetapkan nilai tukar rupiah secara tetap", "Mengatur ekspor komoditas"], answer: 1 },
  { q: "APBD ditetapkan melalui persetujuan bersama antara pemerintah daerah dengan...",
    options: ["Kementerian Keuangan", "DPRD", "Mahkamah Agung", "Bank Indonesia", "DPR RI"], answer: 1 },
  { q: "Contoh belanja daerah yang bersifat langsung adalah...",
    options: ["Belanja bunga utang", "Belanja pegawai administratif", "Belanja modal pembangunan jalan", "Belanja hibah pusat", "Belanja subsidi nasional"], answer: 2 },
  { q: "Jika realisasi pendapatan negara sama dengan realisasi belanja negara, kondisi tersebut disebut...",
    options: ["Defisit anggaran", "Surplus anggaran", "Anggaran berimbang", "Anggaran ekspansif", "Anggaran fungsional"], answer: 2 }
];

const EXAM_DURATION_SECONDS = 30 * 60;
const WARNING_THRESHOLD_SECONDS = 60;

let current = 0;
let answers = new Array(questions.length).fill(null);
let timerInterval = null;
let secondsLeft = EXAM_DURATION_SECONDS;
let studentName = '';
let studentClass = '';

/* ---------- screen switching ---------- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'fade-in'));
  const target = document.getElementById(id);
  target.classList.add('active', 'fade-in');
}

/* ---------- biodata validation + start ---------- */
function startExam() {
  const nameInput = document.getElementById('studentName');
  const classInput = document.getElementById('studentClass');
  const nameGroup = nameInput.closest('.field-group');
  const classGroup = classInput.closest('.field-group');

  const nameVal = nameInput.value.trim();
  const classVal = classInput.value;

  nameGroup.classList.toggle('invalid', nameVal === '');
  classGroup.classList.toggle('invalid', classVal === '');

  if (nameVal === '' || classVal === '') {
    if (nameVal === '') nameInput.focus();
    else classInput.focus();
    return;
  }

  studentName = nameVal;
  studentClass = classVal;
  document.getElementById('examStudentInfo').textContent = `${studentName} — Kelas ${studentClass}`;
  document.getElementById('resStudentInfo').textContent = `${studentName} — Kelas ${studentClass}`;

  current = 0;
  answers = new Array(questions.length).fill(null);
  secondsLeft = EXAM_DURATION_SECONDS;

  const timerBox = document.getElementById('timerDisplay');
  timerBox.classList.remove('warning');

  showScreen('exam');
  renderQuestion();
  startTimer();
}

/* ---------- timer ---------- */
function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      secondsLeft = 0;
      updateTimerDisplay();
      finishExam();
      return;
    }
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const s = (secondsLeft % 60).toString().padStart(2, '0');
  const timerBox = document.getElementById('timerDisplay');
  timerBox.textContent = `${m}:${s}`;
  timerBox.classList.toggle('warning', secondsLeft <= WARNING_THRESHOLD_SECONDS);
}

/* ---------- question rendering ---------- */
function renderQuestion() {
  const q = questions[current];
  const num = (current + 1).toString().padStart(2, '0');

  document.getElementById('qNumber').textContent = `SOAL ${num}`;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('progressText').textContent = `SOAL ${num} / ${questions.length}`;

  const pct = Math.round(((current + 1) / questions.length) * 100);
  document.getElementById('progressPercent').textContent = pct + '%';
  document.getElementById('progressFill').style.width = pct + '%';

  const optionsWrap = document.getElementById('qOptions');
  optionsWrap.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];
  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option' + (answers[current] === i ? ' selected' : '');
    div.innerHTML = `<span class="opt-letter">${letters[i]}</span><span class="opt-text">${opt}</span>`;
    div.addEventListener('click', () => {
      answers[current] = i;
      renderQuestion();
    });
    optionsWrap.appendChild(div);
  });

  // retrigger the question-card entrance animation
  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = '';

  document.getElementById('btnPrev').disabled = current === 0;
  document.getElementById('btnNext').textContent = current === questions.length - 1 ? 'Selesai' : 'Selanjutnya';
}

function prevQuestion() {
  if (current > 0) {
    current--;
    renderQuestion();
  }
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    finishExam();
  }
}

/* ---------- count-up number animation ---------- */
function animateCount(el, from, to, duration) {
  if (from === to) { el.textContent = to; return; }
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(from + (to - from) * eased);
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = to;
  }
  requestAnimationFrame(tick);
}

/* ---------- celebratory particle burst on results ---------- */
function spawnBurst() {
  const burstField = document.getElementById('burstField');
  burstField.innerHTML = '';
  const colors = ['#4de3ff', '#55e39b', '#eaf2fb'];
  const count = 22;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'burst-el';
    const size = 4 + Math.random() * 6;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = (10 + Math.random() * 80) + '%';
    el.style.background = colors[i % colors.length];
    el.style.animationDelay = (Math.random() * 0.5) + 's';
    el.style.animationDuration = (1.1 + Math.random() * 0.8) + 's';
    burstField.appendChild(el);
  }
}

/* ---------- results ---------- */
function finishExam() {
  clearInterval(timerInterval);

  let correct = 0, wrong = 0, empty = 0;
  answers.forEach((a, i) => {
    if (a === null) empty++;
    else if (a === questions[i].answer) correct++;
    else wrong++;
  });
  const score = Math.round((correct / questions.length) * 100);

  const statCorrectEl = document.getElementById('statCorrect');
  const statWrongEl = document.getElementById('statWrong');
  const statEmptyEl = document.getElementById('statEmpty');
  const scoreValEl = document.getElementById('scoreVal');

  const circle = document.getElementById('scoreCircle');
  const circumference = 2 * Math.PI * 94;
  circle.style.transition = 'none';
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  const ringWrap = document.querySelector('.score-ring-wrap');
  ringWrap.classList.remove('ring-glow');

  showScreen('results');
  spawnBurst();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      circle.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.19,1,.22,1)';
      const offset = circumference - (score / 100) * circumference;
      circle.style.strokeDashoffset = offset;

      animateCount(scoreValEl, 0, score, 1100);
      animateCount(statCorrectEl, 0, correct, 900);
      animateCount(statWrongEl, 0, wrong, 900);
      animateCount(statEmptyEl, 0, empty, 900);

      setTimeout(() => ringWrap.classList.add('ring-glow'), 1000);
    });
  });
}

function restartExam() {
  document.getElementById('studentName').value = '';
  document.getElementById('studentClass').value = '';
  document.getElementById('studentName').closest('.field-group').classList.remove('invalid');
  document.getElementById('studentClass').closest('.field-group').classList.remove('invalid');
  document.getElementById('burstField').innerHTML = '';
  document.querySelector('.score-ring-wrap').classList.remove('ring-glow');
  showScreen('hero');
}

/* ---------- wire up events ---------- */
document.getElementById('btnStart').addEventListener('click', startExam);
document.getElementById('btnPrev').addEventListener('click', prevQuestion);
document.getElementById('btnNext').addEventListener('click', nextQuestion);
document.getElementById('btnRestart').addEventListener('click', restartExam);
