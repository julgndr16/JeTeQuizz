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
        <div>
          <FiberManualRecordIcon color="success"/>
          <span>{props.value}</span>
        </div>
        <h3>{props.name}</h3>

      </div>
    );
}

export default ScoreData;
