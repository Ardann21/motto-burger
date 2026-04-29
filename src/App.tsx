import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// Lazy-load non-critical routes for faster initial page load
const Menu = lazy(() => import("./pages/Menu"));
const Journal = lazy(() => import("./pages/Journal"));
const Origin = lazy(() => import("./pages/Origin"));
const Locations = lazy(() => import("./pages/Locations"));
const Reserve = lazy(() => import("./pages/Reserve"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="w-12 h-12 border-t-2 border-accent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <ScrollToTop />
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/origin" element={<Origin />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/reserve" element={<Reserve />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
