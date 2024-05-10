import { create } from 'zustand';
import axios from 'axios';

const useApiStore = create((set) => ({
    events: [],
    fetchEvents: async () => {
        try {
            const response = await axios.get('https://santosnr6.github.io/Data/events.json');

            const eventsWithId = response.data.events.map(event => {
                /*console.log('Event date details:', event.when);*/
                return {
                    ...event,
                    eventId: event.id,
                };
            });
            set({ events: eventsWithId });
        } catch (error) {
            console.error('Fel i hämtningen av events:', error);
        }
    },
}));

export default useApiStore;