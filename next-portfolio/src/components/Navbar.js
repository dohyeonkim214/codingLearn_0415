// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-gray-800">MyApp</Link>
        <div className="space-x-4">
          <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#services" className="text-gray-600 hover:text-gray-900">Services</a>
          <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
        </div>
      </div>
    </nav>
  );
}