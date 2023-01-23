import { useNavigate } from "react-router-dom"
import styled from "styled-components";

export default function Pagination({ page, setPage, active }) {
    const numPages = 10;
    return (
        <>
            {active &&
                <Nav>
                    <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                        &lt;
                    </Button>
                    {Array(numPages).fill().map((_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? "page" : null}>
                            {i + 1}
                        </Button>
                    ))}
                    <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                        &gt;
                    </Button>
                </Nav>
            }
        </>
    )
}

const Nav = styled.nav`
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;

   width: 100%;
   height: 20px;

   position: absolute;
   bottom: 0;

   background-color: #ffffff;
`;

const Button = styled.button`
   &[aria-current] {
    font-size: 16px;
    font-weight: 700;
   }
`;