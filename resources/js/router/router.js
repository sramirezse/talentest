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
            title: 'Tablero',
        }
    },
    {
        path: '/other',
        name: 'Other',
        component: Other,
        meta:{
            title: 'Otro',
        }
    },


];
export default routes;
