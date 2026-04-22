export default function NavBar({ page }: { page: string }) {
  // Get a specific cookie by name

  return (
    <header className="mb-8 w-full">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-lg ">FlowGen</span>
        <a
          href="#pricing"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          Pricing
        </a>

        {page == "home" ? (
          <a
            href="/login"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Login
          </a>
        ) : (
          <a
            href="/api/auth/logout"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Logout
          </a>
        )}
      </nav>
    </header>
  );
}
