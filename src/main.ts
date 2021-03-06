import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'chart.js/dist/Chart.bundle.min.js';

if (environment.production) {
  enableProdMode();
}
console.log('main.ts environment.name:', environment.name);
platformBrowserDynamic().bootstrapModule(AppModule);
