import type React from "react";
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from "react-router";
import { MotionConfig } from "motion/react";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { ThemeComposer } from "./components/ThemeComposer";
import { ThemeProvider } from "./lib/theme";
import Home from "./pages/Home";

// Home ships in the main bundle; the other pages load on first visit.
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({ Component: (await load()).default });

function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ThemeComposer />
    </>
  );
}

// A data router is required for <Link viewTransition> (View Transitions API).
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "work", lazy: page(() => import("./pages/Work")) },
      { path: "work/:id", lazy: page(() => import("./pages/Project")) },
      { path: "resume", lazy: page(() => import("./pages/Resume")) },
      { path: "*", lazy: page(() => import("./pages/NotFound")) },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </ThemeProvider>
  );
}
