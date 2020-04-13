import {createStackNavigator} from 'react-navigation-stack';

import StudentListScreen from './StudentList';
import AddStudentScreen from './AddStudent';
import TeacherListScreen from './TeacherList';
import AddTeacherScreen from './AddTeacher';
import CourseListScreen from './CourseList';
import AddCourseScreen from './AddCourse';
import AttendanceHomeScreen from './AttendanceHome';
import CourseAttendanceReportScreen from './CourseAttendanceReport';
import StudentAttendanceReportScreen from './StudentAttendanceReport';

export default AdminStackNavigator = createStackNavigator({
  admin_StudentList: StudentListScreen,
  admin_AddStudent: AddStudentScreen,
  admin_TeacherList: TeacherListScreen,
  admin_AddTeacher: AddTeacherScreen,
  admin_CourseList: CourseListScreen,
  admin_AddCourse: AddCourseScreen,
  admin_AttendanceHome: AttendanceHomeScreen,
  admin_CourseAttendanceReport: CourseAttendanceReportScreen,
  admin_StudentAttendanceReport: StudentAttendanceReportScreen
}, {headerMode: 'none', initialRouteName: 'admin_AttendanceHome'});
