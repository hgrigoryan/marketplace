import express from "express";
import ProductController from "../controllers/productController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post("/add/:userId", verifyJWT, ProductController.add);
router.post("/edit/:userId/:productId", verifyJWT, ProductController.edit);
router.get("/view/:userId/:productId", verifyJWT, ProductController.get);
router.delete("/delete/:userId/:productId", verifyJWT, ProductController.remove)

export default router;