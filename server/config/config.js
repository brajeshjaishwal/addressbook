let config = {
    PORT : '3300',
    SECRET: '35625&*^%%67$%hjh%^',
    DBURL: 'mongodb://brajesh:brajesh123@ds127944.mlab.com:27944/addressbook',
}

const Initialize = function() {
    ['PORT', 'SECRET', 'DBURL'].map(param => {
        if(process.env[param]) {
            config[param] = process.env[param]
            console.log(param, config[param])
        }
    })
    return config
}

module.exports = { Initialize, config }