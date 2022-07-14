# Chatbot Challenge 🤖

Please read through the entire README.md file once before getting started.

Welcome to the Rival Technologies chatbot QA challenge 🎉! We are
excited that you are interested in working with our team in Vancouver, BC and
helping us expand our next gen market research platform.

To give you an idea of the kind of work you will be doing, our engineering team developed a
chatbot and we need you to write automated tests for it.

There are two parts to this challenge:

1. Write an automated test suite that checks the chatbot is functioning correctly.
   For this, you can follow the information and instructions in this README.md file here
   The tests should be written using the supertest framework and should be placed in this file: chatbot.test.js
   There is a sample test in this file to help get you started
   https://www.npmjs.com/package/supertest
   If the calls to the API endpoints in your tests return the incorrect response, that is fine. Leave a brief comment in your test and tell us what you think the correct expected behaviour should be and why the tests fail.

2. Write one happy path test for the /challenge-register endpoint using the Cucumber BDD framework
   https://cucumber.io/
   Add a command to package.json to help us run this test

## Dependancies

1. NodeJS 10.X or greater
   1.1 on a MacOS system install node or nvm via brew
   1.2 on a linux system use that distros package system (deb, rpm) to install node or nvm
   1.3 on a Windows system use NuGet or the installer pacakge
2. Once NodeJS is install run `npm install` in this directory to install the dependancies
   Note: If you notice any errors or warnings while installing dependencies, try and fix them before getting it back to us.
3. Run `npm test` to ensure the basic test runs
4. Write tests to cover all endpoints

## Acceptance Criteria

Everything we do is based on acceptance criteria. Below is a basic description of how the
chatbot works. Acceptance criteria should be described in your tests.
The acceptance criteria for this challenge is:

1. Tests run with `npm test`
2. Tests cover every endpoint
3. Tests check for success (200) response and known error responses (4xx)
4. Tests should error when appropriate

## Conversation Flow

The following flow diagram outlines the conversation flow visually:

![Chatbot conversation flow](./chatbot-challenge-flow.png)

## API

The chatbot exposes an HTTPS endpoint at https://us-central1-rival-chatbot-challenge.cloudfunctions.net,
referred to as the `$BASE_URL`. All URLs listed below are relative to this
endpoint.

## `POST /challenge-register` - Account Creation

The very first step is to create an account.

Request:

```bash
curl --request POST \
  --url $BASE_URL/challenge-register \
  --header 'content-type: application/json' \
  --data '{
  "name": "Jane Doe",
  "email": "jane@doe.com"
}'
```

Response:

```json
{
  "user_id": "<YOUR USER ID>"
}
```

## `POST /challenge-conversation` - Inititalize the conversation

In order to communicate with the bot, you need a conversation ID.

Request:

```bash
curl --request POST \
  --url $BASE_URL/challenge-conversation \
  --header 'content-type: application/json' \
  --data '{
  "user_id": "<YOUR USER ID>"
}'
```

Response:

```json
{
  "conversation_id": "<YOUR CONVERSATION ID>"
}
```

## `GET /challenge-behaviour/<YOUR CONVERSATION ID>` - Retrieve new messages

Use this endpoint to retrieve new messages. Once you answer a bot's question
correctly, you can use this endpoint to continue the conversation and get the
next question.

Request:

```bash
curl --request GET \
  --url $BASE_URL/challenge-behaviour/<YOUR CONVERSATION ID> \
  --header 'content-type: application/json'
```

Response:

```
{
  "messages": [{
    "text": "<The chatbot message>"
  }]
}
```

**NOTE**: The chatbot may reply with multiple messages. Your program can focus on
the last element in the array to continue the conversation.

**HINT**: This is where you parse the chatbot's message, figure out how to reply
and then get ready to reply back to the chatbot (see next chapter).

## `POST /challenge-behaviour/<YOUR CONVERSATION ID>` - Reply to the chatbot

Once you've parsed the chatbot's messages and figured out how to reply, send your
reply to the chatbot.

Request:

```bash
curl --request POST \
  --url $BASE_URL/challenge-behaviour/<YOUR CONVERSATION ID> \
  --header 'content-type: application/json' \
  --data '{
  "content": ""
}'
```

**NOTE**: The `content` property is always a string. If the bot asks you a
"yes/no" question, simply reply with "yes" as the `content` value. If the bot
asks for a list of elements, reply with a comma-separate list such as
"banana,orange,pineapple". For numbers, the `content` property is still a
string, e.g. `{"content": "42"}`.

Response:

```json
{
  "correct": true | false
}
```

If the chatbot replies with `true`, it's time to retrieve the next message with
the `GET /challenge-behaviour/<YOUR CONVERSATION ID>` endpoint documented above.

If you receive `false`, the chatbot didn't like your answer.

## Code submission

Congratulations 🙌! It's time to submit your code:
Please remove the folder called `node_modules` from the project directory.
Then Zip the project directory, include your name in the file, and place it on your Google Drive or OneDrive and Share the download link with us via Email.

Thank you and good luck.
