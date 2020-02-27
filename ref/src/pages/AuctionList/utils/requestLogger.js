export default ({ api, type, data }) => {
    if (typeof console === 'undefined') return;
    if (console.groupCollapsed && console.groupEnd) {
      console.groupCollapsed(`%c[api][${type}] ${api}`, 'color: green; font-weight: bold;');
      console.log(data);
      console.groupEnd();
    } else {
      console.log(`[api][${type}] ${api}`);
    }
  };