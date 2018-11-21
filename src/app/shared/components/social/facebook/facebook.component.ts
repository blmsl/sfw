import { Component } from '@angular/core';
import { FacebookService } from '../../../services/facebook/facebook.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'facebook',
  templateUrl: 'facebook.component.html'
})
export class FacebookComponent {

  public posts: Observable<any[]>;

  constructor(public facebookService: FacebookService) {

    this.posts = this.facebookService
      .getPosts('movescalada')
      .pipe(
        map((data: any) => data.map(this.mapPosts))
      );
  }

  mapPosts = (post) => {
    return {
      from: post.from,
      time: post.created_time * 1000, // convert to milliseconds
      message: post.message,
      photos: this.getPhotos(post)
    };
  }

  getPhotos = (post) => {
    if (!post.attachments) {
      return [];
    }

    const attachments = post.attachments.data[0].subattachments ||
      post.attachments;

    return attachments.data
      .filter(x => x.type == 'photo')
      .map(x => x.media.image);
  }

}
