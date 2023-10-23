/* eslint-disable react/jsx-key */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import LocationRegionService from "../../services/locationRegionService";
import CustomerService from "../../services/customerService";


const CreateCustomer = () => {
    const [create, setCreate] = useState({});

    const back = useNavigate();
    const createSchema = yup.object({
        name: yup.string()
            .required("Vui Lòng Nhập Tên")
            .min(5, "Tên Phải Từ 5 Kí Tự ")
            .max(30, "Tên Phải Ít Hơn 30 Kí Tự "),
        // phone: yup.number()
        //     .matches(/^0\d{9,10}$/, 'Số điện thoại không hợp lệ')
        //     .required("Vui Lòng Nhập Số Điện Thoại")
        //     .positive()
        //     .min(10, "Sai Định Dạng , SDT Gồm 10 Số")
        //     .max(10, "Sai Định Dạng , SDT Gồm 10 Số")
        //     .typeError("Sai Định Dạng , SDT Gồm 10 Số"),
        address: yup.string()
            .required("Vui Lòng Nhập Thành Phố")
            .max(30, "Thành Phố Phải Ít Hơn 30 Kí Tự "),
    })

    const [locationRegion, setLocationRegion] = useState({
        provinceId: 0,
        provinceName: '',
        districtId: 0,
        districtName: '',
        wardId: 0,
        wardName: ''
    });

    const [provinces, setProvinces] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);

    useEffect(() => {
        try {
            async function getALlProvinces() {
                const provinces = await LocationRegionService.getAllProvince();
                setProvinces(provinces.data.results)
            }
            getALlProvinces();
        } catch (error) {

        }
    }, [])

    const onChangeProvince = (e) => {
        const provinceId = e.target.value;
        const index = e.nativeEvent.target.selectedIndex;
        const provinceName = e.nativeEvent.target[index].text;
        getAllDistrict(provinceId);

        setLocationRegion({
            ...locationRegion,
            provinceId,
            provinceName
        })
    }

    const getAllDistrict = async (id) => {
        const district = await LocationRegionService.getAllDistrict(id);
        setDistrict(district.data.results)
    }

    const onChangeDistrict = (e) => {
        const districtId = e.target.value;
        const index = e.nativeEvent.target.selectedIndex;
        const districtName = e.nativeEvent.target[index].text;
        getAllWard(districtId);

        setLocationRegion({
            ...locationRegion,
            districtId,
            districtName
        })
    }

    const getAllWard = async (id) => {
        const ward = await LocationRegionService.getAllWard(id);
        setWard(ward.data.results)
    }

    const onChangeWard = (e) => {
        const wardId = e.target.value;
        const index = e.nativeEvent.target.selectedIndex;
        const wardName = e.nativeEvent.target[index].text;

        setLocationRegion({
            ...locationRegion,
            wardId,
            wardName
        })
    }


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(createSchema)
    });

    const createStudent = async (value) => {
        console.log(value);
        try {
            const data = {
                ...value,
                locationRegion: {
                    provinceId: locationRegion.provinceId,
                    provinceName: locationRegion.provinceName,
                    districtId: locationRegion.districtId,
                    districtName: locationRegion.districtName,
                    wardId: locationRegion.wardId,
                    wardName: locationRegion.wardName
                }
            }
            delete data.province
            delete data.district
            delete data.ward
            await CustomerService.postCustomer(data)
            console.log(data);
            // setCreate(data);
            reset();
            swal("Chúc Mừng", "Thêm Mới Thành Công!!!", "success")
            back("/student/list")
        } catch (error) {

        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-md-4 rounded mt-5" id="formAddStudent">
                <h2 className="text-primary text-center mt-4">Create Customer</h2>
                <form onSubmit={handleSubmit(createStudent)}>
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
                                    name="province"
                                    id=""
                                    className={`${errors?.province?.message ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('province')}
                                    onChange={onChangeProvince}>
                                    <option value="">--Vui Lòng Chọn</option>
                                    {
                                        provinces.length && provinces.map((item) => (
                                            <option value={item.province_id} key={item.province_id}>{item.province_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="invalid-feedback">{errors?.province?.message}</span>
                            </div>
                            <div className="col-lg-6 form-group mb-3 ">
                                <label className="label-form">District</label>
                                <select
                                    name="district"
                                    id="district"
                                    className={`${errors?.district?.message ? 'form-control is-invalid' : 'form-control'}`}
                                    {...register('district')}
                                    onChange={onChangeDistrict}>
                                    <option value="">--Vui Lòng Chọn</option>
                                    {
                                        district.length && district.map((item) => (
                                            <option value={item.district_id} key={item.district_id}>{item.district_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="invalid-feedback">{errors?.district?.message}</span>
                            </div>
                        </div>
                    </div>


                    <div className="form-group mb-3 ">
                        <label className="label-form">Address</label>
                        <input type="text" name="" id=""
                            className={`${errors?.address?.message ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('city')} />
                        <span className="invalid-feedback">{errors?.address?.message}</span>
                    </div>


                    <div className="form-group mb-3 ">
                        <label className="label-form">Ward</label>
                        <select
                            name="ward"
                            id="ward"
                            className={`${errors?.ward?.message ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('ward')}
                            onChange={onChangeWard}>
                            <option value="">--Vui Lòng Chọn</option>
                            {
                                ward.length && ward.map((item) => (
                                    <option value={item.ward_id} key={item.ward_id}>{item.ward_name}</option>
                                ))
                            }

                        </select>
                        <span className="invalid-feedback">{errors?.ward?.message}</span>
                    </div>

                    <div className=" mb-3 ">
                        <label className="label-form">Farvorite
                            <div className="container d-flex ">
                                <div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="game" id="" value="game" {...register('favorite')} />
                                        <label className="form-check-label" htmlFor="">Game</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="music" id="" value="music" {...register('favorite')} />
                                        <label className="form-check-label" htmlFor="">Music</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="football" id="" value="football" {...register('favorite')} />
                                        <label className="form-check-label" htmlFor="">Football</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="swimming" id="" value="swimming" {...register('favorite')} />
                                        <label className="form-check-label" htmlFor="">Swimming</label>
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
            </div>
        </div>
    )
}

export default CreateCustomer;