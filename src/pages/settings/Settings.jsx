import Background from "../../Components/backgroundComponent/Background";
import '../settings/settings.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ImageBackgroundSelector from './ImageBackgroundSelector';
import defaultBg from "../../Components/backgroundComponent/images/anunay-rai-_a6zxdgt9Qs-unsplash.jpg";

function Settings({ background, setBackground }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSelectorPage = location.pathname === '/settings/backgrounds';
  return (
      <div id="layout3">
        {!isSelectorPage && (
          <div className="settings-card">
            <h2 className="settings-title">Settings</h2>
            <div className="settings-option">
              <label>
                <input type="checkbox" /> Dark Mode
              </label>
            </div>
            <div className="settings-option">
              <label>
                <input type="checkbox" /> Email Notifications
              </label>
            </div>
            <div className="settings-option">
              <label>
                <input type="checkbox" /> Task Reminders
              </label>
            </div>
            <Link to="/settings/backgrounds" className="set-bg-btn" style={{ marginTop: '1rem' }}>Choose Background Image</Link>
            <button className="set-bg-btn" style={{ marginTop: '1rem', background: '#f3f4f6', color: '#6366f1' }} onClick={() => { setBackground('light'); localStorage.setItem('background', 'light'); }}>
              Remove Background (Set to Solid Color)
            </button>
          </div>
        )}
        {isSelectorPage && (
          <ImageBackgroundSelector setBackground={img => { setBackground(img); navigate('/settings'); }} background={background} />
        )}
      </div>
  );
}

export default Settings;