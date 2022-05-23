UPDATE [dbo].[Users]
SET    [role]=@role
WHERE [userID]= (SELECT userID
from [dbo].[Users]
WHERE [email] = @email)

