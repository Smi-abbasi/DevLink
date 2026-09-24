export default function ResourceModal({
    resource, relatedResources, onClose, onSelectedResource,
}){
    if(!resource){
        return null;
    }
    function handleOverlayClick(event){
        if(event.target=== event.currentTarget){
            onClose();
        }
    }
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog"
aria-modal="true"
        onClick={handleOverlayClick} >
            <div className="w-full max-w-lg bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-blue-600">
                            {resource.category}
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-gray-900">
                            {resource.title}
                        </h2>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close reource details"
                     className="rounded-sm text-2xl text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" >
                        ×
                     </button>
                </div>
                <p className="mt-4 text-gray-600">
                    {resource.description}
                </p>
                <p className="mt-5 text-sm text-gray-700">
                    <strong>Pricing:</strong>{resource.pricing}
                </p>
                <div className="mt-5">
                    <p className="text-sm font-medium text-gray-900">
                        Installation
                    </p>

                    <code className="mt-2 block bg-gray-100 p-3 text-sm text-gray-800">
                        {resource.install}
                    </code>
                </div>
                
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-medium text-gray-900 underline">
                    Official Documentation
                </a>

                {relatedResources.length >0 &&(
                    <div className="mt-6 border-t border-gray-200 pt-5">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Related Tools
                        </h3>

                        <div className="mt-3 space-y-2">
                            {relatedResources.map((relatedResource)=>(
                                <button key={relatedResource.id} type="button" onClick={()=>onSelectedResource(relatedResource)}
                                className="block text-sm text-gray-700 underline underline-offset-4 hover:text-blue-600">
                                    
                                    {relatedResource.title}
                                </button>
                            ))}
            </div>
        </div>
    )
}
</div>
</div>
    );
}