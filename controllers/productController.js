import Product from "../schemas/product.js";

async function add(req, res){
    try{
        if(req.accessToken.type !== "admin"){
            throw new Exception("unauthorized");
        }

        if(!req.body.name || !req.body.description || !req.body.price || !req.body.images || !req.body.category) {
            throw new Error('Required fields are empty');
        }
        const product =  new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            images: req.body.images,
            category: req.body.category
        });
        await product.save();
        res.status(201)
        .send('Product added');
        
    }catch(err){
        res.json(err);
    }
    
}

async function edit(req, res){
    try{
        if(req.accessToken.type !== "admin"){
            throw new Exception("unauthorized");
        }
        const productId = req.params.productId;
        const updateData = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updateData },
            { new: true, runValidators: true }
          );
          if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found' });
          }

        res.send(updatedProduct);
    }catch(err){
        res.json(err);
    }
    
}

async function get(req, res){
    const { name, category, minPrice, maxPrice } = req.query;
    try {
        const products = await searchProducts({ name, category, minPrice, maxPrice });
        res.status(200).json(products);
    }catch(err){
        res.json(err);
    }
    
}

async function searchProducts({ name, category, minPrice, maxPrice }) {
    try {
        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive regex search
        }

        if (category) {
            query.category = category;
        }

        if (minPrice !== undefined && maxPrice !== undefined) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice !== undefined) {
            query.price = { $gte: minPrice };
        } else if (maxPrice !== undefined) {
            query.price = { $lte: maxPrice };
        }

        const products = await Product.find(query);
        return products;
    } catch (err) {
        console.error('Error searching products:', err);
        throw err;
    }
}

async function remove(req, res){
    try{
        if(req.accessToken.type !== "admin"){
            throw new Exception("unauthorized");
        }

        await Product.findByIdAndDelete(req.params.productId);
        res.status(204)
        .send('Product deleted');
    }catch(err){
        res.json(err);
    }
    
}

export default {
    add,
    edit,
    get,
    remove
}