export default function ResourceFilters({
search, setSearch,selectedCategory, setSelcetedCategory,categories,showSavedOnly, setSHowSavedOnly, updateUrl, clearFilters,
}){
    return(
        <>
        {/*search*/}
        <div className="mt-8">
            <input type="text" placeholder="Search resource..." value={search}
            onChange={(event)=>{const value=event.target.value;
                setSearch(value); updateUrl(value,selectedCategory);
            }}
            className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-900 sm:max-w-xl"
          />
        </div>

        {/*categories*/}
        <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-gray-700">
                Categories
            </p>

            <div className="flex flex-wrap gap-3">
                {categories.map((category)=>(
                    <button key= {category} type="button" onClick={()=>{selectedCategory(category); updateUrl(search, category);
                    }}
                    className={`border px-4 py-2 text-sm font-medium ${selectedCategory=== category ?
                        "border-gray-900 bg-gray text-white" : "border-gray-300 bg-white text-gray-700 hover:border-gray-900" 
                    }`}  >
                        {category}
                    </button>
                ))}
            </div>
        </div>
        </>
)}