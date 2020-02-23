import { Component, OnInit } from '@angular/core';
import { CheckFormService } from "../check-form.service";
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  name: String;
  login: String;
  email: String;
  password: String;

  dataRegister:any = {};

  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userRegisterClick(){
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    };

    if(!this.checkForm.checkName(user.name)){
      this.flashMessages.show("Имя пользователя не введено", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if(!this.checkForm.checkLogin(user.login)){
      this.flashMessages.show("Логин не введен", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if(!this.checkForm.checkEmail(user.email)){
      this.flashMessages.show("Email не введен", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if(!this.checkForm.checkPassword(user.password)){
      this.flashMessages.show("Пароль не введен", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }


    this.authService.registerUser(user).subscribe(data => {
      this.dataRegister = data;
      if(!this.dataRegister.success){
        this.flashMessages.show(this.dataRegister.msg, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.router.navigate(['/reg']);
      } else{
        this.flashMessages.show(this.dataRegister.msg, {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['/auth']);
      }
    });
  }
}
