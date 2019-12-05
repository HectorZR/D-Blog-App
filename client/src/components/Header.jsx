import React from "react";
import { Link } from "react-router-dom";
import Ipfs from "ipfs";
import Web3 from "web3";
import { ContractAbi, contractAddress } from "../utils/DPostItAbi";
import DPostItLogo from "../assets/svg/D_POSTIT_LOGO.svg";
import "./css/Header.css";

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.setAnAccount = this.setAnAccount.bind(this);
        this.initializeMetamask = this.initializeMetamask.bind(this);
    }
    componentDidMount() {
        this.initializeMetamask();
    }

    setAnAccount(accounts) {
        this.props.setAccount(accounts[0], "enabled");
    }

    async initializeMetamask() {
        const {
            setMetamask,
            setAccount,
            storeIpfsIntance,
            getPostList
        } = this.props;
        if (
            typeof window.ethereum === "undefined" &&
            typeof window.web3 === "undefined"
        ) {
            return setMetamask(false);
        }
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(accounts => {
                    window.ethereum.on("accountsChanged", this.setAnAccount);
                    setAccount(accounts[0], "enabled");

                    const web3 = new Web3(window.web3.currentProvider);
                    const DPostIt = new web3.eth.Contract(
                        ContractAbi,
                        contractAddress
                    );
                    getPostList(
                        DPostIt.methods.listPosts().call({ from: accounts[0] })
                    );
                    storeIpfsIntance(Ipfs.create());
                });
            } catch (error) {
                setMetamask("denied");
            }
        } else {
            window.web3 = new Web3(window.web3.currentProvider);
            setAccount(window.web3.eth.accounts[0], "enabled");
        }
    }

    render() {
        const { logged } = this.props;
        return (
            <nav className="App">
                <div>
                    <img src={DPostItLogo} alt="dpostit-logo" />
                </div>
                <div className="menu-options">
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    {logged ? (
                        <React.Fragment>
                            <div>
                                <Link to="/create-post">Create Post</Link>
                            </div>
                        </React.Fragment>
                    ) : null}
                </div>
            </nav>
        );
    }
}
