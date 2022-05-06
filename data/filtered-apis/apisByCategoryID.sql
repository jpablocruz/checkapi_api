SELECT  API.[apiID],
        API.[name],
        API.[baseUrl],
        API.[description]
FROM dbo.API
LEFT JOIN dbo.CategoryAPI ON API.apiID = CategoryAPI.apiID
WHERE CategoryAPI.categoryID = @categoryID;