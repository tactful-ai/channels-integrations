import { Twilio } from "./models";

export type PhoneInfo = {
  phoneNumber: string;
  accountSid: string;
  authToken: string;
};

export async function getTwilioPhoneInfo(bussinessId: number) {
  const users = await Twilio.findAll({
    attributes: ["phoneNumber", "accountSid", "authToken"],
    where: {
      bussinessId: bussinessId,
    },
  });
  const phoneInfo: PhoneInfo = users[0].dataValues;
  return phoneInfo;
}
