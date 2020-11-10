const APP_ID: string = process.env.LINE_APP_ID;

export function login(redirectUri:string) {
  const URL:string = 'https://access.line.me/oauth2/v2.1/authorize';

  const params:string[] = [
    'response_type=code',
    `client_id=${APP_ID}`,
    `redirect_uri=${encodeURIComponent(redirectUri)}`,
    'scope=openid%20profile',
    'state=LineLogin',
  ];

  window.location.href = `${URL}?${params.join('&').toString()}`;
}


export const share = (url:string) => {
  window.open(`https://lineit.line.me/share/ui?url=${encodeURIComponent(url)}`);
};

export const shareMobile = (url:string) => {
  window.open(`line://msg/text/${encodeURIComponent(url)}`, '_blank');
};
