
import Context from './Context';
import {theme} from '../utils'
import {useState} from 'react';
import { AnimalItem } from '../data/zivotinje/animalsData';
import { EventItem } from '../data/eventsData/eventsData';
import { ProfileItem, ProfileLikes } from '../data/profile/profileItem';
import { DealItem } from '../data/deals/dealsData';
import { KartaItem } from '../data/karte/karteItem';
import { User } from 'firebase/auth';


export default function ContextWrapper(props: React.PropsWithChildren) {
    const [animals, setAnimals] = useState<AnimalItem[] | []>([]);
    const [events, setEvents] = useState<EventItem[] | []>([]);
    const [deals, setDeals] = useState<DealItem[] | []>([]);
    const [profileInfo, setProfileInfo] = useState<ProfileItem | null>(null);
    const [profileLikes, setProfileLikes] = useState<ProfileLikes| null>(null);
    const [currentAnimal,setCurrentAnimal ] = useState<AnimalItem | null>(null);
    const [karte,setKarte ] = useState<KartaItem[] | []>([]);
    const [brojNotif, setBrojNotif] = useState<number>(0);
    const [currUser, setCurrUser] = useState<User | null>(null);
    return (
        <Context.Provider  value={{ theme, animals, setAnimals, events, setEvents, profileInfo, setProfileInfo, profileLikes, setProfileLikes, currentAnimal, setCurrentAnimal, deals, setDeals, karte, setKarte, brojNotif, setBrojNotif, currUser, setCurrUser }}>
            {props.children}
        </Context.Provider>
    )
}