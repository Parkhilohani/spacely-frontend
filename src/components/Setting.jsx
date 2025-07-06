import React from 'react' 
import './styles.css/Setting.css';

export default function Setting({ darkMode, setDarkMode, emailNotifications, setEmailNotifications}){
    return(
        <div className='setting-container'>

            <div className="setting-item">
                <label>Theme:</label>
                <button onClick={() =>setDarkMode(!darkMode)}>
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </div>

            <div className="setting-item">
                <label>Email Notifications:</label>
                <button onClick={() => setEmailNotifications(!emailNotifications)}>
                    {emailNotifications ? 'Turn Off' : 'Turn On'}
                </button>
            </div>
        </div>
    )
}