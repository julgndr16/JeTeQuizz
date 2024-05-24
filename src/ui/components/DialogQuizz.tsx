import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import {FC, useEffect, useState} from "react";


type DialogQuizzProps = {
  open: boolean;
  handleClose: () => void;
  quizzId: number;
  url: string;
};

const DialogQuizz:FC<DialogQuizzProps>=(props)=> {
  const [quizz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      fetch(props.url + "quizz?id=" + props.quizzId)
        .then((res) => res.json())
        .then((data) => {
          console.log("ListeQuestion :",data);
          setQuiz(data);
          setQuestions(data.questions);
          console.log("ListeQuestions :",data.questions);

        });
      // setQuestions(data.questions);
    };
    fetchData();
  }, []);
    return (
      <div>

      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{quizz.name}</DialogTitle>
        <DialogContent>
          {questions.map((question) => (
            <div key={question.id}>
              <Typography variant="h6" gutterBottom>
                {question.question}
              </Typography>
              <RadioGroup
                aria-labelledby="customized-radios"
                name="customized-radios"
              >
                {console.log("ListeReponses :",question)}
                {question.answers.map((response) => (
                  <FormControlLabel
                    key={response.id}
                    value={response.answer}
                    control={<Radio />}
                    label={response.answer}
                    checked={response.id === question.correctAnswerId}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>);
};

export default DialogQuizz;
