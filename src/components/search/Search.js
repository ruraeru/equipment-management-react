import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";

export default function Search() {
    return (
        <SearchBox>
            <SearchBar placeholder="검색어를 입력하세요." />
            <BiSearchAlt2 size="17px" color="#9785CB" />
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
`