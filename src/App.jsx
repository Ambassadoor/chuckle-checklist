import { useEffect, useState } from "react"
import { handleAddJoke, getAllJokes, handleToldToggle, handleJokeDelete } from "./services/jokeService.js"
import "./App.css"

export const App = () => {
  const [pendingOneLiner, setPendingOneLiner] = useState("")
  const [allJokes, setAllJokes] = useState([])
  
  useEffect(() => {
    getAllJokes().then(setAllJokes)
  }, [])

  const handleToggleJoke = async (joke) => {
    // Update local state immediately
    setAllJokes(prevJokes => 
      prevJokes.map(j => 
        j.id === joke.id ? { ...j, told: !j.told } : j
      )
    )
    
    // Sync with server
    await handleToldToggle(joke)
  }

  const handleDeleteJoke = async (joke) => {
    setAllJokes(prevJokes =>
      prevJokes.filter(j => j.id !== joke.id )
    )

    await handleJokeDelete(joke)
  }

  const handleAddAndRefresh = async () => {
    await handleAddJoke({"text" : pendingOneLiner, "told" : false})
    setPendingOneLiner("")
    getAllJokes().then(setAllJokes)
  }

  const untoldJokes = allJokes.filter(joke => !joke.told)
  const toldJokes = allJokes.filter(joke => joke.told)

  return (
    <>
      <div className="app-container">
        <header className="app-heading">Chuckle Checklist</header>
        <div>
          <h2 style={{border: "none", borderBottom: "3px solid var(--col-2)", padding: "0.25rem 0"}}>Add Joke</h2>
          <div className="joke-add-form">
            <input className="joke-input" type="text" placeholder="New One Liner" value={pendingOneLiner} onChange={(e) => {
              setPendingOneLiner(e.target.value)
            }}></input>
            <button className="joke-input-submit" type="submit" onClick={handleAddAndRefresh}>Add</button>
          </div>
        </div>
        <div className="joke-lists-container">
          <div className="joke-list-container">
            <h2 style={{border: "none", borderBottom: "3px solid var(--col-2)", padding: "0.25rem 0"}}>Untold
              <span className="untold-count">{untoldJokes.length}</span>
            </h2>
            <ul>
              {untoldJokes.map(joke => 
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke?.text}</p>
                  <div className="joke-list-action-delete">
                    <button onClick={() => handleDeleteJoke(joke)}>🗑️</button>
                  </div>
                  <div className="joke-list-action-toggle">
                    <button onClick={() => handleToggleJoke(joke)}>😀</button>
                  </div>
                </li>)}
            </ul>
          </div>
          <div className="joke-list-container">
            <h2 style={{border: "none", borderBottom: "3px solid var(--col-2)", padding: "0.25rem 0"}}>Told
              <span className="told-count">{toldJokes.length}</span>
            </h2>
            <ul>
              {toldJokes.map(joke => 
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <div className="joke-list-action-delete">
                  <button onClick={() => handleDeleteJoke(joke)}>🗑️</button>
                </div>
                <div className="joke-list-action-toggle">
                  <button onClick={() => handleToggleJoke(joke)}>☹️</button>
                </div>
              </li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
