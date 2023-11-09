import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.scss";
import Wlist from "../../components/WarehouseList/WList";




function Home() {

    return (
        <div className='home__background'>
            <header>

            </header>
            <main>
                <section>
                    <div >
                        <Wlist />
                    </div>
                </section>
            </main>
            <footer>


            </footer>
        </div>
    );
}

export default Home;