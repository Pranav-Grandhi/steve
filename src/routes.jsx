import { lazy, Suspense } from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

// Auto generates routes from files under ./pages // https://vitejs.dev/guide/features.html#glob-import
const PRESERVED = import.meta.glob("./pages/404.jsx");
const ROUTES = import.meta.glob("./pages/**/[a-z[]*.jsx");

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\.\/pages\/|\.jsx$/g, "");
  return { ...preserved, [key]: lazy(PRESERVED[file]) };
}, {});

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\.\/pages|index|\.jsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  return { path, component: lazy(ROUTES[route]) };
});

export function Routes() {
  const NotFound = preserved?.["404"];

  return (
    <>
      <Suspense>
        <RouterRoutes>
          {routes.map(({ path, component: Component }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })}{" "}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </Suspense>
    </>
  );
}
