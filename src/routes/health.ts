import { Response, Router } from "express";
const router = Router();

router.get("/", (req, res: Response, next) => {
  return res.status(200).send({
    message: "Healthy",
  });
});

export default router;
