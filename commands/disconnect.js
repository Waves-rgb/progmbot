const { ObjectID } = require('bson')

module.exports = {
    name: 'disconnect',
    description: 'Disconnects someone from the vc.',
    options: [
        {
            name: 'user',
            description: 'The channel to move the users from.',
            type: 6,
            required: true
        },
    ],
    async execute(interaction) {
        interaction.deferReply()
        const member = interaction.options.getMember('user')
        
        if (!interaction.memberPermissions.has('MOVE_MEMBERS')) return interaction.followUp('You don\'t have permission to disconnect members.')
        if (!member) return interaction.followUp('You must specify a user to disconnect.')
        if (!member.voice) return interaction.followUp('That user is not in a voice channel.')
        
        member.voice.setChannel(null)
        member.send(`You have been le epic trolled by ${interaction.member.displayName}. :trol:`)
        interaction.followUp(`Disconnected \`${member.user.tag}\` from the voice channel.`)
    }
}