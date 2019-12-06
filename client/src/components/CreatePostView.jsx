import React from "react";
import { contractAddress, ContractAbi } from "../utils/DPostItAbi";
import Web3 from "web3";
import Layout from "./Layout";
import "./css/CreatePost.css";
import Loader from "./Loader";

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
        }

        this.setState({
            [name]: value
        });
    }

    savePost() {
        const { account, savePostToContract } = this.props;
        const { name, description, url } = this.state;
        if (!url) return;

        let fileReader = new FileReader();
        const web3 = new Web3(window.web3.currentProvider);
        const contract = new web3.eth.Contract(ContractAbi, contractAddress, {
            gas: 1000000
        });

        if (name && description && url) {
            fileReader.onload = async () => {
                window._ipfs
                    .add(Buffer.from(fileReader.result))
                    .then(async result => {
                        try {
                            savePostToContract(
                                contract.methods
                                    .savePost(
                                        name.trim(),
                                        description.trim(),
                                        result[0].path
                                    )
                                    .send({
                                        from: account
                                    })
                            );
                            this.setState({
                                name: "",
                                description: "",
                                url: ""
                            });
                        } catch (error) {
                            this.setState({
                                error: "Unable to create post, try again"
                            });
                        }
                    });
            };
            fileReader.readAsArrayBuffer(url);
        }
    }
    render() {
        const { name, description } = this.state;
        const { isLoadingSavePost } = this.props;
        return (
            <Layout>
                <div className="create-post-container">
                    <p>Create a new Post!</p>
                    <p>You only have to pay for gas consuption</p>

                    {isLoadingSavePost ? (
                        <Loader />
                    ) : (
                        <React.Fragment>
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
                                    className="text-input"
                                    name="url"
                                    onChange={this.onChange}
                                />
                            </div>
                            <button className="button" onClick={this.savePost}>
                                Create Post
                            </button>
                        </React.Fragment>
                    )}
                </div>
            </Layout>
        );
    }
}
