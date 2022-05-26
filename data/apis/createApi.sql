INSERT INTO [dbo].[API]
    (
        [name],
        [baseUrl],
        [description],
        [status],
        [isEnabled]
    )
VALUES 
    (
        @name,
        @baseUrl,
        @description,
        1, 
        1
    )

SELECT SCOPE_IDENTITY() AS apiID