import React from "react";
import './shownomoney.css'


function ShowNoMoney(props) {
    return (props.trigger) ? (
        <div className={"showNoMoney-page-container"}
             style={{
                 backgroundColor: 'rgba(0, 0, 0, 1)',
             }}
        >
            <div
                className={"showNoMoney-inner"}
                onClick={() => {
                    props.setShowNoMoneyTrigger();
                    props.setMainPageTrigger();
                }}
            >
                Out of credits
            </div>
            {props.children}
        </div>
    ) : "";
}

export default ShowNoMoney
