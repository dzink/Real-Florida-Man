// Saves options to chrome.storage
function save_options() {

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
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
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
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
