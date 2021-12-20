const { joinVoiceChannel, AudioPlayer, createAudioResource } = require('@discordjs/voice');

let roleList = {}

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.member.user.bot) return;
    if (!newState.member.voice) return
    if (!newState.channel) return
    if (newState.channelId === '922300318878933043') {
        await playClip(newState.channel.id)
        newState.channel.members.forEach(e => {
            if (e.user.bot) return
            if (!e.voice) return
            if (e.voice.channel.id !== '922300318878933043') return
            e.voice.setChannel(null)
        })
    }

    if (newState.channelId === '922302715286134825') {
        newState.member.voice.setChannel(oldState.channelId)
    }

    if (newState.channelId === '922300377045565440') {
        // await playClip(newState.member.voice.channelId)
        // // if (!newState.member.kickable) return newState.member.voice.setChannel(null)
        // roleList[newState.member.id] = newState.member.roles
        // // await newState.member.send('it said do not join dummy!!! https://discord.gg/PEh5UBZYst')
        // // await newState.member.kick('No joining')
        // console.log(roleList)
        await playClip(newState.channel.id)
        newState.channel.members.forEach(async e => {
            if (e.voice.channel.id !== '922300377045565440') return
            if (e.kickable) {
                await e.send('it said do not join dummy!!! https://discord.gg/u3EgBUgMvX')
                return e.kick()
            }
            if (e.voice) e.voice.setChannel(null)
        })
    }
})

async function playClip(channelId) {
    return new Promise(async (resolve, reject) => {
        const connection = joinVoiceChannel({
            channelId: channelId,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });
        const ap = new AudioPlayer(connection)
        ap.play(createAudioResource(path.join(storageDir, 'audio', 'nojoining.mp3')))
        const subscription = connection.subscribe(ap);
        const interval = setInterval(async () => {
            if (ap.state.status === 'idle') {
                subscription.unsubscribe();
                connection.disconnect();
                clearInterval(interval);
                resolve();
            }
        }, 100);
    })
}

// client.on('')