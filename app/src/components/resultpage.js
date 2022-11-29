import React from "react";
import './resultpage.css';

function ResultPage(props) {
    return (props.trigger) ? (
        <div>
            <div className={"result-page-container"}
                 style={{
                     backgroundColor: 'rgba(0, 0, 0, 0.85)',
                 }}
            >
                <div className={"result-page-inner"}
                     onClick={() => {
                         props.setTrigger();
                         props.resetState();
                     }}
                >
                    {props.gameResult}
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default ResultPage
