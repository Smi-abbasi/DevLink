import resources from "@/data/resources";
import ResourceCard from "@/components/ResourceCard";
export default function Home(){
  return(
    <main className="min-h-screen bg-gray-50">
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
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mx-auto max-w-7xl px-6 py-10">
          Developers Resources
        </h2>
        <p className="mt-2 text-gray-600">
          Explore tools, libraries,APIs, and framworks.
        </p>
      </section>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource)=>(
          <ResourceCard key={resource.id} resource={resource}/>
        ))
        }
      </div>

    </main>
  );
}