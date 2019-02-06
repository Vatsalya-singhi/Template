// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    firebaseConfig : {
        apiKey: "AIzaSyCmeWA0yiX4Y7m8JjW598U4tgT4cpkMm20",
        authDomain: "democheck-94841.firebaseapp.com",
        databaseURL: "https://democheck-94841.firebaseio.com",
        projectId: "democheck-94841",
        storageBucket: "democheck-94841.appspot.com",
        messagingSenderId: "493281165403"
      },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
