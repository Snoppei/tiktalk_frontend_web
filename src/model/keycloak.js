import axios from 'axios';

const keycloakConfig = {
  url: 'http://localhost:8180',
  realm: 'tiktalk-realm',
  clientId: 'clientback',
  clientSecret: '5Oy46vEfW52xGGSMKAfnng95tubAeERW'
};

export async function authenticate(username, password) {
  try {
    const response = await axios.post(
      `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: 'password',
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
        username,
        password
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Authentication failed', error);
    throw error;
  }
}

export async function refreshToken(refreshToken) {
  try {
    const response = await axios.post(
      `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
        refresh_token: refreshToken
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Token refresh failed', error);
    throw error;
  }
}
// export default keycloak;