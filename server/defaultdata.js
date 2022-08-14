const productdata = require("./constant/productsdata");
const Products = require("./models/productsSchema");

const DefaultData = async()=>{
    try {
        await Products.deleteMany({}); // clear previously added data
        const storeData = await Products.insertMany(productdata);
        // console.log(storeData);
    } catch (error) {
        console.log("error" + error.message);
    }
};

module.exports = DefaultData;