import { useState } from 'react'
import CardList from './components/CardList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <CardList />
    </>
  )
}

export default App
