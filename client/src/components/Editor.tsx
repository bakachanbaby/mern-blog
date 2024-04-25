import React from 'react'
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

const Editor = (value: any, onChange: any) => {
    return (
        <ReactQuill
            value={value}
            theme='snow'
            onChange={onChange}
            modules={modules}
        // formats={formats}
        />
    )
}

export default Editor