import { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";

function DeferredAnalytics() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = requestIdleCallback(() => setShow(true));
    return () => cancelIdleCallback(id);
  }, []);
  if (!show) return null;
  const Analytics = lazy(() => import("@vercel/analytics/react").then(m => ({ default: m.Analytics })));
  return <Suspense fallback={null}><Analytics /></Suspense>;
}
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const BlogIndex = lazy(() => import("@/pages/BlogIndex"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
      <DeferredAnalytics />
    </HelmetProvider>
  );
}

export default App;
