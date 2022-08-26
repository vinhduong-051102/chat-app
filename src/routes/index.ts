import Login from "~/features/auth/pages"
import Chat from "~/features/chat"

interface routeTypes {
  path: string;
  component: () => JSX.Element;
  layout?: (() => JSX.Element) | null;
}



export const publicRoute: routeTypes[] = [
  {
    path: "/login",
    component: Login,
    layout: null

  },
  {
    path: "/*",
    component: Login,
    layout: null

  },
  
]
export const privateRoute: routeTypes[] = [
  {
    path: "/",
    component: Chat,
  }
  
]