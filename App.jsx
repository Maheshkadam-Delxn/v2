

// import React from 'react';
// import { StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MyTabs from './src/navigation/TabNavigator';
// import SignInScreen from './src/auth/SignInScreen';
// import SignUpScreen from './src/auth/SignUpScreen';
// import OTPScreen from './src/auth/OTPScreen';
// import DashboardScreen from './src/screens/dashboard/DashboardScreen';
// import AddNewProjectScreen from './src/screens/AddNewProjectScreen';
// import ProfileScreen from './src/screens/dashboard/sidebar/ProfileScreen';
// import ProjectOverviewScreen from './src/screens/dashboard/ProjectOverviewScreen';
// import OrganizationEmailScreen from './src/screens/dashboard/sidebar/OrganizationEmailScreen';
// import UsersMembersScreen from './src/screens/dashboard/user/UsersMembersScreen';
// import UsersVendorsScreen from './src/screens/dashboard/user/UsersVendorsScreen';
// import SettingsPermissionScreen from './src/screens/dashboard/settings/SettingsPermissionScreen';
// import SettingsEventsScreen from './src/screens/dashboard/settings/SettingsEventsScreen';
// import SettingsReminderScreen from './src/screens/dashboard/settings/SettingsReminderScreen';
// import SettingsScheduleScreen from './src/screens/dashboard/settings/SettingsScheduleScreen';
// import MyProjectsScreen from './src/screens/dashboard/sidebar/MyProjectsScreen';

// import BillofQuantity from './src/screens/dashboard/sub-header/project-resources/BillOfQuantityScreen'
// import DocumentScreen from './src/screens/dashboard/sub-header/project-resources/DocumentScreen'
// import DrawingScreen from './src/screens/dashboard/sub-header/project-resources/DrawingScreen'


// import ActivityScreen from './src/screens/dashboard/sub-header/project-planning/ActivityScreen'
// import ProjectPlannerScreen from './src/screens/dashboard/sub-header/project-planning/ProjectPlannerScreen'
// import ResourceScreen from './src/screens/dashboard/sub-header/project-planning/ResourceScreen'

// import BillPaymentScreen from './src/screens/dashboard/sub-header/payments/BillPaymentScreen'
// import ExpenseScreen from './src/screens/dashboard/sub-header/payments/ExpenseScreen'
// import GoodReceiveNoteScreen from './src/screens/dashboard/sub-header/payments/GoodReceiveNoteScreen'
// import IndentScreen from './src/screens/dashboard/sub-header/payments/IndentScreen'
// import PurchaseOrderScreen from './src/screens/dashboard/sub-header/payments/PurchaseOrderScreen'


// import InspectionScreen from './src/screens/dashboard/sub-header/approvals/InspectionScreen'
// import RFIScreen from './src/screens/dashboard/sub-header/approvals/RFIScreen'
// import SnaggingReportScreen from './src/screens/dashboard/sub-header/approvals/SnaggingReportScreen'
// import SubmittalsScreen from './src/screens/dashboard/sub-header/approvals/SubmittalsScreen'

// import ActivityTimelinesScreen from './src/screens/dashboard/sub-header/reports/ActivityTimelinesScreen'
// import DailyProgressScreen from './src/screens/dashboard/sub-header/reports/DailyProgressScreen'
// import MaterialConsumptionScreen from './src/screens/dashboard/sub-header/reports/MaterialConsumptionScreen'

// import AdvancePaymentScreen from './src/screens/dashboard/sub-header/work-order/AdvancePaymentScreen'
// import BillPaymentScreenn from './src/screens/dashboard/sub-header/work-order/BillPaymentScreenn'
// import BillScreen from './src/screens/dashboard/sub-header/work-order/BillScreen'
// import WorkOrderScreen from './src/screens/dashboard/sub-header/work-order/WorkOrderScreen'




