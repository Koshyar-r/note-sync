import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Anvil, FlashlightIcon, Joystick, PanelTop, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Smart Features. Zero Clutter.</h2>
                    <p className="mt-4">Everything you need to capture, organize, and sync your thoughts — with none of the distractions.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Anvil
                                    className="size-8"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 text-lg font-medium">Ridiculously Simple</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">No fluff. No friction. Open NoteSync and just start typing. It’s that fast — and that focused.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Joystick
                                    className="size-8"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 text-lg font-medium">Full Control</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Take full command over how your notes look, feel, and function. No limits. No compromises. Just pure control.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <PanelTop
                                    className="size-8"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 text-lg font-medium">Minimal, Yet Powerful</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Clean interface, keyboard-first design, and all the core features you actually use — without the bloat.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
