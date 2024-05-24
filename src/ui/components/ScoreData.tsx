import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FC } from 'react';
type ScoreDataProps = {
  name: string;
  value: number;
  color: string;

};

const ScoreData: FC<ScoreDataProps>=(props) => {
    return (
      <div>
        <div style={{display: "flex", alignItems:"center"}}>
            <FiberManualRecordIcon style={{color:"#9B69FF", marginRight: "10px"}}/>
            <h3 style={{margin: "0"}}>{props.value}%</h3>
        </div>
            <h3 style={{margin:"0 0 0 0"}}>{props.name}</h3>
      </div>
    );
}

export default ScoreData;
