import { useState, useEffect, useRef } from "react";

/* ═══════════ DATA ═══════════ */
const PRODUCTS = [
  {
    id: 1, name: "Xoài Tứ Quý — Quả Chín",
    farm: "Vườn ông Ba, Thạnh Phú", harvestDate: "02/04",
    priceSi: "22.000", priceLe: "55.000", savings: "60%",
    weight: "1–1.5kg/trái", moq: "20kg (1 thùng)",
    desc: "Chín vàng ươm, ngọt đậm, vị mặn nhẹ cuối lưỡi — chỉ đất cát ven biển Bến Tre mới có.",
    badge: "Bán chạy #1", badgeColor: "#DC2626",
    stock: "~2.2 tấn", stockUntil: "05/04",
    tags: ["Ngọt đậm", "Ít xơ", "Vị mặn đặc trưng"],
    emoji: "🥭",
  },
  {
    id: 2, name: "Xoài Tứ Quý — Quả Xanh Giòn",
    farm: "Vườn chú Tám, Ba Tri", harvestDate: "01/04",
    priceSi: "18.000", priceLe: "42.000", savings: "57%",
    weight: "0.8–1.3kg/trái", moq: "20kg (1 thùng)",
    desc: "Giòn sần sật, chua thanh nhẹ — lý tưởng cho gỏi xoài, xoài lắc, xoài chấm mắm.",
    badge: "Đang mùa", badgeColor: "#16803C",
    stock: "~3 tấn", stockUntil: "07/04",
    tags: ["Giòn sần sật", "Chua thanh", "Làm gỏi"],
    emoji: "🥭",
  },
  {
    id: 3, name: "Combo Hộp Quà 5kg",
    farm: "Tuyển chọn từ Thạnh Phú", harvestDate: "02/04",
    priceSi: "275.000", priceLe: "375.000", savings: "27%", unit: "/hộp",
    weight: "5kg (3–4 trái chín)", moq: "1 hộp",
    desc: "Đóng hộp carton sang trọng, kèm thiệp. Quà tặng đối tác, sếp, gia đình — ý nghĩa và khác biệt.",
    badge: "Quà tặng", badgeColor: "#9333EA",
    stock: "50 hộp/tuần", stockUntil: "",
    tags: ["Có thiệp", "Đóng hộp đẹp", "Tặng được ngay"],
    emoji: "🎁",
  },
];

const PROCESS_STEPS = [
  { num: "01", icon: "🌊", title: "Đất cát ven biển", desc: "Vùng giồng cát nhiễm mặn Thạnh Phú — tạo vị mặn nhẹ không đâu có. Đã được cấp Chỉ dẫn địa lý." },
  { num: "02", icon: "👜", title: "Bao trái từ nhỏ", desc: "Mỗi trái bao túi vải riêng từ khi bằng ngón tay — đẹp mã, không sâu bệnh, chín đều." },
  { num: "03", icon: "❄️", title: "Đóng thùng lạnh", desc: "Thùng carton + xốp + đá khô. Cân dư 2% bù hao vận chuyển — không bao giờ thiếu ký." },
  { num: "04", icon: "🚛", title: "Xe lạnh chuyên tuyến", desc: "Bến Tre → Hà Nội: 24h · → Vinh: 18h · → Thanh Hóa: 20h. Giao tận chợ hoặc tận nhà." },
];

const TESTIMONIALS = [
  {
    text: "Lấy 3 đợt rồi, hàng đều hơn mối cũ, size không lẫn. Sạp tôi tuần nào cũng hết trước 2 ngày.",
    name: "Chị Lan", detail: "Sạp 23, chợ Vinh, Nghệ An", since: "Khách từ 08/2025",
    market: "nghean",
  },
  {
    text: "Khách Hà Nội sành ăn lắm, xoài Úc xoài Đài họ chê — nhưng xoài Tứ Quý Bến Tre thì hết veo. Vị mặn nhẹ cuối lưỡi khác hẳn.",
    name: "Anh Toàn", detail: "Chuỗi 3 cửa hàng trái cây, Cầu Giấy, Hà Nội", since: "Khách từ 03/2025",
    market: "hanoi",
  },
  {
    text: "Đặt combo hộp quà tặng đối tác dịp Tết, ai cũng hỏi mua ở đâu. Đóng gói đẹp, xoài thơm, giao đúng hẹn.",
    name: "Chị Hương", detail: "Giám đốc công ty XNK, Thanh Xuân, Hà Nội", since: "Khách từ 12/2025",
    market: "hanoi",
  },
  {
    text: "Tôi so sánh 3 mối rồi mới chốt. Ở đây cân dư 2%, hàng lỗi thì bồi đơn sau không cần gửi trả. Làm ăn thẳng thắn.",
    name: "Anh Hùng", detail: "Tiểu thương chợ Phủ, Thanh Hóa", since: "Khách từ 06/2025",
    market: "thanhhoa",
  },
];

