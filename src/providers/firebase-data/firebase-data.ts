import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
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
  
  addNote(user, data){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/notes').add({
        title: data.title,
        body: data.body,
        uid: user.uid
      }).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
      })
    }
  }
