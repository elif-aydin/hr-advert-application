import Dashboard from "@material-ui/icons/Dashboard";
import Unarchive from "@material-ui/icons/Unarchive";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import AdvertDetail from "views/Advert/AdvertDetail.jsx";
import HrAdvertDetail from "views/Advert/HrAdvertDetail.jsx";
import AccessGranted from "views/UserProfile/AccessGranted.jsx";
import ApplicantAdverts from "views/Advert/ApplicantAdverts.jsx";
import LoginPage from "views/UserProfile/LoginPage.jsx";
import LogoutPage from "views/UserProfile/Logout.jsx";
import UserInfo from "views/UserProfile/UserInfo.jsx";
import HrCreateAdvert from "views/Advert/HrCreateAdvert.jsx";

const dashboardRoutes = [
    {
        path: "/dashboard",
        sidebarName: "Dashboard",
        navbarName: "Material Dashboard",
        icon: Dashboard,
        component: DashboardPage
    },
    {
        path: "/login",
        sidebarName: "Login",
        navbarName: "Login",
        icon: Unarchive,
        component: LoginPage,
        invisible: false
    },
    {
        path: "/applicantAdverts",
        sidebarName: "My Applications",
        navbarName: "My Applications",
        icon: Unarchive,
        component: ApplicantAdverts,
        invisible: true
    },
    {
        path: "/createAdvert",
        sidebarName: "Create Advert",
        navbarName: "Create Advert",
        icon: Unarchive,
        component: HrCreateAdvert,
        invisible: true
    },
    {
        path: "/logout",
        sidebarName: "Logout",
        navbarName: "Logout",
        icon: Unarchive,
        component: LogoutPage,
        invisible: true
    },
    {
        path: "/advertDetail",
        sidebarName: "Advert Detail",
        navbarName: "Advert Detail",
        icon: Unarchive,
        component: AdvertDetail,
        invisible: true
    },
    {
        path: "/hrAdvertDetail",
        sidebarName: "HR Advert Detail",
        navbarName: "HR Advert Detail",
        icon: Unarchive,
        component: HrAdvertDetail,
        invisible: true
    },
    {
        path: "/hrUserInfo",
        sidebarName: "HR User Info",
        navbarName: "HR User Info",
        icon: Unarchive,
        component: UserInfo,
        invisible: true
    },
    {
        path: "/accessGranted",
        sidebarName: "AccessGranted",
        navbarName: "AccessGranted",
        icon: Unarchive,
        component: AccessGranted,
        invisible: true
    },


    {redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect"}
];

export default dashboardRoutes;
