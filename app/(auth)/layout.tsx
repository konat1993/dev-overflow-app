const AuthLayoutRoot = ({ children }: React.PropsWithChildren) => {
    return (
        <main className='flex min-h-screen w-full items-center justify-center'>
            {children}
        </main>
    )
}

export default AuthLayoutRoot