
import { School } from '@/types/school';
import Image from 'next/image';
async function getSchools(): Promise<School[]> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${base}/api/schools`, {
    cache: "no-store",
    next: { revalidate: 0 }, 
  });

  if (!res.ok) {
    console.error("API error", res.status, res.statusText);
    return [];
  }

  const json = await res.json();
  return json.data || [];
}



export default async function ShowSchoolsPage() {
  const schools = await getSchools();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 " >
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800" style={{marginLeft:"80px"}}>Schools List</h1>

        {schools.length === 0 ? (
          <p className="text-center text-gray-600">
            No schools yet. Please add one from the{" "}
            <a href="/addSchool" className="text-blue-600 underline">Add School</a> page.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse" align='center' cellPadding="8px">
              <thead  style={{backgroundColor:"violet"}}>
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">College Name</th>
                  <th className="px-4 py-2">Email ID</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">City</th>
                  <th className="px-4 py-2">State</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((s) => (
                  <tr key={s.id} style={{backgroundColor:"rgba(235, 235, 235, 0.51)"}}>
                    <td className="px-4 py-3">
                    <Image src={s.image} alt={s.name} width={64} height={64} className="rounded-md shadow" />
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-700">{s.name}</td>
                    <td className="px-4 py-3 text-gray-600">{s.email_id}</td>
                    <td className="px-4 py-3 text-gray-600">{s.contact}</td>
                    <td className="px-4 py-3 text-gray-600">{s.address}</td>
                    <td className="px-4 py-3 text-gray-600">{s.city}</td>
                    <td className="px-4 py-3 text-gray-600">{s.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
