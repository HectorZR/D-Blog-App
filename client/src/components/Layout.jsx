import React from 'react';
import './css/Layout.css'

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout">
                <div className="layout-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}