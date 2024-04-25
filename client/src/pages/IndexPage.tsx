import React, { useContext, useEffect } from 'react'
import Post from '../components/Post'
import { UserContext } from '../UserContext'

const IndexPage = () => {

    const [posts, setPosts] = React.useState([])
    const { userInfo, setUserInfo } = useContext(UserContext)
    useEffect(() => {
        getALlPost()
    }, [])

    const getALlPost = async () => {
        try {
            const req = await fetch('http://localhost:4000/post')
            const res = await req.json()
            console.log(res)
            setPosts(res)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {(posts && posts.length > 0) && posts.map((post: any) => (
                <Post {...post} />
            ))}
        </>
    )
}

export default IndexPage