SELECT [categoryID],
       [name],
       APIcount = (SELECT COUNT(CategoryAPI.categoryapiID)
                    FROM CategoryAPI
                    WHERE CategoryAPI.categoryID = Category.categoryID)
FROM [dbo].[Category]
ORDER BY [name] ASC 