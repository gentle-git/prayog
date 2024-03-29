import {FC} from 'react'
interface Props{
    keyword:string
}
const SearchResult:FC<Props> = ({ keyword }) => {
    return (
        <div>SearchResult for {keyword}</div>
    );
};

export default SearchResult;
