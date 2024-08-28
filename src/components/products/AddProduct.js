import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    id: Yup.string()
        .matches(/^PROD-\d{4}$/, 'Mã sản phẩm phải theo định dạng PROD-XXXX')
        .required('Mã sản phẩm là bắt buộc'),
    name: Yup.string()
        .required('Tên sản phẩm là bắt buộc'),
    categoryId: Yup.string().required('Danh mục là bắt buộc'),
    price: Yup.number()
        .required('Giá là bắt buộc'),
    quantity: Yup.number()
        .integer('Số lượng phải là số nguyên')
        .min(1, 'Số lượng phải lớn hơn 0')
        .required('Số lượng là bắt buộc'),
    release_date: Yup.date()
        .max(new Date(), 'Ngày phát hành không thể trong tương lai')
        .required('Ngày phát hành là bắt buộc'),
    description: Yup.string()
        .max(500, 'Mô tả không được vượt quá 500 ký tự')
        .required('Mô tả là bắt buộc'),
});


function AddProduct({ show, onClose, onSave, genres }) {
    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Product</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={{
                                id: '',
                                name: '',
                                categoryId: '',
                                release_date: '',
                                quantity: 1,
                                price: '',
                                description: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                onSave(values);
                            }}
                        >
                            {() => (
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="id" className="form-label">Product Code:</label>
                                        <Field
                                            type="text"
                                            id="id"
                                            name="id"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="id" component="div" className="text-danger"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Product Name:</label>
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="categoryId" className="form-label">Genre:</label>
                                        <Field as="select" id="categoryId" name="categoryId" className="form-select">
                                            <option value="">Select a genre</option>
                                            {genres.map(genre => (
                                                <option key={genre.id} value={genre.id}>
                                                    {genre.category}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="genreId" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price:</label>
                                        <Field
                                            type="number"
                                            id="price"
                                            name="price"
                                            className="form-control"
                                            step="0.01"
                                        />
                                        <ErrorMessage name="price" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="release_date" className="form-label">Release Date:</label>
                                        <Field
                                            type="date"
                                            id="release_date"
                                            name="release_date"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="release_date" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="quantity" className="form-label">Quantity:</label>
                                        <Field
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            className="form-control"
                                            min="1"
                                        />
                                        <ErrorMessage name="quantity" component="div" className="text-danger"/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description:</label>
                                        <Field
                                            as="textarea"
                                            id="description"
                                            name="description"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="description" component="div" className="text-danger"/>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
