import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'
const menuOptions = [
    {
        about: [{label: "Contact", to: "/contact"}]
    },
    {
        features: [ {label: "Benefits", to: "/about"}, {label: "Get Started", to: "/select-level"}]
    },
    {
        contact: ["ramalinga@mockman.in", "www.mockman.in"]
    }
]
const Footer = () => {
  return (
    <div className="bg-black text-white">
        <div className="flex footer-container">
            <div className="flex flex-col gap-4 single-footer-menu">
                <h3 className = "font-bold">About</h3>
                <ul className = "flex flex-col">
                    {
                        menuOptions[0]?.about?.map((item, index) => {
                            return (
                                <Link key={index} className="text-gray-400" to = {item.to}>{item.label}</Link>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="flex flex-col gap-4 single-footer-menu">
                <h3 className = "font-bold">Features</h3>
                <ul className = "flex flex-col">
                    {
                        menuOptions[1]?.features?.map((item, index) => {
                            return (
                                <Link key={index} className="text-gray-400" to = {item.to}>{item.label}</Link>                            )
                        })
                    }
                </ul>
            </div>
            <div className="flex flex-col gap-4 single-footer-menu">
                <h3 className = "font-bold">Contact</h3>
                <ul className = "flex flex-col">
                    {
                        menuOptions[2]?.contact?.map((item, index) => {
                            return (
                                <li key={index} className="text-gray-400">{item}</li>
                            )
                        })
                    }
                </ul>
            </div>
        
        </div>
        <div className="align-center border-t mr-2 ml-2 p-6">
            <p>© 2023 MockMan. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer