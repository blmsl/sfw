import { Component } from '@angular/core';
import { YoutubeService } from '../../../services/youtube/youtube.service';

@Component({
  selector: 'youtube',
  templateUrl: 'youtube.component.html'
})
export class YoutubeComponent {

  channel = ''; // 'UCxtEGl1vKzQb2NUS6UBrCBA';
  datas: any;
  nextPageToken: any;

  constructor(private yt: YoutubeService) {
    yt.playlist(this.channel).subscribe(data => {
      console.log(data);
      /* this.datas = data.json().items;
      if (data.json().nextPageToken) {
        this.nextPageToken = data.json().nextPageToken;
      } */
    });
  }

  openPlaylist(id) {
    //this.navCtrl.push(PlaylistPage, {id:id});
  }

  infiniteScroll(ev) {
    if (this.nextPageToken) {
      this.yt.playlist_page(this.channel, this.nextPageToken).subscribe(data => {
        console.log(data);
        /* for (let i of data.json().items) {
          this.datas.push(i);
        }
        ev.complete();
        if (!data.json().nextPageToken) {
          this.nextPageToken = null;
        } else {
          this.nextPageToken = data.json().nextPageToken;
        }*/
      })
    } else {
      ev.complete();
    }
  }

}
