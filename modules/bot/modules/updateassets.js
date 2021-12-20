const download = require('download')

function updateAssets(guildData) {
    if (guildData.name !== client.user.username)
        client.user.setUsername(guildData.name)

    let updateAvatar = true

    fs.readdirSync(storageDir).forEach(file => {
        if (file.includes(guildData.icon))
            updateAvatar = false
    })

    if (updateAvatar)
        download(guildData.iconURL(), storageDir).then(() => {
            client.user.setAvatar(storageDir + guildData.iconURL().split('/').pop())
        })
}

client.on('ready', async () => {
    const guild = await client.guilds.fetch(process.env.GUILD_ID)
    updateAssets(guild)
})

client.on('guildUpdate', (oldGuild, newGuild) => {
    updateAssets(newGuild)
})