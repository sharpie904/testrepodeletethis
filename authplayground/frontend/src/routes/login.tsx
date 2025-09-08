import { createFileRoute } from '@tanstack/react-router';
import { signIn } from '../lib/auth';


export const Route = createFileRoute('/login')({
    component: Login,
});



function Login() {
    const handleLogin = async () => {
        const res = await signIn.email({
            email: "michael@catmail.com",
            password: "michael@catmail.com",
        });

        console.log(res);
    }
    return (
        <div>
            <button onClick={handleLogin}>login</button>
        </div>
    );
}
