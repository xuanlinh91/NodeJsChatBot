// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Import required Bot Framework classes.
const { ActivityTypes } = require('botbuilder');
const Request = require('request');
// Adaptive Card content
// const IntroCard = require('./resources/IntroCard.json');

// Welcomed User property name
const WELCOMED_USER = 'welcomedUserProperty';
const botname = 'nhơn :v';
const rasaBotUrl = 'http://103.27.236.152:5005/webhooks/rest/webhook';

var responseText = '';
class MyBot {
    /**
     *
     * @param {UserState} User state to persist boolean flag to indicate
     *                    if the bot had already welcomed the user
     */
    constructor(userState) {
        // Creates a new user property accessor.
        // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.
        this.welcomedUserProperty = userState.createProperty(WELCOMED_USER);

        this.userState = userState;
    }

    getSimSimiResponse(question) {
        return new Promise(function(resolve, reject) {
            var jsonQuestion = { 'message': question };
            Request.post({
                'headers': { 'content-type': 'application/json' },
                'url': rasaBotUrl,
                'body': jsonQuestion,
                'json': true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body[0]);
                }
            });
        });
    };

    /**
     *
     * @param {TurnContext} context on turn context object.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
            // Read UserState. If the 'DidBotWelcomedUser' does not exist (first time ever for a user)
            // set the default to false.
            const didBotWelcomedUser = await this.welcomedUserProperty.get(turnContext, false);
            let text = turnContext.activity.text.toLowerCase();
            // Your bot should proactively send a welcome message to a personal chat the first time
            // (and only the first time) a user initiates a personal chat with your bot.

            let key = text.substring(0, botname.length) === botname ? text.substring(botname.length + 1) : text;
            // console.log(key);
            if (didBotWelcomedUser === false) {
                // The channel should send the user name in the 'From' object
                await turnContext.sendActivity('Không ai nói gì à :v');
                // await turnContext.sendActivity(`It is a good practice to welcome the user and provide personal greeting. For example, welcome ${ userName }.`);

                // Set the flag indicating the bot handled the user's first message.
                await this.welcomedUserProperty.set(turnContext, true);
            } else {
                await this.getSimSimiResponse(key).then(function(data) {
                    responseText = typeof data === 'undefined' ? 'Cái này mới, em chưa học :v' : data.text;
                });
                await turnContext.sendActivity({ type: 'typing' });
                await turnContext.sendActivity(`${ responseText }`);
            }
            // Save state changes
            await this.userState.saveChanges(turnContext);
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            // Send greeting when users are added to the conversation.
            await this.sendWelcomeMessage(turnContext);
        } else {
            // Generic message for all other activities
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }

    /**
     * Sends welcome messages to conversation members when they join the conversation.
     * Messages are only sent to conversation members who aren't the bot.
     * @param {TurnContext} turnContext
     */
    async sendWelcomeMessage(turnContext) {
        // Do we have any new members added to the conversation?
        if (turnContext.activity.membersAdded.length !== 0) {
            for (let idx in turnContext.activity.membersAdded) {
                if (turnContext.activity.membersAdded[idx].id !== turnContext.activity.recipient.id) {
                    await turnContext.sendActivity(`Hello :))`);
                }
            }
        }
    }
}

module.exports.MyBot = MyBot;
