import React, { Component } from 'react';
import { Dialog, Select } from '@icedesign/base';
import { Input, Button, Tab, Grid, Checkbox, Collapse, Message, Icon, Balloon, Divider } from '@alifd/next';
import * as oexchain from 'oex-web3';
import * as ethers from 'ethers';
import cookie from 'react-cookies';
import BigNumber from 'bignumber.js';

import * as utils from '../../utils/utils';
import * as Notification from '../../utils/notification';
import { T } from '../../utils/lang';
import * as Constant from '../../utils/constant';
import './style.scss';

const { Row, Col } = Grid;
// const oexLogo = 
const oexToken = require('./images/oexToken.png');
const otherToken = require('./images/otherToken.png');

const toleranceData = [
  {label: '0.1%', value: 1},
  {label: '0.2%', value: 2},
  {label: '1%', value: 10},
  {label: '2%', value: 20},
  {label: '自定义', value: 0}
];

const assetData = [
  {label: 'OEX', value: 0}
];

export default class OexSwap extends Component {
  static displayName = 'OexSwap';

  constructor(props) {
    super(props);
    const account = utils.getDataFromFile(Constant.AccountObj);
    this.state = {
       account,
       accountName: account.accountName,
       fromInfo: {value: '', maxValue: 0, selectAssetTip: '选择资产', selectAssetInfo: null, tmpSelectAssetInfo: null},
       toInfo: {value: '', maxValue: 0, selectAssetTip: '选择资产', selectAssetInfo: null, tmpSelectAssetInfo: null},       
       assetList: [],
       assetSelectorDialogVisible: false,
       assetDisplayList: [],
       isFromAsset: true,
       pairList: [],
       pairMap: {},
       feeRate: 0,
       curPairInfo: {myPercent: 0},
       contractName: 'x77c3647558c',
       liquidToBeRemoved: 0,
       maxLiquidTip: '最多可移除的流动性数量:',
       txInfoVisible: false,
       sysTokenID: 0,
       myKeystore: null,
       suggestionPrice: 0,
       callbackFunc: null,
       selectedTolerance: 1,
       toleranceInputEnable: false,
       inputTolerance: 0,
       gasPrice: 100,
       gasLimit: 1000000,
       pairAssetInfo: '',
       password: '',
       bLiquidOp: false
     };
  }

  componentDidMount = async () => {
    fetch("https://api.oexchain.com/api/rpc/gettokens?pageIndex=0&pageSize=20&stats=10").then(response => {
      return response.json();
    }).then(tokensInfo => {
      if (tokensInfo != null && tokensInfo.data != null) {
        const assetList = tokensInfo.data.list;
        const assetDisplayList = this.getAssetDisplayInfo(assetList);
        this.setState({assetList, assetDisplayList});
      }
    });
    let nodeInfo = cookie.load('nodeInfo');
    await oexchain.utils.setProvider(nodeInfo);
    this.getAllPair();
    this.getFeeRate();
    this.state.myKeystore = utils.getDataFromFile(Constant.KeyStore);
    oexchain.oex.getSuggestionGasPrice().then(gasPrice => {
      this.setState({ suggestionPrice: utils.getReadableNumber(gasPrice, 9, 9) });
    })
  }

  getAllPair = () => {
    const _this = this;
    let payloadInfo = {funcName:'getPairNumber', types:[], values: []};  // types和values即合约方法的参数类型和值
    oexchain.action.readContract(this.state.accountName, this.state.contractName, payloadInfo, 'latest').then(pairNumber => {
      pairNumber = parseInt(pairNumber);
      console.log(pairNumber)
      _this.state.pairList = [];
      _this.state.pairMap = {};
      for (let i = 0; i < pairNumber; i++) {
        _this.getPairByIndex(i).then(pairInfo => {
          pairInfo.index = i;
          _this.state.pairList.push(pairInfo);
          _this.state.pairMap[pairInfo.firstAssetId + '-' + pairInfo.secondAssetId] = pairInfo;
        });
      }
    }).catch(err => console.log(err));
  }

  getFeeRate = () => {
    let payloadInfo = {funcName:'feeRate', types:[], values: []};  // types和values即合约方法的参数类型和值
    oexchain.action.readContract(this.state.accountName, this.state.contractName, payloadInfo, 'latest').then(feeRate => {
      this.setState({feeRate: parseInt(feeRate)});
    }).catch(err => console.log(err));
  }

