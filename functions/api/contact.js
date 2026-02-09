export async function onRequestPost(context) {
  try {
    const contentType = context.request.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ ok: false }), { status: 400 });
    }

    const { name, email, message } = await context.request.json();
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false }), { status: 400 });
    }

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: context.env.FROM_EMAIL || "Zephyr Website <onboarding@resend.dev>",
        to: context.env.CONTACT_TO || "info@zephyrcreative.co.uk",
        reply_to: email,
        subject: `New website enquiry — ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p>${message}</p>`
      })
    });

    if (!resendResp.ok) {
      return new Response(JSON.stringify({ ok: false }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
