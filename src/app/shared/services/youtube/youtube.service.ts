import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class YoutubeService {

  public key = '';
  constructor(private http: HttpClient) { }

  playlist(channel) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=' + channel + '&key=' + this.key);
  }

  playlist_page(channel, pageToken) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=' + channel + '&pageToken=' + pageToken + '&key=' + this.key);
  }

  playlistList(playlistId) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + playlistId + '&key=' + this.key);
  }

  playlistList_page(playlistId, pageToken) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=' + pageToken + '&playlistId=' + playlistId + '&key=' + this.key);
  }
}
