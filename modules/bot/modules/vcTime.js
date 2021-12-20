async function updateTime() {
    if (!vcTimeCollection)
        return

    (await guild.channels.fetch()).forEach(channel => {
        if (channel.type !== 'GUILD_VOICE')
            return

        if (channel.members.length < 1)
            return

        channel.members.forEach(async member => {
            if (member.user.bot) return
            if (!member.voice) return
            if (member.voice.selfDeaf || member.voice.selfMute) return

            const doc = await vcTimeCollection.findOne({userID: member.id})
            
            if (doc)
                await vcTimeCollection.updateOne({userID: member.id}, {$set: {minutes: doc.minutes + 1}})
            else
                await vcTimeCollection.insertOne({userID: member.id, minutes: 1})
        })
    })
}

setInterval(updateTime, 1000*60)