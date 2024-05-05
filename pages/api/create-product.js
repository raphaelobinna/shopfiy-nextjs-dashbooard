const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: "quickstart-e694acfb",
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
});

const createProducts = async (req, res) => {
  await shopify.product
    .create({
      ...req.body,
    })
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(400).json(err));
};

export default createProducts;
