import auth0, { WebAuth } from "auth0-js";

export default class Auth {
  history: any;
  auth0: WebAuth;
  userProfile: any = null;
  scope: string = "openid profile email read:courses";

  constructor(history: any) {
    this.history = history;

    /* this.auth0 = new auth0.WebAuth({
      domain: process.env["REACT_APP_AUTH0_DOMAIN"] as string,
      clientID: process.env["REACT_APP_AUTH0_CLIENTID"] as string,
      redirectUri: process.env["REACT_APP_AUTH0_CALLBACK_URL"] as string,
      audience: process.env["REACT_APP_AUTH0_AUDIENCE"] as string,
      responseType: "token id_token",
      scope: "openid profile email",
    });*/
    this.auth0 = new auth0.WebAuth({
      domain: "react-with-auth.au.auth0.com",
      clientID: "tO6AQhPHPlnd4B7n7SA1rxsO090BRblH",
      redirectUri: "http://localhost:3000/callback",
      audience: "http://localhost:3001",
      responseType: "token id_token",
      scope: this.scope,
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert("Error");
        console.log(err);
      }
    });
  };

  setSession = (authResult: any) => {
    console.log(authResult);

    const expireAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    const scopes = authResult.scope || this.scope || "";

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expire_At", expireAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));
  };

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expire_At");
    localStorage.removeItem("scopes");
    this.userProfile = null;
    this.auth0.logout({
      clientID: "tO6AQhPHPlnd4B7n7SA1rxsO090BRblH",
      returnTo: "http://localhost:3000",
    });
  };

  userHasScopes(scopes: any) {
    const grantedScopes = (
      JSON.parse(localStorage.getItem("scopes")) || ""
    ).split(" ");
    return scopes.every((scope) => grantedScopes.includes(scope));
  }

  isAuthenticated() {
    const time = localStorage.getItem("expire_At");
    const expireAt: number = time != null ? +time : 0;

    const nowTime = new Date().getTime();
    const ss = nowTime < expireAt;
    console.log(ss);
    return ss;
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  };

  getProfile = (cb: any) => {
    if (this.userProfile) return cb(this.userProfile);

    this.auth0.client.userInfo(this.getAccessToken(), (error, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, error);
    });
  };
}

export interface ProcessEnv {
  [key: string]: string | undefined;
}
