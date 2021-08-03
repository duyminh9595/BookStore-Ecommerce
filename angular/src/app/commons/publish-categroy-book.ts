import { Category } from "./category";
import { Product } from "./product";
import { Publisher } from "./publisher";
import { QuantitybookWithCategory } from "./quantitybook-with-category";

export class PublishCategroyBook {
    publisher!:Publisher;
    lsCat!:QuantitybookWithCategory[];
    constructor(publisher:Publisher)
    {
        this.lsCat=[];
        this.publisher=publisher;
    }
}
