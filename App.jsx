import { useState, useEffect, useRef } from "react";

const F = `@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');`;
/* - LIGHT THEME TOKENS - */
const T = {
  bg:"#F5F7FA", surface:"#FFFFFF", surface2:"#EEF3EF", border:"#E2EAE4", border2:"#C6E8D6",
  text:"#0D1F14", text2:"#4A6455", text3:"#8FA898",
  green:"#10B981", greenDark:"#059669", greenBg:"#E8F5EF", greenBdr:"#C6E8D6",
  gold:"#F59E0B", goldBg:"#FEF3C7", red:"#EF4444", redBg:"#FEE2E2", blue:"#38BDF8", blueBg:"#E0F2FE",
};

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body,#root{font-family:'Tajawal',sans-serif;direction:rtl;background:#DDE8DF;min-height:100vh}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideRight{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes glow{0%,100%{box-shadow:0 0 24px rgba(16,185,129,.3)}50%{box-shadow:0 0 55px rgba(16,185,129,.6)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes orbit{from{transform:rotate(0deg) translateX(38px) rotate(0deg)}to{transform:rotate(360deg) translateX(38px) rotate(-360deg)}}
@keyframes ripple{0%{transform:scale(0);opacity:.5}100%{transform:scale(3.5);opacity:0}}
@keyframes checkPop{0%{transform:scale(0) rotate(-20deg)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
@keyframes pinDot{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes scanLine{0%{top:10%}100%{top:85%}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
@keyframes heartPop{0%{transform:scale(1)}40%{transform:scale(1.4)}100%{transform:scale(1)}}
@keyframes badgeIn{0%{transform:scale(0) rotate(-20deg)}70%{transform:scale(1.15)}100%{transform:scale(1)}}
@keyframes notifSlide{from{transform:translateX(110%)}to{transform:translateX(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

.app{min-height:100vh;background:#DDE8DF;font-family:'Tajawal',sans-serif;direction:rtl;display:flex;align-items:center;justify-content:center;padding:16px}
.phone{width:100%;max-width:390px;height:844px;background:#F5F7FA;border-radius:50px;border:1px solid #D0DDD2;position:relative;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.14),0 0 0 6px #fff}
.notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:110px;height:30px;background:#1a1a1a;border-radius:0 0 18px 18px;z-index:20}
.screen{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;padding-bottom:88px;scrollbar-width:none;background:#F5F7FA}
.screen::-webkit-scrollbar{display:none}
.screen-full{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;background:#F5F7FA}
.screen-full::-webkit-scrollbar{display:none}
.btn{width:100%;padding:16px;border-radius:16px;border:none;font-family:'Tajawal',sans-serif;font-size:16px;font-weight:800;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}
.btn-g{background:linear-gradient(135deg,#10B981,#059669);color:#fff;box-shadow:0 4px 16px rgba(16,185,129,.35)}
.btn-g:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 24px rgba(16,185,129,.45)}
.btn-g:disabled{opacity:.35;cursor:not-allowed}
.btn-ghost{background:#fff;border:1.5px solid #D4E8DB;color:#4A6455}
.btn-ghost:hover{border-color:#10B981;color:#10B981}
.card{background:#fff;border:1px solid #E8EDE9;border-radius:20px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,.05)}
.card-g{background:#E8F5EF;border:1px solid #C6E8D6;border-radius:20px;padding:16px}
.inp{width:100%;background:#fff;border:1.5px solid #E2EAE4;border-radius:14px;padding:13px 16px;color:#0D1F14;font-family:'Tajawal',sans-serif;font-size:15px;outline:none;transition:all .25s;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.inp:focus{border-color:#10B981;box-shadow:0 0 0 3px rgba(16,185,129,.1)}
.inp::placeholder{color:#9BB5A3}
.inp.valid{border-color:#10B981}
.modal-bg{position:absolute;inset:0;background:rgba(13,31,20,.4);backdrop-filter:blur(8px);z-index:40;display:flex;align-items:flex-end}
.modal{background:#fff;border-radius:32px 32px 0 0;padding:28px 24px 44px;width:100%;animation:slideUp .35s ease;border-top:2px solid #E8F5EF;max-height:82vh;overflow-y:auto;box-shadow:0 -8px 40px rgba(0,0,0,.1)}
.tab-bar{display:flex;background:#EEF3EF;border-radius:14px;padding:4px;gap:4px}
.tab{flex:1;padding:10px;border:none;border-radius:10px;font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s}
.tab.on{background:#fff;color:#10B981;box-shadow:0 1px 6px rgba(0,0,0,.08)}
.tab.off{background:transparent;color:#8FA898}
.chip{display:inline-flex;align-items:center;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap;border:1.5px solid transparent;font-family:'Tajawal',sans-serif}
.chip.on{background:#E8F5EF;color:#10B981;border-color:#C6E8D6}
.chip.off{background:#fff;color:#7A9E8A;border-color:#E2EAE4}
.pin-dot{width:18px;height:18px;border-radius:50%;border:2px solid #C6E8D6;transition:all .25s;background:#EEF3EF}
.pin-dot.filled{background:#10B981;border-color:#10B981;animation:pinDot .2s ease}
.pin-key{width:72px;height:72px;border-radius:22px;background:#fff;border:1.5px solid #E2EAE4;color:#0D1F14;font-family:'Tajawal',sans-serif;font-size:22px;font-weight:800;cursor:pointer;transition:all .18s;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:2px;position:relative;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.pin-key:hover{background:#E8F5EF;border-color:#10B981}
.pin-key:active{transform:scale(.93)}
.bnav{position:absolute;bottom:0;left:0;right:0;background:rgba(255,255,255,.97);backdrop-filter:blur(20px);border-top:1px solid #EAF0EB;padding:8px 4px 20px;display:flex;justify-content:space-around;z-index:30;box-shadow:0 -2px 16px rgba(0,0,0,.06)}
.bnav-btn{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 10px;cursor:pointer;border-radius:14px;font-size:10px;font-weight:700;color:#9BB5A3;border:none;background:transparent;font-family:'Tajawal',sans-serif;transition:all .2s}
.bnav-btn.on{color:#10B981;background:#E8F5EF}
.notif-toast{position:absolute;top:44px;left:12px;right:12px;background:#fff;border:1px solid #C6E8D6;border-radius:16px;padding:14px 16px;z-index:50;display:flex;gap:12px;align-items:center;animation:notifSlide .35s ease;box-shadow:0 8px 28px rgba(0,0,0,.1)}
.ob-dot{height:6px;border-radius:3px;transition:all .4s;background:#D4E8DB}
.ob-dot.a{width:22px;background:#10B981}
.ob-dot.d{width:6px}
`;

/* - Shared Components - */
function Btn({ children, onClick, disabled, ghost, loading }) {
  const [rip, setRip] = useState([]);
  const click = (e) => {
    if (disabled || loading) return;
    const r = { id: Date.now(), x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setRip(p => [...p, r]);
    setTimeout(() => setRip(p => p.filter(x => x.id !== r.id)), 700);
    onClick?.();
  };
  return (
    <button className={`btn ${ghost ? "btn-ghost" : "btn-g"}`} onClick={click} disabled={disabled}>
      {loading ? <div style={{ width:20,height:20,border:"2.5px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto" }}/> : children}
      {rip.map(r => <span key={r.id} style={{ position:"absolute",borderRadius:"50%",background:"#C6E8D6",width:120,height:120,marginTop:-60,marginLeft:-60,left:r.x,top:r.y,animation:"ripple .7s linear",pointerEvents:"none" }}/>)}
    </button>
  );
}

function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ width:38,height:38,borderRadius:12,background:"#F5F7FA",border:"1.5px solid #E2EAE4",cursor:"pointer",color:"#0D1F14",fontSize:16,flexShrink:0 }}>←</button>
  );
}

function NotifToast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); });
  return (
    <div className="notif-toast">
      <div style={{ fontSize:24 }}>{msg.icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:700, color:"#0D1F14" }}>{msg.title}</div>
        <div style={{ fontSize:12, color:"#6A8E7A", marginTop:2 }}>{msg.sub}</div>
      </div>
    </div>
  );
}

/* - Data - */
const STORES = [
  { id:1, name:"نون",     logo:"📦", cat:"إلكترونيات", cashback:"2%"  },
  { id:2, name:"H&M",     logo:"👗", cat:"أزياء",       cashback:"1.5%"},
  { id:3, name:"إيكيا",   logo:"🏠", cat:"أثاث",        cashback:"1%"  },
  { id:4, name:"أديداس",  logo:"👟", cat:"رياضة",       cashback:"2%"  },
  { id:5, name:"سيفورا",  logo:"💄", cat:"جمال",        cashback:"1.5%"},
  { id:6, name:"أمازون",  logo:"🛒", cat:"إلكترونيات",  cashback:"1%"  },
];
const PRODUCTS = [
  { id:1, name:"آيفون 15 برو",   store:"نون",    cat:"إلكترونيات", price:4999, img:"📱", cashback:"2%",  rating:4.8, installments:[4,6,12], badge:"الأكثر مبيعاً" },
  { id:2, name:"سماعة سوني XM5", store:"أمازون", cat:"إلكترونيات", price:1299, img:"🎧", cashback:"1.5%",rating:4.7, installments:[4,6],    badge:"" },
  { id:3, name:"حذاء نايك",      store:"أديداس", cat:"رياضة",       price:599,  img:"👟", cashback:"2%",  rating:4.5, installments:[4],       badge:"عرض محدود" },
  { id:4, name:"عطر أرماني",     store:"سيفورا", cat:"جمال",        price:420,  img:"🌹", cashback:"1.5%",rating:4.6, installments:[4,6],    badge:"" },
  { id:5, name:"طاولة مكتبية",   store:"إيكيا",  cat:"أثاث",        price:850,  img:"🪑", cashback:"1%",  rating:4.3, installments:[4,6,12], badge:"" },
  { id:6, name:"جاكيت H&M",     store:"H&M",    cat:"أزياء",       price:320,  img:"🧥", cashback:"1.5%",rating:4.4, installments:[4],       badge:"جديد" },
];
const ORDERS_DATA = [
  { id:"MY-001", store:"نون",    item:"آيفون 15 برو", total:4999, paid:2, of:4, next:"15 مارس", daysLeft:5,  logo:"📦", status:"active" },
  { id:"MY-002", store:"أديداس",item:"حذاء نايك",    total:599,  paid:1, of:4, next:"20 مارس", daysLeft:10, logo:"👟", status:"active" },
  { id:"MY-003", store:"إيكيا",  item:"طاولة مكتبية",total:850,  paid:4, of:4, next:"—",       daysLeft:0,  logo:"🏠", status:"done"   },
];
const NOTIFS_DATA = [
  { id:1, icon:"⏰", title:"قسطك القادم بعد 5 أيام",  sub:"آيفون 15 برو — 1,250 ريال", time:"منذ ساعة",  read:false },
  { id:2, icon:"✅", title:"تم قبول طلبك",             sub:"حذاء نايك — 4 أقساط",       time:"أمس",       read:false },
  { id:3, icon:"✦", title:"ربحت 150 نقطة!",            sub:"مكافأة الدفع المبكر",        time:"3 أيام",    read:true  },
  { id:4, icon:"🏪", title:"متجر جديد انضم",           sub:"سيفورا — خصم 10% لأول طلب", time:"أسبوع",     read:true  },
];
const FRIENDS = [
  { id:1, name:"سارة",  avatar:"👩", points:1240, level:"ذهبي 🥇",   rank:1 },
  { id:2, name:"أنت",   avatar:"👤", points:830,  level:"فضي 🥈",    rank:2 },
  { id:3, name:"محمد",  avatar:"🧑", points:720,  level:"فضي 🥈",    rank:3 },
  { id:4, name:"نورة",  avatar:"👩", points:560,  level:"برونزي 🥉", rank:4 },
];
const DEALS_DATA = [
  { id:1, user:"أحمد ع.", avatar:"👨", product:"آيفون 15 برو", store:"نون",    saving:"200 ر.س", votes:47, userVoted:false, cashback:"2%",  time:"منذ ساعة",   tag:"إلكترونيات" },
  { id:2, user:"سارة م.", avatar:"👩", product:"عطر شانيل",    store:"سيفورا", saving:"80 ر.س",  votes:31, userVoted:true,  cashback:"1.5%",time:"منذ 3 ساعات", tag:"جمال" },
  { id:3, user:"محمد خ.", avatar:"🧑", product:"سماعة JBL",   store:"أمازون", saving:"150 ر.س", votes:28, userVoted:false, cashback:"1.5%",time:"أمس",         tag:"إلكترونيات" },
  { id:4, user:"نورة ق.", avatar:"👩", product:"حذاء أديداس", store:"أديداس", saving:"60 ر.س",  votes:19, userVoted:false, cashback:"2%",  time:"أمس",         tag:"رياضة" },
];

/* FLOW 1 — ONBOARDING */
const OB = [
  { color:"#10B981", title:"اشتري الآن، ادفع براحتك", sub:"قسّم أي مشتريات على 4 أقساط متساوية — بدون فوائد، بدون رسوم خفية",
    illus:() => (
      <div style={{ width:200,height:200,display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
        {[0,1,2].map(i => <div key={i} style={{ position:"absolute",width:10,height:10,borderRadius:"50%",background:["#10B981","#34D399","#F59E0B"][i],animation:`orbit ${2+i*.5}s linear infinite`,animationDelay:`${i*.3}s` }}/>)}
        <div style={{ width:100,height:100,borderRadius:28,background:"linear-gradient(135deg,#10B981,#065F46)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:46,fontWeight:900,color:"#0D1F14",animation:"glow 2s ease-in-out infinite" }}>م</div>
      </div>
    )
  },
  { color:"#F59E0B", title:"اكسب نقاط مع كل قسط", sub:"كل قسط يكسبك نقاط ذهبية — استبدلها بخصومات في متاجرك المفضلة",
    illus:() => (
      <div style={{ width:200,height:200,display:"flex",alignItems:"center",justifyContent:"center" }}>
        <div style={{ width:120,height:120,borderRadius:"50%",background:"rgba(245,158,11,.12)",border:"2px solid rgba(245,158,11,.3)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4,animation:"pulse 2s ease-in-out infinite" }}>
          <div style={{ fontSize:38 }}>✦</div>
          <div style={{ fontSize:22,fontWeight:900,color:"#F59E0B" }}>830</div>
          <div style={{ fontSize:11,color:"#6A8E7A" }}>نقطة</div>
        </div>
      </div>
    )
  },
  { color:"#38BDF8", title:"قسّط مع أصدقائك", sub:"أول تطبيق يتيح الشراء الجماعي — كل شخص يدفع نصيبه باستقلالية",
    illus:() => (
      <div style={{ width:200,height:200,display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
        <div style={{ width:64,height:64,borderRadius:"50%",background:"rgba(56,189,248,.15)",border:"2px solid rgba(56,189,248,.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,animation:"pulse 2.5s ease-in-out infinite" }}>◈</div>
        {[["👤","أنت",-80,-10],["👩","سارة",40,-60],["🧑","محمد",40,50]].map(([ic,nm,x,y],i)=>(
          <div key={i} style={{ position:"absolute",left:`calc(50% + ${x}px)`,top:`calc(50% + ${y}px)`,display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
            <div style={{ width:44,height:44,borderRadius:"50%",background:"rgba(56,189,248,.1)",border:"1.5px solid rgba(56,189,248,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{ic}</div>
            <span style={{ fontSize:10,color:"#4A6455",fontWeight:700 }}>{nm}</span>
          </div>
        ))}
      </div>
    )
  }
];

function OnboardingScreen({ onDone }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const s = OB[idx];
  const next = () => { if(idx<2){setDir(1);setIdx(i=>i+1);}else onDone(); };
  const prev = () => { if(idx>0){setDir(-1);setIdx(i=>i-1);} };
  return (
    <div className="screen-full" style={{ display:"flex",flexDirection:"column",alignItems:"center",padding:"50px 28px 40px",background:`radial-gradient(ellipse at 50% 30%,${s.color}0d 0%,transparent 65%)` }}>
      <button onClick={onDone} style={{ alignSelf:"flex-start",background:"#EAF0EB",border:"1px solid #D4E8DB",borderRadius:20,padding:"6px 14px",color:"#6A8E7A",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Tajawal,sans-serif",marginBottom:20 }}>تخطى</button>
      <div style={{ display:"flex",gap:7,marginBottom:28 }}>
        {OB.map((_,i)=><div key={i} className={`ob-dot ${i===idx?"a":"d"}`} onClick={()=>setIdx(i)} style={{ cursor:"pointer" }}/>)}
      </div>
      <div key={idx} style={{ marginBottom:28,animation:`${dir>0?"slideLeft":"slideRight"} .4s ease` }}><s.illus/></div>
      <div key={`t${idx}`} style={{ animation:"fadeUp .4s ease",textAlign:"center",marginBottom:32 }}>
        <div style={{ fontSize:26,fontWeight:900,color:"#0D1F14",marginBottom:12,lineHeight:1.25 }}>{s.title}</div>
        <div style={{ fontSize:14,color:"#7A9E8A",lineHeight:1.7 }}>{s.sub}</div>
      </div>
      <div style={{ width:"100%",display:"flex",gap:12,marginTop:"auto" }}>
        {idx>0&&<Btn ghost onClick={prev}>← رجوع</Btn>}
        <Btn onClick={next}>{idx<2?"التالي ←":"ابدأ الآن 🚀"}</Btn>
      </div>
    </div>
  );
}

/* FLOW 2 — AUTH */
function AuthScreen({ onDone }) {
  const [step, setStep] = useState(1);
  const [idNum, setIdNum]   = useState("");
  const [phone, setPhone]   = useState("");
  const [otp, setOtp]       = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer]   = useState(60);
  const otpRef = useRef();

  useEffect(() => {
    if (step!==3) return;
    const t = setInterval(() => setTimer(x => x>0?x-1:0), 1000);
    setTimeout(() => otpRef.current?.focus(), 300);
    return () => clearInterval(t);
  }, [step]);

  useEffect(() => {
    if (otp.length === 4) {
      setLoading(true);
      setTimeout(() => { setLoading(false); onDone(); }, 1200);
    }
  }, [otp]);

  const idValid    = idNum.length===10 && (idNum[0]==="1"||idNum[0]==="2");
  const phoneValid = phone.length===10 && phone[0]==="0";
  const submitId   = () => { setLoading(true); setTimeout(()=>{setLoading(false);setStep(2);},1000); };
  const submitPh   = () => { setLoading(true); setTimeout(()=>{setLoading(false);setStep(3);setTimer(60);},1000); };

  return (
    <div className="screen-full" style={{ display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 28px 40px",background:"radial-gradient(ellipse at 50% 20%,rgba(16,185,129,.08) 0%,transparent 60%)" }}>
      <div style={{ width:64,height:64,borderRadius:20,background:"linear-gradient(135deg,#10B981,#065F46)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:900,color:"#fff",marginBottom:20,animation:"glow 2.5s ease-in-out infinite" }}>م</div>
      <div style={{ fontSize:22,fontWeight:900,color:"#0D1F14",marginBottom:8,animation:"fadeDown .35s ease" }}>
        {step===1?"أدخل رقم هويتك":step===2?"رقم جوالك":"رمز التحقق"}
      </div>
      <div style={{ fontSize:13,color:"#6A8E7A",marginBottom:32,textAlign:"center" }}>
        {step===1?"رقم الهوية الوطنية — 10 أرقام":step===2?"سنرسل لك رمز OTP":`أرسلنا رمزاً إلى ${phone}`}
      </div>

      {step===1&&(
        <div style={{ width:"100%" }}>
          <input className={`inp ${idNum.length>0?idValid?"valid":"":""}`} placeholder="1XXXXXXXXX" maxLength={10} value={idNum} onChange={e=>/^\d*$/.test(e.target.value)&&setIdNum(e.target.value)} style={{ fontSize:22,fontWeight:700,textAlign:"center",letterSpacing:4,marginBottom:16 }}/>
          {idNum.length>0&&!idValid&&<div style={{ fontSize:12,color:"#EF4444",textAlign:"center",marginBottom:12 }}>يجب أن يبدأ بـ 1 أو 2 ويكون 10 أرقام</div>}
          <Btn disabled={!idValid} loading={loading} onClick={submitId}>متابعة ←</Btn>
        </div>
      )}

      {step===2&&(
        <div style={{ width:"100%" }}>
          <div style={{ display:"flex",gap:10,marginBottom:16 }}>
            <div style={{ background:"#F5F7FA",border:"1.5px solid #E2EAE4",borderRadius:14,padding:"13px 14px",color:"#4A6455",fontSize:14,fontWeight:700,whiteSpace:"nowrap" }}>🇸🇦 +966</div>
            <input className={`inp ${phone.length>0?phoneValid?"valid":"":""}`} placeholder="05XXXXXXXX" maxLength={10} value={phone} onChange={e=>/^\d*$/.test(e.target.value)&&setPhone(e.target.value)} style={{ fontSize:18,fontWeight:700 }}/>
          </div>
          <Btn disabled={!phoneValid} loading={loading} onClick={submitPh}>إرسال الرمز ←</Btn>
        </div>
      )}

      {step===3&&(
        <div style={{ width:"100%",textAlign:"center" }}>
          {/* Hidden real input — iOS يكتب فيه مباشرة */}
          <input
            ref={otpRef}
            value={otp}
            onChange={e => {
              const v = e.target.value.replace(/\D/g,"").slice(0,4);
              setOtp(v);
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            style={{ position:"absolute", opacity:0, width:1, height:1, pointerEvents:"none" }}
          />
          {/* الخانات المرئية — تفتح الكيبورد عند الضغط */}
          <div
            style={{ display:"flex",gap:12,justifyContent:"center",marginBottom:20,cursor:"text" }}
            onClick={() => otpRef.current?.focus()}
          >
            {[0,1,2,3].map(i=>(
              <div key={i} style={{
                width:64, height:68, borderRadius:16,
                background: i < otp.length ? "#E8F5EF" : "#F5F7FA",
                border: `2px solid ${i===otp.length?"#10B981": i<otp.length?"#C6E8D6":"#E2EAE4"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:30, fontWeight:900, color:"#0D1F14",
                transition:"all .2s",
                boxShadow: i===otp.length ? "0 0 0 3px rgba(16,185,129,.15)" : "none",
                animation: i < otp.length ? "pinDot .15s ease" : "none",
              }}>
                {otp[i] ? "●" : i===otp.length ? <span style={{ width:2,height:28,background:"#10B981",borderRadius:2,animation:"blink 1s ease-in-out infinite" }}/> : ""}
              </div>
            ))}
          </div>
          {loading && <div style={{ width:24,height:24,border:"3px solid #C6E8D6",borderTopColor:"#10B981",borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto 16px" }}/>}
          <div style={{ fontSize:13,color:"#8FA898",marginTop:4 }}>
            اضغط على الخانات لفتح لوحة الأرقام 👆
          </div>
          <div style={{ fontSize:12,color:"#9BB5A3",marginTop:8 }}>
            {timer>0?`إعادة إرسال بعد ${timer}ث`:<button onClick={()=>setTimer(60)} style={{ background:"transparent",border:"none",color:"#10B981",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>إعادة إرسال</button>}
          </div>
        </div>
      )}

      <div style={{ display:"flex",gap:6,marginTop:32 }}>
        {[1,2,3].map(i=><div key={i} style={{ width:i===step?22:6,height:6,borderRadius:3,background:step>=i?"#10B981":"#D4E8DB",transition:"all .3s" }}/>)}
      </div>
    </div>
  );
}

/* FLOW 3 — PIN */
const PIN_KEYS = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[null],[0],["⌫"]];
function PinScreen({ mode, onDone }) {
  const [pin,setPin]=useState(""); const [first,setFirst]=useState(""); const [step,setStep]=useState(1);
  const [shaking,setShaking]=useState(false); const [success,setSuccess]=useState(false); const [err,setErr]=useState("");
  const press=(k)=>{
    if(success)return;
    if(k==="⌫"){setPin(p=>p.slice(0,-1));setErr("");return;}
    if(k===null)return;
    const n=pin+k; setPin(n);
    if(n.length===4){
      setTimeout(()=>{
        if(mode==="enter"){
          if(n==="1234"){setSuccess(true);setTimeout(()=>onDone(),1200);}
          else{setShaking(true);setErr("رمز خاطئ");setTimeout(()=>{setShaking(false);setPin("");setErr("");},700);}
        } else {
          if(step===1){setFirst(n);setPin("");setStep(2);}
          else if(n===first){setSuccess(true);setTimeout(()=>onDone(),1200);}
          else{setShaking(true);setErr("الرمزان لا يتطابقان");setTimeout(()=>{setShaking(false);setPin("");setStep(1);setFirst("");setErr("");},700);}
        }
      },100);
    }
  };
  return (
    <div className="screen-full" style={{ display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 28px 40px",background:"radial-gradient(ellipse at 50% 20%,rgba(16,185,129,.08) 0%,transparent 60%)" }}>
      <div style={{ width:64,height:64,borderRadius:20,background:"rgba(16,185,129,.1)",border:"1.5px solid rgba(16,185,129,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,marginBottom:20,animation:"glow 2.5s ease-in-out infinite" }}>{success?"✅":"🔐"}</div>
      <div style={{ fontSize:21,fontWeight:900,color:"#0D1F14",marginBottom:8 }}>{mode==="enter"?"أدخل رمز الدخول":step===1?"أنشئ رمز PIN":"أكد رمز PIN"}</div>
      <div style={{ fontSize:13,color:"#6A8E7A",marginBottom:32 }}>{success?"جاري الدخول...":mode==="enter"?"4 أرقام للمتابعة":step===1?"اختر رمزاً تتذكره":"أعد إدخال نفس الرمز"}</div>
      <div style={{ display:"flex",gap:14,marginBottom:32,animation:shaking?"shake .4s ease":"none" }}>
        {[0,1,2,3].map(i=><div key={i} className={`pin-dot ${i<pin.length?"filled":""}`}/>)}
      </div>
      {err&&<div style={{ fontSize:12,color:"#FCA5A5",marginBottom:14,animation:"fadeIn .2s ease" }}>{err}</div>}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,72px)",gap:14 }}>
        {PIN_KEYS.map(([k],i)=>(
          <button key={i} className="pin-key" onClick={()=>press(k)} style={{ opacity:k===null?0:1,cursor:k===null?"default":"pointer" }}>
            {k==="⌫"?"⌫":k===null?"":k}
          </button>
        ))}
      </div>
      {mode==="enter"&&<button onClick={()=>onDone()} style={{ marginTop:20,background:"transparent",border:"none",color:"#9BB5A3",fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>تخطى الآن</button>}
    </div>
  );
}

/* MAIN APP SCREENS */

/* - HOME - */
function HomeScreen({ go, notifCount, orders }) {
  const active = orders.filter(o=>o.status==="active");
  return (
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,animation:"fadeDown .35s ease" }}>
        <div>
          <div style={{ color:"#8FA898",fontSize:12 }}>مرحباً 👋</div>
          <div style={{ fontSize:22,fontWeight:900,color:"#0D1F14" }}>أحمد العمري</div>
        </div>
        <div style={{ display:"flex",gap:10 }}>
          <button onClick={()=>go("notifs")} style={{ position:"relative",width:42,height:42,borderRadius:14,background:"#F5F7FA",border:"1.5px solid #E2EAE4",cursor:"pointer",fontSize:18 }}>
            🔔{notifCount>0&&<span style={{ position:"absolute",top:6,left:6,width:16,height:16,borderRadius:"50%",background:"#EF4444",fontSize:9,fontWeight:900,color:"#0D1F14",display:"flex",alignItems:"center",justifyContent:"center",animation:"badgeIn .3s ease" }}>{notifCount}</span>}
          </button>
          <button onClick={()=>go("profile")} style={{ width:42,height:42,borderRadius:14,background:"linear-gradient(135deg,#10B981,#065F46)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",border:"none" }}>👤</button>
        </div>
      </div>

      {/* Credit card */}
      <div style={{ background:"linear-gradient(135deg,#059669,#10B981)",border:"1px solid rgba(16,185,129,.2)",borderRadius:24,padding:22,marginBottom:18,position:"relative",overflow:"hidden",animation:"scaleIn .4s ease" }}>
        <div style={{ position:"absolute",top:-30,left:-30,width:140,height:140,borderRadius:"50%",background:"rgba(16,185,129,.05)",pointerEvents:"none" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16 }}>
            <div>
              <div style={{ color:"#6A8E7A",fontSize:12,marginBottom:4 }}>الحد المتاح</div>
              <div style={{ fontSize:34,fontWeight:900,color:"#0D1F14" }}>8,800 <span style={{ fontSize:14,opacity:.5 }}>ر.س</span></div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ width:44,height:44,borderRadius:14,background:"linear-gradient(135deg,#10B981,#065F46)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:"#0D1F14" }}>م</div>
            </div>
          </div>
          <div style={{ height:5,background:"rgba(255,255,255,.25)",borderRadius:5,overflow:"hidden",marginBottom:8 }}>
            <div style={{ height:"100%",width:"41%",background:"rgba(255,255,255,.7)",borderRadius:5 }}/>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,.7)",flex:1 }}>
              <span>مستخدم: 6,200 ر.س</span><span>الكل: 15,000 ر.س</span>
            </div>
          </div>
          <div style={{ display:"flex",gap:8,marginTop:14 }}>
            <button onClick={()=>go("checkout")} style={{ flex:1,background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.3)",borderRadius:12,padding:"9px",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>🏦 تقسيط جديد</button>
            <button onClick={()=>go("goal")} style={{ flex:1,background:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.3)",borderRadius:12,padding:"9px",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>🎯 قسّط هدفك</button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:10,animation:"fadeUp .4s .08s ease both" }}>
        {[
          {icon:"🏦",label:"تقسيط",  s:"checkout"},
          {icon:"📋",label:"أقساطي", s:"orders"},
          {icon:"💳",label:"محفظة",  s:"wallet"},
          {icon:"⏰",label:"تأجيل",  s:"postpone"},
          {icon:"🎯",label:"هدفي",   s:"goal"},
        ].map((a,i)=>(
          <button key={i} onClick={()=>go(a.s)} style={{ background:"#fff",border:"1px solid #E8EDE9",borderRadius:14,padding:"12px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,transition:"all .2s",fontFamily:"Tajawal,sans-serif",boxShadow:"0 1px 4px rgba(0,0,0,.04)" }}
            onMouseEnter={e=>e.currentTarget.style.background="#E8F5EF"}
            onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
            <span style={{ fontSize:20 }}>{a.icon}</span>
            <span style={{ fontSize:9,fontWeight:700,color:"#4A6455" }}>{a.label}</span>
          </button>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:22,animation:"fadeUp .4s .12s ease both" }}>
        {[
          {icon:"🛒",label:"تسوق",   s:"shop"},
          {icon:"🔥",label:"صفقات",  s:"deals"},
          {icon:"📊",label:"ميزانية",s:"budget"},
          {icon:"✦", label:"نقاطي",  s:"rewards"},
          {icon:"👥",label:"أصدقاء", s:"social"},
        ].map((a,i)=>(
          <button key={i} onClick={()=>go(a.s)} style={{ background:"#fff",border:"1px solid #E8EDE9",borderRadius:14,padding:"12px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,transition:"all .2s",fontFamily:"Tajawal,sans-serif",boxShadow:"0 1px 4px rgba(0,0,0,.04)" }}
            onMouseEnter={e=>e.currentTarget.style.background="#E8F5EF"}
            onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
            <span style={{ fontSize:20 }}>{a.icon}</span>
            <span style={{ fontSize:9,fontWeight:700,color:"#4A6455" }}>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Active orders */}
      <div style={{ animation:"fadeUp .4s .14s ease both" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <div style={{ fontSize:16,fontWeight:800,color:"#0D1F14" }}>الأقساط النشطة</div>
          <button onClick={()=>go("orders")} style={{ background:"transparent",border:"1px solid rgba(16,185,129,.3)",borderRadius:10,padding:"4px 12px",color:"#34D399",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>الكل</button>
        </div>
        {active.map((o,i)=>(
          <div key={i} className="card" style={{ marginBottom:10 }}>
            <div style={{ display:"flex",gap:12,alignItems:"center",marginBottom:10 }}>
              <div style={{ width:40,height:40,borderRadius:12,background:"rgba(16,185,129,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{o.logo}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700,fontSize:13,color:"#0D1F14" }}>{o.item}</div>
                <div style={{ fontSize:11,color:"#8FA898" }}>{o.store} · {o.paid}/{o.of} أقساط</div>
              </div>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontWeight:800,color:"#10B981",fontSize:14 }}>{(o.total/o.of).toFixed(0)} ر.س</div>
                <div style={{ fontSize:10,color:o.daysLeft<=5?"#FCA5A5":"rgba(255,255,255,.3)" }}>بعد {o.daysLeft} أيام</div>
              </div>
            </div>
            <div style={{ height:5,background:"#EEF3EF",borderRadius:5,overflow:"hidden" }}>
              <div style={{ height:"100%",width:`${(o.paid/o.of)*100}%`,background:"linear-gradient(90deg,#10B981,#34D399)",borderRadius:5 }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Stores */}
      <div style={{ marginTop:20,animation:"fadeUp .4s .2s ease both" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <div style={{ fontSize:16,fontWeight:800,color:"#0D1F14" }}>المتاجر</div>
          <button onClick={()=>go("shop")} style={{ background:"transparent",border:"1px solid rgba(16,185,129,.3)",borderRadius:10,padding:"4px 12px",color:"#34D399",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>الكل</button>
        </div>
        <div style={{ display:"flex",gap:10,overflowX:"auto",paddingBottom:8 }}>
          {STORES.slice(0,5).map((s,i)=>(
            <button key={i} onClick={()=>go("shop")} style={{ background:"#fff",border:"1px solid #E8EDE9",borderRadius:14,padding:"12px 14px",cursor:"pointer",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:6,minWidth:72,transition:"all .2s",fontFamily:"Tajawal,sans-serif" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(16,185,129,.3)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.07)"}>
              <span style={{ fontSize:24 }}>{s.logo}</span>
              <span style={{ fontSize:11,fontWeight:700,color:"#2E5040" }}>{s.name}</span>
              <span style={{ fontSize:9,color:"#34D399",fontWeight:700 }}>كاشباك {s.cashback}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* - ORDERS - */
function OrdersScreen({ go, orders }) {
  const [tab, setTab] = useState("active");
  const filtered = orders.filter(o=>o.status===tab||(tab==="done"&&o.status==="done"));
  return (
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20,animation:"fadeDown .35s ease" }}>
        <BackBtn onClick={()=>go("home")}/><div style={{ fontSize:20,fontWeight:900,color:"#0D1F14" }}>أقساطي</div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:18 }}>
        {[{val:"2",label:"نشط",color:"#10B981"},{val:"6,849",label:"ر.س مجموع",color:"#38BDF8"},{val:"1,250",label:"قسط قادم",color:"#F59E0B"}].map((s,i)=>(
          <div key={i} className="card" style={{ textAlign:"center" }}>
            <div style={{ fontSize:18,fontWeight:900,color:s.color }}>{s.val}</div>
            <div style={{ fontSize:10,color:"#8FA898",marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="tab-bar" style={{ marginBottom:18 }}>
        {[{id:"active",label:"نشطة"},{id:"done",label:"مكتملة"}].map(t=>(
          <button key={t.id} className={`tab ${tab===t.id?"on":"off"}`} onClick={()=>setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      {orders.filter(o=>tab==="active"?o.status==="active":o.status==="done").map((o,i)=>(
        <div key={i} className="card" style={{ marginBottom:12,animation:`fadeUp .4s ${i*.07}s ease both` }}>
          <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:12 }}>
            <div style={{ width:44,height:44,borderRadius:13,background:"rgba(16,185,129,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{o.logo}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800,fontSize:14,color:"#0D1F14",marginBottom:2 }}>{o.item}</div>
              <div style={{ fontSize:12,color:"#8FA898" }}>{o.store} · {o.id}</div>
            </div>
            <span style={{ background:o.status==="active"?"rgba(16,185,129,.15)":"rgba(245,158,11,.15)",color:o.status==="active"?"#34D399":"#FCD34D",border:`1px solid ${o.status==="active"?"rgba(16,185,129,.25)":"rgba(245,158,11,.25)"}`,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700 }}>
              {o.status==="active"?"نشط":"مكتمل"}
            </span>
          </div>
          <div style={{ display:"flex",gap:5,marginBottom:8 }}>
            {Array.from({length:o.of}).map((_,idx)=>(
              <div key={idx} style={{ flex:1,height:5,borderRadius:3,background:idx<o.paid?"linear-gradient(90deg,#10B981,#34D399)":"rgba(255,255,255,.08)" }}/>
            ))}
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:12 }}>
            <span style={{ color:"#6A8E7A" }}>{o.paid}/{o.of} أقساط</span>
            {o.status==="active"&&<span style={{ color:o.daysLeft<=5?"#FCA5A5":"#34D399",fontWeight:700 }}>القادم: {o.next}</span>}
            {o.status==="done"&&<span style={{ color:"#10B981",fontWeight:700 }}>✓ مكتمل</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* - SHOP - */
function ShopScreen({ go }) {
  const [search,setSearch]=useState(""); const [cat,setCat]=useState("الكل"); const [wishlist,setWishlist]=useState([]);
  const [compare,setCompare]=useState([]); const [compareOpen,setCompareOpen]=useState(false); const [sel,setSel]=useState(null);
  const CATS=["الكل","إلكترونيات","أزياء","رياضة","جمال","أثاث"];
  const filtered=PRODUCTS.filter(p=>(cat==="الكل"||p.cat===cat)&&p.name.includes(search));
  const toggleW=(id)=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const toggleC=(id)=>{if(compare.includes(id)){setCompare(c=>c.filter(x=>x!==id));return;}if(compare.length>=2)return;setCompare(c=>[...c,id]);};
  const cItems=PRODUCTS.filter(p=>compare.includes(p.id));
  return (
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,animation:"fadeDown .35s ease" }}>
        <div style={{ fontSize:20,fontWeight:900,color:"#0D1F14" }}>اكتشف وقسّط 🛍️</div>
        {wishlist.length>0&&<button onClick={()=>go("wishlist")} style={{ position:"relative",width:38,height:38,borderRadius:12,background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",cursor:"pointer",fontSize:18 }}>❤️<span style={{ position:"absolute",top:-4,left:-4,width:16,height:16,borderRadius:"50%",background:"#EF4444",fontSize:9,fontWeight:900,color:"#0D1F14",display:"flex",alignItems:"center",justifyContent:"center" }}>{wishlist.length}</span></button>}
      </div>
      <input className="inp" placeholder="🔍  ابحث..." value={search} onChange={e=>setSearch(e.target.value)} style={{ marginBottom:12 }}/>
      <div style={{ display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:14 }}>
        {CATS.map(c=><button key={c} className={`chip ${cat===c?"on":"off"}`} onClick={()=>setCat(c)}>{c}</button>)}
      </div>
      {compare.length>0&&(
        <div style={{ background:"rgba(56,189,248,.08)",border:"1px solid rgba(56,189,248,.2)",borderRadius:12,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <span style={{ fontSize:12,color:"#7DD3FC",fontWeight:700 }}>{cItems.map(p=>p.name.split(" ")[0]).join(" vs ")}</span>
          {compare.length===2?<button onClick={()=>setCompareOpen(true)} style={{ background:"rgba(56,189,248,.2)",border:"none",borderRadius:8,padding:"5px 12px",color:"#38BDF8",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>قارن ⚖️</button>:<span style={{ fontSize:11,color:"#8FA898" }}>اختر آخر</span>}
        </div>
      )}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
        {filtered.map((p,i)=>(
          <div key={p.id} style={{ background:"#fff",border:`1px solid ${compare.includes(p.id)?"rgba(56,189,248,.4)":"rgba(255,255,255,.07)"}`,borderRadius:18,overflow:"hidden",animation:`fadeUp .4s ${i*.06}s ease both`,transition:"border-color .2s" }}>
            <div style={{ background:"#FAFCFA",padding:18,textAlign:"center",position:"relative",cursor:"pointer" }} onClick={()=>setSel(p)}>
              {p.badge&&<span style={{ position:"absolute",top:8,right:8,background:"rgba(16,185,129,.2)",color:"#34D399",border:"1px solid rgba(16,185,129,.3)",borderRadius:8,padding:"2px 7px",fontSize:9,fontWeight:800 }}>{p.badge}</span>}
              <div style={{ fontSize:44 }}>{p.img}</div>
            </div>
            <div style={{ padding:"10px 12px" }}>
              <div style={{ fontSize:12,fontWeight:700,color:"#0D1F14",marginBottom:3,lineHeight:1.3 }}>{p.name}</div>
              <div style={{ fontSize:10,color:"#8FA898",marginBottom:6 }}>⭐ {p.rating} · {p.store}</div>
              <div style={{ fontSize:17,fontWeight:900,color:"#10B981",marginBottom:8 }}>{(p.price/4).toFixed(0)}<span style={{ fontSize:9,opacity:.6 }}> ر.س/شهر</span></div>
              <div style={{ display:"flex",gap:6 }}>
                <button onClick={()=>toggleW(p.id)} style={{ flex:1,padding:"6px",borderRadius:9,background:wishlist.includes(p.id)?"rgba(239,68,68,.15)":"rgba(255,255,255,.05)",border:`1px solid ${wishlist.includes(p.id)?"rgba(239,68,68,.3)":"rgba(255,255,255,.08)"}`,cursor:"pointer",fontSize:13,animation:wishlist.includes(p.id)?"heartPop .3s ease":"none" }}>{wishlist.includes(p.id)?"❤️":"🤍"}</button>
                <button onClick={()=>toggleC(p.id)} style={{ flex:1,padding:"6px",borderRadius:9,background:compare.includes(p.id)?"rgba(56,189,248,.15)":"rgba(255,255,255,.05)",border:`1px solid ${compare.includes(p.id)?"rgba(56,189,248,.3)":"rgba(255,255,255,.08)"}`,cursor:"pointer",fontSize:10,fontWeight:700,color:compare.includes(p.id)?"#38BDF8":"rgba(255,255,255,.4)",fontFamily:"Tajawal,sans-serif" }}>{compare.includes(p.id)?"✓ قارن":"قارن"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Product modal */}
      {sel&&(
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setSel(null)}>
          <div className="modal">
            <div style={{ textAlign:"center",marginBottom:18 }}>
              <div style={{ fontSize:52,marginBottom:10 }}>{sel.img}</div>
              <div style={{ fontSize:18,fontWeight:900,color:"#0D1F14",marginBottom:4 }}>{sel.name}</div>
              <div style={{ fontSize:12,color:"#6A8E7A" }}>{sel.store} · ⭐ {sel.rating}</div>
            </div>
            <div className="card-g" style={{ marginBottom:16 }}>
              {[["السعر الكلي",`${sel.price} ر.س`],["الكاشباك",sel.cashback],["أقل قسط",`${(sel.price/Math.max(...sel.installments)).toFixed(0)} ر.س/شهر`]].map(([l,v],i)=>(
                <div key={i} style={{ display:"flex",justifyContent:"space-between",marginBottom:i<2?10:0,paddingBottom:i<2?10:0,borderBottom:i<2?"1px solid rgba(255,255,255,.06)":"none" }}>
                  <span style={{ color:"#6A8E7A",fontSize:13 }}>{l}</span>
                  <span style={{ fontWeight:700,color:"#0D1F14",fontSize:13 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex",gap:10 }}>
              <button onClick={()=>toggleW(sel.id)} style={{ width:48,height:48,borderRadius:13,background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",cursor:"pointer",fontSize:20,flexShrink:0 }}>{wishlist.includes(sel.id)?"❤️":"🤍"}</button>
              <Btn onClick={()=>setSel(null)}>قسّط الآن 🚀</Btn>
            </div>
          </div>
        </div>
      )}
      {/* Compare modal */}
      {compareOpen&&cItems.length===2&&(
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setCompareOpen(false)}>
          <div className="modal">
            <div style={{ fontSize:16,fontWeight:900,color:"#0D1F14",marginBottom:16 }}>⚖️ مقارنة</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16 }}>
              {cItems.map((p,i)=><div key={i} style={{ background:"#fff",borderRadius:14,padding:12,textAlign:"center" }}><div style={{ fontSize:30,marginBottom:6 }}>{p.img}</div><div style={{ fontSize:12,fontWeight:800,color:"#0D1F14" }}>{p.name}</div></div>)}
            </div>
            {[["السعر الكلي",cItems.map(p=>`${p.price} ر.س`)],["القسط",cItems.map(p=>`${(p.price/4).toFixed(0)} ر.س`)],["التقييم",cItems.map(p=>`⭐ ${p.rating}`)]].map(([label,vals],i)=>(
              <div key={i} style={{ display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,marginBottom:10,alignItems:"center" }}>
                <div style={{ background:"#fff",borderRadius:10,padding:"8px",textAlign:"center",fontSize:13,fontWeight:700,color:"#2E5040" }}>{vals[0]}</div>
                <div style={{ fontSize:10,color:"#8FA898",textAlign:"center" }}>{label}</div>
                <div style={{ background:"#fff",borderRadius:10,padding:"8px",textAlign:"center",fontSize:13,fontWeight:700,color:"#2E5040" }}>{vals[1]}</div>
              </div>
            ))}
            <div style={{ display:"flex",gap:10,marginTop:8 }}><Btn ghost onClick={()=>{setCompareOpen(false);setCompare([]); }}>إلغاء</Btn><Btn onClick={()=>setCompareOpen(false)}>اختر ←</Btn></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* - WALLET - */
function WalletScreen({ go }) {
  const [tab,setTab]=useState("overview");
  const txns=[
    {icon:"📦",name:"نون",type:"شراء",amt:-1250,date:"اليوم",cashback:25,color:"#EF4444"},
    {icon:"✦",name:"كاشباك",type:"مكافأة",amt:+25,date:"اليوم",cashback:0,color:"#F59E0B"},
    {icon:"👟",name:"أديداس",type:"شراء",amt:-163,date:"أمس",cashback:5,color:"#EF4444"},
    {icon:"🏠",name:"إيكيا",type:"قسط مكتمل",amt:-850,date:"3 أيام",cashback:17,color:"#10B981"},
  ];
  const cashbackTotal=47;
  return (
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:18,animation:"fadeDown .35s ease" }}>
        <BackBtn onClick={()=>go("home")}/><div style={{ fontSize:20,fontWeight:900,color:"#0D1F14" }}>محفظتي 💳</div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16 }}>
        {[{label:"إجمالي المشتريات",val:"2,263",color:"#EF4444",icon:"🛒",bg:"rgba(239,68,68,.08)"},{label:"كاشباك مكتسب",val:`${cashbackTotal}`,color:"#F59E0B",icon:"✦",bg:"rgba(245,158,11,.08)"}].map((c,i)=>(
          <div key={i} style={{ background:c.bg,border:`1px solid ${c.color}22`,borderRadius:18,padding:14,animation:`scaleIn .4s ${i*.08}s ease both` }}>
            <div style={{ fontSize:20,marginBottom:8 }}>{c.icon}</div>
            <div style={{ fontSize:22,fontWeight:900,color:c.color }}>{c.val}<span style={{ fontSize:11,opacity:.7 }}> ر.س</span></div>
            <div style={{ fontSize:10,color:"#6A8E7A",marginTop:3 }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div className="card-g" style={{ marginBottom:16 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
          <div style={{ fontSize:13,fontWeight:700,color:"#0D1F14" }}>كاشباك هذا الشهر</div>
          <span style={{ background:"rgba(16,185,129,.15)",color:"#34D399",border:"1px solid rgba(16,185,129,.25)",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700 }}>مارس</span>
        </div>
        <div style={{ fontSize:32,fontWeight:900,color:"#10B981",marginBottom:10 }}>{cashbackTotal} <span style={{ fontSize:12,opacity:.6 }}>ر.س</span></div>
        <div style={{ height:6,background:"#EAF0EB",borderRadius:6,overflow:"hidden",marginBottom:6 }}>
          <div style={{ height:"100%",width:`${(cashbackTotal/200)*100}%`,background:"linear-gradient(90deg,#10B981,#34D399)",borderRadius:6 }}/>
        </div>
        <div style={{ fontSize:11,color:"#8FA898" }}>{cashbackTotal} من 200 ر.س لمستوى ذهبي 🥇</div>
      </div>
      <div className="tab-bar" style={{ marginBottom:16 }}>
        {[{id:"overview",label:"نظرة عامة"},{id:"txns",label:"العمليات"}].map(t=>(
          <button key={t.id} className={`tab ${tab===t.id?"on":"off"}`} onClick={()=>setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      {tab==="overview"&&(
        <div>
          {[{cat:"إلكترونيات",pct:55,amt:1250,color:"#38BDF8"},{cat:"رياضة",pct:28,amt:163,color:"#A78BFA"},{cat:"أثاث",pct:17,amt:850,color:"#10B981"}].map((c,i)=>(
            <div key={i} style={{ marginBottom:12 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12 }}>
                <span style={{ color:"#2E5040",fontWeight:600 }}>{c.cat}</span>
                <span style={{ color:c.color,fontWeight:800 }}>{c.amt} ر.س</span>
              </div>
              <div style={{ height:7,background:"#EEF3EF",borderRadius:7,overflow:"hidden" }}>
                <div style={{ height:"100%",width:`${c.pct}%`,background:c.color,borderRadius:7,opacity:.8 }}/>
              </div>
            </div>
          ))}
          <div style={{ marginTop:16 }}><Btn onClick={()=>go("withdraw")}>سحب الكاشباك 💸</Btn></div>
        </div>
      )}
      {tab==="txns"&&txns.map((t,i)=>(
        <div key={i} style={{ display:"flex",gap:12,alignItems:"center",padding:"12px 14px",marginBottom:8,background:"#FAFCFA",border:"1px solid #EEF3EF",borderRadius:14 }}>
          <div style={{ width:40,height:40,borderRadius:12,background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>{t.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700,fontSize:13,color:"#0D1F14" }}>{t.name}</div>
            <div style={{ fontSize:11,color:"#8FA898" }}>{t.type} · {t.date}</div>
          </div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontWeight:800,fontSize:14,color:t.color }}>{t.amt>0?"+":""}{t.amt} ر.س</div>
            {t.cashback>0&&<div style={{ fontSize:10,color:"#F59E0B" }}>+{t.cashback} كاشباك</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* - WITHDRAW - */
function WithdrawScreen({ go }) {
  const [step,setStep]=useState(1); const [method,setMethod]=useState(null); const [amount,setAmount]=useState(""); const [loading,setLoading]=useState(false); const [done,setDone]=useState(false);
  const balance=47; const amt=parseFloat(amount)||0;
  const methods=[{id:"bank",icon:"🏦",label:"حساب بنكي",sub:"IBAN: SA••••4521",time:"1-2 أيام"},{id:"stcpay",icon:"📱",label:"STC Pay",sub:"05••••78",time:"فوري"},{id:"points",icon:"✦",label:"تحويل نقاط",sub:"1 ر.س = 10 نقاط",time:"فوري"}];
  if(done)return(
    <div style={{ padding:"44px 28px 28px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:16 }}>
      <div style={{ fontSize:70,animation:"checkPop .5s ease" }}>✅</div>
      <div style={{ fontSize:22,fontWeight:900,color:"#0D1F14" }}>تم السحب!</div>
      <div style={{ fontSize:14,color:"#6A8E7A" }}>{amt} ر.س في طريقها إليك 💸</div>
      <div style={{ width:"100%",marginTop:8 }}><Btn onClick={()=>go("wallet")}>العودة للمحفظة ←</Btn></div>
    </div>
  );
  return(
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:22 }}>
        <BackBtn onClick={()=>go("wallet")}/><div><div style={{ fontSize:20,fontWeight:900,color:"#0D1F14" }}>سحب الكاشباك</div><div style={{ fontSize:11,color:"#8FA898" }}>الخطوة {step} من 2</div></div>
      </div>
      <div style={{ display:"flex",gap:6,marginBottom:24 }}>{[1,2].map(i=><div key={i} style={{ flex:1,height:4,borderRadius:4,background:step>=i?"linear-gradient(90deg,#10B981,#34D399)":"rgba(255,255,255,.08)",transition:"all .3s" }}/>)}</div>
      <div style={{ background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.2)",borderRadius:18,padding:16,marginBottom:22,textAlign:"center" }}>
        <div style={{ fontSize:12,color:"#6A8E7A",marginBottom:4 }}>الرصيد المتاح</div>
        <div style={{ fontSize:40,fontWeight:900,color:"#F59E0B" }}>{balance}<span style={{ fontSize:14,opacity:.6 }}> ر.س</span></div>
      </div>
      {step===1&&(<div>{methods.map((m,i)=>(
        <div key={i} onClick={()=>setMethod(m.id)} style={{ background:method===m.id?"rgba(16,185,129,.1)":"rgba(255,255,255,.04)",border:`1.5px solid ${method===m.id?"#10B981":"rgba(255,255,255,.08)"}`,borderRadius:16,padding:14,marginBottom:10,cursor:"pointer",display:"flex",gap:12,alignItems:"center",transition:"all .25s" }}>
          <div style={{ width:46,height:46,borderRadius:13,background:`${method===m.id?"rgba(16,185,129,.15)":"rgba(255,255,255,.06)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>{m.icon}</div>
          <div style={{ flex:1 }}><div style={{ fontWeight:700,fontSize:14,color:"#0D1F14" }}>{m.label}</div><div style={{ fontSize:11,color:"#8FA898" }}>{m.sub}</div></div>
          <span style={{ fontSize:11,color:m.time==="فوري"?"#10B981":"#38BDF8",fontWeight:700 }}>{m.time}</span>
        </div>
      ))}<div style={{ marginTop:8 }}><Btn onClick={()=>setStep(2)} disabled={!method}>التالي ←</Btn></div></div>)}
      {step===2&&(<div>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0" style={{ width:"100%",background:"#F5F7FA",border:`1.5px solid ${amt>balance?"rgba(239,68,68,.5)":amt>0?"rgba(16,185,129,.5)":"rgba(255,255,255,.08)"}`,borderRadius:14,padding:"16px",color:"#0D1F14",fontFamily:"Tajawal,sans-serif",fontSize:34,fontWeight:900,textAlign:"center",outline:"none",marginBottom:12 }}/>
        <div style={{ display:"flex",gap:8,marginBottom:20 }}>
          {[10,25,balance].map(q=><button key={q} onClick={()=>setAmount(String(q))} style={{ flex:1,padding:"9px",background:parseFloat(amount)===q?"rgba(16,185,129,.15)":"rgba(255,255,255,.05)",border:`1px solid ${parseFloat(amount)===q?"#10B981":"rgba(255,255,255,.1)"}`,borderRadius:10,color:parseFloat(amount)===q?"#10B981":"rgba(255,255,255,.5)",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif",transition:"all .2s" }}>{q===balance?"الكل":`${q} ر.س`}</button>)}
        </div>
        <div style={{ display:"flex",gap:10 }}><Btn ghost onClick={()=>setStep(1)}>← رجوع</Btn><Btn loading={loading} disabled={!amt||amt>balance} onClick={()=>{setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},1800);}}>تأكيد 💸</Btn></div>
      </div>)}
    </div>
  );
}

/* - DEALS - */
function DealsScreen({ go }) {
  const [deals,setDeals]=useState(DEALS_DATA); const [tag,setTag]=useState("الكل"); const [addOpen,setAddOpen]=useState(false); const [nd,setNd]=useState({product:"",store:"",saving:""}); const [loading,setLoading]=useState(false);
  const vote=(id)=>setDeals(d=>d.map(x=>x.id===id?{...x,votes:x.userVoted?x.votes-1:x.votes+1,userVoted:!x.userVoted}:x));
  const TAGS=["الكل","إلكترونيات","رياضة","جمال"];
  const filtered=(tag==="الكل"?deals:deals.filter(d=>d.tag===tag)).sort((a,b)=>b.votes-a.votes);
  return(
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,animation:"fadeDown .35s ease" }}>
        <div><div style={{ fontSize:20,fontWeight:900,color:"#0D1F14" }}>لوحة الصفقات 🔥</div><div style={{ fontSize:11,color:"#8FA898" }}>صفقات من مجتمع ميسّر</div></div>
        <button onClick={()=>setAddOpen(true)} style={{ background:"linear-gradient(135deg,#10B981,#059669)",border:"none",borderRadius:12,padding:"9px 14px",color:"#0D1F14",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>+ شارك</button>
      </div>
      <div style={{ display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:16 }}>
        {TAGS.map(t=><button key={t} className={`chip ${tag===t?"on":"off"}`} onClick={()=>setTag(t)}>{t}</button>)}
      </div>
      {filtered.map((d,i)=>(
        <div key={d.id} style={{ background:i===0?"rgba(245,158,11,.07)":"rgba(255,255,255,.04)",border:`1px solid ${i===0?"rgba(245,158,11,.2)":"rgba(255,255,255,.07)"}`,borderRadius:18,padding:14,marginBottom:10,animation:`fadeUp .4s ${i*.07}s ease both` }}>
          <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:10 }}>
            <div style={{ width:38,height:38,borderRadius:12,background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>{d.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800,fontSize:13,color:"#0D1F14" }}>{d.product}</div>
              <div style={{ fontSize:11,color:"#8FA898" }}>{d.store} · {d.user} · {d.time}</div>
            </div>
            {i===0&&<span style={{ background:"rgba(245,158,11,.2)",color:"#FCD34D",border:"1px solid rgba(245,158,11,.3)",borderRadius:8,padding:"2px 8px",fontSize:10,fontWeight:800 }}>🔥 الأفضل</span>}
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div><span style={{ fontSize:16,fontWeight:900,color:"#10B981" }}>وفّر {d.saving}</span><span style={{ fontSize:10,color:"#8FA898",marginRight:6 }}>+ كاشباك {d.cashback}</span></div>
            <button onClick={()=>vote(d.id)} style={{ display:"flex",alignItems:"center",gap:6,background:d.userVoted?"rgba(16,185,129,.15)":"rgba(255,255,255,.05)",border:`1px solid ${d.userVoted?"rgba(16,185,129,.3)":"rgba(255,255,255,.08)"}`,borderRadius:10,padding:"7px 12px",cursor:"pointer",color:d.userVoted?"#10B981":"rgba(255,255,255,.4)",fontWeight:800,fontSize:12,fontFamily:"Tajawal,sans-serif",transition:"all .2s" }}>👍 {d.votes}</button>
          </div>
        </div>
      ))}
      {addOpen&&(
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setAddOpen(false)}>
          <div className="modal">
            <div style={{ fontSize:17,fontWeight:900,color:"#0D1F14",marginBottom:16 }}>🔥 شارك صفقتك</div>
            <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:14 }}>
              <input className="inp" placeholder="اسم المنتج" value={nd.product} onChange={e=>setNd(p=>({...p,product:e.target.value}))}/>
              <input className="inp" placeholder="المتجر" value={nd.store} onChange={e=>setNd(p=>({...p,store:e.target.value}))}/>
              <input className="inp" placeholder="المبلغ الموفّر (ر.س)" type="number" value={nd.saving} onChange={e=>setNd(p=>({...p,saving:e.target.value}))}/>
            </div>
            <div className="card-g" style={{ marginBottom:14,fontSize:12,color:"#6A8E7A" }}>💡 ستكسب <span style={{ color:"#F59E0B",fontWeight:700 }}>50 نقطة</span> عند مشاركة صفقة موثقة</div>
            <div style={{ display:"flex",gap:10 }}>
              <Btn ghost onClick={()=>setAddOpen(false)}>إلغاء</Btn>
              <Btn loading={loading} disabled={!nd.product||!nd.store||!nd.saving} onClick={()=>{setLoading(true);setTimeout(()=>{setDeals(d=>[{id:Date.now(),user:"أنت",avatar:"👤",product:nd.product,store:nd.store,saving:nd.saving+" ر.س",votes:1,userVoted:true,cashback:"2%",time:"الآن",tag:"إلكترونيات"},...d]);setLoading(false);setAddOpen(false);setNd({product:"",store:"",saving:""});},1500);}}>نشر 🚀</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* - SOCIAL - */
function SocialScreen({ go }) {
  const [tab,setTab]=useState("group"); const [gStep,setGStep]=useState(1); const [product,setProduct]=useState(null); const [invited,setInvited]=useState([]); const [loading,setLoading]=useState(false); const [sent,setSent]=useState(false);
  const togInv=(id)=>setInvited(i=>i.includes(id)?i.filter(x=>x!==id):[...i,id]);
  return(
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ fontSize:20,fontWeight:900,color:"#0D1F14",marginBottom:16,animation:"fadeDown .35s ease" }}>المجتمع 👥</div>
      <div className="tab-bar" style={{ marginBottom:18 }}>
        {[{id:"group",label:"◈ قسّط مع صديق"},{id:"leader",label:"🏆 ليدربورد"}].map(t=>(
          <button key={t.id} className={`tab ${tab===t.id?"on":"off"}`} onClick={()=>setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      {tab==="group"&&!sent&&(
        <div>
          <div style={{ display:"flex",gap:6,marginBottom:20 }}>
            {["اختر منتج","ادعو أصدقاء","أرسل"].map((s,i)=>(
              <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
                <div style={{ width:30,height:30,borderRadius:"50%",background:gStep>i?"linear-gradient(135deg,#10B981,#059669)":"rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:gStep>i?"#fff":"rgba(255,255,255,.3)",transition:"all .3s" }}>{gStep>i+1?"✓":i+1}</div>
                <div style={{ fontSize:9,color:gStep===i+1?"#10B981":"rgba(255,255,255,.3)",fontWeight:700,textAlign:"center" }}>{s}</div>
              </div>
            ))}
          </div>
          {gStep===1&&(<div>{PRODUCTS.slice(0,4).map((p,i)=>(
            <div key={p.id} onClick={()=>setProduct(p)} style={{ background:product?.id===p.id?"rgba(16,185,129,.1)":"rgba(255,255,255,.04)",border:`1.5px solid ${product?.id===p.id?"#10B981":"rgba(255,255,255,.08)"}`,borderRadius:14,padding:12,marginBottom:10,cursor:"pointer",display:"flex",gap:12,alignItems:"center",transition:"all .25s",animation:`fadeUp .4s ${i*.07}s ease both` }}>
              <div style={{ width:44,height:44,borderRadius:12,background:"#F5F7FA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>{p.img}</div>
              <div style={{ flex:1 }}><div style={{ fontWeight:700,fontSize:13,color:"#0D1F14" }}>{p.name}</div><div style={{ fontSize:11,color:"#8FA898" }}>{p.price} ر.س · {p.store}</div></div>
              {product?.id===p.id&&<span style={{ color:"#10B981",fontSize:18 }}>✓</span>}
            </div>
          ))}<Btn onClick={()=>setGStep(2)} disabled={!product}>التالي ←</Btn></div>)}
          {gStep===2&&(<div>
            {FRIENDS.filter(f=>f.name!=="أنت").map((f,i)=>(
              <div key={f.id} onClick={()=>togInv(f.id)} style={{ background:invited.includes(f.id)?"rgba(16,185,129,.1)":"rgba(255,255,255,.04)",border:`1.5px solid ${invited.includes(f.id)?"#10B981":"rgba(255,255,255,.08)"}`,borderRadius:14,padding:12,marginBottom:10,cursor:"pointer",display:"flex",gap:12,alignItems:"center",transition:"all .25s" }}>
                <div style={{ width:42,height:42,borderRadius:"50%",background:"rgba(16,185,129,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{f.avatar}</div>
                <div style={{ flex:1 }}><div style={{ fontWeight:700,fontSize:14,color:"#0D1F14" }}>{f.name}</div><div style={{ fontSize:11,color:"#8FA898" }}>{f.points} نقطة</div></div>
                <div style={{ width:24,height:24,borderRadius:"50%",background:invited.includes(f.id)?"#10B981":"rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,transition:"all .2s" }}>{invited.includes(f.id)?"✓":"+"}</div>
              </div>
            ))}
            {invited.length>0&&product&&(<div className="card-g" style={{ marginBottom:12 }}>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:13 }}><span style={{ color:"#4A6455" }}>نصيب كل شخص</span><span style={{ color:"#10B981",fontWeight:900,fontSize:16 }}>{(product.price/(invited.length+1)/4).toFixed(0)} ر.س/شهر</span></div>
            </div>)}
            <div style={{ display:"flex",gap:10 }}><Btn ghost onClick={()=>setGStep(1)}>← رجوع</Btn><Btn loading={loading} disabled={invited.length===0} onClick={()=>{setLoading(true);setTimeout(()=>{setLoading(false);setSent(true);},1800);}}>أرسل الدعوة 📨</Btn></div>
          </div>)}
        </div>
      )}
      {tab==="group"&&sent&&(
        <div style={{ textAlign:"center",padding:"20px 0" }}>
          <div style={{ fontSize:60,marginBottom:14,animation:"checkPop .5s ease" }}>🎉</div>
          <div style={{ fontSize:20,fontWeight:900,color:"#0D1F14",marginBottom:8 }}>تم إرسال الدعوة!</div>
          <div style={{ fontSize:13,color:"#6A8E7A",marginBottom:20,lineHeight:1.7 }}>سيبدأ التقسيط بعد موافقة الجميع</div>
          <Btn onClick={()=>{setSent(false);setGStep(1);setProduct(null);setInvited([]);}}>طلب جماعي جديد ←</Btn>
        </div>
      )}
      {tab==="leader"&&(
        <div>
          <div style={{ background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.2)",borderRadius:18,padding:16,marginBottom:16,textAlign:"center" }}>
            <div style={{ fontSize:12,color:"#6A8E7A",marginBottom:4 }}>ترتيبك</div>
            <div style={{ fontSize:48,fontWeight:900,color:"#F59E0B" }}>#2</div>
          </div>
          {FRIENDS.map((f,i)=>{
            const isMe=f.name==="أنت"; const medals=["🥇","🥈","🥉"];
            return(
              <div key={f.id} style={{ background:isMe?"rgba(16,185,129,.08)":"rgba(255,255,255,.03)",border:`1.5px solid ${isMe?"rgba(16,185,129,.25)":"rgba(255,255,255,.06)"}`,borderRadius:14,padding:"12px 14px",marginBottom:8,display:"flex",gap:12,alignItems:"center",animation:`fadeUp .4s ${i*.07}s ease both` }}>
                <div style={{ width:28,textAlign:"center",fontSize:i<3?20:14,fontWeight:900,color:i<3?"#F59E0B":"rgba(255,255,255,.3)" }}>{i<3?medals[i]:`#${i+1}`}</div>
                <div style={{ width:38,height:38,borderRadius:"50%",background:isMe?"rgba(16,185,129,.2)":"rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>{f.avatar}</div>
                <div style={{ flex:1 }}><div style={{ fontWeight:800,fontSize:14,color:isMe?"#10B981":"#fff" }}>{f.name}{isMe?" (أنت)":""}</div><div style={{ fontSize:11,color:"#8FA898" }}>{f.level}</div></div>
                <div style={{ textAlign:"left" }}><div style={{ fontSize:16,fontWeight:900,color:i===0?"#F59E0B":isMe?"#10B981":"rgba(255,255,255,.6)" }}>{f.points}</div><div style={{ fontSize:9,color:"#9BB5A3" }}>نقطة</div></div>
              </div>
            );
          })}
          <div style={{ background:"rgba(56,189,248,.06)",border:"1px solid rgba(56,189,248,.15)",borderRadius:16,padding:14,marginTop:8 }}>
            <div style={{ fontSize:13,fontWeight:800,color:"#7DD3FC",marginBottom:6 }}>🎯 تحدي الأسبوع</div>
            <div style={{ fontSize:12,color:"#7A9E8A",marginBottom:10,lineHeight:1.6 }}>أكمل 3 أقساط واكسب <span style={{ color:"#F59E0B",fontWeight:800 }}>200 نقطة!</span></div>
            <div style={{ height:6,background:"#EEF3EF",borderRadius:6,overflow:"hidden",marginBottom:5 }}>
              <div style={{ height:"100%",width:"66%",background:"linear-gradient(90deg,#38BDF8,#7DD3FC)",borderRadius:6 }}/>
            </div>
            <div style={{ fontSize:11,color:"#8FA898" }}>2 من 3 مكتملة</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* - NOTIFS - */
function NotifsScreen({ go, notifs, setNotifs }) {
  return(
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22,animation:"fadeDown .35s ease" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <BackBtn onClick={()=>go("home")}/><div style={{ fontSize:20,fontWeight:900,color:"#0D1F14" }}>الإشعارات</div>
        </div>
        {notifs.some(n=>!n.read)&&<button onClick={()=>setNotifs(n=>n.map(x=>({...x,read:true})))} style={{ background:"transparent",border:"none",color:"#34D399",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>قراءة الكل</button>}
      </div>
      {notifs.map((n,i)=>(
        <div key={i} onClick={()=>setNotifs(p=>p.map((x,j)=>j===i?{...x,read:true}:x))} style={{ display:"flex",gap:12,alignItems:"flex-start",padding:"12px 14px",marginBottom:8,borderRadius:15,background:n.read?"rgba(255,255,255,.03)":"rgba(16,185,129,.06)",border:`1px solid ${n.read?"rgba(255,255,255,.06)":"rgba(16,185,129,.15)"}`,cursor:"pointer",position:"relative",animation:`fadeUp .4s ${i*.07}s ease both` }}>
          {!n.read&&<div style={{ position:"absolute",top:12,left:12,width:7,height:7,borderRadius:"50%",background:"#10B981" }}/>}
          <div style={{ width:42,height:42,borderRadius:13,background:"rgba(16,185,129,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{n.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700,fontSize:13,color:"#0D1F14",marginBottom:2 }}>{n.title}</div>
            <div style={{ fontSize:11,color:"#6A8E7A",marginBottom:4 }}>{n.sub}</div>
            <div style={{ fontSize:10,color:"#9BB5A3" }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* - PROFILE - */
function ProfileScreen({ go }) {
  const items=[{icon:"💳",label:"طرق الدفع"},{icon:"🔐",label:"الأمان والحماية"},{icon:"🔔",label:"الإشعارات"},{icon:"📄",label:"كشف الحساب"},{icon:"❓",label:"المساعدة"},{icon:"📞",label:"تواصل معنا"}];
  return(
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:22,animation:"fadeDown .35s ease" }}>
        <BackBtn onClick={()=>go("home")}/><div style={{ fontSize:20,fontWeight:900,color:"#0D1F14" }}>حسابي</div>
      </div>
      <div style={{ textAlign:"center",marginBottom:22,animation:"scaleIn .4s ease" }}>
        <div style={{ width:76,height:76,borderRadius:"50%",background:"linear-gradient(135deg,#10B981,#065F46)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 12px",animation:"glow 3s ease-in-out infinite" }}>👤</div>
        <div style={{ fontSize:20,fontWeight:900,color:"#0D1F14",marginBottom:4 }}>أحمد محمد العمري</div>
        <div style={{ fontSize:13,color:"#6A8E7A",marginBottom:8 }}>0512345678</div>
        <span style={{ background:"rgba(16,185,129,.15)",color:"#34D399",border:"1px solid rgba(16,185,129,.25)",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:700 }}>✓ هوية موثقة</span>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20,animation:"fadeUp .4s .08s ease both" }}>
        {[{val:"15,000",label:"الحد الكلي",color:"#10B981"},{val:"8,800",label:"المتاح",color:"#34D399"},{val:"830",label:"نقاط",color:"#F59E0B"}].map((s,i)=>(
          <div key={i} className="card" style={{ textAlign:"center" }}>
            <div style={{ fontSize:16,fontWeight:900,color:s.color }}>{s.val}</div>
            <div style={{ fontSize:9,color:"#8FA898",marginTop:3 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ animation:"fadeUp .4s .14s ease both" }}>
        {items.map((item,i)=>(
          <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 14px",marginBottom:8,background:"#FAFCFA",border:"1px solid #EEF3EF",borderRadius:13,cursor:"pointer",transition:"all .2s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(16,185,129,.2)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.06)"}>
            <div style={{ display:"flex",gap:12,alignItems:"center" }}>
              <span style={{ fontSize:18 }}>{item.icon}</span>
              <span style={{ fontSize:13,fontWeight:600,color:"#1E3D2E" }}>{item.label}</span>
            </div>
            <span style={{ color:"#B0C8B8",fontSize:16 }}>›</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop:20,textAlign:"center",animation:"fadeUp .4s .2s ease both" }}>
        <button style={{ background:"transparent",border:"1px solid rgba(239,68,68,.25)",borderRadius:12,padding:"10px 28px",color:"rgba(239,68,68,.7)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>تسجيل الخروج</button>
      </div>
    </div>
  );
}

/* CHECKOUT — شاشة الدفع الكاملة */
function CheckoutScreen({ go, addOrder, showToast }) {
  const [step, setStep] = useState(1);
  const [store, setStore] = useState(null);
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("4");
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(null);

  const plans = [
    { id:"4",  label:"4 أقساط",  fee:0,    color:"#10B981" },
    { id:"6",  label:"6 أقساط",  fee:0.015,color:"#38BDF8" },
    { id:"12", label:"12 قسط",   fee:0.025,color:"#A78BFA" },
  ];
  const amt = parseFloat(amount) || 0;
  const sel = plans.find(p=>p.id===plan);
  const total = amt * (1 + (sel?.fee||0));
  const monthly = total / parseInt(plan);

  const confirm = () => {
    setLoading(true);
    setTimeout(() => {
      const ok = Math.random() > 0.1;
      setLoading(false);
      setApproved(ok);
      if (ok) {
        addOrder({ id:`MY-00${Date.now()%100}`, store:store?.name, item:`طلب من ${store?.name}`, total:amt, paid:0, of:parseInt(plan), next:"15 أبريل", daysLeft:15, logo:store?.logo, status:"active" });
        showToast({ icon:"✅", title:"تم قبول طلبك!", sub:`${store?.name} — ${plan} أقساط` });
      }
    }, 2000);
  };

  if (approved === false) return (
    <div style={{ padding:"44px 24px 24px", textAlign:"center" }}>
      <BackBtn onClick={()=>go("home")}/>
      <div style={{ marginTop:40, fontSize:64 }}>❌</div>
      <div style={{ fontSize:20, fontWeight:900, color:"#0D1F14", margin:"16px 0 8px" }}>لم يُقبل الطلب</div>
      <div style={{ fontSize:13, color:"#6A8E7A", marginBottom:28, lineHeight:1.7 }}>حدك الائتماني غير كافٍ أو المبلغ يتجاوز الحد</div>
      <Btn onClick={()=>{setApproved(null);setStep(1);}}>حاول مرة أخرى</Btn>
    </div>
  );

  if (approved === true) return (
    <div style={{ padding:"44px 24px 24px", textAlign:"center" }}>
      <div style={{ fontSize:72, animation:"checkPop .5s ease", marginBottom:16 }}>✅</div>
      <div style={{ fontSize:22, fontWeight:900, color:"#0D1F14", marginBottom:8 }}>تم القبول! 🎉</div>
      <div style={{ fontSize:13, color:"#6A8E7A", marginBottom:24 }}>طلبك مكتمل — ابدأ التسوق</div>
      <div className="card-g" style={{ textAlign:"right", marginBottom:20 }}>
        {[["المتجر",store?.name],["المبلغ",`${amt.toFixed(0)} ر.س`],["القسط الشهري",`${monthly.toFixed(0)} ر.س`]].map(([l,v],i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:i<2?10:0, paddingBottom:i<2?10:0, borderBottom:i<2?"1px solid #EEF3EF":"none" }}>
            <span style={{ color:"#6A8E7A", fontSize:13 }}>{l}</span>
            <span style={{ fontWeight:700, color:"#0D1F14", fontSize:13 }}>{v}</span>
          </div>
        ))}
      </div>
      <Btn onClick={()=>go("orders")}>تابع أقساطي ←</Btn>
    </div>
  );

  return (
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22, animation:"fadeDown .35s ease" }}>
        <BackBtn onClick={()=>step>1?setStep(s=>s-1):go("home")}/>
        <div><div style={{ fontSize:20, fontWeight:900, color:"#0D1F14" }}>طلب تقسيط جديد</div><div style={{ fontSize:11, color:"#8FA898" }}>الخطوة {step} من 3</div></div>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:24 }}>
        {[1,2,3].map(i=><div key={i} style={{ flex:1, height:4, borderRadius:4, background:step>=i?"linear-gradient(90deg,#10B981,#34D399)":"#E2EAE4", transition:"all .3s" }}/>)}
      </div>

      {step===1&&(
        <div style={{ animation:"fadeIn .3s ease" }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#4A6455", marginBottom:12 }}>اختر المتجر</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
            {STORES.map((s,i)=>(
              <div key={i} onClick={()=>setStore(s)} style={{ background:store?.id===s.id?"#E8F5EF":"#fff", border:`1.5px solid ${store?.id===s.id?"#10B981":"#E2EAE4"}`, borderRadius:14, padding:"12px 8px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:6, transition:"all .2s", boxShadow:"0 1px 4px rgba(0,0,0,.04)" }}>
                <span style={{ fontSize:22 }}>{s.logo}</span>
                <span style={{ fontSize:11, fontWeight:700, color:store?.id===s.id?"#10B981":"#4A6455" }}>{s.name}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize:13, fontWeight:700, color:"#4A6455", marginBottom:8 }}>قيمة الشراء (ر.س)</div>
          <input className={`inp ${amt>=100?"valid":""}`} type="number" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)} style={{ fontSize:30, fontWeight:900, textAlign:"center", marginBottom:12 }}/>
          {amt>0&&amt<100&&<div style={{ fontSize:12, color:"#EF4444", textAlign:"center", marginBottom:12 }}>الحد الأدنى 100 ر.س</div>}
          <Btn onClick={()=>setStep(2)} disabled={!store||amt<100}>التالي ←</Btn>
        </div>
      )}

      {step===2&&(
        <div style={{ animation:"fadeIn .3s ease" }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#4A6455", marginBottom:14 }}>اختر خطة التقسيط</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
            {plans.map(p=>{
              const m = (amt*(1+p.fee))/parseInt(p.id);
              return (
                <div key={p.id} onClick={()=>setPlan(p.id)} style={{ background:plan===p.id?"#E8F5EF":"#fff", border:`2px solid ${plan===p.id?p.color:"#E2EAE4"}`, borderRadius:16, padding:14, cursor:"pointer", textAlign:"center", transition:"all .25s", boxShadow:"0 1px 6px rgba(0,0,0,.05)" }}>
                  {p.id==="4"&&<div style={{ fontSize:9, fontWeight:800, color:"#10B981", marginBottom:4 }}>شائع ⭐</div>}
                  <div style={{ fontSize:14, fontWeight:800, color:plan===p.id?p.color:"#0D1F14", marginBottom:4 }}>{p.label}</div>
                  <div style={{ fontSize:22, fontWeight:900, color:plan===p.id?p.color:"#0D1F14" }}>{m.toFixed(0)}</div>
                  <div style={{ fontSize:10, color:"#8FA898", marginTop:4 }}>{p.fee===0?"بدون رسوم ✓":`رسوم ${(p.fee*100).toFixed(1)}%`}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:10 }}><Btn ghost onClick={()=>setStep(1)}>← رجوع</Btn><Btn onClick={()=>setStep(3)}>التالي ←</Btn></div>
        </div>
      )}

      {step===3&&(
        <div style={{ animation:"fadeIn .3s ease" }}>
          <div className="card-g" style={{ marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#4A6455", marginBottom:14 }}>ملخص الطلب</div>
            {[["المتجر",store?.name],["القيمة",`${amt.toFixed(0)} ر.س`],["الخطة",`${plan} أقساط`],["الرسوم",sel?.fee===0?"مجاناً 🎉":`${(amt*(sel?.fee||0)).toFixed(0)} ر.س`]].map(([l,v],i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:i<3?10:0, paddingBottom:i<3?10:0, borderBottom:i<3?"1px solid #C6E8D6":"none" }}>
                <span style={{ color:"#6A8E7A", fontSize:13 }}>{l}</span>
                <span style={{ fontWeight:700, color:"#0D1F14", fontSize:13 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background:"#E8F5EF", borderRadius:16, padding:16, marginBottom:18, textAlign:"center" }}>
            <div style={{ color:"#6A8E7A", fontSize:12, marginBottom:4 }}>القسط الشهري</div>
            <div style={{ fontSize:44, fontWeight:900, color:"#10B981" }}>{monthly.toFixed(0)}<span style={{ fontSize:16, color:"#8FA898" }}> ر.س</span></div>
          </div>
          <div style={{ display:"flex", gap:10 }}><Btn ghost onClick={()=>setStep(2)}>← رجوع</Btn><Btn loading={loading} onClick={confirm}>تأكيد الطلب 🚀</Btn></div>
        </div>
      )}
    </div>
  );
}

/* POSTPONE — تأجيل قسط */
function PostponeScreen({ go, orders, showToast }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);
  const active = orders.filter(o=>o.status==="active");

  const confirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setDone(true);
      showToast({ icon:"⏰", title:"تم تأجيل القسط!", sub:"سيُضاف للقسط القادم تلقائياً" });
    }, 1600);
  };

  if (done) return (
    <div style={{ padding:"44px 24px", textAlign:"center" }}>
      <div style={{ fontSize:68, animation:"checkPop .5s ease", marginBottom:16 }}>⏰</div>
      <div style={{ fontSize:21, fontWeight:900, color:"#0D1F14", marginBottom:8 }}>تم التأجيل!</div>
      <div style={{ fontSize:13, color:"#6A8E7A", marginBottom:24, lineHeight:1.7 }}>القسط سيُدمج مع الدفعة القادمة<br/>تبقّت لك <span style={{ color:"#EF4444", fontWeight:800 }}>0</span> مرة مجانية هذه السنة</div>
      <Btn onClick={()=>go("orders")}>عودة للأقساط ←</Btn>
    </div>
  );

  return (
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
        <BackBtn onClick={()=>go("home")}/><div style={{ fontSize:20, fontWeight:900, color:"#0D1F14" }}>تأجيل قسط ⏰</div>
      </div>
      <div style={{ background:"#FEF3C7", border:"1px solid #FDE68A", borderRadius:16, padding:"12px 14px", marginBottom:20, display:"flex", gap:10, alignItems:"center" }}>
        <span style={{ fontSize:22 }}>💡</span>
        <div style={{ fontSize:12, color:"#92400E", lineHeight:1.6 }}>يمكنك تأجيل قسط مرة واحدة مجانياً في السنة. سيُضاف للقسط التالي.</div>
      </div>
      <div style={{ fontSize:13, fontWeight:700, color:"#4A6455", marginBottom:14 }}>اختر القسط للتأجيل</div>
      {active.map((o,i)=>(
        <div key={i} onClick={()=>setSelected(o)} style={{ background:selected?.id===o.id?"#E8F5EF":"#fff", border:`1.5px solid ${selected?.id===o.id?"#10B981":"#E2EAE4"}`, borderRadius:16, padding:14, marginBottom:10, cursor:"pointer", display:"flex", gap:12, alignItems:"center", transition:"all .25s", boxShadow:"0 1px 6px rgba(0,0,0,.05)" }}>
          <div style={{ width:44,height:44,borderRadius:13,background:"#E8F5EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>{o.logo}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:14, color:"#0D1F14" }}>{o.item}</div>
            <div style={{ fontSize:12, color:"#8FA898" }}>{o.store} · القسط {o.paid+1} من {o.of}</div>
          </div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontWeight:800, color:"#10B981", fontSize:16 }}>{(o.total/o.of).toFixed(0)} ر.س</div>
            <div style={{ fontSize:10, color:o.daysLeft<=5?"#EF4444":"#8FA898" }}>بعد {o.daysLeft} أيام</div>
          </div>
        </div>
      ))}
      {selected && (
        <div className="card-g" style={{ marginBottom:16 }}>
          <div style={{ fontSize:13, color:"#4A6455", marginBottom:8, fontWeight:700 }}>تفاصيل التأجيل</div>
          {[["القسط الحالي",`${(selected.total/selected.of).toFixed(0)} ر.س`],["سيُؤجّل إلى","القسط القادم تلقائياً"],["رسوم التأجيل","مجاناً 🎉"]].map(([l,v],i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:i<2?8:0 }}>
              <span style={{ color:"#6A8E7A", fontSize:13 }}>{l}</span>
              <span style={{ fontWeight:700, color:"#0D1F14", fontSize:13 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
      <Btn loading={loading} disabled={!selected} onClick={confirm}>تأكيد التأجيل ⏰</Btn>
    </div>
  );
}

/* BUDGET — الميزانية الذكية */
function BudgetScreen({ go }) {
  const [budget, setBudget] = useState(2000);
  const [editing, setEditing] = useState(false);
  const spent = 1413; const pct = Math.round((spent/budget)*100);
  const color = pct>85?"#EF4444":pct>60?"#F59E0B":"#10B981";
  const remaining = budget - spent;
  const months=[{m:"يناير",spent:1800},{m:"فبراير",spent:1250},{m:"مارس",spent:1413}];

  return (
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22, animation:"fadeDown .35s ease" }}>
        <BackBtn onClick={()=>go("home")}/><div style={{ fontSize:20, fontWeight:900, color:"#0D1F14" }}>الميزانية الذكية 📊</div>
      </div>
      <div style={{ textAlign:"center", marginBottom:22, animation:"scaleIn .4s ease" }}>
        <div style={{ position:"relative", width:180, height:180, margin:"0 auto 16px" }}>
          <svg width="180" height="180" style={{ transform:"rotate(-90deg)" }}>
            <circle cx="90" cy="90" r="76" fill="none" stroke="#E2EAE4" strokeWidth="12"/>
            <circle cx="90" cy="90" r="76" fill="none" stroke={color} strokeWidth="12"
              strokeDasharray={2*Math.PI*76} strokeDashoffset={2*Math.PI*76*(1-pct/100)}
              strokeLinecap="round" style={{ transition:"stroke-dashoffset 1s ease" }}/>
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <div style={{ fontSize:34, fontWeight:900, color:"#0D1F14" }}>{pct}%</div>
            <div style={{ fontSize:11, color:"#8FA898" }}>مستخدم</div>
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:32 }}>
          {[{label:"مصروف",val:`${spent.toLocaleString()} ر.س`,color:"#EF4444"},{label:"متبقي",val:`${remaining.toLocaleString()} ر.س`,color}].map((s,i)=>(
            <div key={i}><div style={{ fontSize:18, fontWeight:900, color:s.color }}>{s.val}</div><div style={{ fontSize:11, color:"#8FA898" }}>{s.label}</div></div>
          ))}
        </div>
      </div>
      <div className="card-g" style={{ marginBottom:16, animation:"fadeUp .4s .08s ease both" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:editing?14:0 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:"#4A6455" }}>الميزانية الشهرية</div>
            {!editing&&<div style={{ fontSize:22, fontWeight:900, color:"#10B981", marginTop:4 }}>{budget.toLocaleString()} ر.س</div>}
          </div>
          <button onClick={()=>setEditing(!editing)} style={{ background:editing?"#E8F5EF":"#fff", border:`1px solid ${editing?"#10B981":"#D4E8DB"}`, borderRadius:10, padding:"7px 14px", color:editing?"#10B981":"#4A6455", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Tajawal,sans-serif", transition:"all .2s" }}>
            {editing?"حفظ ✓":"تعديل"}
          </button>
        </div>
        {editing&&<input type="number" value={budget} onChange={e=>setBudget(Number(e.target.value))} style={{ width:"100%", background:"#fff", border:"1.5px solid #10B981", borderRadius:12, padding:"12px 16px", color:"#0D1F14", fontFamily:"Tajawal,sans-serif", fontSize:24, fontWeight:900, textAlign:"center", outline:"none" }}/>}
      </div>
      {pct>85&&<div style={{ background:"#FEE2E2", border:"1px solid #FECACA", borderRadius:14, padding:"12px 14px", marginBottom:16, display:"flex", gap:10, alignItems:"center" }}>
        <span>⚠️</span><div><div style={{ fontSize:13, fontWeight:700, color:"#991B1B" }}>تجاوزت 85% من ميزانيتك!</div><div style={{ fontSize:11, color:"#B91C1C" }}>متبقي {remaining} ر.س لنهاية الشهر</div></div>
      </div>}
      <div style={{ animation:"fadeUp .4s .16s ease both" }}>
        <div style={{ fontSize:14, fontWeight:800, color:"#0D1F14", marginBottom:14 }}>تاريخ الأشهر</div>
        {months.map((m,i)=>{
          const p=Math.round((m.spent/budget)*100); const c=p>85?"#EF4444":p>60?"#F59E0B":"#10B981";
          return (
            <div key={i} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:13 }}>
                <span style={{ color:"#4A6455", fontWeight:600 }}>{m.m}</span>
                <span style={{ color:c, fontWeight:800 }}>{m.spent.toLocaleString()} ر.س</span>
              </div>
              <div style={{ height:8, background:"#E2EAE4", borderRadius:8, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${p}%`, background:c, borderRadius:8, opacity:.85 }}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* REWARDS — نقاط الولاء */
function RewardsScreen({ go }) {
  const [redeem, setRedeem] = useState(null);
  const points = 830;
  const rewards=[
    {icon:"💰",name:"خصم 50 ر.س",      points:500,cat:"خصم مباشر"},
    {icon:"🚚",name:"شحن مجاني",        points:200,cat:"نون"},
    {icon:"👗",name:"خصم 10% في H&M",  points:300,cat:"أزياء"},
    {icon:"☕",name:"قهوة مجانية",      points:150,cat:"مطاعم"},
    {icon:"📱",name:"حماية جهاز",      points:800,cat:"تقنية"},
  ];

  return (
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, animation:"fadeDown .35s ease" }}>
        <BackBtn onClick={()=>go("home")}/><div style={{ fontSize:20, fontWeight:900, color:"#0D1F14" }}>نقاط الولاء ✦</div>
      </div>
      <div style={{ background:"linear-gradient(135deg,#FEF3C7,#FDE68A)", border:"1px solid #FCD34D", borderRadius:22, padding:22, marginBottom:18, textAlign:"center", animation:"scaleIn .4s ease" }}>
        <div style={{ fontSize:13, color:"#92400E", marginBottom:8 }}>رصيد نقاطك</div>
        <div style={{ fontSize:58, fontWeight:900, color:"#D97706", lineHeight:1, marginBottom:8, animation:"pulse 2s ease-in-out infinite" }}>{points}</div>
        <div style={{ fontSize:13, color:"#A16207", marginBottom:14 }}>نقطة</div>
        <span style={{ background:"rgba(245,158,11,.2)", color:"#92400E", border:"1px solid #FCD34D", borderRadius:20, padding:"5px 16px", fontSize:13, fontWeight:800 }}>مستوى فضي 🥈</span>
        <div style={{ marginTop:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#A16207", marginBottom:6 }}>
            <span>{points} نقطة</span><span>1000 للمستوى الذهبي</span>
          </div>
          <div style={{ height:7, background:"rgba(255,255,255,.4)", borderRadius:7, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${(points/1000)*100}%`, background:"#D97706", borderRadius:7 }}/>
          </div>
        </div>
      </div>
      <div className="card" style={{ marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:700, color:"#4A6455", marginBottom:12 }}>كيف تكسب نقاط؟</div>
        {[["💳","كل 100 ر.س مشتريات","10 نقاط"],["⏰","الدفع المبكر","25 نقطة إضافية"],["👥","دعوة صديق","100 نقطة"],["🏪","أول شراء من متجر","50 نقطة"]].map(([icon,action,pts],i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:i<3?10:0, paddingBottom:i<3?10:0, borderBottom:i<3?"1px solid #EEF3EF":"none" }}>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}><span style={{ fontSize:18 }}>{icon}</span><span style={{ fontSize:13, color:"#4A6455" }}>{action}</span></div>
            <span style={{ fontSize:13, fontWeight:800, color:"#F59E0B" }}>{pts}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize:14, fontWeight:800, color:"#0D1F14", marginBottom:14 }}>مكافآت متاحة</div>
      {rewards.map((r,i)=>{
        const can = points >= r.points;
        return (
          <div key={i} onClick={()=>can&&setRedeem(r)} style={{ background:can?"#fff":"#FAFCFA", border:`1px solid ${can?"#E8EDE9":"#EEF3EF"}`, borderRadius:16, padding:"12px 14px", marginBottom:10, display:"flex", gap:12, alignItems:"center", cursor:can?"pointer":"default", opacity:can?1:.55, boxShadow:can?"0 1px 8px rgba(0,0,0,.05)":"none", transition:"all .2s" }}
            onMouseEnter={e=>can&&(e.currentTarget.style.borderColor="#C6E8D6")}
            onMouseLeave={e=>e.currentTarget.style.borderColor=can?"#E8EDE9":"#EEF3EF"}>
            <div style={{ width:44,height:44,borderRadius:13,background:"#FEF3C7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>{r.icon}</div>
            <div style={{ flex:1 }}><div style={{ fontWeight:700,fontSize:14,color:"#0D1F14" }}>{r.name}</div><div style={{ fontSize:11,color:"#8FA898" }}>{r.cat}</div></div>
            <div style={{ textAlign:"left" }}><div style={{ fontSize:16,fontWeight:900,color:can?"#F59E0B":"#9BB5A3" }}>{r.points}</div><div style={{ fontSize:10,color:"#9BB5A3" }}>نقطة</div></div>
          </div>
        );
      })}
      {redeem&&(
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setRedeem(null)}>
          <div className="modal" style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>{redeem.icon}</div>
            <div style={{ fontSize:18, fontWeight:900, color:"#0D1F14", marginBottom:6 }}>{redeem.name}</div>
            <div style={{ fontSize:13, color:"#6A8E7A", marginBottom:20 }}>سيتم خصم <span style={{ color:"#F59E0B", fontWeight:700 }}>{redeem.points} نقطة</span> من رصيدك</div>
            <div style={{ display:"flex", gap:10 }}><Btn ghost onClick={()=>setRedeem(null)}>إلغاء</Btn><Btn onClick={()=>setRedeem(null)}>استبدل الآن ✦</Btn></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* GOAL — قسّط هدفك 🎯 */
const GOAL_ICONS = ["🏠","🚗","✈️","💍","📱","🎓","🏋️","💻","🎮","🌴"];

function GoalScreen({ go, showToast }) {
  const [goals, setGoals]   = useState([
    { id:1, icon:"🏠", name:"شقة أحلامي",  target:50000, saved:18000, monthly:2000, months:16 },
    { id:2, icon:"✈️", name:"رحلة اليابان", target:8000,  saved:3200,  monthly:800,  months:6  },
  ]);
  const [addOpen, setAddOpen] = useState(false);
  const [detOpen, setDetOpen] = useState(null);
  const [form, setForm]       = useState({ icon:"🏠", name:"", target:"", monthly:"" });
  const [iconPick, setIconPick] = useState(false);
  const [loading, setLoading]  = useState(false);

  const months = form.target && form.monthly ? Math.ceil(parseFloat(form.target)/parseFloat(form.monthly)) : 0;

  const saveGoal = () => {
    setLoading(true);
    setTimeout(() => {
      setGoals(g => [...g, { id:Date.now(), icon:form.icon, name:form.name, target:parseFloat(form.target), saved:0, monthly:parseFloat(form.monthly), months }]);
      setLoading(false); setAddOpen(false); setForm({ icon:"🏠", name:"", target:"", monthly:"" });
      showToast({ icon:"🎯", title:"تم إنشاء هدفك!", sub:`${form.name} — ${months} شهر للوصول` });
    }, 1400);
  };

  const contribute = (id) => {
    setGoals(g => g.map(x => x.id===id ? { ...x, saved: Math.min(x.saved + x.monthly, x.target) } : x));
    showToast({ icon:"✦", title:"تم إضافة دفعة!", sub:"استمر — أنت على المسار الصحيح 💪" });
    setDetOpen(null);
  };

  return (
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, animation:"fadeDown .35s ease" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <BackBtn onClick={()=>go("home")}/>
          <div>
            <div style={{ fontSize:20, fontWeight:900, color:"#0D1F14" }}>قسّط هدفك 🎯</div>
            <div style={{ fontSize:11, color:"#8FA898" }}>ادّخر بأقساط شهرية</div>
          </div>
        </div>
        <button onClick={()=>setAddOpen(true)} style={{ background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:14, padding:"10px 14px", color:"#fff", fontWeight:800, fontSize:13, cursor:"pointer", fontFamily:"Tajawal,sans-serif", boxShadow:"0 3px 12px rgba(16,185,129,.3)" }}>+ هدف</button>
      </div>

      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20, animation:"scaleIn .4s ease" }}>
        <div className="card-g" style={{ textAlign:"center" }}>
          <div style={{ fontSize:24, fontWeight:900, color:"#10B981" }}>{goals.length}</div>
          <div style={{ fontSize:11, color:"#6A8E7A", marginTop:4 }}>هدف نشط</div>
        </div>
        <div style={{ background:"#FEF3C7", border:"1px solid #FDE68A", borderRadius:20, padding:16, textAlign:"center" }}>
          <div style={{ fontSize:22, fontWeight:900, color:"#D97706" }}>{goals.reduce((a,g)=>a+g.saved,0).toLocaleString()}</div>
          <div style={{ fontSize:11, color:"#92400E", marginTop:4 }}>ر.س مدّخر</div>
        </div>
      </div>

      {/* Goals */}
      {goals.map((g,i) => {
        const pct = Math.min(Math.round((g.saved/g.target)*100),100);
        const done = pct >= 100;
        return (
          <div key={g.id} onClick={()=>setDetOpen(g)} style={{ background:"#fff", border:`1px solid ${done?"#C6E8D6":"#E8EDE9"}`, borderRadius:22, padding:18, marginBottom:14, cursor:"pointer", boxShadow:"0 2px 12px rgba(0,0,0,.06)", transition:"border-color .2s", animation:`fadeUp .4s ${i*.09}s ease both` }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#10B981"}
            onMouseLeave={e=>e.currentTarget.style.borderColor=done?"#C6E8D6":"#E8EDE9"}>
            <div style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:14 }}>
              <div style={{ width:52, height:52, borderRadius:16, background:done?"#E8F5EF":"#F5F7FA", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{g.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontWeight:800, fontSize:16, color:"#0D1F14" }}>{g.name}</div>
                  {done
                    ? <span style={{ background:"#E8F5EF", color:"#059669", border:"1px solid #C6E8D6", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:800 }}>✓ مكتمل!</span>
                    : <span style={{ background:"#F5F7FA", color:"#6A8E7A", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{g.months} شهر</span>}
                </div>
                <div style={{ fontSize:12, color:"#8FA898", marginTop:3 }}>{g.monthly.toLocaleString()} ر.س / شهر</div>
              </div>
            </div>
            <div style={{ height:10, background:"#EEF3EF", borderRadius:10, overflow:"hidden", marginBottom:8 }}>
              <div style={{ height:"100%", width:`${pct}%`, background:done?"linear-gradient(90deg,#10B981,#34D399)":"linear-gradient(90deg,#38BDF8,#10B981)", borderRadius:10 }}/>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
              <span style={{ color:"#10B981", fontWeight:800 }}>{g.saved.toLocaleString()} ر.س</span>
              <span style={{ color:"#8FA898" }}>{pct}% من {g.target.toLocaleString()} ر.س</span>
            </div>
          </div>
        );
      })}

      {goals.length===0 && <div style={{ textAlign:"center", padding:"60px 0" }}><div style={{ fontSize:56, marginBottom:14 }}>🎯</div><div style={{ fontSize:15, fontWeight:700, color:"#8FA898" }}>ما عندك أهداف بعد</div></div>}

      {/* Add modal */}
      {addOpen && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setAddOpen(false)}>
          <div className="modal">
            <div style={{ fontSize:18, fontWeight:900, color:"#0D1F14", marginBottom:18 }}>🎯 هدف جديد</div>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#6A8E7A", marginBottom:8 }}>الأيقونة</div>
              <button onClick={()=>setIconPick(!iconPick)} style={{ width:52,height:52,borderRadius:14,background:"#F5F7FA",border:"1.5px solid #E2EAE4",fontSize:26,cursor:"pointer" }}>{form.icon}</button>
              {iconPick && <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginTop:10,background:"#F5F7FA",borderRadius:14,padding:10 }}>
                {GOAL_ICONS.map(ic=><button key={ic} onClick={()=>{setForm(f=>({...f,icon:ic}));setIconPick(false);}} style={{ width:42,height:42,borderRadius:11,background:form.icon===ic?"#E8F5EF":"#fff",border:`1.5px solid ${form.icon===ic?"#10B981":"#E2EAE4"}`,fontSize:20,cursor:"pointer" }}>{ic}</button>)}
              </div>}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
              <input className="inp" placeholder="اسم الهدف (مثال: شقة أحلامي)" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
              <input className="inp" placeholder="المبلغ المستهدف (ر.س)" type="number" value={form.target} onChange={e=>setForm(f=>({...f,target:e.target.value}))}/>
              <input className="inp" placeholder="الدفعة الشهرية (ر.س)" type="number" value={form.monthly} onChange={e=>setForm(f=>({...f,monthly:e.target.value}))}/>
            </div>
            {months>0 && <div className="card-g" style={{ marginBottom:14, textAlign:"center" }}>
              <div style={{ fontSize:12,color:"#6A8E7A",marginBottom:4 }}>ستحقق هدفك خلال</div>
              <div style={{ fontSize:28,fontWeight:900,color:"#10B981" }}>{months} <span style={{ fontSize:13 }}>شهر</span></div>
              <div style={{ fontSize:11,color:"#8FA898",marginTop:4 }}>≈ {(months/12).toFixed(1)} سنة</div>
            </div>}
            <div style={{ display:"flex",gap:10 }}>
              <Btn ghost onClick={()=>setAddOpen(false)}>إلغاء</Btn>
              <Btn loading={loading} disabled={!form.name||!form.target||!form.monthly} onClick={saveGoal}>إنشاء 🎯</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {detOpen && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setDetOpen(null)}>
          <div className="modal">
            <div style={{ textAlign:"center",marginBottom:18 }}>
              <div style={{ fontSize:50,marginBottom:8 }}>{detOpen.icon}</div>
              <div style={{ fontSize:19,fontWeight:900,color:"#0D1F14" }}>{detOpen.name}</div>
            </div>
            {[["الهدف الكلي",`${detOpen.target.toLocaleString()} ر.س`],["المدّخر",`${detOpen.saved.toLocaleString()} ر.س`],["المتبقي",`${(detOpen.target-detOpen.saved).toLocaleString()} ر.س`],["الدفعة الشهرية",`${detOpen.monthly.toLocaleString()} ر.س`],["الأشهر المتبقية",`${Math.max(0,Math.ceil((detOpen.target-detOpen.saved)/detOpen.monthly))} شهر`]].map(([l,v],i)=>(
              <div key={i} style={{ display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<4?"1px solid #EEF3EF":"none" }}>
                <span style={{ color:"#6A8E7A",fontSize:13 }}>{l}</span>
                <span style={{ fontWeight:700,color:"#0D1F14",fontSize:13 }}>{v}</span>
              </div>
            ))}
            <div style={{ display:"flex",gap:10,marginTop:16 }}>
              <Btn ghost onClick={()=>setDetOpen(null)}>إغلاق</Btn>
              <Btn onClick={()=>contribute(detOpen.id)}>دفع الشهري 💰</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* MAIN APP */
export default function App() {
  // flow: onboarding → auth → pin → app
  const [flow, setFlow]       = useState("onboarding");
  const [screen, setScreen]   = useState("home");
  const [notifs, setNotifs]   = useState(NOTIFS_DATA);
  const [orders, setOrders]   = useState(ORDERS_DATA);
  const [toast, setToast]     = useState(null);

  const unread = notifs.filter(n=>!n.read).length;
  const go = (s) => setScreen(s);
  const addOrder = (o) => setOrders(p=>[...p,o]);
  const showToast = (msg) => setToast(msg);

  const NAV = [
    { id:"home",   icon:"⬡",  label:"الرئيسية" },
    { id:"shop",   icon:"🛍️", label:"تسوق" },
    { id:"wallet", icon:"💳", label:"محفظة" },
    { id:"deals",  icon:"🔥", label:"صفقات" },
    { id:"social", icon:"👥", label:"أصدقاء" },
  ];

  return (
    <div className="app">
      <style>{F + CSS}</style>
      <div className="phone">
        <div className="notch"/>
        {toast && <NotifToast msg={toast} onDone={()=>setToast(null)}/>}

        {flow==="onboarding" && <div className="screen-full"><OnboardingScreen onDone={()=>setFlow("auth")}/></div>}
        {flow==="auth"       && <div className="screen-full"><AuthScreen onDone={()=>setFlow("pin")}/></div>}
        {flow==="pin"        && <div className="screen-full"><PinScreen mode="setup" onDone={()=>{setFlow("app");showToast({icon:"🎉",title:"أهلاً بك في ميسّر!",sub:"حسابك جاهز — ابدأ التسوق"});}}/></div>}

        {flow==="app" && (
          <>
            <div className="screen">
              {screen==="home"     && <HomeScreen     go={go} notifCount={unread} orders={orders}/>}
              {screen==="shop"     && <ShopScreen     go={go}/>}
              {screen==="orders"   && <OrdersScreen   go={go} orders={orders}/>}
              {screen==="checkout" && <CheckoutScreen go={go} addOrder={addOrder} showToast={showToast}/>}
              {screen==="postpone" && <PostponeScreen go={go} orders={orders} showToast={showToast}/>}
              {screen==="wallet"   && <WalletScreen   go={go}/>}
              {screen==="withdraw" && <WithdrawScreen go={go}/>}
              {screen==="budget"   && <BudgetScreen   go={go}/>}
              {screen==="rewards"  && <RewardsScreen  go={go}/>}
              {screen==="goal"     && <GoalScreen     go={go} showToast={showToast}/>}
              {screen==="deals"    && <DealsScreen    go={go}/>}
              {screen==="social"   && <SocialScreen   go={go}/>}
              {screen==="notifs"   && <NotifsScreen   go={go} notifs={notifs} setNotifs={setNotifs}/>}
              {screen==="profile"  && <ProfileScreen  go={go}/>}
            </div>
            <div className="bnav">
              {NAV.map(n=>(
                <button key={n.id} className={`bnav-btn ${screen===n.id?"on":""}`} onClick={()=>go(n.id)}>
                  <span style={{ fontSize:19 }}>{n.icon}</span>
                  {n.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