  getPairByIndex = async (pairIndex) => {
    const payloadInfo = {funcName:'pairList', types:['uint256'], values: [pairIndex]};
    const pairInfo = await oexchain.action.readContract(this.state.accountName, this.state.contractName, payloadInfo, 'latest');
    const pairInfoElements = utils.parseResult(['uint', 'uint', 'uint', 'uint'], pairInfo);
    console.log(pairInfoElements)
    return {firstAssetId: pairInfoElements[0], secondAssetId: pairInfoElements[1], 
            firstAssetNumber: new BigNumber(pairInfoElements[2]), secondAssetNumber: new BigNumber(pairInfoElements[3])};
  }

  getPairByAssetId = async (firstAssetId, secondAssetId) => {
    const payloadInfo = {funcName:'getPair', types:['uint256', 'uint256'], values: [firstAssetId, secondAssetId]};
    var pairInfo = await oexchain.action.readContract(this.state.accountName, this.state.contractName, payloadInfo, 'latest');
    const pairInfoElements = utils.parseResult(['bool', 'uint', 'uint'], pairInfo);
    pairInfo = {};
    pairInfo.exist = pairInfoElements[0];
    pairInfo.index = pairInfoElements[1];
    pairInfo.firstAssetId = pairInfoElements[2];
    return pairInfo;
  }

  getPairTotalLiquid = async (pairIndex) => {
    const payloadInfo = {funcName:'pairTotalLiquidMap', types:['uint256'], values: [pairIndex]};
    const totalLiquid = await oexchain.action.readContract(this.state.accountName, this.state.contractName, payloadInfo, 'latest');
    return new BigNumber(totalLiquid);
  }

  getUserLiquidInPair = async (pairIndex) => {
    const payloadInfo = {funcName:'getUserLiquid', types:['uint256'], values: [pairIndex]};
    const userLiquid = await oexchain.action.readContract(this.state.accountName, this.state.contractName, payloadInfo, 'latest');
    return new BigNumber(userLiquid);
  }

  addLiquidity = (gasInfo, privateKey) => {
    const { fromInfo, toInfo, accountName, contractName } = this.state;
    let actionInfo = {accountName, toAccountName: contractName, assetId: 0, amount: new BigNumber(0), remark: ''}

    const assetInfos = [];
    assetInfos.push([fromInfo.selectAssetInfo.assetid, '0x' + new BigNumber(fromInfo.value).shiftedBy(fromInfo.selectAssetInfo.decimals).toString(16)]);
    assetInfos.push([toInfo.selectAssetInfo.assetid, '0x' + new BigNumber(toInfo.value).shiftedBy(toInfo.selectAssetInfo.decimals).toString(16)]);
    let payloadInfo = {funcName:'addLiquidity', types:[], values: [], assetInfos};

    oexchain.action.executeContractWithMultiAsset(actionInfo, gasInfo, payloadInfo, privateKey).then(txHash => {
      this.checkReceipt(txHash);
      this.setState({txInfoVisible: false});
    });
  }

  removeLiquidity = (gasInfo, privateKey) => {
    const { curPairInfo, liquidToBeRemoved, accountName, contractName } = this.state;
    let actionInfo = {accountName, toAccountName: contractName, assetId: 0, amount: new BigNumber(0), remark: ''}    
    let payloadInfo = {funcName:'removeLiquidity', types:['uint256', 'uint256'], values: [curPairInfo.index, liquidToBeRemoved]}

    oexchain.action.executeContract(actionInfo, gasInfo, payloadInfo, privateKey).then(txHash => {
      this.checkReceipt(txHash);
      this.setState({txInfoVisible: false});
    });
  }

