// Pages
import Main from '../pages/Main';
import Service from '../pages/Service';
import Appointment from '../pages/Appointment';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Auth from '../pages/Admin/Auth';

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
    { path: '/admin/login', component: Auth},
]

export {NormalRoutes, AuthRoutes,AdminAuthRoutes};