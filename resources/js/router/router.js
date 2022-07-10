import Index from "../pages/dashboard/Index";
import PageNotFound from "../pages/PageNotFound";
import Kanban from "../pages/kanban/Index";
import Login from "../pages/login/Index";
const routes = [
    { path: "*", component: PageNotFound, name: "PageNotFound" },
    { path: "/login", component: Login, name: "Login" },
    {
        path: '/home',
        name: 'Tablero',
        component: Kanban,
        meta:{
            title: 'Inicio',
        }
    },


];
export default routes;
