import { Routes as RouterRoutes, Route } from "react-router-dom";

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob("./pages/*.jsx", { eager: true });

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
  return {
    name,
    path: name === "index" ? "/" : `/${name.toLowerCase()}`,
    component: pages[path].default,
  };
});

export function Routes() {
  return (
    <>
      <RouterRoutes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />}></Route>;
        })}
      </RouterRoutes>
    </>
  );
}
