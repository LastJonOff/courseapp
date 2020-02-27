import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { }

  checkName(name){
    if(name == undefined){
      return false;
    } else{
      return true;
    }
  }
  checkLogin(login){
    if(login == undefined){
      return false;
    } else{
      return true;
    }
  }
  checkEmail(email){
    if(email == undefined){
      return false;
    } else{
      return true;
    }
  }
  checkPassword(password){
    if(password == undefined){
      return false;
    } else{
      return true;
    }
  }
  checkTitle(title){
    if(title == undefined){
      return false;
    } else{
      return true;
    }
  }
  checkImgSrc(imgsrc){
    if(imgsrc == undefined){
      return false;
    } else{
      return true;
    }
  }
  checkRating(rating){
    if(rating == undefined){
      return false;
    } else{
      return true;
    }
  }
}
