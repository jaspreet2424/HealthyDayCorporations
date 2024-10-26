const ProductQueries = `
    getAllProducts : [Product]!
    getSingleProduct(id : ID!) : Product!
    getQueryFilterProducts(filterquery : String!) : [Product]!
`

module.exports = {ProductQueries};