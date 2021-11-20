/**react的createProtal API创建模态框 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export default class createPortal extends Component {

    constructor(props) {
        super(props)
        this.body = document.querySelector('body')
        this.el = document.createElement('div')
    }

    componentDidMount() {
        this.el.setAttribute('id', 'portal-root')
        this.body.appendChild(this.el)
    }

    componentWillUnmount() {
        this.body.removeChild(this.el)
    }

    render() {
        return (
            ReactDOM.createPortal(this.props.children, this.el)
        )
    }
}

//使用
export default class modal extends Component {

    render() {
        return (
            <>
                <createPortal>
                    {this.props.children}
                    <Icon />
                </createPortal>
            </>
        )
    }
}