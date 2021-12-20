const { ObjectID } = require("bson");

client.on('messageCreate', async msg => {
    if (msg.author.bot) return;
    const doc = await msgCountCollection.findOne({id: msg.author.id})
    if (doc)
        await msgCountCollection.updateOne({id: msg.author.id}, {$set: {count: doc.count + 1}})
    else
        await msgCountCollection.insertOne({id: msg.author.id, count: 1})

    const d2 = await msgCountCollection.findOne({_id: new ObjectID('61a6fceba3440b3372bd1396')})
    await msgCountCollection.updateOne({_id: d2._id}, {$set: {totalSum: d2.totalSum+1}})
})