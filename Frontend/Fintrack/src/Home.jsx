import React from "react";
import Header from "./Header";
import Workspace from "./Workspace";
import Contents from "./Contents";
import "./Home.css";
import { NotificationProvider } from "./NotificationContext";
import { TransactionProvider } from "./TransactionContext";
const Home=()=>{
    return(<React.Fragment>
        <div className="home">
        <div className="header">
            <NotificationProvider>
            <Header />
            </NotificationProvider>
        </div>
        <div className="workspace">
            <Workspace />  
        </div>
        <div className="contents">
            <NotificationProvider>
                <TransactionProvider>
            <Contents/>
            </TransactionProvider>
            </NotificationProvider>
        </div>
        </div>
    </React.Fragment>);
}
export default Home;