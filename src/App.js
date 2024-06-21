import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header"     // default import
import {calc} from "./components/Header"     // named import
import Body from "./components/Body";
import Footer from "./components/Footer";

const AppLayout = () => {
    return (
        <>
            <Header />
            <Body />
            <Footer />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<AppLayout />)