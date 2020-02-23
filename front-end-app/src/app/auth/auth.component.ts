import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: String;
  password: String;
  dataAuth:any = {};

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userLoginClick(){
    const user = {
      login: this.login,
      password: this.password
    };

    if(user.password == undefined){
      this.flashMessages.show("Введите пароль", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }

    this.authService.authUser(user).subscribe(data => {
      this.dataAuth = data;
      console.log(this.dataAuth);
      if(!this.dataAuth.success){
        this.flashMessages.show(this.dataAuth.msg, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      } else{
        this.flashMessages.show("Успешная авторизация", {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['/dashboard']);
        this.authService.storeUser(this.dataAuth.token, this.dataAuth.user);
      }
    });
  };
}
