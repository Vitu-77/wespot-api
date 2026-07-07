import { env } from 'src/env'

type Params = {
  inviteId: string
  workspaceName: string | null
}

const logoUrl = 'https://ik.imagekit.io/wespot/Group%2043.svg'

export const createInviteEmail = ({ inviteId, workspaceName }: Params) => {
  const link = `${env.FRONTEND_URL}/invite/${inviteId}`
  const message = workspaceName
    ? `<strong>${workspaceName}</strong> convidou você para fazer parte do seu workspace no <strong>WeSpot</strong>.`
    : `Você foi convidado para fazer parte de um workspace no <strong>WeSpot</strong>.`

  return `
<!DOCTYPE html>

<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WeSpot | Convite para ${workspaceName}</title>
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
                style="display:block;border:0;outline:none;text-decoration:none;margin-bottom:32px;"
              />

              <h2 style="margin:0 0 16px;color:#111827;font-size:24px;font-weight:700;">
                Você foi convidado para um workspace
              </h2>

              <p style="margin:0;color:#4b5563;font-size:16px;line-height:24px;">
                ${message}
              </p>

              <p style="margin:16px 0 0;color:#4b5563;font-size:16px;line-height:24px;">
                Clique no botão abaixo para aceitar o convite e começar a colaborar.
              </p>

              <a
                href="${link}"
                target="_blank"
                style="
                  display:inline-block;
                  margin:32px 0;
                  padding:16px 32px;
                  background:#423cf3;
                  color:#ffffff;
                  text-decoration:none;
                  border-radius:12px;
                  font-size:16px;
                  font-weight:700;
                "
              >
                Aceitar convite
              </a>

              <p style="margin:0;color:#6b7280;font-size:14px;line-height:22px;">
                Se o botão não funcionar, copie e cole o link abaixo no seu navegador:
              </p>

              <p style="margin:12px 0 0;font-size:13px;line-height:20px;word-break:break-all;">
                <a href="${link}" style="color:#2563eb;text-decoration:none;">
                  ${link}
                </a>
              </p>

              <hr style="margin:40px 0;border:none;border-top:1px solid #e5e7eb;" />

              <p style="margin:0;color:#9ca3af;font-size:12px;line-height:20px;">
                © WeSpot · Este é um e-mail automático. Por favor, não responda a esta mensagem.
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
