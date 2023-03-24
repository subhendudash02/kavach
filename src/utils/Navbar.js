import Link from "next/link";
import { useRouter } from 'next/navigation';
import CCM from "@/pages/dashboard";

export default function Navbar() {
    return (
        <nav>
            <Link href="/dashboard">CCM Location</Link>
            <Link href="/dashboard/bandobast">Police Bandobast</Link>
            <Link href="/dashboard/records">Records</Link>
            <Link href="">Add to database</Link>
        </nav>
    );
}