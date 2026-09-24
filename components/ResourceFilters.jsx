import {useEffect,useState} from "react";


export default function ResourceFilters({
search,selectedCategory,categories,showSavedOnly, setShowSavedOnly, updateUrl, clearFilters,
}){
    const [searchInput, setSearchInput]= useState(search);

useEffect(() => {
  const timer = setTimeout(() => {
    updateUrl(searchInput, selectedCategory);
  }, 400);

  return () => clearTimeout(timer);
}, [searchInput, selectedCategory,updateUrl]);

    return(
        <>
        {/*search*/}
        <div className="mt-8">
            <input type="text" placeholder="Search resource..." value={searchInput}
            onChange={(event)=>setSearchInput(event.target.value)}
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
                    <button key= {category} type="button" onClick={()=>{updateUrl(search, category);
                    }}
                    className={`border px-4 py-2 text-sm font-medium ${selectedCategory=== category ?
                        "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-gray-900" 
                    }`}  >
                        {category}
                    </button>
                ))}
            </div>
        </div>
         
         {/*Actions*/}
         <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={()=> setShowSavedOnly((current)=> !current)}
            className={`border px-4 py-2 text-sm font-medium ${
                showSavedOnly ? "border-gray-900 bg-gray-900 text-white": "border-gray-300 bg-white text-gray-700 hover:border-gray-900"} `
            }>
                {showSavedOnly ? "Show All": "Show Saved Only"}
                </button>

            <button type="button" onClick={clearFilters} className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-900"
            >
            Clear Filters
            </button>
         </div>
        </>
);
}