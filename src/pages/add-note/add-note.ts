import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth'
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { HomePage } from '../home/home'
/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {
  noteForm: FormGroup;

  constructor(public navCtrl: NavController, public fb: FormBuilder, public navParams: NavParams, public auth: FirebaseAuthProvider, public fbData: FirebaseDataProvider) {
    this.noteForm = fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  addNote(){
    let data = this.noteForm.value;
    this.fbData.addNote(this.auth.user, data);
    this.navCtrl.setRoot(HomePage);

  }

}
