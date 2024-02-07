import { notification, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useHistory, useLocation } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import axios from 'axios';
import sidebarLogo from "../asset/img/sidebarLogo.png"
import sidebar from "../asset/img/sidebar.png"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../asset/css/Style.css"
import { AlertFilled } from '@ant-design/icons';
import moment from 'moment';
import { VscSignOut } from "react-icons/vsc"
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Card, message, Badge, Popover, List, Typography, Divider, Alert } from 'antd';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { resetAll } from '../redux/actions';

const { Text } = Typography;

const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [show, setShow] = useState(false);

    const [data, setData] = useState([]);

    const history = useHistory()
    const location = useLocation()
    const [menuData, setMenuData] = useState([]);
    const [menuItem, setmenuItem] = useState([])
    // const [user, setUser] = useState([])
    const [companylist, setCompanyList] = useState([])
    const [selectedCompany, setSelectedCompany] = useState(
        JSON.parse(localStorage.getItem('selectedCompany')) || null
    );

    const [rowClick, setRowClick] = useState(false);
    const [asignmenulist, setAsignMenuList] = useState([])
    // const [role, setRole] = useState(null)
    const userid = localStorage.getItem('CRMUserId')
    const URL = process.env.REACT_APP_API_URL
    const token = localStorage.getItem('CRMtoken')
    const userdisplay = localStorage.getItem('CRMUsername')
    const RoleType = localStorage.getItem('CRMRole')
    const companynamedisplay = localStorage.getItem('CRMCompanyName')
    const [filteredCompanyList, setFilteredCompanyList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [companyname, setCompanyName] = useState([])
    const custId = localStorage.getItem('CRMCustId')
    const CompanyId = localStorage.getItem('CRMCompanyId');
    const [notifications, setNotifications] = useState([]);
    const [dropnotification, setDropNotifcation] = useState([]);
    const [received, setRecived] = useState([])
    const [visible, setVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const [selectedrow, setSelectedRow] = useState([]);

    const [badgeCount, setBadgeCount] = useState(0);
    const [notifcationdrawer, setNotifcationdrawer] = useState(false);

    const handleDrawerClose = () => setNotifcationdrawer(false);
    const handleDrawerShow = () => setNotifcationdrawer(true);

    const dispatch = useDispatch();

    // Function to update the badge count

    const handleClose = () => {
        // setInitialLoad(false);
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const getCompanyList = async () => {
        try {
            const res = await axios.get(URL + `/api/Master/CompanyList?CustId=${custId}`, {
                headers: { Authorization: `bearer ${token}` }
            })
            setCompanyList(res.data)
            // Check if there are companies in the response
            // if (res.data.length > 0) {

            // const firstCompany = res.data[0];
            // localStorage.setItem('CRMCompanyId', firstCompany.CompanyId);
            // localStorage.setItem('CRMCompanyName', firstCompany.CompanyName);
            // history.push('/taskdashboard')
            // window.location.reload();
            // }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCompanyList()
    }, [])

    const getCompanySelected = async () => {
        try {
            const res = await axios.get(URL + `/api/Master/CompanyList?CustId=${custId}`, {
                headers: { Authorization: `bearer ${token}` }
            })
            setCompanyList(res.data)
            // Check if there are companies in the response
            // if (res.data.length > 0) {

            const firstCompany = res.data[0];
            localStorage.setItem('CRMCompanyId', firstCompany.CompanyId);
            localStorage.setItem('CRMCompanyName', firstCompany.CompanyName);
            // history.push('/taskdashboard')
            window.location.reload();
            // }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const compnyId = localStorage.getItem('CRMCompanyId')
        if (!compnyId) {
            getCompanySelected()
        }
    }, [])
    // useEffect(() => {
    //     const companyId = localStorage.getItem('CRMCompanyId');
    //     if (companyId) {
    //         history.push('/taskdashboard')
    //         window.location.reload();
    //     }
    // }, [])

    useEffect(() => {
        const companyId = localStorage.getItem('CRMCompanyId');
        if (companyId) {

            setShow(false);
        };
    }, []);
    // useEffect(() => {
    //     if(show == false)
    //     {
    //         window.location.reload();
    //     }
    // }, [show]);

    // console.log(companylist[0].CompanyId, "CompanyID")
    // localStorage.setItem('CRMCompanyId', companylist[0].CompanyId)
    // localStorage.setItem('CRMCompanyName', companylist[0].CompanyName)

    // const CompanyOptions = companylist.map((display) => ({
    //     value: display.CompanyId,
    //     label: display.CompanyName,
    // }));
    useEffect(() => {
        // Filter the company list based on the search term
        const filteredList = companylist.filter(company =>
            company.CompanyName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCompanyList(filteredList);
    }, [searchTerm, companylist]);

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };
    const handleSelectionChange = (e) => {
        setSelectedCompany(e.value);
        localStorage.setItem('selectedCompany', JSON.stringify(e.value));
    };
    useEffect(() => {
        if (!selectedCompany) {
            if (filteredCompanyList.length > 0) {
                setSelectedCompany(filteredCompanyList[0]); // Select the first item by default
            }
        }
    }, [filteredCompanyList]);
    const isRowSelected = (rowData) => {
        return selectedCompany && rowData.CompanyId === selectedCompany.CompanyId;
    };

    const rowClassName = (rowData) => {
        return isRowSelected(rowData) ? 'selected-row' : '';
    };
    const handleSelectButtonClick = () => {
        if (selectedCompany) {
            // Save the selected company name to local storage
            localStorage.setItem('CRMCompanyId', selectedCompany.CompanyId);
            localStorage.setItem('CRMCompanyName', selectedCompany.CompanyName);
            // history.push('/taskdashboard')
            window.location.reload();
            handleClose(); // Close the modal
        }
        else {
            notification.error({
                message: 'Please Select Company',
                placement: "top",
                duration: 1,
            });
        }
    };

    // Logout
    const handleSignout = () => {
        dispatch(resetAll())
        localStorage.removeItem('CRMtoken');
        localStorage.removeItem('CRMUsername');
        localStorage.removeItem('CRMUserId');
        localStorage.removeItem('CRMCustId');
        localStorage.removeItem('CRMRole');
        localStorage.removeItem('selectedCompany');
        localStorage.removeItem('CRMCompanyName');
        localStorage.removeItem('CRMCompanyId');
        localStorage.removeItem('CRMCGUID');
        notification.success({
            message: 'Logout Successfully',
            placement: 'top',
            duration: 1,
        });
        history.push('/')
    }

    // Main menu list
    const fetchData = async () => {
        try {
            const res = await axios.get(URL + `/api/Master/GetMainMenuList`, {
                headers: { Authorization: `bearer ${token}` }
            })
            setMenuData(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    // Menu list
    const menulistData = async () => {
        try {
            const res = await axios.get(URL + "/api/Master/GetMenuList", {
                headers: { Authorization: `bearer ${token}` }
            })
            setmenuItem(res.data)

        } catch (error) {
            console.log(error)
        }
    }
    // const getuserData = async () => {
    //     try {
    //         const res = await axios.get(URL + `/api/Master/UsermstList`, {
    //             headers: { Authorization: `bearer ${token}` }
    //         })
    //         setUser(res.data)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getAsignusermenu = async () => {
        try {
            const res = await axios.get(URL + `/api/Master/GetByMenu?UserId=${userid}`, {
                headers: { Authorization: `bearer ${token}` }
            })
            // setAsignMenuList(res.data) 
            setmenuItem(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
        // getuserData()
        // menulistData()
        if (RoleType == "Admin") {
            menulistData()
        }
        else {
            getAsignusermenu()
        }
    }, [])
    // useEffect(() => {
    //     if (user) {
    //         const userData = user.find(item => item.Id == userid)
    //         if (userData) {
    //             setRole(userData.Role)
    //             console.log(userData.Role)
    //         }
    //     }
    // }, [user])



    // license-key-startcode-start
    const [licecencdate, setlicentdate] = useState("")
    const getuserdata = async () => {
        try {
            const res = await axios.get(URL + '/api/Master/UsermstList', {
                headers: { Authorization: `bearer ${token}` }
            })
            const fillteruser = res.data.find((item) => item.Username == userdisplay)
            setlicentdate(fillteruser)
        } catch (error) {
            console.log(error, "error---error")
        }
    }

    useEffect(() => {
        getuserdata()
    }, [])

    const showConfirmation = () => {
        Swal.fire({
            title: 'Your License Expired !!',
            text: 'Renew License !!',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
            showConfirmButton: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                handleSignout()
                window.location.reload();
            }
        });
    };
    // useEffect(() => {
    //     if (licecencdate) {
    //         if (licecencdate.DiffDate <= 0) {
    //             // handleSignout()
    //             showConfirmation()
    //         }
    //     }

    // }, [licecencdate])
    // license-key-startcode-End

    const [openMenuId, setOpenMenuId] = useState(null);

    const handleMenuClick = (menuId) => {
        // Toggle the open state of the clicked menu
        setOpenMenuId((prevMenuId) => (prevMenuId === menuId ? null : menuId));
    };
    // console.log(userData.Role,"userData")

    // notification

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    const fetchUpcomingEvents = async () => {
        try {
            const res = await axios.get(
                URL + `/api/Master/GetReminderList?CompanyID=${CompanyId}`,
                {
                    headers: { Authorization: `bearer ${token}` },
                }
            );

            const currentDateTime = moment().format('YYYY-MM-DD HH:mm');

            const filterlistdata = res.data.filter(
                (item) =>
                    moment(item.ReminderDate).format('YYYY-MM-DD HH:mm') === currentDateTime
                // && item.AutoClose === true
            );
            filterlistdata.forEach(async (item, index) => {
                try {
                    // Make an API call to update the reminder
                    const res = await axios.post(URL + "/api/Master/UpdateReminder", {
                        ReminderId: item.ReminderId,
                        AutoClose: true
                    }, {
                        headers: { Authorization: `bearer ${token}` },
                    });
                } catch (error) {
                    console.error(error);
                }
            });

        } catch (error) {
            console.error('Error fetching upcoming events:', error);
        }
    };
    // useEffect(() => {
    //     fetchUpcomingEvents()
    // }, [])



    useEffect(() => {
        const interval = setInterval(() => {
            fetchUpcomingEvents();
            receivednotifcation() // need to remove it when userwise reminder is added
        }, 60000); // Fetch every 5 min (adjust this interval as needed)

        return () => {
            clearInterval(interval); // Clear the interval on component unmount
        };
    }, []);

    const receivednotifcation = async () => {
        const currentDateTime = moment().format('YYYY-MM-DD HH:mm');
        try {
            const res = await axios.get(
                URL + `/api/Master/GetReminderList?CompanyID=${CompanyId}`,
                {
                    headers: { Authorization: `bearer ${token}` },
                }
            );
            const filterlistdata = res.data.filter(
                (item) =>
                    item.AutoClose === true &&
                    moment(item.ReminderDate).format('YYYY-MM-DD HH:mm') <= currentDateTime
            );
            const drop = res.data.filter(
                (item) =>
                    item.AutoClose === true &&
                    moment(item.ReminderDate).format('YYYY-MM-DD HH:mm') == currentDateTime
            );
            setRecived(filterlistdata);
            if (currentDateTime) {
                setDropNotifcation(drop)
            }
        } catch (error) {
            console.error('Error fetching upcoming events:', error);
        }
    }
    useEffect(() => {
        receivednotifcation()
    }, [])

    useEffect(() => {
        dropnotification.forEach(event => {
            const message = `Reminder: ${event.ReminderName}`;
            notification.open({
                message: message,
                duration: 10,
                placement: 'bottomRight',
                icon: <AlertFilled style={{ color: 'orange' }} />,
                style: {
                    fontSize: '8px',
                },
            });
        });
    }, [dropnotification]);
    const closeNotification = async (ID) => {
        // try {
        //     const res = await axios.get(URL + `/api/Master/DeleteAutoclose?CompanyId=${CompanyId}&UserId=${userid}`, {
        //         headers: { Authorization: `bearer ${token}` },
        //     });
        //     // fetchReminderData();
        //     // console.log(res, "reminder")
        //     // receivednotifcation()
        //     receivednotifcation()
        //     console.log(res.data, 'delete')
        // } catch (error) {
        //     console.log(error);
        // }
        try {
            // Make an API call to update the reminder
            const res = await axios.post(URL + "/api/Master/UpdateReminder", {
                ReminderId: ID,
                AutoClose: false
            }, {
                headers: { Authorization: `bearer ${token}` },
            });
            receivednotifcation()

            // If it's the last iteration, call receivednotifcation
        } catch (error) {
            console.error(error);
        }
        // const count = getBadgeCount();
        // updateBadgeCount(count);
    }

    const handlePopoverVisibleChange = (popoverVisible) => {
        setVisible(popoverVisible);
    };

    // ////////////////////////////////////////////////////////////////
    const deleteData = async (ID) => {
        try {
            const res = await axios.get(URL + `/api/Master/DeleteReminder?ReminderId=${ID}`, {
                headers: { Authorization: `bearer ${token}` },
            });
            receivednotifcation()
            // fetchReminderData();
            // console.log(res, "reminder")
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = async (ID) => {
        // const id = rowData.ReminderId;
        try {
            const res = await axios.get(URL + `/api/Master/ReminderById?ReminderId=${ID}`, {
                headers: { Authorization: `bearer ${token}` },
            });
            // setSelectedRow(res.data);
            // setEditShow(true);
            // setApiData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNotficationClose = async (notifciation) => {
        try {
            // Make an API call to update the reminder
            const res = await axios.post(URL + "/api/Master/CreateReminder", {
                Flag: "U",
                Reminder: {
                    ReminderId: notifciation.ReminderId,
                    ReminderName: notifciation.ReminderName,
                    PartyId: notifciation.PartyId,
                    CompanyID: notifciation.CompanyID,
                    ReminderDate: notifciation.ReminderDate,
                    ReminderType: notifciation.ReminderType,
                    IsExtend: notifciation.IsExtend,
                    IsActive: false,
                    AutoClose: true,
                    IPAddress: notifciation.IPAddress,
                    UserID: notifciation.UserID,
                    UserName: notifciation.UserName,
                    ServerName: notifciation.ServerName,
                    EntryTime: new Date(),
                    ReferenceId: notifciation.ReferenceId
                }
            }, {
                headers: { Authorization: `bearer ${token}` },
            });
            receivednotifcation()
            if (res.data.Success) {
                // notification.destroy(notificationKey);
            } else {
            }
        } catch (error) {
            console.error(error);
        }
    }
    const filteredMainmenu = menuItem.filter((item) => item.MainMenuId == menuData.Id);

    const formatStoredDate = (storedDate) => {
        const storedTime = moment(storedDate);
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'days').startOf('day');

        if (storedTime.isSame(today, 'd')) {
            return 'Today';
        } else if (storedTime.isSame(yesterday, 'd')) {
            return 'Yesterday';
        } else {
            const daysAgo = moment().diff(storedTime, 'days');
            return `${daysAgo} days ago`;
        }
    };
    const updateBadgeCount = (count) => {
        setBadgeCount(count);
    };

    const getBadgeCount = () => {
        // Get all notifications
        const allNotifications = received || [];

        // Calculate the count based on the difference
        const count = allNotifications.length

        return count;
    };

    useEffect(() => {
        // Update the badge count whenever notifications change
        const count = getBadgeCount();
        updateBadgeCount(count);
    }, [received]);
    const [sidebarFixed, setSidebarFixed] = useState(false);
    const handleSidebarToggle = () => {
        setSidebarFixed(!sidebarFixed);
    };
    return (
        <div className={`Header ${isDarkMode ? '' : 'dark-mode'}`}>
            <header className='main-header'>
                <Link to="/taskdashboard" className={`logo ${sidebarFixed == true ? '' : 'logo-crm'}`}>
                    {/* Logo */}
                    <span className="logo-mini">
                        <img src={sidebar} alt="logo" />
                    </span>
                    <span className="logo-lg">
                        <img src={sidebarLogo} alt="logo" />
                    </span>
                </Link>
                {/* Header Navbar */}
                <nav className="navbar navbar-expand py-0">
                    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button" onClick={handleSidebarToggle} >
                        {/* Sidebar toggle button*/}
                        <span className="sr-only">Toggle navigation</span>
                        {/* <span className="pe-7s-angle-left-circle" /> */}
                        <i class="fa fa-bars" style={{ color: 'white' }} aria-hidden="true"></i>
                    </a>

                    <ul className="navbar-nav ms-4">
                        <li className='nav-item select-company'>
                            <div className='company-name-header' onClick={handleShow}>
                                <label>{companynamedisplay ? companynamedisplay : 'Select Company'}<IoIosArrowDropdownCircle style={{ margin: "8px 10px 10px 7px" }} /></label>
                            </div>
                        </li>

                        <Modal onHide={handleClose} centered backdrop="static" show={show}>
                            <Modal.Header closeButton>
                                <Modal.Title>Select Company</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder="Search by company name"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <DataTable
                                    value={filteredCompanyList}
                                    selectionMode={rowClick ? null : 'single'}
                                    selection={selectedCompany}
                                    onSelectionChange={handleSelectionChange}
                                    dataKey="CompanyId"

                                >
                                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} />
                                    <Column field="CompanyName" />
                                </DataTable>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleSelectButtonClick}>
                                    Select
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </ul>
                    <div className="collapse navbar-collapse navbar-custom-menu">
                        <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item dropdown dropdown-user">
                                <a className="nav-link center-text-user" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span style={{ marginRight: '10px', color: 'white' }}>Your License Expires In </span> <span><Progress type="circle" size={50} percent={licecencdate.DiffDate * 100} format={() => <div style={{ color: 'white', fontSize: '11px' }}>{licecencdate.DiffDate} Days</div>} /></span>
                                </a>
                            </li> */}
                            <li className="nav-item dropdown dropdown-user">
                                <Popover
                                    content={
                                        <>
                                            <List
                                                dataSource={received}
                                                renderItem={(notification, index) => (
                                                    <>
                                                        <Alert
                                                            className='m-2'
                                                            key={notification.ReminderId}
                                                            description={
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center',
                                                                    }}
                                                                >
                                                                    <div>
                                                                        <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>{notification.ReminderName}</Text>
                                                                        <br />
                                                                        <Text style={{ fontSize: '12px', color: '#999999' }}>{moment(notification.ReminderDate).format('DD/MM/YYYY hh:mm')}</Text>
                                                                        {/* <Button className='ms-5' size='small' onClick={()=>{handleNotficationClose(notification)}}>OK</Button> */}
                                                                    </div>
                                                                    {/* <div>
                                                                        <i className="fa fa-times" aria-hidden="true" onClick={() => closeNotification(notification)}></i>
                                                                    </div> */}
                                                                </div>
                                                            }
                                                            type="info" // You can customize the type based on your needs
                                                            showIcon
                                                            closable
                                                            afterClose={() => setHoveredIndex(null)}
                                                            onClose={() => closeNotification(notification.ReminderId)}
                                                        // action={
                                                        //     <Space direction="vertical">
                                                        //       <Button size="small" type="primary">
                                                        //         Accept
                                                        //       </Button>
                                                        //     </Space>
                                                        //   }
                                                        />
                                                        {index !== received.length - 1 && <Divider style={{ margin: '0' }} />}
                                                    </>
                                                )}
                                                locale={{ emptyText: 'No Notifications' }}
                                                bordered={false}
                                                // size="small"
                                                banner
                                                split={false}
                                                style={{ maxHeight: '300px', overflowY: 'auto', width: '400px' }}
                                            />
                                            {
                                                received.length > 3 ? (
                                                    <div className='p-2 clear-all-main'>
                                                        <button className='clear-all'
                                                            onClick={handleDrawerShow}
                                                        >
                                                            ShowAll Notifications <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                ) : null
                                            }


                                        </>
                                    }
                                    trigger="click"
                                    visible={visible}
                                    onVisibleChange={handlePopoverVisibleChange}
                                    placement="bottomRight"
                                >
                                    <span className="nav-link  center-text-user  notification-icon mr-2" role="button">
                                        <Badge size='small' count={getBadgeCount()} offset={[-1, 12]}>
                                            <i className="fa fa-bell fs-4 mt-3 text-white" aria-hidden="true" />
                                        </Badge>
                                    </span>
                                </Popover>

                                {/* notfication Drawer */}
                                <Offcanvas show={notifcationdrawer} placement='end' onHide={handleDrawerClose}>
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>All Notifications</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <List
                                            dataSource={received}
                                            renderItem={(notification, index) => (
                                                <>
                                                    <Alert
                                                        className='m-2'
                                                        key={notification.ReminderId}
                                                        description={
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <div>
                                                                    <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>{notification.ReminderName}</Text>
                                                                    <br />
                                                                    <Text style={{ fontSize: '12px', color: '#999999' }}>{moment(notification.ReminderDate).format('DD/MM/YYYY hh:mm')}</Text>
                                                                    {/* <Button className='ms-5' size='small' onClick={()=>{handleNotficationClose(notification)}}>OK</Button> */}
                                                                </div>
                                                                {/* <div>
                                                                        <i className="fa fa-times" aria-hidden="true" onClick={() => closeNotification(notification)}></i>
                                                                    </div> */}
                                                            </div>
                                                        }
                                                        type="info" // You can customize the type based on your needs
                                                        showIcon
                                                        closable
                                                        afterClose={() => setHoveredIndex(null)}
                                                        onClose={() => closeNotification(notification.ReminderId)}
                                                    // action={
                                                    //     <Space direction="vertical">
                                                    //       <Button size="small" type="primary">
                                                    //         Accept
                                                    //       </Button>
                                                    //     </Space>
                                                    //   }
                                                    />
                                                    {index !== received.length - 1 && <Divider style={{ margin: '0' }} />}
                                                </>
                                            )}
                                            locale={{ emptyText: 'No Notifications' }}
                                            bordered={false}
                                            // size="small"
                                            banner
                                            split={false}
                                        />
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </li>
                            {/* User */}
                            <li className="nav-item dropdown dropdown-user">
                                <a className="nav-link center-text-user" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {
                                        userdisplay ? (
                                            <lable className="text-white" >{`Hi , ${userdisplay}`}</lable>
                                            // <Avatar
                                            //     label={userdisplay[0].toLocaleUpperCase()}
                                            //     style={{ backgroundColor: 'grey', color: '#ffffff' }}
                                            //     shape="circle"
                                            // />
                                        ) : (null)
                                    }
                                    {/* <img src="assets/dist/img/avatar5.png" className="rounded-circle" width={50} height={50} alt="user" /> */}
                                </a>
                                <div className="dropdown-menu drop_down">
                                    <div className="menus user-profile-menu">

                                        <Link className="dropdown-item" to="/userprofile"><span><FaRegUser /></span>User Profile</Link>
                                        {/* <button onClick={handleTestNotification}>Test Notifications</button> */}

                                        {/* <a className="dropdown-item" href="#"><i className="fa fa-user" /> Chat with Us</a> */}
                                        {/* <Link className="dropdown-item" to="#"><i className="fa fa-inbox" /> Inbox</Link> */}
                                        {/* <a className="dropdown-item" href="#"><i className="fa fa-user" /> Contact Us</a> */}
                                        <a className="dropdown-item" href="#" onClick={handleSignout}><span><VscSignOut /></span>Signout</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <aside className="main-sidebar" style={{ position: "fixed" }}>
                {/* sidebar */}
                <div className="sidebar">
                    {/* sidebar menu */}
                    <ul className="sidebar-menu">
                        <li>
                            <Link to="/taskdashboard" className={location.pathname == '/taskdashboard' ? 'active-open' : 'link-hover'}><i class="fa fa-tasks"></i><span>Task Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/holiday" className={location.pathname == '/holiday' ? 'active-open' : 'link-hover'}><i class="fa fa-tasks"></i><span>Holiday Master</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/employee" className={location.pathname == '/employee' ? 'active-open' : 'link-hover'}><i class="fa fa-bell-o" ></i><span>Employee</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/attendance" className={location.pathname == '/attendance' ? 'active-open' : 'link-hover'}><i class="fa fa-search" ></i><span>Attendance</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/payroll" className={location.pathname == '/payroll' ? 'active-open' : 'link-hover'}><i class="fa fa-search" ></i><span>Payroll</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/payrollitems" className={location.pathname == '/payrollitems' ? 'active-open' : 'link-hover'}><i class="fa fa-search" ></i><span>Payroll Item</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/event" className={location.pathname == '/event' ? 'active-open' : 'link-hover'}><i class="fa fa-search" ></i><span>Event</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/leavemanagement" className={location.pathname == '/leavemanagement' ? 'active-open' : 'link-hover'}><i class="fa fa-search" ></i><span>Leave Management</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/assetmanagement" className={location.pathname == '/assetmanagement' ? 'active-open' : 'link-hover'}><i class="fa fa-search" ></i><span>Asset Management</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/recruitmentmanagement" className={location.pathname == '/recruitmentmanagement' ? 'active-open' : 'link-hover'}><i class="fa fa-search" ></i><span>Recruitment Management</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/announcement" className={location.pathname == '/Announcement' ? 'active-open' : 'link-hover'}><i class="fa fa-search" ></i><span>Announcement </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/policies" className={location.pathname == '/policies' ? 'active-open' : 'link-hover'}><i class="fa fa-search" ></i><span>Policies</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* /.sidebar */}
            </aside>
        </div>
    )
}

export default Header