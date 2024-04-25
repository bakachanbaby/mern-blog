import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'
const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ],
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'code-block'
]
const CreatePost = () => {

    const [title, setTitle] = React.useState('')
    const [summary, setSummary] = React.useState('')
    const [content, setContent] = React.useState('')
    const [file, setFile] = React.useState<any>(null)
    const [redirect, setRedirect] = React.useState(false)

    const create = async (e: React.FormEvent) => {
        const data = new FormData()
        data.append('title', title)
        data.append('summary', summary)
        data.append('content', content)
        data.append('file', file[0])
        e.preventDefault()
        try {
            const req = await fetch('http://localhost:4000/post', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include'
            })
            if (req.ok) {
                setRedirect(true)
            }

        } catch (error) {
            console.error(error)
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }


    return (
        <form onSubmit={create}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="summary"
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <input
                type='file'
                onChange={(e) => setFile(e.target.files)}
            />
            <ReactQuill
                value={content}
                onChange={(value) => setContent(value)}
                modules={modules}
            // formats={formats}
            />
            <button style={{ marginTop: 5 }}>Create post</button>
        </form>
    )
}

export default CreatePost