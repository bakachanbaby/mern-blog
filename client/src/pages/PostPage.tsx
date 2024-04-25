import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

const PostPage = () => {

    const params = useParams()
    const [postInfo, setPostInfo] = React.useState<any>({})
    const { userInfo, setUserInfo } = React.useContext(UserContext)

    useEffect(() => {
        getPost()
    }, [])

    const timeAgo = (date: any) => {
        const currentDate = new Date()
        const previousDate = new Date(date)
        const diff = currentDate.getTime() - previousDate.getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        if (days > 0) {
            return `${days} ngày trước`
        }
        const hours = Math.floor(diff / (1000 * 60 * 60))
        if (hours > 0) {
            return `${hours} giờ trước`
        }
        const minutes = Math.floor(diff / (1000 * 60))
        if (minutes > 0) {
            return `${minutes} phút trước`
        }
        return 'Vừa xong'
    }

    const getPost = async () => {
        try {
            const req = await fetch(`http://localhost:4000/post/${params.id}`)
            const res = await req.json()
            console.log(res)
            setPostInfo(res)
        } catch (error) {
            console.error(error)
        }
    }

    if (!postInfo) return <></>

    return (
        <div className='post-page'>
            <h1>{postInfo?.title}</h1>
            <time>{timeAgo(postInfo?.createdAt)}</time>
            <div className='author'>by {postInfo?.author?.username}</div>

            {userInfo && userInfo._id === postInfo?.author?._id && (
                <div className='edit-row'>
                    <Link className='edit-btn' to={`/edit/${postInfo?._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="white" d="M13 3a1 1 0 0 1 .117 1.993L13 5H5v14h14v-8a1 1 0 0 1 1.993-.117L21 11v8a2 2 0 0 1-1.85 1.995L19 21H5a2 2 0 0 1-1.995-1.85L3 19V5a2 2 0 0 1 1.85-1.995L5 3zm6.243.343a1 1 0 0 1 1.497 1.32l-.083.095l-9.9 9.899a1 1 0 0 1-1.497-1.32l.083-.094z" /></g></svg>
                        Edit this post</Link>
                </div>
            )}

            <div className="image">
                <img src={`http://localhost:4000/${postInfo?.cover}`} alt="" />
            </div>
            <p>{postInfo?.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: postInfo?.content }} />
        </div >
    )
}

export default PostPage