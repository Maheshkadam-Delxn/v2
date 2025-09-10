import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import DashboardScreen from '../screens/dashboard/DashboardScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

// // AppNavigator.jsx
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MyTabs from './src/navigation/TabNavigator';

// // Auth Screens
// import SignInScreen from './src/auth/SignInScreen';
// import SignUpScreen from './src/auth/SignUpScreen';
// import OTPScreen from './src/auth/OTPScreen';

// // Dashboard & Main Screens
// import DashboardScreen from './src/screens/dashboard/DashboardScreen';
// import AddNewProjectScreen from './src/screens/AddNewProjectScreen';
// import ProfileScreen from './src/screens/dashboard/sidebar/ProfileScreen';
// import ProjectOverviewScreen from './src/screens/dashboard/ProjectOverviewScreen';
// import OrganizationEmailScreen from './src/screens/dashboard/sidebar/OrganizationEmailScreen';
// import UsersMembersScreen from './src/screens/dashboard/user/UsersMembersScreen';
// import UsersVendorsScreen from './src/screens/dashboard/user/UsersVendorsScreen';
// import MyProjectsScreen from './src/screens/dashboard/sidebar/MyProjectsScreen';

// // Settings Screens
// import SettingsPermissionScreen from './src/screens/dashboard/settings/SettingsPermissionScreen';
// import SettingsEventsScreen from './src/screens/dashboard/settings/SettingsEventsScreen';
// import SettingsReminderScreen from './src/screens/dashboard/settings/SettingsReminderScreen';
// import SettingsScheduleScreen from './src/screens/dashboard/settings/SettingsScheduleScreen';

// // Project Resources Screens
// import BillofQuantity from './src/screens/dashboard/sub-header/project-resources/BillOfQuantityScreen';
// import DocumentScreen from './src/screens/dashboard/sub-header/project-resources/DocumentScreen';
// import DrawingScreen from './src/screens/dashboard/sub-header/project-resources/DrawingScreen';

// // Project Planning Screens
// import ActivityScreen from './src/screens/dashboard/sub-header/project-planning/ActivityScreen';
// import ProjectPlannerScreen from './src/screens/dashboard/sub-header/project-planning/ProjectPlannerScreen';
// import ResourceScreen from './src/screens/dashboard/sub-header/project-planning/ResourceScreen';

// // Payments Screens
// import BillPaymentScreen from './src/screens/dashboard/sub-header/payments/BillPaymentScreen';
// import ExpenseScreen from './src/screens/dashboard/sub-header/payments/ExpenseScreen';
// import GoodReceiveNoteScreen from './src/screens/dashboard/sub-header/payments/GoodReceiveNoteScreen';
// import IndentScreen from './src/screens/dashboard/sub-header/payments/IndentScreen';
// import PurchaseOrderScreen from './src/screens/dashboard/sub-header/payments/PurchaseOrderScreen';

// // Approvals Screens
// import InspectionScreen from './src/screens/dashboard/sub-header/approvals/InspectionScreen';
// import RFIScreen from './src/screens/dashboard/sub-header/approvals/RFIScreen';
// import SnaggingReportScreen from './src/screens/dashboard/sub-header/approvals/SnaggingReportScreen';
// import SubmittalsScreen from './src/screens/dashboard/sub-header/approvals/SubmittalsScreen';

// // Reports Screens
// import ActivityTimelinesScreen from './src/screens/dashboard/sub-header/reports/ActivityTimelinesScreen';
// import DailyProgressScreen from './src/screens/dashboard/sub-header/reports/DailyProgressScreen';
// import MaterialConsumptionScreen from './src/screens/dashboard/sub-header/reports/MaterialConsumptionScreen';

