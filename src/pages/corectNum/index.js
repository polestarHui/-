import React, { useState } from 'react';
import style from './style.less';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { history } from 'umi';

const originData = [
  {
    key: 0,
    name: 'A计算区面积(㎡)',
    num: 2000,
  },
  {
    key: 1,
    name: 'd热储厚度(m)',
    num: 159,
  },
  {
    key: 2,
    name: 'ρr热储岩石密度(kg/m³)',
    num: 557,
  },
  {
    key: 3,
    name: 'Cr热储岩石比热(J/kg)',
    num: 110,
  },
  {
    key: 4,
    name: 'α热储岩石的空隙度',
    num: 49,
  },
  {
    key: 5,
    name: 'tr热储温度(℃)',
    num: 72,
  },
  {
    key: 6,
    name: 'ρw地热水密度(kg/m³)',
    num: 25,
  },
  {
    key: 7,
    name: 'S导水系数',
    num: 43,
  },
  {
    key: 8,
    name: 'H计算起始点以上的高度(m)',
    num: 67,
  },
  {
    key: 9,
    name: 'Cw水的比热(J/kg)',
    num: 20,
  },
];

// for (let i = 0; i < 10; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `参数名称 ${i}`,
//     age: i,
//     address: `位置参数 ${i}`,
//   });
// }

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    console.log('这是点击不同页数的事件');
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '参数名称',
      dataIndex: 'name',
      width: '35%',
      editable: true,
    },
    {
      title: '参数',
      dataIndex: 'num',
      width: '35%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="确定取消吗?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </a>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          position: ['bottomCenter'],
        }}
      />
    </Form>
  );
};
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div
          onClick={() => {
            history.goBack();
          }}
          className={style.returnBack}
        >
          返回
        </div>
        <EditableTable />
      </div>
    );
  }
}
