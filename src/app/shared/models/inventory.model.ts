import {Catalog} from './catalog.model';
import {ProductImage} from './productimage.model';
import {Error} from './error.model';

export class Inventory {
    public id: number;
    public productid: number;
    // public isfeatured: boolean;
    // public isnew: boolean;
    // public isbestseller: boolean;
    // public ishot: boolean;
    // public isdeal: boolean;
    // public issale: boolean;
    // public sku: string;
    public instock: number;
    public ordered: number;
    public reserved: number;
    public unitprice: number;
    public discount: number;
    public color:string;
    public error: Array<Error>;
    public url: string;
    public size:string;
    public ProductImages:Array<ProductImage>;
    constructor(){
        this.url = '';
        this.color = '#000';
        this.id=0;
        this.productid=0;
        this.size='';
        // this.sku='';
        this.instock=0;
        this.ordered=0;
        this.reserved=0;
        this.unitprice=0.00;
        this.discount=0.0;
        this.error = new Array<Error>();
        this.error=[
            new Error('sku','','invalid name',false),
            new Error('ProductId','','invalid product id',false),
            new Error('sku','','invalid sku',false),
            new Error('unitprice','','invalid unit price',false),
            new Error('discount','','invalid discount value',false),
        ];
        // this.isfeatured=false;
        // this.isnew=false;
        // this.isbestseller=false;
        // this.ishot=false;
        // this.isdeal=false;
        // this.issale=false;
            
    }
}
