import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { api } from '@/lib/api'
import { useAuthStore } from '@/store/use-auth-store'

export function useLogout() {
  const navigate = useNavigate()
  const { clearAccessToken } = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      await api.post('/logout', {})
    },
    onSuccess: () => {
      clearAccessToken()
      navigate('/login')
    },
  })
}