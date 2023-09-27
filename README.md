## service/listen_bus.ts

This module sets up a message bus using Tactful utils SDK and handles incoming messages for SMS communication.

### Functions

- `startBus()`

  This function starts the message bus and sets up event listeners to handle incoming messages. It consumes messages from the bus and listens for the event "tactful.reply". When a "tactful.reply" message is received, it checks if the message is an SMS,then extracts the text and customer phone number from the message, and calls the `sendingMessage` function to send an SMS message.

## sms/sendingMessage.ts

This module sends an SMS message using the Twilio service.

### Functions

- `default async function sendingMessage(TactMessage: TactfulMessage, profileId: number)`

  This function sends an SMS message using the Twilio service. It takes two arguments:

  - `TactMessage` (TactfulMessage): An object representing the Tactful message, which should contain the text and user information for the SMS message.
  - `profileId` (number): The Business profile ID associated with the Business reserved phone number in the database.

### Example

```
const TactMessage = {
  text: "Hello, this is a test message.",
  userInfo: {
    phone_number: "+1234567890"
  }
};
const profileId = 83;

await sendingMessage(TactMessage, profileId);

```

## db/models.ts

This module defines the Sequelize model for the `Twilio` table in order to handle required queries from the database.

### Dependencies

The module requires the following external dependencies:

- `DataTypes`: The Sequelize data types for defining the table columns.
- `sequelize`: The Sequelize instance for connecting to the database.

### Model Definition

- `Twilio`

  This model represents the `Twilio` table in the database. It has the following columns:

  - `id` (integer): The primary key of the table.
  - `phoneNumber` (string): The phone number associated with the Twilio account.
  - `accountSid` (string): The Twilio account SID.
  - `authToken` (string): The Twilio auth token.
  - `businessId` (integer): The ID of the business associated with the Twilio account. It references the `profileId` column of the `Business` table.

## db/fun.ts

This module provides functions for retrieving phone information from the database.

### Types

- `PhoneInfo`: An object that represents phone information and has the following properties:
  - `phoneNumber` (string): The phone number associated with the Twilio account.
  - `accountSid` (string): The Twilio account SID.
  - `authToken` (string): The Twilio auth token.

### Functions

- `async function getTwilioPhoneInfo(businessId: number): Promise<PhoneInfo>`

  This function retrieves phone information from the database for a given `businessId`. It uses the `Twilio` model and the Sequelize library to query the database and retrieve the necessary information.

  - `businessId` (number): The ID of the business for which to retrieve the phone information.

  The function returns a promise that resolves to the `PhoneInfo` object.

### Example

```
import { getTwilioPhoneInfo, PhoneInfo } from "./fun.js";

const businessId = 83;
const phoneInfo: PhoneInfo = await getTwilioPhoneInfo(businessId);

console.log(phoneInfo.phoneNumber);
console.log(phoneInfo.accountSid);
console.log(phoneInfo.authToken);

```

## config.ts

This module provides configuration settings for the bus and database connections.

### Configuration Object

- `config`: An object that contains the configuration settings.
  - `bus`: An object with the Redis URL for the bus connection.
    - `redisUrl` (string): The Redis URL for the bus connection, retrieved from the `REDIS_BUS_URL` environment variable.
  - `db`: An object with the Sequelize options for the database connection.
    - `options` (Options): An object containing the Sequelize options for the database connection, including `host`, `port`, `database`, `dialect`, `username`, and `password`. The values are retrieved from the corresponding environment variables.
