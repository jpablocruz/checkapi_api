UPDATE [dbo].[API]
SET
    [isEnabled] = @isEnabled
WHERE apiID = @apiID