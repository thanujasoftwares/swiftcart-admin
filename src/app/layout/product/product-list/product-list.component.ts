import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService} from '../../../shared/services/product.service';
import {MenuService} from '../../../shared/services/menu.service';
import {Product} from '../../../shared/models/product.model';
import {Menu} from '../../../shared/models/menu.model';
import {ProductImage} from '../../../shared/models/productimage.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products:Array<Product>;
  public newproducturl:string;
  constructor(
    public productService:ProductService,
    private menuService:MenuService,
    private route: ActivatedRoute
  ) {
    this.newproducturl='/products/new';
   }

  ngOnInit() {
    this.productService
    .get({include:['productimages','ratings']})
    .subscribe((products) => {
      this.products = products;
      _.map(products,(product,index)=>{
        product.agegroup=product.agegroup.trim();
        product.url='/products/'+product.id;
        var primaryImage = new ProductImage();
        primaryImage.path="http://placehold.it/";
        primaryImage.lg="200x200";
        if(product.ProductImages.length<=0){
          product.ProductImages.push(primaryImage);
        }
      });
    })
}

}
