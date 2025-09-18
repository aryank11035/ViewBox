
import Link from "next/link";
import { getShowData } from "./ts/getData";
import {Swiper, SwiperSlide} from 'swiper/react'


import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import SwiperComponent from "./components/SwiperComponent";

export default async function MediaTab({mediaData} : {mediaData :  any}){

    
    return (
        <SwiperComponent mediaData = {mediaData} /> 
    )
}