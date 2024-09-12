// Pages
import Main from '../pages/Main';
import Service from '../pages/Service';
import Appointment from '../pages/Appointment';
import Login from '../pages/Login';

// Routes
const NormalRoutes = [
    { path: '/', component: Main},
    { path: '/service', component: Service},
    { path: '/appointment', component: Appointment},
]

const AuthRoutes = [
    { path: '/login', component: Login},
]

export {NormalRoutes, AuthRoutes};