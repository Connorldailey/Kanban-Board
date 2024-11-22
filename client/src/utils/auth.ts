import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {

  // Decode JWT token in localStorage
  getProfile() {
    const token = this.getToken();
    if (!token) return null;
    // Return the decoded token
    return jwtDecode<UserData>(token);
  }

  // Return a value that indicates if the user is logged in
  loggedIn() {
    const token = this.getToken();
    // Check if token exists and is not expired
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // Return a value that indicates if the token is expired
    try {
      const { exp } = jwtDecode<JwtPayload>(token);

      // If exp is undefined, consider the token invalid
      if (!exp) {
        return true;
      }

      return exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
    
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
