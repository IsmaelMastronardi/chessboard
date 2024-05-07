import { NavLink } from "react-router-dom";
import '../styles/navigation.css';

const Navigation = () => {
return (
  <nav className="nav">
    <ul>
      <li>
        <img src="../../../images/app_logo.png"/>
      </li>
      <li>
        <NavLink to={'/'} activeclassname="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={'/editor'} activeclassname="active">
          Editor
        </NavLink>
      </li>
      <li>
        <NavLink to={'/Learn'} activeclassname="active">
        Learn
        </NavLink>
      </li>
    </ul>
  </nav>
);
};

export default Navigation;