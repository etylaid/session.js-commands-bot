import { generateSeedHex } from '@session.js/keypair'
import { encode } from '@session.js/mnemonic'
import { Session, ready, Poller,} from '@session.js/client'
import { SessionValidationError, SessionValidationErrorCode, SessionJsError } from '@session.js/errors'

// Import configuration
import * as config from './config.json'

await ready // wait for session.js
const session = new Session()

//console.log("Bot account mnemonic:",encode(generateSeedHex())) // generate mnemonic (create account)

// Mnemonic validation
try {
    session.setMnemonic(config.Mnemonic) // Will throw SessionValidationError if the provided mnemonic is invalid
  } catch(e) {
    if(e instanceof SessionValidationError) {
      if(e.code === SessionValidationErrorCode.InvalidMnemonic) { // "e" contains code property with one of SessionValidationErrorCode enums
        console.error('You entered an invalid mnemonic!')
      } else {
        console.error(e.code) // Other error codes related to Session.js
      }
    } else if(e instanceof SessionJsError) {
      console.error(e.code) // Still Session.js
    } else if(e instanceof Error) {
      console.error(e.message) // Error thrown by javascript and not Session.js
    } else {
      // generally all errors in JavaScript extend from Error class, but
      // it is possible to throw primitive values like `throw "primitive string"`
      throw e
    }
  }

// Logs the bot's Session ID that will be used to send messages
console.log('Bot\'s Session ID:', session.getSessionID())


// Adds poller
session.addPoller(new Poller())


// Bot startup timestamp, called in line X
const botStartupTimestamp = Date.now();


// Message received event
session.on('message', async message => {

    // Blocks old messages from being parsed
    if(message.timestamp <= botStartupTimestamp)
    {
        return;
    }

    // Doesnt respond to messages that don't start with the defined prefix
    if(!message.text?.startsWith(config.Prefix))
    {
        return;
    }

    switch(message.text)
    {
        case config.Prefix + "help": // Basic help command
            session.sendMessage({
                to: message.from,
                text: "help command called",
            })
            break;

        default: // Tells the user the provided command is invalid
            session.sendMessage({
                to: message.from,
                text: "Invalid command provided",
            })
            break;
    }
})