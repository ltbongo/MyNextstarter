// "use server";
// import handlebars from "handlebars";
// import nodemailer from "nodemailer";
// import { inviteTemplate } from "./templates/InviteTemplate";

// type Sender = {
//   name: string;
//   email: string;
// };

// const USERNAME = process.env.SMTP_SERVER_USERNAME;
// const PASSWORD = process.env.SMTP_SERVER_PASSWORD;

// export async function sendMail({
//   to,
//   fullName,
//   referralCode,
//   subject,
//   customBody
// }: {
//   to: string;
//   fullName: string;
//   referralCode: string;
//   subject: string;
//   customBody?: string;
// }) {
//   console.log("SendMail function started");

//   const sender: Sender = {
//     name: "Spotters Fee",
//     email: "noreply@spottersfee.co.za"
//   };

//   console.log("Creating transport");
//   const transport = nodemailer.createTransport({
//     host: "smtpout.secureserver.net",
//     port: 465,
//     auth: {
//       user: USERNAME,
//       pass: PASSWORD,
//     },
//   });

//   console.log("Verifying transport");
//   try {
//     const testResult = await transport.verify();
//     console.log("Transport verified:", testResult);
//   } catch (error) {
//     console.error("Transport verification error:", error);
//     throw error;
//   }

//   console.log("Preparing email content");
//   let htmlBody;
//   try {
//     if (customBody) {
//       htmlBody = customBody;
//     } else {
//       htmlBody = await compileWelcomeTemplate(fullName, referralCode);
//     }
//   } catch (error) {
//     console.error("Error preparing email content:", error);
//     throw error;
//   }

//   console.log("Sending email");
//   try {
//     const sendResult = await transport.sendMail({
//       from: `${sender.name} <${sender.email}>`,
//       to,
//       subject,
//       html: htmlBody,
//       attachments: [
//         {
//           filename: "Spottersfee_Logo.png",
//           path: "https://spottersfee.co.za/Spottersfee_Logo.png",
//           cid: "logo"
//         },
//         {
//           filename: "farm.svg",
//           path: "https://spottersfee.co.za/farm.svg",
//           cid: "farm"
//         },
//         {
//           filename: "house.svg",
//           path: "https://spottersfee.co.za/house.svg",
//           cid: "house"
//         },
//         {
//           filename: "commercial.svg",
//           path: "https://spottersfee.co.za/commercial.svg",
//           cid: "commercial"
//         },
//       ]
//     });
//     console.log("Email sent successfully, result:", sendResult);
//     return sendResult;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// }

// export async function compileWelcomeTemplate(fullName: string, referralCode: string) {
//   console.log("Compiling welcome template");
//   const template = handlebars.compile(inviteTemplate);
//   const htmlBody = template({
//     fullName: fullName,
//     referralCode: referralCode,
//   });
//   return htmlBody;
// }
