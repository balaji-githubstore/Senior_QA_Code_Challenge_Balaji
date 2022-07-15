const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

//default timeout from 5000 to 30000ms
var {setDefaultTimeout} = require('@cucumber/cucumber');
setDefaultTimeout(30000);

const supertest = require("supertest");
let baseurl = ""
let resource_detail=""
let user_id=""
let conversation_id=""
let messages=""
let finalStatusCode=""

Given('I have baseurl as {string}', function (url) {
    baseurl = url
    console.log(url)
});

When('I have resource as {string}', function (resource) {
    resource_detail = "/" + resource
});

When('I send the Post request with name-email and store json response of user_id',
    async (dataTable) => {
        const response = await supertest(baseurl).post("/challenge-register").send({
            "name": "Balaji Dinakaran",
            "email": 'balajidinakaran1@gmail.com'
        })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(500)
            .expect((res) => {
                user_id = String(res.body.user_id)
            })
    }
);

When('I send the Post request with user_id and store the json response of conversation_id', async () => {

    const response = await supertest(baseurl).post(resource_detail).send({
        "user_id": user_id
    })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(500)
        .expect((res) => {
            conversation_id = String(res.body.conversation_id)
        })

});

When('I send the GET request with conversation_id and store the json response of messages', async () => {

    resource_detail = resource_detail.replace('<conversation_id>', conversation_id);
    const response = await supertest(baseurl)
        .get(resource_detail)
        .expect(500)
        .expect((res) => {
            finalStatusCode = res.status
            messages = String(res.body.messages)
        })
});

Then('I should get the messages in response with status as {int}', function (expectedStatus) {

    assert.equal(expectedStatus, finalStatusCode)

});

Then('If the messages contains {string} then Celebrate', function (expectedMessage) {
    if (messages.includes(expectedMessage)) {
        assert.ok(true);
    }
    else {
        assert.ok(false);
    }
});