import { FC, ReactNode } from 'react';
import { Header } from '../Header/Header';
import { Background } from '../Background/Background';
import { StatsPanel } from '../../game/components/StatsPanel';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-secondary to-secondary-light p-4">
    <Background />
    <div className="flex gap-8 max-w-7xl mx-auto">
      {/* Contenido principal */}
      <div className="flex-1">
        <Header />
        <main className="mt-2 bg-primary/90 rounded-3xl p-6 shadow-card backdrop-blur-sm">
          {children}
        </main>
      </div>

      {/* Panel lateral */}
      <aside className="mt-2 lg:mt-[88px]">
      <div className="lg:sticky lg:top-4">
            <StatsPanel />
          </div>
      </aside>
    </div>
  </div>
);