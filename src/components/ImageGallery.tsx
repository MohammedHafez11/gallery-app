import { useState, useEffect, useCallback } from 'react';
import Lightbox from './Lightbox';
import Skeleton from './Skeleton';

type Image = {
    src: string;
    alt: string;
};

const images: Image[] = [
    { src: 'https://img.freepik.com/premium-photo/coding-programming-are-essential-elements-web-development-digital-innovation-business-marketing-materials_1007204-37887.jpg', alt: 'Image 1' },
    { src: 'https://img.freepik.com/premium-photo/programmers-hands-laptop-typing-code-with-neoncolored-background_1187703-178172.jpg', alt: 'Image 2' },
    { src: 'https://polinka.top/uploads/posts/2023-06/1685737599_polinka-top-p-programmirovanie-kartinki-dlya-prezentatsi-1.jpg', alt: 'Image 3' },
    { src: 'https://media.istockphoto.com/id/1385099270/vector/team-of-it-programmers-working-on-web-development-on-computers-concept-of-script-coding-and.jpg?s=612x612&w=0&k=20&c=LhX1MDawchrUQOCzC2eIhNEvJDThhRSdweDhk5QXn8s=', alt: 'Image 4' },
    { src: 'https://miro.medium.com/v2/resize:fit:1400/1*29NeeIGT0BElEBNfzE_VlQ.jpeg', alt: 'Image 5' },
    { src: 'https://lh7-us.googleusercontent.com/pGrrkx4ngSoW--9Z2LMwZJSWM0b8WhQJExz__0nPymCC8BkDBM7N4FtMXHLNnRthmcJEIvap9-X2Z5vH7A976dh6VgGrAYVKAbQZIQDHQ4A-Xr9ehZBsekUdPf-cKfsJfrgwm-3gNbJTXk7sTfETKkg', alt: 'Image 6' },
    { src: 'https://i0.wp.com/almdrasa.com/wp-content/uploads/2022/11/stockpack-unsplash-scaled.jpg', alt: 'Image 7' },
    { src: 'https://2allk-fen.com/wp-content/uploads/2022/01/programming-man-23LB898-1.jpg', alt: 'Image 8' },
];

export default function ImageGallery() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isRTL, setIsRTL] = useState(false);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedImage !== null) {
                setSelectedImage(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    const openLightbox = useCallback((index: number) => {
        setSelectedImage(index);
    }, []);

    const closeLightbox = useCallback(() => setSelectedImage(null), []);

    const navigate = useCallback(
        (direction: 'prev' | 'next') => {
            if (selectedImage === null) return;
            const newIndex =
                direction === 'next'
                    ? (selectedImage + 1) % images.length
                    : (selectedImage - 1 + images.length) % images.length;
            setSelectedImage(newIndex);
        },
        [selectedImage]
    );

    const toggleRTL = useCallback(() => setIsRTL((prev) => !prev), []);

    return (
        <div className={`container mx-auto p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
            <h1 className="text-3xl font-bold mb-4 text-center">Responsive Image Gallery</h1>
            <button
                onClick={toggleRTL}
                className="mb-4 px-4 py-2 bg-gray-800 text-white rounded  transition-colors"
                aria-label="Toggle RTL layout"
            >
                {isRTL ? 'Switch to LTR' : 'Switch to RTL'}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    images.map((_, index) => (
                        <Skeleton key={index} width="100%" height="200px" />
                    ))
                ) : (
                    images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                width={300}
                                height={200}
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto object-cover rounded-lg cursor-pointer transition-transform duration-300 transform group-hover:scale-105"
                                onClick={() => openLightbox(index)}
                                loading="lazy"
                            />
                        </div>
                    ))
                )}
            </div>

            {selectedImage !== null && (
                <Lightbox
                    selectedImage={selectedImage}
                    images={images}
                    closeLightbox={closeLightbox}
                    navigate={navigate}
                    isRTL={isRTL}
                />
            )}
        </div>
    );
}
