import React, {Component} from "react";
import {Alert, Button, Form, Input, message, Modal, Space, Tree} from "antd";
import {RuleObject} from "antd/es/form";
import {getAllPermission} from "../../api/permission";
import {FormInstance} from "antd/lib/form";
import {addRole} from "../../api/role";


interface IPermission {
    id: number
    key: number
    isMenu: number
    parentId: number
    path: string
    title: string
    children: IPermission[]
}

interface IPermissionState {
    nodeList: IPermission[]
    visible: boolean
}

interface IProps {
    refresh: () => void
}

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class RoleAdd extends Component<IProps, IPermissionState> {
    formRef = React.createRef<FormInstance>();

    state = {
        nodeList: [],
        visible: false
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    cancel = () => {
        this.setState({
            visible: false
        })
        // @ts-ignore
        this.formRef.current.resetFields()
    }
    ok = () => {
        this.setState({
            visible: false
        })
    }
    addRole = (values: any) => {
        addRole(values).then(response => {
            const {code, msg} = response.data
            if (code === 1) {
                message.error(msg)
            } else {
                message.success(msg)
                this.setState({
                    visible: false
                })
                // @ts-ignore
                this.formRef.current.resetFields()
                this.props.refresh()
            }
        })
    }
    error = (error: any) => {
    }
    generatePermissionList = (permissionList: IPermission[], parentId: number = 0): IPermission[] => {
        let pl: IPermission[] = []
        permissionList.forEach((permission: IPermission) => {
            if (permission.parentId === parentId) {
                permission.key = permission.id
                permission.children = this.generatePermissionList(permissionList, permission.id)
                pl.push(permission)
            }
        })
        return pl
    }
    loadPermissionList = () => {
        getAllPermission().then(response => {
            const {data} = response.data
            this.setState({
                nodeList: this.generatePermissionList(data)
            })
        })
    }

    selectPermission = (checkedKeys: any, info: any) => {
        // @ts-ignore
        this.formRef.current.setFieldsValue({
            permissionList: checkedKeys.checked
        })
    };

    componentDidMount() {
        this.loadPermissionList()
    }


    render() {
        return (
            <>
                <Button type='primary' onClick={this.showModal}>????????????</Button>
                <Modal
                    title={'????????????'}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.cancel}
                    onOk={this.ok}
                >
                    <Form
                        ref={this.formRef}
                        initialValues={{roleName: '', permissionList: []}}
                        onFinish={this.addRole}
                        onFinishFailed={this.error}
                    >
                        <Form.Item
                            hasFeedback
                            rules={[
                                {
                                    min: 2,
                                    max: 16,
                                    required: true,
                                    type: "string",
                                    validator: (rule: RuleObject, value) => {

                                        if (value === '') {
                                            return Promise.reject('???????????????????????????');
                                        }
                                        // @ts-ignore
                                        if (value.length < rule.min) {
                                            return Promise.reject(`????????????????????????????????????${rule.min}???`);
                                        }
                                        // @ts-ignore
                                        if (value.length > rule.max) {
                                            return Promise.reject(`????????????????????????????????????${rule.max}???`);
                                        }

                                        return Promise.resolve()
                                    }
                                }
                            ]}
                            name={'roleName'}
                            label={'????????????'}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Alert
                                showIcon
                                message="??????????????????????????????????????????????????????????????????????????????"
                                type="warning"/>
                        </Form.Item>
                        <Form.Item
                            label={'????????????'}
                            name='permissionList'
                            rules={[
                                {
                                    type: "array",
                                    min: 1,
                                    required: true,
                                    validator: (rule, value) => {
                                        if (value.length <= 0) {
                                            return Promise.reject('??????????????????????????????')
                                        }
                                        return Promise.resolve()
                                    }
                                },

                            ]}
                        >
                            <Tree
                                defaultExpandAll
                                checkStrictly
                                showLine
                                checkable
                                onCheck={this.selectPermission}
                                treeData={this.state.nodeList}
                            />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button type={'primary'} htmlType={'submit'}>
                                    ??????
                                </Button>
                                <Button type={'primary'} htmlType={'reset'}>
                                    ??????
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default RoleAdd