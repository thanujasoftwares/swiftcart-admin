import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ColorPickerModule } from 'angular4-color-picker';
import { FileUploadModule } from "ng2-file-upload";

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { PageHeaderModule } from './../../shared';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import {ProductService} from '../../shared/services/product.service';
import {MenuService} from '../../shared/services/menu.service';
import {InventoryService} from '../../shared/services/inventory.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductRoutingModule,
        PageHeaderModule,
        Ng2AutoCompleteModule,
        ColorPickerModule,
        FileUploadModule
    ],
    declarations: [
        ProductComponent,
        ProductListComponent,
        ProductNewComponent,
        ProductViewComponent,
        ProductEditComponent,
    ],
    providers: [ProductService,MenuService,InventoryService]
})
export class ProductModule { }
