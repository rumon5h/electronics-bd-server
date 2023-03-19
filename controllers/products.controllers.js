const {
    getProductsService,
    createProductService,
    getAProductByIdService,
    getTrendingProductsService,
    getCheapestProductsService
} = require("../services/products.services");

exports.getAllProduct = async (req, res) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit'];

        excludeFields.forEach(field => delete filters[field]);

        let filterStrings = JSON.stringify(filters);

        filterStrings = filterStrings.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filterStrings);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join();
            queries.sortBy = sortBy;
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt((limit));
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const products = await getProductsService(filters, queries)

        res.status(200).json({
            status: "Success",
            message: " Successfully got all the product",
            data: products
        })
    } catch (error) {
        res.status(200).json({
            status: "failed",
            message: "failed to get the products",
            error: error.message
        })
    }
}

exports.createNewProduct = async (req, res, next) => {
    try {
        const result = await createProductService(req.body);
        res.status(200).json({
            status: "Success",
            message: "Successfully created new product",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Failed to create new product",
            error: error.message,
        });
    }
};


exports.getAProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getAProductByIdService(id);

        res.status(200).json({
            status: "Success",
            message: "Successfully get the product",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Failed to get the product.",
            error: error.message
        })
    }
}

exports.getTrendingProducts = async (req, res, next) => {
    try {
        const result = await getTrendingProductsService();

        res.status(200).json({
            statusbar: "Success",
            message: "Successfully get the trending products",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Failed to get the Trending products",
            error: error.message
        })
    }
}

exports.getCheapestProducts = async (req, res, next) => {
    try {
        const result = await getCheapestProductsService();

        res.status(200).json({
            statusbar: "Success",
            message: "Successfully get the cheapest products",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Failed to get the cheapest products",
            error: error.message
        })
    }
}