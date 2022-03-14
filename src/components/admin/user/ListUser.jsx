
import { Popconfirm, Table, Switch, notification, Row, Col, Form, Input, Select, Tag, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import api from "../../../services/api";
import ModalChuyenCoSo from "./ModalChuyenCoSo";

const user = "Tài khoản người dùng";
const staff = "Tài khoản nhân viên";
const ROLE_USER = "ROLE_USER";
const ROLE_STAFF = "ROLE_STAFF";
const { Option } = Select;
function ListUser(props) {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState({
        role_name: "ROLE_USER",
    });
    const [hotel, setHotel] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [componentSize] = useState('default');
    const [form] = Form.useForm();
    const msgLockUser = `Bạn có chắc muốn khóa tài khoản  `;
    const msgOpenUser = `Bạn có muốn mở lại tài khoản này `;
    const typingTimeoutref = useRef(null);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const getUsers = () => {
            const config = {
                params: {
                    role_name: filter.role_name,
                },
            };
            api.get("/owner/user", config).then((res) => {
                console.log(res);
                if (res.data !== null) {
                    setUsers(res.data.data);
                } else {
                    console.log(res.message);
                }
            })
                .catch((err) => {
                    console.log(err);
                });
        }
        getUsers();

    }, [filter]);

    const onSearch = (event) => {
        const target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;

        if (typingTimeoutref.current) {
            clearTimeout(typingTimeoutref.current);
        }

        typingTimeoutref.current = setTimeout(() => {
            setKeyword(value);
        }, 300);
    };

    var newUsers = null;
    if (Array.isArray(users)) {
        newUsers = [...users];
    }
    if (keyword) {
        newUsers = newUsers.filter((user) => {
            return (
                user.username.toLowerCase().indexOf(keyword.toLowerCase()) !==
                -1
            );
        });
    }

    const getImage = (image) => {
        if (image) {
            return `http://localhost:8080/api/rest/files/image_user/${image}`
        }

    }

    function confirm(item) {
        const url = "/owner/user"
        api.put(`${url}/${item.id}`).then((res) => {
            console.log(res);
            const indexToUpdate = users.findIndex(
                (user) => user.id === item.id
            );
            const updatedUsers = [...users]; // creates a copy of the array

            updatedUsers[indexToUpdate].enabled =
                res.data.data.enabled
            setUsers(updatedUsers);
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            notification["error"]({
                message: err.response.data.message,
            });
        });
    }

    const showModal = (event, record) => {
        setHotel(record)
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img width="100px" src={getImage(image)} alt="" />
        },
        {
            title: 'Tên',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Họ Đệm',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Cơ sở đang làm việc',
            dataIndex: 'nameHotel',
            key: `nameHotel`,
            hidden: filter.role_name === ROLE_USER,
            render: nameHotel => {
                let color = "";
                if (nameHotel === "Cơ sở 1") {
                    color = 'geekblue'
                } else if (nameHotel === "Cơ sở 2") {
                    color = 'green'
                }
                else if (nameHotel === "Cơ sở 3") {
                    color = 'red'
                }
                else if (nameHotel === "Cơ sở 4") {
                    color = 'cyan'
                } else {
                    color = 'purple'
                }
                return (
                    <Tag color={color} key={nameHotel}>
                        {nameHotel !== null ? nameHotel.toUpperCase() : ""}
                    </Tag>
                )
            }
        },
        {
            title: 'Tên tài khoản',
            key: 'username',
            dataIndex: 'username',
        },
        {
            title: 'Trạng thái',
            key: 'enabled',
            dataIndex: 'enabled',
            render: (enabled, record) => (
                <Popconfirm placement="right" title={record.enabled === 1 ? `${msgLockUser} ${record.username}` : `${msgOpenUser} ${record.username}`} onConfirm={() => confirm(record)} okText="Yes" cancelText="No">
                    <Switch checkedChildren="Khóa" unCheckedChildren="Mở" checked={enabled} ></Switch>
                </Popconfirm>
            )
        },
        {
            title: 'Action',
            dataIndex: 'nameHotel',
            key: 'nameHotel',
            render: (nameHotel, record, index) =>
            (
                <Button type="ghost" onClick={(event) => showModal(event, record)} >
                    Chuyển cơ sở {record.username}
                </Button>
            ),
            hidden: filter.role_name === ROLE_USER
        },

    ].filter(item => !item.hidden);

    return (
        <div >
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý tài khoản
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        danh sách tài khoản
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                {filter.role_name === ROLE_USER ? user : staff}
            </h3>
            <hr />
            <div>

                <ModalChuyenCoSo
                    hotel={hotel}
                    setIsModalVisible={setIsModalVisible}
                    isModalVisible={isModalVisible}
                    users={users}
                    setUsers={setUsers} />

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
                    // onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={16} key={1}>
                            <Form.Item label="Tìm kiếm" name="username"
                            >
                                <Input name="username" onChange={onSearch} value={keyword} placeholder="Nhập tên tài khoản muốn tìm" />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={2}>
                            <Form.Item label="Danh sách tài khoản">
                                <Select
                                    defaultValue={filter.role_name}
                                    name="roleName"
                                    onChange={(roleName) => {
                                        if (filter.role_name !== roleName) {
                                            setFilter({ ...filter, role_name: roleName });
                                        }
                                    }} placeholder="Danh sách tài khoản">
                                    <Option value={ROLE_STAFF}>Tài khoản nhân viên</Option>
                                    <Option value={ROLE_USER}>Tài khoản người dùng</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Table columns={columns} dataSource={newUsers} />

            </div>
        </div>
    );
}

export default ListUser;
