import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import Home from "@/pages/Home";
import Testimonials from "@/pages/Testimonials";
import ServicesPage from "@/pages/ServicesPage";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import Admin from "@/pages/Admin";
import Stats from "@/pages/Stats";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function PageTracker() {
  const [location] = useLocation();
  useEffect(() => {
    // Don't track admin or stats pages
    if (location.startsWith("/admin") || location.startsWith("/stats")) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: location, referrer: document.referrer }),
    }).catch(() => {});
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <PageTracker />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/admin" component={Admin} />
        <Route path="/stats" component={Stats} />
        <Route component={NotFound} />
      </Switch>
    </>
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
      <Analytics />
    </HelmetProvider>
  );
}

export default App;
