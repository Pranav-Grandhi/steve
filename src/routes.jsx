import { lazy, Suspense } from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

// Auto generates routes from files under ./pages // https://vitejs.dev/guide/features.html#glob-import
const ROUTES = import.meta.glob("./pages/**/[a-z[]*.jsx");

const routes = Object.keys(ROUTES).map((route) => {
  const path = route.replace(/\.\/pages|index|\.jsx$/g, "");

  return { path, component: lazy(ROUTES[route]) };
});

export function Routes() {
  return (
    <>
      {" "}
      <Suspense fallback={"Loading..."}>
        {" "}
        <RouterRoutes>
          {" "}
          {routes.map(({ path, component: Component }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })}{" "}
        </RouterRoutes>{" "}
      </Suspense>{" "}
    </>
  );
}
