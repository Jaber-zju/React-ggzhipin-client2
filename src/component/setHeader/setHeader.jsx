import React,{Component} from 'react'
import {connect} from "react-redux";
import {Grid,List} from "antd-mobile";
import PropTypes from 'prop-types'

class SetHeader extends Component {
  constructor(props){
    super(props)
    this.headerList = []
    for (let i=0; i<20; i++){
      this.headerList.push({
        text:'头像'+(i+1),
        icon:require(`../../assets/images/头像${i+1}.png`)
      })
    }
  }

  state = {
    icon: null
  }

  static propTypes = {
    setHeader:PropTypes.func.isRequired,

  }

  setHeader = ({text,icon}) => {
    this.setState({icon})
    this.props.setHeader(text)

  }


  render(){
    const {icon} = this.state
    this.listHeader = !icon?'请选择头像':(
        <div>
          已选择头像
          <img src={icon}/>
        </div>
    )

    return (
        <div>
          <List renderHeader={() => this.listHeader }>
            <Grid data={this.headerList} columnNum={5} onClick={this.setHeader} />
          </List>
        </div>
    )
  }
}

export default connect(
    state => ({}),
    {}
)(SetHeader)

