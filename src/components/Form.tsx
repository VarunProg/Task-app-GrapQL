import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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

const Form = () => {
  const { register, handleSubmit } = useForm<Iinputs>();
  const onSubmit: SubmitHandler<Iinputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Task Title"
        {...register("title", {
          required: true,
          maxLength: 20,
          minLength: 3,
          pattern: /[a-zA-Z]+/g, // regex  , gm for lower case , gim for case sensitiv
          // g=> global, i => case insensitive, m => multiline
          // /[a-zA-Z]+/g  allows only a to z alphabets
          // /var.n+/gim allows only n repeatedly
        })}
      />
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
