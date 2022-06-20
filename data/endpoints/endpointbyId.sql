SELECT Groups.name
    ,Endpoint.[path]
    ,Endpoint.endpointDescription
    ,Endpoint.methodType
    ,Endpoint.lastRespCode
    ,Endpoint.lastRespDate
    ,Endpoint.[status]
FROM Endpoint
JOIN Groups
    ON Endpoint.groupID = Groups.groupID
WHERE [endpointID] = @endpointID