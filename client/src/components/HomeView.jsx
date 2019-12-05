import React from 'react';
import { ContractAbi, contractAddress } from '../utils/DPostItAbi';
import Web3 from 'web3';
import Layout from './Layout';

export default class HomeView extends React.Component {
    constructor() {
        super();
        this.getAllPosts = this.getAllPosts.bind(this);
        this.listPosts = this.listPosts.bind(this);
    }

    componentDidMount() {
        this.getAllPosts();
    }

    getAllPosts() {
        const web3 = new Web3(window.web3.currentProvider);
        const DPostIt = new web3.eth.Contract(ContractAbi, contractAddress)
        this.props.getPostList(DPostIt.methods.listPosts().call({from: this.props.account }));
    }

    listPosts() {
        const { posts } = this.props;

        return (
            <React.Fragment>
                <h1>These are the posts</h1>
                {
                    posts.map((post) => (
                        <div key={post.key}>
                            <h3>{`${post.key} - ${post.name}`}</h3>
                            <p>{post.description}</p>
                        </div>
                    ))
                }
            </React.Fragment>
        )
    }

    render() {
        return (
            <Layout>
                {
                    this.props.logged ? 
                        this.listPosts()
                    : <React.Fragment>
                        <h1>Welcome to D-PostIt</h1>
                        <p>Login with metamask to access the posts</p>
                    </React.Fragment>
                }
            </Layout>
        )
    }
}