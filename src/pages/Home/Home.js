import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.scss";
import Wlist from "../../components/WarehouseList/WList";




function Home() {

    return (
        <div className='home__background'>
            
            <main>
                <section>
                        <Wlist />
                </section>
            </main>
        
        </div>
    );
}

export default Home;