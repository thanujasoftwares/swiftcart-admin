import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {ProductService} from '../../../shared/services/product.service';
import {MenuService} from '../../../shared/services/menu.service';
import {InventoryService} from '../../../shared/services/inventory.service';
import {Product} from '../../../shared/models/product.model';
import {ProductImage} from '../../../shared/models/productimage.model';
import {Inventory} from '../../../shared/models/inventory.model';
import {Menu} from '../../../shared/models/menu.model';
import {ColorPickerService} from 'angular4-color-picker';
import * as _ from 'lodash';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  public product:Product;
  public menu:Menu;
  public menuitems:Array<Menu>;
  public categories:Array<String>;
  public subcategories:Array<String>;
  // public colorpalatte=[
  //   ["#f9ebea","#f2d7d5","#e6b0aa","#d98880","#cd6155","#c0392b","#a93226","#922b21","#7b241c","#641e16"],
  //   ["#fdedec","#fadbd8","#f5b7b1","#f1948a","#ec7063","#e74c3c","#cb4335","#b03a2e","#943126","#78281f"],
  //   ["#f5eef8","#ebdef0","#d7bde2","#c39bd3","#af7ac5","#9b59b6","#884ea0","#76448a","#633974","#512e5f"],
  //   ["#f4ecf7","#e8daef","#d2b4de","#bb8fce","#a569bd","#8e44ad","#7d3c98","#6c3483","#5b2c6f","#4a235a"],
  //   ["#eaf2f8","#d4e6f1","#a9cce3","#7fb3d5","#5499c7","#2980b9","#2471a3","#1f618d","#1a5276","#154360"],
  //   ["#ebf5fb","#d6eaf8","#aed6f1","#85c1e9","#5dade2","#3498db","#2e86c1","#2874a6","#21618c","#1b4f72"],
  //   ["#e8f8f5","#d1f2eb","#a3e4d7","#76d7c4","#48c9b0","#1abc9c","#17a589","#148f77","#117864","#0e6251"],
  //   ["#e8f6f3","#d0ece7","#a2d9ce","#73c6b6","#45b39d","#16a085","#138d75","#117a65","#0e6655","#0b5345"],
  //   ["#e9f7ef","#d4efdf","#a9dfbf","#7dcea0","#52be80","#27ae60","#229954","#1e8449","#196f3d","#145a32"],
  //   ["#eafaf1","#d5f5e3","#abebc6","#82e0aa","#58d68d","#2ecc71","#28b463","#239b56","#1d8348","#186a3b"],
  //   ["#fef9e7","#fcf3cf","#f9e79f","#f7dc6f","#f4d03f","#f1c40f","#d4ac0d","#b7950b","#9a7d0a","#7d6608"],
  //   ["#fef5e7","#fdebd0","#fad7a0","#f8c471","#f5b041","#f39c12","#d68910","#b9770e","#9c640c","#7e5109"],
  //   ["#fdf2e9","#fae5d3","#f5cba7","#f0b27a","#eb984e","#e67e22","#ca6f1e","#af601a","#935116","#784212"],
  //   ["#fbeee6","#f6ddcc","#edbb99","#e59866","#dc7633","#d35400","#ba4a00","#a04000","#873600","#6e2c00"],
  //   ["#fdfefe","#fbfcfc","#f7f9f9","#f4f6f7","#f0f3f4","#ecf0f1","#d0d3d4","#b3b6b7","#979a9a","#7b7d7d"],
  //   ["#f8f9f9","#f2f3f4","#e5e7e9","#d7dbdd","#cacfd2","#bdc3c7","#a6acaf","#909497","#797d7f","#626567"],
  //   ["#f4f6f6","#eaeded","#d5dbdb","#bfc9ca","#aab7b8","#95a5a6","#839192","#717d7e","#5f6a6a","#4d5656"],
  //   ["#f2f4f4","#e5e8e8","#ccd1d1","#b2babb","#99a3a4","#7f8c8d","#707b7c","#616a6b","#515a5a","#424949"],
  //   ["#ebedef","#d6dbdf","#aeb6bf","#85929e","#5d6d7e","#34495e","#2e4053","#283747","#212f3c","#1b2631"],
  //   ["#eaecee","#d5d8dc","#abb2b9","#808b96","#566573","#2c3e50","#273746","#212f3d","#1c2833","#17202a"]
  // ];
  public productEditLink:String;
  public newinventory:Inventory;
  public showAddInventory:boolean;
  public showAddImages:boolean;
  public sizes:Array<string>;
  public fileuploader:FileUploader;
  public invfileuploader:FileUploader;
  public primaryImage:ProductImage;
  public hasPrimaryImage:boolean;
  constructor(
    public productService:ProductService,
    private menuService:MenuService,
    private inventoryService:InventoryService,
    private route: ActivatedRoute,
    private cpService: ColorPickerService
  ) { 
    this.hasPrimaryImage=false;
    this.fileuploader = new FileUploader({url: ''});
    this.invfileuploader = new FileUploader({url: ''});
    
    this.showAddInventory=false;
    this.showAddImages=false;
    this.sizes=new Array<string>();
    this.newinventory=new Inventory();
    this.product = new Product();
    this.menuitems = new Array<Menu>();
    this.primaryImage = new ProductImage();
    this.primaryImage.path="http://placehold.it/";
    this.primaryImage.lg="200x200";

    menuService.get({vendorid:0})
        .subscribe((menuitems) => {
          let categories=[];
          let subcategories=[];
          menuitems.map((menuitem,index)=>{
            this.menuitems.push({
              id: menuitem.id,
              category:menuitem.category,
              subcategory:menuitem.subcategory
            });
            categories.push(menuitem.category);
            subcategories.push(menuitem.subcategory);
          });
          this.categories = _.uniq(categories);
          this.subcategories = _.uniq(subcategories);
      },err => {console.log(err);});
    
  }
  toggleImageForm(){
    this.showAddImages=!this.showAddImages;
    this.fileuploader = new FileUploader({url: environment.api.products.url+'/'+this.product.id+'/images'});
    //this.fileuploader.onCompleteItem(item,response,status,Headers)
    this.fileuploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      var jsonobj=JSON.parse(response);
      var image = new ProductImage();
      image.path=jsonobj.images[0].path;
      image.actual=jsonobj.images[0].actual;
      image.xl=jsonobj.images[0].xl;
      image.lg=jsonobj.images[0].lg;
      image.md=jsonobj.images[0].md;
      image.sm=jsonobj.images[0].sm;
      image.xs=jsonobj.images[0].xs;
      this.product.ProductImages.push(image);

      if(this.product.ProductImages.length==1){
        this.primaryImage=this.product.ProductImages[0];
      }

    };
  }
  toggleInventoryForm(){
    this.showAddInventory=!this.showAddInventory;
    this.invfileuploader = new FileUploader({url: environment.api.products.url+'/'+this.product.id+'/dummy'});
    this.newinventory= new Inventory();
  }
  editInventory(i){
    this.newinventory=JSON.parse(JSON.stringify(this.product.Inventories[i]));
    this.invfileuploader = new FileUploader({url: environment.api.products.url+'/'+this.product.id+'/inventory/'+this.newinventory.id+'/images'});    
    this.showAddInventory = true;
  }
  copyInventory(i){
    this.newinventory=JSON.parse(JSON.stringify(this.product.Inventories[i]));
    this.newinventory.productid=0;
    this.showAddInventory = true;
  }
  addInventory(){
    this.newinventory.productid=this.product.id;
    this.inventoryService.add(this.newinventory).subscribe((inventory)=>{
      if(inventory){
        inventory.productid=this.product.id;
        this.product.Inventories.push(inventory);
        if(this.invfileuploader.queue.length>0){
          this.invfileuploader.setOptions({url: environment.api.products.url+'/'+this.product.id+'/inventory/'+inventory.id+'/images'});
          this.invfileuploader.uploadAll();
          this.invfileuploader.onCompleteAll = () =>{
            this.editInventory(this.product.Inventories.length-1);
          }
        }else{
          this.editInventory(this.product.Inventories.length-1);
        }
        
      }
    },(err)=>{
      console.log(err);
    })
  }
  updateInventory(){
    if(this.invfileuploader.queue.length>0){
      this.invfileuploader.setOptions({url: environment.api.products.url+'/'+this.product.id+'/inventory/'+this.newinventory.id+'/images'});
      this.invfileuploader.uploadAll();
      this.invfileuploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        var jsonobj=JSON.parse(response);
        var image = new ProductImage();
        image.path=jsonobj.images[0].path;
        image.actual=jsonobj.images[0].actual;
        image.xl=jsonobj.images[0].xl;
        image.lg=jsonobj.images[0].lg;
        image.md=jsonobj.images[0].md;
        image.sm=jsonobj.images[0].sm;
        image.xs=jsonobj.images[0].xs;
        this.newinventory.ProductImages.push(image);
  
        if(!this.hasPrimaryImage && this.newinventory.ProductImages.length==1){
          this.primaryImage=this.newinventory.ProductImages[0];
        }


        this.product.Inventories.map((inv,index)=>{
          console.log(inv);
          if(inv.id==this.newinventory.id){
            this.product.Inventories[index]['ProductImages']=this.newinventory.ProductImages;
          }
        });
        

      };
    }
    this.inventoryService.update(this.newinventory).subscribe((response)=>{
      if(response){
        this.product.Inventories.map((inv,index)=>{
          if(inv.id==this.newinventory.id){
            this.product.Inventories[index]=JSON.parse(JSON.stringify(this.newinventory));
          }
        });
      }
    },(err)=>{
      console.log(err);
    })
  }  

  imageUploaded(){
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productService
        .get({id:params['id'],'include':['inventory','ratings']})
        .subscribe((products) => {
          this.product = products[0];
          this.product.agegroup=this.product.agegroup.trim();
          this.product.url='/products/'+this.product.id;
          this.productEditLink='/products/'+this.product.id+'/edit';
          this.fileuploader = new FileUploader({url: environment.api.products.url+'/'+this.product.id+'/images'});
          let sizes=[];
          this.product.Inventories.map((inv,index)=>{
            sizes.push(inv.size);
            console.log(inv);
            
            if(!this.hasPrimaryImage && inv.ProductImages.length>0){
              this.primaryImage = inv.ProductImages[0];
              this.hasPrimaryImage=true;
            }
          });
          this.sizes = _.uniq(sizes);
        });
    });
  }

}
