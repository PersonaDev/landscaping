import { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import Testimonials from "@/pages/Testimonials";
import ServicesPage from "@/pages/ServicesPage";
import BlogIndex from "@/pages/BlogIndex";

const Analytics = lazy(() => import("@vercel/analytics/react").then(m => ({ default: m.Analytics })));
function DeferredAnalytics() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const w = window as any;
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setShow(true));
      return () => {
        if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(id);
      };
    }
    const id = window.setTimeout(() => setShow(true), 1500);
    return () => window.clearTimeout(id);
  }, []);
  if (!show) return null;
  return <Suspense fallback={null}><Analytics /></Suspense>;
}
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

interface AppProps {
  ssrPath?: string;
  helmetContext?: Record<string, unknown>;
}

function App({ ssrPath, helmetContext }: AppProps) {
  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter
            base={import.meta.env.BASE_URL.replace(/\/$/, "")}
            {...(ssrPath ? { ssrPath } : {})}
          >
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
