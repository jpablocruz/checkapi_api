SELECT 
ResponseCode.respCodeID,
ResponseCode.number,
ResponseCode.respDescription
FROM ResponseCode
    JOIN RespCodesEndpoints 
    ON RespCodesEndpoints.respCodeID = ResponseCode.respCodeID
WHERE RespCodesEndpoints.endpointID = @endpointID