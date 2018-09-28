// Saves options to chrome.storage
function saveSettings() {
  var aggressive = document.getElementById('aggressive').checked;
  var headlines = document.getElementById('headlines').checked;
  var links = document.getElementById('links').checked;
  var twitter = document.getElementById('twitter').checked;

  chrome.storage.sync.set({
    aggressive: aggressive,
    headlines: headlines,
    links: links,
    twitter: twitter,
  }, function() {
    $('#status').slideDown();
    $('#saved').clearQueue().slideDown().delay(750).slideUp();
  });
}


function restoreSettings() {
  chrome.storage.sync.get({
    aggressive: false,
    headlines: true,
    links: false,
    twitter: true,
  }, function(items) {
    document.getElementById('aggressive').checked = items.aggressive;
    document.getElementById('headlines').checked = items.headlines;
    document.getElementById('links').checked = items.links;
    document.getElementById('twitter').checked = items.twitter;
  });
}

function initializeForm() {
  restoreSettings();
  setTimeout(decorateForm, 500);
}

function decorateForm() {
  if ($('#aggressive').prop('checked')) {
    $('.nonaggressive input').attr('disabled', 'disabled');
    $('.nonaggressive').addClass('disabled');
  }
  else {
    $('.nonaggressive input').removeAttr('disabled', '');
    $('.nonaggressive').removeClass('disabled');
  }
}
document.addEventListener('DOMContentLoaded', initializeForm);

$('#aggressive, #headlines, #links, #twitter').change(function() {
  saveSettings();
  decorateForm();
});
