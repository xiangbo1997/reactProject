import React, {Component} from 'react';
import {Form,Input} from 'antd';


@Form.create()
class UpdateCategoryForm extends Component {

  render() {
    const categoryName=this.props.categoryName
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <Form.Item >
          {
            getFieldDecorator(
              'categoryName', {
                rules: [
                  { required: true, message: '请输入分类名称~' }
                ],
                initialValue: categoryName // 没有值时生效
              }
            )(
              <Input />
            )
          }
        </Form.Item>
      </Form>

    )
  }
}

export default UpdateCategoryForm