import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth'
import { Observable } from 'rxjs/Observable';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import * as firebase from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User;
  notes: Observable<any[]>;
  favorites: Observable<any[]>;
  userProfile:  Observable<any>;
  favoriteList: any;

  constructor(public navCtrl: NavController, public auth: FirebaseAuthProvider, public fbData: FirebaseDataProvider) {
    this.favoriteList = [];
    this.auth.afAuth.authState.subscribe(
      user => {        
        this.user = user;
        if(user != null){
          this.notes = this.fbData.listNotes(user);
          this.userProfile = this.fbData.getOrCreateUserProfile(user.uid);
          this.favorites = fbData.listFavorites(user);
          this.favorites.subscribe(item => 
            {
              console.log("fav");
              console.log(item);
              this.favoriteList = [];
              item.map( fav => {
                this.favoriteList.push(fav.id);
              })
              console.log('fav2');
              console.log(this.favoriteList);
            })
            
        }

      });
  }

  hasFav(noteId){
    return this.favoriteList.indexOf(noteId) >= 0;
   
  }

  toggleFav(noteId){
    console.log(noteId);
    this.fbData.toggleNoteFavorite(this.user, noteId);
  }

  login(){
      this.navCtrl.push("LoginPage");      
  }
  
  logout(){
    this.auth.signOut();
  }
}
