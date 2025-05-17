chrome.storage.local.get(["scraping", "collected"], ({ scraping, collected }) => {
    if (!scraping) return

    const titles = Array.from(document.querySelectorAll("a"))
        .map(a => ({ title: a.textContent.trim(), url: a.href }))


    const previous = collected || []
    const updated = [...previous, ...titles]

    chrome.storage.local.set({ collected: updated }, () => {
        const nextLink = document.querySelector(".next")?.href
        if (nextLink) {
            setTimeout(() => {
                window.location.href = nextLink
            }, 1000)
        } else {
            const blob = new Blob(
                [JSON.stringify(updated, null, 2)],
                { type: "application/json" }
            )
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "titles.json"
            a.click()

            chrome.storage.local.remove(["collected", "scraping"])
        }
    })
})
