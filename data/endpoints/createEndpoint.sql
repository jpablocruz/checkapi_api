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
        @respCodeID,
        @groupID,
        @methodType,
        @path,
        @endpointDescription,
        1
    );