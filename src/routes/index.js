import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Campaign
import CampaignList from "pages/Campaign/CampaignList"
import CampaignAdd from "pages/Campaign/CampaignAdd"
import CampaignReportInsert from "pages/Campaign/CampaignReportInsert"
import CampaignExport from "pages/Campaign/CampaignExport"
import CampaignDetail from "pages/Campaign/CampaignDetail"

import UserList from "pages/User/UserList"
import UserAdd from "pages/User/UserAdd"
import UserEdit from "pages/User/UserEdit"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: < Navigate to="/campaigns/list" />,
  },

  // calculate page
  { path: "/campaigns/list", component: <CampaignList /> },
  { path: "/campaign/save/:id", component: <CampaignAdd /> },
  { path: "/campaign/insert/:id", component: <CampaignReportInsert />},
  { path: "/campaign/export/:id", component: <CampaignExport />},
  { path: "/campaign/detail/:id", component: <CampaignDetail /> },

  // User page
  { path: "/users/list", component: <UserList /> },
  { path: "/user/Edit/:id", component:<UserEdit />},
  { path: "/user/add", component: <UserAdd /> },
]

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
]

export { authProtectedRoutes, publicRoutes }