const FAQS = [
  { q: "Ship xa như vậy xoài có bị dập không?", a: "Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm + đá khô. 3 năm giao hàng Bắc, tỷ lệ lỗi dưới 2%. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau, không cần gửi trả." },
  { q: "Sao biết là xoài Bến Tre thật chứ không phải nơi khác?", a: "Mỗi thùng có QR truy xuất nguồn gốc: tên vườn, ngày hái, người thu hoạch. Sản phẩm thuộc vùng Chỉ dẫn địa lý \"Bến Tre\" do Cục SHTT cấp năm 2022 — giả là vi phạm pháp luật." },
  { q: "Tôi đang có mối rồi, sao phải đổi?", a: "Không cần đổi ngay. Đặt thử 1 thùng 20kg, so sánh với mối hiện tại — free ship lần đầu. Nếu hàng không hơn, anh/chị không mất gì cả." },
  { q: "Giá sỉ có ổn định không?", a: "Giá dao động theo thị trường, cập nhật mỗi sáng trên web và Zalo OA. Sau khi chốt đơn, cam kết giữ giá 7 ngày — không tăng giữa chừng." },
  { q: "Thanh toán và hóa đơn?", a: "COD khi nhận hàng hoặc chuyển khoản trước. Có sổ công nợ cho đối tác quen (sau 3 đơn). Xuất hóa đơn VAT đầy đủ cho nhà hàng, doanh nghiệp." },
  { q: "Xoài Tứ Quý ăn chín hay xanh ngon hơn?", a: "Người miền Bắc thường thích ăn chín — ngọt đậm, thơm hắc, vị mặn nhẹ. Người miền Nam thích ăn xanh — giòn sần sật, chua thanh. Chúng tôi cung cấp cả hai, ghi rõ khi đặt hàng." },
];

const CALENDAR = [
  { name: "Xoài Tứ Quý (chín vụ 1)", months: [0,0,1,2,2,2,1,0,0,0,0,0] },
  { name: "Xoài Tứ Quý (chín vụ 2)", months: [0,0,0,0,0,0,0,1,2,2,1,0] },
  { name: "Xoài Tứ Quý (vụ 3 + Tết)", months: [1,0,0,0,0,0,0,0,0,0,1,2] },
  { name: "Xoài xanh (quanh năm)", months: [1,1,1,1,1,1,1,1,1,1,1,1] },
];
const MO = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"];
const CM = 3;

