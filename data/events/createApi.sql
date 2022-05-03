INSERT INTO [dbo].[API]
    (
        [apiCategoryID],
        [name],
        [baseUrl],
        [description],
        [status],
        [isFavorite]
    )
VALUES 
    (
        @apiCategoryID,
        @name,
        @baseUrl,
        @description,
        @status,
        @isFavorite
    )

SELECT SCOPE_IDENTITY() AS apiID