import { useState, useEffect, useRef } from "react";

const F = `@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');`;
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
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
@keyframes heartPop{0%{transform:scale(1)}40%{transform:scale(1.4)}100%{transform:scale(1)}}
@keyframes badgeIn{0%{transform:scale(0) rotate(-20deg)}70%{transform:scale(1.15)}100%{transform:scale(1)}}
@keyframes notifSlide{from{transform:translateX(110%)}to{transform:translateX(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
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
    <button className={`btn ${ghost ? "btn-ghost" : "btn-g"}} onClick={click} disabled={disabled}>
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
const OB = [
  { color:"#10B981", title:"اشتري الآن، ادفع براحتك", sub:"قسّم أي مشتريات على 4 أقساط متساوية — بدون فوائد، بدون رسوم خفية",
    illus:() => (
      <div style={{ width:200,height:200,display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
        {[0,1,2].map(i => <div key={i} style={{ position:"absolute",width:10,height:10,borderRadius:"50%",background:["#10B981","#34D399","#F59E0B"][i],animation:orbit ${2+i*.5}s linear infinite,animationDelay:${i*.3}s }}/>)}
        <div style={{ width:100,height:100,borderRadius:28,background:"linear-gradient(135deg,#10B981,#065F46)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:46,fontWeight:900,color:"#fff",animation:"glow 2s ease-in-out infinite" }}>م</div>
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
          <div key={i} style={{ position:"absolute",left:calc(50% + ${x}px),top:calc(50% + ${y}px),display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
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
    <div style={{ height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"50px 28px 44px",background:radial-gradient(ellipse at 50% 20%,${s.color}12 0%,transparent 65%) }}>
      <div style={{ display:"flex",gap:6 }}>
        {OB.map((_,i)=><div key={i} className={ob-dot ${i===idx?"a":"d"}}/>)}
      </div>
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:28,animation:"fadeIn .4s ease" }}>
        <s.illus/>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:24,fontWeight:900,color:"#0D1F14",marginBottom:10,lineHeight:1.3 }}>{s.title}</div>
          <div style={{ fontSize:14,color:"#6A8E7A",lineHeight:1.7 }}>{s.sub}</div>
        </div>
      </div>
      <div style={{ width:"100%",display:"flex",flexDirection:"column",gap:10 }}>
        <Btn onClick={next}>{idx<2?"التالي ←":"ابدأ الآن 🚀"}</Btn>
        {idx>0?<Btn ghost onClick={prev}>→ السابق</Btn>:<div style={{ height:52 }}/>}
      </div>
    </div>
  );
}
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
        {step===1?"رقم الهوية الوطنية — 10 أرقام":step===2?"سنرسل لك رمز OTP":أرسلنا رمزاً إلى ${phone}}
      </div>
      {step===1&&(
        <div style={{ width:"100%" }}>
          <input className={inp ${idNum.length>0?idValid?"valid":"":""}} placeholder="1XXXXXXXXX" maxLength={10} value={idNum} onChange={e=>/^\d*$/.test(e.target.value)&&setIdNum(e.target.value)} style={{ fontSize:22,fontWeight:700,textAlign:"center",letterSpacing:4,marginBottom:16 }}/>
          {idNum.length>0&&!idValid&&<div style={{ fontSize:12,color:"#EF4444",textAlign:"center",marginBottom:12 }}>يجب أن يبدأ بـ 1 أو 2 ويكون 10 أرقام</div>}
          <Btn disabled={!idValid} loading={loading} onClick={submitId}>متابعة ←</Btn>
        </div>
      )}
      {step===2&&(
        <div style={{ width:"100%" }}>
          <div style={{ display:"flex",gap:10,marginBottom:16 }}>
            <div style={{ background:"#F5F7FA",border:"1.5px solid #E2EAE4",borderRadius:14,padding:"13px 14px",color:"#4A6455",fontSize:14,fontWeight:700,whiteSpace:"nowrap" }}>🇸🇦 +966</div>
            <input className={inp ${phone.length>0?phoneValid?"valid":"":""}} placeholder="05XXXXXXXX" maxLength={10} value={phone} onChange={e=>/^\d*$/.test(e.target.value)&&setPhone(e.target.value)} style={{ fontSize:18,fontWeight:700 }}/>
          </div>
          <Btn disabled={!phoneValid} loading={loading} onClick={submitPh}>إرسال الرمز ←</Btn>
        </div>
      )}
      {step===3&&(
        <div style={{ width:"100%",textAlign:"center" }}>
          <input ref={otpRef} value={otp} onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,4);setOtp(v);}} inputMode="numeric" autoComplete="one-time-code" style={{ position:"absolute",opacity:0,width:1,height:1,pointerEvents:"none" }}/>
          <div style={{ display:"flex",gap:12,justifyContent:"center",marginBottom:20,cursor:"text" }} onClick={()=>otpRef.current?.focus()}>
            {[0,1,2,3].map(i=>(
              <div key={i} style={{ width:64,height:68,borderRadius:16,background:i<otp.length?"#E8F5EF":"#F5F7FA",border:2px solid ${i===otp.length?"#10B981":i<otp.length?"#C6E8D6":"#E2EAE4"},display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:900,color:"#0D1F14",transition:"all .2s",boxShadow:i===otp.length?"0 0 0 3px rgba(16,185,129,.15)":"none" }}>
                {otp[i]?"●":i===otp.length?<span style={{ width:2,height:28,background:"#10B981",borderRadius:2,animation:"blink 1s ease-in-out infinite" }}/>:""}
              </div>
            ))}
          </div>
          {loading&&<div style={{ width:24,height:24,border:"3px solid #C6E8D6",borderTopColor:"#10B981",borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto 16px" }}/>}
          <div style={{ fontSize:13,color:"#8FA898",marginTop:4 }}>اضغط على الخانات لفتح لوحة الأرقام 👆</div>
          <div style={{ fontSize:12,color:"#9BB5A3",marginTop:8 }}>
            {timer>0?إعادة إرسال بعد ${timer}ث:<button onClick={()=>setTimer(60)} style={{ background:"transparent",border:"none",color:"#10B981",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>إعادة إرسال</button>}
          </div>
        </div>
      )}
      <div style={{ display:"flex",gap:6,marginTop:32 }}>
        {[1,2,3].map(i=><div key={i} style={{ width:i===step?22:6,height:6,borderRadius:3,background:step>=i?"#10B981":"#D4E8DB",transition:"all .3s" }}/>)}
      </div>
    </div>
  );
}
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
      if(mode==="setup"&&step===1){setFirst(n);setPin("");setStep(2);setErr("");}
      else if(mode==="setup"&&step===2){
        if(n===first){setSuccess(true);setTimeout(onDone,800);}
        else{setShaking(true);setPin("");setErr("الرمز غير متطابق — حاول مرة أخرى");setTimeout(()=>setShaking(false),500);}
      }
    }
  };
  if(mode==="login"){
    if(n===first||n==="1234"){setSuccess(true);setTimeout(onDone,800);}
    else{setShaking(true);setPin("");setErr("رمز خاطئ — حاول مرة أخرى");setTimeout(()=>setShaking(false),500);}
  }
  };
  return (
    <div style={{ height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",background:"radial-gradient(ellipse at 50% 20%,rgba(16,185,129,.08) 0%,transparent 60%)" }}>
      <div style={{ width:56,height:56,borderRadius:18,background:"linear-gradient(135deg,#10B981,#065F46)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:"#fff",marginBottom:20 }}>م</div>
      <div style={{ fontSize:20,fontWeight:900,color:"#0D1F14",marginBottom:6 }}>{mode==="setup"?step===1?"أنشئ رمز الدخول":"أكّد الرمز":"أدخل رمز الدخول"}</div>
      <div style={{ fontSize:13,color:"#6A8E7A",marginBottom:28 }}>{mode==="setup"?"4 أرقام لحماية حسابك":"مرحباً بعودتك 👋"}</div>
      <div style={{ display:"flex",gap:14,marginBottom:10,animation:shaking?"shake .4s ease":"none" }}>
        {[0,1,2,3].map(i=><div key={i} className={pin-dot ${i<pin.length?"filled":""}}/>)}
      </div>
      {err&&<div style={{ fontSize:12,color:"#EF4444",marginBottom:8,animation:"fadeIn .2s" }}>{err}</div>}
      {success&&<div style={{ fontSize:13,color:"#10B981",marginBottom:8,animation:"fadeIn .2s" }}>✅ تم!</div>}
      <div style={{ marginBottom:28,height:16 }}/>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,72px)",gap:12 }}>
        {PIN_KEYS.flat().map((k,i)=>(
          <button key={i} className="pin-key" onClick={()=>press(k)} style={{ opacity:k===null?.0:1,cursor:k===null?"default":"pointer" }}>
            {k!==null&&k!=="⌫"&&<><span>{k}</span><span style={{ fontSize:8,color:"#8FA898",letterSpacing:1 }}>{["","ABC","DEF","GHI","JKL","MNO","PQRS","TUV","WXYZ","","",""][i]}</span></>}
            {k==="⌫"&&<span>⌫</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
function HomeScreen({ go, notif }) {
  const orders = ORDERS_DATA.filter(o=>o.status==="active");
  const nextAmt = Math.round(4999/4);
  const quickBtns = [
    {icon:"🏦",label:"تقسيط جديد",  action:"checkout"},
    {icon:"🎯",label:"قسّط هدفك",   action:"goal"},
    {icon:"📊",label:"ميزانيتي",    action:"budget"},
    {icon:"✦", label:"نقاطي",       action:"loyalty"},
    {icon:"👥",label:"مع أصدقاء",   action:"friends"},
    {icon:"🔥",label:"صفقات",        action:"deals"},
    {icon:"🏪",label:"المتاجر",      action:"shop"},
    {icon:"💳",label:"محفظتي",      action:"wallet"},
    {icon:"📋",label:"أقساطي",      action:"orders"},
    {icon:"⏰",label:"تأجيل قسط",   action:"postpone"},
  ];
  return (
    <div className="screen" style={{ animation:"fadeIn .3s ease" }}>
      <div style={{ background:"linear-gradient(160deg,#0a2e1a 0%,#0f3d22 60%,#145a30 100%)",padding:"44px 20px 28px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-40,right:-40,width:180,height:180,borderRadius:"50%",background:"rgba(16,185,129,.08)" }}/>
        <div style={{ position:"absolute",bottom:-20,left:-20,width:120,height:120,borderRadius:"50%",background:"rgba(245,158,11,.06)" }}/>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,position:"relative" }}>
          <div>
            <div style={{ fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:3 }}>مرحباً، عاصم 👋</div>
            <div style={{ fontSize:18,fontWeight:900,color:"#fff" }}>ميسّر</div>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <button onClick={()=>go("notifs")} style={{ width:38,height:38,borderRadius:12,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",cursor:"pointer",fontSize:16,position:"relative" }}>
              🔔<span style={{ position:"absolute",top:6,right:6,width:8,height:8,borderRadius:"50%",background:"#EF4444",border:"2px solid #0a2e1a" }}/>
            </button>
            <button onClick={()=>go("profile")} style={{ width:38,height:38,borderRadius:12,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",cursor:"pointer",fontSize:16 }}>👤</button>
          </div>
        </div>
        <div style={{ background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:20,padding:16,marginBottom:16,position:"relative" }}>
          <div style={{ fontSize:11,color:"rgba(255,255,255,.55)",marginBottom:4 }}>الحد الائتماني المتاح</div>
          <div style={{ fontSize:36,fontWeight:900,color:"#fff",marginBottom:2 }}>5,000 <span style={{ fontSize:14,opacity:.6 }}>ر.س</span></div>
          <div style={{ height:5,background:"rgba(255,255,255,.1)",borderRadius:5,overflow:"hidden",marginBottom:6 }}>
            <div style={{ height:"100%",width:"44%",background:"linear-gradient(90deg,#10B981,#34D399)",borderRadius:5 }}/>
          </div>
          <div style={{ fontSize:11,color:"rgba(255,255,255,.5)" }}>2,200 ر.س مستخدم من 5,000</div>
          <div style={{ position:"absolute",top:14,left:14,display:"flex",gap:6 }}>
            <button onClick={()=>go("checkout")} style={{ background:"linear-gradient(135deg,#10B981,#059669)",border:"none",borderRadius:10,padding:"7px 12px",color:"#fff",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>🏦 تقسيط جديد</button>
            <button onClick={()=>go("goal")} style={{ background:"rgba(245,158,11,.2)",border:"1px solid rgba(245,158,11,.3)",borderRadius:10,padding:"7px 12px",color:"#F59E0B",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>🎯 قسّط هدفك</button>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6 }}>
          {quickBtns.map((b,i)=>(
            <button key={i} onClick={()=>go(b.action)} style={{ background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:14,padding:"10px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,transition:"all .2s",fontFamily:"Tajawal,sans-serif" }}>
              <span style={{ fontSize:18 }}>{b.icon}</span>
              <span style={{ fontSize:9,color:"rgba(255,255,255,.75)",fontWeight:700,textAlign:"center",lineHeight:1.2 }}>{b.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:"16px 16px 0" }}>
        {orders.length>0&&(
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
              <div style={{ fontSize:14,fontWeight:800,color:"#0D1F14" }}>الأقساط النشطة</div>
              <button onClick={()=>go("orders")} style={{ fontSize:12,color:"#10B981",fontWeight:700,background:"none",border:"none",cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>عرض الكل ←</button>
            </div>
            {orders.map((o,i)=>(
              <div key={i} className="card" style={{ marginBottom:10,animation:fadeUp .4s ${i*.08}s ease both }}>
                <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:10 }}>
                  <div style={{ width:40,height:40,borderRadius:12,background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{o.logo}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13,fontWeight:800,color:"#0D1F14" }}>{o.item}</div>
                    <div style={{ fontSize:11,color:"#8FA898" }}>{o.store} · القسط {o.paid}/{o.of}</div>
                  </div>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontSize:14,fontWeight:900,color:"#0D1F14" }}>{Math.round(o.total/o.of).toLocaleString()}</div>
                    <div style={{ fontSize:10,color:"#8FA898" }}>ر.س</div>
                  </div>
                </div>
                <div style={{ height:5,background:"#EEF3EF",borderRadius:5,overflow:"hidden",marginBottom:6 }}>
                  <div style={{ height:"100%",width:${(o.paid/o.of)*100}%,background:"linear-gradient(90deg,#10B981,#34D399)",borderRadius:5,transition:"width .6s ease" }}/>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:"#8FA898" }}>
                  <span>القسط القادم: {o.next}</span>
                  <span style={{ color:o.daysLeft<=5?"#EF4444":"#8FA898",fontWeight:o.daysLeft<=5?700:400 }}>بعد {o.daysLeft} أيام</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function ShopScreen({ go }) {
  const [search,setSearch]=useState(""); const [cat,setCat]=useState("الكل"); const [compare,setCompare]=useState([]); const [wish,setWish]=useState([]); const [modal,setModal]=useState(null);
  const cats=["الكل","إلكترونيات","أزياء","أثاث","رياضة","جمال"];
  const filtered=PRODUCTS.filter(p=>(cat==="الكل"||p.cat===cat)&&(p.name.includes(search)||p.store.includes(search)));
  const toggleCompare=(id)=>setCompare(p=>p.includes(id)?p.filter(x=>x!==id):[...p.slice(-1),id]);
  const toggleWish=(id)=>setWish(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  return (
    <div className="screen">
      <div style={{ padding:"44px 16px 12px",background:"linear-gradient(180deg,#E8F5EF 0%,#F5F7FA 100%)" }}>
        <div style={{ fontSize:18,fontWeight:900,color:"#0D1F14",marginBottom:12 }}>🛍️ تسوّق وقسّط</div>
        <input className="inp" placeholder="🔍 ابحث عن منتج أو متجر..." value={search} onChange={e=>setSearch(e.target.value)} style={{ marginBottom:12 }}/>
        <div style={{ display:"flex",gap:6,overflowX:"auto",paddingBottom:4 }}>
          {cats.map(c=><button key={c} className={chip ${cat===c?"on":"off"}} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
      </di
        {compare.length===2&&(
        <div style={{ margin:"12px 16px 0",background:"#E8F5EF",border:"1px solid #C6E8D6",borderRadius:16,padding:12,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ fontSize:12,fontWeight:700,color:"#0D1F14" }}>مقارنة: {compare.map(id=>PRODUCTS.find(p=>p.id===id)?.name).join(" vs ")}</div>
          <button onClick={()=>setModal("compare")} style={{ background:"#10B981",border:"none",borderRadius:10,padding:"6px 12px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>قارن</button>
        </div>
      )}
      <div style={{ padding:"12px 16px" }}>
        {filtered.map((p,i)=>(
          <div key={p.id} className="card" style={{ marginBottom:12,animation:fadeUp .4s ${i*.06}s ease both }}>
            <div style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
              <div style={{ width:56,height:56,borderRadius:16,background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0 }}>{p.img}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                  <div>
                    {p.badge&&<span style={{ background:"#FEF3C7",color:"#92400E",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,marginBottom:4,display:"inline-block" }}>{p.badge}</span>}
                    <div style={{ fontSize:14,fontWeight:800,color:"#0D1F14" }}>{p.name}</div>
                    <div style={{ fontSize:11,color:"#8FA898" }}>{p.store} · ⭐ {p.rating}</div>
                  </div>
                  <button onClick={()=>toggleWish(p.id)} style={{ background:"none",border:"none",fontSize:18,cursor:"pointer",animation:wish.includes(p.id)?"heartPop .3s ease":"none" }}>{wish.includes(p.id)?"❤️":"🤍"}</button>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8 }}>
                  <div>
                    <div style={{ fontSize:18,fontWeight:900,color:"#0D1F14" }}>{p.price.toLocaleString()} <span style={{ fontSize:11,color:"#8FA898" }}>ر.س</span></div>
                    <div style={{ fontSize:11,color:"#10B981",fontWeight:700 }}>أو {Math.round(p.price/4).toLocaleString()} ر.س × 4</div>
                  </div>
                  <div style={{ display:"flex",gap:6" }}>
                    <button onClick={()=>toggleCompare(p.id)} style={{ background:compare.includes(p.id)?"#E8F5EF":"#F5F7FA",border:1px solid ${compare.includes(p.id)?"#10B981":"#E2EAE4"},borderRadius:10,padding:"6px 10px",fontSize:11,fontWeight:700,cursor:"pointer",color:compare.includes(p.id)?"#10B981":"#4A6455",fontFamily:"Tajawal,sans-serif" }}>قارن</button>
                    <button onClick={()=>go("checkout")} style={{ background:"linear-gradient(135deg,#10B981,#059669)",border:"none",borderRadius:10,padding:"6px 12px",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>قسّط</button>
                  </div>
                </div>
                <div style={{ display:"flex",gap:6,marginTop:8,flexWrap:"wrap" }}>
                  {p.installments.map(n=><span key={n} style={{ background:"#EEF3EF",color:"#4A6455",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:8 }}>{n} أقساط</span>)}
                  <span style={{ background:"#FEF3C7",color:"#92400E",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:8 }}>كاشباك {p.cashback}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal==="compare"&&compare.length===2&&(()=>{
        const [a,b]=compare.map(id=>PRODUCTS.find(p=>p.id===id));
        return (
          <div className="modal-bg" onClick={()=>setModal(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div style={{ fontSize:16,fontWeight:900,color:"#0D1F14",marginBottom:16,textAlign:"center" }}>مقارنة المنتجات</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                {[a,b].map((p,i)=>(
                  <div key={i} style={{ background:"#F5F7FA",borderRadius:16,padding:14,textAlign:"center" }}>
                    <div style={{ fontSize:32,marginBottom:8 }}>{p.img}</div>
                    <div style={{ fontSize:13,fontWeight:800,color:"#0D1F14",marginBottom:4 }}>{p.name}</div>
                    <div style={{ fontSize:11,color:"#8FA898",marginBottom:8 }}>{p.store}</div>
                    <div style={{ fontSize:18,fontWeight:900,color:"#10B981" }}>{p.price.toLocaleString()}</div>
                    <div style={{ fontSize:10,color:"#8FA898" }}>ر.س</div>
                    <div style={{ fontSize:11,color:"#F59E0B",marginTop:4,fontWeight:700 }}>⭐ {p.rating}</div>
                    <div style={{ fontSize:10,color:"#6A8E7A",marginTop:4 }}>كاشباك {p.cashback}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16 }}><Btn onClick={()=>setModal(null)}>إغلاق</Btn></div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
function WalletScreen({ go }) {
  const [tab,setTab]=useState("overview"); const [cashbackTotal]=useState(47); const txns=[
    {icon:"📱",name:"آيفون 15 برو",type:"قسط",date:"10 مارس",amt:-1250,cashback:25,color:"#EF4444"},
    {icon:"✦", name:"كاشباك نون",  type:"مكافأة",date:"8 مارس", amt:12,  cashback:0, color:"#F59E0B"},
    {icon:"👟",name:"حذاء نايك",   type:"قسط",date:"5 مارس", amt:-150, cashback:3, color:"#EF4444"},
    {icon:"🏠",name:"طاولة إيكيا", type:"اكتمل",date:"1 مارس",amt:0,   cashback:8, color:"#10B981"},
  ];
  return (
    <div className="screen">
      <div style={{ background:"linear-gradient(160deg,#0a2e1a,#145a30)",padding:"44px 20px 28px" }}>
        <div style={{ fontSize:18,fontWeight:900,color:"#fff",marginBottom:16 }}>💳 محفظتي</div>
        <div style={{ background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",borderRadius:20,padding:20,textAlign:"center" }}>
          <div style={{ fontSize:12,color:"rgba(255,255,255,.5)",marginBottom:6 }}>رصيد الكاشباك</div>
          <div style={{ fontSize:44,fontWeight:900,color:"#F59E0B",marginBottom:4 }}>{cashbackTotal}<span style={{ fontSize:14,opacity:.6 }}> ر.س</span></div>
          <button onClick={()=>go("withdraw")} style={{ background:"linear-gradient(135deg,#F59E0B,#D97706)",border:"none",borderRadius:12,padding:"10px 24px",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"Tajawal,sans-serif",marginTop:8 }}>سحب الكاشباك 💸</button>
        </div>
      </div>
      <div style={{ padding:"16px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16 }}>
        {[{label:"إجمالي المشتريات",val:"2,263",color:"#EF4444",icon:"🛒",bg:"rgba(239,68,68,.08)"},{label:"كاشباك مكتسب",val:${cashbackTotal},color:"#F59E0B",icon:"✦",bg:"rgba(245,158,11,.08)"}].map((c,i)=>(
          <div key={i} style={{ background:c.bg,border:1px solid ${c.color}22,borderRadius:18,padding:14,animation:scaleIn .4s ${i*.08}s ease both }}>
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
            <div style={{ height:"100%",width:${(cashbackTotal/200)*100}%,background:"linear-gradient(90deg,#10B981,#34D399)",borderRadius:6 }}/>
          </div>
          <div style={{ fontSize:11,color:"#8FA898" }}>{cashbackTotal} من 200 ر.س لمستوى ذهبي 🥇</div>
        </div>
        <div className="tab-bar" style={{ marginBottom:16 }}>
          {[{id:"overview",label:"نظرة عامة"},{id:"txns",label:"العمليات"}].map(t=>(
            <button key={t.id} className={tab ${tab===t.id?"on":"off"}} onClick={()=>setTab(t.id)}>{t.label}</button>
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
                  <div style={{ height:"100%",width:${c.pct}%,background:c.color,borderRadius:7,opacity:.8 }}/>
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
    </div>
  );
}
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
      <div style={{ display:"flex",gap:6,marginBottom:24 }}>{[1,2].map(i=><div key={i} style={{ flex:1,height:4,borderRadius:4,background:step>=i?"linear-gradient(90deg,#10B981,#34D399)":"#EEF3EF",transition:"all .3s" }}/>)}</div>
      <div style={{ background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.2)",borderRadius:18,padding:16,marginBottom:22,textAlign:"center" }}>
        <div style={{ fontSize:12,color:"#6A8E7A",marginBottom:4 }}>الرصيد المتاح</div>
        <div style={{ fontSize:40,fontWeight:900,color:"#F59E0B" }}>{balance}<span style={{ fontSize:14,opacity:.6 }}> ر.س</span></div>
      </div>
      {step===1&&(<div>{methods.map((m,i)=>(
        <div key={i} onClick={()=>setMethod(m.id)} style={{ background:method===m.id?"#E8F5EF":"#F5F7FA",border:1.5px solid ${method===m.id?"#10B981":"#E2EAE4"},borderRadius:16,padding:14,marginBottom:10,cursor:"pointer",display:"flex",gap:12,alignItems:"center",transition:"all .25s" }}>
          <div style={{ width:46,height:46,borderRadius:13,background:method===m.id?"#C6E8D6":"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>{m.icon}</div>
          <div style={{ flex:1 }}><div style={{ fontWeight:700,fontSize:14,color:"#0D1F14" }}>{m.label}</div><div style={{ fontSize:11,color:"#8FA898" }}>{m.sub}</div></div>
          <span style={{ fontSize:11,color:m.time==="فوري"?"#10B981":"#38BDF8",fontWeight:700 }}>{m.time}</span>
        </div>
      ))}<div style={{ marginTop:8 }}><Btn onClick={()=>setStep(2)} disabled={!method}>التالي ←</Btn></div></div>)}
      {step===2&&(<div>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0" style={{ width:"100%",background:"#F5F7FA",border:1.5px solid ${amt>balance?"#EF4444":amt>0?"#10B981":"#E2EAE4"},borderRadius:14,padding:"16px",color:"#0D1F14",fontFamily:"Tajawal,sans-serif",fontSize:34,fontWeight:900,textAlign:"center",outline:"none",marginBottom:12 }}/>
        <div style={{ display:"flex",gap:8,marginBottom:20 }}>
          {[10,25,balance].map(q=><button key={q} onClick={()=>setAmount(String(q))} style={{ flex:1,padding:"9px",background:parseFloat(amount)===q?"#E8F5EF":"#F5F7FA",border:1px solid ${parseFloat(amount)===q?"#10B981":"#E2EAE4"},borderRadius:10,color:parseFloat(amount)===q?"#10B981":"#4A6455",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif",transition:"all .2s" }}>{q===balance?"الكل":${q} ر.س}</button>)}
        </div>
        {amt>balance&&<div style={{ fontSize:12,color:"#EF4444",marginBottom:12,textAlign:"center" }}>الرصيد غير كافٍ</div>}
        <Btn disabled={amt<=0||amt>balance} loading={loading} onClick={()=>{setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},1500);}}>تأكيد السحب</Btn>
      </div>)}
    </div>
  );
}
      unction DealsScreen({ go }) {
  const [deals,setDeals]=useState(DEALS_DATA); const [filter,setFilter]=useState("الكل");
  const tags=["الكل","إلكترونيات","جمال","رياضة"];
  const filtered=filter==="الكل"?deals:deals.filter(d=>d.tag===filter);
  const vote=(id)=>setDeals(p=>p.map(d=>d.id===id?{...d,votes:d.userVoted?d.votes-1:d.votes+1,userVoted:!d.userVoted}:d));
  return (
    <div className="screen">
      <div style={{ padding:"44px 16px 12px",background:"linear-gradient(180deg,#FEF3C7 0%,#F5F7FA 100%)" }}>
        <div style={{ fontSize:18,fontWeight:900,color:"#0D1F14",marginBottom:4 }}>🔥 صفقات المجتمع</div>
        <div style={{ fontSize:12,color:"#6A8E7A",marginBottom:12 }}>شارك أفضل العروض واكسب نقاط</div>
        <div style={{ display:"flex",gap:6,overflowX:"auto",paddingBottom:4 }}>
          {tags.map(t=><button key={t} className={chip ${filter===t?"on":"off"}} onClick={()=>setFilter(t)}>{t}</button>)}
        </div>
      </div>
      <div style={{ padding:"12px 16px" }}>
        {filtered.map((d,i)=>(
          <div key={d.id} className="card" style={{ marginBottom:12,animation:fadeUp .4s ${i*.06}s ease both }}>
            <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:10 }}>
              <div style={{ width:40,height:40,borderRadius:12,background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{d.avatar}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13,fontWeight:800,color:"#0D1F14" }}>{d.product}</div>
                <div style={{ fontSize:11,color:"#8FA898" }}>{d.user} · {d.store} · {d.time}</div>
              </div>
              <span style={{ background:"#E8F5EF",color:"#10B981",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20 }}>{d.tag}</span>
            </div>
            <div style={{ display:"flex",gap:8,marginBottom:10 }}>
              <div style={{ background:"#E8F5EF",borderRadius:10,padding:"6px 12px",flex:1,textAlign:"center" }}>
                <div style={{ fontSize:10,color:"#6A8E7A" }}>توفير</div>
                <div style={{ fontSize:14,fontWeight:900,color:"#10B981" }}>{d.saving}</div>
              </div>
              <div style={{ background:"#FEF3C7",borderRadius:10,padding:"6px 12px",flex:1,textAlign:"center" }}>
                <div style={{ fontSize:10,color:"#6A8E7A" }}>كاشباك</div>
                <div style={{ fontSize:14,fontWeight:900,color:"#F59E0B" }}>{d.cashback}</div>
              </div>
            </div>
            <div style={{ display:"flex",gap:8 }}>
              <button onClick={()=>vote(d.id)} style={{ flex:1,background:d.userVoted?"#E8F5EF":"#F5F7FA",border:1px solid ${d.userVoted?"#10B981":"#E2EAE4"},borderRadius:10,padding:"8px",color:d.userVoted?"#10B981":"#4A6455",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif",transition:"all .2s" }}>
                👍 {d.votes}
              </button>
              <button onClick={()=>go("checkout")} style={{ flex:1,background:"linear-gradient(135deg,#10B981,#059669)",border:"none",borderRadius:10,padding:"8px",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>قسّط الآن</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function FriendsScreen({ go }) {
  const [tab,setTab]=useState("leaderboard"); const [groupModal,setGroupModal]=useState(false);
  return (
    <div className="screen">
      <div style={{ padding:"44px 16px 12px",background:"linear-gradient(180deg,#E0F2FE 0%,#F5F7FA 100%)" }}>
        <div style={{ fontSize:18,fontWeight:900,color:"#0D1F14",marginBottom:12 }}>👥 الأصدقاء</div>
        <div className="tab-bar">
          {[{id:"leaderboard",label:"المتصدرون"},{id:"group",label:"شراء جماعي"}].map(t=>(
            <button key={t.id} className={tab ${tab===t.id?"on":"off"}} onClick={()=>setTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:"12px 16px" }}>
        {tab==="leaderboard"&&(
          <div>
            {FRIENDS.map((f,i)=>(
              <div key={f.id} className="card" style={{ marginBottom:10,animation:fadeUp .3s ${i*.07}s ease both,border:f.name==="أنت"?"1.5px solid #10B981":"1px solid #E8EDE9" }}>
                <div style={{ display:"flex",gap:12,alignItems:"center" }}>
                  <div style={{ fontSize:20,fontWeight:900,color:i===0?"#F59E0B":i===1?"#9CA3AF":"#CD7C2F",width:28,textAlign:"center" }}>{i===0?"🥇":i===1?"🥈":"🥉"}</div>
                  <div style={{ width:44,height:44,borderRadius:"50%",background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,border:f.name==="أنت"?"2px solid #10B981":"2px solid transparent" }}>{f.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14,fontWeight:800,color:"#0D1F14" }}>{f.name}{f.name==="أنت"&&<span style={{ fontSize:10,color:"#10B981",marginRight:6 }}>أنت</span>}</div>
                    <div style={{ fontSize:11,color:"#8FA898" }}>{f.level}</div>
                  </div>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontSize:18,fontWeight:900,color:"#F59E0B" }}>{f.points.toLocaleString()}</div>
                    <div style={{ fontSize:10,color:"#8FA898" }}>نقطة</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="group"&&(
          <div>
            <div className="card-g" style={{ marginBottom:16,textAlign:"center" }}>
              <div style={{ fontSize:32,marginBottom:8 }}>◈</div>
              <div style={{ fontSize:15,fontWeight:800,color:"#0D1F14",marginBottom:6 }}>الشراء الجماعي</div>
              <div style={{ fontSize:12,color:"#6A8E7A",marginBottom:16,lineHeight:1.6 }}>اشترِ مع أصدقائك وقسّطوا معاً — كل شخص يدفع نصيبه باستقلالية</div>
              <Btn onClick={()=>setGroupModal(true)}>إنشاء مجموعة شراء 👥</Btn>
            </div>
            <div className="card" style={{ marginBottom:10 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
                <div style={{ fontSize:13,fontWeight:800,color:"#0D1F14" }}>مجموعة سارة — PS5</div>
                <span style={{ background:"#E8F5EF",color:"#10B981",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20 }}>نشطة</span>
              </div>
              <div style={{ fontSize:12,color:"#6A8E7A",marginBottom:10 }}>3 أعضاء · 2,199 ر.س · كل شخص 733 ر.س</div>
              <div style={{ height:5,background:"#EEF3EF",borderRadius:5,overflow:"hidden" }}>
                <div style={{ height:"100%",width:"66%",background:"linear-gradient(90deg,#10B981,#34D399)",borderRadius:5 }}/>
              </div>
              <div style={{ fontSize:11,color:"#8FA898",marginTop:4 }}>2 من 3 دفعوا</div>
            </div>
          </div>
        )}
      </div>
      {groupModal&&(
        <div className="modal-bg" onClick={()=>setGroupModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:16,fontWeight:900,color:"#0D1F14",marginBottom:16 }}>إنشاء مجموعة شراء</div>
            <input className="inp" placeholder="اسم المنتج" style={{ marginBottom:10 }}/>
            <input className="inp" placeholder="السعر الكلي" type="number" style={{ marginBottom:10 }}/>
            <input className="inp" placeholder="أضف أصدقاء (رقم الجوال)" style={{ marginBottom:16 }}/>
            <Btn onClick={()=>setGroupModal(false)}>إنشاء المجموعة ✓</Btn>
          </div>
        </div>
      )}
    </div>
  );
}
function OrdersScreen({ go }) {
  const [tab,setTab]=useState("active");
  const active=ORDERS_DATA.filter(o=>o.status==="active");
  const done=ORDERS_DATA.filter(o=>o.status==="done");
  return (
    <div className="screen">
      <div style={{ padding:"44px 16px 12px",background:"linear-gradient(180deg,#E8F5EF 0%,#F5F7FA 100%)" }}>
        <div style={{ fontSize:18,fontWeight:900,color:"#0D1F14",marginBottom:12 }}>📋 أقساطي</div>
        <div className="tab-bar">
          {[{id:"active",label:النشطة (${active.length})},{id:"done",label:المكتملة (${done.length})}].map(t=>(
            <button key={t.id} className={tab ${tab===t.id?"on":"off"}} onClick={()=>setTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:"12px 16px" }}>
        {(tab==="active"?active:done).map((o,i)=>(
          <div key={o.id} className="card" style={{ marginBottom:12,animation:fadeUp .4s ${i*.08}s ease both }}>
            <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:12 }}>
              <div style={{ width:46,height:46,borderRadius:14,background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>{o.logo}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14,fontWeight:800,color:"#0D1F14" }}>{o.item}</div>
                <div style={{ fontSize:11,color:"#8FA898" }}>{o.store} · {o.id}</div>
              </div>
              <span style={{ background:o.status==="active"?"#E8F5EF":"#EEF3EF",color:o.status==="active"?"#10B981":"#6A8E7A",fontSize:10,fontWeight:700,padding:"4px 10px",borderRadius:20 }}>{o.status==="active"?"نشط":"مكتمل ✓"}</span>
            </div>
            <div style={{ display:"flex",gap:3,marginBottom:10 }}>
              {Array(o.of).fill(0).map((_,i)=>(
                <div key={i} style={{ flex:1,height:6,borderRadius:3,background:i<o.paid?"linear-gradient(90deg,#10B981,#34D399)":"#EEF3EF",transition:"all .3s" }}/>
              ))}
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,color:"#6A8E7A",marginBottom:o.status==="active"?10:0 }}>
              <span>القسط {o.paid}/{o.of} · {Math.round(o.total/o.of).toLocaleString()} ر.س/قسط</span>
              <span style={{ fontWeight:700,color:"#0D1F14" }}>{o.total.toLocaleString()} ر.س</span>
            </div>
            {o.status==="active"&&(
              <div style={{ display:"flex",gap:8 }}>
                <button onClick={()=>go("postpone")} style={{ flex:1,background:"#F5F7FA",border:"1px solid #E2EAE4",borderRadius:10,padding:"8px",color:"#4A6455",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>⏰ تأجيل</button>
                <button style={{ flex:2,background:"linear-gradient(135deg,#10B981,#059669)",border:"none",borderRadius:10,padding:"8px",color:"#fff",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>دفع القسط الآن</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
function NotifsScreen({ go }) {
  const [notifs,setNotifs]=useState(NOTIFS_DATA);
  const markAll=()=>setNotifs(p=>p.map(n=>({...n,read:true})));
  return (
    <div className="screen">
      <div style={{ padding:"44px 16px 12px",background:"linear-gradient(180deg,#EEF3EF 0%,#F5F7FA 100%)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4 }}>
          <div style={{ fontSize:18,fontWeight:900,color:"#0D1F14" }}>🔔 الإشعارات</div>
          <button onClick={markAll} style={{ fontSize:12,color:"#10B981",fontWeight:700,background:"none",border:"none",cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>قراءة الكل</button>
        </div>
      </div>
      <div style={{ padding:"12px 16px" }}>
        {notifs.map((n,i)=>(
          <div key={n.id} style={{ display:"flex",gap:12,padding:"14px",marginBottom:8,background:n.read?"#FAFCFA":"#E8F5EF",border:1px solid ${n.read?"#EEF3EF":"#C6E8D6"},borderRadius:16,animation:fadeUp .3s ${i*.06}s ease both,cursor:"pointer" }} onClick={()=>setNotifs(p=>p.map(x=>x.id===n.id?{...x,read:true}:x))}>
            <div style={{ width:44,height:44,borderRadius:13,background:n.read?"#EEF3EF":"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,border:1px solid ${n.read?"#E2EAE4":"#C6E8D6"} }}>{n.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,fontWeight:n.read?600:800,color:"#0D1F14",marginBottom:3 }}>{n.title}</div>
              <div style={{ fontSize:11,color:"#6A8E7A",marginBottom:3 }}>{n.sub}</div>
              <div style={{ fontSize:10,color:"#9BB5A3" }}>{n.time}</div>
            </div>
            {!n.read&&<div style={{ width:8,height:8,borderRadius:"50%",background:"#10B981",flexShrink:0,marginTop:4 }}/>}
          </div>
        ))}
      </div>
    </div>
  );
}
function ProfileScreen({ go }) {
  const [darkMode,setDarkMode]=useState(false);
  const items=[
    {icon:"👤",label:"بياناتي الشخصية",sub:"الاسم، الهوية، الجوال"},{icon:"🏦",label:"حساباتي البنكية",sub:"IBAN مربوط"},{icon:"🔒",label:"الأمان والخصوصية",sub:"رمز PIN، بصمة"},{icon:"🔔",label:"إعدادات الإشعارات",sub:"تحكم في التنبيهات"},{icon:"❓",label:"المساعدة والدعم",sub:"تواصل معنا"},
  ];
  return (
    <div className="screen">
      <div style={{ background:"linear-gradient(160deg,#0a2e1a,#145a30)",padding:"44px 20px 28px",textAlign:"center" }}>
        <div style={{ width:72,height:72,borderRadius:"50%",background:"rgba(255,255,255,.1)",border:"2px solid rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 12px" }}>👤</div>
        <div style={{ fontSize:18,fontWeight:900,color:"#fff",marginBottom:2 }}>عاصم</div>
        <div style={{ fontSize:12,color:"rgba(255,255,255,.5)",marginBottom:12 }}>مستوى فضي 🥈 · 830 نقطة</div>
        <div style={{ display:"inline-flex",gap:16,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",borderRadius:16,padding:"10px 20px" }}>
          {[["2","أقساط نشطة"],["47","كاشباك ر.س"],["830","نقطة"]].map(([v,l],i)=>(
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontSize:18,fontWeight:900,color:"#fff" }}>{v}</div>
              <div style={{ fontSize:9,color:"rgba(255,255,255,.5)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"16px" }}>
        {items.map((item,i)=>(
          <div key={i} style={{ display:"flex",gap:12,alignItems:"center",padding:"14px",marginBottom:8,background:"#fff",border:"1px solid #E8EDE9",borderRadius:16,cursor:"pointer",animation:fadeUp .3s ${i*.06}s ease both }}>
            <div style={{ width:42,height:42,borderRadius:13,background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{item.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,fontWeight:700,color:"#0D1F14" }}>{item.label}</div>
              <div style={{ fontSize:11,color:"#8FA898" }}>{item.sub}</div>
            </div>
            <span style={{ color:"#C6D8CC",fontSize:16 }}>←</span>
          </div>
        ))}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px",background:"#fff",border:"1px solid #E8EDE9",borderRadius:16,marginBottom:8 }}>
          <div style={{ display:"flex",gap:12,alignItems:"center" }}>
            <div style={{ width:42,height:42,borderRadius:13,background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>🌙</div>
            <div><div style={{ fontSize:13,fontWeight:700,color:"#0D1F14" }}>الوضع الليلي</div><div style={{ fontSize:11,color:"#8FA898" }}>تغيير مظهر التطبيق</div></div>
          </div>
          <div onClick={()=>setDarkMode(p=>!p)} style={{ width:44,height:24,borderRadius:12,background:darkMode?"#10B981":"#E2EAE4",cursor:"pointer",position:"relative",transition:"all .3s" }}>
            <div style={{ position:"absolute",top:2,right:darkMode?2:22,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"all .3s",boxShadow:"0 1px 4px rgba(0,0,0,.2)" }}/>
          </div>
        </div>
        <div style={{ marginTop:8 }}><Btn ghost onClick={()=>go("onboarding")}>تسجيل الخروج</Btn></div>
      </div>
    </div>
  );
}
function CheckoutScreen({ go }) {
  const [step,setStep]=useState(1); const [store,setStore]=useState(null); const [amount,setAmount]=useState(""); const [plan,setPlan]=useState(null); const [loading,setLoading]=useState(false); const [done,setDone]=useState(false);
  const amt=parseFloat(amount)||0; const installment=plan?Math.round(amt/plan):0;
  if(done)return(
    <div style={{ padding:"60px 28px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:16 }}>
      <div style={{ fontSize:80,animation:"checkPop .6s ease" }}>✅</div>
      <div style={{ fontSize:24,fontWeight:900,color:"#0D1F14" }}>تمت الموافقة!</div>
      <div style={{ fontSize:14,color:"#6A8E7A",lineHeight:1.7 }}>تم تفعيل تقسيطك بنجاح<br/>{installment.toLocaleString()} ر.س × {plan} أقساط</div>
      <div style={{ width:"100%",marginTop:8 }}><Btn onClick={()=>go("orders")}>عرض أقساطي ←</Btn></div>
      <Btn ghost onClick={()=>go("home")}>العودة للرئيسية</Btn>
    </div>
  );
  return(
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
        <BackBtn onClick={()=>step>1?setStep(s=>s-1):go("home")}/>
        <div><div style={{ fontSize:20,fontWeight:900,color:"#0D1F14" }}>تقسيط جديد</div><div style={{ fontSize:11,color:"#8FA898" }}>الخطوة {step} من 3</div></div>
      </div>
      <div style={{ display:"flex",gap:4,marginBottom:24 }}>{[1,2,3].map(i=><div key={i} style={{ flex:1,height:4,borderRadius:4,background:step>=i?"linear-gradient(90deg,#10B981,#34D399)":"#EEF3EF",transition:"all .3s" }}/>)}</div>
      {step===1&&(
        <div>
          <div style={{ fontSize:14,fontWeight:800,color:"#0D1F14",marginBottom:12 }}>اختر المتجر</div>
          {STORES.map((s,i)=>(
            <div key={i} onClick={()=>setStore(s.id)} style={{ background:store===s.id?"#E8F5EF":"#F5F7FA",border:1.5px solid ${store===s.id?"#10B981":"#E2EAE4"},borderRadius:16,padding:14,marginBottom:10,cursor:"pointer",display:"flex",gap:12,alignItems:"center",transition:"all .25s" }}>
              <div style={{ width:46,height:46,borderRadius:13,background:store===s.id?"#C6E8D6":"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24 }}>{s.logo}</div>
              <div style={{ flex:1 }}><div style={{ fontWeight:700,fontSize:14,color:"#0D1F14" }}>{s.name}</div><div style={{ fontSize:11,color:"#8FA898" }}>{s.cat}</div></div>
              <span style={{ background:"#FEF3C7",color:"#92400E",fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:8 }}>كاشباك {s.cashback}</span>
            </div>
          ))}
          <div style={{ marginTop:8 }}><Btn disabled={!store} onClick={()=>setStep(2)}>التالي ←</Btn></div>
        </div>
      )}
      {step===2&&(
        <div>
          <div style={{ fontSize:14,fontWeight:800,color:"#0D1F14",marginBottom:12 }}>أدخل المبلغ</div>
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0" style={{ width:"100%",background:"#F5F7FA",border:1.5px solid ${amt>0?"#10B981":"#E2EAE4"},borderRadius:14,padding:"16px",color:"#0D1F14",fontFamily:"Tajawal,sans-serif",fontSize:34,fontWeight:900,textAlign:"center",outline:"none",marginBottom:12 }}/>
          <div style={{ display:"flex",gap:8,marginBottom:20 }}>
            {[500,1000,2000,5000].map(q=><button key={q} onClick={()=>setAmount(String(q))} style={{ flex:1,padding:"8px 4px",background:parseFloat(amount)===q?"#E8F5EF":"#F5F7FA",border:1px solid ${parseFloat(amount)===q?"#10B981":"#E2EAE4"},borderRadius:10,color:parseFloat(amount)===q?"#10B981":"#4A6455",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>{q.toLocaleString()}</button>)}
          </div>
          <Btn disabled={amt<100} onClick={()=>setStep(3)}>التالي ←</Btn>
        </div>
      )}
      {step===3&&(
        <div>
          <div style={{ fontSize:14,fontWeight:800,color:"#0D1F14",marginBottom:12 }}>اختر خطة التقسيط</div>
          {[4,6,12].map(n=>(
            <div key={n} onClick={()=>setPlan(n)} style={{ background:plan===n?"#E8F5EF":"#F5F7FA",border:1.5px solid ${plan===n?"#10B981":"#E2EAE4"},borderRadius:16,padding:16,marginBottom:10,cursor:"pointer",transition:"all .25s" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div><div style={{ fontSize:16,fontWeight:900,color:"#0D1F14" }}>{n} أقساط</div><div style={{ fontSize:11,color:"#8FA898" }}>بدون فوائد ✓</div></div>
                <div style={{ textAlign:"left" }}><div style={{ fontSize:22,fontWeight:900,color:"#10B981" }}>{Math.round(amt/n).toLocaleString()}</div><div style={{ fontSize:10,color:"#8FA898" }}>ر.س/قسط</div></div>
              </div>
            </div>
          ))}
          <div style={{ marginTop:8 }}><Btn disabled={!plan} loading={loading} onClick={()=>{setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},2000);}}>تأكيد وتفعيل 🚀</Btn></div>
        </div>
      )}
    </div>
  );
}
function PostponeScreen({ go }) {
  const [selected,setSelected]=useState(null); const [done,setDone]=useState(false); const [loading,setLoading]=useState(false);
  const orders=ORDERS_DATA.filter(o=>o.status==="active");
  if(done)return(
    <div style={{ padding:"60px 28px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:16 }}>
      <div style={{ fontSize:80,animation:"checkPop .6s ease" }}>⏰</div>
      <div style={{ fontSize:22,fontWeight:900,color:"#0D1F14" }}>تم التأجيل!</div>
      <div style={{ fontSize:14,color:"#6A8E7A" }}>تم تأجيل قسطك 30 يوماً بنجاح</div>
      <div style={{ width:"100%" }}><Btn onClick={()=>go("orders")}>عرض أقساطي ←</Btn></div>
    </div>
  );
  return(
    <div style={{ padding:"44px 20px 20px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
        <BackBtn onClick={()=>go("orders")}/>
        <div style={{ fontSize:20,fontWeight:900,color:"#0D1F14" }}>تأجيل قسط</div>
      </div>
      <div className="card-g" style={{ marginBottom:20,textAlign:"center" }}>
        <div style={{ fontSize:32,marginBottom:8 }}>🎁</div>
        <div style={{ fontSize:14,fontWeight:800,color:"#0D1F14",marginBottom:4 }}>تأجيل مجاني</div>
        <div style={{ fontSize:12,color:"#6A8E7A" }}>مرة واحدة مجاناً كل سنة — التأجيل لمدة 30 يوماً</div>
      </div>
      {orders.map((o,i)=>(
        <div key={i} onClick={()=>setSelected(o.id)} style={{ background:selected===o.id?"#E8F5EF":"#F5F7FA",border:1.5px solid ${selected===o.id?"#10B981":"#E2EAE4"},borderRadius:16,padding:14,marginBottom:10,cursor:"pointer",transition:"all .25s" }}>
          <div style={{ display:"flex",gap:10,alignItems:"center" }}>
            <div style={{ fontSize:24 }}>{o.logo}</div>
            <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:800,color:"#0D1F14" }}>{o.item}</div><div style={{ fontSize:11,color:"#8FA898" }}>القسط القادم: {o.next}</div></div>
            <div style={{ fontSize:16,fontWeight:900,color:"#10B981" }}>{Math.round(o.total/o.of).toLocaleString()} ر.س</div>
          </div>
        </div>
      ))}
      <Btn disabled={!selected} loading={loading} onClick={()=>{setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},1500);}}>تأكيد التأجيل ⏰</Btn>
    </div>
  );
}
function BudgetScreen({ go }) {
  const [month]=useState("مارس"); const total=5000; const spent=2263; const pct=Math.round((spent/total)*100);
  const cats=[{name:"إلكترونيات",spent:1250,budget:2000,color:"#38BDF8"},{name:"رياضة",spent:600,budget:800,color:"#A78BFA"},{name:"أثاث",spent:413,budget:1000,color:"#10B981"},{name:"جمال",spent:0,budget:500,color:"#F59E0B"}];
  const months=["يناير","فبراير","مارس"].map(m=>({month:m,spent:m==="مارس"?spent:Math.round(Math.random()*3000+1000)}));
  const r=80; const circ=2*Math.PI*r; const dash=circ*(pct/100);
  return(
    <div className="screen">
      <div style={{ padding:"44px 16px 16px",background:"linear-gradient(180deg,#E8F5EF 0%,#F5F7FA 100%)" }}>
        <div style={{ fontSize:18,fontWeight:900,color:"#0D1F14",marginBottom:4 }}>📊 الميزانية الذكية</div>
        <div style={{ fontSize:12,color:"#6A8E7A" }}>{month} 2025</div>
      </div>
      <div style={{ padding:"16px" }}>
        <div className="card" style={{ marginBottom:16,textAlign:"center" }}>
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ margin:"0 auto",display:"block" }}>
            <circle cx="100" cy="100" r={r} fill="none" stroke="#EEF3EF" strokeWidth="16"/>
            <circle cx="100" cy="100" r={r} fill="none" stroke={pct>=85?"#EF4444":"#10B981"} strokeWidth="16" strokeDasharray={${dash} ${circ-dash}} strokeLinecap="round" transform="rotate(-90 100 100)" style={{ transition:"stroke-dasharray .6s ease" }}/>
            <text x="100" y="95" textAnchor="middle" fill="#0D1F14" fontSize="28" fontWeight="900" fontFamily="Tajawal">{pct}%</text>
            <text x="100" y="118" textAnchor="middle" fill="#8FA898" fontSize="11" fontFamily="Tajawal">من الميزانية</text>
          </svg>
          <div style={{ fontSize:13,color:"#4A6455",marginTop:4 }}>{spent.toLocaleString()} من {total.toLocaleString()} ر.س</div>
          {pct>=85&&<div style={{ background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:12,padding:"8px 12px",marginTop:10,fontSize:12,color:"#DC2626",fontWeight:700 }}>⚠️ اقتربت من حد ميزانيتك!</div>}
        </div>
        <div style={{ marginBottom:16 }}>
          {cats.map((c,i)=>(
            <div key={i} className="card" style={{ marginBottom:8 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13 }}>
                <span style={{ fontWeight:700,color:"#0D1F14" }}>{c.name}</span>
                <span style={{ color:c.color,fontWeight:800 }}>{c.spent.toLocaleString()} / {c.budget.toLocaleString()} ر.س</span>
              </div>
              <div style={{ height:8,background:"#EEF3EF",borderRadius:8,overflow:"hidden" }}>
                <div style={{ height:"100%",width:${Math.min((c.spent/c.budget)*100,100)}%,background:c.color,borderRadius:8,transition:"width .6s ease" }}/>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontSize:13,fontWeight:800,color:"#0D1F14",marginBottom:10 }}>المقارنة الشهرية</div>
          <div style={{ display:"flex",gap:8,alignItems:"flex-end",height:80 }}>
            {months.map((m,i)=>(
              <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                <div style={{ fontSize:9,color:"#8FA898",fontWeight:700 }}>{m.spent.toLocaleString()}</div>
                <div style={{ width:"100%",background:m.month==="مارس"?"#10B981":"#C6E8D6",borderRadius:"6px 6px 0 0",height:${(m.spent/4000)*70}px,transition:"height .5s ease" }}/>
                <div style={{ fontSize:10,color:m.month==="مارس"?"#10B981":"#8FA898",fontWeight:700 }}>{m.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function LoyaltyScreen({ go }) {
  const [points]=useState(830); const [tab,setTab]=useState("rewards");
  const rewards=[{icon:"☕",name:"قهوة مجانية",pts:200,cat:"طعام"},{icon:"🎬",name:"تذكرة سينما",pts:500,cat:"ترفيه"},{icon:"🛒",name:"خصم 50 ر.س",pts:300,cat:"تسوق"},{icon:"✈️",name:"ترقية طيران",pts:2000,cat:"سفر"}];
  const history=[{icon:"✅",desc:"دفع قسط آيفون",pts:"+25",color:"#10B981"},{icon:"🛍️",desc:"شراء من نون",pts:"+10",color:"#10B981"},{icon:"🎁",desc:"استبدال نقاط",pts:"-200",color:"#EF4444"}];
  return(
    <div className="screen">
      <div style={{ background:"linear-gradient(160deg,#1a0a2e,#2e1a5a)",padding:"44px 20px 28px",textAlign:"center" }}>
        <div style={{ fontSize:14,color:"rgba(255,255,255,.6)",marginBottom:4 }}>رصيد نقاطك</div>
        <div style={{ fontSize:52,fontWeight:900,color:"#F59E0B",marginBottom:4,animation:"pulse 2s ease-in-out infinite" }}>{points.toLocaleString()}</div>
        <div style={{ fontSize:13,color:"rgba(255,255,255,.5)" }}>نقطة ذهبية ✦</div>
        <div style={{ display:"flex",gap:12,justifyContent:"center",marginTop:16 }}>
          {[["فضي 🥈","مستواك الحالي","#9CA3AF"],["ذهبي 🥇","بعد 170 نقطة","#F59E0B"]].map(([l,s,c],i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,.08)",border:1px solid ${c}44,borderRadius:14,padding:"10px 16px",textAlign:"center" }}>
              <div style={{ fontSize:14,fontWeight:800,color:c }}>{l}</div>
              <div style={{ fontSize:10,color:"rgba(255,255,255,.5)" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"16px" }}>
        <div className="tab-bar" style={{ marginBottom:16 }}>
          {[{id:"rewards",label:"المكافآت"},{id:"history",label:"السجل"}].map(t=>(
            <button key={t.id} className={tab ${tab===t.id?"on":"off"}} onClick={()=>setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        {tab==="rewards"&&(
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            {rewards.map((r,i)=>(
              <div key={i} className="card" style={{ textAlign:"center",animation:scaleIn .4s ${i*.08}s ease both }}>
                <div style={{ fontSize:32,marginBottom:8 }}>{r.icon}</div>
                <div style={{ fontSize:12,fontWeight:800,color:"#0D1F14",marginBottom:4 }}>{r.name}</div>
                <div style={{ fontSize:11,color:"#F59E0B",fontWeight:700,marginBottom:10 }}>✦ {r.pts} نقطة</div>
                <button disabled={points<r.pts} style={{ width:"100%",background:points>=r.pts?"linear-gradient(135deg,#F59E0B,#D97706)":"#EEF3EF",border:"none",borderRadius:10,padding:"7px",color:points>=r.pts?"#fff":"#9BB5A3",fontSize:11,fontWeight:800,cursor:points>=r.pts?"pointer":"not-allowed",fontFamily:"Tajawal,sans-serif" }}>{points>=r.pts?"استبدل":"نقاط غير كافية"}</button>
              </div>
            ))}
          </div>
        )}
        {tab==="history"&&history.map((h,i)=>(
          <div key={i} style={{ display:"flex",gap:12,alignItems:"center",padding:"12px 14px",marginBottom:8,background:"#FAFCFA",border:"1px solid #EEF3EF",borderRadius:14 }}>
            <div style={{ width:40,height:40,borderRadius:12,background:"#EEF3EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>{h.icon}</div>
            <div style={{ flex:1,fontSize:13,fontWeight:600,color:"#0D1F14" }}>{h.desc}</div>
            <div style={{ fontSize:16,fontWeight:900,color:h.color }}>{h.pts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function GoalScreen({ go }) {
  const [goals,setGoals]=useState([{id:1,name:"لابتوب جديد",target:3500,saved:1200,months:6,icon:"💻"},{id:2,name:"رحلة اليابان",target:8000,saved:500,months:12,icon:"✈️"}]);
  const [modal,setModal]=useState(false); const [newGoal,setNewGoal]=useState({name:"",target:"",months:6,icon:"🎯"});
  const icons=["🎯","💻","📱","✈️","🏠","🚗","📚","👟"];
  const addGoal=()=>{
    if(!newGoal.name||!newGoal.target)return;
    setGoals(p=>[...p,{id:Date.now(),name:newGoal.name,target:parseFloat(newGoal.target),saved:0,months:newGoal.months,icon:newGoal.icon}]);
    setModal(false);setNewGoal({name:"",target:"",months:6,icon:"🎯"});
  };
  return(
    <div className="screen">
      <div style={{ padding:"44px 16px 16px",background:"linear-gradient(180deg,#FEF3C7 0%,#F5F7FA 100%)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div><div style={{ fontSize:18,fontWeight:900,color:"#0D1F14" }}>🎯 قسّط هدفك</div><div style={{ fontSize:12,color:"#6A8E7A",marginTop:2 }}>ادّخر وحقق أهدافك بالتقسيط</div></div>
          <button onClick={()=>setModal(true)} style={{ background:"linear-gradient(135deg,#F59E0B,#D97706)",border:"none",borderRadius:12,padding:"8px 14px",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"Tajawal,sans-serif" }}>+ هدف جديد</button>
        </div>
      </div>
      <div style={{ padding:"16px" }}>
        {goals.map((g,i)=>{
          const pct=Math.round((g.saved/g.target)*100);
          const monthly=Math.round((g.target-g.saved)/g.months);
          return(
            <div key={g.id} className="card" style={{ marginBottom:12,animation:fadeUp .4s ${i*.08}s ease both }}>
              <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:12 }}>
                <div style={{ width:50,height:50,borderRadius:15,background:"#FEF3C7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26 }}>{g.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14,fontWeight:800,color:"#0D1F14" }}>{g.name}</div>
                  <div style={{ fontSize:11,color:"#8FA898" }}>الهدف: {g.target.toLocaleString()} ر.س · {g.months} أشهر</div>
                </div>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:20,fontWeight:900,color:"#F59E0B" }}>{pct}%</div>
                  <div style={{ fontSize:9,color:"#8FA898" }}>مكتمل</div>
                </div>
              </div>
              <div style={{ height:8,background:"#EEF3EF",borderRadius:8,overflow:"hidden",marginBottom:8 }}>
                <div style={{ height:"100%",width:${pct}%,background:"linear-gradient(90deg,#F59E0B,#FCD34D)",borderRadius:8,transition:"width .6s ease" }}/>
              </div>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:"#8FA898",marginBottom:10 }}>
                <span>محفوظ: {g.saved.toLocaleString()} ر.س</span>
                <span>متبقي: {(g.target-g.saved).toLocaleString()} ر.س</span>
              </div>
              <div style={{ background:"#E8F5EF",border:"1px solid #C6E8D6",borderRadius:12,padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ fontSize:12,color:"#4A6455" }}>القسط الشهري المقترح</span>
                <span style={{ fontSize:16,fontWeight:900,color:"#10B981" }}>{monthly.toLocaleString()} ر.س</span>
              </div>
            </div>
          );
        })}
      </div>
      {modal&&(
        <div className="modal-bg" onClick={()=>setModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:16,fontWeight:900,color:"#0D1F14",marginBottom:16 }}>هدف جديد 🎯</div>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:12 }}>
              {icons.map(ic=><button key={ic} onClick={()=>setNewGoal(p=>({...p,icon:ic}))} style={{ width:44,height:44,borderRadius:12,background:newGoal.icon===ic?"#E8F5EF":"#F5F7FA",border:1.5px solid ${newGoal.icon===ic?"#10B981":"#E2EAE4"},fontSize:22,cursor:"pointer" }}>{ic}</button>)}
            </div>
            <input className="inp" placeholder="اسم الهدف" value={newGoal.name} onChange={e=>setNewGoal(p=>({...p,name:e.target.value}))} style={{ marginBottom:10 }}/>
            <input className="inp" placeholder="المبلغ المستهدف (ر.س)" type="number" value={newGoal.target} onChange={e=>setNewGoal(p=>({...p,target:e.target.value}))} style={{ marginBottom:10 }}/>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:12,color:"#4A6455",marginBottom:8,fontWeight:700 }}>مدة التوفير: {newGoal.months} أشهر</div>
              <input type="range" min="1" max="24" value={newGoal.months} onChange={e=>setNewGoal(p=>({...p,months:parseInt(e.target.value)}))} style={{ width:"100%",accentColor:"#10B981" }}/>
            </div>
            <Btn onClick={addGoal} disabled={!newGoal.name||!newGoal.target}>إضافة الهدف ✓</Btn>
          </div>
        </div>
      )}
    </div>
  );
}
const NAV=[{id:"home",icon:"⬡",label:"الرئيسية"},{id:"shop",icon:"🛍️",label:"تسوق"},{id:"wallet",icon:"💳",label:"محفظة"},{id:"orders",icon:"📋",label:"أقساطي"},{id:"profile",icon:"👤",label:"حسابي"}];
export default function App() {
  const [screen,setScreen]=useState("onboarding");
  const [notif,setNotif]=useState(null);
  const go=(s)=>setScreen(s);
  const showNotif=(msg)=>{setNotif(msg);};
  const noNav=["onboarding","auth","pin-setup","pin-login","checkout","postpone","withdraw","budget","loyalty","goal"].includes(screen);
  const styleEl = document.createElement("style");
  styleEl.textContent = F + CSS;
  if (!document.head.querySelector("style[data-muyassar]")) {
    styleEl.setAttribute("data-muyassar","1");
    document.head.appendChild(styleEl);
  }
  return (
    <div className="app">
      <div className="phone">
        <div className="notch"/>
        {notif&&<NotifToast msg={notif} onDone={()=>setNotif(null)}/>}
        {screen==="onboarding"&&<OnboardingScreen onDone={()=>go("auth")}/>}
        {screen==="auth"&&<AuthScreen onDone={()=>go("pin-setup")}/>}
        {screen==="pin-setup"&&<PinScreen mode="setup" onDone={()=>go("pin-login")}/>}
        {screen==="pin-login"&&<PinScreen mode="login" onDone={()=>go("home")}/>}
        {screen==="home"&&<HomeScreen go={go} notif={showNotif}/>}
        {screen==="shop"&&<ShopScreen go={go}/>}
        {screen==="wallet"&&<WalletScreen go={go}/>}
        {screen==="deals"&&<DealsScreen go={go}/>}
        {screen==="friends"&&<FriendsScreen go={go}/>}
        {screen==="orders"&&<OrdersScreen go={go}/>}
        {screen==="notifs"&&<NotifsScreen go={go}/>}
        {screen==="profile"&&<ProfileScreen go={go}/>}
        {screen==="withdraw"&&<WithdrawScreen go={go}/>}
        {screen==="checkout"&&<CheckoutScreen go={go}/>}
        {screen==="postpone"&&<PostponeScreen go={go}/>}
        {screen==="budget"&&<BudgetScreen go={go}/>}
        {screen==="loyalty"&&<LoyaltyScreen go={go}/>}
        {screen==="goal"&&<GoalScreen go={go}/>}
        {!noNav&&(
          <div className="bnav">
            {NAV.map(n=>(
              <button key={n.id} className={bnav-btn ${screen===n.id?"on":""}} onClick={()=>go(n.id)}>
                <span style={{ fontSize:20 }}>{n.icon}</span>
                <span>{n.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
