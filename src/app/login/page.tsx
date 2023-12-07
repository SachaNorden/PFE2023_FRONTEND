import LoginForm from '@/app/ui/login-form';
import Image from 'next/image'

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <Image
                    src="/img-logo.png"
                    width={200}
                    height={200}
                    alt="logo snappies"
                    style={{
                        margin: "auto",
                    }}
                />
                <LoginForm/>
            </div>
        </main>
    );
}
