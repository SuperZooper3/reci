import { BookMarked, Home, Search } from "lucide-react"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { type JWTData } from "../../../shared-types";
import LoginModal from "./loginModal";
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";

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
    title: "Cookbook",
    url: "/cookbook",
    icon: BookMarked,
  },
]

export function AppSidebar() {
  const navigate = useNavigate();
  const authToken = Cookies.get('authToken');
  let displayName = null;
  let accountId = null;

  if (authToken) {
    const decoded = jwtDecode(authToken);
    console.log(decoded); 
    displayName = (decoded as JWTData).display_name;
    accountId = (decoded as JWTData).id;
  }

  const handleLogout = async() => {
    try {
      document.cookie = "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
      navigate("/");
      window.location.reload();
    } catch(e) {
      alert(e);
    }
  };

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
            {
              displayName ?
              <div className="flex flex-col">
                <a href={`/account/${accountId}`}>
                  <span className="text-3xl font-semibold">{displayName}</span>
                </a>
                <Button className="pl-0 justify-start text-base" variant="ghost" onClick={handleLogout}>Logout</Button>
              </div>
              :
              // TODO: update this to be the login button
              // <a href="/settings"> 
              //   <span className="text-3xl font-semibold">Login</span>
              // </a>
              <LoginModal />
            }
            
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}