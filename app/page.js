"use client";

import {Suspense, useEffect,useState} from "react";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import resources from "@/data/resources";
import ResourceCard from "@/components/ResourceCard";
import Header from "@/components/Header";
import ResourceFilters from "@/components/ResourceFilters";
import ResourceModal from "@/components/ResourceModal";

function DevLinkContent(){
  
  
  const[bookmarks, setBookmarks]=useState([]);
  const [bookmarksLoaded, setBookmarksLoaded] = useState(false);

  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const [selectedResource, setSelectedResource]= useState(null);

  const searchParams=useSearchParams();
  const router=useRouter();

  const pathname= usePathname();
  const search=searchParams.get("search")||"";
  const selectedCategory=searchParams.get("category")|| "All";


  useEffect(()=> {
    const savedBookmarks = localStorage.getItem("devlink-bookmarks");
    if(savedBookmarks){
      setBookmarks(JSON.parse(savedBookmarks));
    }
  setBookmarksLoaded(true);
  },[]);

  useEffect(()=>{
    if(!bookmarksLoaded) return;
    localStorage.setItem(
      "devlink-bookmarks",
      JSON.stringify(bookmarks)
    );
  },[bookmarks,bookmarksLoaded]);

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

  const relatedResources = selectedResource 
  ? resources.filter(
    (resource)=> resource.category === selectedResource.category && 
    resource.id !== selectedResource.id
  ):[];

  return(
    <main className="min-h-screen bg-gray-50">
      <Header />
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
       {/*resource filters*/}

     <ResourceFilters search={search} selectedCategory={selectedCategory}  categories={categories} showSavedOnly={showSavedOnly} setShowSavedOnly={setShowSavedOnly} updateUrl={updateUrl} clearFilters={clearFilters}
     />

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
    <ResourceModal  resource={selectedResource}  relatedResources={relatedResources}
        onClose={() => setSelectedResource(null)}
        onSelectedResource={setSelectedResource}
      />

      </section>
    </main>
  );
}

export default function Home(){
  return(
    <Suspense fallback={<div>Loading DevLink...</div>}>
      <DevLinkContent />
    </Suspense>

  );
}