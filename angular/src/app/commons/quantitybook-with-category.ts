import { Category } from "./category";

export class QuantitybookWithCategory {
    cat!:Category;
    quantitybook!:number;
    constructor(cat:Category,quantity:number)
    {
        this.cat=cat;
        this.quantitybook=quantity;
    }
}
