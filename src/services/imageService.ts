import { STORAGE_URL } from "@/constants/secretConstants";

export const StorageService = {
    url: STORAGE_URL,

    getCoverImage: (id: string): string => {
        return `${StorageService.url}${encodeURIComponent(
            id
        )}%2Fcover.png?alt=media`;
    },

    getProjectImageByIndex: (id: string, index: number): string => {
        if (index === 0) {
            return StorageService.getCoverImage(id);
        }

        const formattedIndex = index.toString().padStart(2, "0");

        return `${StorageService.url}${encodeURIComponent(
            id
        )}%2Ffoto${formattedIndex}.png?alt=media`;
    },

    getProjectImages: (id: string, imageCount: number): string[] => {
        const images: string[] = [];

        for (let i = 0; i < imageCount; i++) {
            const imageUrl = StorageService.getProjectImageByIndex(id, i + 1);
            images.push(imageUrl);
        }

        return images;
    },
};
