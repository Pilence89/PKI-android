export interface AnimalItem {
  title: string;
  description: string;
  image: object;
  colorScheme?: number; // 1-dark , 2-light
  //-> "rgb(211,83,83)"-#D35353 / "rgb(211,83,18)"-#D35312 -> za button boje pa izaberi
  position?: string;
}

export const animals: AnimalItem[] = [
  {
    title: "Јагуар",
    description: "Звер из породице мачака",
    image: require("../../assets/zivotinje/jaguar2.jpg"),
    colorScheme: 2,
    position: "bottom",
  },
  {
    title: "Жирафа",
    description: "Највиша копнена животиња",
    image: require("../../assets/zivotinje/Giraffe.jpg"),
    colorScheme: 1,
    position: "top",
  },
  {
    title: "Ној",
    description: "Ко је та луда глава",
    image: require("../../assets/zivotinje/Noj.jpg"),
    colorScheme: 2,
    position: "top",
  },
];
