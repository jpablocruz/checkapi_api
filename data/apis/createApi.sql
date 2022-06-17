INSERT INTO [dbo].[API]
    (
        [name],
        [baseUrl],
        [description],
        [status],
        [successAns],
        [errorAns],
        [isEnabled]
    )
VALUES 
    (
        @name,
        @baseUrl,
        @description,
        1, 
        0,
        0,
        1
    )

SELECT SCOPE_IDENTITY() AS apiID