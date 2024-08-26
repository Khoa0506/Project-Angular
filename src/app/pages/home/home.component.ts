import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../pages/main/main.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  firestore: Firestore = inject(Firestore);
  items: Observable<any[]>;
  items2: Item[] = [];
  aCollection = collection(this.firestore, 'items');
  config: any;
  filterItems: Item[] = [];
  selectedItem: Item | null = null;

  constructor() {
    this.items = collectionData(this.aCollection);
    this.items.subscribe((data) => {
      this.items2 = data;
    });
  }
}