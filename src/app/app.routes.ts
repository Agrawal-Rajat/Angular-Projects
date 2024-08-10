import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StarterComponent } from './starter/starter.component';
import { SignupComponent } from './signup/signup.component';
import { InventoryComponent } from './inventory/inventory.component';
import { BookComponent } from './book/book.component';
import { MenuComponent } from './menu/menu.component';
import { TmwComponent } from './tmw/tmw.component';
import { BillComponent } from './bill/bill.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent, title:'Login'},
    {path:'', redirectTo:'menu', pathMatch:'full'},
    {path:'home', component:StarterComponent, title:'Home'},
    {path:'signup', component:SignupComponent, title:'Sign Up'},
    {path:'inventory', component:InventoryComponent, title:'Inventory'},
    {path:'bill', component:BillComponent, title:'BILL'},
    {path:'book', component:BookComponent, title:'Book Table',
        children:[
            {path:'tmw', component:TmwComponent, title:"Tommorrow"}
            
        ]
            
        
    },
    {path:'menu', component:MenuComponent, title: 'Menu'}
];
