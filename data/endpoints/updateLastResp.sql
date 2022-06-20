UPDATE [dbo].[Endpoint]
SET
    [lastRespCode] = @lastRespCode,
    [lastRespDate] = @lastRespDate
    
WHERE endpointID = @endpointID