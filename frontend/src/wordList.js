import {store} from "./store/configureStore";


const context = store.getState().language.name;

export const setText = (text) => {
    return wordList[context][text]
}

export const wordList = {
    ru: {
        logo: 'Караван'
    },
    kg: {
        logo: 'Караван (Пример)'
    }
};