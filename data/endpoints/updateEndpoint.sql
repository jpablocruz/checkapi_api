UPDATE [dbo].[Endpoint]
SET
    [endpointDescription] = @endpointDescription,
    [path] = @path,
    [methodType] =  @methodType
    
WHERE endpointID = @endpointID