import { Form, Modal, notification, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import api from "../../../services/api";
const { Option } = Select;
function ModalChuyenCoSo(props) {
    const { isModalVisible, setIsModalVisible, users, setUsers, hotel } = props;
    const [hotels, setHotels] = useState([])
    const [form] = Form.useForm();
    const [idHotel, setIdHotel] = useState(1);

    useEffect(() => {
        const getHotels = () => {
            api.get("/owner/hotels").then((res) => {
                if (res.data !== null) {
                    setHotels(res.data.data);
                } else {
                    console.log(res.message);
                }
            })
                .catch((err) => {
                    console.log(err);
                });
        }
        getHotels();
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            hotel: hotel.nameHotel
        })
    }, [hotel, form])

    function updateHotel() {

        const idUser = hotel.id;
        var config = {
            method: 'put',
            url: `/owner/user/${idUser}/${idHotel}`,
        };
        api(config).then(res => {
            const indexToUpdate = users.findIndex(
                (user) => user.id === idUser
            );
            const updatedUsers = [...users]; // creates a copy of the array

            updatedUsers[indexToUpdate].idHotel = res.data.data.idHotel
            updatedUsers[indexToUpdate].nameHotel = res.data.data.nameHotel
            setUsers(updatedUsers);
            notification["success"]({
                message: res.data.message,
            });
            if (res.status === 200) {
                setIsModalVisible(false)
            }
        }).catch(err => {
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    const onFinish = () => {
        updateHotel();
    }

    return (
        <Modal title="Chuyển cơ sở" visible={isModalVisible} onOk={form.submit} onCancel={() => setIsModalVisible(false)}>

            <Form form={form} onFinish={onFinish}>
                <Form.Item label="Cơ sở " name="hotel">
                    <Select
                        name="coso"
                        onChange={(value) => {
                            setIdHotel(value)
                        }}
                        placeholder="Danh sách cơ sở">
                        {hotels.map((item, index) => (
                            <Option key={index} value={item.id}>{item.name}</Option>
                        ))}

                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalChuyenCoSo;