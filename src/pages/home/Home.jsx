import '../home/home.css';
import Background from "../../Components/backgroundComponent/Background";
import { useNavigate } from 'react-router-dom';

function Home({ background }) {
  const navigate = useNavigate();
  return (
      <div className="home-wrap">
        <section className="hero">
          <h1 className="hero-title">Welcome back!</h1>
          <p className="hero-subtitle">Ready to organize your day and crush your goals?</p>
          <div className="quick-actions">
            <button className="action-btn" onClick={() => navigate('/tasks')}>+ Add Task</button>
          </div>
        </section>
      </div>
  );
}

export default Home;