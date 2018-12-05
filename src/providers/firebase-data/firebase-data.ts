import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FirebaseDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDataProvider {

  constructor(private readonly afs: AngularFirestore) {
    console.log('Hello FirebaseDataProvider Provider');
  }

  getOrCreateUserProfile(userId): Observable<any>{
    this.checkCreateUserProfile(userId);
    return this.getUserProfile(userId);    
  }

  getUserProfile(userId): Observable<any>{
    return this.afs.doc('/userProfiles/' + userId).snapshotChanges().map(
      item => {
        if(item.payload.exists){
          const id = item.payload.id;
          const data = item.payload.data();
          data['id'] = id;
          return data;
        }
      }
    );
  }

  checkCreateUserProfile(userId){
    var profile = this.afs.firestore.doc('/userProfiles/' + userId).get().then(
      doc => {
        if(doc.exists){
          console.log("profile exists");
        }
        else{
          console.log("profile does not exist, creating");
          this.afs.collection('/userProfiles/').doc(userId).set({
            userName: "New User",  
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
        }
        return doc;
      }      
    )
    return profile;
  }


  listFavorites(user){
    if(user == null){
      return;
    }
    return this.afs.collection('/userProfiles/' + user.uid + '/favorites/').snapshotChanges().map(actions => {
      return actions.map( item=> {
        const id = item.payload.doc.id;
        const data = item.payload.doc.data();
        data['id'] = id;
        return data;
      })
    });
  }

  listNotes(user){
    if(user == null){
      return;
    }
    return this.afs.collection('/notes', ref => ref.where("uid", "==", user.uid)
    ).snapshotChanges().map(actions => {
      return actions.map( item=> {
        const id = item.payload.doc.id;          
        const data = item.payload.doc.data();
        data['id'] = id;
        return data;
      });
    });
  }

  toggleNoteFavorite(user, noteId){
    this.afs.firestore.doc('/userProfiles/' + user.uid + '/favorites/' + noteId).get().then(
      doc => {        
        if(doc.exists){
          doc.ref.delete();
        }
        else{
          doc.ref.set({
            favorite: true
          })
        }
      }
    )
  }
  
  
  addNote(user, data){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/notes').add({
        title: data.title,
        body: data.body,
        uid: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
      })
    }
  }
