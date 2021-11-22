/**自定义httphook
 * 
 */
import { useState, useEffect } from 'react'

export default function useHTTPhook({
    url,
    method='post',
    headers,//请求头
    body = {},//传递的参数 针对post的请求
    watch = [] // 依赖项
}) {
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(true)

    async function Http() {
        let params
        const defaultHeader = {
            'Content-type': 'application/json'
        }
        if (method.toUpperCase() === 'GET') {
            params = undefined
        } else {
            params = {
                headers: { ...defaultHeader, headers },
                method,
                body: JSON.stringify(body)
            }
        }
        setLoading(true)
        return new Promise((resolve, reject) => {
            fetch('/api' + url, params).then(res => res.json()).then(res => {
                if (res.status === 200) {
                    resolve(res.data)
                    setResult(res.data)
                } else {
                    Toast.fail(res.errMsg)
                    reject(res.errMsg)
                }
            }).catch(err => {
                Toast.fail(res.errMsg)
                reject(res.errMsg)
            }).finally(() => {
                setLoading(false)
            })
        })
    }

    useEffect(() => {
        Http()
    }, [watch])

    return result,loading
}


//use
const [result,loading]=useHTTPhook({
    url:'/getLists',method:'get'
})