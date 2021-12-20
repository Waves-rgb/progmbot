const chalk = require('chalk')
const stripAnsi = require('strip-ansi')

global.LOG_LEVELS = [
    'debug',
    'info',
    'warn',
    'error'
]

function levelToColor(level) {
    switch (level) {
        case 'debug':
            return chalk.green
        case 'info':
            return chalk.white
        case 'warn':
            return chalk.yellow
        case 'error':
            return chalk.red
    }
}

function appendLog(arg) {
    fs.appendFileSync(path.join(__dirname, '../log.txt'), arg + '\n')
}

appendLog('\n-=-= BEGIN LOG =-=-')
appendLog(`-=-= ${new Date().toString()} =-=-`)
appendLog(`-=-= ${isDeploy ? 'DEPLOY' : 'DEBUG'} =-=-\n`)

const output = fs.createWriteStream('../log.txt', { flags: 'w' })

console.oLog = console.log
console.log = function (...args) {
    let level = 'info'
    args.forEach(arg => { 
        if (LOG_LEVELS.includes(arg)) {
            level = arg
            const index = args.indexOf(arg)
            args.splice(index, index + 1)
        }
    })

    const now = new Date()
    const messageParts = [ 
        levelToColor(level)(`[${level.substr(0,1).toUpperCase()}]`),
        chalk.magenta(`[${now.toTimeString().split(' ')[0]}]`),
    ]
    if ((isDeploy && level !== 'debug') || !isDeploy)
        console.oLog(messageParts.join(' '), ...args)

    appendLog(stripAnsi(messageParts.join(' ')) + ' ' + args.join(' '))
}

console.log('info', 'Logging initialized.')