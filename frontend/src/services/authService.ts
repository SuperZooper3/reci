export function isLoggedIn(): boolean {
    const cookies = document.cookie.split("; ").reduce((acc, cur) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    if (cookies["authToken"]) {
      return true;
    } 
    return false;
  };