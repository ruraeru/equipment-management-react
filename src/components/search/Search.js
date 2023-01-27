import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "components/nav/Pagination";

export default function Search({ type, setList, getList, token, setSearch, isSearch }) {
    const [input, setInput] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (input) getSearchResult(input);
    }, [page]);

    const getSearchResult = async (text) => {
        if (type === "rental") {
            await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/searchTool/${text}/${page}`, {
                headers: {
                    token: token
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.suc) {
                    }
                    setList(res.data.tool);
                }).catch((err) => {
                    getList();
                });
            return;
        }
        if (type === "log") {
            console.log("log");
            await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/searchLog/${input}/${page}`, {
                headers: {
                    token: token
                }
            }).then((res) => {
                console.log(res);
                if (res.data.suc) {
                }
                setList(res.data.result);
            }).catch((err) => {
                getList();
            })
            return;
        }

        if (type === "myReport") {
            await axios.get(`${process.env.REACT_APP_DOMAIN}/repair/searchMyRepair/${input}/${page}`, {
                headers: {
                    token: token
                }
            }).then((res) => {
                if (res.data.suc) {
                }
                setList(res.data.result);
            }).catch((err) => {
                getList();
            })
            return;
        }

        if (type === "report") {
            await axios.get(`${process.env.REACT_APP_DOMAIN}/repair/searchRequestedRepair/${input}/${page}`, {
                headers: {
                    token: token
                }
            }).then((res) => {
                console.log(res);
                if (res.data.suc) {
                }
                setList(res.data.result);
            }).catch((err) => {
                getList();
            })
            return;
        }

        if (type === "approvalList") {
            await axios.get(`${process.env.REACT_APP_DOMAIN}/user/searchNotApprovedList/${input}/${page}`, {
                headers: {
                    token: token
                }
            }).then((res) => {
                console.log(res);
                setList(res.data.result);
            }).catch((err) => {
                getList();
            });
            return;
        }

        if (type === "myRental") {
            await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/searchMyRental/${input}/${page}`, {
                headers: {
                    token: token
                }
            }).then((res) => {
                console.log("myrentalSearch", res);
                setList(res.data.result);
            }).catch((err) => {
                getList();
            });
            return;
        }

        if (type === "myRentalManage") {
            await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/searchMyRentalManagement/${input}/${page}`, {
                headers: {
                    token: token
                }
            }).then((res) => {
                setList(res.data.result);
            }).catch((err) => {
                getList();
            });
            return;
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        getSearchResult(input);
        setSearch(true);
    }

    return (
        <>
            <SearchBox onSubmit={onSubmit}>
                <SearchBar
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        if (e.target.value.length === 0) {
                            setPage(1);
                            setSearch(false);
                            getList();
                        }
                    }}
                    placeholder="검색어를 입력하세요." />
                <button type="submit" className="hide">검색</button>
                <BiSearchAlt2 size="20px" color="#9785CB" />
            </SearchBox>
            <Pagination page={page} setPage={setPage} active={isSearch} />
        </>
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

const SearchBox = styled.form`
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