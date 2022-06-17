SELECT  [apiID],
        [name],
        [baseUrl],
        [description],
        [successAns],
        [errorAns],
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
ORDER BY isFavorite DESC, name;