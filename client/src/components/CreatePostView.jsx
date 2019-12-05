import React from "react";
import { contractAddress, ContractAbi } from "../utils/DPostItAbi";
import Web3 from "web3";
import Layout from "./Layout";
import "./css/CreatePost.css";

export default class CreatePostView extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            url: null
        };
        this.onChange = this.onChange.bind(this);
        this.savePost = this.savePost.bind(this);
    }

    onChange(event) {
        let { name, value } = event.target;

        if (name === "url") {
            value = event.target.files[0];
            console.log(value);
        }
        if (name !== "url") {
            value = value.trim();
        }
        this.setState({
            [name]: value
        });
    }

    savePost() {
        const { account, savePostToContract, storePostWithFile } = this.props;
        const { name, description, url } = this.state;
        if (!url) return;

        let fileReader = new FileReader();
        const web3 = new Web3(window.web3.currentProvider);
        const contract = new web3.eth.Contract(ContractAbi, contractAddress, {
            gas: 1000000
        });

        if (name && description && url) {
            console.log(fileReader);
            fileReader.onload = async () => {
                window._ipfs
                    .add(Buffer.from(fileReader.result))
                    .then(async result => {
                        try {
                            console.log("entre en el try catch");
                            console.log(result);
                            savePostToContract(
                                contract.methods
                                    .savePost(name, description, result[0].path)
                                    .send({
                                        from: account
                                    })
                            );
                        } catch (error) {
                            console.log(error);
                        }
                    });
            };
            fileReader.readAsArrayBuffer(url);
        }
    }
    render() {
        const { name, description, url } = this.state;
        return (
            <Layout>
                <div className="create-post-container">
                    <p>Create a new Post!</p>
                    <p>You only have to pay for gas consuption</p>
                    <div>
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Put a title for your post"
                            value={name}
                            name="name"
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <textarea
                            type="text"
                            className="text-input"
                            placeholder="Add a description"
                            value={description}
                            name="description"
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            /* accept="" */ className="text-input"
                            name="url"
                            onChange={this.onChange}
                        />
                    </div>
                    <button className="button" onClick={this.savePost}>
                        Create Post
                    </button>
                </div>
            </Layout>
        );
    }
}
