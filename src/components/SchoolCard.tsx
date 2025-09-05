 

'use client';
import Image from 'next/image';
import { School } from '@/types/school';

export default function SchoolCard({ s }: { s: School }) {
  return (
    <div>
      <div>
        <Image
          src={s.image}
          alt={s.name}
          width={112}   // fixed width (28 * 4 = 112px)
          height={112}  // fixed height
          className="object-cover rounded-md"
        />
      </div>

      <div>
        <h3>{s.name}</h3>
        <p>{s.address}</p>
        <p>{s.city}</p>
      </div>
    </div>
  );
}
