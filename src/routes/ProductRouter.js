const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.post('/create-product' , ProductController.createProduct)
router.put('/update-product/:id', authMiddleware, ProductController.updateProduct)
router.get('/get-details-product/:id', ProductController.getDetailsProduct)
router.delete('/delete-product/:id', authMiddleware, ProductController.deleteProduct)
router.get('/get-all-product', ProductController.getAllProduct)
router.post('/delete-all-product/:id', authMiddleware, ProductController.deleteAllProduct)
router.get('/get-all-type', ProductController.getAllTypeProduct)

module.exports = router;