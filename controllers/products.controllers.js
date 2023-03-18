const { getProductsService } = require("../services/products.services");

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

