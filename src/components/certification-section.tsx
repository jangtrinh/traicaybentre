import { Certificate, ShieldCheck, QrCode, Leaf } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./fade-in";

const CERTIFICATIONS = [
  {
    Icon: Certificate,
    title: "CDĐL #00124",
    desc: "Chỉ dẫn địa lý — Cục SHTT cấp 11/2022",
  },
  {
    Icon: Leaf,
    title: "OCOP Bến Tre",
    desc: "Chương trình Mỗi Xã Một Sản Phẩm",
  },
  {
    Icon: ShieldCheck,
    title: "GlobalGAP",
    desc: "Tiêu chuẩn nông nghiệp quốc tế",
  },
  {
    Icon: QrCode,
    title: "QR Truy Xuất",
    desc: "Tên vườn, ngày hái, người thu hoạch",
  },
];

export function CertificationSection() {
  return (
    <section className="bg-brand-cream px-5 py-24">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <h2 className="mb-16 text-center font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
            Chứng nhận
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand">
                  <cert.Icon size={36} weight="duotone" className="text-text" />
                </div>
                <h3 className="font-heading text-base font-bold uppercase text-text">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm leading-snug text-text/50">
                  {cert.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
