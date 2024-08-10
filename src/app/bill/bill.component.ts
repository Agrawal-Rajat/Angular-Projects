import { Component } from '@angular/core';
import { TableService } from '../table.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css',
})
export class BillComponent {
  today = new Date();

  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  year = this.today.getFullYear();

  cday = this.day < 10 ? '0' + this.day : this.day;
  cmonth = this.month < 10 ? '0' + this.month : this.month;

  formattedDate = `${this.cday}/${this.cmonth}/${this.year}`;

  threeDaysAheadTimestamp = this.today.getTime() + 3 * 24 * 60 * 60 * 1000;

  threeDaysAhead = new Date(this.threeDaysAheadTimestamp);

  thday = this.threeDaysAhead.getDate();
  thmonth = this.threeDaysAhead.getMonth() + 1;
  thyear = this.threeDaysAhead.getFullYear();

  tday = this.thday < 10 ? '0' + this.thday : this.thday;
  tmonth = this.thmonth < 10 ? '0' + this.thmonth : this.thmonth;

  formattedDatethree = `${this.tday}/${this.tmonth}/${this.year}`;

  inum: number = 1;
  cid: number = 1;
  billData: any[] = [];
  price = 0;
  gst = 0;
  amt = 0
  total = 0;
  constructor(private tableService: TableService) {}
  ngOnInit() {
    this.inum++;
    this.cid++;
    this.billData = this.tableService.getTableData();
    this.amt = this.tableService.getTotalAmt()
    this.price = this.amt;
    this.gst = (15/100)* this.amt
    this.total = this.amt + this.gst + 20
    console.log(this.billData);
  }
  

  download() {
    console.log('Download clicked');
    const e = document.getElementById('tdwn');
    if (e) {
      const dpi = 300; // Adjust this value to increase the resolution
      const scale = dpi / 96; // Calculate the scale factor based on DPI

      html2canvas(e, { scale: scale })
        .then((canvas) => {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
          });

          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 210; // A4 width in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          const marginTop = 10;
          const marginLeft = 10;

          pdf.addImage(
            imgData,
            'PNG',
            marginLeft,
            marginTop,
            imgWidth - 2 * marginLeft,
            imgHeight
          );
          pdf.save('mybill.pdf');
        })
        .catch((error) => {
          console.error('Error capturing the bill content: ', error);
        });
    } else {
      console.error('Bill element not found');
    }
  }
}
