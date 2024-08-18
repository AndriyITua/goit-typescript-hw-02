import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // const handleForm = (e) => {
  //   const form = e.target;
  //   const value = form.elements.input.value;
  //   e.preventDefault();
  //   form.reset();
  // };

  return (
    <header className={css.container}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (values.query === "") {
            toast.error("Please enter a search term");
            return;
          }
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form>
          <Field
            className={css.input}
            type="text"
            autoComplete="off"
            name="query"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit">
            Search
          </button>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                border: "1px solid black",
                padding: "5px",
                color: "white",
                backgroundColor: "black",
              },
            }}
          />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
