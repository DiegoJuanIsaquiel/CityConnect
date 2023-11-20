// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapsKey: "AIzaSyDx61MV-11raK50UCiwJ6P6kdTflbV9oSE",
  login: "https://login.salesforce.com/services/oauth2/token",
  keys: {
    token: 'TOKEN_PROXY_KEY',
    refreshToken: 'REFRESH_TOKEN_PROXY_KEY',
    user: 'USER_PROXY_KEY',
  },
  api: {
    baseUrl: "https://facens-dev-ed.develop.my.salesforce.com/services/apexrest/cityconnect",
    postagem: {
      get: "/postagem/",
      create: "/postagem/"
    },
    eventos: {
      get: "/eventos/",
    },
    usuario: {
      get: "/usuario/",
      create: "/usuario/",
    },
    ranking: {
      get: "/usuario/",
    },
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
