"use client";

import {useEffect,useState} from "react";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import resources from "@/data/resources";
import ResourceCard from "@/components/ResourceCard";

export default function Home(){
  const[search,setSearch]=useState("");
  const[selectedCategory,setSelectedCategory]=useState("All");
  
  const[bookmarks,setBookmarks]=useState([]);
  const [showSavedOnly,setShowSavedOnly] = useState(false);

  const [selectedResource, setSelectedResource]= useState(null);

  const searchParams=useSearchParams();
  const router=useRouter();
  const pathname= usePathname();

  useEffect(()=>{
    const urlSearch=searchParams.get("search")||"";
    const urlCategory = searchParams.get("category")||"All";

    setSearch(urlSearch);
    setSelectedCategory(urlCategory);
  
  },[searchParams]);

  useEffect(()=> {
    const savedBookmarks = localStorage.getItem("devlink-bookmarks");
    if(savedBookmarks){
      setBookmarks(JSON.parse(savedBookmarks));
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem(
      "devlink-bookmarks",
      JSON.stringify(bookmarks)
    );
  },[bookmarks]);

  useEffect(()=>{
    function handleEscape(event){
      if(event.key==="Escape"){
        setSelectedResource(null);
      }
    }
    document.addEventListener("keydown",handleEscape);
    return()=>{document.removeEventListener("keydown",handleEscape)};

  },[]);

  function toggleBookmark(resourceId){
    setBookmarks((currentBookmarks)=>{
      if(currentBookmarks.includes(resourceId)){
        return currentBookmarks.filter((id)=>id!==resourceId);

      }
      return[...currentBookmarks,resourceId];
    });
  }

  function updateUrl(searchValue,categoryValue){
    const params = new URLSearchParams();

    if(searchValue){
      params.set("search",searchValue);
    }
    if(categoryValue && categoryValue !=="All"){
      params.set("category", categoryValue);
    }
    const queryString=params.toString();
    router.replace(
      queryString?`${pathname}?${queryString}`:pathname
    );
  }
  function clearFilters(){
    setSearch("");
    setSelectedCategory("All");
    setShowSavedOnly(false);
    router.replace(pathname);
  }
  
  const categories=[
    "All",
    ...new Set(resources.map((resource)=>resource.category)),
  ];
  const filteredResources=resources.filter((resource)=>{
    const searchText=search.toLowerCase();

    const matchesSearch=
    resource.title.toLowerCase().includes(searchText) ||
    resource.description.toLowerCase().includes(searchText) ||
    resource.tags.some((tag)=>
    tag.toLowerCase().includes(searchText));

    const matchesCategory=
    selectedCategory==="All" ||
    resource.category=== selectedCategory;
    const matchesBookmark =
    !showSavedOnly || bookmarks.includes(resource.id);
    return matchesSearch && matchesCategory && matchesBookmark;
  });

  const relatedResources = selectedResource ? resources.filter((resource)=> resource.category === selectedResource.category && resource.id !== selectedResource.id):[];

  return(
    <main className="min-h-screen bg-gray-50">
      {/*header*/}
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
      {/*main*/}
      <section className="mx-auto max-w-7xl px-6 py-10">
       <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Developer Resources
          </h2>
          <p className="mt-2 text-gray-600">
            Explore tools, libraries,APIs, and frameworks.
          </p>
        </div> 

      {/*search*/}

     <div className="mt-8">
      <input
      type="text"
      placeholder="Search resource..."
      value={search}
      onChange={(event)=>{const value=event.target.value;
        setSearch(value)
      updateUrl(value,selectedCategory);
    }}
      className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-900 sm:max-w-xl"
      />
     </div>
      {/*categories*/}     
      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((category)=>(
          <button
          key={category}
          onClick={()=>{ setSelectedCategory(category);
            updateUrl(search,category);
          }}
          className={`border px-4 py-2 text-sm font-medium ${
            selectedCategory === category
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-300 bg-white text-gray-700 hover:border-gray-900"

          }`}
          >
            {category}
          </button>
        ))}
        <button
            type="button"
            onClick={() => setShowSavedOnly((current) => !current)}
            className={`border px-4 py-2 text-sm font-medium ${
              showSavedOnly
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-900"
            }`}
          >
            {showSavedOnly ? "Show All" : "Show Saved Only"}
          </button>

          <button type="button" onClick={clearFilters} className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 ">
           Clear Filters
          </button>
      </div>

      {/* Resource Count */}

      <p className="mt-8 text-sm text-gray-500">
        showing {filteredResources.length} resources
      </p>
      {/* Resource Grid */}
       <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource)=>(
          <ResourceCard
          key={resource.id}
          resource={resource}
          isBookmarked={bookmarks.includes(resource.id)}
          onToggleBookmark={toggleBookmark}
          onSelectResource={setSelectedResource}
          />
        ))}
      </div>

       {/*empty handeling*/}
      {filteredResources.length === 0 &&(
        <p className="mt-10 text-center text-gray-500">

          No resource found. Try another search or category.
        </p>
      )}
      {selectedResource && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-lg bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">
            {selectedResource.category}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {selectedResource.title}
          </h2>
        </div>
        <button
          type="button" onClick={() => setSelectedResource(null)} aria-label="Close resource details"
          className=" rounded-sm text-2xl text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900">
          ×
        </button>
      </div>
      
      <p className="mt-4 text-gray-600">
        {selectedResource.description}
      </p>
      <p className="mt-5 text-sm text-gray-700">
        <strong>Pricing:</strong> {selectedResource.pricing}
      </p>
      <div className="mt-5">
        <p className="text-sm font-medium text-gray-900">
          Installation
        </p>
        <code className="mt-2 block bg-gray-100 p-3 text-sm text-gray-800">
          {selectedResource.install}
        </code>
      </div>

      <a
        href={selectedResource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm font-medium text-gray-900 underline"
      >
        Official Documentation
      </a>

      
      {relatedResources.length > 0 && (
  <div className="mt-6">
    <h3 className="text-sm font-semibold text-gray-900">
      Related Tools
    </h3>

    <div className="mt-2 space-y-2">
      {relatedResources.map((resource) => (
        <button
          key={resource.id}
          type="button"
          onClick={() => setSelectedResource(resource)}
          className="block text-sm text-gray-700 underline hover:text-black"
        >
          {resource.title}
        </button>
          ))}
        </div>
      </div>
    )}

    </div>
  </div>
)}
      </section>
    </main>
  );
}