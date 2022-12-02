import { useNavigate } from "react-router-dom";
import "./style/index.less";
import PropTypes from "prop-types";
import { TDoc } from "../../app.url";
import { date14Format, FORMAT_TYPE } from "../../utils/date";
import Icon from "../common/Icon/Icon";
import IconMap from "../common/Icon/IconsMap";

interface Props {
  onlyTitle: number;
  blogObj: TDoc;
  onDelete: (val: number) => void;
}
type PropTypesMap = PropTypes.ValidationMap<Props>;

const propTypes: PropTypesMap = {
  onlyTitle: PropTypes.number.isRequired,
};
BlogNode.propTypes = propTypes;

export default function BlogNode(props: Props) {
  const navigate = useNavigate();
  const goView = (id: number) => () => {
    navigate("/view/" + id);
  };
  const goEdit = (id: number) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/edit/" + id);
  };
  const handleDelete = (id: number) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    props.onDelete(id);
  };
  return (
    <>
      <div className="blog-node" onClick={goView(props.blogObj.id)}>
        <div className="doc-box">
          <p className="doc">{props.blogObj.abstract}</p>
        </div>
        <div className="left">
          <h3 className="title">
            <i className="title-edit" onClick={goEdit(props.blogObj.id)}>
              <Icon name={IconMap.BIANJI}></Icon>
            </i>
            <i className="title-delete" onClick={handleDelete(props.blogObj.id)}>
              <Icon name={IconMap.SHANCHU}></Icon>
            </i>
            {props.blogObj.title || "-"}
          </h3>
          <p className="other">
            <span className="date">{date14Format(props.blogObj.createDate, FORMAT_TYPE["YYYY-MM-DD"])}</span>
            <span className="tags">
              <span className="tag-node">javascript</span>
              <span className="tag-node">html</span>
              <span className="tag-node">css</span>
              <span className="tag-node">css3</span>
              <span className="tag-node">javascript</span>
            </span>
          </p>
        </div>
        <div className="right" style={{ backgroundImage: `url(/bkg3.jpg)` }}></div>
      </div>
    </>
  );
}
