SELECT Groups.name AS [Group.name], Groups.groupID AS [Group.id],
    (
   	 SELECT Endpoint.methodType AS method, Endpoint.path AS path
   	 FROM Endpoint WHERE Endpoint.groupID=Groups.groupID
   	 FOR JSON PATH
    ) AS [Group.endpoint]
FROM Groups
    WHERE Groups.[apiID] = @apiID
    FOR JSON AUTO