import { useState, useEffect } from 'react'
import UserList from './components/UserList';
import './index.css'

function App() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
            <header className="app-header">
                <h1>User Directory</h1>
                <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </header>
            <main>
                <UserList />
            </main>
        </div>
    )
}

export default App
