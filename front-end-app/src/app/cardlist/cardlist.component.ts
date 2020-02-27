import { Component, OnInit } from '@angular/core';
import { CheckFormService } from "../check-form.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { CardService } from "../card.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {

  name: String;
  title: String;
  imagesrc: String;
  rating: Number;

  public cards : any [];

  dataCard:any = {};

  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.getAllCards();
  }

  addCardClick(form: NgForm){
    const card ={
      name: this.name,
      title: this.title,
      imagesrc: this.imagesrc,
      rating: this.rating
    };

    if(!this.checkForm.checkName(card.name)){
      this.flashMessages.show("Имя карты не введено", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if(!this.checkForm.checkTitle(card.title)){
      this.flashMessages.show("Описание не введено", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if(!this.checkForm.checkImgSrc(card.imagesrc)){
      this.flashMessages.show("Сыылка на изображение не введена", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if(!this.checkForm.checkRating(card.rating)){
      this.flashMessages.show("Рейтинг не выставлен", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }
    this.cardService.additionCard(card).subscribe(data => {
      this.dataCard = data;
      if(!this.dataCard.success){
        this.flashMessages.show(this.dataCard.msg, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.router.navigate(['/cardlist']);
      } else{
        this.flashMessages.show(this.dataCard.msg, {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.getAllCards();
        form.reset();
        this.router.navigate(['/cardlist']);
      }
    });
  }

  getAllCards(){
    this.cardService.getCardList().subscribe(result => {
      this.cards = result['data'];
    });
  }

  deleteCardClick(id){
    this.cardService.deleteCard(id).subscribe(result =>{
      this.dataCard = result;
      if(!this.dataCard.success){
        this.flashMessages.show(this.dataCard.msg, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.router.navigate(['/cardlist']);
      } else{
        this.flashMessages.show(this.dataCard.msg, {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.getAllCards();
        this.router.navigate(['/cardlist']);
      }
    });
  }

  updateCardClick(){
    
  }
}
