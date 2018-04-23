import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { fireBug, googleAnalytics } from './scripts';

if (environment.production) {
  enableProdMode();
  googleAnalytics();
}

fireBug().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
