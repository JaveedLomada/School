
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
    <div >
      <div>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800" style={{marginLeft:"80px"}}>Schools List</h1>

        {schools.length === 0 ? (
          <p>
            No schools yet. Please add one from the{" "}
            <a href="/addSchool">Add School</a> page.
          </p>
        ) : (
          <div>
            <table align='center' cellPadding="8px">
              <thead  style={{backgroundColor:"violet"}}>
                <tr>
                  <th>Image</th>
                  <th>College Name</th>
                  <th>Email ID</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((s) => (
                  <tr key={s.id} style={{backgroundColor:"rgba(235, 235, 235, 0.51)"}}>
                    <td>
                    <Image src={s.image} alt={s.name} width={64} height={64} />
                    </td>
                    <td>{s.name}</td>
                    <td>{s.email_id}</td>
                    <td>{s.contact}</td>
                    <td>{s.address}</td>
                    <td>{s.city}</td>
                    <td>{s.state}</td>
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
