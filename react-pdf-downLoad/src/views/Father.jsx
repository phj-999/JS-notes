import React, {useState} from 'react'
import Son from './Son'

const Father = () => {
  const [counter,setCounter] = useState(100)
  return (
    <>
    <div>Father</div>
    <div>--------------------------------</div>
    <Son c={counter} handlecounter={setCounter}/>
    </>
  )
}

export default Father