import { NavLink } from "react-router-dom";

const Navigation = () => {
return (
  <nav className="bg-white ">
    <ul className="flex justify-center gap-20">
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/editor'}>Editor</NavLink>
      </li>
      <li>
        <a>
          Learn
        </a>
      </li>
      <li>
        <a>
          About
        </a>
      </li>
    </ul>
  </nav>
);
};

export default Navigation;