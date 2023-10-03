# Instagram API Discovery
# Instagram vs Twitter

First of all, why did we choose Instagram:

- Instagram is more geared towards businesses than Twitter, many businesses use Instagram to communicate with their customers
- Instagram offers much more channels such as reels, posts, comments, DMs, etc
- Meta integration already exists so the process is familiar and mentors already have experience with the platform
- Instagram API documentation is much more extensive and detailed
- Twitter API pricing can be very expensive after a certain rate of API calls

For these reasons, we decided to go for Instagram.

# Messenger Platform

The Messenger Platform allows you to build messaging solutions for Instagram Professional accounts at scale.

Instagram Messaging is available for the following accounts:

- Any Instagram Professional account for a business
- Any Instagram Professional account for a Creator

Creating an Instagram Professional account is pretty straightforward. In your account settings, you can tap “Switch to Professional Account” to start creating your professional account. There are two types: Creator and business.

## **Requirements**

This guide assumes that you have read the [Messenger Platform Overview](https://developers.facebook.com/docs/messenger-platform/overview) and implemented the needed components for sending messages and receiving messages and notifications.

- The **[Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)** – This API allows businesses and Creators to manage their presence on Instagram using your app
- The `instagram_basic` permission
- `instagram_manage_messages` permission
- `pages_manage_metadata` permissions
- The `Human Agent` feature – This feature allows your messaging app to provide an escalation path to a human agent
- Content Delivery Network (CDN) URL handling
- Delete messages when you receive a webhooks notification to do so

The [Messenger Platform Overview](https://developers.facebook.com/docs/messenger-platform/overview) contains several components, the most important components are a Facebook page to link the Instagram Professional account, its access tokens, and to setup a webhook to receive notifications of any messages. (Note that we can only receive notifications of messages sent by users who have a role in our app, to receive notifications of messages from any user we need to acquire advanced access which requires an app review. We plan to discover that in the coming sprint)

## Webhooks

To successfully implement Webhooks for Messenger or Instagram conversations, you will need to:

1. Create an endpoint on your server to receive and process your Webhooks notifications, JSON objects
2. Configure the Meta Webhooks product in your App Dashboard
3. Subscribe to the Meta Webhooks notifications you want to receive
4. Install your messaging app on the Facebook Page linked to your business or your Instagram Professional account

## **Configure Your Node.JS Server**

Your server must be able to process two types of HTTPS requests: [Verification Requests](https://developers.facebook.com/docs/messenger-platform/webhooks#verification-requests) and [Event Notifications](https://developers.facebook.com/docs/messenger-platform/webhooks#event-notifications). Since both requests use HTTPs, your server must have a valid TLS or SSL certificate correctly configured and installed. Self-signed certificates are not supported. For this purpose, we can host our [localhost](http://localhost) server on ngrok to obtain a public, HTTPS URL.

### **Create an Endpoint**

To create an endpoint to receive webhooks notifications from the Messenger Platform, the `app.js` file may look like the follow:

```
// Create the endpoint for your webhook

app.post("/webhook", (req, res) => {
  let body = req.body;

  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });

...

```

This code creates a `/webhook` endpoint that accepts `POST` requests and checks that the request is a webhook notification.

The following code will be in the `app.post` in your `app.js` file and may look like the following:

```
...
  // Send a 200 OK response if this is a page webhook or an instagram webhook

  if (body.object === "page" || body.object === "instagram") {
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
...
    // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
...
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});
```

### **Verification Requests**

Anytime you configure the Webhooks product in your App Dashboard, meta will send a `GET` request to your endpoint URL. Verification requests include the following query string parameters, appended to the end of your endpoint URL. They will look something like this:

### **Sample Verification Request**

```
GET https://www.your-clever-domain-name.com/webhooks?
  hub.mode=subscribe&
  hub.verify_token=mytoken&
  hub.challenge=1158201444

```

### **Validating Verification Requests**

Whenever your endpoint receives a verification request, it must:

- Verify that the `hub.verify_token` value matches the string you set in the **Verify Token** field when you [configure the Webhooks product](https://developers.facebook.com/docs/messenger-platform/webhooks#configure-webhooks-product) in your App Dashboard (you haven't set up this token string yet).
- Respond with the `hub.challenge` value.

Your `app.js` file may look like the following:

```
// Add support for GET requests to our webhook
app.get("/webhook", (req, res) => {

// Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === config.verifyToken) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
```

| Parameter | Sample Value | Description |
| --- | --- | --- |
| hub.mode | subscribe | This value will always be set to subscribe. |
| hub.challenge | 1158201444 | An int you must pass back to meta. |
| hub.verify_token | mytoken | A string that that meta grabs from the Verify Token field in your app's App Dashboard. You will set this string when you complete the Webhooks configuration settings steps. |

(Note: the original guide used GET /messaging-webhook as the verification endpoint. However, meta will send the verification to request to the /webhook endpoint, so maybe they made a mistake with the /messaging-webhook)

### **Validate Payloads**

Meta sign all Event Notification payloads with a **SHA256** signature and include the signature in the request's 'X-Hub-Signature-256' header, preceded with 'sha256='. You don't have to validate the payload, but you should and meta strongly recommend that you do.

To validate the payload:

1. Generate a **SHA256** signature using the payload and your app's **App Secret**.
2. Compare your signature to the signature in the `X-Hub-Signature-256` header (everything after `sha256=`). If the signatures match, the payload is genuine.

The `app.js` file may look like the following:

```
// Import dependencies and set up http server
const express = require("express"),
  bodyParser = require("body-parser"),
  { urlencoded, json } = require("body-parser"),
  app = express().use(bodyParser.json());

    ...

// Verify that the callback came from Facebook.
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac("sha256", config.appSecret)
      .update(buf)
      .digest("hex");
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}
```

### **Test Your Webhooks**

To test your webhook verification run the following cURL request with your verify token:

```
curl -X GET "localhost:{PORT}/webhook?hub.verify_token=YOUR-VERIFY-TOKEN&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

```

![image](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/40a6166f-2c4a-48b0-bb55-d9b61ff51817)


![image](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/95763eec-b841-469e-a3eb-f5e40306328e)


To test your webhook send the following cURL request:

```
curl -H "Content-Type: application/json" -X POST "localhost:{PORT}/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'
```

![image](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/4b70bf08-a566-4708-b65a-65fab1854a83)


![image](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/36b87607-3ba8-464d-b35c-70cee70c02b9)


## **Subscribe to Meta Webhooks**

Once your webhooks server endpoint, or sample app is ready, go to your app's [App Dashboard](https://developers.facebook.com/apps/)  to subscribe to Meta Webhooks.

In this example we will use the dashboard to configure a Webhook and subscribe to the `messages` field. Any time a customer sends your app a message, a notification will be sent to your webhooks endpoint.

1. In the App Dashboard, go to **Products** > **Messenger** > **Settings**.
    - Some Messenger Platform webhooks are not available for Instagram messaging. If you are only implementing webhooks for Instagram and know the webhooks available for Instagram messaging, you can subscribe to webhooks here. To only view and subscribe to webhooks for Instagram messaging, you can go to **Instagram settings**.
2. Enter your endpoint's URL in the **Callback URL** field and add your verification token to the **Verify Token** field. We will include this string in all [Verification Requests](https://developers.facebook.com/docs/messenger-platform/webhooks#verification-requests). If you are using one of our sample apps, this should be the same string you used for your app's `TOKEN` config variable.
3. Subscribe to fields for which you would like to be send notifications and click **Save**.
4. The last step is to subscribe to individual fields. Subscribe to the `messages` field and send a test Event Notification.
    
    If your endpoint is set up correctly, it should [validate the payload](https://developers.facebook.com/docs/messenger-platform/webhooks#validate-payloads) and execute whatever code you have set it up to do upon successful validation. If you are using our [sample app](https://developers.facebook.com/docs/graph-api/webhooks/sample-apps), load the app's URL in your web browser. It should display the payload's contents.
    

You can change your Webhooks subscriptions, verify token, or API version at any time using the App Dashboard.

## **Send a Basic Message**

To send a message that contains text or a link, send a `POST` request to the `/PAGE-ID/messages` endpoint with the `recipient` parameter containing the Instagram-scoped ID (IGSID) and the `message` parameter containing the text or link.

Message text must be UTF-8 and be a 1000 bytes or less. Links must be valid formatted URLs.

### **Sample Request**

```
curl -i -X POST \
  "https://graph.facebook.com/LATEST-API-VERSION/me/messages?access_token=PAGE-ACCESS-TOKEN" \
  --data 'recipient={"id”:”IGSID”}&message={"text”:”TEXT-OR-LINK”}’
```

### **Sample API Response**

Upon success, your app will receive the following JSON response:

```
{
  "recipient_id": "IGSID",
  "message_id": "MESSAGE-ID"
}
```

![image](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/cf826c00-dbed-44a8-a749-658796034927)


## References

1. https://developers.facebook.com/docs/messenger-platform/instagram/
