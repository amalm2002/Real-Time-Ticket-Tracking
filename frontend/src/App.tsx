import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import { useSelector } from "react-redux";
import { RootState } from "./services/store";

const queryClient = new QueryClient();

const App = () => {
  const isLogin = useSelector((state: RootState) => state.userData.isLoggedIn);
  const userType = useSelector((state: RootState) => state.userData.userType);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>


            {/* Root redirect */}
            <Route
              path="/"
              element={isLogin ? userType === "ADMIN" ? <Navigate to="/admin" replace />
                : <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
              }
            />

            {/* LOGIN */}
            <Route path="/login" element={isLogin ? userType === "ADMIN" ? <Navigate to="/admin" replace />
              : <Navigate to="/dashboard" replace />
              : <Login />
            }
            />

            {/* SIGNUP */}
            <Route path="/signup" element={isLogin ? userType === "ADMIN" ? <Navigate to="/admin" replace />
              : <Navigate to="/dashboard" replace />
              : <SignUp />
            }
            />

            {/* USER DASHBOARD */}
            <Route path="/dashboard" element={!isLogin ? <Navigate to="/login" replace />
              : userType === "ADMIN"
                ? <Navigate to="/admin" replace />
                : <UserDashboard />
            }
            />

            {/* ADMIN DASHBOARD */}
            <Route path="/admin" element={!isLogin ? <Navigate to="/login" replace />
              : userType !== "ADMIN"
                ? <Navigate to="/dashboard" replace />
                : <AdminDashboard />
            }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App;
