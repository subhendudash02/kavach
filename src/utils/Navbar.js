import Link from "next/link";
import { useRouter } from 'next/navigation';
import CCM from "@/pages/dashboard";
import style from "../styles/Navbar.module.css";
import Image from 'next/image'
import img from "../assets/pols.png"

export default function Navbar() {
    return (
        <nav className={style.navbar}>
            <div className={style.innernav}>
                <img src={img.src} className={style.img} />
                <p className={style.heading}>Bandobast</p>
            </div>
            <div className={style.innernav2}>
                <Link className={style.link} href="/dashboard">CCM Location</Link>
                <Link className={style.link} href="/dashboard/bandobast">Police Bandobast</Link>
                <Link className={style.link} href="/dashboard/signup">Add to database</Link>
            </div>
        </nav>
    );
}