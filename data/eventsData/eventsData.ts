export interface EventItem {
    id: string;
    title: string;
    opis: string;
    image: string;
    likes?: number;
  }
  
  // export const events: EventItem[] = [
  //   {
  //     title: "Организоване туре за основце!",
  //     opis: "У периоду од 30.02.2023. до 31.02.2023. организујемо обилазак за све школе које се пријаве до 29.02.2023.",
  //     image: require("../../assets/eventImages/trip.png"),
  //   },
  //   {
  //     title: "Хранимо животиње",
  //     opis: "23.03.2023. омгогућићемо свим заинтересованим посетиоцима да хране неке од животиња, а биће и још изненађења за најхрабрије!",
  //     image: require("../../assets/eventImages/feeding.jpg"),
  //   },
  //   {
  //     title: "Принове у нашем ЗОО врту!",
  //     opis: "Сутра нам стижу нове пандице јеј :D",
  //     image: require("../../assets/eventImages/panda.jpg"),
  //   },
  //   {
  //     title: "Отварање тераријума за посетиоце",
  //     opis: "За тачно три дана отварамо врата нашег тераријума за све посетиоце панцица ЗОО врта. Будите међу првима који ће видети шта смо вам све припремили!",
  //     image: require("../../assets/eventImages/terrarium.jpg"),
  //   }
  // ];