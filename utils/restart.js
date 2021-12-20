const editJsonFile = require('edit-json-file')
const config = require('./restart.json')

const maxes = {}

module.exports = {
    setMax(reason, max) {
        maxes[reason] = max
    },
    restart(reason) {
        if (!reason) return console.log(`Restarting without reason...`)

        const ef = editJsonFile('./restart.json', {autosave:true})
        config.restartCount[reason] = config.restartCount[reason] ? config.restartCount[reason] + 1 : 1
    },
    getMax(reason) {
        return maxes[reason]
    },
    getCount(reason) {
        return config.restartCount[reason] || 1
    },
    success(reason) {
        if (!reason) return console.log(`Restarting without reason...`)

        const ef = editJsonFile('./restart.json', {autosave:true})
        config.restartCount[reason] = 0
    }
}