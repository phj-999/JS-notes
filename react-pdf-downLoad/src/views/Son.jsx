import React from 'react'

const Son = (props) => {
  const {c,handlecounter} = props
  const handle = () => {
    handlecounter(c+1)
  }
  
  return (
    <>
    <div>Son</div>
    <div>{c}</div>
    <div onClick={handle}>+</div>
    </>
  )
}

export default Son