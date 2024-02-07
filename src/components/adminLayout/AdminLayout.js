import React, { useEffect } from 'react'
import UserProfile from './UserProfile';
import Header from '../Header';
import Footer from '../Footer'
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from "react-router-dom";
//hrm-module
// import Employee from '../HRM/Employee/Employee'
import EmployeeMaster from '../HRM/employeeMaster/EmployeeMaster'
import Holiday from '../HRM/Holiday/Holiday'
import Attendance from '../HRM/Attendance/Attendance';
import Payroll from '../HRM/Payroll/Payroll'
import EventMaster from '../HRM/Event/EventMaster';
import Leavemanagement from '../HRM/Leave Management/Leave'
import PayrollitemsMain from '../HRM/PayrollItms/PayrollitemsMain';
import AssetMaster from '../HRM/Asset Management/AssetMaster';
import AnnouncementMain from '../HRM/Announcement/AnnouncementMain';
import PoliciesMain from '../HRM/Policies/PoliciesMain';
import RecruitmentMain from '../HRM/Recruitment/RecruitmentMain'
const AdminLayout = () => {
    const location = useLocation();
    const history = useHistory();
    //user per token perpose
    // useEffect(() => {
    //     const token = localStorage.getItem("CRMtoken");
    //     if (!token && location.pathname != "/login" && location.pathname != "/register") {
    //         history.push("/login");
    //     }
    // }, [location, history]);
    return (
        <Router>
            <Header />
            {/* <AlertMessage/> */}
            <Switch>
                <Route path="/userprofile" >
                    <UserProfile />
                </Route>
                <Route path="/holiday" >
                    <Holiday />
                </Route>
                <Route path="/employee" >
                    <EmployeeMaster />
                </Route>
                <Route path="/attendance" >
                    <Attendance />
                </Route>
                <Route path="/payroll" >
                    <Payroll />
                </Route>
                <Route path="/payrollitems" >
                    <PayrollitemsMain />
                </Route>
                <Route path="/event" >
                    <EventMaster />
                </Route>
                <Route path="/leavemanagement" >
                    <Leavemanagement />
                </Route>
                <Route path="/assetmanagement" >
                    <AssetMaster />
                </Route>
                <Route path="/recruitmentmanagement" >
                    <RecruitmentMain />
                </Route>
                <Route path="/announcement" >
                    <AnnouncementMain />
                </Route>
                <Route path="/policies" >
                    <PoliciesMain />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default AdminLayout