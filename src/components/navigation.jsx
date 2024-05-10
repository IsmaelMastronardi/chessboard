import { NavLink } from "react-router-dom";
import '../styles/navigation.css';

const Navigation = () => {
return (
  <nav className="nav">
    <ul>
      <li>
        <img src="../../../images/app_logo.png" alt="app logo"/>
      </li>
      <li className="links">
        <NavLink to={'/'} activeclassname="active">
          Home
        </NavLink>
      </li>
      <li className="links">
        <NavLink to={'/editor'} activeclassname="active">
          Editor
        </NavLink>
      </li>
      <li className="links">
        <NavLink to={'/Learn'} activeclassname="active">
        Learn
        </NavLink>
      </li>
    </ul>
    <hr />
    <hr />
  </nav>
);
};

export default Navigation;