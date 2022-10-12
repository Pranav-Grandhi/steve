import { Fragment } from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const ROUTES = import.meta.glob("./pages/**/*.jsx", { eager: true });

const routes = Object.keys(ROUTES).map((route) => {
  const name = route.match(/\.\/pages\/(.*)\.jsx$/)[1];
  return {
    name,
    path: name === "index" ? "/" : `/${name.toLowerCase()}`,
    component: ROUTES[route].default,
  };
});

export function Routes() {
  const FourOhFour = routes.find((route) => route.name === "404").component;

  return (
    <>
      <RouterRoutes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />} />;
        })}
        <Route
          path="*"
          element={FourOhFour()}
        />
      </RouterRoutes>
    </>
  );
}
