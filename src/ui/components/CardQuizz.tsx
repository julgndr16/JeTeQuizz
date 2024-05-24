import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {FC, useState} from "react";
import DialogQuizz from "./DialogQuizz";

type IQuizz = {
  id: number;
  name: string;
  questions: [];
  creator: object;
};
type CardQuizzProps = {
  quizz : IQuizz;
  url: string;
};


const CardQuizz :FC<CardQuizzProps>= (props) => {

  const [open, setOpen] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState<IQuizz | null>(null);

  const handleClickOpen = (quizz: IQuizz) => {
    setSelectedQuizz(quizz);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedQuizz(null);
    setOpen(false);
  };

  return (
    <div>
      <div className={"tile"} key={props.quizz.id} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.quizz.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Niveau {props.quizz.level}
          </Typography>
          <Typography variant="body2">{props.quizz.nbQuestions} questions</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleClickOpen(props.quizz)}>
            Voir les questions
          </Button>
        </CardActions>
      </div>
      <DialogQuizz open={open} handleClose={handleClose} quizzId={props.quizz.id} url={props.url} />
    </div>

  );
};

export default CardQuizz;
