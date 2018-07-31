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

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate({
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debits.value"}}
    }, {
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, {
        $project: {_id: 0, credit: 1, debt: 1}
    }, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })

})

module.exports = BillingCycle