import { useNavigate} from "react-router-dom";
import '../styles/TableStyle.css'
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const CustomTable = ({props,propsName,to,title,isOffer}) => {
    const navigate = useNavigate();
    return (
        <div className="table-wrapper">
                <table>
                  <caption>
                    Table of {title}
                  </caption>
                    <thead>
                        <tr>
                            {propsName.map((value)=> {
                                if(value!=="id")
                                  return <th key={value}>{value}</th>
                                }
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.map((element) =>
                             (
                                <tr key={element.id} className={isOffer?`isOffer`:""} onClick={()=>{
                                  if(!isOffer)
                                    navigate(`${to}?id=${element.id}`)
                                  }}>
                                  {
                                    Object.entries(element).map(([key,value])=>{
                                      if(typeof(value) === "boolean")
                                        return <td data-cell={key} key={value+key+"cell"}>
                                          {value ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>}
                                        </td>
                                      if(value !== element.id)
                                        return <td data-cell={key} key={value+key+"cell"}>{value}</td>
                                    })
                                  }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
        )
}

export default CustomTable;

