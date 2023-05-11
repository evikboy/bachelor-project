import React from "react"
import { Header } from './Header'
import { Sidebar } from "./Sidebar"
import { Content } from "./Content"

export const Layout = ({ children, isAuthPage  }) => {
    return (
        <React.Fragment>
            <Header />
            {!isAuthPage && <Sidebar />}
            <Content isAuthPage={isAuthPage}>
                { children }
            </Content>
        </React.Fragment>
    )
}

