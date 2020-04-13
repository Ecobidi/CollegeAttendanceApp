import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const Toolbar = (props) => {
  let {drawer, getDrawerOpen,} = props;
  return (
    <Icon.ToolbarAndroid
      style={style} 
      titleColor={'#fff'}
      navIconName={'navicon'}
      iconSize={20}
      iconColor={'#fff'}
      onIconClicked={() => {
        if (getDrawerOpen()) drawer.closeDrawer();
        else drawer.openDrawer();
      }}
      {...props}
    />
  )
}

export default Toolbar

const style = {
  height: 50, 
  backgroundColor: '#333' 
}
