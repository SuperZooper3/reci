import { Routes, Route } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import UserPage from './pages/UserPage'
import RecipePage from "./pages/RecipePage"
import SettingsPage from "./pages/SettingsPage"
import CookbookPage from "./pages/CookbookPage"
import RecipeModal from "./components/recipeModal"

function App() {
  return (
    <SidebarProvider>
      <div className="flex w-full overflow-hidden">
        <AppSidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<SearchPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/account/:id" element={<UserPage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/cookbook" element={<CookbookPage />} />
          </Routes>
        </main>
      </div>
      <div>
        <RecipeModal />
      </div>
    </SidebarProvider>
  )
}

export default App
