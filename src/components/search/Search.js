import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";

export default function Search({ type, list, setList, getList, token }) {
    console.log("search", token);
    const [input, setInput] = useState("");
    const onSerach = async (e) => {
        setInput(e.target.value);
        if (type === "rental") {
            await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/searchRental/${e.target.value}`, {
                headers: {
                    token: token
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.suc) {
                        setList(res.data.tool);
                    }
                }).catch((err) => {
                    console.log(err);
                    getList();
                });
            return;
        }
        if (type === "log") {
            console.log("log");
            await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/searchLog/${e.target.value}/1`, {
                headers: {
                    token: token
                }
            }).then((res) => {
                console.log(res);
                if (res.data.suc) {
                    setList(res.data.result);
                }
            }).catch((err) => {
                getList();
            })
            return;
        }

        if (type === "myReport") {
            await axios.get(`${process.env.REACT_APP_DOMAIN}/repair/searchMyRepair/${e.target.value}/1`, {
                headers: {
                    token: token
                }
            }).then((res) => {
                if (res.data.suc) {
                    setList(res.data.result);
                }
            }).catch((err) => {
                getList();
            })
            return;
        }

        if (type === "report") {
            await axios.get(`${process.env.REACT_APP_DOMAIN}/repair/searchRequestedRepair/${e.target.value}/1`, {
                headers: {
                    token: token
                }
            }).then((res) => {
                console.log(res);
                if (res.data.suc) {
                    setList(res.data.result);
                }
            }).catch((err) => {
                getList();
            })
        }
    }
    return (
        <SearchBox>
            <SearchBar
                value={input}
                placeholder="검색어를 입력하세요."
                onChange={onSerach}
            />
            <BiSearchAlt2 size="20px" color="#9785CB" />
        </SearchBox>
    );
}

const SearchBar = styled.input`
   width: 100%;
   height: 10px;

   font-size: 16px;
   text-align: left;
   
   margin-left: 10px;
   padding: 10px;
   
   border: none;
   -webkit-appearance: none;
   background-color: #F5F5F5;
   overflow: auto;

   &:focus {
    outline: none;
   }
`;

const SearchBox = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;

   width: 618px;
   height: 40px;
   
   padding-right: 10px;
   border-radius: 100px;
   border: 2px solid rgba(198, 193, 209, 0.3);

   background-color: #F5F5F5;
`;