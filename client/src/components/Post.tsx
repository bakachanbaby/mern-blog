import React from 'react'
import { Link } from 'react-router-dom'

interface PostProps {
    title: string
    summary: string
    cover: string
    content: string
    createdAt: any
    author: any
    _id: string
}

const Post = (props: PostProps) => {

    const { _id, title, summary, cover, content, createdAt, author } = props

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

    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={'http://localhost:4000/' + cover} alt="" />
                </Link>
            </div>
            <div className="text">
                <Link to={`/post/${_id}`} className="title">
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a href="" className="author">{author.username}</a>
                    <time>{timeAgo(createdAt)}</time>
                </p>
                <p className='summary'>{summary}</p>
            </div>

        </div>
    )
}

export default Post