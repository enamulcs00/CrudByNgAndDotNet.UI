import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, dropDownMenuItems } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { config } from '../config';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  user?: User;
  img:string = "assets/images/name.png"
  interView:dropDownMenuItems[] = config.interview;
  dropDownMenuItems:dropDownMenuItems[] = config.items;
  constructor(private authService: AuthService,
    private router: Router) {
  }


  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();

  }

  onLogout(): void {
    this.authService.logout();
  }
  isClick(item:any):void{
console.log("item", item);

  }
}
