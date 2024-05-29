import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: 'http://localhost:8180/auth',
  realm: 'tiktalk-realm',
  clientId: 'clientVue',
});

keycloak.init({
  onLoad: 'login-required'
}).then((authenticated) => {
  if (authenticated) {
    console.log("User is authenticated");
  } else {
    console.log("User is not authenticated");
  }
}).catch((error) => {
  console.error("Initialization error", error);
});

// export default keycloak;