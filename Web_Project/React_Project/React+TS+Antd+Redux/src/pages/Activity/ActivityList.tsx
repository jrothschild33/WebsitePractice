import React, {Component} from "react";
import {getActivityList} from "../../api/activity";
import {Button, Space, Table} from "antd";

interface IActivity {
    title: string
    description: string
    startDate: string
    endDate: string
}

interface IState {
    activityList: IActivity[]
    pageSize: number
    page: number
    perPage: number
    totalCount: number
    visible: boolean
    loading?: boolean
}

export default class ActivityList extends Component<any, IState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            activityList: [],
            page: 1,
            perPage: 15,
            totalCount: 0,
            pageSize: 0,
            visible: false,
            loading: false
        }
    }

    getActivityList = (page: number = 1) => {
        getActivityList(page).then(response => {
            const {data: {currentPage, dataList, totalCount, limit}} = response.data
            this.setState({
                page: currentPage,
                activityList: dataList,
                totalCount: totalCount,
                pageSize: limit
            })
        })
    }

    componentDidMount() {
        this.getActivityList()
    }

    onChange = (page: number) => {
        this.getActivityList(page)
    }

    render() {
        return (
            <>
                <Table
                    pagination={{
                        position: ['bottomCenter'],
                        total: this.state.totalCount,
                        hideOnSinglePage: true,
                        defaultCurrent: this.state.page,
                        defaultPageSize: this.state.perPage,
                        showSizeChanger: false,
                        onChange: this.onChange
                    }}
                    dataSource={this.state.activityList}
                    rowKey='id'
                    loading={this.state.loading}
                >
                    <Table.Column
                        dataIndex='id'
                        title='ID'/>

                    <Table.Column
                        dataIndex='title'
                        title='??????'/>
                    <Table.Column
                        dataIndex='description'
                        title='??????'/>
                    <Table.Column
                        dataIndex='startDate'
                        title='????????????'/>
                    <Table.Column
                        dataIndex='endDate'
                        title='????????????'/>
                    <Table.Column
                        render={(activity: IActivity) => (
                            <Space>
                                <Button type='primary'>??????</Button>
                                <Button type='primary' danger>??????</Button>
                            </Space>
                        )}
                        title='??????'/>

                </Table>
            </>
        )
    }

}
