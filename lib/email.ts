import { Theme } from "next-auth"
import { SendVerificationRequestParams } from "next-auth/providers"
import { createTransport } from "nodemailer"

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to Myelin Sessions`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params

  return `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <title>
    </title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a {
	padding: 0;
      }
  
      body {
	margin: 0;
	padding: 0;
	-webkit-text-size-adjust: 100%;
	-ms-text-size-adjust: 100%;
      }
  
      table,
      td {
	border-collapse: collapse;
	mso-table-lspace: 0pt;
	mso-table-rspace: 0pt;
      }
  
      img {
	border: 0;
	height: auto;
	line-height: 100%;
	outline: none;
	text-decoration: none;
	-ms-interpolation-mode: bicubic;
      }
  
      p {
	display: block;
	margin: 13px 0;
      }
    </style>
    <!--[if mso]>
	  <noscript>
	  <xml>
	  <o:OfficeDocumentSettings>
	    <o:AllowPNG/>
	    <o:PixelsPerInch>96</o:PixelsPerInch>
	  </o:OfficeDocumentSettings>
	  </xml>
	  </noscript>
	  <![endif]-->
    <!--[if lte mso 11]>
	  <style type="text/css">
	    .mj-outlook-group-fix { width:100% !important; }
	  </style>
	  <![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=JetBrains+Mono" rel="stylesheet" type="text/css">
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=JetBrains+Mono);
    </style>
    <!--<![endif]-->
    <style type="text/css">
      @media only screen and (min-width:480px) {
	.mj-column-per-100 {
	  width: 100% !important;
	  max-width: 100%;
	}
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 {
	width: 100% !important;
	max-width: 100%;
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width:480px) {
	table.mj-full-width-mobile {
	  width: 100% !important;
	}
  
	td.mj-full-width-mobile {
	  width: auto !important;
	}
      }
    </style>
  </head>
  
  <body style="word-spacing:normal;background-color:#ffffff;">
    <div style="background-color:#ffffff;">
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin:0px auto;max-width:600px;">
	<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
	  <tbody>
	    <tr>
	      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
		<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
		<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
		  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
		    <tbody>
		      <tr>
			<td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
			  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
			    <tbody>
			      <tr>
				<td style="width:100px;">
				  <img height="auto" src="https://github.com/MyelinVC/cdn/raw/main/brand/myelin_icon_green.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" />
				</td>
			      </tr>
			    </tbody>
			  </table>
			</td>
		      </tr>
		      <tr>
			<td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
			  <p style="border-top:solid 4px #000f14;font-size:1px;margin:0px auto;width:100%;">
			  </p>
			  <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #000f14;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
  </td></tr></table><![endif]-->
			</td>
		      </tr>
		      <tr>
			<td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
			  <div style="font-family:JetBrains Mono, Inter,-apple-system,Segoe UI,sans-serif;;font-size:20px;line-height:30px;text-align:left;color:#000000;">Welcome to Myelin Sessions. Click the link to access:</div>
			</td>
		      </tr>
		      <tr>
			<td align="center" vertical-align="middle" style="font-size:0px;padding:20px;word-break:break-word;">
			  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
			    <tr>
			      <td align="center" bgcolor="#00dcda" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#00dcda;" valign="middle">
				<a href="${url}" style="display:inline-block;background:#00dcda;color:#ffffff;font-family:JetBrains Mono, Inter,-apple-system,Segoe UI,sans-serif;;font-size:20px;font-weight:700;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Log In </a>
			      </td>
			    </tr>
			  </table>
			</td>
		      </tr>
		    </tbody>
		  </table>
		</div>
		<!--[if mso | IE]></td></tr></table><![endif]-->
	      </td>
	    </tr>
	  </tbody>
	</table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
    </div>
  </body>
  
  </html>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}