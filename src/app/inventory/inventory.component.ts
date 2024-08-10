import { CommonModule } from '@angular/common';
import { booleanAttribute, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { log } from 'console';
import { bufferTime } from 'rxjs';
import { TableService } from '../table.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  cartDisplay = 'none';
  isEditButtonActive = false;
  isSubButtonActive = true;
  updateId: any;
  uniqueid = this.tableService.getUid()
  data: any[] = [];
  imap = new Map();

  userform!: FormGroup;
  updt: any;
  constructor(
    fp: FormBuilder,
    private tableService: TableService,
    private router: Router
  ) {
    this.userform = fp.group({
      iname: ['', [Validators.required]],
      quantity: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loaddata();
    console.log(this.data);
    
    

  }

  submit(val: any) {
    if (this.isEditButtonActive) {
      this.update(val);
    } else {
      this.addTableData();
      this.savedata();
    }
    this.formDisplay = 'none';
    this.userform.reset();
    console.log(this.data);
  }
  formDisplay = 'none';

  cancel() {
    this.formDisplay = 'none';
    this.isEditButtonActive = false;
    this.isSubButtonActive = true;
  }

  addTableData() {
    const table = document.getElementById('mytable');
    const row = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerHTML = this.userform.value.iname;
    row.appendChild(td1);

    const td2 = document.createElement('td');
    td2.innerHTML = this.userform.value.quantity;
    row.appendChild(td2);

    this.data.push({
      myId: this.uniqueid,
      item: td1.innerHTML,
      quant: td2.innerHTML,
    });

    const td3 = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.value = this.uniqueid.toString();
    editButton.addEventListener('click', () => {
      this.edit(parseInt(editButton.value));
    });
    editButton.textContent = 'Edit';
    td3.appendChild(editButton);
    row.appendChild(td3);

    const td4 = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.value = this.uniqueid.toString();
    deleteButton.addEventListener('click', () => {
      this.del(parseInt(deleteButton.value));
    });
    deleteButton.textContent = 'Delete';
    td4.appendChild(deleteButton);
    row.appendChild(td4);
    table?.appendChild(row);
    this.uniqueid++;
    this.tableService.updateUid(this.uniqueid)
  }

  addItem() {
    console.log("the value of unique id is :" + this.uniqueid);
    this.formDisplay = 'initial';
  }

  edit(id: number) {
    this.isEditButtonActive = true;
    this.isSubButtonActive = false;
    this.updateId = id;
    this.formDisplay = 'initial';
    console.log('The id is : ' + id);

    const index = this.data.findIndex((row: any) => row.myId === id);
    console.log('The index is : ' + index);

    this.userform.setValue({
      iname: this.data[index].item,
      quantity: this.data[index].quant,
    });
  }

  del(id: number) {
    const index = this.data.findIndex((row: any) => row.myId === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      const table = document.getElementById('mytable') as HTMLTableElement;
      table.deleteRow(index + 1);
    }
    this.savedata();
  }

  update(val: string) {
    const table = document.getElementById('mytable') as HTMLTableElement;
    const index = this.data.findIndex((row: any) => row.myId === parseInt(val));
    console.log('the val is' + val);
    console.log('the index is ' + index);
    this.data[index].item = this.userform.value.iname;
    this.data[index].quant = this.userform.value.quantity;
    table.rows[index + 1].cells[0].innerHTML = this.data[index].item;
    table.rows[index + 1].cells[1].innerHTML = this.data[index].quant;
    this.userform.reset();
    this.isEditButtonActive = false;
    this.isSubButtonActive = true;
    console.log(this.data);
    this.savedata();
  }

  checkout() {
    this.cartData.splice(0, this.cartData.length);

    this.cartDisplay = 'initial';
  }

  list() {
    console.log(this.data.length);
    const ft = document.getElementById('food-items');
    for (let i = 0; i < this.data.length; i++) {
      const opt = document.createElement('option');
      opt.innerText = this.data[i].item;
      opt.value = this.data[i].item;
      ft?.appendChild(opt);
    }
  }

  total: number = 0;

  cartAdd(q: string, v: any) {
    const index = this.data.findIndex((row: any) => row.item === q);
    console.log(q);
    console.log(index);

    const table = document.getElementById('carttable') as HTMLTableElement;
    let present = false;
    const row = document.createElement('tr');
    for (let i = 1; i < table.rows.length; i++) {
      if (table.rows[i].cells[0].innerHTML === q) {
        present = true;
        break;
      }
    }

    if (!present) {
      const td1 = document.createElement('td');
      td1.innerHTML = this.data[index].item;
      td1.style.padding = '2px';
      td1.style.fontSize = 'small';
      row.appendChild(td1);
      const td2 = document.createElement('td');
      if (parseInt(v) > parseInt(this.data[index].quant)) {
        alert(
          `Not enough Inventory, adding the available capacity ${this.data[index].quant}`
        );
        td2.innerHTML = this.data[index].quant;
      } else {
        td2.innerHTML = v;
      }
      td2.style.padding = '2px';
      td2.style.fontSize = 'small';
      row.appendChild(td2);
      const td3 = document.createElement('td');
      td3.innerText = '100';
      td3.style.padding = '2px';
      td3.style.fontSize = 'small';
      row.appendChild(td3);

      const td4 = document.createElement('td');
      const price = parseInt(td2.innerText) * 100;
      td4.innerText = price.toString();
      td4.style.padding = '2px';
      td4.style.fontSize = 'small';
      row.appendChild(td4);

      this.total += price;
      this.imap.set(td1.innerHTML, td2.innerHTML);
      console.log(this.imap);

      table.appendChild(row);
    } else {
      alert('Item Already Present');
    }
  }

  canc() {
    this.imap.clear();
    console.log(this.imap);

    this.total = 0;
    const table = document.getElementById('carttable') as HTMLTableElement;
    let limit = table.rows.length;
    for (let i = limit - 1; i > 0; i--) {
      table.deleteRow(i);
    }
    const parent = document.getElementById('food-items');
    const child = document.querySelector('option') as HTMLOptionElement;
    if (parent) {
      parent.querySelectorAll('option').forEach((option) => option.remove());
    } else {
      console.log('oparent not found');
    }
    this.cartDisplay = 'none';
  }

  cartData: any[] = [];

  gen() {
    const mtable = document.getElementById('mytable') as HTMLTableElement;
    console.log(mtable);
    
    const mapIter = this.imap.keys();
    for (let j = 0; j < this.imap.size; j++) {
      let mpi = mapIter.next().value;
      for (let i = 1; i < mtable.rows.length; i++) {
        if (mtable.rows[i].cells[0].innerHTML === mpi) {
          mtable.rows[i].cells[1].innerHTML = (
            parseInt(mtable.rows[i].cells[1].innerHTML) - parseInt(this.imap.get(mpi))
          ).toString();
          const index = this.data.findIndex((row: any) => row.item === mpi);
          this.data[index].quant = mtable.rows[i].cells[1].innerHTML
        }
      }
    }
    this.savedata()
    console.log(this.data);
    

    const table = document.getElementById('carttable') as HTMLTableElement;
    console.log(table.rows.length);
    console.log(this.cartData.length);

    // this.cartData[1].citems = table.rows[2].cells[0].innerText

    for (let i = 0; i < table.rows.length - 1; i++) {
      let cartItems: any = {
        citems: '',
        cquant: '',
        ccost: '',
        cprice: '',
      };
      cartItems.citems = table.rows[i + 1].cells[0].innerText;
      cartItems.cquant = table.rows[i + 1].cells[1].innerText;
      cartItems.ccost = table.rows[i + 1].cells[2].innerText;
      cartItems.cprice = table.rows[i + 1].cells[3].innerText;
      this.cartData.push(cartItems);
    }

    //console.log(this.cartData);
    this.tableService.setTableData(this.cartData);
    this.tableService.setTotalAmt(this.total);
    this.router.navigateByUrl('/bill');
    this.cartDisplay = 'none';
  }

  getd() {
    let dd = [];
    dd = this.tableService.getTableData();
    console.log(dd);
  }

  savedata() {
    localStorage.setItem('data', JSON.stringify(this.data));
  }

  loaddata() {
    const ob = localStorage.getItem('data');
    if (ob) {
      this.data = JSON.parse(ob);
      const table = document.getElementById('mytable') as HTMLTableElement;
      this.data.forEach((rows) => {
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.innerHTML = rows.item;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerHTML = rows.quant;
        tr.appendChild(td2);

        const td4 = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.value = rows.myId.toString();
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () =>
          this.edit(parseInt(editButton.value))
        );
        td4.appendChild(editButton);
        tr.appendChild(td4);

        const td5 = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList.add('custom');
        deleteButton.value = rows.myId.toString();
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () =>
          this.del(parseInt(deleteButton.value))
        );
        td5.appendChild(deleteButton);
        tr.appendChild(td5);

        table?.appendChild(tr);
      });
    }
  }
}
