import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import { FormControlLabel, RadioGroup } from "@mui/material";
import {FC, useEffect, useState} from "react";

type IQuestionCardProps = {
  title: string;
  numQuestion: number;
  total: number;
  answers: [];
  onAnswer: (selectedAnswer: string) => void;
};

const QuestionCard: FC<IQuestionCardProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    //console.log(event.target.value);
    props.onAnswer(event.target.value); // Ajoute cette ligne pour appeler la fonction onAnswer

  };

  return (
    <div>
      <Paper
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: 15,
          marginBottom: 10,
          width: "40vw",
        }}
      >
        <h4>
          Question {props.numQuestion} of {props.total}
        </h4>
        <h1>{props.title}</h1>
        <RadioGroup onChange={handleChange} value={selectedValue}>
          {props.answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={answer.id}
              control={<Radio sx={{ mr: 1 }} />}
              label={answer.name}
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                margin: 5,
                padding: 3,
              }}
              sx={{
                border: "2px solid #A4A4A4",
                borderRadius: 2,
                "&:hover": {
                  borderColor: "#9B69FF",
                },
              }}
            />
          ))}
        </RadioGroup>
      </Paper>
    </div>
  );
};

export default QuestionCard;
