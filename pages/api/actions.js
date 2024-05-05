const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: "quickstart-e694acfb",
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
});

const getOrders = () => {};

const getProducts = async (req, res) => {
  await shopify.product
    .list({ limit: 5 })
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(400).json(err));
};

export default getProducts;
