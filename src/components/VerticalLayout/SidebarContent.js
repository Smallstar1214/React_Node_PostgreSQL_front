import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";


// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);


  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("authUser")));

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        {authUser.role === "1" ?
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              {/* <li className="menu-title">{props.t("Menu")} </li> */}
              <li>
                <Link to="/campaigns" className="has-arrow">
                  <i className="bx bx-home-circle"></i>
                  <span>{props.t("Campaigns")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/campaigns/list">
                      {props.t("List")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/campaign/save/0">{props.t("New")}</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/users" className="has-arrow">
                  <i className="bx bx-user"></i>
                  <span>{props.t("User")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/users/list">
                      {props.t("List")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/userSave/0">{props.t("New")}</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div> :
          authUser.role === "2" ?
            <div id="sidebar-menu">
              <ul className="metismenu list-unstyled" id="side-menu">
                {/* <li className="menu-title">{props.t("Menu")} </li> */}
                <li>
                  <Link to="/campaigns" className="has-arrow">
                    <i className="bx bx-home-circle"></i>
                    <span>{props.t("Campaigns")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/campaigns/list">
                        {props.t("List")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/campaign/save/0">{props.t("New")}</Link>
                    </li>
                  </ul>
                </li>                
              </ul>
            </div> :
            <div id="sidebar-menu">
              <ul className="metismenu list-unstyled" id="side-menu">
                {/* <li className="menu-title">{props.t("Menu")} </li> */}
                <li>
                  <Link to="/campaigns" className="has-arrow">
                    <i className="bx bx-home-circle"></i>
                    <span>{props.t("Campaigns")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/campaigns/list">
                        {props.t("List")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
        }
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
