//Page Elements
// let mapDisplay = document.querySelector("#map")

//Creating Element
function createElement(tag, options = {}) {
    const el = document.createElement(tag)
    if (options.innerText) el.innerText = options.innerText
    if (options.onClick) el.addEventListener("click", options.onClick)
    return el
}

// mapDisplay.append(startButton)
