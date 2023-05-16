import JoditEditor from 'jodit-react'
import React, { useRef } from 'react'

export const ReactEditor = ({ description, setDescription }) => {
  const editor = useRef(null)

  return (
    <JoditEditor
      ref={editor}
      value={description}
      onChange={(newContent) => {
        setDescription(newContent)
      }}
    />
  )
}
