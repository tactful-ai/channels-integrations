import { getTactfulBus } from "@tactful/utils";
import sendingMessage from "../sms/sendingMessage";
import config from "../config";

const redisUrl = config.bus.redisUrl;
const bus = getTactfulBus({
  broker: "redis",
  messageExpiration: 3600000,
  namespace: "alpha",
  url: redisUrl,
});

export async function startBus() {
  bus.startConsuming();
  bus.on("tactful.reply", async (message: any, cb: any) => {
    try {
      if (
        message.body.channelInfo.type === "sms" &&
        message.body.profileId === 83
      ) {
        const txt = message.body.text;
        const customerPhoneNumber = message.body.tactfulUserId;
        sendingMessage(
          {
            text: txt,
            userInfo: { phone_number: customerPhoneNumber },
          },
          message.body.profileId
        );
      }
    } catch {
      console.log("failed to send sms message");
    }
    cb();
  });
}
