// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  appId: 'sfw-app',
  production: false,
  enableLogging: false,
  firebug: false,
  gaTrackingCode: 'UA-109145893-2',
  googleAnalytics: false,
  firebaseConfig: {
    apiKey: 'AIzaSyApjtaFJJyp7UBipZ8Iks8fXRvNvt8uuto',
    authDomain: 'sportfreunde-winterbach.firebaseapp.com',
    databaseURL: 'https://sportfreunde-winterbach.firebaseio.com',
    projectId: 'sportfreunde-winterbach',
    storageBucket: '',
    messagingSenderId: '693126399443',
    timestampsInSnapshots: true
  },
  routerTracing: false
};