  swapAsset =  (gasInfo, privateKey) => {
    const { fromInfo, toInfo, curPairInfo, selectedTolerance, inputTolerance, accountName, contractName } = this.state;
    let actionInfo = {accountName, toAccountName: contractName, assetId: fromInfo.selectAssetInfo.assetid, 
                      amount: new BigNumber(fromInfo.value).shiftedBy(fromInfo.selectAssetInfo.decimals), remark: ''}

    const tolerance = selectedTolerance > 0 ? selectedTolerance : inputTolerance * 10;            
    const minAmount = '0x' + new BigNumber(toInfo.value).shiftedBy(toInfo.selectAssetInfo.decimals).multipliedBy(1000 - tolerance).dividedBy(1000).toString(16);
    let payloadInfo = {funcName:'exchange', types:['uint256', 'uint256'], values: [curPairInfo.index, minAmount]};

    oexchain.action.executeContract(actionInfo, gasInfo, payloadInfo, privateKey).then(txHash => {
      this.checkReceipt(txHash);
      this.setState({txInfoVisible: false});
    }).catch(error => {
      Notification.displayErrorInfo(error);
    });
  }

  checkReceipt = (txHash) => {
    let count = 0;
    if (txHash != null) {
      Notification.displayTxInfo(txHash);
    }
    const intervalId = setInterval(() => {
      oexchain.oex.getTransactionReceipt(txHash).then(receipt => {
        if (receipt == null) {
          count++;
          if (count == 10) {
            Notification.displayReceiptUnknownInfo(txHash);
            clearInterval(intervalId);
          }
        } else {
          clearInterval(intervalId);
          const actionResults = receipt.actionResults;
          if (actionResults[0].status == 0) {
            Notification.displayReceiptFailInfo(txHash);
          } else {
            Notification.displayReceiptSuccessInfo(txHash);
            this.updateBaseInfo(this.state.fromInfo, this.state.toInfo);
          }
        }
      });
    }, 3000);
  }

  startAddLiquidity = () => {
    const { fromInfo, toInfo } = this.state;
    if (fromInfo.selectAssetInfo == null || fromInfo.value == 0 || toInfo.selectAssetInfo == null || toInfo.value == 0) {
      Notification.displayWarningInfo("请选择资产并输入有效金额");
      return;
    }
    this.setState({callbackFunc: this.addLiquidity, txInfoVisible: true});
  }

  startRemoveLiquidity = () => {
    this.setState({callbackFunc: this.removeLiquidity, txInfoVisible: true});
  }

  startSwapAsset = () => {
    if (!this.isPairNormal()) {
      Notification.displayWarningInfo("交易对尚不存在，无法交易");
      return;
    }
    this.setState({callbackFunc: this.swapAsset, txInfoVisible: true});
  }

  getLiquidOfSecondAsset = async (pairIndex, firstAssetAmount) => {
    const pairInfo = await this.getPairByIndex(pairIndex);
    const neededSecondAssetValue = new BigNumber(firstAssetAmount).multipliedBy(new BigNumber(pairInfo.secondAssetNumber))
                                  .dividedBy(new BigNumber(pairInfo.firstAssetNumber)).plus(1);
    return neededSecondAssetValue;  
  }

  getOutAmount = async (pairIndex, inAmount) => {
    const { fromInfo, toInfo, feeRate } = this.state;
    const pairInfo = await this.getPairByIndex(pairIndex);
    const bFirstAsset = pairInfo.firstAssetId == fromInfo.selectAssetInfo.assetid;
    var outValue;
    var x; 
    var y;
    var k;
    inAmount = new BigNumber(inAmount).shiftedBy(fromInfo.selectAssetInfo.decimals);
    inAmount = inAmount.multipliedBy(1000 - feeRate).dividedBy(1000);
    k = new BigNumber(pairInfo.firstAssetNumber).multipliedBy(new BigNumber(pairInfo.secondAssetNumber));
    x = new BigNumber(bFirstAsset ? pairInfo.firstAssetNumber : pairInfo.secondAssetNumber).plus(inAmount);
    outValue = new BigNumber(bFirstAsset ? pairInfo.secondAssetNumber : pairInfo.firstAssetNumber).minus(k.dividedBy(x));
    return outValue.shiftedBy(toInfo.selectAssetInfo.decimals * -1).toFixed(6);
  }

  assetRender = (item) => {
    return item.assetName + '(' + item.symbol + ')';
  }

