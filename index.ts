import { generateSeedHex } from '@session.js/keypair'
import { encode } from '@session.js/mnemonic'
import { Session, ready, Poller,} from '@session.js/client'
import { SessionValidationError, SessionValidationErrorCode, SessionJsError } from '@session.js/errors'

// Import configuration
import * as config from './config.json'

await ready
const session = new Session();

(() => {
  console.log("Bot account mnemonic:\n",encode(generateSeedHex()),"\n\nPlace this inside the config.json file under \"Mnemonic\".\nAfter doing that, comment out this function (line 12 to 17) and the bot will start.");
  process.exit(0)
})();

// Mnemonic validation
try {
    session.setMnemonic(config.Mnemonic, config.DisplayName) // Will throw SessionValidationError if the provided mnemonic is invalid
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


// Bot startup timestamp
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
                text: `
                List of available commands\n
                
${config.Prefix}help        - Shows this message\n
${config.Prefix}id          - Shows the bot's Session ID\n
${config.Prefix}ping        - Shows the bot's latency\n
${config.Prefix}mnemonic    - Shows the bot's mnemonic\n
                `,
            })
            break;

        case config.Prefix + "id":
            session.sendMessage({
                to: message.from,
                text: session.getSessionID(),
            })
            break;

        case config.Prefix + "latency":
            session.sendMessage({
                to: message.from,
                text: `Pong! (${Date.now() - message.timestamp}ms)`,
            })
            break;

        case config.Prefix + "mnemonic":
            session.sendMessage({
                to: message.from,
                text: `:clown:`,
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