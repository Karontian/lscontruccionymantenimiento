import { useState } from "react";
import { notification } from "antd";
import emailjs from 'emailjs-com';

interface IValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: IValues = {
  name: "",
  email: "",
  message: "",
};

export const useForm = (validate: { (values: IValues): IValues }) => {
  const [formState, setFormState] = useState<{
    values: IValues;
    errors: IValues;
  }>({
    values: { ...initialValues },
    errors: { ...initialValues },
  });

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = formState.values;
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));

    if (Object.keys(errors).length > 0) {
      alert('Completa todos los espacios correctamente xfavor...!');
      return;
    }

    const templateParams = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    try {
      const result = await emailjs.send('service_j1yjtet', 'template_8gtypda', templateParams, 'FNEMWOmtFe_W-6BOh');
      console.log(result.text);
      alert('Gracias por tu mensage, en unos mins hablamos.!');
      event.target.reset();
      setFormState(() => ({
        values: { ...initialValues },
        errors: { ...initialValues },
      }));
    } catch (error) {
      console.log(error);
      alert('Failed to send message, please try again.');
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  const resetForm = () => {
    setFormState({
      values: { ...initialValues },
      errors: { ...initialValues },
    });
  };

  return {
    handleChange,
    handleSubmit,
    resetForm,
    values: formState.values,
    errors: formState.errors,
  };
};