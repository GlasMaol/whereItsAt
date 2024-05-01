import {create} from 'zustand';
import axios from 'axios';

const useApiStore = create((set) => ({
    events: [],
    fetchEvents: async () => {
        try{
            const response = await axios.get('https://santosnr6.github.io/Data/events.json');
            set({events: response.data.events});
        } catch (error) {
            console.error('Fel i hämtningen av events:', error);
        }
    },
}));

export default useApiStore