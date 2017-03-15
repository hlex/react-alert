import React, { PropTypes } from 'react';

class ReactAlertMessage extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.shape({
      th: PropTypes.string,
      en: PropTypes.string,
      technical: PropTypes.string,
    }).isRequired,
    textOnButton: PropTypes.string,
    trxId: PropTypes.string,
    processInstance: PropTypes.string,
    textOnButtonShow: PropTypes.string,
    textOnButtonHide: PropTypes.string,
    closeAlertMessage: PropTypes.func.isRequired,
  };
  static defaultProps = {
    open: true,
    type: 'ERROR',
    trxId: 'please send "trxId" props',
    message: {
      th: 'กรุณาระบุข้อความภาษาไทยใน message.th',
      en: 'please define english message in message.en',
      technical: 'กรุณาระบุข้อความเทคนิค ใน message.technical',
    },
    textOnButtonShow: 'Hide',
    textOnButtonHide: 'Show',
    processInstance: 'please send "processInstance" props',
    closeAlertMessage: () => alert('please set your function in "closeAlertMessage" props'),
  }
  state = {
    showDetail: false,
  };
  handleToggleDetail = () => {
    this.setState({
      showDetail: !this.state.showDetail,
    });
  }
  handleClickCloseButton = (e) => {
    const { closeAlertMessage } = this.props;
    e.preventDefault();
    closeAlertMessage();
  }
  renderIcon = (type) => {
    let icon = '';
    switch (type) {
      case 'ERROR':
        icon = <i className="fa fa-exclamation-circle" />;
        break;
      case 'LOADING':
        icon = <span className="loading loading-style-normal red" />;
        break;
      case 'SUCCESS':
        icon = <i className="fa fa-check-circle" />;
        break;
      case 'WARNING':
        icon = <i className="fa fa-exclamation-triangle" />;
        break;
      default:
        icon = '';
        break;
    }
    return icon;
  }
  render() {
    const { showDetail } = this.state;
    const { open, type, trxId, processInstance, message: { th, en, technical }, textOnButtonShow, textOnButtonHide } = this.props;
    const showBottom = type === 'ERROR' || type === 'WARNING';
    return (
      <div className={`react-alert-message ${type}`}>
        <div className={`box-alert-message ${open ? 'show' : ''}`}>
          <a onClick={this.handleClickCloseButton} className="close" />
          <div className="detail">
            <span className="headline">{this.renderIcon(type)} {type}</span>
            <hr />
            <div className="subheadline">
              <div className="message"><div className="title">EN</div>{`${en}`}</div>
              <div className="message"><div className="title">TH</div>{`${th}`}</div>
            </div>
            {
              showBottom &&
              <div className="bottom">
                <span>{`trx-id = ${trxId}, process-instance = ${processInstance}`}</span>
                <button className="button" onClick={this.handleToggleDetail}>
                  <span className={`icon ${showDetail ? 'arrow-up' : 'arrow-down'}`}></span>
                  {
                    showDetail ? textOnButtonShow : textOnButtonHide
                  }
                </button>
              </div>
            }
          </div>
          {
            showDetail &&
              <div className="more-detail content">
                <p>{`${technical}`}</p>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default ReactAlertMessage;
