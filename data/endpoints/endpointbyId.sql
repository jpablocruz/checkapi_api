SELECT Groups.name
    ,Endpoint.[path]
    ,Endpoint.endpointDescription
    ,Endpoint.methodType
    ,Endpoint.lastResp
    ,Endpoint.[status]
    ,ResponseCode.number
    ,ResponseCode.respDescription
FROM Endpoint
JOIN ResponseCode
    ON Endpoint.respCodeID = ResponseCode.respCodeID
JOIN Groups
    ON Endpoint.groupID = Groups.groupID
WHERE [endpointID] = @endpointID