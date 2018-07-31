const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get', 'post', 'put', 'delete']) //Select, Insert, Update, delete -- Respectivamente
BillingCycle.updateOptions({
    new: true, //Quando der um update, retorna o objeto novo, com as informações alteradas (por default retorna o objeto antigo, sem alterações)
    runValidators: true //Força as validações definidas no ODM tamém para update (por default são aplicadas somente no insert - post)
})

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})


module.exports = BillingCycle
