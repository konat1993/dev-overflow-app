'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NavContent = () => {

    const pathname = usePathname()

    return (
        <section className="flex h-full flex-col gap-6 pt-16">
            {sidebarLinks.map((link) => {
                const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route

                return <SheetClose key={link.imgURL}>
                    <Link
                        href={link.route}
                        className={cn(
                            'flex items-center justify-start gap-4 p-4',
                            isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900',
                        )}
                    >
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={20}
                            height={20}
                            className={cn(
                                isActive ? '' : 'invert-colors'
                            )}
                        />
                        <p
                            className={cn(
                                isActive ? 'base-bold' : 'base-medium',
                            )}
                        >
                            {link.label}
                        </p>
                    </Link>
                </SheetClose>
            })}
        </section>
    )
}

const MobileNav = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src='/assets/icons/hamburger.svg'
                        alt='Menu'
                        width={36}
                        height={36}
                        className='invert-colors sm:hidden'
                    />
                </SheetTrigger>
                <SheetContent
                    side='left'
                    className='background-light900_dark200 border-none'
                >
                    <Link href="/" className='flex items-center gap-1'>
                        <Image
                            src="/assets/images/site-logo.svg"
                            width={23}
                            height={23}
                            alt='DevOverflow Logo'
                        />
                        <p
                            className='h2-bold text-dark100_light900 font-spaceGrotesk'
                        >
                            Dev
                            <span className="text-primary-500">
                                Overflow
                            </span>
                        </p>
                    </Link>
                    <div>
                        <SheetClose asChild>
                            <NavContent />
                        </SheetClose>
                        <SignedOut>
                            <div className="flex flex-col gap-3">
                                <SheetClose asChild>
                                    <Link href="/sign-in">
                                        <Button
                                            className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'
                                        >
                                            <span className="primary-text-gradient">Log in</span>
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/sign-up">
                                        <Button
                                            className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'
                                        >
                                            Sign up
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </div>
                        </SignedOut>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav