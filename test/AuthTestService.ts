import { type CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'eu-west-2',
        userPoolId: 'eu-west-2_CbVzHfrls',
        userPoolWebClientId: 'pqc1kaqsaeaqueea4vs3ncj88',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

export class AuthTestService {
    public async login(userName: string, password: string) {
        return await Auth.signIn(userName, password) as CognitoUser;
    }
}