import axios from "axios";
import { useState } from "react";

const useGetMyRentalList = async () => {
    const [rentalList, setRentalList] = useState();
    await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/myCurrentRentalList/student/1`)
        .then((res) => {
            setRentalList(res.data);
        }).catch(err => {
            console.log(err);
        });
    return rentalList;
}

export {
    useGetMyRentalList
}