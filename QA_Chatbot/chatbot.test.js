//designed to check the application all API request are working as per the requirement

const supertest = require("supertest");

const host = "https://us-central1-rival-chatbot-challenge.cloudfunctions.net";
const request = supertest(host);


describe('Test all API request are functioning properly', () => {
  let user_id, conversation_id

  //default timeout from 5000 to 30000ms
  jest.setTimeout(30000);

  //existing one
  it('It should return 302 for the GET method', async () => {
    const response = await request.get('/')
    expect(response.statusCode).toBe(302)
  })

  //should return 200 with user id when valid name and email used for challenge register
  it('It should return 200 with user_id on POST for challenge register', async () => {
    const response = await request
      .post('/challenge-register')
      .send({
        "name": "Balaji Dinakaran",
        "email": 'balajidinakaran1@gmail.com'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200)
    expect(response.body.user_id).toBeDefined();
    //user_id loaded
    user_id = String(response.body.user_id)
  })

  //should return 200 with conversation id when valid user_id used for challenge conversation
  it('It should return 200 with conversation_id on POST for challenge conversation', async () => {
    const response = await request
      .post('/challenge-register')
      .send({
        "user_id": user_id
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200)
    expect(response.body.conversation_id).toBeDefined();

    //conversation_id loaded
    conversation_id = String(response.body.conversation_id)
  })

  //should return 200 with messages when valid conversation id used for challenge behaviour
  it('It should return 200 with message for the Get method for challenge behaviour using conversion id', async () => {

    const response = await request
      .get('/challenge-behaviour/' + conversation_id)

    expect(response.statusCode).toEqual(200)
    expect(response.body.messages).toBeDefined();
  })


  //should return 200 with body correct key on POST when valid conversation id used for challenge behaviour
  it('It should return 200 with correct on POST for challenge behaviour using conversion id', async () => {

    const response = await request
      .post('/challenge-behaviour/' + conversation_id)
      .send({
        "content": "car,van,lorry"
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200)
    expect(response.body.correct).toBeDefined();

  })

  //should return 409 conflict when existing name and email used
  it('It should return 409  for the POST method for challenge register for existing name and email', async () => {
    const response = await request
      .post('/challenge-register')
      .send({
        "name": "Balaji Dinakaran",
        "email": 'balajidinakaran1@gmail.com'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(409)
  })

  //invalid details
  conversation_id = "&4rr"
  user_id = "&4rr"

  //return 400 bad request while requesting for userid without sending name and email
  it('It should return 400 for the POST method for challenge register without name and email', async () => {
    const response = await request
      .post('/challenge-register')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(400)
  })
  

  //return 400 bad request for invalid user id
  it('It should return 400 for the POST method for challenge conversation for invalid user id', async () => {
    const response = await request
      .post('/challenge-register')
      .send({
        "user_id": user_id
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(400);
  })

  //return 400 bad request for invalid conversation id
  it('It should return 400 for the POST method for challenge behaviour using invalid conversion id', async () => {

    const response = await request
      .post('/challenge-behaviour/' + conversation_id)
      .send({
        "content": "car,van,lorry"
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(400);

  })

  //return 400 bad request for invalid conversation id while chatting
  it('It should return 400 with message for the Get method for challenge behaviour using invalid conversion id', async () => {

    const response = await request
      .get('/challenge-behaviour/' + conversation_id)

    expect(response.statusCode).toEqual(400);
  })

  //return 401 no access to server for user not having access and requesting for user id. 
  it('It should return 401 on POST for challenge register', async () => {
    const response = await request
      .post('/challenge-register')
      .send({
        "name": "Balaji Dinakaran",
        "email": 'balajidinakaran1@gmail.com'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(401)
  })

});