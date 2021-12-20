
global.accentColor = '#6c42f5'
global.fs = require('fs')
global.path = require('path')
global.version = '0.0.1'
global.Discord = require('discord.js')
global.storageDir = path.join(__dirname, '../storage')
global.rootDir = path.join(__dirname, '../')

require('dotenv').config()

global.isDeploy = process.env.NODE_ENV === 'production' || process.argv.includes('--deploy') || false