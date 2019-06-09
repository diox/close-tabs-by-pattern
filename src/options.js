const { storage } = browser;

/**
 * Init options page callback.
 */
function init() {
  const patternsTextArea = document.querySelector("#patterns");
  setOptionsFromStorage(patternsTextArea);
  patternsTextArea.addEventListener("change", setPatternsInStorageFromOptions);
}

/**
 * Update options page from data in storage.
 */
async function setOptionsFromStorage(patternsTextArea) {
  const settings = await storage.sync.get();
  patternsTextArea.value = (settings.patterns || []).join("\n");
}

/**
 * Update patterns in storage from data entered in the options page.
 *
 * Called from addEventListerned bound to the patternsTextArea, so 'this'
 * should represent the textarea.
 */
function setPatternsInStorageFromOptions() {
  const patterns = this.value.split("\n");
  storage.sync.set({patterns});
}

init();
