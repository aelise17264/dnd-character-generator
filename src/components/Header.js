// import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDAndD } from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <header className="App-header">
      <h1 className="title">
        Dungeons
        <a>
          <FontAwesomeIcon icon={faDAndD} style={{ color: "#fafafa" }} />
        </a>
        Dragons 5e <br />
        Character Generator
      </h1>
    </header>
  );
}

export default Header;
