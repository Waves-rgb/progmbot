require('./utils/globals.js')
require('./utils/console')

const modulesDir = path.join(__dirname, 'modules')

fs.readdirSync(modulesDir).forEach(module => {
    console.log('debug', `Loading ${module}.`)

    const target = path.join(modulesDir, module)

    if (target.endsWith('.js'))
        require(target)

    if (fs.statSync(target).isDirectory())
        require(`${target}/index.js`)
});

console.log('debug', 'Loading complete.')