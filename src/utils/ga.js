const gaID:string = '';

export const gaPage = (page:string):void => {
  if (!page) {
    return;
  }
  window.gtag('config', gaID, {
    page_path: page,
  });
  console.log(`%c gaPage: ${page} `, 'background:dimgray;color:cyan');
  /* const url = `${gaPath}${page}.html`;
  dataLayer.push({
    event: 'Pageview',
    url,
  });
  console.log(`%c GAPV ${url} `, 'background:dimgray;color:cyan'); */
};


export const gaEvent = (category:string, action:string = 'click', label:string) => {
  if (category && action && label && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
  console.log(`%cGAEvent:${category},${action},${label}`, 'background: #222; color: #bada55');
};

let installed:boolean = false;
export default function init() {
  if (installed) {
    return;
  }
  installed = true;
  console.log('%cgtagHandlerInit', 'background:#3498db;color:white');
  document.addEventListener('click', (e:MouseEvent) => {
    const { target }: {target:HTMLElement} = e;

    const category = target.getAttribute('data-category');
    const action = target.getAttribute('data-action');
    const label = target.getAttribute('data-label');
    if (category && action && label && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
      console.log(`%cGAEvent:${category},${action},${label}`, 'background: #222; color: #bada55');
    }
  });
}