  onSelectAssetOK = async () => {
    const { fromInfo, toInfo, account, isFromAsset } = this.state;

    const tmpSelectAssetInfo = isFromAsset ? fromInfo.tmpSelectAssetInfo : toInfo.tmpSelectAssetInfo;
    if (tmpSelectAssetInfo == null) {
      Notification.displayWarningInfo("请选择资产");
      return;
    }
    const balanceInfo = account.balances.find(v => v.assetID == tmpSelectAssetInfo.assetid);
    const amount = balanceInfo != null ? new BigNumber(balanceInfo.balance).shiftedBy(tmpSelectAssetInfo.decimals * -1).toFixed(6) : 0;
    if (isFromAsset) {
      fromInfo.selectAssetInfo = tmpSelectAssetInfo;
      fromInfo.selectAssetTip = tmpSelectAssetInfo.symbol.toUpperCase();
      fromInfo.maxValue = amount;
      this.setState({fromInfo,
                    assetSelectorDialogVisible: false});
    } else {
      toInfo.selectAssetInfo = tmpSelectAssetInfo;
      toInfo.selectAssetTip = tmpSelectAssetInfo.symbol.toUpperCase();
      toInfo.maxValue = amount;
      this.setState({toInfo,
                    assetSelectorDialogVisible: false});
    }
    this.updateBaseInfo(fromInfo, toInfo);
  }

  updateBaseInfo = async (fromInfo, toInfo) => {
    if (fromInfo.selectAssetInfo != null && toInfo.selectAssetInfo != null) {
      const curPairInfo = await this.getPairByAssetId(fromInfo.selectAssetInfo.assetid, toInfo.selectAssetInfo.assetid);
      if (curPairInfo.exist) {
        curPairInfo.index -= 1;
        const totalLiquid = await this.getPairTotalLiquid(curPairInfo.index);
        const userLiquid = await this.getUserLiquidInPair(curPairInfo.index, this.state.account.accountID);
        curPairInfo.totalLiquid = totalLiquid;
        curPairInfo.userLiquid = userLiquid;
        curPairInfo.myPercent = userLiquid.dividedBy(totalLiquid).multipliedBy(100).toFixed(2);

        const pairInfo = await this.getPairByIndex(curPairInfo.index);
        var firstAssetInfo = fromInfo.selectAssetInfo;
        var secondAssetInfo = toInfo.selectAssetInfo;
        if (pairInfo.firstAssetId != firstAssetInfo.assetid) {
          firstAssetInfo = toInfo.selectAssetInfo;
          secondAssetInfo = fromInfo.selectAssetInfo;
        }
        const firstAssetAmount = pairInfo.firstAssetNumber.shiftedBy(firstAssetInfo.decimals * -1).toFixed(6);
        const secondAssetAmount = pairInfo.secondAssetNumber.shiftedBy(secondAssetInfo.decimals * -1).toFixed(6);
        this.state.pairAssetInfo = firstAssetAmount + ' ' + firstAssetInfo.symbol.toUpperCase() 
                                  + ' + ' 
                                  + secondAssetAmount + ' ' + secondAssetInfo.symbol.toUpperCase();
        this.setState({pairAssetInfo: this.state.pairAssetInfo});
      }
      this.setState({curPairInfo});
    }
  }

  getAssetDisplayInfo = (assetList) => {
    const { fromInfo, toInfo, isFromAsset } = this.state;
    const assetDisplayList = assetList.map(assetInfo => {
      const symbol = assetInfo.symbol.toUpperCase();
      var backgroundColor = '#1a1e3e';
      const tmpSelectAssetInfo = isFromAsset ? fromInfo.tmpSelectAssetInfo : toInfo.tmpSelectAssetInfo;
      if (tmpSelectAssetInfo != null && tmpSelectAssetInfo.assetid == assetInfo.assetid) {
        backgroundColor = 'rgba(48, 128, 254, 1)';
      }
      var needBtn = true;
      if (isFromAsset) {
        if (toInfo.selectAssetInfo != null) {
          needBtn = assetInfo.assetid != toInfo.selectAssetInfo.assetid;
        }
      } else {
        if (fromInfo.selectAssetInfo != null) {
          needBtn = assetInfo.assetid != fromInfo.selectAssetInfo.assetid;
        }
      }
      return <div className='assetInfo' style={{backgroundColor}}>
        <Row align='center' style={{marginTop: '15px'}}>
          <img src={assetInfo.assetid == 0 ? oexToken : otherToken} style={{marginRight: '5px'}}/>
          <font color='#fff'>{symbol}</font>
          <font color='#fff'>[id:{assetInfo.assetid}]</font>
        </Row>
        <font color='#fff' style={{marginTop: '10px'}}>{assetInfo.assetName}</font>
        <font color='#fff' style={{marginTop: '10px'}}>持有账户数: {assetInfo.stats}</font>
        {
          needBtn ? <Button type='normal' style={styles.assetBtn} onClick={() => this.clickAsset(assetInfo)}>选择此资产</Button> : ''
        }
      </div>
    });
    return assetDisplayList;
  }

