// import Router from 'next/router';
// import Cookies from 'js-cookie';
// import { fetcher } from './api';

// export const setToken = (data) => {
//   if (typeof window === 'undefined') {
//     return;
//   }
//   Cookies.set('id', data.user.id);
//   Cookies.set('username', data.user.username);
//   Cookies.set('jwt', data.jwt);

//   if (Cookies.get('username')) {
//     Router.reload('/');
//   }
// };

// export const unsetToken = () => {
//   if (typeof window === 'undefined') {
//     return;
//   }
//   Cookies.remove('id');
//   Cookies.remove('jwt');
//   Cookies.remove('username');

//   Router.reload('/');
// };

// export const getUserFromLocalCookie = () => {
//   const jwt = getTokenFromLocalCookie();
//   if (jwt) {
//     return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${jwt}`,
//       },
//     })
//       .then((data) => {
//         return data.username;
//       })
//       .catch((error) => console.error(error));
//   } else {
//     return;
//   }
// };

// export const getIdFromLocalCookie = () => {
//   const jwt = getTokenFromLocalCookie();
//   if (jwt) {
//     return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${jwt}`,
//       },
//     }).then((data) => {
//       return data.id;
//     });
//   } else {
//     return;
//   }
// };

// export const getTokenFromLocalCookie = () => {
//   return Cookies.get('jwt');
// };

// export const getTokenFromServerCookie = (req) => {
//   if (!req.headers.cookie || '') {
//     return undefined;
//   }
//   const jwtCookie = req.headers.cookie
//     .split(';')
//     .find((c) => c.trim().startsWith('jwt='));
//   if (!jwtCookie) {
//     return undefined;
//   }
//   const jwt = jwtCookie.split('=')[1];
//   return jwt;
// };

// export const getIdFromServerCookie = (req) => {
//   if (!req.headers.cookie || '') {
//     return undefined;
//   }
//   const idCookie = req.headers.cookie
//     .split(';')
//     .find((c) => c.trim().startsWith('id='));
//   if (!idCookie) {
//     return undefined;
//   }
//   const id = idCookie.split('=')[1];
//   return id;
// };

/* /lib/auth.js */

import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:1337";

//register a new user
export const registerUser = (username, email, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const login = (identifier, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const logout = () => {
  //remove token and user cookie
  Cookie.remove("token");
  delete window.__user;
  // sync logout between multiple windows
  window.localStorage.setItem("logout", Date.now());
  //redirect to the home page
  Router.push("/");
};

//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
// THIS IS NOT USED in the tutorial, only provided if you wanted to implement
export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
