import { Button, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotImplementedScreen from "../NotImplementedScreen/NotImplementedScreen";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StepperContainer, StepView } from "@material.ui/react-native-stepper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import MobileStepper from "@mui/material/MobileStepper";
import { Step, StepLabel } from "@mui/material";
import { useState } from "react";
import CustomStepper from "../../components/CustomStepper/CustomStepper";

const Tab = createMaterialTopTabNavigator();

const TicketsScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const maxSteps = 4;
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    // <Tab.Navigator>
    //   <Tab.Screen
    //     name="Појединачне / Групне"
    //     component={NotImplementedScreen}
    //     options={{
    //       tabBarIcon: ({ color }) => (
    //         <View style={{ flexDirection: "row" }}>
    //           <MaterialIcons name="family-restroom" size={24} color={color} />
    //           <MaterialCommunityIcons
    //             name="slash-forward"
    //             size={24}
    //             color="black"
    //           />
    //           <Entypo name="user" size={24} color={color} />
    //         </View>
    //         // <MaterialIcons name="groups" size={24} color="black" />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Специјалне понуде"
    //     component={NotImplementedScreen}
    //     options={{
    //       tabBarIcon: ({ color }) => (
    //         // <Entypo name="user" size={24} color={color} />
    //         <MaterialCommunityIcons
    //           name="human-greeting-proximity"
    //           size={24}
    //           color="black"
    //         />
    //         // <MaterialIcons name="groups" size={24} color="black" />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>

    <CustomStepper activeStep={1} arrows={true} steps={5} />

    // <StepperContainer layout="vertical">
    //   <StepView title="Датум" subTitle="Када желите да посетите Пандицу?">
    //     {/* <Text>Step 1 Contents</Text> */}
    //     <Calendar
    //       // Initially visible month. Default = now
    //       initialDate={"2022-03-01"}
    //       // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    //       minDate={"2012-05-10"}
    //       // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    //       maxDate={"2032-05-30"}
    //       // Handler which gets executed on day press. Default = undefined
    //       onDayPress={(day) => {
    //         console.log("selected day", day);
    //       }}
    //       // Handler which gets executed on day long press. Default = undefined
    //       onDayLongPress={(day) => {
    //         console.log("selected day", day);
    //       }}
    //       // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
    //       monthFormat={"MMMM yyyy"}
    //       // Handler which gets executed when visible month changes in calendar. Default = undefined
    //       onMonthChange={(month) => {
    //         console.log("month changed", month);
    //       }}
    //       // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
    //       firstDay={1}
    //       // Handler which gets executed when press arrow icon left. It receive a callback can go back month
    //       onPressArrowLeft={(subtractMonth) => subtractMonth()}
    //       // Handler which gets executed when press arrow icon right. It receive a callback can go next month
    //       onPressArrowRight={(addMonth) => addMonth()}
    //       // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
    //       disableAllTouchEventsForDisabledDays={true}
    //       // Enable the option to swipe between months. Default = false
    //       enableSwipeMonths={true}
    //     />
    //     {/* KALENDAR */}
    //   </StepView>
    //   <StepView
    //     title="Second"
    //     // onNext={() => true}
    //     subTitle="Name and other details"
    //   >
    //     <Text>Step 2 Contents</Text>
    //     {/* BROJ KARATA DECICA/ODRASLI */}
    //   </StepView>
    //   <StepView title="Third Step" subTitle="Some lines">
    //     <Text>Step 3 Contents …!</Text>
    //     {/* PROMO KOD */}
    //   </StepView>
    //   <StepView title="Last Step" subTitle="Finishing lines">
    //     <Text>Step 4 Contents …!</Text>
    //     {/* KRAJ */}
    //   </StepView>
    // </StepperContainer>
  );
};

export default TicketsScreen;
