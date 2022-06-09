INSERT INTO [dbo].[Groups]
    (
        [name],
        [apiID]
    )
VALUES 
    (
        @name,
        @apiID
    );

SELECT SCOPE_IDENTITY() AS groupID
