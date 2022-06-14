import { Component, ViewChild, ɵfindLocaleData } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

export interface UsersData {
  id: number;
  name: string;
  age: number;
  gender: string;
}

const ELEMENT_DATA: UsersData[] = [];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'name','age','gender', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action: any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: { id:any; name: any; age: any; gender: any}){

    if(row_obj.id==null || row_obj.name==null || row_obj.age==null || row_obj.gender==null){
      alert('Please enter all the fields');
    }

    if(this.dataSource.some(({ id }) => id === row_obj.id)){
      alert("This id is already used");
    }
  
  else if(row_obj.age>=1 && row_obj.age<=99 ){ 
    this.dataSource.push({
      id:row_obj.id,
      name:row_obj.name,
      age: row_obj.age,
      gender: row_obj.gender,
    });
    this.table.renderRows();
}
  else{
    alert("Enter age Between 1 to 99");
  }
}
  updateRowData(row_obj: { id: number; name: string; age: number; gender: string }){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.age = row_obj.age;
        value.gender = row_obj.gender;
      }
      return true;
    });
  }
  deleteRowData(row_obj: { id: number; }){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
 
  
}
