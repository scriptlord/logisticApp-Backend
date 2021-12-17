import { registerCustomer,bookOrder } from "../../model/customermodel/customer";
import express, { Request, Response, NextFunction, response } from "express";
const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
    let data = await registerCustomer(
        req.body.name,
        req.body.address,
        req.body.phone,
        req.body.email,
        req.body.user_type
        );
        res.send({status:'success',data});
});
router.post("/bookorder", async (req: Request, res: Response) => {
    let data = await bookOrder(
        req.body.customer_id,
        req.body.pick_address,
        req.body.delivery_address,
        req.body.product_name,
        req.body.product_category,
        req.body.recipient_name,
        req.body.order_status,
        req.body.weight,
        );     
        res.send({status:'success',data});
});

export default router