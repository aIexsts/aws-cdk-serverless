import { AuthTestService } from "./AuthTestService";


async function testAuth() {
    const service = new AuthTestService();
    const loginResult = await service.login(
        'alextest',
        'Parolik123)'
    )
    console.log(loginResult);
}

testAuth();