import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const PetForm = ({ initialValues, funcAction, newPet=false }) => {
    const petSchema = yup.object().shape({
        name: yup.string().min(3, 'Must have at least 3 characters.')
            .required('Required.'),
        type: yup.string().min(3, 'Must have at least 3 characters.')
            .required('Required.'),
        description: yup.string().min(3, 'Must have at least 3 characters.')
            .required('Required.'),
        skill1: yup.string().nullable(),
        skill2: yup.string().nullable(),
        skill3: yup.string().nullable()
    })

    const handleSubmit = (values, actions) => {
        funcAction(values);
    }

    return (
        <div className='row form-container'>
            <div className='card'>
                <div className='card-body'>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={petSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleSubmit
                        }) => (
                            <Form onSubmit={handleSubmit} className='needs-validation' noValidate>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='mb-3 form-group'>
                                            <label htmlFor='name' className='form-label'>Pet Name</label>
                                            <Field type='text' name='name' className={ `form-control ${ touched.name && errors.name ? 'is-invalid' : ''}` } />
                                            <ErrorMessage name='name'>{msg => <div className='invalid-feedback'>{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div className='mb-3 form-group'>
                                            <label htmlFor='type' className='form-label'>Pet type</label>
                                            <Field type='text' name='type' className={ `form-control ${ touched.type && errors.type ? 'is-invalid' : ''}` } />
                                            <ErrorMessage name='type'>{msg => <div className='invalid-feedback'>{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div className='mb-3 form-group'>
                                            <label htmlFor='description' className='form-label'>Pet Description</label>
                                            <Field type='text' name='description' className={ `form-control ${ touched.description && errors.description ? 'is-invalid' : ''}` } />
                                            <ErrorMessage name='description'>{msg => <div className='invalid-feedback'>{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div className='col-md-12' style={{paddingTop: '80px'}}>
                                            <button type='submit' className='btn btn-primary'>{newPet ? 'Add Pet' : 'Edit Pet'}</button>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='form-label'>Skills (Optional)</label>
                                        <div className='mb-3 form-group'>
                                            <label htmlFor='skill1' className='form-label'>Skill 1</label>
                                            <Field type='text' name='skill1' className='form-control' />
                                        </div>
                                        <div className='mb-3 form-group'>
                                            <label htmlFor='skill2' className='form-label'>Skill 2</label>
                                            <Field type='text' name='skill2' className='form-control' />
                                        </div>
                                        <div className='mb-3 form-group'>
                                            <label htmlFor='skill3' className='form-label'>Skill 3</label>
                                            <Field type='text' name='skill3' className='form-control' />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default PetForm;
