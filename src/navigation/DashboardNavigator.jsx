import React from 'react';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import DashboardScreen from '../screens/dashboard/DashboardScreen';
  import BillOfQuantityScreen from '../screens/dashboard/sub-header/project-resources/BillOfQuantityScreen';
  import DrawingScreen from '../screens/dashboard/sub-header/project-resources/DrawingScreen';
  import DocumentScreen from '../screens/dashboard/sub-header/project-resources/DocumentScreen';
  import ActivityScreen from '../screens/dashboard/sub-header/project-planning/ActivityScreen';
  import ProjectPlannerScreen from '../screens/dashboard/sub-header/project-planning/ProjectPlannerScreen';
  import ResourceScreen from '../screens/dashboard/sub-header/project-planning/ResourceScreen';
  import IndentScreen from '../screens/dashboard/sub-header/payments/IndentScreen';
  import PurchaseOrderScreen from '../screens/dashboard/sub-header/payments/PurchaseOrderScreen';
  import GoodReceiveNoteScreen from '../screens/dashboard/sub-header/payments/GoodReceiveNoteScreen';
  import BillPaymentScreen from '../screens/dashboard/sub-header/payments/BillPaymentScreen';
  import ExpenseScreen from '../screens/dashboard/sub-header/payments/ExpenseScreen';
  import WorkOrderScreen from '../screens/dashboard/sub-header/work-order/WorkOrderScreen';
  import AdvancePaymentScreen from '../screens/dashboard/sub-header/work-order/AdvancePaymentScreen';
  import BillScreen from '../screens/dashboard/sub-header/project-resources/BillOfQuantityScreen';
  import WorkOrderBillPaymentScreen from '../screens/dashboard/sub-header/work-order/BillPaymentScreenn';
  import RFIScreen from '../screens/dashboard/sub-header/approvals/RFIScreen';
  import SnaggingReportScreen from '../screens/dashboard/sub-header/approvals/SnaggingReportScreen';
  import InspectionScreen from '../screens/dashboard/sub-header/approvals/InspectionScreen';
  import SubmittalsScreen from '../screens/dashboard/sub-header/approvals/SubmittalsScreen';
  import DailyProgressScreen from '../screens/dashboard/sub-header/reports/DailyProgressScreen';
  import ActivityTimelinesScreen from '../screens/dashboard/sub-header/reports/ActivityTimelinesScreen';
  import MaterialConsumptionScreen from '../screens/dashboard/sub-header/reports/MaterialConsumptionScreen';

  const Stack = createNativeStackNavigator();

  export default function DashboardNavigator() {
    return (
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        {/* <Stack.Screen name="BillOfQuantity" component={BillOfQuantityScreen} /> */}
        <Stack.Screen name="Drawing" component={DrawingScreen} />
        <Stack.Screen name="Document" component={DocumentScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="ProjectPlanner" component={ProjectPlannerScreen} />
        <Stack.Screen name="Resource" component={ResourceScreen} />
        <Stack.Screen name="Indent" component={IndentScreen} />
        <Stack.Screen name="PurchaseOrder" component={PurchaseOrderScreen} />
        <Stack.Screen name="GoodReceiveNote" component={GoodReceiveNoteScreen} />
        <Stack.Screen name="BillPayment" component={BillPaymentScreen} />
        <Stack.Screen name="Expense" component={ExpenseScreen} />
        <Stack.Screen name="WorkOrder" component={WorkOrderScreen} />
        <Stack.Screen name="AdvancePayment" component={AdvancePaymentScreen} />
        <Stack.Screen name="BillOfQuantity" component={BillScreen} />
        <Stack.Screen name="WorkOrderBillPayment" component={WorkOrderBillPaymentScreen} />
        <Stack.Screen name="RFI" component={RFIScreen} />
        <Stack.Screen name="SnaggingReport" component={SnaggingReportScreen} />
        <Stack.Screen name="Inspection" component={InspectionScreen} />
        <Stack.Screen name="Submittals" component={SubmittalsScreen} />
        <Stack.Screen name="DailyProgress" component={DailyProgressScreen} />
        <Stack.Screen name="ActivityTimelines" component={ActivityTimelinesScreen} />
        <Stack.Screen name="MaterialConsumption" component={MaterialConsumptionScreen} />
      </Stack.Navigator>
    );
  }