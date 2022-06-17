IF (@didSucceed = 1)
    UPDATE [dbo].[API]
    SET [successAns] = [successAns]+1
    WHERE [API].apiID = @apiID
ELSE
    UPDATE [dbo].[API]
    SET [errorAns] = [errorAns]+1
    WHERE [API].apiID = @apiID