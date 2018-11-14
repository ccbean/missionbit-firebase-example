import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth'
import { Observable } from 'rxjs/Observable';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: Observable<any[]>;

  constructor(public navCtrl: NavController, public auth: FirebaseAuthProvider, public fbData: FirebaseDataProvider) {
   
    this.auth.afAuth.authState.subscribe(
      user => {
        this.notes = this.fbData.listNotes(user);
      });
  }

  login(){
      this.navCtrl.push("LoginPage");      
  }
  
  logout(){
    this.auth.signOut();
  }
}
