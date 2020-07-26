import React from "react";

const SearchBar = React.lazy(() => import("./views/SearchBar"));
const Counter = React.lazy(() => import("./views/Counter"));
const About = React.lazy(() => import("./views/about/About"));

const routesLoggedIN = [
  { path: "/", exact: true, name: "Live Counter", component: SearchBar },
  { path: "/counter", exact: true, name: "Counter", component: Counter },
  { path: "/about", exact: true, name: "About", component: About },
];

export default routesLoggedIN;
