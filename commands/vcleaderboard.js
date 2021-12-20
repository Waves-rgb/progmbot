const Duration = require("duration-js")

module.exports = {
    name: 'vcleaderboard',
    description: 'Posts the vc leader-board.',
    async execute(interaction) {
        if (!dbReady || !vcTimeCollection) return interaction.reply('The database is not ready yet.')
        const vcTime = await vcTimeCollection.find({}).sort({ minutes: -1 }).limit(10).toArray()

        let output = []
        let i = 1;
        for (const timeRecord of vcTime) {
            output.push(`${i}. <@${timeRecord.userID}> - ${new Duration(`${timeRecord.minutes}m`)}`)
            ++i
        }
        
        const embed = new Discord.MessageEmbed()
            .setTitle('VC leader-board')
            .setColor(accentColor)
            .setDescription(output.join('\n'))
            
        await interaction.reply({embeds:[embed]})
    }
}