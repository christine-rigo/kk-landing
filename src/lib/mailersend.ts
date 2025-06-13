interface MailerSendPayload {
  from: {
    email: string;
    name: string;
  };
  to: Array<{
    email: string;
    name?: string;
  }>;
  subject: string;
  template_id: string;
  variables: {
    verificationCode: Array<string>;
    email: string;
  };
}

export const sendVerificationEmail = async (email: string, verificationCode: string): Promise<void> => {
  const apiKey = process.env.MAILERSEND_API_KEY;

  if (!apiKey) {
    console.error("MailerSend API key is not defined");
    throw new Error("MailerSend API key is not defined");
  }

  const payload = {
    from: {
      email: "noreply-beta-build@kalokalo.info",
      name: "KaloKalo",
    },
    to: [
      {
        email: email,
      },
    ],
    subject: "KaloKalo: Verify your email",
    template_id: "jy7zpl90oqol5vx6",
    personalization: [
      {
        email: email,
        data: {
          verificationCode: verificationCode,
        },
      },
    ],
  };

  try {
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error sending verification email:", errorResponse);
      throw new Error(`MailerSend API error: ${response.status} ${response.statusText}`);
    }

    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
