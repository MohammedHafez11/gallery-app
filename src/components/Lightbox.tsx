import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type LightboxProps = {
    selectedImage: number;
    images: { src: string; alt: string }[];
    closeLightbox: () => void;
    navigate: (direction: 'prev' | 'next') => void;
    isRTL: boolean;
};

const Lightbox: React.FC<LightboxProps> = ({ selectedImage, images, closeLightbox, navigate, isRTL }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeLightbox]);

    useEffect(() => {
        if (selectedImage !== null) {
            const closeButton = document.querySelector('.close-button');
            if (closeButton) {
                (closeButton as HTMLElement).focus();
            }
        }
    }, [selectedImage]);

    
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) {
            closeLightbox();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
            onClick={handleBackdropClick} 
        >
            <div className="relative max-w-4xl w-full">
                <img
                    src={images[selectedImage].src}
                    alt={images[selectedImage].alt}
                    className="w-full h-auto object-contain"
                />
                <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors close-button"
                    aria-label="Close lightbox"
                    role='button'
                >
                    <X size={24} />
                </button>
                <button
                    onClick={() => navigate('prev')}
                    className={`absolute top-1/2 ${isRTL ? 'right-4' : 'left-4'} transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors`}
                    aria-label="Previous image"
                    role='button'
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => navigate('next')}
                    className={`absolute top-1/2 ${isRTL ? 'left-4' : 'right-4'} transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors`}
                    aria-label="Next image"
                    role='button'
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default Lightbox;
