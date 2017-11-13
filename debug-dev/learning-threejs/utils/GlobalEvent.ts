function bindResize(onResize: (e?) => any) {
  window.addEventListener('resize', onResize, false);
}

function unbindResize(onResize: (e?) => any) {
  window.removeEventListener('resize', onResize, false);
}

const GlobalEvents = {
  bindResize,
  unbindResize,
};
export default GlobalEvents;
