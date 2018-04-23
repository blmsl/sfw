import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookComponent } from './facebook/facebook.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { FacebookService } from '../../services/facebook/facebook.service';
import { YoutubeService } from '../../services/youtube/youtube.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FacebookComponent,
    YoutubeComponent
  ],
  providers: [
    FacebookService,
    YoutubeService
  ]
})
export class SocialModule { }
