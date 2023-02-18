
import React, {useState, useEffect} from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
    const [html, setHtml]= useLocalStorage('html', '')
    const [css, setCss]= useLocalStorage('css','')
    const [js, setJs]= useLocalStorage('js','')
    const [srcDoc, setSrcDoc]= useState('')

    useEffect(() => {
        const timeout= setTimeout(() => {
        setSrcDoc(`
                <html>
                <body>${html}</body>
                <body>${css}</body>
                <body>${js}</body>
                </html>
                `)
        }, 250)
        return () => clearTimeout(timeout)
    }, [html,css,js])
    
  return (
    <>
    <div className="pane top-pane">
        <Editor displayName="HTML"
                language="xml"                             
                value={html}
                onChange={setHtml}
        />
        <Editor displayName="CSS"
                language="css"
                value={css}
                onChange={setCss}
        />
        <Editor displayName="JS"
                language="javascript"
                value={js}
                onChange={setJs}
        />
    </div>
    <div className="pane">
        <iframe srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                border="none"
                height="100%"
                width="100%" 
        />
    </div>
    </>   
  );
}

export default App;
