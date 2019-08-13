import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  Button, Divider, Tooltip, Icon, Input, Dropdown, Menu, Breadcrumb,
} from 'choerodon-ui';
import { stores, Permission, axios } from '@choerodon/boot';
import './DocHeaser.scss';

const { AppState } = stores;

@observer
class DocHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      newTitle: false,
    };
  }

  handleClickTitle = () => {
    this.setState({
      edit: true,
    });
  };

  handleCancel = () => {
    this.setState({
      edit: false,
      newTitle: false,
    });
  };

  handleTitleChange = (e) => {
    this.setState({
      newTitle: e.target.value,
    });
  };

  handleSubmit = () => {
    const { newTitle } = this.state;
    const { onTitleEdit } = this.props;
    if (newTitle && newTitle.trim() && onTitleEdit) {
      onTitleEdit(newTitle);
    }
    this.handleCancel();
  };

  handleBreadcrumbClick = (id) => {
    const { onBreadcrumbClick } = this.props;
    if (onBreadcrumbClick) {
      onBreadcrumbClick(id);
    }
  };

  renderBreadcrumb = () => {
    const { data, spaceData } = this.props;
    const breadcrumb = [];
    const parentIds = data.route && data.route.split('.').filter(item => spaceData.items[Number(item)]);
    if (parentIds.length && parentIds.length > 3) {
      breadcrumb.push(
        <Breadcrumb.Item key={parentIds[0]}>
          <span
            className="c7n-docHeader-breadcrumb-item"
            onClick={() => this.handleBreadcrumbClick(Number(parentIds[0]))}
          >
            {spaceData.items[Number(parentIds[0])].data.title}
          </span>
        </Breadcrumb.Item>,
      );
      breadcrumb.push(
        <Breadcrumb.Item key={parentIds[1]}>
          <span
            className="c7n-docHeader-breadcrumb-item"
            onClick={() => this.handleBreadcrumbClick(Number(parentIds[1]))}
          >
            {spaceData.items[Number(parentIds[1])].data.title}
          </span>
        </Breadcrumb.Item>,
      );
      breadcrumb.push(
        <Breadcrumb.Item key="more">
          <span className="c7n-docHeader-breadcrumb-item c7n-docHeader-breadcrumb-more">...</span>
        </Breadcrumb.Item>,
      );
      breadcrumb.push(
        <Breadcrumb.Item key={parentIds[parentIds.length - 1]}>
          <span
            className="c7n-docHeader-breadcrumb-item"
            onClick={() => this.handleBreadcrumbClick(Number(parentIds[parentIds.length - 1]))}
          >
            {spaceData.items[Number(parentIds[parentIds.length - 1])].data.title}
          </span>
        </Breadcrumb.Item>,
      );
    } else {
      parentIds.forEach((item) => {
        breadcrumb.push(
          <Breadcrumb.Item key={item}>
            <span
              className="c7n-docHeader-breadcrumb-item"
              onClick={() => this.handleBreadcrumbClick(Number(item))}
            >
              {spaceData.items[Number(item)] && spaceData.items[Number(item)].data.title}
            </span>
          </Breadcrumb.Item>,
        );
      });
    }
    return breadcrumb;
  };

  handleCatalogChange = () => {
    const { store } = this.props;
    const { getCatalogVisible: catalogVisible } = store;
    store.setCatalogVisible(!catalogVisible);
  };

  render() {
    const { store, onBtnClick, breadcrumb = true } = this.props;
    const { getCatalogVisible: catalogVisible } = store;

    return (
      <div className="c7n-docHeader">
        <div className="c7n-docHeader-left">
          {breadcrumb
            ? (
              <div className="c7n-docHeader-breadcrumb">
                <Breadcrumb separator=">">
                  {this.renderBreadcrumb()}
                </Breadcrumb>
              </div>
            ) : null
          }
        </div>
        <div className="c7n-docHeader-right">
          <span className="c7n-docHeader-control">
            <Tooltip placement="top" title={<FormattedMessage id="docHeader.catalog" />}>
              <Button shape="circle" size="small" onClick={this.handleCatalogChange}>
                <i className={`icon icon-${catalogVisible ? 'format_indent_increase' : 'format_indent_decrease'}`} />
              </Button>
            </Tooltip>
          </span>
        </div>
      </div>
    );
  }
}
export default withRouter(injectIntl(DocHeader));