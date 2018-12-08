let config = {
    PORT : '3300',
    SECRET: '35625&*^%%67$%hjh%^',
    DBURL: 'mongodb://brajesh:brajesh123@ds127944.mlab.com:27944/addressbook',
    DOMAIN: '@inmar.com'
}

const Initialize = function() {
    ['PORT', 'SECRET', 'DBURL', 'DOMAIN'].map(param => {
        if(process.env[param]) {
            config[param] = process.env[param]
            console.log(param, config[param])
        }
    })
    return config
}

module.exports = { Initialize, config }