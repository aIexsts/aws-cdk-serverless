import { type CognitoUser } from '@aws-amplify/auth';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { Amplify, Auth } from 'aws-amplify';

const awsRegion = 'eu-west-2'
const identityPoolId = 'eu-west-2:417352ad-6ede-4762-abb8-b790a1f4298c'
const userPoolId = 'eu-west-2_nT7thEOgH'

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: userPoolId,
        userPoolWebClientId: '7emd33h1ofvjucqemql7rdeht7',
        authenticationFlowType: 'USER_PASSWORD_AUTH',
        identityPoolId: identityPoolId
    }
});

export class AuthTestService {
    public async login(userName: string, password: string) {
        return await Auth.signIn(userName, password) as CognitoUser;
    }

    public async generateTemporaryCredentials(user: CognitoUser) {
        const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();
        const cognitoIdentityUserPool = `cognito-idp.${awsRegion}.amazonaws.com/${userPoolId}`;
        
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId: identityPoolId,
                logins: {
                    [cognitoIdentityUserPool]: jwtToken
                }
            })
        });

        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }
}