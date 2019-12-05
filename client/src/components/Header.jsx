import React from 'react';
import { Link } from 'react-router-dom';
import Ipfs from 'ipfs';
import Web3 from "web3";
import DPostItLogo from '../assets/svg/D_POSTIT_LOGO.svg'
import './css/Header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.setAnAccount = this.setAnAccount.bind(this);
        this.initializeMetamask = this.initializeMetamask.bind(this);
    }
    componentDidMount() {
        // this.props.changeLogged();
        this.initializeMetamask();
    };

    setAnAccount(accounts) {
        this.props.setAccount(accounts[0], 'enabled');
    }

    async initializeMetamask() {
        const { setMetamask, setAccount, storeIpfsIntance } = this.props;
        if(typeof window.ethereum === 'undefined' && typeof window.web3 === 'undefined') {
            return setMetamask(false);
        }
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                const accounts = await window.ethereum.enable();
                window.ethereum.on('accountsChanged', this.setAnAccount);
                setAccount(accounts[0], 'enabled');
                storeIpfsIntance(Ipfs.create());
            } catch (error) {
                setMetamask('denied');
            }
        }
        else {
            window.web3 = new Web3(window.web3.currentProvider);
            setAccount(window.web3.eth.accounts[0], 'enabled');
        }
    }

    render() {
        return (
            <nav className="App">
                <div><img src={DPostItLogo} alt="dpostit-logo"/></div>
                <div className="menu-options">
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/create-post">Create Post</Link></div>
                </div>
            </nav>
        )
    }
}