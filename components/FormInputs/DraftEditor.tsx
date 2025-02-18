"use client";

import React, { useState, useEffect } from "react";
import "draft-js/dist/Draft.css";
import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';

interface DraftEditorProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  className?: string;
}

const DraftEditor = ({ label, value, onChange, className }: DraftEditorProps) => {
  const [editorState, setEditorState] = useState(() => {
    if (value instanceof ContentState) {
      return EditorState.createWithContent(value);
    } else {
      return EditorState.createWithContent(ContentState.createFromText(value || ""));
    }
  });

  const handleChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    onChange(newEditorState.getCurrentContent());
  };

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newState);
  };

  const toggleBlockStyle = (style: string) => {
    const newState = RichUtils.toggleBlockType(editorState, style);
    setEditorState(newState);
  };

  useEffect(() => {
    if (value instanceof ContentState) {
      setEditorState(EditorState.createWithContent(value));
    } else {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(value || "")));
    }
  }, [value]);

  return (
    <div className="w-[500px]">
      <label
        htmlFor="content"
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
      >
        {label}
      </label>

      {/* Toolbar for formatting */}
      <div className="draft-editor-toolbar">
        <button className="toolbar-button" onClick={() => toggleInlineStyle('BOLD')}><strong>B</strong></button>
        <button className="toolbar-button" onClick={() => toggleInlineStyle('ITALIC')}><em>I</em></button>
        <button className="toolbar-button" onClick={() => toggleInlineStyle('UNDERLINE')}><u>U</u></button>
        <button className="toolbar-button" onClick={() => toggleInlineStyle('STRIKETHROUGH')}><del>S</del></button>

        {/* Block styles */}
        <button className="toolbar-button" onClick={() => toggleBlockStyle('header-one')}>H1</button>
        <button className="toolbar-button" onClick={() => toggleBlockStyle('unordered-list-item')}>Bullet</button>
        <button className="toolbar-button" onClick={() => toggleBlockStyle('ordered-list-item')}>Numbered</button>
      </div>

      {/* Editor */}
      <div className="draft-editor-content">
        <Editor
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default DraftEditor;
