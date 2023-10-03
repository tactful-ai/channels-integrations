# Messenger Platform Overview

The Messenger Platform Overview details how the platform works and what we need to successfully implement the platform.

Messenger from Meta is a messaging service that allows a business' Facebook Page or Instagram Professional account to respond to people who are interested in our business or social media. Conversations between a person and our account must be initiated by the person.

The Messenger Platform is free for you to use.

## Access Tokens

An access token is an opaque string that identifies an app, Facebook Page, or person and can be used by an app to securely call the Meta social graph. An access token provides temporary, secure access to specific endpoints that allows a business Page or Instagram Professional account to send and receive messages from persons. [Learn more.](https://developers.facebook.com/docs/facebook-login/guides/access-tokens)

| Access Token Type | Description |
| --- | --- |
| https://developers.facebook.com/docs/facebook-login/guides/access-tokens#apptokens | An app access token is used to read and modify app settings and is generated using a https://developers.facebook.com/docs/facebook-login/security#appsecret and is then used during calls that change app-wide settings. We obtain an app access token via a server-to-server call. |
| https://developers.facebook.com/docs/facebook-login/guides/access-tokens#clienttokens | A client token is used to access app-level APIs that we can embed into our native or desktop apps to identify our app. The client token isn't meant to be a secret identifier because it's embedded in apps. Our client token is found in our Meta app dashboard. |
| https://developers.facebook.com/docs/facebook-login/guides/access-tokens#pagetokens | A Page access access token is used to read, write, and modify the data belonging to a Facebook Page. To obtain a Page access token we need to start by obtaining a user access token then using the user access token to get a Page access token via the Graph API. |
| https://developers.facebook.com/docs/facebook-login/guides/access-tokens#usertokens | A System User access token is used if our app performs programmatic, automated actions on our business clients' Ad objects or Pages without having to rely on input from an app user, or require re-authentication at a future date. |
| https://developers.facebook.com/docs/facebook-login/guides/access-tokens#usertokens | A User access token is used if our app takes actions in real time, based on input from the user. This kind of access token is needed any time the app calls an API to read, modify or write a specific person's Facebook data on their behalf. A User access tokens is generally obtained via a login dialog and requires a person to permit our app to obtain one. |

## Advanced & Standard Access

There are two access levels for apps for business Pages or Instagram Professional accounts, **Standard Access** and **Advanced Access**. Standard Access is the default access level when we first register our app with Meta. Standard Access allows us to get data for people who have a Role on our app, such as a developer, tester, or administrator, or a Role on a business Page or Instagram Professional account that has claimed the app. Advanced Access allows our app to get data for people who use our app but do not have a Role on our app or a Role on the business Page or Instagram Professional account that claimed the app. Learn more about [App Roles](https://developers.facebook.com/docs/development/build-and-test/app-roles) , [App Types](https://developers.facebook.com/docs/development/create-an-app/app-dashboard/app-types) , and [Advanced and Standard Access](https://developers.facebook.com/docs/graph-api/overview/access-levels) .

Due to the limited scope for Standard Access, some features may not work properly until our app has been granted Advanced Access. This may limit any test apps we use.

## Facebook Login

In order for a person to allow our Page or Instagram Professional account to send the person a message, we will need to ask for their permission to do so. To ask for these permissions we will need to implement Facebook Login. [Learn more.](https://developers.facebook.com/docs/facebook-login/)

## Facebook Page

A Facebook Page is required to send and receive messages using the Messenger Platform. [Learn more.](https://www.facebook.com/business/help/461775097570076)

## Instagram Professional Account

To send and receive Instagram messages, we must have a Instagram Professional account. This allows our app to access data from the Meta social graph endpoints using the Facebook Page linked to our account. [Learn more.](https://help.instagram.com/502981923235522)

## Instagram-Scoped IDs

When a person sends a message to an Instagram Professional account, an Instagram-scoped ID is created that represents that person on that app. This ID is specific for the person and the Instagram account they are interacting with. This allows an Instagram Professional account to map interactions for the same person across multiple messaging apps.

## Page-Scoped IDs

When a person sends a message to a Facebook Page, a Page-scoped ID is created that represents that person on that Page. This ID is specific for the person and the Page they are interacting with. This allows a Page to map interactions for the same person across multiple messaging apps.

## Permissions

Our app will need to ask for the following permissions via Facebook Login for Messenger conversations:

- `pages_show_list`
- `pages_manage_metadata`
- `pages_messaging`
- `pages_read_engagement`

To access Instagram Messaging, we must also ask for:

- `instagram_basic`
- `instagram_manage_messages`

We currently have all these permissions at a standard access level.

## Webhooks

Meta Webhooks are real-time notifications that allow us to get information about messages sent to our business Page or Instagram Professional account without having to make calls to the Meta social graph which could result in rate limiting. We will need to set up Webhooks to receive notifications about messages sent to our business Page or Instagram Professional account to avoid rate limits.

We have already documented the process of setting up webhooks [here](https://github.com/tactful-ai/linkedin-inetgration/blob/dev/project/docs/InstagramDiscovery.md).