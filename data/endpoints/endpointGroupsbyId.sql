SELECT Groups.groupID, Groups.name, Endpoint.[methodType], Endpoint.[endpointDescription]
FROM [dbo].Groups
LEFT JOIN dbo.Endpoint ON Groups.groupID = Endpoint.groupID
WHERE Groups.[apiID] = @apiID  