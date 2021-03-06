import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
// import { fireBug } from './bootstrap-scripts/firebug';
// import { googleAnalytics } from './bootstrap-scripts/google-analytics';

if (environment.production) {
  enableProdMode();
}

// fireBug().then(() => {
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule).then();
});
// });
// googleAnalytics();
