import React, { useState, useEffect } from 'react';
import * as ProductService from "../../services/ProductService";
import "bootstrap/dist/css/bootstrap.css";
import AddProduct from './AddProduct';
import { toast } from "react-toastify";
import { format } from 'date-fns';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
};


function ProductList() {
    const [products, setProducts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    useEffect(() => {
        const getAllData = async () => {
            try {
                const productsData = await ProductService.getProducts(searchName, selectedGenre || null);
                const genresData = await ProductService.getGenres();
                setProducts(productsData);
                setGenres(genresData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getAllData();
    }, [searchName, selectedGenre]);

    const handleShowAddProductModal = () => setShowAddProductModal(true);
    const handleCloseAddProductModal = () => setShowAddProductModal(false);

    const handleAddProduct = async (values) => {
        try {
            const newProduct = await ProductService.addProduct(values);
            setProducts([...products, newProduct]);
            handleCloseAddProductModal();
            toast.success("Thêm sản phẩm mới thành công!!!");
        } catch (e) {
            toast.error("Thêm sản phẩm thất bại!");
        }
    };

    const getGenreInfo = (categoryId) => {
        const genre = genres.find(g => g.id === categoryId);
        return genre ? { name: genre.category, description: genre.description } : { name: 'Unknown', description: 'No description' };
    };

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <button className="btn btn-primary" onClick={handleShowAddProductModal}>Add New Product</button>
            </div>

            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by product name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="genreSelect" className="form-label">Filter by Genre</label>
                <select
                    id="genreSelect"
                    className="form-select"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>
                            {genre.category}
                        </option>
                    ))}
                </select>
            </div>
            <div><p>Product List</p></div>

            {products.length === 0 ? (
                <div className="alert alert-info">
                    Không có kết quả
                </div>
            ) : (
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>Stt</th>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Release Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{getGenreInfo(product.categoryId).name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{formatDate(product.release_date)}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            )}

            <AddProduct
                show={showAddProductModal}
                onClose={handleCloseAddProductModal}
                onSave={handleAddProduct}
                genres={genres}
            />
        </div>
    );
}

export default ProductList;
