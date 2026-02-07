import { Link } from "react-router-dom";

const NavPanel = () => {
    return (
        <div id="navPanel">
            <nav>
                <Link to="/">Dashboard</Link> |{" "}
                <Link to="/submit">Submit</Link>
            </nav>
        </div>
    );
  };
  
  export default NavPanel;