import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogActions from "@mui/material/DialogActions";

type IQuizz = {
  id: number;
  name: string;
  level: number;
  nbQuest: number;
  idCreator: number;
};
type IQuestion = {
  id: number;
  name: string;
  idGoodRep: number;
};

type IResponse = {
  id: number;
  name: string;
};

const quizzes: IQuizz[] = [
  {
    id: 1,
    name: "Quiz de culture générale",
    level: 1,
    nbQuest: 10,
    idCreator: 1,
  },
  {
    id: 2,
    name: "Quiz de sport",
    level: 2,
    nbQuest: 10,
    idCreator: 1,
  },
  {
    id: 3,
    name: "Quiz d’histoire",
    level: 3,
    nbQuest: 10,
    idCreator: 1,
  },
];

const questions: IQuestion[] = [
  {
    id: 1,
    name: "Quelle est la capitale de la France ?",
    idGoodRep: 1,
  },
  {
    id: 2,
    name: "Qui a peint la Joconde ?",
    idGoodRep: 2,
  },
  {
    id: 3,
    name: "Quel est le plus grand mammifère marin ?",
    idGoodRep: 3,
  },
];

const responses: IResponse[] = [
  { id: 1, name: "Paris" },
  { id: 2, name: "Léonard de Vinci" },
  { id: 3, name: "La baleine bleue" },
];

const Profile = () => {
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
    <div style={{}}>
      <h1>Quizz de John Doe</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        {quizzes.map((quizz) => (
          <Card key={quizz.id} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {quizz.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Niveau {quizz.level}
              </Typography>
              <Typography variant="body2">{quizz.nbQuest} questions</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleClickOpen(quizz)}>
                Voir les questions
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{selectedQuizz?.name}</DialogTitle>
        <DialogContent>
          {questions.map((question) => (
            <div key={question.id}>
              <Typography variant="h6" gutterBottom>
                {question.name}
              </Typography>
              <RadioGroup
                aria-labelledby="customized-radios"
                name="customized-radios"
              >
                {responses.map((response) => (
                  <FormControlLabel
                    key={response.id}
                    value={response.name}
                    control={<Radio />}
                    label={response.name}
                    checked={response.id === question.idGoodRep}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
