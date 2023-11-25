import '../globals.css';
import { Inter as FontSans } from 'next/font/google';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { SidebarNav } from '@/components/sidebar-nav';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const sidebarNavItems = [
  {
    title: 'Jornadas',
    href: '/dashboard/round',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className='space-y-6 p-10 pb-16'>
          <div className='space-y-0.5'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Tenis de Mesa 🏓
            </h2>
            <p className='text-muted-foreground'>
              Sistema para generar torneos de tenis de mesa
            </p>
          </div>
          <Separator className='my-6' />
          <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <aside className='-mx-4 lg:w-1/5'>
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className='flex-1'>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-medium'>Crear Jornada</h3>
                  <p className='text-sm text-muted-foreground'>
                    Crea tus jornadas e imprime tus formatos.
                  </p>
                </div>
                <div className='w-full max-w-2xl'>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
