import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CardService } from "../card.service";
import { NgForm } from "@angular/forms";
import { FlashMessagesService } from "angular2-flash-messages";
import { CheckFormService } from "../check-form.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() id: string;

  public card:any = {};

  dataCard:any = {};

  name: String;
  title: String;
  imagesrc: String;
  rating: Number;
  id_card: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private cardService: CardService,
    private checkForm: CheckFormService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {
    this.activateRoute.paramMap.subscribe(params =>{
        this.id = params.get('id')

        this.cardService.getCardById(this.id).subscribe(result =>{
          this.card = result['data'];
        });
    });
  }

  ngOnInit(): void {
  }

  UpdateCardClick(form: NgForm){
    const card ={
      name: this.name,
      title: this.title,
      imagesrc: this.imagesrc,
      rating: this.rating,
      id_card: this.id
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
    this.cardService.updateCard(card).subscribe(data => {
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
        this.router.navigate(['/cardlist']);
      }
    });
  }

}
