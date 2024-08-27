# Session.js Commands Bot
#### _Simple Session.js bot template
#### **Powered by [Session.js](https://github.com/sessionjs)**
___
This bot offers a very basic method of handling commands ready for use.
- [x] Blocks past messages from being parsed on startup
- [x] Customizable prefix and username
- [x] Mnemonic validation error catching
- [x] Easy to understand configuration in JSON
- [ ] Custom command handler

## Setting up
Follow these steps to get the bot up and running correctly:
1. Install [Bun](https://bun.sh) if not already installed.
2. Download the repository.
3. Run `bun install`.
4. Rename `example.config.json` to `config.json` and update the values.
5. Run `bun start` to generate the bot's mneumonic (**NEVER share it**).
6. Copy the mneumonic into the "Mnemonic" field in `config.json`.
7. Comment out the account creator.
8. Run `bun start` again to get the bot's Session ID, which you can use to message the bot.

___

## Command handling
While the command handler is in the works, I resorted to using a simple switch() statement.
I know, this is not the best solution, but at least it works...

#### Production notice
**At its current state, this project is not meant for production and should only be used for development or to be taken as an example**

## License

Apache 2.0