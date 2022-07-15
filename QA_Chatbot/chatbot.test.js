//designed to check the application all API request are working as per the requirement

const supertest = require("supertest");

const host = "https://us-central1-rival-chatbot-challenge.cloudfunctions.net";
const request = supertest(host);


describe('Test all API request are functioning properly', () => {
  const user_id=""
  const conversation_id=""

  it('It should return 302 for the GET method', async () => {
    const response = await request.get('/')
    expect(response.statusCode).toBe(302)
  })

  it('It should return 200 with user_id for the POST method for challenge register', async () => {
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
    user_id=String(response.body.user_id)
  })

  it('It should return 200 with conversation_id for the POST method for challenge conversation', async () => {
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
    conversation_id=String(response.body.conversation_id)
  })

  it.only('It should return 200 with message for the Get method for challenge behaviour using conversion id', async () => {

    const response = await request
    .get('/challenge-behaviour/'+conversation_id)

    expect(response.statusCode).toEqual(200)
    expect(response.body.messages).toBeDefined();
  })

  it('It should return 200 with correct for the POST method for challenge behaviour using conversion id', async () => {
    
    const response = await request
    .post('/challenge-behaviour/'+conversation_id)
    .send({
      "content": "car,van,lorry"
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(200)
    expect(response.body.correct).toBeDefined();

  })

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

  it('It should return 409 with conversation_id for the POST method for challenge conversation for the user with existing conversion id', async () => {
    const response = await request
    .post('/challenge-register')
    .send({
      "user_id": user_id
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(409)

  })

    //invalid details
    conversation_id="&4rr"
    user_id="&4rr"

  it('It should return 400 for the POST method for challenge conversation for invalid user id', async () => {
    const response = await request
    .post('/challenge-register')
    .send({
      "user_id": user_id
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(400);

     //conversation_id loaded
    conversation_id=String(response.body.conversation_id)
  })

  it('It should return 400 for the POST method for challenge behaviour using invalid conversion id', async () => {
    
    const response = await request
    .post('/challenge-behaviour/'+conversation_id)
    .send({
      "content": "car,van,lorry"
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

    expect(response.statusCode).toEqual(400);

  })

  it.only('It should return 400 with message for the Get method for challenge behaviour using invalid conversion id', async () => {

    const response = await request
    .get('/challenge-behaviour/'+conversation_id)

    expect(response.statusCode).toEqual(400);
  })
 
});