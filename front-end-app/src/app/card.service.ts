import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CardService {

  card: any;

  constructor(
    private http: HttpClient
  ) {}

  additionCard(card){
    return this.http.post('http://localhost:3000/cardlist/add', card, httpOptions);
  }

  updateCard(card){
    return this.http.post('http://localhost:3000/cardlist/update', card, httpOptions);
  }

  getCardList(){
    return this.http.post('http://localhost:3000/cardlist',{});
  }

  getCardById(id){
    return this.http.request('post', 'http://localhost:3000/cardlist/getcard', { body: {id: id} });
  }

  deleteCard(id){
    return this.http.request('delete', 'http://localhost:3000/cardlist/delete', { body: {id: id} });
  }
}