// // Work Order Screens
// import AdvancePaymentScreen from './src/screens/dashboard/sub-header/work-order/AdvancePaymentScreen';
// import BillPaymentScreenn from './src/screens/dashboard/sub-header/work-order/BillPaymentScreenn';
// import BillScreen from './src/screens/dashboard/sub-header/work-order/BillScreen';
// import WorkOrderScreen from './src/screens/dashboard/sub-header/work-order/WorkOrderScreen';

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator 
//       initialRouteName="SignIn"
//       screenOptions={{ headerShown: false }}
//     >
//       {/* Authentication Screens */}
//       <Stack.Screen name="SignIn" component={SignInScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//       <Stack.Screen name="OTP" component={OTPScreen} />
      
//       {/* Main Tab Navigator */}
//       <Stack.Screen 
//         name="Main" 
//         component={MyTabs}
//         options={{
//           gestureEnabled: false, // Prevent swipe back to auth
//         }}
//       />
      
//       {/* Dashboard & Main Screens */}
//       <Stack.Screen name="Dashboard" component={DashboardScreen} />
//       <Stack.Screen name="AddNewProject" component={AddNewProjectScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="ProjectOverview" component={ProjectOverviewScreen} />
//       <Stack.Screen name="OrganizationEmail" component={OrganizationEmailScreen} />
//       <Stack.Screen name="UsersMembers" component={UsersMembersScreen} />
//       <Stack.Screen name="UsersVendors" component={UsersVendorsScreen} />
//       <Stack.Screen name="MyProjects" component={MyProjectsScreen} />
      
//       {/* Settings Screens */}
//       <Stack.Screen name="SettingsPermission" component={SettingsPermissionScreen} />
//       <Stack.Screen name="SettingsEvents" component={SettingsEventsScreen} />
//       <Stack.Screen name="SettingsReminder" component={SettingsReminderScreen} />
//       <Stack.Screen name="SettingsSchedule" component={SettingsScheduleScreen} />
      
//       {/* Project Resources Screens */}
//       <Stack.Screen name="BillOfQuantity" component={BillofQuantity} />
//       <Stack.Screen name="Document" component={DocumentScreen} />
//       <Stack.Screen name="Drawing" component={DrawingScreen} />
      
//       {/* Project Planning Screens */}
//       <Stack.Screen name="Activity" component={ActivityScreen} />
//       <Stack.Screen name="ProjectPlanner" component={ProjectPlannerScreen} />
//       <Stack.Screen name="Resource" component={ResourceScreen} />
      
//       {/* Payments Screens */}
//       <Stack.Screen name="BillPayment" component={BillPaymentScreen} />
//       <Stack.Screen name="Expense" component={ExpenseScreen} />
//       <Stack.Screen name="GoodReceiveNote" component={GoodReceiveNoteScreen} />
//       <Stack.Screen name="Indent" component={IndentScreen} />
//       <Stack.Screen name="PurchaseOrder" component={PurchaseOrderScreen} />
      
//       {/* Approvals Screens */}
//       <Stack.Screen name="Inspection" component={InspectionScreen} />
//       <Stack.Screen name="RFI" component={RFIScreen} />
//       <Stack.Screen name="SnaggingReport" component={SnaggingReportScreen} />
//       <Stack.Screen name="Submittals" component={SubmittalsScreen} />
      
//       {/* Reports Screens */}
//       <Stack.Screen name="ActivityTimelines" component={ActivityTimelinesScreen} />
//       <Stack.Screen name="DailyProgress" component={DailyProgressScreen} />
//       <Stack.Screen name="MaterialConsumption" component={MaterialConsumptionScreen} />
      
//       {/* Work Order Screens */}
//       <Stack.Screen name="AdvancePayment" component={AdvancePaymentScreen} />
//       <Stack.Screen name="BillPaymentWorkOrder" component={BillPaymentScreenn} />
//       <Stack.Screen name="Bill" component={BillScreen} />
//       <Stack.Screen name="WorkOrder" component={WorkOrderScreen} />
//     </Stack.Navigator>
//   );
// }