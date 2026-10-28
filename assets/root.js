// Forwards visitors from "/" to their browser language. Crawlers and visitors without JavaScript get the plain links.
(function () {
  var langs = ["en","de","cs","pl"];
  var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
  var pick = 'en';
  for (var i = 0; i < prefs.length; i++) {
    var base = String(prefs[i]).toLowerCase().split('-')[0];
    if (langs.indexOf(base) !== -1) { pick = base; break; }
  }
  location.replace('/' + pick + '/' + location.hash);
})();
