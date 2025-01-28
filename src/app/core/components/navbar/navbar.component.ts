import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, dropDownMenuItems } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  user?: User;
  interView:string[] = ['Angular', '.Net Core']
  dropDownMenuItems:dropDownMenuItems[] = [{text:'Categories', link:'/admin/categories'}, {text:'BlogPosts',link:'/admin/blogposts'}, {text:'Users',link:'/admin/users'}]
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
    this.router.navigateByUrl('/account/login');
  }

}
