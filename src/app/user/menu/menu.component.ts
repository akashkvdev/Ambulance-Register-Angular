  import { Component } from '@angular/core';

  @Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
  })
  export class MenuComponent {
    allnavigations:any[]=[]
    ngOnInit(){
      const userInfoString = localStorage.getItem('userInfo');
      const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
      this.allnavigations = userInfo?.navigations; 
      console.log(this.allnavigations);
      
    }


  }
