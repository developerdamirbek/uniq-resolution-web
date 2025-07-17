import { HashLoader } from 'react-spinners'
import type { LoadingProps } from '../../../types/types'

export const Loading = ({ 
  fullScreen = false, 
  color = '#36d7b7',
  text = 'Loading magic...'
}: LoadingProps) => {
  return (
    <div className={`
      flex justify-center items-center
      ${fullScreen ? 
        'fixed inset-0 h-screen w-screen bg-black/50 backdrop-blur-lg z-50' : 
        'h-full w-full'}
    `}>
      <div className="flex flex-col items-center gap-4">
        <HashLoader 
          color={color} 
          size={fullScreen ? 80 : 50} 
        />
        {fullScreen && (
          <span className="text-white font-medium text-lg animate-pulse">
            {text}
          </span>
        )}
      </div>
    </div>
  )
}