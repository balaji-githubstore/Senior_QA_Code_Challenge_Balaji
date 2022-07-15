Feature: Challenge Register
  In order to converse with bot
  As a user 
  I would like to get access to all end points

  Background: 
    Given I have base url 'https://us-central1-rival-chatbot-challenge.cloudfunctions.net'

  @valid @positive
  Scenario: Happy Chat
    When I have resource as '/challenge-register'
    And I have request header as 'content-type: application/json'
    And I have data as
      | name     | email        |
      | Jane Doe | jane@doe.com |
    And I send the Post request
    And I store the 'user_id' from the response
    And I have resource as '/challenge-conversation'
    And I have request header as 'content-type: application/json'
    And I have user_id as 'user_id'
    And I send the Post request
    And I store the 'conversation_id' from the response
    And I have resource as '/challenge-behaviour/conversation_id'
    And I have request header as 'content-type: application/json'
    And I send the GET request
    Then I should get the 'messages' in response
    And If the 'messages' contains 'Thank you' then Celebrate
