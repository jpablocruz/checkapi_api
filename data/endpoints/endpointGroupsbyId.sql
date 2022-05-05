SELECT Groups.groupID, Groups.name, Endpoint.[methodType], Endpoint.[endpointDescription], Endpoint.[endpointID]
FROM [dbo].Groups
LEFT JOIN dbo.Endpoint ON Groups.groupID = Endpoint.groupID
WHERE Groups.[apiID] = @apiID  