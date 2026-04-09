export const getImageUrl = (image) => {
    if (!image) return null;
    
    // Si ya es una URL completa (Cloudinary), la devolvemos tal cual
    if (image.startsWith("http")) {
        return image;
    }
    
    // Si no es una URL completa, asumimos que es una imagen local del backend
    return `${import.meta.env.VITE_BACK_END_URL}/images/${image}`;
};
