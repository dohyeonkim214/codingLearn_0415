// components/ContactForm.js
export default function ContactForm() {
  return (
    <form className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your email"
        />
      </div>
      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Submit</button>
    </form>
  );
}