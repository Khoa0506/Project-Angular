import { Component, OnInit, inject } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainItem } from '../../models/MainItem';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {
  itemSrv: ItemService = inject(ItemService)
  fb:FormBuilder = inject(FormBuilder)
  items: any
  insertFrm: any
  ngOnInit(): void {
    this.insertFrm = this.fb.group({
      ID:['',Validators.required], 
      name:['',[Validators.required]],
      type:[''],
      /*
      password:['', Validators.required],
      confirmpassword:['', Validators.required]
      },{
      validator: MustMatch('password', 'confirmpassword')}//hàm tự viết SV có thể bỏ qua không kiểm tra cũng được
      */
    });

    this.itemSrv.getItems().subscribe(data =>{this.items=data})
  }
  onSubmit(){
    let item = new MainItem();

    item.Id = this.insertFrm.controls["id"].value;
    item.name = this.insertFrm.controls["name"].value;
    item.type = this.insertFrm.controls["type"].value;
    item.type = this.insertFrm.controls["condition"].value;
    item.type = this.insertFrm.controls["price"].value;
    this.itemSrv.insertItem(item).subscribe(data => {console.log("insert Form: ", data)})
    
  }
}
