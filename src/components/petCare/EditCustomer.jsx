/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */

import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { changeDistrict, changeProvince, changeWard, fetchAllDistrict, fetchAllProvince, fetchAllWard, fetchCustomerById, fetchEditCustomer } from "../../redux/customerSlice";

const EditCustomer = () => {

    const { customerId, page } = useParams();
    const back = useNavigate();
    const dispatch = useDispatch();
    const customerData = useSelector((state) => state.customer);
    const { data, spa, loading, province, district, ward, currentLocationRegion, currenCustomer } = customerData

    useEffect(() => {
        try {
            dispatch(fetchCustomerById(customerId))
        } catch (error) {
            console.log(error);
        }
    }, [customerId])

    const editSchema = yup.object({
        name: yup.string()
            .required("Vui Lòng Nhập Tên")
            .min(5, "Tên Phải Từ 5 Kí Tự ")
            .max(30, "Tên Phải Ít Hơn 30 Kí Tự "),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(editSchema),
        values: currenCustomer
    });

    // useEffect(() => {
    //     try {
    //         async function getALlProvinces() {
    //             const provinces = await LocationRegionService.getAllProvince();
    //             setProvinces(provinces.data.results)
    //         }
    //         getALlProvinces();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])

    useEffect(() => {
        const action = fetchAllProvince();
        dispatch(action);
    }, [])

    const onChangeProvince = (e) => {
        const value = e.target.value
        const index = e.nativeEvent.target.selectedIndex;
        const text = e.nativeEvent.target[index].text;

        dispatch(changeProvince({ value, text }));
        dispatch(fetchAllDistrict(value));
    }

    const onChangeDistrict = (e) => {
        const value = e.target.value
        const index = e.nativeEvent.target.selectedIndex;
        const text = e.nativeEvent.target[index].text;
        dispatch(changeDistrict({ value, text }));
        dispatch(fetchAllWard(value));
    }

    const onChangeWard = (e) => {
        const value = e.target.value;
        const index = e.nativeEvent.target.selectedIndex;
        const text = e.nativeEvent.target[index].text;
        dispatch(changeWard({ value, text }));
    }

    const editCustomer = async (data) => {
        data.locationRegion = currentLocationRegion
        try {
            dispatch(fetchEditCustomer({ ...data, customerId }))
            swal("Chúc Mừng", "Chỉnh Sửa Thông Tin Thành Công", "success");
            back('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-md-4 rounded mt-5" id="formAddStudent">
                <h2 className="text-primary text-center mt-4">Update Customer</h2>
                <form onSubmit={handleSubmit(editCustomer)}>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className="col-lg-6 form-group mb-3 me-2 ">
                                <label className="label-form">Name</label>
                                <input type="text" name="" id=""
                                    className={`${errors?.name?.message ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('name')} />
                                <span className="invalid-feedback" >{errors?.name?.message}</span>
                            </div>
                            <div className="col-lg-6 form-group mb-3 ">
                                <label className="label-form">Phone</label>
                                <input type="text" name="" id=""
                                    className={`${errors?.phone?.message ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('phone')} />
                                <span className="invalid-feedback">{errors?.phone?.message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className="col-lg-6 form-group mb-3 me-2 ">
                                <label className="label-form">Pet</label>
                                <select name="" id="" className="form-select"
                                    {...register('pet')}>
                                    <option value="dog"  >Dog</option>
                                    <option value="cat" >Cat</option>
                                </select>
                                <span className="invalid-feedback">{errors?.pet?.message}</span>
                            </div>
                            <div className="col-lg-6 form-group mb-3 ">
                                <label className="label-form">Gender</label>
                                <select name="" id="" className="form-select"
                                    {...register('gender')}>
                                    <option value="male"  >Male</option>
                                    <option value="female" >Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className="col-lg-6 form-group mb-3 me-2 ">
                                <label className="label-form">Province</label>
                                <select
                                    name="province_id"
                                    id="province"
                                    className={`${errors?.province?.message ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('locationRegion.province')}
                                    onChange={onChangeProvince}>
                                    <option value={currentLocationRegion?.province_id}>{currentLocationRegion?.province_name}</option>
                                    {
                                        province.map((item) => (
                                            <option value={item.province_id} key={item.province_id}>{item.province_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="invalid-feedback">{errors?.province?.message}</span>
                            </div>
                            <div className="col-lg-6 form-group mb-3 ">
                                <label className="label-form">District</label>
                                <select
                                    name="district_id"
                                    id="district"
                                    className={`${errors?.district?.message ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('locationRegion.district')}
                                    onChange={onChangeDistrict}>
                                    <option value={currentLocationRegion?.district_id}>{currentLocationRegion?.district_name}</option>
                                    {
                                        district.map((item) => (
                                            <option value={item.district_id} key={item.district_id}>{item.district_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="invalid-feedback">{errors?.district?.message}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className="col-lg-6 form-group mb-3  me-2">
                                <label className="label-form">Ward</label>
                                <select
                                    name="ward_id"
                                    id="ward"
                                    className={`${errors?.ward?.message ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('locationRegion.ward')}
                                    onChange={onChangeWard}>
                                    <option value={currentLocationRegion?.ward_id}>{currentLocationRegion?.ward_name}</option>
                                    {
                                        ward.map((item) => (
                                            <option value={item.ward_id} key={item.ward_id}>{item.ward_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="invalid-feedback">{errors?.ward?.message}</span>
                            </div>
                            <div className="col-lg-6 form-group mb-3 ">
                                <label className="label-form">Address</label>
                                <input type="text" name="" id=""
                                    className={`${errors?.address?.message ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('address')} />
                                <span className="invalid-feedback">{errors?.address?.message}</span>
                            </div>
                        </div>
                    </div>
                    <div className=" mb-3 ">
                        <label className="label-form">Spa
                            <div className="container d-flex ">
                                <div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox"
                                            name="Chải Lông"
                                            id="" value="Chải Lông"

                                            {...register('spa')} />
                                        <label className="form-check-label" htmlFor="">Chải Lông</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox"
                                            name="Cắt Móng"
                                            id="" value="Cắt Móng"

                                            {...register('spa')} />
                                        <label className="form-check-label" htmlFor="">Cắt Móng</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox"
                                            name="Đi Dạo"
                                            id="" value="Đi Dạo"
                                            {...register('spa')} />
                                        <label className="form-check-label" htmlFor="">Đi Dạo</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox"
                                            name="Tắm Pet"
                                            id="" value="Tắm Pet"
                                            {...register('spa')} />
                                        <label className="form-check-label" htmlFor="">Tắm Pet</label>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <NavLink type="button" className="btn btn-secondary me-3" to={'/'}>Back</NavLink>
                        <button type="submit" className="btn btn-danger me-3">Update</button>
                        <button type="reset" className="btn btn-success"
                            onClick={() => reset()}>Cancel</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default EditCustomer;