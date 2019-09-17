import React, {Component} from 'react';
import {Form,Input} from 'antd';


@Form.create()
class DeleteCategoryForm extends Component {

  render() {
    return <div>您确定删除吗</div>
  }
}

export default DeleteCategoryForm