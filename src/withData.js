import React, { Component } from 'react';

const defaultOptions = {
    events: undefined,
}

export default (Target, options) => {
    Target = React.isValidElement(Target) ? Target.type : Target;
    options = { ...defaultOptions, ...options }

    class WithData extends Component {
        constructor(props, context){
            super(props, context);
            this.handlers = getHandlers(options.events, this);        
        }

        render() {
            const { data, children, ...props } = this.props;
            return <Target {...props} {...this.handlers} >{children}</Target>;
        }

        static displayName = `withData(${Target.displayName || Target.name || 'Component'})`
    }

    return WithData;
}

function getHandlers(events, thisContext) {
    if(!events)
        events = Object.keys(thisContext.props).filter(prop => prop.startsWith('on') && typeof thisContext.props[prop] === 'function')
    else if (typeof events === 'string')
        events = [events];

    return events.reduce((result, eventType) => {
        result[eventType] = (...args) => thisContext.props[eventType](...args, thisContext.props.data);
        return result;
    }, {});
}