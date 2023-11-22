export const environment = {
  production: true,
  mapsKey: "AIzaSyDx61MV-11raK50UCiwJ6P6kdTflbV9oSE",
  login: "https://facens-dev-ed.develop.my.salesforce.com/services/oauth2/token",
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
      get: "/ranking/",
    },
  }
};