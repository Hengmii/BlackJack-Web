import './tableboard.css'
import heart2 from "../cards/hearts/hearts-2.png";
import heart3 from "../cards/hearts/hearts-3.png";
import heart4 from "../cards/hearts/hearts-4.png";
import heart5 from "../cards/hearts/hearts-5.png";
import heart6 from "../cards/hearts/hearts-6.png";
import heart7 from "../cards/hearts/hearts-7.png";
import heart8 from "../cards/hearts/hearts-8.png";
import heart9 from "../cards/hearts/hearts-9.png";
import heart10 from "../cards/hearts/hearts-10.png";
import heartJ from "../cards/hearts/hearts-jack.png";
import heartQ from "../cards/hearts/hearts-queen.png";
import heartK from "../cards/hearts/hearts-king.png";
import heartA from "../cards/hearts/hearts-ace.png";
import spade2 from "../cards/spades/spades-2.png";
import spade3 from "../cards/spades/spades-3.png";
import spade4 from "../cards/spades/spades-4.png";
import spade5 from "../cards/spades/spades-5.png";
import spade6 from "../cards/spades/spades-6.png";
import spade7 from "../cards/spades/spades-7.png";
import spade8 from "../cards/spades/spades-8.png";
import spade9 from "../cards/spades/spades-9.png";
import spade10 from "../cards/spades/spades-10.png";
import spadeJ from "../cards/spades/spades-jack.png";
import spadeQ from "../cards/spades/spades-queen.png";
import spadeK from "../cards/spades/spades-king.png";
import spadeA from "../cards/spades/spades-ace.png";
import squares2 from "../cards/squares/squares-2.png";
import squares3 from "../cards/squares/squares-3.png";
import squares4 from "../cards/squares/squares-4.png";
import squares5 from "../cards/squares/squares-5.png";
import squares6 from "../cards/squares/squares-6.png";
import squares7 from "../cards/squares/squares-7.png";
import squares8 from "../cards/squares/squares-8.png";
import squares9 from "../cards/squares/squares-9.png";
import squares10 from "../cards/squares/squares-10.png";
import squaresJ from "../cards/squares/squares-jack.png";
import squaresQ from "../cards/squares/squares-queen.png";
import squaresK from "../cards/squares/squares-king.png";
import squaresA from "../cards/squares/squares-ace.png";
import betLogo from "../chips/betLogo.PNG";
import clubA from "../cards/clubs/clubs-ace.png";
import club2 from "../cards/clubs/clubs-2.png";
import club3 from "../cards/clubs/clubs-3.png";
import club4 from "../cards/clubs/clubs-4.png";
import club5 from "../cards/clubs/clubs-5.png";
import club6 from "../cards/clubs/clubs-6.png";
import club7 from "../cards/clubs/clubs-7.png";
import club8 from "../cards/clubs/clubs-8.png";
import club9 from "../cards/clubs/clubs-9.png";
import club10 from "../cards/clubs/clubs-10.png";
import clubJ from "../cards/clubs/clubs-jack.png";
import clubQ from "../cards/clubs/clubs-queen.png";
import clubK from "../cards/clubs/clubs-king.png";
import cardBack from "../cards/card-back.png";
import ResultPage from "./resultpage";

function TableBoard(props) {
    const cardImgPath = {
        "heart2": heart2,
        "heart3": heart3,
        "heart4": heart4,
        "heart5": heart5,
        "heart6": heart6,
        "heart7": heart7,
        "heart8": heart8,
        "heart9": heart9,
        "heart10": heart10,
        "heartJack": heartJ,
        "heartQueen": heartQ,
        "heartKing": heartK,
        "heartAce": heartA,
        "spade2": spade2,
        "spade3": spade3,
        "spade4": spade4,
        "spade5": spade5,
        "spade6": spade6,
        "spade7": spade7,
        "spade8": spade8,
        "spade9": spade9,
        "spade10": spade10,
        "spadeJack": spadeJ,
        "spadeQueen": spadeQ,
        "spadeKing": spadeK,
        "spadeAce": spadeA,
        "squares2": squares2,
        "squares3": squares3,
        "squares4": squares4,
        "squares5": squares5,
        "squares6": squares6,
        "squares7": squares7,
        "squares8": squares8,
        "squares9": squares9,
        "squares10": squares10,
        "squaresJack": squaresJ,
        "squaresQueen": squaresQ,
        "squaresKing": squaresK,
        "squaresAce": squaresA,
        "clubs2": club2,
        "clubs3": club3,
        "clubs4": club4,
        "clubs5": club5,
        "clubs6": club6,
        "clubs7": club7,
        "clubs8": club8,
        "clubs9": club9,
        "clubs10": club10,
        "clubsJack": clubJ,
        "clubsQueen": clubQ,
        "clubsKing": clubK,
        "clubsAce": clubA,
        "card-back": cardBack
    };


    return (props.trigger) ? (
            <div
                className={"table-board-container"}
                style={{backgroundImage: "url(/tableBoardImage.jpg)"}}
            >
                <div className={"dealerHands"}>
                    {props.dealerHands.map((card, index) => {
                        return <img className={"dealerCard"} key={index} {...{src: cardImgPath[card]}}
                                    alt={cardImgPath[card]}
                        />
                    })}
                    <div className={"dealerValue"}>
                        Dealer: {props.dealerValue}
                    </div>
                </div>


                <div className={"tableBoardContainerInner"}>
                    <div className={"hitButton"}>
                        <button
                            // style={{fontSize: "30px", width: "200px", height: "100px"}}
                            onClick={() => {
                                if (props.playerValue < 21) {
                                    props.hit();
                                }
                            }}

                        >Hit
                        </button>

                    </div>
                    <div className={"playerBet"}
                    >
                        <img src={betLogo} alt={betLogo} style={{width: "180px", height: "150px"}}/>
                        ${props.bet}
                    </div>
                    <div className={"standButton"}>
                        <button
                            // style={{fontSize: "30px", width: "200px", height: "100px"}}
                            onClick={() => {
                                props.stand();
                                setTimeout(() => {
                                    props.setResultPageTrigger(true);
                                }, 2000);
                            }}

                        >Stand
                        </button>
                    </div>
                </div>


                <div className={"playerHandsContainer"}>
                    <div className={"bankAfterBet"}
                    >
                        Bank: ${props.balance}
                    </div>

                    <div className={"playerHands"}>
                        {props.playerHands.map((card, index) => {
                            return <img className={"playerCard"} key={index} src={cardImgPath[card]} alt={cardImgPath[card]}
                            />
                        })}
                    </div>

                    <div className={"playerValue"}
                    >
                        Player: {props.playerValue}

                    </div>
                    {props.children}
                </div>

                <ResultPage
                    trigger={props.resultPageTrigger}
                    setTrigger={() => {
                        props.setMainPageTrigger(false);
                    }}
                    gameResult={props.gameResult}
                    resetState={props.resetState}
                    balance={props.balance}
                    showNoMoneyTrigger={props.showNoMoneyTrigger}
                    setShowNoMoneyTrigger={props.setShowNoMoneyTrigger}
                />

            </div>
        ) :
        "";
}

export default TableBoard
