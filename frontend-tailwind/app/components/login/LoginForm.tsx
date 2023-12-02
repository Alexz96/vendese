export default function LoginForm() {
  return (
    <div className="flex-1 w-80 h-min bg-slate-300 items-center p-10 rounded-xl shadow-xl">
      <div className="flex justify-center pb-4">
        <h1 className="text-2xl">Login</h1>
      </div>

      <div className="flex w-full justify-center">
        <div>
          <label
            htmlFor="email"
            className="mb-3 mt-5 block text-md font-medium text-gray-900"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@example.com"
              className="block border border-gray-200 w-72 p-4 rounded-lg outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div>
          <label
            className="mb-3 mt-5 block text-md font-medium text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              className="block border border-gray-200 w-72 p-4 rounded-lg outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <input type="checkbox" name="remember" id="remember" />
        <label htmlFor="remember" className="ml-2">
          Remember me
        </label>
      </div>
      <div className="flex justify-center mt-5">
        <button className="w-72 p-4 bg-teal-700 rounded-lg font-medium text-white transition-colors hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          Login
        </button>
      </div>
    </div>
  );
}
