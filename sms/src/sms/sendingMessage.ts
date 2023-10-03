import twilio from "twilio";
import "dotenv/config";
import { TactfulMessage } from "@tactful/common";
import { PhoneInfo, getTwilioPhoneInfo } from "../db/fun";

export default async function sendingMessage(
  TactMessage: TactfulMessage,
  profileId: number
) {
  const phoneInfo: PhoneInfo = await getTwilioPhoneInfo(profileId);
  const accountSid = phoneInfo.accountSid;
  const authToken = phoneInfo.authToken;
  const client = twilio(accountSid, authToken);
  const senderPhoneNum = phoneInfo.phoneNumber;

  client.messages
    .create({
      body: TactMessage.text!,
      from: senderPhoneNum,
      to: TactMessage.userInfo!.phone_number!,
    })
    .then((twilMessage) => {
      console.log(twilMessage);
    });
}
