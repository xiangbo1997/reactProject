import React, {Component} from 'react'
import {Card, Button, Icon, Table, Modal} from 'antd'
import AddCategoryForm from './add-category-form'
import UpdateCategoryForm from './update-category-form'
import DeleteCategoryForm from './delete-category-form'
import {connect} from 'react-redux';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from '@redux/action-creators'

@connect(
  (state) => ({categories: state.categories}),
  {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory


  }
)
class Category extends Component {

  //定义初始化状态
  state = {
    isShowAddCategoryModal: false,
    isUpdateAddCategoryModal: false,
    category:{},
    isDeleteAddCategoryModal :false
  }
  addCategoryForm = React.createRef()
  updateCategoryForm = React.createRef()
  deleteCategoryForm = React.createRef()
  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',

    },
    {
      title: '操做',
      //dataIndex: 'name',//里面写什么render中的参数就会传什么

      render: (category) => {
        return <div>
          <Button type='link' onClick={this.showUpdateCategoryModal(category)}> 修改分类</Button>
          <Button type='link' onClick={this.showDeleteCategoryModal(category)}> 删除分类</Button>
        </div>

      },
    },
  ];

  componentDidMount() {
    this.props.getCategories()
  }
  showDeleteCategoryModal = (category)=>{
    console.log(category)
         return ()=>{
           this.setState({
             isDeleteAddCategoryModal: true,
             category
           })
          console.log(this.state)
              }
       }
  showUpdateCategoryModal = (category) => {
    return () => {
      this.setState({
        isUpdateAddCategoryModal: true,
        category
      })
    }
  }
  //根据传入的值改变状态
  switchModal = (typeCategory, bool) => {
    return () => {
      this.setState({
        [typeCategory]: bool
      })
    }
  };
  //点击弹框确认按钮需的逻辑
  addCategory = () => {

    const form = this.addCategoryForm.current;

    form.validateFields((err, values) => {
      if (!err) {
        // 表单校验通过
        this.props.addCategory(values.categoryName);
        // 清空表单
        form.resetFields();
        // 隐藏对话框
        this.setState({
          isShowAddCategoryModal: false
        })
      }
    })
  }
  updateCategory = ()=>{
    const form = this.updateCategoryForm.current;

    form.validateFields((err, values) => {
      if (!err) {
        // 表单校验通过
        this.props.updateCategory(this.state.category._id, values.categoryName);
        // 清空表单
        form.resetFields();
        // 隐藏对话框
        this.setState({
          isUpdateAddCategoryModal: false
        })
      }
    })
       }
  deleteCategory = ()=>{
    console.log(this.state.category._id)
    this.props.deleteCategory(this.state.category._id)
    this.setState({
      isDeleteAddCategoryModal: false,
    })

       }

  render() {
    /*        const columns = [
                {
                    title: '品类名称',
                    dataIndex: 'name',

                },
                {
                    title: '操做',
                    dataIndex: 'money',
                    render: () => {
                        return <div>
                            <Button type='link'> 修改分类</Button>
                            <Button type='link'> 删除分类</Button>
                        </div>

                    },
                },
            ];*/

    /* const data = [
         {
             key: '1',
             name: 'John Brown',

         },
         {
             key: '2',
             name: 'Jim Green',


         },
         {
             key: '3',
             name: 'Joe Black',
         },
         {
             key: '4',
             name: 'Joe Black',
         },
     ];*/
    const {categories} = this.props;
    const {
      isShowAddCategoryModal,
      isUpdateAddCategoryModal,
      category,
      isDeleteAddCategoryModal
    } = this.state
    return (
      <Card title="分类列表"
            extra={
              <Button type='primary' onClick={this.switchModal('isShowAddCategoryModal', true)}><Icon type='plus'/>分类列表</Button>}>
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            defaultPageSize: 3,

          }}
          rowKey="_id"


        />
        {/*添加的对话框*/}
        <Modal
          visible={isShowAddCategoryModal}
          title='添加分类'
          onOk={this.addCategory}
          okText='确认'
          cancelText='取消'
          width={300}
          onCancel={this.switchModal('isShowAddCategoryModal', true)}

        >
          <AddCategoryForm ref={this.addCategoryForm}/>
        </Modal>
        {/*修改的对话框*/}
        <Modal
          visible={isUpdateAddCategoryModal}
          title='修改分类'
          onOk={this.updateCategory}
          okText='确认'
          cancelText='取消'
          width={300}
          onCancel={this.switchModal('isUpdateAddCategoryModal', false)}

        >
          <UpdateCategoryForm ref={this.updateCategoryForm} categoryName={category.name}/>
        </Modal>
        {/*删除的对话框*/}
        <Modal
          visible={isDeleteAddCategoryModal}
          title='修改分类'
          onOk={this.deleteCategory}
          okText='确认'
          cancelText='取消'
          width={300}
          onCancel={this.switchModal('isDeleteAddCategoryModal', false)}

        >
          <DeleteCategoryForm ref={this.deleteCategoryForm} />
        </Modal>
      </Card>

    )
  }
}

export default Category