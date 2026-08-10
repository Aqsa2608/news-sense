import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div
        className="header-logo"
        onClick={() => navigate("/")}
      >
        <Logo />
      </div>

      <nav>
        <button onClick={() => navigate("/")}>
          Analyze
        </button>
      </nav>
    </header>
  );
}

export default Header;