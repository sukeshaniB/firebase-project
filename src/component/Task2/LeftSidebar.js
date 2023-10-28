import React, { useEffect, useState } from "react";

import { signOut } from "firebase/auth";
import { database } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import user from "./assets/user.jpg";
import logo from "./assets/webscript.png"
import LeftSidebar from "./LeftSidebar.css"
import MenuItem from "./MenuItem";

/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
 
  {
    name: "Home",
    exact: true,
    to: `/Home`,
    iconClassName: "bi bi-speedometer2",
  },
  { name: "Notifications", to: `/Notifications`, iconClassName: "bi bi-vector-pen" },
  {
    name: "Shop",
    exact: true,
    to: `/Shop`,
    iconClassName: "bi bi-speedometer2",
  },
  { name: "Conversation", to: `/Conversation`, iconClassName: "bi bi-vector-pen" },
  { name: "Wallet", to: `/Wallet`, iconClassName: "bi bi-vector-pen" },
  { name: "Subscription", to: `/Subscription`, iconClassName: "bi bi-vector-pen" },

  { name: "My Profile", to: `/My Profile`, iconClassName: "bi bi-vector-pen" },
  { name: "Settings", to: `/Settings`, iconClassName: "bi bi-vector-pen" },
];

const SideMenu = ({onCollapse}) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }
    onCollapse && typeof onCollapse === 'function' && onCollapse(inactive);
}, [inactive, onCollapse]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
    
  */
    const history = useNavigate()

    const handleClick = () =>{
        signOut(database).then(val=>{
            console.log(val,"val")
            history('/')
        })
    }
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>
      <div className="side-menu-footer">
        <div className="avatar">
          <i className="bi bi-arrow-left-circle-fill"></i>
        </div>
        <div className="user-info">
        <button onClick={handleClick}>Log Out</button>
        </div>
      </div>
    </div>
    
  );
};

export default SideMenu;

