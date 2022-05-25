SELECT 
    Parameter.dataType
    ,Parameter.paramName
    ,Parameter.isRequired
    ,Parameter.paramDescription
FROM Parameter
    JOIN ParametersEndpoints 
    ON ParametersEndpoints.paramID = Parameter.paramID
WHERE ParametersEndpoints.endpointID = @endpointID