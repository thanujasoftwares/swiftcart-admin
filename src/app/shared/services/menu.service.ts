import { Injectable,EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Menu }           from '../models/menu.model';
import {environment} from '../../../environments/environment';

import * as _ from 'lodash';

// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class MenuService {

  private api=environment.api.menu;

  public menuitems:Array<Menu>;
  public categories:Array<String>;
  public subcategories:Array<String>;
  constructor (private http: Http) {
    // this.menuitems = new Array<Menu>();
    // this.get({})
    //     .subscribe((menuitems) => {
    //       let categories=[];
    //       let subcategories=[];
    //       menuitems.map((menuitem,index)=>{
    //         this.menuitems.push({
    //           id: menuitem.id,
    //           category:menuitem.category,
    //           subcategory:menuitem.subcategory
    //         });
    //         categories.push(menuitem.category);
    //         subcategories.push(menuitem.subcategory);
    //       });
    //       this.categories = _.uniq(categories);
    //       this.subcategories = _.uniq(subcategories);
    //   },err => {console.log(err);});
    
  }

  getCategories:{

  }


  get(params: Object): Observable<Menu[]>{
        let options       = new RequestOptions({ params: params });
        return this.http.get(this.api.url,options)
                // ...and calling .json() on the response to return data
                .filter((res:Response)=>{
                    return res.json().status!=200
                })
                .map((res:Response,ind) => {
                        return JSON.parse(res.json().menu)
                })
                //...errors if any
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
  }

  add(body: Object): Observable<Menu[]> {
    console.log(body);
    //   let bodyString = JSON.stringify(body); // Stringify payload
    //   let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //   let options       = new RequestOptions({ headers: headers }); // Create a request option

    //   return this.http.post(this.api.url, body, options) // ...using post request
    //                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    return null;
  }              


  update(body: Object): Observable<Menu[]> {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option

      return this.http.put(this.api.url+'/'+body['id'], options) // ...using post request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  delete(id: String): Observable<Menu[]> {
      return this.http.delete(this.api.url+'/'+id) // ...using post request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

}
