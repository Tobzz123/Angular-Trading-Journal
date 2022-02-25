import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  //Connecting frontend to backend

  apiUrl = 'http://localhost:3000/entry';

  //Get All Entries

  getAllEntries():Observable<any>{
    return this._http.get(  `${this.apiUrl}`);
  }

  createEntry(entry:any):Observable<any>{
    console.log(entry,'createresultAPI=>');

    return this._http.post(`${this.apiUrl}`, entry);
  }

  //Delete Entry

  deleteEntry(id:any):Observable<any>{

    let entryId = id;
    return this._http.delete( `${this.apiUrl}/${entryId} `);
  }

  //Edit Entry
  updateEntry(entry:any, id:any):Observable<any>{

    let entryId = id;
    return this._http.put(`${this.apiUrl}/${entryId}`, entry);
  }
}
