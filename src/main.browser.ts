import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppBrowserModule } from './app/app.browser.module';
import { fireBug } from './bootstrap-scripts/firebug';
import { googleAnalytics } from './bootstrap-scripts/google-analytics';

if (environment.production) {
  enableProdMode();
}

fireBug().then(() => {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule).then(() => console.log('Application loaded'));
});
googleAnalytics();
