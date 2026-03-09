import Background from "../../Components/backgroundComponent/Background";
import "../account/account.css"
import { FaUser } from "react-icons/fa";

function Account({ background }) {
  return (
      <div id="layout">
        <div className="account-card">
          <div className="account-header">
            <FaUser className="account-avatar" />
            <h2 className="account-title">My Account</h2>
          </div>
          <div className="account-info">
            <div className="account-row">
              <span className="account-label">Email: </span>
              <span className="account-value">amosmangera39@gmail.com</span>
            </div>
            <div className="account-row">
              <span className="account-label">Username: </span>
              <span className="account-value">amosmangera</span>
            </div>
          </div>
          <button className="change-pass">Change password</button>
        </div>
      </div>
  );
}

export default Account;