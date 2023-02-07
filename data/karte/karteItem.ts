import { Timestamp } from "firebase/firestore";

export interface KartaItem {
  Mkarte: number;
  Skarte: number;
  Vkarte: number;
  datum: string;
  odobreno: boolean;
  promokod: string;
  username: string;
  vidjeno: boolean;
  id:string;
  cena: number;
  promoCena?: number;
  datumTrazenja: Timestamp;
  promoKodOpis: string;
}
