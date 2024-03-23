import { PodcastData } from '../types/types';


export const fetchPodcasts = async (url: string): Promise<PodcastData> => {

    try {
        const response = await fetch(url);
        const data: PodcastData = await response.json();
        return data;
    } catch (error) {

        console.error(`Error en el primer intento: ${error instanceof Error ? error.message : error}`);
        console.log("Intentando de nuevo...");

        // Segundo intento (ya que el API responde lentamente y he observado que ocasionalmente falla)
        try {
            const response = await fetch(url);
            const data: PodcastData = await response.json();
            return data;
        } catch (secondError) {
            throw new Error(`Error: ${secondError instanceof Error ? secondError.message : secondError}`);
        }
    }
};