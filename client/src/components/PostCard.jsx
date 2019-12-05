import React from "react";
import "./css/PostCard.css";
import { Link } from "react-router-dom";

export default class PostCard extends React.Component {
    render() {
        const { post } = this.props;
        return (
            <div className="post-card-container">
                <h3>{`${post.key} - ${post.name}`}</h3>
                <p>{post.description}</p>
                {post.url ? <p>Already paid</p> : null}

                <Link to={`/post/${post.key}`}>Read more</Link>
            </div>
        );
    }
}
