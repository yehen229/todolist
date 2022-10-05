export default function useLoaclStorage() {
    function setItem(key, value) {
        value = JSON.stringify(value)
        window.localStorage.setItem(key, value)
    }
    function getItem(key) {
        let value = window.localStorage.getItem(key)
        if (value) {
            value = JSON.parse(value)
        }
        return value
    }
    return {
        getItem,
        setItem
    }
}