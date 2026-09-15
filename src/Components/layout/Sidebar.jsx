import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">D</div>

        <div>
          <h1>D3S</h1>
          <span>3D Reconstruction</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section-title">WORKSPACE</p>

        <NavLink to="/" className="nav-item">
          <span>▦</span>
          Dashboard
        </NavLink>

        <NavLink to="/projects" className="nav-item">
          <span>◫</span>
          Projects
        </NavLink>

        <p className="nav-section-title pipeline-title">PIPELINE</p>

        <NavLink to="/processing" className="nav-item">
          <span>◉</span>
          Processing
        </NavLink>

        <NavLink to="/reconstruction" className="nav-item">
          <span>◇</span>
          Reconstruction
        </NavLink>

        <NavLink to="/results" className="nav-item">
          <span>↗</span>
          Results
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/settings" className="nav-item">
          <span>⚙</span>
          Settings
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;