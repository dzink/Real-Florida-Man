var types = ['H1', 'A', 'STRONG', 'SPAN', 'B'];

types.forEach( function(type) {
  replaceInType(type);
});

function replaceInType(type) {
  var elements = document.getElementsByTagName(type);

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = text;
        console.log(node);

        // Set up tokens
        replacedText = replacedText.replace(/realDonaldTrump/gi, '@realfloridaman__dt__twitter');
        replacedText = replacedText.replace(/(president )*donald trump/gi, '@realfloridaman__dt');
        replacedText = replacedText.replace(/(president )*Trump/g, '@realfloridaman__dt');
        replacedText = replacedText.replace(/florida man/gi, '@realfloridaman__fm');

        // Replace tokens
        replacedText = replacedText.replace(/@realfloridaman__dt__twitter/gi, '_FloridaMan');
        replacedText = replacedText.replace(/@realfloridaman__fm/gi, 'Donald Trump');
        replacedText = replacedText.replace(/@realfloridaman__dt/gi, 'Florida Man');

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}
