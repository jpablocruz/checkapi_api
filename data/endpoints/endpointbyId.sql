SELECT Groups.name
    ,Endpoint.[path]
    ,Endpoint.endpointDescription
    ,Endpoint.methodType
    ,Endpoint.lastResp
    ,Endpoint.[status]
    ,Parameter.dataType
    ,Parameter.paramName
    ,Parameter.isRequired
    ,Parameter.paramDescription
    ,ResponseCode.number
    ,ResponseCode.respDescription
FROM Endpoint
JOIN Parameter 
    ON Endpoint.paramID = Parameter.paramID
JOIN ResponseCode
    ON Endpoint.respCodeID = ResponseCode.respCodeID
JOIN Groups
    ON Endpoint.groupID = Groups.groupID
WHERE [endpointID] = @endpointID