import { Product } from "./product";

export class AddToCart {
    id!:number;
    name!:string;
    price!:number;
    quantity!:number;
    image_url!:string;
    quantityInstock!:number;
    constructor(product:Product)
    {
        this.id=product.id;
        this.name=product.name;
        this.price=product.price;
        this.quantity=0;
        this.image_url=product.image_url
    }
}
