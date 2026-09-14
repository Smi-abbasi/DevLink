"use client";
import {useState} from "react";
import resources from "@/data/resources";
import ResourceCard from "@/components/ResourceCard";

export default function Home(){
  const[search,setSerach]=useState("");
  const[selectedCategory,setSelectedCategory]=useState("All");
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
    return matchesSearch && matchesCategory
  });
  return(
    <main className="min-h-screen bg-gray-50">
{/*header*/}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">
            DevLink By SMI
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Discover useful resources for developers.
          </p>
          </div> 
      </header>
{/*main*/}
      <section className="mx-auto max-w-7xl px-6 py-10">
       <div>
          <h2 className="mx-auto max-w-7xl px-6 py-10">
            Developers Resources
          </h2>
          <p className="mt-2 text-gray-600">
            Explore tools, libraries,APIs, and framworks.
          </p>
        </div> 
{/*search*/}
     <div className="mt-8">
      <input
      type="text"
      placeholder="Search resource..."
      value={search}
      onChange={(event)=>setSerach(event.target.value)}
      className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-900 sm:max-w-xl"
      />
     </div>
{/*categories*/}     
      <div className="mt-6 flex-wrap gap-3">
        {categories.map((category)=>(
          <button
          key={category}
          onClick={()=> setSelectedCategory(category)}
          className={`border px-4 py-2 text-sm font-medium ${
            selectedCategory === category
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-300 bg-white text-gray-700 hover:border-gray-900"

          }`}
          >
            {category}
          </button>
        ))}
      </div>
{/* Resource Count */}
      <p className="mt-8 text-sm text-gray-500">
        showing {filteredResources.length} resources
      </p>
 {/* Resource Grid */}
       <div className="mt-4 grid gap-5 sm:grid-ols-2 lg:grid-cols-3">
        {filteredResources.map((resource)=>(
          <ResourceCard
          key={resource.id}
          resource={resource}
          />
        ))}
      </div>
      {/*empty handeling*/}
      {filteredResources.length === 0 &&(
        <p className="mt-10 text-center text-gray-500">

          No resource found. Try another search or category.
        </p>
      )}
      </section>
    </main>
  );
}