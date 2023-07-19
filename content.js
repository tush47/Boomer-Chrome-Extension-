// Get time amount from storage and convert it to milliseconds
chrome.storage.sync.get('timeAmount', (result) => {
    const timeAmount = result.timeAmount * 60 * 1000;
  
    setTimeout(() => {
      chrome.runtime.sendMessage({ action: 'showNotification' });
    }, timeAmount);
  });
  