import axios from 'axios';

const keycloakConfig = {
  url: 'https://tiktalkapp.ru',
  realm: 'tiktalk-realm',
  clientId: 'clientback',
  clientSecret: 'UyPDzvqPjWbe410YszvjJo7vaGsUDaeM'
};



export async function authenticate(username, password) {
  return axios.post(
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
  )
  .then(response => response.data)
  .catch(error => {
    return null; 
  });
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
    return;
  }
}

export async function checkAdminRole(token) { 
  try {
    const response = await axios.post(
      `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token/introspect`,
      new URLSearchParams({
        token: token,
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data.active && response.data.realm_access.roles.includes('ADMIN');
  } catch (error) {
    throw error;
  }
}