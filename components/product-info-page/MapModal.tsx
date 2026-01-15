import Image from 'next/image';

import { X, MapPin } from 'lucide-react';

type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
}

export function MapModal({ isOpen, onClose, itemName }: MapModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-5xl w-full pointer-events-auto animate-scale-in overflow-hidden">
          <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-4xl dark:text-white">Store Location</h2>
            <button
              onClick={onClose}
              className="p-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors active:scale-95"
            >
              <X className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="p-8">
            <div className="relative max-w-3xl mx-auto">
              <Image
                src={"/images/pip/store-map.jpg"}
                alt="Store Map"
                className="w-full rounded-2xl"
                width={800}
                height={600}
              />
              <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-full">
                <div className="relative animate-bounce-slow">
                  <MapPin className="w-16 h-16 text-red-600 fill-red-600 drop-shadow-lg" />
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-xl shadow-lg">
                      {itemName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[8%] right-[15%] transform -translate-x-1/2 -translate-y-full">
                <div className="relative animate-bounce-slow" style={{ animationDelay: '0.2s' }}>
                  <MapPin className="w-16 h-16 text-blue-600 fill-blue-600 drop-shadow-lg" />
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xl shadow-lg">
                      You Are Here
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-blue-50 dark:bg-gray-700 rounded-2xl">
              <p className="text-2xl text-gray-700 dark:text-gray-200 text-center">
                Walk to the marked location to find your selected item
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
