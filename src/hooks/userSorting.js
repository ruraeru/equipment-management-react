const userLicense = (user_license) => {
    let userType = "";
    let userSort = "";
    switch (user_license) {
        case 1:
            userType = "마스터";
            userSort = "교번";
            break;
        case 2:
            userType = "관리자";
            userSort = "교번";
            break;
        case 3:
            userType = "학부생 사용자";
            userSort = "학번";
            break;
        default:
            break;
    }
    return {
        userType,
        userSort
    };
}

export {
    userLicense
}