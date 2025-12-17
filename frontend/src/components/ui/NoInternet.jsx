import React, { useEffect, useState } from 'react'
import NoInternet from '../../assets/nointernet.png'

const No_Internet = () => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null;
  return (
    <div className="fixed inset-0 bg-[#ffffff]  bg-opacity-95 flex flex-col items-center justify-center z-9999 space-y-3 ">
      <img className='h-25 w-auto' src={NoInternet} />
      <h1 className="text-3xl font-bold text-black mb-4">
        No Internet Connection
      </h1>

      <p className="text-black mb-6 text-center max-w-md">
        It looks like you’re offline. Please check your connection.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  )
}

export default No_Internet
