import { useNavigate} from "react-router-dom";
import '../styles/TableStyle.css'


const CustomTable = ({props,propsName,to,title}) => {
    const navigate = useNavigate();
    console.log(props);
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
                                return <></>
                                }
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.map((element) =>
                             (
                                <tr key={element.id} onClick={()=>{
                                  navigate(`${to}?id=${element.id}`)
                                }}>
                                  {
                                    Object.entries(element).map(([key,value])=>{
                                      if(value !== element.id)
                                        return <td data-cell={key} key={value+key+"cell"}>{value}</td>
                                      return <></>;
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

