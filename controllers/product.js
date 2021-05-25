const Model = require('../model');
const {Product} = Model;

const productController = {
  all(req, res) {
    // Returns all products
    Product.find().sort({ '_id': -1 })
    // alongside it's manufacturer
    // information
      .populate('manufacturer')
      .exec((err, products) => res.json(products))
  },
  byId(req, res) {
    const idParam = req.params.id;
    // Returns a single product
    // based on the passed in ID parameter
    Product
      .findOne({_id: idParam})
      // as well as it's manufacturer
      .populate('manufacturer')
      .exec((err, product) => res.json(product));
  },
  create(req, res) {
    const requestBody = req.body;
    // Creates a new record from a submitted form
    const newProduct = new Product(requestBody);
    // and saves the record to
    // the data base
    newProduct.save((err, saved) => {
      // Returns the saved product
      // after a successful save
      Product
        .findOne({_id: saved._id})
        .populate('manufacturer')
        .exec((err, product) => res.json(product));
    })
  },
  update(req, res) {
    const idParam = req.params.id;
    let product = req.body;
    // Finds a product to be updated
    Product.findOneAndUpdate({_id: idParam}, product, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(result)
    })
  },
  remove(req, res) {
    const idParam = req.params.id;
    // Removes a product
    Product.findOne({_id: idParam}).remove((err, removed) => res.json(idParam))
  }
};

module.exports = productController;
