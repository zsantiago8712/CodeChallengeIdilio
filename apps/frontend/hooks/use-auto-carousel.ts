import { useEffect, useState } from 'react';

interface UseAutoCarouselOptions {
    images: string[];
    interval?: number;
    enabled?: boolean;
}

export const useAutoCarousel = ({
    images,
    interval = 3000,
    enabled = true,
}: UseAutoCarouselOptions) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!enabled || images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval, enabled]);

    return {
        currentIndex,
        currentImage: images[currentIndex] || images[0],
        setCurrentIndex,
    };
};
