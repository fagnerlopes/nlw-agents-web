import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ModeToggle } from './modle-toogle'
import { Button } from './ui/button'
import { useAuthStore } from '@/store/use-auth-store'
import { UserNav } from './user-nav'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()

  const hideButtonsOnRoutes = ['/']

  const isHome = hideButtonsOnRoutes.includes(location.pathname)

  return (
    <header className="border-b">
      <div className="container mx-auto py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-foreground">
          LetMeAsk
        </Link>
        <div className="flex items-center gap-3">
          <ModeToggle />
          {user ? (
            <UserNav />
          ) : (
            <>
              {isHome && (
                <Button onClick={() => navigate('/login')}>Entrar</Button>
              )}
              {isHome && (
                <Button className="bg-purple-500 text-white font-semibold">
                  Comece grátis
                </Button>
              )}
            </>
          )}          
        </div>
      </div>
    </header>
  )
}
