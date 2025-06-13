interface MailjetPayload {
  Messages: Array<{
    From: {
      Email: string;
      Name: string;
    };
    To: Array<{
      Email: string;
      Name?: string;
    }>;
    TemplateID: number;
    TemplateLanguage: boolean;
    Subject: string;
    Variables: {
      verification_code: string;
    };
  }>;
}

export const sendVerificationEmail = async (email: string, verificationCode: string): Promise<void> => {
  const apiKeyPublic = process.env.MJ_APIKEY_PUBLIC;
  const apiKeyPrivate = process.env.MJ_APIKEY_PRIVATE;

  if (!apiKeyPublic || !apiKeyPrivate) {
    console.error("Mailjet API keys are not defined");
    throw new Error("Mailjet API keys are not defined");
  }

  const payload: MailjetPayload = {
    Messages: [
      {
        From: {
          Email: "noreply@kalokalo.info",
          Name: "KaloKalo",
        },
        To: [
          {
            Email: email,
          },
        ],
        TemplateID: 6333455, // Replace with your actual Mailjet template ID
        TemplateLanguage: true,
        Subject: "KaloKalo Verification code",
        Variables: {
          verification_code: verificationCode,
        },
      },
    ],
  };

  try {
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${apiKeyPublic}:${apiKeyPrivate}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error sending verification email:", errorResponse);
      throw new Error(`Mailjet API error: ${response.status} ${response.statusText}`);
    }

    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
