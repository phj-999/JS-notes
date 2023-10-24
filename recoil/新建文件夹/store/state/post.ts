import { DefaultValue, atomFamily, selector, selectorFamily } from 'recoil';
// 文章列表
export const postListAtom = selector({
    key: 'postListAtom',
    get: ({get}) => postApi.getPostList()
})

export const postDetailAtom = atomFamily({
    key: 'postDetailAtom',
    default: selectorFamily({
        key: 'postDetailAtom/Default',
        get: postId => async ({get}) => {
            const res = await postApi.getPostDetail(postId)
            if (res.status = 200) {
                return res.data
            }
            return ''
        }
    })
})