  clickAsset = (assetInfo) => {
    const { fromInfo, toInfo, isFromAsset, assetList } = this.state;
    if (isFromAsset) {
      fromInfo.tmpSelectAssetInfo = assetInfo;
    } else {
      toInfo.tmpSelectAssetInfo = assetInfo;
    }
    const assetDisplayList = this.getAssetDisplayInfo(assetList);
    this.setState({assetDisplayList});
  }

  searchAsset = async () => {
    if (utils.isEmptyObj(this.state.assetContent)) {
      Notification.displayWarningInfo('请输入资产ID或资产全名');
      return;
    }
    var assetList = this.getAssetInfos(this.state.assetContent);
    
    if (assetList.length == 0 || (assetList[0].assetName != this.state.assetContent && assetList[0].assetid != this.state.assetContent)) {
      if (this.state.assetContent.charAt(0) >= 0 && this.state.assetContent.charAt(0) <= 9) {
        try {
          const assetInfo = await oexchain.account.getAssetInfoById(parseInt(this.state.assetContent));     
          assetInfo.assetid = assetInfo.assetId;
          assetList = [assetInfo, ...assetList];   
        } catch (error) {
          Notification.displayWarningInfo('资产不存在');
          return;
        }
      } else {
        try {
          const assetInfo = await oexchain.account.getAssetInfoByName(this.state.assetContent);     
          assetInfo.assetid = assetInfo.assetId;
          assetList = [assetInfo, ...assetList];   
        } catch (error) {
          Notification.displayWarningInfo('资产不存在');
          return;
        }
      }
    }
    
    const assetDisplayList = this.getAssetDisplayInfo(assetList);
    this.setState({assetList, assetDisplayList});
  }

  getAssetInfos = (assetContent) => {
    const { assetList } = this.state;
    const index = assetList.findIndex(assetInfo => (assetInfo.assetid == assetContent) || (assetInfo.assetName == assetContent));
    if (index > -1) {
      const assetInfo = assetList[index];
      return [assetInfo, ...assetList.filter((v, i) => i != index)];
    }
    return assetList;
  }

  selectFromAsset = () => {
    this.state.isFromAsset = true;
    const assetDisplayList = this.getAssetDisplayInfo(this.state.assetList);
    this.setState({assetSelectorDialogVisible: true, assetDisplayList, isFromAsset: this.state.isFromAsset});
  }

  selectToAsset = () => {
    this.state.isFromAsset = false;
    const assetDisplayList = this.getAssetDisplayInfo(this.state.assetList);
    this.setState({assetSelectorDialogVisible: true, assetDisplayList, isFromAsset: this.state.isFromAsset});
  }

  inputMaxFromAmount = () => {
    this.state.fromInfo.value = this.state.fromInfo.maxValue
    this.setState({fromInfo: this.state.fromInfo});
  }

  inputMaxToAmount = () => {
    this.state.toInfo.value = this.state.toInfo.maxValue
    this.setState({toInfo: this.state.toInfo});
  }
  
  swapFromAndTo = () => {
    const fromInfo = this.state.fromInfo;
    const toInfo = this.state.toInfo;
    this.setState({fromInfo: toInfo, toInfo: fromInfo});
  }

