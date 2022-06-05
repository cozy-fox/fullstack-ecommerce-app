import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <MainHeader />
            <Outlet />
            <MainFooter />
        </>
    )
}
