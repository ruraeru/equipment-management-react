export default function ScreenData({ json }) {
    return (
        json.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.자산번호}</td>
                    <td>{item.관리부서}</td>
                    <td>{item.구분}</td>
                    <td>{item.품목코드}</td>
                    <td>{item.품명}</td>
                    <td>{item.규격}</td>
                    <td>{item.구입일자}</td>
                    <td>{item.구입구분}</td>
                </tr>
            );
        })
    );
}