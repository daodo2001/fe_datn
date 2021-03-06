import React, { useState } from "react";
import { Upload, notification, Card, Form, Input, Button, InputNumber, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from '../../../services/api'

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

const { Option } = Select;
function CreateTypeRoom() {
    const [form] = Form.useForm();
    const [listFile, setListFile] = useState([])
    const [typeRoom, setTypeRoom] = useState({})

    const formValue = {
        name: "",
        status: "",
        description: "",
        price: 0,
        size: 0,
        capacity: 0
    }

    const handleChange = ({ fileList }) => {
        setListFile(fileList)
    };


    const onChange = (event) => {
        const target = event.target;
        let name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;
        setTypeRoom({ ...typeRoom, [name]: value })
    };

    const resetForm = () => {
        setTypeRoom(formValue)
    }

    function insert() {
        var data = new FormData();
        data.append("typeRoom", JSON.stringify(typeRoom))
        for (let i = 0; i < listFile.length; i++) {
            data.append('file', listFile[i].originFileObj);
        }

        var config = {
            method: 'post',
            url: '/owner/typerooms/image_type_room',
            headers: {
                "content-type": "multipart/form-data",
            },
            data: data
        };
        api(config).then(res => {
            resetForm();
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err.response);
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    const onFinish = () => {
        insert();
        form.resetFields();
    };

    const [componentSize] = useState('default');

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="!#">Admin</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Qu???n l?? lo???i ph??ng
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Th??m lo???i ph??ng
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Th??m lo???i ph??ng
            </h3>
            <Card className="main-container">
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >

                    <Form.Item label="T??n lo???i ph??ng" name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Kh??ng ???????c b??? tr???ng t??n lo???i ph??ng!',
                            },
                        ]}>
                        <Input name="name" onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="Tr???ng th??i" name="trangThai"
                        rules={[
                            {
                                required: true,
                                message: 'Kh??ng ???????c b??? tr???ng th??nh ph???!',
                            },
                        ]}>
                        <Select name="id_hotel" onChange={(value) => setTypeRoom({ ...typeRoom, status: value })} placeholder="Ch???n tr???ng th??i">

                            <Option value="Ho???t ?????ng">Ho???t ?????ng</Option>
                            <Option value="Kh??ng ho???t ?????ng">Kh??ng ho???t ?????ng</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item label="M?? t??? lo???i ph??ng" name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Kh??ng ???????c b??? tr???ng m?? t??? lo???i ph??ng!',
                            },
                        ]}>
                        <Input name="description" onChange={onChange} />
                    </Form.Item>

                    <Form.Item label="Gi??" name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Kh??ng ???????c b??? tr???ng gi?? lo???i ph??ng!',
                            },
                        ]}>
                        <InputNumber min={0} name="price" onChange={(value) => setTypeRoom({ ...typeRoom, price: value })} />
                    </Form.Item>

                    <Form.Item label="S??? l?????ng ng?????i " name="capacity"
                        rules={[
                            {
                                required: true,
                                message: 'Kh??ng ???????c b??? tr???ng s??? l?????ng ng?????i!',
                            },
                        ]}>
                        <InputNumber min={1} name="capacity" onChange={(value) => setTypeRoom({ ...typeRoom, capacity: value })} />
                    </Form.Item>

                    <Form.Item label="K??ch th?????ng " name="kichThuoc"
                        rules={[
                            {
                                required: true,
                                message: 'Kh??ng ???????c b??? tr???ng k??ch th?????c lo???i ph??ng!',
                            },
                        ]}>
                        <InputNumber min={1} max={50} name="size" onChange={(value) => setTypeRoom({ ...typeRoom, size: value })} />
                    </Form.Item>

                    <Form.Item label="???nh lo???i ph??ng" name="image">
                        <Upload
                            multiple={true}
                            customRequest={dummyRequest}
                            onChange={handleChange}
                            listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button ghost type="primary" htmlType="submit">
                            Th??m lo???i ph??ng
                        </Button>

                    </Form.Item>

                </Form>
            </Card>

        </div>
    );
}

export default CreateTypeRoom;
