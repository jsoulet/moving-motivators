
import data from './cardListData'

// const KEYS = {
//     QUERY_STRING: 'order',
//     LOCAL_STORAGE: 'cards',
// }

function getOrderFromQueryString(): string[] | null {
    const hash = (new URL(window.location.href)).hash;
    const widthoutHashbang = hash.slice(1)
    const decoded = decodeURI(widthoutHashbang)
    return orderFromJson(decoded)
}


// function getOrderFromLocalStorage(): string[] | null {
//     const localStorageOrder = localStorage.getItem(KEYS.LOCAL_STORAGE);
//     return orderFromJson(localStorageOrder)
// }

function orderFromJson(jsonCardList: string | null): string[] | null {
    if (!jsonCardList) {
        return null
    }
    let parsedCardList

    try {
        parsedCardList = JSON.parse(jsonCardList);
    } catch (e) {
        return null
    }
    if (!Array.isArray(parsedCardList) || parsedCardList.length === 0 || typeof parsedCardList[0] !== 'string') {
        return null;
    }
    return parsedCardList
}

export function getCardsOrder(): string[] {
    const initialOrder = Object.keys(data)
    // const localStorageOrder = getOrderFromLocalStorage();
    const queryStringOrder = getOrderFromQueryString();

    if (queryStringOrder) {
        return queryStringOrder
    }

    // if (localStorageOrder) {
    //     return localStorageOrder
    // }

    return initialOrder
}

// function saveOrderToLocalStorage(jsonOrder: string): void {
//     localStorage.setItem(KEYS.LOCAL_STORAGE, jsonOrder)
// }

function saveOrderToUrl(jsonOrder: string): void {
    window.location.hash = jsonOrder
}

export function saveCardsOrder(cards: string[]): void {
    const jsonOrder = JSON.stringify(cards)
    // saveOrderToLocalStorage(jsonOrder)
    saveOrderToUrl(jsonOrder)
}