  onTxConfirmOK = () => {
    const { fromInfo, toInfo, sysTokenID, myKeystore } = this.state;
    if (this.state.gasPrice == '') {
      Notification.displayWarningInfo(T('请输入GAS单价'));
      return;
    }

    if (this.state.gasLimit == '') {
      Notification.displayWarningInfo(T('请输入愿意支付的最多GAS数量'));
      return;
    }

    if (this.state.password == '') {
      Notification.displayWarningInfo(T('请输入钱包密码'));
      return;
    }

    let curAccountOEXBalance = 0;
    for(const balance of this.state.account.balances) {
      if (balance.assetID == sysTokenID) {
        curAccountOEXBalance = balance.balance;
        break;
      }
    }

    const gasValue = new BigNumber(this.state.gasPrice).multipliedBy(this.state.gasLimit).shiftedBy(9);
    const maxValue = new BigNumber(curAccountOEXBalance);
    if (gasValue.comparedTo(maxValue) > 0) {
      Notification.displayWarningInfo(T('余额不足以支付gas费用'));
      return;
    }
    if (fromInfo.selectAssetInfo.assetid == sysTokenID || toInfo.selectAssetInfo.assetid == sysTokenID) {
      var oexAmount = 0;
      if (fromInfo.selectAssetInfo.assetid == sysTokenID) {
        oexAmount = new BigNumber(fromInfo.selectAssetInfo.value).shiftedBy(18);
      } else {
        oexAmount = new BigNumber(toInfo.selectAssetInfo.value).shiftedBy(18);
      }
      const valueAddGasFee = oexAmount.plus(gasValue);
      if (valueAddGasFee.comparedTo(maxValue) > 0) {
        Notification.displayWarningInfo(T('余额不足'));
        return;
      }
    }

    const gasInfo = {gasPrice: '0x' + new BigNumber(this.state.gasPrice).shiftedBy(9).toString(16), 
                     gasLimit: '0x' + new BigNumber(this.state.gasLimit).toString(16)}

    ethers.Wallet.fromEncryptedJson(JSON.stringify(myKeystore), this.state.password).then(wallet => {
      this.state.callbackFunc(gasInfo, wallet.privateKey);
    });
  }

  changeTolerance = (v) => {
    if (v > 0) {
      this.setState({selectedTolerance: v, toleranceInputEnable: false});
    } else {
      this.setState({toleranceInputEnable: true});
    }
  }

  updateToValue = () => {
    if (this.isPairNormal()) {
      if (!this.state.bLiquidOp) {
        this.getOutAmount(this.state.curPairInfo.index, this.state.fromInfo.value).then(outAmount => {
          //outAmount = new BigNumber(outAmount).shiftedBy(this.state.toInfo.selectAssetInfo.decimals * -1).toString();
          this.state.toInfo.value = outAmount;
          this.setState({toInfo: this.state.toInfo});
        })
      } else {
        
      }
    }
  }

  isPairNormal = () => {
    return this.state.curPairInfo.exist == true;
  }

  onInputRemovedLiquidOK = () => {
    if (this.state.liquidToBeRemoved == null) {
      Notification.displayWarningInfo("请输入流动性数值");
      return;
    }
    if (this.state.liquidToBeRemoved > this.state.curPairInfo.userLiquid) {
      Notification.displayWarningInfo("输入的流动性数值已大于您可移除的上限");
      return;
    }
    this.setState({userRemovedLiquidVisible: false, txInfoVisible: true});
  }

  changeLiquidityOp = (v) => {
    this.setState({bLiquidOp: v});
  }

