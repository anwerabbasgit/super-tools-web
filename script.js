// ====== 1. نظام تشغيل الساعة الحية تلقائياً ======
setInterval(() => {
    const now = new Date();
    const clockEl = document.getElementById('liveClock');
    if(clockEl) clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleTimeString('ar-EG')}`;
}, 1000);

// ====== 2. نظام تغيير الوضع (Dark/Light Mode) ======
const themeToggle = document.getElementById('themeToggle');
if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? '' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i> الوضع الفاتح' : '<i class="fa-solid fa-moon"></i> الوضع الداكن';
    });
}

// ====== 3. أداة حساب الـ BMI ======
function calculateBMI() {
    const w = parseFloat(document.getElementById('weight').value);
    const h = parseFloat(document.getElementById('height').value)/100;
    const resultDiv = document.getElementById('bmiResult');
    if(w && h && resultDiv) {
        const bmi = (w/(h*h)).toFixed(1);
        let status = bmi < 18.5 ? "📉 نحافة" : bmi < 24.9 ? "✅ مثالي" : bmi < 29.9 ? "⚠️ زيادة وزن" : "🚨 سمنة مفرطة";
        resultDiv.innerText = `مؤشر كتلتك: ${bmi} (${status})`;
    }
}

// ====== 4. أداة تحليل النصوص ======
function analyzeText() {
    const t = document.getElementById('textInput').value;
    const charEl = document.getElementById('charCount');
    const wordEl = document.getElementById('wordCount');
    if(charEl && wordEl) {
        charEl.innerText = t.replace(/\s/g, "").length;
        wordEl.innerText = t.trim() === "" ? 0 : t.trim().split(/\s+/).length;
    }
}

// ====== 5. أداة توليد ونسخ كلمة المرور ======
function generatePassword() {
    const c = "abcdefgHIJKLMNOP1234567890!@#$%&*"; let p = "";
    for (let i = 0; i < 14; i++) p += c.charAt(Math.floor(Math.random() * c.length));
    const resEl = document.getElementById('passwordResult');
    if(resEl) resEl.innerText = p;
}
function copyPassword() {
    const txt = document.getElementById('passwordResult').innerText;
    if(txt && txt !== "اضغط توليد...") {
        navigator.clipboard.writeText(txt);
        alert("📋 تم نسخ كلمة المرور بنجاح!");
    }
}

// ====== 6. أداة تحويل العملات السريع ======
function convertCurrency() {
    const usd = parseFloat(document.getElementById('amount').value);
    const iqdEl = document.getElementById('iqdResult');
    const egpEl = document.getElementById('egpResult');
    if(usd && iqdEl && egpEl) {
        iqdEl.innerText = (usd * 1310).toLocaleString();
        egpEl.innerText = (usd * 48.5).toFixed(2);
    }
}

// ====== 7. أداة لوحة الرسم الاحترافية ======
const canvas = document.getElementById('paintCanvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let drawing = false;
    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
    canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.strokeStyle = '#4361ee';
        const r = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - r.left, e.clientY - r.top); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
    });
}
function clearCanvas() { 
    const cv = document.getElementById('paintCanvas');
    if(cv) cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); 
}
function downloadCanvas() {
    const cv = document.getElementById('paintCanvas');
    if(cv) {
        const lnk = document.createElement('a'); lnk.download = 'signature.png';
        lnk.href = cv.toDataURL(); lnk.click();
    }
}

// ====== 8. الأداة الجديدة: مفكرة الملاحظات والمهام الذكية ======
function loadNotes() {
    const saved = localStorage.getItem('userNotes');
    const txtArea = document.getElementById('notesArea');
    if(saved && txtArea) txtArea.value = saved;
}
function saveNotes() {
    const txt = document.getElementById('notesArea').value;
    localStorage.setItem('userNotes', txt);
    const status = document.getElementById('saveStatus');
    if(status) {
        status.innerText = "✅ تم الحفظ تلقائياً في ذاكرة المتصفح آمنة!";
        setTimeout(() => status.innerText = "", 3000);
    }
}
// تشغيل جلب الملاحظات فور فتح الصفحة
document.addEventListener('DOMContentLoaded', loadNotes);
