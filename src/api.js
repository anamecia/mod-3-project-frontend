

// const mapBoxURL = `https://randopic.herokuapp.com/images/${mapBoxAccessToken}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

//API Functions

function get(url){
    return fetch(url)
        .then(response => response.json())
}

function post(url, configObj){
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(configObj)
    })
        .then(response => response.json())
}






