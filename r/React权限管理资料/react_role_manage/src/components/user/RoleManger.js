import {Component} from 'react'

class RoleManger extends Component{
    render() {
        return (
            <>
                <h2>角色管理</h2>
                {this.props.children}
            </>
        )
    }
}

export default RoleManger