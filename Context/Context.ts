import { User } from 'firebase/auth';
import React, {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
  } from 'react';  
import { DealItem } from '../data/deals/dealsData';
import { EventItem } from '../data/eventsData/eventsData';
import { KartaItem } from '../data/karte/karteItem';
import { ProfileItem, ProfileLikes } from '../data/profile/profileItem';
import { AnimalItem } from "../data/zivotinje/animalsData";
import {theme} from "../utils"  

export interface IMusicContext {
    theme: any,
    animals: AnimalItem[] | [],
    setAnimals: Dispatch<SetStateAction<AnimalItem[] | []>>,
    events: EventItem[] | [],
    setEvents: Dispatch<SetStateAction<EventItem[] | []>>,
    profileInfo: ProfileItem | null,
    setProfileInfo:  Dispatch<SetStateAction<ProfileItem | null>>,
    profileLikes: ProfileLikes | null,
    setProfileLikes:  Dispatch<SetStateAction<ProfileLikes | null>>,
    currentAnimal: AnimalItem | null,
    setCurrentAnimal:  Dispatch<SetStateAction<AnimalItem | null>>,
    deals: DealItem[] | [],
    setDeals: Dispatch<SetStateAction<DealItem[] | []>>,
    karte: KartaItem[] | [], 
    setKarte: Dispatch<SetStateAction<KartaItem[] | []>>,
    brojNotif: number,
    setBrojNotif:Dispatch<SetStateAction<number>>,
    currUser: User | null, 
    setCurrUser: Dispatch<SetStateAction<User | null>>,
  }

const GlobalContext = React.createContext<IMusicContext>(undefined as any);

export default GlobalContext;