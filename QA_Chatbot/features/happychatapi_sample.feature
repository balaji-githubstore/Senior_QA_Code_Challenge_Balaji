@ignore
Feature: Challenge Register
  In order to converse with bot
  As a user 
  I would like to get access to all end points

  Background: 
    Given I have base url 'https://us-central1-rival-chatbot-challenge.cloudfunctions.net'

  @valid @positive
  Scenario: Valid Account Creation
    And I have resource as '/challenge-register'
    And I have request header as 'content-type: application/json'
    And I have data as
      | name     | email        |
      | Jane Doe | jane@doe.com |
    When I send the Post request
    Then I should get the response as 200
    And I should get the 'user_id' in json body

  @valid @positive
  Scenario: Valid Inititalize Of conversation
    And I have resource as '/challenge-conversation'
    And I have request header as 'content-type: application/json'
    And I have user_id as 'bala'
    When I send the Post request
    Then I should get the response as 200
    And I should get the 'conversation_id' in json body

  @valid @positive
  Scenario: Retrieve new messages
    And I have resource as '/challenge-behaviour/{conversion_id}'
    And I have request header as 'content-type: application/json'
    When I send the GET request
    Then I should get the response as 200
    And I should get the 'messages' in json body
    And If 'messages' contains 'Thank you' then Celebrate

  @valid @positive
  Scenario: Reply to the chatbot
    And I have resource as '/challenge-behaviour/{conversion_id}'
    And I have request header as 'content-type: application/json'
    When I send the Post request
    And I store the reponse status and content
    And If content is false then terminate otherwise invoke scenario 'Retrieve new messages' 
    Then I should get the stored response as 200
    And I should get the stored 'content' in json body

  

  #existing users
  @invalid @negative
  Scenario Outline: Multiple Account Creation
    And I have resource as '/challenge-register'
    And I have request header as 'content-type: application/json'
    And I have data as
      | name   | email   |
      | <name> | <email> |
    When I send the Post request
    Then I should get the response as <expected_status> for existing users

    Examples: 
      | name | email          | expected_status |
      | Jane | Jane@gmail.com |             200 |
      | Jane | Jane@gmail.com |             409 |

  @invalid @negative
  Scenario: Invalid Account Creation
    And I have resource as '/challenge-register'
    And I have request header as 'content-type: application/json'
    And I have data as
      | name     | email        |
      | Jane Doe | jane@doe.com |
    When I send the Post request
    Then I should get the response as 400 for invalid users

  @invalid @negative
  Scenario: Invalid Inititalize Of conversation
    And I have resource as '/challenge-conversation'
    And I have request header as 'content-type: application/json'
    And I have user_id as 'bala'
    When I send the Post request
    Then I should get the response as 400 for invalid users

  @invalid @negative
  Scenario: Invalid Conversation Id for Retrieve new messages
    And I have resource as '/challenge-behaviour/{conversion_id}'
    And I have request header as 'content-type: application/json'
    When I send the GET request
    Then I should get the response as 400
    
   @invalid @negative
  Scenario: Invalid Conversation Id to Reply to the chatbot
    And I have resource as '/challenge-behaviour/{conversion_id}'
    And I have request header as 'content-type: application/json'
    When I send the Post request
    Then I should get the response as 400
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
