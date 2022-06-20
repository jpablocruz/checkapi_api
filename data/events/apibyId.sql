SELECT  [name], 
        [baseUrl],
        [successAns],
        [errorAns]
FROM dbo.API 
WHERE ApiID =  @apiID