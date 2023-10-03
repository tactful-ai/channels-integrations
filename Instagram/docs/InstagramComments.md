# Instagram Comments

This document demonstrates the capabilities (and limitations) provided to us by Instagram when using the Instagram Graph API for comments.

# Webhooks

The documentation page states the following under the **limitations** section:

- Our app must have successfully completed App Review (advanced access) to receive webhooks notifications for `comments` and `live_comments` webhooks fields.

However, this isn’t entirely true, and it is still possible to receive webhooks notifications for the `comments` field. Let’s demonstrate how.

## Install Our App

Webhook notifications will only be sent if our Page has installed our Webhooks configured-app, and if the Page has not disabled the **App** platform in its [App Settings](https://www.facebook.com/settings?tab=applications). To get our Page to install the app, have our app send a `POST` request to the Page's [subscribed_apps](https://developers.facebook.com/docs/graph-api/reference/page/subscribed_apps) edge using the Page's access token.

### **Requirements**

- A Page access token requested from a person who can perform the `[CREATE_CONTENT`, `MANAGE`, or `MODERATE` task](https://developers.facebook.com/docs/pages/overview#tasks) on the Page being queried
- The `[pages_manage_metadata` and `pages_show_list` permissions](https://developers.facebook.com/docs/pages/overview/permissions-features#permission-dependencies) are required for the `feed` webhooks
- The `[pages_messaging](https://developers.facebook.com/docs/pages/overview/permissions-features#permission-dependencies)` is also required for the `messages`

For the messages related fields only:

- A Page access token requested from a person who can perform the `[MESSAGING` task](https://developers.facebook.com/docs/pages/overview#tasks) on the Page being queried
- `[pages_messaging](https://developers.facebook.com/docs/permissions/reference/pages_messaging)`

### **Sample Request**

```
curl -i -X POST "https://graph.facebook.com/{page-id}/subscribed_apps
  ?subscribed_fields=feed
  &access_token={page-access-token}"

```

### **Sample Response**

```
{
  "success": "true"
}
```

To see which app's our Page has installed, send a `GET` request instead:

### **Sample Request**

```
curl -i -X GET "https://graph.facebook.com/{page-id}/subscribed_apps
  &access_token={page-access-token}
```

### **Sample Response**

```
{
  "data": [
    {
      "category": "Business",
      "link": "https://my-clever-domain-name.com/app",
      "name": "My Sample App",
      "id": "{page-id}"
    }
  ]
}
```

If our Page has not installed any apps, the API will return an empty data set.

Currently, our page has our app “Dstny Other” installed with the subscribed fields as shown:

```
{
	"data": [
		{
			"link": "[https://www.facebook.com/games/?app_id=](https://www.facebook.com/games/?app_id=6145605855544969){app-id}",
			"name": "Dstny Other",
			"id": "{app-id}",
			"subscribed_fields": [
				"feed",
				"messages",
				"messaging_postbacks",
				"messaging_optins",
				"messaging_optouts",
				"message_deliveries",
				"messaging_referrals",
				"messaging_account_linking",
				"messaging_checkout_updates",
				"messaging_pre_checkouts",
				"messaging_payments",
				"message_reads",
				"messaging_handovers",
				"standby",
				"messaging_game_plays",
				"message_echoes",
				"group_feed",
				"messaging_customer_information",
				"messaging_feedback",
				"inbox_labels",
				"message_reactions",
				"messaging_policy_enforcement"
			]
		}
	]
}
```

## Live Mode

Our app is now subscribed to the `feed` field which is supposed to send to us any updates regarding shares, reactions, comments, etc on our Facebook page as well as our IG Professional Account linked to our Facebook page. However, there is still one more step. Webhooks will not send sensitive data to us in development mode, even if it’s data of users with a role in our app. The data sent by the `feed` subscription is considered to be sensitive, so we have to turn on Live Mode. To do so, we’ll need a privacy policy URL.

![image](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/ea145ef0-9fd5-4e7e-95b8-e3bea034925d)


We can get one using any Privacy Policy URL Generator website like [this](https://www.freeprivacypolicy.com/free-privacy-policy-generator/).

After that, we can turn on the live mode button and our webhooks should work.

**Sample webhook:**

```
{
	entry: [
		{
			id: '115012905029236',
			time: 1694691187,
			changes: [
				{
					value: {
						from: { id: '24004199005845442', name: 'Ahmed Abdelatty' },
						post: {
							status_type: 'mobile_status_update',
							is_published: true,
							updated_time: '2023-09-14T11:33:04+0000',
							permalink_url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02Soj2JekZxzdmg1YLHYvbTBVatdGfT85u7gWx8oT6sL3XRC4deEL4J2dyQyEmcszGl&id=61550737948764',
							promotion_status: 'inactive',
							id: '115012905029236_122116123070024598'
						},
						message: 'f',
						post_id: '115012905029236_122116123070024598',
						comment_id: '122116123070024598_177809185336330',
						created_time: 1694691184,
						item: 'comment',
						parent_id: '115012905029236_122116123070024598',
						verb: 'add'
					},
					field: 'feed'
				}
			]
		}
	],
	object: 'page'
}
```

# Get Requests

Instagram Graph API provides an endpoint to get all the comments under an IG Media. An IG Media represents an Instagram album, photo, or video (uploaded video, live video, video created with the Instagram TV app, reel, or story).

### **Getting Comments on a Media Object**

`GET /{ig-media-id}/comments`

Returns a list of [IG Comments](https://developers.facebook.com/docs/instagram-api/reference/ig-comment) on an [IG Media](https://developers.facebook.com/docs/instagram-api/reference/ig-media) object.

### **Limitations**

- Requests made using API version 3.1 or older will have results returned in chronological order. Requests made using version 3.2+ will have results returned in reverse chronological order.
- Returns only top-level comments. Replies to comments are not included unless we use field expansion to request the `replies` field.
- Returns a maximum of 50 comments per query.

### **Permissions**

An [access token](https://developers.facebook.com/docs/instagram-api/overview#authentication) from a User who created the [IG Media](https://developers.facebook.com/docs/instagram-api/reference/ig-media) object, with the following permissions:

- `instagram_basic`
- `pages_show_list`
- `pages_read_engagement`

If the token is from a User whose **Page role was granted via the Business Manager**, one of the following permissions is also required:

- `ads_management`
- `pages_read_engagement`
- `business_management`

### **Sample Request**

```
GET graph.facebook.com
  /17895695668004550/comments
```

### **Sample Response**

```
{
  "data": [
    {
      "timestamp": "2017-08-31T19:16:02+0000",
      "text": "This is awesome!",
			// ig-comment-id
      "id": "17870913679156914"
    },
    {
      "timestamp": "2017-08-31T18:10:30+0000",
      "text": "*Sniff*",
			// ig-comment-id
      "id": "17873440459141021"
    }
  ]
}
```

# Post Requests

Instagram Graph API provides an endpoint to create comments with a post request, but we are more interested in replying to existing comments. Therefore, we will make use of the comment Instagram IDs we obtained above, along with Instagram’s endpoint for creating replies, to complete our flow.

### **Replying to a Comment**

`POST /{ig-comment-id}/replies?message={message}`

Creates an [IG Comment](https://developers.facebook.com/docs/instagram-api/reference/ig-comment) on an [IG Comment](https://developers.facebook.com/docs/instagram-api/reference/ig-comment).

### **Query String Parameters**

Query string parameters are optional unless indicated as required.

- `{message}` (required) — The text to be included in the comment.

### **Limitations**

- We can only reply to top-level comments; replies to a reply will be added to the top-level comment.
- We cannot reply to hidden comments.
- We cannot reply to comments on a live video; use the [Instagram Messaging API](https://developers.facebook.com/docs/messenger-platform/instagram) to send a [private reply](https://developers.facebook.com/docs/messenger-platform/instagram/features/private-replies) instead.

### **Permissions**

A User [access token](https://developers.facebook.com/docs/instagram-api/overview#authentication) from a User who created the comment, with the following permissions:

- `instagram_basic`
- `instagram_manage_comments`
- `pages_show_list`
- `page_read_engagement`

If the token is from a User whose **Page role was granted via the Business Manager**, one of the following permissions is also required:

- `ads_management`
- `pages_read_engagement`
- `business_management`

### **Sample Request**

```
POST graph.facebook.com
  /17870913679156914/replies?message=*sniff*
```

### **Sample Response**

```
{
  "id": "17873440459141021"
}
```

# References

1. https://developers.facebook.com/docs/instagram-api/reference/ig-comment/replies
2. https://developers.facebook.com/docs/instagram-api/reference/ig-media/comments
3. https://developers.facebook.com/docs/instagram-api/guides/webhooks/