/* ═══════════ HOOKS ═══════════ */
function useInView(t = 0.12) {
  const r = useRef(null);
  const [v, s] = useState(false);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) s(true); }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, [t]);
  return [r, v];
}
function FI({ children, delay = 0, className = "" }) {
  const [r, v] = useInView();
  return <div ref={r} className={className} style={{ opacity: v?1:0, transform: v?"translateY(0)":"translateY(24px)", transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s` }}>{children}</div>;
}

/* ═══════════ COMPONENTS ═══════════ */
function Header() {
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 50); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <header style={{ position:"fixed",top:0,left:0,right:0,zIndex:100, background:sc?"rgba(20,28,16,.97)":"transparent", backdropFilter:sc?"blur(10px)":"none", borderBottom:sc?"1px solid rgba(255,255,255,.06)":"none", transition:"all .35s", padding:"0 20px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:60 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <span style={{ fontSize:24 }}>🥭</span>
          <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,fontSize:18,color:"#F5E6C8",letterSpacing:-.5 }}>Xoài Bến Tre</span>
        </div>
        <nav style={{ display:"flex",alignItems:"center",gap:20 }}>
          <a href="#products" style={{ color:"#C0B090",textDecoration:"none",fontSize:13,fontWeight:500 }}>Giá hôm nay</a>
          <a href="#process" style={{ color:"#C0B090",textDecoration:"none",fontSize:13,fontWeight:500 }}>Quy trình</a>
          <a href="#contact" style={{ background:"linear-gradient(135deg,#E8730C,#C45A08)",color:"#fff",padding:"7px 16px",borderRadius:8,textDecoration:"none",fontSize:13,fontWeight:600,boxShadow:"0 2px 10px rgba(232,115,12,.3)" }}>Zalo Tư Vấn</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ minHeight:"100vh",background:"linear-gradient(170deg,#141C10 0%,#1E2A15 35%,#2A3B1F 70%,#354A26 100%)",position:"relative",overflow:"hidden",display:"flex",alignItems:"center",padding:"100px 20px 60px" }}>
      <div style={{ position:"absolute",top:-100,right:-60,width:380,height:380,background:"radial-gradient(circle,rgba(232,115,12,.1) 0%,transparent 70%)",borderRadius:"50%" }} />
      <div style={{ position:"absolute",bottom:-40,left:-30,width:260,height:260,background:"radial-gradient(circle,rgba(80,120,40,.12) 0%,transparent 70%)",borderRadius:"50%" }} />
      <div style={{ position:"absolute",top:"15%",right:"8%",fontSize:160,opacity:.04,transform:"rotate(-12deg)",userSelect:"none",pointerEvents:"none" }}>🥭</div>

      <div style={{ maxWidth:1100,margin:"0 auto",width:"100%",position:"relative",zIndex:2 }}>
        <FI>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(232,115,12,.12)",border:"1px solid rgba(232,115,12,.25)",borderRadius:100,padding:"5px 14px",marginBottom:20 }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:"#4ADE80",animation:"pulse 2s infinite" }} />
            <span style={{ color:"#F0A050",fontSize:12,fontWeight:600,letterSpacing:.3 }}>MÙA THU HOẠCH THÁNG 4 — ĐANG GIAO HÀNG</span>
          </div>
        </FI>

        <FI delay={.08}>
          <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(32px,5.5vw,58px)",fontWeight:800,color:"#F5E6C8",lineHeight:1.12,marginBottom:16,maxWidth:620,letterSpacing:-1 }}>
            Xoài Tứ Quý Bến Tre
            <span style={{ display:"block",color:"#E8A948",fontSize:"clamp(18px,2.8vw,26px)",fontWeight:500,fontStyle:"italic",marginTop:6,letterSpacing:0 }}>
              Ngọt đậm — Vị mặn nhẹ cuối lưỡi — Không đâu có
            </span>
          </h1>
        </FI>

        <FI delay={.16}>
          <p style={{ color:"#A8B89A",fontSize:16,lineHeight:1.7,maxWidth:500,marginBottom:8 }}>
            Hái sáng tại Thạnh Phú, giao lạnh <strong style={{ color:"#F5E6C8" }}>24h ra Hà Nội</strong>.
            <br />Giá sỉ từ <strong style={{ color:"#E8A948",fontSize:20 }}>22.000đ/kg</strong>
            <span style={{ color:"#7A8B6E",fontSize:14 }}> — rẻ hơn nửa so với xoài Úc cùng phân khúc.</span>
          </p>
        </FI>

        <FI delay={.22}>
          <p style={{ color:"#5E7050",fontSize:13,marginBottom:28,display:"flex",gap:16,flexWrap:"wrap" }}>
            <span>🚛 BT→HN: 24h</span><span>🚛 BT→Vinh: 18h</span><span>🚛 BT→Thanh Hóa: 20h</span>
          </p>
        </FI>

        <FI delay={.28}>
          <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
            <a href="#products" style={{ background:"linear-gradient(135deg,#E8730C,#C45A08)",color:"#fff",padding:"13px 28px",borderRadius:10,textDecoration:"none",fontSize:15,fontWeight:700,boxShadow:"0 4px 18px rgba(232,115,12,.35)",display:"inline-block" }}>
              Xem Giá Sỉ Hôm Nay
            </a>
            <a href="#contact" style={{ background:"rgba(245,230,200,.07)",border:"1px solid rgba(245,230,200,.18)",color:"#F5E6C8",padding:"13px 28px",borderRadius:10,textDecoration:"none",fontSize:15,fontWeight:600,display:"inline-block" }}>
              Đặt Thử 1 Thùng 20kg →
            </a>
          </div>
          <p style={{ color:"#5E7050",fontSize:12,marginTop:10 }}>
            ✓ Free ship lần đầu · ✓ Đổi 100% nếu dập · ✓ Cân dư 2% bù hao
          </p>
        </FI>

        {/* Trust stats */}
        <FI delay={.4}>
          <div style={{ display:"flex",gap:28,marginTop:48,flexWrap:"wrap",paddingTop:28,borderTop:"1px solid rgba(245,230,200,.07)" }}>
            {[
              { n:"95%", l:"sản lượng đi miền Bắc" },
              { n:"200+", l:"đối tác sỉ định kỳ" },
              { n:"CDĐL", l:"Cục SHTT cấp 11/2022" },
              { n:"<2%", l:"tỷ lệ hàng lỗi" },
            ].map((s,i) => (
              <div key={i} style={{ minWidth:90 }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:"#E8A948" }}>{s.n}</div>
                <div style={{ color:"#6B7D5E",fontSize:12,marginTop:3,lineHeight:1.3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </FI>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </section>
  );
}

function ProductCard({ p, i }) {
  const [h, setH] = useState(false);
  const isCombo = !!p.unit;
  return (
    <FI delay={i * .1}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background:h?"#FFFBF0":"#FFF",borderRadius:16,overflow:"hidden",border:"1px solid #E8E0D0",transition:"all .3s ease",transform:h?"translateY(-5px)":"translateY(0)",boxShadow:h?"0 14px 36px rgba(100,80,40,.12)":"0 2px 10px rgba(100,80,40,.05)" }}>
        <div style={{ height:140,background:"linear-gradient(135deg,#F5E6C8,#E8D4A0,#D4B870)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
          <span style={{ fontSize:64,filter:"drop-shadow(0 3px 8px rgba(0,0,0,.12))" }}>{p.emoji}</span>
          <div style={{ position:"absolute",top:10,left:10,background:p.badgeColor,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:100,letterSpacing:.3 }}>{p.badge}</div>
          {p.stock && <div style={{ position:"absolute",top:10,right:10,background:"rgba(0,0,0,.6)",color:"#F0D080",fontSize:10,fontWeight:600,padding:"3px 10px",borderRadius:100 }}>Còn {p.stock}</div>}
        </div>
        <div style={{ padding:"16px 18px 20px" }}>
          <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:17,fontWeight:700,color:"#2A2016",marginBottom:3 }}>{p.name}</h3>
          <p style={{ color:"#8A7A60",fontSize:12,marginBottom:10 }}>📍 {p.farm} · Hái ngày {p.harvestDate}</p>
          <p style={{ color:"#5A4D3A",fontSize:13,lineHeight:1.55,marginBottom:12,minHeight:40 }}>{p.desc}</p>
          <div style={{ display:"flex",gap:5,marginBottom:14,flexWrap:"wrap" }}>
            {p.tags.map((t,j) => <span key={j} style={{ background:"#F0EBE0",color:"#6B5D45",fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:100 }}>{t}</span>)}
          </div>

          {/* Anchored pricing */}
          <div style={{ background:"#FAF7F0",borderRadius:10,padding:"12px 14px",marginBottom:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end" }}>
              <div>
                <span style={{ color:"#8A7A60",fontSize:11,textDecoration:"line-through" }}>Lẻ: {p.priceLe}đ{isCombo?"/hộp":"/kg"}</span>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:700,color:"#D4580A",marginTop:2 }}>
                  {isCombo?"":"Sỉ: "}{p.priceSi}<span style={{ fontSize:13,fontWeight:500 }}>đ{isCombo?"/hộp":"/kg"}</span>
                </div>
              </div>
              <div style={{ background:"#FEF3C7",color:"#92400E",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:6 }}>-{p.savings}</div>
            </div>
            <p style={{ color:"#8A7A60",fontSize:11,marginTop:6 }}>MOQ: {p.moq} · {p.weight}</p>
            {p.stockUntil && <p style={{ color:"#DC2626",fontSize:11,marginTop:4,fontWeight:600 }}>⏰ Giá áp dụng đến {p.stockUntil}</p>}
          </div>

          <button style={{ width:"100%",background:"linear-gradient(135deg,#2A3B1F,#3D4F2A)",color:"#F5E6C8",border:"none",borderRadius:10,padding:"11px 0",fontSize:13,fontWeight:600,cursor:"pointer" }}>
            {isCombo ? "Đặt hộp quà →" : "Đặt thử — Free ship lần đầu →"}
          </button>
        </div>
      </div>
    </FI>
  );
}

function Products() {
  return (
    <section id="products" style={{ background:"#FAFAF5",padding:"70px 20px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <FI>
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <span style={{ color:"#E8730C",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2 }}>Giá cập nhật sáng 03/04/2026</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(26px,4vw,36px)",fontWeight:800,color:"#2A2016",marginTop:6,marginBottom:8 }}>Chỉ 3 sản phẩm — Chọn ngay, không phải nghĩ</h2>
            <p style={{ color:"#8A7A60",fontSize:14,maxWidth:460,margin:"0 auto" }}>Quả chín cho miền Bắc · Quả xanh cho gỏi · Hộp quà cho tặng. Giá sỉ Zalo để nhận bảng chi tiết theo tấn.</p>
          </div>
        </FI>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20 }}>
          {PRODUCTS.map((p,i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" style={{ background:"linear-gradient(170deg,#141C10,#2A3B1F)",padding:"70px 20px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <FI>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <span style={{ color:"#E8A948",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2 }}>Tại sao khác biệt</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(26px,4vw,36px)",fontWeight:800,color:"#F5E6C8",marginTop:6 }}>Đất cát ven biển → Vị mặn cuối lưỡi</h2>
            <p style={{ color:"#7A8B6E",fontSize:14,maxWidth:480,margin:"8px auto 0" }}>Xoài Tứ Quý trồng ở Cần Thơ, Tiền Giang vẫn ngọt — nhưng thiếu vị mặn đặc trưng. Chỉ đất giồng cát Thạnh Phú, Ba Tri mới tạo ra hương vị này.</p>
          </div>
        </FI>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20 }}>
          {PROCESS_STEPS.map((p,i) => (
            <FI key={i} delay={i*.08}>
              <div style={{ background:"rgba(245,230,200,.04)",border:"1px solid rgba(245,230,200,.08)",borderRadius:14,padding:24,textAlign:"center",position:"relative" }}>
                <div style={{ position:"absolute",top:12,left:16,fontFamily:"'Playfair Display',Georgia,serif",fontSize:32,fontWeight:800,color:"rgba(232,169,72,.08)" }}>{p.num}</div>
                <div style={{ fontSize:36,marginBottom:12 }}>{p.icon}</div>
                <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:16,fontWeight:700,color:"#E8A948",marginBottom:6 }}>{p.title}</h3>
                <p style={{ color:"#8A9B7E",fontSize:13,lineHeight:1.55 }}>{p.desc}</p>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calendar() {
  return (
    <section style={{ background:"#FAFAF5",padding:"70px 20px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <FI>
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(26px,4vw,36px)",fontWeight:800,color:"#2A2016" }}>Lịch Mùa Vụ — Biết mùa, mua đúng</h2>
            <p style={{ color:"#8A7A60",fontSize:14,marginTop:6 }}>Xoài Tứ Quý cho trái 3 vụ/năm — nguồn cung ổn định, không sợ đứt hàng</p>
          </div>
        </FI>
        <FI delay={.1}>
          <div style={{ background:"#fff",borderRadius:14,border:"1px solid #E8E0D0",overflow:"hidden",boxShadow:"0 2px 14px rgba(100,80,40,.05)",overflowX:"auto" }}>
            <div style={{ minWidth:700 }}>
              <div style={{ display:"grid",gridTemplateColumns:"150px repeat(12,1fr)",borderBottom:"1px solid #F0EBE0",background:"#FAF7F0" }}>
                <div style={{ padding:"10px 14px",fontSize:11,fontWeight:700,color:"#8A7A60" }}>Loại</div>
                {MO.map((m,i) => <div key={i} style={{ padding:"10px 0",textAlign:"center",fontSize:11,fontWeight:i===CM?800:500,color:i===CM?"#E8730C":"#8A7A60",background:i===CM?"rgba(232,115,12,.05)":"transparent" }}>{m}</div>)}
              </div>
              {CALENDAR.map((item,idx) => (
                <div key={idx} style={{ display:"grid",gridTemplateColumns:"150px repeat(12,1fr)",borderBottom:idx<CALENDAR.length-1?"1px solid #F0EBE0":"none",alignItems:"center" }}>
                  <div style={{ padding:"12px 14px",fontSize:12,fontWeight:600,color:"#2A2016" }}>{item.name}</div>
                  {item.months.map((v,mi) => <div key={mi} style={{ padding:"12px 2px",display:"flex",justifyContent:"center",background:mi===CM?"rgba(232,115,12,.03)":"transparent" }}>{v > 0 && <div style={{ width:"100%",height:8,borderRadius:4,background:v===2?"linear-gradient(90deg,#E8730C,#C45A08)":"linear-gradient(90deg,#E8D4A0,#D4C590)",minWidth:6,maxWidth:36 }} />}</div>)}
                </div>
              ))}
              <div style={{ display:"flex",gap:20,padding:"12px 14px",borderTop:"1px solid #F0EBE0",background:"#FAF7F0",flexWrap:"wrap" }}>
                <span style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#8A7A60" }}><span style={{ width:20,height:6,borderRadius:3,background:"linear-gradient(90deg,#E8730C,#C45A08)" }} /> Chính vụ</span>
                <span style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#8A7A60" }}><span style={{ width:20,height:6,borderRadius:3,background:"linear-gradient(90deg,#E8D4A0,#D4C590)" }} /> Đầu/cuối vụ</span>
                <span style={{ fontSize:11,color:"#E8730C",fontWeight:600 }}>▼ T4 — Bạn đang ở đây</span>
              </div>
            </div>
          </div>
        </FI>
      </div>
    </section>
  );
}

function DualCTA() {
  return (
    <section style={{ background:"#F0EBE0",padding:"70px 20px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <FI><h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(26px,4vw,34px)",fontWeight:800,color:"#2A2016",textAlign:"center",marginBottom:36 }}>Bạn muốn mua như thế nào?</h2></FI>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20 }}>
          {[
            { icon:"🏪",title:"Lấy Mối Sỉ",sub:"Tiểu thương · Đại lý · Nhà hàng",items:["Giá sỉ theo tấn, cập nhật mỗi sáng","MOQ: 1 thùng 20kg — thử trước, mua sau","Free ship lần đầu + Cân dư 2% bù hao","Sổ công nợ sau 3 đơn","Hóa đơn VAT đầy đủ"],cta:"Zalo Lấy Giá Sỉ",ctaSub:"Phản hồi trong 5 phút",dark:true },
            { icon:"🏠",title:"Mua Lẻ / Quà Tặng",sub:"Gia đình Hà Nội · Quà đối tác",items:["Combo 5kg hộp quà: 275.000đ","Giao lạnh 24h tận cửa Hà Nội","Đóng hộp sang trọng, kèm thiệp","Đổi 100% nếu xoài dập — không hỏi lý do","Kèm hướng dẫn bảo quản + ăn ngon nhất"],cta:"Đặt Combo 5kg — 275.000đ",ctaSub:"Giao lạnh trong 24h",dark:false },
          ].map((p,i) => (
            <FI key={i} delay={i*.12}>
              <div style={{ background:p.dark?"linear-gradient(150deg,#1E2A15,#2A3B1F)":"#FFF",borderRadius:18,padding:30,border:p.dark?"none":"1px solid #E8E0D0",boxShadow:"0 4px 20px rgba(100,80,40,.07)",display:"flex",flexDirection:"column",minHeight:360 }}>
                <div style={{ fontSize:36,marginBottom:12 }}>{p.icon}</div>
                <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:p.dark?"#F5E6C8":"#2A2016",marginBottom:3 }}>{p.title}</h3>
                <p style={{ color:p.dark?"#7A8B6E":"#8A7A60",fontSize:13,marginBottom:20 }}>{p.sub}</p>
                <div style={{ flex:1 }}>
                  {p.items.map((item,j) => <div key={j} style={{ display:"flex",alignItems:"flex-start",gap:8,marginBottom:10,color:p.dark?"#B0C0A0":"#5A4D3A",fontSize:13,lineHeight:1.4 }}><span style={{ color:"#E8A948",fontSize:13,flexShrink:0,marginTop:1 }}>✓</span>{item}</div>)}
                </div>
                <button style={{ background:p.dark?"linear-gradient(135deg,#E8730C,#C45A08)":"linear-gradient(135deg,#2A3B1F,#3D4F2A)",color:"#fff",border:"none",borderRadius:10,padding:"12px 0",fontSize:14,fontWeight:700,cursor:"pointer",marginTop:16,boxShadow:"0 3px 14px rgba(0,0,0,.1)" }}>{p.cta}</button>
                <p style={{ color:p.dark?"#5E7050":"#8A7A60",fontSize:11,textAlign:"center",marginTop:6 }}>{p.ctaSub}</p>
              </div>
            </FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const [a, setA] = useState(0);
  useEffect(() => { const t = setInterval(() => setA(p => (p+1) % TESTIMONIALS.length), 6000); return () => clearInterval(t); }, []);
  const t = TESTIMONIALS[a];
  return (
    <section style={{ background:"linear-gradient(170deg,#1E2A15,#141C10)",padding:"70px 20px" }}>
      <div style={{ maxWidth:740,margin:"0 auto",textAlign:"center" }}>
        <FI><span style={{ color:"#E8A948",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:2 }}>Đối tác nói gì</span></FI>
        <div style={{ marginTop:32,minHeight:180,position:"relative" }}>
          {TESTIMONIALS.map((item,i) => (
            <div key={i} style={{ position:i===a?"relative":"absolute",top:0,left:0,right:0,opacity:i===a?1:0,transform:i===a?"translateY(0)":"translateY(14px)",transition:"all .55s ease",pointerEvents:i===a?"auto":"none" }}>
              <p style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(16px,2.5vw,21px)",fontWeight:500,color:"#F5E6C8",lineHeight:1.65,fontStyle:"italic",marginBottom:20 }}>"{item.text}"</p>
              <p style={{ color:"#E8A948",fontWeight:700,fontSize:14 }}>{item.name}</p>
              <p style={{ color:"#7A8B6E",fontSize:12,marginTop:3 }}>{item.detail}</p>
              <p style={{ color:"#5E7050",fontSize:11,marginTop:2 }}>{item.since}</p>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",justifyContent:"center",gap:6,marginTop:24 }}>
          {TESTIMONIALS.map((_,i) => <button key={i} onClick={() => setA(i)} style={{ width:i===a?24:7,height:7,borderRadius:4,background:i===a?"#E8A948":"rgba(245,230,200,.15)",border:"none",cursor:"pointer",transition:"all .3s" }} />)}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [o, setO] = useState(null);
  return (
    <section style={{ background:"#FAFAF5",padding:"70px 20px" }}>
      <div style={{ maxWidth:680,margin:"0 auto" }}>
        <FI><h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(26px,4vw,34px)",fontWeight:800,color:"#2A2016",textAlign:"center",marginBottom:36 }}>Câu hỏi thường gặp</h2></FI>
        {FAQS.map((f,i) => (
          <FI key={i} delay={i*.04}>
            <div style={{ borderBottom:"1px solid #E8E0D0" }}>
              <button onClick={() => setO(o===i?null:i)} style={{ width:"100%",textAlign:"left",background:"none",border:"none",padding:"16px 0",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ fontSize:14,fontWeight:600,color:"#2A2016",paddingRight:14,lineHeight:1.4 }}>{f.q}</span>
                <span style={{ fontSize:18,color:"#E8730C",transform:o===i?"rotate(45deg)":"rotate(0)",transition:"transform .3s",flexShrink:0 }}>+</span>
              </button>
              <div style={{ maxHeight:o===i?250:0,overflow:"hidden",transition:"max-height .4s ease" }}>
                <p style={{ color:"#6B5D45",fontSize:13,lineHeight:1.65,paddingBottom:16 }}>{f.a}</p>
              </div>
            </div>
          </FI>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ background:"linear-gradient(170deg,#141C10,#0D120A)",padding:"70px 20px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <FI><div style={{ textAlign:"center",marginBottom:40 }}>
          <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(26px,4vw,36px)",fontWeight:800,color:"#F5E6C8" }}>Đặt thử 1 thùng — So sánh với mối hiện tại</h2>
          <p style={{ color:"#7A8B6E",fontSize:14,marginTop:6 }}>Free ship lần đầu · Cân dư 2% · Không hài lòng = hoàn tiền</p>
        </div></FI>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:28 }}>
          <FI delay={.08}>
            <div>
              {[
                { icon:"💬",label:"Zalo (nhanh nhất)",value:"0918 469 075",sub:"Phản hồi trong 5 phút — Gửi ảnh hàng thực tế" },
                { icon:"📞",label:"Hotline",value:"0918 469 075",sub:"4h sáng — 18h hàng ngày" },
                { icon:"📍",label:"Vựa",value:"Thạnh Phú, Bến Tre",sub:"Mở cửa 4h sáng — Đón khách tham quan vườn" },
              ].map((c,i) => (
                <div key={i} style={{ display:"flex",gap:14,marginBottom:24 }}>
                  <div style={{ width:44,height:44,background:"rgba(232,169,72,.1)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{c.icon}</div>
                  <div>
                    <div style={{ color:"#7A8B6E",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:.8 }}>{c.label}</div>
                    <div style={{ color:"#F5E6C8",fontSize:16,fontWeight:600,marginTop:1 }}>{c.value}</div>
                    <div style={{ color:"#5E7050",fontSize:12,marginTop:1 }}>{c.sub}</div>
                  </div>
                </div>
              ))}
              <div style={{ background:"rgba(232,115,12,.08)",border:"1px solid rgba(232,115,12,.15)",borderRadius:10,padding:14,marginTop:8 }}>
                <p style={{ color:"#F0A050",fontSize:12,fontWeight:600,marginBottom:4 }}>💡 Mẹo cho tiểu thương mới:</p>
                <p style={{ color:"#8A9B7E",fontSize:12,lineHeight:1.5 }}>Đặt thử 1 thùng 20kg, bán thử 2–3 ngày, so sánh phản hồi khách với mối cũ. Nếu khách khen hơn → tăng đơn dần. Không rủi ro.</p>
              </div>
            </div>
          </FI>
          <FI delay={.16}>
            <div style={{ background:"rgba(245,230,200,.04)",border:"1px solid rgba(245,230,200,.08)",borderRadius:16,padding:28 }}>
              {[
                { label:"Họ tên",ph:"Nguyễn Văn A",type:"text" },
                { label:"Số điện thoại / Zalo",ph:"0912 345 678",type:"tel" },
              ].map((f,i) => (
                <div key={i} style={{ marginBottom:16 }}>
                  <label style={{ color:"#A8B89A",fontSize:12,fontWeight:600,display:"block",marginBottom:5 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} style={{ width:"100%",boxSizing:"border-box",background:"rgba(245,230,200,.06)",border:"1px solid rgba(245,230,200,.12)",borderRadius:8,padding:"10px 14px",color:"#F5E6C8",fontSize:14,outline:"none" }} />
                </div>
              ))}
              <div style={{ marginBottom:16 }}>
                <label style={{ color:"#A8B89A",fontSize:12,fontWeight:600,display:"block",marginBottom:8 }}>Bạn là</label>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  {["Tiểu thương / Đại lý","Nhà hàng / Khách sạn","Mua lẻ / Quà tặng"].map((opt,i) => (
                    <label key={i} style={{ background:"rgba(245,230,200,.06)",border:"1px solid rgba(245,230,200,.12)",borderRadius:6,padding:"7px 12px",color:"#B0C0A0",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5 }}>
                      <input type="radio" name="type" style={{ accentColor:"#E8A948",width:13,height:13 }} />{opt}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={{ color:"#A8B89A",fontSize:12,fontWeight:600,display:"block",marginBottom:5 }}>Ghi chú</label>
                <textarea placeholder="VD: Cần 50kg xoài chín, giao thứ 4 hàng tuần về chợ Vinh..." rows={3} style={{ width:"100%",boxSizing:"border-box",background:"rgba(245,230,200,.06)",border:"1px solid rgba(245,230,200,.12)",borderRadius:8,padding:"10px 14px",color:"#F5E6C8",fontSize:14,outline:"none",resize:"vertical",fontFamily:"inherit" }} />
              </div>
              <button style={{ width:"100%",background:"linear-gradient(135deg,#E8730C,#C45A08)",color:"#fff",border:"none",borderRadius:10,padding:"13px 0",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 18px rgba(232,115,12,.35)" }}>Gửi Yêu Cầu — Phản hồi trong 5 phút →</button>
              <p style={{ color:"#5E7050",fontSize:11,textAlign:"center",marginTop:8 }}>✓ Không spam · ✓ Không chia sẻ SĐT · ✓ Chỉ liên hệ 1 lần duy nhất</p>
            </div>
          </FI>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#0A0F07",borderTop:"1px solid rgba(245,230,200,.05)",padding:"36px 20px 20px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:28,paddingBottom:28,borderBottom:"1px solid rgba(245,230,200,.04)" }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}><span style={{ fontSize:20 }}>🥭</span><span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,fontSize:16,color:"#F5E6C8" }}>Xoài Bến Tre</span></div>
            <p style={{ color:"#4A5B3E",fontSize:12,maxWidth:260,lineHeight:1.5 }}>Chỉ dẫn địa lý "Bến Tre" — Cục SHTT cấp 11/2022.<br />Từ đất cát ven biển Thạnh Phú, giao lạnh toàn quốc.</p>
          </div>
          <div>
            <h4 style={{ color:"#8A9B7E",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>Sản phẩm</h4>
            {["Xoài chín (quả vàng)","Xoài xanh giòn","Combo hộp quà 5kg","Bảng giá sỉ theo tấn"].map((l,i) => <a key={i} href="#" style={{ display:"block",color:"#5E7050",fontSize:12,textDecoration:"none",marginBottom:6 }}>{l}</a>)}
          </div>
          <div>
            <h4 style={{ color:"#8A9B7E",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>Hỗ trợ</h4>
            {["Chính sách đổi trả","Vận chuyển lạnh","Hóa đơn VAT","Lịch mùa vụ PDF"].map((l,i) => <a key={i} href="#" style={{ display:"block",color:"#5E7050",fontSize:12,textDecoration:"none",marginBottom:6 }}>{l}</a>)}
          </div>
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:16,flexWrap:"wrap",gap:10 }}>
          <p style={{ color:"#3A4530",fontSize:11 }}>© 2026 Xoài Tứ Quý Bến Tre · CDĐL số 00124</p>
          <p style={{ color:"#3A4530",fontSize:11 }}>Thạnh Phú, Bến Tre · 0918 469 075</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily:"'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif",margin:0,padding:0 }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,800;1,400;1,500&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Header />
      <Hero />
      <Products />
      <ProcessSection />
      <Calendar />
      <DualCTA />
      <TestimonialSection />
      <FAQSection />
      <Contact />
      <Footer />
    </div>
  );
}
