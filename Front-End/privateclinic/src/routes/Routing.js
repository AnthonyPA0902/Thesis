// Pages
import Main from '../pages/Main';
import Service from '../pages/Service';
import Appointment from '../pages/Appointment';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Auth from '../pages/Admin/Auth';
import Dashboard from '../pages/Admin/Dashboard';

// Routes
const NormalRoutes = [
    { path: '/', component: Main},
    { path: '/service', component: Service},
    { path: '/appointment', component: Appointment},
]

const AuthRoutes = [
    { path: '/login', component: Login},
    { path: '/register', component: Register},
]

const AdminAuthRoutes = [
    { path: '/admin/auth', component: Auth},
]

const AdminRoutes = [
    { path: '/admin/dashboard', component: Dashboard },
]

export {NormalRoutes, AuthRoutes,AdminAuthRoutes, AdminRoutes};