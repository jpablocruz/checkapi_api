SELECT  A.[apiID],
        [name],
        [baseUrl],
        [description],
        isFavorite =  (CASE WHEN EXISTS (
            SELECT * FROM [Favorites] 
            WHERE [Favorites].apiID = A.apiID 
            AND [Favorites].userID = @userID
        )
        THEN 1
        ELSE 0
        END ),
        [isEnabled]
FROM [dbo].[API] as A
LEFT JOIN dbo.CategoryAPI ON A.apiID = CategoryAPI.apiID
WHERE CategoryAPI.categoryID = @categoryID
ORDER BY isFavorite DESC, name;