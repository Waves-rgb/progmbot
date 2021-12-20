const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

global.commands = []

const rest = new REST({version: '9'}).setToken(process.env.BOT_TOKEN)

const commandsDir = path.join(__dirname, '../../../commands')

fs.readdirSync(commandsDir).forEach(f => {
    const target = path.join(commandsDir, f)
    let data = null

    console.log('debug', `Loading command ${f}.`)

    if (target.endsWith('.js'))
        data = require(target)

    if (fs.statSync(target).isDirectory())
        data = require(`${target}/index.js`)

    if (data.name === undefined || data === null)
        return console.log('error', `${f} is not a valid command.`)

    global.commands.push(data)
});

(async () => {
    try {
        console.log('Started refreshing application (/) commands.')
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
        console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
        console.error(error);
    }
})()

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() && !interaction.isButton()) return
    commands.forEach(cmd => {
        if (interaction.isCommand())
            if (interaction.commandName === cmd.name)
                cmd.execute(interaction)
        
        if (interaction.isButton())
            if (cmd.expectedButtons)
                if (cmd.expectedButtons.includes(interaction.buttonName))
                    cmd.executeButton(interaction)
    })
})