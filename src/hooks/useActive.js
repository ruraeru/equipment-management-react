const useActive = (path) => {
    return window.location.pathname.startsWith(path);
}

export {
    useActive
}