import { BookMarked, ChefHat, Home, Search } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Feed",
    url: "/",
    icon: Home,
  },
  {
    title: "Recipes",
    url: "/recipes",
    icon: Search,
  },
  {
    title: "My Kitchen",
    url: "#",
    icon: ChefHat,
  },
  {
    title: "Saved",
    url: "#",
    icon: BookMarked,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="flex flex-col h-screen">
      <a href={"/"}>
        <div className="flex flex-col items-center pt-6 pb-2">
          <img src="/reciLogo.png" alt="Reci logo" className="h-32 w-32 mb-2" />
          <h1 className="text-4xl font-extrabold">Reci</h1>
        </div>
      </a>


      <SidebarContent className="flex-none overflow-y-auto pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-6 py-8"
                    >
                      <item.icon className="h-32 w-32" />
                      <span className="text-3xl font-semibold">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="flex-1"></div>

      <SidebarFooter className="border-t p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="text-3xl font-semibold">Profile</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}