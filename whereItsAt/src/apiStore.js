import {create} from 'zustand'

const useApiStore = create((set) => ({
    events: [],
    fetchEvents: async () => {
        try{
            const response = await fetch('https://santosnr6.github.io/Data/events.json');
            const data = await response.json();
            set({events: data.events});
        } catch (error) {
            console.error('Fel i hämtningen av events:', error);
        }
    },
}));

export default useApiStore