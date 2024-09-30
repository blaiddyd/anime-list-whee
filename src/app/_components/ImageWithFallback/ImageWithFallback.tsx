import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type ImageWithFallbackProps = ImageProps & {
    fallbackSrc: string;
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(props.src);
    const [isLoading, setIsLoading] = useState(true)

    return (
        <Image
            {...props}
            src={imgSrc}
            onError={() => {
                setImgSrc(props.fallbackSrc);
            }}
            style={isLoading ? {
                filter: 'blur(20px)',
                ...props.style
            }: props.style}
            onLoad={() => setIsLoading(false)}
        />
    );
};

export default ImageWithFallback;