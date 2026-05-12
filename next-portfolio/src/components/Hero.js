// components/Hero.js
export default function Hero() {
  return (
    <div className="bg-blue-500 text-white py-24">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold">Welcome to Next.js with Tailwind CSS</h1>
        <p className="mt-4 text-lg">Build beautiful, responsive websites faster than ever.</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100">
          Get Started
        </button>
      </div>
    </div>
  );
}