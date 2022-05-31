import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTypedMutation } from "../zeus/reactQuery";

interface Iinputs {
  description: string;

  owner: string;
  taskStatus: TaskStatus;
  title: string;
}

enum TaskStatus {
  complete = "complete",
  pending = "pending",
}

interface FormProps {
  refetchToDos: () => void;
}

const Form = ({ refetchToDos }: FormProps) => {
  const { register, handleSubmit, formState, watch } = useForm<Iinputs>({
    defaultValues: {
      title: "Coder",
      owner: "varun",
      description: "programmer",
      taskStatus: TaskStatus.complete,
    },
  });
  //   console.log(watch());
  const formData = watch();
  const { mutate, data } = useTypedMutation("formData", {
    createTask: [formData, { id: true }],
  });

  const onSubmit: SubmitHandler<Iinputs> = (data) => {
    mutate();
  };

  useEffect(() => {
    if (!data) return;
    refetchToDos();
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Task Title"
        {...register("title", {
          required: { value: true, message: "input is required" },
          maxLength: { value: 20, message: "max length exceed" },
          minLength: 3,
          pattern: /[a-zA-Z]+/g, // regex  , gm for lower case , gim for case sensitiv
          // g=> global, i => case insensitive, m => multiline
          // /[a-zA-Z]+/g  allows only a to z alphabets
          // /var.n+/gim allows only n repeatedly
        })}
      />
      <label>{formState.errors.title?.message}</label>
      <input
        type="text"
        placeholder="owner"
        {...register("owner", { required: true, maxLength: 20, minLength: 3 })}
      />
      <select {...register("taskStatus")}>
        <option value="pending">Pending</option>
        <option value="complete">Complete</option>
      </select>
      <textarea
        cols={10}
        rows={10}
        placeholder="Description"
        {...register("description")}
      />
      <input type="submit" />
    </form>
  );
};

export default Form;
