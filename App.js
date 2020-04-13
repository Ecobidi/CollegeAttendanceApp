import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// screens
import AdminStackNavigator from './src/components/admin/index';
import TeacherStackNavigator from './src/components/teacher/index';
import LoginScreen from './src/components/auth/Login';

const AuthStackNavigator = createStackNavigator({
  Login: LoginScreen,
}, {
  headerMode: 'none'
});

const MainSwitchNavigator = createSwitchNavigator({
  Admin: AdminStackNavigator,
  Teacher: TeacherStackNavigator
}, {
  headerMode: 'none',
  initialRouteName: 'Teacher' // reset this later
});

const AppSwitchNavigator = createSwitchNavigator({
  Auth: AuthStackNavigator,
  Main: MainSwitchNavigator,
}, {
  initialRouteName: 'Main' // reset back to auth or use a custom splash screen
});

export default createAppContainer(AppSwitchNavigator);
