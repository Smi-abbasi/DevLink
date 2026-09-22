export default function Header(){

return(
      <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-gray-900 text-lg font-bold text-white">
                D
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  DevLink
                </h1>
                <p className="text-sm text-gray-500">
                  Developer Resource Hub
                </p>
              </div>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900">
                Discover. Save. Build.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Useful resources for developers
              </p>
            </div>
          </div>
        </header>
)
}