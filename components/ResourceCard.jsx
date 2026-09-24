export default function ResourceCard({resource,isBookmarked,onToggleBookmark,onSelectResource}){
    return(
        <article className="rounded-lg border border-gray-200 bg-white p-5">
           <div className="flex items-start justify-between gap-4">
            <span className="text-sm font-medium text-blue-600">
                {resource.category}
            </span>
            <button type="button" onClick={()=>onToggleBookmark(resource.id)}
              aria-label={
                isBookmarked?`Remove ${resource.title} from bookmarks`:`Bookmark ${resource.title}`
              }
              className="text-xl text-gray-700 hover:text-black">
                {isBookmarked ? "♥" : "♡"}    
             </button>
             </div> 
              <h2 onClick={()=> onSelectResource(resource)} 
              className="mt-2  cursor-pointer text-xl font-semibold text-gray-900 hover:text-blue-600">
                {resource.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                {resource.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
                {resource.tags.map((tag)=>
                (<span key={tag} className="text-xs text-gray-500 ">
                    #{tag}
                </span>
                ))}

           
            </div>
            <div className="mt-4 flex items-center justify-between">
            <button type="button" onClick={()=>onSelectResource(resource)} className="mt-4 text-sm font-semibold hidden  sm:block text-gray-900 underline underline-offset-4 hover:text-blue-600">
                View Details →
            </button>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-blue-600">
                Visit Resource
            </a>
         </div>
        </article>
    )
}