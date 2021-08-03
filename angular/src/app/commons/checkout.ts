import { Order } from "./order";
import { OrderDetail } from "./order-detail";

export class Checkout {
    email!:string;
    order!:Order;
    orderDetails!:OrderDetail[];
}
