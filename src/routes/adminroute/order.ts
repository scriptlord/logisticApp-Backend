import express, { Request, Response, NextFunction, response } from "express";
import {
  getAllOrder,
  addUserType,
  confirmOrder,
  getAllCustomer,
  getAllDriver,
  getAllPendingOrders,
} from "../../model/adminmodel/order";
const router = express.Router();

router.post("/delivery", async (req: Request, res: Response) => {
  res.send({ response: "no data found" });
});
router.post("/usertype", async (req: Request, res: Response) => {
  let ans = await addUserType();
  res.status(200).send({ response: "success", ans });
});
router.get("/vieworder", async (req: Request, res: Response) => {
  let data = await getAllOrder();
  res.status(200).send({ response: "success", data });
});

router.put("/confirmorder", async (req: Request, res: Response) => {
  let data = await confirmOrder(req.body.id);
  res.status(200).send({ response: "success", data });
});
router.get("/pendingorder", async (req: Request, res: Response) => {
  let data = await getAllPendingOrders();
  res.status(200).send({ response: "success", data });
});

router.get("/viewcustomers", async (req: Request, res: Response) => {
  let data = await getAllCustomer();
  res.status(200).send({ response: "success", data });
});
router.get("/viewdrivers", async (req: Request, res: Response) => {
  let data = await getAllDriver();
  res.status(200).send({ response: "success", data });
});

// router.put('*',(req,res)=>{
//     res.status(404).send('page not found')
// })

export default router
