const { Client, Intents } = require('discord.js');
global.client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES]});

const modulesDir = path.join(__dirname, 'modules')

client.on('ready', async () => {
    console.log('info', `Bot is ready and logged in as ${client.user.tag}!`)
    await require('./utils/globals.js')()
    fs.readdirSync(modulesDir).forEach(function(file) {
        console.log('debug', `Loading module ${file}.`)

        if (file.indexOf('.js') != -1)
            require(path.join(modulesDir, file))
    })
    console.log('debug', `Bot is completely loaded.`)
})

client.login(process.env.BOT_TOKEN)
