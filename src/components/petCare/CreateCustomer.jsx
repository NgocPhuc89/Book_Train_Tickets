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
import { NavLink, useNavigate } from "react-router-dom";
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
        phone: yup.string()
            .matches(/^(0|\+84)\d{9}$/, 'Số điện thoại không hợp lệ'),
        province: yup.string()
            .required("Vui Lòng Chọn Thành Phố"),
        district: yup.string()
            .required("Vui Lòng Chọn Quận/Huyện"),
        ward: yup.string()
            .required("Vui Lòng Chọn Phường/Xã"),
        address: yup.string()
            .required("Vui Lòng Nhập Địa Chỉ")
            .max(30, "Thành Phố Phải Ít Hơn 30 Kí Tự "),
        spa: yup.array()
            .min(1, 'Bạn phải chọn ít nhất một dịch vụ.'),
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
        <div className="container">
            <div className="row mt-5" >
                <h2 className="text-primary text-center mt-4">Create Customer</h2>
                <form onSubmit={handleSubmit(createCustomer)}>
                    <div className="row">
                        <div className="col-lg-4 form-group mb-3  ">
                            <label className="label-form mb-2">Name</label>
                            <input type="text" name="" id=""
                                className={`${errors?.name?.message ? 'form-control is-invalid' : 'form-control'}`}
                                {...register('name')} />
                            <span className="invalid-feedback" >{errors?.name?.message}</span>
                        </div>
                        <div className="col-lg-4 form-group mb-3 ">
                            <label className="label-form mb-2">Phone</label>
                            <input type="text" name="" id=""
                                className={`${errors?.phone?.message ? 'form-control is-invalid' : 'form-control'}`}
                                {...register('phone')} />
                            <span className="invalid-feedback">{errors?.phone?.message}</span>
                        </div>
                        <div className="col-lg-4 form-group mb-3 ">
                            <label className="label-form mb-2">Pet</label>
                            <select name="" id="" className="form-select"
                                {...register('pet')}>
                                <option value="dog"  >Dog</option>
                                <option value="cat" >Cat</option>
                            </select>
                            <span className="invalid-feedback">{errors?.pet?.message}</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 form-group mb-3 ">
                            <label className="label-form mb-2">Province</label>
                            <select
                                name="province_id"
                                id=""
                                className={`${errors?.province?.message ? 'form-control is-invalid' : 'form-control'}`}
                                {...register('province')}
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
                        <div className="col-lg-4 form-group mb-3 ">
                            <label className="label-form mb-2">District</label>
                            <select
                                name="district_id"
                                id="district"
                                className={`${errors?.district?.message ? 'form-control is-invalid' : 'form-control'}`}
                                {...register('district')}
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
                        <div className="col-lg-4 form-group mb-3">
                            <label className="label-form mb-2">Ward</label>
                            <select
                                name="ward_id"
                                id="ward"
                                className={`${errors?.ward?.message ? 'form-control is-invalid' : 'form-control'}`}
                                {...register('ward')}
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
                    </div>
                    <div className="row">
                        <div className="col-lg-4 form-group mb-3 ">
                            <label className="label-form mb-2">Address</label>
                            <input type="text" name="" id=""
                                className={`${errors?.address?.message ? 'form-control is-invalid' : 'form-control'}`}
                                {...register('address')} />
                            <span className="invalid-feedback">{errors?.address?.message}</span>
                        </div>
                        <div className="col-lg-4 form-group mb-3 ">
                            <label className="label-form mb-2">Gender</label>
                            <select name="" id="" className="form-select"
                                {...register('gender')}>
                                <option value="male"  >Male</option>
                                <option value="female" >Female</option>
                            </select>
                        </div>
                        <div className="col-lg-4 mb-3 ">
                            <label className="label-form mb-2">Spa  </label>
                            <div className="container d-flex ">
                                <div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="spa" id="spa1" value="Chải Lông" defaultChecked {...register('spa')} />
                                        <label className="form-check-label" htmlFor="spa1">Chải Lông</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="spa" id="spa2" value="Cắt Móng" {...register('spa')} />
                                        <label className="form-check-label" htmlFor="spa2">Cắt Móng</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="spa" id="spa3" value="Đi Dạo" {...register('spa')} />
                                        <label className="form-check-label" htmlFor="spa3">Đi Dạo</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="spa" id="spa4" value="Tắm Pet" {...register('spa')} />
                                        <label className="form-check-label" htmlFor="spa4">Tắm Pet</label>
                                    </div>
                                </div>
                            </div>
                            <span className="invalid-feedback">{errors?.spa?.message}</span>
                        </div>
                    </div>

                    <div className="d-flex  mb-3">
                        <NavLink type="button" className="btn btn-secondary me-3" to={'/'}>Back</NavLink>
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