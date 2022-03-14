import { Checkbox, Divider, Modal } from "antd";
import React from "react";
const CheckboxGroup = Checkbox.Group;

function OrderDichVu(props) {
  const plainOptions = ["Apple", "Pear", "Orange"];
  const defaultCheckedList = ["Apple", "Orange"];

  const { isModalVisible } = props;
  
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <div>
      <Modal
        border-radius={100}
        width={750}
        title="Order dịch vụ"
          visible={isModalVisible}
        //   onOk={form.submit}
        //   onCancel={handleCancel}
      >
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
        <Divider />
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </Modal>
    </div>
  );
}

export default OrderDichVu;
