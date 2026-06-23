// 1. نظام تشغيل الساعة الحية تلقائياً بالثواني
setInterval(() => {
    const clockEl = document.getElementById('liveClock');
    if(clockEl) clockEl.innerHTML = `⏰ ${new Date().toLocaleTimeString('ar-EG')}`;
}, 1000);

// 2. نظام تغيير وحفظ الوضع (Dark/Light Mode) ذكي التثبيت عبر الرموز التوافقية
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(themeToggle) themeToggle.innerHTML = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        if(themeToggle) themeToggle.innerHTML = '🌙';
    }
}

const themeToggle = document.getElementById('themeToggle');
if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        applySavedTheme();
    });
}

// 3. حاسبة مؤشر كتلة الجسم (BMI)
function calculateBMI() {
    const w = parseFloat(document.getElementById('weight')?.value);
    const h = parseFloat(document.getElementById('height')?.value)/100;
    const res = document.getElementById('bmiResult');
    if(w && h && res) {
        const bmi = (w/(h*h)).toFixed(1);
        let status = bmi < 18.5 ? "📉 نحافة" : bmi < 24.9 ? "✅ مثالي" : bmi < 29.9 ? "⚠️ زيادة وزن" : "🚨 سمنة مفرطة";
        res.innerText = `مؤشر كتلتك: ${bmi} (${status})`;
    }
}

// 4. أداة تحليل النصوص
function analyzeText() {
    const t = document.getElementById('textInput')?.value || "";
    const charEl = document.getElementById('charCount');
    const wordEl = document.getElementById('wordCount');
    if(charEl && wordEl) {
        charEl.innerText = t.replace(/\s/g, "").length;
        wordEl.innerText = t.trim() === "" ? 0 : t.trim().split(/\s+/).length;
    }
}

// 5. مولد ونسخ كلمات المرور الآمنة
function generatePassword() {
    const c = "abcdefgHIJKLMNOP1234567890!@#$%&*"; let p = "";
    for (let i = 0; i < 14; i++) p += c.charAt(Math.floor(Math.random() * c.length));
    const res = document.getElementById('passwordResult');
    if(res) res.innerText = p;
}
function copyPassword() {
    const txt = document.getElementById('passwordResult')?.innerText;
    if(txt && txt !== "اضغط توليد...") { navigator.clipboard.writeText(txt); alert("📋 تم نسخ كلمة المرور!"); }
}

// 6. محول العملات السريع
function convertCurrency() {
    const usd = parseFloat(document.getElementById('amount')?.value);
    const iqd = document.getElementById('iqdResult'); const egp = document.getElementById('egpResult');
    if(usd && iqd && egp) {
        iqd.innerText = (usd * 1310).toLocaleString();
        egp.innerText = (usd * 48.5).toFixed(2);
    }
}

// 7. لوحة الرسم الاحترافية (معادلة تصحيح المسافة واللمس الدقيق)
const canvas = document.getElementById('paintCanvas');
if(canvas) {
    const ctx = canvas.getContext('2d'); let drawing = false;
    const colorInput = document.getElementById('brushColor');
    const widthInput = document.getElementById('brushWidth');

    const getCoords = (clientX, clientY) => {
        const r = canvas.getBoundingClientRect();
        return { x: (clientX - r.left) * (canvas.width / r.width), y: (clientY - r.top) * (canvas.height / r.height) };
    };
    const draw = (clientX, clientY) => {
        if (!drawing) return;
        ctx.lineWidth = widthInput ? widthInput.value : 3;
        ctx.strokeStyle = colorInput ? colorInput.value : '#4361ee';
        ctx.lineCap = ctx.lineJoin = 'round';
        const c = getCoords(clientX, clientY);
        ctx.lineTo(c.x, c.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(c.x, c.y);
    };

    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
    canvas.addEventListener('mousemove', (e) => draw(e.clientX, e.clientY));
    
    canvas.addEventListener('touchstart', (e) => { drawing = true; const t = e.touches[0]; draw(t.clientX, t.clientY); });
    canvas.addEventListener('touchend', () => { drawing = false; ctx.beginPath(); });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); const t = e.touches[0]; draw(t.clientX, t.clientY); }, { passive: false });
}
function clearCanvas() { canvas && canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); }
function downloadCanvas() {
    if(canvas) {
        const lnk = document.createElement('a'); lnk.download = 'signature.png';
        lnk.href = canvas.toDataURL(); lnk.click();
    }
}