// import './global.css';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <Stack.Navigator 
//         initialRouteName="SignIn"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="SignIn" component={SignInScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="OTP" component={OTPScreen} />
//         <Stack.Screen 
//           name="Main" 
//           component={MyTabs}
//           options={{
//             gestureEnabled: false, // Prevent swipe back to auth
//           }}
//         />
//         <Stack.Screen name="Dashboard" component={DashboardScreen} />
//         <Stack.Screen name="AddNewProject" component={AddNewProjectScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//         <Stack.Screen name="ProjectOverview" component={ProjectOverviewScreen} />
//         <Stack.Screen name="OrganizationEmail" component={OrganizationEmailScreen} />
//         <Stack.Screen name="UsersMembers" component={UsersMembersScreen} />
//         <Stack.Screen name="UsersVendors" component={UsersVendorsScreen} />
//         <Stack.Screen name="SettingsPermission" component={SettingsPermissionScreen} />
//         <Stack.Screen name="SettingsEvents" component={SettingsEventsScreen} />
//         <Stack.Screen name="SettingsReminder" component={SettingsReminderScreen} />
//         <Stack.Screen name="SettingsSchedule" component={SettingsScheduleScreen} />
//         <Stack.Screen name="MyProjects" component={MyProjectsScreen} />


//       <Stack.Screen name="BillOfQuantity" component={BillofQuantity} />
      

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './src/navigation/TabNavigator';
import SignInScreen from './src/auth/SignInScreen';
import SignUpScreen from './src/auth/SignUpScreen';
import OTPScreen from './src/auth/OTPScreen';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import AddNewProjectScreen from './src/screens/AddNewProjectScreen';
import ProfileScreen from './src/screens/dashboard/sidebar/ProfileScreen';
import ProjectOverviewScreen from './src/screens/dashboard/ProjectOverviewScreen';
import OrganizationEmailScreen from './src/screens/dashboard/sidebar/OrganizationEmailScreen';
import UsersMembersScreen from './src/screens/dashboard/user/UsersMembersScreen';
import UsersVendorsScreen from './src/screens/dashboard/user/UsersVendorsScreen';
import SettingsPermissionScreen from './src/screens/dashboard/settings/SettingsPermissionScreen';
import SettingsEventsScreen from './src/screens/dashboard/settings/SettingsEventsScreen';
import SettingsReminderScreen from './src/screens/dashboard/settings/SettingsReminderScreen';
import SettingsScheduleScreen from './src/screens/dashboard/settings/SettingsScheduleScreen';
import MyProjectsScreen from './src/screens/dashboard/sidebar/MyProjectsScreen';

// Project Resources
import BillOfQuantityScreen from './src/screens/dashboard/sub-header/project-resources/BillOfQuantityScreen';
import DocumentScreen from './src/screens/dashboard/sub-header/project-resources/DocumentScreen';
import DrawingScreen from './src/screens/dashboard/sub-header/project-resources/DrawingScreen';

// Project Planning
import ActivityScreen from './src/screens/dashboard/sub-header/project-planning/ActivityScreen';
import ProjectPlannerScreen from './src/screens/dashboard/sub-header/project-planning/ProjectPlannerScreen';
import ResourceScreen from './src/screens/dashboard/sub-header/project-planning/ResourceScreen';

// Payments
import BillPaymentScreen from './src/screens/dashboard/sub-header/payments/BillPaymentScreen';
import ExpenseScreen from './src/screens/dashboard/sub-header/payments/ExpenseScreen';
import GoodReceiveNoteScreen from './src/screens/dashboard/sub-header/payments/GoodReceiveNoteScreen';
import IndentScreen from './src/screens/dashboard/sub-header/payments/IndentScreen';
import PurchaseOrderScreen from './src/screens/dashboard/sub-header/payments/PurchaseOrderScreen';

// Approvals
import InspectionScreen from './src/screens/dashboard/sub-header/approvals/InspectionScreen';
import RFIScreen from './src/screens/dashboard/sub-header/approvals/RFIScreen';
import SnaggingReportScreen from './src/screens/dashboard/sub-header/approvals/SnaggingReportScreen';
import SubmittalsScreen from './src/screens/dashboard/sub-header/approvals/SubmittalsScreen';

