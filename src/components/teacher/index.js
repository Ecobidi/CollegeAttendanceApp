import {createStackNavigator} from 'react-navigation-stack'

import CourseList from './CourseList'
import ChooseAttendanceCourse from './ChooseAttendanceCourse'
import TakeAttendance from './TakeAttendance'

export default TeacherStackNavigator = createStackNavigator({
  teacher_CourseList: CourseList,
  teacher_ChooseAttendanceCourse: ChooseAttendanceCourse,
  teacher_TakeAttendance: TakeAttendance
}, 
{
  initialRouteName: 'teacher_TakeAttendance', // reset to teacher_CourseList
  headerMode: 'none'
})