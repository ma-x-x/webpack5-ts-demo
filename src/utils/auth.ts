const TokenKey = 'loginToken';

export function getToken() {
  return localStorage.get(TokenKey);
}

export function setToken(token: string) {
  return localStorage.set(TokenKey, token);
}

export function removeToken() {
  return localStorage.remove(TokenKey);
}
