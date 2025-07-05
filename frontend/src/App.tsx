import { Routes, Route } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import FollowingPage from "./pages/FollowingPage"
import RecipePage from "./pages/RecipePage"

function App() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<SearchPage />} />
            <Route path="/account/:id/following" element={<FollowingPage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
