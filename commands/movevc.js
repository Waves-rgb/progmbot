module.exports = {
    name: 'movevc',
    description: 'Moves everyone in one vc to another.',
    options: [
        {
            name: "from",
            description: "The channel to move the users from.",
            type: 7,
            required: true,
            channel_types: [2]
        },
        {
            name: "to",
            description: "The channel to move the users to.",
            type: 7,
            required: true,
            channel_types: [2]
        }
    ],
    async execute(interaction) {
        interaction.deferReply()
        const from = interaction.options.getChannel("from")
        const to = interaction.options.getChannel("to")

        if (!interaction.memberPermissions.has('MOVE_MEMBERS')) return interaction.followUp("You don't have permission to move members.")
        if (!from || !to) return interaction.followUp("Invalid channel(s).")
        if (!from.isVoice() || !to.isVoice()) return interaction.followUp("Both channels must be voice channels.")
        
        const members = from.members.size

        from.members.forEach(member => {
            member.voice.setChannel(to.id)
        })

        interaction.followUp(`Moved ${members} users from \`${from.name}\` to \`${to.name}\`.`)
    }
}