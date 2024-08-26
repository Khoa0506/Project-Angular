import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collection, collectionData, updateDoc, query, where, getDocs, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';

export interface Item {
  Id?: string;
  type?: string;
  name?: string;
  condition?: string;
  price?: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  items: Observable<any[]>;
  items2: Item[] = [];
  aCollection = collection(this.firestore, 'items');
  config: any;
  collection = { count: 60, data: [] };
  insertFrm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  itemSrv: ItemService = inject(ItemService);
  filterItems: Item[] = [];
  selectedItem: Item | null = null;

  searchItem: string = '';
  isEditMode = false;
  editItemId: string | null = null;

  newData: Item = {
    Id: '',
    name: '',
    type: '',
    condition: '',
    price: ''
  };

  constructor() {
    this.items = collectionData(this.aCollection);
    this.items.subscribe((data) => {
      this.items2 = data;
      this.filterItems = data;
    });

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.items2.length,
    };

    this.insertFrm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {}

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  async add() {
    let maxID = 0;
    this.items2.forEach(item => {
      if (item.Id && +item.Id > maxID) {
        maxID = +item.Id;
      }
    });

    let it: Item = {
      Id: (maxID + 1).toString(),
      name: this.insertFrm.get('name')?.value,
      type: this.insertFrm.get('type')?.value,
      condition: this.insertFrm.get('condition')?.value,
      price: this.insertFrm.get('price')?.value
    };
    
    try {
      const newDocRef = await addDoc(this.aCollection, it);
      console.log('New document added with ID:', newDocRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }

    this.clearnewData();
  }

  async update() {
    if (this.newData.Id) {
      try {
        const q = query(this.aCollection, where('Id', '==', this.newData.Id));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(async (docSnapshot) => {
          const itemDocRef = doc(this.firestore, `items/${docSnapshot.id}`);
          await updateDoc(itemDocRef, {
            name: this.insertFrm.get('name')?.value,
            type: this.insertFrm.get('type')?.value,
            condition: this.insertFrm.get('condition')?.value,
            price: this.insertFrm.get('price')?.value
          });
          console.log('Document updated with ID:', docSnapshot.id);
        });
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }

    this.clearnewData();
    this.isEditMode = false;
    this.editItemId = null;
  }

  async delete() {
    if (this.editItemId) {
      try {
        const q = query(this.aCollection, where('Id', '==', this.editItemId));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(async (docSnapshot) => {
          const itemDocRef = doc(this.firestore, `items/${docSnapshot.id}`);
          await deleteDoc(itemDocRef);
          console.log('Document deleted with ID:', docSnapshot.id);
        });
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }

    this.clearnewData();
    this.isEditMode = false;
    this.editItemId = null;
  }

  edit(item: Item) {
    this.newData = { ...item };
    this.isEditMode = true;
    this.editItemId = item.Id || null;

    this.insertFrm.setValue({
      name: item.name || '',
      type: item.type || '',
      condition: item.condition || '',
      price: item.price || ''
    });
  }

  cancelEdit() {
    this.clearnewData();
    this.isEditMode = false;
    this.editItemId = null;
  }

  clearnewData() {
    this.newData = {
      Id: '',
      name: '',
      type: '',
      condition: '',
      price: ''
    };
    this.insertFrm.reset();
  }

  searchBar() {
    if (this.searchItem === '') {
      this.filterItems = this.items2;
    } else {
      this.filterItems = this.items2.filter(
        (item) =>
          item.name?.toLowerCase().includes(this.searchItem.toLowerCase()) ||
          item.type?.toLowerCase().includes(this.searchItem.toLowerCase()) ||
          item.condition?.toLowerCase().includes(this.searchItem.toLowerCase())
      );
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.update();
    } else {
      this.add();
    }
  }
}
