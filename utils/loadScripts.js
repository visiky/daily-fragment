/**
 * @desc 工具 - 加载脚本
 * @param url 
 * @param callback 
 */
export default function loadScript(url, callback) {
  // create script element
  let script = document.createElement('script');
  script.async = true;
  script.src = url;

  // attach it to DOM
  const entry = document.getElementsByTagName('script')[0];
  entry.parentNode.insertBefore(script, entry);

  // execute callback after script is loaded
  script.onload = script.onreadystatechange = () => {
    const readyState = script.readyState;

    if (!readyState || /complete|loaded/.test(script.readyState)) {
      if (typeof callback === 'function') callback();

      // detach event handler to avoid memory leaks in IE
      script.onload = null;
      script.onreadystatechange = null;
    }
  };
}
