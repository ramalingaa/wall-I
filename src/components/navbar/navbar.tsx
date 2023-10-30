import "./navbar.css"
import { useNavigate } from "react-router"
import { Link, NavLink } from "react-router-dom"
import {  useAuthenticator } from '@aws-amplify/ui-react';
import ProfileCard from "./profile";
import { useLocation } from 'react-router-dom';
import Logo from "../../imageDB/MockMan-logos-blue.jpeg"
import {Button, ButtonGroup} from "@nextui-org/react";
import {Navbar, NavbarBrand, NavbarMenuToggle,NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";

import { useEffect, useState } from "react";
import debounce from "../../utils/debounce";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetInterviewState } from "../../redux/reducer";
const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { userDetails } = useAppSelector((state) => state.interview)
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
    const location = useLocation();
    const dispatch = useAppDispatch()
    const redirectHomePage = () => {
        navigate("/")
    }
    const loginRedirectHandler = () => {
        console.log("clicked", )
        navigate("/login")
    }
    const menuItems = [
        "Home",
        "About",
        "Contact Us",
        "Pricing",
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
                <NavbarBrand>
                    <h2 className="font-bold text-inherit text-primary logo-text">MockMan</h2>
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
                <NavbarItem className="hidden lg:flex">
                    {route === "authenticated"?<NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Hey👋{userDetails?.username}</p>
            </DropdownItem>
            <DropdownItem key="settings">Active Credits: {userDetails?.credit}</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={signOutHandler}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent> :<Button color="primary" onPress = {loginRedirectHandler}>Get Started</Button>}
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
                            to="#"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
            }
        </Navbar>
    )
}
export default NavbarComponent

