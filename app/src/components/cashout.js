import React from "react";
import './cashout.css'

function CashOut(props) {
    return (props.trigger) ? (
        <div>
            <div className={"cash-out-container"}>
                <div className={"cash-out-inner"}>
                    <h1>
                        CASH OUT
                    </h1>
                    <h2 style={{color: "black"}}>
                        Take cash and leave?
                    </h2>
                    <br></br>
                    <div className={"cash-out-answer-button"}>
                        <button
                            className={"cash-out-yes-button"}
                            onClick={() => {
                                props.setTrigger()
                                props.setMainPageTrigger()
                            }}
                        >
                            YES
                        </button>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    ) : "";
}

export default CashOut
