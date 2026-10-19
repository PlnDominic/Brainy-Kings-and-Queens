import nodemailer from 'nodemailer'

export type InquiryEmail = {
  parentName: string
  phone: string
  email: string
  childAge: string
  preferredStartDate: string | null
  referralSource: string | null
}

/** True when the Gmail address and app password are set in the environment. */
export function isMailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
}

function createTransport() {
  const user = process.env.GMAIL_USER!
  // Google shows app passwords in groups of four ("abcd efgh ijkl mnop"); the spaces are not part of it.
  const pass = process.env.GMAIL_APP_PASSWORD!.replace(/\s+/g, '')

  // SMTP_HOST is only for testing or a non-Gmail provider; by default mail goes through Gmail.
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    })
  }
  return nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

/** Strips line breaks so visitor text can never inject extra email headers. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()

const referralLabels: Record<string, string> = {
  social_media: 'Social media',
  referral: 'Referral',
  signage: 'Signage',
}

export async function sendInquiryEmail(inquiry: InquiryEmail) {
  const user = process.env.GMAIL_USER!
  const to = process.env.INQUIRY_TO_EMAIL || user
  const name = oneLine(inquiry.parentName)
  const referral = inquiry.referralSource ? referralLabels[inquiry.referralSource] || inquiry.referralSource : 'Not given'
  const start = inquiry.preferredStartDate || 'Not given'

  const rows: [string, string][] = [
    ['Parent', name],
    ['Phone', inquiry.phone],
    ['Email', inquiry.email],
    ['Child’s age', inquiry.childAge],
    ['Preferred start', start],
    ['Heard about us via', referral],
  ]

  const text = [`New admissions inquiry from ${name}`, '', ...rows.map(([label, value]) => `${label}: ${value}`)].join('\n')
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#2a0c0c">
      <h2 style="margin:0 0 4px;color:#b31b1b">New admissions inquiry</h2>
      <p style="margin:0 0 20px;color:#7a5c5c">Sent from the Brainy Kings &amp; Queens website</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:10px 12px;border-bottom:1px solid #f0e4e4;color:#7a5c5c;width:38%">${escapeHtml(label)}</td><td style="padding:10px 12px;border-bottom:1px solid #f0e4e4;font-weight:bold">${escapeHtml(value)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin:20px 0 0;color:#7a5c5c;font-size:13px">Reply to this email to answer the parent directly.</p>
    </div>`

  await createTransport().sendMail({
    from: `"Brainy Kings & Queens Website" <${user}>`,
    to,
    // Hitting Reply goes straight to the parent.
    replyTo: `"${name.replace(/"/g, '')}" <${inquiry.email}>`,
    subject: `New admissions inquiry: ${name}`,
    text,
    html,
  })
}
