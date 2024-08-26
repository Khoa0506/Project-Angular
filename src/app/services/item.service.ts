import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MainItem } from '../models/MainItem';
import { Item } from '../pages/main/main.component';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  http: HttpClient = inject(HttpClient)
  constructor() { 

  }
  getItems():Observable <Item[]>{
    return this.http.get<Item[]>('http://localhost:8000/items/');
  }
  insertItem(item:Item): Observable<Item> {
    return this.http.post<Item>('http://localhost:8000/items/', item);
  }
  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>('http://localhost:8000/items/:id', item);
  }
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8000/items/${id}`);
}
}
