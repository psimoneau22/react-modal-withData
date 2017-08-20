import React, { Component } from 'react';
import Modal from './Modal';
import withData from './withData';

const DataButton = withData('button');
const DataInput = withData('input');

export default class Container extends Component {

    state = {
        data: [
            { prop1: 'x1', prop2: 'y1' },
            { prop1: 'x2', prop2: 'y2' },
            { prop1: 'x3', prop2: 'y3' },
            { prop1: 'x4', prop2: 'y4' },
        ],
        result: undefined,
    }

    handleModalRequest = async (...args) => {
        const e = args[1];
        const info = args[2];

        const result = await this.modal.show(info);
        this.setState({
            result,
        });
    }

    
    handleItemChange = (e, index) => {
        const data = [...this.state.data];
        data.splice(index, 1, {
            ...this.state.data[index],
            prop2: e.target.value,
        });

        this.setState({ data });
    }

    render () {
        return (
            <div>
                {
                    this.state.data.map((item, index) => (
                        <div key={index}>
                            <DataButton data={item} onClick={this.handleModalRequest} >test</DataButton>
                            <DataInput data={index} onChange={this.handleItemChange} value={item.prop2} />
                            {JSON.stringify(item)}
                        </div>
                    ))
                }
                <pre style={{'textAlign': 'initial'}} >{JSON.stringify(this.state.result, null, 4)}</pre>
                <Modal ref={el => this.modal = el} />
            </div>
        );
    }
}
