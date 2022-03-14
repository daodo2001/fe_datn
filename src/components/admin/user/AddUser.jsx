import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    Upload,
    Card,
    DatePicker,
    notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import TokenService from '../../../services/token.service';
import api from '../../../services/api'
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};


const { Option } = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Option value="84">+84</Option>
        </Select>
    </Form.Item>
);

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Chọn ngày tháng năm sinh!',
        },
    ],
};

function AddUser(props) {
    const [form] = Form.useForm();

    const [hotels, setHotels] = useState([])
    const userAuthen = TokenService.getUser();
    const [loading, setLoading] = useState({
        loading: false
    })
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        date_of_birth: "",
        address: "",
        enabled: 1,
        sex: null,
        status: 0,
        username: "",
        password: "",
        cccd: "",
        id_creator: userAuthen.id,
        id_hotel: 0
    });

    useEffect(() => {
        getHotels();
    }, [])

    const getHotels = () => {
        api.get("/owner/hotels").then(res => {
            setHotels(res.data.data)
        })
    }

    const onChange = (event) => {
        const target = event.target;
        let name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;
        setFormData({ ...formData, [name]: value })
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                setLoading({
                    loading: false,
                    imageUrl,
                    imageName: info.file.originFileObj
                })
            );
        }

    };

    function insert() {
        var data = new FormData();
        data.append("user", JSON.stringify(formData))
        data.append("file", loading.imageName)
        var config = {
            method: 'post',
            url: '/owner/user/image_user',
            headers: {
                "content-type": "multipart/form-data",
            },
            data: data
        };
        api(config).then(res => {
            console.log(res);
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err);
        })
    }

    const onFinish = (fieldsValue) => {
        insert();

        form.resetFields();
        setLoading({
            ...loading, imageUrl: ""
        })
    };

    const [componentSize] = useState('default');

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const uploadButton = (
        <div>
            {loading.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        Quản lý cơ sở
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        Thêm cơ sở
                    </li>
                </ol>
            </nav>
            <hr />
            <Card className="main-container">
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                        prefix: '84',
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={8} key={1}>
                            <Form.Item label="Họ nhân viên" name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống họ tên!',
                                    },
                                ]}>
                                <Input name="first_name" onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={2}>
                            <Form.Item label="Tên nhân viên" name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống tên nhân viên!',
                                    },
                                ]}>
                                <Input name="last_name" onChange={onChange} />
                            </Form.Item>
                        </Col>

                        <Col span={8} key={3}>
                            <Form.Item label="Địa chỉ" name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống địa chỉ!',
                                    },
                                ]}>
                                <Input name="address" onChange={onChange} />
                            </Form.Item>
                        </Col>

                        <Col span={8} key={4}>
                            <Form.Item name="date-picker" label="Ngày sinh" {...config}>
                                {/* <DatePicker 
                                format={dateFormatList} 
                                defaultValue={moment('01/01/2015', dateFormatList[0])} 
                                name="date_of_birth" 
                                onChange={(date, dateString) => setFormData({ ...formData, date_of_birth: dateString })} /> */}
                                <DatePicker
                                    name="date_of_birth"
                                    onChange={(date, dateString) => {
                                        var newDate = dateString.split("/").reverse().join("-");
                                        setFormData({ ...formData, date_of_birth: newDate })
                                    }}
                                    defaultValue={moment(new Date(), dateFormatList[0])}
                                    format={dateFormatList} />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={5}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được trống giới tính!',
                                    },
                                ]}>
                                <Select name="sex" onChange={(item) => setFormData({ ...formData, sex: item })} placeholder="Chọn giới tính">
                                    <Option value={1}>Nam</Option>
                                    <Option value={0}>Nữ</Option>
                                    <Option value={2}>Khác</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} key={6}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống số điện thoại!',
                                    },
                                    {
                                        validator(_, value) {
                                            if (!value || value.length === 10) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Vui lòng nhập số có 10 số');
                                        },
                                    },
                                ]}
                            >
                                <Input
                                    name="phone"
                                    onChange={onChange}
                                    addonBefore={prefixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={7}>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Không đúng định dạng E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống E-mail!',
                                    },
                                ]}
                            >
                                <Input name="email" onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={8}>
                            <Form.Item label="Tên tài khoản" name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống tên tài khoản!',
                                    },
                                ]}>
                                <Input name="username" onChange={onChange} />
                            </Form.Item>
                        </Col>

                        <Col span={8} key={9}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password name="password" onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={11}>
                            <Form.Item label="Số CMND" name="cccd"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống số CMND!',
                                    },
                                    {
                                        validator(_, value) {
                                            if (!value || value.length === 9) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Vui lòng nhập số CMND có 9 số');
                                        },
                                    },
                                ]}>
                                <Input placeholder='Số CMND/Căn cước' name="cccd" onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={12}>
                            <Form.Item
                                name="hotel"
                                label="Cơ sở"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được trống cơ sở!',
                                    },
                                ]}>
                                <Select name="id_hotel" onChange={(item) => setFormData({ ...formData, id_hotel: item })} placeholder="Chọn cơ sở của nhân viên">
                                    {hotels.map((item, index) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8} key={10}>
                            <Form.Item label="Ảnh nhân viên" name="image">
                                <Upload
                                    multiple={false}
                                    customRequest={dummyRequest}
                                    onChange={handleChange}
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}>

                                    {loading.imageUrl ? <img src={loading.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
                        </Col>

                    </Row>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Thêm nhân viên
                        </Button>
                    </Form.Item>

                </Form>
            </Card>

        </div >
    );
}




export default AddUser;