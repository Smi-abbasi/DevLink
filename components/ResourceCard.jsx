export default function ResourceCard({resource}){
    return(
        <article className="border border-gray-200 bg-white p-5">
            <span className="text-sm font-medium text-blue-600">
                {resource.category}
            </span>
            <h2 className="mt-2 text-xl font-semibold text-gray=900">
                {resource.title}
            </h2>
            <p className="mt-2 text-sm tet-gray-600">
                {resource.description}
            </p>
            <div className="mt-4 flex-wrap gap-2">
                {resource.tags.map((tag)=>
                (<span key={tag} className="text-xs text-gray-500">
                    #{tag}
                </span>
                ))}
            </div>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-medium text-gray-900 underline">
                Visit Resource
            </a>
        </article>
    )
}