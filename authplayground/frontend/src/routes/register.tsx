import { createFileRoute } from '@tanstack/react-router';
import { signUp } from "../lib/auth";

export const Route = createFileRoute('/register')({
  component: Register,
});

function Register() {
  const handleRegister = async () => {
    const res = await signUp.email({
      name: "michael@catmail.com",
      email: "michael@catmail.com",
      password: "michael@catmail.com",
    });

    console.log(res);
  }

  return (
    <div>
      <button onClick={handleRegister}>register</button>
    </div>
  );
}
