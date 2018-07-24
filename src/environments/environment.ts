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
    apiKey: "AIzaSyDm8L0UYiJ42K2mrIwF4Mraq7KxsTTF9l8",
    authDomain: "sf-winterbach.firebaseapp.com",
    databaseURL: "https://sf-winterbach.firebaseio.com",
    projectId: "sf-winterbach",
    storageBucket: "",
    messagingSenderId: "85800088059"
  },
  googleCalendar: {
    id: '41q3u1q8pfh26dm1lpkuh7lsrs@group.calendar.google.com'
  },
  routerTracing: false
};
