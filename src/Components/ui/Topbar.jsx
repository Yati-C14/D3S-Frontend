function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-project">
        <span className="project-label">PROJECT</span>

        <span className="project-name">
          Flight_01
        </span>

        <span className="project-arrow">⌄</span>
      </div>

      <div className="topbar-actions">
        <div className="system-status">
          <span className="status-dot"></span>
          System Ready
        </div>

        <button className="icon-button" aria-label="Settings">
          ⚙
        </button>
      </div>
    </header>
  );
}

export default Topbar;