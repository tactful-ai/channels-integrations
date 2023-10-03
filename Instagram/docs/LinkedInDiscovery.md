# Discovery of LinkedIn

# Introduction to the LinkedIn API Landscape

LinkedIn APIs enable web and mobile applications to use LinkedIn’s data and features for their unique business needs.

LinkedIn publishes the following APIs:

- **Consumer solutions platform**: Covers most of the basic features we’re familiar with – profiles, networking, posts, and comments.
- **Marketing developer platform**: A superset of the consumer platform with advanced features like organization management.
- **Compliance APIs**: Same as the marketing platform but with data security features required by regulated industries.
- **Talent solutions**: Functionality related to hiring that’s available only to select partners.
- **Learning solutions**: Features for LinkedIn’s learning platform and available only to select partners.

**Sales Navigator**: Features related to sales use cases and available only to select partners.

**Right now we are only have access to the consumer solutions platform. For the messaging API, we need access to the compliance APIs. The form to request access can be found [here](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR8-45gWDXSBCiG6crIdp2BFUMk5FSVdIVlZRMzM0WVMxTUlHSlM3VFBBSy4u). (Requires company to be FINRA/SEC (?) registered).**

## **Getting Ready to Use the LinkedIn API**

I signed in to the [Linkedin developer portal](https://developer.linkedin.com/) and created an app, which also required creating a dummy company page. I verified my app through the page and requested certain features (only sharing and signing in right now). 

![app_products](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/872031f8-87ea-40d6-b002-5ba6264e5685)


Now to make API calls on behalf of the user, we need to obtain the permissions. The [authorization API documentation](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fconsumer%2Fcontext&tabs=HTTPS) is very accurate and comprehensive. To summarize, you first configure your app from the Linkedin developer portal by specifying a redirect URL. This is the URL to which Linkedin will redirect the user after the OAuth2.0 page (the page Linkedin shows you when they ask you to allow certain things). For our purposes, it’s https://oauth.pstmn.io/v1/callback (postman). We also need to obtain our client ID and client secret. 

![app_creds](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/2fdfffb6-191b-4554-bc77-e6077434b126)


Now we need to request the authorization code from Linkedin, but they will only hand it to us when the user gives us the permissions (the OAuth2.0 page). The HTTP request to do so is:

```jsx
GET https://www.linkedin.com/oauth/v2/authorization
```

![get_auth_code_params](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/061085ec-7ab6-4b47-8e71-98bef81b76ff)


A sample request sent would be:

```jsx
GET [https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77rq0z893vf30o&redirect_uri=https://oauth.pstmn.io/v1/callback&state=DCEeFWf45A53sdfKef424&scope=openid profile w_member_social email](https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77rq0z893vf30o&redirect_uri=https://oauth.pstmn.io/v1/callback&state=DCEeFWf45A53sdfKef424&scope=openid%20profile%20w_member_social%20email)
```

When the user approves, they are redirected to our redirect URL, which now has appended to it the authorization code we are looking for (in the ‘code’ parameter).

```jsx
https://oauth.pstmn.io/v1/callback?code=AQQ-maQ-Ewh51MVA3AxDrKpFgDthUJtvmY_5ASgdLqJ9pjdgZwafuZnIigD8ZyGATsmxnNIebpGCfs04nCfgdF8ZielzMYJwscfD_gY-sZnFypijegJXOFYQmXCLuHuxmyhi7ScKZ95ejYZXCt4UXn9i1DQ9pQuhbsR6urV_miAY9GDrVLc8cLerttBrxKRqnqX4Hu7yeDHogBgCDc8&state=DCEeFWf45A53sdfKef424
```

When that happens, we proceed to exchange our new-found authorization code with the access token we need to make API calls on the user’s behalf.

```jsx
POST https://www.linkedin.com/oauth/v2/accessToken
```

![post_access_token_params](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/905407ce-f537-4a51-a554-7c5cc3252429)


Finally, we can make authenticated API calls with this access token that lasts for 60 days.

A sample response:

```json
{
"access_token": "AQVexYSrR1E6Xg4nG1VNPSZaqFRiDmlaO4_4xZz7I41AcaS3iqXYjp3pohG7BOvUoBjjWGkoHMBd5FBTNpS6F7r04wmaYEh8B8IiZZjTJS7TtN9rNey3aDy8rOrsKrlI3Pa5014laYOwNY6FsUVV0g0XBvgX_mNepdeT9qoCS4C7TDZaFATdqrG4VRtSenAx3a1hB9wed_NEKgAYBDTAjZsjFCV2ushboyegtSlQKyQJjH56UVsrbJ2C9OCrCmh-YcQ2bVa-A4XCE0KodeeS-eWK5c02MuTY6j09x2AJyt75GIW6TGaW8aOfhoo3irx2v1hzspDGy3vEocXC-qGocR8Zv_8wSA",
"expires_in": 5183999,
"scope": "email,openid,profile,w_member_social",
"token_type": "Bearer",
"id_token": "eyJ6aXAiOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ5Mjk2NjhhLWJhYjEtNGM2OS05NTk4LTQzNzMxNDk3MjNmZiIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJodHRwczovL3d3dy5saW5rZWRpbi5jb20iLCJhdWQiOiI3N3JxMHo4OTN2ZjMwbyIsImlhdCI6MTY5MTc1MjI1NSwiZXhwIjoxNjkxNzU1ODU1LCJzdWIiOiJKNkdlU1NkWDRtIiwibmFtZSI6IkFobWVkIEFiZGVsYXR0eSIsImdpdmVuX25hbWUiOiJBaG1lZCIsImZhbWlseV9uYW1lIjoiQWJkZWxhdHR5IiwicGljdHVyZSI6Imh0dHBzOi8vbWVkaWEubGljZG4uY29tL2Rtcy9pbWFnZS9DNEQwM0FRRy1JQUdqU0wtYlFBL3Byb2ZpbGUtZGlzcGxheXBob3RvLXNocmlua18xMDBfMTAwLzAvMTY1Mzk5MDAxNDc1ND9lPTE2OTcwNjg4MDAmdj1iZXRhJnQ9UEZpMFl5V3RETlI5b1BDTjE3dktZX3lkbG9DSHMtQVlZT2IwemNLUlpHVSIsImVtYWlsIjoiYWhtZWRyYWRhbGxhMjAwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJsb2NhbGUiOiJlbl9VUyJ9.ltF36m1vCQrvwCp3GW4Y1YA_E-FcGNr7jG39aOGdjxYyXwLiFu1NwKKw0H0vvGt8Y8ZUJxPoi8crR0K3_eIyBFusXfb8V3_qvSVgjuujM9kiRFQZC-95TclX-c1SP5GdKtM5SgaLr5EJsa0gjuKFtivNp5COMzehjJa1fpH4jUWRsfSzWrF78OwfchtD06o1FgYgn29IDZE1ELLl6jZzZqf_06Pp_1qoD0OC-AqgZowgD0CNAnVyyI1jmUJwbZvZadZeENxM2aLNMmsW2WH6drGE6-bhmr0gFa_J1KCE5b0DFQmvKDXKLCEVerKMk3mM_hOAplfGT643ZTE2w5LAT99G-ajDzm-lTMseLtSNeVaRzmrpmyR7Iuk71PL1pEeU7HfQwSxzmhVM3mbZO4xWU1667PPODLwpVVFRpAQYZ0BXdBRziwE4MWvmT2SSBOLnJgZuYKGIzwlIKVOfU9hYNdfhe0YjSiHaND86bRZRRnJHfm5UVx3neAsn37EV-1O96KjB-NjcD9ZSEsAIRg6purNT6cTtU1G4chsuMDOLiBPoQQuNgamvFu-fxDKZOBdke9spmJw0DtUIvG-HZNL3fA4YnyxfoCdxfcyvxjZen9ELAF7lXPOs1oTkRw6t-9ZTuM0xbUFsU8qOS_ApSI13BPYADXu_vhsvO4KW7jKswyA"
}
```

An illustration of the process:

![image](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/782a2cdd-315f-4b07-87fa-72519ae9b419)


A GET request to /userinfo:

![get_userinfo](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/bab5f939-688b-4a28-ab7d-94c4a6e8bfe2)


## Creating a post using the LinkedIn API

To share a post use the `/post` LinkedIn POST endpoint:

```bash
POST https://api.linkedin.com/rest/posts
```

The request body is a [JSON object](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/posts-api?view=li-lms-2022-11&tabs=http#post-schema):

```json
{
  "author": "urn:li:person:{ID}",
  "commentary": "Text of the post",
  "visibility": "PUBLIC",
  "lifecycleState": "PUBLISHED",
  "distribution": {
    "feedDistribution": "MAIN_FEED",
    "targetEntities": [],
    "thirdPartyDistributionChannels": []
  }
}
```

- `author={urn}`: To post on a user’s page, use a [uniform resource name](https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/urns?context=linkedin%2Fmarketing%2Fcontext&view=li-lms-2022-11) (URN) like “`urn:li:person:{ID}`“. Get that ID from the `/v2/userinfo` [profile endpoint](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin?context=linkedin%2Fconsumer%2Fcontext). It is the value of the “sub” key. To post on a client’s company page, use “`urn:li:organization:{ID}`” (Note: This requires marketing platform approval for your app and page administrator role for the user).
- `commentary={text}`: The text of your post.

Always add these four request headers:

- `Authorization: Bearer {access_token}`
- `LinkedIn-Version: {yyyymm}`: The API version your application can handle.
- `X-Restli-Protocol-Version: 2.0.0`
- `Content-Type: application/json`

If the request succeeds, you get a 201 (created) status and the `x-restli-id` response header has the new post’s URN, `urn:li:share:{ID}`.

The code using server-side Node.js with JavaScript:

```jsx
const express = require('express');
const app = express();
const port = 3000;

const accessToken = getAccessToken();

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'LinkedIn-Version': '202306',
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json'
};

async function run(){    
    const apiResp = await fetch('https://api.linkedin.com/v2/userinfo',
        {headers: headers});
    const profile = await apiResp.json();
    
    const params = {
        "author": `urn:li:person:${profile.sub}`,
        "commentary": "Text of the post",
        "visibility": "PUBLIC",
        "lifecycleState": "PUBLISHED",
        "distribution": {
            "feedDistribution": "MAIN_FEED",
            "targetEntities": [],
            "thirdPartyDistributionChannels": []
        }
    };
    
    const postResp = await fetch('https://api.linkedin.com/rest/posts', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    });
    console.log(postResp);
    console.log(postResp.status);
    if (postResp.ok) {
        const postId = postResp.headers.get('x-restli-id');
        console.log(postId);
    }
}

app.get('/', (req, res) => {
    run();    
    res.send("Check your LinkedIn");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})
```

You will find a new post similar to this on your LinkedIn feed (delete it quickly xD):

![linkedin_post](https://github.com/tactful-ai/linkedin-inetgration/assets/77215230/94772017-a8a3-4221-80b4-e099c0f0e19d)


## Resources

- https://www.ayrshare.com/how-to-post-and-get-analytics-with-the-linkedin-api/
- https://learn.microsoft.com/en-us/linkedin/
