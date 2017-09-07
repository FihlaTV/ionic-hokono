import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { UserProvider } from '../user/user';

@Injectable()
export class FirebaseProvider {

  profileUrl: string = 'accounts';
  getMyPetsUrl: string = 'pets';

  constructor(
    private db: AngularFireDatabase,
    private auth: UserProvider
  ) {
    // console.log('Hello FirebaseProvider Provider');
  }

  getProfile(): FirebaseObjectObservable<any> {
    return this.db.object(`${this.profileUrl}/${this.auth.user.uid}`);
  }

  getPets(limit: number = 1) {
    return this.db.list(`${this.profileUrl}/${this.auth.user.uid}/${this.getMyPetsUrl}`, {
      query: {
        limitToFirst: limit
      }
    });
  }

  getAllPets(limit: number = 10) {
    return this.db.list('pets', {
      query: {
        limitToFirst: limit
      }
    });
  }

  getAllPosts(limit: number = 10) {
    return this.db.list('posts', {
      query: {
        limitToFirst: limit
      }
    });
  }

  updatePetProfile(key, profile) {
    this.db.list('pets').update(key, profile);
    return this.db.list(`${this.profileUrl}/${this.auth.user.uid}/${this.getMyPetsUrl}`).update(key, profile);
  }

  updateProfile(profile) {
    return this.db.object(`${this.profileUrl}/${this.auth.user.uid}`).update(profile);
  }

  postNewPet(newPet) {
    this.db.list('pets').push(newPet);
    return this.db.list(`${this.profileUrl}/${this.auth.user.uid}/${this.getMyPetsUrl}`).push(newPet);
  }
}
