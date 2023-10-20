import { NavLink, useLocation } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { useState } from "react";

const ListTrain = () => {
    const [ListTrain, setListTrain] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('');
    const [background, setBackground] = useState("pink");
    const id = useLocation().state?.id;
    const page = useLocation().state?.page;
    const [currentPage, setCurrentPage] = useState(page || 1);


    const first = () => {

    }
    const prevPage = () => {

    }
    const nextPage = () => {

    }
    const last = () => {

    }
    const handleInput = () => {

    }
    const handleSearch = () => {

    }
    const deleteStudent = () => {

    }

    return (
        loading ? <Spinner /> :
            <div className="container mt-5">
                <h1 className="text-danger text-center mt-4"> Student List</h1>

                <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-primary mt-5" style={{}}>
                        <NavLink className="nav-link " style={{ color: "white" }} to={'/student/create'}>
                            <i className="fa fa-plus me-2" />
                            Create
                        </NavLink>
                    </button>
                    <form className="d-flex mt-5" role="search" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => handleInput(e)}
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>

                <section className="mt-4">
                    <table className="table table-hover">
                        <thead>
                            <tr className="tr">
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Mark</th>
                                <th>Gender</th>
                                <th>City</th>
                                <th>Province</th>
                                <th>District</th>
                                <th>Ward</th>
                                <th>Favorite</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ListTrain.map((item) => (
                                    <tr key={item.id} id={item.id}
                                        style={{ background: item.id === id ? background : "white" }}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.mark}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.city}</td>
                                        <td>{item.locationRegion?.provinceName}</td>
                                        <td>{item.locationRegion?.districtName}</td>
                                        <td>{item.locationRegion?.wardName}</td>
                                        <td>{item.favorite?.join(" , ")}</td>
                                        <td>
                                            <NavLink to={`/student/edit/${item.id}/${currentPage}`}>
                                                <i role="button" className="fa fa-edit me-3 btn btn-outline-success" />
                                            </NavLink>

                                        </td>
                                        <td>
                                            <i role="button" className="fa fa-trash me-1 btn btn-outline-danger"
                                                onClick={() => deleteStudent(item.name, item.id)} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </section>
                <section>
                    <div className="d-flex justify-content-between mb-2">
                        <div>
                            <button type="button" className={`${currentPage == 1 ? 'btn btn-outline-primary me-1' : 'btn btn-outline-primary me-1'} ${action == 'first' ? 'active' : ''}`}
                                onClick={first}>First</button>
                            <button type="button" className={`${currentPage <= 1 ? 'btn btn-outline-primary me-1 disabled ' : 'btn btn-outline-primary me-1'} ${action == 'prev' ? 'active' : ''}`}
                                onClick={prevPage}>Prev</button>
                            <button type="button" className={`${currentPage >= totalPage ? 'btn btn-outline-primary me-1 disabled ' : 'btn btn-outline-primary me-1'} ${action == 'next' ? 'active' : ''}`}
                                onClick={nextPage}>Next</button>
                            <button type="button" className={`${currentPage == totalPage ? 'btn btn-outline-primary' : ' btn btn-outline-primary'} ${action == 'last' ? 'active' : ''} `}
                                onClick={last}>
                                Last</button>
                        </div>
                    </div>
                </section>
            </div >
    )
}

export default ListTrain;