import LocalSearch from "../../../utils/localSearch";
import useSearchList from "./useSearchList";

export default function useSearchInput(data: string) {
  const { list, clearList: clear, searchList, jumpToDom } = useSearchList();
  const localSearch = new LocalSearch();
  localSearch.setRootDom(".markdown");
  const handleInput = (data: string) => {
    localSearch.cleanMark();
    localSearch.setSearchStr(data).queryTextDom().mark();
    searchList();
  };
  const clearList = () => {
    localSearch.cleanMark();
    clear();
  };
  return { list, handleInput, jumpToDom, clearList };
}
