import React from "react";
import Web3 from "web3";
import { ContractAbi, contractAddress } from "../utils/DPostItAbi";
import { withRouter } from "react-router-dom";
import BigNumber from "bignumber.js";
import Layout from "./Layout";
import Loader from "./Loader";

const COINS = {
    ether: 1,
    gwei: 1000000000,
    wei: 1000000000000000000
};

class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTransanction: false,
            value: "",
            toWeiValue: "",
            error: ""
        };
        this.web3 = new Web3(window.web3.currentProvider);
        this.DPostIt = new this.web3.eth.Contract(ContractAbi, contractAddress);
        this.showSinglePost = this.showSinglePost.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSendTransaction = this.onSendTransaction.bind(this);
        this.onChange = this.onChange.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;
        this.showSinglePost(id);
    }

    showSinglePost(id) {
        const { showPost, account } = this.props;

        showPost(this.DPostIt.methods.getPost(id).call({ from: account }));
    }

    onClick() {
        this.setState({
            startTransanction: true
        });
    }

    onChange({ target: { name, value } }) {
        this.setState({
            [name]: value
        });
    }

    onSendTransaction() {
        const {
            account,
            payForGettingLink,
            match: {
                params: { id }
            }
        } = this.props;
        const { value } = this.state;

        if (!/^([0-9]{1,18})/gm.test(value)) {
            return;
        }

        payForGettingLink(
            this.DPostIt.methods.payForAccess(id).send({ from: account, value })
        );
    }

    downloadFile() {
        const { url: hash } = this.props.singlePost;

        window._ipfs
            .get(hash)
            .then(files => {
                const file = new Blob([files[0].content], {
                    type: "application/octet-binary"
                });
                const url = URL.createObjectURL(file);
                const link = document.createElement("a");
                link.href = url;
                document.body.append(link);
                link.click();
                link.remove();
            })
            .catch(console.log);
    }

    render() {
        const { description, name, url } = this.props.singlePost;
        const { isLoadingShowPost, account } = this.props;
        const { startTransanction, value } = this.state;
        return (
            <Layout>
                <div>
                    <p>{name}</p>
                    <p>{description}</p>

                    {isLoadingShowPost ? (
                        <Loader />
                    ) : (
                        <React.Fragment>
                            {url ? (
                                <button onClick={this.downloadFile}>
                                    Download link
                                </button>
                            ) : (
                                <React.Fragment>
                                    <button onClick={this.onClick}>
                                        Get File
                                    </button>
                                    {startTransanction ? (
                                        <React.Fragment>
                                            <p>
                                                To get file you must pay at
                                                least 1000 wei =
                                                0.000000000000001 ethers
                                            </p>
                                            <input
                                                type="text"
                                                name="value"
                                                value={value}
                                                onChange={this.onChange}
                                            />
                                            <button
                                                onClick={this.onSendTransaction}
                                            >
                                                Send Transaction
                                            </button>
                                        </React.Fragment>
                                    ) : null}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
                </div>
            </Layout>
        );
    }
}
export default withRouter(props => <PostView {...props} />);
