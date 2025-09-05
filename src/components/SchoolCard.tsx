 

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
          width={112}   
          height={112} 
          
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
