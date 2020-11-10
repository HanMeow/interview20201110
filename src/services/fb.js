
const APP_ID:string = process.env.FB_APP_ID;

type FBLoginStatusType = 'connected' | 'no_authorized' | 'unknown';

function FacebookError(message:FBLoginStatusType) {
  this.message = message;
}

FacebookError.prototype.toString = function toString() {
  return `FacebookError${this.message ? `: ${this.message}` : ''}`;
};

FacebookError.prototype.__FACEBOOK_ERROR__ = true;

export function isFacebookError(value:any):boolean {
  return !!(value && value.__FACEBOOK_ERROR__);
}

export default function init() {
  console.log('FBConnect');

  return new Promise((resolve, reject) => {
    window.fbAsyncInit = function () {
      console.log('window.fbAsyncInit');
      FB.init({
        appId: APP_ID,
        cookie: true,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v5.0',
      });
      FB.getLoginStatus((response) => {
        // https://developers.facebook.com/docs/facebook-login/web/
        console.log(response);
        /* if (process.env.DEV_MODE) {
          alert(JSON.stringify(response));
        } */
        // alert(response.status);
        if (response.status === 'connected') {
          resolve(response);
          return;
        }
        reject(new FacebookError(response.status));
      });
    };
  });
}

// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
export function login(redirectUri:string, state = {}) {
  console.log('fb login redirectUri', redirectUri);
  const params = [
    `client_id=${APP_ID}`,
    `redirect_uri=${encodeURIComponent(redirectUri)}`,
    'auth_type=rerequest',
    `state=${JSON.stringify(state)}`,
  ];
  window.location.href = `https://www.facebook.com/v5.0/dialog/oauth?${params.join('&').toString()}`;
}

export const sharer = (url:string) => {
  window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
};
