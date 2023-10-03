# Upload Media for Instagram Messaging

This document shows us how to upload media to the Meta servers using the Attachment Upload API. This media can then be used in Instagram messages.

**Note:** We can upload and send an attachment in a single API call.

# Permissions

We require these permissions:-

- `instagram_basic`
- `instagram_manage_comments`
- `instagram_manage_messages`
- `pages_messaging`

Allowed media types, formats and sizes:-

| Media Type | Supported Format | Supported Size Maximum |
| --- | --- | --- |
| Audio | acc, m4a, wav, mp4 | 25MB |
| Image | png, jpeg, gif | 8MB |
| Video | mp4, ogg, avi, mov, webm | 25MB |

# Limitations

- If our app only has Standard Access to any of the required permissions, our app will only be able to upload media for Pages we own or administer.
- The permissions listed above when granted to our app allow our app to upload media but do not allow our app to send a message.
- Only audio and video files can be uploaded from a server. Images must be uploaded from a URL.

# **Upload Media from a URL**

We can upload audio files, images, and videos from a URL.

To upload media from a URL, we can send a `POST` request to the `/PAGE-ID/message_attachments` endpoint with the platform set as Instagram and the message attachment type set to the type of media we are uploading, `audio`, `image`, or `video`. Add the URL and `is_reusable` in the payload. Set `is_reusable` to true so that the media can be used in multiple messages.

**Note:** All keys within the `message` object, such as `attachment`, `type`, and `payload` are strings.

### **Sample Request**

*Formatted for readability.*

```
curl -i -X POST "https://graph.facebook.com/LATEST-API-VERSION/PAGE-ID/message_attachments
    ?message={
      "attachment":
          {
          "type": "MEDIA-TYPE",
          "payload":
              {
                  "url": "URL",
                  "is_reusable": "true",
              },
          }
    }
    &platform=instagram
    &access_token=PAGE-ACCESS-TOKEN"
```

Upon success, our app will receive an ID for the attachment. We can now include this ID in our messages.

```
{
    "attachment_id": "ATTACHMENT-ID"
}
```

# **Upload Media from a Server**

We can upload audio files and videos from a server. Images must be uploaded from a URL.

To upload media from a server, we can send a `POST` request to the `/PAGE-ID/message_attachments` endpoint with the message attachment payload containing the URL and the platform set as Instagram. If we want to use the media in multiple messages, include the `is_reusable` set to true in the payload.

### **Sample Request**

*Formatted for readability.*

```
curl -i -X POST "https://graph.facebook.com/LATEST-API-VERSION/PAGE-ID/message_attachments
    &platform=instagram
    &message={'attachment':{'type':'MEDIA-TYPE-AUDIO-OR-VIDEO','is_reusable':'true'}}
    &filedata=FILE-PATH;type=PATH-TYPE
    ?access_token=PAGE-ACCESS-TOKEN"
```

Upon success, our app will receive an ID for the attachment. We can now include this ID in our messages.

```
{
    "attachment_id": "ATTACHMENT-ID"
}
```

# **Send a Media Message**

Now that we have uploaded media, we can send it in a message.

To send a message that contains the media we uploaded, send a `POST` request to the `/PAGE-ID/messages` endpoint with the `recipient` parameter containing the Instagram-scoped ID (IGSID) and the `message` parameter containing an `attachment` object with the `type` set to `MEDIA_SHARE` and `payload.id` set to the attachment ID.

We business must own the media to be used in the message.

### **Sample Request**

```
curl -i -X POST "https://graph.facebook.com/v17.0/PAGE-ID/messages
  ?recipient={id: IGSID}
  &message={
      attachment:
        {
          type:MEDIA_SHARE,
          payload:{id:ATTACHMENT-ID}
        }
      }
  &access_token=PAGE-ACCESS-TOKEN"
```

### **Sample API Response**

Upon success, our app will receive the following JSON response:

```
{
  "recipient_id": "IGSID",
  "message_id": "MESSAGE-ID"
}
```

# **Upload and Send**

We can also upload media and send it in a single API request.

### **From a URL**

To upload and send media in one request, send a `POST` request to the `/PAGE-ID/messages` endpoint with the `recipient` parameter containing the Instagram-scoped ID (IGSID) and the `message` parameter containing an `attachment` object with the `type` set to `audio`, `image`, or `video` and `payload` containing the URL and `is_reusable` set to true.

### **Sample Request**

*Formatted for readability.*

```
curl -i -X POST "https://graph.facebook.com/LATEST-API-VERSION/PAGE-ID/messages
  ?recipient={id: IGSID}
  &message={
      'attachment':
        {
          'type':'video',
          'payload':{'url':'https://you-video-url.mp4'},
          'is_reusable': 'true',
        }
      }
  &access_token=PAGE-ACCESS-TOKEN"
```

### **Sample API Response**

Upon success, our app will receive the following JSON response:

```
{
  "recipient_id": "IGSID",
  "message_id": "MESSAGE-ID",
  "attachment_id": "ATTACHMENT-ID"
}
```

### **From a Server**

To upload and send a audio or video from our server, send a `POST` request to the `/PAGE-ID/messages` endpoint with the `recipient` parameter containing the Instagram-scoped ID (IGSID) and the `message` parameter containing an `attachment` object with the `type` set to `AUDIO` or `VIDEO` and `filedata` parameter the file's location and type. The format for `filedata` values looks like **@/path_on_my_server/video.mp4;type=video/mp4**.

### **Sample Request**

*Formatted for readability.*

```
curl -i -X POST "https://graph.facebook.com/LATEST-API-VERSION/PAGE-ID/messages
  ?recipient={id: IGSID}
  &message={
      'attachment':
        {
          'type':'MEDIA-TYPE-AUDIO-OR-VIDEO'
          'is_reusable':'true'
        }
      }
  &'filedata':'FILE-PATH;type=PATH-TYPE'
  &access_token=PAGE-ACCESS-TOKEN"
```

### **Sample API Response**

Upon success, our app will receive the following JSON response:

```
{
  "recipient_id": "IGSID",
  "message_id": "MESSAGE-ID",
  "attachment_id": "ATTACHMENT-ID"
}
```