import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FirebaseUserModel } from 'src/app/classes/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services-local/util.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm!: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public util: UtilService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const userData = routeData['userData']; //routeData.userData;
      if (userData) {
        this.user = userData;
        this.createForm(this.user.name);
      }
    });
  }

  createForm(name: string): void {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  save(value: { name: string; }): void {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err));
  }

  logout(): void {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log('Logout error', error);
      });
  }
}
