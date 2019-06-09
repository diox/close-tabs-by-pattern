const { browserAction, storage, tabs } = browser;

/**
 * Init background script callback.
 */
function init() {
  browserAction.onClicked.addListener(closeTabsByPattern);
}

/**
 * Main callback. Get the patterns from storage, query tabs matching them and
 * close corresponding tabs.
 */
async function closeTabsByPattern() {
  const settings = await storage.sync.get();
  if (settings.patterns) {
    const tabsToClose = await tabs.query({pinned: false, url: settings.patterns});
    for (let tab of tabsToClose) {
      tabs.remove(tab.id);
    }
  }
}

init();
