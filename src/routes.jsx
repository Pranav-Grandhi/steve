import { Routes as RouterRoutes, Route } from "react-router-dom";

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const ROUTES = import.meta.glob("./pages/**/[a-z[]*.jsx", { eager: true });

const routes = Object.keys(ROUTES).map((route) => {
  const path = route.replace(/\.\/pages|index|\.jsx$/g, "");

  return {
    path,
    component: ROUTES[route].default(),
  };
});

export function Routes() {
  return (
    <>
      <RouterRoutes>
        {routes.map(({ path, component }) => {
          return <Route key={path} path={path} element={component} />;
        })}
      </RouterRoutes>
    </>
  );
}
