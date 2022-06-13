INSERT INTO [dbo].[Endpoint]
    (
    [respCodeID], 
    [groupID], 
    [methodType], 
    [path], 
    [endpointDescription], 
    [status]
    )
    VALUES
    (
        1,
        @groupID,
        @methodType,
        @path,
        @endpointDescription,
        1
    )
    SELECT SCOPE_IDENTITY() AS endpointID