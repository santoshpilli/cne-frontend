
'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const Editor = () => {
    const [theme, setTheme] = useState('vs-dark');
    const [content, setContent] = useState('');

    useEffect(() => {
        console.log('Editor component mounted');
    }, []);

    const handleEditorChange = (value) => {
        setContent(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted content:', content);

    };

    return (
        <div className="flex h-screen">
            <div className="flex-1">
                <MonacoEditor
                    height="100%"
                    language="json"
                    value={content}
                    theme={theme}
                    onChange={(value) => handleEditorChange(value)}
                />
            </div>
            <div className="flex flex-col justify-start p-4">
                <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark')}>
                    Toggle Theme
                </button>
            </div>
        </div>
    );
};

export default Editor;



