const Products = require('../models/Products');

exports.getProductsService = async (filter, queries) => {
    const result = await Products.find(filter)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
        .select(queries.fields)
    return result;
}

exports.createProductService = async (data) => {
    const result = await Products.create(data);

    return result;
}

exports.getAProductByIdService = async (id) => {
    const newViews = await Products.updateOne({_id: id}, {$inc: {views: 1}});
    const result = await Products.findById({_id: id});

    return result;
}

exports.getTrendingProductsService = async () => {
    const result = await Products.find({}).sort({views: -1}).limit(3);
    return result;
}

exports.getCheapestProductsService = async () => {
    const result = await Products.find({}).sort({price: 1}).limit(3);
    return result;
}