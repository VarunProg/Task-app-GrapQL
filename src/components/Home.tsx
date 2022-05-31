import { useState } from "react";
import { SpinnerInfinity } from "spinners-react";
import { useTypedMutation, useTypedQuery } from "../zeus/reactQuery";
import Form from "./Form";

const Home = () => {
  const [nextToken, setNextToken] = useState<string | null>(null);
  // mutate();
  const { data, isLoading, error, refetch } = useTypedQuery(
    "allTask",
    {
      allTasks: [
        { nextToken: nextToken },
        // 1 object for input
        {
          // second object for output
          items: {
            description: true,
            id: true,
            taskStatus: true,
            title: true,
          },
          nextToken: true, // use for pagination
        },
      ],
    },
    // do not retry and refetch on window change
    { retry: false, refetchOnWindowFocus: false }
  );
  const nextTokenResponse = data?.allTasks?.nextToken;

  // console.log(data);
  // console.log(JSON.stringify(error));

  if (isLoading) {
    return (
      <SpinnerInfinity
        style={{ margin: " auto" }}
        size={280}
        color="#36ad47"
        secondaryColor="rgba(0, 0, 0, 0.44)"
      />
    );
  }

  if (error) {
    return (
      <pre className="error">
        An error occured {"\n"}
        {JSON.stringify(error, null, 2)}
      </pre>
    );
  }
  return (
    <>
      <h1>Your tasks</h1>
      <ul>
        {data?.allTasks?.items?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <button
        // disabled={nextTokenResponse ? false : true}
        disabled={!nextTokenResponse}
        onClick={() => {
          if (!nextTokenResponse) return;
          setNextToken(nextTokenResponse);
          refetch();
        }}
      >
        Next
      </button>
      {/* <button >Previous</button> */}
      <Form refetchToDos={refetch} />
    </>
  );
};

export default Home;
