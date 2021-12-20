module.exports = (async () => {
    console.log('debug', 'Loading globals...');
    global.guild = await client.guilds.fetch(process.env.GUILD_ID)
    global.channels = await guild.channels.fetch()
    global.general = channels.find(c => c.name === 'general' && c.isText())
    global.afkChannel = channels.find(c => c.name.includes('afk') && c.isVoice() && c.parentId === '897284115236261918') || '922300400147759105'
})