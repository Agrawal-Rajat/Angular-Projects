import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private data:any[]=[]

  constructor() {
    const ids = localStorage.getItem('UId')
    if(ids) this.UId = parseInt(ids)
   }

  getTableData(){
    return this.data;
  }

  setTableData(fdata:any){
    this.data = fdata
  }

  private TotalAmt = 0;

  getTotalAmt(){
    return this.TotalAmt
  }

  setTotalAmt(amt:number){
    this.TotalAmt = amt
  }

   private UId = 0;

  getUid(){
    return this.UId
  }

  updateUid(id: number){
    this.UId = id
    localStorage.setItem('UId', id.toString());
  }


}
