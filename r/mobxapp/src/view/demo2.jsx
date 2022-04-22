import React from 'react'
import { useStore } from '@/store-modal-2/index'

const Demo2 = () => {
    const root = useStore()
    console.log(root,'2');
  return (
    <div>demo2</div>
  )
}

export default Demo2