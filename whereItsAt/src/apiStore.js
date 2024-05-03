import { create } from 'zustand';
import axios from 'axios';

const useApiStore = create((set) => ({
    events: [],
    fetchEvents: async () => {
        try {
            const response = await axios.get('https://santosnr6.github.io/Data/events.json');
            
            const eventsWithId = response.data.events.map((event, index) => ({
                ...event,
                id: index //ID blir index nr.
            }));
            set({ events: eventsWithId });
        } catch (error) {
            console.error('Fel i hämtningen av events:', error);
        }
    },
}));

export default useApiStore;