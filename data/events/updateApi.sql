UPDATE [dbo].[API]
SET [apiCategoryID]=@apiCategoryID,
    [name]=@name,
    [baseUrl]=@baseUrl,
    [description]=@description
WHERE [apiID]=@apiID

SELECT [apiID]
    ,[apiCategoryID]
    ,[name]
    ,[baseUrl]
    ,[description]
FROM [dbo].[API]
WHERE [apiID]=@apiID
