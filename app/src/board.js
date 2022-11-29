import React from "react";
import Popup from "./components/popup.js";
import MainPage from "./components/mainpage.js";
import logo from "./test1.png";
import playIcon from "./play-icon.png";
import bet500 from "./chips/500.PNG";
import bet10 from "./chips/10.PNG";
import bet25 from "./chips/25.PNG";
import bet50 from "./chips/50.PNG";
import bet100 from "./chips/100.PNG";
import bet1000 from "./chips/1000.PNG";


export class MainBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            gameIdentity: "",
            playerName: "",
            player_hands: [],
            dealer_hands: [],
            balance: "0",
            bet: "0",
            player_value: "",
            dealer_value: "",
            game_result: "",

            buttonPopup: false,
            mainPopup: false,
            bet10Popup: false,
            playerBets: [],
            resultPageTrigger: false,
            showNoMoneyTrigger: false,

        }
    }

    async startGame() {
        const params = {playerName: this.state.playerName};

        const response = await fetch(`http://144.168.60.251:29725/game/start?name=${encodeURIComponent(params.playerName)}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log('result is', JSON.stringify(data, null, 4));

        this.setState({
            playerName: data.data.player_name, gameIdentity: data.data.game_identity, balance: data.data.balance,
        });
        this.handlePopup();
        this.handleMainPopup();

    }

    async setBet(my_bet) {
        let game_identity = this.state.gameIdentity;
        let name = this.state.playerName;
        let bet = my_bet;
        let balance = this.state.balance;
        const response = await fetch("http://144.168.60.251:29725/game/set_bet", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'player_name': name, 'game_identity': game_identity, 'bet': bet, 'balance': balance}),
        });

        const data = await response.json();
        console.log('result is', JSON.stringify(data, null, 4));

        this.setState({
            bet: data.data.bet,
        });
    }

    async deal() {
        const param = {player_name: this.state.playerName, game_identity: this.state.gameIdentity};
        const response = await fetch("http://144.168.60.251:29725/game/deal", {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(param),
        });

        const data = await response.json();
        console.log('result is', JSON.stringify(data, null, 4));
        this.setState({
            player_hands: data.data.player_hands,
            dealer_hands: data.data.dealer_hands,
            player_value: data.data.player_value,
            dealer_value: data.data.dealer_value,
        });
    }

    async stand() {
        let game_identity = this.state.gameIdentity;
        let name = this.state.playerName;
        const response = await fetch("http://144.168.60.251:29725/game/stand", {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({'game_identity': game_identity, 'player_name': name}),
        });

        const data = await response.json();
        console.log('result is', JSON.stringify(data, null, 4));

        this.setState({
            dealer_hands: data.data.dealer_hands,
            game_result: data.data.game_result,
            dealer_value: data.data.dealer_value,
        });
    }

    async hit() {
        let game_identity = this.state.gameIdentity;
        let name = this.state.playerName;
        const response = await fetch("http://144.168.60.251:29725/game/hit", {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({'game_identity': game_identity, 'player_name': name}),
        });

        const data = await response.json();
        console.log('result is', JSON.stringify(data, null, 4));

        if (data.data.value_count_status === 1 || data.data.value_count_status === 2) {
            await this.stand();
        }

        this.setState({
                player_hands: data.data.player_hands,
                player_value: data.data.player_value,

            }, () => {
                if (this.state.player_value >= 21) {
                    setTimeout(() => {
                        this.setState({
                            resultPageTrigger: true
                        })
                    }, 2000)

                }
            }
        )
    }


    getResult(bet) {
        if (this.state.game_result === 0) {
            return "Win $" + bet + "!";
        }
        if (this.state.game_result === 1) {
            return "Dealer Wins!";
        }
        if (this.state.game_result === 2) {
            return "Draw";
        }
        if (this.state.game_result === 3) {
            return "Push!";
        }
    }

    handlePopup() {
        this.setState({
            buttonPopup: !this.state.buttonPopup
        }, () => {
            console.log("New game popup is " + this.state.buttonPopup);
        });
    }

    handleMainPopup() {
        this.setState({
            mainPopup: !this.state.mainPopup
        }, () => {
            console.log("Main page popup is " + this.state.mainPopup);
        });

    }

    handleSetBet(my_bet) {
        let bet = this.state.bet
        let balance = this.state.balance
        bet = parseInt(bet) + parseInt(my_bet);
        balance = parseInt(balance) - parseInt(my_bet);
        this.setState({
            bet: bet, balance: balance,
        });
    }

    setResultPageTrigger() {
        this.setState({
            resultPageTrigger: !this.state.resultPageTrigger
        }, () => {
            console.log("Result page popup is " + this.state.resultPageTrigger);
        });

    }

    setNoMoneyTrigger() {
        this.setState({
            showNoMoneyTrigger: !this.state.showNoMoneyTrigger
        }, () => {
            console.log("No money popup is " + this.state.showNoMoneyTrigger);
        });

    }

    async resetState() {
        let game_identity = this.state.gameIdentity;
        let name = this.state.playerName;

        const response = await fetch('http://localhost:3001/game/game_over', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'player_name': name,
                'game_identity': game_identity,
            }),
        })
        const data = await response.json();
        console.log('result is', JSON.stringify(data, null, 4));

        this.setState({
                playerName: data.data.player_name,
                gameIdentity: data.data.game_identity,
                balance: data.data.balance,
                bet: 0,
                playerBets: [],
                resultPageTrigger: false,
            }, () => {
                if (data.data.balance === 0) {
                    this.setState({
                        showNoMoneyTrigger: true
                    });
                }
            }
        );
    }

    handlePlayerNameChange(name) {
        this.setState({
            playerName: name,
        });
    }

    render() {
        return (<main style={{backgroundImage: "url(/backgroundImage.jpg)"}}>
                <div>
                    <div className="container">
                        <img className={"logoImage"} {...{src: logo}} alt="logo"/>
                        <br/>
                        <div>
                            <button
                                className={"play"}
                                onClick={() => this.handlePopup()}
                                style={{
                                    width: 200,
                                    height: 50,
                                    fontSize: 20,
                                    backgroundColor: "",
                                    color: "white",
                                    border: "none"
                                }}
                            >
                                <img
                                    {...{src: playIcon}}
                                    alt="playIcon"
                                    style={{width: 20, height: 20,}}/>
                                PLAY
                            </button>
                        </div>
                    </div>

                    <Popup
                        trigger={this.state.buttonPopup}
                        setTrigger={() => this.handlePopup()}
                    >
                        <h1>
                            Welcome to BlackJack!
                        </h1>
                        <img className={"betImage"}
                             {...{src: bet500}} alt={bet500}/>
                        <br/>
                        <div className={"popup-player-name"}>
                            <h2 style={{color: "black"}}>
                                Please enter your name:
                                <br></br>
                                <input className={"player-name-input"}
                                       style={{
                                           width: 300,
                                           height: 50,
                                           background: 'inherit',
                                           margin: '5px',
                                           color: 'black',
                                           fontSize: 20,
                                           textAlign: 'center',
                                       }}
                                       onChange={event => {
                                           this.handlePlayerNameChange(event.target.value)
                                       }}/>
                            </h2>
                        </div>
                        <button
                            className={"new-game"}
                            onClick={() => this.startGame()}

                        >
                            NEW GAME
                        </button>
                    </Popup>

                    <MainPage
                        trigger={this.state.mainPopup}
                        setTrigger={() => this.handleMainPopup()}
                        balance={this.state.balance}
                        bet={this.state.bet}
                        setBet={(my_bet) => this.setBet(my_bet)}
                        handleSetBet={(my_bet) => this.handleSetBet(my_bet)}
                        deal={() => {
                            if (this.state.bet > 0) {
                                this.deal();
                            } else {
                                alert("Please place a bet");
                            }
                        }}
                        playerBets={this.state.playerBets}
                        playerHands={this.state.player_hands}
                        playerValue={this.state.player_value}
                        dealerHands={this.state.dealer_hands}
                        dealerValue={this.state.dealer_value}
                        hit={() => {
                            this.hit();
                        }}
                        stand={() => this.stand()}
                        gameResult={this.getResult(this.state.bet)}
                        resultPageTrigger={this.state.resultPageTrigger}
                        setResultPageTrigger={() => this.setResultPageTrigger()}
                        resetState={() => this.resetState()}
                        showNoMoneyTrigger={this.state.showNoMoneyTrigger}
                        setShowNoMoneyTrigger={() => this.setNoMoneyTrigger()}
                    >
                        <div className={"hideOnMobileSetUpButton"}>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img
                                    className={"bet10"}
                                    {...{src: bet10}} alt={bet10} style={{width: 120, height: 120}}
                                    onClick={() => {
                                        if (this.state.balance >= 10) {
                                            this.handleSetBet(10)
                                            this.state.playerBets.push("bet10")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet25}} alt={bet25} style={{width: 120, height: 120}}
                                    onClick={() => {
                                        if (this.state.balance >= 25) {
                                            this.handleSetBet(25)
                                            this.state.playerBets.push("bet25")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet50}} alt={bet50} style={{width: 120, height: 120}}
                                    onClick={() => {
                                        if (this.state.balance >= 50) {
                                            this.handleSetBet(50)
                                            this.state.playerBets.push("bet50")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet100}} alt={bet100} style={{width: 120, height: 120}}
                                    onClick={() => {
                                        if (this.state.balance >= 100) {
                                            this.handleSetBet(100)
                                            this.state.playerBets.push("bet100")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}
                                />
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet500}} alt={bet500} style={{width: 120, height: 120}}
                                    onClick={() => {
                                        if (this.state.balance >= 500) {
                                            this.handleSetBet(500)
                                            this.state.playerBets.push("bet500")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet1000}} alt={bet1000} style={{width: 120, height: 120}}
                                    onClick={() => {
                                        if (this.state.balance >= 1000) {
                                            this.handleSetBet(1000)
                                            this.state.playerBets.push("bet1000")
                                            console.log(this.state.playerBets)
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                        </div>

                        <div className={"hideOnDesktopSetUpButton"}>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100}}
                            >
                                <img
                                    className={"bet10"}
                                    {...{src: bet10}} alt={bet10} style={{width: 90, height: 90}}
                                    onClick={() => {
                                        if (this.state.balance >= 10) {
                                            this.handleSetBet(10)
                                            this.state.playerBets.push("bet10")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet25}} alt={bet25} style={{width:90, height: 90}}
                                    onClick={() => {
                                        if (this.state.balance >= 25) {
                                            this.handleSetBet(25)
                                            this.state.playerBets.push("bet25")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet50}} alt={bet50} style={{width: 90, height: 90}}
                                    onClick={() => {
                                        if (this.state.balance >= 50) {
                                            this.handleSetBet(50)
                                            this.state.playerBets.push("bet50")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet100}} alt={bet100} style={{width: 90, height: 90}}
                                    onClick={() => {
                                        if (this.state.balance >= 100) {
                                            this.handleSetBet(100)
                                            this.state.playerBets.push("bet100")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}
                                />
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet500}} alt={bet500} style={{width: 90, height: 90}}
                                    onClick={() => {
                                        if (this.state.balance >= 500) {
                                            this.handleSetBet(500)
                                            this.state.playerBets.push("bet500")
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                            <button
                                className={"set-bet-button"}
                                style={{borderRadius: 100,}}
                            >
                                <img{...{src: bet1000}} alt={bet1000} style={{width: 90, height: 90}}
                                    onClick={() => {
                                        if (this.state.balance >= 1000) {
                                            this.handleSetBet(1000)
                                            this.state.playerBets.push("bet1000")
                                            console.log(this.state.playerBets)
                                        } else {
                                            alert("You don't have enough money")
                                        }
                                    }}/>
                            </button>
                        </div>
                    </MainPage>
                </div>
            </main>

        )
    }
}
