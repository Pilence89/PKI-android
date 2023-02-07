import { Timestamp } from "firebase/firestore";

export interface DealItem {
    title: string;
    opis: string;
    image: object;
    colorScheme?: number; // 1-dark , 2-light
    //-> "rgb(211,83,83)"-#D35353 / "rgb(211,83,18)"-#D35312 -> za button boje pa izaberi
    position?: string;
    id: string;
    promoKod: string;
    // kraj: {nanoseconds: string, seconds:string};
    kraj: Timestamp;
    racun: number;
    brKarataDeca: number;
    brKarataODrasli: number;
    operacija: string;
  }
  
  // export const deals: DealItem[] = [
  //   {
  //     title: "Бесплатан улаз за студенте!",
  //     description: "У периоду од 02.02.2023. до 10.02.2023. (уз индекс)",
  //     image: require("../../assets/deals/students.jpg"),
  //     colorScheme: 2,
  //     position: "bottom",
  //   },
  //   {
  //     title: "Дан пензионера!",
  //     description: "Нашим најстаријим суграђанима сваког 5. у месецу је омогућен бесплатан улаз!",
  //     image: require("../../assets/deals/penzos.jpg"),
  //     colorScheme: 1,
  //     position: "top",
  //   },
  //   {
  //     title: "Школарцима бесплатан улаз!",
  //     description: "Током распуста свим основцима и средњошколцима бесплатан улаз! (уз књижицу)",
  //     image: require("../../assets/deals/school.jpg"),
  //     colorScheme: 2,
  //     position: "top",
  //   },
  //   {
  //     title: "8. Март",
  //     description: "Ускоро ће 8. март а то је посебна прилика да своју лепшу половину изведете у зоолошки врт за џабе!",
  //     image: require("../../assets/deals/couple.jpg"),
  //     colorScheme: 2,
  //     position: "bottom",
  //   }
  // ];