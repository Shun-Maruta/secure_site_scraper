
document.getElementById("start").addEventListener("click", async () => {
    chrome.storage.local.set({ scraping: true })
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
    })
})
