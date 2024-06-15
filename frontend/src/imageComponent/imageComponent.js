import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageComponent = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        axios.get('/api/image')
            .then(response => {
                const { image, contentType } = response.data;
                const base64Image = btoa(
                    new Uint8Array(image).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );
                setImage(`data:${contentType};base64,${base64Image}`);
            })
            .catch(error => {
                console.error('Error fetching the image:', error);
            });
    }, []);

    return (
        <div>
            {image ? <img src={image} alt="Server Image" /> : <p>Loading...</p>}
        </div>
    );
};

export default ImageComponent;