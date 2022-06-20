SELECT  [methodType],
        [path],
        [endpointDescription],
        [endpointID]
FROM Endpoint
WHERE groupID = @groupID