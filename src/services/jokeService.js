export const handleAddJoke = (joke) => {
    return fetch("http://localhost:8088/jokes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(joke)
    }).then(res => res.json())
}

export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then(res => res.json())

}

export const handleToldToggle = (joke) => {
    return fetch(`http://localhost:8088/jokes/${joke.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({ told: !joke.told })
    }).then(res => res.json())
}

export const handleJokeDelete = (joke) => {
    return fetch(`http://localhost:8088/jokes/${joke.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    }).then(res => res.json())
}