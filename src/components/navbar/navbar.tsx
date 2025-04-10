import "./navbar.css"
import { useNavigate } from "react-router"
import { Link, NavLink, useLocation } from "react-router-dom"
import {  useAuthenticator } from '@aws-amplify/ui-react';
import {Button} from "@nextui-org/react";
import {Navbar,Image, NavbarBrand, NavbarMenuToggle,NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import avatar from "../../imageDB/avatar.png"
import { useEffect, useState } from "react";
import debounce from "../../utils/debounce";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetInterviewState } from "../../redux/reducer";
import logo from "../../imageDB/logo.png"

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { userDetails, jwtToken } = useAppSelector((state) => state.interview)
    const location = useLocation();

      const handleResize = () => {
        const isMVA = window.innerWidth <= 640 ? true : false
        setIsMobile(isMVA);
      };
      const debouncedResize = debounce(handleResize, 100);
      useEffect(() => {
        handleResize()
      },[])
      useEffect(() => {
        window.addEventListener('resize', debouncedResize);
    
        return () => {
          window.removeEventListener('resize', debouncedResize);
        };
      }, [debouncedResize]);
    const { route, user, authStatus, signOut  } = useAuthenticator((context) => [context.route, context.user, context.authStatus, context.signOut ]);
    const  navigate  = useNavigate()
    const dispatch = useAppDispatch()
    const redirectHomePage = () => {
        navigate("/")
    }
    const loginRedirectHandler = () => {
        console.log("clicked", )
        navigate("/login")
    }
    const menuItems = [
        {to:"/", value: "Home"},
        {to:"about", value: "About"},
        {to:"contact", value: "Contact"},
        // {to:"pricing", value: "Pricing"},
      ];
      const signOutHandler = () => {
        dispatch(resetInterviewState())
        signOut()
        navigate('/login');
    }
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered = {true}>
            <NavbarContent>
                {
                    isMobile && <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                }
                <NavbarBrand >
                    <Image
                            alt="NextUI hero Image"
                            src={logo}
                            className = "logo-align cursor-pointer"
                            width={50}
                            height={50}
                            onClick={redirectHomePage}
                            />
                    {!isMobile && <h2 className="font-bold text-inherit text-primary logo-text cursor-pointer" onClick={redirectHomePage}>MockMan</h2>}
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className={`m:flex gap-x-7 ${isMobile? "hidden" : ""} flex-gap2`} justify="center">
                <NavbarItem>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-primary" : ""
                        }
                    >
                        Home
                    </NavLink>
                </NavbarItem>
                <NavbarItem >
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "text-primary" : ""
                        }
                    >
                        About
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? "text-primary" : ""
                        }
                    >
                        Contact Us
                    </NavLink>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="lg:flex">
                    {jwtToken ?
                        <NavbarContent as="div" justify="end">
                            <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src={avatar}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Hey👋{userDetails?.username}</p>
                                </DropdownItem>
                                <DropdownItem key="settings">Active Credits: {userDetails?.credit}</DropdownItem>
                                {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
                                <DropdownItem key="logout" color="danger" onClick={signOutHandler}>
                                Log Out
                                </DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </NavbarContent> :(!isMobile && location.pathname !== "/login" && <Button color="primary" onPress = {loginRedirectHandler} className = "">Get Started</Button>)}
                </NavbarItem>
            </NavbarContent>
            {
                isMobile && <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            to={item.to}
                        >
                            {item?.value}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
            }
        </Navbar>
    )
}
export default NavbarComponent

