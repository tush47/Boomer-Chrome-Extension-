
document.addEventListener('DOMContentLoaded', () => {
    const timeAmountInput = document.getElementById('timeAmountInput');
    const saveButton = document.getElementById('saveButton');
  
    // Load the current time amount value
    chrome.storage.sync.get('timeAmount', (result) => {
      timeAmountInput.value = result.timeAmount || '';
    });
  
    saveButton.addEventListener('click', () => {
      const timeAmount = parseInt(timeAmountInput.value, 10);
  
      if (Number.isNaN(timeAmount) || timeAmount <= 0) {
        alert('Please enter a valid time amount.');
        return;
      }
  
      chrome.storage.sync.set({ timeAmount }, () => {
        alert('Time amount saved successfully!');
  
        // Send message to background script to update the timer duration
        chrome.runtime.sendMessage({ action: 'updateTimer', timeAmount }, () => {
          // Clear the input field after saving
          timeAmountInput.value = '';
        });
      });
    });
  });
  
  
  
  