/* eslint-disable react/jsx-key */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect } from "react";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDistrict, fetchAllProvince, changeProvince, changeDistrict, fetchAllWard, fetchCreateCustomer, changeWard, changeLocationRegion } from "../../redux/customerSlice";

const CreateCustomer = () => {
    const dispatch = useDispatch();
    const customerData = useSelector((state) => {
        const { data, spa, loading, province, district, ward, currentLocationRegion } = state.customer
        return { data, spa, loading, province, district, ward, currentLocationRegion }
    })

    const back = useNavigate();

    const createSchema = yup.object({
        name: yup.string()
            .required("Vui Lòng Nhập Tên")
            .min(5, "Tên Phải Từ 5 Kí Tự ")
            .max(30, "Tên Phải Ít Hơn 30 Kí Tự "),
        address: yup.string()
            .required("Vui Lòng Nhập Thành Phố")
            .max(30, "Thành Phố Phải Ít Hơn 30 Kí Tự "),
    })

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


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(createSchema)
    });

    const createCustomer = async (data) => {
        data.locationRegion = customerData.currentLocationRegion;
        try {
            dispatch(fetchCreateCustomer(data))
            reset();
            swal("Chúc Mừng", "Thêm Mới Thành Công!!!", "success")
            back("/")
        } catch (error) {

        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-md-4 rounded mt-5" id="formAddStudent">
                <h2 className="text-primary text-center mt-4">Create Customer</h2>
                <form onSubmit={handleSubmit(createCustomer)}>
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
                                    id=""
                                    className={`${errors?.province?.message ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('locationRegion.province')}
                                    onChange={onChangeProvince}>
                                    <option value="">--Vui Lòng Chọn</option>
                                    {
                                        customerData.province.map((item) => (
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
                                    <option value="">--Vui Lòng Chọn</option>
                                    {
                                        customerData.district.map((item) => (
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
                                    <option value="">--Vui Lòng Chọn</option>
                                    {
                                        customerData.ward.map((item) => (
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
                                        <input className="for-check-input me-2" type="checkbox" name="Chải Lông" id="" value="Chải Lông" {...register('spa')} />
                                        <label className="form-check-label" htmlFor="">Chải Lông</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="Cắt Móng" id="" value="Cắt Móng" {...register('spa')} />
                                        <label className="form-check-label" htmlFor="">Cắt Móng</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="Đi Dạo" id="" value="Đi Dạo" {...register('spa')} />
                                        <label className="form-check-label" htmlFor="">Đi Dạo</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="Tắm Pet" id="" value="Tắm Pet" {...register('spa')} />
                                        <label className="form-check-label" htmlFor="">Tắm Pet</label>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-danger me-3">Create</button>
                        <button type="reset" className="btn btn-success"
                            onClick={() => reset()}>Cancel</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default CreateCustomer;