using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Validation;

namespace identity_service.Middlewares
{
    public class CustomTokenRequestValidator : ICustomTokenRequestValidator
    {
        public Task ValidateAsync(CustomTokenRequestValidationContext context)
        {
            context.Result.ValidatedRequest.Client.AlwaysSendClientClaims = true;
            var reqParamsDict = context.Result.ValidatedRequest.Raw["user_id"].ToString();
            context.Result.ValidatedRequest.ClientClaims.Add(new Claim("user_id", reqParamsDict));
            return Task.CompletedTask;
        }

        public CustomTokenRequestValidator()
        {

        }
    }
}