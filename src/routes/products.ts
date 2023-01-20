import { Router } from "express";
const router = Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Get Products",
  });
});

router.post("/", (req, res, next) => {
  const product = req.body.product;

  res.status(200).json({
    message: "Post Products",
    product: product,
  });
});

export default router;