// 8. مفكرة الملاحظات وحفظ المهام
function loadNotes() {
    const saved = localStorage.getItem('userNotes');
    const txt = document.getElementById('notesArea');
    if(saved && txt) txt.value = saved;
}
function saveNotes() {
    const txt = document.getElementById('notesArea')?.value;
    if(txt !== undefined) {
        localStorage.setItem('userNotes', txt);
        const st = document.getElementById('saveStatus');
        if(st) { st.innerText = "✅ تم الحفظ!"; setTimeout(() => st.innerText = "", 2000); }
    }
}

// 9. محول المنطقة الزمنية والتوقيت العالمي
function convertGlobalTime() {
    const val = document.getElementById('localTimeInput')?.value;
    const res = document.getElementById('timeZoneResults');
    if(val && res) {
        const [h, m] = val.split(':'); const d = new Date(); d.setHours(h); d.setMinutes(m);
        const f = (z) => d.toLocaleTimeString('ar-EG', { timeZone: z, hour: '2-digit', minute: '2-digit' });
        res.innerHTML = `<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:15px;">
            <div>🕋 مكة: <b>${f('Asia/Riyadh')}</b></div><div>🇬🇧 لندن: <b>${f('Europe/London')}</b></div>
            <div>🇺🇸 نيويورك: <b>${f('America/New_York')}</b></div><div>🌐 غرينتش: <b>${f('UTC')}</b></div>
        </div>`;
    }
}

// 10. حاسبة النسبة المئوية
function calculatePercentage() {
    const p = parseFloat(document.getElementById('percentNum')?.value);
    const t = parseFloat(document.getElementById('totalNum')?.value);
    const res = document.getElementById('percentResult');
    if(!isNaN(p) && !isNaN(t) && res && t!==0) res.innerText = `${p}% من ${t} هي: ${((p/100)*t).toFixed(2)}`;
}

// 11. حاسبة العمر التفصيلية
function calculateAge() {
    const val = document.getElementById('birthDateInput')?.value;
    const res = document.getElementById('ageResult');
    if(val && res) {
        const b = new Date(val); const n = new Date();
        let y = n.getFullYear() - b.getFullYear(); let m = n.getMonth() - b.getMonth(); let d = n.getDate() - b.getDate();
        if (d < 0) { m--; d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); }
        if (m < 0) { y--; m += 12; }
        res.innerHTML = `عمرك: ${y} سنة، و ${m} شهر، و ${d} يوم. <br> 📅 ولدت يوم: ${["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"][b.getDay()]}`;
    }
}

// 12. حاسبة السعرات الحرارية والمياه Daily Calories
function calculateCaloriesWater() {
    const w = parseFloat(document.getElementById('healthWeight')?.value);
    const res = document.getElementById('healthResult');
    if(w && res) res.innerHTML = `💪 السعرات: <b>${Math.round(w*24*1.2)}</b> | 💧 الماء: <b>${(w*0.035).toFixed(1)} لتر</b>`;
}

// 13. مولد ومستخرج الألوان العشوائية HEX
function generateRandomColor() {
    const rc = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const box = document.getElementById('colorBox'); const cd = document.getElementById('colorCode');
    if(box && cd) { box.style.backgroundColor = rc; cd.innerText = `HEX: ${rc}`; }
}

// 14. نظام البحث التصفوي الفوري الذكي بالواجهة
function searchTools() {
    const q = document.getElementById('toolSearch')?.value.toLowerCase() || "";
    document.querySelectorAll('.tool-card').forEach(c => {
        const match = c.querySelector('h3').innerText.toLowerCase().includes(q) || c.querySelector('p').innerText.toLowerCase().includes(q);
        c.style.display = match ? "block" : "none";
    });
}

// 15. نظام التشغيل والتنفيذ الموحد عند جاهزية الـ DOM
document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    loadNotes();
    if(document.getElementById('colorBox')) generateRandomColor();
});
