import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ComingSoon from "./components/ComingSoon/ComingSoon.js";
import MyNavbar from "./components/MyNavbar/MyNavbar.js";
import Footer from "./components/Footer/Footer.js";
import Blog from "./components/Blog/Blog.js";
import BlogPosts from "components/BlogPosts/BlogPosts";
import BlogPost from "components/BlogPost/BlogPost";
import Register from "./components/Register/Register.js";
import reportWebVitals from "./reportWebVitals";
import Admin from "./components/Admin/Admin.js";
import Test from "./components/Test/Test";
import CreatePost from "components/CreatePost/CreatePost";
import EditPost from "components/EditPost/EditPost";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";

import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "components/Login/Login";
import { AuthProvider } from "react-auth-kit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <HashRouter>
        <MyNavbar />
        <div className="pages">
          <Routes>
            <Route path="/comingsoon" element={<ComingSoon />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/posts" element={<BlogPosts />} />
            <Route
              path="/blog/post/:postId"
              element={
                <ProtectedRoute
                  accessType="viewPost"
                  reject="/blog/posts"
                  component={<BlogPost />}
                  key={"viewPost"}
                />
              }
            />
            <Route
              path="/blog/edit/:postId"
              element={
                <ProtectedRoute
                  accessType="editPost"
                  reject="/blog"
                  component={<EditPost />}
                  key={"editPost"}
                />
              }
            />
            <Route
              path="/blog/create"
              element={
                <ProtectedRoute
                  accessType="createPost"
                  key={"createPost"}
                  reject="/blog"
                  component={<CreatePost />}
                />
              }
            />
            <Route
              path="/blog/admin"
              element={
                <ProtectedRoute
                  accessType="admin"
                  key={"admin"}
                  reject="/blog"
                  component={<Admin />}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<App />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
        <Footer />
      </HashRouter>
    </AuthProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
