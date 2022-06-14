INSERT INTO [dbo].[Endpoint]
    (
    [groupID], 
    [methodType], 
    [path], 
    [endpointDescription], 
    [status]
    )
    VALUES
    (
        @groupID,
        @methodType,
        @path,
        @endpointDescription,
        1
    )
    SELECT SCOPE_IDENTITY() AS endpointID