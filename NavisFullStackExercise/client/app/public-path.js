function getScriptPath() {
  const scripts = document.getElementsByTagName('script');
  const myScriptTag = scripts[scripts.length - 1];

  const src = myScriptTag.getAttribute('src');
  return src.substring(0, src.lastIndexOf('/')) + '/';
}

function getPublicPath() {
  const path = getScriptPath();
  console.info('Loading bundles from: ' + path);
  __webpack_public_path__ = path;
};

getPublicPath();