// Reports
import ActivityTimelinesScreen from './src/screens/dashboard/sub-header/reports/ActivityTimelinesScreen';
import DailyProgressScreen from './src/screens/dashboard/sub-header/reports/DailyProgressScreen';
import MaterialConsumptionScreen from './src/screens/dashboard/sub-header/reports/MaterialConsumptionScreen';

// Work Order
import AdvancePaymentScreen from './src/screens/dashboard/sub-header/work-order/AdvancePaymentScreen';
import WorkOrderBillPaymentScreen from './src/screens/dashboard/sub-header/work-order/BillPaymentScreenn'; // Note: Renamed to avoid confusion
import BillScreen from './src/screens/dashboard/sub-header/work-order/BillScreen';
import WorkOrderScreen from './src/screens/dashboard/sub-header/work-order/WorkOrderScreen';

import './global.css';
import InventoryScreen from './src/screens/dashboard/sub-header/Inventory/InventoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen
          name="Main"
          component={MyTabs}
          options={{
            gestureEnabled: false, // Prevent swipe back to auth
          }}
        />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddNewProject" component={AddNewProjectScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProjectOverview" component={ProjectOverviewScreen} />
        <Stack.Screen name="OrganizationEmail" component={OrganizationEmailScreen} />
        <Stack.Screen name="UsersMembers" component={UsersMembersScreen} />
        <Stack.Screen name="UsersVendors" component={UsersVendorsScreen} />
        <Stack.Screen name="SettingsPermission" component={SettingsPermissionScreen} />
        <Stack.Screen name="SettingsEvents" component={SettingsEventsScreen} />
        <Stack.Screen name="SettingsReminder" component={SettingsReminderScreen} />
        <Stack.Screen name="SettingsSchedule" component={SettingsScheduleScreen} />
        <Stack.Screen name="MyProjects" component={MyProjectsScreen} />

        {/* Project Resources */}
        <Stack.Screen name="BillOfQuantity" component={BillOfQuantityScreen} />
        <Stack.Screen name="Document" component={DocumentScreen} />
        <Stack.Screen name="Drawing" component={DrawingScreen} />

        {/* Project Planning */}
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="ProjectPlanner" component={ProjectPlannerScreen} />
        <Stack.Screen name="Resource" component={ResourceScreen} />

        {/* Payments */}
        <Stack.Screen name="BillPayment" component={BillPaymentScreen} />
        <Stack.Screen name="Expense" component={ExpenseScreen} />
        <Stack.Screen name="GoodReceiveNote" component={GoodReceiveNoteScreen} />
        <Stack.Screen name="Indent" component={IndentScreen} />
        <Stack.Screen name="PurchaseOrder" component={PurchaseOrderScreen} />

        
        {/* Inventory //currently dashboard screen does not have a dropdown to inventory so it must directly redorect to this page when clicked on inventry */}
        <Stack.Screen name="Inventory" component={InventoryScreen} />

        {/* Approvals */}
        <Stack.Screen name="Inspection" component={InspectionScreen} />
        <Stack.Screen name="RFI" component={RFIScreen} />
        <Stack.Screen name="SnaggingReport" component={SnaggingReportScreen} />
        <Stack.Screen name="Submittals" component={SubmittalsScreen} />

        {/* Reports */}
        <Stack.Screen name="ActivityTimelines" component={ActivityTimelinesScreen} />
        <Stack.Screen name="DailyProgress" component={DailyProgressScreen} />
        <Stack.Screen name="MaterialConsumption" component={MaterialConsumptionScreen} />

        {/* Work Order */}
        <Stack.Screen name="AdvancePayment" component={AdvancePaymentScreen} />
        <Stack.Screen name="WorkOrderBillPayment" component={WorkOrderBillPaymentScreen} />
        <Stack.Screen name="Bill" component={BillScreen} />
        <Stack.Screen name="WorkOrder" component={WorkOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}