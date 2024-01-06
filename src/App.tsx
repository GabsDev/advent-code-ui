import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import {
  Box,
  Button,
  Container,
  Grid,
  TextareaAutosize,
  Typography,
} from "@mui/material";

interface AppState {
  inputKey: string;
  sumValues: number;
  wordMap: {
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;
    six: string;
    seven: string;
    eight: string;
    nine: string;
  };
  MaxCount: {
    red: number;
    green: number;
    blue: number;
  };
}

function App() {
  const [inputKey, setInputKey] = useState<AppState["inputKey"]>("");
  const [inputKey2, setInputKey2] = useState<AppState["inputKey"]>("");
  const [inputKey3, setInputKey3] = useState<AppState["inputKey"]>("");
  const [inputKey4, setInputKey4] = useState<AppState["inputKey"]>("");
  const [sumValues, setSumValues] = useState<AppState["sumValues"]>(0);
  const [sumValues2, setSumValues2] = useState<AppState["sumValues"]>(0);
  const [sumValues3, setSumValues3] = useState<AppState["sumValues"]>(0);
  const [sumValues4, setSumValues4] = useState<AppState["sumValues"]>(0);
  const firstNumberWordsRegExp: RegExp = new RegExp(
    [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ].join("|"),
  );
  const lastNumberWordsRegExp: RegExp = new RegExp(
    ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
      .join("|")
      .split("")
      .reverse()
      .join(""),
  );

  const wordMap: AppState["wordMap"] = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const MaxCount: AppState["MaxCount"] = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputKey(event.target.value);
  };

  const handleOnChange2 = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputKey2(event.target.value);
  };

  const handleOnChange3 = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputKey3(event.target.value);
  };

  const handleOnChange4 = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputKey4(event.target.value);
  };
  const handleOnClick = () => {
    console.log(inputKey);
    setSumValues(0);
    const values = inputKey
      .trim()
      .split("\n")
      .map((line: string) => {
        let first: string | undefined = line
          .split("")
          .find((v: string) => !Number.isNaN(Number(v)));
        let last: string | undefined = line
          .split("")
          .findLast((v: string) => !Number.isNaN(Number(v)));

        // @ts-ignore
        return Number(first + last);
      });
    setSumValues(values.reduce((s: number, v: number) => s + v));
  };
  const handleOnClick2 = () => {
    console.log(inputKey2);
    setSumValues2(0);
    const values = inputKey2
      .trim()
      .split("\n")
      .map((line: string) => {
        let firstNumberIndex: number | undefined = line
          .split("")
          .findIndex((v: string) => !Number.isNaN(Number(v)));
        let firstWordMatch = line.match(firstNumberWordsRegExp);
        let firstWordNumberIndex = firstWordMatch?.index || -1;

        let firstNumber =
          firstNumberIndex !== -1
            ? firstWordMatch
              ? firstNumberIndex < firstWordNumberIndex
                ? line[firstNumberIndex]
                : // @ts-ignore
                  wordMap[firstWordMatch[0]]
              : line[firstNumberIndex]
            : // @ts-ignore
              wordMap[firstWordMatch[0]];

        let lastNumberIndex: number | undefined = line
          .split("")
          .findLastIndex((v: string) => !Number.isNaN(Number(v)));
        let lastWordMatch = line
          .split("")
          .reverse()
          .join("")
          .match(lastNumberWordsRegExp);

        let lastWordNumberIndex = lastWordMatch
          ? // @ts-ignore
            line.length - 1 - lastWordMatch?.index
          : null;

        let lastNumber =
          lastNumberIndex !== -1
            ? lastWordMatch
              ? // @ts-ignore
                lastNumberIndex > lastWordNumberIndex
                ? line[lastNumberIndex]
                : // @ts-ignore
                  wordMap[lastWordMatch[0].split("").reverse().join("")]
              : line[lastNumberIndex]
            : // @ts-ignore
              wordMap[lastWordMatch[0].split("").reverse().join("")];
        console.log(firstNumber + lastNumber);
        return Number(firstNumber + lastNumber);
      });
    setSumValues2(values.reduce((s: number, v: number) => s + v));
  };

  const handleOnClick3 = () => {
    console.log(inputKey3);
    setSumValues(0);
    const lines = inputKey3.trim().split("\n");
    console.log(lines);
    const res: number = lines
      .map((line: string) => {
        return line
          .split(": ")[1]
          .split("; ")
          .map((set) => {
            const pulls = set.split(", ");
            return pulls.every((pull) => {
              const [count, color] = pull.split(" ");
              // @ts-ignore
              return MaxCount[color] >= Number(count);
            });
          })
          .every((p) => p);
      })
      .reduce((s, result, i) => {
        return result ? s + (i + 1) : s;
      }, 0);
    console.log(res);
    setSumValues3(res);
  };

  const handleOnClick4 = () => {
    console.log(inputKey4);
    setSumValues(0);
    const lines = inputKey4.trim().split("\n");
    console.log(lines);
    const res: number = lines
      .map((line: string) => {
        const MaxCountClick4 = {
          red: 0,
          green: 0,
          blue: 0,
        };
        line
          .split(": ")[1]
          .split("; ")
          .forEach((set) => {
            const pulls = set.split(", ");
            return pulls.forEach((pull) => {
              const [count, color] = pull.split(" ");
              // @ts-ignore
              if (MaxCountClick4[color] < Number(count)) {
                // @ts-ignore
                MaxCountClick4[color] = Number(count);
              }
            });
          });

        return MaxCountClick4.red * MaxCountClick4.green * MaxCountClick4.blue;
      })
      .reduce((s, v) => s + v);
    console.log(res);
    setSumValues4(res);
  };
  const handleOnClickDelete = () => {
    setInputKey("");
    setInputKey2("");
    setInputKey3("");
    setInputKey4("");
  };
  console.log(sumValues3);
  return (
    <>
      <NavBar />
      <Box sx={{ marginTop: 15 }}>
        <Container maxWidth="xl">
          <Box>
            <Typography variant="h2">Day 1</Typography>
            <br />
            <Typography variant="h3">Part 1</Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="h4">Enter your input</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextareaAutosize
                  name="inputKey"
                  onChange={handleOnChange}
                  aria-label="empty textarea"
                  placeholder="Empty"
                  style={{ marginLeft: 50, borderRadius: 8 }}
                  value={inputKey}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={handleOnClick}
                  style={{
                    backgroundColor: "#1976D2",
                    color: "white",
                    marginLeft: 50,
                  }}
                >
                  Verify
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={handleOnClickDelete}
                  style={{
                    backgroundColor: "#1976D2",
                    color: "white",
                    marginLeft: 50,
                  }}
                >
                  Clear input
                </Button>
              </Grid>
            </Grid>
            <br />
            <Typography variant="h4">Your count is: {sumValues}</Typography>
            <br />
            <br />
            <br />
            <Typography variant="h3">Part 2</Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="h4">Enter your input</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextareaAutosize
                  name="inputKey2"
                  onChange={handleOnChange2}
                  aria-label="empty textarea"
                  placeholder="Empty"
                  style={{ marginLeft: 50, borderRadius: 8 }}
                  value={inputKey2}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={handleOnClick2}
                  style={{
                    backgroundColor: "#1976D2",
                    color: "white",
                    marginLeft: 50,
                  }}
                >
                  Verify
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={handleOnClickDelete}
                  style={{
                    backgroundColor: "#1976D2",
                    color: "white",
                    marginLeft: 50,
                  }}
                >
                  Clear input
                </Button>
              </Grid>
            </Grid>
            <br />
            <Typography variant="h4">Your count is: {sumValues2}</Typography>
          </Box>
          <br />
          <br />
          <br />
          <br />
          <Box>
            <Typography variant="h2">Day 2</Typography>
            <br />
            <Typography variant="h3">Part 1</Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="h4">Enter your input</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextareaAutosize
                  name="inputKey3"
                  onChange={handleOnChange3}
                  aria-label="empty textarea"
                  placeholder="Empty"
                  style={{ marginLeft: 50, borderRadius: 8 }}
                  value={inputKey3}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={handleOnClick3}
                  style={{
                    backgroundColor: "#1976D2",
                    color: "white",
                    marginLeft: 50,
                  }}
                >
                  Verify
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={handleOnClickDelete}
                  style={{
                    backgroundColor: "#1976D2",
                    color: "white",
                    marginLeft: 50,
                  }}
                >
                  Clear input
                </Button>
              </Grid>
            </Grid>
            <br />
            <Typography variant="h4">Your count is: {sumValues3}</Typography>
            <br />
            <br />
            <br />
            <Typography variant="h3">Part 2</Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="h4">Enter your input</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextareaAutosize
                  name="inputKey4"
                  onChange={handleOnChange4}
                  aria-label="empty textarea"
                  placeholder="Empty"
                  style={{ marginLeft: 50, borderRadius: 8 }}
                  value={inputKey4}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={handleOnClick4}
                  style={{
                    backgroundColor: "#1976D2",
                    color: "white",
                    marginLeft: 50,
                  }}
                >
                  Verify
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={handleOnClickDelete}
                  style={{
                    backgroundColor: "#1976D2",
                    color: "white",
                    marginLeft: 50,
                  }}
                >
                  Clear input
                </Button>
              </Grid>
            </Grid>
            <br />
            <Typography variant="h4">Your count is: {sumValues4}</Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
