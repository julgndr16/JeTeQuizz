import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FC } from 'react';
type ScoreDataProps = {
  name: string;
  value: string | number
  color: string;

};

const ScoreData: FC<ScoreDataProps>=(props) => {
    return (

      <div className="box" style={{display: "flex"}}>
          <div style={{paddingTop:"8px"}}>
            <FiberManualRecordIcon className={"icon"} style={{color:props.color, marginRight: "10px"}}/>
          </div>
        <div>
          <div>
            <h3  style={{margin: "0", color: props.color,textAlign: "start"}}>{props.value}</h3>
          </div>
          <div>
            <h3  style={{margin: "0 0 0 0"}}>{props.name}</h3>
          </div>
        </div>
      </div>
    );
}

export default ScoreData;
