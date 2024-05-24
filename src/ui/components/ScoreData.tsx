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
            <p  style={{margin: "0", color: props.color,textAlign: "start"}}>{props.value}</p>
          </div>
          <div>
            <p style={{margin: "0 0 0 0"}}>{props.name}</p>
          </div>
        </div>
      </div>
    );
}

export default ScoreData;
