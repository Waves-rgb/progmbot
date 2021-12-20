let oldChannel = {}

client.on('voiceStateUpdate', (oldState, newState) => {
    try {
        if (newState.member.user.bot) return;
        if (!oldState.selfDeaf && newState.selfDeaf) {
            setTimeout(() => {
                try {
                    if (!newState.member.voice) return
                    if (newState.member.voice.streaming) return
                    if (!newState.member.voice.selfDeaf) return
                    console.log(`${newState.member.voice.channelId}`)
                    oldChannel[newState.member.id] = newState.member.voice.channel.id;
                    newState.member.voice.setChannel(afkChannel.id);
                } catch (e) {}
            }, 1000*60)
        }

        if (oldState.selfDeaf && !newState.selfDeaf) {
            newState.member.voice.setChannel(oldChannel[newState.member.id]);
        }
    } catch (e) {}
})