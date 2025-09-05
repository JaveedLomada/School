
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400','500','600','700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'School Management',
  description: 'Next.js School App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className + " bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen"}>
        {/* Header */}
        <header>
          <div>
            <h1>🏫 School Manager</h1>
            <nav className = "nav" style={{display:"flex" , gap:"40px" ,justifyContent:"center" , marginBottom:"10px"} }>
              <a href="/addSchool"  style={{backgroundColor:"rgba(241, 179, 179, 1)",color:"white" , textDecoration:"none" , padding:"5px 10px" , borderRadius:"8px"}}>Add School</a>
              <a href="/showSchools" style={{backgroundColor:"rgba(241, 179, 179, 1)",color:"white" , textDecoration:"none" , padding:"5px 10px" , borderRadius:"8px"}}>Show Schools</a>
            </nav>
          </div>
        </header>

        <main>
          {children}
        </main>

    
      </body>
    </html>
  );
}
