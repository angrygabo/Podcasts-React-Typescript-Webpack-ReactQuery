import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/home/Home';

jest.mock('@/services/useFetchPodcasts', () => () => ({
    data: {
        feed: {
            entry: [
                {
                    "im:name": { label: 'Podcast 1' },
                    "im:artist": { label: 'Artist 1' },
                    "id": { attributes: { 'im:id': '1' } },
                    "im:image": [
                        { label: 'http://dumb.com/image1.jpg' },
                        { label: 'http://dumb.com/image2.jpg' },
                        { label: 'http://dumb.com/image3.jpg' }
                    ]
                },
                // Segundo podcast añadido aquí
                {
                    "im:name": { label: 'Podcast 2' },
                    "im:artist": { label: 'Artist 2' },
                    "id": { attributes: { 'im:id': '2' } },
                    "im:image": [
                        { label: 'http://dumb.com/image2_1.jpg' },
                        { label: 'http://dumb.com/image2_2.jpg' },
                        { label: 'http://dumb.com/image2_3.jpg' }
                    ]
                }
            ]
        }
    },
    isLoading: false,
}));

describe('Home component', () => {
    it('updates filter and filters podcasts accordingly', async () => {
        const { getByLabelText, findByText } = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Esperar a que el campo filter
        const filterInput = await waitFor(() => getByLabelText('Find podcast:'));

        // Simular cambio en el campo de entrada
        fireEvent.change(filterInput, { target: { value: 'Podcast 1' } });

        // Verificar que el texto del podcast filtrado se muestre
        expect(await findByText('Podcast 1')).toBeInTheDocument();
    });
});
