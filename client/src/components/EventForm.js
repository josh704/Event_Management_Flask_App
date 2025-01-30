import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Event name is required'),
  description: Yup.string().required('Event description is required'),
  date: Yup.string().required('Event date is required'),
  location: Yup.string().required('Event location is required'),
});

const EventForm = ({ onSubmit, initialValues = {} }) => {
  return (
    <Formik
      initialValues={{
        name: initialValues.name || '',
        description: initialValues.description || '',
        date: initialValues.date || '',
        location: initialValues.location || '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor="name">Event Name</label>
          <Field id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Field id="description" name="description" />
          <ErrorMessage name="description" component="div" />
        </div>

        <div>
          <label htmlFor="date">Date (YYYY-MM-DD)</label>
          <Field id="date" name="date" />
          <ErrorMessage name="date" component="div" />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <Field id="location" name="location" />
          <ErrorMessage name="location" component="div" />
        </div>

        <button type="submit">{initialValues.name ? 'Update Event' : 'Create Event'}</button>
      </Form>
    </Formik>
  );
};

export default EventForm;
