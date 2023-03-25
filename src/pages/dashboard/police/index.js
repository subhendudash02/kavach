import { useRouter } from 'next/router';
import PoliceTable from './PoliceTable';

export default function Police() {
    const router = useRouter();
    const {name} = router.query;
    return (
        <div>
            <h1>{name}</h1>
            <PoliceTable data />
        </div>
    );
}