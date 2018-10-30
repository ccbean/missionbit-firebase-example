import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: FirebaseAuthProvider) {
    console.log(this.auth.user);
  }

  login(){
      this.navCtrl.push("LoginPage");
  }
  
  logout(){
    this.auth.signOut();
  }
}
