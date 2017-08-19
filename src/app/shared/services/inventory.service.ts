import { Injectable,EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inventory }           from '../models/inventory.model';
import { Menu }           from '../models/menu.model';
import { Catalog }           from '../models/catalog.model';
import {environment} from '../../../environments/environment';


// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class InventoryService {

  private productApi=environment.api.products;
  constructor (private http: Http) {}

//   getCategories(params: Object): Observable<Menu[]>{
//         let options       = new RequestOptions({ params: params });
//         return this.http.get(this.productApi.url+'/categories')
//                 // ...and calling .json() on the response to return data
//                 .filter((res:Response)=>{
//                     return res.json().status!=200
//                 })
//                 .map((res:Response,ind) => {
//                         return JSON.parse(res.json().menu)
//                 })
//                 //...errors if any
//                 .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
//   }

  get(params: Object): Observable<Inventory[]>{
        let options       = new RequestOptions({ params: params });
        return this.http.get(this.productApi.url+'/'+params['ProductId']+'/inventory',options)
                // ...and calling .json() on the response to return data
                .filter((res:Response)=>{
                    return res.json().status!=200
                })
                .map((res:Response,ind) => {
                        return JSON.parse(res.json().inventories)
                })
                //...errors if any
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
  }

  add(body: Object): Observable<Inventory> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this.productApi.url+'/'+body['ProductId']+'/inventory', body, options) // ...using post request
                        .map((res:Response,ind) => {
                          return res.json().inventories
                        })
                        // ...and calling .json() on the response to return data
                      .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
    //return null;
  }              


  update(body: Object): Observable<any> {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option
      
      return this.http.put(this.productApi.url+'/'+body['ProductId']+'/inventory/'+body['id'],bodyString, options) // ...using post request
                        .map((res:Response) => {
                          return res.json()
                        }) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  delete(id: String): Observable<Inventory[]> {
      return this.http.delete(this.productApi.url+'/'+id) // ...using post request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

}
