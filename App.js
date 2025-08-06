import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // Add more as needed
import './App.css';

function App() {
    const [snippets, setSnippets] = useState([]);
    const [form, setForm] = useState({ title: '', language: '', code: '' });

    useEffect(() => {
        fetchSnippets();
    }, []);

    useEffect(() => {
        Prism.highlightAll();
    }, [snippets]);

    const fetchSnippets = async () => {
        const res = await axios.get('http://localhost:5000/snippets');
        setSnippets(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/snippets', form);
        setForm({ title: '', language: '', code: '' });
        fetchSnippets();
    };

    const deleteSnippet = async (id) => {
        await axios.delete(`http://localhost:5000/snippets/${id}`);
        fetchSnippets();
    };

    return (
        <div className="App">
            <h1>Code Manager</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                />
                <input
                    placeholder="Enter Language"
                    value={form.language}
                    onChange={e => setForm({ ...form, language: e.target.value })}
                />
                <textarea
                    placeholder="Your code.."
                    value={form.code}
                    onChange={e => setForm({ ...form, code: e.target.value })}
                />
                <button type="submit">Add Snippet</button>
            </form>

            <div>
                {snippets.map(snippet => (
                    <div key={snippet._id} style={{ marginBottom: '20px' }}>
                        <h3>{snippet.title}</h3>
                        <pre>
                            <code className={`language-${snippet.language}`}>
                                {snippet.code}
                            </code>
                        </pre>
                        <button onClick={() => deleteSnippet(snippet._id)}> Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
