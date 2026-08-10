import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function Splash() {
  const navigate = useNavigate();

  return (
    <div className="splash-screen">

      <div className="splash-content">

        <Logo large />

        <button
          className="primary-button splash-button"
          onClick={() => navigate("/home")}
        >
          Get Started
        </button>

      </div>

    </div>
  );
}

export default Splash;