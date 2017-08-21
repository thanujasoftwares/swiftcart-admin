//import {Menu} from './menu.model';
import {Catalog} from './catalog.model';
import {Inventory} from './inventory.model';
import {ProductImage} from './productimage.model';
import {Error} from './error.model';

export class Product {
    public id: number;
    public VendorId: number;
    public name: string;
    public category: string;
    public subcategory: string;
    public manufacturename: string;
    public modelno: string;
    public materialtype: string;
    public shortdesc: string;
    public longdesc: string;
    public gender: string;
    public agegroup: string;
    public isnew: boolean;
    public isfeatured: boolean;
    public isbestseller: boolean;
    public ishot: boolean;
    public isdeal: boolean;
    public issale: boolean;
    public sku: string;
    public Inventories:Array<Inventory>;
    public ProductImages:Array<ProductImage>;
    public error: Array<Error>;
    public url:string;
    constructor(){
        this.url = '';
        this.id=0;
        this.VendorId=0;
        this.name='Test Ng';
        this.category='ngcat';
        this.subcategory='ngsubcat';
        this.modelno='123';
        this.manufacturename='ng';
        this.materialtype='mt';
        this.shortdesc='test short desc';
        this.longdesc='test long desc';
        this.gender='m';
        this.agegroup='i';
        this.isfeatured=false;
        this.isnew=false;
        this.isbestseller=false;
        this.ishot=false;
        this.isdeal=false;
        this.issale=false;
        this.Inventories = new Array<Inventory>();
        this.error = new Array<Error>();
        this.error=[
            new Error('name','','invalid name',false),
            new Error('category','','invalid category',false),
            new Error('subcategory','','invalid subcategory',false),
            new Error('manufacturename','','invalid manufacture name',false),
            new Error('modelno','','invalid model no',false),
            new Error('shortdesc','','invalid short description',false),
            new Error('longdesc','','invalid long description',false),
            new Error('gender','','invalid gender',false),
            new Error('agegroup','','invalid age group',false),
            new Error('materialtype','','invalid material type',false),
        ];
    }
}
