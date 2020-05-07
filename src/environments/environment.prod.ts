export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',

  tokenWhitelistedDomains: [ new RegExp('http://localhost:8080') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};