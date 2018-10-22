import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    /*if (this.swUpdate.isEnabled) {
     this.swUpdate.available.subscribe((evt) => {
     console.log('service worker updated');
     });

     this.swUpdate.checkForUpdate().then(() => {
     // noop
     }).catch((err) => {
     console.error('error when checking for update', err);
     });
     } */
  }

  constructor(/*private swUpdate: SwUpdate*/) {
  }

}
