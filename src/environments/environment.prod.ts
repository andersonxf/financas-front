export const environment = {
  production: true,
  apiUrl: 'https://andfinanca-api.herokuapp.com/',

  tokenWhitelistedDomains: [ new RegExp('andfinanca-api.herokuapp.com/') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};