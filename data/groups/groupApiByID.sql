SELECT [name],
        apiName =  (SELECT [API].name FROM API 
                WHERE API.apiID = gr.apiID)
FROM [checkAPI].[dbo].[Groups] as gr
WHERE gr.groupID = @groupID