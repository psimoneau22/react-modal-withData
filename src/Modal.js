import React, { Component } from 'react';
import ReactModal from 'react-modal';

const STATUS = {
    CANCEL: 'CANCEL',
    ACCEPT: 'ACCEPT',
}

export default class extends Component {
    static STATUS = STATUS;

    state = {
        open: false,
        data: undefined,
    }

    show = data => new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.setState({
            open: true,
            data,
        });
    }).then(result => {
        this.setState({
            open: false,
            data: undefined,
        });
        return result;
    });

    handleClose = () => {
        this.resolve({
            status: STATUS.CANCEL,
            data: this.state.data,
        });
    }

    handleAccept = () => {
        this.resolve({
            status: STATUS.CANCEL,
            data: this.state.data,
    
        });
    }

    render () {
        return (
            <ReactModal isOpen={this.state.open} onRequestClose={this.handleClose} contentLabel="test" >
                <div>{JSON.stringify(this.state.data)}</div>
                <button onClick={this.handleClose}>Cancel</button>
                <button onClick={this.handleAccept}>Accept</button>
            </ReactModal>
        );
    }
}