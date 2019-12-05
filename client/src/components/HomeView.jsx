import React from "react";
import { ContractAbi, contractAddress } from "../utils/DPostItAbi";
import Web3 from "web3";
import Layout from "./Layout";
import PostCard from "./PostCard";
import "./css/HomeView.css";

export default class HomeView extends React.Component {
    constructor() {
        super();
        this.web3 = new Web3(window.web3.currentProvider);
        this.DPostIt = new this.web3.eth.Contract(ContractAbi, contractAddress);
        this.getAllPosts = this.getAllPosts.bind(this);
        this.listPosts = this.listPosts.bind(this);
        this.setAnAccount = this.setAnAccount.bind(this);
    }

    componentDidMount() {
        const { account } = this.props;
        if (account) {
            this.getAllPosts();
        }
    }

    getAllPosts() {
        const { account } = this.props;
        console.log(account);
        this.props.getPostList(
            this.DPostIt.methods.listPosts().call({ from: account })
        );
    }

    setAnAccount(accounts) {
        this.props.setAccount(accounts[0], "enabled");
    }

    listPosts() {
        const { posts } = this.props;

        return (
            <React.Fragment>
                {posts.length > 0 ? (
                    <div className="all-posts-container">
                        {posts.map(post => (
                            <PostCard post={post} key={post.key} />
                        ))}
                    </div>
                ) : (
                    <p>There are not posts yet. Create a new one!</p>
                )}
            </React.Fragment>
        );
    }

    render() {
        return (
            <Layout>
                {this.props.logged ? (
                    this.listPosts()
                ) : (
                    <React.Fragment>
                        <h1>Welcome to D-PostIt</h1>
                        <p>Login with metamask to access the posts</p>
                    </React.Fragment>
                )}
            </Layout>
        );
    }
}
