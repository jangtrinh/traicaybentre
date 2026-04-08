import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/* --- Rate limit: 3 submissions per IP per hour (in-memory) --- */
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

/* Min time (ms) a human needs to fill the form */
const MIN_SUBMIT_TIME_MS = 3000;

interface OrderRequest {
  name: string;
  phone: string;
  customerType: string;
  note: string;
  website?: string; // honeypot
  _t?: number; // form load timestamp
}

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json();
    const { name, phone, customerType, note, website, _t } = body;

    // Honeypot — bots fill hidden fields
    if (website) {
      // Return success to not reveal detection
      return NextResponse.json({ success: true });
    }

    // Time-based check — reject if submitted too fast
    if (_t && Date.now() - _t < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json({ success: true });
    }

    // Rate limit by IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    const currentTime = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const recent = timestamps.filter((t) => currentTime - t < RATE_LIMIT_WINDOW_MS);

    if (recent.length >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Bạn đã gửi quá nhiều đơn. Vui lòng thử lại sau." },
        { status: 429 }
      );
    }
    recent.push(currentTime);
    rateLimitMap.set(ip, recent);

    // Validate required fields
    if (!name || !phone || !customerType) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      );
    }

    const now = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f4; border-radius: 12px; overflow: hidden;">
        <div style="background: #2d5016; padding: 24px 32px;">
          <h1 style="color: #fff; margin: 0; font-size: 20px;">Đơn đặt hàng mới - Trái Cây Bến Tre</h1>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e2d9; color: #888; width: 140px;">Thời gian</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e2d9; font-weight: 600;">${now}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e2d9; color: #888;">Họ tên</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e2d9; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e2d9; color: #888;">SĐT / Zalo</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e2d9; font-weight: 600;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e2d9; color: #888;">Loại khách</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e2d9; font-weight: 600;">${customerType}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888; vertical-align: top;">Ghi chú</td>
              <td style="padding: 12px 0; font-weight: 600;">${note || "Không có"}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #eef5e6; border-radius: 8px; font-size: 14px; color: #555;">
            Liên hệ khách hàng sớm nhất qua SĐT/Zalo: <strong>${phone}</strong>
          </div>
        </div>
        <div style="padding: 16px 32px; background: #f0ede6; text-align: center; font-size: 12px; color: #999;">
          Email tự động từ traicaybentre.com
        </div>
      </div>
    `;

    if (!resend) {
      return NextResponse.json(
        { error: "Email chưa được cấu hình. Vui lòng liên hệ Zalo." },
        { status: 503 }
      );
    }

    await resend.emails.send({
      from: "Trái Cây Bến Tre <onboarding@resend.dev>",
      to: "trinhnguyengiang@gmail.com",
      subject: `[Đơn mới] ${customerType} — ${name} — ${phone}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order email error:", error);
    return NextResponse.json(
      { error: "Không thể gửi đơn hàng. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
