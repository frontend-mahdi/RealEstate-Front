import { FormInputText } from "@/components/form/FormInputText";
import { FormInputTextArea } from "@/components/form/FormInputTextArea";
import { Button, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";

export interface indexType {}
interface IFormInput {
  title: string;
}

const index: FC<indexType> = () => {
  const { handleSubmit, reset, control } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px",
      }}
    >
      <Typography variant="h4">Add New Location</Typography>
      <FormInputText name="title" control={control} label="Title" />
      <FormInputTextArea name="desc" control={control} label="Description" />
      <FormInputText name="imgUrl" control={control} label="Image Url" />
      <Button type="submit" variant={"contained"}>
        Submit
      </Button>
      <Button
        type="button"
        onClick={() => {
          reset();
        }}
        variant={"outlined"}
      >
        Cancel
      </Button>
    </Paper>
  );
};

export default index;
