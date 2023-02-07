import { useState } from "react";
import { Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import styles from "./styles";

interface IPropCalendar {
  canGoNext: (can:boolean) => void;
  currentDate: DateData | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateData|null>>
}

const CalendarScreen = (props: IPropCalendar) => {
  const {canGoNext, currentDate, setSelectedDate} = props;
  
    const dateNow = new Date(); //To get the Current Date
    const dateNowRight = dateNow.getFullYear()+"-"+(dateNow.getMonth()+1<10 ? "0"+(dateNow.getMonth()+1) : dateNow.getMonth()+1)+"-"+(dateNow.getDate()<10 ? "0"+dateNow.getDate() : dateNow.getDate());
    const [dateDataNow, setDateDataNow] = useState<DateData>(currentDate ? currentDate :{
      year: dateNow.getFullYear(),
      day: dateNow.getDate(),
      month: dateNow.getMonth()+1,
      timestamp: dateNow.getTime(),
      dateString: dateNowRight
    });
    console.log(dateNowRight, dateNow.getTime())
  return (
    <View>
      <Text style={styles.header}>Изаберите дан за посету</Text>
      <Calendar
        // Initially visible month. Default = now
        // initialDate={dateNow}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={dateNowRight}
        // markedDates={{
        //   dateNowRight : {marked: true, dotColor: 'red', activeOpacity: 0},
        // }}
        markedDates={{
          [dateNowRight] : {marked: true, dotColor: 'red', activeOpacity: 0, selectedColor:"green"},
          [dateDataNow.dateString] : {selected: true ,marked: true, dotColor: 'green', activeOpacity: 0, selectedColor:"#9353dc"},
        }}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={"2032-05-30"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          // console.log("selected day", day);
          setDateDataNow(day);
          setSelectedDate(day);
          canGoNext(false);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MMMM yyyy"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
      <Text ><Text style={styles.today}>{'\u2B24'}</Text>  <Text style={{color:"black", backgroundColor: "#fff", borderRadius:50}}> Данашњи дан </Text> </Text>
      <Text><Text style={styles.selectdDay}>{'\u2B24'}</Text>  <Text style={{color:"black", backgroundColor: "#fff", borderRadius:50}}> Изабрани дан </Text></Text>
    </View>
  );
};

export default CalendarScreen;
