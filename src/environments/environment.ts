export const environment = {
  production: false,
  adal: {

    auth: {
      clientId: "e4772315-321d-4032-85f8-5145349c0d33",
      authority: "https://login.microsoftonline.com/4d75d01c-e20b-4b13-8e1d-f731f8ffbb3e",
      postLogoutRedirectUri:"http://localhost:5000/"
    },
    cache: {
      cacheLocation: "localStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    }, 
    framework: {
      isAngular: true
    }
  },

};
