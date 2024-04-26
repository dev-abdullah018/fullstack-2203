import React, { useState } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Registration from "../pages/Registration";
import OtpVerification from "../pages/OtpVerification";
import Login from "../pages/Login";
import EmailVerifyLink from "../pages/EmailVerifyLink";
import Forgotpass from "../pages/Forgotpass";
import NewPassword from "../pages/NewPassword";
import Dashboard from "../pages/Dashboard";
import AddCategory from "../pages/AddCategory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpass" element={<Forgotpass />} />
      <Route path="/newpass/:token" element={<NewPassword />} />
      <Route path="/emailverification/:token" element={<EmailVerifyLink />} />
      <Route path="/otpverification/:email" element={<OtpVerification />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="addcategory" element={<AddCategory />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
