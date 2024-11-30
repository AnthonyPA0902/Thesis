// Pages
import Main from '../pages/Main';
import Service from '../pages/Service';
import Appointment from '../pages/Appointment';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Auth from '../pages/Admin/Auth';
import Dashboard from '../pages/Admin/Dashboard';
import CheckUp from '../pages/Admin/CheckUp';
import Schedule from '../pages/Admin/Schedule';
import Doctor from '../pages/Admin/Doctor';
import Equipment from '../pages/Admin/Equipment';
import Profile from '../pages/Profile';
import Treatment from '../pages/Admin/Treatment';
import Info from '../pages/Admin/Info';
import Medicine from '../pages/Admin/Medicine';
import MedicalRecord from '../pages/Admin/MedicalRecord';
import Patient from '../pages/Admin/Patient';
import ServiceDetail from '../pages/ServiceDetail';
import PatientRecord from '../pages/Admin/PatientRecord';
import Report from '../pages/Admin/Report';

// Routes
const NormalRoutes = [
    { path: '/', component: Main},
    { path: '/service', component: Service},
    { path: '/appointment', component: Appointment},
    { path: '/profile', component: Profile},
    { path: '/detail', component: ServiceDetail},
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
    { path: '/admin/checkup', component: CheckUp },
    { path: '/admin/schedule', component: Schedule },
    { path: '/admin/doctor', component: Doctor },
    { path: '/admin/equipment', component: Equipment },
    { path: '/admin/treatment', component: Treatment },
    { path: '/admin/info', component: Info },
    { path: '/admin/medicine', component: Medicine },
    { path: '/admin/record', component: MedicalRecord },
    { path: '/admin/report', component: Report },
    { path: '/admin/patient', component: Patient },
    { path: '/admin/patient/record', component: PatientRecord },
]

export {NormalRoutes, AuthRoutes,AdminAuthRoutes, AdminRoutes};