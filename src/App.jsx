import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [joke, setJeoke] = useState('')
  const [newJoke, setNewJoke] = useState('')
  
  const bringJoke = async ()=> {
    const response = await fetch('https://api.chucknorris.io/jokes/random')
    const data = await response.json()
    setJeoke(data.value)
  }

  const handleChange = (event)=> {
    setNewJoke(event.target.value)
  }

  const handleSubmit = async (event)=> {
    event.preventDefault()
    const joke = {
      value: newJoke
    }
    const response = await fetch(`http://localhost:3000/add_joke`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(joke)
    }).catch((error) => {
      console.error('Error:', error);
    })

    if(response){
      const data = await response.json()
      console.log(data);
      setJeoke(data.value)
      setNewJoke('')
    }
  }
  
  useEffect(()=> {
    bringJoke()
  }, [])

  return (
    <div className="App">
      {joke}
      <br />
      <input value={newJoke} onChange={handleChange} type="text" />
      <br />
      <button onClick={handleSubmit} >submit</button>
    </div>
  )
}

export default App
