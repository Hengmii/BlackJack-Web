import React, {useState} from "react";
import './mainpage.css'
import '../chips/10.PNG'
import CashOut from "./cashout.js";
import bet10 from "../chips/10.PNG";
import bet25 from "../chips/25.PNG";
import bet50 from "../chips/50.PNG";
import bet100 from "../chips/100.PNG";
import bet500 from "../chips/500.PNG";
import bet1000 from "../chips/1000.PNG";
import TableBoard from "./tableboard";
import ShowNoMoney from "./shownomoney";

function MainPage(props) {
    const [cashOutTrigger, setCashOutTrigger] = useState(false);
    const [tableBoardTrigger, setTableBoardTrigger] = useState(false);
    const betImgPath = {
        "bet10": bet10,
        "bet25": bet25,
        "bet50": bet50,
        "bet100": bet100,
        "bet500": bet500,
        "bet1000": bet1000
    };
    return (props.trigger) ? (
        <div
            className={"main-page-container"}
            style={{backgroundImage: "url(/backgroundImage.jpg)"}}
        >
            <div className={"cash-out"}>
                <button
                    className={"cash-out-button"}
                    onClick={() => {
                        setCashOutTrigger(true);
                    }}
                >
                    CASH OUT
                </button>
            </div>

            <div className={"hideOnDesktopBank"}>

                <div className={"balance"}>
                    Bank $ {props.balance}
                </div>
                <button className={"all-in-button"}
                        onClick={() => props.handleSetBet(props.balance)}>
                    ALL IN
                </button>
            </div>

            <br></br>

            <div className={"hideOnDesktopMainPageInner"}>
                <div className={"bet-image"}>
                    {Array.from(props.playerBets).map((bet, index) => {
                        return <img key={index} {...{src: betImgPath[bet]}} alt={betImgPath[bet]}
                                    style={{width: 90, height: 90}}/>
                    })}
                </div>
                <div className={"choose-bet"}>
                    ${props.bet}
                </div>
                <button
                    className={"deal-button"}
                    onClick={() => {
                        props.deal();
                        if (props.bet > 0) {
                            setTableBoardTrigger(true);
                        } else {
                            setTableBoardTrigger(false);
                        }
                        props.setBet(props.bet);

                    }}
                >
                    DEAL
                </button>
            </div>


            <div className={"hideOnDesktopBetBank"}>
                {props.children}
            </div>

            <div className={"hideOnMobileBetAfterSet"}>
                <div className={"bet-image"}>
                    {Array.from(props.playerBets).map((bet, index) => {
                        return <img key={index} {...{src: betImgPath[bet]}} alt={betImgPath[bet]}
                                    style={{width: 120, height: 120}}/>
                    })}
                </div>
                <div className={"choose-bet"}
                     style={{
                         color: '#FFFFFF',
                         fontSize: '40px',
                         textShadow: '4px 3px 0 #7A7A7A',
                     }}
                >
                    ${props.bet}
                </div>
                <button
                    className={"deal-button"}
                    style={{
                        width: "90px",
                        height: "40px",
                        fontSize: "20px"
                    }}
                    onClick={() => {
                        props.deal();
                        if (props.bet > 0) {
                            setTableBoardTrigger(true);
                        } else {
                            setTableBoardTrigger(false);
                        }
                        props.setBet(props.bet);

                    }}
                >
                    DEAL
                </button>
            </div>

            <div className={"hideOnMobileBank"}>

                <div className={"balance"}>
                    Bank $ {props.balance}
                </div>
                <button className={"all-in-button"}
                        onClick={() => props.handleSetBet(props.balance)}>
                    ALL IN
                </button>
                <br></br>
                <div className={"bet-bank"}>
                    {props.children}
                </div>
            </div>


            <CashOut
                trigger={cashOutTrigger}
                setTrigger={() => setCashOutTrigger(false)}
                setMainPageTrigger={() => props.setTrigger()}
            >
                <button
                    className="close-btn"
                    onClick={() => setCashOutTrigger(false)}
                >❌
                </button>

            </CashOut>
            <TableBoard
                trigger={tableBoardTrigger}
                setTrigger={() => setTableBoardTrigger(false)}
                playerHands={props.playerHands}
                dealerHands={props.dealerHands}
                playerValue={props.playerValue}
                dealerValue={props.dealerValue}
                balance={props.balance}
                bet={props.bet}
                hit={props.hit}
                stand={props.stand}
                gameResult={props.gameResult}
                mainPageTrigger={props.trigger}
                setMainPageTrigger={setTableBoardTrigger}
                resultPageTrigger={props.resultPageTrigger}
                setResultPageTrigger={props.setResultPageTrigger}
                resetState={props.resetState}
            >
            </TableBoard>

            <ShowNoMoney
                trigger={props.showNoMoneyTrigger}
                setShowNoMoneyTrigger={() => props.setShowNoMoneyTrigger()}
                setMainPageTrigger={() => props.setTrigger()}
            >
            </ShowNoMoney>
        </div>

    ) : "";

}

export default MainPage


