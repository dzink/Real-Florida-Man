chrome.storage.sync.get({
  aggressive: false,
  headlines: true,
  links: false,
  twitter: true,
}, function(items) {
  var places = [];

  // Different levels of how much replacement to do
  if (items.aggressive) {
    places = places.concat('*');
  } else {
    if (items.headlines) {
      places = places.concat('H1');
    }
    if (items.links) {
      places = places.concat(['A', 'STRONG', 'SPAN', 'B']);
    }
  }
  if (places.length) {
    replaceInTypes(places, replaceNames);
  }

  // Twitter is always global
  if (items.twitter) {
    replaceInType('*', replaceTwitter);
  }
});

function replaceInTypes(types, callback) {
  types.forEach( function(type) {
    replaceInType(type, callback);
  });
}

function replaceInType(type, callback) {
  var elements = document.getElementsByTagName(type);

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = callback(text);
        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }

    }
  }
}

function replaceNames(replacedText) {
  // Set up tokens
  replacedText = replacedText.replace(/DonaldTrump/gi, '@realfloridaman__dt__tight');
  replacedText = replacedText.replace(/(president )*donald trump/gi, '@realfloridaman__dt');
  replacedText = replacedText.replace(/(president )*Trump/g, '@realfloridaman__dt');
  replacedText = replacedText.replace(/florida man/gi, '@realfloridaman__fm');

  // Replace tokens
  replacedText = replacedText.replace(/@realfloridaman__dt__tight/gi, 'FloridaMan');
  replacedText = replacedText.replace(/@realfloridaman__fm/gi, 'Donald Trump');
  replacedText = replacedText.replace(/@realfloridaman__dt/gi, 'Florida Man');

  return replacedText;
}

function replaceTwitter(replacedText) {
  // Set up tokens
  replacedText = replacedText.replace(/realDonaldTrump/gi, '@realfloridaman__dt__twitter');
  replacedText = replacedText.replace(/_FloridaMan/gi, '@realfloridaman__fm__twitter');

  // Replace tokens
  replacedText = replacedText.replace(/@realfloridaman__dt__twitter/gi, '_FloridaMan');
  replacedText = replacedText.replace(/@realfloridaman__fm__twitter/gi, 'realDonaldTrump');

  return replacedText;
}
