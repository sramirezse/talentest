import Index from "../pages/dashboard/Index";
import PageNotFound from "../pages/PageNotFound";
import Other from "../pages/other/Index";
import Login from "../pages/login/Index";
const routes = [
    { path: "*", component: PageNotFound, name: "PageNotFound" },
    { path: "/login", component: Login, name: "Login" },
    {
        path: '/home',
        name: 'Tablero',
        component: Index,
        meta:{
            title: 'Inicio',
        }
    },
    {
        path: '/kanban',
        name: 'Kanban',
        component: Other,
        meta:{
            title: 'Kanban',
        }
    },
    {
        path: '/kanban2',
        name: 'Kanban2',
        component: Other,
        meta:{
            title: 'Kanban2',
        }
    },


];
export default routes;
