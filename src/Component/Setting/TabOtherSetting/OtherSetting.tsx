export default function OtherSettings() {
    return (
      <div className="card">
        <h3>Other Settings</h3>
        <form id="other-settings-form">
          <label>
            Update Interval (seconds):
            <input type="number" min="1" max="60" defaultValue="5" />
          </label>
          <label>
            Enable Notifications:
            <input type="checkbox" defaultChecked />
          </label>
          <button type="submit">Save Other Settings</button>
        </form>
      </div>
    );
  };