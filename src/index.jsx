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
    trxId: PropTypes.string,
    processInstance: PropTypes.string,
    closeAlertMessage: PropTypes.func.isRequired,
  };
  static defaultProps = {
    open: true,
    type: 'ERROR',
    trxId: 'undefined',
    message: {
      th: 'undefined',
      en: 'undefined',
      technical: 'undefined',
    },
    processInstance: 'local',
    closeAlertMessage: () => alert('please set your closeAlertMessage function'),
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
      case 'LOADING':
        icon = <span className="loading loading-style-normal red" />;
        break;
      case 'SUCCESS':
        icon = <i className="fa fa-check" />;
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
    const { open, type, trxId, processInstance, message } = this.props;
    console.log('BetterAlertMessage', this.props);
    const showBottom = type === 'ERROR' || type === 'WARNING';
    return (
      <div className={`react-alert-message ${type}`}>
        <div className={`box-alert-message animated ${open ? 'fadeInDown' : 'fadeOutUp'}`}>
          <a onClick={this.handleClickCloseButton} className="close" />
          <div className="detail">
            <span className="headline">{this.renderIcon(type)} {type}</span>
            <hr />
            <div className="subheadline">
              <div className="message"><div className="title">EN</div>{`${message.en}`}</div>
              <div className="message"><div className="title">TH</div>{`${message.th}`}</div>
            </div>
            {
              showBottom &&
              <div className="bottom">
                <span>{`trx-id = ${trxId}, process-instance = ${processInstance}`}</span>
                <button className="button" onClick={this.handleToggleDetail}>
                  <span className={`${showDetail ? 'arrow-up' : 'arrow-down'}`}></span>
                  Technical Message
                </button>
              </div>
            }
          </div>
          {
            showDetail &&
              <div className="more-detail content">
                <p>{`${message.technical}`}</p>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default ReactAlertMessage;
