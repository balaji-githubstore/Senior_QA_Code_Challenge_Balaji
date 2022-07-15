//designed to check the application flow as mentioned in the flow chart
//please check chatbot.test for API request testing.
const supertest = require("supertest");

const host = "https://us-central1-rival-chatbot-challenge.cloudfunctions.net";
const request = supertest(host);

//will be updated with the below request
let user_id=""
let conversation_id=""
let message=""
let your_answer=""
let bot_response=true

describe('Test the application flow as mentioned in the flow chart', () => {
  it('It should return 200 with user_id for the POST method for challenge register when no user_id available', async () => {
    //run when no user_id avaiable
    if(user_id == "")
    {
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
    }
    
  })

  it('It should return 200 with conversation_id for the POST method for challenge conversation no customer_id available', async () => {
    //run when no conversation_id avaiable
    if(conversation_id == "")
    {
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
    }
 
  })

  it.only('It should return 200 with message for the Get method for challenge behaviour using conversion id', async () => {
    //run when no thank you received and on first time
    while(bot_response.toEqual(true))
    {
      
       //run when no message is empty
      if(message == "")
      {
         //run  when message is empty
        const response = await request
        .get('/challenge-behaviour/'+conversation_id)
    
        expect(response.statusCode).toEqual(200)
        expect(response.body.messages).toBeDefined();
    
        //log bot first message
        message=String(response.body.messages[response.body.messages.length-1])
    
        //won't run next post request under while condition - if message contains "Thank you"
        
        if (message.toLowerCase().includes("thank you")) {
          //stop further iteration when thank you
          your_answer = "";
          console.log("Celebrate - We will contact you")
          break
        } else if(message.toLowerCase().includes("yes") || message.toLowerCase().includes("no")){
          your_answer = "yes";
        }
        else if(message.toLowerCase().includes("list")){
          your_answer="banana,orange,pineapple"
        }
      }
      //making empty for next iteration
      message == ""

      const response2 = await request
      .post('/challenge-behaviour/'+conversation_id)
      .send({
        "content": your_answer
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
  
      expect(response2.statusCode).toEqual(200)
      expect(response2.body.correct).toBeDefined();
  
       //bot response loaded
       //either true or false
       bot_response=String(response2.body.correct)
      //while loop continues if bot_response is true otherwise terminate
     
    }
  })
  })

