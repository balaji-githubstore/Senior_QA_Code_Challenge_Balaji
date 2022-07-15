@happychat
Feature: Challenge Register
  In order to converse with bot
  As a user
  I would like to get access to all end points

  Background:
    Given I have baseurl as 'https://us-central1-rival-chatbot-challenge.cloudfunctions.net'

  @valid @positive
  Scenario: Happy Chat
    When I have resource as 'challenge-register'
    And I send the Post request with name-email and store json response of user_id
      | name             | email                      | Content-Type     |
      | Balaji Dinakaran | balajidinakaran1@gmail.com | application/json |
    And I have resource as 'challenge-conversation'
    And I send the Post request with user_id and store the json response of conversation_id
    And I have resource as 'challenge-behaviour/<conversation_id>'
    And I send the GET request with conversation_id and store the json response of messages
    Then I should get the messages in response with status as 200
    And If the messages contains 'Thank you' then Celebrate

