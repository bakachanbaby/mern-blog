import React, { useEffect } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../components/Editor'
import ReactQuill from 'react-quill'


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

const EditPost = () => {

    const { id } = useParams()
    const [title, setTitle] = React.useState('')
    const [summary, setSummary] = React.useState('')
    const [content, setContent] = React.useState<any>("")
    // const [cover, setCover] = React.useState<any>("")
    const [file, setFile] = React.useState<any>(null)
    const [redirect, setRedirect] = React.useState(false)

    useEffect(() => {
        getPostById()
    }, [])

    useEffect(() => {
        console.log(content);

    }, [content])

    const getPostById = async () => {
        try {
            const req = await fetch('http://localhost:4000/post/' + id)
            const res = await req.json()
            console.log(res)
            setTitle(res.title)
            setSummary(res.summary)
            setContent(res.content)

        } catch (error) {
            console.error(error)
        }
    }

    const edit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = new FormData()
        data.append('title', title)
        data.append('summary', summary)
        data.append('content', content)
        // data.append('id', id)
        if (file) data.append('file', file[0])
        try {
            const req = await fetch('http://localhost:4000/post/' + id, {
                method: 'PUT',
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
        return <Navigate to={`/post/` + id} />
    }

    return (
        <form onSubmit={edit}>
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
                theme='snow'
                onChange={setContent}
                modules={modules}
            // formats={formats}
            />
            <button style={{ marginTop: 5 }}>Create post</button>
        </form>
    )
}

export default EditPost