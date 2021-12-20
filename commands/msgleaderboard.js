const { ObjectID } = require("bson")

module.exports = {
    name: 'msgleaderboard',
    description: 'Posts the message leader-board.',
    async execute(interaction) {
        if (!dbReady || !msgCountCollection) return interaction.reply('The database is not ready yet.')
        const msgCounts = await msgCountCollection.find({}).sort({ count: -1 }).limit(10).toArray()
        const tot = await msgCountCollection.findOne({_id: new ObjectID('61a6fceba3440b3372bd1396')})
        let output = []
        let i = 1;
        for (const count of msgCounts) {
            output.push(`${i}. <@${count.id}> - ${count.count} messages (${(count.count / tot.totalSum*100).toFixed(2)}%)`)
            ++i
        }
        
        const embed = new Discord.MessageEmbed()
            .setTitle('Message leader-board')
            .setColor(accentColor)
            .setDescription(output.join('\n'))
            
        await interaction.reply({embeds:[embed]})
    }
}