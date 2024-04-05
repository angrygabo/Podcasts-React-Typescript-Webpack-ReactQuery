export const fetchPodcasts = async <T>(fetchData: () => Promise<T>): Promise<T> => {
    try {
        return await fetchData();
    } catch (error) {
        console.error(`Error: ${error instanceof Error ? error.message : error}`);
        console.log("Intentando de nuevo...");
        try {
            // La API va algo lenta, hago un segundo intento si falla al primero
            return await fetchData();
        } catch (secondError) {
            throw new Error(`Error: ${secondError instanceof Error ? secondError.message : secondError}`);
        }
    }
};