## Welcome to NEXBot Chat-over-resume template.


`npm create-nexbot-chat-over-resume`

This template allows you to instantly create a beautiful NextJS website with a chat interface. Any visitor will instantly be able to chat with a GPT-4 powered chatbot set up to discuss you're resume, or whatever data you have given it. This is a great way to impress potential employers and the best thing is they don't need to be bothered with any type of sign-in in order to use your custom bot.

Head over to [NEXBot.io](https://nexbot.io) to create, prompt, and upload documents to your bot. Set up only takes a few seconds, and your first 300 pages of text and 500 messages are FREE, with no subscription or payment information required.

After creating a bot you must set its `preloaded tokens` to whatever number of tokens you want to give it. If you give it your free 500 tokens, that means your visitors will be able to chat 500 times with your bot and you will have to buy new tokens to preload any other bots. You cand divide tokens among any number of bots and recover unsused tokens and reasign as you like, whenever you want.

Once you have created a bot and set up its preloaded-tokens, you have the option to make it private, or public. For the purposes of this template, we recomend setting and leaving it as private. This way you can change its settings (prompts and documents) whenever you like. Start a chat with your bot and go to your profile menu in the top-right, then select `developer`. Here you will see your bot's ID, which you need to set up this template. You will also be able to generate your server secret, add the secret to .env.local with the variable name: NEXBOT_SECRET.

You will find all site configuration data in `src/config/site.ts`, this is the only file you need to modify to make this template your own.

# Need more help?

Use a bot we've specially set up to help with setting up this template at [ResumeBotHelper](bots.nexbot.io/NWIxMzA2OQ)