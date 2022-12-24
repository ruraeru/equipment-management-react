import styled from "styled-components";

export default function Search() {
    return (
        <SearchBox
            type="search"
            placeholder="검색어를 입력하세요."
        />
    );
}

const SearchBox = styled.input`
   width: 618px;
   padding: 10px;
   border-radius: 100px;
   border: 2px solid rgba(198, 193, 209, 0.3);
   background-color: #F5F5F5;
`;