  render() {
    const fromAmountInput = <div style={styles.amountInfo}>
        <Button size='small' className='maxButton' onClick={() => this.inputMaxFromAmount()}> Max </Button>
        <Button type='primary' size='large' className='assetSelectButton' onClick={() => this.selectFromAsset()}> {this.state.fromInfo.selectAssetTip} <Icon size='small' type='arrow-down'/></Button>
    </div>;
    const toAmountInput = <div style={styles.amountInfo}>
        <Button size='small' className='maxButton' onClick={() => this.inputMaxToAmount()}> Max </Button>
        <Button type='primary' size='large' className='assetSelectButton' onClick={() => this.selectToAsset()}> {this.state.toInfo.selectAssetTip} <Icon size='small' type='arrow-down'/></Button>
    </div>;
    return (
      <div style={{backgroundColor: '#272a2f'}}>
        <Row justify='center' align='center' style={{height: window.innerHeight}}>
          <div style={styles.card1}>
            <div style={styles.card2}>
              <div style={styles.assetAmounInfo}>
                <font color='#fff'>From</font>
                <div>
                  <font color='#fff'>余额:</font>
                  <font color='#fff'>{this.state.fromInfo.maxValue}</font>
                </div>
              </div>
              <div style={{marginTop: '10px'}}>
                <Input size='large' style={styles.input} value={this.state.fromInfo.value}
                  //onChange={(v) => this.changeFromValue.bind(this)}
                  onChange={(v) => {
                    this.state.fromInfo.value = v;
                    this.setState({fromInfo: this.state.fromInfo});
                  }}
                  onBlur={() => this.updateToValue()}
                  innerAfter={fromAmountInput}
                />
              </div>
            </div>   
            <Button text type='primary' style={{marginTop: '20px'}} onClick={() => this.swapFromAndTo()}><Icon type='sorting'></Icon></Button>
            <div style={styles.card2}>
              <div style={styles.assetAmounInfo}>
                <font color='#fff'>To</font>
                <div>
                  <font color='#fff'>余额:</font>
                  <font color='#fff'>{this.state.toInfo.maxValue}</font>
                </div>
              </div>
              <div style={{marginTop: '10px'}}>
                <Input size='large' style={styles.input} value={this.state.toInfo.value}
                  onChange={(v) => {
                    this.state.toInfo.value = v;
                    this.setState({toInfo: this.state.toInfo});
                  }}
                  innerAfter={toAmountInput}
                />
              </div>
              {/* </div> */}
            </div>   
            <Row justify='start' align='center' style={{marginTop: '10px', paddingLeft: '20px', width: '100%'}}>
              <font color='#fff'>可接受的最大滑点:</font>
              <Select dataSource={toleranceData} defaultValue={this.state.selectedTolerance} style={{margin: '0 10px 0 10px', borderRadius:'10px'}} onChange={(v) => this.changeTolerance(v)}></Select>
              <Input disabled={!this.state.toleranceInputEnable} value={this.state.inputTolerance} onChange={v => this.setState({inputTolerance: v})}
                     style={{width: '60px', borderRadius:'10px'}} innerAfter='%'></Input>
            </Row> 
            <Row justify='start' align='center' style={{marginTop: '10px', paddingLeft: '20px', width: '100%'}}>
              <font color='#fff'>兑换手续费: {this.state.feeRate / 10}%</font>              
            </Row>
            <Row justify='start' align='center' style={{marginTop: '10px', paddingLeft: '20px', width: '100%'}}>
              <font color='#fff'>您的流动性占比: {this.state.curPairInfo.myPercent}%</font>  
              {
                this.state.curPairInfo.myPercent > 0 ?  
                  <Button type='primary' className='maxButton' style={{marginLeft: '20px', width: '80px'}} onClick={() => this.startRemoveLiquidity()}>取回流动性</Button> : ''  
              }        
            </Row>
            {
              this.isPairNormal() > 0 ? 
                <Row justify='start' align='center' style={{marginTop: '10px', paddingLeft: '20px', width: '100%'}}>
                  <div>
                    <font color='#fff'>当前交易对信息: {this.state.pairAssetInfo}</font>
                  </div>
                </Row> : ''
            }
            

            <Row justify='space-around' style={{ marginTop: '20px', width: '100%' }}>
              <Button disabled={this.state.bLiquidOp} type='primary' style={styles.btn} onClick={() => this.startSwapAsset()}><font size="3">兑换</font></Button>
              <div display='flex' justifyContent='start'>
                <Checkbox onChange={(v) => this.changeLiquidityOp(v)}>''</Checkbox>
                <Button disabled={!this.state.bLiquidOp} type='primary' style={styles.btn} onClick={() => this.startAddLiquidity()}><font size="3">提供流动性</font></Button>
              </div>
            </Row>
          </div>
{/* 
          <Divider direction='ver' style={{backgroundColor: '#272a2f'}}/>

          <Card style={{height: '400px', width: '450px', backgroundColor: '#1e2125', borderRadius:'20px', marginTop: '-100px'}}>

          </Card> */}
        </Row>
        <Dialog style={{ width: '600px', padding: 0}}
          visible={this.state.assetSelectorDialogVisible}
          title="选择资产"
          footerAlign="center"
          closeable="esc,mask,close"
          onOk={this.onSelectAssetOK.bind(this)}
          onCancel={() => this.setState({assetSelectorDialogVisible: false})}
          onClose={() => this.setState({assetSelectorDialogVisible: false})}
        >
          <Input autoFocus placeholder='通过资产ID/资产全名搜索资产' style={{width: '100%'}} 
                 innerBefore={<Icon type="search" size="xs" onClick={() => this.searchAsset()} style={{}}/>}
                 value={this.state.assetContent} 
                 onChange={(v) => this.setState({assetContent: v})}
                 onPressEnter={() => this.searchAsset()}
                 />
          <Row wrap justify='start' style={{ width: '100%'}}>
            {
              this.state.assetDisplayList.map(assetInfo => assetInfo)
            }
          </Row>
        </Dialog>
        <Dialog style={{ width: '600px', padding: 0}}
          visible={this.state.userRemovedLiquidVisible}
          title="输入待移除的流动性数值"
          footerAlign="center"
          closeable="esc,mask,close"
          onOk={this.onInputRemovedLiquidOK.bind(this)}
          onCancel={() => this.setState({userRemovedLiquidVisible: false})}
          onClose={() => this.setState({userRemovedLiquidVisible: false})}
        >
          <Input autoFocus placeholder={this.state.maxLiquidTip + this.state.curPairInfo.userLiquid} style={{width: '100%'}} 
                 innerBefore='流动性数值'
                 value={this.state.liquidToBeRemoved} 
                 onChange={(v) => this.setState({liquidToBeRemoved: v})}
                 onPressEnter={() => this.onInputRemovedLiquidOK()}
                 />
        </Dialog>
        <Dialog style={{ width: '400px', padding: 0}}
          visible={this.state.txInfoVisible}
          title="发起交易"
          footerAlign="center"
          closeable="esc,mask,close"
          onOk={this.onTxConfirmOK.bind(this)}
          onCancel={() => this.setState({txInfoVisible: false})}
          onClose={() => this.setState({txInfoVisible: false})}
        >
          <Input autoFocus style={{width: '100%'}} 
                 innerBefore='Gas单价'
                 innerAfter='Gaoex'
                 placeholder={'建议值:' + this.state.suggestionPrice}
                 value={this.state.gasPrice} 
                 onChange={(v) => this.setState({gasPrice: v})}
                 />
          <div style={{color: '#fff'}}>1Gaoex = 10<sup>-9</sup>oex = 10<sup>9</sup>aoex</div>

          <br />
          <Input style={{width: '100%'}} 
                 innerBefore='Gas上限'
                 value={this.state.gasLimit} 
                 onChange={(v) => this.setState({gasLimit: v})}
                 />
          <br />
          <br />
          <Input hasClear style={{width: '100%'}}
            htmlType="password"
            onChange={v => this.setState({password: v})}
            innerBefore={T("钱包密码")}
            size="medium"
            value={this.state.password}
            maxLength={20}
            hasLimitHint
            onPressEnter={this.onTxConfirmOK.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}


const styles = {
  card1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '500px', 
    width: '450px', 
    backgroundColor: '#1e2125', 
    borderRadius:'20px', 
    marginTop: '-100px',
    boxShadow: 'black 0px 0px 10px'
  },
  card2: {
    height: '100px', 
    width: '400px', 
    backgroundColor: '#1e2125', 
    marginTop: '20px',
    borderRadius:'10px',
    border: '1px solid rgba(255,255,255,0.3)'
  },
  btn: {
    width: '150px', 
    height: '50px',
    borderRadius:'10px',
    backgroundColor: '#3080FE', 
    color: '#fff',
    border: '1px solid rgba(255,255,255,0)'
  },
  assetBtn: {
    marginTop: '20px', 
    width: '100px', 
    height: '30px',
    borderRadius:'10px',
    backgroundColor: '#4090FE', 
    color: '#fff',
    border: '1px solid rgba(255,255,255,0)'
  },
  maxBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    width: '40px', 
    flexShrink: 0,
    borderRadius:'10px',
    backgroundColor: '#3080FE', 
    color: '#fff',
    border: '1px solid rgba(255,255,255,0)',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
    height: '100%',
    backgroundColor: '#272a2f', 
    border: '0 solid rgba(255,255,255,0)',
  },
  assetAmounInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 10px 0 10px'
  },
  amountInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  input:{
    borderRadius: '10px', 
    width: '95%', 
    color: '#fff !important',
    backgroundColor: '#272a2f',
    margin: '10px 10px 0 10px', 
    border: '0 solid rgba(255,255,255,0)'
  },
}