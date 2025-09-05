 

'use client';
import Image from 'next/image';
import { School } from '@/types/school';

export default function SchoolCard({ s }: { s: School }) {
  return (
    <div className="flex items-start gap-4 bg-white shadow rounded-xl p-4 max-w-md">
      <div className="w-28 h-28 relative flex-shrink-0">
        <Image
          src={s.image}
          alt={s.name}
          width={112}   // fixed width (28 * 4 = 112px)
          height={112}  // fixed height
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{s.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{s.address}</p>
        <p className="text-sm font-medium text-gray-800">{s.city}</p>
      </div>
    </div>
  );
}
