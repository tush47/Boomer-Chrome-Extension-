
  

let alarmName = 'timeAlarm';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timeAmount: 30 }); // Set default time amount in minutes
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === alarmName) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',
      title: 'Time Reminder',
      message: 'Time is precious. Make the most of it!',
    });
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'updateTimer') {
    const timeAmount = request.timeAmount;

    chrome.alarms.clear(alarmName, () => {
      chrome.alarms.create(alarmName, { delayInMinutes: timeAmount });
    });
  }
});

