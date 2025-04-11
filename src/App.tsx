
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import WasteTracking from "./pages/WasteTracking";
import ReportIssues from "./pages/ReportIssues";
import CollectionPoints from "./pages/CollectionPoints";
import Rewards from "./pages/Rewards";
import Workers from "./pages/Workers";
import CollectionSchedule from "./pages/CollectionSchedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/waste-tracking" element={<WasteTracking />} />
            <Route path="/report-issues" element={<ReportIssues />} />
            <Route path="/collection-points" element={<CollectionPoints />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/collection-schedule" element={<CollectionSchedule />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
