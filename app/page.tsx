import { StudentList } from '@/components/StudentList';

export default function Home() {
    return (
        <main className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 font-[family-name:var(--font-geist-sans)]">
            <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <StudentList />
        </main>
    );
}
