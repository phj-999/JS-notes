import React from 'react'
import { useRecoilValueLoadable } from 'recoil'

const pages2 = () => {

    const {state, contents} = useRecoilValueLoadable(postListAtom)

    switch (state) {
        case 'hasValue':
            return <PostList list={contents.data.list}/>;
        
        case 'hasError':
            return contents.msg
         
        case 'loading':
            return <Loading/>    
        default:
            return 'xxx';
    }
  return (
    <div>异步hooks</div>
  )
}

export default pages2