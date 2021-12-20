const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

let embeds = {}
let ignoreChannelIds = []

client.on('channelDelete', async channel => {
    if (ignoreChannelIds.includes(channel.id)) return
    const guild = channel.guild
    const general = await guild.channels.fetch('705226361043681360')
    const auditLogs = await guild.fetchAuditLogs()
    const replacement = await guild.channels.create(channel.name, {
        parent: channel.parent,
        type: channel.type,
        permissionOverwrites: await channel.permissionOverwrites.resolve(), 
        position: channel.rawPosition, 
        rtcRegion: channel.rtcRegion, 
        topic: channel.topic, 
        nsfw: channel.nsfw, 
        rateLimitPerUser: channel.rateLimitPerUser, 
        bitrate: channel.bitrate, 
        userLimit: channel.userLimit, 
        reason: 'Automatic replacement of deleted channel'
    })
    const deletedBy = auditLogs.entries.first().executor
    const embed = new MessageEmbed()
        .setTitle('Channel Deleted')
        .setDescription(`Channel #${channel.name} was deleted by ${deletedBy.tag}, and was replaced automatically.\nPress delete to permanently delete the channel.`)
        .setColor(accentColor)
        .setAuthor(deletedBy.tag, deletedBy.displayAvatarURL())
        .setTimestamp()

    const button = new MessageButton()
        .setCustomId('btn_del_channel')
        .setStyle('DANGER')
        .setLabel('Delete')

    const action = new MessageActionRow()
        .addComponents(button)

    const msg = await general.send({embeds:[embed], components: [action]})

    embeds[msg.id] = replacement
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return
    if (interaction.customId !== 'btn_del_channel') return
    if (!interaction.memberPermissions.has('MANAGE_CHANNELS')) return interaction.reply({ephemeral: true, content: 'You do not have permission to delete channels.'})

    const channel = embeds[interaction.message.id]
    ignoreChannelIds.push(channel.id)
    await channel.delete()
    await interaction.message.delete()
    await interaction.reply({ephemeral: true, content: 'Channel deleted.'})
})