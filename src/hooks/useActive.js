const useActive = (path) => {
    return window.location.pathname.startsWith(path);
}

const useHeaderActive = (path) => {
    return !window.location.pathname.localeCompare(path);
}
export {
    useActive, useHeaderActive
}