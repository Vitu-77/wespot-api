type Params = {
  username: string
  code: number
  codeValidationInSeconds: number
}

const logoUrl = 'https://ik.imagekit.io/wespot/Group%2043.svg'

export const createVerificationCodeEmail = ({
  code,
  username,
  codeValidationInSeconds,
}: Params) => {
  return `
<!DOCTYPE html>

<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Código de Verificação</title>
</head>

<body style="margin:0;padding:0;background-color:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f7fa;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;background:#ffffff;border-radius:16px;padding:40px;">
          <tr>
            <td align="center">
              <img
                src="${logoUrl}"
                alt="WeSpot"
                width="180"
                style="display:block;border:0;outline:none;text-decoration:none;"
              />

              <p style="margin:24px 0 8px;color:#4b5563;font-size:16px;line-height:24px;">
                Olá, ${username}!
              </p>

              <p style="margin:0;color:#4b5563;font-size:16px;line-height:24px;">
                Utilize o código abaixo para confirmar seu endereço de e-mail:
              </p>

              <div style="
                    display:inline-block;
                    margin:32px 0;
                    padding:18px 32px;
                    background:#f3f4f6;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    font-size:36px;
                    font-weight:700;
                    letter-spacing:8px;
                    color:#111827;
                  ">
                ${code}
              </div>

              <p style="margin:0;color:#6b7280;font-size:14px;line-height:22px;">
                Este código expira em <strong>${Math.ceil(codeValidationInSeconds / 60)} minutos</strong>.
              </p>

              <p style="margin:24px 0 0;color:#6b7280;font-size:14px;line-height:22px;">
                Se você não solicitou este código, pode ignorar este e-mail com segurança.
              </p>

              <hr style="margin:40px 0;border:none;border-top:1px solid #e5e7eb;" />

              <p style="margin:0;color:#9ca3af;font-size:12px;line-height:20px;">
                © WeSpot · Este é um e-mail automático, por favor não responda.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
