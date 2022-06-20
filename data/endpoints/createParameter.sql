INSERT INTO [dbo].[Parameter] (
    [dataType],
    [paramName],
    [isRequired],
    [paramDescription]
)
VALUES (
    @dataType,
    @paramName,
    1,
    @paramDescription
)
SELECT SCOPE_IDENTITY() AS paramID