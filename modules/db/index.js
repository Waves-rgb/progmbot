const { MongoClient } = require('mongodb');
// const { restart, setMax, success, getCurrentCount } = require('../../utils/restart');
const { EventEmitter } = require('events');

// setMax('db_fail', 5)

const certsDir = path.join(__dirname, 'certs');
const certPath = isDeploy ? certsDir + '/bot_deploy.pem' : certsDir + '/bot_local.pem';

global.mongoClient = new MongoClient(process.env.DB_CON_STR, {
    sslKey: certPath,
    sslCert: certPath
})

global.dbReady = false
global.db = null;

(async () => {
    console.log('debug', 'Connecting to database...');
    try {
        await mongoClient.connect()
        console.log('debug', 'Connected to database.')
        global.dbReady = true
        global.db = await mongoClient.db('BotData')
        global.vcTimeCollection = await db.collection('VcTime')
        global.msgCountCollection = await db.collection('MessageCount')
    } catch (err) {
        console.error(err)
        console.log('error', 'Failed to connect to database. Cannot continue!')
        process.exit(1)
    }
})()