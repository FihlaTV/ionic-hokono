import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../models/post';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post = {} as Post;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }



}
