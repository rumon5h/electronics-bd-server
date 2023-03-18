const Products = require('../models/Products');

exports.getProductsService = async (filter, queries) => {
    const result = await Jobs.find(filter)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
        .select(queries.fields)
    return result;
}